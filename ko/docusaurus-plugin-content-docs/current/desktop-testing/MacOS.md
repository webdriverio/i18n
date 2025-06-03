---
id: macos
title: MacOS
---

WebdriverIO는 [Appium](https://appium.io/)을 사용하여 임의의 MacOS 애플리케이션을 자동화할 수 있습니다. 시스템에 [XCode](https://developer.apple.com/xcode/)가 설치되어 있고, Appium과 [Mac2 Driver](https://github.com/appium/appium-mac2-driver)가 의존성으로 설치되어 있으며 올바른 기능이 설정되어 있어야 합니다.

## 시작하기

새로운 WebdriverIO 프로젝트를 시작하려면 다음을 실행하세요:

```sh
npm create wdio@latest ./
```

설치 마법사가 프로세스를 안내해 줄 것입니다. 테스트 유형을 물어볼 때 _"Desktop Testing - of MacOS Applications"_ 을 선택해야 합니다. 그 후에는 기본값을 유지하거나 개인 취향에 맞게 수정하세요.

구성 마법사는 필요한 모든 Appium 패키지를 설치하고 MacOS에서 테스트하는 데 필요한 구성으로 `wdio.conf.js` 또는 `wdio.conf.ts`를 생성합니다. 테스트 파일을 자동 생성하는 데 동의했다면 `npm run wdio`를 통해 첫 번째 테스트를 실행할 수 있습니다.

<CreateMacOSProjectAnimation />

이게 다입니다 🎉

## 예제

다음은 계산기 애플리케이션을 열고, 계산을 수행하고, 결과를 확인하는 간단한 테스트의 예입니다:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__참고:__ 계산기 앱은 `'appium:bundleId': 'com.apple.calculator'`가 기능 옵션으로 정의되어 있어 세션 시작 시 자동으로 열렸습니다. 세션 중에 언제든지 앱을 전환할 수 있습니다.

## 더 많은 정보

MacOS에서의 테스트와 관련된 세부 정보는 [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) 프로젝트를 확인하는 것이 좋습니다.