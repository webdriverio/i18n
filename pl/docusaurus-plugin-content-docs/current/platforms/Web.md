---
id: web
title: Przeglądarki internetowe
description: Skonfiguruj i uruchamiaj w WebdriverIO testy end-to-end, testy komponentów, testy wizualne i testy dostępności w Chrome, Firefox, Microsoft Edge i Safari.
---

WebdriverIO automatyzuje przeglądarki desktopowe (Chrome, Chromium, Firefox, Microsoft Edge i Safari) za pomocą standardowych sterowników przeglądarek. Domyślnie próbuje otworzyć sesję [WebDriver BiDi](/docs/automationProtocols), czyli dwukierunkowego następcy klasycznego protokołu WebDriver. BiDi umożliwia korzystanie z takich funkcji jak mockowanie sieci i emulacja Web API. Aby z niego zrezygnować, ustaw `wdio:enforceWebDriverClassic: true` w swoich capabilities. Nie musisz samodzielnie instalować sterowników: wystarczy ustawić `browserName`, a WebdriverIO pobierze i uruchomi odpowiedni Chromedriver, Geckodriver lub Edgedriver. Zainstaluje również Chrome, Chromium lub Firefox, jeśli nie znajdzie lokalnej instalacji. Microsoft Edge musi być już zainstalowany, a Safaridriver jest dostarczany wraz z macOS. Ten sam testrunner może także uruchamiać testy wewnątrz przeglądarki za pomocą Browser Runnera. Obejmuje to testy jednostkowe i testy komponentów dla React, Vue, Svelte, SolidJS, Preact, Lit i Stencil.

## Szybki start

Utwórz szkielet projektu interaktywnie za pomocą `npm init wdio@latest .`. Przekazanie `--yes` wybiera ustawienia domyślne: Mocha, Chrome i page objects. Aby skonfigurować projekt ręcznie, zainstaluj testrunner, adapter frameworka, reporter oraz `tsx` dla TypeScriptu:

```sh
npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter tsx
```

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }],
    logLevel: 'info',
    waitforTimeout: 10000,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/login.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await browser.url('https://the-internet.herokuapp.com/login')

        await $('#username').setValue('tomsmith')
        await $('#password').setValue('SuperSecretPassword!')
        await $('button[type="submit"]').click()

        await expect($('#flash')).toBeExisting()
        await expect($('#flash')).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
    })
})
```

```sh
npx wdio run ./wdio.conf.ts
```

Każda capability otrzymuje własne procesy robocze, więc spec zostanie uruchomiony zarówno w Chrome, jak i w Firefoksie. Inne prawidłowe wartości `browserName` to `chromium`, `msedge` i `safari`. Aby uruchomić przeglądarkę w trybie headless, dodaj argumenty przeglądarki, takie jak `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Informacje dotyczące Firefoksa i Edge znajdziesz w sekcji [Run Browser Headless](/docs/capabilities#run-browser-headless); Safari nie ma trybu headless.

## Wybierz swoją ścieżkę

Testy end-to-end w różnych przeglądarkach:

- [Capabilities](/docs/capabilities): opcje przeglądarki, tryb headless, kanały przeglądarek (Canary, Nightly, Safari Technology Preview) oraz opcje sterowników `wdio:*`.
- [Driver Binaries](/docs/driverbinaries): jak działa automatyczna konfiguracja przeglądarek i sterowników oraz jak wskazać własne pliki binarne.
- [Automation Protocols](/docs/automationProtocols): WebDriver a WebDriver BiDi.
- [WebDriver BiDi commands](/docs/api/webdriverBidi): surowe polecenia protokołu BiDi dostępne w obiekcie `browser`.
- [Selectors](/docs/selectors): selektory CSS, tekstowe, ARIA, deep (shadow DOM) i React.
- [Auto-waiting](/docs/autowait) i [Timeouts](/docs/timeouts): jak WebdriverIO czeka na elementy i co można dostosować.
- [Multi-remote](/docs/multiremote): sterowanie kilkoma przeglądarkami w jednym teście, np. w aplikacjach czatu lub WebRTC.

Możliwości przeglądarki wymagające WebDriver BiDi (Chrome, Edge i Firefox; nie Safari):

- [Request Mocks and Spies](/docs/mocksandspies): przechwytywanie, modyfikowanie lub zastępowanie żądań sieciowych za pomocą `browser.mock()`. Zobacz także [Mock object](/docs/api/mock).
- [Emulation](/docs/emulation): emulacja geolokalizacji, funkcji multimediów, user agenta, stanu offline, ustawień regionalnych, strefy czasowej, ekranu i urządzeń za pomocą `browser.emulate()`.

Testy komponentów i testy jednostkowe w prawdziwej przeglądarce:

- [Component Testing](/docs/component-testing): jak działa oparty na Vite [Browser Runner](/docs/runner#browser-runner) i jak go skonfigurować.
- Przewodniki dla frameworków: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) i [Coverage](/docs/component-testing/coverage) dla testów komponentów.

Testy wizualne i testy dostępności:

- [Visual Testing](/docs/visual-testing): porównywanie obrazów ekranu, elementów i całych stron za pomocą `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): asercje snapshotów DOM i obiektów.
- [Axe Core](/docs/accessibility-testing/axe-core): uruchamianie skanów dostępności Deque axe z poziomu testów.

Skalowanie:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) i [Docker](/docs/docker): zdalne uruchamianie przeglądarek.
- [Sharding](/docs/sharding): dzielenie zestawu testów między maszyny CI.

Test komponentu korzysta z tego samego pliku konfiguracyjnego z innym runnerem. Na przykład, aby użyć presetu React:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        preset: 'react'
    }],
    specs: ['./src/**/*.test.tsx'],
    capabilities: [{
        browserName: 'chrome'
    }],
    framework: 'mocha',
    reporters: ['spec']
}
```

Browser Runner wymaga `@wdio/browser-runner`. Preset React potrzebuje również `@vitejs/plugin-react`, a przewodniki zalecają `@testing-library/react` do renderowania. Dostępne są presety dla `vue`, `svelte`, `solid`, `react`, `preact` i `stencil`. W pozostałych przypadkach użyj zamiast tego `viteConfig`.

## Rozwiązywanie problemów

- Chrome nie uruchamia się w CI z komunikatem "user data directory is already in use" lub "DevToolsActivePort file doesn't exist": zobacz [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` lub `browser.emulate()` nie działa: sesja nie korzysta z WebDriver BiDi. Sprawdź swoją przeglądarkę (Safari nie obsługuje BiDi), dostawcę usług chmurowych oraz `wdio:enforceWebDriverClassic`.
- Nie można pobrać sterowników lub przeglądarek przez proxy: zobacz [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) i [Proxy Setup](/docs/proxy).
- Niestabilne testy: zobacz [Retry Flaky Tests](/docs/retry) i [Debugging](/docs/debugging).

## Następne kroki

- Dokumentacja [Configuration](/docs/configuration) dla każdej opcji `wdio.conf.ts`.
- [TypeScript Setup](/docs/typescript) i [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Page Object Pattern](/docs/pageobjects) do strukturyzowania większych zestawów testów.
- [MCP](/docs/mcp), aby pozwolić agentowi AI sterować sesją przeglądarki za pośrednictwem WebdriverIO.
- Inne platformy: [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop), [Extensions & Editors](/docs/platforms/apps-and-extensions).