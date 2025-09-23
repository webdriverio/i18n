---
id: testrunner
title: 테스트러너
---

WebdriverIO는 가능한 한 빨리 테스트를 시작하는 데 도움이 되는 자체 테스트 러너를 제공합니다. 이는 모든 작업을 대신해주고, 외부 서비스와의 통합을 가능하게 하며, 가능한 한 효율적으로 테스트를 실행할 수 있도록 도와줍니다.

WebdriverIO의 테스트러너는 NPM 패키지 `@wdio/cli`에 별도로 번들로 제공됩니다.

다음과 같이 설치하세요:

```sh npm2yarn
npm install @wdio/cli
```

명령줄 인터페이스 도움말을 보려면 터미널에서 다음 명령을 입력하세요:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

좋습니다! 이제 모든 테스트, 기능 및 설정에 대한 정보가 설정된 구성 파일을 정의해야 합니다. 해당 파일이 어떻게 생겨야 하는지 알아보려면 [구성 파일](/docs/configuration) 섹션으로 이동하세요.

`wdio` 구성 도우미를 사용하면 구성 파일을 쉽게 생성할 수 있습니다. 다음 명령을 실행하세요:

```sh
$ npx wdio config
```

...그러면 도우미 유틸리티가 실행됩니다.

질문을 통해 1분도 안 되는 시간에 구성 파일을 생성해 줍니다.

![WDIO 구성 유틸리티](/img/config-utility.gif)

구성 파일이 설정되면 다음 명령으로 테스트를 시작할 수 있습니다:

```sh
npx wdio run wdio.conf.js
```

`run` 명령 없이도 테스트를 초기화할 수 있습니다:

```sh
npx wdio wdio.conf.js
```

그게 다입니다! 이제 전역 변수 `browser`를 통해 셀레늄 인스턴스에 접근할 수 있습니다.

## 명령어

### `wdio config`

`config` 명령은 WebdriverIO 구성 도우미를 실행합니다. 이 도우미는 WebdriverIO 프로젝트에 대한 몇 가지 질문을 하고 답변을 바탕으로 `wdio.conf.js` 파일을 생성합니다.

예시:

```sh
wdio config
```

옵션:

```
--help            WebdriverIO 도움말 메뉴 출력                              [boolean]
--npm             yarn 대신 NPM을 사용하여 패키지 설치할지 여부            [boolean]
```

### `wdio run`

> 이것은 구성을 실행하는 기본 명령입니다.

`run` 명령은 WebdriverIO 구성 파일을 초기화하고 테스트를 실행합니다.

예시:

```sh
wdio run ./wdio.conf.js --watch
```

옵션:

```
--help                WebdriverIO 도움말 메뉴 출력                [boolean]
--version             WebdriverIO 버전 출력                      [boolean]
--hostname, -h        자동화 드라이버 호스트 주소                 [string]
--port, -p            자동화 드라이버 포트                        [number]
--user, -u            클라우드 서비스를 자동화 백엔드로 사용하는 경우의 사용자 이름
                                                                 [string]
--key, -k             사용자에 해당하는 액세스 키                  [string]
--watch               변경 사항에 대한 스펙 감시                  [boolean]
--logLevel, -l        로깅 상세 수준
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                특정 수의 테스트가 실패한 후 테스트 러너 중지  [number]
--baseUrl             기본 URL을 설정하여 URL 명령 호출 단축      [string]
--waitforTimeout, -w  모든 waitForXXX 명령의 타임아웃            [number]
--framework, -f       스펙을 실행할 프레임워크(Mocha, Jasmine 또는 Cucumber)
                                                                [string]
--reporters, -r       stdout에 결과를 출력할 리포터                [array]
--suite               스펙 속성을 덮어쓰고 정의된 스위트 실행       [array]
--spec                특정 스펙 파일이나 와일드카드 실행 - stdin에서 파이프된
                      스펙을 덮어씀                               [array]
--exclude             실행에서 스펙 파일을 제외 - stdin에서 파이프된
                      스펙을 덮어씀                               [array]
--repeat              특정 스펙 및/또는 스위트를 N번 반복          [number]
--mochaOpts           Mocha 옵션
--jasmineOpts         Jasmine 옵션
--cucumberOpts        Cucumber 옵션
--tsConfigPath        `tsconfig.json`의 사용자 지정 경로 또는 wdio 구성의 [tsConfigPath 설정](/docs/configurationfile) 사용
```

> 참고: 자동 컴파일은 `tsx` ENV 변수로 쉽게 제어할 수 있습니다. [TypeScript 문서](/docs/typescript)도 참조하세요.

### `wdio install`
`install` 명령을 사용하면 CLI를 통해 WebdriverIO 프로젝트에 리포터와 서비스를 추가할 수 있습니다.

예시:

```sh
wdio install service sauce # @wdio/sauce-service를 설치합니다
wdio install reporter dot # @wdio/dot-reporter를 설치합니다
wdio install framework mocha # @wdio/mocha-framework를 설치합니다
```

`yarn`을 사용하여 패키지를 설치하려면 명령에 `--yarn` 플래그를 전달할 수 있습니다:

```sh
wdio install service sauce --yarn
```

WDIO 구성 파일이 작업 중인 폴더와 다른 곳에 있는 경우 사용자 지정 구성 경로를 전달할 수도 있습니다:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### 지원되는 서비스 목록

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### 지원되는 리포터 목록

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### 지원되는 프레임워크 목록

```
mocha
jasmine
cucumber
```

### `wdio repl`

repl 명령을 사용하면 WebdriverIO 명령을 실행하기 위한 대화형 명령줄 인터페이스를 시작할 수 있습니다. 테스트 목적이나 WebdriverIO 세션을 빠르게 실행하는 데 사용할 수 있습니다.

로컬 크롬에서 테스트 실행:

```sh
wdio repl chrome
```

또는 Sauce Labs에서 테스트 실행:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

[run 명령](#wdio-run)에서 사용할 수 있는 것과 동일한 인수를 적용할 수 있습니다.