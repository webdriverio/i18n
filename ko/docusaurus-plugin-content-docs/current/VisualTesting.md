---
id: visual-testing
title: 시각적 테스팅
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 어떤 기능을 제공하나요?

WebdriverIO는 다음 환경에서 화면, 요소 또는 전체 페이지에 대한 이미지 비교를 제공합니다:

-   🖥️ 데스크톱 브라우저 (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 모바일 / 태블릿 브라우저 (Android 에뮬레이터의 Chrome / iOS 시뮬레이터의 Safari / 시뮬레이터 / 실제 기기) via Appium
-   📱 네이티브 앱 (Android 에뮬레이터 / iOS 시뮬레이터 / 실제 기기) via Appium (🌟 **신규** 🌟)
-   📳 하이브리드 앱 via Appium

경량 WebdriverIO 서비스인 [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service)를 통해 제공됩니다.

다음과 같은 기능을 사용할 수 있습니다:

-   **화면/요소/전체 페이지** 스크린샷을 기준 이미지와 저장하거나 비교
-   기준 이미지가 없을 때 자동으로 **기준 이미지 생성**
-   **사용자 지정 영역 차단** 및 비교 중 상태바와 툴바(모바일 전용)를 **자동으로 제외**
-   요소 크기 스크린샷 확대
-   웹사이트 비교 중 **텍스트 숨기기**:
    -   **안정성 향상** 및 폰트 렌더링 불안정성 방지
    -   웹사이트의 **레이아웃**에만 집중
-   **다양한 비교 방법** 및 더 읽기 쉬운 테스트를 위한 **추가 매처**
-   키보드로 **탭 이동 지원**을 웹사이트에서 확인하기, [웹사이트에서 탭 이동](#tabbing-through-a-website) 참조
-   그리고 더 많은 기능, [서비스](./visual-testing/service-options) 및 [메소드](./visual-testing/method-options) 옵션 참조

이 서비스는 모든 브라우저/기기에 필요한 데이터와 스크린샷을 가져오는 경량 모듈입니다. 비교 기능은 [ResembleJS](https://github.com/Huddle/Resemble.js)에서 제공됩니다. 온라인에서 이미지를 비교하려면 [온라인 도구](http://rsmbl.github.io/Resemble.js/)를 확인하세요.

:::info 네이티브/하이브리드 앱 참고
`saveScreen`, `saveElement`, `checkScreen`, `checkElement` 메소드와 `toMatchScreenSnapshot`, `toMatchElementSnapshot` 매처는 네이티브 앱/컨텍스트에서 사용할 수 있습니다.

하이브리드 앱에서 사용하려면 서비스 설정에서 `isHybridApp:true` 속성을 사용하세요.
:::

## 설치

`@wdio/visual-service`를 `package.json`에 dev-dependency로 유지하는 것이 가장 쉬운 방법입니다:

```sh
npm install --save-dev @wdio/visual-service
```

## 사용법

`@wdio/visual-service`는 일반 서비스로 사용할 수 있습니다. 다음과 같이 구성 파일에서 설정할 수 있습니다:

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
                // 일부 옵션, 자세한 내용은 문서 참조
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... 더 많은 옵션
            },
        ],
    ],
    // ...
};
```

더 많은 서비스 옵션은 [여기](/docs/visual-testing/service-options)에서 찾을 수 있습니다.

WebdriverIO 구성에서 설정한 후, [테스트](/docs/visual-testing/writing-tests)에 시각적 검증을 추가할 수 있습니다.

### 기능
시각적 테스팅 모듈을 사용하기 위해 **capabilities에 추가 옵션을 추가할 필요는 없습니다**. 그러나 일부 경우에는 `logName`과 같은 추가 메타데이터를 시각적 테스트에 추가하고 싶을 수 있습니다.

`logName`을 사용하면 각 capability에 사용자 지정 이름을 할당할 수 있으며, 이는 이미지 파일 이름에 포함될 수 있습니다. 이는 다양한 브라우저, 장치 또는 구성에서 촬영한 스크린샷을 구분하는 데 특히 유용합니다.

이를 활성화하려면 `capabilities` 섹션에서 `logName`을 정의하고 Visual Testing 서비스의 `formatImageName` 옵션에서 참조하도록 설정하세요. 다음과 같이 설정할 수 있습니다:

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
                logName: 'chrome-mac-15', // Chrome용 사용자 지정 로그 이름
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Firefox용 사용자 지정 로그 이름
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // 일부 옵션, 자세한 내용은 문서 참조
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // 아래 형식은 capabilities의 `logName`을 사용합니다
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... 더 많은 옵션
            },
        ],
    ],
    // ...
};
```

#### 작동 방식
1. `logName` 설정:

    - `capabilities` 섹션에서 각 브라우저나 장치에 고유한 `logName`을 할당합니다. 예를 들어, `chrome-mac-15`는 macOS 버전 15에서 실행되는 Chrome에서의 테스트를 식별합니다.

2. 사용자 지정 이미지 이름 지정:

    - `formatImageName` 옵션은 스크린샷 파일 이름에 `logName`을 통합합니다. 예를 들어, `tag`가 homepage이고 해상도가 `1920x1080`인 경우 결과 파일 이름은 다음과 같을 수 있습니다:

        `homepage-chrome-mac-15-1920x1080.png`

3. 사용자 지정 이름 지정의 이점:

    - 서로 다른 브라우저나 장치의 스크린샷을 구분하는 것이 훨씬 쉬워져 기준선을 관리하고 불일치를 디버깅할 때 특히 유용합니다.

4. 기본값에 대한 참고 사항:

    - `capabilities`에 `logName`이 설정되지 않은 경우, `formatImageName` 옵션은 파일 이름에 빈 문자열로 표시됩니다(`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

[MultiRemote](https://webdriver.io/docs/multiremote/)도 지원합니다. 이를 올바르게 작동시키려면 아래에서 볼 수 있듯이 capabilities에 `wdio-ics:options`를 추가해야 합니다. 이렇게 하면 각 스크린샷이 고유한 이름을 갖게 됩니다.

[테스트 작성](/docs/visual-testing/writing-tests)은 [testrunner](https://webdriver.io/docs/testrunner)를 사용하는 것과 비교하여 다르지 않습니다.

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
                // 이것!!!
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
                // 이것!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### 프로그래밍 방식으로 실행

다음은 `remote` 옵션을 통해 `@wdio/visual-service`를 사용하는 최소한의 예입니다:

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

// "Start" 서비스로 사용자 정의 명령을 `browser`에 추가
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// 스크린샷만 저장하려면 이 방법 사용
await browser.saveFullPageScreen("examplePaged", {});

// 검증하려면 이 방법 사용. 두 메서드를 결합할 필요 없음(FAQ 참조)
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### 웹사이트에서 탭 이동

키보드 <kbd>TAB</kbd> 키를 사용하여 웹사이트가 접근 가능한지 확인할 수 있습니다. 접근성의 이 부분을 테스트하는 것은 항상 시간이 많이 소요되는 (수동) 작업이었으며 자동화를 통해 수행하기가 상당히 어려웠습니다.
`saveTabbablePage` 및 `checkTabbablePage` 메서드를 사용하면 웹사이트에 선과 점을 그려 탭 순서를 확인할 수 있습니다.

이 기능은 데스크톱 브라우저에만 유용하며 모바일 장치에는 **적용되지 않습니다**. 모든 데스크톱 브라우저는 이 기능을 지원합니다.

:::note

이 작업은 [Viv Richards](https://github.com/vivrichards600)의 블로그 포스트 ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript)에서 영감을 받았습니다.

탭 가능한 요소를 선택하는 방식은 [tabbable](https://github.com/davidtheclark/tabbable) 모듈을 기반으로 합니다. 탭 이동과 관련된 문제가 있는 경우 [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md)와 특히 [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) 섹션을 확인하세요.

:::

#### 작동 방식

두 메서드 모두 웹사이트에 `canvas` 요소를 생성하고 선과 점을 그려 최종 사용자가 TAB을 사용할 때 어디로 이동하는지 보여줍니다. 그 후, 전체 페이지 스크린샷을 생성하여 흐름을 잘 볼 수 있게 합니다.

:::important

**스크린샷을 생성하고 **기준** 이미지와 비교하지 **않으려는** 경우에만 `saveTabbablePage`를 사용하세요.\*\*\*\*

:::

탭 이동 흐름을 기준 이미지와 비교하려면 `checkTabbablePage` 메서드를 사용할 수 있습니다. 두 메서드를 함께 사용할 **필요는 없습니다**. 이미 기준 이미지가 생성되어 있다면(서비스를 인스턴스화할 때 `autoSaveBaseline: true`를 제공하여 자동으로 수행할 수 있음),
`checkTabbablePage`는 먼저 _실제_ 이미지를 생성한 다음 기준 이미지와 비교합니다.

##### 옵션

두 메서드 모두 [`saveFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#savefullpagescreen-or-savetabbablepage) 또는
[`compareFullPageScreen`](https://github.com/wswebcreation/webdriver-image-comparison/blob/master/docs/OPTIONS.md#comparefullpagescreen-or-comparetabbablepage)과 동일한 옵션을 사용합니다.

#### 예시

다음은 [guinea pig 웹사이트](https://guinea-pig.webdriver.io/image-compare.html)에서의 탭 이동 작동 예시입니다:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### 실패한 시각적 스냅샷 자동 업데이트

명령줄에 `--update-visual-baseline` 인수를 추가하여 기준 이미지를 업데이트합니다. 이렇게 하면

-   자동으로 실제 스크린샷을 복사하여 기준 폴더에 넣습니다
-   차이가 있더라도 기준이 업데이트되었기 때문에 테스트가 통과됩니다

**사용법:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

info/debug 모드에서 로그를 실행할 때 다음과 같은 로그가 추가됩니다

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## 타입스크립트 지원

이 모듈은 타입스크립트 지원을 포함하므로 Visual Testing 서비스를 사용할 때 자동 완성, 타입 안전성 및 향상된 개발자 경험의 이점을 누릴 수 있습니다.

### 1단계: 타입 정의 추가
타입스크립트가 모듈 타입을 인식하도록 하려면 tsconfig.json의 types 필드에 다음 항목을 추가하세요:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### 2단계: 서비스 옵션에 대한 타입 안전성 활성화
서비스 옵션에 대한 타입 검사를 적용하려면 WebdriverIO 구성을 업데이트하세요:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// 타입 정의 가져오기
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
                // 서비스 옵션
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // 타입 안전성 보장
        ],
    ],
    // ...
};
```

## 시스템 요구 사항

### 버전 5 이상

버전 5 이상의 경우, 이 모듈은 일반 [프로젝트 요구 사항](/docs/gettingstarted#system-requirements) 외에 추가 시스템 종속성이 없는 순수 JavaScript 기반 모듈입니다. 이 모듈은 완전히 JavaScript로 작성된 Node용 이미지 처리 라이브러리인 [Jimp](https://github.com/jimp-dev/jimp)를 사용하며, 네이티브 종속성이 전혀 없습니다.

### 버전 4 이하

버전 4 이하의 경우, 이 모듈은 Node.js용 캔버스 구현인 [Canvas](https://github.com/Automattic/node-canvas)에 의존합니다. Canvas는 [Cairo](https://cairographics.org/)에 의존합니다.

#### 설치 세부 정보

기본적으로 macOS, Linux 및 Windows용 바이너리는 프로젝트의 `npm install` 중에 다운로드됩니다. 지원되는 OS나 프로세서 아키텍처가 없다면, 모듈이 시스템에서 컴파일됩니다. 이를 위해서는 Cairo와 Pango를 포함한 여러 종속성이 필요합니다.

자세한 설치 정보는 [node-canvas 위키](https://github.com/Automattic/node-canvas/wiki/_pages)를 참조하세요. 아래는 일반적인 운영 체제에 대한 한 줄 설치 지침입니다. `libgif/giflib`, `librsvg`, `libjpeg`는 선택 사항이며 각각 GIF, SVG, JPEG 지원에만 필요합니다. Cairo v1.10.0 이상이 필요합니다.

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

     [Homebrew](https://brew.sh/)를 사용하여:

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11 이상:** 최근에 Mac OS X v10.11 이상으로 업데이트하고 컴파일 중에 문제가 발생하는 경우 다음 명령을 실행하세요: `xcode-select --install`. [Stack Overflow](http://stackoverflow.com/a/32929012/148072)에서 이 문제에 대해 자세히 알아보세요.
    Xcode 10.0 이상이 설치된 경우, 소스에서 빌드하려면 NPM 6.4.1 이상이 필요합니다.

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

    [위키](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) 참조

</TabItem>
<TabItem value="others">

    [위키](https://github.com/Automattic/node-canvas/wiki) 참조

</TabItem>
</Tabs>