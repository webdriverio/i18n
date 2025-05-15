---
id: web-extensions
title: 웹 확장 프로그램 테스팅
---

WebdriverIO는 브라우저를 자동화하는 이상적인 도구입니다. 웹 확장 프로그램은 브라우저의 일부이며 같은 방식으로 자동화할 수 있습니다. 웹 확장 프로그램이 웹사이트에서 JavaScript를 실행하는 콘텐츠 스크립트를 사용하거나 팝업 모달을 제공할 때마다 WebdriverIO를 사용하여 e2e 테스트를 실행할 수 있습니다.

## 브라우저에 웹 확장 프로그램 로드하기

첫 번째 단계로, 세션의 일부로 테스트할 확장 프로그램을 브라우저에 로드해야 합니다. 이는 Chrome과 Firefox에서 다르게 작동합니다.

:::info

이 문서에서는 Safari 웹 확장 프로그램을 다루지 않습니다. Safari의 지원이 많이 뒤처져 있고 사용자 수요가 높지 않기 때문입니다. Safari용 웹 확장 프로그램을 개발하고 있다면, [이슈를 제기](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Docs+%F0%9F%93%96%2CNeeds+Triaging+%E2%8F%B3&template=documentation.yml&title=%5B%F0%9F%93%96+Docs%5D%3A+%3Ctitle%3E)하고 여기에 포함시키는 데 협력해 주세요.

:::

### Chrome

Chrome에서 웹 확장 프로그램을 로드하는 것은 `crx` 파일의 `base64` 인코딩 문자열을 제공하거나 웹 확장 프로그램 폴더 경로를 제공하여 수행할 수 있습니다. 후자가 가장 쉬운 방법으로, Chrome 기능을 다음과 같이 정의하면 됩니다:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            // wdio.conf.js가 루트 디렉토리에 있고 컴파일된
            // 웹 확장 프로그램 파일이 `./dist` 폴더에 있다고 가정
            args: [`--load-extension=${path.join(__dirname, '..', '..', 'dist')}`]
        }
    }]
}
```

:::info

Chrome이 아닌 Brave, Edge 또는 Opera와 같은 다른 브라우저를 자동화하는 경우, 브라우저 옵션이 위의 예제와 일치할 가능성이 높지만 `ms:edgeOptions`와 같은 다른 기능 이름을 사용합니다.

:::

[crx](https://www.npmjs.com/package/crx) NPM 패키지 등을 사용하여 확장 프로그램을 `.crx` 파일로 컴파일하는 경우, 다음과 같이 번들된 확장 프로그램을 주입할 수도 있습니다:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extPath = path.join(__dirname, `web-extension-chrome.crx`)
const chromeExtension = (await fs.readFile(extPath)).toString('base64')

export const config = {
    // ...
    capabilities: [{
        browserName,
        'goog:chromeOptions': {
            extensions: [chromeExtension]
        }
    }]
}
```

### Firefox

확장 프로그램이 포함된 Firefox 프로필을 만들려면 [Firefox Profile Service](/docs/firefox-profile-service)를 사용하여 세션을 적절히 설정할 수 있습니다. 그러나 서명 문제로 인해 로컬에서 개발된 확장 프로그램을 로드하지 못할 수 있습니다. 이 경우 [`installAddOn`](/docs/api/gecko#installaddon) 명령을 통해 `before` 훅에서 확장 프로그램을 로드할 수도 있습니다:

```js wdio.conf.js
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const extensionPath = path.resolve(__dirname, `web-extension.xpi`)

export const config = {
    // ...
    before: async (capabilities) => {
        const browserName = (capabilities as WebdriverIO.Capabilities).browserName
        if (browserName === 'firefox') {
            const extension = await fs.readFile(extensionPath)
            await browser.installAddOn(extension.toString('base64'), true)
        }
    }
}
```

`.xpi` 파일을 생성하려면 [`web-ext`](https://www.npmjs.com/package/web-ext) NPM 패키지를 사용하는 것이 좋습니다. 다음 예제 명령을 사용하여 확장 프로그램을 번들링할 수 있습니다:

```sh
npx web-ext build -s dist/ -a . -n web-extension-firefox.xpi
```

## 팁 & 트릭

다음 섹션에는 웹 확장 프로그램을 테스트할 때 유용한 팁과 트릭 세트가 포함되어 있습니다.

### Chrome에서 팝업 모달 테스트하기

[확장 프로그램 매니페스트](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/browser_action)에서 `default_popup` 브라우저 액션 항목을 정의한 경우, 브라우저 상단 바에서 확장 프로그램 아이콘을 클릭하는 방식으로는 작동하지 않기 때문에 해당 HTML 페이지를 직접 테스트할 수 있습니다. 대신 팝업 HTML 파일을 직접 열어야 합니다.

Chrome에서는 확장 프로그램 ID를 검색하고 `browser.url('...')`을 통해 팝업 페이지를 여는 방식으로 작동합니다. 해당 페이지의 동작은 팝업 내에서의 동작과 동일합니다. 이를 위해 다음과 같은 사용자 정의 명령을 작성하는 것이 좋습니다:

```ts customCommand.ts
export async function openExtensionPopup (this: WebdriverIO.Browser, extensionName: string, popupUrl = 'index.html') {
  if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
    throw new Error('This command only works with Chrome')
  }
  await this.url('chrome://extensions/')

  const extensions = await this.$$('extensions-item')
  const extension = await extensions.find(async (ext) => (
    await ext.$('#name').getText()) === extensionName
  )

  if (!extension) {
    const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
    throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
  }

  const extId = await extension.getAttribute('id')
  await this.url(`chrome-extension://${extId}/popup/${popupUrl}`)
}

declare global {
  namespace WebdriverIO {
      interface Browser {
        openExtensionPopup: typeof openExtensionPopup
      }
  }
}
```

`wdio.conf.js`에서 이 파일을 가져와 `before` 훅에서 사용자 정의 명령을 등록할 수 있습니다:

```ts wdio.conf.ts
import { browser } from '@wdio/globals'

import { openExtensionPopup } from './support/customCommands'

export const config: WebdriverIO.Config = {
  // ...
  before: () => {
    browser.addCommand('openExtensionPopup', openExtensionPopup)
  }
}
```

이제 테스트에서 다음과 같이 팝업 페이지에 접근할 수 있습니다:

```ts
await browser.openExtensionPopup('My Web Extension')
```