---
id: customreporter
title: Trình báo cáo tùy chỉnh
---

Bạn có thể viết trình báo cáo tùy chỉnh riêng cho trình chạy kiểm thử WDIO được điều chỉnh theo nhu cầu của bạn. Và nó rất dễ dàng!

Tất cả những gì bạn cần làm là tạo một module node kế thừa từ gói `@wdio/reporter`, để nó có thể nhận các thông điệp từ bài kiểm thử.

Thiết lập cơ bản nên trông như sau:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * mặc định cấu hình để trình báo cáo ghi ra luồng đầu ra
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Để sử dụng trình báo cáo này, tất cả những gì bạn cần làm là gán nó cho thuộc tính `reporter` trong cấu hình của bạn.


Tệp `wdio.conf.js` của bạn nên trông như thế này:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * sử dụng lớp trình báo cáo đã nhập
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * sử dụng đường dẫn tuyệt đối đến trình báo cáo
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Bạn cũng có thể xuất bản trình báo cáo lên NPM để mọi người có thể sử dụng. Đặt tên gói theo cấu trúc như các trình báo cáo khác `wdio-<reportername>-reporter`, và gắn thẻ với các từ khóa như `wdio` hoặc `wdio-reporter`.

## Xử lý sự kiện

Bạn có thể đăng ký một trình xử lý sự kiện cho nhiều sự kiện khác nhau được kích hoạt trong quá trình kiểm thử. Tất cả các trình xử lý sau đây sẽ nhận các payload với thông tin hữu ích về trạng thái và tiến trình hiện tại.

Cấu trúc của các đối tượng payload này phụ thuộc vào sự kiện và được thống nhất trên các framework (Mocha, Jasmine và Cucumber). Khi bạn triển khai một trình báo cáo tùy chỉnh, nó sẽ hoạt động với tất cả các framework.

Danh sách sau đây chứa tất cả các phương thức có thể mà bạn có thể thêm vào lớp trình báo cáo của mình:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Tên các phương thức khá tự giải thích.

Để in ra điều gì đó khi một sự kiện nhất định xảy ra, sử dụng phương thức `this.write(...)`, được cung cấp bởi lớp cha `WDIOReporter`. Nó sẽ truyền nội dung đến `stdout` hoặc đến một tệp nhật ký (tùy thuộc vào các tùy chọn của trình báo cáo).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Lưu ý rằng bạn không thể trì hoãn việc thực thi kiểm thử theo bất kỳ cách nào.

Tất cả các trình xử lý sự kiện nên thực thi các quy trình đồng bộ (nếu không, bạn sẽ gặp phải tình trạng chạy đua).

Hãy kiểm tra [phần ví dụ](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) nơi bạn có thể tìm thấy một ví dụ về trình báo cáo tùy chỉnh in ra tên sự kiện cho mỗi sự kiện.

Nếu bạn đã triển khai một trình báo cáo tùy chỉnh có thể hữu ích cho cộng đồng, đừng ngần ngại tạo một Pull Request để chúng tôi có thể cung cấp trình báo cáo cho công chúng!

Ngoài ra, nếu bạn chạy trình kiểm thử WDIO thông qua giao diện `Launcher`, bạn không thể áp dụng trình báo cáo tùy chỉnh dưới dạng hàm như sau:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // điều này sẽ KHÔNG hoạt động, vì CustomReporter không thể serialize được
    reporters: ['dot', CustomReporter]
})
```

## Đợi cho đến khi `isSynchronised`

Nếu trình báo cáo của bạn phải thực hiện các hoạt động bất đồng bộ để báo cáo dữ liệu (ví dụ: tải lên tệp nhật ký hoặc tài nguyên khác), bạn có thể ghi đè phương thức `isSynchronised` trong trình báo cáo tùy chỉnh của mình để trình chạy WebdriverIO đợi cho đến khi bạn đã tính toán xong mọi thứ. Một ví dụ về điều này có thể được thấy trong [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * ghi đè phương thức isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * đồng bộ hóa các tệp nhật ký
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * xóa nhật ký đã chuyển khỏi bucket nhật ký
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Bằng cách này, trình chạy sẽ đợi cho đến khi tất cả thông tin nhật ký được tải lên.

## Xuất bản trình báo cáo trên NPM

Để làm cho trình báo cáo dễ sử dụng và khám phá hơn bởi cộng đồng WebdriverIO, vui lòng tuân theo các khuyến nghị sau:

* Dịch vụ nên sử dụng quy ước đặt tên này: `wdio-*-reporter`
* Sử dụng từ khóa NPM: `wdio-plugin`, `wdio-reporter`
* Mục nhập `main` nên `export` một thể hiện của trình báo cáo
* Ví dụ trình báo cáo: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Tuân theo mẫu đặt tên được khuyến nghị cho phép dịch vụ được thêm vào bằng tên:

```js
// Thêm wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Thêm dịch vụ đã xuất bản vào WDIO CLI và Docs

Chúng tôi thực sự đánh giá cao mọi plugin mới có thể giúp người khác chạy các bài kiểm thử tốt hơn! Nếu bạn đã tạo một plugin như vậy, vui lòng cân nhắc thêm nó vào CLI và tài liệu của chúng tôi để dễ dàng tìm thấy hơn.

Vui lòng tạo một pull request với các thay đổi sau:

- thêm dịch vụ của bạn vào danh sách [trình báo cáo được hỗ trợ](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) trong module CLI
- nâng cao [danh sách trình báo cáo](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) để thêm tài liệu của bạn vào trang Webdriver.io chính thức