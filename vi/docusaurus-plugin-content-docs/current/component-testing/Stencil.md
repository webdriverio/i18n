---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) là một thư viện để xây dựng các thư viện component có khả năng tái sử dụng và mở rộng. Bạn có thể kiểm tra các component Stencil trực tiếp trong trình duyệt thực tế bằng cách sử dụng WebdriverIO và [browser runner](/docs/runner#browser-runner) của nó.

## Cài đặt

Để thiết lập WebdriverIO trong dự án Stencil của bạn, hãy làm theo [hướng dẫn](/docs/component-testing#set-up) trong tài liệu kiểm thử component của chúng tôi. Đảm bảo chọn `stencil` làm preset trong tùy chọn runner của bạn, ví dụ:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

Trong trường hợp bạn sử dụng Stencil với một framework như React hoặc Vue, bạn nên giữ preset cho các framework đó.

:::

Sau đó bạn có thể bắt đầu các bài kiểm tra bằng cách chạy:

```sh
npx wdio run ./wdio.conf.ts
```

## Viết bài kiểm tra

Giả sử bạn có component Stencil sau đây:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

Trong bài kiểm tra của bạn, sử dụng phương thức `render` từ `@wdio/browser-runner/stencil` để gắn component vào trang kiểm tra. Để tương tác với component, chúng tôi khuyên bạn nên sử dụng các lệnh WebdriverIO vì chúng hoạt động gần hơn với tương tác người dùng thực tế, ví dụ:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Tùy chọn Render

Phương thức `render` cung cấp các tùy chọn sau:

##### `components`

Một mảng các component để kiểm tra. Các lớp component có thể được import vào tệp spec, sau đó tham chiếu của chúng nên được thêm vào mảng `component` để sử dụng trong suốt bài kiểm tra.

__Kiểu:__ `CustomElementConstructor[]`<br />
__Mặc định:__ `[]`

##### `flushQueue`

Nếu `false`, không xóa hàng đợi render trong thiết lập kiểm tra ban đầu.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `true`

##### `template`

JSX ban đầu được sử dụng để tạo bài kiểm tra. Sử dụng `template` khi bạn muốn khởi tạo một component bằng cách sử dụng thuộc tính của chúng, thay vì thuộc tính HTML. Nó sẽ render template đã chỉ định (JSX) vào `document.body`.

__Kiểu:__ `JSX.Template`

##### `html`

HTML ban đầu được sử dụng để tạo bài kiểm tra. Điều này có thể hữu ích để xây dựng một tập hợp các component làm việc cùng nhau, và gán các thuộc tính HTML.

__Kiểu:__ `string`

##### `language`

Đặt thuộc tính `lang` giả lập trên `<html>`.

__Kiểu:__ `string`

##### `autoApplyChanges`

Theo mặc định, bất kỳ thay đổi nào đối với thuộc tính và thuộc tính của component phải có `env.waitForChanges()` để kiểm tra các cập nhật. Tùy chọn, `autoApplyChanges` liên tục xóa hàng đợi trong nền.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `false`

##### `attachStyles`

Theo mặc định, các kiểu không được gắn vào DOM và chúng không được phản ánh trong HTML đã được tuần tự hóa. Đặt tùy chọn này thành `true` sẽ bao gồm các kiểu của component trong đầu ra có thể tuần tự hóa.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `false`

#### Môi trường Render

Phương thức `render` trả về một đối tượng môi trường cung cấp một số trợ giúp tiện ích để quản lý môi trường của component.

##### `flushAll`

Sau khi đã thực hiện các thay đổi đối với một component, chẳng hạn như cập nhật thuộc tính, trang kiểm tra không tự động áp dụng các thay đổi. Để đợi và áp dụng cập nhật, gọi `await flushAll()`

__Kiểu:__ `() => void`

##### `unmount`

Xóa phần tử container khỏi DOM.

__Kiểu:__ `() => void`

##### `styles`

Tất cả các kiểu được xác định bởi các component.

__Kiểu:__ `Record<string, string>`

##### `container`

Phần tử container trong đó template được render.

__Kiểu:__ `HTMLElement`

##### `$container`

Phần tử container dưới dạng phần tử WebdriverIO.

__Kiểu:__ `WebdriverIO.Element`

##### `root`

Component gốc của template.

__Kiểu:__ `HTMLElement`

##### `$root`

Component gốc dưới dạng phần tử WebdriverIO.

__Kiểu:__ `WebdriverIO.Element`

### `waitForChanges`

Phương thức trợ giúp để đợi component sẵn sàng.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Cập nhật phần tử

Nếu bạn định nghĩa các thuộc tính hoặc trạng thái trong component Stencil của mình, bạn phải quản lý khi nào những thay đổi này sẽ được áp dụng vào component để được render lại.


## Ví dụ

Bạn có thể tìm thấy một ví dụ đầy đủ về bộ kiểm tra component WebdriverIO cho Stencil trong [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) của chúng tôi.