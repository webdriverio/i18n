---
id: setuptypes
title: Các loại thiết lập
---

WebdriverIO có thể được sử dụng cho nhiều mục đích khác nhau. Nó triển khai API giao thức WebDriver và có thể chạy trình duyệt một cách tự động. Framework này được thiết kế để hoạt động trong bất kỳ môi trường nào và cho bất kỳ nhiệm vụ nào. Nó độc lập với bất kỳ framework bên thứ 3 nào và chỉ yêu cầu Node.js để chạy.

## Protocol Bindings

Đối với các tương tác cơ bản với WebDriver và các giao thức tự động hóa khác, WebdriverIO sử dụng protocol bindings của riêng nó dựa trên gói NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Tất cả [lệnh giao thức](api/webdriver) trả về phản hồi thô từ trình điều khiển tự động hóa. Gói này rất nhẹ và __không__ có logic thông minh như auto-waits để đơn giản hóa tương tác với việc sử dụng giao thức.

Các lệnh giao thức áp dụng cho instance phụ thuộc vào phản hồi phiên ban đầu của trình điều khiển. Ví dụ, nếu phản hồi chỉ ra rằng một phiên di động đã được bắt đầu, gói sẽ áp dụng tất cả các lệnh giao thức Appium và Mobile JSON Wire vào nguyên mẫu instance.

Bạn có thể chạy cùng một tập hợp lệnh (ngoại trừ các lệnh di động) bằng cách sử dụng giao thức Chrome DevTools khi nhập gói NPM [`devtools`](https://www.npmjs.com/package/devtools). Nó có cùng giao diện với gói `webdriver` nhưng chạy tự động hóa của nó dựa trên [Puppeteer](https://pptr.dev/).

Để biết thêm thông tin về các giao diện gói này, hãy xem [Modules API](/docs/api/modules).

## Chế độ độc lập

Để đơn giản hóa tương tác với giao thức WebDriver, gói `webdriverio` triển khai nhiều lệnh bên trên giao thức (ví dụ: lệnh [`dragAndDrop`](api/element/dragAndDrop)) và các khái niệm cốt lõi như [bộ chọn thông minh](selectors) hoặc [auto-waits](autowait). Ví dụ từ trên có thể được đơn giản hóa như sau:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Sử dụng WebdriverIO trong chế độ độc lập vẫn cho phép bạn truy cập tất cả các lệnh giao thức nhưng cung cấp một tập hợp bổ sung các lệnh cho phép tương tác ở cấp độ cao hơn với trình duyệt. Nó cho phép bạn tích hợp công cụ tự động hóa này vào dự án (kiểm thử) của riêng bạn để tạo một thư viện tự động hóa mới. Các ví dụ phổ biến bao gồm [Oxygen](https://github.com/oxygenhq/oxygen) hoặc [CodeceptJS](http://codecept.io). Bạn cũng có thể viết các tập lệnh Node đơn giản để thu thập nội dung từ web (hoặc bất kỳ thứ gì khác cần một trình duyệt đang chạy).

Nếu không có tùy chọn cụ thể nào được đặt, WebdriverIO sẽ luôn cố gắng tải xuống và thiết lập trình điều khiển trình duyệt phù hợp với thuộc tính `browserName` trong capabilities của bạn. Trong trường hợp Chrome và Firefox, nó cũng có thể cài đặt chúng tùy thuộc vào việc nó có thể tìm thấy trình duyệt tương ứng trên máy hay không.

Để biết thêm thông tin về các giao diện gói `webdriverio`, hãy xem [Modules API](/docs/api/modules).

## WDIO Testrunner

Tuy nhiên, mục đích chính của WebdriverIO là kiểm thử end-to-end ở quy mô lớn. Do đó, chúng tôi đã triển khai một trình chạy kiểm thử giúp bạn xây dựng bộ kiểm thử đáng tin cậy, dễ đọc và bảo trì.

Trình chạy kiểm thử giải quyết nhiều vấn đề phổ biến khi làm việc với các thư viện tự động hóa thuần túy. Một mặt, nó tổ chức các lần chạy kiểm thử của bạn và chia các đặc tả kiểm thử để kiểm thử của bạn có thể được thực hiện với khả năng đồng thời tối đa. Nó cũng xử lý quản lý phiên và cung cấp nhiều tính năng để giúp bạn gỡ lỗi vấn đề và tìm lỗi trong các bài kiểm thử của mình.

Đây là cùng một ví dụ từ trên, được viết dưới dạng đặc tả kiểm thử và thực thi bởi WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Trình chạy kiểm thử là một sự trừu tượng hóa của các framework kiểm thử phổ biến như Mocha, Jasmine hoặc Cucumber. Để chạy kiểm thử của bạn bằng cách sử dụng trình chạy kiểm thử WDIO, hãy xem phần [Bắt đầu](gettingstarted) để biết thêm thông tin.

Để biết thêm thông tin về giao diện gói testrunner `@wdio/cli`, hãy xem [Modules API](/docs/api/modules).