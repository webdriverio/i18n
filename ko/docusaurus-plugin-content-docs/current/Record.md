---
id: record
title: 레코드 테스트
---

Chrome DevTools에는 사용자가 Chrome 내에서 자동화된 단계를 녹화하고 재생할 수 있는 _Recorder_ 패널이 있습니다. 이러한 단계는 [확장 프로그램을 통해 WebdriverIO 테스트로 내보내기](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en)가 가능하여 테스트 작성을 매우 쉽게 만들어 줍니다.

## Chrome DevTools Recorder란 무엇인가

[Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/)는 브라우저에서 직접 테스트 동작을 녹화하고 재생할 수 있게 해주는 도구이며, JSON으로 내보내거나(또는 e2e 테스트로 내보내기) 테스트 성능을 측정할 수도 있습니다.

이 도구는 직관적이며, 브라우저에 연결되어 있기 때문에 컨텍스트를 전환하거나 제3자 도구를 다루는 번거로움 없이 편리하게 사용할 수 있습니다.

## Chrome DevTools Recorder로 테스트를 녹화하는 방법

최신 Chrome을 사용하고 있다면 이미 Recorder가 설치되어 사용 가능합니다. 아무 웹사이트나 열고, 우클릭하여 _"검사"_를 선택하세요. DevTools 내에서 `CMD/Control` + `Shift` + `p`를 누르고 _"Show Recorder"_를 입력하여 Recorder를 열 수 있습니다.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

사용자 여정 녹화를 시작하려면 _"Start new recording"_을 클릭하고, 테스트 이름을 지정한 다음 브라우저를 사용하여 테스트를 녹화하세요:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

다음 단계로, _"Replay"_를 클릭하여 녹화가 성공적으로 이루어졌는지, 원하는 작업을 수행하는지 확인하세요. 모든 것이 정상이라면, [export](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) 아이콘을 클릭하고 _"Export as a WebdriverIO Test Script"_를 선택하세요:

_"Export as a WebdriverIO Test Script"_ 옵션은 [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn) 확장 프로그램을 설치한 경우에만 사용할 수 있습니다.

![Chrome DevTools Recorder](/img/recorder/export.gif)

이게 전부입니다!

## 녹화 내보내기

흐름을 WebdriverIO 테스트 스크립트로 내보내면, 테스트 스위트에 복사하여 붙여넣을 수 있는 스크립트가 다운로드됩니다. 예를 들어 위의 녹화는 다음과 같습니다:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

필요한 경우 일부 로케이터를 검토하고 더 견고한 [선택자 유형](/docs/selectors)으로 교체하세요. 흐름을 JSON 파일로 내보내고 [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) 패키지를 사용하여 실제 테스트 스크립트로 변환할 수도 있습니다.

## 다음 단계

이 흐름을 사용하여 애플리케이션을 위한 테스트를 쉽게 만들 수 있습니다. Chrome DevTools Recorder에는 다음과 같은 추가 기능이 있습니다:

- [느린 네트워크 시뮬레이션](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) 또는
- [테스트 성능 측정](https://developer.chrome.com/docs/devtools/recorder/#measure)

자세한 내용은 [문서](https://developer.chrome.com/docs/devtools/recorder)를 확인하세요.