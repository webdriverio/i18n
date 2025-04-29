---
id: wdio-vscode-service
title: VSCode Erweiterung Test Service
custom_edit_url: https://github.com/webdriverio-community/wdio-vscode-service/edit/main/README.md
---


> wdio-vscode-service ist ein Drittanbieter-Paket, für weitere Informationen siehe [GitHub](https://github.com/webdriverio-community/wdio-vscode-service) | [npm](https://www.npmjs.com/package/wdio-vscode-service)

Getestet auf:

[![VSCode Version](https://img.shields.io/badge/VSCode%20Version-insiders%20/%20stable%20/%20v1.86.0%20/%20web-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml) [![CI Status](https://img.shields.io/badge/Platform-windows%20%2F%20macos%20%2F%20ubuntu-brightgreen)](https://github.com/webdriverio-community/wdio-vscode-service/actions/workflows/ci.yml)

> WebdriverIO Service zum Testen von VSCode-Erweiterungen.

Dieser WebdriverIO-Service ermöglicht es Ihnen, Ihre VSCode-Erweiterungen nahtlos von Ende zu Ende in der VSCode Desktop IDE oder als Web-Erweiterung zu testen. Sie müssen nur einen Pfad zu Ihrer Erweiterung angeben, und der Service erledigt den Rest, indem er:

- 🏗️ VSCode installiert (entweder `stable`, `insiders` oder eine bestimmte Version)
- ⬇️ Chromedriver spezifisch für eine bestimmte VSCode-Version herunterlädt
- 🚀 Ihnen ermöglicht, von Ihren Tests aus auf die VSCode-API zuzugreifen
- 🖥️ VSCode mit benutzerdefinierten Benutzereinstellungen startet (einschließlich Unterstützung für VSCode unter Ubuntu, MacOS und Windows)
- 🌐 Oder VSCode von einem Server aus bereitstellt, um von jedem Browser aus für das Testen von [Web-Erweiterungen](https://code.visualstudio.com/api/extension-guides/web-extensions) zugänglich zu sein
- 📔 Page Objects mit Locators bootstrappt, die zu Ihrer VSCode-Version passen

Dieses Projekt wurde stark vom [vscode-extension-tester](https://www.npmjs.com/package/vscode-extension-tester) Projekt inspiriert, welches auf Selenium basiert. Dieses Paket übernimmt die Idee und passt sie an WebdriverIO an.

Ab VSCode v1.86 ist es erforderlich, `webdriverio` v8.14 oder höher zu verwenden, um Chromedriver ohne notwendige Konfiguration zu installieren. Wenn Sie frühere Versionen von VSCode testen müssen, lesen Sie den Abschnitt [Chromedriver-Konfiguration](#chromedriver) unten.

## Installation

Um ein neues WebdriverIO-Projekt zu starten, führen Sie aus:

```bash
npm create wdio ./
```

Ein Installationsassistent führt Sie durch den Prozess. Stellen Sie sicher, dass Sie TypeScript als Compiler auswählen und keine Page Objects generieren lassen, da dieses Projekt bereits alle benötigten Page Objects enthält. Stellen Sie sicher, dass Sie `vscode` in der Liste der Services auswählen:

![Install Demo](https://raw.githubusercontent.com/webdriverio-community/wdio-vscode-service/main/.github/assets/demo.gif "Install Demo")

Weitere Informationen zur Installation von `WebdriverIO` finden Sie in der [Projektdokumentation](https://webdriver.io/docs/gettingstarted).

## Beispielkonfiguration

Um den Service zu verwenden, müssen Sie `vscode` zu Ihrer Liste der Services hinzufügen, optional gefolgt von einem Konfigurationsobjekt. Dies veranlasst WebdriverIO, die angegebenen VSCode-Binärdateien und die entsprechende Chromedriver-Version herunterzuladen:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.86.0', // "insiders" oder "stable" für die neueste VSCode-Version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * Optional definieren Sie den Pfad, in dem WebdriverIO alle VSCode-Binärdateien speichert, z.B.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Wenn Sie `wdio:vscodeOptions` mit einem anderen `browserName` als `vscode` definieren, z.B. `chrome`, stellt der Service die Erweiterung als Web-Erweiterung bereit. Wenn Sie auf Chrome testen, ist kein zusätzlicher Treiber-Service erforderlich, z.B.:

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

_Hinweis:_ Beim Testen von Web-Erweiterungen können Sie nur zwischen `stable` oder `insiders` als `browserVersion` wählen.

### TypeScript-Setup

In Ihrer `tsconfig.json` stellen Sie sicher, dass Sie `wdio-vscode-service` zu Ihrer Liste der Typen hinzufügen:

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
        "target": "es2019",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
}
```

## Verwendung

Sie können dann die `getWorkbench`-Methode verwenden, um auf die Page Objects für die Locators zuzugreifen, die zu Ihrer gewünschten VSCode-Version passen:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

### Zugriff auf VSCode APIs

Wenn Sie bestimmte Automatisierungen über die [VSCode API](https://code.visualstudio.com/api/references/vscode-api) ausführen möchten, können Sie dies durch Ausführen von Remote-Befehlen über den benutzerdefinierten `executeWorkbench`-Befehl tun. Dieser Befehl ermöglicht es Ihnen, Code von Ihrem Test aus remote in der VSCode-Umgebung auszuführen und ermöglicht den Zugriff auf die VSCode-API. Sie können beliebige Parameter in die Funktion übergeben, die dann in die Funktion weitergeleitet werden. Das `vscode`-Objekt wird immer als erstes Argument gefolgt von den äußeren Funktionsparametern übergeben. Beachten Sie, dass Sie nicht auf Variablen außerhalb des Funktionsbereichs zugreifen können, da der Callback remote ausgeführt wird. Hier ist ein Beispiel:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // gibt aus: "I am an API call!"
```

Für die vollständige Page-Object-Dokumentation, schauen Sie in die [Docs](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Sie finden verschiedene Verwendungsbeispiele in der [Testsuite dieses Projekts](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Konfiguration

Über die Service-Konfiguration können Sie die VSCode-Version sowie Benutzereinstellungen für VSCode verwalten:

### Service-Optionen

Service-Optionen sind Optionen, die der Service zur Einrichtung der Testumgebung benötigt.

#### `cachePath`

Definieren Sie einen Cache-Pfad, um das erneute Herunterladen von VS Code-Bundles zu vermeiden. Dies ist nützlich für CI/CD, um das erneute Herunterladen von VSCode bei jedem Testlauf zu vermeiden.

Typ: `string`<br />
Standard: `process.cwd()`

### VSCode-Fähigkeiten (`wdio:vscodeOptions`)

Um Tests über VSCode auszuführen, müssen Sie `vscode` als `browserName` definieren. Sie können die VSCode-Version angeben, indem Sie eine `browserVersion`-Fähigkeit bereitstellen. Benutzerdefinierte VSCode-Optionen werden dann innerhalb der benutzerdefinierten `wdio:vscodeOptions`-Fähigkeit definiert. Die Optionen sind die folgenden:

#### `binary`

Pfad zu einer lokal installierten VSCode-Installation. Wenn die Option nicht angegeben wird, lädt der Service VSCode basierend auf der angegebenen `browserVersion` herunter (oder `stable`, wenn nicht angegeben).

Typ: `string`

#### `extensionPath`

Definieren Sie das Verzeichnis zur Erweiterung, die Sie testen möchten.

Typ: `string`

#### `storagePath`

Definieren Sie einen benutzerdefinierten Speicherort für VS Code, um alle seine Daten zu speichern. Dies ist das Stammverzeichnis für interne VS Code-Verzeichnisse wie (Teilnehmer)
* **user-data-dir**: Das Verzeichnis, in dem alle Benutzereinstellungen (globale Einstellungen), Erweiterungsprotokolle usw. gespeichert werden.
* **extension-install-dir**: Das Verzeichnis, in dem VS Code-Erweiterungen installiert werden.

Wenn nicht angegeben, wird ein temporäres Verzeichnis verwendet.

Typ: `string`

#### `userSettings`

Definieren Sie benutzerdefinierte Benutzereinstellungen, die auf VSCode angewendet werden sollen.

Typ: `Record<string, number | string | object | boolean>`<br />
Standard: `{}`

#### `workspacePath`

Öffnet VSCode für einen bestimmten Workspace. Wenn nicht angegeben, startet VSCode ohne geöffneten Workspace.

Typ: `string`

#### `filePath`

Öffnet VSCode mit einer bestimmten geöffneten Datei.

Typ: `string`

#### `vscodeArgs`

Zusätzliche Startargumente als Objekt, z.B.

```ts
vscodeArgs: { fooBar: true, 'bar-foo': '/foobar' }
```

werden übergeben als:

```ts
--foo-bar --fooBar --bar-foo=/foobar
```

Typ: `Record<string, string | boolean>`<br />
Standard: siehe [`constants.ts#L5-L14`](https://github.com/webdriverio-community/wdio-vscode-service/blob/196a69be3ac2fb82d9c7e4f19a2a1c8ccbaec1e2/src/constants.ts#L5-L14)

#### `verboseLogging`

Wenn auf true gesetzt, protokolliert der Service VSCode-Ausgaben vom Erweiterungshost und der Konsolen-API.

Typ: `boolean`<br />
Standard: `false`

#### `vscodeProxyOptions`

VSCode API-Proxy-Konfigurationen definieren, wie WebdriverIO eine Verbindung zur VSCode-Workbench herstellt, um Ihnen Zugriff auf die VSCode-API zu geben.

Typ: `VSCodeProxyOptions`<br />
Standard:

```ts
{
    /**
     * Wenn auf true gesetzt, versucht der Service, eine Verbindung mit der
     * VSCode-Workbench herzustellen, um den Zugriff auf die VSCode-API zu ermöglichen
     */
    enable: true,
    /**
     * Port der WebSocket-Verbindung, die zur Verbindung mit der Workbench verwendet wird.
     * Standardmäßig auf einen verfügbaren Port in Ihrem Betriebssystem gesetzt.
     */
    // port?: number
    /**
     * Timeout für die Verbindung zum WebSocket innerhalb von VSCode
     */
    connectionTimeout: 5000,
    /**
     * Timeout für Befehle, die innerhalb von VSCode ausgeführt werden
     */
    commandTimeout: 5000
}
```

### Chromedriver

Ab VSCode v1.86 ist es erforderlich, `webdriverio` v8.14 oder höher zu verwenden, um Chromedriver ohne notwendige Konfiguration zu installieren. Das [vereinfachte Browser-Automatisierungssetup](https://webdriver.io/blog/2023/07/31/driver-management) erledigt alles für Sie.

Um frühere Versionen von VS Code zu testen, finden Sie die erwartete Version von Chromedriver aus den Logs, laden Sie [Chromedriver](https://chromedriver.chromium.org/downloads) herunter und konfigurieren Sie den Pfad. Zum Beispiel:

```
[0-0] ERROR webdriver: Failed downloading chromedriver v108: Download failed: ...
```

```ts
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.80.0',
        'wdio:chromedriverOptions': {
            binary: path.join(cacheDir, 'chromedriver-108.0.5359.71')
```

## Erstellen Sie Ihre eigenen PageObjects

Sie können die in diesem Service verwendeten Komponenten für Ihre eigenen Review-Page-Objects wiederverwenden. Erstellen Sie dafür zunächst eine Datei, die alle Ihre Selektoren definiert, z.B.:

```ts
// z.B. in /test/pageobjects/locators.ts
export const componentA = {
    elem: 'form', // Komponenten-Container-Element
    submit: 'button[type="submit"]', // Submit-Button
    username: 'input.username', // Benutzername-Eingabe
    password: 'input.password' // Passwort-Eingabe
}
```

Jetzt können Sie ein Page-Object wie folgt erstellen:

```ts
// z.B. in /test/pageobjects/loginForm.ts
import { PageDecorator, IPageDecorator, BasePage } from 'wdio-vscode-service'
import * as locatorMap, { componentA as componentALocators } from './locators'
export interface LoginForm extends IPageDecorator<typeof componentALocators> {}
@PageDecorator(componentALocators)
export class LoginForm extends BasePage<typeof componentALocators, typeof locatorMap> {
    /**
     * @private Locator-Schlüssel zur Identifizierung der Locator-Map (siehe locators.ts)
     */
    public locatorKey = 'componentA' as const

    public login (username: string, password: string) {
        await this.username$.setValue(username)
        await this.password$.setValue(password)
        await this.submit$.click()
    }
}
```

Jetzt können Sie in Ihrem Test Ihr Page-Object wie folgt verwenden:

```ts
import { LoginForm } from '../pageobjects/loginForm'
import * as locatorMap from '../locators'

// z.B. in /test/specs/example.e2e.ts
describe('my extension', () => {
    it('should login', async () => {
        const loginForm = new LoginForm(locatorMap)
        await loginForm.login('admin', 'test123')

        // Sie können Page-Object-Elemente auch direkt über `[selector]$`
        // oder `[selector]$$` verwenden, z.B.:
        await loginForm.submit$.click()

        // oder direkt auf Locators zugreifen
        console.log(loginForm.locators.username)
        // gibt aus: "input.username"
    })
})
```

## TypeScript-Unterstützung

Wenn Sie WebdriverIO mit TypeScript verwenden, stellen Sie sicher, dass Sie `wdio-vscode-service` zu Ihren `types` in Ihrer `tsconfig.json` hinzufügen, z.B.:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "types": [
            "webdriverio/async",
            "@wdio/mocha-framework",
            "expect-webdriverio",
            // fügen Sie diesen Service zu Ihren Typen hinzu
            "wdio-devtools-service"
        ],
        "target": "es2019"
    }
}
```

## Proxy-Unterstützung

Während der Initialisierung dieses Services werden ChromeDriver und VSCode-Distribution heruntergeladen. Sie können diese Anfragen durch einen Proxy leiten, indem Sie die Umgebungsvariable `HTTPS_PROXY` oder `https_proxy` setzen. Z.B.:

```bash
HTTPS_PROXY=http://127.0.0.1:1080 npm run wdio
```

## Referenzen

Die folgenden VS Code-Erweiterungen verwenden `wdio-vscode-service`:

- [Marquee](https://marketplace.visualstudio.com/items?itemName=stateful.marquee) (27k Downloads)
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (27.8m Downloads)
- [DVC Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Iterative.dvc) (11.2k Downloads)
- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) (1.2m Downloads)
- [inlang – i18n supercharged](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) (3k Downloads)

## Beitragen

Bevor Sie einen Pull Request stellen, führen Sie bitte Folgendes aus:

1. `git clone git@github.com:webdriverio-community/wdio-vscode-service.git`
1. `cd wdio-vscode-service`
1. `npm install`
1. `npm run build`
1. `npm run test` (oder `npm run ci`)

## Mehr erfahren

Wenn Sie mehr über das Testen von VSCode-Erweiterungen erfahren möchten, schauen Sie sich [Christian Bromanns](https://twitter.com/bromann) Vortrag auf der [OpenJS World 2022](https://www.youtube.com/watch?v=PhGNTioBUiU) an:

[![Testing VSCode Extensions at OpenJS World 2022](https://img.youtube.com/vi/PhGNTioBUiU/sddefault.jpg)](https://www.youtube.com/watch?v=PhGNTioBUiU)

---

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io) des Projekts.