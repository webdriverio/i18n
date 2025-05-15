---
id: service-options
title: 서비스 옵션
---

서비스 옵션은 서비스가 인스턴스화될 때 설정할 수 있는 옵션으로, 각 메서드 호출에 사용됩니다.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## 기본 옵션

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6`
-   **Supported:** Web

iOS와 Android에서 주소 표시줄에 추가해야 하는 패딩으로, 뷰포트를 적절하게 잘라내기 위해 필요합니다.

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

이 옵션을 사용하면 요소 스크린샷이 생성될 때 요소를 자동으로 뷰로 스크롤하는 기능을 비활성화할 수 있습니다.

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview), Native App

iOS 기기의 스크린샷에 베젤 모서리와 노치/다이나믹 아일랜드를 추가합니다.

:::info 참고
이 기능은 기기 이름이 **자동으로** 결정될 수 있고 다음 정규화된 기기 이름 목록과 일치하는 경우에만 가능합니다. 정규화는 이 모듈에서 수행됩니다.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview), Native App

비교 중에 기준 이미지가 발견되지 않으면 이미지가 자동으로 기준 폴더에 복사됩니다.

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported:** Web, Hybrid App (Webview), Native App

비교 중에 사용되는 모든 기준 이미지가 저장될 디렉토리입니다. 설정하지 않으면 시각적 테스트를 실행하는 스펙 옆에 있는 `__snapshots__/` 폴더에 파일이 저장되는 기본값이 사용됩니다. `string`을 반환하는 함수를 사용하여 `baselineFolder` 값을 설정할 수도 있습니다:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// 또는
{
    baselineFolder: () => {
        // 여기에서 마법을 수행합니다
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview), Native App

초기화 시 런타임 폴더(`actual` 및 `diff`)를 삭제합니다

:::info 참고
이 기능은 [`screenshotPath`](#screenshotpath)가 플러그인 옵션을 통해 설정된 경우에만 작동하며, 메서드에서 폴더를 설정하면 **작동하지 않습니다**
:::

### `createJsonReportFiles` **(NEW)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

이제 비교 결과를 JSON 보고서 파일로 내보낼 수 있는 옵션이 있습니다. `createJsonReportFiles: true` 옵션을 제공하면 비교되는 각 이미지에 대해 `actual` 폴더에 각 `actual` 이미지 결과 옆에 저장되는 보고서가 생성됩니다. 출력은 다음과 같습니다:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

모든 테스트가 실행되면 비교 컬렉션이 포함된 새 JSON 파일이 생성되어 `actual` 폴더의 루트에서 찾을 수 있습니다. 데이터는 다음과 같이 그룹화됩니다:

-   Jasmine/Mocha의 경우 `describe` 또는 CucumberJS의 경우 `Feature`
-   Jasmine/Mocha의 경우 `it` 또는 CucumberJS의 경우 `Scenario`
    그리고 다음과 같이 정렬됩니다:
-   `commandName`, 이미지를 비교하는 데 사용된 비교 메서드 이름
-   `instanceData`, 먼저 브라우저, 그 다음 기기, 그 다음 플랫폼
    다음과 같은 형태로 나타납니다

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

보고서 데이터를 통해 모든 마법과 데이터 수집을 직접 수행하지 않고도 자신만의 시각적 보고서를 구축할 수 있습니다.

:::info 참고
`@wdio/visual-testing` 버전 `5.2.0` 이상을 사용해야 합니다
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

애플리케이션에서 모든 `input`, `textarea`, `[contenteditable]` 캐럿 "깜빡임"을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 캐럿이 `transparent`로 설정되고 완료되면 재설정됩니다

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

애플리케이션에서 모든 CSS 애니메이션을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 모든 애니메이션이 비활성화되고 완료되면 재설정됩니다

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web

페이지의 모든 텍스트를 숨겨 비교에 레이아웃만 사용되도록 합니다. 숨기기는 **각** 요소에 `'color': 'transparent !important'` 스타일을 추가하여 수행됩니다.

출력은 [테스트 출력](/docs/visual-testing/test-output#enablelayouttesting)을 참조하세요

:::info
이 플래그를 사용하면 텍스트가 포함된 각 요소(즉, `p, h1, h2, h3, h4, h5, h6, span, a, li`뿐만 아니라 `div|button|..` 등)가 이 속성을 갖게 됩니다. 이를 맞춤 설정할 수 있는 옵션은 **없습니다**.
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported:** Web, Hybrid App (Webview), Native App

저장된 이미지의 이름은 다음과 같은 형식 문자열로 `formatImageName` 매개변수를 전달하여 사용자 정의할 수 있습니다:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

문자열을 형식화하기 위해 다음 변수를 전달할 수 있으며, 이는 인스턴스 capabilities에서 자동으로 읽혀집니다.
값이 결정될 수 없는 경우 기본값이 사용됩니다.

-   `browserName`: 제공된 capabilities의 브라우저 이름
-   `browserVersion`: capabilities에 제공된 브라우저 버전
-   `deviceName`: capabilities의 기기 이름
-   `dpr`: 기기 픽셀 비율
-   `height`: 화면 높이
-   `logName`: capabilities의 logName
-   `mobile`: 앱 스크린샷과 브라우저 스크린샷을 구분하기 위해 `deviceName` 뒤에 `_app` 또는 브라우저 이름을 추가합니다
-   `platformName`: 제공된 capabilities의 플랫폼 이름
-   `platformVersion`: capabilities에 제공된 플랫폼 버전
-   `tag`: 호출되는 메서드에서 제공하는 태그
-   `width`: 화면 너비

:::info

`formatImageName`에 사용자 정의 경로/폴더를 제공할 수 없습니다. 경로를 변경하려면 다음 옵션을 확인하세요:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- 메서드별 [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported:** Web

스크롤 후 대기할 시간(밀리초)입니다. 이는 지연 로딩이 있는 페이지를 식별하는 데 도움이 될 수 있습니다.

:::info

이 기능은 서비스/메서드 옵션 `userBasedFullPageScreenshot`이 `true`로 설정된 경우에만 작동합니다. [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)도 참조하세요

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

애플리케이션에서 스크롤바를 숨깁니다. true로 설정하면 스크린샷을 찍기 전에 모든 스크롤바가 비활성화됩니다. 추가 문제를 방지하기 위해 기본값은 `true`입니다.

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported:** Web, Hybrid App (Webview), Native App

추가 로그를 제공합니다. 옵션은 `debug | info | warn | silent`입니다.

오류는 항상 콘솔에 로깅됩니다.

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported:** Web, Hybrid App (Webview), Native App

인스턴스별로 이미지를 별도의 폴더에 저장합니다. 예를 들어, 모든 Chrome 스크린샷은 `desktop_chrome`과 같은 Chrome 폴더에 저장됩니다.

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported:** Web, Hybrid App (Webview), Native App

actual/different 스크린샷을 저장할 디렉토리입니다. 설정하지 않으면 기본값이 사용됩니다. 문자열을 반환하는 함수를 사용하여 screenshotPath 값을 설정할 수도 있습니다:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// 또는
{
    screenshotPath: () => {
        // 여기에서 마법을 수행합니다
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Android의 경우 `6`, iOS의 경우 `15`(기본값은 `6`이며, 노치가 있는 iPhone이나 홈 바가 있는 iPad의 가능한 홈 바에 대해 `9`가 자동으로 추가됨)
-   **Supported:** Web

iOS 및 Android의 툴바에 추가해야 하는 패딩으로, 뷰포트를 적절하게 잘라내기 위해 필요합니다.

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview) **visual-service@7.0.0에서 도입됨**

기본적으로 데스크톱 웹에서 전체 페이지 스크린샷은 WebDriver BiDi 프로토콜을 사용하여 캡처되며, 이를 통해 스크롤 없이 빠르고 안정적이며 일관된 스크린샷을 얻을 수 있습니다.
userBasedFullPageScreenshot이 true로 설정되면, 스크린샷 프로세스는 실제 사용자를 시뮬레이션합니다: 페이지를 스크롤하고, 뷰포트 크기의 스크린샷을 캡처한 다음 이를 함께 스티칭합니다. 이 방법은 지연 로딩 콘텐츠가 있는 페이지나 스크롤 위치에 따라 동적 렌더링이 필요한 페이지에 유용합니다.

페이지가 스크롤하는 동안 콘텐츠 로딩에 의존하거나 이전 스크린샷 메서드의 동작을 유지하려는 경우 이 옵션을 사용하세요.

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported:** Web, Hybrid App (Webview)

폰트(타사 폰트 포함)는 동기적으로 또는 비동기적으로 로드될 수 있습니다. 비동기 로딩은 WebdriverIO가 페이지가 완전히 로드되었다고 판단한 후에 폰트가 로드될 수 있음을 의미합니다. 폰트 렌더링 문제를 방지하기 위해 이 모듈은 기본적으로 스크린샷을 찍기 전에 모든 폰트가 로드될 때까지 기다립니다.

## Tabbable 옵션

:::info 참고

이 모듈은 또한 사용자가 키보드로 웹사이트를 _탭_ 이동하는 방식을 선 및 점으로 그려서 탭으로 이동 가능한 요소에서 다음 탭으로 이동 가능한 요소로 표시하는 기능을 지원합니다.<br/>
이 작업은 [Viv Richards](https://github.com/vivrichards600)의 블로그 포스트 ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)에서 영감을 받았습니다.<br/>
탭으로 이동 가능한 요소를 선택하는 방식은 [tabbable](https://github.com/davidtheclark/tabbable) 모듈을 기반으로 합니다. 탭 이동과 관련된 문제가 있는 경우 [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)와 특히 [자세한 정보 섹션](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)을 확인하세요.

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

`{save|check}Tabbable` 메서드를 사용할 때 선과 점에 대해 변경할 수 있는 옵션입니다. 옵션은 아래에 설명되어 있습니다.

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원을 변경하는 옵션입니다.

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원의 배경색입니다.

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원의 테두리 색상입니다.

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원의 테두리 두께입니다.

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원 안의 텍스트 글꼴 색상입니다. 이는 [`showNumber`](./#tabbableoptionscircleshownumber)가 `true`로 설정된 경우에만 표시됩니다.

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원 안의 텍스트 글꼴 패밀리입니다. 이는 [`showNumber`](./#tabbableoptionscircleshownumber)가 `true`로 설정된 경우에만 표시됩니다.

브라우저에서 지원하는 글꼴을 설정해야 합니다.

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원 안의 텍스트 글꼴 크기입니다. 이는 [`showNumber`](./#tabbableoptionscircleshownumber)가 `true`로 설정된 경우에만 표시됩니다.

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원의 크기입니다.

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

원 안에 탭 순서 번호를 표시합니다.

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

선을 변경하는 옵션입니다.

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

선의 색상입니다.

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68)를 참조하세요
-   **Supported:** Web

선의 두께입니다.

## 비교 옵션

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** 모든 기본값은 [여기](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60)를 참조하세요
-   **Supported:** Web, Hybrid App (Webview), Native App (자세한 정보는 [메서드 비교 옵션](./method-options#compare-check-options) 참조)

비교 옵션은 서비스 옵션으로도 설정할 수 있으며, [메서드 비교 옵션](/docs/visual-testing/method-options#compare-check-options)에 설명되어 있습니다.