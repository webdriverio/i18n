---
id: customcommands
title: Lệnh Tùy Chỉnh
---

Nếu bạn muốn mở rộng thể hiện `browser` với bộ lệnh riêng của mình, phương thức `addCommand` của trình duyệt sẽ giúp bạn. Bạn có thể viết lệnh của mình theo cách không đồng bộ, giống như trong các thông số kỹ thuật của bạn.

## Tham số

### Tên Lệnh

Một tên định nghĩa lệnh và sẽ được đính kèm vào phạm vi của trình duyệt hoặc phần tử.

Kiểu: `String`

### Hàm Tùy Chỉnh

Một hàm được thực thi khi lệnh được gọi. Phạm vi `this` là [`WebdriverIO.Browser`](/docs/api/browser) hoặc [`WebdriverIO.Element`](/docs/api/element) tùy thuộc vào việc lệnh được đính kèm vào phạm vi trình duyệt hay phần tử.

Kiểu: `Function`

### Tùy chọn

Đối tượng với các tùy chọn cấu hình sửa đổi hành vi của lệnh tùy chỉnh

#### Phạm vi đích

Cờ để quyết định liệu có nên gắn lệnh vào phạm vi trình duyệt hay phạm vi phần tử. Nếu được đặt thành `true`, lệnh sẽ là lệnh cho phần tử.

Tên Tùy Chọn: `attachToElement`
Kiểu: `Boolean`<br />
Mặc định: `false`

#### Vô hiệu hóa implicitWait

Cờ để quyết định liệu có nên chờ ngầm định cho phần tử tồn tại trước khi gọi lệnh tùy chỉnh hay không.

Tên Tùy Chọn: `disableElementImplicitWait`
Kiểu: `Boolean`<br />
Mặc định: `false`

## Ví dụ

Ví dụ này cho thấy cách thêm một lệnh mới trả về URL hiện tại và tiêu đề dưới dạng một kết quả. Phạm vi (`this`) là một đối tượng [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` đề cập đến phạm vi `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Ngoài ra, bạn có thể mở rộng thể hiện phần tử với bộ lệnh riêng của mình, bằng cách truyền `true` làm đối số cuối cùng. Phạm vi (`this`) trong trường hợp này là một đối tượng [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` là giá trị trả về của $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Theo mặc định, các lệnh tùy chỉnh cho phần tử sẽ chờ phần tử tồn tại trước khi gọi lệnh tùy chỉnh. Mặc dù hầu hết thời gian điều này là mong muốn, nếu không, nó có thể bị vô hiệu hóa với `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` là giá trị trả về của $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Lệnh tùy chỉnh cho bạn cơ hội để gộp một chuỗi lệnh cụ thể mà bạn thường xuyên sử dụng thành một lần gọi. Bạn có thể định nghĩa các lệnh tùy chỉnh tại bất kỳ thời điểm nào trong bộ thử nghiệm của mình; chỉ cần đảm bảo rằng lệnh được định nghĩa *trước* khi sử dụng lần đầu tiên. (Hook `before` trong tệp `wdio.conf.js` của bạn là một nơi tốt để tạo chúng.)

Khi đã được định nghĩa, bạn có thể sử dụng chúng như sau:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Lưu ý:__ Nếu bạn đăng ký một lệnh tùy chỉnh cho phạm vi `browser`, lệnh sẽ không thể truy cập được cho các phần tử. Tương tự, nếu bạn đăng ký một lệnh cho phạm vi phần tử, nó sẽ không thể truy cập được trong phạm vi `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // xuất ra "function"
console.log(typeof elem.myCustomBrowserCommand()) // xuất ra "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // xuất ra "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // xuất ra "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // xuất ra "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // xuất ra "2"
```

__Lưu ý:__ Nếu bạn cần liên kết một lệnh tùy chỉnh, lệnh nên kết thúc bằng `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Hãy cẩn thận để không quá tải phạm vi `browser` với quá nhiều lệnh tùy chỉnh.

Chúng tôi khuyên bạn nên định nghĩa logic tùy chỉnh trong [page objects](pageobjects), để chúng gắn với một trang cụ thể.

### Multiremote

`addCommand` hoạt động tương tự đối với multiremote, ngoại trừ lệnh mới sẽ lan xuống các thể hiện con. Bạn phải cẩn thận khi sử dụng đối tượng `this` vì `browser` multiremote và các thể hiện con của nó có `this` khác nhau.

Ví dụ này cho thấy cách thêm một lệnh mới cho multiremote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` đề cập đến:
    //      - Phạm vi MultiRemoteBrowser cho trình duyệt
    //      - Phạm vi Browser cho các thể hiện
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Mở rộng định nghĩa kiểu

Với TypeScript, dễ dàng mở rộng các giao diện WebdriverIO. Thêm kiểu cho các lệnh tùy chỉnh của bạn như sau:

1. Tạo một tệp định nghĩa kiểu (ví dụ: `./src/types/wdio.d.ts`)
2. a. Nếu sử dụng tệp định nghĩa kiểu theo kiểu module (sử dụng import/export và `declare global WebdriverIO` trong tệp định nghĩa kiểu), hãy đảm bảo bao gồm đường dẫn tệp trong thuộc tính `include` của `tsconfig.json`.

   b. Nếu sử dụng các tệp định nghĩa kiểu theo kiểu môi trường xung quanh (không có import/export trong các tệp định nghĩa kiểu và `declare namespace WebdriverIO` cho các lệnh tùy chỉnh), hãy đảm bảo `tsconfig.json` *không* chứa bất kỳ phần `include` nào, vì điều này sẽ khiến tất cả các tệp định nghĩa kiểu không được liệt kê trong phần `include` không được TypeScript nhận diện.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
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

3. Thêm định nghĩa cho các lệnh của bạn theo chế độ thực thi.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
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

Nếu bạn sử dụng các thư viện bên ngoài (ví dụ: để thực hiện các cuộc gọi cơ sở dữ liệu) hỗ trợ promise, một cách tiếp cận tốt để tích hợp chúng là bao bọc các phương thức API nhất định bằng một lệnh tùy chỉnh.

Khi trả về promise, WebdriverIO đảm bảo rằng nó sẽ không tiếp tục với lệnh tiếp theo cho đến khi promise được giải quyết. Nếu promise bị từ chối, lệnh sẽ đưa ra lỗi.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Sau đó, chỉ cần sử dụng nó trong các thông số kỹ thuật WDIO của bạn:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // trả về phần thân phản hồi
})
```

**Lưu ý:** Kết quả của lệnh tùy chỉnh của bạn là kết quả của promise bạn trả về.

## Ghi đè lệnh

Bạn cũng có thể ghi đè các lệnh có sẵn với `overwriteCommand`.

Không khuyến khích làm điều này, vì nó có thể dẫn đến hành vi không thể đoán trước của framework!

Cách tiếp cận tổng thể tương tự như `addCommand`, sự khác biệt duy nhất là đối số đầu tiên trong hàm lệnh là hàm gốc mà bạn sắp ghi đè. Vui lòng xem một số ví dụ dưới đây.

### Ghi đè lệnh trình duyệt

```js
/**
 * In ra mili giây trước khi tạm dừng và trả về giá trị của nó.
 *
 * @param pause - tên của lệnh cần ghi đè
 * @param this của func - thể hiện trình duyệt gốc mà trên đó hàm được gọi
 * @param originalPauseFunction của func - hàm tạm dừng gốc
 * @param ms của func - các tham số thực tế được truyền vào
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// sau đó sử dụng nó như trước
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Ghi đè lệnh phần tử

Ghi đè lệnh ở cấp độ phần tử gần như giống nhau. Đơn giản là truyền `true` làm đối số thứ ba cho `overwriteCommand`:

```js
/**
 * Cố gắng cuộn đến phần tử nếu nó không thể nhấp vào được.
 * Truyền { force: true } để nhấp với JS ngay cả khi phần tử không hiển thị hoặc không thể nhấp.
 * Hiển thị rằng kiểu đối số hàm gốc có thể được giữ với `options?: ClickOptions`
 *
 * @param this của func - phần tử mà trên đó hàm gốc được gọi
 * @param originalClickFunction của func - hàm tạm dừng gốc
 * @param options của func - các tham số thực tế được truyền vào
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // cố gắng nhấp
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // cuộn đến phần tử và nhấp lại
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // nhấp bằng js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Đừng quên đính kèm nó vào phần tử
)

// sau đó sử dụng nó như trước
const elem = await $('body')
await elem.click()

// hoặc truyền tham số
await elem.click({ force: true })
```

## Thêm nhiều lệnh WebDriver

Nếu bạn đang sử dụng giao thức WebDriver và chạy các thử nghiệm trên một nền tảng hỗ trợ các lệnh bổ sung không được định nghĩa bởi bất kỳ định nghĩa giao thức nào trong [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), bạn có thể thêm chúng thủ công thông qua giao diện `addCommand`. Gói `webdriver` cung cấp một bộ bọc lệnh cho phép đăng ký các điểm cuối mới này theo cùng cách như các lệnh khác, cung cấp cùng kiểm tra tham số và xử lý lỗi. Để đăng ký điểm cuối mới này, hãy nhập bộ bọc lệnh và đăng ký một lệnh mới với nó như sau:

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

Gọi lệnh này với tham số không hợp lệ dẫn đến việc xử lý lỗi giống như các lệnh giao thức được định nghĩa trước đó, ví dụ:

```js
// gọi lệnh không có tham số url bắt buộc và payload
await browser.myNewCommand()

/**
 * dẫn đến lỗi sau:
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

Gọi lệnh một cách chính xác, ví dụ `browser.myNewCommand('foo', 'bar')`, chính xác thực hiện một yêu cầu WebDriver đến ví dụ `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` với payload như `{ foo: 'bar' }`.

:::note
Tham số url `:sessionId` sẽ tự động được thay thế bằng id phiên của phiên WebDriver. Tham số url khác có thể được áp dụng nhưng cần được định nghĩa trong `variables`.
:::

Xem các ví dụ về cách định nghĩa lệnh giao thức trong gói [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).