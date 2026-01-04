---
id: multiremote
title: Đa kết nối từ xa
---

WebdriverIO cho phép bạn chạy nhiều phiên tự động trong một bài kiểm tra. Điều này trở nên hữu ích khi bạn đang kiểm tra các tính năng yêu cầu nhiều người dùng (ví dụ: ứng dụng trò chuyện hoặc ứng dụng WebRTC).

Thay vì tạo một vài phiên từ xa mà bạn cần thực hiện các lệnh phổ biến như [`newSession`](/docs/api/webdriver#newsession) hoặc [`url`](/docs/api/browser/url) trên mỗi phiên, bạn có thể đơn giản tạo một phiên **đa kết nối từ xa** và kiểm soát tất cả các trình duyệt cùng một lúc.

Để làm điều đó, chỉ cần sử dụng hàm `multiremote()` và truyền vào một đối tượng với các tên được gán cho giá trị `capabilities`. Bằng cách đặt tên cho mỗi capability, bạn có thể dễ dàng chọn và truy cập phiên đơn lẻ đó khi thực hiện lệnh trên một phiên duy nhất.

:::info

Multiremote _không_ nhằm mục đích thực hiện tất cả các bài kiểm tra của bạn song song.
Nó được thiết kế để giúp điều phối nhiều trình duyệt và/hoặc thiết bị di động cho các bài kiểm tra tích hợp đặc biệt (ví dụ: ứng dụng trò chuyện).

:::

Tất cả các phiên đa kết nối từ xa trả về một mảng kết quả. Kết quả đầu tiên đại diện cho capability được định nghĩa đầu tiên trong đối tượng capability, kết quả thứ hai cho capability thứ hai và cứ tiếp tục như vậy.

## Sử dụng Chế độ Độc lập

Đây là ví dụ về cách tạo một phiên đa kết nối từ xa ở __chế độ độc lập__:

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

Để sử dụng đa kết nối từ xa trong WDIO testrunner, chỉ cần định nghĩa đối tượng `capabilities` trong tệp `wdio.conf.js` của bạn dưới dạng một đối tượng với tên trình duyệt làm khóa (thay vì một danh sách các capabilities):

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

Bạn cũng có thể chạy đa kết nối từ xa song song bằng cách đặt đối tượng capabilities trình duyệt vào một mảng. Hãy đảm bảo bao gồm trường `capabilities` trong mỗi trình duyệt, vì đây là cách chúng tôi phân biệt từng chế độ.

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

Bạn thậm chí có thể khởi động một trong các [dịch vụ đám mây backend](https://webdriver.io/docs/cloudservices.html) cùng với Webdriver/Appium cục bộ, hoặc phiên Selenium Standalone. WebdriverIO tự động phát hiện khả năng backend đám mây nếu bạn chỉ định một trong các tùy chọn `bstack:options` ([Browserstack](https://webdriver.io/docs/browserstack-service.html)), `sauce:options` ([SauceLabs](https://webdriver.io/docs/sauce-service.html)), hoặc `tb:options` ([TestingBot](https://webdriver.io/docs/testingbot-service.html)) trong khả năng trình duyệt.

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

Bất kỳ sự kết hợp hệ điều hành/trình duyệt nào đều có thể ở đây (bao gồm cả trình duyệt di động và máy tính để bàn). Tất cả các lệnh mà bài kiểm tra của bạn gọi thông qua biến `browser` đều được thực hiện song song với mỗi phiên. Điều này giúp hợp lý hóa các bài kiểm tra tích hợp và tăng tốc việc thực hiện chúng.

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

Lưu ý rằng mỗi lệnh được thực hiện lần lượt. Điều này có nghĩa là lệnh sẽ hoàn thành khi tất cả các trình duyệt đã thực hiện nó. Điều này rất hữu ích vì nó giữ cho các hành động trình duyệt đồng bộ, giúp dễ dàng hiểu những gì đang xảy ra.

Đôi khi, cần thiết phải làm những việc khác nhau trong mỗi trình duyệt để kiểm tra một tính năng. Ví dụ, nếu chúng ta muốn kiểm tra một ứng dụng trò chuyện, phải có một trình duyệt gửi tin nhắn văn bản trong khi trình duyệt khác chờ để nhận, sau đó thực hiện một assertion trên nó.

Khi sử dụng WDIO testrunner, nó đăng ký tên trình duyệt với các phiên của chúng vào phạm vi toàn cục:

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

Trong ví dụ này, phiên `myFirefoxBrowser` sẽ bắt đầu chờ đợi một tin nhắn sau khi phiên `myChromeBrowser` đã nhấp vào nút `#send`.

Đa kết nối từ xa giúp dễ dàng và thuận tiện để kiểm soát nhiều trình duyệt, cho dù bạn muốn chúng làm những việc giống nhau song song, hay những việc khác nhau phối hợp với nhau.

## Truy cập phiên trình duyệt bằng chuỗi thông qua đối tượng browser
Ngoài việc truy cập phiên trình duyệt thông qua biến toàn cục (ví dụ: `myChromeBrowser`, `myFirefoxBrowser`), bạn cũng có thể truy cập chúng thông qua đối tượng `browser`, ví dụ: `browser["myChromeBrowser"]` hoặc `browser["myFirefoxBrowser"]`. Bạn có thể lấy danh sách tất cả các phiên qua `browser.instances`. Điều này đặc biệt hữu ích khi viết các bước kiểm tra có thể tái sử dụng có thể thực hiện trong cả hai trình duyệt, ví dụ:

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

## Mở rộng TypeScript Types

Nếu bạn đang sử dụng TypeScript và muốn truy cập phiên driver trực tiếp từ đối tượng multiremote, bạn cũng có thể mở rộng các kiểu multiremote để làm điều đó. Ví dụ, với capabilities sau:

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

Bạn có thể mở rộng phiên multiremote bằng cách thêm tên driver tùy chỉnh, ví dụ:

```ts title=wdio.d.ts
declare namespace WebdriverIO {
    interface MultiRemoteBrowser {
        myAppiumDriver: WebdriverIO.Browser
        myChromeDriver: WebdriverIO.Browser
    }
}
```

Bây giờ bạn có thể truy cập các driver trực tiếp, ví dụ:

```ts
multiRemoteBrowser.myAppiumDriver.$$(...)
multiRemoteBrowser.myChromeDriver.$(...)
```