---
id: bamboo
title: Bamboo
---

WebdriverIO cung cấp một tích hợp chặt chẽ với các hệ thống CI như [Bamboo](https://www.atlassian.com/software/bamboo). Với trình báo cáo [JUnit](https://webdriver.io/docs/junit-reporter.html) hoặc [Allure](https://webdriver.io/docs/allure-reporter.html), bạn có thể dễ dàng gỡ lỗi cũng như theo dõi kết quả kiểm thử của mình. Việc tích hợp khá đơn giản.

1. Cài đặt trình báo cáo kiểm thử JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Cập nhật cấu hình của bạn để lưu kết quả JUnit ở nơi Bamboo có thể tìm thấy (và chỉ định trình báo cáo `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Lưu ý: *Luôn là một tiêu chuẩn tốt để giữ kết quả kiểm thử trong thư mục riêng biệt thay vì trong thư mục gốc.*

```js
// wdio.conf.js - Cho các bài kiểm thử chạy song song
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Các báo cáo sẽ tương tự cho tất cả các framework và bạn có thể sử dụng bất kỳ loại nào: Mocha, Jasmine hoặc Cucumber.

Đến thời điểm này, chúng tôi tin rằng bạn đã viết các bài kiểm thử và kết quả đã được tạo trong thư mục ```./testresults/```, và Bamboo của bạn đã được cài đặt và chạy.

## Tích hợp các bài kiểm thử của bạn vào Bamboo

1. Mở dự án Bamboo của bạn
    > Tạo một kế hoạch mới, liên kết kho lưu trữ của bạn (đảm bảo nó luôn trỏ đến phiên bản mới nhất của kho lưu trữ của bạn) và tạo các giai đoạn của bạn

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Tôi sẽ sử dụng giai đoạn và công việc mặc định. Trong trường hợp của bạn, bạn có thể tạo các giai đoạn và công việc riêng

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Mở công việc kiểm thử của bạn và tạo các nhiệm vụ để chạy các bài kiểm thử trong Bamboo
    >**Nhiệm vụ 1:** Kiểm tra mã nguồn

    >**Nhiệm vụ 2:** Chạy các bài kiểm thử của bạn ```npm i && npm run test```. Bạn có thể sử dụng nhiệm vụ *Script* và *Shell Interpreter* để chạy các lệnh trên (Điều này sẽ tạo ra kết quả kiểm thử và lưu chúng trong thư mục ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Nhiệm vụ: 3** Thêm nhiệm vụ *jUnit Parser* để phân tích kết quả kiểm thử đã lưu. Vui lòng chỉ định thư mục kết quả kiểm thử ở đây (bạn cũng có thể sử dụng kiểu mẫu Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Lưu ý: *Đảm bảo bạn đang giữ nhiệm vụ phân tích kết quả trong phần *Final*, để nó luôn được thực thi ngay cả khi nhiệm vụ kiểm thử của bạn thất bại*

    >**Nhiệm vụ: 4** (tùy chọn) Để đảm bảo rằng kết quả kiểm thử của bạn không bị xáo trộn với các tệp cũ, bạn có thể tạo một nhiệm vụ để xóa thư mục ```./testresults/``` sau khi phân tích thành công vào Bamboo. Bạn có thể thêm một tập lệnh shell như ```rm -f ./testresults/*.xml``` để xóa kết quả hoặc ```rm -r testresults``` để xóa toàn bộ thư mục

Sau khi hoàn thành *khoa học tên lửa* trên, vui lòng kích hoạt kế hoạch và chạy nó. Kết quả cuối cùng của bạn sẽ như sau:

## Kiểm thử thành công

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Kiểm thử thất bại

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Thất bại và đã sửa

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

Yay!! Thế là xong. Bạn đã tích hợp thành công các bài kiểm thử WebdriverIO trong Bamboo.