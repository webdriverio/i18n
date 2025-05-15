---
id: electron
title: 일렉트론
---

Electron은 JavaScript, HTML 및 CSS를 사용하여 데스크톱 애플리케이션을 구축하기 위한 프레임워크입니다. Chromium과 Node.js를 바이너리에 내장함으로써 Electron을 사용하면 하나의 JavaScript 코드베이스를 유지하고 Windows, macOS 및 Linux에서 작동하는 크로스 플랫폼 앱을 만들 수 있습니다 - 네이티브 개발 경험이 필요하지 않습니다.

WebdriverIO는 Electron 앱과의 상호 작용을 단순화하고 테스트를 매우 간단하게 만드는 통합 서비스를 제공합니다. Electron 응용 프로그램 테스트에 WebdriverIO를 사용하는 장점은 다음과 같습니다:

- 🚗 필요한 Chromedriver 자동 설정
- 📦 Electron 애플리케이션의 자동 경로 감지 - [Electron Forge](https://www.electronforge.io/)와 [Electron Builder](https://www.electron.build/)를 지원합니다
- 🧩 테스트 내에서 Electron API에 접근
- 🕵️ Vitest와 유사한 API를 통한 Electron API 모킹

시작하기 위해 몇 가지 간단한 단계만 필요합니다. [WebdriverIO YouTube](https://www.youtube.com/@webdriverio) 채널에서 이 간단한 단계별 시작 비디오 튜토리얼을 시청하세요:

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

또는 다음 섹션의 가이드를 따르세요.

## 시작하기

새 WebdriverIO 프로젝트를 시작하려면 다음을 실행하세요:

```sh
npm create wdio@latest ./
```

설치 마법사가 프로세스를 안내할 것입니다. 어떤 유형의 테스트를 하고 싶은지 물어볼 때 _"Desktop Testing - of Electron Applications"_ 를 선택해야 합니다. 그런 다음 컴파일된 Electron 애플리케이션 경로(예: `./dist`)를 제공한 다음 기본값을 유지하거나 필요에 따라 수정하세요.

구성 마법사는 필요한 모든 패키지를 설치하고 애플리케이션을 테스트하는 데 필요한 구성이 포함된 `wdio.conf.js` 또는 `wdio.conf.ts`를 생성합니다. 테스트 파일을 자동 생성하는 데 동의하면 `npm run wdio`를 통해 첫 번째 테스트를 실행할 수 있습니다.

## 수동 설정

이미 프로젝트에서 WebdriverIO를 사용하고 있다면 설치 마법사를 건너뛰고 다음 종속성만 추가하면 됩니다:

```sh
npm install --save-dev wdio-electron-service
```

그런 다음 다음과 같은 구성을 사용할 수 있습니다:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

끝입니다 🎉

[Electron 서비스 구성 방법](/docs/desktop-testing/electron/configuration), [Electron API 모킹 방법](/docs/desktop-testing/electron/mocking) 및 [Electron API 접근 방법](/docs/desktop-testing/electron/api)에 대해 자세히 알아보세요.