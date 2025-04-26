---
id: vscode-extensions
title: VS Code Erweiterungstests
---

WebdriverIO ermöglicht es Ihnen, Ihre [VS Code](https://code.visualstudio.com/) Erweiterungen nahtlos von Ende zu Ende in der VS Code Desktop IDE oder als Web-Erweiterung zu testen. Sie müssen nur einen Pfad zu Ihrer Erweiterung angeben und das Framework erledigt den Rest. Mit dem [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) wird alles erledigt und noch viel mehr:

- 🏗️ Installation von VSCode (entweder stabil, Insiders oder eine bestimmte Version)
- ⬇️ Herunterladen von Chromedriver speziell für die angegebene VSCode-Version
- 🚀 Ermöglicht Ihnen den Zugriff auf die VSCode-API aus Ihren Tests
- 🖥️ Starten von VSCode mit benutzerdefinierten Einstellungen (einschließlich Unterstützung für VSCode unter Ubuntu, MacOS und Windows)
- 🌐 Oder stellt VSCode von einem Server bereit, um von jedem Browser für das Testen von Web-Erweiterungen zugegriffen zu werden
- 📔 Bootstrapping von Page Objects mit Locators, die zu Ihrer VSCode-Version passen

## Erste Schritte

Um ein neues WebdriverIO-Projekt zu starten, führen Sie aus:

```sh
npm create wdio@latest ./
```

Ein Installationsassistent führt Sie durch den Prozess. Stellen Sie sicher, dass Sie _"VS Code Extension Testing"_ auswählen, wenn Sie gefragt werden, welche Art von Tests Sie durchführen möchten. Danach können Sie die Standardeinstellungen beibehalten oder nach Ihren Vorlieben anpassen.

## Beispielkonfiguration

Um den Service zu nutzen, müssen Sie `vscode` zu Ihrer Liste der Services hinzufügen, optional gefolgt von einem Konfigurationsobjekt. Dadurch lädt WebdriverIO die angegebenen VSCode-Binärdateien und die passende Chromedriver-Version herunter:

```js
// wdio.conf.ts
export const config = {
    outputDir: 'trace',
    // ...
    capabilities: [{
        browserName: 'vscode',
        browserVersion: '1.71.0', // "insiders" oder "stable" für die neueste VSCode-Version
        'wdio:vscodeOptions': {
            extensionPath: __dirname,
            userSettings: {
                "editor.fontSize": 14
            }
        }
    }],
    services: ['vscode'],
    /**
     * optional können Sie den Pfad definieren, in dem WebdriverIO alle
     * VSCode- und Chromedriver-Binärdateien speichert, z.B.:
     * services: [['vscode', { cachePath: __dirname }]]
     */
    // ...
};
```

Wenn Sie `wdio:vscodeOptions` mit einem anderen `browserName` als `vscode` definieren, z.B. `chrome`, wird der Service die Erweiterung als Web-Erweiterung bereitstellen. Wenn Sie auf Chrome testen, ist kein zusätzlicher Treiber-Service erforderlich, z.B.:

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
        "target": "es2020",
        "moduleResolution": "node16"
    }
}
```

## Verwendung

Sie können dann die Methode `getWorkbench` verwenden, um auf die Page Objects für die Locators zuzugreifen, die zu Ihrer gewünschten VSCode-Version passen:

```ts
describe('WDIO VSCode Service', () => {
    it('should be able to load VSCode', async () => {
        const workbench = await browser.getWorkbench()
        expect(await workbench.getTitleBar().getTitle())
            .toBe('[Extension Development Host] - README.md - wdio-vscode-service - Visual Studio Code')
    })
})
```

Von dort aus können Sie auf alle Page Objects zugreifen, indem Sie die richtigen Page-Object-Methoden verwenden. Erfahren Sie mehr über alle verfügbaren Page Objects und ihre Methoden in der [Page-Object-Dokumentation](https://webdriverio-community.github.io/wdio-vscode-service/).

### Zugriff auf VSCode-APIs

Wenn Sie bestimmte Automatisierungen über die [VSCode-API](https://code.visualstudio.com/api/references/vscode-api) ausführen möchten, können Sie dies tun, indem Sie Remote-Befehle über den benutzerdefinierten Befehl `executeWorkbench` ausführen. Dieser Befehl ermöglicht es, Code aus Ihrem Test in der VSCode-Umgebung remote auszuführen und auf die VSCode-API zuzugreifen. Sie können beliebige Parameter in die Funktion übergeben, die dann in die Funktion weitergeleitet werden. Das `vscode`-Objekt wird immer als erstes Argument gefolgt von den äußeren Funktionsparametern übergeben. Beachten Sie, dass Sie nicht auf Variablen außerhalb des Funktionsbereichs zugreifen können, da der Callback remote ausgeführt wird. Hier ist ein Beispiel:

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

Weitere Informationen zur Konfiguration des [`wdio-vscode-service`](https://www.npmjs.com/package/wdio-vscode-service) und zur Erstellung benutzerdefinierter Page Objects finden Sie in der [Service-Dokumentation](/docs/wdio-vscode-service). Sie können auch den folgenden Vortrag von [Christian Bromann](https://twitter.com/bromann) über [_Testing Complex VSCode Extensions With the Power of Web Standards_](https://www.youtube.com/watch?v=PhGNTioBUiU) ansehen:

<LiteYouTubeEmbed
    id="PhGNTioBUiU"
    title="Testing Complex VSCode Extensions With the Power of Web Standards"
/>