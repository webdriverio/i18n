---
id: component-testing
title: Testowanie Komponentów
---

Dzięki [Przeglądarkowemu Runnerowi](/docs/runner#browser-runner) WebdriverIO możesz uruchamiać testy w rzeczywistej przeglądarce stacjonarnej lub mobilnej, używając WebdriverIO i protokołu WebDriver do automatyzacji i interakcji z tym, co jest renderowane na stronie. To podejście ma [wiele zalet](/docs/runner#browser-runner) w porównaniu do innych frameworków testowych, które pozwalają testować tylko z użyciem [JSDOM](https://www.npmjs.com/package/jsdom).

## Jak to działa?

Browser Runner używa [Vite](https://vitejs.dev/) do renderowania strony testowej i inicjalizacji frameworka testowego, aby uruchamiać testy w przeglądarce. Obecnie obsługuje tylko Mochę, ale Jasmine i Cucumber są [w planach](https://github.com/orgs/webdriverio/projects/1). Umożliwia to testowanie dowolnych komponentów, nawet dla projektów, które nie używają Vite.

Serwer Vite jest uruchamiany przez testrunner WebdriverIO i skonfigurowany tak, aby można było używać wszystkich reporterów i usług, których używasz do normalnych testów e2e. Ponadto inicjalizuje instancję [`browser`](/docs/api/browser), która pozwala na dostęp do podzbioru [API WebdriverIO](/docs/api) w celu interakcji z dowolnymi elementami na stronie. Podobnie jak w testach e2e, możesz uzyskać dostęp do tej instancji poprzez zmienną `browser` dołączoną do globalnego zakresu lub importując ją z `@wdio/globals`, w zależności od ustawienia [`injectGlobals`](/docs/api/globals).

WebdriverIO ma wbudowane wsparcie dla następujących frameworków:

- [__Nuxt__](https://nuxt.com/): Testrunner WebdriverIO wykrywa aplikację Nuxt i automatycznie konfiguruje composables projektu oraz pomaga w mockowaniu backendu Nuxt, więcej informacji znajdziesz w [dokumentacji Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): Testrunner WebdriverIO wykrywa, czy używasz TailwindCSS i prawidłowo ładuje środowisko do strony testowej

## Konfiguracja

Aby skonfigurować WebdriverIO do testowania jednostkowego lub komponentowego w przeglądarce, zainicjuj nowy projekt WebdriverIO za pomocą:

```bash
npm init wdio@latest ./
# lub
yarn create wdio ./
```

Po uruchomieniu kreatora konfiguracji wybierz `browser` do uruchamiania testów jednostkowych i komponentowych oraz wybierz jeden z presetów, jeśli chcesz, lub wybierz _"Other"_, jeśli chcesz uruchamiać tylko podstawowe testy jednostkowe. Możesz również skonfigurować niestandardową konfigurację Vite, jeśli już używasz Vite w swoim projekcie. Więcej informacji znajdziesz we wszystkich [opcjach runnera](/docs/runner#runner-options).

:::info

__Uwaga:__ WebdriverIO domyślnie uruchamia testy przeglądarkowe w trybie headless w środowisku CI, np. gdy zmienna środowiskowa `CI` jest ustawiona na `'1'` lub `'true'`. Możesz ręcznie skonfigurować to zachowanie za pomocą opcji [`headless`](/docs/runner#headless) dla runnera.

:::

Na końcu tego procesu powinieneś znaleźć `wdio.conf.js`, który zawiera różne konfiguracje WebdriverIO, w tym właściwość `runner`, np.:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Definiując różne [capabilities](/docs/configuration#capabilities), możesz uruchamiać testy w różnych przeglądarkach, równolegle, jeśli chcesz.

Jeśli nadal nie jesteś pewien, jak wszystko działa, obejrzyj poniższy tutorial o tym, jak rozpocząć Testowanie Komponentów w WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

To całkowicie od ciebie zależy, co chcesz uruchamiać w swoich testach i jak chcesz renderować komponenty. Jednakże zalecamy używanie [Testing Library](https://testing-library.com/) jako frameworka narzędziowego, ponieważ oferuje on wtyczki dla różnych frameworków komponentów, takich jak React, Preact, Svelte i Vue. Jest bardzo przydatny do renderowania komponentów na stronie testowej i automatycznie czyści te komponenty po każdym teście.

Możesz łączyć prymitywy z Testing Library z komendami WebdriverIO według uznania, np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Uwaga:__ używanie metod renderowania z Testing Library pomaga usuwać utworzone komponenty między testami. Jeśli nie używasz Testing Library, upewnij się, że dołączasz swoje komponenty testowe do kontenera, który jest czyszczony między testami.

## Skrypty konfiguracyjne

Możesz skonfigurować swoje testy, uruchamiając dowolne skrypty w Node.js lub w przeglądarce, np. wstrzykując style, mockując API przeglądarki lub łącząc się z usługą zewnętrzną. [Hooki](/docs/configuration#hooks) WebdriverIO mogą być używane do uruchamiania kodu w Node.js, podczas gdy opcja [`mochaOpts.require`](/docs/frameworks#require) pozwala importować skrypty do przeglądarki przed załadowaniem testów, np.:

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

Na przykład, jeśli chcesz mockować wszystkie wywołania [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) w swoim teście z następującym skryptem konfiguracyjnym:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// uruchom kod przed załadowaniem wszystkich testów
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // uruchom kod po załadowaniu pliku testowego
}

export const mochaGlobalTeardown = () => {
    // uruchom kod po wykonaniu pliku specyfikacji
}

```

Teraz w swoich testach możesz dostarczyć niestandardowe wartości odpowiedzi dla wszystkich żądań przeglądarki. Przeczytaj więcej o globalnych fixtures w [dokumentacji Mocha](https://mochajs.org/#global-fixtures).

## Obserwowanie plików testowych i aplikacji

Istnieje wiele sposobów, w jakie możesz debugować swoje testy przeglądarkowe. Najłatwiejszy to uruchomienie testowykonawcy WebdriverIO z flagą `--watch`, np.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Spowoduje to początkowe uruchomienie wszystkich testów i zatrzymanie po zakończeniu. Następnie możesz wprowadzać zmiany w poszczególnych plikach, które zostaną ponownie uruchomione indywidualnie. Jeśli ustawisz [`filesToWatch`](/docs/configuration#filestowatch) wskazujący na pliki twojej aplikacji, wszystkie testy zostaną ponownie uruchomione, gdy wprowadzisz zmiany w aplikacji.

## Debugowanie

Chociaż nie jest (jeszcze) możliwe ustawienie punktów przerwania w twoim IDE i ich rozpoznawanie przez zdalną przeglądarkę, możesz użyć komendy [`debug`](/docs/api/browser/debug), aby zatrzymać test w dowolnym momencie. Pozwala to otworzyć DevTools, aby następnie debugować test, ustawiając punkty przerwania w [zakładce źródeł](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Gdy komenda `debug` zostanie wywołana, otrzymasz również interfejs repl Node.js w swoim terminalu, mówiący:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Naciśnij `Ctrl` lub `Command` + `c` lub wprowadź `.exit`, aby kontynuować test.

## Uruchamianie za pomocą Selenium Grid

Jeśli masz skonfigurowany [Selenium Grid](https://www.selenium.dev/documentation/grid/) i uruchamiasz przeglądarkę przez ten grid, musisz ustawić opcję `host` runnera przeglądarki, aby umożliwić przeglądarce dostęp do odpowiedniego hosta, na którym serwowane są pliki testowe, np.:

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