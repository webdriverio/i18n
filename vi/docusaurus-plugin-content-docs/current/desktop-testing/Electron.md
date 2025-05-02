---
id: electron
title: Electron
---

Electron là một framework để xây dựng các ứng dụng desktop sử dụng JavaScript, HTML, và CSS. Bằng cách nhúng Chromium và Node.js vào mã nhị phân của nó, Electron cho phép bạn duy trì một codebase JavaScript và tạo các ứng dụng đa nền tảng hoạt động trên Windows, macOS, và Linux — không cần kinh nghiệm phát triển native.

WebdriverIO cung cấp một dịch vụ tích hợp giúp đơn giản hóa việc tương tác với ứng dụng Electron của bạn và làm cho việc kiểm thử trở nên rất đơn giản. Những lợi ích của việc sử dụng WebdriverIO để kiểm thử ứng dụng Electron là:

- 🚗 tự thiết lập Chromedriver cần thiết
- 📦 tự động phát hiện đường dẫn của ứng dụng Electron - hỗ trợ [Electron Forge](https://www.electronforge.io/) và [Electron Builder](https://www.electron.build/)
- 🧩 truy cập các API Electron trong các bài kiểm thử của bạn
- 🕵️ giả lập các API Electron thông qua API giống Vitest

Bạn chỉ cần một vài bước đơn giản để bắt đầu. Xem video hướng dẫn từng bước đơn giản này từ kênh [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Hoặc làm theo hướng dẫn trong phần sau.

## Bắt đầu

Để khởi tạo một dự án WebdriverIO mới, chạy:

```sh
npm create wdio@latest ./
```

Một trình hướng dẫn cài đặt sẽ hướng dẫn bạn qua quá trình này. Đảm bảo bạn chọn _"Desktop Testing - of Electron Applications"_ khi nó hỏi bạn muốn làm loại kiểm thử nào. Sau đó cung cấp đường dẫn đến ứng dụng Electron đã biên dịch của bạn, ví dụ `./dist`, sau đó chỉ cần giữ các mặc định hoặc điều chỉnh theo sở thích của bạn.

Trình hướng dẫn cấu hình sẽ cài đặt tất cả các gói cần thiết và tạo một `wdio.conf.js` hoặc `wdio.conf.ts` với cấu hình cần thiết để kiểm thử ứng dụng của bạn. Nếu bạn đồng ý tự động tạo một số tệp kiểm thử, bạn có thể chạy bài kiểm thử đầu tiên của mình thông qua `npm run wdio`.

## Thiết lập thủ công

Nếu bạn đã sử dụng WebdriverIO trong dự án của mình, bạn có thể bỏ qua trình hướng dẫn cài đặt và chỉ cần thêm các phụ thuộc sau:

```sh
npm install --save-dev wdio-electron-service
```

Sau đó bạn có thể sử dụng cấu hình sau:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

Vậy là xong 🎉

Tìm hiểu thêm về cách [cấu hình Electron Service](/docs/desktop-testing/electron/configuration), [cách giả lập API Electron](/docs/desktop-testing/electron/mocking) và [cách truy cập API Electron](/docs/desktop-testing/electron/api).