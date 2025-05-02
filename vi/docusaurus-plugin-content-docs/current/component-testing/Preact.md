---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) là một giải pháp thay thế nhanh chóng chỉ 3kB cho React với API hiện đại tương tự. Bạn có thể kiểm tra các component Preact trực tiếp trong một trình duyệt thực tế bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner) của nó.

## Thiết lập

Để thiết lập WebdriverIO trong dự án Preact của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đảm bảo chọn `preact` làm preset trong tùy chọn runner của bạn, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

Nếu bạn đã sử dụng [Vite](https://vitejs.dev/) làm máy chủ phát triển, bạn cũng có thể tái sử dụng cấu hình của mình trong `vite.config.ts` trong cấu hình WebdriverIO. Để biết thêm thông tin, xem `viteConfig` trong [tùy chọn runner](/docs/runner#runner-options).

:::

Preset Preact yêu cầu `@preact/preset-vite` được cài đặt. Chúng tôi cũng khuyên bạn nên sử dụng [Testing Library](https://testing-library.com/) để render component vào trang kiểm thử. Do đó, bạn cần cài đặt các phụ thuộc bổ sung sau:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Sau đó, bạn có thể bắt đầu kiểm thử bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Viết các bài kiểm thử

Giả sử bạn có component Preact sau:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

Trong bài kiểm thử của bạn, sử dụng phương thức `render` từ `@testing-library/preact` để gắn component vào trang kiểm thử. Để tương tác với component, chúng tôi khuyên bạn nên sử dụng các lệnh WebdriverIO vì chúng hoạt động gần hơn với tương tác người dùng thực tế, ví dụ:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

Bạn có thể tìm thấy một ví dụ đầy đủ về bộ kiểm thử component WebdriverIO cho Preact trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) của chúng tôi.