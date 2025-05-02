---
id: element
title: Đối tượng Element (Phần tử)
---

Một Đối tượng Element là một đối tượng đại diện cho một phần tử trên user agent từ xa, ví dụ như một [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) khi chạy phiên trên trình duyệt hoặc [một phần tử di động](https://developer.apple.com/documentation/swift/sequence/element) cho thiết bị di động. Nó có thể được nhận thông qua một trong nhiều lệnh truy vấn phần tử, ví dụ như [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) hoặc [`shadow$`](/docs/api/element/shadow$).

## Thuộc tính

Một đối tượng phần tử có các thuộc tính sau:

| Tên | Kiểu | Chi tiết |
| ---- | ---- | ------- |
| `sessionId` | `String` | Id phiên được gán từ server từ xa. |
| `elementId` | `String` | [Tham chiếu phần tử web](https://w3c.github.io/webdriver/#elements) liên kết có thể được sử dụng để tương tác với phần tử ở cấp độ giao thức |
| `selector` | `String` | [Bộ chọn](/docs/selectors) được sử dụng để truy vấn phần tử. |
| `parent` | `Object` | Có thể là [Đối tượng Browser](/docs/api/browser) khi phần tử được lấy từ nó (ví dụ: `const elem = browser.$('selector')`) hoặc một [Đối tượng Element](/docs/api/element) nếu nó được lấy từ phạm vi của một phần tử (ví dụ: `elem.$('selector')`) |
| `options` | `Object` | [Tùy chọn](/docs/configuration) WebdriverIO tùy thuộc vào cách đối tượng trình duyệt được tạo. Xem thêm [các loại thiết lập](/docs/setuptypes). |

## Phương thức
Một đối tượng phần tử cung cấp tất cả các phương thức từ phần giao thức, ví dụ: giao thức [WebDriver](/docs/api/webdriver) cũng như các lệnh được liệt kê trong phần phần tử. Các lệnh giao thức khả dụng phụ thuộc vào loại phiên. Nếu bạn chạy phiên trình duyệt tự động hóa, không có lệnh Appium nào [commands](/docs/api/appium) sẽ khả dụng và ngược lại.

Ngoài ra, các lệnh sau đây cũng khả dụng:

| Tên | Tham số | Chi tiết |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Kiểu: `String`)<br />- `fn` (Kiểu: `Function`) | Cho phép định nghĩa các lệnh tùy chỉnh có thể được gọi từ đối tượng trình duyệt cho mục đích soạn thảo. Đọc thêm trong hướng dẫn [Custom Command](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Kiểu: `String`)<br />- `fn` (Kiểu: `Function`) | Cho phép ghi đè bất kỳ lệnh trình duyệt nào với chức năng tùy chỉnh. Sử dụng cẩn thận vì nó có thể gây nhầm lẫn cho người dùng framework. Đọc thêm trong hướng dẫn [Custom Command](/docs/customcommands#overwriting-native-commands). |

## Ghi chú

### Chuỗi Phần tử

Khi làm việc với các phần tử, WebdriverIO cung cấp cú pháp đặc biệt để đơn giản hóa việc truy vấn chúng và tổng hợp các tra cứu phần tử lồng nhau phức tạp. Vì đối tượng phần tử cho phép bạn tìm các phần tử trong nhánh cây của chúng bằng các phương thức truy vấn phổ biến, người dùng có thể lấy các phần tử lồng nhau như sau:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

Với cấu trúc lồng nhau sâu, việc gán bất kỳ phần tử lồng nhau nào vào một mảng để sử dụng có thể khá dài dòng. Do đó, WebdriverIO có khái niệm về truy vấn phần tử theo chuỗi cho phép lấy các phần tử lồng nhau như sau:

```js
console.log(await $('#header').$('#headline').getText())
```

Điều này cũng hoạt động khi lấy một tập hợp các phần tử, ví dụ:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Khi làm việc với một tập hợp các phần tử, điều này có thể đặc biệt hữu ích khi cố gắng tương tác với chúng, vì vậy thay vì làm:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Bạn có thể trực tiếp gọi các phương thức Array trên chuỗi phần tử, ví dụ:

```js
const location = await $$('div').map((el) => el.getLocation())
```

tương tự như:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO sử dụng một triển khai tùy chỉnh hỗ trợ iterator bất đồng bộ bên dưới, vì vậy tất cả các lệnh từ API của chúng cũng được hỗ trợ cho các trường hợp sử dụng này.

__Lưu ý:__ tất cả các iterator bất đồng bộ trả về một promise ngay cả khi callback của bạn không trả về promise, ví dụ:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ trả về "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ trả về "string[]"
```

### Lệnh Tùy chỉnh

Bạn có thể đặt các lệnh tùy chỉnh trong phạm vi trình duyệt để trừu tượng hóa các quy trình làm việc thường được sử dụng. Xem hướng dẫn của chúng tôi về [Custom Commands](/docs/customcommands#adding-custom-commands) để biết thêm thông tin.