---
id: integrate-with-percy
title: 웹 애플리케이션용
---

## WebdriverIO 테스트를 Percy와 통합하기

통합하기 전에, [WebdriverIO를 위한 Percy의 샘플 빌드 튜토리얼](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)을 살펴볼 수 있습니다.
WebdriverIO 자동화 테스트를 BrowserStack Percy와 통합하는 방법에 대한 개요는 다음과 같습니다:

### 1단계: Percy 프로젝트 생성하기
Percy에 [로그인](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)하세요. Percy에서 'Web' 타입의 프로젝트를 생성하고 이름을 지정하세요. 프로젝트가 생성되면 Percy는 토큰을 생성합니다. 이 토큰을 기록해두세요. 다음 단계에서 환경 변수를 설정할 때 사용해야 합니다.

프로젝트 생성에 대한 자세한 내용은 [Percy 프로젝트 생성하기](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)를 참조하세요.

### 2단계: 프로젝트 토큰을 환경 변수로 설정하기

다음 명령을 실행하여 PERCY_TOKEN을 환경 변수로 설정하세요:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### 3단계: Percy 의존성 설치하기

테스트 스위트의 통합 환경을 구축하는 데 필요한 구성 요소를 설치하세요.

의존성을 설치하려면 다음 명령을 실행하세요:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### 4단계: 테스트 스크립트 업데이트하기

스크린샷을 찍는 데 필요한 메서드와 속성을 사용하기 위해 Percy 라이브러리를 가져오세요.
다음 예시는 비동기 모드에서 percySnapshot() 함수를 사용합니다:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

WebdriverIO를 [독립 실행 모드](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)에서 사용할 때는 브라우저 객체를 `percySnapshot` 함수의 첫 번째 인수로 제공하세요:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
스냅샷 메서드의 인수는 다음과 같습니다:

```sh
percySnapshot(name[, options])
```
### 독립 실행 모드

```sh
percySnapshot(browser, name[, options])
```

- browser (필수) - WebdriverIO 브라우저 객체
- name (필수) - 스냅샷 이름; 각 스냅샷마다 고유해야 함
- options - 스냅샷별 구성 옵션 참조

자세한 내용은 [Percy 스냅샷](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)을 참조하세요.

### 5단계: Percy 실행하기
아래와 같이 `percy exec` 명령을 사용하여 테스트를 실행하세요:

`percy:exec` 명령을 사용할 수 없거나 IDE 실행 옵션을 사용하여 테스트를 실행하는 것을 선호하는 경우, `percy:exec:start`와 `percy:exec:stop` 명령을 사용할 수 있습니다. 자세한 내용은 [Percy 실행하기](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)를 참조하세요.

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## 자세한 내용은 다음 페이지를 방문하세요:
- [WebdriverIO 테스트를 Percy와 통합하기](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [환경 변수 페이지](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- BrowserStack Automate를 사용하는 경우 [BrowserStack SDK를 사용한 통합](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)


| 리소스                                                                                                                                                               | 설명                              |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| [공식 문서](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                  | Percy의 WebdriverIO 문서          |
| [샘플 빌드 - 튜토리얼](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)      | Percy의 WebdriverIO 튜토리얼      |
| [공식 비디오](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                                  | Percy를 이용한 시각적 테스팅         |
| [블로그](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                   | Visual Reviews 2.0 소개           |