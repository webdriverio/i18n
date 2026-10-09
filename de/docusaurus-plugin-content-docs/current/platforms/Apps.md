---
id: apps-and-extensions
title: Erweiterungen & Editoren
description: Laden Sie eine Browser-Erweiterung oder eine VS Code-Erweiterung in eine WebdriverIO-Session und testen Sie sie End-to-End.
---

WebdriverIO testet Browser-Erweiterungen und Editor-Erweiterungen, indem es sie in die echte Host-Anwendung lädt. Browser-(Web-)Erweiterungen laufen innerhalb von Chrome oder Firefox. Sie laden sie über Browser-Capabilities: `--load-extension` oder eine base64-kodierte `.crx` über `goog:chromeOptions` in Chrome, oder `browser.installAddOn()` für eine `.xpi` in Firefox. In einer WebDriver BiDi-Session können Sie eine Erweiterung auch während der Session mit `browser.installExtension()` und `browser.uninstallExtension()` installieren und entfernen. Safari hat keine BiDi-Session, daher deckt dieser Befehl Safari nicht ab. Von dort aus testen Sie Content-Scripts und Popup-Seiten mit den normalen WebDriver-Befehlen. VS Code-Erweiterungen werden mit dem Community-Service [`wdio-vscode-service`](/docs/wdio-vscode-service) getestet. Er lädt VS Code (stable, insiders oder eine bestimmte Version) und den passenden Chromedriver herunter und startet anschließend VS Code mit Ihrer Erweiterung und benutzerdefinierten Benutzereinstellungen. Page Objects für die Workbench sind über `browser.getWorkbench()` verfügbar, und `browser.executeWorkbench()` führt Code gegen die VS Code API aus. Derselbe Service kann VS Code auch in einem Browser bereitstellen, um Web-Erweiterungen zu testen. Für Obsidian-Plugins gibt es ebenfalls einen Community-Service.

## Schnellstart

Installieren Sie zuerst den Testrunner und die TypeScript-Unterstützung:

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

### Chrome-Erweiterung

Bauen Sie Ihre Erweiterung in einen Ordner (hier `./dist`) und laden Sie sie mit dem Chrome-Argument `--load-extension`:

```ts title="wdio.conf.ts"
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [`--load-extension=${path.join(__dirname, 'dist')}`]
        }
    }],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/extension.e2e.ts"
import { expect, browser, $ } from '@wdio/globals'

describe('My Web Extension', () => {
    it('should inject its content script', async () => {
        await browser.url('https://webdriver.io')
        // durch ein Element ersetzen, das Ihr Content-Script der Seite hinzufügt
        await expect($('#my-extension-root')).toBeExisting()
    })
})
```

Das Klicken auf das Erweiterungssymbol in der Symbolleiste funktioniert nicht. Um ein `default_popup` zu testen, ermitteln Sie die Erweiterungs-ID auf `chrome://extensions/` und öffnen Sie `chrome-extension://<id>/<popup>.html` mit `browser.url()`. Der [Leitfaden für Web-Erweiterungen](/docs/extension-testing/web-extensions#test-popup-modal-in-chrome) enthält dafür einen fertigen benutzerdefinierten Befehl `openExtensionPopup`.

### VS Code-Erweiterung

```sh
npm install --save-dev wdio-vscode-service
```

Fügen Sie `"wdio-vscode-service"` zum `types`-Array in `tsconfig.json` hinzu.

```ts title="wdio.conf.ts"
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./test/specs/**/*.ts'],
    capabilities: [{
        browserName: 'vscode',
        browserVersion: 'stable', // ebenfalls möglich: "insiders" oder eine bestimmte Version, z. B. "1.80.0"
        'wdio:vscodeOptions': {
            // verweist auf das Verzeichnis, in dem sich die package.json der Erweiterung befindet
            extensionPath: __dirname,
            userSettings: {
                'editor.fontSize': 14
            }
        }
    }],
    services: ['vscode'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

```ts title="test/specs/vscode.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('VS Code Extension Testing', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toContain('[Extension Development Host]')
    })
})
```

Um die Erweiterung als VS Code-Web-Erweiterung zu testen, setzen Sie `browserName: 'chrome'` und behalten Sie `wdio:vscodeOptions` bei. In diesem Modus kann `browserVersion` nur `stable` oder `insiders` sein. `npm create wdio@latest ./` mit "VS Code Extension Testing" erstellt dieses Setup für Sie.

## Wählen Sie Ihren Weg

- [Testen von Web-Erweiterungen](/docs/extension-testing/web-extensions): Erweiterungen in Chrome (Ordner oder `.crx`) und Firefox (`.xpi` über [`installAddOn`](/docs/api/gecko#installaddon)) laden oder eine Erweiterung während der Session mit [`installExtension`](/docs/api/browser/installExtension) installieren und entfernen. Safari-Web-Erweiterungen werden nicht abgedeckt.
- [Firefox Profile Service](/docs/firefox-profile-service): ein Firefox-Profil erstellen, das Erweiterungen enthält.
- [Testen von VS Code-Erweiterungen](/docs/extension-testing/vscode-extensions): Konfiguration, TypeScript-Setup, Workbench-Page-Objects und `executeWorkbench`.
- [VS Code Service](/docs/wdio-vscode-service): alle Service-Optionen, wie `cachePath`, und wie man benutzerdefinierte Page Objects schreibt.
- [Obsidian Plugin Testing Service](/docs/wdio-obsidian-service): ein Community-Service, der Obsidian-Plugins über verschiedene Obsidian-Versionen hinweg unter Windows, macOS, Linux und Android testet.
- [Benutzerdefinierte Befehle](/docs/customcommands): Hilfsfunktionen wie `openExtensionPopup` zur Wiederverwendung bündeln.

Tests von Web-Erweiterungen laufen in einer regulären Chrome- oder Firefox-Session, daher gilt alles unter [Webbrowser](/docs/platforms/web), einschließlich Selektoren, Netzwerk-Mocking und visuellem Testen.

## Fehlerbehebung

- Firefox verweigert eine lokal gebaute Erweiterung wegen der Signierung: Installieren Sie sie im `before`-Hook mit `browser.installAddOn(extension.toString('base64'), true)` statt über ein Profil. Bauen Sie die `.xpi` mit `npx web-ext build`.
- Verwendung von Edge, Brave oder Opera statt Chrome: Dieselben Argumente funktionieren in der Regel mit der Options-Capability des jeweiligen Browsers, z. B. `ms:edgeOptions`.
- VS Code- und Chromedriver-Binärdateien werden in ein Cache-Verzeichnis heruntergeladen. Um zu steuern, wo sie gespeichert werden, z. B. um sie in CI zu cachen, setzen Sie `services: [['vscode', { cachePath: __dirname }]]`.
- TypeScript findet `getWorkbench` oder `executeWorkbench` nicht: Fügen Sie `wdio-vscode-service` zu `compilerOptions.types` hinzu.

## Nächste Schritte

- [Konfiguration](/docs/configuration): Referenz für jede `wdio.conf.ts`-Option.
- [Electron](/docs/desktop-testing/electron) zum Testen vollständiger Desktop-Apps, die auf Chromium basieren.
- Weitere Plattformen: [Webbrowser](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop-Apps](/docs/platforms/desktop).