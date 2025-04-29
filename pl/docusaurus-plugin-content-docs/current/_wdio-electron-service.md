---
id: wdio-electron-service
title: Usługa Electron
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Usługa WebdriverIO do testowania aplikacji Electron**

Umożliwia wieloplatformowe testowanie E2E aplikacji Electron dzięki rozbudowanemu ekosystemowi WebdriverIO.

Duchowy następca [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Funkcje

Ułatwia testowanie aplikacji Electron poprzez:

- 🚗 automatyczną konfigurację wymaganego Chromedriver (dla Electron v26 i nowszych)
- 📦 automatyczne wykrywanie ścieżki do aplikacji Electron
  - obsługuje [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) i niespakowane aplikacje
- 🧩 dostęp do API Electron w testach
- 🕵️ mockowanie API Electron poprzez interfejs podobny do Vitest

## Instalacja

Będziesz potrzebować zainstalowanego `WebdriverIO`, instrukcje znajdziesz [tutaj](https://webdriver.io/docs/gettingstarted).

## Szybki start

Zalecanym sposobem na szybkie rozpoczęcie pracy jest użycie [kreatora konfiguracji WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Ręczny szybki start

Aby rozpocząć bez używania kreatora konfiguracji, musisz zainstalować usługę i `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Lub użyj preferowanego menedżera pakietów - pnpm, yarn, itp.

Następnie utwórz plik konfiguracyjny WDIO. Jeśli potrzebujesz inspiracji, działająca konfiguracja znajduje się w [katalogu przykładów](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) tego repozytorium, a także na [stronie referencyjnej konfiguracji WDIO](https://webdriver.io/docs/configuration).

Musisz dodać `electron` do tablicy usług i ustawić możliwości Electron, np.:

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

Na koniec, [uruchom testy](https://webdriver.io/docs/gettingstarted#run-test) używając swojego pliku konfiguracyjnego.

Spowoduje to uruchomienie instancji Twojej aplikacji w taki sam sposób, w jaki WDIO obsługuje przeglądarki takie jak Chrome czy Firefox. Usługa działa z [WDIO (równoległym) multiremote](https://webdriver.io/docs/multiremote), jeśli potrzebujesz uruchomić dodatkowe instancje jednocześnie, np. wiele instancji aplikacji lub różne kombinacje aplikacji i przeglądarki internetowej.

Jeśli używasz [Electron Forge](https://www.electronforge.io/) lub [Electron Builder](https://www.electron.build/) do pakowania aplikacji, usługa automatycznie spróbuje znaleźć ścieżkę do spakowanej aplikacji Electron. Możesz podać niestandardową ścieżkę do pliku binarnego za pomocą niestandardowych możliwości usługi, np.:

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

Zobacz [dokumentację konfiguracji](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath), aby dowiedzieć się, jak znaleźć wartość `appBinaryPath` dla różnych systemów operacyjnych obsługiwanych przez Electron.

Alternatywnie możesz skierować usługę na niespakowaną aplikację, podając ścieżkę do skryptu `main.js`. Electron musi być zainstalowany w `node_modules`. Zaleca się bundlowanie niespakowanych aplikacji za pomocą takich narzędzi jak Rollup, Parcel, Webpack itp.

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

## Konfiguracja Chromedriver

**Jeśli Twoja aplikacja używa wersji Electron niższej niż v26, będziesz musiał [ręcznie skonfigurować Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Wynika to z faktu, że WDIO używa Chrome for Testing do pobierania Chromedriver, który dostarcza tylko wersje Chromedriver v115 lub nowsze.

## Dokumentacja

**[Konfiguracja usługi](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Konfiguracja Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Dostęp do API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Mockowanie API Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Zarządzanie oknami](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Tryb samodzielny](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Rozwój](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Typowe problemy i debugowanie](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Rozwój

Przeczytaj [dokument rozwoju](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md), jeśli jesteś zainteresowany współtworzeniem.

## Przykładowe integracje

Sprawdź nasz projekt [boilerplate Electron](https://github.com/webdriverio/electron-boilerplate), który pokazuje, jak zintegrować WebdriverIO w przykładowej aplikacji. Możesz też zajrzeć do katalogów [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) i [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) w tym repozytorium.

## Wsparcie

Jeśli masz problemy z uruchomieniem WDIO z tą usługą, najpierw powinieneś sprawdzić udokumentowane [Typowe problemy](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md), a następnie otworzyć dyskusję na [głównym forum WDIO](https://github.com/webdriverio/webdriverio/discussions).

Forum dyskusyjne usługi Electron jest znacznie mniej aktywne niż forum WDIO, ale jeśli problem dotyczy konkretnie Electron lub korzystania z usługi, możesz rozpocząć dyskusję [tutaj](https://github.com/webdriverio-community/wdio-electron-service/discussions).