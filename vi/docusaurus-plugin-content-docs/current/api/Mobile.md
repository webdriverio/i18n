---
id: mobile
title: Các Lệnh Di Động
---

# Giới thiệu về các Lệnh Di Động tùy chỉnh và nâng cao trong WebdriverIO

Việc kiểm thử ứng dụng di động và ứng dụng web trên di động đi kèm với những thách thức riêng, đặc biệt khi xử lý các khác biệt giữa nền tảng Android và iOS. Mặc dù Appium cung cấp sự linh hoạt để xử lý những khác biệt này, nhưng thường yêu cầu bạn phải đào sâu vào tài liệu và lệnh phức tạp, phụ thuộc vào nền tảng ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)). Điều này có thể làm cho việc viết script kiểm thử tốn nhiều thời gian hơn, dễ gặp lỗi và khó bảo trì.

Để đơn giản hóa quy trình, WebdriverIO giới thiệu **các lệnh di động tùy chỉnh và nâng cao** được thiết kế đặc biệt cho việc kiểm thử web di động và ứng dụng gốc. Các lệnh này trừu tượng hóa những phức tạp của API Appium cơ bản, cho phép bạn viết script kiểm thử ngắn gọn, trực quan và không phụ thuộc vào nền tảng. Bằng cách tập trung vào sự dễ sử dụng, chúng tôi hướng đến việc giảm tải công việc phát triển script Appium và giúp bạn tự động hóa ứng dụng di động một cách dễ dàng.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Tại sao cần Lệnh Di Động Tùy chỉnh?

### 1. **Đơn giản hóa API Phức tạp**
Một số lệnh Appium, như cử chỉ hoặc tương tác với phần tử, liên quan đến cú pháp dài dòng và phức tạp. Ví dụ, để thực hiện hành động nhấn giữ với API Appium gốc, bạn cần tạo chuỗi `action` theo cách thủ công:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Với lệnh tùy chỉnh của WebdriverIO, cùng một hành động có thể được thực hiện với một dòng mã biểu cảm:

```ts
await $('~Contacts').longPress();
```

Điều này giảm đáng kể mã soạn sẵn, làm cho script của bạn rõ ràng và dễ hiểu hơn.

### 2. **Trừu tượng hóa Đa Nền tảng**
Ứng dụng di động thường yêu cầu xử lý cụ thể cho từng nền tảng. Ví dụ, việc cuộn trong ứng dụng gốc khác nhau đáng kể giữa [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) và [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). WebdriverIO thu hẹp khoảng cách này bằng cách cung cấp các lệnh thống nhất như `scrollIntoView()` hoạt động liền mạch trên các nền tảng, bất kể cách triển khai cơ bản.

```ts
await $('~element').scrollIntoView();
```

Sự trừu tượng hóa này đảm bảo các bài kiểm tra của bạn có tính di động và không yêu cầu rẽ nhánh hoặc logic điều kiện liên tục để tính đến sự khác biệt của hệ điều hành.

### 3. **Tăng Năng suất**
Bằng cách giảm nhu cầu hiểu và triển khai các lệnh Appium cấp thấp, các lệnh di động của WebdriverIO cho phép bạn tập trung vào việc kiểm tra chức năng của ứng dụng thay vì vật lộn với những nét riêng của từng nền tảng. Điều này đặc biệt có lợi cho các nhóm có kinh nghiệm hạn chế trong tự động hóa di động hoặc những nhóm tìm cách đẩy nhanh chu kỳ phát triển của họ.

### 4. **Tính Nhất quán và Khả năng Bảo trì**
Các lệnh tùy chỉnh mang lại sự đồng nhất cho script kiểm thử của bạn. Thay vì có các triển khai khác nhau cho các hành động tương tự, nhóm của bạn có thể dựa vào các lệnh được chuẩn hóa, có thể tái sử dụng. Điều này không chỉ làm cho mã nguồn dễ bảo trì hơn mà còn giảm rào cản cho việc đưa thành viên mới vào nhóm.

## Tại sao nâng cao một số lệnh di động?

### 1. Tăng tính Linh hoạt
Một số lệnh di động được nâng cao để cung cấp các tùy chọn và tham số bổ sung không có sẵn trong API Appium mặc định. Ví dụ, WebdriverIO thêm logic thử lại, thời gian chờ, và khả năng lọc webview theo tiêu chí cụ thể, cho phép kiểm soát tốt hơn đối với các kịch bản phức tạp.

```ts
// Ví dụ: Tùy chỉnh khoảng thời gian thử lại và thời gian chờ cho việc phát hiện webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Thử lại mỗi 1 giây
  androidWebviewConnectTimeout: 10000,    // Hết thời gian sau 10 giây
});
```

Các tùy chọn này giúp điều chỉnh script tự động hóa với hành vi ứng dụng động mà không cần mã soạn sẵn bổ sung.

### 2. Cải thiện Khả năng Sử dụng
Các lệnh nâng cao trừu tượng hóa các phức tạp và mẫu lặp lại được tìm thấy trong API gốc. Chúng cho phép bạn thực hiện nhiều hành động với ít dòng mã hơn, giảm đường cong học tập cho người dùng mới và làm cho script dễ đọc và bảo trì hơn.

```ts
// Ví dụ: Lệnh nâng cao để chuyển đổi ngữ cảnh theo tiêu đề
await driver.switchContext({
  title: 'My Webview Title',
});
```

So với các phương thức Appium mặc định, các lệnh nâng cao loại bỏ nhu cầu thực hiện các bước bổ sung như lấy các ngữ cảnh có sẵn theo cách thủ công và lọc qua chúng.

### 3. Chuẩn hóa Hành vi
WebdriverIO đảm bảo rằng các lệnh nâng cao hoạt động nhất quán trên các nền tảng như Android và iOS. Sự trừu tượng hóa đa nền tảng này giảm thiểu nhu cầu về logic rẽ nhánh có điều kiện dựa trên hệ điều hành, dẫn đến các script kiểm thử dễ bảo trì hơn.

```ts
// Ví dụ: Lệnh cuộn thống nhất cho cả hai nền tảng
await $('~element').scrollIntoView();
```

Sự chuẩn hóa này đơn giản hóa mã nguồn, đặc biệt là cho các nhóm tự động hóa kiểm thử trên nhiều nền tảng.

### 4. Tăng Độ tin cậy
Bằng cách kết hợp cơ chế thử lại, các giá trị mặc định thông minh và thông báo lỗi chi tiết, các lệnh nâng cao giảm khả năng xảy ra các bài kiểm tra không ổn định. Những cải tiến này đảm bảo các bài kiểm tra của bạn có khả năng phục hồi đối với các vấn đề như độ trễ trong khởi tạo webview hoặc trạng thái ứng dụng tạm thời.

```ts
// Ví dụ: Chuyển đổi webview nâng cao với logic khớp mạnh mẽ
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Điều này làm cho việc thực thi kiểm tra dễ dự đoán hơn và ít có khả năng thất bại do các yếu tố môi trường.

### 5. Nâng cao Khả năng Gỡ lỗi
Các lệnh nâng cao thường trả về siêu dữ liệu phong phú hơn, cho phép gỡ lỗi dễ dàng hơn trong các tình huống phức tạp, đặc biệt là trong các ứng dụng lai. Ví dụ, các lệnh như getContext và getContexts có thể trả về thông tin chi tiết về webview, bao gồm tiêu đề, url và trạng thái hiển thị.

```ts
// Ví dụ: Truy xuất siêu dữ liệu chi tiết để gỡ lỗi
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Siêu dữ liệu này giúp xác định và giải quyết vấn đề nhanh hơn, cải thiện trải nghiệm gỡ lỗi tổng thể.


Bằng cách nâng cao các lệnh di động, WebdriverIO không chỉ làm cho việc tự động hóa dễ dàng hơn mà còn phù hợp với sứ mệnh cung cấp cho các nhà phát triển những công cụ mạnh mẽ, đáng tin cậy và trực quan để sử dụng.

---

## Ứng dụng Lai

Ứng dụng lai kết hợp nội dung web với chức năng gốc và yêu cầu xử lý chuyên biệt trong quá trình tự động hóa. Những ứng dụng này sử dụng webview để hiển thị nội dung web trong ứng dụng gốc. WebdriverIO cung cấp các phương thức nâng cao để làm việc hiệu quả với ứng dụng lai.

### Hiểu về Webview
Webview là một thành phần giống trình duyệt được nhúng trong ứng dụng gốc:

- **Android:** Webview dựa trên Chrome/System Webview và có thể chứa nhiều trang (tương tự như các tab trình duyệt). Những webview này yêu cầu ChromeDriver để tự động hóa tương tác. Appium có thể tự động xác định phiên bản ChromeDriver cần thiết dựa trên phiên bản của System WebView hoặc Chrome được cài đặt trên thiết bị và tải xuống tự động nếu chưa có sẵn. Cách tiếp cận này đảm bảo tính tương thích liền mạch và giảm thiểu thiết lập thủ công. Tham khảo [tài liệu Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) để tìm hiểu cách Appium tự động tải xuống phiên bản ChromeDriver chính xác.
- **iOS:** Webview được hỗ trợ bởi Safari (WebKit) và được nhận dạng bởi các ID chung như `WEBVIEW_{id}`.

### Thách thức với Ứng dụng Lai
1. Xác định webview chính xác trong số nhiều lựa chọn.
2. Truy xuất siêu dữ liệu bổ sung như tiêu đề, URL, hoặc tên gói để hiểu rõ hơn ngữ cảnh.
3. Xử lý sự khác biệt cụ thể giữa Android và iOS.
4. Chuyển đổi đến ngữ cảnh chính xác trong ứng dụng lai một cách đáng tin cậy.

### Các Lệnh Chính cho Ứng dụng Lai

#### 1. `getContext`
Truy xuất ngữ cảnh hiện tại của phiên. Mặc định, nó hoạt động giống như phương thức getContext của Appium nhưng có thể cung cấp thông tin ngữ cảnh chi tiết khi `returnDetailedContext` được bật. Để biết thêm thông tin xem [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Trả về danh sách chi tiết các ngữ cảnh có sẵn, cải thiện phương thức contexts của Appium. Điều này giúp dễ dàng xác định webview chính xác để tương tác mà không cần gọi các lệnh bổ sung để xác định tiêu đề, url hoặc `bundleId|packageName` hoạt động. Để biết thêm thông tin xem [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Chuyển đến một webview cụ thể dựa trên tên, tiêu đề hoặc url. Cung cấp sự linh hoạt bổ sung, chẳng hạn như sử dụng biểu thức chính quy để khớp. Để biết thêm thông tin xem [`switchContext`](/docs/api/mobile/switchContext)

### Tính năng Chính cho Ứng dụng Lai
1. Siêu dữ liệu Chi tiết: Truy xuất thông tin toàn diện để gỡ lỗi và chuyển đổi ngữ cảnh đáng tin cậy.
2. Tính nhất quán Đa nền tảng: Hành vi thống nhất cho Android và iOS, xử lý những điểm khác biệt cụ thể của nền tảng một cách liền mạch.
3. Logic Thử lại Tùy chỉnh (Android): Điều chỉnh khoảng thời gian thử lại và thời gian chờ cho việc phát hiện webview.


:::info Ghi chú và Giới hạn
- Android cung cấp siêu dữ liệu bổ sung, chẳng hạn như `packageName` và `webviewPageId`, trong khi iOS tập trung vào `bundleId`.
- Logic thử lại có thể tùy chỉnh cho Android nhưng không áp dụng cho iOS.
- Có một số trường hợp iOS không thể tìm thấy Webview. Appium cung cấp các khả năng bổ sung khác nhau cho `appium-xcuitest-driver` để tìm Webview. Nếu bạn tin rằng Webview không được tìm thấy, bạn có thể thử thiết lập một trong các khả năng sau:
    - `appium:includeSafariInWebviews`: Thêm ngữ cảnh web Safari vào danh sách các ngữ cảnh có sẵn trong quá trình kiểm tra ứng dụng gốc/webview. Điều này hữu ích nếu bài kiểm tra mở Safari và cần có khả năng tương tác với nó. Mặc định là `false`.
    - `appium:webviewConnectRetries`: Số lần thử lại tối đa trước khi từ bỏ việc phát hiện trang webview. Độ trễ giữa mỗi lần thử lại là 500ms, mặc định là `10` lần thử lại.
    - `appium:webviewConnectTimeout`: Thời gian tối đa tính bằng mili giây để đợi phát hiện trang web. Mặc định là `5000` ms.

Để xem ví dụ nâng cao và chi tiết, hãy xem tài liệu API Di động WebdriverIO.
:::


---

Bộ lệnh ngày càng mở rộng của chúng tôi phản ánh cam kết làm cho việc tự động hóa di động trở nên dễ tiếp cận và tao nhã. Cho dù bạn đang thực hiện các cử chỉ phức tạp hay làm việc với các phần tử ứng dụng gốc, các lệnh này phù hợp với triết lý của WebdriverIO về việc tạo ra trải nghiệm tự động hóa liền mạch. Và chúng tôi không dừng lại ở đây—nếu có tính năng bạn muốn thấy, chúng tôi hoan nghênh phản hồi của bạn. Hãy thoải mái gửi yêu cầu của bạn qua [liên kết này](https://github.com/webdriverio/webdriverio/issues/new/choose).