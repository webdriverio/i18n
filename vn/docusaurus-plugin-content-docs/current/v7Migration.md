---
id: v7-migration
title: Từ v6 đến v7
---

Hướng dẫn này dành cho những người vẫn đang sử dụng `v6` của WebdriverIO và muốn chuyển đổi sang `v7`. Như đã đề cập trong [bài viết phát hành](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released) của chúng tôi, những thay đổi chủ yếu là bên dưới và việc nâng cấp sẽ là một quá trình khá đơn giản.

:::info

Nếu bạn đang sử dụng WebdriverIO `v5` hoặc thấp hơn, vui lòng nâng cấp lên `v6` trước. Hãy xem [hướng dẫn chuyển đổi v6](v6-migration) của chúng tôi.

:::

Mặc dù chúng tôi mong muốn có một quy trình tự động hoàn toàn cho việc này nhưng thực tế lại khác. Mỗi người có một cách thiết lập khác nhau. Mỗi bước nên được xem như một hướng dẫn và ít giống như hướng dẫn từng bước. Nếu bạn gặp vấn đề với việc chuyển đổi, đừng ngần ngại [liên hệ với chúng tôi](https://github.com/webdriverio/codemod/discussions/new).

## Thiết lập

Tương tự như các bản chuyển đổi khác, chúng ta có thể sử dụng [codemod](https://github.com/webdriverio/codemod) của WebdriverIO. Trong hướng dẫn này, chúng tôi sử dụng [dự án mẫu](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) được cung cấp bởi một thành viên cộng đồng và chuyển đổi hoàn toàn từ `v6` sang `v7`.

Để cài đặt codemod, hãy chạy:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Nâng cấp các Dependencies của WebdriverIO

Vì tất cả các phiên bản WebdriverIO đều liên kết với nhau nên tốt nhất là luôn nâng cấp lên một tag cụ thể, ví dụ: `latest`. Để làm điều đó, chúng ta sao chép tất cả các dependencies liên quan đến WebdriverIO từ `package.json` của chúng ta và cài đặt lại chúng thông qua:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Thông thường, các dependencies của WebdriverIO là một phần của dev dependencies, tùy thuộc vào dự án của bạn mà điều này có thể khác nhau. Sau bước này, `package.json` và `package-lock.json` của bạn sẽ được cập nhật. __Lưu ý:__ đây là các dependencies được sử dụng bởi [dự án mẫu](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), của bạn có thể khác.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Chuyển đổi tệp Cấu hình

Một bước đầu tiên tốt là bắt đầu với tệp cấu hình. Trong WebdriverIO `v7`, chúng ta không cần phải đăng ký thủ công bất kỳ trình biên dịch nào nữa. Thực tế, chúng cần được loại bỏ. Điều này có thể được thực hiện với codemod một cách tự động hoàn toàn:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Codemod chưa hỗ trợ các dự án TypeScript. Xem [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Chúng tôi đang nỗ lực triển khai hỗ trợ cho nó sớm. Nếu bạn đang sử dụng TypeScript, vui lòng tham gia!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Cập nhật Step Definitions

Nếu bạn đang sử dụng Jasmine hoặc Mocha, bạn đã hoàn thành phần này. Bước cuối cùng là cập nhật các import của Cucumber.js từ `cucumber` sang `@cucumber/cucumber`. Điều này cũng có thể được thực hiện thông qua codemod một cách tự động:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Vậy là xong! Không cần thêm thay đổi nào nữa 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Kết luận

Chúng tôi hy vọng hướng dẫn này giúp bạn một chút trong quá trình chuyển đổi sang WebdriverIO `v7`. Cộng đồng tiếp tục cải thiện codemod trong khi thử nghiệm nó với các nhóm khác nhau trong các tổ chức khác nhau. Đừng ngần ngại [báo cáo một vấn đề](https://github.com/webdriverio/codemod/issues/new) nếu bạn có phản hồi hoặc [bắt đầu một cuộc thảo luận](https://github.com/webdriverio/codemod/discussions/new) nếu bạn gặp khó khăn trong quá trình chuyển đổi.