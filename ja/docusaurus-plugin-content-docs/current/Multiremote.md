---
id: multiremote
title: マルチリモート
---

WebdriverIOでは、1つのテストで複数の自動化セッションを実行できます。これは、複数のユーザーを必要とする機能（例えば、チャットやWebRTCアプリケーション）をテストする際に便利です。

[`newSession`](/docs/api/webdriver#newsession)や[`url`](/docs/api/browser/url)のような共通コマンドを各インスタンスで実行する必要がある複数のリモートインスタンスを作成する代わりに、**マルチリモート**インスタンスを作成して、すべてのブラウザを同時に制御できます。

そのためには、`multiremote()`関数を使用し、名前を付けた`capabilities`オブジェクトを渡すだけです。各機能に名前を付けることで、単一インスタンスでコマンドを実行する際に、その単一インスタンスを簡単に選択してアクセスできます。

:::info

マルチリモートは、すべてのテストを並行して実行するためのものでは_ありません_。
これは、特別な統合テスト（例：チャットアプリケーション）のために複数のブラウザやモバイルデバイスを調整するのに役立つことを目的としています。

:::

すべてのマルチリモートインスタンスは結果の配列を返します。最初の結果はケーパビリティオブジェクトで最初に定義された機能を表し、2番目の結果は2番目の機能を表し、以下同様です。

## スタンドアロンモードでの使用

以下は**スタンドアロンモード**でマルチリモートインスタンスを作成する例です：

```js
import { multiremote } from 'webdriverio'

(async () => {
    const browser = await multiremote({
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

    // open url with both browser at the same time
    await browser.url('http://json.org')

    // call commands at the same time
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // click on an element at the same time
    const elem = await browser.$('#someElem')
    await elem.click()

    // only click with one browser (Firefox)
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## WDIOテストランナーでの使用

WDIOテストランナーでマルチリモートを使用するには、`wdio.conf.js`の`capabilities`オブジェクトをブラウザ名をキーとするオブジェクトとして定義します（機能のリストではなく）：

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

これにより、ChromeとFirefoxで2つのWebDriverセッションが作成されます。ChromeとFirefoxだけでなく、[Appium](http://appium.io)を使用して2つのモバイルデバイスを起動したり、1つのモバイルデバイスと1つのブラウザを起動したりすることもできます。

ブラウザの機能オブジェクトを配列に入れることで、マルチリモートを並行して実行することもできます。各モードを区別するために、各ブラウザに`capabilities`フィールドが含まれていることを確認してください。

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

ローカルのWebdriver/AppiumやSelenium Standaloneインスタンスと一緒に[クラウドサービスバックエンド](https://webdriver.io/docs/cloudservices.html)のいずれかを起動することもできます。WebdriverIOは、ブラウザの機能に`bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）、または`tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)）のいずれかを指定した場合、自動的にクラウドバックエンド機能を検出します。

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

ここではあらゆる種類のOS/ブラウザの組み合わせが可能です（モバイルブラウザとデスクトップブラウザを含む）。テストが`browser`変数を介して呼び出すすべてのコマンドは、各インスタンスと並行して実行されます。これにより、統合テストを合理化し、実行を高速化することができます。

例えば、URLを開く場合：

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

各コマンドの結果は、ブラウザ名をキーとし、コマンドの結果を値とするオブジェクトになります：

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

各コマンドは一つずつ実行されることに注意してください。つまり、すべてのブラウザがコマンドを実行した時点でコマンドが終了します。これはブラウザのアクションを同期させ、現在何が起こっているかを理解しやすくするのに役立ちます。

何かをテストするために、各ブラウザで異なることを行う必要がある場合もあります。例えば、チャットアプリケーションをテストする場合、あるブラウザがテキストメッセージを送信し、別のブラウザがそれを受信するのを待って、アサーションを実行する必要があります。

WDIOテストランナーを使用する場合、ブラウザ名をそのインスタンスとともにグローバルスコープに登録します：

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// wait until messages arrive
await $('.messages').waitForExist()
// check if one of the messages contain the Chrome message
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

この例では、`myChromeBrowser`インスタンスが`#send`ボタンをクリックした後、`myFirefoxBrowser`インスタンスがメッセージを待ち始めます。

マルチリモートを使用すると、複数のブラウザを制御することが簡単で便利になります。ブラウザが並行して同じことを実行するか、協調して異なることを実行するかにかかわらずです。

## 文字列を使用したブラウザオブジェクトからのブラウザインスタンスへのアクセス
グローバル変数（例：`myChromeBrowser`、`myFirefoxBrowser`）を介してブラウザインスタンスにアクセスするだけでなく、`browser`オブジェクトを介して`browser["myChromeBrowser"]`や`browser["myFirefoxBrowser"]`としてもアクセスできます。`browser.instances`を使用してすべてのインスタンスのリストを取得できます。これは、どちらのブラウザでも実行できる再利用可能なテストステップを作成する場合に特に便利です：

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

Cucumberファイル：
    ```feature
    When User A types a message into the chat
    ```

ステップ定義ファイル：
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## TypeScript型の拡張

TypeScriptを使用していて、マルチリモートオブジェクトからドライバーインスタンスに直接アクセスしたい場合は、マルチリモート型を拡張することもできます。例えば、次のケーパビリティが与えられている場合：

```ts title=wdio.conf.ts
export const config: WebdriverIO.MultiremoteConfig = {
    // ...
    capabilities: {
        myAppiumDriver: {
            // ...
        },
        myChromeDriver: {
            // ...
        }
    }
    // ...
}
```

カスタムドライバー名を追加して、マルチリモートインスタンスを拡張できます：

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

これで、次のようにドライバーに直接アクセスできます：

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```