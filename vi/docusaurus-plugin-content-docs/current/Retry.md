---
id: retry
title: Chạy Lại Các Bài Kiểm Tra Không Ổn Định
---

Bạn có thể chạy lại một số bài kiểm tra nhất định với testrunner của WebdriverIO mà trở nên không ổn định do các yếu tố như mạng không ổn định hoặc điều kiện xung đột. (Tuy nhiên, không nên đơn giản chỉ tăng tỷ lệ chạy lại nếu các bài kiểm tra trở nên không ổn định!)

## Chạy lại bộ kiểm tra trong Mocha

Kể từ phiên bản 3 của Mocha, bạn có thể chạy lại toàn bộ bộ kiểm tra (mọi thứ bên trong khối `describe`). Nếu bạn sử dụng Mocha, bạn nên ưu tiên cơ chế chạy lại này thay vì triển khai của WebdriverIO, chỉ cho phép bạn chạy lại một số khối kiểm tra nhất định (mọi thứ trong khối `it`). Để sử dụng phương thức `this.retries()`, khối bộ kiểm tra `describe` phải sử dụng hàm không ràng buộc `function(){}` thay vì hàm mũi tên `() => {}`, như được mô tả trong [tài liệu Mocha](https://mochajs.org/#arrow-functions). Khi sử dụng Mocha, bạn cũng có thể đặt số lần chạy lại cho tất cả các đặc tả bằng cách sử dụng `mochaOpts.retries` trong tệp `wdio.conf.js`.

Dưới đây là một ví dụ:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Chạy lại các bài kiểm tra đơn lẻ trong Jasmine hoặc Mocha

Để chạy lại một khối kiểm tra nhất định, bạn chỉ cần áp dụng số lần chạy lại làm tham số cuối cùng sau hàm khối kiểm tra:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Điều tương tự cũng hoạt động cho các hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Điều tương tự cũng hoạt động cho các hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Nếu bạn đang sử dụng Jasmine, tham số thứ hai được dành cho thời gian chờ. Để áp dụng tham số chạy lại, bạn cần đặt thời gian chờ thành giá trị mặc định của nó `jasmine.DEFAULT_TIMEOUT_INTERVAL` và sau đó áp dụng số lần chạy lại của bạn.

</TabItem>
</Tabs>

Cơ chế chạy lại này chỉ cho phép chạy lại các hook hoặc khối kiểm tra đơn lẻ. Nếu bài kiểm tra của bạn đi kèm với một hook để thiết lập ứng dụng, hook này không được chạy. [Mocha cung cấp](https://mochajs.org/#retry-tests) các lần chạy lại kiểm tra gốc cung cấp hành vi này trong khi Jasmine thì không. Bạn có thể truy cập số lần chạy lại đã thực hiện trong hook `afterTest`.

## Chạy lại trong Cucumber

### Chạy lại toàn bộ bộ kiểm tra trong Cucumber

Đối với cucumber >=6, bạn có thể cung cấp tùy chọn cấu hình [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) cùng với tham số tùy chọn `retryTagFilter` để có tất cả hoặc một số kịch bản thất bại của bạn nhận được các lần thử lại bổ sung cho đến khi thành công. Để tính năng này hoạt động, bạn cần đặt `scenarioLevelReporter` thành `true`.

### Chạy lại Định nghĩa Bước trong Cucumber

Để xác định tỷ lệ chạy lại cho một định nghĩa bước nhất định, chỉ cần áp dụng tùy chọn chạy lại cho nó, như:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Chạy lại chỉ có thể được định nghĩa trong tệp định nghĩa bước của bạn, không bao giờ trong tệp tính năng của bạn.

## Thêm chạy lại trên cơ sở mỗi tệp đặc tả

Trước đây, chỉ có sẵn các lần chạy lại ở cấp độ kiểm tra và bộ kiểm tra, điều này tốt trong hầu hết các trường hợp.

Nhưng trong bất kỳ bài kiểm tra nào liên quan đến trạng thái (như trên máy chủ hoặc trong cơ sở dữ liệu), trạng thái có thể được để lại không hợp lệ sau lần thất bại kiểm tra đầu tiên. Bất kỳ lần chạy lại nào tiếp theo có thể không có cơ hội vượt qua, do trạng thái không hợp lệ mà chúng sẽ bắt đầu.

Một phiên bản `browser` mới được tạo cho mỗi tệp đặc tả, điều này làm cho nó trở thành nơi lý tưởng để hook và thiết lập bất kỳ trạng thái nào khác (máy chủ, cơ sở dữ liệu). Chạy lại ở cấp độ này có nghĩa là toàn bộ quá trình thiết lập sẽ đơn giản được lặp lại, giống như nếu nó dành cho một tệp đặc tả mới.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Chạy một bài kiểm tra cụ thể nhiều lần

Điều này giúp ngăn chặn các bài kiểm tra không ổn định được đưa vào codebase. Bằng cách thêm tùy chọn cli `--repeat`, nó sẽ chạy các đặc tả hoặc bộ kiểm tra được chỉ định N lần. Khi sử dụng cờ cli này, cờ `--spec` hoặc `--suite` cũng phải được chỉ định.

Khi thêm các bài kiểm tra mới vào codebase, đặc biệt là thông qua quy trình CI/CD, các bài kiểm tra có thể vượt qua và được hợp nhất nhưng sau đó trở nên không ổn định. Sự không ổn định này có thể đến từ nhiều thứ như vấn đề mạng, tải máy chủ, kích thước cơ sở dữ liệu, v.v. Sử dụng cờ `--repeat` trong quy trình CD/CD của bạn có thể giúp phát hiện các bài kiểm tra không ổn định này trước khi chúng được hợp nhất vào codebase chính.

Một chiến lược sử dụng là chạy các bài kiểm tra của bạn như bình thường trong quy trình CI/CD của bạn, nhưng nếu bạn đang giới thiệu một bài kiểm tra mới, bạn có thể chạy một bộ kiểm tra khác với đặc tả mới được chỉ định trong `--spec` cùng với `--repeat` để nó chạy bài kiểm tra mới x số lần. Nếu bài kiểm tra không thành công bất kỳ lần nào trong số đó, bài kiểm tra sẽ không được hợp nhất và sẽ cần được xem xét lý do tại sao nó thất bại.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```