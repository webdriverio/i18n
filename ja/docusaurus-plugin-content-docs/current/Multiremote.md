---
id: multiremote
title: マルチリモート
---

WebdriverIOは、単一のテストで複数の自動化セッションを実行することができます。これは、複数のユーザーが必要な機能（例えば、チャットやWebRTCアプリケーション）をテストする際に便利です。

複数のリモートインスタンスを作成して、各インスタンスで[`newSession`](/docs/api/webdriver#newsession)や[`url`](/docs/api/browser/url)などの共通コマンドを実行する代わりに、**マルチリモート**インスタンスを作成して、すべてのブラウザを同時に制御することができます。

そのためには、`multiremote()`関数を使用し、名前を付けた`capabilities`をキーと値のオブジェクトとして渡します。各機能に名前を付けることで、単一のインスタンスでコマンドを実行する際に、その単一のインスタンスを簡単に選択してアクセスすることができます。

:::info

マルチリモートは、すべてのテストを並行して実行するためのものでは_ありません_。
特別な統合テスト（例：チャットアプリケーション）のために複数のブラウザやモバイルデバイスの調整を支援することを目的としています。

:::

すべてのマルチリモートインスタンスは結果の配列を返します。最初の結果はcapabilityオブジェクトで最初に定義された機能を表し、2番目の結果は2番目の機能を表し、以下同様です。

## スタンドアロンモードの使用

以下は__スタンドアロンモード__でマルチリモートインスタンスを作成する例です：

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

## WDIOテストランナーの使用

WDIOテストランナーでマルチリモートを使用するには、`wdio.conf.js`の`capabilities`オブジェクトをブラウザ名をキーとするオブジェクトとして定義するだけです（機能のリストの代わりに）：

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

ブラウザ機能オブジェクトを配列に入れることで、マルチリモートを並行して実行することもできます。各モードを区別するために、各ブラウザに`capabilities`フィールドが含まれていることを確認してください。

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

ローカルのWebdriver/AppiumまたはSelenium Standaloneインスタンスと一緒に[クラウドサービスバックエンド](https://webdriver.io/docs/cloudservices.html)の1つを起動することもできます。WebdriverIOは、ブラウザの機能に`bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）、または`tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)）のいずれかを指定した場合、クラウドバックエンド機能を自動的に検出します。

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

ここではあらゆる種類のOS/ブラウザの組み合わせが可能です（モバイルとデスクトップブラウザを含む）。テストが`browser`変数を通じて呼び出すすべてのコマンドは、各インスタンスで並行して実行されます。これにより、統合テストを合理化し、実行速度を向上させることができます。

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

各コマンドは一つずつ実行されることに注意してください。これは、すべてのブラウザがそのコマンドを実行し終えるとコマンドが完了することを意味します。これはブラウザの動作を同期させ、現在何が起きているのかを理解しやすくするのに役立ちます。

何かをテストするために、各ブラウザで異なることを行う必要がある場合があります。例えば、チャットアプリケーションをテストする場合、あるブラウザがテキストメッセージを送信し、別のブラウザがそれを受信するのを待ってから、それに対してアサーションを実行する必要があります。

WDIOテストランナーを使用する場合、ブラウザ名とそのインスタンスをグローバルスコープに登録します：

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

この例では、`myChromeBrowser`インスタンスが`#send`ボタンをクリックすると、`myFirefoxBrowser`インスタンスがメッセージを待ち始めます。

マルチリモートを使用すれば、複数のブラウザを同時に同じことをさせるか、あるいは連携して異なることをさせるかにかかわらず、複数のブラウザを簡単かつ便利に制御することができます。

## ブラウザオブジェクトを介して文字列を使用してブラウザインスタンスにアクセスする
グローバル変数（例：`myChromeBrowser`、`myFirefoxBrowser`）を介してブラウザインスタンスにアクセスするだけでなく、`browser`オブジェクトを介してアクセスすることもできます（例：`browser["myChromeBrowser"]`または`browser["myFirefoxBrowser"]`）。`browser.instances`を使用して、すべてのインスタンスのリストを取得できます。これは特に、どちらのブラウザでも実行できる再利用可能なテストステップを記述する場合に便利です：

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

## TypeScriptタイプの拡張

TypeScriptを使用していて、マルチリモートオブジェクトからドライバインスタンスに直接アクセスしたい場合は、マルチリモートタイプを拡張することもできます。例えば、次の機能があるとします：

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

カスタムドライバ名を追加して、マルチリモートインスタンスを拡張できます：

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

これで、ドライバに直接アクセスできるようになります：

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```