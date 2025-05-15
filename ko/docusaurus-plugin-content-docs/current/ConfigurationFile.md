---
id: configurationfile
title: 설정 파일
---

설정 파일에는 테스트 스위트를 실행하는 데 필요한 모든 정보가 포함되어 있습니다. 이것은 JSON을 내보내는 NodeJS 모듈입니다.

다음은 지원되는 모든 속성과 추가 정보가 포함된 예제 구성입니다:

```js
export const config = {

    // ==================================
    // 테스트를 어디서 시작할지
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // 서버 구성
    // =====================
    // 실행 중인 Selenium 서버의 호스트 주소입니다. 이 정보는 대개 쓸모없습니다.
    // WebdriverIO는 자동으로 localhost에 연결합니다. 또한 Sauce Labs, Browserstack, Testing Bot 또는
    // LambdaTest와 같은 지원되는 클라우드 서비스 중 하나를 사용하는 경우에도
    // 호스트 및 포트 정보를 정의할 필요가 없습니다(WebdriverIO가 사용자 및 키 정보에서
    // 이를 파악할 수 있기 때문입니다). 그러나 프라이빗 Selenium 백엔드를 사용하는 경우
    // 여기에서 `hostname`, `port` 및 `path`를 정의해야 합니다.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // 서비스 제공자
    // =================
    // WebdriverIO는 Sauce Labs, Browserstack, Testing Bot 및 LambdaTest를 지원합니다. (다른 클라우드 제공자도
    // 작동해야 합니다.) 이러한 서비스는 특정 `user` 및 `key`(또는 액세스 키) 값을
    // 정의하므로 이러한 서비스에 연결하기 위해 여기에 입력해야 합니다.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Sauce Labs에서 테스트를 실행하는 경우 `region` 속성을 통해 테스트를 실행할 지역을
    // 지정할 수 있습니다. 지역의 짧은 핸들은 `us`(기본값) 및 `eu`입니다.
    // 이러한 지역은 Sauce Labs VM 클라우드 및 Sauce Labs Real Device Cloud에 사용됩니다.
    // 지역을 제공하지 않으면 기본값은 `us`입니다.
    region: 'us',
    //
    // Sauce Labs는 Chrome 및 Firefox 테스트를 헤드리스로 실행할 수 있는
    // [헤드리스 제품](https://saucelabs.com/products/web-testing/sauce-headless-testing)을 제공합니다.
    //
    headless: false,
    //
    // ==================
    // 테스트 파일 지정
    // ==================
    // 어떤 테스트 스펙을 실행할지 정의합니다. 패턴은 실행 중인 구성 파일의
    // 디렉터리를 기준으로 합니다.
    //
    // 스펙은 스펙 파일의 배열로 정의됩니다(선택적으로 확장될 와일드카드 사용).
    // 각 스펙 파일에 대한 테스트는 별도의 작업자 프로세스에서 실행됩니다.
    // 동일한 작업자 프로세스에서 실행되도록 스펙 파일 그룹을 지정하려면
    // 스펙 배열 내에서 배열로 묶습니다.
    //
    // 스펙 파일의 경로는 절대 경로가 아닌 한 구성 파일의 디렉터리를
    // 기준으로 해결됩니다.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // 제외할 패턴.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // 기능(Capabilities)
    // ============
    // 여기에 기능을 정의하세요. WebdriverIO는 동시에 여러 기능을 실행할 수 있습니다.
    // 기능 수에 따라 WebdriverIO는 여러 테스트 세션을 시작합니다.
    // `capabilities` 내에서 특정 기능에 특정 스펙을 그룹화하기 위해
    // `spec` 및 `exclude` 옵션을 덮어쓸 수 있습니다.
    //
    // 먼저, 동시에 시작해야 하는 인스턴스 수를 정의할 수 있습니다.
    // 3개의 다른 기능(Chrome, Firefox 및 Safari)이 있고
    // `maxInstances`를 1로 설정했다고 가정해 보겠습니다. wdio는 3개의 프로세스를 생성합니다.
    //
    // 따라서 10개의 스펙 파일이 있고 `maxInstances`를 10으로 설정하면 모든 스펙 파일이
    // 동시에 테스트되고 30개의 프로세스가 생성됩니다.
    //
    // 이 속성은 동일한 테스트에서 몇 개의 기능이 테스트를 실행해야 하는지를 처리합니다.
    //
    maxInstances: 10,
    //
    // 또는 특정 기능으로 테스트를 실행하는 제한을 설정합니다.
    maxInstancesPerCapability: 10,
    //
    // WebdriverIO의 전역 변수(예: `browser`, `$` 및 `$$`)를 전역 환경에 삽입합니다.
    // `false`로 설정하면 `@wdio/globals`에서 가져와야 합니다. 참고: WebdriverIO는
    // 테스트 프레임워크별 전역 변수 주입을 처리하지 않습니다.
    //
    injectGlobals: true,
    //
    // 모든 중요한 기능을 함께 가져오는 데 문제가 있는 경우 Sauce Labs 플랫폼
    // 구성자를 확인하세요 - 기능을 구성하는 데 유용한 도구입니다:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // 헤드리스 크롬을 실행하려면 다음 플래그가 필요합니다
        // (https://developers.google.com/web/updates/2017/04/headless-chrome 참조)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // 일부 또는 모든 기본 플래그를 무시하는 매개변수
        // - 값이 true인 경우: 모든 DevTools '기본 플래그' 및 Puppeteer '기본 인수' 무시
        // - 값이 배열인 경우: DevTools는 주어진 기본 인수를 필터링합니다
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances는 기능별로 재정의될 수 있습니다. 따라서 사내 Selenium
        // 그리드에 Firefox 인스턴스가 5개만 있는 경우 한 번에 5개 이상의
        // 인스턴스가 시작되지 않도록 할 수 있습니다.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefox 헤드리스 모드를 활성화하는 플래그(moz:firefoxOptions에 대한 자세한 내용은 https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities 참조)
          // args: ['-headless']
        },
        // outputDir이 제공되면 WebdriverIO는 드라이버 세션 로그를 캡처할 수 있습니다
        // 어떤 logTypes을 제외할지 구성하는 것이 가능합니다.
        excludeDriverLogs: ['*'], // 모든 드라이버 세션 로그를 제외하려면 '*'를 전달하세요
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // 일부 또는 모든 Puppeteer 기본 인수를 무시하는 매개변수
        // ignoreDefaultArgs: ['-foreground'], // 모든 기본 인수를 무시하려면 값을 true로 설정하세요
    }],
    //
    // 자식 프로세스를 시작할 때 사용할 추가 노드 인수 목록
    execArgv: [],
    //
    // ===================
    // 테스트 구성
    // ===================
    // WebdriverIO 인스턴스와 관련된 모든 옵션을 여기에 정의합니다
    //
    // 로깅 상세 수준: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // 로거별로 특정 로그 수준 설정
    // 로거를 비활성화하려면 'silent' 수준 사용
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // 모든 로그를 저장할 디렉터리 설정
    outputDir: __dirname,
    //
    // 특정 수의 테스트가 실패할 때까지만 테스트를 실행하려면
    // bail(기본값은 0 - 중단하지 않고 모든 테스트 실행)을 사용하세요.
    bail: 0,
    //
    // `url()` 명령 호출을 단축하기 위해 기본 URL을 설정합니다. `url` 매개변수가
    // `/`로 시작하면 `baseUrl`이 추가되지만 `baseUrl`의 경로 부분은 포함되지 않습니다.
    //
    // `url` 매개변수가 스키마나 `/` 없이 시작하면(예: `some/path`) `baseUrl`이
    // 직접 앞에 추가됩니다.
    baseUrl: 'http://localhost:8080',
    //
    // 모든 waitForXXX 명령의 기본 타임아웃.
    waitforTimeout: 1000,
    //
    // `--watch` 플래그로 `wdio` 명령을 실행할 때 감시할 파일 추가
    // (예: 응용 프로그램 코드 또는 페이지 객체). 글로빙(Globbing)이 지원됩니다.
    filesToWatch: [
        // 예: 응용 프로그램 코드를 변경하면 테스트 다시 실행
        // './app/**/*.js'
    ],
    //
    // 스펙을 실행할 프레임워크.
    // 다음이 지원됩니다: 'mocha', 'jasmine', 'cucumber'
    // 참조: https://webdriver.io/docs/frameworks.html
    //
    // 테스트를 실행하기 전에 특정 프레임워크용 wdio 어댑터 패키지가 설치되어 있는지 확인하세요.
    framework: 'mocha',
    //
    // 전체적으로 실패한 경우 전체 스펙 파일을 재시도하는 횟수
    specFileRetries: 1,
    // 스펙 파일 재시도 시도 사이의 지연 시간(초)
    specFileRetriesDelay: 0,
    // 재시도된 스펙 파일을 즉시 재시도할지 아니면 큐의 끝으로 지연시킬지 여부
    specFileRetriesDeferred: false,
    //
    // stdout용 테스트 리포터.
    // 기본적으로 지원되는 유일한 것은 'dot'입니다
    // 참조: https://webdriver.io/docs/dot-reporter.html, 왼쪽 열에서 "Reporters" 클릭
    reporters: [
        'dot',
        ['allure', {
            //
            // "allure" 리포터를 사용하는 경우 WebdriverIO가 모든 allure 보고서를
            // 저장해야 하는 디렉터리를 정의해야 합니다.
            outputDir: './'
        }]
    ],
    //
    // Mocha에 전달할 옵션.
    // 전체 목록은 다음을 참조하세요: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmine에 전달할 옵션.
    // 참조: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine 기본 타임아웃
        defaultTimeoutInterval: 5000,
        //
        // Jasmine 프레임워크는 각 어설션을 가로채서 결과에 따라 애플리케이션 또는
        // 웹사이트의 상태를 기록할 수 있습니다. 예를 들어, 어설션이 실패할 때마다
        // 스크린샷을 찍는 것이 매우 편리합니다.
        expectationResultHandler: function(passed, assertion) {
            // 무언가 수행
        },
        //
        // Jasmine 특정 grep 기능 사용
        grep: null,
        invertGrep: null
    },
    //
    // Cucumber를 사용하는 경우 단계 정의가 어디에 있는지 지정해야 합니다.
    // 참조: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (파일/디렉토리) 기능 실행 전 파일 로드
        backtrace: false,   // <boolean> 오류에 대한 전체 백트레이스 표시
        compiler: [],       // <string[]> ("확장자:모듈") MODULE을 요구한 후 주어진 EXTENSION이 있는 파일을 요구(반복 가능)
        dryRun: false,      // <boolean> 단계를 실행하지 않고 포맷터 호출
        failFast: false,    // <boolean> 첫 번째 실패 시 실행 중단
        snippets: true,     // <boolean> 대기 중인 단계에 대한 단계 정의 스니펫 숨기기
        source: true,       // <boolean> 소스 URI 숨기기
        strict: false,      // <boolean> 정의되지 않았거나 대기 중인 단계가 있는 경우 실패
        tagExpression: '',  // <string> (표현식) 표현식과 일치하는 태그가 있는 기능 또는 시나리오만 실행
        timeout: 20000,     // <number> 단계 정의의 타임아웃
        ignoreUndefinedDefinitions: false, // <boolean> 정의되지 않은 정의를 경고로 처리하려면 이 구성을 활성화하세요.
        scenarioLevelReporter: false // 시나리오가 단계가 아닌 테스트인 것처럼 webdriver.io가 동작하도록 하려면 이것을 활성화하세요.
    },
    // 사용자 정의 tsconfig 경로 지정 - WDIO는 TypeScript 파일을 컴파일하기 위해 `tsx`를 사용합니다
    // TSConfig는 현재 작업 디렉토리에서 자동으로 감지되지만
    // 여기에 사용자 정의 경로를 지정하거나 TSX_TSCONFIG_PATH 환경 변수를 설정할 수 있습니다
    // `tsx` 문서 참조: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // 훅
    // =====
    // WebdriverIO는 테스트 프로세스에 개입하여 향상시키고 그 주변에 서비스를 구축할 수 있는
    // 여러 훅을 제공합니다. 단일 함수를 적용하거나 메서드 배열을 적용할 수 있습니다.
    // 그 중 하나가 프로미스를 반환하면 WebdriverIO는 계속 진행하기 위해 해당 프로미스가
    // 해결될 때까지 기다립니다.
    //
    /**
     * 모든 작업자가 시작되기 전에 한 번 실행됩니다.
     * @param {object} config wdio 구성 객체
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * 작업자 프로세스가 생성되기 전에 실행되며 해당 작업자에 대한 특정 서비스를 초기화하고
     * 비동기 방식으로 런타임 환경을 수정하는 데 사용될 수 있습니다.
     * @param  {string} cid      기능 ID(예: 0-0)
     * @param  {object} caps     작업자에서 생성될 세션에 대한 기능이 포함된 객체
     * @param  {object} specs    작업자 프로세스에서 실행될 스펙
     * @param  {object} args     작업자가 초기화되면 기본 구성과 병합될 객체
     * @param  {object} execArgv 작업자 프로세스에 전달된 문자열 인수 목록
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * 작업자 프로세스가 종료된 후 실행됩니다.
     * @param  {string} cid      기능 ID(예: 0-0)
     * @param  {number} exitCode 0 - 성공, 1 - 실패
     * @param  {object} specs    작업자 프로세스에서 실행될 스펙
     * @param  {number} retries  사용된 재시도 횟수
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriver 세션 및 테스트 프레임워크를 초기화하기 전에 실행됩니다. 기능 또는 스펙에 따라
     * 구성을 조작할 수 있습니다.
     * @param {object} config wdio 구성 객체
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     * @param {Array.<String>} specs 실행할 스펙 파일 경로 목록
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * 테스트 실행이 시작되기 전에 실행됩니다. 이 시점에서 `browser`와 같은 모든 전역
     * 변수에 액세스할 수 있습니다. 사용자 정의 명령을 정의하기에 완벽한 장소입니다.
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     * @param {Array.<String>} specs        실행할 스펙 파일 경로 목록
     * @param {object}         browser      생성된 브라우저/장치 세션의 인스턴스
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * 스위트가 시작되기 전에 실행됩니다(Mocha/Jasmine에서만).
     * @param {object} suite 스위트 세부 정보
     */
    beforeSuite: function (suite) {
    },
    /**
     * 이 훅은 스위트 내의 모든 훅이 시작되기 _전에_ 실행됩니다.
     * (예를 들어, 이것은 Mocha에서 `before`, `beforeEach`, `after`, `afterEach`를 호출하기 전에 실행됩니다.) Cucumber에서 `context`는 World 객체입니다.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * 스위트 내의 모든 훅이 끝난 _후_ 실행되는 훅입니다.
     * (예를 들어, 이것은 Mocha에서 `before`, `beforeEach`, `after`, `afterEach`를 호출한 후에 실행됩니다.) Cucumber에서 `context`는 World 객체입니다.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * 테스트 전에 실행되는 함수(Mocha/Jasmine에서만)
     * @param {object} test    테스트 객체
     * @param {object} context 테스트가 실행된 범위 객체
     */
    beforeTest: function (test, context) {
    },
    /**
     * WebdriverIO 명령이 실행되기 전에 실행됩니다.
     * @param {string} commandName 훅 명령 이름
     * @param {Array} args 명령이 받을 인수
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * WebdriverIO 명령이 실행된 후 실행됩니다
     * @param {string} commandName 훅 명령 이름
     * @param {Array} args 명령이 받을 인수
     * @param {number} result 0 - 명령 성공, 1 - 명령 오류
     * @param {object} error 오류 객체(있는 경우)
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * 테스트 후에 실행되는 함수(Mocha/Jasmine에서만)
     * @param {object}  test             테스트 객체
     * @param {object}  context          테스트가 실행된 범위 객체
     * @param {Error}   result.error     테스트가 실패한 경우 오류 객체, 그렇지 않으면 `undefined`
     * @param {*}       result.result    테스트 함수의 반환 객체
     * @param {number}  result.duration  테스트 기간
     * @param {boolean} result.passed    테스트가 통과한 경우 true, 그렇지 않으면 false
     * @param {object}  result.retries   스펙 관련 재시도에 대한 정보(예: `{ attempts: 0, limit: 0 }`)
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * 스위트가 종료된 후 실행되는 훅(Mocha/Jasmine에서만).
     * @param {object} suite 스위트 세부 정보
     */
    afterSuite: function (suite) {
    },
    /**
     * 모든 테스트가 완료된 후 실행됩니다. 테스트의 모든 전역 변수에 계속 액세스할 수 있습니다.
     * @param {number} result 0 - 테스트 통과, 1 - 테스트 실패
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     * @param {Array.<String>} specs 실행된 스펙 파일 경로 목록
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriver 세션을 종료한 직후 실행됩니다.
     * @param {object} config wdio 구성 객체
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     * @param {Array.<String>} specs 실행된 스펙 파일 경로 목록
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * 모든 작업자가 종료되고 프로세스가 종료되려고 할 때 실행됩니다.
     * `onComplete` 훅에서 오류가 발생하면 테스트 실행이 실패합니다.
     * @param {object} exitCode 0 - 성공, 1 - 실패
     * @param {object} config wdio 구성 객체
     * @param {Array.<Object>} capabilities 기능 세부 정보 목록
     * @param {<Object>} results 테스트 결과가 포함된 객체
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * 새로 고침이 발생할 때 실행됩니다.
    * @param {string} oldSessionId 이전 세션의 세션 ID
    * @param {string} newSessionId 새 세션의 세션 ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber 훅
     *
     * Cucumber 기능 전에 실행됩니다.
     * @param {string}                   uri      기능 파일 경로
     * @param {GherkinDocument.IFeature} feature  Cucumber 기능 객체
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Cucumber 시나리오 전에 실행됩니다.
     * @param {ITestCaseHookParameter} world    pickle 및 테스트 단계에 대한 정보가 포함된 world 객체
     * @param {object}                 context  Cucumber World 객체
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Cucumber 단계 전에 실행됩니다.
     * @param {Pickle.IPickleStep} step     단계 데이터
     * @param {IPickle}            scenario 시나리오 pickle
     * @param {object}             context  Cucumber World 객체
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Cucumber 단계 후에 실행됩니다.
     * @param {Pickle.IPickleStep} step             단계 데이터
     * @param {IPickle}            scenario         시나리오 pickle
     * @param {object}             result           시나리오 결과가 포함된 결과 객체
     * @param {boolean}            result.passed    시나리오가 통과한 경우 true
     * @param {string}             result.error     시나리오가 실패한 경우 오류 스택
     * @param {number}             result.duration  시나리오 기간(밀리초)
     * @param {object}             context          Cucumber World 객체
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * Cucumber 시나리오 후에 실행됩니다.
     * @param {ITestCaseHookParameter} world            pickle 및 테스트 단계에 대한 정보가 포함된 world 객체
     * @param {object}                 result           시나리오 결과가 포함된 결과 객체 `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    시나리오가 통과한 경우 true
     * @param {string}                 result.error     시나리오가 실패한 경우 오류 스택
     * @param {number}                 result.duration  시나리오 기간(밀리초)
     * @param {object}                 context          Cucumber World 객체
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * Cucumber 기능 후에 실행됩니다.
     * @param {string}                   uri      기능 파일 경로
     * @param {GherkinDocument.IFeature} feature  Cucumber 기능 객체
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIO 어설션 라이브러리가 어설션을 수행하기 전에 실행됩니다.
     * @param commandName 명령 이름
     * @param args        명령이 받을 인수
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIO 명령이 실행된 후 실행됩니다
     * @param commandName  명령 이름
     * @param args         명령이 받을 인수
     * @param result       명령의 결과
     * @param error        문제가 발생한 경우 오류
     */
    afterAssertion: function (params) {
    }
}
```

[예제 폴더](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)에서 가능한 모든 옵션과 변형이 포함된 파일을 찾을 수도 있습니다.