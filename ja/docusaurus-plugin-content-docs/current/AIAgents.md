---
id: ai-agents
title: コーディングエージェントのためのWebdriverIO
description: 機械可読なドキュメント、WebdriverIO MCPサーバー、DevToolsトレースを使用して、Cursor、Claude Code、Copilot、その他のコーディングエージェントがWebdriverIOテストを作成、実行、デバッグできるように設定します。
---

現在、ほとんどのWebdriverIOテストはコーディングエージェントと一緒に作成されています。このページでは、エージェントがそれをうまく行うために必要な3つのものを提供する方法を紹介します：**最新のドキュメント**（推測ではなくv10のコードを書けるように）、**テスト対象のアプリを操作する手段**（UIを探索してセレクターを検証できるように）、そして**デバッグ可能なテスト実行**（失敗したテストを自分で修正できるように）です。

## 1. エージェントにドキュメントを提供する

このサイトのすべてのページは、ナビゲーション、スクリプト、スタイルを含まないクリーンなMarkdownとして利用できます：

| リソース | URL | 用途 |
| --- | --- | --- |
| ドキュメントインデックス | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | 1行の要約付きで全ページを厳選したマップ。ここから始めてください。 |
| 完全なドキュメント | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | 大きなコンテキストウィンドウを持つエージェント向けに、ドキュメント全体を1つのファイルにまとめたもの。 |
| 任意の単一ページ | URLに`.md`を追加します。例：[`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | エージェントが必要とするページだけを正確に読み込む。 |
| コンテンツネゴシエーション | `Accept: text/markdown`を付けて任意の`/docs/*` URLをリクエストします | URLをそのまま取得するエージェントやツール。 |

各ドキュメントページには**Copy page**メニューもあり、ページをMarkdownとしてコピーしたり、ChatGPT、Claude、Cursorで直接開いたりするオプションがあります。

### Docs MCPサーバー

ドキュメントは、`https://webdriver.io/mcp`のリモートMCPサーバーとしても利用できます。これによりエージェントは3つのツールを使えるようになります：適切なページを見つける`search_docs`、ページをMarkdownとして読む`get_page`、セクション全体を一度に読み込む`list_sections`です。以下で説明するWebdriverIO MCPサーバーと並べて追加してください：

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Claude Codeの場合は、`claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`を実行してください。

## エージェントに`wdio session`を使わせる

[`wdio session`](/docs/session)は、シェルコマンド間でWebdriverIOセッションを維持します。エージェントはブラウザ、スマートフォン、デスクトップアプリを開き、画面上の内容のスナップショットを取得し、refに対して操作を行い、うまくいった手順をテストとしてエクスポートできます。これがコーディングエージェントからアプリを操作するデフォルトの方法です。エージェントがシェルではなくツールを呼び出すべき場合は、次のセクションの[MCPサーバー](/docs/mcp)が代替手段となります。

スキルをプロジェクトにインストールします：

```sh
npx wdio session skill --install .
```

これにより`.agents/skills/wdio-session/SKILL.md`が書き込まれます。`npm init wdio`でコーディングエージェントのサポートを有効にした場合も同じファイルが書き込まれ、さらに以下のプロジェクトルールが追加されます。

エージェントはプロジェクトを自分で作成することもできます。ウィザードはすべての質問に対応するフラグを受け付け、`--yes`は残りの項目をデフォルト値で埋めるため、入力待ちになることはありません：

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help`で、すべてのフラグとその値が一覧表示されます。[フラグでウィザードに回答する](/docs/gettingstarted#answer-the-wizard-with-flags)を参照してください。[WebdriverIO Session](/docs/session)セクションでは、ターゲット、スナップショット、`exec`、エクスポート、デバッグについて説明しています。コマンドリファレンス：[wdio sessionコマンド](/docs/session-commands)。

### エージェントにドキュメントを追加する

すべてのチャットでドキュメントを利用できるようにするには、インデックスをエージェントに追加します：

- **Cursor**: Cursorの設定（_Indexing & Docs_）で`https://webdriver.io/llms.txt`をカスタムドキュメントとして追加し、チャットで`@`と付けた名前を使って参照します。
- **Claude Code / Codex / その他のCLIエージェント**: プロジェクトの`AGENTS.md`または`CLAUDE.md`にリンクを追加します（以下の[プロジェクトルール](#3-add-project-rules)を参照）。エージェントは必要なページをオンデマンドで取得します。

## 2. エージェントにブラウザやアプリを操作させる

[WebdriverIO MCPサーバー](/docs/mcp)（`@wdio/mcp`）を使用すると、エージェントはブラウザ（Chrome、Firefox、Edge、Safari）、ネイティブおよびハイブリッドのモバイルアプリ（Appium経由）、クラウドデバイスを開き、アクセシビリティツリーを調べ、クリック、入力、スクリーンショットの取得を行えます。エージェントはこれを使って、テストを書く前にページを探索したり、堅牢なセレクターを見つけたり、失敗をステップごとに再現したりします。

MCPクライアントの設定（例えばプロジェクト内の`.mcp.json`や`.cursor/mcp.json`）に追加します：

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Claude Codeの場合は、コマンドラインから登録します：

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

セッションオプションについては[MCP設定](/docs/mcp/configuration)を、BrowserStack、Sauce Labs、TestMu AI、TestingBotでの実行については[クラウドプロバイダー](/docs/mcp/cloud-providers)を参照してください。

## 3. プロジェクトルールを追加する

エージェントは、プロジェクトの規約が文書化されている場合、はるかに確実にそれに従います。テストプロジェクトの`AGENTS.md`（または`CLAUDE.md`、`.cursor/rules`）に次のようなセクションを追加し、パスとコマンドを調整してください：

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

上記のルールは、[ベストプラクティス](/docs/bestpractices)、[セレクター](/docs/selectors)、[自動待機](/docs/autowait)の推奨事項を反映しています。

## 4. エージェントに失敗したテストをデバッグさせる

[WebdriverIO DevTools](/docs/devtools)サービスは、すべての実行の**トレース**を記録できます。これはポータブルなアーティファクトで、ステップごとのMarkdownトランスクリプト、スクリーンショット、アクセシビリティツリーのスナップショット、各アクションのネットワークログが含まれます。これにより、エージェントはブラウザウィンドウを必要とせずに、人間がテストを見て得るのと同じ情報を得られます。

サービスをインストールし、トレースモードを有効にします：

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // テストごとに1つのトレースにすると、単一の失敗をエージェントに渡しやすくなります
            traceGranularity: 'test',
            // zipではなくプレーンファイルにすることで、エージェントが直接読み取れます
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

実行後、トレースは`test-results/`に書き込まれます。エージェントに失敗したテストのフォルダーを指定し、まず`transcript.md`を読むよう依頼してください。粒度や保持期間を含むすべてのオプションについては、[トレースモード](/docs/devtools/wdio/trace-mode)を参照してください。

## 推奨ワークフロー

1. エージェントにMCPサーバーを使ってテスト対象の機能を探索させ、セレクターを提案させます。
2. プロジェクトルールに従って、必要に応じてWebdriverIOのドキュメントページを取得しながら、specとページオブジェクトを書かせます。
3. `--spec`で単一のspecを実行させ、パスするまで繰り返させます。
4. CIでテストが失敗した場合は、そのテストのトレースをエージェントに渡し、テストを修正させるかバグを報告させます。

## 次のステップ

- [はじめに](/docs/gettingstarted) - `npm init wdio@latest`でプロジェクトを作成する
- [WebdriverIO MCP](/docs/mcp) - MCPサーバーが提供するすべてのツール
- [DevTools](/docs/devtools) - ライブモードとトレースモード
- [ベストプラクティス](/docs/bestpractices) - 良いWebdriverIOテストとは
- [v9からv10へ](/docs/v10-migration#migrate-with-a-coding-agent) - 既存のスイート向けの移行スキル