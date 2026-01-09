---
id: organizingsuites
title: Tổ Chức Bộ Kiểm Thử
---

Khi dự án phát triển, chắc chắn sẽ có nhiều kiểm thử tích hợp được thêm vào. Điều này làm tăng thời gian xây dựng và làm chậm năng suất.

Để ngăn chặn điều này, bạn nên chạy các bài kiểm thử của mình song song. WebdriverIO đã kiểm thử từng spec (hoặc _tệp tính năng_ trong Cucumber) song song trong một phiên duy nhất. Nhìn chung, hãy cố gắng chỉ kiểm thử một tính năng duy nhất cho mỗi tệp spec. Cố gắng không có quá nhiều hoặc quá ít bài kiểm thử trong một tệp. (Tuy nhiên, không có quy tắc vàng nào ở đây.)

Khi các bài kiểm thử của bạn có nhiều tệp spec, bạn nên bắt đầu chạy các bài kiểm thử đồng thời. Để làm như vậy, điều chỉnh thuộc tính `maxInstances` trong tệp cấu hình của bạn. WebdriverIO cho phép bạn chạy các bài kiểm thử với mức độ đồng thời tối đa—nghĩa là bất kể bạn có bao nhiêu tệp và bài kiểm thử, tất cả đều có thể chạy song song. (Điều này vẫn phụ thuộc vào một số giới hạn nhất định, như CPU của máy tính của bạn, hạn chế đồng thời, v.v.)

> Giả sử bạn có 3 khả năng khác nhau (Chrome, Firefox và Safari) và bạn đã đặt `maxInstances` thành `1`. Trình chạy thử nghiệm WDIO sẽ tạo ra 3 quy trình. Do đó, nếu bạn có 10 tệp spec và bạn đặt `maxInstances` thành `10`, _tất cả_ các tệp spec sẽ được kiểm thử đồng thời và 30 quy trình sẽ được tạo ra.

Bạn có thể định nghĩa thuộc tính `maxInstances` toàn cục để thiết lập thuộc tính cho tất cả các trình duyệt.

Nếu bạn chạy lưới WebDriver của riêng mình, bạn có thể (ví dụ) có nhiều khả năng cho một trình duyệt này hơn trình duyệt khác. Trong trường hợp đó, bạn có thể _giới hạn_ `maxInstances` trong đối tượng khả năng của bạn:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Kế thừa từ tệp cấu hình chính

Nếu bạn chạy bộ kiểm thử của mình trong nhiều môi trường (ví dụ: phát triển và tích hợp), việc sử dụng nhiều tệp cấu hình có thể giúp quản lý mọi thứ dễ dàng hơn.

Tương tự như [khái niệm đối tượng trang](pageobjects), điều đầu tiên bạn cần là một tệp cấu hình chính. Nó chứa tất cả các cấu hình bạn chia sẻ giữa các môi trường.

Sau đó tạo một tệp cấu hình khác cho mỗi môi trường, và bổ sung cấu hình chính với các cấu hình đặc trưng cho môi trường:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Nhóm các spec kiểm thử thành các bộ

Bạn có thể nhóm các spec kiểm thử thành các bộ và chạy các bộ cụ thể thay vì chạy tất cả.

Đầu tiên, định nghĩa các bộ của bạn trong cấu hình WDIO của bạn:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Bây giờ, nếu bạn chỉ muốn chạy một bộ duy nhất, bạn có thể truyền tên bộ dưới dạng đối số CLI:

```sh
wdio wdio.conf.js --suite login
```

Hoặc, chạy nhiều bộ cùng một lúc:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Nhóm các spec kiểm thử để chạy tuần tự

Như đã mô tả ở trên, có lợi ích trong việc chạy các bài kiểm thử đồng thời. Tuy nhiên, có những trường hợp mà việc nhóm các bài kiểm thử lại để chạy tuần tự trong một phiên duy nhất sẽ có lợi. Ví dụ về điều này chủ yếu là khi có chi phí thiết lập lớn, chẳng hạn như chuyển đổi mã hoặc cấp phép các phiên bản đám mây, nhưng cũng có các mô hình sử dụng nâng cao có lợi từ khả năng này.

Để nhóm các bài kiểm thử để chạy trong một phiên duy nhất, định nghĩa chúng như một mảng trong định nghĩa specs.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
Trong ví dụ trên, các bài kiểm thử 'test_login.js', 'test_product_order.js' và 'test_checkout.js' sẽ được chạy tuần tự trong một phiên duy nhất và mỗi bài kiểm thử "test_b*" sẽ chạy đồng thời trong các phiên riêng lẻ.

Cũng có thể nhóm các specs được định nghĩa trong các bộ, vì vậy bây giờ bạn cũng có thể định nghĩa các bộ như sau:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
và trong trường hợp này, tất cả các bài kiểm thử của bộ "end2end" sẽ được chạy trong một phiên duy nhất.

Khi chạy các bài kiểm thử tuần tự bằng cách sử dụng một mẫu, nó sẽ chạy các tệp spec theo thứ tự bảng chữ cái

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Điều này sẽ chạy các tệp phù hợp với mẫu trên theo thứ tự sau:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Chạy các bài kiểm thử đã chọn

Trong một số trường hợp, bạn có thể chỉ muốn thực hiện một bài kiểm thử duy nhất (hoặc một tập hợp con của các bài kiểm thử) của các bộ của bạn.

Với tham số `--spec`, bạn có thể chỉ định _bộ_ (Mocha, Jasmine) hoặc _tính năng_ (Cucumber) nào sẽ được chạy. Đường dẫn được giải quyết tương đối từ thư mục làm việc hiện tại của bạn.

Ví dụ, để chỉ chạy bài kiểm thử đăng nhập của bạn:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Hoặc chạy nhiều specs cùng một lúc:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Nếu giá trị `--spec` không trỏ đến một tệp spec cụ thể, nó sẽ được sử dụng để lọc tên tệp spec được định nghĩa trong cấu hình của bạn.

Để chạy tất cả các specs với từ "dialog" trong tên tệp spec, bạn có thể sử dụng:

```sh
wdio wdio.conf.js --spec dialog
```

Lưu ý rằng mỗi tệp kiểm thử được chạy trong một quy trình chạy thử nghiệm duy nhất. Vì chúng tôi không quét các tệp trước (xem phần tiếp theo để biết thông tin về việc chuyển tên tệp vào `wdio`), bạn _không thể_ sử dụng (ví dụ) `describe.only` ở đầu tệp spec của bạn để hướng dẫn Mocha chỉ chạy bộ đó.

Tính năng này sẽ giúp bạn đạt được mục tiêu tương tự.

Khi tùy chọn `--spec` được cung cấp, nó sẽ ghi đè lên bất kỳ mẫu nào được định nghĩa bởi tham số `specs` ở cấp cấu hình hoặc khả năng.

## Loại trừ các bài kiểm thử đã chọn

Khi cần thiết, nếu bạn cần loại trừ (các) tệp spec cụ thể khỏi lần chạy, bạn có thể sử dụng tham số `--exclude` (Mocha, Jasmine) hoặc tính năng (Cucumber).

Ví dụ, để loại trừ bài kiểm thử đăng nhập của bạn khỏi việc chạy thử nghiệm:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Hoặc, loại trừ nhiều tệp spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Hoặc, loại trừ một tệp spec khi lọc bằng cách sử dụng một bộ:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Nếu giá trị `--exclude` không trỏ đến một tệp spec cụ thể, nó sẽ được sử dụng để lọc tên tệp spec được định nghĩa trong cấu hình của bạn.

Để loại trừ tất cả các specs với từ "dialog" trong tên tệp spec, bạn có thể sử dụng:

```sh
wdio wdio.conf.js --exclude dialog
```

### Loại trừ một bộ hoàn chỉnh

Bạn cũng có thể loại trừ toàn bộ một bộ theo tên. Nếu giá trị loại trừ khớp với tên bộ được định nghĩa trong cấu hình của bạn và không giống như đường dẫn tệp, toàn bộ bộ sẽ bị bỏ qua:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Điều này sẽ chỉ chạy bộ `checkout`, bỏ qua toàn bộ bộ `login`.

Các loại trừ hỗn hợp (các bộ và mẫu spec) hoạt động như mong đợi:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

Trong ví dụ này, nếu `signup` là tên bộ đã định nghĩa, bộ đó sẽ bị loại trừ. Mẫu `dialog` sẽ lọc ra bất kỳ tệp spec nào chứa "dialog" trong tên tệp của chúng.

:::note
Nếu bạn chỉ định cả `--suite X` và `--exclude X`, việc loại trừ sẽ được ưu tiên và bộ `X` sẽ không chạy.
:::

Khi tùy chọn `--exclude` được cung cấp, nó sẽ ghi đè lên bất kỳ mẫu nào được định nghĩa bởi tham số `exclude` ở cấp cấu hình hoặc khả năng.

## Chạy các bộ và spec kiểm thử

Chạy toàn bộ bộ cùng với các spec riêng lẻ.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Chạy nhiều spec kiểm thử cụ thể

Đôi khi cần thiết&mdash;trong bối cảnh tích hợp liên tục và các trường hợp khác&mdash;phải chỉ định nhiều bộ spec để chạy. Tiện ích dòng lệnh `wdio` của WebdriverIO chấp nhận tên tệp được truyền qua đường ống (từ `find`, `grep`, hoặc các tiện ích khác).

Tên tệp được truyền qua đường ống sẽ ghi đè danh sách các mẫu glob hoặc tên tệp được chỉ định trong danh sách `spec` của cấu hình.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Lưu ý:** Điều này sẽ_ không _ghi đè cờ `--spec` để chạy một spec duy nhất._

## Chạy các bài kiểm thử cụ thể với MochaOpts

Bạn cũng có thể lọc `suite|describe` và/hoặc `it|test` cụ thể nào bạn muốn chạy bằng cách truyền đối số cụ thể của mocha: `--mochaOpts.grep` vào CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Lưu ý:** Mocha sẽ lọc các bài kiểm thử sau khi trình chạy thử nghiệm WDIO tạo ra các phiên bản, vì vậy bạn có thể thấy một số phiên bản được tạo ra nhưng không thực sự được thực thi._

## Loại trừ các bài kiểm thử cụ thể với MochaOpts

Bạn cũng có thể lọc `suite|describe` và/hoặc `it|test` cụ thể nào bạn muốn loại trừ bằng cách truyền đối số cụ thể của mocha: `--mochaOpts.invert` vào CLI wdio. `--mochaOpts.invert` thực hiện ngược lại với `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Lưu ý:** Mocha sẽ lọc các bài kiểm thử sau khi trình chạy thử nghiệm WDIO tạo ra các phiên bản, vì vậy bạn có thể thấy một số phiên bản được tạo ra nhưng không thực sự được thực thi._

## Dừng kiểm thử sau khi thất bại

Với tùy chọn `bail`, bạn có thể yêu cầu WebdriverIO dừng kiểm thử sau khi bất kỳ bài kiểm thử nào thất bại.

Điều này hữu ích với các bộ kiểm thử lớn khi bạn đã biết rằng bản dựng của bạn sẽ bị hỏng, nhưng bạn muốn tránh việc chờ đợi lâu dài của một lần chạy kiểm thử đầy đủ.

Tùy chọn `bail` mong đợi một số, chỉ định có bao nhiêu lần thất bại kiểm thử có thể xảy ra trước khi WebDriver dừng toàn bộ quá trình chạy kiểm thử. Mặc định là `0`, có nghĩa là nó luôn chạy tất cả các spec kiểm thử mà nó có thể tìm thấy.

Vui lòng xem [Trang tùy chọn](configuration) để biết thêm thông tin về cấu hình bail.
## Hệ thống phân cấp tùy chọn chạy

Khi khai báo những spec nào để chạy, có một hệ thống phân cấp nhất định xác định mẫu nào sẽ được ưu tiên. Hiện tại, nó hoạt động như sau, từ ưu tiên cao nhất đến thấp nhất:

> Đối số `--spec` của CLI > mẫu `specs` của khả năng > mẫu `specs` của cấu hình
> Đối số `--exclude` của CLI > mẫu `exclude` của cấu hình > mẫu `exclude` của khả năng

Nếu chỉ có tham số cấu hình được đưa ra, nó sẽ được sử dụng cho tất cả các khả năng. Tuy nhiên, nếu định nghĩa mẫu ở cấp độ khả năng, nó sẽ được sử dụng thay vì mẫu cấu hình. Cuối cùng, bất kỳ mẫu spec nào được định nghĩa trên dòng lệnh sẽ ghi đè tất cả các mẫu khác đã cho.

### Sử dụng các mẫu spec được định nghĩa bởi khả năng

Khi bạn định nghĩa một mẫu spec ở cấp độ khả năng, nó sẽ ghi đè bất kỳ mẫu nào được định nghĩa ở cấp độ cấu hình. Điều này hữu ích khi cần phải tách các bài kiểm thử dựa trên sự khác biệt về khả năng của thiết bị. Trong những trường hợp như thế này, việc sử dụng một mẫu spec chung ở cấp độ cấu hình, và các mẫu cụ thể hơn ở cấp độ khả năng sẽ hữu ích hơn.

Ví dụ, giả sử bạn có hai thư mục, một cho các bài kiểm thử Android và một cho các bài kiểm thử iOS.

Tệp cấu hình của bạn có thể định nghĩa mẫu như vậy, cho các bài kiểm thử thiết bị không cụ thể:

```js
{
    specs: ['tests/general/**/*.js']
}
```

nhưng sau đó, bạn sẽ có các khả năng khác nhau cho các thiết bị Android và iOS của bạn, trong đó các mẫu có thể trông như sau:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Nếu bạn yêu cầu cả hai khả năng này trong tệp cấu hình của mình, thì thiết bị Android sẽ chỉ chạy các bài kiểm thử dưới không gian tên "android", và các bài kiểm thử iOS sẽ chỉ chạy các bài kiểm thử dưới không gian tên "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```