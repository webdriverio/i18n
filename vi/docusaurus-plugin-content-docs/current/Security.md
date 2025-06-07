---
id: security
title: Bảo mật
---

WebdriverIO luôn chú trọng khía cạnh bảo mật khi cung cấp các giải pháp. Dưới đây là một số cách để tăng cường bảo mật cho các bài kiểm thử của bạn.

## Phương pháp hay nhất

- Không bao giờ mã hóa cứng dữ liệu nhạy cảm có thể gây hại cho tổ chức của bạn nếu bị lộ dưới dạng văn bản rõ ràng.
- Sử dụng cơ chế (chẳng hạn như kho lưu trữ an toàn) để lưu trữ khóa và mật khẩu một cách an toàn và truy xuất chúng khi bắt đầu các bài kiểm thử end-to-end.
- Xác minh rằng không có dữ liệu nhạy cảm nào bị lộ trong Logs và bởi nhà cung cấp đám mây, chẳng hạn như token xác thực trong Network Logs.

:::info

Ngay cả đối với dữ liệu kiểm thử, điều quan trọng là phải xem xét liệu trong tay kẻ xấu, họ có thể truy xuất thông tin hoặc sử dụng các tài nguyên đó với ý đồ xấu hay không.

:::

## Che giấu dữ liệu nhạy cảm

Nếu bạn sử dụng dữ liệu nhạy cảm trong quá trình kiểm thử, điều quan trọng là đảm bảo rằng chúng không hiển thị cho mọi người, chẳng hạn như trong logs. Ngoài ra, khi sử dụng nhà cung cấp đám mây, các khóa riêng tư thường được sử dụng. Thông tin này phải được che giấu khỏi logs, trình báo cáo và các điểm tiếp xúc khác. Dưới đây cung cấp một số giải pháp che giấu để chạy các bài kiểm thử mà không làm lộ các giá trị đó.

### WebDriverIO

#### Che giấu giá trị văn bản của lệnh

Các lệnh `addValue` và `setValue` hỗ trợ giá trị boolean mask để che giấu trong logs, cũng như các trình báo cáo. Hơn nữa, các công cụ khác, chẳng hạn như công cụ hiệu suất và công cụ của bên thứ ba, cũng sẽ nhận được phiên bản đã che giấu, tăng cường bảo mật.

Ví dụ, nếu bạn đang sử dụng người dùng sản phẩm thực tế và cần nhập mật khẩu mà bạn muốn che giấu, thì giờ đây điều đó có thể thực hiện được với cách sau:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Đoạn mã trên sẽ ẩn giá trị văn bản khỏi logs WDIO như sau:

Ví dụ logs:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Các trình báo cáo, chẳng hạn như Allure reporters, và các công cụ của bên thứ ba như Percy từ BrowserStack cũng sẽ xử lý phiên bản đã che giấu.
Kết hợp với phiên bản Appium phù hợp, Appium Logs cũng sẽ không hiển thị dữ liệu nhạy cảm của bạn.

:::info

Hạn chế:
  - Trong Appium, các plugin bổ sung có thể làm rò rỉ thông tin dù chúng ta đã yêu cầu che giấu thông tin.
  - Các nhà cung cấp đám mây có thể sử dụng proxy cho việc ghi log HTTP, điều này có thể bỏ qua cơ chế che giấu đã được thiết lập.
  - Lệnh `getValue` không được hỗ trợ. Hơn nữa, nếu được sử dụng trên cùng một phần tử, nó có thể làm lộ giá trị dự định che giấu khi sử dụng `addValue` hoặc `setValue`.

Phiên bản tối thiểu yêu cầu:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Che giấu trong WDIO Logs

Sử dụng cấu hình `maskingPatterns`, chúng ta có thể che giấu thông tin nhạy cảm khỏi logs WDIO. Tuy nhiên, logs Appium không được bao gồm.

Ví dụ, nếu bạn đang sử dụng nhà cung cấp đám mây và sử dụng mức thông tin, thì hầu như chắc chắn bạn sẽ "rò rỉ" khóa của người dùng như hiển thị bên dưới:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Để khắc phục điều đó, chúng ta có thể truyền biểu thức chính quy `'--key=([^ ]*)'` và bây giờ trong logs bạn sẽ thấy

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Bạn có thể đạt được điều trên bằng cách cung cấp biểu thức chính quy cho trường `maskingPatterns` của cấu hình.
  - Đối với nhiều biểu thức chính quy, sử dụng một chuỗi duy nhất nhưng với giá trị được phân tách bằng dấu phẩy.
  - Để biết thêm chi tiết về mẫu che giấu, xem [phần Masking Patterns trong README của WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Phiên bản tối thiểu yêu cầu:
 - WDIO v9.15.0

:::

#### Vô hiệu hóa WDIO Loggers

Một cách khác để chặn việc ghi log dữ liệu nhạy cảm là giảm hoặc tắt tiếng mức độ log hoặc vô hiệu hóa logger.
Điều này có thể đạt được như sau:

```ts
import logger from '@wdio/logger';

/**
  * Đặt mức logger của WDIO logger thành 'silent' trước khi *chạy một promise, điều này giúp ẩn thông tin nhạy cảm trong logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Giải pháp của bên thứ ba

#### Appium
Appium cung cấp giải pháp che giấu riêng; xem [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Có thể hơi khó để sử dụng giải pháp của họ. Một cách nếu có thể là truyền một token trong chuỗi của bạn như `@mask@` và sử dụng nó như một biểu thức chính quy
 - Trong một số phiên bản Appium, các giá trị cũng được ghi log với mỗi ký tự được phân tách bằng dấu phẩy, vì vậy chúng ta cần phải cẩn thận.
 - Tiếc rằng, BrowserStack không hỗ trợ giải pháp này, nhưng nó vẫn hữu ích khi sử dụng cục bộ
 
Sử dụng ví dụ `@mask@` đã đề cập trước đó, chúng ta có thể sử dụng tệp JSON sau có tên là `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Sau đó truyền tên tệp JSON vào trường `logFilters` trong cấu hình dịch vụ appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack cũng cung cấp một số mức độ che giấu để ẩn một số dữ liệu; xem [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Tiếc rằng, giải pháp này là tất-cả-hoặc-không-có-gì, vì vậy tất cả các giá trị văn bản của các lệnh được cung cấp sẽ bị che giấu.