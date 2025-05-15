---
id: visual-reporter
title: 비주얼 리포터
---

비주얼 리포터는 `@wdio/visual-service`의 [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0) 버전부터 도입된 새로운 기능입니다. 이 리포터는 비주얼 테스팅 서비스에서 생성된 JSON 차이 보고서를 시각화하고 사람이 읽기 쉬운 형식으로 변환할 수 있게 합니다. 이는 팀이 시각적 테스트 결과를 더 잘 분석하고 관리할 수 있도록 그래픽 인터페이스를 제공하여 출력을 검토하는 데 도움이 됩니다.

이 기능을 활용하려면 필요한 `output.json` 파일을 생성하기 위한 필수 구성이 있어야 합니다. 이 문서는 비주얼 리포터를 설정, 실행 및 이해하는 방법을 안내합니다.

# 필수 조건

비주얼 리포터를 사용하기 전에 JSON 보고서 파일을 생성하도록 비주얼 테스팅 서비스를 구성해야 합니다:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // output.json 파일 생성
            },
        ],
    ],
};
```

더 자세한 설정 지침은 WebdriverIO [비주얼 테스팅 문서](./) 또는 [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)를 참조하세요.

# 설치

비주얼 리포터를 설치하려면 npm을 사용하여 프로젝트에 개발 종속성으로 추가하세요:

```bash
npm install @wdio/visual-reporter --save-dev
```

이렇게 하면 비주얼 테스트에서 보고서를 생성하는 데 필요한 파일을 사용할 수 있습니다.

# 사용법

## 비주얼 보고서 빌드하기

비주얼 테스트를 실행하고 `output.json` 파일이 생성되면 CLI 또는 대화형 프롬프트를 사용하여 비주얼 보고서를 빌드할 수 있습니다.

### CLI 사용법

다음 CLI 명령을 실행하여 보고서를 생성할 수 있습니다:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### 필수 옵션:

- `--jsonOutput`: 비주얼 테스팅 서비스에서 생성한 `output.json` 파일의 상대 경로. 이 경로는 명령을 실행하는 디렉토리를 기준으로 합니다.
- `--reportFolder`: 생성된 보고서가 저장될 상대 디렉토리. 이 경로 역시 명령을 실행하는 디렉토리를 기준으로 합니다.

#### 선택적 옵션:

- `--logLevel`: 문제 해결에 특히 유용한 자세한 로깅을 얻으려면 `debug`로 설정하세요.

#### 예시

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

이렇게 하면 지정된 폴더에 보고서가 생성되고 콘솔에 피드백이 제공됩니다. 예를 들면:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### 보고서 보기

:::warning
`path/to/report/index.html`을 **로컬 서버에서 제공하지 않고** 브라우저에서 직접 열면 작동하지 **않습니다**.
:::

보고서를 보려면 [sirv-cli](https://www.npmjs.com/package/sirv-cli)와 같은 간단한 서버를 사용해야 합니다. 다음 명령으로 서버를 시작할 수 있습니다:

```bash
npx sirv-cli /path/to/report --single
```

이렇게 하면 아래 예시와 유사한 로그가 생성됩니다. 포트 번호는 다를 수 있습니다:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

이제 브라우저에서 제공된 URL을 열어 보고서를 볼 수 있습니다.

### 대화형 프롬프트 사용하기

또는 다음 명령을 실행하고 프롬프트에 응답하여 보고서를 생성할 수 있습니다:

```bash
npx @wdio/visual-reporter
```

프롬프트는 필요한 경로와 옵션을 제공하는 과정을 안내합니다. 마지막에 대화형 프롬프트는 보고서를 보기 위해 서버를 시작할지 묻습니다. 서버를 시작하기로 선택하면, 도구는 간단한 서버를 실행하고 로그에 URL을 표시합니다. 브라우저에서 이 URL을 열어 보고서를 볼 수 있습니다.

![비주얼 리포터 CLI](/img/visual/cli-screen-recording.gif)

![비주얼 리포터](/img/visual/visual-reporter.gif)

#### 보고서 보기

:::warning
`path/to/report/index.html`을 **로컬 서버에서 제공하지 않고** 브라우저에서 직접 열면 작동하지 **않습니다**.
:::

대화형 프롬프트를 통해 서버를 시작하지 **않기로** 선택한 경우에도 다음 명령을 수동으로 실행하여 보고서를 볼 수 있습니다:

```bash
npx sirv-cli /path/to/report --single
```

이렇게 하면 아래 예시와 유사한 로그가 생성됩니다. 포트 번호는 다를 수 있습니다:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

이제 브라우저에서 제공된 URL을 열어 보고서를 볼 수 있습니다.

# 보고서 데모

보고서가 어떻게 보이는지 예시를 보려면 [GitHub Pages 데모](https://webdriverio.github.io/visual-testing/)를 방문하세요.

# 비주얼 보고서 이해하기

비주얼 리포터는 시각적 테스트 결과에 대한 체계적인 보기를 제공합니다. 각 테스트 실행에 대해 다음을 수행할 수 있습니다:

- 테스트 케이스 간에 쉽게 이동하고 집계된 결과 확인.
- 테스트 이름, 사용된 브라우저 및 비교 결과와 같은 메타데이터 검토.
- 시각적 차이가 감지된 위치를 보여주는 차이 이미지 보기.

이러한 시각적 표현은 테스트 결과의 분석을 단순화하여 시각적 회귀를 더 쉽게 식별하고 해결할 수 있게 합니다.

# CI 통합

우리는 Jenkins, GitHub Actions 등과 같은 다양한 CI 도구를 지원하기 위해 노력하고 있습니다. 도움을 주고 싶으시다면 [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642)에서 연락해 주세요.