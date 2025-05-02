---
id: pageobjects
title: Mẫu Đối tượng Trang
---

Phiên bản 5 của WebdriverIO được thiết kế với sự hỗ trợ mẫu Đối tượng Trang. Bằng cách giới thiệu nguyên tắc "các phần tử là công dân hạng nhất", giờ đây có thể xây dựng các bộ kiểm thử lớn bằng cách sử dụng mẫu này.

Không cần thêm gói bổ sung nào để tạo đối tượng trang. Hóa ra rằng các lớp hiện đại, rõ ràng cung cấp tất cả các tính năng cần thiết:

- kế thừa giữa các đối tượng trang
- tải lười các phần tử
- đóng gói các phương thức và hành động

Mục tiêu của việc sử dụng đối tượng trang là trừu tượng hóa mọi thông tin trang khỏi các bài kiểm thử thực tế. Lý tưởng nhất, bạn nên lưu trữ tất cả bộ chọn hoặc hướng dẫn cụ thể duy nhất cho một trang nhất định trong đối tượng trang, để bạn vẫn có thể chạy bài kiểm thử sau khi bạn đã thiết kế lại hoàn toàn trang của mình.

## Tạo Một Đối tượng Trang

Đầu tiên, chúng ta cần một đối tượng trang chính mà chúng ta gọi là `Page.js`. Nó sẽ chứa các bộ chọn hoặc phương thức chung mà tất cả các đối tượng trang sẽ kế thừa.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Chúng ta sẽ luôn `export` một thể hiện của đối tượng trang, và không bao giờ tạo thể hiện đó trong bài kiểm thử. Vì chúng ta đang viết các bài kiểm thử end-to-end, chúng ta luôn coi trang là một cấu trúc không trạng thái&mdash;giống như mỗi yêu cầu HTTP là một cấu trúc không trạng thái.

Chắc chắn, trình duyệt có thể mang thông tin phiên và do đó có thể hiển thị các trang khác nhau dựa trên các phiên khác nhau, nhưng điều này không nên được phản ánh trong đối tượng trang. Những thay đổi trạng thái này nên nằm trong các bài kiểm thử thực tế của bạn.

Hãy bắt đầu kiểm thử trang đầu tiên. Để mục đích demo, chúng ta sử dụng trang web [The Internet](http://the-internet.herokuapp.com) của [Elemental Selenium](http://elementalselenium.com) làm chuột bạch. Hãy thử xây dựng một ví dụ về đối tượng trang cho [trang đăng nhập](http://the-internet.herokuapp.com/login).

## `Get` -ting Bộ chọn của bạn

Bước đầu tiên là viết tất cả các bộ chọn quan trọng cần thiết trong đối tượng `login.page` của chúng ta dưới dạng các hàm getter:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Việc định nghĩa bộ chọn trong các hàm getter có thể trông hơi lạ, nhưng nó thực sự hữu ích. Các hàm này được đánh giá _khi bạn truy cập thuộc tính_, không phải khi bạn tạo đối tượng. Với điều đó, bạn luôn yêu cầu phần tử trước khi thực hiện một hành động trên nó.

## Chuỗi Lệnh

WebdriverIO nội bộ ghi nhớ kết quả cuối cùng của một lệnh. Nếu bạn nối một lệnh phần tử với một lệnh hành động, nó sẽ tìm phần tử từ lệnh trước đó và sử dụng kết quả để thực hiện hành động. Với điều đó, bạn có thể xóa bộ chọn (tham số đầu tiên) và lệnh trông đơn giản như:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Về cơ bản giống như:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

hoặc

```js
await $('#username').setValue('Max Mustermann')
```

## Sử dụng Đối tượng Trang trong Bài kiểm thử của bạn

Sau khi bạn đã định nghĩa các phần tử và phương thức cần thiết cho trang, bạn có thể bắt đầu viết bài kiểm thử cho nó. Tất cả những gì bạn cần làm để sử dụng đối tượng trang là `import` (hoặc `require`) nó. Chỉ vậy thôi!

Vì bạn đã xuất một thể hiện của đối tượng trang đã được tạo, việc nhập nó cho phép bạn bắt đầu sử dụng nó ngay lập tức.

Nếu bạn sử dụng framework khẳng định, bài kiểm thử của bạn có thể thậm chí còn biểu đạt hơn:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

Về mặt cấu trúc, việc tách các tệp spec và đối tượng trang vào các thư mục khác nhau là hợp lý. Ngoài ra, bạn có thể đặt cho mỗi đối tượng trang phần kết thúc: `.page.js`. Điều này làm cho việc nhập đối tượng trang rõ ràng hơn.

## Đi xa hơn

Đây là nguyên tắc cơ bản về cách viết đối tượng trang với WebdriverIO. Nhưng bạn có thể xây dựng cấu trúc đối tượng trang phức tạp hơn nhiều! Ví dụ, bạn có thể có các đối tượng trang cụ thể cho modals, hoặc chia một đối tượng trang lớn thành các lớp khác nhau (mỗi lớp đại diện cho một phần khác nhau của trang web tổng thể) mà kế thừa từ đối tượng trang chính. Mẫu này thực sự cung cấp nhiều cơ hội để tách thông tin trang khỏi bài kiểm thử của bạn, điều này rất quan trọng để giữ cho bộ kiểm thử của bạn có cấu trúc và rõ ràng khi dự án và số lượng bài kiểm thử tăng lên.

Bạn có thể tìm thấy ví dụ này (và thậm chí nhiều ví dụ đối tượng trang hơn) trong [thư mục `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) trên GitHub.