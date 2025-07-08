---
id: bestpractices
title: Các Phương Pháp Hay Nhất
---

# Các Phương Pháp Hay Nhất

Hướng dẫn này nhằm chia sẻ các phương pháp hay nhất của chúng tôi giúp bạn viết các bài kiểm tra hiệu quả và linh hoạt.

## Sử dụng bộ chọn linh hoạt

Sử dụng các bộ chọn linh hoạt với sự thay đổi trong DOM, bạn sẽ có ít hoặc thậm chí không có bài kiểm tra thất bại khi ví dụ một lớp bị xóa khỏi một phần tử.

Các lớp có thể được áp dụng cho nhiều phần tử và nên tránh nếu có thể trừ khi bạn cố ý muốn lấy tất cả các phần tử có lớp đó.

```js
// 👎
await $('.button')
```

Tất cả các bộ chọn này sẽ trả về một phần tử duy nhất.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Note:__ Để tìm hiểu tất cả các bộ chọn mà WebdriverIO hỗ trợ, hãy xem trang [Selectors](./Selectors.md) của chúng tôi.

## Hạn chế số lượng truy vấn phần tử

Mỗi khi bạn sử dụng lệnh [`$`](https://webdriver.io/docs/api/browser/$) hoặc [`$$`](https://webdriver.io/docs/api/browser/$$) (bao gồm cả việc kết nối chúng), WebdriverIO cố gắng định vị phần tử trong DOM. Các truy vấn này tốn kém nên bạn nên cố gắng hạn chế chúng càng nhiều càng tốt.

Truy vấn ba phần tử.

```js
// 👎
await $('table').$('tr').$('td')
```

Chỉ truy vấn một phần tử.

``` js
// 👍
await $('table tr td')
```

Thời điểm duy nhất bạn nên sử dụng chuỗi là khi bạn muốn kết hợp các [chiến lược bộ chọn](https://webdriver.io/docs/selectors/#custom-selector-strategies) khác nhau.
Trong ví dụ, chúng tôi sử dụng [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), đây là một chiến lược để đi vào shadow DOM của một phần tử.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Ưu tiên định vị một phần tử duy nhất thay vì lấy một phần tử từ danh sách

Không phải lúc nào cũng có thể làm điều này nhưng sử dụng các lớp giả CSS như [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) bạn có thể khớp các phần tử dựa trên chỉ mục của các phần tử trong danh sách con của cha chúng.

Truy vấn tất cả các hàng bảng.

```js
// 👎
await $$('table tr')[15]
```

Truy vấn một hàng bảng duy nhất.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Sử dụng các khẳng định tích hợp

Đừng sử dụng các khẳng định thủ công không tự động chờ kết quả khớp vì điều này sẽ gây ra các bài kiểm tra không ổn định.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Bằng cách sử dụng các khẳng định tích hợp, WebdriverIO sẽ tự động chờ kết quả thực tế khớp với kết quả mong đợi, dẫn đến các bài kiểm tra linh hoạt.
Nó đạt được điều này bằng cách tự động thử lại khẳng định cho đến khi nó vượt qua hoặc hết thời gian.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Tải lười biếng và chuỗi promise

WebdriverIO có một số thủ thuật khi viết mã sạch vì nó có thể tải lười biếng phần tử cho phép bạn kết nối các promise và giảm số lượng `await`. Điều này cũng cho phép bạn truyền phần tử dưới dạng ChainablePromiseElement thay vì Element và để sử dụng dễ dàng hơn với các đối tượng trang.

Vậy khi nào bạn phải sử dụng `await`?
Bạn nên luôn sử dụng `await` với ngoại lệ của lệnh `$` và `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## Đừng lạm dụng lệnh và khẳng định

Khi sử dụng expect.toBeDisplayed, bạn cũng ngầm đợi phần tử tồn tại. Không cần sử dụng các lệnh waitForXXX khi bạn đã có một khẳng định thực hiện cùng một việc.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Không cần đợi một phần tử tồn tại hoặc hiển thị khi tương tác hoặc khi khẳng định điều gì đó như văn bản của nó trừ khi phần tử có thể rõ ràng là vô hình (opacity: 0 chẳng hạn) hoặc có thể rõ ràng bị vô hiệu hóa (thuộc tính disabled chẳng hạn), trong trường hợp đó việc đợi phần tử hiển thị là hợp lý.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Kiểm tra động

Sử dụng biến môi trường để lưu trữ dữ liệu kiểm tra động, ví dụ: thông tin đăng nhập bí mật, trong môi trường của bạn thay vì mã hóa cứng chúng vào bài kiểm tra. Hãy truy cập trang [Parameterize Tests](parameterize-tests) để biết thêm thông tin về chủ đề này.

## Lint mã của bạn

Sử dụng eslint để lint mã của bạn, bạn có thể phát hiện lỗi sớm, sử dụng [quy tắc lint](https://www.npmjs.com/package/eslint-plugin-wdio) của chúng tôi để đảm bảo rằng một số phương pháp hay nhất luôn được áp dụng.

## Đừng tạm dừng

Có thể bạn muốn sử dụng lệnh tạm dừng nhưng sử dụng nó là một ý tưởng tồi vì nó không linh hoạt và chỉ gây ra các bài kiểm tra không ổn định về lâu dài.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Vòng lặp bất đồng bộ

Khi bạn có một số mã bất đồng bộ mà bạn muốn lặp lại, điều quan trọng là biết rằng không phải tất cả các vòng lặp đều có thể làm điều này.
Ví dụ, hàm forEach của Array không cho phép các lệnh gọi lại bất đồng bộ như có thể đọc trên [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Note:__ Bạn vẫn có thể sử dụng chúng khi bạn không cần thao tác bất đồng bộ như trong ví dụ này `console.log(await $$('h1').map((h1) => h1.getText()))`.

Dưới đây là một số ví dụ về ý nghĩa của điều này.

Cách sau sẽ không hoạt động vì các lệnh gọi lại bất đồng bộ không được hỗ trợ.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Cách sau sẽ hoạt động.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Giữ đơn giản

Đôi khi chúng tôi thấy người dùng của mình ánh xạ dữ liệu như văn bản hoặc giá trị. Điều này thường không cần thiết và thường là một mùi mã, hãy kiểm tra các ví dụ dưới đây tại sao trường hợp này.

```js
// 👎 quá phức tạp, khẳng định đồng bộ, sử dụng các khẳng định tích hợp để ngăn chặn các bài kiểm tra không ổn định
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 quá phức tạp
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 tìm phần tử theo văn bản của chúng nhưng không tính đến vị trí của các phần tử
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 sử dụng định danh duy nhất (thường được sử dụng cho các phần tử tùy chỉnh)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 tên truy cập (thường được sử dụng cho các phần tử html gốc)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Một điều khác mà chúng tôi đôi khi thấy là những thứ đơn giản có một giải pháp quá phức tạp.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Thực thi mã song song

Nếu bạn không quan tâm đến thứ tự mà một số mã được chạy, bạn có thể sử dụng [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) để tăng tốc độ thực thi.

__Note:__ Vì điều này làm cho mã khó đọc hơn, bạn có thể trừu tượng hóa nó bằng cách sử dụng một đối tượng trang hoặc một hàm, mặc dù bạn cũng nên đặt câu hỏi liệu lợi ích về hiệu suất có đáng với chi phí về khả năng đọc hay không.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Nếu được trừu tượng hóa, nó có thể trông giống như dưới đây, nơi logic được đặt trong một phương thức gọi là submitWithDataOf và dữ liệu được lấy bởi lớp Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```