---
id: assertion
title: Kiểm định
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) đi kèm với một thư viện kiểm định tích hợp cho phép bạn thực hiện các kiểm định mạnh mẽ trên nhiều khía cạnh khác nhau của trình duyệt hoặc các phần tử trong ứng dụng (web) của bạn. Nó mở rộng chức năng [Jests Matchers](https://jestjs.io/docs/en/using-matchers) với các matcher bổ sung, được tối ưu hóa cho kiểm thử e2e, ví dụ:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

hoặc

```js
const selectOptions = await $$('form select>option')

// đảm bảo có ít nhất một tùy chọn trong select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Để xem danh sách đầy đủ, hãy xem [tài liệu API expect](/docs/api/expect-webdriverio).

## Di chuyển từ Chai

[Chai](https://www.chaijs.com/) và [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) có thể tồn tại song song, và với một số điều chỉnh nhỏ có thể thực hiện chuyển đổi mượt mà sang expect-webdriverio. Nếu bạn đã nâng cấp lên WebdriverIO v6 thì mặc định bạn sẽ có quyền truy cập vào tất cả các kiểm định từ `expect-webdriverio` ngay lập tức. Điều này có nghĩa là ở bất kỳ đâu bạn sử dụng `expect`, bạn sẽ gọi một kiểm định `expect-webdriverio`. Tức là, trừ khi bạn đặt [`injectGlobals`](/docs/configuration#injectglobals) thành `false` hoặc đã ghi đè `expect` toàn cục để sử dụng Chai. Trong trường hợp này, bạn sẽ không có quyền truy cập vào bất kỳ kiểm định expect-webdriverio nào mà không nhập gói expect-webdriverio một cách rõ ràng nơi bạn cần.

Hướng dẫn này sẽ hiển thị các ví dụ về cách di chuyển từ Chai nếu nó đã bị ghi đè cục bộ và cách di chuyển từ Chai nếu nó đã bị ghi đè toàn cục.

### Cục bộ

Giả sử Chai được import một cách rõ ràng trong một tệp, ví dụ:

```js
// myfile.js - mã ban đầu
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Để di chuyển mã này, hãy xóa import Chai và sử dụng phương thức kiểm định mới của expect-webdriverio `toHaveUrl` thay thế:

```js
// myfile.js - mã đã di chuyển
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // phương thức API expect-webdriverio mới https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Nếu bạn muốn sử dụng cả Chai và expect-webdriverio trong cùng một tệp, bạn sẽ giữ import Chai và `expect` sẽ mặc định là kiểm định expect-webdriverio, ví dụ:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Kiểm định Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // kiểm định expect-webdriverio
    })
})
```

### Toàn cục

Giả sử `expect` đã bị ghi đè toàn cục để sử dụng Chai. Để sử dụng các kiểm định expect-webdriverio, chúng ta cần đặt một biến toàn cục trong hook "before", ví dụ:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Giờ đây Chai và expect-webdriverio có thể được sử dụng song song với nhau. Trong mã của bạn, bạn sẽ sử dụng các kiểm định Chai và expect-webdriverio như sau, ví dụ:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Kiểm định Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // kiểm định expect-webdriverio
    });
});
```

Để di chuyển, bạn sẽ dần chuyển từng kiểm định Chai sang expect-webdriverio. Khi tất cả các kiểm định Chai đã được thay thế trong toàn bộ cơ sở mã, hook "before" có thể được xóa. Một thao tác tìm và thay thế toàn cục để thay thế tất cả các phiên bản của `wdioExpect` thành `expect` sẽ hoàn thiện việc di chuyển.