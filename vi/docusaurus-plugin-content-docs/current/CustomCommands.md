---
id: customcommands
title: Các Lệnh Tùy Chỉnh
---

Nếu bạn muốn mở rộng thực thể `browser` với bộ lệnh riêng của bạn, phương thức `addCommand` của trình duyệt có sẵn cho bạn. Bạn có thể viết lệnh của mình theo cách bất đồng bộ, giống như trong các đặc tả của bạn.

## Tham số

### Tên Lệnh

Tên định nghĩa lệnh và sẽ được gắn vào phạm vi trình duyệt hoặc phần tử.

Loại: `String`

### Hàm Tùy Chỉnh

Hàm được thực thi khi lệnh được gọi. Phạm vi `this` là [`WebdriverIO.Browser`](/docs/api/browser) hoặc [`WebdriverIO.Element`](/docs/api/element) tùy thuộc vào việc lệnh được gắn vào phạm vi trình duyệt hay phần tử.

Loại: `Function`

### Tùy chọn

Đối tượng với các tùy chọn cấu hình điều chỉnh hành vi lệnh tùy chỉnh

#### Phạm vi Mục tiêu

Cờ để quyết định liệu gắn lệnh vào phạm vi trình duyệt hay phần tử. Nếu đặt là `true`, lệnh sẽ là lệnh của phần tử.

Tên Tùy chọn: `attachToElement`
Loại: `Boolean`<br />
Mặc định: `false`

#### Vô hiệu hóa implicitWait

Cờ để quyết định liệu có đợi ngầm cho phần tử tồn tại trước khi gọi lệnh tùy chỉnh hay không.

Tên Tùy chọn: `disableElementImplicitWait`
Loại: `Boolean`<br />
Mặc định: `false`

## Ví dụ

Ví dụ này cho thấy cách thêm một lệnh mới trả về URL và tiêu đề hiện tại dưới dạng một kết quả. Phạm vi (`this`) là một đối tượng [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` ám chỉ đến phạm vi `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Ngoài ra, bạn có thể mở rộng thực thể phần tử với bộ lệnh riêng của bạn, bằng cách truyền `true` làm đối số cuối cùng. Phạm vi (`this`) trong trường hợp này là một đối tượng [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` là giá trị trả về của $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Theo mặc định, lệnh tùy chỉnh của phần tử sẽ đợi phần tử tồn tại trước khi gọi lệnh tùy chỉnh. Mặc dù hầu hết thời gian điều này là mong muốn, nếu không, nó có thể được vô hiệu hóa với `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` là giá trị trả về của $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Các lệnh tùy chỉnh cho phép bạn gom một chuỗi lệnh cụ thể mà bạn thường xuyên sử dụng thành một lần gọi duy nhất. Bạn có thể định nghĩa lệnh tùy chỉnh tại bất kỳ thời điểm nào trong bộ kiểm thử của bạn; chỉ cần đảm bảo rằng lệnh được định nghĩa *trước* khi nó được sử dụng lần đầu tiên. (Hook `before` trong tệp `wdio.conf.js` của bạn là một nơi tốt để tạo chúng.)

Sau khi đã định nghĩa, bạn có thể sử dụng chúng như sau:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Lưu ý:__ Nếu bạn đăng ký một lệnh tùy chỉnh cho phạm vi `browser`, lệnh đó sẽ không thể truy cập được cho các phần tử. Tương tự, nếu bạn đăng ký một lệnh cho phạm vi phần tử, nó sẽ không thể truy cập được trong phạm vi `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // xuất "function"
console.log(typeof elem.myCustomBrowserCommand()) // xuất "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // xuất "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // xuất "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // xuất "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // xuất "2"
```

__Lưu ý:__ Nếu bạn cần chuỗi một lệnh tùy chỉnh, lệnh nên kết thúc bằng `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Hãy cẩn thận để không làm quá tải phạm vi `browser` với quá nhiều lệnh tùy chỉnh.

Chúng tôi khuyên bạn nên định nghĩa logic tùy chỉnh trong [page objects](pageobjects), để chúng được gắn với một trang cụ thể.

### Multiremote

`addCommand` hoạt động tương tự cho multiremote, ngoại trừ việc lệnh mới sẽ được lan truyền xuống các thực thể con. Bạn phải chú ý khi sử dụng đối tượng `this` vì `browser` multiremote và các thực thể con của nó có `this` khác nhau.

Ví dụ này cho thấy cách thêm lệnh mới cho multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` ám chỉ đến:
    //      - Phạm vi MultiRemoteBrowser cho browser
    //      - Phạm vi Browser cho các thực thể
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Mở rộng định nghĩa kiểu

Với TypeScript, bạn có thể dễ dàng mở rộng các giao diện WebdriverIO. Thêm kiểu cho các lệnh tùy chỉnh của bạn như sau:

1. Tạo một tệp định nghĩa kiểu (ví dụ: `./src/types/wdio.d.ts`)
2. a. Nếu sử dụng tệp định nghĩa kiểu theo kiểu module (sử dụng import/export và `declare global WebdriverIO` trong tệp định nghĩa kiểu), hãy đảm bảo đường dẫn tệp được đưa vào thuộc tính `include` trong `tsconfig.json`.

   b. Nếu sử dụng tệp định nghĩa kiểu theo kiểu môi trường (không có import/export trong tệp định nghĩa kiểu và `declare namespace WebdriverIO` cho các lệnh tùy chỉnh), hãy đảm bảo `tsconfig.json` *không* chứa bất kỳ phần `include` nào, vì điều này sẽ khiến tất cả các tệp định nghĩa kiểu không được liệt kê trong phần `include` không được TypeScript nhận diện.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (sử dụng import/export)', value: 'modules'},
    {label: 'Định nghĩa kiểu môi trường (không có tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Thêm định nghĩa cho các lệnh của bạn theo chế độ thực thi của bạn.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (sử dụng import/export)', value: 'modules'},
    {label: 'Định nghĩa kiểu môi trường', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Tích hợp thư viện bên thứ 3

Nếu bạn sử dụng thư viện bên ngoài (ví dụ, để thực hiện các cuộc gọi cơ sở dữ liệu) hỗ trợ promises, một cách tiếp cận tốt để tích hợp chúng là gói gọn các phương thức API nhất định bằng một lệnh tùy chỉnh.

Khi trả về promise, WebdriverIO đảm bảo rằng nó không tiếp tục với lệnh tiếp theo cho đến khi promise được giải quyết. Nếu promise bị từ chối, lệnh sẽ ném ra lỗi.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Sau đó, chỉ cần sử dụng nó trong các thông số kiểm tra WDIO của bạn:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // trả về nội dung phản hồi
})
```

**Lưu ý:** Kết quả của lệnh tùy chỉnh của bạn chính là kết quả của promise mà bạn trả về.

## Ghi đè lệnh

Bạn cũng có thể ghi đè các lệnh gốc bằng `overwriteCommand`.

Không khuyến nghị làm điều này, vì nó có thể dẫn đến hành vi không thể dự đoán của framework!

Cách tiếp cận chung tương tự như `addCommand`, sự khác biệt duy nhất là đối số đầu tiên trong hàm lệnh là hàm gốc mà bạn đang ghi đè. Vui lòng xem một số ví dụ dưới đây.

### Ghi đè lệnh trình duyệt

```js
/**
 * In mili giây trước khi tạm dừng và trả về giá trị của nó.
 * 
 * @param pause - tên lệnh cần ghi đè
 * @param this của hàm - thực thể trình duyệt gốc mà hàm được gọi trên
 * @param originalPauseFunction của hàm - hàm tạm dừng gốc
 * @param ms của hàm - các tham số thực tế được truyền vào
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// sau đó sử dụng như trước
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Ghi đè lệnh phần tử

Ghi đè lệnh ở cấp phần tử gần như giống nhau. Chỉ cần truyền `true` làm đối số thứ ba cho `overwriteCommand`:

```js
/**
 * Cố gắng cuộn đến phần tử nếu nó không thể click được.
 * Truyền { force: true } để click với JS ngay cả khi phần tử không hiển thị hoặc không thể click được.
 * Hiển thị rằng kiểu đối số hàm gốc có thể được giữ nguyên với `options?: ClickOptions`
 *
 * @param this của hàm - phần tử mà hàm gốc được gọi
 * @param originalClickFunction của hàm - hàm pause gốc
 * @param options của hàm - các tham số thực tế được truyền vào
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // cố gắng click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // cuộn đến phần tử và click lại
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // click bằng js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Đừng quên gắn nó vào phần tử
)

// sau đó sử dụng như trước
const elem = await $('body')
await elem.click()

// hoặc truyền tham số
await elem.click({ force: true })
```

## Thêm nhiều lệnh WebDriver

Nếu bạn đang sử dụng giao thức WebDriver và chạy kiểm thử trên nền tảng hỗ trợ các lệnh bổ sung không được định nghĩa trong bất kỳ định nghĩa giao thức nào trong [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), bạn có thể thêm chúng thủ công thông qua giao diện `addCommand`. Gói `webdriver` cung cấp một bộ bao bọc lệnh cho phép đăng ký các endpoint mới này theo cùng cách như các lệnh khác, cung cấp cùng kiểm tra tham số và xử lý lỗi. Để đăng ký endpoint mới này, hãy nhập bộ bao bọc lệnh và đăng ký một lệnh mới với nó như sau:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Gọi lệnh này với tham số không hợp lệ sẽ dẫn đến xử lý lỗi giống như các lệnh giao thức định nghĩa trước, ví dụ:

```js
// gọi lệnh không có tham số url và payload bắt buộc
await browser.myNewCommand()

/**
 * kết quả lỗi như sau:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Gọi lệnh đúng cách, ví dụ `browser.myNewCommand('foo', 'bar')`, sẽ tạo ra một yêu cầu WebDriver chính xác đến, ví dụ, `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` với payload như `{ foo: 'bar' }`.

:::note
Tham số url `:sessionId` sẽ tự động được thay thế bằng ID phiên của phiên WebDriver. Các tham số url khác có thể được áp dụng nhưng cần được định nghĩa trong `variables`.
:::

Xem các ví dụ về cách định nghĩa các lệnh giao thức trong gói [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).