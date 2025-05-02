---
id: protractor-migration
title: Từ Protractor
---

Hướng dẫn này dành cho những người đang sử dụng Protractor và muốn chuyển đổi framework của họ sang WebdriverIO. Nó được bắt đầu sau khi đội ngũ Angular [đã thông báo](https://github.com/angular/protractor/issues/5502) rằng Protractor sẽ không còn được hỗ trợ nữa. WebdriverIO đã bị ảnh hưởng bởi nhiều quyết định thiết kế của Protractor, đó là lý do tại sao nó có lẽ là framework gần nhất để chuyển đổi sang. Đội ngũ WebdriverIO đánh giá cao công việc của từng người đóng góp cho Protractor và hy vọng rằng hướng dẫn này giúp việc chuyển đổi sang WebdriverIO trở nên dễ dàng và đơn giản.

Mặc dù chúng tôi muốn có một quy trình tự động hoàn toàn cho việc này, nhưng thực tế lại khác. Mỗi người có một thiết lập khác nhau và sử dụng Protractor theo những cách khác nhau. Mỗi bước nên được xem như là hướng dẫn và ít giống như một hướng dẫn từng bước. Nếu bạn gặp vấn đề với việc chuyển đổi, đừng ngần ngại [liên hệ với chúng tôi](https://github.com/webdriverio/codemod/discussions/new).

## Thiết lập

API của Protractor và WebdriverIO thực sự rất giống nhau, đến mức mà phần lớn các lệnh có thể được viết lại một cách tự động thông qua [codemod](https://github.com/webdriverio/codemod).

Để cài đặt codemod, chạy:

```sh
npm install jscodeshift @wdio/codemod
```

## Chiến lược

Có nhiều chiến lược chuyển đổi. Tùy thuộc vào quy mô của nhóm, số lượng tệp kiểm thử và sự cấp bách để chuyển đổi, bạn có thể thử chuyển đổi tất cả các bài kiểm tra cùng một lúc hoặc từng tệp một. Với việc Protractor sẽ tiếp tục được duy trì cho đến phiên bản Angular 15 (cuối năm 2022), bạn vẫn còn đủ thời gian. Bạn có thể có các bài kiểm tra Protractor và WebdriverIO chạy cùng một lúc và bắt đầu viết các bài kiểm tra mới trong WebdriverIO. Với ngân sách thời gian của bạn, bạn có thể bắt đầu chuyển đổi các trường hợp kiểm tra quan trọng trước và làm theo cách của bạn để kiểm tra bạn thậm chí có thể xóa.

## Đầu tiên là tệp Cấu hình

Sau khi chúng ta đã cài đặt codemod, chúng ta có thể bắt đầu chuyển đổi tệp đầu tiên. Hãy xem xét trước vào [các tùy chọn cấu hình của WebdriverIO](configuration). Các tệp cấu hình có thể trở nên rất phức tạp và có thể hợp lý khi chỉ chuyển đổi các phần thiết yếu và xem phần còn lại có thể được thêm vào như thế nào khi các bài kiểm tra tương ứng cần các tùy chọn nhất định đang được chuyển đổi.

Đối với việc chuyển đổi đầu tiên, chúng ta chỉ chuyển đổi tệp cấu hình và chạy:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Cấu hình của bạn có thể được đặt tên khác nhau, tuy nhiên nguyên tắc phải giống nhau: bắt đầu chuyển đổi cấu hình trước.

:::

## Cài đặt các Phụ thuộc WebdriverIO

Bước tiếp theo là cấu hình một thiết lập WebdriverIO tối thiểu mà chúng ta bắt đầu xây dựng khi chúng ta chuyển đổi từ framework này sang framework khác. Đầu tiên, chúng ta cài đặt WebdriverIO CLI thông qua:

```sh
npm install --save-dev @wdio/cli
```

Tiếp theo, chúng ta chạy trình hướng dẫn cấu hình:

```sh
npx wdio config
```

Điều này sẽ hướng dẫn bạn qua một vài câu hỏi. Đối với kịch bản chuyển đổi này, bạn:
- chọn các lựa chọn mặc định
- chúng tôi khuyên không tự động tạo các tệp ví dụ
- chọn một thư mục khác cho các tệp WebdriverIO
- và chọn Mocha thay vì Jasmine.

:::info Tại sao lại chọn Mocha?
Mặc dù bạn có thể đã sử dụng Protractor với Jasmine trước đây, nhưng Mocha cung cấp cơ chế thử lại tốt hơn. Sự lựa chọn là của bạn!
:::

Sau các câu hỏi nhỏ, trình hướng dẫn sẽ cài đặt tất cả các gói cần thiết và lưu trữ chúng trong `package.json` của bạn.

## Chuyển đổi Tệp Cấu hình

Sau khi chúng ta có một `conf.ts` đã chuyển đổi và một `wdio.conf.ts` mới, bây giờ là lúc để chuyển đổi cấu hình từ cấu hình này sang cấu hình khác. Đảm bảo chỉ chuyển đổi mã cần thiết cho tất cả các bài kiểm tra có thể chạy. Trong trường hợp của chúng tôi, chúng tôi chuyển đổi hàm hook và thời gian chờ của framework.

Bây giờ chúng ta sẽ tiếp tục chỉ với tệp `wdio.conf.ts` của chúng ta và do đó không cần bất kỳ thay đổi nào đối với cấu hình Protractor ban đầu nữa. Chúng ta có thể hoàn nguyên những thay đổi đó để cả hai framework có thể chạy cạnh nhau và chúng ta có thể chuyển đổi một tệp tại một thời điểm.

## Chuyển đổi Tệp Kiểm tra

Chúng ta đã sẵn sàng để chuyển đổi tệp kiểm tra đầu tiên. Để bắt đầu đơn giản, hãy bắt đầu với tệp không có nhiều phụ thuộc vào các gói của bên thứ 3 hoặc các tệp khác như PageObjects. Trong ví dụ của chúng tôi, tệp đầu tiên để chuyển đổi là `first-test.spec.ts`. Đầu tiên tạo thư mục nơi cấu hình WebdriverIO mới mong đợi các tệp của nó và sau đó di chuyển nó:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Bây giờ hãy chuyển đổi tệp này:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Vậy là xong! Tệp này rất đơn giản đến mức chúng ta không cần bất kỳ thay đổi bổ sung nào nữa và có thể trực tiếp thử chạy WebdriverIO thông qua:

```sh
npx wdio run wdio.conf.ts
```

Chúc mừng 🥳 bạn vừa chuyển đổi tệp đầu tiên!

## Các Bước Tiếp theo

Từ điểm này, bạn tiếp tục chuyển đổi từng bài kiểm tra và từng page object. Có khả năng codemod sẽ thất bại đối với một số tệp nhất định với một lỗi như:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Đối với một số lệnh Protractor, không có sự thay thế trong WebdriverIO. Trong trường hợp này, codemod sẽ cung cấp cho bạn một số lời khuyên về cách tái cấu trúc nó. Nếu bạn gặp phải các thông báo lỗi như vậy quá thường xuyên, hãy thoải mái [tạo một vấn đề](https://github.com/webdriverio/codemod/issues/new) và yêu cầu thêm một chuyển đổi nhất định. Mặc dù codemod đã chuyển đổi phần lớn API của Protractor, nhưng vẫn còn rất nhiều cơ hội để cải thiện.

## Kết luận

Chúng tôi hy vọng hướng dẫn này sẽ giúp bạn một chút trong quá trình chuyển đổi sang WebdriverIO. Cộng đồng tiếp tục cải thiện codemod trong khi thử nghiệm nó với các đội ngũ khác nhau trong các tổ chức khác nhau. Đừng ngần ngại [tạo một vấn đề](https://github.com/webdriverio/codemod/issues/new) nếu bạn có phản hồi hoặc [bắt đầu một cuộc thảo luận](https://github.com/webdriverio/codemod/discussions/new) nếu bạn gặp khó khăn trong quá trình chuyển đổi.