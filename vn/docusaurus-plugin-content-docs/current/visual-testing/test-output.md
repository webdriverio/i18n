---
id: test-output
title: Đầu ra thử nghiệm
---

:::info

[Trang demo WebdriverIO này](https://guinea-pig.webdriver.io/image-compare.html) đã được sử dụng cho ví dụ về hình ảnh đầu ra.

:::

## `enableLayoutTesting`

Điều này có thể được thiết lập trên [Tùy chọn dịch vụ](./service-options#enablelayouttesting) cũng như ở [Cấp độ phương thức](./method-options).

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            'visual',
            {
                enableLayoutTesting: true
            }
        ]
    ]
    // ...
}
```

Hình ảnh đầu ra cho [Tùy chọn dịch vụ](./service-options#enablelayouttesting) bằng với [Phương thức](./method-options), xem bên dưới.

### Hình ảnh đầu ra

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement | checkElement', value: 'saveelement'},
        {label: 'saveScreen | checkScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen | checkFullPageScreen', value: 'savefullpagescreen'},
        {label: 'saveTabbablePage | checkTabbablePage', value: 'saveTabbablePage'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
// Or
await browser.checkElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
```

![saveElement Desktop](/img/visual/layout-element-local-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

![saveScreen Desktop](/img/visual/layout-viewportScreenshot-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
// Or
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// Or
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### Đầu ra Console

Các phương thức `save(Screen/Element/FullPageScreen)` sẽ cung cấp thông tin sau khi phương thức đã được thực thi:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // Tỷ lệ pixel của thiết bị đã chạy
 *   devicePixelRatio: 1,
 *   // Tên tệp đã được định dạng, điều này phụ thuộc vào tùy chọn `formatImageName`
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // Đường dẫn nơi có thể tìm thấy tệp ảnh chụp màn hình thực tế
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### Hình ảnh đầu ra

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement', value: 'saveelement'},
        {label: 'saveScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen', value: 'savefullpagescreen'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".hero__title-logo", "example-element-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveElement Desktop](/img/visual/wdioLogo-chrome-latest-1-1366x768.png)
</TabItem>
<TabItem value="android">
![saveElement Mobile Android](/img/visual/wdioLogo-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveElement Mobile iOS](/img/visual/wdioLogo-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android ChromeDriver', value: 'android-chromedriver'},
        {label: 'Android nativeWebScreenshot', value: 'android-native'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveScreen Desktop](/img/visual/examplePage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android-chromedriver">
![saveScreen Mobile Android ChromeDriver](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="android-native">
![saveScreen Mobile Android nativeWebScreenshot](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">

:::info MẸO
Việc thực thi `saveScreen` trên iOS mặc định không có viền góc thiết bị. Để có điều này, vui lòng thêm tùy chọn `addIOSBezelCorners:true` khi khởi tạo dịch vụ, xem [ở đây](./service-options#addiosbezelcorners)
:::

![saveScreen Mobile iOS](/img/visual/screenshot-Iphone12Portrait15-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveFullPageScreens Desktop](/img/visual/fullPage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android">
![saveFullPageScreens Mobile Android](/img/visual/fullPage-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveFullPageScreens Mobile iOS](/img/visual/fullPage-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>
</Tabs>

## check(Screen/Element/FullPageScreen)

### Đầu ra Console

Mặc định, các phương thức `check(Screen/Element/FullPageScreen)` sẽ chỉ cung cấp phần trăm không khớp như `1.23`, nhưng khi plugin có tùy chọn `returnAllCompareData: true`, các thông tin sau sẽ được cung cấp sau khi phương thức đã được thực thi:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // Tên tệp đã định dạng, điều này phụ thuộc vào tùy chọn `formatImageName`
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // Thư mục thực tế và tên tệp
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // Thư mục cơ sở và tên tệp
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // Thư mục sau đây là tùy chọn và chỉ khi có sự không khớp
 *         // Thư mục chứa các diffs và tên tệp
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // Phần trăm không khớp
 *     misMatchPercentage: 2.34,
 * };
 */
```

### Hình ảnh đầu ra

:::info
Các hình ảnh dưới đây sẽ chỉ hiển thị sự khác biệt như một kết quả của việc chạy các lệnh kiểm tra. Chỉ có sự khác biệt trong trình duyệt được hiển thị, nhưng đầu ra cho Android và iOS là giống nhau.
:::

<Tabs
    defaultValue="checkelement"
    values={[
        {label: 'checkElement', value: 'checkelement'},
        {label: 'checkScreen', value: 'checkscreen'},
        {label: 'checkFullPageScreen', value: 'checkfullpagescreen'},
    ]}
>
<TabItem value="checkelement">

```js
await browser.checkElement("#__docusaurus_skipToContent_fallback > header > div > div.buttons_pzbO > a:nth-child(1)", "example-element-tag")
```

:::info
Văn bản nút đã được thay đổi từ `Get Started` thành `Getting Started!` và được phát hiện là một thay đổi.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
Văn bản nút đã được thay đổi từ `Get Started` thành `Getting Started!` và được phát hiện là một thay đổi.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
Văn bản nút đã được thay đổi từ `Get Started` thành `Getting Started!` và được phát hiện là một thay đổi.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## Block-Outs

Ở đây bạn sẽ tìm thấy một ví dụ đầu ra cho block-outs trong Android NativeWebScreenshot và iOS nơi trạng thái+địa chỉ và thanh công cụ bị chặn.

<Tabs
    defaultValue="nativeWebScreenshot"
    values={[
        {label: 'Android nativeWebScreenshot', value: 'nativeWebScreenshot'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="nativeWebScreenshot">

![Blockouts Android](/img/visual/android.blockouts.png)

</TabItem>

<TabItem value="ios">

![Blockouts iOS](/img/visual/ios.blockouts.png)

</TabItem>

</Tabs>