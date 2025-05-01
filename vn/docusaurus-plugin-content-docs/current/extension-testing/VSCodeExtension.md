---
id: vscode-extensions
title: Kiểm thử Tiện ích mở rộng VS Code
---

WebdriverIO cho phép bạn kiểm thử liền mạch các tiện ích mở rộng [VS Code](https://code.visualstudio.com/) từ đầu đến cuối trong IDE VS Code Desktop hoặc như một tiện ích mở rộng web. Bạn chỉ cần cung cấp đường dẫn đến tiện ích mở rộng của mình và framework sẽ làm phần còn lại. Với [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service), mọi thứ đều được xử lý và nhiều hơn nữa:

- 🏗️ Cài đặt VSCode (có thể là phiên bản ổn định, phiên bản Insiders hoặc một phiên bản cụ thể)
- ⬇️ Tải xuống Chromedriver phù hợp với phiên bản VSCode đã cho
- 🚀 Cho phép bạn truy cập API VSCode từ các bài kiểm thử của mình
- 🖥️ Khởi động VSCode với cài đặt người dùng tùy chỉnh (bao gồm hỗ trợ cho VSCode trên Ubuntu, MacOS và Windows)
- 🌐 Hoặc phục vụ VSCode từ một máy chủ để có thể truy cập bởi bất kỳ trình duyệt nào để kiểm thử tiện ích mở rộng web
- 📔 Khởi tạo page object với các bộ định vị phù hợp với phiên bản VSCode của bạn

## Bắt đầu

Để khởi tạo một dự án WebdriverIO mới, hãy chạy:

```sh
npm create wdio@latest ./
```

Một trình wizard cài đặt sẽ hướng dẫn bạn qua quá trình này. Đảm bảo bạn chọn _"VS Code Extension Testing"_ khi nó hỏi bạn muốn thực hiện loại kiểm thử nào, sau đó chỉ cần giữ các giá trị mặc định hoặc sửa đổi dựa trên sở thích của bạn.

## Cấu hình Ví dụ

Để sử dụng dịch vụ này, bạn cần thêm `vscode` vào danh sách các dịch vụ của mình, tùy chọn theo sau là một đối tượng cấu hình. Điều này sẽ khiến WebdriverIO tải xuống các tệp nhị phân VSCode đã cho và phiên bản Chromedriver phù hợp:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" hoặc "stable" cho phiên bản VSCode mới nhất
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * tùy chọn bạn có thể xác định đường dẫn WebdriverIO lưu trữ tất cả
     * các tệp nhị phân VSCode và Chromedriver, ví dụ:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Nếu bạn xác định `wdio:vscodeOptions` với bất kỳ `browserName` nào khác ngoài `vscode`, ví dụ như `chrome`, dịch vụ sẽ phục vụ tiện ích mở rộng như một tiện ích mở rộng web. Nếu bạn kiểm thử trên Chrome, không cần thêm dịch vụ driver nào khác, ví dụ:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_Lưu ý:_ khi kiểm thử tiện ích mở rộng web, bạn chỉ có thể chọn giữa `stable` hoặc `insiders` cho `browserVersion`.

### Thiết lập TypeScript

Trong tệp `tsconfig.json` của bạn, hãy đảm bảo thêm `wdio-vscode-service` vào danh sách types:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Sử dụng

Sau đó, bạn có thể sử dụng phương thức `getWorkbench` để truy cập vào các page object cho các bộ định vị phù hợp với phiên bản VSCode mong muốn:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Từ đó, bạn có thể truy cập tất cả các page object bằng cách sử dụng các phương thức page object phù hợp. Tìm hiểu thêm về tất cả các page object có sẵn và phương thức của chúng trong [tài liệu page object](https://webdriverio-community.github.io/wdio-vscode-service/).

### Truy cập API VSCode

Nếu bạn muốn thực hiện tự động hóa nhất định thông qua [VSCode API](https://code.visualstudio.com/api/references/vscode-api), bạn có thể làm điều đó bằng cách chạy các lệnh từ xa thông qua lệnh tùy chỉnh `executeWorkbench`. Lệnh này cho phép thực thi mã từ xa từ bài kiểm thử của bạn bên trong môi trường VSCode và cho phép truy cập VSCode API. Bạn có thể truyền các tham số tùy ý vào hàm, sau đó sẽ được truyền vào hàm. Đối tượng `vscode` sẽ luôn được truyền vào như tham số đầu tiên, tiếp theo là các tham số của hàm bên ngoài. Lưu ý rằng bạn không thể truy cập các biến bên ngoài phạm vi hàm vì callback được thực thi từ xa. Đây là một ví dụ:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // outputs: "I am an API call!"
```

Để xem tài liệu page object đầy đủ, hãy kiểm tra [tài liệu](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Bạn có thể tìm thấy nhiều ví dụ sử dụng trong [bộ kiểm thử của dự án này](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Thông tin thêm

Bạn có thể tìm hiểu thêm về cách cấu hình [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) và cách tạo page object tùy chỉnh trong [tài liệu dịch vụ](/docs/wdio-vscode-service). Bạn cũng có thể xem bài nói chuyện sau đây của [Christian Bromann](https://twitter.com/bromann) về [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU):

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>