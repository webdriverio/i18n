---
id: web
title: Webbläsare
description: Konfigurera och kör WebdriverIO-tester för end-to-end, komponenter, visuell testning och tillgänglighet i Chrome, Firefox, Microsoft Edge och Safari.
---

WebdriverIO automatiserar skrivbordswebbläsare (Chrome, Chromium, Firefox, Microsoft Edge och Safari) via standardiserade webbläsardrivrutiner. Som standard försöker det öppna en [WebDriver BiDi](/docs/automationProtocols)-session, den dubbelriktade efterföljaren till det klassiska WebDriver-protokollet. BiDi möjliggör funktioner som nätverksmockning och emulering av webb-API:er. Ange `wdio:enforceWebDriverClassic: true` i dina capabilities för att välja bort det. Du behöver inte installera drivrutiner själv: ange ett `browserName` så laddar WebdriverIO ner och startar motsvarande Chromedriver, Geckodriver eller Edgedriver. Det installerar också Chrome, Chromium eller Firefox när ingen lokal installation hittas. Microsoft Edge måste redan vara installerat, och Safaridriver medföljer macOS. Samma testrunner kan även köra tester inuti webbläsaren med Browser Runner. Detta omfattar enhets- och komponenttester för React, Vue, Svelte, SolidJS, Preact, Lit och Stencil.

## Snabbstart

Skapa ett projekt interaktivt med `npm init wdio@latest .`. Om du anger `--yes` väljs standardinställningarna: Mocha, Chrome och page objects. För att konfigurera ett projekt manuellt installerar du testrunnern, en ramverksadapter, en reporter och `tsx` för TypeScript:

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

Varje capability får sina egna arbetsprocesser, så detta kör specen i både Chrome och Firefox. Andra giltiga värden för `browserName` är `chromium`, `msedge` och `safari`. För att köra headless lägger du till webbläsarargument som `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }`. Se [Run Browser Headless](/docs/capabilities#run-browser-headless) för Firefox och Edge; Safari har inget headless-läge.

## Välj din väg

End-to-end-testning i olika webbläsare:

- [Capabilities](/docs/capabilities): webbläsaralternativ, headless-läge, webbläsarkanaler (Canary, Nightly, Safari Technology Preview) och `wdio:*`-drivrutinsalternativ.
- [Driver Binaries](/docs/driverbinaries): hur den automatiska konfigurationen av webbläsare och drivrutiner fungerar, och hur du pekar på anpassade binärfiler.
- [Automation Protocols](/docs/automationProtocols): WebDriver jämfört med WebDriver BiDi.
- [WebDriver BiDi-kommandon](/docs/api/webdriverBidi): råa BiDi-protokollkommandon som finns tillgängliga på `browser`-objektet.
- [Selectors](/docs/selectors): CSS-, text-, ARIA-, deep- (shadow DOM) och React-selektorer.
- [Auto-waiting](/docs/autowait) och [Timeouts](/docs/timeouts): hur WebdriverIO väntar på element och vad du kan justera.
- [Multi-remote](/docs/multiremote): styr flera webbläsare i ett och samma test, t.ex. för chatt- eller WebRTC-appar.

Webbläsarfunktioner som kräver WebDriver BiDi (Chrome, Edge och Firefox; inte Safari):

- [Request Mocks and Spies](/docs/mocksandspies): fånga upp, ändra eller stubba nätverksförfrågningar med `browser.mock()`. Se även [Mock-objektet](/docs/api/mock).
- [Emulation](/docs/emulation): emulera geolokalisering, mediefunktioner, user agent, offlineläge, språkinställning, tidszon, skärm och enheter med `browser.emulate()`.

Komponent- och enhetstestning i en riktig webbläsare:

- [Component Testing](/docs/component-testing): hur den Vite-baserade [Browser Runner](/docs/runner#browser-runner) fungerar och hur du konfigurerar den.
- Ramverksguider: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) och [Coverage](/docs/component-testing/coverage) för komponenttester.

Visuell testning och tillgänglighetstestning:

- [Visual Testing](/docs/visual-testing): bildjämförelse av skärm, element och hela sidor med `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): snapshot-assertions för DOM och objekt.
- [Axe Core](/docs/accessibility-testing/axe-core): kör tillgänglighetsskanningar med Deque axe från dina tester.

Skala upp:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) och [Docker](/docs/docker): kör webbläsare på distans.
- [Sharding](/docs/sharding): dela upp en testsvit över flera CI-maskiner.

Ett komponenttest använder samma konfigurationsfil med en annan runner. Till exempel, för att använda React-förinställningen:

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

Browser Runner kräver `@wdio/browser-runner`. React-förinställningen behöver även `@vitejs/plugin-react`, och guiderna rekommenderar `@testing-library/react` för rendering. Förinställningar finns för `vue`, `svelte`, `solid`, `react`, `preact` och `stencil`. För allt annat använder du `viteConfig` i stället.

## Felsökning

- Chrome startar inte i CI med "user data directory is already in use" eller "DevToolsActivePort file doesn't exist": se [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` eller `browser.emulate()` har ingen effekt: sessionen använder inte WebDriver BiDi. Kontrollera din webbläsare (Safari saknar stöd för BiDi), din molnleverantör och `wdio:enforceWebDriverClassic`.
- Drivrutiner eller webbläsare kan inte laddas ner bakom en proxy: se [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) och [Proxy Setup](/docs/proxy).
- Instabila tester: se [Retry Flaky Tests](/docs/retry) och [Debugging](/docs/debugging).

## Nästa steg

- [Configuration](/docs/configuration)-referens för varje alternativ i `wdio.conf.ts`.
- [TypeScript Setup](/docs/typescript) och [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Page Object Pattern](/docs/pageobjects) för att strukturera större testsviter.
- [MCP](/docs/mcp) för att låta en AI-agent styra en webbläsarsession via WebdriverIO.
- Andra plattformar: [Mobilappar](/docs/platforms/mobile), [Skrivbordsappar](/docs/platforms/desktop), [Tillägg och editorer](/docs/platforms/apps-and-extensions).