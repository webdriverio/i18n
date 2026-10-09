---
id: multiremote
title: マルチリモート
description: "マルチリモートを使用して、スタンドアロンモードまたはWDIOテストランナーで、単一のテストから複数のブラウザまたはデバイスセッションを制御します。"
---

WebdriverIOでは、単一のテストで複数の自動化セッションを実行できます。これは、複数のユーザーを必要とする機能（例えば、チャットやWebRTCアプリケーション）をテストする際に便利です。

各インスタンスで[`newSession`](/docs/api/webdriver#newsession)や[`url`](/docs/api/browser/url)などの共通コマンドを実行する必要がある複数のリモートインスタンスを作成する代わりに、**マルチリモート**インスタンスを作成するだけで、すべてのブラウザを同時に制御できます。

これを行うには、`multiRemote()`関数を使用し、名前をキー、`capabilities`を値とするオブジェクトを渡すだけです。各ケイパビリティに名前を付けることで、単一のインスタンスでコマンドを実行する際に、そのインスタンスを簡単に選択してアクセスできます。

:::info

MultiRemoteは、すべてのテストを並列で実行することを目的としたもの_ではありません_。
これは、特別な統合テスト（例：チャットアプリケーション）のために、複数のブラウザやモバイルデバイスを連携させるためのものです。

:::

ほとんどのマルチリモートコマンドは、結果の配列を返します。最初の結果はケイパビリティオブジェクトで最初に定義されたケイパビリティを表し、2番目の結果は2番目のケイパビリティを表す、というようになります。`mock()`は配列ではなく`MultiRemoteMock`を返します。[mock()が返すもの](#what-mock-returns)を参照してください。

## スタンドアロンモードの使用

以下は、__スタンドアロンモード__でマルチリモートインスタンスを作成する方法の例です：

```js
import { multiRemote } from 'webdriverio'

(async () => {
    const browser = await multiRemote({
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    })

    // 両方のブラウザで同時にURLを開く
    await browser.url('http://json.org')

    // コマンドを同時に呼び出す
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // 要素を同時にクリックする
    const elem = await browser.$('#someElem')
    await elem.click()

    // 1つのブラウザ（Firefox）でのみクリックする
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## WDIOテストランナーの使用

WDIOテストランナーでマルチリモートを使用するには、`wdio.conf.js`の`capabilities`オブジェクトを、（ケイパビリティのリストではなく）ブラウザ名をキーとするオブジェクトとして定義するだけです：

```js
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
    // ...
}
```

これにより、ChromeとFirefoxの2つのWebDriverセッションが作成されます。ChromeとFirefoxだけでなく、[Appium](http://appium.io)を使用して2つのモバイルデバイスを起動したり、1つのモバイルデバイスと1つのブラウザを起動したりすることもできます。

ブラウザのケイパビリティオブジェクトを配列に入れることで、マルチリモートを並列で実行することもできます。各ブラウザに`capabilities`フィールドが含まれていることを確認してください。これによって各モードを区別しています。

```js
export const config = {
    // ...
    capabilities: [{
        myChromeBrowser0: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser0: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }, {
        myChromeBrowser1: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser1: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }]
    // ...
}
```

[クラウドサービスバックエンド](https://webdriver.io/docs/cloudservices.html)の1つを、ローカルのWebdriver/AppiumやSelenium Standaloneインスタンスと一緒に起動することもできます。ブラウザのケイパビリティで`bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）、または`tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)）のいずれかを指定した場合、WebdriverIOはクラウドバックエンドのケイパビリティを自動的に検出します。

```js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myBrowserStackFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox',
                'bstack:options': {
                    // ...
                }
            }
        }
    },
    services: [
        ['browserstack', 'selenium-standalone']
    ],
    // ...
}
```

ここでは、あらゆるOS/ブラウザの組み合わせが可能です（モバイルブラウザとデスクトップブラウザを含む）。テストが`browser`変数を介して呼び出すすべてのコマンドは、各インスタンスで並列に実行されます。これにより、統合テストが効率化され、実行速度が向上します。

例えば、URLを開く場合：

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

各コマンドの結果は、ブラウザ名をキー、コマンドの結果を値とするオブジェクトになります：

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

各コマンドは1つずつ実行されることに注意してください。つまり、すべてのブラウザがコマンドを実行し終えた時点で、そのコマンドが完了します。これはブラウザのアクションを同期させるため、現在何が起きているかを理解しやすくなるという点で便利です。

何かをテストするために、各ブラウザで異なる操作を行う必要がある場合もあります。例えば、チャットアプリケーションをテストしたい場合、一方のブラウザがテキストメッセージを送信し、もう一方のブラウザがそれを受信するのを待ってから、アサーションを実行する必要があります。

WDIOテストランナーを使用する場合、ブラウザ名とそのインスタンスがグローバルスコープに登録されます：

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// メッセージが届くまで待機する
await $('.messages').waitForExist()
// メッセージのいずれかにChromeのメッセージが含まれているか確認する
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

この例では、`myChromeBrowser`インスタンスが`#send`ボタンをクリックすると、`myFirefoxBrowser`インスタンスがメッセージの待機を開始します。

MultiRemoteを使用すると、複数のブラウザに同じことを並列で実行させる場合でも、異なることを連携して実行させる場合でも、簡単かつ便利に制御できます。

### `$`が返すもの

マルチリモートブラウザでは、`$`、`custom$`、`react$`は1つの`MultiRemoteElement`を返します。マルチリモート要素では、`shadow$`、`nextElement`、`previousElement`、`parentElement`も1つの`MultiRemoteElement`を返します。そのコマンドはすべてのインスタンスで実行され、`getInstance`で1つのブラウザの要素を取得できます。

```js
const host = await $('my-component')
const button = await host.shadow$('button')

await button.click()                                  // すべてのブラウザでクリックする
await button.getInstance('myChromeBrowser').click()  // Chromeでのみクリックする
```

### `$$`が返すもの

マルチリモートブラウザでは、`$$`は`MultiRemoteElementArray`を返します。各エントリはすべてのインスタンスを一度に対象とする`MultiRemoteElement`であり、配列自体は通常の`ElementArray`と同じ情報を持ちます。`custom$$`、`react$$`、およびマルチリモート要素での`shadow$$`も同じ種類のリストを返します。

```js
const messages = await $$('.messages')

messages.length      // 1つのインスタンスが見つけた要素数の最大値
messages[0]          // すべてのインスタンスを対象とするMultiRemoteElement
messages.selector    // '.messages'
messages.foundWith   // '$$'
messages.parent      // 取得元のマルチリモートブラウザまたは要素
messages.isMultiRemote // true。通常のElementArrayと区別できる

// 単一ブラウザと同様に、非同期の配列ヘルパーが使用可能
await messages.map((m) => m.getText())
await messages.filter(async (m) => await m.isDisplayed())
```

インスタンスごとに見つかった要素の数が異なる場合、より少ない数しか見つからなかったインスタンスについては、エントリに要素がありません。そのインスタンスでは、`getInstance()`が例外をスローし、エントリに対するコマンドは失敗します。その要素を持つインスタンスを指定して`select()`を使用してください。リスト全体に対する`expect`マッチャーは、各インスタンスをそれぞれの要素でチェックします：

```js
// myChromeBrowserは3件、myFirefoxBrowserは2件のメッセージを見つける
const messages = await $$('.messages')

messages.length                                       // 3
await messages[2].select('myChromeBrowser').click()  // 3件目のメッセージがあるのはChromeのみ
await expect(messages).toBeElementsArrayOfSize(expect.multiRemote({
    myChromeBrowser: 3,
    myFirefoxBrowser: 2
}))
```

:::info

v10より前は、`WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY=true`が設定されていない限り、これは通常の配列を返していました。現在はこの配列がデフォルトとなり、環境変数は削除されました。インデックスアクセスは変更されていないため、`elements[0]`を読み取るだけのコードは引き続き動作します。

:::

### mock()が返すもの {#what-mock-returns}

マルチリモートブラウザでは、`mock()`は`MultiRemoteMock`を返します。これは配列ではありません。`respond()`、`restore()`、その他のモックメソッドはすべてのインスタンスで実行されます。キャプチャされたリクエストは各ブラウザのモックに保持されるため、`getInstance`を使って読み取ります：

```ts
const mock = await browser.mock('*/users/list')

mock.instances // ['myChromeBrowser', 'myFirefoxBrowser']
mock.respond([{ id: 1 }])

const chromeCalls = mock.getInstance('myChromeBrowser').calls
const firefoxCalls = mock.getInstance('myFirefoxBrowser').calls
```

`examples/bidi/multiremote-mock.js`では、これを2つのヘッドレスChromeセッションに対して実行しています。

`instances`はモックが作成された順序に従います。`select()`の後では、その順序が`browser.instances`と異なる場合があります：

```ts
const selected = await browser.select('myFirefoxBrowser', 'myChromeBrowser').mock('*/users/list')

selected.instances // ['myFirefoxBrowser', 'myChromeBrowser']
selected.getInstance('myChromeBrowser') // 順序に関係なくChromeのモック
```

`name`が`instances`に含まれていない場合、`getInstance`は`Multi-remote object has no instance named "<name>"`をスローします。

1つのブラウザのみをモックするには、そのインスタンスで`mock()`を呼び出します：

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/users/list')
```

## browserオブジェクトを介して文字列でブラウザインスタンスにアクセスする
グローバル変数（例：`myChromeBrowser`、`myFirefoxBrowser`）を介してブラウザインスタンスにアクセスするだけでなく、`browser`オブジェクトを介して、例えば`browser["myChromeBrowser"]`や`browser["myFirefoxBrowser"]`のようにアクセスすることもできます。すべてのインスタンスのリストは`browser.instances`で取得できます。これは、どちらのブラウザでも実行できる再利用可能なテストステップを書く際に特に便利です。例：

wdio.conf.js:
```js
    capabilities: {
        userA: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        userB: {
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
```

Cucumberファイル:
    ```feature
    When User A types a message into the chat
    ```

ステップ定義ファイル:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## アサーション

`expect`マッチャーは、マルチリモートのブラウザ、要素、モックをサポートしています。デフォルトでは、すべてのインスタンスが期待値と一致する必要があります：

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle('My App')
await expect(multiRemoteBrowser.$('h1')).toHaveText('Welcome')
```

インスタンスごとに異なる値を期待する場合は、インスタンス名ごとに1つの値を指定して`expect.multiRemote()`を使用します：

```js
import { multiRemoteBrowser, expect } from '@wdio/globals'

await expect(multiRemoteBrowser).toHaveTitle(expect.multiRemote({
    myChromeBrowser: 'My App',
    myFirefoxBrowser: expect.stringContaining('App')
}))
```

サポートされているすべてのマッチャーと必要な設定については、[expect-webdriverioマルチリモートガイド](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/MultiRemote.md)を参照してください。

## 1つのインスタンスへのアクセス

インスタンス名は、マルチリモートブラウザやマルチリモート要素のプロパティではありません。`browser.myChromeBrowser`や`elem.myChromeDriver`は設定されていません。`getInstance`でセッションを取得するか、`select`でマルチリモートオブジェクトを絞り込んでください：

```ts
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser?.$$('button')

const myChromeElement = (await browser.$('button')).getInstance('myChromeBrowser')
await myChromeElement.click()

await browser.select('myChromeBrowser').url('https://webdriver.io')
```

`injectGlobals`が有効のままの場合、テストランナーは引き続き各インスタンス名をそれぞれ独自のグローバル変数として割り当てるため、テストは`browser`を経由せずに`myChromeBrowser.$('button')`を呼び出すことができます。そのグローバル変数は`getInstance`から得られる単一のセッションであり、マルチリモートオブジェクトのフィールドではありません。