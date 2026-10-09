---
id: web
title: Webbrowser
description: Einrichten und Ausführen von WebdriverIO End-to-End-, Komponenten-, visuellen und Barrierefreiheitstests in Chrome, Firefox, Microsoft Edge und Safari.
---

WebdriverIO automatisiert Desktop-Browser (Chrome, Chromium, Firefox, Microsoft Edge und Safari) über standardisierte Browser-Treiber. Standardmäßig versucht es, eine [WebDriver BiDi](/docs/automationProtocols)-Session zu öffnen, den bidirektionalen Nachfolger des klassischen WebDriver-Protokolls. BiDi ermöglicht Funktionen wie Network Mocking und die Emulation von Web-APIs. Setzen Sie `wdio:enforceWebDriverClassic: true` in Ihren Capabilities, um dies zu deaktivieren. Sie müssen Treiber nicht selbst installieren: Setzen Sie einen `browserName`, und WebdriverIO lädt den passenden Chromedriver, Geckodriver oder Edgedriver herunter und startet ihn. Es installiert außerdem Chrome, Chromium oder Firefox, wenn keine lokale Installation gefunden wird. Microsoft Edge muss bereits installiert sein, und Safaridriver ist in macOS enthalten. Derselbe Testrunner kann mit dem Browser Runner auch Tests innerhalb des Browsers ausführen. Dies umfasst Unit- und Komponententests für React, Vue, Svelte, SolidJS, Preact, Lit und Stencil.

## Schnellstart

Erstellen Sie ein Projekt interaktiv mit `npm init wdio@latest .`. Mit `--yes` werden die Standardwerte gewählt: Mocha, Chrome und Page Objects. Um ein Projekt manuell einzurichten, installieren Sie den Testrunner, einen Framework-Adapter, einen Reporter und `tsx` für TypeScript:

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

Jede Capability erhält eigene Worker-Prozesse, daher wird die Spec sowohl in Chrome als auch in Firefox ausgeführt. Weitere gültige `browserName`-Werte sind `chromium`, `msedge` und `safari`. Um headless auszuführen, fügen Sie Browser-Argumente wie `'goog:chromeOptions': { args: ['headless', 'disable-gpu'] }` hinzu. Siehe [Run Browser Headless](/docs/capabilities#run-browser-headless) für Firefox und Edge; Safari hat keinen Headless-Modus.

## Wählen Sie Ihren Weg

End-to-End-Tests über verschiedene Browser hinweg:

- [Capabilities](/docs/capabilities): Browser-Optionen, Headless-Modus, Browser-Kanäle (Canary, Nightly, Safari Technology Preview) und `wdio:*`-Treiberoptionen.
- [Driver Binaries](/docs/driverbinaries): wie die automatische Einrichtung von Browsern und Treibern funktioniert und wie man auf eigene Binaries verweist.
- [Automation Protocols](/docs/automationProtocols): WebDriver vs. WebDriver BiDi.
- [WebDriver BiDi commands](/docs/api/webdriverBidi): rohe BiDi-Protokollbefehle, die auf dem `browser`-Objekt verfügbar sind.
- [Selectors](/docs/selectors): CSS-, Text-, ARIA-, Deep- (Shadow DOM) und React-Selektoren.
- [Auto-waiting](/docs/autowait) und [Timeouts](/docs/timeouts): wie WebdriverIO auf Elemente wartet und was sich anpassen lässt.
- [Multi-remote](/docs/multiremote): mehrere Browser in einem Test steuern, z. B. für Chat- oder WebRTC-Apps.

Browser-Funktionen, die WebDriver BiDi benötigen (Chrome, Edge und Firefox; nicht Safari):

- [Request Mocks and Spies](/docs/mocksandspies): Netzwerkanfragen mit `browser.mock()` abfangen, verändern oder stubben. Siehe auch das [Mock object](/docs/api/mock).
- [Emulation](/docs/emulation): Geolokalisierung, Media Features, User Agent, Offline-Status, Locale, Zeitzone, Bildschirm und Geräte mit `browser.emulate()` emulieren.

Komponenten- und Unit-Tests in einem echten Browser:

- [Component Testing](/docs/component-testing): wie der Vite-basierte [Browser Runner](/docs/runner#browser-runner) funktioniert und wie man ihn einrichtet.
- Framework-Anleitungen: [React](/docs/component-testing/react), [Vue.js](/docs/component-testing/vue), [Svelte](/docs/component-testing/svelte), [SolidJS](/docs/component-testing/solid), [Preact](/docs/component-testing/preact), [Lit](/docs/component-testing/lit), [Stencil](/docs/component-testing/stencil).
- [Mocking](/docs/component-testing/mocking) und [Coverage](/docs/component-testing/coverage) für Komponententests.

Visuelle Tests und Barrierefreiheitstests:

- [Visual Testing](/docs/visual-testing): Bildvergleiche von Bildschirm, Elementen und ganzen Seiten mit `@wdio/visual-service`.
- [Snapshot](/docs/snapshot): Snapshot-Assertions für DOM und Objekte.
- [Axe Core](/docs/accessibility-testing/axe-core): Deque-axe-Barrierefreiheitsscans aus Ihren Tests heraus ausführen.

Skalierung:

- [Selenium Grid](/docs/seleniumgrid), [Cloud Services](/docs/cloudservices) und [Docker](/docs/docker): Browser remote ausführen.
- [Sharding](/docs/sharding): eine Testsuite auf mehrere CI-Maschinen aufteilen.

Ein Komponententest verwendet dieselbe Konfigurationsdatei mit einem anderen Runner. Zum Beispiel, um das React-Preset zu verwenden:

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

Der Browser Runner benötigt `@wdio/browser-runner`. Das React-Preset benötigt außerdem `@vitejs/plugin-react`, und die Anleitungen empfehlen `@testing-library/react` zum Rendern. Presets gibt es für `vue`, `svelte`, `solid`, `react`, `preact` und `stencil`. Für alles andere verwenden Sie stattdessen `viteConfig`.

## Fehlerbehebung

- Chrome startet in der CI nicht mit „user data directory is already in use“ oder „DevToolsActivePort file doesn't exist“: siehe [Headless & Display Servers](/docs/headless-and-display-servers#troubleshooting).
- `browser.mock()` oder `browser.emulate()` hat keine Wirkung: Die Session verwendet kein WebDriver BiDi. Überprüfen Sie Ihren Browser (Safari unterstützt kein BiDi), Ihren Cloud-Anbieter und `wdio:enforceWebDriverClassic`.
- Treiber oder Browser können hinter einem Proxy nicht heruntergeladen werden: siehe [Custom Driver Download Host](/docs/capabilities#custom-driver-download-host) und [Proxy Setup](/docs/proxy).
- Instabile Tests: siehe [Retry Flaky Tests](/docs/retry) und [Debugging](/docs/debugging).

## Nächste Schritte

- [Configuration](/docs/configuration)-Referenz für jede `wdio.conf.ts`-Option.
- [TypeScript Setup](/docs/typescript) und [Frameworks](/docs/frameworks) (Mocha, Jasmine, Cucumber).
- [Page Object Pattern](/docs/pageobjects) zur Strukturierung größerer Testsuiten.
- [MCP](/docs/mcp), um einen KI-Agenten eine Browser-Session über WebdriverIO steuern zu lassen.
- Andere Plattformen: [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop), [Extensions & Editors](/docs/platforms/apps-and-extensions).