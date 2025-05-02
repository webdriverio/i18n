---
id: visual-testing
title: Kiểm Thử Hình Ảnh
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Nó có thể làm được gì?

WebdriverIO cung cấp khả năng so sánh hình ảnh trên màn hình, phần tử hoặc toàn bộ trang cho

-   🖥️ Trình duyệt máy tính để bàn (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Trình duyệt di động / máy tính bảng (Chrome trên thiết bị giả lập Android / Safari trên iOS Simulators / Simulators / thiết bị thật) thông qua Appium
-   📱 Ứng dụng gốc (thiết bị giả lập Android / iOS Simulators / thiết bị thật) thông qua Appium (🌟 **MỚI** 🌟)
-   📳 Ứng dụng lai (hybrid) thông qua Appium

thông qua [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) là một dịch vụ nhẹ của WebdriverIO.

Điều này cho phép bạn:

-   lưu hoặc so sánh **màn hình/phần tử/toàn bộ trang** với một hình cơ sở
-   tự động **tạo hình cơ sở** khi chưa có hình cơ sở
-   **chặn các vùng tùy chỉnh** và thậm chí **tự động loại trừ** thanh trạng thái và/hoặc thanh công cụ (chỉ dành cho di động) trong quá trình so sánh
-   tăng kích thước ảnh chụp màn hình của phần tử
-   **ẩn văn bản** trong quá trình so sánh trang web để:
    -   **cải thiện độ ổn định** và ngăn chặn sự không ổn định trong việc hiển thị phông chữ
    -   chỉ tập trung vào **bố cục** của trang web
-   sử dụng **các phương pháp so sánh khác nhau** và một tập hợp **các công cụ đối chiếu bổ sung** giúp kiểm tra dễ đọc hơn
-   kiểm tra cách trang web của bạn sẽ **hỗ trợ di chuyển bằng phím tab trên bàn phím**, xem thêm [Di chuyển bằng tab qua trang web](#tabbing-through-a-website)
-   và nhiều tính năng khác, xem các tùy chọn [dịch vụ](./visual-testing/service-options) và [phương thức](./visual-testing/method-options)

Dịch vụ này là một module nhẹ để truy xuất dữ liệu và ảnh chụp màn hình cần thiết cho tất cả các trình duyệt/thiết bị. Sức mạnh so sánh đến từ [ResembleJS](https://github.com/Huddle/Resemble.js). Nếu bạn muốn so sánh hình ảnh trực tuyến, bạn có thể kiểm tra [công cụ trực tuyến](http://rsmbl.github.io/Resemble.js/).

:::info LƯU Ý Cho Ứng Dụng Gốc/Lai
Các phương thức `saveScreen`, `saveElement`, `checkScreen`, `checkElement` và các công cụ đối chiếu `toMatchScreenSnapshot` và `toMatchElementSnapshot` có thể được sử dụng cho Ứng dụng/Ngữ cảnh Gốc.

Vui lòng sử dụng thuộc tính `isHybridApp:true` trong cài đặt dịch vụ của bạn khi bạn muốn sử dụng nó cho Ứng dụng Lai.
:::

## Cài đặt

Cách dễ nhất là giữ `@wdio/visual-service` như một dev-dependency trong `package.json` của bạn, thông qua:

```sh
npm install --save-dev @wdio/visual-service
```

## Sử dụng

`@wdio/visual-service` có thể được sử dụng như một dịch vụ bình thường. Bạn có thể thiết lập nó trong tệp cấu hình của mình với các thông số sau:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Một số tùy chọn, xem tài liệu để biết thêm
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... các tùy chọn khác
            },
        ],
    ],
    // ...
};
```

Thêm các tùy chọn dịch vụ có thể được tìm thấy [tại đây](/docs/visual-testing/service-options).

Sau khi thiết lập trong cấu hình WebdriverIO của bạn, bạn có thể tiến hành thêm các kiểm tra hình ảnh vào [các bài kiểm tra của bạn](/docs/visual-testing/writing-tests).

### Capabilities
Để sử dụng module Kiểm Thử Hình Ảnh, **bạn không cần thêm bất kỳ tùy chọn nào vào capabilities của mình**. Tuy nhiên, trong một số trường hợp, bạn có thể muốn thêm metadata bổ sung vào các bài kiểm tra hình ảnh của mình, chẳng hạn như `logName`.

`logName` cho phép bạn gán tên tùy chỉnh cho mỗi capability, sau đó có thể được đưa vào tên tệp hình ảnh. Điều này đặc biệt hữu ích để phân biệt ảnh chụp màn hình được thực hiện trên các trình duyệt, thiết bị hoặc cấu hình khác nhau.

Để kích hoạt tính năng này, bạn có thể định nghĩa `logName` trong phần `capabilities` và đảm bảo tùy chọn `formatImageName` trong dịch vụ Kiểm Thử Hình Ảnh tham chiếu đến nó. Đây là cách bạn có thể thiết lập:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Tên nhật ký tùy chỉnh cho Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Tên nhật ký tùy chỉnh cho Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Một số tùy chọn, xem tài liệu để biết thêm
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Định dạng dưới đây sẽ sử dụng `logName` từ capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... các tùy chọn khác
            },
        ],
    ],
    // ...
};
```

#### Cách hoạt động
1. Thiết lập `logName`:

    - Trong phần `capabilities`, gán một `logName` duy nhất cho mỗi trình duyệt hoặc thiết bị. Ví dụ, `chrome-mac-15` xác định các bài kiểm tra chạy trên Chrome trên macOS phiên bản 15.

2. Đặt tên hình ảnh tùy chỉnh:

    - Tùy chọn `formatImageName` tích hợp `logName` vào tên tệp ảnh chụp màn hình. Ví dụ: nếu `tag` là homepage và độ phân giải là `1920x1080`, tên tệp kết quả có thể trông như thế này:

        `homepage-chrome-mac-15-1920x1080.png`

3. Lợi ích của việc đặt tên tùy chỉnh:

    - Việc phân biệt giữa các ảnh chụp màn hình từ các trình duyệt hoặc thiết bị khác nhau trở nên dễ dàng hơn nhiều, đặc biệt khi quản lý các hình cơ sở và gỡ lỗi sự khác biệt.

4. Lưu ý về mặc định:

    - Nếu `logName` không được đặt trong capabilities, tùy chọn `formatImageName` sẽ hiển thị nó dưới dạng chuỗi trống trong tên tệp (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Chúng tôi cũng hỗ trợ [MultiRemote](https://webdriver.io/docs/multiremote/). Để làm cho tính năng này hoạt động đúng, hãy đảm bảo rằng bạn thêm `wdio-ics:options` vào các capabilities của bạn như bạn có thể thấy bên dưới. Điều này sẽ đảm bảo rằng mỗi ảnh chụp màn hình sẽ có tên duy nhất.

[Viết các bài kiểm tra của bạn](/docs/visual-testing/writing-tests) sẽ không khác biệt so với việc sử dụng [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ĐIỀU NÀY!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ĐIỀU NÀY!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Chạy bằng lập trình

Đây là một ví dụ tối thiểu về cách sử dụng `@wdio/visual-service` thông qua tùy chọn `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Bắt đầu" dịch vụ để thêm các lệnh tùy chỉnh vào `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// hoặc sử dụng điều này CHỈ để lưu ảnh chụp màn hình
await browser.saveFullPageScreen("examplePaged", {});

// hoặc sử dụng điều này để xác thực. Cả hai phương thức không cần phải kết hợp, xem FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Di chuyển bằng tab qua trang web

Bạn có thể kiểm tra xem một trang web có thể truy cập bằng phím <kbd>TAB</kbd> trên bàn phím hay không. Việc kiểm tra phần này của khả năng truy cập luôn là một công việc (thủ công) tốn thời gian và khá khó thực hiện thông qua tự động hóa.
Với các phương thức `saveTabbablePage` và `checkTabbablePage`, bạn có thể vẽ các đường và chấm trên trang web của mình để xác minh thứ tự di chuyển bằng tab.

Lưu ý rằng điều này chỉ hữu ích cho các trình duyệt máy tính để bàn và **KHÔNG\*\*** dành cho thiết bị di động. Tất cả các trình duyệt máy tính để bàn đều hỗ trợ tính năng này.

:::note

Công việc này được lấy cảm hứng từ bài viết blog của [Viv Richards](https://github.com/vivrichards600) về ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Cách lựa chọn các phần tử có thể di chuyển bằng tab dựa trên module [tabbable](https://github.com/davidtheclark/tabbable). Nếu có bất kỳ vấn đề nào liên quan đến việc di chuyển tab, vui lòng kiểm tra [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) và đặc biệt là phần [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Nó hoạt động như thế nào

Cả hai phương thức sẽ tạo một phần tử `canvas` trên trang web của bạn và vẽ các đường và chấm để cho bạn thấy nơi TAB của bạn sẽ đi nếu người dùng cuối sử dụng nó. Sau đó, nó sẽ tạo ảnh chụp toàn trang để cho bạn tổng quan tốt về luồng.

:::important

**Chỉ sử dụng `saveTabbablePage` khi bạn cần tạo ảnh chụp màn hình và KHÔNG muốn so sánh nó **với một hình ảnh cơ sở**.\*\*\*\*

:::

Khi bạn muốn so sánh luồng tab với đường cơ sở, bạn có thể sử dụng phương thức `checkTabbablePage`. Bạn **KHÔNG** cần sử dụng cả hai phương thức cùng nhau. Nếu đã có một hình ảnh cơ sở được tạo, có thể được thực hiện tự động bằng cách cung cấp `autoSaveBaseline: true` khi bạn khởi tạo dịch vụ,
`checkTabbablePage` sẽ tạo hình ảnh _thực tế_ trước tiên và sau đó so sánh nó với hình ảnh cơ sở.

##### Tùy chọn

Cả hai phương thức đều sử dụng các tùy chọn giống nhau như [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) hoặc
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage).

#### Ví dụ

Đây là một ví dụ về cách thức hoạt động của tab trên [trang web thử nghiệm](https://guinea-pig.webdriver.io/image-compare.html) của chúng tôi:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Tự động cập nhật Ảnh chụp Hình ảnh thất bại

Cập nhật hình ảnh cơ sở thông qua dòng lệnh bằng cách thêm đối số `--update-visual-baseline`. Điều này sẽ

-   tự động sao chép ảnh chụp màn hình thực tế và đặt nó vào thư mục cơ sở
-   nếu có sự khác biệt, nó sẽ cho phép bài kiểm tra đạt vì đường cơ sở đã được cập nhật

**Cách sử dụng:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Khi chạy nhật ký ở chế độ info/debug, bạn sẽ thấy các nhật ký sau được thêm vào

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Hỗ trợ Typescript

Module này bao gồm hỗ trợ TypeScript, cho phép bạn hưởng lợi từ tính năng tự động hoàn thành, an toàn kiểu và cải thiện trải nghiệm nhà phát triển khi sử dụng dịch vụ Kiểm Thử Hình Ảnh.

### Bước 1: Thêm định nghĩa kiểu
Để đảm bảo TypeScript nhận ra các kiểu module, hãy thêm mục sau vào trường types trong tsconfig.json của bạn:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Bước 2: Bật tính năng an toàn kiểu cho các tùy chọn dịch vụ
Để thực thi kiểm tra kiểu trên các tùy chọn dịch vụ, hãy cập nhật cấu hình WebdriverIO của bạn:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Nhập định nghĩa kiểu
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Các tùy chọn dịch vụ
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Đảm bảo an toàn kiểu
        ],
    ],
    // ...
};
```

## Yêu cầu hệ thống

### Phiên bản 5 trở lên

Đối với phiên bản 5 trở lên, module này là một module hoàn toàn dựa trên JavaScript mà không có phụ thuộc hệ thống bổ sung ngoài [yêu cầu chung của dự án](/docs/gettingstarted#system-requirements). Nó sử dụng [Jimp](https://github.com/jimp-dev/jimp), một thư viện xử lý hình ảnh cho Node được viết hoàn toàn bằng JavaScript, không có phụ thuộc gốc.

### Phiên bản 4 và trước đó

Đối với phiên bản 4 và trước đó, module này phụ thuộc vào [Canvas](https://github.com/Automattic/node-canvas), một triển khai canvas cho Node.js. Canvas phụ thuộc vào [Cairo](https://cairographics.org/).

#### Chi tiết cài đặt

Theo mặc định, các tệp nhị phân cho macOS, Linux và Windows sẽ được tải xuống trong quá trình `npm install` của dự án. Nếu bạn không có hệ điều hành hoặc kiến trúc bộ xử lý được hỗ trợ, module sẽ được biên dịch trên hệ thống của bạn. Điều này yêu cầu một số phụ thuộc, bao gồm Cairo và Pango.

Để biết thông tin cài đặt chi tiết, xem [wiki node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Dưới đây là hướng dẫn cài đặt một dòng cho các hệ điều hành thông dụng. Lưu ý rằng `libgif/giflib`, `librsvg` và `libjpeg` là tùy chọn và chỉ cần thiết cho hỗ trợ GIF, SVG và JPEG. Cairo v1.10.0 trở lên là bắt buộc.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Sử dụng [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Nếu bạn mới cập nhật lên Mac OS X v10.11+ gần đây và đang gặp sự cố khi biên dịch, hãy chạy lệnh sau: `xcode-select --install`. Đọc thêm về vấn đề [trên Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Nếu bạn đã cài đặt Xcode 10.0 trở lên, để xây dựng từ nguồn, bạn cần NPM 6.4.1 trở lên.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Xem [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Xem [wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>