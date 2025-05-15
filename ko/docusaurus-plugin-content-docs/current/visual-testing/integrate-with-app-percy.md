---
id: integrate-with-app-percy
title: 모바일 애플리케이션용
---

## WebdriverIO 테스트와 App Percy 통합하기

통합하기 전에 [WebdriverIO용 App Percy 샘플 빌드 튜토리얼](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)을 살펴볼 수 있습니다.
테스트 제품군을 BrowserStack App Percy와 통합하는 단계는 다음과 같습니다:

### 1단계: Percy 대시보드에서 새 앱 프로젝트 생성하기

Percy에 [로그인](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)하고 [새 앱 유형 프로젝트를 생성](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)하세요. 프로젝트를 생성한 후 `PERCY_TOKEN` 환경 변수가 표시됩니다. Percy는 `PERCY_TOKEN`을 사용하여 스크린샷을 업로드할 조직과 프로젝트를 식별합니다. 다음 단계에서 이 `PERCY_TOKEN`이 필요합니다.

### 2단계: 프로젝트 토큰을 환경 변수로 설정하기

다음 명령을 실행하여 PERCY_TOKEN을 환경 변수로 설정하세요:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### 3단계: Percy 패키지 설치하기

테스트 제품군의 통합 환경 구축에 필요한 구성 요소를 설치하세요.
의존성을 설치하려면 다음 명령을 실행하세요:

```sh
npm install --save-dev @percy/cli
```

### 4단계: 의존성 설치하기

Percy Appium 앱을 설치하세요

```sh
npm install --save-dev @percy/appium-app
```

### 5단계: 테스트 스크립트 업데이트하기
코드에 @percy/appium-app을 가져오는지 확인하세요.

아래는 percyScreenshot 함수를 사용하는 예제 테스트입니다. 스크린샷을 찍어야 하는 곳마다 이 함수를 사용하세요.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
필요한 인수를 percyScreenshot 메서드에 전달하고 있습니다.

스크린샷 메서드 인수는 다음과 같습니다:

```sh
percyScreenshot(driver, name[, options])
```
### 6단계: 테스트 스크립트 실행하기

`percy app:exec`를 사용하여 테스트를 실행하세요.

percy app:exec 명령을 사용할 수 없거나 IDE 실행 옵션을 사용하여 테스트를 실행하는 것을 선호하는 경우, percy app:exec:start 및 percy app:exec:stop 명령을 사용할 수 있습니다. 자세한 내용은 [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)를 방문하세요.

```sh
$ percy app:exec -- appium test command
```
이 명령은 Percy를 시작하고, 새 Percy 빌드를 생성하고, 스냅샷을 찍어 프로젝트에 업로드한 다음 Percy를 중지합니다:

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## 자세한 내용은 다음 페이지를 참조하세요:
- [WebdriverIO 테스트와 Percy 통합하기](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [환경 변수 페이지](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- BrowserStack Automate를 사용하는 경우 [BrowserStack SDK를 사용한 통합](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)


| 리소스                                                                                                                                                            | 설명                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [공식 문서](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App Percy의 WebdriverIO 문서 |
| [샘플 빌드 - 튜토리얼](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App Percy의 WebdriverIO 튜토리얼      |
| [공식 비디오](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percy를 사용한 시각적 테스팅         |
| [블로그](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | App Percy 소개: 네이티브 앱을 위한 AI 기반 자동화된 시각적 테스팅 플랫폼    |