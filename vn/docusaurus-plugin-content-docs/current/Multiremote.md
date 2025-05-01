---
id: multiremote
title: Multiremote
---

WebdriverIO cho phép bạn chạy nhiều phiên tự động hóa trong một bài kiểm thử. Điều này trở nên hữu ích khi bạn đang kiểm thử các tính năng yêu cầu nhiều người dùng (ví dụ: ứng dụng chat hoặc WebRTC).

Thay vì tạo ra một vài phiên từ xa nơi bạn cần thực hiện các lệnh phổ biến như [`newSession`](/docs/api/webdriver#newsession) hoặc [`url`](/docs/api/browser/url) trên từng phiên, bạn có thể đơn giản tạo một phiên **multiremote** và điều khiển tất cả các trình duyệt cùng một lúc.

Để làm điều đó, chỉ cần sử dụng hàm `multiremote()`, và truyền vào một đối tượng với các tên được gắn với `capabilities` làm giá trị. Bằng cách đặt tên cho mỗi capability, bạn có thể dễ dàng chọn và truy cập vào phiên đơn đó khi thực thi lệnh trên một phiên đơn lẻ.

:::info

Multiremote _không_ nhằm mục đích thực thi tất cả các bài kiểm thử của bạn song song.
Nó được thiết kế để hỗ trợ phối hợp nhiều trình duyệt và/hoặc thiết bị di động cho các bài kiểm thử tích hợp đặc biệt (ví dụ: ứng dụng chat).

:::

Tất cả các phiên multiremote đều trả về một mảng kết quả. Kết quả đầu tiên đại diện cho capability được định nghĩa đầu tiên trong đối tượng capability, kết quả thứ hai cho capability thứ hai và cứ tiếp tục như vậy.

## Sử dụng Chế độ Độc lập

Đây là một ví dụ về cách tạo một phiên multiremote trong __chế độ độc lập__:

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

## Sử dụng WDIO Testrunner

Để sử dụng multiremote trong WDIO testrunner, chỉ cần định nghĩa đối tượng `capabilities` trong tệp `wdio.conf.js` của bạn dưới dạng một đối tượng với tên trình duyệt làm khóa (thay vì một danh sách capabilities):

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

Điều này sẽ tạo ra hai phiên WebDriver với Chrome và Firefox. Thay vì chỉ Chrome và Firefox, bạn cũng có thể khởi động hai thiết bị di động sử dụng [Appium](http://appium.io) hoặc một thiết bị di động và một trình duyệt.

Bạn cũng có thể chạy multiremote song song bằng cách đặt đối tượng khả năng trình duyệt trong một mảng. Vui lòng đảm bảo trường `capabilities` được bao gồm trong mỗi trình duyệt, vì đây là cách chúng tôi phân biệt từng chế độ.

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

Bạn thậm chí có thể khởi động một trong các [backend dịch vụ đám mây](https://webdriver.io/docs/cloudservices.html) cùng với các phiên Webdriver/Appium cục bộ, hoặc phiên Selenium Standalone. WebdriverIO tự động phát hiện khả năng của backend đám mây nếu bạn chỉ định một trong các `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), hoặc `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) trong khả năng trình duyệt.

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

Bất kỳ kết hợp OS/trình duyệt nào đều có thể thực hiện ở đây (bao gồm cả trình duyệt di động và máy tính để bàn). Tất cả các lệnh mà bài kiểm thử của bạn gọi qua biến `browser` đều được thực thi song song với mỗi phiên. Điều này giúp tối ưu hóa các bài kiểm thử tích hợp của bạn và tăng tốc quá trình thực thi.

Ví dụ, nếu bạn mở một URL:

```js
browser.url('https://socketio-chat-h9jt.herokuapp.com/')
```

Kết quả của mỗi lệnh sẽ là một đối tượng với tên trình duyệt làm khóa và kết quả lệnh làm giá trị, như sau:

```js
// wdio testrunner example
await browser.url('https://www.whatismybrowser.com')

const elem = await $('.string-major')
const result = await elem.getText()

console.log(result[0]) // returns: 'Chrome 40 on Mac OS X (Yosemite)'
console.log(result[1]) // returns: 'Firefox 35 on Mac OS X (Yosemite)'
```

Lưu ý rằng mỗi lệnh được thực thi từng cái một. Điều này có nghĩa là lệnh sẽ hoàn thành khi tất cả các trình duyệt đã thực thi nó. Điều này hữu ích vì nó giữ cho các hành động trình duyệt được đồng bộ, giúp dễ dàng hiểu những gì đang diễn ra hiện tại.

Đôi khi cần phải làm những việc khác nhau trong mỗi trình duyệt để kiểm thử điều gì đó. Ví dụ, nếu chúng ta muốn kiểm thử một ứng dụng chat, phải có một trình duyệt gửi tin nhắn văn bản trong khi trình duyệt khác chờ nhận và sau đó thực hiện xác nhận.

Khi sử dụng WDIO testrunner, nó đăng ký tên trình duyệt với các phiên tương ứng vào phạm vi toàn cục:

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

Trong ví dụ này, phiên `myFirefoxBrowser` sẽ bắt đầu chờ một tin nhắn khi phiên `myChromeBrowser` đã nhấp vào nút `#send`.

Multiremote giúp bạn dễ dàng và thuận tiện để kiểm soát nhiều trình duyệt, cho dù bạn muốn chúng thực hiện cùng một việc song song, hoặc những việc khác nhau phối hợp với nhau.

## Truy cập các phiên trình duyệt sử dụng chuỗi thông qua đối tượng browser
Ngoài việc truy cập phiên trình duyệt thông qua các biến toàn cục (ví dụ: `myChromeBrowser`, `myFirefoxBrowser`), bạn cũng có thể truy cập chúng thông qua đối tượng `browser`, ví dụ: `browser["myChromeBrowser"]` hoặc `browser["myFirefoxBrowser"]`. Bạn có thể lấy danh sách tất cả các phiên của mình qua `browser.instances`. Điều này đặc biệt hữu ích khi viết các bước kiểm thử có thể tái sử dụng có thể được thực hiện trên cả hai trình duyệt, ví dụ:

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

Tệp Cucumber:
    ```feature
    When User A types a message into the chat
    ```

Tệp định nghĩa bước:
```js
When(/^User (.) types a message into the chat/, async (userId) => {
    await browser.getInstance(`user${userId}`).$('#message').setValue('Hi, I am Chrome')
    await browser.getInstance(`user${userId}`).$('#send').click()
})
```

## Mở rộng kiểu TypeScript

Nếu bạn đang sử dụng TypeScript và muốn truy cập phiên driver trực tiếp từ đối tượng multiremote, bạn cũng có thể mở rộng các kiểu multiremote để làm điều đó. Ví dụ, với khả năng sau:

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

Bạn có thể mở rộng phiên multiremote bằng cách thêm tên driver tùy chỉnh của bạn, ví dụ:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Bây giờ bạn có thể truy cập các driver trực tiếp thông qua, ví dụ:

```ts
multiremotebrowser.myAppiumDriver.$$(...)
multiremotebrowser.myChromeDriver.$(...)
```