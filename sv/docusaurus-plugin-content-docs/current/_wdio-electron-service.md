---
id: wdio-electron-service
title: Electron Service
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**WebdriverIO-tjänst för testning av Electron-applikationer**

Möjliggör plattformsoberoende E2E-testning av Electron-appar via det omfattande WebdriverIO-ekosystemet.

Andlig efterföljare till [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Funktioner

Gör testning av Electron-applikationer mycket enklare via:

- 🚗 automatisk installation av nödvändig Chromedriver (för Electron v26 och senare)
- 📦 automatisk sökvägsdetektering av din Electron-applikation
  - stödjer [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) och opaketerade appar
- 🧩 åtkomst till Electron-API:er i dina tester
- 🕵️ mockningar av Electron-API:er via ett Vitest-liknande API

## Installation

Du behöver installera `WebdriverIO`, instruktioner finns [här](https://webdriver.io/docs/gettingstarted).

## Snabbstart

Det rekommenderade sättet att komma igång snabbt är att använda [WDIO-konfigurationsguiden](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Manuell snabbstart

För att komma igång utan att använda konfigurationsguiden behöver du installera tjänsten och `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Eller använd din föredragna pakethanterare - pnpm, yarn, etc.

Skapa sedan din WDIO-konfigurationsfil. Om du behöver inspiration för detta finns det en fungerande konfiguration i [exempelkatalogen](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) i detta repository, samt [WDIO:s konfigurationsreferenssida](https://webdriver.io/docs/configuration).

Du behöver lägga till `electron` i din services-array och ställa in en Electron-capability, t.ex.:

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

Slutligen, [kör några tester](https://webdriver.io/docs/gettingstarted#run-test) med hjälp av din konfigurationsfil.

Detta kommer att starta en instans av din app på samma sätt som WDIO hanterar webbläsare som Chrome eller Firefox. Tjänsten fungerar med [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote) om du behöver köra ytterligare instanser samtidigt, t.ex. flera instanser av din app eller olika kombinationer av din app och en webbläsare.

Om du använder [Electron Forge](https://www.electronforge.io/) eller [Electron Builder](https://www.electron.build/) för att paketera din app så kommer tjänsten automatiskt att försöka hitta sökvägen till din paketerade Electron-applikation. Du kan ange en anpassad sökväg till binärfilen via anpassade tjänstcapabilities, t.ex.:

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

Se [konfigurationsdokumentationen](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) för att hitta ditt `appBinaryPath`-värde för de olika operativsystem som stöds av Electron.

Alternativt kan du rikta tjänsten mot en opaketerad app genom att ange sökvägen till `main.js`-skriptet. Electron behöver vara installerat i din `node_modules`. Det rekommenderas att bunta opaketerade appar med hjälp av en bundler som Rollup, Parcel, Webpack, etc.

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

## Chromedriver-konfiguration

**Om din app använder en version av Electron som är lägre än v26 behöver du [manuellt konfigurera Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Detta beror på att WDIO använder Chrome for Testing för att ladda ner Chromedriver, vilket endast tillhandahåller Chromedriver-versioner av v115 eller nyare.

## Dokumentation

**[Tjänstkonfiguration](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Chromedriver-konfiguration](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Åtkomst till Electron-API:er](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Mockning av Electron-API:er](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Fönsterhantering](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Fristående läge](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Utveckling](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Vanliga problem och felsökning](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Utveckling

Läs [utvecklingsdokumentationen](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) om du är intresserad av att bidra.

## Exempelintegrationer

Kolla in vårt [Electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)-projekt som visar hur man integrerar WebdriverIO i en exempelapplikation. Du kan också titta på katalogerna [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) och [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) i detta repository.

## Support

Om du har problem med att köra WDIO med tjänsten bör du först kontrollera de dokumenterade [vanliga problemen](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md), och sedan öppna en diskussion i [WDIOs huvudforum](https://github.com/webdriverio/webdriverio/discussions).

Electron-tjänstens diskussionsforum är mycket mindre aktivt än WDIO:s, men om problemet du upplever är specifikt för Electron eller användning av tjänsten kan du öppna en diskussion [här](https://github.com/webdriverio-community/wdio-electron-service/discussions).