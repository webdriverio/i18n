---
id: security
title: Bảo mật
---

WebdriverIO luôn quan tâm đến khía cạnh bảo mật khi cung cấp các giải pháp. Dưới đây là một số cách để bảo vệ tốt hơn cho bài kiểm thử của bạn.

# Che giấu dữ liệu nhạy cảm

Nếu bạn sử dụng dữ liệu nhạy cảm trong quá trình kiểm thử, việc đảm bảo chúng không hiển thị với tất cả mọi người, chẳng hạn như trong các bản ghi log, là điều cần thiết. Ngoài ra, khi sử dụng nhà cung cấp đám mây, các khóa riêng tư thường được sử dụng. Thông tin này phải được che giấu khỏi nhật ký, công cụ báo cáo và các điểm tiếp xúc khác. Phần sau đây cung cấp một số giải pháp che giấu để chạy kiểm thử mà không làm lộ những giá trị đó.

## WebDriverIO

### Che giấu giá trị văn bản trong lệnh

Các lệnh `addValue` và `setValue` hỗ trợ giá trị boolean mask để che giấu trong nhật ký WDIO và Appium, cũng như các công cụ báo cáo. Hơn nữa, các công cụ khác, như công cụ đo hiệu suất và công cụ của bên thứ ba, cũng sẽ nhận được phiên bản đã được che giấu, nâng cao tính bảo mật.

Ví dụ, nếu bạn đang sử dụng người dùng thật trong môi trường sản xuất và cần nhập mật khẩu mà bạn muốn che giấu, thì bây giờ có thể thực hiện với cách sau:

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

Giới hạn:
  - Trong Appium, các plugin bổ sung có thể làm rò rỉ thông tin mặc dù chúng ta yêu cầu che giấu thông tin.
  - Các nhà cung cấp đám mây có thể sử dụng proxy cho ghi nhật ký HTTP, điều này bỏ qua cơ chế che giấu đã được thiết lập.

:::info

Phiên bản tối thiểu cần thiết:
 - WDIO v9.15.0
 - Appium v2.19.0

### Che giấu trong nhật ký WDIO

Sử dụng cấu hình `maskingPatterns`, chúng ta có thể che giấu thông tin nhạy cảm từ nhật ký WDIO. Tuy nhiên, nhật ký Appium không được bao gồm.

Ví dụ, nếu bạn đang sử dụng nhà cung cấp đám mây và sử dụng cấp độ thông tin, thì hầu như chắc chắn bạn sẽ "rò rỉ" khóa của người dùng như hiển thị bên dưới:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Để khắc phục điều đó, chúng ta có thể truyền biểu thức chính quy `'--key=([^ ]*)'` và bây giờ trong nhật ký, bạn sẽ thấy:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Bạn có thể đạt được điều trên bằng cách cung cấp biểu thức chính quy cho trường `maskingPatterns` của cấu hình.
  - Đối với nhiều biểu thức chính quy, hãy sử dụng một chuỗi duy nhất nhưng với giá trị được phân tách bằng dấu phẩy.
  - Để biết thêm chi tiết về mẫu che giấu, xem [phần Masking Patterns trong tệp README của WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

Phiên bản tối thiểu cần thiết:
 - WDIO v9.15.0

### Vô hiệu hóa bộ ghi nhật ký WDIO

Một cách khác để chặn việc ghi nhật ký dữ liệu nhạy cảm là giảm hoặc tắt tiếng cấp độ nhật ký hoặc vô hiệu hóa bộ ghi nhật ký.
Điều này có thể đạt được như sau:

```ts
import logger from '@wdio/logger';

/**
  * Đặt cấp độ ghi nhật ký của bộ ghi nhật ký WDIO thành 'silent' trước khi *chạy một promise, điều này giúp ẩn thông tin nhạy cảm trong nhật ký.
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

## Giải pháp của bên thứ ba

### Appium
Appium cung cấp giải pháp che giấu riêng; xem [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/)
 - Việc sử dụng giải pháp của họ có thể khá phức tạp. Một cách nếu có thể là truyền một mã thông báo trong chuỗi của bạn như `@mask@` và sử dụng nó như một biểu thức chính quy
 - Trong một số phiên bản Appium, các giá trị cũng được ghi nhật ký với mỗi ký tự được phân tách bằng dấu phẩy, vì vậy chúng ta cần phải cẩn thận.
 - Đáng tiếc là BrowserStack không hỗ trợ giải pháp này, nhưng nó vẫn hữu ích khi dùng trên máy cục bộ
 
Sử dụng ví dụ `@mask@` đã đề cập trước đó, chúng ta có thể sử dụng tệp JSON sau đây có tên `appiumMaskLogFilters.json`
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

BrowserStack cũng cung cấp một số mức che giấu để ẩn một số dữ liệu; xem [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Đáng tiếc là giải pháp này là tất-cả-hoặc-không-có-gì, vì vậy tất cả các giá trị văn bản của các lệnh được cung cấp sẽ bị che giấu.