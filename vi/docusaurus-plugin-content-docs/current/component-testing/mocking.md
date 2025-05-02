---
id: mocking
title: Giả lập
---

Khi viết các bài kiểm thử, chỉ là vấn đề thời gian trước khi bạn cần tạo một phiên bản "giả" của một dịch vụ nội bộ — hoặc bên ngoài. Điều này thường được gọi là mocking (giả lập). WebdriverIO cung cấp các hàm tiện ích để giúp bạn. Bạn có thể `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` để truy cập chúng. Xem thêm thông tin về các tiện ích giả lập có sẵn trong [tài liệu API](/docs/api/modules#wdiobrowser-runner).

## Hàm

Để xác nhận liệu các hàm xử lý nhất định có được gọi như một phần của các bài kiểm thử thành phần của bạn, module `@wdio/browser-runner` xuất các công cụ giả lập nguyên thủy mà bạn có thể sử dụng để kiểm tra xem các hàm này có được gọi hay không. Bạn có thể nhập các phương thức này thông qua:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Bằng cách nhập `fn`, bạn có thể tạo một hàm spy (giả lập) để theo dõi quá trình thực thi của nó và với `spyOn` theo dõi một phương thức trên một đối tượng đã được tạo.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Ví dụ đầy đủ có thể được tìm thấy trong kho lưu trữ [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * verify the handler was called
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

Ví dụ đầy đủ có thể được tìm thấy trong thư mục [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO chỉ tái xuất [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) ở đây, đây là một spy implementation tương thích với Jest nhẹ có thể được sử dụng với các matcher [`expect`](/docs/api/expect-webdriverio) của WebdriverIO. Bạn có thể tìm thêm tài liệu về các hàm giả lập này trên [trang dự án Vitest](https://vitest.dev/api/mock.html).

Tất nhiên, bạn cũng có thể cài đặt và nhập bất kỳ framework spy nào khác, ví dụ như [SinonJS](https://sinonjs.org/), miễn là nó hỗ trợ môi trường trình duyệt.

## Modules

Giả lập các module cục bộ hoặc quan sát các thư viện bên thứ ba, được gọi trong một số mã khác, cho phép bạn kiểm tra đối số, đầu ra hoặc thậm chí khai báo lại cách thực hiện của chúng.

Có hai cách để giả lập hàm: Hoặc bằng cách tạo một hàm giả lập để sử dụng trong mã kiểm thử, hoặc viết một giả lập thủ công để ghi đè một phụ thuộc module.

### Giả lập Import File

Hãy tưởng tượng component của chúng ta đang import một phương thức tiện ích từ một file để xử lý sự kiện click.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

Trong component của chúng ta, trình xử lý click được sử dụng như sau:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Để giả lập `handleClick` từ `utils.js`, chúng ta có thể sử dụng phương thức `mock` trong bài kiểm thử của mình như sau:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### Giả lập Phụ thuộc

Giả sử chúng ta có một lớp lấy người dùng từ API của chúng ta. Lớp này sử dụng [`axios`](https://github.com/axios/axios) để gọi API sau đó trả về thuộc tính data chứa tất cả người dùng:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Bây giờ, để kiểm tra phương thức này mà không thực sự gọi API (và do đó tạo ra các bài kiểm thử chậm và dễ vỡ), chúng ta có thể sử dụng hàm `mock(...)` để tự động giả lập module axios.

Khi chúng ta giả lập module, chúng ta có thể cung cấp một [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) cho `.get` trả về dữ liệu mà chúng ta muốn bài kiểm thử của mình kiểm tra. Về bản chất, chúng ta đang nói rằng chúng ta muốn `axios.get('/users.json')` trả về một phản hồi giả.

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Partials

Các tập con của một module có thể được giả lập và phần còn lại của module có thể giữ nguyên cách thực hiện thực tế của chúng:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Module gốc sẽ được truyền vào nhà máy giả lập mà bạn có thể sử dụng để ví dụ như giả lập một phần phụ thuộc:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## Giả lập Thủ công

Giả lập thủ công được định nghĩa bằng cách viết một module trong thư mục con `__mocks__/` (xem thêm tùy chọn `automockDir`). Nếu module bạn đang giả lập là một module Node (ví dụ: `lodash`), thì giả lập nên được đặt trong thư mục `__mocks__` và sẽ được tự động giả lập. Không cần phải gọi rõ ràng `mock('module_name')`.

Các module có phạm vi (còn được gọi là các gói có phạm vi) có thể được giả lập bằng cách tạo một file trong cấu trúc thư mục khớp với tên của module có phạm vi. Ví dụ, để giả lập một module có phạm vi có tên `@scope/project-name`, hãy tạo một file tại `__mocks__/@scope/project-name.js`, tạo thư mục `@scope/` tương ứng.

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

Khi một giả lập thủ công tồn tại cho một module nhất định, WebdriverIO sẽ sử dụng module đó khi gọi rõ ràng `mock('moduleName')`. Tuy nhiên, khi automock được đặt thành true, thì cách triển khai giả lập thủ công sẽ được sử dụng thay vì giả lập được tạo tự động, ngay cả khi `mock('moduleName')` không được gọi. Để từ chối hành vi này, bạn sẽ cần phải gọi rõ ràng `unmock('moduleName')` trong các bài kiểm thử nên sử dụng cách triển khai module thực tế, ví dụ:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Để có thể giả lập hoạt động trong trình duyệt, WebdriverIO viết lại các file kiểm thử và nâng các lệnh gọi giả lập lên trên mọi thứ khác (xem thêm [bài đăng blog này](https://www.coolcomputerclub.com/posts/jest-hoist-await/) về vấn đề nâng trong Jest). Điều này giới hạn cách bạn có thể truyền biến vào bộ phân giải giả lập, ví dụ:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Để khắc phục điều này, bạn phải định nghĩa tất cả các biến được sử dụng bên trong bộ phân giải, ví dụ:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## Requests

Nếu bạn đang tìm kiếm cách giả lập các yêu cầu trình duyệt, ví dụ: các cuộc gọi API, hãy chuyển đến phần [Giả lập và Theo dõi Yêu cầu](/docs/mocksandspies).