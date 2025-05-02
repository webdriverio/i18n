---
id: timeouts
title: Thời gian chờ
---

Each command in WebdriverIO is an asynchronous operation. A request is fired to the Selenium server (or a cloud service like [Sauce Labs](https://saucelabs.com)), and its response contains the result once the action has completed or failed.

Therefore, time is a crucial component in the whole testing process. When a certain action depends on the state of a different action, you need to make sure that they get executed in the right order. Timeouts play an important role when dealing with these issues.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver Timeouts

### Session Script Timeout

Một phiên làm việc có thời gian chờ kịch bản phiên liên quan, chỉ định thời gian chờ cho các tập lệnh bất đồng bộ chạy. Trừ khi có quy định khác, nó là 30 giây. Bạn có thể thiết lập thời gian chờ này như sau:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Session Page Load Timeout

Một phiên làm việc có thời gian chờ tải trang phiên liên quan, chỉ định thời gian chờ để hoàn thành việc tải trang. Trừ khi có quy định khác, nó là 300.000 mili giây.

Bạn có thể thiết lập thời gian chờ này như sau:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Từ khóa `pageLoad` là một phần của [thông số kỹ thuật](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver chính thức, nhưng có thể không được [hỗ trợ](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) cho trình duyệt của bạn (tên trước đây là `page load`).

### Session Implicit Wait Timeout

Một phiên làm việc có thời gian chờ ngầm định liên quan. Điều này chỉ định thời gian chờ cho chiến lược định vị phần tử ngầm định khi định vị các phần tử bằng cách sử dụng các lệnh [`findElement`](/docs/api/webdriver#findelement) hoặc [`findElements`](/docs/api/webdriver#findelements) (tương ứng là [`$`](/docs/api/browser/$) hoặc [`$$`](/docs/api/browser/$$) khi chạy WebdriverIO với hoặc không có WDIO testrunner). Trừ khi có quy định khác, nó là 0 mili giây.

Bạn có thể thiết lập thời gian chờ này bằng cách:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Thời gian chờ liên quan đến WebdriverIO

### Thời gian chờ `WaitFor*`

WebdriverIO cung cấp nhiều lệnh để chờ các phần tử đạt trạng thái nhất định (ví dụ: được kích hoạt, hiển thị, tồn tại). Các lệnh này nhận một tham số bộ chọn và một số thời gian chờ, xác định thời gian instance nên chờ phần tử đó đạt đến trạng thái. Tùy chọn `waitforTimeout` cho phép bạn thiết lập thời gian chờ toàn cục cho tất cả các lệnh `waitFor*`, vì vậy bạn không cần phải thiết lập cùng một thời gian chờ nhiều lần. _(Lưu ý chữ `f` viết thường!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Trong các bài kiểm tra của bạn, bây giờ bạn có thể làm điều này:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Thời gian chờ liên quan đến Framework

Framework kiểm thử mà bạn đang sử dụng với WebdriverIO phải xử lý thời gian chờ, đặc biệt là vì mọi thứ đều bất đồng bộ. Nó đảm bảo rằng quá trình kiểm tra không bị kẹt nếu có sự cố xảy ra.

Theo mặc định, thời gian chờ là 10 giây, có nghĩa là một bài kiểm tra đơn lẻ không nên kéo dài hơn thời gian đó.

Một bài kiểm tra đơn lẻ trong Mocha trông như sau:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Trong Cucumber, thời gian chờ áp dụng cho một định nghĩa bước đơn lẻ. Tuy nhiên, nếu bạn muốn tăng thời gian chờ vì bài kiểm tra của bạn mất nhiều thời gian hơn giá trị mặc định, bạn cần thiết lập nó trong tùy chọn framework.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>