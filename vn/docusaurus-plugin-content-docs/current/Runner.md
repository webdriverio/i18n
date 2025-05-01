---
id: runner
title: Trình chạy
---

import CodeBlock from '@theme/CodeBlock';

Trình chạy trong WebdriverIO điều phối cách thức và nơi các bài kiểm thử được chạy khi sử dụng testrunner. WebdriverIO hiện hỗ trợ hai loại trình chạy khác nhau: trình chạy cục bộ và trình chạy trên trình duyệt.

## Trình chạy cục bộ (Local Runner)

[Trình chạy cục bộ](https://www.npmjs.com/package/@wdio/local-runner) khởi tạo framework của bạn (ví dụ: Mocha, Jasmine hoặc Cucumber) trong một tiến trình worker và chạy tất cả các tệp kiểm thử của bạn trong môi trường Node.js. Mỗi tệp kiểm thử được chạy trong một tiến trình worker riêng biệt cho mỗi capability, cho phép đạt được độ đồng thời tối đa. Mỗi tiến trình worker sử dụng một phiên bản trình duyệt duy nhất và do đó chạy phiên trình duyệt riêng, cho phép cách ly tối đa.

Do mỗi bài kiểm thử được chạy trong tiến trình cách ly riêng, không thể chia sẻ dữ liệu giữa các tệp kiểm thử. Có hai cách để giải quyết vấn đề này:

- sử dụng [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) để chia sẻ dữ liệu giữa tất cả các worker
- nhóm các tệp spec (đọc thêm trong [Tổ chức bộ kiểm thử](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Nếu không có gì khác được định nghĩa trong `wdio.conf.js`, Trình chạy cục bộ là trình chạy mặc định trong WebdriverIO.

### Cài đặt

Để sử dụng Trình chạy cục bộ, bạn có thể cài đặt nó qua:

```sh
npm install --save-dev @wdio/local-runner
```

### Thiết lập

Trình chạy cục bộ là trình chạy mặc định trong WebdriverIO nên không cần định nghĩa nó trong `wdio.conf.js`. Nếu bạn muốn thiết lập nó một cách rõ ràng, bạn có thể định nghĩa nó như sau:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Trình chạy trên trình duyệt (Browser Runner)

Trái ngược với [Trình chạy cục bộ](https://www.npmjs.com/package/@wdio/local-runner), [Trình chạy trên trình duyệt](https://www.npmjs.com/package/@wdio/browser-runner) khởi tạo và thực thi framework trong trình duyệt. Điều này cho phép bạn chạy các bài kiểm thử đơn vị hoặc kiểm thử component trong một trình duyệt thực tế thay vì trong JSDOM như nhiều framework kiểm thử khác.

Mặc dù [JSDOM](https://www.npmjs.com/package/jsdom) được sử dụng rộng rãi cho mục đích kiểm thử, nhưng cuối cùng nó không phải là một trình duyệt thực tế và bạn không thể mô phỏng môi trường di động với nó. Với trình chạy này, WebdriverIO cho phép bạn dễ dàng chạy các bài kiểm thử trong trình duyệt và sử dụng các lệnh WebDriver để tương tác với các phần tử được hiển thị trên trang.

Dưới đây là tổng quan về việc chạy kiểm thử trong JSDOM so với Trình chạy trên trình duyệt của WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Chạy các bài kiểm thử của bạn trong Node.js sử dụng việc tái triển khai các tiêu chuẩn web, đặc biệt là WHATWG DOM và Tiêu chuẩn HTML | Thực thi bài kiểm thử của bạn trong một trình duyệt thực tế và chạy mã trong môi trường mà người dùng của bạn sử dụng |
|2.| Tương tác với các component chỉ có thể được mô phỏng qua JavaScript | Bạn có thể sử dụng [WebdriverIO API](api) để tương tác với các phần tử thông qua giao thức WebDriver |
|3.| Hỗ trợ Canvas yêu cầu [các phụ thuộc bổ sung](https://www.npmjs.com/package/canvas) và [có giới hạn](https://github.com/Automattic/node-canvas/issues) | Bạn có quyền truy cập vào [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) thực tế |
|4.| JSDOM có một số [hạn chế](https://github.com/jsdom/jsdom#caveats) và Web API không được hỗ trợ | Tất cả Web API đều được hỗ trợ vì các bài kiểm thử chạy trong một trình duyệt thực tế |
|5.| Không thể phát hiện lỗi xuyên suốt các trình duyệt | Hỗ trợ cho tất cả các trình duyệt bao gồm cả trình duyệt di động |
|6.| __Không thể__ kiểm thử trạng thái giả của phần tử | Hỗ trợ cho các trạng thái giả như `:hover` hoặc `:active` |

Trình chạy này sử dụng [Vite](https://vitejs.dev/) để biên dịch mã kiểm thử của bạn và tải nó trong trình duyệt. Nó đi kèm với các cài đặt sẵn cho các framework component sau:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Mỗi tệp kiểm thử / nhóm tệp kiểm thử chạy trong một trang duy nhất, điều này có nghĩa là giữa mỗi bài kiểm thử, trang sẽ được tải lại để đảm bảo cách ly giữa các bài kiểm thử.

### Cài đặt

Để sử dụng Trình chạy trên trình duyệt, bạn có thể cài đặt nó qua:

```sh
npm install --save-dev @wdio/browser-runner
```

### Thiết lập

Để sử dụng Trình chạy trên trình duyệt, bạn phải định nghĩa thuộc tính `runner` trong tệp `wdio.conf.js` của bạn, ví dụ:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Tùy chọn Trình chạy

Trình chạy trên trình duyệt cho phép các cấu hình sau:

#### `preset`

Nếu bạn kiểm thử các component sử dụng một trong các framework đã đề cập ở trên, bạn có thể định nghĩa một preset để đảm bảo mọi thứ được cấu hình sẵn. Tùy chọn này không thể được sử dụng cùng với `viteConfig`.

__Kiểu:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Ví dụ:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Định nghĩa [cấu hình Vite](https://vitejs.dev/config/) của riêng bạn. Bạn có thể truyền vào một đối tượng tùy chỉnh hoặc nhập một tệp `vite.conf.ts` hiện có nếu bạn sử dụng Vite.js cho phát triển. Lưu ý rằng WebdriverIO giữ các cấu hình Vite tùy chỉnh để thiết lập môi trường kiểm thử.

__Kiểu:__ `string` hoặc [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) hoặc `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Ví dụ:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // hoặc chỉ đơn giản:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // hoặc sử dụng hàm nếu cấu hình vite của bạn chứa nhiều plugin
    // mà bạn chỉ muốn giải quyết khi giá trị được đọc
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Nếu đặt thành `true`, trình chạy sẽ cập nhật capabilities để chạy kiểm thử ở chế độ headless. Mặc định, tính năng này được bật trong môi trường CI nơi biến môi trường `CI` được đặt thành `'1'` hoặc `'true'`.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `false`, đặt thành `true` nếu biến môi trường `CI` được thiết lập

#### `rootDir`

Thư mục gốc của dự án.

__Kiểu:__ `string`<br />
__Mặc định:__ `process.cwd()`

#### `coverage`

WebdriverIO hỗ trợ báo cáo độ phủ kiểm thử thông qua [`istanbul`](https://istanbul.js.org/). Xem [Tùy chọn độ phủ](#coverage-options) để biết thêm chi tiết.

__Kiểu:__ `object`<br />
__Mặc định:__ `undefined`

### Tùy chọn độ phủ

Các tùy chọn sau cho phép cấu hình báo cáo độ phủ.

#### `enabled`

Bật tính năng thu thập độ phủ.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `false`

#### `include`

Danh sách các tệp được bao gồm trong độ phủ dưới dạng mẫu glob.

__Kiểu:__ `string[]`<br />
__Mặc định:__ `[**]`

#### `exclude`

Danh sách các tệp bị loại trừ khỏi độ phủ dưới dạng mẫu glob.

__Kiểu:__ `string[]`<br />
__Mặc định:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Danh sách các phần mở rộng tệp mà báo cáo nên bao gồm.

__Kiểu:__ `string | string[]`<br />
__Mặc định:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Thư mục để ghi báo cáo độ phủ vào.

__Kiểu:__ `string`<br />
__Mặc định:__ `./coverage`

#### `reporter`

Các trình báo cáo độ phủ để sử dụng. Xem [tài liệu istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) để biết danh sách chi tiết của tất cả các trình báo cáo.

__Kiểu:__ `string[]`<br />
__Mặc định:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Kiểm tra ngưỡng cho mỗi tệp. Xem `lines`, `functions`, `branches` và `statements` cho các ngưỡng thực tế.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `false`

#### `clean`

Xóa kết quả độ phủ trước khi chạy các bài kiểm thử.

__Kiểu:__ `boolean`<br />
__Mặc định:__ `true`

#### `lines`

Ngưỡng cho số dòng.

__Kiểu:__ `number`<br />
__Mặc định:__ `undefined`

#### `functions`

Ngưỡng cho các hàm.

__Kiểu:__ `number`<br />
__Mặc định:__ `undefined`

#### `branches`

Ngưỡng cho các nhánh.

__Kiểu:__ `number`<br />
__Mặc định:__ `undefined`

#### `statements`

Ngưỡng cho các câu lệnh.

__Kiểu:__ `number`<br />
__Mặc định:__ `undefined`

### Hạn chế

Khi sử dụng trình chạy trên trình duyệt của WebdriverIO, điều quan trọng cần lưu ý là các hộp thoại chặn luồng như `alert` hoặc `confirm` không thể được sử dụng một cách tự nhiên. Điều này là do chúng chặn trang web, khiến WebdriverIO không thể tiếp tục giao tiếp với trang, dẫn đến việc thực thi bị treo.

Trong những tình huống như vậy, WebdriverIO cung cấp các giả lập mặc định với các giá trị trả về mặc định cho các API này. Điều này đảm bảo rằng nếu người dùng vô tình sử dụng các API popup đồng bộ, việc thực thi sẽ không bị treo. Tuy nhiên, vẫn khuyến khích người dùng giả lập các web API này để có trải nghiệm tốt hơn. Đọc thêm trong [Mocking](/docs/component-testing/mocking).

### Ví dụ

Hãy đảm bảo kiểm tra các tài liệu về [kiểm thử component](https://webdriver.io/docs/component-testing) và xem qua [kho lưu trữ ví dụ](https://github.com/webdriverio/component-testing-examples) để xem các ví dụ sử dụng các framework này và nhiều framework khác.