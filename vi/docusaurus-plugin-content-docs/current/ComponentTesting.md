---
id: component-testing
title: Kiểm Tra Component
---

Với [Browser Runner](/docs/runner#browser-runner) của WebdriverIO, bạn có thể chạy các bài kiểm tra trong một trình duyệt desktop hoặc di động thực tế trong khi sử dụng WebdriverIO và giao thức WebDriver để tự động hóa và tương tác với những gì được hiển thị trên trang. Phương pháp này có [nhiều ưu điểm](/docs/runner#browser-runner) so với các framework kiểm tra khác chỉ cho phép kiểm tra trên [JSDOM](https://www.npmjs.com/package/jsdom).

## Nó hoạt động như thế nào?

Browser Runner sử dụng [Vite](https://vitejs.dev/) để hiển thị trang kiểm tra và khởi tạo một framework kiểm tra để chạy các bài kiểm tra của bạn trong trình duyệt. Hiện tại nó chỉ hỗ trợ Mocha nhưng Jasmine và Cucumber đang [trong kế hoạch phát triển](https://github.com/orgs/webdriverio/projects/1). Điều này cho phép kiểm tra bất kỳ loại component nào, ngay cả đối với các dự án không sử dụng Vite.

Máy chủ Vite được khởi động bởi testrunner của WebdriverIO và được cấu hình để bạn có thể sử dụng tất cả các reporter và service như khi bạn dùng cho các bài kiểm tra e2e thông thường. Hơn nữa, nó khởi tạo một phiên bản [`browser`](/docs/api/browser) cho phép bạn truy cập một tập con của [WebdriverIO API](/docs/api) để tương tác với bất kỳ phần tử nào trên trang. Tương tự như các bài kiểm tra e2e, bạn có thể truy cập phiên bản đó thông qua biến `browser` được gắn vào phạm vi toàn cục hoặc bằng cách import từ `@wdio/globals` tùy thuộc vào cách thiết lập [`injectGlobals`](/docs/api/globals).

WebdriverIO có hỗ trợ tích hợp sẵn cho các framework sau:

- [__Nuxt__](https://nuxt.com/): Testrunner của WebdriverIO phát hiện ứng dụng Nuxt và tự động thiết lập composables của dự án của bạn và giúp giả lập backend của Nuxt, đọc thêm trong [tài liệu Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Testrunner của WebdriverIO phát hiện nếu bạn đang sử dụng TailwindCSS và tải môi trường đúng cách vào trang kiểm tra

## Thiết lập

Để thiết lập WebdriverIO cho unit testing hoặc component testing trong trình duyệt, khởi tạo một dự án WebdriverIO mới thông qua:

```bash
npm init wdio@latest ./
# hoặc
yarn create wdio ./
```

Khi trình hướng dẫn cấu hình bắt đầu, chọn `browser` để chạy unit và component testing và chọn một trong các preset nếu muốn, nếu không thì chọn _"Other"_ nếu bạn chỉ muốn chạy các unit test cơ bản. Bạn cũng có thể cấu hình Vite tùy chỉnh nếu bạn đã sử dụng Vite trong dự án của mình. Để biết thêm thông tin, hãy xem tất cả [tùy chọn runner](/docs/runner#runner-options).

:::info

__Lưu ý:__ WebdriverIO mặc định sẽ chạy các kiểm tra trình duyệt trong CI ở chế độ headless, ví dụ: khi biến môi trường `CI` được đặt thành `'1'` hoặc `'true'`. Bạn có thể cấu hình thủ công hành vi này bằng tùy chọn [`headless`](/docs/runner#headless) cho runner.

:::

Cuối quá trình này, bạn sẽ tìm thấy file `wdio.conf.js` chứa các cấu hình WebdriverIO khác nhau, bao gồm thuộc tính `runner`, ví dụ:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Bằng cách định nghĩa các [capabilities](/docs/configuration#capabilities) khác nhau, bạn có thể chạy các bài kiểm tra trong các trình duyệt khác nhau, song song nếu muốn.

Nếu bạn vẫn chưa chắc chắn mọi thứ hoạt động như thế nào, hãy xem hướng dẫn sau về cách bắt đầu với Component Testing trong WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

Hoàn toàn tùy thuộc vào bạn muốn chạy gì trong các bài kiểm tra và cách bạn muốn hiển thị các component. Tuy nhiên, chúng tôi khuyên dùng [Testing Library](https://testing-library.com/) làm framework tiện ích vì nó cung cấp các plugin cho nhiều framework component khác nhau như React, Preact, Svelte và Vue. Nó rất hữu ích để hiển thị các component vào trang kiểm tra và tự động dọn dẹp các component này sau mỗi bài kiểm tra.

Bạn có thể kết hợp các thành phần cơ bản của Testing Library với các lệnh của WebdriverIO tùy ý, ví dụ:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Lưu ý:__ sử dụng các phương thức render từ Testing Library giúp xóa các component đã tạo giữa các bài kiểm tra. Nếu bạn không sử dụng Testing Library, hãy đảm bảo gắn các component kiểm tra của bạn vào một container được dọn dẹp giữa các bài kiểm tra.

## Script Thiết lập

Bạn có thể thiết lập các bài kiểm tra bằng cách chạy các script tùy ý trong Node.js hoặc trong trình duyệt, ví dụ: chèn styles, giả lập các API của trình duyệt hoặc kết nối với dịch vụ bên thứ 3. Các [hooks](/docs/configuration#hooks) của WebdriverIO có thể được sử dụng để chạy mã trong Node.js trong khi [`mochaOpts.require`](/docs/frameworks#require) cho phép bạn import các script vào trình duyệt trước khi các bài kiểm tra được tải, ví dụ:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // cung cấp script thiết lập để chạy trong trình duyệt
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // thiết lập môi trường kiểm tra trong Node.js
    }
    // ...
}
```

Ví dụ, nếu bạn muốn giả lập tất cả các cuộc gọi [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) trong bài kiểm tra của bạn với script thiết lập sau:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// chạy mã trước khi tất cả các bài kiểm tra được tải
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // chạy mã sau khi file kiểm tra được tải
}

export const mochaGlobalTeardown = () => {
    // chạy mã sau khi file spec được thực thi
}

```

Bây giờ trong các bài kiểm tra, bạn có thể cung cấp giá trị phản hồi tùy chỉnh cho tất cả các yêu cầu của trình duyệt. Đọc thêm về global fixtures trong [tài liệu Mocha](https://mochajs.org/#global-fixtures).

## Theo dõi File Kiểm tra và Ứng dụng

Có nhiều cách để bạn có thể gỡ lỗi các bài kiểm tra trình duyệt của mình. Cách đơn giản nhất là khởi động testrunner của WebdriverIO với cờ `--watch`, ví dụ:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Điều này sẽ chạy qua tất cả các bài kiểm tra ban đầu và dừng lại khi tất cả đã chạy xong. Sau đó, bạn có thể thay đổi các file riêng lẻ và chúng sẽ được chạy lại riêng lẻ. Nếu bạn đặt [`filesToWatch`](/docs/configuration#filestowatch) trỏ đến các file ứng dụng của bạn, nó sẽ chạy lại tất cả các bài kiểm tra khi có thay đổi đối với ứng dụng của bạn.

## Gỡ lỗi

Mặc dù (chưa) có thể đặt breakpoint trong IDE và được trình duyệt từ xa nhận ra, bạn có thể sử dụng lệnh [`debug`](/docs/api/browser/debug) để dừng bài kiểm tra tại bất kỳ điểm nào. Điều này cho phép bạn mở DevTools để gỡ lỗi bài kiểm tra bằng cách đặt breakpoint trong [tab sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Khi lệnh `debug` được gọi, bạn cũng sẽ nhận được một giao diện repl Node.js trong terminal của bạn, hiển thị:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Nhấn `Ctrl` hoặc `Command` + `c` hoặc nhập `.exit` để tiếp tục với bài kiểm tra.

## Chạy bằng Selenium Grid

Nếu bạn đã thiết lập [Selenium Grid](https://www.selenium.dev/documentation/grid/) và chạy trình duyệt của bạn thông qua grid đó, bạn phải đặt tùy chọn `host` của browser runner để cho phép trình duyệt truy cập đúng host nơi các file kiểm tra được phục vụ, ví dụ:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP mạng của máy chạy quy trình WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Điều này sẽ đảm bảo trình duyệt mở đúng phiên bản máy chủ được lưu trữ trên máy chạy các bài kiểm tra WebdriverIO.

## Ví dụ

Bạn có thể tìm thấy nhiều ví dụ về kiểm tra component bằng các framework component phổ biến trong [kho ví dụ](https://github.com/webdriverio/component-testing-examples) của chúng tôi.