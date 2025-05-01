---
id: gettingstarted
title: Bắt đầu
---

Chào mừng bạn đến với tài liệu WebdriverIO. Nó sẽ giúp bạn bắt đầu nhanh chóng. Nếu bạn gặp sự cố, bạn có thể tìm kiếm trợ giúp và câu trả lời trên [Máy chủ Hỗ trợ Discord](https://discord.webdriver.io) của chúng tôi hoặc bạn có thể liên hệ với tôi qua [Twitter](https://twitter.com/webdriverio).

:::info
Đây là tài liệu cho phiên bản mới nhất (__>=9.x__) của WebdriverIO. Nếu bạn vẫn đang sử dụng phiên bản cũ hơn, vui lòng truy cập [các trang web tài liệu cũ](/versions)!
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Kênh YouTube Chính thức 🎥

Bạn có thể tìm thấy nhiều video về WebdriverIO trên [kênh YouTube chính thức](https://youtube.com/@webdriverio). Hãy đảm bảo bạn đăng ký!

:::

## Khởi tạo một Cài đặt WebdriverIO

Để thêm cài đặt WebdriverIO đầy đủ vào một dự án hiện có hoặc mới bằng cách sử dụng [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), hãy chạy:

Nếu bạn đang ở thư mục gốc của một dự án hiện có, hãy chạy:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

hoặc nếu bạn muốn tạo một dự án mới:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

hoặc nếu bạn muốn tạo một dự án mới:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

hoặc nếu bạn muốn tạo một dự án mới:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

hoặc nếu bạn muốn tạo một dự án mới:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Lệnh này sẽ tải xuống công cụ CLI WebdriverIO và chạy một trình hướng dẫn cấu hình giúp bạn cấu hình bộ kiểm thử của mình.

<CreateProjectAnimation />

Trình hướng dẫn sẽ hiển thị một loạt câu hỏi hướng dẫn bạn qua quá trình thiết lập. Bạn có thể truyền tham số `--yes` để chọn thiết lập mặc định sử dụng Mocha với Chrome theo mẫu [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

## Cài đặt CLI theo cách thủ công

Bạn cũng có thể thêm gói CLI vào dự án của mình theo cách thủ công thông qua:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # in ra ví dụ: `8.13.10`

# chạy trình hướng dẫn cấu hình
npx wdio config
```

## Chạy Kiểm thử

Bạn có thể bắt đầu bộ kiểm thử bằng cách sử dụng lệnh `run` và trỏ đến cấu hình WebdriverIO mà bạn vừa tạo:

```sh
npx wdio run ./wdio.conf.js
```

Nếu bạn muốn chạy các tệp kiểm thử cụ thể, bạn có thể thêm tham số `--spec`:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

hoặc định nghĩa các bộ kiểm thử trong tệp cấu hình của bạn và chỉ chạy các tệp kiểm thử được định nghĩa trong một bộ:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Chạy trong một script

Nếu bạn muốn sử dụng WebdriverIO như một công cụ tự động hóa ở [Chế độ Độc lập](/docs/setuptypes#standalone-mode) trong một script Node.JS, bạn cũng có thể cài đặt WebdriverIO trực tiếp và sử dụng nó như một gói, ví dụ để tạo ảnh chụp màn hình của một trang web:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Lưu ý:__ tất cả các lệnh WebdriverIO đều bất đồng bộ và cần được xử lý đúng cách bằng [`async/await`](https://javascript.info/async-await).

## Ghi lại các bài kiểm thử

WebdriverIO cung cấp các công cụ để giúp bạn bắt đầu bằng cách ghi lại các hành động kiểm thử trên màn hình và tự động tạo các script kiểm thử WebdriverIO. Xem [Ghi lại bài kiểm thử với Chrome DevTools Recorder](/docs/record) để biết thêm thông tin.

## Yêu cầu Hệ thống

Bạn sẽ cần cài đặt [Node.js](http://nodejs.org).

- Cài đặt ít nhất v18.20.0 trở lên vì đây là phiên bản LTS hoạt động cũ nhất
- Chỉ các phiên bản hiện tại là LTS hoặc sẽ trở thành phiên bản LTS mới được hỗ trợ chính thức

Nếu Node hiện không được cài đặt trên hệ thống của bạn, chúng tôi đề xuất sử dụng công cụ như [NVM](https://github.com/creationix/nvm) hoặc [Volta](https://volta.sh/) để hỗ trợ quản lý nhiều phiên bản Node.js hoạt động. NVM là một lựa chọn phổ biến, trong khi Volta cũng là một lựa chọn tốt.