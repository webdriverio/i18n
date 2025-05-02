---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) là một framework để xây dựng giao diện người dùng với tính năng phản ứng đơn giản và hiệu quả. Bạn có thể kiểm tra các component SolidJS trực tiếp trong trình duyệt thực tế bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner) của nó.

## Thiết lập

Để thiết lập WebdriverIO trong dự án SolidJS của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đảm bảo chọn `solid` làm preset trong tùy chọn runner của bạn, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Nếu bạn đã sử dụng [Vite](https://vitejs.dev/) làm máy chủ phát triển, bạn cũng có thể tái sử dụng cấu hình của mình trong `vite.config.ts` trong cấu hình WebdriverIO. Để biết thêm thông tin, xem `viteConfig` trong [tùy chọn runner](/docs/runner#runner-options).

:::

Preset SolidJS yêu cầu cài đặt `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Sau đó bạn có thể bắt đầu các bài kiểm tra bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Viết bài kiểm tra

Giả sử bạn có component SolidJS sau:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

Trong bài kiểm tra của bạn, sử dụng phương thức `render` từ `solid-js/web` để gắn component vào trang kiểm tra. Để tương tác với component, chúng tôi khuyên bạn nên sử dụng các lệnh WebdriverIO vì chúng hoạt động gần giống với tương tác người dùng thực tế, ví dụ:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Bạn có thể tìm thấy ví dụ đầy đủ về bộ kiểm tra component WebdriverIO cho SolidJS trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) của chúng tôi.