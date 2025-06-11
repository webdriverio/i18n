---
id: customcommands
title: Lệnh Tùy Chỉnh
---

Nếu bạn muốn mở rộng thể hiện `browser` với các lệnh riêng của bạn, phương thức `addCommand` của trình duyệt được cung cấp cho bạn. Bạn có thể viết lệnh của mình theo cách bất đồng bộ, giống như trong các thông số kỹ thuật của bạn.

## Tham số

### Tên Lệnh

Tên định nghĩa lệnh và sẽ được gắn vào phạm vi của trình duyệt hoặc phần tử.

Kiểu: `String`

### Hàm Tùy Chỉnh

Một hàm được thực thi khi lệnh được gọi. Phạm vi `this` là [`WebdriverIO.Browser`](/docs/api/browser) hoặc [`WebdriverIO.Element`](/docs/api/element) tùy thuộc vào việc lệnh được gắn vào phạm vi trình duyệt hay phần tử.

Kiểu: `Function`

### Phạm Vi Đích

Cờ để quyết định việc gắn lệnh vào phạm vi trình duyệt hay phần tử. Nếu được đặt thành `true`, lệnh sẽ là lệnh phần tử.

Kiểu: `Boolean`<br />
Mặc định: `false`

## Ví dụ

Ví dụ này cho thấy cách thêm một lệnh mới trả về URL hiện tại và tiêu đề như một kết quả. Phạm vi (`this`) là một đối tượng [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` refers to the `browser` scope
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Ngoài ra, bạn có thể mở rộng thể hiện phần tử với tập lệnh riêng của bạn, bằng cách truyền `true` làm đối số cuối cùng. Phạm vi (`this`) trong trường hợp này là một đối tượng [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` is return value of $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Lệnh tùy chỉnh cung cấp cho bạn cơ hội để gói một chuỗi lệnh cụ thể mà bạn thường xuyên sử dụng thành một lệnh gọi duy nhất. Bạn có thể định nghĩa lệnh tùy chỉnh tại bất kỳ điểm nào trong bộ kiểm thử của mình; chỉ cần đảm bảo rằng lệnh được định nghĩa *trước* khi nó được sử dụng lần đầu tiên. (Hook `before` trong tệp `wdio.conf.js` của bạn là một nơi tốt để tạo chúng.)

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

__Lưu ý:__ Nếu bạn đăng ký một lệnh tùy chỉnh vào phạm vi `browser`, lệnh sẽ không thể truy cập được đối với các phần tử. Tương tự, nếu bạn đăng ký một lệnh vào phạm vi phần tử, nó sẽ không thể truy cập được trong phạm vi `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // outputs "function"
console.log(typeof elem.myCustomBrowserCommand()) // outputs "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // outputs "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // outputs "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // outputs "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // outputs "2"
```

__Lưu ý:__ Nếu bạn cần chuỗi một lệnh tùy chỉnh, lệnh đó nên kết thúc bằng `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Hãy cẩn thận để không làm quá tải phạm vi `browser` với quá nhiều lệnh tùy chỉnh.

Chúng tôi khuyên bạn nên định nghĩa logic tùy chỉnh trong [page objects](pageobjects), để chúng được gắn với một trang cụ thể.

### Multiremote

`addCommand` hoạt động tương tự đối với multiremote, ngoại trừ việc lệnh mới sẽ được truyền xuống các thể hiện con. Bạn phải lưu ý khi sử dụng đối tượng `this` vì `browser` multiremote và các thể hiện con của nó có `this` khác nhau.

Ví dụ này cho thấy cách thêm một lệnh mới cho multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` refers to:
    //      - MultiRemoteBrowser scope for browser
    //      - Browser scope for instances
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

Với TypeScript, việc mở rộng các giao diện WebdriverIO rất dễ dàng. Thêm kiểu cho các lệnh tùy chỉnh của bạn như sau:

1. Tạo một tệp định nghĩa kiểu (ví dụ: `./src/types/wdio.d.ts`)
2. a. Nếu sử dụng tệp định nghĩa kiểu dạng module (sử dụng import/export và `declare global WebdriverIO` trong tệp định nghĩa kiểu), hãy đảm bảo bao gồm đường dẫn tệp trong thuộc tính `include` của `tsconfig.json`.

   b. Nếu sử dụng tệp định nghĩa kiểu dạng ambient (không có import/export trong tệp định nghĩa kiểu và `declare namespace WebdriverIO` cho các lệnh tùy chỉnh), hãy đảm bảo rằng `tsconfig.json` *không* chứa bất kỳ phần `include` nào, vì điều này sẽ khiến tất cả các tệp định nghĩa kiểu không được liệt kê trong phần `include` không được TypeScript nhận diện.

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

3. Thêm định nghĩa cho các lệnh của bạn theo chế độ thực thi của bạn.

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

Nếu bạn sử dụng các thư viện bên ngoài (ví dụ: để thực hiện các cuộc gọi cơ sở dữ liệu) hỗ trợ promise, một cách tiếp cận tốt để tích hợp chúng là bọc các phương thức API nhất định bằng một lệnh tùy chỉnh.

Khi trả về promise, WebdriverIO đảm bảo rằng nó không tiếp tục với lệnh tiếp theo cho đến khi promise được giải quyết. Nếu promise bị từ chối, lệnh sẽ đưa ra lỗi.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Sau đó, chỉ cần sử dụng nó trong các thông số kiểm thử WDIO của bạn:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // returns response body
})
```

**Lưu ý:** Kết quả của lệnh tùy chỉnh của bạn là kết quả của promise mà bạn trả về.

## Ghi đè lệnh

Bạn cũng có thể ghi đè các lệnh gốc bằng `overwriteCommand`.

Không khuyến khích làm điều này, vì nó có thể dẫn đến hành vi không thể đoán trước của framework!

Cách tiếp cận tổng thể tương tự với `addCommand`, sự khác biệt duy nhất là đối số đầu tiên trong hàm lệnh là hàm gốc mà bạn sắp ghi đè. Vui lòng xem một số ví dụ dưới đây.

### Ghi đè lệnh trình duyệt

```js
/**
 * Print milliseconds before pause and return its value.
 * 
 * @param pause - name of command to be overwritten
 * @param this of func - the original browser instance on which the function was called
 * @param originalPauseFunction of func - the original pause function
 * @param ms of func - the actual parameters passed
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// then use it as before
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Ghi đè lệnh phần tử

Ghi đè lệnh ở cấp phần tử gần như giống nhau. Chỉ cần truyền `true` làm đối số thứ ba cho `overwriteCommand`:

```js
/**
 * Attempt to scroll to element if it is not clickable.
 * Pass { force: true } to click with JS even if element is not visible or clickable.
 * Show that the original function argument type can be kept with `options?: ClickOptions`
 *
 * @param this of func - the element on which the original function was called
 * @param originalClickFunction of func - the original pause function
 * @param options of func - the actual parameters passed
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // attempt to click
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // scroll to element and click again
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // clicking with js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    true, // don't forget to pass `true` as 3rd argument
)

// then use it as before
const elem = await $('body')
await elem.click()

// or pass params
await elem.click({ force: true })
```

## Thêm lệnh WebDriver

Nếu bạn đang sử dụng giao thức WebDriver và chạy các bài kiểm tra trên một nền tảng hỗ trợ các lệnh bổ sung không được định nghĩa bởi bất kỳ định nghĩa giao thức nào trong [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), bạn có thể thêm chúng thủ công thông qua giao diện `addCommand`. Gói `webdriver` cung cấp một wrapper lệnh cho phép đăng ký các endpoint mới này theo cùng cách như các lệnh khác, cung cấp cùng kiểm tra tham số và xử lý lỗi. Để đăng ký endpoint mới này, hãy import command wrapper và đăng ký một lệnh mới với nó như sau:

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

Gọi lệnh này với các tham số không hợp lệ sẽ dẫn đến xử lý lỗi giống như các lệnh giao thức được định nghĩa trước, ví dụ:

```js
// call command without required url parameter and payload
await browser.myNewCommand()

/**
 * results in the following error:
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

Gọi lệnh đúng cách, ví dụ: `browser.myNewCommand('foo', 'bar')`, chính xác tạo ra một yêu cầu WebDriver đến ví dụ: `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` với payload như `{ foo: 'bar' }`.

:::note
Tham số url `:sessionId` sẽ tự động được thay thế bằng id phiên của phiên WebDriver. Các tham số url khác có thể được áp dụng nhưng cần được định nghĩa trong `variables`.
:::

Xem ví dụ về cách các lệnh giao thức có thể được định nghĩa trong gói [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).