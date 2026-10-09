---
id: writing-tests
title: テストの作成
description: "Mocha、Jasmine、Cucumberを使用して、スクリーンショットを保存したり、カスタムマッチャーやcheckメソッドでベースラインと照合したりするビジュアルテストを作成します。"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## テストランナーフレームワークのサポート

`@wdio/visual-service`はテストランナーフレームワークに依存しないため、WebdriverIOがサポートする以下のようなすべてのフレームワークで使用できます：

-   [`Mocha`](https://webdriver.io/docs/frameworks#using-mocha)
-   [`Jasmine`](https://webdriver.io/docs/frameworks#using-jasmine)
-   [`CucumberJS`](https://webdriver.io/docs/frameworks#using-cucumber)

テスト内では、スクリーンショットを _保存_ したり、テスト対象アプリケーションの現在の視覚的な状態をベースラインと照合したりできます。そのために、このサービスは[カスタムマッチャー](/docs/api/expect-webdriverio#visual-matcher)と _check_ メソッドを提供しています：

<Tabs
    defaultValue="mocha"
    values={[
        {label: 'Mocha', value: 'mocha'},
        {label: 'Jasmine', value: 'jasmine'},
        {label: 'CucumberJS', value: 'cucumberjs'},
    ]}
>
<TabItem value="mocha">

```ts
describe('Mocha Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // 画面がベースラインと完全に一致することを確認
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // 要素のベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // `saveScreen`コマンドのオプションを指定して要素を確認
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* いくつかのオプション */
        })

        // 要素がベースラインと完全に一致することを確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // 要素のベースラインとの不一致率が5%であることを確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // `saveElement`コマンドのオプションを指定して要素を確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* いくつかのオプション */
        })

        // フルページスクリーンショットがベースラインと一致することを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // `checkFullPageScreen`コマンドのオプションを指定してフルページスクリーンショットを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* いくつかのオプション */
        })

        // すべてのタブ操作を含むフルページスクリーンショットを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // `checkTabbablePage`コマンドのオプションを指定してフルページスクリーンショットを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* いくつかのオプション */
        })
    })

    it('should save some screenshots', async () => {
        // 画面を保存
        await browser.saveScreen('examplePage', {
            /* いくつかのオプション */
        })

        // 要素を保存
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* いくつかのオプション */
            }
        )

        // フルページスクリーンショットを保存
        await browser.saveFullPageScreen('fullPage', {
            /* いくつかのオプション */
        })

        // すべてのタブ操作を含むフルページスクリーンショットを保存
        await browser.saveTabbablePage('save-tabbable', {
            /* いくつかのオプション。saveFullPageScreenと同じオプションを使用 */
        })
    })

    it('should compare successful with a baseline', async () => {
        // 画面を確認
        await expect(
            await browser.checkScreen('examplePage', {
                /* いくつかのオプション */
            })
        ).toEqual(0)

        // 要素を確認
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* いくつかのオプション */
                }
            )
        ).toEqual(0)

        // フルページスクリーンショットを確認
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* いくつかのオプション */
            })
        ).toEqual(0)

        // すべてのタブ操作を含むフルページスクリーンショットを確認
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* いくつかのオプション。checkFullPageScreenと同じオプションを使用 */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="jasmine">

```ts
describe('Jasmine Example', () => {
    beforeEach(async () => {
        await browser.url('https://webdriver.io')
    })

    it('using visual matchers to assert against baseline', async () => {
        // 画面がベースラインと完全に一致することを確認
        await expect(browser).toMatchScreenSnapshot('partialPage')
        // 要素のベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchScreenSnapshot('partialPage', 5)
        // `saveScreen`コマンドのオプションを指定して要素を確認
        await expect(browser).toMatchScreenSnapshot('partialPage', {
            /* いくつかのオプション */
        })

        // 要素がベースラインと完全に一致することを確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
        // 要素のベースラインとの不一致率が5%であることを確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
        // `saveElement`コマンドのオプションを指定して要素を確認
        await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
            /* いくつかのオプション */
        })

        // フルページスクリーンショットがベースラインと一致することを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage')
        // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
        // `checkFullPageScreen`コマンドのオプションを指定してフルページスクリーンショットを確認
        await expect(browser).toMatchFullPageSnapshot('fullPage', {
            /* いくつかのオプション */
        })

        // すべてのタブ操作を含むフルページスクリーンショットを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
        // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
        // `checkTabbablePage`コマンドのオプションを指定してフルページスクリーンショットを確認
        await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
            /* いくつかのオプション */
        })
    })

    it('should save some screenshots', async () => {
        // 画面を保存
        await browser.saveScreen('examplePage', {
            /* いくつかのオプション */
        })

        // 要素を保存
        await browser.saveElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* いくつかのオプション */
            }
        )

        // フルページスクリーンショットを保存
        await browser.saveFullPageScreen('fullPage', {
            /* いくつかのオプション */
        })

        // すべてのタブ操作を含むフルページスクリーンショットを保存
        await browser.saveTabbablePage('save-tabbable', {
            /* いくつかのオプション。saveFullPageScreenと同じオプションを使用 */
        })
    })

    it('should compare successful with a baseline', async () => {
        // 画面を確認
        await expect(
            await browser.checkScreen('examplePage', {
                /* いくつかのオプション */
            })
        ).toEqual(0)

        // 要素を確認
        await expect(
            await browser.checkElement(
                await $('#element-id'),
                'firstButtonElement',
                {
                    /* いくつかのオプション */
                }
            )
        ).toEqual(0)

        // フルページスクリーンショットを確認
        await expect(
            await browser.checkFullPageScreen('fullPage', {
                /* いくつかのオプション */
            })
        ).toEqual(0)

        // すべてのタブ操作を含むフルページスクリーンショットを確認
        await expect(
            await browser.checkTabbablePage('check-tabbable', {
                /* いくつかのオプション。checkFullPageScreenと同じオプションを使用 */
            })
        ).toEqual(0)
    })
})
```

</TabItem>
<TabItem value="cucumberjs">

```ts
import { When, Then } from '@wdio/cucumber-framework'

When('I save some screenshots', async function () {
    // 画面を保存
    await browser.saveScreen('examplePage', {
        /* いくつかのオプション */
    })

    // 要素を保存
    await browser.saveElement(await $('#element-id'), 'firstButtonElement', {
        /* いくつかのオプション */
    })

    // フルページスクリーンショットを保存
    await browser.saveFullPageScreen('fullPage', {
        /* いくつかのオプション */
    })

    // すべてのタブ操作を含むフルページスクリーンショットを保存
    await browser.saveTabbablePage('save-tabbable', {
        /* いくつかのオプション。saveFullPageScreenと同じオプションを使用 */
    })
})

Then('I should be able to match some screenshots with a baseline', async function () {
    // 画面がベースラインと完全に一致することを確認
    await expect(browser).toMatchScreenSnapshot('partialPage')
    // 要素のベースラインとの不一致率が5%であることを確認
    await expect(browser).toMatchScreenSnapshot('partialPage', 5)
    // `saveScreen`コマンドのオプションを指定して要素を確認
    await expect(browser).toMatchScreenSnapshot('partialPage', {
        /* いくつかのオプション */
    })

    // 要素がベースラインと完全に一致することを確認
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement')
    // 要素のベースラインとの不一致率が5%であることを確認
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', 5)
    // `saveElement`コマンドのオプションを指定して要素を確認
    await expect($('#element-id')).toMatchElementSnapshot('firstButtonElement', {
        /* いくつかのオプション */
    })

    // フルページスクリーンショットがベースラインと一致することを確認
    await expect(browser).toMatchFullPageSnapshot('fullPage')
    // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
    await expect(browser).toMatchFullPageSnapshot('fullPage', 5)
    // `checkFullPageScreen`コマンドのオプションを指定してフルページスクリーンショットを確認
    await expect(browser).toMatchFullPageSnapshot('fullPage', {
        /* いくつかのオプション */
    })

    // すべてのタブ操作を含むフルページスクリーンショットを確認
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable')
    // フルページスクリーンショットのベースラインとの不一致率が5%であることを確認
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', 5)
    // `checkTabbablePage`コマンドのオプションを指定してフルページスクリーンショットを確認
    await expect(browser).toMatchTabbablePageSnapshot('check-tabbable', {
        /* いくつかのオプション */
    })
})

Then('I should be able to compare some screenshots with a baseline', async function () {
    // 画面を確認
    await expect(
        await browser.checkScreen('examplePage', {
            /* いくつかのオプション */
        })
    ).toEqual(0)

    // 要素を確認
    await expect(
        await browser.checkElement(
            await $('#element-id'),
            'firstButtonElement',
            {
                /* いくつかのオプション */
            }
        )
    ).toEqual(0)

    // フルページスクリーンショットを確認
    await expect(
        await browser.checkFullPageScreen('fullPage', {
            /* いくつかのオプション */
        })
    ).toEqual(0)

    // すべてのタブ操作を含むフルページスクリーンショットを確認
    await expect(
        await browser.checkTabbablePage('check-tabbable', {
            /* いくつかのオプション。checkFullPageScreenと同じオプションを使用 */
        })
    ).toEqual(0)
})
```

</TabItem>
</Tabs>

:::note 重要

このサービスは`save`メソッドと`check`メソッドを提供しています。初めてテストを実行する場合は、`save`メソッドと`compare`メソッドを組み合わせて**使用しないでください**。`check`メソッドが自動的にベースライン画像を作成します

```sh
#####################################################################################
 INFO:
 Autosaved the image to
 /Users/wswebcreation/sample/baselineFolder/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```


[ベースライン画像の自動保存を無効にしている](service-options#autosavebaseline)場合、Promiseは以下の警告とともにrejectされます。

```sh
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/sample/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
#####################################################################################
```

これは、現在のスクリーンショットがactualフォルダに保存されており、**手動でベースラインにコピーする必要がある**ことを意味します。`@wdio/visual-service`を[`autoSaveBaseline: true`](./service-options#autosavebaseline)でインスタンス化すると、画像は自動的にベースラインフォルダに保存されます。

:::