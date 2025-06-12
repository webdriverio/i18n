---
id: assertion
title: Khẳng định
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) đi kèm với một thư viện khẳng định tích hợp cho phép bạn đưa ra các khẳng định mạnh mẽ về nhiều khía cạnh của trình duyệt hoặc các phần tử trong ứng dụng (web) của bạn. Nó mở rộng chức năng [Jests Matchers](https://jestjs.io/docs/en/using-matchers) với các matchers bổ sung, được tối ưu hóa cho kiểm thử e2e, ví dụ:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

hoặc

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

Để xem danh sách đầy đủ, hãy xem [tài liệu API expect](/docs/api/expect-webdriverio).

## Khẳng định mềm (Soft Assertions)

WebdriverIO bao gồm các khẳng định mềm theo mặc định từ expect-webdriver(5.2.0). Khẳng định mềm cho phép các bài kiểm tra của bạn tiếp tục thực thi ngay cả khi một khẳng định thất bại. Tất cả các lỗi được thu thập và báo cáo vào cuối bài kiểm tra.

### Cách sử dụng

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## Di chuyển từ Chai

[Chai](https://www.chaijs.com/) và [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) có thể tồn tại song song, và với một số điều chỉnh nhỏ, việc chuyển đổi sang expect-webdriverio có thể được thực hiện một cách suôn sẻ. Nếu bạn đã nâng cấp lên WebdriverIO v6 thì theo mặc định bạn sẽ có quyền truy cập vào tất cả các khẳng định từ `expect-webdriverio` ngay từ đầu. Điều này có nghĩa là ở bất cứ đâu bạn sử dụng `expect` thì bạn sẽ gọi một khẳng định `expect-webdriverio`. Điều đó chỉ xảy ra khi bạn không đặt [`injectGlobals`](/docs/configuration#injectglobals) thành `false` hoặc không ghi đè rõ ràng biến `expect` toàn cục để sử dụng Chai. Trong trường hợp này, bạn sẽ không có quyền truy cập vào bất kỳ khẳng định expect-webdriverio nào mà không nhập gói expect-webdriverio một cách rõ ràng ở nơi bạn cần.

Hướng dẫn này sẽ hiển thị các ví dụ về cách di chuyển từ Chai nếu nó đã bị ghi đè cục bộ và cách di chuyển từ Chai nếu nó đã bị ghi đè toàn cục.

### Cục bộ

Giả sử Chai đã được nhập một cách rõ ràng trong một tệp, ví dụ:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

Để di chuyển mã này, hãy xóa import Chai và sử dụng phương thức khẳng định mới expect-webdriverio `toHaveUrl` thay thế:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

Nếu bạn muốn sử dụng cả Chai và expect-webdriverio trong cùng một tệp, bạn sẽ giữ import Chai và `expect` sẽ mặc định là khẳng định expect-webdriverio, ví dụ:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### Toàn cục

Giả sử `expect` đã bị ghi đè toàn cục để sử dụng Chai. Để sử dụng các khẳng định expect-webdriverio, chúng ta cần đặt một biến toàn cục trong hook "before", ví dụ:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

Bây giờ Chai và expect-webdriverio có thể được sử dụng song song nhau. Trong mã của bạn, bạn sẽ sử dụng các khẳng định Chai và expect-webdriverio như sau, ví dụ:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

Để di chuyển, bạn sẽ từ từ chuyển từng khẳng định Chai sang expect-webdriverio. Khi tất cả các khẳng định Chai đã được thay thế trong toàn bộ codebase, hook "before" có thể được xóa. Tìm kiếm và thay thế toàn cục để thay thế tất cả các trường hợp của `wdioExpect` thành `expect` sẽ hoàn tất quá trình di chuyển.