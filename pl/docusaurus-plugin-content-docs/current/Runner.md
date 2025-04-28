---
id: runner
title: Runner
---

import CodeBlock from '@theme/CodeBlock';

Runner w WebdriverIO orkiestruje jak i gdzie testy są uruchamiane podczas korzystania z testrunner. WebdriverIO obecnie obsługuje dwa różne typy runnerów: lokalny i przeglądarkowy.

## Local Runner

[Local Runner](https://www.npmjs.com/package/@wdio/local-runner) inicjuje twój framework (np. Mocha, Jasmine lub Cucumber) w procesie roboczym i uruchamia wszystkie pliki testowe w środowisku Node.js. Każdy plik testowy jest uruchamiany w osobnym procesie roboczym dla każdej funkcjonalności, co pozwala na maksymalną współbieżność. Każdy proces roboczy wykorzystuje pojedynczą instancję przeglądarki i dlatego uruchamia własną sesję przeglądarki, zapewniając maksymalną izolację.

Ponieważ każdy test jest uruchamiany we własnym izolowanym procesie, nie jest możliwe udostępnianie danych między plikami testowymi. Istnieją dwa sposoby obejścia tego:

- użyj [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service) do udostępniania danych między wszystkimi pracownikami
- grupuj pliki specyfikacji (przeczytaj więcej w [Organizacja zestawu testów](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Jeśli nic innego nie jest zdefiniowane w `wdio.conf.js`, Local Runner jest domyślnym runnerem w WebdriverIO.

### Instalacja

Aby korzystać z Local Runner, możesz go zainstalować za pomocą:

```sh
npm install --save-dev @wdio/local-runner
```

### Konfiguracja

Local Runner jest domyślnym runnerem w WebdriverIO, więc nie ma potrzeby definiowania go w `wdio.conf.js`. Jeśli chcesz go jawnie ustawić, możesz zdefiniować go w następujący sposób:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

W przeciwieństwie do [Local Runner](https://www.npmjs.com/package/@wdio/local-runner), [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) inicjuje i wykonuje framework wewnątrz przeglądarki. Pozwala to na uruchamianie testów jednostkowych lub testów komponentów w rzeczywistej przeglądarce, a nie w JSDOM, jak wiele innych frameworków testowych.

Podczas gdy [JSDOM](https://www.npmjs.com/package/jsdom) jest szeroko stosowany do celów testowania, to ostatecznie nie jest prawdziwą przeglądarką, ani nie można za jego pomocą emulować środowisk mobilnych. Dzięki temu runnerowi WebdriverIO umożliwia łatwe uruchamianie testów w przeglądarce i korzystanie z poleceń WebDriver do interakcji z elementami renderowanymi na stronie.

Oto przegląd uruchamiania testów w JSDOM vs. WebdriverIOs Browser Runner

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Uruchamia testy w Node.js korzystając z reimplementacji standardów sieciowych, zwłaszcza standardów WHATWG DOM i HTML | Wykonuje testy w rzeczywistej przeglądarce i uruchamia kod w środowisku, z którego korzystają Twoi użytkownicy |
|2.| Interakcje z komponentami mogą być tylko imitowane za pomocą JavaScript | Możesz używać [WebdriverIO API](api) do interakcji z elementami przez protokół WebDriver |
|3.| Obsługa Canvas wymaga [dodatkowych zależności](https://www.npmjs.com/package/canvas) i [ma ograniczenia](https://github.com/Automattic/node-canvas/issues) | Masz dostęp do prawdziwego [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM ma pewne [zastrzeżenia](https://github.com/jsdom/jsdom#caveats) i nieobsługiwane API internetowe | Wszystkie API internetowe są obsługiwane, ponieważ testy działają w rzeczywistej przeglądarce |
|5.| Niemożliwe jest wykrycie błędów między przeglądarkami | Obsługa wszystkich przeglądarek, w tym przeglądarek mobilnych |
|6.| __Nie__ może testować stanów pseudoelementów | Obsługa stanów pseudo, takich jak `:hover` lub `:active` |

Ten runner używa [Vite](https://vitejs.dev/) do kompilacji kodu testowego i ładowania go w przeglądarce. Zawiera gotowe ustawienia dla następujących frameworków komponentów:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Każdy plik testowy / grupa plików testowych działa w ramach pojedynczej strony, co oznacza, że między każdym testem strona jest przeładowywana, aby zagwarantować izolację między testami.

### Instalacja

Aby korzystać z Browser Runnera, możesz go zainstalować za pomocą:

```sh
npm install --save-dev @wdio/browser-runner
```

### Konfiguracja

Aby używać Browser runnera, musisz zdefiniować właściwość `runner` w pliku `wdio.conf.js`, np.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opcje Runnera

Browser runner pozwala na następujące konfiguracje:

#### `preset`

Jeśli testujesz komponenty przy użyciu jednego z wymienionych powyżej frameworków, możesz zdefiniować preset, który zapewnia, że wszystko jest skonfigurowane od razu. Ta opcja nie może być używana razem z `viteConfig`.

__Typ:__ `vue` | `svelte` | `solid` | `react` | `preact` | `stencil`<br />
__Przykład:__

```js title="wdio.conf.js"
export const {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

#### `viteConfig`

Zdefiniuj własną [konfigurację Vite](https://vitejs.dev/config/). Możesz przekazać niestandardowy obiekt lub zaimportować istniejący plik `vite.conf.ts`, jeśli używasz Vite.js do rozwoju. Pamiętaj, że WebdriverIO zachowuje niestandardowe konfiguracje Vite do konfiguracji harnessu testowego.

__Typ:__ `string` lub [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) lub `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Przykład:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // lub po prostu:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // lub użyj funkcji jeśli twoja konfiguracja vite zawiera dużo wtyczek
    // które chcesz rozwiązać tylko wtedy, gdy wartość jest odczytywana
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Jeśli ustawione na `true`, runner zaktualizuje możliwości, aby uruchomić testy w trybie headless. Domyślnie jest to włączone w środowiskach CI, gdzie zmienna środowiskowa `CI` jest ustawiona na `'1'` lub `'true'`.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`, ustawione na `true` jeśli zmienna środowiskowa `CI` jest ustawiona

#### `rootDir`

Katalog główny projektu.

__Typ:__ `string`<br />
__Domyślnie:__ `process.cwd()`

#### `coverage`

WebdriverIO obsługuje raportowanie pokrycia testowego przez [`istanbul`](https://istanbul.js.org/). Zobacz [Opcje pokrycia](#coverage-options) aby uzyskać więcej szczegółów.

__Typ:__ `object`<br />
__Domyślnie:__ `undefined`

### Opcje pokrycia

Następujące opcje pozwalają skonfigurować raportowanie pokrycia.

#### `enabled`

Włącza zbieranie pokrycia.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

#### `include`

Lista plików włączonych do pokrycia jako wzorce glob.

__Typ:__ `string[]`<br />
__Domyślnie:__ `[**]`

#### `exclude`

Lista plików wykluczonych z pokrycia jako wzorce glob.

__Typ:__ `string[]`<br />
__Domyślnie:__

```
[
  'coverage/**',
  'dist/**',
  'packages/*/test{,s}/**',
  '**/*.d.ts',
  'cypress/**',
  'test{,s}/**',
  'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
  '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
  '**/__tests__/**',
  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
  '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
]
```

#### `extension`

Lista rozszerzeń plików, które raport powinien zawierać.

__Typ:__ `string | string[]`<br />
__Domyślnie:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Katalog, do którego zostanie zapisany raport pokrycia.

__Typ:__ `string`<br />
__Domyślnie:__ `./coverage`

#### `reporter`

Reportery pokrycia do użycia. Zobacz [dokumentację istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/) dla szczegółowej listy wszystkich reporterów.

__Typ:__ `string[]`<br />
__Domyślnie:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Sprawdź progi dla każdego pliku. Zobacz `lines`, `functions`, `branches` i `statements` dla faktycznych progów.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

#### `clean`

Wyczyść wyniki pokrycia przed uruchomieniem testów.

__Typ:__ `boolean`<br />
__Domyślnie:__ `true`

#### `lines`

Próg dla linii.

__Typ:__ `number`<br />
__Domyślnie:__ `undefined`

#### `functions`

Próg dla funkcji.

__Typ:__ `number`<br />
__Domyślnie:__ `undefined`

#### `branches`

Próg dla gałęzi.

__Typ:__ `number`<br />
__Domyślnie:__ `undefined`

#### `statements`

Próg dla instrukcji.

__Typ:__ `number`<br />
__Domyślnie:__ `undefined`

### Ograniczenia

Korzystając z WebdriverIO browser runner, ważne jest, aby pamiętać, że blokujące dialogi, takie jak `alert` lub `confirm`, nie mogą być używane natywnie. Dzieje się tak, ponieważ blokują one stronę internetową, co oznacza, że WebdriverIO nie może kontynuować komunikacji ze stroną, powodując zawieszenie wykonania.

W takich sytuacjach WebdriverIO dostarcza domyślne zaślepki z domyślnymi zwracanymi wartościami dla tych API. Zapewnia to, że jeśli użytkownik przypadkowo użyje synchronicznych wyskakujących internetowych API, wykonanie nie zawiesi się. Zaleca się jednak, aby użytkownik zaślepiał te internetowe API dla lepszego doświadczenia. Przeczytaj więcej w [Mockowanie](/docs/component-testing/mocking).

### Przykłady

Koniecznie sprawdź dokumentację dotyczącą [testowania komponentów](https://webdriver.io/docs/component-testing) i zajrzyj do [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples) w poszukiwaniu przykładów korzystających z tych i różnych innych frameworków.