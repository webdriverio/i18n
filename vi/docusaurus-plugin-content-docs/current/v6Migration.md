---
id: v6-migration
title: Từ v5 lên v6
---

Hướng dẫn này dành cho người vẫn đang sử dụng `v5` của WebdriverIO và muốn nâng cấp lên `v6` hoặc lên phiên bản mới nhất của WebdriverIO. Như đã đề cập trong [bài viết phát hành](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) của chúng tôi, những thay đổi cho việc nâng cấp phiên bản này có thể được tóm tắt như sau:

- chúng tôi đã hợp nhất các tham số cho một số lệnh (ví dụ: `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) và chuyển tất cả các tham số tùy chọn vào một đối tượng duy nhất, ví dụ:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- cấu hình cho các dịch vụ đã được chuyển vào danh sách dịch vụ, ví dụ:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- một số tùy chọn dịch vụ đã được đổi tên với mục đích đơn giản hóa
- chúng tôi đã đổi tên lệnh `launchApp` thành `launchChromeApp` cho các phiên WebDriver Chrome

:::info

Nếu bạn đang sử dụng WebdriverIO `v4` hoặc thấp hơn, vui lòng nâng cấp lên `v5` trước.

:::

Mặc dù chúng tôi muốn có một quy trình tự động hoàn toàn cho việc này, thực tế lại khác. Mỗi người có một cài đặt khác nhau. Mỗi bước nên được xem như một hướng dẫn và ít giống như hướng dẫn từng bước. Nếu bạn gặp vấn đề với việc di chuyển, đừng ngần ngại [liên hệ với chúng tôi](https://github.com/webdriverio/codemod/discussions/new).

## Thiết lập

Tương tự như các lần di chuyển khác, chúng ta có thể sử dụng WebdriverIO [codemod](https://github.com/webdriverio/codemod). Để cài đặt codemod, hãy chạy:

```sh
npm install jscodeshift @wdio/codemod
```

## Nâng cấp các gói phụ thuộc của WebdriverIO

Vì tất cả các phiên bản WebdriverIO đều gắn liền với nhau nên tốt nhất là luôn nâng cấp lên một tag cụ thể, ví dụ: `6.12.0`. Nếu bạn quyết định nâng cấp từ `v5` trực tiếp lên `v7`, bạn có thể bỏ qua tag và cài đặt các phiên bản mới nhất của tất cả các gói. Để làm điều đó, chúng ta sao chép tất cả các phụ thuộc liên quan đến WebdriverIO ra khỏi `package.json` và cài đặt lại chúng thông qua:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Thông thường, các phụ thuộc WebdriverIO là một phần của các phụ thuộc phát triển, tùy thuộc vào dự án của bạn, điều này có thể khác nhau. Sau việc này, `package.json` và `package-lock.json` của bạn sẽ được cập nhật. __Lưu ý:__ đây là các phụ thuộc ví dụ, của bạn có thể khác. Đảm bảo bạn tìm thấy phiên bản v6 mới nhất bằng cách gọi, ví dụ:

```sh
npm show webdriverio versions
```

Cố gắng cài đặt phiên bản 6 mới nhất có sẵn cho tất cả các gói WebdriverIO cốt lõi. Đối với các gói cộng đồng, điều này có thể khác nhau từ gói này sang gói khác. Ở đây, chúng tôi khuyên bạn nên kiểm tra changelog để biết thông tin về phiên bản nào vẫn tương thích với v6.

## Chuyển đổi tệp cấu hình

Một bước đầu tiên tốt là bắt đầu với tệp cấu hình. Tất cả các thay đổi đột phá có thể được giải quyết bằng cách sử dụng codemod một cách hoàn toàn tự động:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Codemod chưa hỗ trợ các dự án TypeScript. Xem [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Chúng tôi đang làm việc để triển khai hỗ trợ cho nó sớm. Nếu bạn đang sử dụng TypeScript, vui lòng tham gia!

:::

## Cập nhật các tệp Spec và Page Objects

Để cập nhật tất cả các thay đổi lệnh, hãy chạy codemod trên tất cả các tệp e2e của bạn có chứa lệnh WebdriverIO, ví dụ:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Thế là xong! Không cần thêm thay đổi nào nữa 🎉

## Kết luận

Chúng tôi hy vọng hướng dẫn này giúp bạn một chút trong quá trình di chuyển lên WebdriverIO `v6`. Chúng tôi khuyên bạn nên tiếp tục nâng cấp lên phiên bản mới nhất vì việc cập nhật lên `v7` là không đáng kể do hầu như không có thay đổi đột phá. Vui lòng xem hướng dẫn di chuyển [để nâng cấp lên v7](v7-migration).

Cộng đồng tiếp tục cải thiện codemod trong khi kiểm tra nó với các nhóm khác nhau trong các tổ chức khác nhau. Đừng ngần ngại [báo cáo vấn đề](https://github.com/webdriverio/codemod/issues/new) nếu bạn có phản hồi hoặc [bắt đầu một cuộc thảo luận](https://github.com/webdriverio/codemod/discussions/new) nếu bạn gặp khó khăn trong quá trình di chuyển.