---
id: typescript
title: Konfiguracja TypeScript
description: "Pisz testy WebdriverIO w TypeScript z użyciem tsx, skonfiguruj tsconfig.json i dodaj definicje typów dla frameworków, usług i niestandardowych komend."
---

Możesz pisać testy, używając [TypeScript](http://www.typescriptlang.org), aby uzyskać autouzupełnianie i bezpieczeństwo typów.

Będziesz potrzebować [`tsx`](https://github.com/privatenumber/tsx) zainstalowanego w `devDependencies` za pomocą:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO automatycznie wykryje, czy te zależności są zainstalowane, i skompiluje za Ciebie konfigurację oraz testy. Upewnij się, że masz plik `tsconfig.json` w tym samym katalogu co konfiguracja WDIO.

#### Niestandardowy TSConfig

Jeśli musisz ustawić inną ścieżkę dla `tsconfig.json`, ustaw zmienną środowiskową TSCONFIG_PATH na żądaną ścieżkę lub użyj [ustawienia tsConfigPath](/docs/configurationfile) w konfiguracji wdio.

Alternatywnie możesz użyć [zmiennej środowiskowej](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) dla `tsx`.


#### Sprawdzanie typów

Pamiętaj, że `tsx` nie obsługuje sprawdzania typów – jeśli chcesz sprawdzić typy, musisz to zrobić w osobnym kroku za pomocą `tsc`.

## Konfiguracja frameworka

Twój `tsconfig.json` musi zawierać następujące elementy:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Unikaj jawnego importowania `webdriverio` lub `@wdio/sync`.
Typy `WebdriverIO` i `WebDriver` są dostępne z dowolnego miejsca po dodaniu ich do `types` w `tsconfig.json`. Jeśli używasz dodatkowych usług WebdriverIO, wtyczek lub pakietu automatyzacji `devtools`, dodaj je również do listy `types`, ponieważ wiele z nich zapewnia dodatkowe definicje typów.

## Typy frameworków

W zależności od używanego frameworka musisz dodać typy tego frameworka do właściwości types w `tsconfig.json`, a także zainstalować jego definicje typów. Jest to szczególnie ważne, jeśli chcesz mieć obsługę typów dla wbudowanej biblioteki asercji [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Na przykład, jeśli zdecydujesz się użyć frameworka Mocha, musisz zainstalować `@types/mocha` i dodać go w ten sposób, aby wszystkie typy były dostępne globalnie:

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
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine` ładuje `@types/jasmine`, co zapewnia `jasmine`, `spyOn` i `expectAsync`. Z `@wdio/jasmine-framework` globalne `expect` zwraca `void` dla synchronicznych matcherów Jasmine oraz `Promise` dla matcherów WebdriverIO i asynchronicznych matcherów Jasmine. `expectAsync` również zawiera matchery WebdriverIO. Eksport `expect` z `expect-webdriverio` zachowuje swoje matchery Jest.

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

Jeśli używasz usług, które dodają komendy do zakresu przeglądarki, musisz je również uwzględnić w swoim `tsconfig.json`. Na przykład, jeśli używasz `@wdio/lighthouse-service`, upewnij się, że dodałeś go także do `types`, np.:

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

Dodanie usług i reporterów do konfiguracji TypeScript wzmacnia również bezpieczeństwo typów pliku konfiguracyjnego WebdriverIO.

## Definicje typów

Podczas uruchamiania komend WebdriverIO wszystkie właściwości są zazwyczaj otypowane, więc nie musisz importować dodatkowych typów. Istnieją jednak przypadki, w których chcesz zdefiniować zmienne z wyprzedzeniem. Aby zapewnić ich bezpieczeństwo typów, możesz użyć wszystkich typów zdefiniowanych w pakiecie [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Na przykład, jeśli chcesz zdefiniować opcje zdalne dla `webdriverio`, możesz zrobić:

```ts
import type { Options } from '@wdio/types'

// Oto przykład, w którym możesz chcieć zaimportować typy bezpośrednio
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// W innych przypadkach możesz użyć przestrzeni nazw `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Inne opcje konfiguracji
}
```

## Wskazówki i porady

### Kompilacja i lintowanie

Aby mieć całkowitą pewność, możesz rozważyć stosowanie najlepszych praktyk: kompiluj swój kod za pomocą kompilatora TypeScript (uruchom `tsc` lub `npx tsc`) i uruchamiaj [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) w [hooku pre-commit](https://github.com/typicode/husky).