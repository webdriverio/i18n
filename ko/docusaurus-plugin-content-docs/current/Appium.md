---
id: appium
title: Appium 설정
---

WebdriverIO를 사용하면 브라우저의 웹 애플리케이션뿐만 아니라 다음과 같은 다른 플랫폼도 테스트할 수 있습니다:

- 📱 iOS, Android 또는 Tizen의 모바일 애플리케이션
- 🖥️ macOS 또는 Windows의 데스크톱 애플리케이션
- 📺 Roku, tvOS, Android TV 및 Samsung용 TV 앱

이러한 유형의 테스트를 용이하게 하기 위해 [Appium](https://appium.io/)을 사용하는 것이 좋습니다. Appium에 대한 개요는 [공식 문서 페이지](https://appium.io/docs/en/latest/intro/)에서 확인할 수 있습니다.

올바른 환경을 설정하는 것은 간단하지 않습니다. 다행히도 Appium 생태계는 이를 돕기 위한 훌륭한 도구를 제공합니다. 위 환경 중 하나를 설정하려면 다음을 실행하세요:

```sh
$ npx appium-installer
```

이것은 설정 과정을 안내하는 [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) 툴킷을 시작합니다.