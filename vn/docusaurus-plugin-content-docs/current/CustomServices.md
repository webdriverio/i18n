---
id: customservices
title: Dịch Vụ Tùy Chỉnh
---

Bạn có thể viết dịch vụ tùy chỉnh cho trình chạy thử nghiệm WDIO để phù hợp với nhu cầu của bạn.

Các dịch vụ là các tiện ích bổ sung được tạo ra để tái sử dụng logic, đơn giản hóa các bài kiểm tra, quản lý bộ kiểm tra và tích hợp kết quả. Dịch vụ có quyền truy cập vào tất cả các [hooks](/docs/configurationfile) giống như trong tệp `wdio.conf.js`.

Có hai loại dịch vụ có thể được định nghĩa: dịch vụ launcher chỉ có quyền truy cập đến các hook `onPrepare`, `onWorkerStart`, `onWorkerEnd` và `onComplete` được thực thi một lần cho mỗi lần chạy kiểm tra, và dịch vụ worker có quyền truy cập đến tất cả các hook khác và được thực thi cho mỗi worker. Lưu ý rằng bạn không thể chia sẻ các biến (toàn cục) giữa hai loại dịch vụ vì dịch vụ worker chạy trong một quy trình (worker) khác.

Một dịch vụ launcher có thể được định nghĩa như sau:

```js
export default class CustomLauncherService {
    // Nếu một hook trả về một promise, WebdriverIO sẽ đợi cho đến khi promise đó được giải quyết để tiếp tục.
    async onPrepare(config, capabilities) {
        // TODO: something before all workers launch
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: something after the workers shutdown
    }

    // custom service methods ...
}
```

Trong khi một dịch vụ worker nên trông như thế này:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` chứa tất cả các tùy chọn dành riêng cho dịch vụ
     * ví dụ: nếu được định nghĩa như sau:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * tham số `serviceOptions` sẽ là: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * đối tượng browser này được truyền vào đây lần đầu tiên
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: something before all tests are run, e.g.:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: something after all tests are run
    }

    beforeTest(test, context) {
        // TODO: something before each Mocha/Jasmine test run
    }

    beforeScenario(test, context) {
        // TODO: something before each Cucumber scenario run
    }

    // other hooks or custom service methods ...
}
```

Nên lưu trữ đối tượng browser thông qua tham số được truyền vào trong hàm khởi tạo. Cuối cùng, xuất cả hai loại worker như sau:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Nếu bạn đang sử dụng TypeScript và muốn đảm bảo rằng các phương thức hook có tham số an toàn về kiểu, bạn có thể định nghĩa class dịch vụ của mình như sau:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Xử Lý Lỗi Dịch Vụ

Một lỗi được ném ra trong hook dịch vụ sẽ được ghi lại trong khi trình chạy tiếp tục. Nếu một hook trong dịch vụ của bạn là quan trọng đối với việc thiết lập hoặc kết thúc của trình chạy kiểm tra, `SevereServiceError` được xuất ra từ gói `webdriverio` có thể được sử dụng để dừng trình chạy.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: something critical for setup before all workers launch

        throw new SevereServiceError('Something went wrong.')
    }

    // custom service methods ...
}
```

## Nhập Dịch Vụ từ Module

Điều duy nhất cần làm bây giờ để sử dụng dịch vụ này là gán nó cho thuộc tính `services`.

Sửa đổi tệp `wdio.conf.js` của bạn để trông như thế này:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * sử dụng lớp dịch vụ đã nhập
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * sử dụng đường dẫn tuyệt đối đến dịch vụ
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Xuất Bản Dịch Vụ trên NPM

Để làm cho dịch vụ dễ sử dụng và dễ khám phá hơn bởi cộng đồng WebdriverIO, vui lòng tuân theo các khuyến nghị sau:

* Dịch vụ nên sử dụng quy ước đặt tên này: `wdio-*-service`
* Sử dụng từ khóa NPM: `wdio-plugin`, `wdio-service`
* Mục nhập `main` nên `export` một thể hiện của dịch vụ
* Các dịch vụ ví dụ: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Tuân theo mẫu đặt tên được khuyến nghị cho phép dịch vụ được thêm vào bằng tên:

```js
// Thêm wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Thêm Dịch Vụ Đã Xuất Bản vào WDIO CLI và Tài Liệu

Chúng tôi rất đánh giá cao mỗi plugin mới có thể giúp người khác chạy các bài kiểm tra tốt hơn! Nếu bạn đã tạo một plugin như vậy, vui lòng xem xét thêm nó vào CLI và tài liệu của chúng tôi để giúp nó dễ được tìm thấy hơn.

Vui lòng tạo một pull request với các thay đổi sau:

- thêm dịch vụ của bạn vào danh sách [dịch vụ được hỗ trợ](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) trong module CLI
- nâng cao [danh sách dịch vụ](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) để thêm tài liệu của bạn vào trang Webdriver.io chính thức