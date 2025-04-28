---
id: multiremote
title: マルチリモート
---

WebdriverIOでは、1つのテスト内で複数の自動化セッションを実行することができます。これは、複数のユーザーを必要とする機能（例えば、チャットやWebRTCアプリケーション）をテストする際に便利です。

複数のリモートインスタンスを作成し、それぞれのインスタンスで[`newSession`](/docs/api/webdriver#newsession)や[`url`](/docs/api/browser/url)などの共通コマンドを実行する代わりに、**マルチリモート**インスタンスを作成して、すべてのブラウザを同時に制御することができます。

そのためには、`multiremote()`関数を使用し、名前を付けた`capabilities`オブジェクトを渡すだけです。各capabilityに名前を付けることで、単一のインスタンスでコマンドを実行する際に、その特定のインスタンスを簡単に選択してアクセスすることができます。

:::info

マルチリモートは、すべてのテストを並行して実行するためのものでは_ありません_。
特別な統合テスト（例：チャットアプリケーション）のために複数のブラウザやモバイルデバイスを連携させるためのものです。

:::

すべてのマルチリモートインスタンスは結果の配列を返します。最初の結果はcapabilityオブジェクトで最初に定義されたcapability、2番目の結果は2番目のcapability、というように対応しています。

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

    // 両方のブラウザで同時にURLを開く
    await browser.url('http://json.org')

    // 同時にコマンドを呼び出す
    const title = await browser.getTitle()
    expect(title).toEqual(['JSON', 'JSON'])

    // 同時に要素をクリック
    const elem = await browser.$('#someElem')
    await elem.click()

    // 1つのブラウザ（Firefox）でのみクリック
    await elem.getInstance('myFirefoxBrowser').click()
})()
```

## WDIOテストランナーの使用

WDIOテストランナーでマルチリモートを使用するには、`wdio.conf.js`の`capabilities`オブジェクトをcapabilitiesのリストの代わりに、ブラウザ名をキーとするオブジェクトとして定義するだけです：

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

ブラウザcapabilitiesオブジェクトを配列に入れることで、マルチリモートを並列で実行することもできます。各モードを区別するために、各ブラウザに`capabilities`フィールドを含めるようにしてください。

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

ローカルのWebdriver/AppiumやSelenium Standaloneインスタンスと一緒に[クラウドサービスバックエンド](https://webdriver.io/docs/cloudservices.html)のいずれかを起動することもできます。WebdriverIOは、ブラウザcapabilitiesに`bstack:options`（[Browserstack](https://webdriver.io/docs/browserstack-service.html)）、`sauce:options`（[SauceLabs](https://webdriver.io/docs/sauce-service.html)）、または`tb:options`（[TestingBot](https://webdriver.io/docs/testingbot-service.html)）のいずれかが指定されている場合、クラウドバックエンドcapabilitiesを自動的に検出します。

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

ここでは、あらゆる種類のOS/ブラウザの組み合わせが可能です（モバイルブラウザとデスクトップブラウザを含む）。テストが`browser`変数を通じて呼び出すすべてのコマンドは、各インスタンスで並行して実行されます。これにより、統合テストを効率化し、実行速度を向上させることができます。

例えば、URLを開く場合：

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

各コマンドの結果は、キーとしてブラウザ名、値としてコマンドの結果を持つオブジェクトになります：

```js
// wdioテストランナーの例
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // 返り値: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // 返り値: 'Firefox 35 on Mac OS X (Yosemite)'
```

各コマンドは1つずつ実行されることに注意してください。これは、すべてのブラウザがコマンドを実行した時点でコマンドが完了することを意味します。これにより、ブラウザのアクションが同期され、現在何が起こっているかを理解しやすくなります。

何かをテストするために、各ブラウザで異なることを行う必要がある場合があります。例えば、チャットアプリケーションをテストする場合、1つのブラウザがテキストメッセージを送信し、別のブラウザがそれを受信するのを待ってからアサーションを実行する必要があります。

WDIOテストランナーを使用する場合、ブラウザ名とそのインスタンスをグローバルスコープに登録します：

```js
const myChromeBrowser = browser.getInstance('myChromeBrowser')
await myChromeBrowser.$('#message').setValue('Hi, I am Chrome')
await myChromeBrowser.$('#send').click()

// メッセージが到着するまで待つ
await $('.messages').waitForExist()
// メッセージの1つにChromeのメッセージが含まれているか確認
assert.true(
    (
        await $$('.messages').map((m) => m.getText())
    ).includes('Hi, I am Chrome')
)
```

この例では、`myChromeBrowser`インスタンスが`#send`ボタンをクリックすると、`myFirefoxBrowser`インスタンスがメッセージを待ち始めます。

マルチリモートを使えば、複数のブラウザを並行して同じことをさせるか、協調して異なることをさせるかにかかわらず、簡単かつ便利に制御することができます。

## ブラウザオブジェクトを介して文字列を使用してブラウザインスタンスにアクセスする
グローバル変数（例：`myChromeBrowser`、`myFirefoxBrowser`）を介してブラウザインスタンスにアクセスするだけでなく、`browser`オブジェクトを介してもアクセスできます（例：`browser["myChromeBrowser"]`または`browser["myFirefoxBrowser"]`）。`browser.instances`を使用して、すべてのインスタンスのリストを取得できます。これは、どちらのブラウザでも実行できる再利用可能なテストステップを記述する場合に特に便利です：

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

## TypeScriptタイプの拡張

TypeScriptを使用していて、マルチリモートオブジェクトからドライバーインスタンスに直接アクセスしたい場合は、マルチリモートタイプを拡張することもできます。例えば、次のcapabilitiesがある場合：

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

カスタムドライバ名を追加してマルチリモートインスタンスを拡張できます：

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

これで、以下のようにドライバに直接アクセスできます：

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```