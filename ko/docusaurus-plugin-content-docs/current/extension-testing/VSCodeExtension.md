---
id: vscode-extensions
title: VS Code 확장 프로그램 테스팅
---

WebdriverIO를 사용하면 [VS Code](https://code.visualstudio.com/) 확장 프로그램을 VS Code 데스크톱 IDE나 웹 확장 프로그램으로 원활하게 엔드 투 엔드 테스트할 수 있습니다. 확장 프로그램 경로만 제공하면 나머지는 프레임워크가 처리합니다. [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service)는 다음과 같은 모든 것을 관리합니다:

- 🏗️ VSCode 설치 (안정 버전, 인사이더 버전 또는 특정 버전)
- ⬇️ 특정 VSCode 버전에 맞는 Chromedriver 다운로드
- 🚀 테스트에서 VSCode API에 접근할 수 있도록 지원
- 🖥️ 사용자 정의 설정으로 VSCode 시작 (Ubuntu, MacOS 및 Windows에서 VSCode 지원 포함)
- 🌐 또는 웹 확장 프로그램 테스트를 위해 모든 브라우저에서 접근할 수 있도록 서버에서 VSCode 제공
- 📔 VSCode 버전에 맞는 로케이터를 사용하여 페이지 객체 부트스트래핑

## 시작하기

새로운 WebdriverIO 프로젝트를 시작하려면 다음을 실행하세요:

```sh
npm create wdio@latest ./
```

설치 마법사가 과정을 안내할 것입니다. 어떤 유형의 테스트를 수행하고 싶은지 묻는 질문에서 _"VS Code Extension Testing"_ 을 선택하고, 그 후에는 기본값을 유지하거나 원하는대로 수정하세요.

## 설정 예제

이 서비스를 사용하려면 서비스 목록에 `vscode`를 추가하고, 선택적으로 설정 객체를 함께 추가하세요. 이렇게 하면 WebdriverIO가 지정된 VSCode 바이너리와 적절한 Chromedriver 버전을 다운로드합니다:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // 최신 VSCode 버전은 "insiders" 또는 "stable"
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * 선택적으로 WebdriverIO가 모든 VSCode와 Chromedriver 바이너리를
     * 저장하는 경로를 정의할 수 있습니다. 예:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

`browserName`을 `vscode`가 아닌 다른 값(예: `chrome`)으로 정의하고 `wdio:vscodeOptions`를 사용하면, 서비스는 확장 프로그램을 웹 확장 프로그램으로 제공합니다. Chrome에서 테스트할 경우 추가 드라이버 서비스는 필요하지 않습니다:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'wdio:vscodeOptions': {
            extensionPath: __dirname
        }
    }],
    services: ['vscode'],
    // ...
};
```

_참고:_ 웹 확장 프로그램을 테스트할 때는 `browserVersion`으로 `stable` 또는 `insiders`만 선택할 수 있습니다.

### TypeScript 설정

`tsconfig.json`에서 `wdio-vscode-service`를 타입 목록에 추가해야 합니다:

```json
{
    "compilerOptions": {
        "types": [
            "node",
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            "wdio-vscode-service"
        ],
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## 사용법

`getWorkbench` 메서드를 사용하여 원하는 VSCode 버전에 맞는 로케이터를 가진 페이지 객체에 접근할 수 있습니다:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

여기서부터 올바른 페이지 객체 메서드를 사용하여 모든 페이지 객체에 접근할 수 있습니다. 사용 가능한 모든 페이지 객체와 메서드에 대한 자세한 내용은 [페이지 객체 문서](https://webdriverio-community.github.io/wdio-vscode-service/)에서 확인할 수 있습니다.

### VSCode API 접근하기

[VSCode API](https://code.visualstudio.com/api/references/vscode-api)를 통해 특정 자동화를 실행하려면 커스텀 `executeWorkbench` 명령을 통해 원격 명령을 실행할 수 있습니다. 이 명령을 사용하면 테스트에서 VSCode 환경 내부로 코드를 원격 실행하고 VSCode API에 접근할 수 있습니다. 함수에 임의의 매개변수를 전달할 수 있으며, 이 매개변수는 함수에 전달됩니다. `vscode` 객체는 항상 첫 번째 인수로 전달되고 그 다음에 외부 함수 매개변수가 옵니다. 콜백이 원격으로 실행되기 때문에 함수 범위 외부의 변수에는 접근할 수 없습니다. 예시:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // 출력: "I am an API call!"
```

전체 페이지 객체 문서는 [docs](https://webdriverio-community.github.io/wdio-vscode-service/modules.html)에서 확인할 수 있습니다. 다양한 사용 예제는 이 [프로젝트의 테스트 스위트](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs)에서 찾을 수 있습니다.

## 더 많은 정보

[`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service)를 구성하는 방법과 사용자 정의 페이지 객체를 만드는 방법에 대해 [서비스 문서](/docs/wdio-vscode-service)에서 자세히 알아볼 수 있습니다. 또한 [Christian Bromann](https://twitter.com/bromann)의 [_웹 표준의 힘을 활용한 복잡한 VSCode 확장 프로그램 테스팅_](https://www.youtube.com/watch?v=PhGNTioBUiU) 강연도 시청할 수 있습니다:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>