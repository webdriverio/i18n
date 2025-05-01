---
id: protractor-migration
title: Từ Protractor
---

Hướng dẫn này dành cho những người đang sử dụng Protractor và muốn chuyển đổi framework của họ sang WebdriverIO. Nó được khởi xướng sau khi nhóm Angular [đã thông báo](https://github.com/angular/protractor/issues/5502) rằng Protractor sẽ không còn được hỗ trợ nữa. WebdriverIO đã chịu ảnh hưởng bởi nhiều quyết định thiết kế của Protractor, điều này khiến nó có lẽ là framework gần nhất để chuyển đổi. Nhóm WebdriverIO đánh giá cao công việc của từng người đóng góp cho Protractor và hy vọng rằng hướng dẫn này sẽ giúp quá trình chuyển đổi sang WebdriverIO trở nên dễ dàng và đơn giản.

Mặc dù chúng tôi mong muốn có một quy trình tự động hoàn toàn cho việc này, nhưng thực tế thì khác. Mọi người đều có thiết lập khác nhau và sử dụng Protractor theo những cách khác nhau. Mỗi bước nên được xem như một hướng dẫn và ít giống với hướng dẫn từng bước. Nếu bạn gặp vấn đề với quá trình chuyển đổi, đừng ngần ngại [liên hệ với chúng tôi](https://github.com/webdriverio/codemod/discussions/new).

## Thiết lập

API của Protractor và WebdriverIO thực sự rất giống nhau, đến mức mà phần lớn các lệnh có thể được viết lại một cách tự động thông qua một [codemod](https://github.com/webdriverio/codemod).

Để cài đặt codemod, hãy chạy:

```sh
npm install jscodeshift @wdio/codemod
```

## Chiến lược

Có nhiều chiến lược chuyển đổi. Tùy thuộc vào quy mô của nhóm, số lượng tệp kiểm thử và sự cấp bách để chuyển đổi, bạn có thể thử chuyển đổi tất cả các bài kiểm thử cùng một lúc hoặc từng tệp một. Vì Protractor sẽ tiếp tục được duy trì cho đến Angular phiên bản 15 (cuối năm 2022), bạn vẫn còn đủ thời gian. Bạn có thể có các bài kiểm thử Protractor và WebdriverIO chạy cùng một lúc và bắt đầu viết các bài kiểm thử mới trong WebdriverIO. Dựa vào ngân sách thời gian của bạn, bạn có thể bắt đầu chuyển đổi các trường hợp kiểm thử quan trọng trước và làm dần xuống các bài kiểm thử mà bạn thậm chí có thể xóa.

## Đầu tiên là Tệp Cấu hình

Sau khi đã cài đặt codemod, chúng ta có thể bắt đầu chuyển đổi tệp đầu tiên. Trước tiên hãy xem qua [các tùy chọn cấu hình của WebdriverIO](configuration). Tệp cấu hình có thể trở nên rất phức tạp và có thể hợp lý nếu chỉ chuyển đổi các phần thiết yếu và xem phần còn lại có thể được thêm vào như thế nào khi các bài kiểm thử tương ứng cần một số tùy chọn nhất định đang được chuyển đổi.

Đối với lần chuyển đổi đầu tiên, chúng ta chỉ chuyển đổi tệp cấu hình và chạy:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Cấu hình của bạn có thể có tên khác, tuy nhiên nguyên tắc sẽ giống nhau: bắt đầu chuyển đổi cấu hình trước.

:::

## Cài đặt Các Phụ thuộc WebdriverIO

Bước tiếp theo là cấu hình một thiết lập WebdriverIO tối thiểu mà chúng ta bắt đầu xây dựng khi chúng ta chuyển đổi từ framework này sang framework khác. Đầu tiên chúng ta cài đặt WebdriverIO CLI qua:

```sh
npm install --save-dev @wdio/cli
```

Tiếp theo chúng ta chạy trình hướng dẫn cấu hình:

```sh
npx wdio config
```

Điều này sẽ hướng dẫn bạn qua một vài câu hỏi. Đối với kịch bản chuyển đổi này, bạn:
- chọn lựa chọn mặc định
- chúng tôi khuyên không nên tự động tạo các tệp ví dụ
- chọn một thư mục khác cho các tệp WebdriverIO
- và chọn Mocha thay vì Jasmine.

:::info Tại sao là Mocha?
Mặc dù bạn có thể đã sử dụng Protractor với Jasmine trước đây, nhưng Mocha cung cấp cơ chế thử lại tốt hơn. Lựa chọn là của bạn!
:::

Sau bảng câu hỏi nhỏ, trình hướng dẫn sẽ cài đặt tất cả các gói cần thiết và lưu trữ chúng trong `package.json` của bạn.

## Chuyển đổi Tệp Cấu hình

Sau khi chúng ta đã chuyển đổi `conf.ts` và có một `wdio.conf.ts` mới, bây giờ đã đến lúc chuyển đổi cấu hình từ cấu hình này sang cấu hình khác. Đảm bảo chỉ chuyển mã nguồn cần thiết cho tất cả các bài kiểm thử để có thể chạy. Trong của chúng tôi, chúng tôi chuyển hàm hook và thời gian chờ framework.

Bây giờ chúng ta sẽ tiếp tục chỉ với tệp `wdio.conf.ts` của chúng ta và do đó sẽ không cần bất kỳ thay đổi nào đối với cấu hình Protractor ban đầu nữa. Chúng ta có thể hoàn nguyên những thay đổi đó để cả hai framework có thể chạy song song với nhau và chúng ta có thể chuyển đổi từng tệp một.

## Chuyển đổi Tệp Kiểm thử

Bây giờ chúng ta đã sẵn sàng để chuyển đổi tệp kiểm thử đầu tiên. Để bắt đầu đơn giản, hãy bắt đầu với một tệp không có nhiều phụ thuộc vào các gói bên thứ 3 hoặc các tệp khác như PageObjects. Trong ví dụ của chúng tôi, tệp đầu tiên được chuyển đổi là `first-test.spec.ts`. Đầu tiên tạo thư mục mà cấu hình WebdriverIO mới mong đợi các tệp của nó và sau đó di chuyển nó:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Bây giờ hãy chuyển đổi tệp này:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

Thế là xong! Tệp này đơn giản đến mức chúng ta không cần bất kỳ thay đổi bổ sung nào nữa và có thể trực tiếp thử chạy WebdriverIO qua:

```sh
npx wdio run wdio.conf.ts
```

Chúc mừng 🥳 bạn vừa chuyển đổi tệp đầu tiên!

## Các Bước Tiếp theo

Từ điểm này, bạn tiếp tục chuyển đổi từng bài kiểm thử và từng đối tượng trang. Có khả năng codemod sẽ thất bại đối với một số tệp nhất định với lỗi như:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Đối với một số lệnh Protractor, chỉ đơn giản là không có sự thay thế cho nó trong WebdriverIO. Trong trường hợp này, codemod sẽ cung cấp cho bạn một số lời khuyên về cách tái cấu trúc nó. Nếu bạn gặp phải những thông báo lỗi như vậy quá thường xuyên, hãy thoải mái [tạo một issue](https://github.com/webdriverio/codemod/issues/new) và yêu cầu thêm một phép chuyển đổi nhất định. Mặc dù codemod đã chuyển đổi phần lớn API của Protractor, nhưng vẫn còn nhiều không gian để cải thiện.

## Kết luận

Chúng tôi hy vọng hướng dẫn này giúp bạn một chút trong quá trình chuyển đổi sang WebdriverIO. Cộng đồng tiếp tục cải thiện codemod trong khi kiểm tra nó với các nhóm khác nhau trong các tổ chức khác nhau. Đừng ngần ngại [tạo một issue](https://github.com/webdriverio/codemod/issues/new) nếu bạn có phản hồi hoặc [bắt đầu một cuộc thảo luận](https://github.com/webdriverio/codemod/discussions/new) nếu bạn gặp khó khăn trong quá trình chuyển đổi.