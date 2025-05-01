---
id: modules
title: Các Module
---

WebdriverIO xuất bản nhiều module khác nhau lên NPM và các registry khác mà bạn có thể sử dụng để xây dựng framework tự động hóa của riêng mình. Xem thêm tài liệu về các loại thiết lập WebdriverIO [tại đây](/docs/setuptypes).

## `webdriver` và `devtools`

Các gói giao thức ([`webdriver`](https://www.npmjs.com/package/webdriver) và [`devtools`](https://www.npmjs.com/package/devtools)) cung cấp một lớp với các hàm tĩnh sau đây được đính kèm cho phép bạn khởi tạo các phiên:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Bắt đầu một phiên mới với các khả năng cụ thể. Dựa trên phản hồi phiên, các lệnh từ các giao thức khác nhau sẽ được cung cấp.

##### Tham số

- `options`: [Tùy chọn WebDriver](/docs/configuration#webdriver-options)
- `modifier`: hàm cho phép sửa đổi thể hiện client trước khi nó được trả về
- `userPrototype`: đối tượng thuộc tính cho phép mở rộng prototype của thể hiện
- `customCommandWrapper`: hàm cho phép bao bọc chức năng xung quanh các lệnh gọi hàm

##### Trả về

- Đối tượng [Browser](/docs/api/browser)

##### Ví dụ

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Gắn kết với một phiên WebDriver hoặc DevTools đang chạy.

##### Tham số

- `attachInstance`: thể hiện để gắn kết với một phiên hoặc ít nhất là một đối tượng với thuộc tính `sessionId` (ví dụ: `{ sessionId: 'xxx' }`)
- `modifier`: hàm cho phép sửa đổi thể hiện client trước khi nó được trả về
- `userPrototype`: đối tượng thuộc tính cho phép mở rộng prototype của thể hiện
- `customCommandWrapper`: hàm cho phép bao bọc chức năng xung quanh các lệnh gọi hàm

##### Trả về

- Đối tượng [Browser](/docs/api/browser)

##### Ví dụ

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Tải lại phiên với thể hiện đã cung cấp.

##### Tham số

- `instance`: thể hiện gói để tải lại

##### Ví dụ

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Tương tự như các gói giao thức (`webdriver` và `devtools`), bạn cũng có thể sử dụng API của gói WebdriverIO để quản lý các phiên. Các API có thể được import bằng cách sử dụng `import { remote, attach, multiremote } from 'webdriverio'` và chứa các chức năng sau:

#### `remote(options, modifier)`

Bắt đầu một phiên WebdriverIO. Thể hiện chứa tất cả các lệnh giống như gói giao thức nhưng với các hàm bậc cao hơn, xem [tài liệu API](/docs/api).

##### Tham số

- `options`: [Tùy chọn WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: hàm cho phép sửa đổi thể hiện client trước khi nó được trả về

##### Trả về

- Đối tượng [Browser](/docs/api/browser)

##### Ví dụ

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Gắn kết với một phiên WebdriverIO đang chạy.

##### Tham số

- `attachOptions`: thể hiện để gắn kết với một phiên hoặc ít nhất là một đối tượng với thuộc tính `sessionId` (ví dụ: `{ sessionId: 'xxx' }`)

##### Trả về

- Đối tượng [Browser](/docs/api/browser)

##### Ví dụ

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Khởi tạo một thể hiện multiremote cho phép bạn điều khiển nhiều phiên trong một thể hiện duy nhất. Xem các [ví dụ multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) của chúng tôi để biết các trường hợp sử dụng cụ thể.

##### Tham số

- `multiremoteOptions`: một đối tượng với các khóa đại diện cho tên trình duyệt và [Tùy chọn WebdriverIO](/docs/configuration#webdriverio) của chúng.

##### Trả về

- Đối tượng [Browser](/docs/api/browser)

##### Ví dụ

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Thay vì gọi lệnh `wdio`, bạn cũng có thể bao gồm test runner như một module và chạy nó trong một môi trường tùy ý. Để làm điều đó, bạn cần phải yêu cầu gói `@wdio/cli` dưới dạng module, như thế này:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Sau đó, tạo một thể hiện của launcher và chạy bài kiểm tra.

#### `Launcher(configPath, opts)`

Hàm tạo lớp `Launcher` mong đợi URL đến tệp cấu hình và một đối tượng `opts` với các cài đặt sẽ ghi đè lên các cài đặt trong tệp cấu hình.

##### Tham số

- `configPath`: đường dẫn đến `wdio.conf.js` để chạy
- `opts`: các đối số ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) để ghi đè các giá trị từ tệp cấu hình

##### Ví dụ

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

Lệnh `run` trả về một [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Nó được giải quyết nếu các bài kiểm tra chạy thành công hoặc thất bại, và nó bị từ chối nếu launcher không thể bắt đầu chạy các bài kiểm tra.

## `@wdio/browser-runner`

Khi chạy các bài kiểm tra đơn vị hoặc thành phần sử dụng [trình chạy trình duyệt](/docs/runner#browser-runner) của WebdriverIO, bạn có thể import các tiện ích mô phỏng cho các bài kiểm tra của mình, ví dụ:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Các export được đặt tên sau đây có sẵn:

#### `fn`

Hàm mô phỏng, xem thêm trong [tài liệu Vitest chính thức](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Hàm theo dõi, xem thêm trong [tài liệu Vitest chính thức](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Phương thức để mô phỏng tệp hoặc module phụ thuộc.

##### Tham số

- `moduleName`: đường dẫn tương đối đến tệp được mô phỏng hoặc tên module.
- `factory`: hàm để trả về giá trị được mô phỏng (tùy chọn)

##### Ví dụ

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Hủy mô phỏng phụ thuộc được định nghĩa trong thư mục mô phỏng thủ công (`__mocks__`).

##### Tham số

- `moduleName`: tên của module cần hủy mô phỏng.

##### Ví dụ

```js
unmock('lodash')
```