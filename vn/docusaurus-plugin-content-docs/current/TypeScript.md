---
id: typescript
title: Thiết lập TypeScript
---

Bạn có thể viết các bài kiểm thử bằng [TypeScript](http://www.typescriptlang.org) để có được tự động hoàn thành và kiểm tra kiểu dữ liệu.

Bạn sẽ cần cài đặt [`tsx`](https://github.com/privatenumber/tsx) trong `devDependencies`, thông qua:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO sẽ tự động phát hiện nếu các phụ thuộc này được cài đặt và sẽ biên dịch cấu hình và các bài kiểm thử cho bạn. Đảm bảo có một tệp `tsconfig.json` trong cùng thư mục với cấu hình WDIO của bạn.

#### TSConfig tùy chỉnh

Nếu bạn cần đặt một đường dẫn khác cho `tsconfig.json`, vui lòng đặt biến môi trường TSCONFIG_PATH với đường dẫn mong muốn của bạn, hoặc sử dụng [cài đặt tsConfigPath](/docs/configurationfile) trong cấu hình wdio.

Ngoài ra, bạn có thể sử dụng [biến môi trường](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) cho `tsx`.

#### Kiểm tra kiểu dữ liệu

Lưu ý rằng `tsx` không hỗ trợ kiểm tra kiểu dữ liệu - nếu bạn muốn kiểm tra các kiểu dữ liệu của mình thì bạn sẽ cần thực hiện điều này trong một bước riêng biệt với `tsc`.

## Thiết lập Framework

Tệp `tsconfig.json` của bạn cần có các thành phần sau:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Vui lòng tránh nhập `webdriverio` hoặc `@wdio/sync` một cách rõ ràng.
Các kiểu `WebdriverIO` và `WebDriver` có thể truy cập từ bất kỳ đâu sau khi được thêm vào `types` trong `tsconfig.json`. Nếu bạn sử dụng các dịch vụ, plugin WebdriverIO bổ sung hoặc gói tự động hóa `devtools`, vui lòng thêm chúng vào danh sách `types` vì nhiều gói cung cấp các kiểu dữ liệu bổ sung.

## Kiểu Framework

Tùy thuộc vào framework bạn sử dụng, bạn sẽ cần thêm các kiểu cho framework đó vào thuộc tính `types` trong `tsconfig.json`, cũng như cài đặt các định nghĩa kiểu của nó. Điều này đặc biệt quan trọng nếu bạn muốn có hỗ trợ kiểu dữ liệu cho thư viện khẳng định tích hợp [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Ví dụ, nếu bạn quyết định sử dụng framework Mocha, bạn cần cài đặt `@types/mocha` và thêm nó như sau để có tất cả các kiểu dữ liệu có sẵn toàn cục:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Dịch vụ

Nếu bạn sử dụng các dịch vụ thêm lệnh vào phạm vi trình duyệt, bạn cũng cần đưa chúng vào `tsconfig.json`. Ví dụ, nếu bạn sử dụng `@wdio/lighthouse-service`, hãy đảm bảo rằng bạn cũng thêm nó vào `types`, ví dụ:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Việc thêm dịch vụ và trình báo cáo vào cấu hình TypeScript của bạn cũng tăng cường sự an toàn kiểu dữ liệu của tệp cấu hình WebdriverIO của bạn.

## Định nghĩa kiểu

Khi chạy các lệnh WebdriverIO, tất cả các thuộc tính thường được gán kiểu để bạn không phải lo lắng về việc nhập các kiểu bổ sung. Tuy nhiên, có những trường hợp bạn muốn định nghĩa biến trước. Để đảm bảo rằng chúng an toàn về kiểu dữ liệu, bạn có thể sử dụng tất cả các kiểu được định nghĩa trong gói [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Ví dụ, nếu bạn muốn định nghĩa tùy chọn remote cho `webdriverio`, bạn có thể làm như sau:

```ts
import type { Options } from '@wdio/types'

// Đây là một ví dụ khi bạn có thể muốn nhập các kiểu trực tiếp
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Lỗi: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Đối với các trường hợp khác, bạn có thể sử dụng namespace `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Các tùy chọn cấu hình khác
}
```

## Mẹo và Gợi ý

### Biên dịch & Kiểm tra cú pháp

Để đảm bảo an toàn hoàn toàn, bạn có thể cân nhắc tuân theo các thực hành tốt nhất: biên dịch mã của bạn với trình biên dịch TypeScript (chạy `tsc` hoặc `npx tsc`) và có [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) chạy trên [pre-commit hook](https://github.com/typicode/husky).