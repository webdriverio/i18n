---
id: lit
title: Lit
---

Lit là một thư viện đơn giản để xây dựng các web component nhanh và nhẹ. Việc kiểm thử các web component Lit với WebdriverIO rất dễ dàng nhờ vào [shadow DOM selectors](/docs/selectors#deep-selectors) của WebdriverIO, bạn có thể truy vấn các phần tử lồng nhau trong shadow root chỉ với một lệnh duy nhất.

## Thiết lập

Để thiết lập WebdriverIO trong dự án Lit của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đối với Lit, bạn không cần một preset vì các web component Lit không cần chạy qua trình biên dịch, chúng là các bổ sung web component thuần túy.

Sau khi thiết lập, bạn có thể bắt đầu các bài kiểm thử bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Viết các bài kiểm thử

Giả sử bạn có component Lit sau:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Để kiểm thử component, bạn phải render nó vào trang kiểm thử trước khi bài kiểm thử bắt đầu và đảm bảo nó được dọn dẹp sau đó:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

Bạn có thể tìm thấy một ví dụ đầy đủ về bộ kiểm thử component WebdriverIO cho Lit trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) của chúng tôi.