---
id: typescript
title: Konfiguracja TypeScript
---

Możesz pisać testy przy użyciu [TypeScript](http://www.typescriptlang.org), aby uzyskać auto-uzupełnianie i bezpieczeństwo typów.

Będziesz potrzebować zainstalowanego [`tsx`](https://github.com/privatenumber/tsx) w `devDependencies` poprzez:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO automatycznie wykryje, czy te zależności są zainstalowane i skompiluje Twoją konfigurację i testy za Ciebie. Upewnij się, że masz plik `tsconfig.json` w tym samym katalogu, co Twoja konfiguracja WDIO.

#### Niestandardowy TSConfig

Jeśli potrzebujesz ustawić inną ścieżkę dla `tsconfig.json`, ustaw zmienną środowiskową TSCONFIG_PATH z wybraną ścieżką lub użyj [ustawienia tsConfigPath](/docs/configurationfile) w konfiguracji wdio.

Alternatywnie możesz użyć [zmiennej środowiskowej](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) dla `tsx`.


#### Sprawdzanie typów

Zauważ, że `tsx` nie obsługuje sprawdzania typów - jeśli chcesz sprawdzić swoje typy, musisz to zrobić w osobnym kroku za pomocą `tsc`.

## Konfiguracja frameworka

Twój `tsconfig.json` potrzebuje następujących ustawień:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Unikaj jawnego importowania `webdriverio` lub `@wdio/sync`.
Typy `WebdriverIO` i `WebDriver` są dostępne z dowolnego miejsca po dodaniu ich do `types` w `tsconfig.json`. Jeśli używasz dodatkowych usług WebdriverIO, wtyczek lub pakietu automatyzacji `devtools`, dodaj je również do listy `types`, ponieważ wiele z nich zapewnia dodatkowe typy.

## Typy frameworków

W zależności od używanego frameworka, będziesz musiał dodać typy dla tego frameworka do właściwości `types` w `tsconfig.json`, a także zainstalować jego definicje typów. Jest to szczególnie ważne, jeśli chcesz mieć obsługę typów dla wbudowanej biblioteki asercji [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Na przykład, jeśli zdecydujesz się użyć frameworka Mocha, musisz zainstalować `@types/mocha` i dodać go w następujący sposób, aby wszystkie typy były dostępne globalnie:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Usługi

Jeśli używasz usług, które dodają polecenia do zakresu przeglądarki, musisz również uwzględnić je w swoim `tsconfig.json`. Na przykład, jeśli używasz `@wdio/lighthouse-service`, upewnij się, że dodajesz go również do `types`, np.:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Dodanie usług i reporterów do konfiguracji TypeScript zwiększa również bezpieczeństwo typów w pliku konfiguracyjnym WebdriverIO.

## Definicje typów

Podczas uruchamiania poleceń WebdriverIO wszystkie właściwości są zwykle typowane, więc nie musisz zajmować się importowaniem dodatkowych typów. Jednak istnieją przypadki, w których chcesz z góry zdefiniować zmienne. Aby upewnić się, że są one bezpieczne pod względem typów, możesz użyć wszystkich typów zdefiniowanych w pakiecie [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Na przykład, jeśli chcesz zdefiniować opcje zdalnego dla `webdriverio`, możesz to zrobić w następujący sposób:

```ts
import type { Options } from '@wdio/types'

// Here is an example where you might want to import the types directly
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// For other cases, you can use the `WebdriverIO` namespace
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Other configs options
}
```

## Wskazówki i podpowiedzi

### Kompilacja i lintowanie

Aby być całkowicie bezpiecznym, możesz rozważyć stosowanie najlepszych praktyk: kompiluj swój kod za pomocą kompilatora TypeScript (uruchom `tsc` lub `npx tsc`) i miej uruchomiony [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) na [hooku pre-commit](https://github.com/typicode/husky).