---
id: ai-steps
title: テストにおける AI ステップ
description: "@wdio/ai-service を使用して、browser.act() でテストステップを意図として記述し、browser.extract() で型付きデータを読み取ります。その後、コミットされたキャッシュからモデルなしで再生し、すべての修復をレビューします。"
---

`@wdio/ai-service` を使うと、テストのステップをスクリプトとして書く代わりに記述できます。`browser.act('Add a blue shirt to the cart')` はモデルにそのステップの実行を依頼し、実行された WebdriverIO コマンドを記録して、以降の実行ではキャッシュファイルからそれらを再生します。モデルが再び呼び出されるのは、ページが変更され、記録されたステップをモデルなしでは修復できなくなった場合のみです。マークアップが頻繁に変わるフローや、セレクターがわかる前にテストを動かしたい場合に使用してください。スクリプトの書き方がすでにわかっているものには、通常の WebdriverIO コマンドを使用してください。

## サービスのセットアップ

サービスと、使用するモデルプロバイダーの LangChain パッケージをインストールします：

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

設定にサービスを追加し、プロバイダーの API キー（ここでは `ANTHROPIC_API_KEY`）を環境変数に設定します：

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` は WebDriver BiDi セッションを開きます。このサービスは WebDriver Classic でも動作しますが、BiDi を使うと各ステップが何を行ったかを確認したり、ページの API レスポンスを読み取ったりできます。Ollama によるローカルモデルを含む、すべてのオプションとプロバイダーについては [AI Service](/docs/ai-service) ページを参照してください。

## テストを書く

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` はステップを実行するだけで、アサーションは行いません。結果は `expect` で確認してください。
- `extract` はページを読み取り、回答をスキーマに対して検証するだけです。キャッシュされることはありません。
- シークレットはプレースホルダーに入れます。モデルには値ではなく `{{password}}` が見えます：

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- 要素に対して `act` を呼び出すと、モデルをその要素内に限定できます。保持しているフレームやタブに対して呼び出すこともできます：

```ts
await $('form#billing').act('Fill in a valid German address')
```

## 一度記録し、モデルなしで再生する

最初の実行では、すべての `act` 呼び出しのステップが、スペックファイルの隣にある `__act__/<spec file>.json` に記録されます：

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`__act__` ディレクトリをコミットしてください。以降の実行では記録されたコマンドが再生されるため、成功した実行ではモデルの呼び出しが発生せず、トークンも消費しません。

| `cache` | 用途 |
| --- | --- |
| `auto`（デフォルト） | ローカルでは `write`、`process.env.CI` が設定されている場合は `heal` |
| `write` | キャッシュファイルの記録と更新 |
| `heal` | CI：失敗したステップを修復し、修復されたエントリを `<outputDir>/act-cache/` に書き込み、キャッシュファイルには手を加えない |
| `locked` | モデルを呼び出してはならない CI 実行：再生のみを行い、モデルなしでステップを修復できない場合は失敗する |
| `off` | 常にモデルに問い合わせる |

すべての `act` 呼び出しを再記録するには、`npx wdio run wdio.conf.ts -s` を実行します。

## 修復をレビューする

記録されたステップが失敗すると、サービスはまずその要素について記録した他のセレクターを試し、次にロールとアクセシブルネームを試します。それでも失敗した場合にのみ、モデルが失敗したステップから処理を続行します。再生または修復されたすべてのステップは、記録時と同じことを行う必要があります。つまり、同じリクエストを送信し、同じページに遷移し、ページの同じ部分を変更しなければなりません。似ているが誤ったボタンへの修復は拒否されます。

実行の最後にサマリーが表示されます：

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

エビデンスフォルダーには、ステップが失敗したときのページのスクリーンショット、各修復ステップ後のスクリーンショット、そして WebDriver BiDi スクリーンキャストを記録するブラウザー（現時点では Firefox）では修復の動画が含まれます。修復をレビューしてから、更新されたキャッシュファイルをコミットしてください。

## ステップを通常のコードに変換する

フローが安定したら、その `act` 呼び出しを記録されたコマンドに置き換えます：

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## トラブルシューティング

| エラー | 対処法 |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | サービスのオプションで `model` を設定するか、`WDIO_AI_MODEL=anthropic:claude-sonnet-5-5` をエクスポートします。 |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | プロバイダーパッケージをインストールします。 |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | テストを実行するシェルまたは CI シークレットでキーをエクスポートします。 |
| `act("…") failed: no cached steps for "…" and the cache is locked` | ローカルで `cache: 'write'` を指定して呼び出しを記録し、`__act__` ファイルをコミットします。 |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | 要素はまだ存在しますが、別の動作をしています。これはマークアップの変更ではなく、リグレッションです。アプリを確認してください。 |
| `act("…") failed: …` の後に `Evidence: <folder>` が続く | モデルが指示を完了できませんでした。フォルダーには、モデルが取得したすべてのスナップショット、コンソールとネットワークのイベント、実行されたステップが含まれています。 |

## 次のステップ

- [AI Service](/docs/ai-service)：すべてのオプション、キャッシュ形式、ステップの効果、ワークスペース
- [セレクター](/docs/selectors#role-selector)：記録されたステップが使用する `role/` セレクター
- [コーディングエージェントのための WebdriverIO](/docs/ai-agents)：コーディングエージェントと一緒にテストを書く