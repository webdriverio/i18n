---
id: vscode-extensions
title: Testen von VS Code-Erweiterungen
description: "Testen Sie VS Code-Erweiterungen End-to-End in der Desktop-IDE oder als Web-Erweiterungen mit WebdriverIO und dem VS Code-Service."
---

WebdriverIO ermöglicht es Ihnen, Ihre [VS Code](https://code.visualstudio.com/)-Erweiterungen nahtlos End-to-End in der VS Code Desktop-IDE oder als Web-Erweiterung zu testen. Sie müssen lediglich einen Pfad zu Ihrer Erweiterung angeben, und das Framework erledigt den Rest. Mit dem [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) wird alles für Sie erledigt und noch viel mehr:

- 🏗️ Installation von VSCode (entweder stable, insiders oder eine bestimmte Version)
- ⬇️ Herunterladen des passenden Chromedrivers für die angegebene VSCode-Version
- 🚀 Ermöglicht Ihnen den Zugriff auf die VSCode-API aus Ihren Tests heraus
- 🖥️ Starten von VSCode mit benutzerdefinierten Benutzereinstellungen (einschließlich Unterstützung für VSCode unter Ubuntu, MacOS und Windows)
- 🌐 Oder Bereitstellung von VSCode über einen Server, auf den jeder Browser zum Testen von Web-Erweiterungen zugreifen kann
- 📔 Bereitstellung von Page Objects mit Locators, die zu Ihrer VSCode-Version passen

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu initiieren, führen Sie Folgendes aus:

```sh
npm create wdio@latest ./
```

Ein Installationsassistent führt Sie durch den Prozess. Stellen Sie sicher, dass Sie _"VS Code Extension Testing"_ auswählen, wenn Sie gefragt werden, welche Art von Tests Sie durchführen möchten. Behalten Sie danach einfach die Standardeinstellungen bei oder passen Sie sie nach Ihren Wünschen an.

## Beispielkonfiguration

Um den Service zu nutzen, müssen Sie `vscode` zu Ihrer Liste von Services hinzufügen, optional gefolgt von einem Konfigurationsobjekt. Dadurch lädt WebdriverIO die angegebenen VSCode-Binärdateien und die passende Chromedriver-Version herunter:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" or "stable" for latest VSCode version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optionally you can define the path WebdriverIO stores all
     * VSCode and Chromedriver binaries, e.g.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Wenn Sie `wdio:vscodeOptions` mit einem anderen `browserName` als `vscode` definieren, z. B. `chrome`, stellt der Service die Erweiterung als Web-Erweiterung bereit. Wenn Sie in Chrome testen, ist kein zusätzlicher Treiber-Service erforderlich, z. B.:

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

_Hinweis:_ Beim Testen von Web-Erweiterungen können Sie als `browserVersion` nur zwischen `stable` und `insiders` wählen.

### TypeScript-Einrichtung

Stellen Sie sicher, dass Sie in Ihrer `tsconfig.json` `wdio-vscode-service` zu Ihrer Liste von Typen hinzufügen:

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

## Verwendung

Anschließend können Sie die Methode `getWorkbench` verwenden, um auf die Page Objects mit den Locators zuzugreifen, die zu Ihrer gewünschten VSCode-Version passen:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Von dort aus können Sie mit den entsprechenden Page-Object-Methoden auf alle Page Objects zugreifen. Weitere Informationen zu allen verfügbaren Page Objects und ihren Methoden finden Sie in der [Page-Object-Dokumentation](https://webdriverio-community.github.io/wdio-vscode-service/).

### Zugriff auf VSCode-APIs

Wenn Sie bestimmte Automatisierungen über die [VSCode-API](https://code.visualstudio.com/api/references/vscode-api) ausführen möchten, können Sie dies tun, indem Sie Remote-Befehle über den benutzerdefinierten Befehl `executeWorkbench` ausführen. Mit diesem Befehl können Sie Code aus Ihrem Test heraus remote innerhalb der VSCode-Umgebung ausführen und auf die VSCode-API zugreifen. Sie können beliebige Parameter an die Funktion übergeben, die dann an die Funktion weitergereicht werden. Das `vscode`-Objekt wird immer als erstes Argument übergeben, gefolgt von den Parametern der äußeren Funktion. Beachten Sie, dass Sie nicht auf Variablen außerhalb des Funktionsbereichs zugreifen können, da der Callback remote ausgeführt wird. Hier ist ein Beispiel:

```ts
const workbench = await browser.getWorkbench()
await browser.executeWorkbench((vscode, param1, param2) => {
    vscode.window.showInformationMessage(`I am an ${param1} ${param2}!`)
}, 'API', 'call')

const notifs = await workbench.getNotifications()
console.log(await notifs[0].getMessage()) // gibt aus: "I am an API call!"
```

Die vollständige Page-Object-Dokumentation finden Sie in der [Dokumentation](https://webdriverio-community.github.io/wdio-vscode-service/modules.html). Verschiedene Anwendungsbeispiele finden Sie in der [Testsuite dieses Projekts](https://github.com/webdriverio-community/wdio-vscode-service/blob/main/test/specs).

## Weitere Informationen

In der [Service-Dokumentation](/docs/wdio-vscode-service) erfahren Sie mehr darüber, wie Sie den [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) konfigurieren und benutzerdefinierte Page Objects erstellen. Sie können sich auch den folgenden Vortrag von [Christian Bromann](https://twitter.com/bromann) zum Thema [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) ansehen:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>