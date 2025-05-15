---
id: mobile
title: 모바일 명령어
---

# WebdriverIO에서 사용자 정의 및 향상된 모바일 명령어 소개

모바일 앱과 모바일 웹 애플리케이션을 테스트하는 것은 특히 Android와 iOS 간의 플랫폼별 차이를 다룰 때 고유한 과제가 있습니다. Appium은 이러한 차이점을 처리할 수 있는 유연성을 제공하지만, 종종 복잡하고 플랫폼 의존적인 문서([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/))와 명령어를 깊이 이해해야 합니다. 이로 인해 테스트 스크립트 작성이 더 시간 소모적이고, 오류가 발생하기 쉬우며, 유지 관리가 어려워질 수 있습니다.

이 과정을 단순화하기 위해 WebdriverIO는 모바일 웹 및 네이티브 앱 테스트를 위해 특별히 맞춤화된 **사용자 정의 및 향상된 모바일 명령어**를 소개합니다. 이러한 명령어는 기본 Appium API의 복잡성을 추상화하여 간결하고 직관적이며 플랫폼에 구애받지 않는 테스트 스크립트를 작성할 수 있게 합니다. 사용 편의성에 중점을 두어 Appium 스크립트 개발 시 추가적인 부담을 줄이고 손쉽게 모바일 앱을 자동화할 수 있도록 돕는 것이 목표입니다.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## 사용자 정의 모바일 명령어가 필요한 이유?

### 1. **복잡한 API 단순화**
제스처나 요소 상호 작용과 같은 일부 Appium 명령은 장황하고 복잡한 구문을 포함합니다. 예를 들어, 네이티브 Appium API로 길게 누르기 작업을 실행하려면 `action` 체인을 수동으로 구성해야 합니다:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

WebdriverIO의 사용자 정의 명령어를 사용하면 같은 작업을 단일 표현적인 코드 라인으로 수행할 수 있습니다:

```ts
await $('~Contacts').longPress();
```

이는 상용구 코드를 크게 줄여 스크립트를 더 깔끔하고 이해하기 쉽게 만듭니다.

### 2. **크로스 플랫폼 추상화**
모바일 앱은 종종 플랫폼별 처리가 필요합니다. 예를 들어, 네이티브 앱에서의 스크롤링은 [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture)와 [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) 간에 상당히 다릅니다. WebdriverIO는 기본 구현에 상관없이 플랫폼 전반에 걸쳐 원활하게 작동하는 `scrollIntoView()`와 같은 통합 명령어를 제공하여 이러한 격차를 해소합니다.

```ts
await $('~element').scrollIntoView();
```

이러한 추상화는 테스트가 이식 가능하고 OS 차이를 고려하기 위한 지속적인 분기나 조건부 로직이 필요하지 않도록 보장합니다.

### 3. **생산성 향상**
저수준 Appium 명령을 이해하고 구현할 필요성을 줄임으로써, WebdriverIO의 모바일 명령은 플랫폼별 뉘앙스와 씨름하는 대신 앱의 기능 테스트에 집중할 수 있게 합니다. 이는 모바일 자동화 경험이 제한적인 팀이나 개발 주기를 가속화하려는 팀에게 특히 유익합니다.

### 4. **일관성 및 유지 관리성**
사용자 정의 명령은 테스트 스크립트에 통일성을 가져옵니다. 유사한 작업에 대해 다양한 구현을 갖는 대신, 팀은 표준화되고 재사용 가능한 명령에 의존할 수 있습니다. 이는 코드베이스의 유지 관리성을 높일 뿐만 아니라 새로운 팀원의 온보딩을 위한 장벽을 낮춥니다.

## 특정 모바일 명령을 향상시키는 이유는 무엇인가요?

### 1. 유연성 추가
특정 모바일 명령은 기본 Appium API에서 사용할 수 없는 추가 옵션과 매개변수를 제공하도록 향상되었습니다. 예를 들어, WebdriverIO는 재시도 로직, 타임아웃, 특정 기준으로 웹뷰를 필터링하는 기능을 추가하여 복잡한 시나리오에 대한 더 많은 제어를 가능하게 합니다.

```ts
// 예: 웹뷰 감지를 위한 재시도 간격 및 타임아웃 사용자 정의
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // 1초마다 재시도
  androidWebviewConnectTimeout: 10000,    // 10초 후 타임아웃
});
```

이러한 옵션은 추가 상용구 코드 없이 동적 앱 동작에 자동화 스크립트를 적응시키는 데 도움이 됩니다.

### 2. 사용성 향상
향상된 명령은 네이티브 API에서 발견되는 복잡성과 반복적인 패턴을 추상화합니다. 더 적은 코드 라인으로 더 많은 작업을 수행할 수 있어 새로운 사용자의 학습 곡선을 줄이고 스크립트를 읽고 유지하기 쉽게 만듭니다.

```ts
// 예: 제목으로 컨텍스트를 전환하기 위한 향상된 명령
await driver.switchContext({
  title: 'My Webview Title',
});
```

기본 Appium 메서드와 비교하여, 향상된 명령은 사용 가능한 컨텍스트를 수동으로 검색하고 필터링하는 등의 추가 단계가 필요하지 않습니다.

### 3. 행동 표준화
WebdriverIO는 향상된 명령이 Android와 iOS와 같은 플랫폼 전반에 걸쳐 일관되게 작동하도록 보장합니다. 이러한 크로스 플랫폼 추상화는 운영 체제에 기반한 조건부 분기 로직의 필요성을 최소화하여 더 유지 관리하기 쉬운 테스트 스크립트로 이어집니다.

```ts
// 예: 두 플랫폼을 위한 통합 스크롤 명령
await $('~element').scrollIntoView();
```

이러한 표준화는 특히 여러 플랫폼에서 테스트를 자동화하는 팀에게 코드베이스를 단순화합니다.

### 4. 신뢰성 증가
재시도 메커니즘, 스마트 기본값, 상세한 오류 메시지를 통합함으로써 향상된 명령은 불안정한 테스트의 가능성을 줄입니다. 이러한 개선 사항은 웹뷰 초기화 지연이나 일시적인 앱 상태와 같은 문제에 대해 테스트가 회복력을 갖도록 보장합니다.

```ts
// 예: 강력한 매칭 로직을 갖춘 향상된 웹뷰 전환
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

이는 테스트 실행을 더 예측 가능하게 만들고 환경적 요인으로 인한 실패에 덜 취약하게 만듭니다.

### 5. 디버깅 기능 향상
향상된 명령은 종종 더 풍부한 메타데이터를 반환하여 특히 하이브리드 앱에서 복잡한 시나리오를 더 쉽게 디버깅할 수 있게 합니다. 예를 들어, getContext 및 getContexts와 같은 명령은 제목, URL 및 가시성 상태를 포함한 웹뷰에 대한 상세한 정보를 반환할 수 있습니다.

```ts
// 예: 디버깅을 위한 상세 메타데이터 검색
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

이 메타데이터는 문제를 더 빨리 식별하고 해결하는 데 도움이 되어 전반적인 디버깅 경험을 향상시킵니다.


모바일 명령을 향상시킴으로써 WebdriverIO는 자동화를 더 쉽게 만들 뿐만 아니라 강력하고 신뢰할 수 있으며 직관적으로 사용할 수 있는 도구를 개발자에게 제공하는 사명과도 일치합니다.

---

## 하이브리드 앱

하이브리드 앱은 웹 콘텐츠와 네이티브 기능을 결합하여 자동화 중에 특별한 처리가 필요합니다. 이러한 앱은 네이티브 애플리케이션 내에서 웹 콘텐츠를 렌더링하기 위해 웹뷰를 사용합니다. WebdriverIO는 하이브리드 앱을 효과적으로 다루기 위한 향상된 메서드를 제공합니다.

### 웹뷰 이해하기
웹뷰는 네이티브 앱에 내장된 브라우저와 유사한 컴포넌트입니다:

- **Android:** 웹뷰는 Chrome/System Webview 기반이며 여러 페이지(브라우저 탭과 유사)를 포함할 수 있습니다. 이러한 웹뷰는 상호 작용을 자동화하기 위해 ChromeDriver가 필요합니다. Appium은 장치에 설치된 System WebView 또는 Chrome 버전에 따라 필요한 ChromeDriver 버전을 자동으로 결정하고 아직 사용할 수 없는 경우 자동으로 다운로드할 수 있습니다. 이 접근 방식은 원활한 호환성을 보장하고 수동 설정을 최소화합니다. Appium이 올바른 ChromeDriver 버전을 자동으로 다운로드하는 방법에 대해 알아보려면 [Appium UIAutomator2-documentation](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver)을 참조하세요.
- **iOS:** 웹뷰는 Safari(WebKit)에 의해 구동되며 `WEBVIEW_{id}`와 같은 일반적인 ID로 식별됩니다.

### 하이브리드 앱의 과제
1. 여러 옵션 중에서 올바른 웹뷰를 식별하기.
2. 더 나은 컨텍스트를 위해 제목, URL 또는 패키지 이름과 같은 추가 메타데이터 검색하기.
3. Android와 iOS 간의 플랫폼별 차이 처리하기.
4. 하이브리드 앱에서 올바른 컨텍스트로 안정적으로 전환하기.

### 하이브리드 앱을 위한 주요 명령어

#### 1. `getContext`
세션의 현재 컨텍스트를 검색합니다. 기본적으로 Appium의 getContext 메서드처럼 작동하지만 `returnDetailedContext`가 활성화되면 상세한 컨텍스트 정보를 제공할 수 있습니다. 자세한 정보는 [`getContext`](/docs/api/mobile/getContext)를 참조하세요.

#### 2. `getContexts`
사용 가능한 컨텍스트의 상세 목록을 반환하여 Appium의 contexts 메서드를 개선합니다. 이를 통해 제목, URL 또는 활성 `bundleId|packageName`을 확인하기 위해 추가 명령을 호출하지 않고도 상호 작용을 위한 올바른 웹뷰를 쉽게 식별할 수 있습니다. 자세한 정보는 [`getContexts`](/docs/api/mobile/getContexts)를 참조하세요.

#### 3. `switchContext`
이름, 제목 또는 URL을 기반으로 특정 웹뷰로 전환합니다. 매칭을 위한 정규 표현식 사용과 같은 추가적인 유연성을 제공합니다. 자세한 정보는 [`switchContext`](/docs/api/mobile/switchContext)를 참조하세요.

### 하이브리드 앱을 위한 주요 기능
1. 상세 메타데이터: 디버깅 및 안정적인 컨텍스트 전환을 위한 포괄적인 세부 정보를 검색합니다.
2. 크로스 플랫폼 일관성: Android와 iOS를 위한 통합 동작으로, 플랫폼별 특성을 원활하게 처리합니다.
3. 사용자 정의 재시도 로직(Android): 웹뷰 감지를 위한 재시도 간격 및 타임아웃을 조정합니다.


:::info 참고 및 제한 사항
- Android는 `packageName` 및 `webviewPageId`와 같은 추가 메타데이터를 제공하는 반면, iOS는 `bundleId`에 중점을 둡니다.
- 재시도 로직은 Android에 대해 사용자 정의가 가능하지만 iOS에는 적용되지 않습니다.
- iOS가 Webview를 찾을 수 없는 경우가 있습니다. Appium은 `appium-xcuitest-driver`용 다양한 추가 기능을 제공하여 Webview를 찾습니다. Webview를 찾을 수 없다고 생각되면 다음 기능 중 하나를 설정해 볼 수 있습니다:
    - `appium:includeSafariInWebviews`: 네이티브/웹뷰 앱 테스트 중에 사용 가능한 컨텍스트 목록에 Safari 웹 컨텍스트를 추가합니다. 이는 테스트가 Safari를 열고 상호 작용해야 하는 경우 유용합니다. 기본값은 `false`입니다.
    - `appium:webviewConnectRetries`: 웹 뷰 페이지 감지를 포기하기 전의 최대 재시도 횟수입니다. 각 재시도 간의 지연은 500ms이며, 기본값은 `10` 회입니다.
    - `appium:webviewConnectTimeout`: 웹 뷰 페이지를 감지하기 위해 대기하는 최대 시간(밀리초)입니다. 기본값은 `5000` ms입니다.

고급 예제 및 세부 정보는 WebdriverIO 모바일 API 문서를 참조하세요.
:::


---

우리의 점점 늘어나는 명령어 세트는 모바일 자동화를 접근 가능하고 우아하게 만들기 위한 우리의 노력을 반영합니다. 복잡한 제스처를 수행하든 네이티브 앱 요소와 작업하든, 이러한 명령어는 원활한 자동화 경험을 만든다는 WebdriverIO의 철학과 일치합니다. 그리고 우리는 여기서 멈추지 않을 것입니다. 보고 싶은 기능이 있다면 여러분의 피드백을 환영합니다. [이 링크](https://github.com/webdriverio/webdriverio/issues/new/choose)를 통해 여러분의 요청을 자유롭게 제출해 주세요.