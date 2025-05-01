---
id: async-migration
title: Từ Sync sang Async
---

Do các thay đổi trong V8, đội ngũ WebdriverIO [đã thông báo](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) sẽ loại bỏ việc thực thi lệnh đồng bộ (synchronous) vào tháng 4 năm 2023. Đội ngũ đã nỗ lực để làm cho quá trình chuyển đổi trở nên dễ dàng nhất có thể. Trong hướng dẫn này, chúng tôi sẽ giải thích cách bạn có thể dần dần chuyển đổi bộ test của mình từ sync sang async. Chúng tôi sử dụng [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) làm dự án mẫu, nhưng cách tiếp cận cũng tương tự với tất cả các dự án khác.

## Promises trong JavaScript

Lý do tại sao việc thực thi đồng bộ đã phổ biến trong WebdriverIO là vì nó loại bỏ độ phức tạp của việc xử lý promises. Đặc biệt nếu bạn đến từ các ngôn ngữ khác nơi khái niệm này không tồn tại theo cách này, nó có thể gây nhầm lẫn lúc đầu. Tuy nhiên, Promises là một công cụ rất mạnh mẽ để xử lý mã bất đồng bộ và JavaScript hiện đại thực sự giúp việc xử lý nó trở nên dễ dàng. Nếu bạn chưa từng làm việc với Promises, chúng tôi khuyên bạn nên xem [hướng dẫn tham khảo MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) vì việc giải thích về nó sẽ nằm ngoài phạm vi của bài viết này.

## Chuyển đổi sang Async

Testrunner của WebdriverIO có thể xử lý việc thực thi bất đồng bộ và đồng bộ trong cùng một bộ test. Điều này có nghĩa là bạn có thể dần dần chuyển đổi các tests và PageObjects của mình từng bước một với tốc độ của riêng bạn. Ví dụ, Cucumber Boilerplate đã định nghĩa [một tập hợp lớn các định nghĩa bước](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) để bạn sao chép vào dự án của mình. Chúng ta có thể tiến hành chuyển đổi từng định nghĩa bước hoặc từng file một.

:::tip

WebdriverIO cung cấp một [codemod](https://github.com/webdriverio/codemod) cho phép chuyển đổi mã sync của bạn thành mã async gần như tự động hoàn toàn. Chạy codemod như được mô tả trong tài liệu trước và sử dụng hướng dẫn này cho việc chuyển đổi thủ công nếu cần.

:::

Trong nhiều trường hợp, tất cả những gì cần thiết là làm cho hàm mà bạn gọi các lệnh WebdriverIO trở thành `async` và thêm `await` trước mỗi lệnh. Nhìn vào file đầu tiên `clearInputField.ts` để chuyển đổi trong dự án boilerplate, chúng ta chuyển từ:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

sang:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Chỉ vậy thôi. Bạn có thể xem toàn bộ commit với tất cả các ví dụ viết lại tại đây:

#### Commits:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Việc chuyển đổi này độc lập với việc bạn có sử dụng TypeScript hay không. Nếu bạn sử dụng TypeScript, hãy đảm bảo rằng bạn cuối cùng thay đổi thuộc tính `types` trong `tsconfig.json` của bạn từ `webdriverio/sync` thành `@wdio/globals/types`. Ngoài ra, hãy đảm bảo rằng mục tiêu biên dịch của bạn được đặt ít nhất là `ES2018`.
:::

## Các trường hợp đặc biệt

Tất nhiên, luôn có những trường hợp đặc biệt mà bạn cần phải chú ý hơn một chút.

### Vòng lặp ForEach

Nếu bạn có một vòng lặp `forEach`, ví dụ: để lặp qua các phần tử, bạn cần đảm bảo rằng hàm gọi lại được xử lý đúng cách theo kiểu bất đồng bộ, ví dụ:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Hàm mà chúng ta truyền vào `forEach` là một hàm lặp. Trong một thế giới đồng bộ, nó sẽ nhấp vào tất cả các phần tử trước khi chuyển sang bước tiếp theo. Nếu chúng ta chuyển đổi điều này thành mã bất đồng bộ, chúng ta phải đảm bảo rằng chúng ta đợi cho mỗi hàm lặp hoàn thành việc thực thi. Bằng cách thêm `async`/`await`, các hàm lặp này sẽ trả về một promise mà chúng ta cần phải giải quyết. Bây giờ, `forEach` không còn lý tưởng để lặp qua các phần tử nữa vì nó không trả về kết quả của hàm lặp, promise mà chúng ta cần đợi. Do đó, chúng ta cần thay thế `forEach` bằng `map` để trả về promise đó. Phương thức `map` cũng như tất cả các phương thức lặp khác của Mảng như `find`, `every`, `reduce` và nhiều phương thức khác được triển khai để tôn trọng promises trong các hàm lặp và do đó được đơn giản hóa để sử dụng chúng trong ngữ cảnh bất đồng bộ. Ví dụ trên sau khi chuyển đổi sẽ trông như thế này:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Ví dụ, để lấy tất cả các phần tử `<h3 />` và lấy nội dung văn bản của chúng, bạn có thể chạy:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Nếu điều này có vẻ quá phức tạp, bạn có thể cân nhắc sử dụng các vòng lặp for đơn giản, ví dụ:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### WebdriverIO Assertions

Nếu bạn sử dụng trình trợ giúp assertion của WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), hãy đảm bảo đặt `await` trước mỗi lời gọi `expect`, ví dụ:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

cần được chuyển đổi thành:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Phương thức PageObject đồng bộ và Tests bất đồng bộ

Nếu bạn đã viết PageObjects trong bộ test của mình theo cách đồng bộ, bạn sẽ không thể sử dụng chúng trong các bài kiểm tra bất đồng bộ nữa. Nếu bạn cần sử dụng một phương thức PageObject trong cả các tests đồng bộ và bất đồng bộ, chúng tôi khuyên bạn nên sao chép phương thức đó và cung cấp chúng cho cả hai môi trường, ví dụ:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Khi bạn đã hoàn thành việc chuyển đổi, bạn có thể xóa các phương thức PageObject đồng bộ và làm sạch việc đặt tên.

Nếu bạn không muốn duy trì hai phiên bản khác nhau của một phương thức PageObject, bạn cũng có thể chuyển đổi toàn bộ PageObject sang async và sử dụng [`browser.call`](https://webdriver.io/docs/api/browser/call) để thực thi phương thức trong môi trường đồng bộ, ví dụ:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

Lệnh `call` sẽ đảm bảo rằng `someMethod` bất đồng bộ được giải quyết trước khi chuyển sang lệnh tiếp theo.

## Kết luận

Như bạn có thể thấy trong [PR viết lại kết quả](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), độ phức tạp của việc viết lại này khá đơn giản. Hãy nhớ rằng bạn có thể viết lại từng định nghĩa bước một. WebdriverIO hoàn toàn có khả năng xử lý việc thực thi đồng bộ và bất đồng bộ trong một framework duy nhất.