---
id: test-output
title: 테스트 출력
---

:::info

[이 WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) 데모 사이트는 이미지 출력 예제에 사용되었습니다.

:::

## `enableLayoutTesting`

이것은 [서비스 옵션](./service-options#enablelayouttesting)과 [메소드](./method-options) 레벨 모두에서 설정할 수 있습니다.

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

[서비스 옵션](./service-options#enablelayouttesting)의 이미지 출력은 아래 [메소드](./method-options)와 동일합니다.

### 이미지 출력

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

### 콘솔 출력

`save(Screen/Element/FullPageScreen)` 메소드는 실행 후 다음 정보를 제공합니다:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // 실행된 인스턴스의 장치 픽셀 비율
 *   devicePixelRatio: 1,
 *   // 형식이 지정된 파일 이름, 이는 `formatImageName` 옵션에 따라 달라집니다
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // 실제 스크린샷 파일을 찾을 수 있는 경로
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### 이미지 출력

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

:::info TIP
iOS `saveScreen` 실행은 기본적으로 기기 베젤 모서리가 포함되지 않습니다. 이를 포함하려면 서비스를 인스턴스화할 때 `addIOSBezelCorners:true` 옵션을 추가하세요. [여기](./service-options#addiosbezelcorners) 참조
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

### 콘솔 출력

기본적으로 `check(Screen/Element/FullPageScreen)` 메소드는 `1.23`과 같은 불일치 백분율만 제공하지만, 플러그인에 `returnAllCompareData: true` 옵션이 설정되어 있으면 메소드 실행 후 다음 정보가 제공됩니다:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // 형식이 지정된 파일 이름, 이는 `formatImageName` 옵션에 따라 달라집니다
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // 실제 폴더와 파일 이름
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // 기준 폴더와 파일 이름
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // 다음 폴더는 선택 사항이며 불일치가 있는 경우에만 표시됩니다
 *         // 차이를 저장하는 폴더와 파일 이름
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // 불일치 백분율
 *     misMatchPercentage: 2.34,
 * };
 */
```

### 이미지 출력

:::info
아래 이미지는 체크 명령을 실행한 결과로 발생한 차이만 보여줍니다. 브라우저에서의 차이만 표시되지만, Android와 iOS의 출력도 동일합니다.
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
버튼 텍스트가 `Get Started`에서 `Getting Started!`로 변경되어 변화로 감지되었습니다.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
버튼 텍스트가 `Get Started`에서 `Getting Started!`로 변경되어 변화로 감지되었습니다.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
버튼 텍스트가 `Get Started`에서 `Getting Started!`로 변경되어 변화로 감지되었습니다.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## 블록 아웃

여기서는 상태+주소와 툴바가 차단된 Android NativeWebScreenshot 및 iOS의 블록 아웃에 대한 예제 출력을 확인할 수 있습니다.

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