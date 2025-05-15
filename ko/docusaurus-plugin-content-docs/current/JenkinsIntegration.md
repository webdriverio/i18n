---
id: jenkins
title: 젠킨스
---

WebdriverIO는 [Jenkins](https://jenkins-ci.org)와 같은 CI 시스템과 긴밀하게 통합됩니다. `junit` 리포터를 사용하면 테스트를 쉽게 디버깅하고 테스트 결과를 추적할 수 있습니다. 통합 과정은 매우 쉽습니다.

1. `junit` 테스트 리포터를 설치하세요: `$ npm install @wdio/junit-reporter --save-dev`)
1. Jenkins가 XUnit 결과를 찾을 수 있는 위치에 저장하도록 설정을 업데이트하세요
    (그리고 `junit` 리포터를 지정하세요):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

어떤 프레임워크를 선택할지는 여러분에게 달려 있습니다. 보고서는 비슷할 것입니다.
이 튜토리얼에서는 Jasmine을 사용하겠습니다.

몇 가지 테스트를 작성한 후에는 새로운 Jenkins 작업을 설정할 수 있습니다. 이름과 설명을 지정하세요:

![이름 및 설명](/img/jenkins/jobname.png "이름 및 설명")

그런 다음 항상 저장소의 최신 버전을 가져오도록 설정하세요:

![Jenkins Git 설정](/img/jenkins/gitsetup.png "Jenkins Git 설정")

**이제 중요한 부분입니다:** 셸 명령을 실행하는 `build` 단계를 만드세요. `build` 단계는 프로젝트를 빌드해야 합니다. 이 데모 프로젝트는 외부 앱만 테스트하므로 아무것도 빌드할 필요가 없습니다. 노드 의존성을 설치하고 `npm test` 명령을 실행하기만 하면 됩니다(`node_modules/.bin/wdio test/wdio.conf.js`의 별칭).

AnsiColor와 같은 플러그인을 설치했지만 로그가 여전히 색상화되지 않은 경우, 환경 변수 `FORCE_COLOR=1`로 테스트를 실행하세요(예: `FORCE_COLOR=1 npm test`).

![빌드 단계](/img/jenkins/runjob.png "빌드 단계")

테스트 후에는 Jenkins가 XUnit 보고서를 추적하도록 할 수 있습니다. 이를 위해 _"Publish JUnit test result report"_ 라는 빌드 후 작업을 추가해야 합니다.

XUnit 보고서를 추적하기 위해 외부 XUnit 플러그인을 설치할 수도 있습니다. JUnit 플러그인은 기본 Jenkins 설치에 포함되어 있으며 현재로서는 충분합니다.

설정 파일에 따라 XUnit 보고서는 프로젝트의 루트 디렉토리에 저장됩니다. 이 보고서들은 XML 파일입니다. 따라서 보고서를 추적하기 위해 필요한 것은 Jenkins가 루트 디렉토리의 모든 XML 파일을 가리키도록 하는 것뿐입니다:

![빌드 후 작업](/img/jenkins/postjob.png "빌드 후 작업")

이게 전부입니다! 이제 WebdriverIO 작업을 실행하도록 Jenkins를 설정했습니다. 이제 작업은 히스토리 차트, 실패한 작업의 스택 트레이스 정보, 각 테스트에서 사용된 페이로드가 있는 명령 목록 등 자세한 테스트 결과를 제공합니다.

![Jenkins 최종 통합](/img/jenkins/final.png "Jenkins 최종 통합")