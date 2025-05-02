---
id: frameworks
title: Các Framework
---

WebdriverIO Runner có hỗ trợ sẵn cho [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), và [Cucumber.js](https://cucumber.io/). Bạn cũng có thể tích hợp nó với các framework nguồn mở bên thứ ba, như [Serenity/JS](#using-serenityjs).

:::tip Tích hợp WebdriverIO với các test framework
Để tích hợp WebdriverIO với một test framework, bạn cần một gói adapter có sẵn trên NPM.
Lưu ý rằng gói adapter phải được cài đặt ở cùng vị trí nơi WebdriverIO được cài đặt.
Vì vậy, nếu bạn đã cài đặt WebdriverIO một cách toàn cục, hãy đảm bảo cài đặt gói adapter cũng một cách toàn cục.
:::

Tích hợp WebdriverIO với một test framework cho phép bạn truy cập vào phiên WebDriver thông qua biến toàn cục `browser`
trong các file spec hoặc định nghĩa bước (step definitions) của bạn.
Lưu ý rằng WebdriverIO cũng sẽ lo việc khởi tạo và kết thúc phiên Selenium, vì vậy bạn không cần phải tự làm điều đó.

## Sử dụng Mocha

Đầu tiên, cài đặt gói adapter từ NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Mặc định, WebdriverIO cung cấp một [thư viện kiểm tra](assertion) được tích hợp sẵn mà bạn có thể bắt đầu sử dụng ngay lập tức:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO hỗ trợ các giao diện `BDD` (mặc định), `TDD`, và `QUnit` [interfaces](https://mochajs.org/#interfaces) của Mocha.

Nếu bạn muốn viết các thông số kỹ thuật của mình theo kiểu TDD, hãy đặt thuộc tính `ui` trong cấu hình `mochaOpts` của bạn thành `tdd`. Bây giờ các file kiểm tra của bạn nên được viết như sau:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Nếu bạn muốn xác định các cài đặt khác dành riêng cho Mocha, bạn có thể làm điều đó bằng khóa `mochaOpts` trong tệp cấu hình của bạn. Danh sách tất cả các tùy chọn có thể được tìm thấy trên [trang web dự án Mocha](https://mochajs.org/api/mocha).

__Lưu ý:__ WebdriverIO không hỗ trợ việc sử dụng đã bị loại bỏ của các hàm callback `done` trong Mocha:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### Tùy chọn Mocha

Các tùy chọn sau có thể được áp dụng trong tệp `wdio.conf.js` của bạn để cấu hình môi trường Mocha của bạn. __Lưu ý:__ không phải tất cả các tùy chọn đều được hỗ trợ, ví dụ: áp dụng tùy chọn `parallel` sẽ gây ra lỗi vì WDIO testrunner có cách riêng để chạy các bài kiểm tra song song. Bạn có thể truyền các tùy chọn framework này dưới dạng đối số, ví dụ:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Điều này sẽ truyền các tùy chọn Mocha sau:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Các tùy chọn Mocha sau được hỗ trợ:

#### require
Tùy chọn `require` rất hữu ích khi bạn muốn thêm hoặc mở rộng một số chức năng cơ bản (tùy chọn framework của WebdriverIO).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Sử dụng (các) module đã cho để biên dịch các tệp. Các trình biên dịch sẽ được bao gồm trước khi yêu cầu (tùy chọn framework của WebdriverIO).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Truyền các lỗi không bắt được.

Type: `boolean`<br />
Default: `false`

#### bail
Dừng sau khi bài kiểm tra đầu tiên thất bại.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Kiểm tra rò rỉ biến toàn cục.

Type: `boolean`<br />
Default: `false`

#### delay
Trì hoãn thực thi bộ trình test gốc.

Type: `boolean`<br />
Default: `false`

#### fgrep
Lọc kiểm tra theo chuỗi đã cho.

Type: `string`<br />
Default: `null`

#### forbidOnly
Các bài kiểm tra chỉ được đánh dấu làm thất bại bộ test.

Type: `boolean`<br />
Default: `false`

#### forbidPending
Các bài kiểm tra đang chờ xử lý làm thất bại bộ test.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Theo dõi đầy đủ ngăn xếp khi thất bại.

Type: `boolean`<br />
Default: `false`

#### global
Biến dự kiến ​​trong phạm vi toàn cục.

Type: `string[]`<br />
Default: `[]`

#### grep
Lọc kiểm tra bằng biểu thức chính quy đã cho.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Đảo ngược kết quả lọc kiểm tra.

Type: `boolean`<br />
Default: `false`

#### retries
Số lần thử lại các bài kiểm tra thất bại.

Type: `number`<br />
Default: `0`

#### timeout
Giá trị ngưỡng thời gian chờ (tính bằng ms).

Type: `number`<br />
Default: `30000`

## Sử dụng Jasmine

Đầu tiên, cài đặt gói adapter từ NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Sau đó, bạn có thể cấu hình môi trường Jasmine của mình bằng cách đặt thuộc tính `jasmineOpts` trong cấu hình của bạn. Danh sách tất cả các tùy chọn có thể được tìm thấy trên [trang web dự án Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Tùy chọn Jasmine

Các tùy chọn sau có thể được áp dụng trong tệp `wdio.conf.js` của bạn để cấu hình môi trường Jasmine của bạn bằng cách sử dụng thuộc tính `jasmineOpts`. Để biết thêm thông tin về các tùy chọn cấu hình này, hãy xem [tài liệu Jasmine](https://jasmine.github.io/api/edge/Configuration). Bạn có thể truyền các tùy chọn framework này dưới dạng đối số, ví dụ:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Điều này sẽ truyền các tùy chọn Mocha sau:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Các tùy chọn Jasmine sau được hỗ trợ:

#### defaultTimeoutInterval
Khoảng thời gian mặc định cho các hoạt động của Jasmine.

Type: `number`<br />
Default: `60000`

#### helpers
Mảng các đường dẫn tệp (và globs) tương đối với spec_dir để bao gồm trước các đặc tả jasmine.

Type: `string[]`<br />
Default: `[]`

#### requires
Tùy chọn `requires` rất hữu ích khi bạn muốn thêm hoặc mở rộng một số chức năng cơ bản.

Type: `string[]`<br />
Default: `[]`

#### random
Có hay không ngẫu nhiên hóa thứ tự thực hiện đặc tả.

Type: `boolean`<br />
Default: `true`

#### seed
Hạt giống để sử dụng làm cơ sở cho sự ngẫu nhiên. Null khiến hạt giống được xác định ngẫu nhiên khi bắt đầu thực thi.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Có hay không làm cho đặc tả thất bại nếu nó chạy không có sự mong đợi. Theo mặc định, một đặc tả không chạy sự mong đợi nào được báo cáo là đã vượt qua. Đặt giá trị này thành true sẽ báo cáo đặc tả đó là thất bại.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Có hay không để các đặc tả chỉ có một lỗi mong đợi.

Type: `boolean`<br />
Default: `false`

#### specFilter
Hàm để sử dụng để lọc các đặc tả.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Chỉ chạy các kiểm tra phù hợp với chuỗi hoặc biểu thức chính quy này. (Chỉ áp dụng nếu không có hàm `specFilter` tùy chỉnh nào được đặt)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Nếu là true, nó đảo ngược các kiểm tra khớp và chỉ chạy các kiểm tra không khớp với biểu thức được sử dụng trong `grep`. (Chỉ áp dụng nếu không có hàm `specFilter` tùy chỉnh nào được đặt)

Type: `boolean`<br />
Default: `false`

## Sử dụng Cucumber

Đầu tiên, cài đặt gói adapter từ NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Nếu bạn muốn sử dụng Cucumber, hãy đặt thuộc tính `framework` thành `cucumber` bằng cách thêm `framework: 'cucumber'` vào [tệp cấu hình](configurationfile).

Các tùy chọn cho Cucumber có thể được đưa ra trong tệp cấu hình với `cucumberOpts`. Kiểm tra toàn bộ danh sách các tùy chọn [tại đây](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Để nhanh chóng khởi động với Cucumber, hãy xem dự án [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) của chúng tôi, có sẵn tất cả các định nghĩa bước mà bạn cần để bắt đầu, và bạn sẽ viết các tệp tính năng ngay lập tức.

### Tùy chọn Cucumber

Các tùy chọn sau có thể được áp dụng trong tệp `wdio.conf.js` của bạn để cấu hình môi trường Cucumber của bạn bằng cách sử dụng thuộc tính `cucumberOpts`:

:::tip Điều chỉnh tùy chọn thông qua dòng lệnh
Các `cucumberOpts`, chẳng hạn như `tags` tùy chỉnh để lọc các bài kiểm tra, có thể được chỉ định thông qua dòng lệnh. Điều này được thực hiện bằng cách sử dụng định dạng `cucumberOpts.{optionName}="value"`.

Ví dụ, nếu bạn chỉ muốn chạy các bài kiểm tra được gắn thẻ `@smoke`, bạn có thể sử dụng lệnh sau:

```sh
# Khi bạn chỉ muốn chạy các bài kiểm tra có thẻ "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Lệnh này đặt tùy chọn `tags` trong `cucumberOpts` thành `@smoke`, đảm bảo rằng chỉ các bài kiểm tra có thẻ này được thực thi.

:::

#### backtrace
Hiển thị đường dẫn lùi đầy đủ cho các lỗi.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Yêu cầu các mô-đun trước khi yêu cầu bất kỳ tệp hỗ trợ nào.

Type: `string[]`<br />
Default: `[]`<br />
Example:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Hủy bỏ chạy khi có lỗi đầu tiên.

Type: `boolean`<br />
Default: `false`

#### name
Chỉ thực hiện các kịch bản có tên phù hợp với biểu thức (có thể lặp lại).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Yêu cầu các tệp chứa các định nghĩa bước của bạn trước khi thực hiện các tính năng. Bạn cũng có thể chỉ định một glob cho các định nghĩa bước của bạn.

Type: `string[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Đường dẫn đến nơi mã hỗ trợ của bạn, cho ESM.

Type: `String[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Thất bại nếu có bất kỳ bước nào không xác định hoặc đang chờ xử lý.

Type: `boolean`<br />
Default: `false`

#### tags
Chỉ thực hiện các tính năng hoặc kịch bản có thẻ khớp với biểu thức.
Vui lòng xem [tài liệu Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) để biết thêm chi tiết.

Type: `String`<br />
Default: ``

#### timeout
Thời gian chờ tính bằng mili giây cho các định nghĩa bước.

Type: `Number`<br />
Default: `30000`

#### retry
Chỉ định số lần thử lại các trường hợp kiểm tra thất bại.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Chỉ thử lại các tính năng hoặc kịch bản có thẻ khớp với biểu thức (có thể lặp lại). Tùy chọn này yêu cầu phải chỉ định '--retry'.

Type: `RegExp`

#### language
Ngôn ngữ mặc định cho các tệp tính năng của bạn

Type: `String`<br />
Default: `en`

#### order
Chạy các bài kiểm tra theo thứ tự xác định / ngẫu nhiên

Type: `String`<br />
Default: `defined`

#### format
Tên và đường dẫn tệp đầu ra của trình định dạng để sử dụng.
WebdriverIO chủ yếu chỉ hỗ trợ [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) có thể ghi đầu ra vào một tệp.

Type: `string[]`<br />

#### formatOptions
Các tùy chọn được cung cấp cho các trình định dạng

Type: `object`<br />

#### tagsInTitle
Thêm thẻ cucumber vào tên tính năng hoặc kịch bản

Type: `Boolean`<br />
Default: `false`

***Xin lưu ý rằng đây là một tùy chọn cụ thể của @wdio/cucumber-framework và không được cucumber-js nhận dạng***<br/>

#### ignoreUndefinedDefinitions
Coi các định nghĩa không xác định là cảnh báo.

Type: `Boolean`<br />
Default: `false`

***Xin lưu ý rằng đây là một tùy chọn cụ thể của @wdio/cucumber-framework và không được cucumber-js nhận dạng***<br/>

#### failAmbiguousDefinitions
Coi các định nghĩa không rõ ràng là lỗi.

Type: `Boolean`<br />
Default: `false`

***Xin lưu ý rằng đây là một tùy chọn cụ thể của @wdio/cucumber-framework và không được cucumber-js nhận dạng***<br/>

#### tagExpression
Chỉ thực thi các tính năng hoặc kịch bản có thẻ khớp với biểu thức.
Vui lòng xem [tài liệu Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) để biết thêm chi tiết.

Type: `String`<br />
Default: ``

***Xin lưu ý rằng tùy chọn này sẽ bị loại bỏ trong tương lai. Sử dụng thuộc tính cấu hình [`tags`](#tags) thay thế***

#### profile
Chỉ định hồ sơ để sử dụng.

Type: `string[]`<br />
Default: `[]`

***Lưu ý rằng chỉ có các giá trị cụ thể (worldParameters, name, retryTagFilter) được hỗ trợ trong các profile, vì `cucumberOpts` có ưu tiên cao hơn. Ngoài ra, khi sử dụng profile, hãy đảm bảo rằng các giá trị đã đề cập không được khai báo trong `cucumberOpts`.***

### Bỏ qua các bài kiểm tra trong cucumber

Lưu ý rằng nếu bạn muốn bỏ qua một bài kiểm tra bằng cách sử dụng các khả năng lọc kiểm tra cucumber thông thường có sẵn trong `cucumberOpts`, bạn sẽ thực hiện điều đó cho tất cả các trình duyệt và thiết bị được cấu hình trong capabilities. Để có thể bỏ qua các kịch bản chỉ cho các kết hợp capabilities cụ thể mà không cần phải bắt đầu phiên nếu không cần thiết, webdriverio cung cấp cú pháp thẻ cụ thể sau cho cucumber:

`@skip([condition])`

trong đó condition là một kết hợp tùy chọn của các thuộc tính capabilities với các giá trị của chúng mà khi **tất cả** khớp với điều kiện sẽ khiến kịch bản hoặc tính năng được gắn thẻ bị bỏ qua. Tất nhiên, bạn có thể thêm nhiều thẻ vào các kịch bản và tính năng để bỏ qua các bài kiểm tra trong một số điều kiện khác nhau.

Bạn cũng có thể sử dụng chú thích '@skip' để bỏ qua các bài kiểm tra mà không cần thay đổi `tagExpression'. Trong trường hợp này, các bài kiểm tra bị bỏ qua sẽ được hiển thị trong báo cáo kiểm tra.

Dưới đây là một số ví dụ về cú pháp này:
- `@skip` hoặc `@skip()`: sẽ luôn bỏ qua mục được gắn thẻ
- `@skip(browserName="chrome")`: bài kiểm tra sẽ không được thực thi trên các trình duyệt chrome.
- `@skip(browserName="firefox";platformName="linux")`: sẽ bỏ qua bài kiểm tra trong các phiên thực thi firefox trên linux.
- `@skip(browserName=["chrome","firefox"])`: các mục được gắn thẻ sẽ bị bỏ qua đối với cả trình duyệt chrome và firefox.
- `@skip(browserName=/i.*explorer/)`: các capabilities với trình duyệt khớp với regexp sẽ bị bỏ qua (như `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Nhập Trợ lý Định nghĩa Bước

Để sử dụng trợ lý định nghĩa bước như `Given`, `When` hoặc `Then` hoặc các hooks, bạn cần nhập chúng từ `@cucumber/cucumber`, ví dụ như sau:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Bây giờ, nếu bạn đã sử dụng Cucumber cho các loại kiểm tra khác không liên quan đến WebdriverIO mà bạn sử dụng phiên bản cụ thể, bạn cần nhập các trợ lý này trong các bài kiểm tra e2e của mình từ gói Cucumber của WebdriverIO, ví dụ:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Điều này đảm bảo rằng bạn sử dụng đúng trợ lý trong framework WebdriverIO và cho phép bạn sử dụng phiên bản Cucumber độc lập cho các loại kiểm tra khác.

### Xuất bản Báo cáo

Cucumber cung cấp một tính năng để xuất bản báo cáo chạy kiểm tra của bạn lên `https://reports.cucumber.io/`, có thể được kiểm soát bằng cách đặt cờ `publish` trong `cucumberOpts` hoặc bằng cách cấu hình biến môi trường `CUCUMBER_PUBLISH_TOKEN`. Tuy nhiên, khi bạn sử dụng `WebdriverIO` để thực thi kiểm tra, có một hạn chế với phương pháp này. Nó cập nhật các báo cáo riêng biệt cho từng tệp tính năng, khiến việc xem báo cáo tổng hợp trở nên khó khăn.

Để khắc phục hạn chế này, chúng tôi đã giới thiệu một phương thức dựa trên promise có tên là `publishCucumberReport` trong `@wdio/cucumber-framework`. Phương thức này nên được gọi trong hook `onComplete`, đây là nơi tối ưu để gọi nó. `publishCucumberReport` yêu cầu đầu vào thư mục báo cáo nơi lưu trữ các báo cáo tin nhắn cucumber.

Bạn có thể tạo các báo cáo `cucumber message` bằng cách cấu hình tùy chọn `format` trong `cucumberOpts` của bạn. Chúng tôi khuyên bạn nên cung cấp tên tệp động trong tùy chọn định dạng `cucumber message` để tránh ghi đè báo cáo và đảm bảo rằng mỗi lần chạy kiểm tra được ghi lại chính xác.

Trước khi sử dụng chức năng này, hãy đảm bảo đặt các biến môi trường sau:
- CUCUMBER_PUBLISH_REPORT_URL: URL nơi bạn muốn xuất bản báo cáo Cucumber. Nếu không được cung cấp, URL mặc định 'https://messages.cucumber.io/api/reports' sẽ được sử dụng.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Mã thông báo ủy quyền cần thiết để xuất bản báo cáo. Nếu mã thông báo này không được đặt, hàm sẽ thoát mà không xuất bản báo cáo.

Dưới đây là một ví dụ về các cấu hình cần thiết và mẫu mã để triển khai:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Các Tùy Chọn Cấu Hình Khác
    cucumberOpts: {
        // ... Cấu Hình Tùy Chọn Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Xin lưu ý rằng `./reports/` là thư mục nơi các báo cáo `cucumber message` sẽ được lưu trữ.

## Sử dụng Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) là một framework mã nguồn mở được thiết kế để làm cho việc kiểm tra chấp nhận và hồi quy của các hệ thống phần mềm phức tạp nhanh hơn, cộng tác hơn và dễ mở rộng hơn.

Đối với các bộ test WebdriverIO, Serenity/JS cung cấp:
- [Báo cáo Nâng cao](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Bạn có thể sử dụng Serenity/JS
  như một thay thế drop-in cho bất kỳ framework WebdriverIO tích hợp sẵn nào để tạo ra báo cáo thực thi test sâu rộng và tài liệu sống của dự án của bạn.
- [API Mẫu Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Để làm cho mã test của bạn có thể di động và tái sử dụng giữa các dự án và nhóm,
  Serenity/JS cung cấp cho bạn một [lớp trừu tượng](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) tùy chọn trên các API WebdriverIO gốc.
- [Thư viện Tích hợp](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Đối với các bộ test tuân theo Mẫu Screenplay,
  Serenity/JS cũng cung cấp các thư viện tích hợp tùy chọn để giúp bạn viết [API test](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [quản lý máy chủ cục bộ](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [thực hiện khẳng định](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), và nhiều hơn nữa!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Cài đặt Serenity/JS

Để thêm Serenity/JS vào [dự án WebdriverIO hiện có](https://webdriver.io/docs/gettingstarted), hãy cài đặt các mô-đun Serenity/JS sau từ NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Tìm hiểu thêm về các mô-đun Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Cấu hình Serenity/JS

Để kích hoạt tích hợp với Serenity/JS, hãy cấu hình WebdriverIO như sau:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            // Optional, print test execution results to standard output
            '@serenity-js/console-reporter',

            // Optional, produce Serenity BDD reports and living documentation (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Optional, automatically capture screenshots upon interaction failure
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
</Tabs>

Tìm hiểu thêm về:
- [Tùy chọn cấu hình Serenity/JS Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Tùy chọn cấu hình Serenity/JS Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Tùy chọn cấu hình Serenity/JS Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Tệp cấu hình WebdriverIO](configurationfile)

### Tạo báo cáo Serenity BDD và tài liệu sống

[Báo cáo Serenity BDD và tài liệu sống](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) được tạo bởi [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
một chương trình Java được tải xuống và quản lý bởi mô-đun [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Để tạo báo cáo Serenity BDD, bộ test của bạn phải:
- tải xuống Serenity BDD CLI, bằng cách gọi `serenity-bdd update` để lưu trữ CLI `jar` cục bộ
- tạo báo cáo trung gian Serenity BDD `.json`, bằng cách đăng ký [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) theo [hướng dẫn cấu hình](#configuring-serenityjs)
- gọi Serenity BDD CLI khi bạn muốn tạo báo cáo, bằng cách gọi `serenity-bdd run`

Mẫu được sử dụng bởi tất cả [Mẫu Dự án Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) dựa vào việc sử dụng:
- một tập lệnh NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) để tải xuống Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) để chạy quá trình báo cáo ngay cả khi bộ test bản thân đã thất bại (đó chính xác là khi bạn cần báo cáo kiểm tra nhất...)
- [`rimraf`](https://www.npmjs.com/package/rimraf) như một phương pháp tiện lợi để xóa bất kỳ báo cáo kiểm tra nào còn sót lại từ lần chạy trước

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Để tìm hiểu thêm về `SerenityBDDReporter`, vui lòng tham khảo:
- hướng dẫn cài đặt trong [tài liệu `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- ví dụ cấu hình trong [tài liệu API `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [Ví dụ Serenity/JS trên GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Sử dụng API Mẫu Screenplay của Serenity/JS

[Mẫu Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) là một cách tiếp cận sáng tạo, tập trung vào người dùng để viết các bài kiểm tra chấp nhận tự động chất lượng cao. Nó hướng dẫn bạn hướng tới việc sử dụng hiệu quả các lớp trừu tượng, giúp kịch bản kiểm tra của bạn nắm bắt được thuật ngữ kinh doanh của lĩnh vực của bạn, và khuyến khích thói quen kiểm tra và kỹ thuật phần mềm tốt trong nhóm của bạn.

Mặc định, khi bạn đăng ký `@serenity-js/webdriverio` làm `framework` WebdriverIO của bạn, Serenity/JS cấu hình một [dàn diễn viên](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) mặc định của [các diễn viên](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io), trong đó mỗi diễn viên có thể:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Điều này nên đủ để giúp bạn bắt đầu với việc giới thiệu các kịch bản kiểm tra tuân theo Mẫu Screenplay thậm chí cho một bộ kiểm tra hiện có, ví dụ:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Để tìm hiểu thêm về Mẫu Screenplay, hãy xem:
- [Mẫu Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Kiểm tra web với Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)