---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) là một cách tiếp cận hoàn toàn mới để xây dựng giao diện người dùng. Trong khi các framework truyền thống như React và Vue thực hiện phần lớn công việc của chúng trong trình duyệt, Svelte chuyển công việc đó vào bước biên dịch diễn ra khi bạn xây dựng ứng dụng. Bạn có thể kiểm tra các thành phần Svelte trực tiếp trong một trình duyệt thực bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner) của nó.

## Thiết lập

Để thiết lập WebdriverIO trong dự án Svelte của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử thành phần của chúng tôi. Đảm bảo chọn `svelte` làm preset trong tùy chọn runner của bạn, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Nếu bạn đã đang sử dụng [Vite](https://vitejs.dev/) làm máy chủ phát triển, bạn cũng có thể tái sử dụng cấu hình của bạn trong `vite.config.ts` trong cấu hình WebdriverIO. Để biết thêm thông tin, xem `viteConfig` trong [tùy chọn runner](/docs/runner#runner-options).

:::

Preset Svelte yêu cầu `@sveltejs/vite-plugin-svelte` được cài đặt. Chúng tôi cũng khuyên bạn nên sử dụng [Testing Library](https://testing-library.com/) để render thành phần vào trang kiểm thử. Do đó, bạn cần cài đặt các gói phụ thuộc bổ sung sau:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Sau đó bạn có thể bắt đầu các bài kiểm tra bằng cách chạy:

```sh
npx wdio run ./wdio.conf.js
```

## Viết các bài kiểm tra

Giả sử bạn có thành phần Svelte sau:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

Trong bài kiểm tra của bạn, sử dụng phương thức `render` từ `@testing-library/svelte` để gắn thành phần vào trang kiểm tra. Để tương tác với thành phần, chúng tôi khuyên bạn nên sử dụng các lệnh WebdriverIO vì chúng hoạt động gần hơn với tương tác người dùng thực tế, ví dụ:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Bạn có thể tìm thấy một ví dụ đầy đủ về bộ kiểm tra thành phần WebdriverIO cho Svelte trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) của chúng tôi.