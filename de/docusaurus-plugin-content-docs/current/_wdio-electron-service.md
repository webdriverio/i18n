---
id: wdio-electron-service
title: Electron Service
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**WebdriverIO-Service zum Testen von Electron-Anwendungen**

Ermöglicht plattformübergreifendes E2E-Testen von Electron-Apps über das umfassende WebdriverIO-Ökosystem.

Geistiger Nachfolger von [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Features

Erleichtert das Testen von Electron-Anwendungen durch:

- 🚗 automatische Einrichtung des erforderlichen Chromedrivers (für Electron v26 und höher)
- 📦 automatische Pfaderkennung Ihrer Electron-Anwendung
  - unterstützt [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) und ungepackte Apps
- 🧩 Zugriff auf Electron-APIs innerhalb Ihrer Tests
- 🕵️ Mocking von Electron-APIs über eine Vitest-ähnliche API

## Installation

Sie müssen `WebdriverIO` installieren, Anweisungen finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Schnellstart

Der empfohlene Weg, um schnell loszulegen, ist die Verwendung des [WDIO-Konfigurationsassistenten](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Manueller Schnellstart

Um ohne den Konfigurationsassistenten zu beginnen, müssen Sie den Service und `@wdio/cli` installieren:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Oder verwenden Sie Ihren bevorzugten Paketmanager - pnpm, yarn usw.

Erstellen Sie als Nächstes Ihre WDIO-Konfigurationsdatei. Wenn Sie Inspiration benötigen, gibt es eine funktionierende Konfiguration im [example-Verzeichnis](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) dieses Repositories sowie die [WDIO-Konfigurationsreferenzseite](https://webdriver.io/docs/configuration).

Sie müssen `electron` zu Ihrem Services-Array hinzufügen und eine Electron-Capability festlegen, z.B.:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Führen Sie schließlich [einige Tests](https://webdriver.io/docs/gettingstarted#run-test) mit Ihrer Konfigurationsdatei aus.

Dadurch wird eine Instanz Ihrer App auf die gleiche Weise gestartet, wie WDIO Browser wie Chrome oder Firefox behandelt. Der Service funktioniert mit [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote), wenn Sie zusätzliche Instanzen gleichzeitig ausführen müssen, z.B. mehrere Instanzen Ihrer App oder verschiedene Kombinationen aus Ihrer App und einem Webbrowser.

Wenn Sie [Electron Forge](https://www.electronforge.io/) oder [Electron Builder](https://www.electron.build/) zum Paketieren Ihrer App verwenden, versucht der Service automatisch, den Pfad zu Ihrer gebündelten Electron-Anwendung zu finden. Sie können einen benutzerdefinierten Pfad zur Binärdatei über benutzerdefinierte Service-Capabilities angeben, z.B.:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Sehen Sie sich die [Konfigurationsdokumentation](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) an, um herauszufinden, wie Sie den `appBinaryPath`-Wert für die verschiedenen von Electron unterstützten Betriebssysteme ermitteln können.

Alternativ können Sie den Service auf eine ungepackte App verweisen, indem Sie den Pfad zum `main.js`-Skript angeben. Electron muss in Ihren `node_modules` installiert sein. Es wird empfohlen, ungepackte Apps mit einem Bundler wie Rollup, Parcel, Webpack usw. zu bündeln.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Chromedriver-Konfiguration

**Wenn Ihre App eine Version von Electron verwendet, die niedriger als v26 ist, müssen Sie [Chromedriver manuell konfigurieren](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Dies liegt daran, dass WDIO Chrome for Testing verwendet, um Chromedriver herunterzuladen, das nur Chromedriver-Versionen v115 oder neuer bereitstellt.

## Dokumentation

**[Service-Konfiguration](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Chromedriver-Konfiguration](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Zugriff auf Electron-APIs](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Mocking von Electron-APIs](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Fensterverwaltung](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Standalone-Modus](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Entwicklung](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Häufige Probleme & Debugging](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Entwicklung

Lesen Sie die [Entwicklungsdokumentation](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md), wenn Sie an einer Mitwirkung interessiert sind.

## Beispiel-Integrationen

Sehen Sie sich unser [Electron-Boilerplate](https://github.com/webdriverio/electron-boilerplate)-Projekt an, das zeigt, wie WebdriverIO in eine Beispielanwendung integriert werden kann. Sie können auch einen Blick auf die Verzeichnisse [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) und [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) in diesem Repository werfen.

## Support

Wenn Sie Probleme beim Ausführen von WDIO mit dem Service haben, sollten Sie zunächst die dokumentierten [Häufigen Probleme](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) überprüfen und dann eine Diskussion im [WDIO-Hauptforum](https://github.com/webdriverio/webdriverio/discussions) eröffnen.

Das Electron-Service-Diskussionsforum ist viel weniger aktiv als das WDIO-Forum, aber wenn das Problem, das Sie erleben, speziell für Electron oder die Verwendung des Services gilt, können Sie [hier](https://github.com/webdriverio-community/wdio-electron-service/discussions) eine Diskussion eröffnen.