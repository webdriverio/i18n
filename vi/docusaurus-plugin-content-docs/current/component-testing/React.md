---
id: react
title: React
---

[React](https://reactjs.org/) giúp việc tạo giao diện người dùng tương tác trở nên dễ dàng. Thiết kế các view đơn giản cho từng trạng thái trong ứng dụng của bạn, và React sẽ cập nhật và render một cách hiệu quả chỉ những component cần thiết khi dữ liệu thay đổi. Bạn có thể kiểm tra các component React trực tiếp trong một trình duyệt thực tế bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner).

## Setup

Để thiết lập WebdriverIO trong dự án React của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đảm bảo chọn `react` làm preset trong tùy chọn runner của bạn, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

Nếu bạn đã sử dụng [Vite](https://vitejs.dev/) làm máy chủ phát triển, bạn cũng có thể tái sử dụng cấu hình trong `vite.config.ts` trong cấu hình WebdriverIO của bạn. Để biết thêm thông tin, xem `viteConfig` trong [tùy chọn runner](/docs/runner#runner-options).

:::

Preset React yêu cầu `@vitejs/plugin-react` được cài đặt. Ngoài ra, chúng tôi khuyên bạn nên sử dụng [Testing Library](https://testing-library.com/) để render component vào trang kiểm thử. Do đó, bạn cần cài đặt các phụ thuộc bổ sung sau:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Sau đó, bạn có thể bắt đầu các bài kiểm tra bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Writing Tests

Giả sử bạn có component React sau:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

Trong bài kiểm tra của bạn, sử dụng phương thức `render` từ `@testing-library/react` để gắn component vào trang kiểm thử. Để tương tác với component, chúng tôi khuyên bạn nên sử dụng các lệnh WebdriverIO vì chúng hoạt động gần hơn với tương tác người dùng thực tế, ví dụ:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Bạn có thể tìm thấy một ví dụ đầy đủ về bộ kiểm tra component WebdriverIO cho React trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) của chúng tôi.