---
id: web-extensions
title: Kiểm Thử Tiện Ích Mở Rộng Web
---

WebdriverIO là công cụ lý tưởng để tự động hóa trình duyệt. Tiện ích mở rộng web là một phần của trình duyệt và có thể được tự động hóa theo cùng cách. Bất cứ khi nào tiện ích mở rộng web của bạn sử dụng content scripts để chạy JavaScript trên các trang web hoặc cung cấp một popup modal, bạn có thể chạy kiểm thử e2e cho nó bằng WebdriverIO.

## Tải Tiện Ích Mở Rộng Web vào Trình Duyệt

Bước đầu tiên, chúng ta phải tải tiện ích đang được kiểm thử vào trình duyệt như một phần của phiên làm việc. Điều này hoạt động khác nhau cho Chrome và Firefox.

:::info

Tài liệu này bỏ qua các tiện ích mở rộng Safari vì sự hỗ trợ của họ còn kém xa và nhu cầu người dùng không cao. Nếu bạn đang xây dựng tiện ích mở rộng web cho Safari, vui lòng [tạo một issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E) và cộng tác để đưa nó vào đây.

:::

### Chrome

Tải tiện ích mở rộng web trong Chrome có thể được thực hiện thông qua việc cung cấp một chuỗi `base64` được mã hóa của tệp `crx` hoặc bằng cách cung cấp đường dẫn đến thư mục tiện ích mở rộng web. Cách dễ nhất là làm theo cách sau bằng cách định nghĩa các khả năng Chrome của bạn như sau:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // giả sử wdio.conf.js của bạn nằm trong thư mục gốc và các tệp
            // tiện ích mở rộng web đã biên dịch nằm trong thư mục './dist'
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Nếu bạn tự động hóa một trình duyệt khác ngoài Chrome, ví dụ như Brave, Edge hoặc Opera, rất có thể tùy chọn trình duyệt sẽ phù hợp với ví dụ trên, chỉ sử dụng tên khả năng khác, ví dụ: `ms:edgeOptions`.

:::

Nếu bạn biên dịch tiện ích của mình dưới dạng tệp `.crx` bằng cách sử dụng gói NPM [crx](https://www.npmjs.com/package/crx), bạn cũng có thể chèn tiện ích đã đóng gói qua:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

Để tạo hồ sơ Firefox bao gồm các tiện ích mở rộng, bạn có thể sử dụng [Dịch Vụ Hồ Sơ Firefox](/docs/firefox-profile-service) để thiết lập phiên làm việc của bạn phù hợp. Tuy nhiên, bạn có thể gặp vấn đề khi tiện ích phát triển cục bộ của bạn không thể được tải do các vấn đề về ký tên. Trong trường hợp này, bạn cũng có thể tải tiện ích mở rộng trong hook `before` thông qua lệnh [`installAddOn`](/docs/api/gecko#installaddon), ví dụ:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

Để tạo file `.xpi`, khuyến nghị sử dụng gói NPM [`web-ext`](https://www.npmjs.com/package/web-ext). Bạn có thể đóng gói tiện ích của mình bằng lệnh ví dụ sau:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## Mẹo và Thủ Thuật

Phần sau đây chứa một số mẹo và thủ thuật hữu ích khi kiểm thử tiện ích mở rộng web.

### Kiểm Thử Popup Modal trong Chrome

Nếu bạn định nghĩa một mục nhập `default_popup` trong hành động trình duyệt trong [extension manifest](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action), bạn có thể kiểm thử trực tiếp trang HTML đó, vì việc nhấp vào biểu tượng tiện ích ở thanh trên cùng của trình duyệt sẽ không hoạt động. Thay vào đó, bạn phải mở trực tiếp tệp popup html.

Trong Chrome, điều này hoạt động bằng cách lấy ID tiện ích và mở trang popup thông qua `browser.url('...')`. Hành vi trên trang đó sẽ giống với trong popup. Để làm vậy, chúng tôi khuyên bạn nên viết lệnh tùy chỉnh sau:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

Trong `wdio.conf.js` của bạn, bạn có thể nhập tệp này và đăng ký lệnh tùy chỉnh trong hook `before`, ví dụ:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

Bây giờ, trong bài kiểm thử của bạn, bạn có thể truy cập trang popup qua:

```ts
await browser.openExtensionPopup('My Web Extension')
```