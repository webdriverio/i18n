---
id: appium
title: Appium 설정
---

WebdriverIO를 사용하면 브라우저의 웹 애플리케이션뿐만 아니라 다음과 같은 다른 플랫폼도 테스트할 수 있습니다:

- 📱 iOS, Android 또는 Tizen의 모바일 애플리케이션
- 🖥️ macOS 또는 Windows의 데스크톱 애플리케이션
- 📺 Roku, tvOS, Android TV 및 Samsung용 TV 앱

이러한 유형의 테스트를 용이하게 하기 위해 [Appium](https://appium.io/)을 사용하는 것이 좋습니다. Appium에 대한 개요는 [공식 문서 페이지](https://appium.io/docs/en/2.0/intro/)에서 확인할 수 있습니다.

올바른 환경을 설정하는 것은 간단하지 않습니다. 다행히 Appium 생태계에는 이를 돕기 위한 훌륭한 도구가 있습니다. 위의 환경 중 하나를 설정하려면 다음을 실행하기만 하면 됩니다:

```sh
$ npx appium-installer
```

이렇게 하면 설정 과정을 안내하는 [appium-installer](https://github.com/AppiumTestDistribution/appium-installer) 툴킷이 시작됩니다.