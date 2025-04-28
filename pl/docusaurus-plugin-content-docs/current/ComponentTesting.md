---
id: component-testing
title: Testowanie Komponentów
---

Dzięki [Browser Runner](/docs/runner#browser-runner) WebdriverIO możesz uruchamiać testy w rzeczywistej przeglądarce komputerowej lub mobilnej, używając WebdriverIO i protokołu WebDriver do automatyzacji i interakcji z tym, co jest renderowane na stronie. To podejście ma [wiele zalet](/docs/runner#browser-runner) w porównaniu do innych frameworków testowych, które pozwalają na testowanie tylko w [JSDOM](https://www.npmjs.com/package/jsdom).

## Jak to działa?

Browser Runner wykorzystuje [Vite](https://vitejs.dev/) do renderowania strony testowej i inicjalizacji frameworka testowego do uruchamiania testów w przeglądarce. Obecnie obsługuje tylko Mocha, ale Jasmine i Cucumber są [na mapie drogowej](https://github.com/orgs/webdriverio/projects/1). Umożliwia to testowanie wszelkiego rodzaju komponentów, nawet dla projektów, które nie używają Vite.

Serwer Vite jest uruchamiany przez testrunner WebdriverIO i skonfigurowany tak, aby można było używać wszystkich reporterów i usług, jak w przypadku normalnych testów e2e. Ponadto inicjalizuje instancję [`browser`](/docs/api/browser), która umożliwia dostęp do podzbioru [API WebdriverIO](/docs/api) w celu interakcji z dowolnymi elementami na stronie. Podobnie jak w testach e2e, możesz uzyskać dostęp do tej instancji za pomocą zmiennej `browser` dołączonej do globalnego zakresu lub importując ją z `@wdio/globals`, w zależności od ustawienia opcji [`injectGlobals`](/docs/api/globals).

WebdriverIO ma wbudowane wsparcie dla następujących frameworków:

- [__Nuxt__](https://nuxt.com/): Testrunner WebdriverIO wykrywa aplikację Nuxt i automatycznie konfiguruje composables Twojego projektu oraz pomaga w mockowaniu backendu Nuxt, więcej informacji znajdziesz w [dokumentacji Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Testrunner WebdriverIO wykrywa, czy używasz TailwindCSS i poprawnie ładuje środowisko do strony testowej

## Konfiguracja

Aby skonfigurować WebdriverIO do testowania jednostkowego lub komponentowego w przeglądarce, zainicjuj nowy projekt WebdriverIO za pomocą:

```bash
npm init wdio@latest ./
# lub
yarn create wdio ./
```

Gdy uruchomi się kreator konfiguracji, wybierz `browser` do uruchamiania testów jednostkowych i komponentowych oraz wybierz jeden z presetów, jeśli jest to pożądane, w przeciwnym razie wybierz _"Other"_, jeśli chcesz uruchamiać tylko podstawowe testy jednostkowe. Możesz również skonfigurować niestandardową konfigurację Vite, jeśli już używasz Vite w swoim projekcie. Więcej informacji znajdziesz we wszystkich [opcjach runnera](/docs/runner#runner-options).

:::info

__Uwaga:__ WebdriverIO domyślnie uruchamia testy przeglądarkowe w trybie headless w środowisku CI, np. gdy zmienna środowiskowa `CI` jest ustawiona na `'1'` lub `'true'`. Możesz ręcznie skonfigurować to zachowanie za pomocą opcji [`headless`](/docs/runner#headless) dla runnera.

:::

Na końcu tego procesu powinieneś znaleźć `wdio.conf.js` zawierający różne konfiguracje WebdriverIO, w tym właściwość `runner`, np.:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Definiując różne [capabilities](/docs/configuration#capabilities), możesz uruchamiać testy w różnych przeglądarkach, równolegle, jeśli chcesz.

Jeśli nadal nie masz pewności, jak wszystko działa, obejrzyj poniższy tutorial jak rozpocząć pracę z Testowaniem Komponentów w WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Framework Testowy

To całkowicie zależy od Ciebie, co chcesz uruchamiać w swoich testach i jak chcesz renderować komponenty. Niemniej jednak zalecamy używanie [Testing Library](https://testing-library.com/) jako frameworka narzędziowego, ponieważ dostarcza on wtyczki dla różnych frameworków komponentów, takich jak React, Preact, Svelte i Vue. Jest bardzo przydatna do renderowania komponentów na stronie testowej i automatycznie czyści te komponenty po każdym teście.

Możesz dowolnie mieszać prymitywy Testing Library z komendami WebdriverIO, np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Uwaga:__ używanie metod renderowania z Testing Library pomaga usuwać utworzone komponenty między testami. Jeśli nie używasz Testing Library, upewnij się, że dołączasz swoje komponenty testowe do kontenera, który jest czyszczony między testami.

## Skrypty Konfiguracyjne

Możesz skonfigurować swoje testy, uruchamiając dowolne skrypty w Node.js lub w przeglądarce, np. wstrzykując style, mockując API przeglądarki lub łącząc się z usługą zewnętrzną. [Hooki](/docs/configuration#hooks) WebdriverIO mogą być używane do uruchamiania kodu w Node.js, podczas gdy [`mochaOpts.require`](/docs/frameworks#require) pozwala na importowanie skryptów do przeglądarki przed załadowaniem testów, np.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // dostarczenie skryptu konfiguracyjnego do uruchomienia w przeglądarce
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // konfiguracja środowiska testowego w Node.js
    }
    // ...
}
```

Na przykład, jeśli chcesz mockować wszystkie wywołania [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) w swoim teście za pomocą następującego skryptu konfiguracyjnego:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// uruchom kod przed załadowaniem wszystkich testów
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // uruchom kod po załadowaniu pliku testowego
}

export const mochaGlobalTeardown = () => {
    // uruchom kod po wykonaniu pliku spec
}

```

Teraz w swoich testach możesz dostarczyć niestandardowe wartości odpowiedzi dla wszystkich żądań przeglądarki. Więcej informacji o globalnych fixtures w [dokumentacji Mocha](https://mochajs.org/#global-fixtures).

## Obserwowanie Plików Testowych i Aplikacyjnych

Istnieje wiele sposobów debugowania testów przeglądarkowych. Najłatwiejszym jest uruchomienie testrunner WebdriverIO z flagą `--watch`, np.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Spowoduje to początkowe przejście przez wszystkie testy i zatrzymanie po zakończeniu wszystkich. Możesz wtedy wprowadzać zmiany w poszczególnych plikach, które następnie będą ponownie uruchamiane indywidualnie. Jeśli ustawisz [`filesToWatch`](/docs/configuration#filestowatch) wskazujący na pliki Twojej aplikacji, wszystkie testy zostaną ponownie uruchomione po wprowadzeniu zmian w aplikacji.

## Debugowanie

Chociaż nie jest (jeszcze) możliwe ustawienie punktów przerwania w twoim IDE i rozpoznawanie ich przez zdalną przeglądarkę, możesz użyć polecenia [`debug`](/docs/api/browser/debug), aby zatrzymać test w dowolnym momencie. Pozwala to na otwarcie DevTools, a następnie debugowanie testu poprzez ustawienie punktów przerwania w [zakładce sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Gdy wywołane zostanie polecenie `debug`, w terminalu pojawi się również interfejs repl Node.js, mówiący:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Naciśnij `Ctrl` lub `Command` + `c` lub wprowadź `.exit`, aby kontynuować test.

## Uruchamianie za pomocą Selenium Grid

Jeśli masz skonfigurowaną [Selenium Grid](https://www.selenium.dev/documentation/grid/) i uruchamiasz przeglądarkę przez tę siatkę, musisz ustawić opcję `host` w browser runner, aby umożliwić przeglądarce dostęp do odpowiedniego hosta, na którym są dostarczane pliki testowe, np.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // adres IP sieci maszyny, która uruchamia proces WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Zapewni to, że przeglądarka poprawnie otworzy odpowiednią instancję serwera hostowaną na instancji, która uruchamia testy WebdriverIO.

## Przykłady

Możesz znaleźć różne przykłady testowania komponentów przy użyciu popularnych frameworków komponentów w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples).