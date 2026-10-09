---
id: runner
title: Runner
description: "Wybierz między lokalnym runnerem a runnerem przeglądarkowym oraz skonfiguruj opcje runnera przeglądarkowego, takie jak presety, konfiguracja Vite i pokrycie kodu."
---

import CodeBlock from '@theme/CodeBlock';

Runner w WebdriverIO koordynuje, jak i gdzie uruchamiane są testy podczas korzystania z testrunnera. WebdriverIO obecnie obsługuje dwa różne typy runnerów: runner lokalny (local runner) i runner przeglądarkowy (browser runner).

## Local Runner

[Local Runner](https://www.npmjs.com/package/@wdio/local-runner) inicjuje Twój framework (np. Mocha, Jasmine lub Cucumber) w procesie roboczym (worker) i uruchamia wszystkie pliki testowe w środowisku Node.js. Każdy plik testowy jest uruchamiany w osobnym procesie roboczym dla każdej capability, co pozwala na maksymalną współbieżność. Każdy proces roboczy używa jednej instancji przeglądarki, a zatem uruchamia własną sesję przeglądarki, co zapewnia maksymalną izolację.

Ponieważ każdy test jest uruchamiany we własnym, izolowanym procesie, nie jest możliwe współdzielenie danych między plikami testowymi. Istnieją dwa sposoby obejścia tego ograniczenia:

- użyj [`@wdio/shared-store-service`](https://www.npmjs.com/package/@wdio/shared-store-service), aby współdzielić dane między wszystkimi procesami roboczymi
- grupuj pliki specyfikacji (więcej informacji w [Organizowanie zestawu testów](https://webdriver.io/docs/organizingsuites#grouping-test-specs-to-run-sequentially))

Jeśli w pliku `wdio.conf.js` nie zdefiniowano nic innego, Local Runner jest domyślnym runnerem w WebdriverIO.

### Instalacja

Aby użyć Local Runnera, możesz go zainstalować za pomocą:

```sh
npm install --save-dev @wdio/local-runner
```

### Konfiguracja

Local Runner jest domyślnym runnerem w WebdriverIO, więc nie ma potrzeby definiowania go w pliku `wdio.conf.js`. Jeśli chcesz ustawić go jawnie, możesz zdefiniować go w następujący sposób:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'local',
    // ...
}
```

## Browser Runner

W przeciwieństwie do [Local Runnera](https://www.npmjs.com/package/@wdio/local-runner), [Browser Runner](https://www.npmjs.com/package/@wdio/browser-runner) inicjuje i wykonuje framework w przeglądarce. Pozwala to uruchamiać testy jednostkowe lub testy komponentów w prawdziwej przeglądarce, a nie w JSDOM, jak robi to wiele innych frameworków testowych. Pakiet testowy działa w Chrome 90, Edge 90, Firefox 90 i Safari 14.1 lub nowszych. Zobacz [Obsługa przeglądarek](/docs/component-testing#browser-support).

Chociaż [JSDOM](https://www.npmjs.com/package/jsdom) jest szeroko stosowany do celów testowych, ostatecznie nie jest prawdziwą przeglądarką i nie można za jego pomocą emulować środowisk mobilnych. Dzięki temu runnerowi WebdriverIO umożliwia łatwe uruchamianie testów w przeglądarce i używanie poleceń WebDriver do interakcji z elementami renderowanymi na stronie.

Oto porównanie uruchamiania testów w JSDOM i w Browser Runnerze WebdriverIO

| | JSDOM | WebdriverIO Browser Runner |
|-|-------|----------------------------|
|1.| Uruchamia testy w Node.js przy użyciu ponownej implementacji standardów sieciowych, w szczególności standardów WHATWG DOM i HTML | Wykonuje test w prawdziwej przeglądarce i uruchamia kod w środowisku, z którego korzystają Twoi użytkownicy |
|2.| Interakcje z komponentami mogą być jedynie imitowane za pomocą JavaScript | Możesz użyć [API WebdriverIO](api) do interakcji z elementami za pośrednictwem protokołu WebDriver |
|3.| Obsługa Canvas wymaga [dodatkowych zależności](https://www.npmjs.com/package/canvas) i [ma ograniczenia](https://github.com/Automattic/node-canvas/issues) | Masz dostęp do prawdziwego [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) |
|4.| JSDOM ma pewne [zastrzeżenia](https://github.com/jsdom/jsdom#caveats) i nieobsługiwane Web API | Wszystkie Web API są obsługiwane, ponieważ testy działają w prawdziwej przeglądarce |
|5.| Niemożliwe jest wykrywanie błędów między przeglądarkami | Obsługa wszystkich przeglądarek, w tym przeglądarek mobilnych |
|6.| __Nie__ można testować pseudostanów elementów | Obsługa pseudostanów, takich jak `:hover` czy `:active` |

Ten runner używa [Vite](https://vitejs.dev/) do kompilowania kodu testowego i ładowania go w przeglądarce. Zawiera presety dla następujących frameworków komponentów:

- React
- Preact
- Vue.js
- Svelte
- SolidJS
- Stencil

Każdy plik testowy / grupa plików testowych działa na jednej stronie, co oznacza, że między poszczególnymi testami strona jest przeładowywana, aby zagwarantować izolację między testami.

### Instalacja

Aby użyć Browser Runnera, możesz go zainstalować za pomocą:

```sh
npm install --save-dev @wdio/browser-runner
```

### Konfiguracja

Aby użyć Browser Runnera, musisz zdefiniować właściwość `runner` w pliku `wdio.conf.js`, np.:

```js
// wdio.conf.js
export const {
    // ...
    runner: 'browser',
    // ...
}
```

### Opcje runnera

Browser Runner umożliwia następujące konfiguracje:

#### `preset`

Jeśli testujesz komponenty przy użyciu jednego z wymienionych wyżej frameworków, możesz zdefiniować preset, który zapewni, że wszystko będzie skonfigurowane od razu. Tej opcji nie można używać razem z `viteConfig`.

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

Zdefiniuj własną [konfigurację Vite](https://vitejs.dev/config/). Możesz przekazać niestandardowy obiekt lub zaimportować istniejący plik `vite.conf.ts`, jeśli używasz Vite.js do developmentu. Pamiętaj, że WebdriverIO zachowuje niestandardowe konfiguracje Vite, aby skonfigurować środowisko testowe.

__Typ:__ `string` lub [`UserConfig`](https://github.com/vitejs/vite/blob/52e64eb43287d241f3fd547c332e16bd9e301e95/packages/vite/src/node/config.ts#L119-L272) lub `(env: ConfigEnv) => UserConfig | Promise<UserConfig>`<br />
__Przykład:__

```js title="wdio.conf.ts"
import viteConfig from '../vite.config.ts'

export const {
    // ...
    runner: ['browser', { viteConfig }],
    // lub po prostu:
    runner: ['browser', { viteConfig: '../vites.config.ts' }],
    // lub użyj funkcji, jeśli Twoja konfiguracja vite zawiera wiele wtyczek,
    // które chcesz rozwiązać dopiero w momencie odczytu wartości
    runner: ['browser', {
        viteConfig: () => ({
            // ...
        })
    }],
    // ...
}
```

#### `headless`

Jeśli ustawiono na `true`, runner zaktualizuje capabilities, aby uruchamiać testy w trybie headless. Domyślnie jest to włączone w środowiskach CI, w których zmienna środowiskowa `CI` jest ustawiona na `'1'` lub `'true'`.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`, ustawiane na `true`, jeśli ustawiona jest zmienna środowiskowa `CI`

#### `rootDir`

Katalog główny projektu.

__Typ:__ `string`<br />
__Domyślnie:__ `process.cwd()`

#### `coverage`

WebdriverIO obsługuje raportowanie pokrycia testami za pomocą [`istanbul`](https://istanbul.js.org/). Więcej szczegółów znajdziesz w sekcji [Opcje pokrycia](#coverage-options).

__Typ:__ `object`<br />
__Domyślnie:__ `undefined`

### Opcje pokrycia

Poniższe opcje pozwalają skonfigurować raportowanie pokrycia kodu.

#### `enabled`

Włącza zbieranie danych o pokryciu.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

#### `include`

Lista plików uwzględnianych w pokryciu w postaci wzorców glob.

__Typ:__ `string[]`<br />
__Domyślnie:__ `[**]`

#### `exclude`

Lista plików wykluczonych z pokrycia w postaci wzorców glob.

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

Lista rozszerzeń plików, które raport powinien uwzględniać.

__Typ:__ `string | string[]`<br />
__Domyślnie:__ `['.js', '.cjs', '.mjs', '.ts', '.mts', '.cts', '.tsx', '.jsx', '.vue', '.svelte']`

#### `reportsDirectory`

Katalog, do którego zapisywany jest raport pokrycia.

__Typ:__ `string`<br />
__Domyślnie:__ `./coverage`

#### `reporter`

Reportery pokrycia, które mają zostać użyte. Szczegółową listę wszystkich reporterów znajdziesz w [dokumentacji istanbul](https://istanbul.js.org/docs/advanced/alternative-reporters/).

__Typ:__ `string[]`<br />
__Domyślnie:__ `['text', 'html', 'clover', 'json-summary']`

#### `perFile`

Sprawdza progi dla każdego pliku osobno. Rzeczywiste progi znajdziesz w opcjach `lines`, `functions`, `branches` i `statements`.

__Typ:__ `boolean`<br />
__Domyślnie:__ `false`

#### `clean`

Czyści wyniki pokrycia przed uruchomieniem testów.

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

Korzystając z Browser Runnera WebdriverIO, należy pamiętać, że okna dialogowe blokujące wątek, takie jak `alert` czy `confirm`, nie mogą być używane natywnie. Dzieje się tak, ponieważ blokują one stronę internetową, co oznacza, że WebdriverIO nie może kontynuować komunikacji ze stroną, co powoduje zawieszenie wykonywania.

W takich sytuacjach WebdriverIO dostarcza domyślne mocki z domyślnie zwracanymi wartościami dla tych API. Gwarantuje to, że jeśli użytkownik przypadkowo użyje synchronicznych webowych API wyskakujących okienek, wykonywanie się nie zawiesi. Mimo to zaleca się, aby użytkownik sam mockował te webowe API dla lepszego doświadczenia. Więcej informacji w sekcji [Mockowanie](/docs/component-testing/mocking).

### Przykłady

Koniecznie zapoznaj się z dokumentacją dotyczącą [testowania komponentów](https://webdriver.io/docs/component-testing) i zajrzyj do [repozytorium z przykładami](https://github.com/webdriverio/component-testing-examples), aby zobaczyć przykłady wykorzystujące te i różne inne frameworki.