---
id: security
title: Bảo mật
---

WebdriverIO luôn đặt khía cạnh bảo mật trong tâm trí khi cung cấp giải pháp. Dưới đây là một số cách để bảo mật tốt hơn cho bài kiểm thử của bạn.

# Che giấu dữ liệu nhạy cảm

Nếu bạn đang sử dụng dữ liệu nhạy cảm trong quá trình kiểm thử, điều cần thiết là đảm bảo rằng chúng không hiển thị với tất cả mọi người, chẳng hạn như trong nhật ký. Ngoài ra, khi sử dụng nhà cung cấp đám mây, các khóa riêng tư thường được sử dụng. Thông tin này phải được che giấu khỏi nhật ký, trình báo cáo và các điểm tiếp xúc khác. Phần sau đây cung cấp một số giải pháp che giấu để chạy thử nghiệm mà không tiết lộ những giá trị đó.

## WebDriverIO

### Che giấu giá trị văn bản của lệnh

Các lệnh `addValue` và `setValue` hỗ trợ giá trị boolean mask để che giấu trong nhật ký WDIO và Appium, cũng như trong các trình báo cáo. Hơn nữa, các công cụ khác, chẳng hạn như công cụ đo hiệu suất và công cụ của bên thứ ba, cũng sẽ nhận được phiên bản đã được che giấu, tăng cường bảo mật.

Ví dụ, nếu bạn đang sử dụng người dùng thực tế và cần nhập mật khẩu mà bạn muốn che giấu, thì bây giờ có thể thực hiện được với cách sau:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Đoạn mã trên sẽ ẩn giá trị văn bản khỏi nhật ký WDIO và cả nhật ký Appium.

Ví dụ nhật ký:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Hạn chế:
  - Trong Appium, các plugin bổ sung có thể làm rò rỉ thông tin mặc dù chúng ta yêu cầu che giấu thông tin.
  - Các nhà cung cấp đám mây có thể sử dụng proxy để ghi nhật ký HTTP, điều này có thể bỏ qua cơ chế che giấu được thiết lập.

:::info

Phiên bản tối thiểu yêu cầu:
 - WDIO v9.15.0
 - Appium v2.19.0

### Che giấu trong nhật ký WDIO

Sử dụng cấu hình `maskingPatterns`, chúng ta có thể che giấu thông tin nhạy cảm khỏi nhật ký WDIO. Tuy nhiên, nhật ký Appium không được bảo vệ.

Ví dụ, nếu bạn đang sử dụng nhà cung cấp đám mây và sử dụng cấp độ thông tin, thì chắc chắn bạn sẽ "rò rỉ" khóa của người dùng như hiển thị dưới đây:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Để khắc phục điều đó, chúng ta có thể truyền biểu thức chính quy `'--key=([^ ]*)'` và bây giờ trong nhật ký bạn sẽ thấy 

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Bạn có thể đạt được điều trên bằng cách cung cấp biểu thức chính quy cho trường `maskingPatterns` của cấu hình.
  - Đối với nhiều biểu thức chính quy, hãy sử dụng một chuỗi duy nhất nhưng với giá trị được phân tách bằng dấu phẩy.
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

### Tắt Logger WDIO

Một cách khác để chặn ghi nhật ký dữ liệu nhạy cảm là giảm hoặc im lặng cấp độ nhật ký hoặc tắt logger.
Có thể thực hiện như sau:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
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

## Giải pháp từ bên thứ ba

### Appium
Appium cung cấp giải pháp che giấu riêng; xem [Bộ lọc nhật ký](https://appium.io/docs/en/latest/guides/log-filters/)
 - Có thể khó khăn khi sử dụng giải pháp của họ. Một cách nếu có thể là truyền một token trong chuỗi của bạn như `@mask@` và sử dụng nó như một biểu thức chính quy
 - Trong một số phiên bản Appium, các giá trị cũng được ghi nhật ký với mỗi ký tự được phân tách bằng dấu phẩy, vì vậy chúng ta cần cẩn thận.
 - Đáng tiếc, BrowserStack không hỗ trợ giải pháp này, nhưng nó vẫn hữu ích khi chạy cục bộ
 
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

### BrowserStack

BrowserStack cũng cung cấp một số mức độ che giấu để ẩn một số dữ liệu; xem [ẩn dữ liệu nhạy cảm](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Đáng tiếc, giải pháp này là tất cả hoặc không có gì, vì vậy tất cả các giá trị văn bản của các lệnh được cung cấp sẽ bị che giấu.