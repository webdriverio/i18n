---
id: file-download
title: 파일 다운로드
---

웹 테스팅에서 파일 다운로드를 자동화할 때, 안정적인 테스트 실행을 보장하기 위해 다양한 브라우저에서 일관되게 처리하는 것이 중요합니다.

여기서는 파일 다운로드에 대한 모범 사례를 제공하고 **구글 크롬**, **모질라 파이어폭스**, **마이크로소프트 엣지**에 대한 다운로드 디렉토리 구성 방법을 보여드립니다.

## 다운로드 경로

테스트 스크립트에서 다운로드 경로를 **하드코딩**하면 유지 관리 문제와 이식성 문제가 발생할 수 있습니다. 다양한 환경에서 이식성과 호환성을 보장하기 위해 다운로드 디렉토리에 **상대 경로**를 활용하세요.

```javascript
// 👎
// 하드코딩된 다운로드 경로
const downloadPath = '/path/to/downloads';

// 👍
// 상대적 다운로드 경로
const downloadPath = path.join(__dirname, 'downloads');
```

## 대기 전략

적절한 대기 전략을 구현하지 않으면 특히 다운로드 완료에 대해 경쟁 조건이나 신뢰할 수 없는 테스트로 이어질 수 있습니다. 테스트 단계 간 동기화를 보장하기 위해 파일 다운로드가 완료될 때까지 기다리는 **명시적** 대기 전략을 구현하세요.

```javascript
// 👎
// 다운로드 완료를 위한 명시적 대기가 없음
await browser.pause(5000);

// 👍
// 파일 다운로드 완료를 기다림
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## 다운로드 디렉토리 구성

**구글 크롬**, **모질라 파이어폭스**, **마이크로소프트 엣지**의 파일 다운로드 동작을 재정의하려면 WebDriverIO 기능에 다운로드 디렉토리를 제공하세요:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

예제 구현은 [WebdriverIO 테스트 다운로드 동작 레시피](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior)를 참조하세요.

## 크로미움 브라우저 다운로드 구성

WebDriverIO의 `getPuppeteer` 메소드를 사용하여 Chrome DevTools에 액세스하여 __크로미움 기반__ 브라우저(Chrome, Edge, Brave 등)의 다운로드 경로를 변경할 수 있습니다.

```javascript
const page = await browser.getPuppeteer();
// CDP 세션 시작:
const cdpSession = await page.target().createCDPSession();
// 다운로드 경로 설정:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## 여러 파일 다운로드 처리

여러 파일 다운로드와 관련된 시나리오를 다룰 때는 각 다운로드를 효과적으로 관리하고 검증하기 위한 전략을 구현하는 것이 필수적입니다. 다음 접근 방식을 고려하세요:

__순차적 다운로드 처리:__ 파일을 하나씩 다운로드하고 다음 다운로드를 시작하기 전에 각 다운로드를 확인하여 순서대로 실행 및 정확한 검증을 보장합니다.

__병렬 다운로드 처리:__ 비동기 프로그래밍 기술을 활용하여 여러 파일 다운로드를 동시에 시작하여 테스트 실행 시간을 최적화합니다. 완료 시 모든 다운로드를 확인하는 강력한 검증 메커니즘을 구현합니다.

## 크로스 브라우저 호환성 고려사항

WebDriverIO는 브라우저 자동화를 위한 통합 인터페이스를 제공하지만, 브라우저 동작과 기능의 변화를 고려하는 것이 필수적입니다. 호환성과 일관성을 보장하기 위해 다양한 브라우저에서 파일 다운로드 기능을 테스트하는 것을 고려하세요.

__브라우저별 구성:__ Chrome, Firefox, Edge 및 기타 지원되는 브라우저에서 브라우저 동작과 기본 설정의 차이를 수용하도록 다운로드 경로 설정 및 대기 전략을 조정합니다.

__브라우저 버전 호환성:__ WebDriverIO 및 브라우저 버전을 정기적으로 업데이트하여 기존 테스트 스위트와의 호환성을 보장하면서 최신 기능과 개선 사항을 활용하세요.