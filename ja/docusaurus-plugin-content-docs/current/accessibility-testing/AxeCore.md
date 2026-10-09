---
id: axe-core
title: Axe Core
description: "Deque が提供するオープンソースの Axe アダプターを使用して、スタンドアロンモードまたはテストランナーモードでテスト内に自動アクセシビリティチェックを組み込みます。"
---

[Deque の Axe](https://www.deque.com/axe/) と呼ばれるオープンソースのアクセシビリティツールを使用して、WebdriverIO のテストスイートにアクセシビリティテストを含めることができます。セットアップは非常に簡単で、次のコマンドで WebdriverIO Axe アダプターをインストールするだけです:

```bash npm2yarn
npm install -g @axe-core/webdriverio
```

Axe アダプターは、インポートして [browser オブジェクト](/docs/api/browser) で初期化するだけで、[スタンドアロンモードまたはテストランナーモード](/docs/setuptypes) のいずれでも使用できます。例:

```ts
import { browser } from '@wdio/globals'
import AxeBuilder from '@axe-core/webdriverio'

describe('Accessibility Test', () => {
    it('should get the accessibility results from a page', async () => {
        const builder = new AxeBuilder({ client: browser })

        await browser.url('https://testingbot.com')
        const result = await builder.analyze()
        console.log('Acessibility Results:', result)
    })
})
```

Axe WebdriverIO アダプターに関する詳細なドキュメントは [GitHub](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/webdriverio#usage) で確認できます。