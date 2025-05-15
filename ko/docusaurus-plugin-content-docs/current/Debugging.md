---
id: debugging
title: 디버깅
---

여러 프로세스가 다수의 브라우저에서 수십 개의 테스트를 실행할 때 디버깅은 훨씬 더 어려워집니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

우선, `maxInstances`를 `1`로 설정하고 디버깅이 필요한 스펙과 브라우저만 대상으로 하여 병렬 처리를 제한하는 것이 매우 도움이 됩니다.

`wdio.conf`에서:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Debug 명령어

많은 경우에, [`browser.debug()`](/docs/api/browser/debug)를 사용하여 테스트를 일시 중지하고 브라우저를 검사할 수 있습니다.

명령줄 인터페이스도 REPL 모드로 전환됩니다. 이 모드에서는 페이지의 명령어와 요소를 조작할 수 있습니다. REPL 모드에서는 테스트에서와 같이 `browser` 객체 또는 `$`와 `$$` 함수에 접근할 수 있습니다.

`browser.debug()`를 사용할 때는 테스트가 너무 오래 걸려서 실패하는 것을 방지하기 위해 테스트 러너의 타임아웃을 늘려야 할 가능성이 높습니다. 예를 들어:

`wdio.conf`에서:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

다른 프레임워크에서 타임아웃을 설정하는 방법에 대한 자세한 내용은 [timeouts](timeouts)를 참조하세요.

디버깅 후 테스트를 계속하려면 쉘에서 `^C` 단축키나 `.exit` 명령어를 사용하세요.

## 동적 구성

`wdio.conf.js`는 자바스크립트를 포함할 수 있습니다. 타임아웃 값을 영구적으로 1일로 변경하고 싶지 않을 수 있으므로, 환경 변수를 사용하여 명령줄에서 이러한 설정을 변경하는 것이 종종 유용합니다.

이 기술을 사용하면 구성을 동적으로 변경할 수 있습니다:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

그런 다음 `wdio` 명령 앞에 `debug` 플래그를 붙일 수 있습니다:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...그리고 DevTools로 스펙 파일을 디버깅하세요!

## Visual Studio Code(VSCode)로 디버깅하기

최신 VSCode에서 중단점을 사용하여 테스트를 디버깅하려면 두 가지 옵션이 있으며, 그 중 옵션 1이 가장 쉬운 방법입니다:
 1. 디버거 자동 연결
 2. 구성 파일을 사용하여 디버거 연결

### VSCode 자동 연결 토글

다음 단계를 따라 VSCode에서 디버거를 자동으로 연결할 수 있습니다:
 - CMD + Shift + P (Linux 및 Macos) 또는 CTRL + Shift + P (Windows) 누르기
 - 입력 필드에 "attach" 입력
 - "Debug: Toggle Auto Attach" 선택
 - "Only With Flag" 선택

이게 전부입니다! 이제 테스트를 실행하면(앞서 보여드린 대로 --inspect 플래그를 설정해야 함) 자동으로 디버거가 시작되고 처음 만나는 중단점에서 멈출 것입니다.

### VSCode 구성 파일

모든 스펙 파일 또는 선택한 스펙 파일을 실행할 수 있습니다. 디버그 구성을 `.vscode/launch.json`에 추가해야 하며, 선택한 스펙을 디버깅하려면 다음 구성을 추가하세요:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

모든 스펙 파일을 실행하려면 `"args"`에서 `"--spec", "${file}"`를 제거하세요.

예시: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

추가 정보: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atom에서 동적 Repl 사용하기

[Atom](https://atom.io/) 해커라면 [@kurtharriger](https://github.com/kurtharriger)의 [`wdio-repl`](https://github.com/kurtharriger/wdio-repl)을 시도해볼 수 있습니다. 이는 Atom에서 단일 코드 라인을 실행할 수 있게 해주는 동적 repl입니다. 데모를 보려면 [이](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTube 비디오를 시청하세요.

## WebStorm / Intellij로 디버깅하기
다음과 같이 node.js 디버그 구성을 만들 수 있습니다:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
구성을 만드는 방법에 대한 자세한 정보는 이 [YouTube 비디오](https://www.youtube.com/watch?v=Qcqnmle6Wu8)를 시청하세요.

## 불안정한 테스트 디버깅하기

불안정한 테스트는 디버깅하기 매우 어려울 수 있으므로, CI에서 발생한 불안정한 결과를 로컬에서 재현하는 방법에 대한 몇 가지 팁을 소개합니다.

### 네트워크
네트워크 관련 불안정성을 디버깅하려면 [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) 명령을 사용하세요.
```js
await browser.throttleNetwork('Regular3G')
```

### 렌더링 속도
기기 속도 관련 불안정성을 디버깅하려면 [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) 명령을 사용하세요.
이는 페이지 렌더링 속도를 늦추게 되는데, CI에서 여러 프로세스를 실행하는 등의 이유로 테스트 속도가 느려지는 경우가 있습니다.
```js
await browser.throttleCPU(4)
```

### 테스트 실행 속도

테스트가 영향을 받지 않는 것처럼 보인다면, WebdriverIO가 프론트엔드 프레임워크/브라우저의 업데이트보다 빠를 수 있습니다. 이는 WebdriverIO가 더 이상 이러한 어설션을 재시도할 기회가 없는 동기식 어설션을 사용할 때 발생합니다. 이로 인해 문제가 발생할 수 있는 코드의 예:
```js
expect(elementList.length).toEqual(7) // 어설션 시점에 리스트가 아직 채워지지 않았을 수 있음
expect(await elem.getText()).toEqual('this button was clicked 3 times') // 어설션 시점에 텍스트가 아직 업데이트되지 않아 오류 발생 가능 ("this button was clicked 2 times"가 예상된 "this button was clicked 3 times"와 일치하지 않음)
expect(await elem.isDisplayed()).toBe(true) // 아직 표시되지 않았을 수 있음
```
이 문제를 해결하려면 비동기 어설션을 대신 사용해야 합니다. 위의 예제는 다음과 같이 변경됩니다:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
이러한 어설션을 사용하면 WebdriverIO는 조건이 일치할 때까지 자동으로 기다립니다. 텍스트를 어설션할 때는 요소가 존재하고 텍스트가 예상 값과 동일해야 합니다.
이에 대해 [모범 사례 가이드](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions)에서 더 자세히 설명하고 있습니다.