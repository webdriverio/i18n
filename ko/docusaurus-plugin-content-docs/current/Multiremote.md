---
id: multiremote
title: 멀티리모트
---

WebdriverIO는 단일 테스트에서 여러 자동화 세션을 실행할 수 있게 해줍니다. 이는 여러 사용자가 필요한 기능(예: 채팅이나 WebRTC 애플리케이션)을 테스트할 때 유용합니다.

각 인스턴스마다 [`newSession`](/docs/api/webdriver#newsession)이나 [`url`](/docs/api/browser/url)과 같은 공통 명령을 실행해야 하는 여러 원격 인스턴스를 생성하는 대신, **멀티리모트** 인스턴스를 간단히 생성하여 모든 브라우저를 동시에 제어할 수 있습니다.

이를 위해 `multiremote()` 함수를 사용하고, 이름이 키로 지정된 객체를 `capabilities`에 값으로 전달하면 됩니다. 각 기능에 이름을 부여함으로써 단일 인스턴스에서 명령을 실행할 때 해당 인스턴스를 쉽게 선택하고 접근할 수 있습니다.

:::info

멀티리모트는 모든 테스트를 병렬로 실행하기 위한 것이 _아닙니다_.
특수한 통합 테스트(예: 채팅 애플리케이션)를 위해 여러 브라우저 및/또는 모바일 장치를 조정하는 데 도움을 주기 위한 것입니다.

:::

모든 멀티리모트 인스턴스는 결과 배열을 반환합니다. 첫 번째 결과는 capability 객체에서 첫 번째로 정의된 기능을 나타내고, 두 번째 결과는 두 번째 기능을 나타내는 식입니다.

## 독립 실행 모드 사용하기

다음은 __독립 실행 모드__에서 멀티리모트 인스턴스를 생성하는 예시입니다:

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

## WDIO 테스트러너 사용하기

WDIO 테스트러너에서 멀티리모트를 사용하려면 `wdio.conf.js`에서 `capabilities` 객체를 브라우저 이름을 키로 하는 객체로 정의하면 됩니다(기능 목록 대신):

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

이렇게 하면 Chrome과 Firefox로 두 개의 WebDriver 세션이 생성됩니다. Chrome과 Firefox 대신에 [Appium](http://appium.io)을 사용하여 두 개의 모바일 장치를 부팅하거나, 하나의 모바일 장치와 하나의 브라우저를 부팅할 수도 있습니다.

브라우저 기능 객체를 배열에 넣어 멀티리모트를 병렬로 실행할 수도 있습니다. 각 모드를 구분하는 방법이기 때문에 각 브라우저에 `capabilities` 필드가 포함되어 있는지 확인하세요.

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

[클라우드 서비스 백엔드](https://webdriver.io/docs/cloudservices.html)를 로컬 Webdriver/Appium 또는 Selenium Standalone 인스턴스와 함께 부팅할 수도 있습니다. WebdriverIO는 브라우저 기능에 `bstack:options`([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options`([SauceLabs](https://webdriver.io/docs/sauce-service.html)) 또는 `tb:options`([TestingBot](https://webdriver.io/docs/testingbot-service.html)) 중 하나를 지정한 경우 클라우드 백엔드 기능을 자동으로 감지합니다.

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

여기서는 모든 종류의 OS/브라우저 조합이 가능합니다(모바일 및 데스크톱 브라우저 포함). 테스트에서 `browser` 변수를 통해 호출하는 모든 명령은 각 인스턴스와 병렬로 실행됩니다. 이는 통합 테스트를 간소화하고 실행 속도를 높이는 데 도움이 됩니다.

예를 들어, URL을 열 경우:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

각 명령의 결과는 브라우저 이름을 키로, 명령 결과를 값으로 하는 객체가 됩니다:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

각 명령은 하나씩 실행된다는 점에 유의하세요. 이는 모든 브라우저가 명령을 실행한 후에야 명령이 완료된다는 것을 의미합니다. 이는 브라우저 동작을 동기화시켜 현재 무슨 일이 일어나고 있는지 이해하기 쉽게 만듭니다.

때로는 무언가를 테스트하기 위해 각 브라우저에서 다른 작업을 수행해야 할 필요가 있습니다. 예를 들어, 채팅 애플리케이션을 테스트하는 경우, 한 브라우저가 텍스트 메시지를 보내는 동안 다른 브라우저는 그것을 받기를 기다린 다음 그에 대한 어설션을 실행해야 합니다.

WDIO 테스트러너를 사용하면 글로벌 스코프에 브라우저 이름과 해당 인스턴스를 등록합니다:

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

이 예시에서 `myFirefoxBrowser` 인스턴스는 `myChromeBrowser` 인스턴스가 `#send` 버튼을 클릭한 후 메시지가 도착하기를 기다리기 시작합니다.

멀티리모트는 여러 브라우저를 제어하는 것을 쉽고 편리하게 만들어줍니다. 브라우저들이 병렬로 같은 작업을 하게 하든, 조화롭게 다른 작업을 하게 하든 상관없습니다.

## 문자열을 통해 browser 객체에서 브라우저 인스턴스에 접근하기
글로벌 변수(예: `myChromeBrowser`, `myFirefoxBrowser`)를 통해 브라우저 인스턴스에 접근하는 것 외에도, `browser` 객체를 통해 접근할 수 있습니다. 예를 들어, `browser["myChromeBrowser"]` 또는 `browser["myFirefoxBrowser"]`와 같이 접근할 수 있습니다. `browser.instances`를 통해 모든 인스턴스 목록을 얻을 수 있습니다. 이는 어느 브라우저에서든 수행할 수 있는 재사용 가능한 테스트 단계를 작성할 때 특히 유용합니다. 예:

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

Cucumber 파일:
    ```feature
    When User A types a message into the chat
    ```

단계 정의 파일:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## TypeScript 타입 확장하기

TypeScript를 사용하고 있고 멀티리모트 객체에서 직접 드라이버 인스턴스에 접근하고 싶다면, 멀티리모트 타입을 확장할 수 있습니다. 예를 들어, 다음과 같은 기능이 있다면:

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

사용자 정의 드라이버 이름을 추가하여 멀티리모트 인스턴스를 확장할 수 있습니다. 예:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

이제 다음과 같이 드라이버에 직접 접근할 수 있습니다:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```