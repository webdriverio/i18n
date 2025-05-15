---
id: bamboo
title: 밤부
---

WebdriverIO는 [Bamboo](https://www.atlassian.com/software/bamboo)와 같은 CI 시스템과 긴밀한 통합을 제공합니다. [JUnit](https://webdriver.io/docs/junit-reporter.html) 또는 [Allure](https://webdriver.io/docs/allure-reporter.html) 리포터를 사용하면 테스트를 쉽게 디버깅하고 테스트 결과를 추적할 수 있습니다. 통합 과정은 매우 간단합니다.

1. JUnit 테스트 리포터 설치하기: `$ npm install @wdio/junit-reporter --save-dev`)
1. Bamboo가 JUnit 결과를 찾을 수 있도록 설정을 업데이트하고 (`junit` 리포터 지정):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
참고: *테스트 결과를 루트 폴더가 아닌 별도의 폴더에 보관하는 것이 좋은 표준입니다.*

```js
// wdio.conf.js - 병렬로 실행되는 테스트의 경우
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

모든 프레임워크에 대한 보고서는 비슷하며 Mocha, Jasmine 또는 Cucumber 중 어느 것이든 사용할 수 있습니다.

이 시점에서 테스트가 작성되어 있고 결과가 ```./testresults/``` 폴더에 생성되었으며 Bamboo가 실행 중이라고 가정합니다.

## Bamboo에 테스트 통합하기

1. Bamboo 프로젝트 열기
    > 새 계획을 만들고 저장소를 연결하세요(항상 저장소의 최신 버전을 가리키는지 확인) 그리고 스테이지를 만드세요

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    저는 기본 스테이지와 작업을 사용할 것입니다. 필요에 따라 자신만의 스테이지와 작업을 만들 수 있습니다

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. 테스팅 작업을 열고 Bamboo에서 테스트를 실행할 작업 만들기
    >**작업 1:** 소스 코드 체크아웃

    >**작업 2:** 테스트 실행 ```npm i && npm run test```. *Script* 작업과 *Shell Interpreter*를 사용하여 위 명령을 실행할 수 있습니다 (이렇게 하면 테스트 결과가 생성되어 ```./testresults/``` 폴더에 저장됩니다)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**작업 3:** 저장된 테스트 결과를 구문 분석하기 위해 *jUnit Parser* 작업을 추가하세요. 여기에 테스트 결과 디렉토리를 지정하세요 (Ant 스타일 패턴도 사용 가능)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    참고: *테스트 작업이 실패하더라도 항상 실행되도록 결과 파서 작업을 *Final* 섹션에 유지하세요*

    >**작업 4:** (선택 사항) 테스트 결과가 이전 파일과 섞이지 않도록 하기 위해 Bamboo에 성공적으로 구문 분석된 후 ```./testresults/``` 폴더를 제거하는 작업을 만들 수 있습니다. ```rm -f ./testresults/*.xml```과 같은 셸 스크립트를 추가하여 결과를 제거하거나 ```rm -r testresults```로 전체 폴더를 제거할 수 있습니다

위 과정을 완료한 후 계획을 활성화하고 실행하세요. 최종 출력은 다음과 같습니다:

## 성공한 테스트

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## 실패한 테스트

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## 실패 및 수정됨

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

야호!! 이게 전부입니다. WebdriverIO 테스트를 Bamboo에 성공적으로 통합했습니다.