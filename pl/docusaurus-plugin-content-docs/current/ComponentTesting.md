---
id: component-testing
title: Testowanie komponentów
description: "Uruchamiaj testy jednostkowe i testy komponentów w prawdziwych przeglądarkach za pomocą WebdriverIO browser runner, opartego na Vite, w tym konfiguracja, środowisko testowe i debugowanie."
---

Dzięki [Browser Runner](/docs/runner#browser-runner) w WebdriverIO możesz uruchamiać testy w prawdziwej przeglądarce desktopowej lub mobilnej, używając WebdriverIO i protokołu WebDriver do automatyzacji i interakcji z tym, co jest renderowane na stronie. Takie podejście ma [wiele zalet](/docs/runner#browser-runner) w porównaniu z innymi frameworkami testowymi, które pozwalają jedynie na testowanie w oparciu o [JSDOM](https://www.npmjs.com/package/jsdom).

## Obsługa przeglądarek

Browser runner wykonuje pakiet testowy w przeglądarce. Ten pakiet działa w Chrome 90, Edge 90, Firefox 90 i Safari 14.1 oraz w nowszych wersjach tych przeglądarek.

Testy end-to-end działają w Node.js. Kod przekazany do [`browser.execute`](/docs/api/browser/execute) jest natomiast wykonywany w automatyzowanej przeglądarce, która może być starsza niż wymienione powyżej wersje. Utrzymuj ten kod na poziomie ES2021.

## Jak to działa?

Browser Runner używa [Vite](https://vitejs.dev/) do renderowania strony testowej i inicjalizacji frameworka testowego, który uruchamia Twoje testy w przeglądarce. Obecnie obsługuje tylko Mocha, ale Jasmine i Cucumber są [w planach](https://github.com/orgs/webdriverio/projects/1). Pozwala to testować dowolne rodzaje komponentów, nawet w projektach, które nie używają Vite.

Serwer Vite jest uruchamiany przez testrunner WebdriverIO i skonfigurowany tak, abyś mógł korzystać ze wszystkich reporterów i usług tak jak w przypadku zwykłych testów e2e. Ponadto inicjalizuje on instancję [`browser`](/docs/api/browser), która umożliwia dostęp do podzbioru [API WebdriverIO](/docs/api) w celu interakcji z dowolnymi elementami na stronie. Podobnie jak w testach e2e, możesz uzyskać dostęp do tej instancji poprzez zmienną `browser` dołączoną do zakresu globalnego lub importując ją z `@wdio/globals`, w zależności od ustawienia [`injectGlobals`](/docs/api/globals).

WebdriverIO ma wbudowaną obsługę następujących frameworków:

- [__Nuxt__](https://nuxt.com/): testrunner WebdriverIO wykrywa aplikację Nuxt i automatycznie konfiguruje composables Twojego projektu oraz pomaga zamockować backend Nuxt; więcej informacji znajdziesz w [dokumentacji Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): testrunner WebdriverIO wykrywa, czy używasz TailwindCSS, i poprawnie ładuje środowisko na stronę testową

## Konfiguracja

Aby skonfigurować WebdriverIO do testów jednostkowych lub testów komponentów w przeglądarce, zainicjuj nowy projekt WebdriverIO za pomocą:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Po uruchomieniu kreatora konfiguracji wybierz `browser`, aby uruchamiać testy jednostkowe i testy komponentów, a następnie wybierz jeden z presetów, jeśli chcesz, lub opcję _"Other"_, jeśli chcesz uruchamiać tylko podstawowe testy jednostkowe. Możesz również skonfigurować własną konfigurację Vite, jeśli już używasz Vite w swoim projekcie. Więcej informacji znajdziesz we wszystkich [opcjach runnera](/docs/runner#runner-options).

:::info

__Uwaga:__ WebdriverIO domyślnie uruchamia testy przeglądarkowe w CI w trybie headless, np. gdy zmienna środowiskowa `CI` jest ustawiona na `'1'` lub `'true'`. Możesz ręcznie skonfigurować to zachowanie za pomocą opcji [`headless`](/docs/runner#headless) runnera.

:::

Na końcu tego procesu powinieneś znaleźć plik `wdio.conf.js`, który zawiera różne konfiguracje WebdriverIO, w tym właściwość `runner`, np.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Definiując różne [capabilities](/docs/configuration#capabilities), możesz uruchamiać testy w różnych przeglądarkach, w razie potrzeby równolegle.

Jeśli nadal nie jesteś pewien, jak wszystko działa, obejrzyj poniższy samouczek o tym, jak zacząć z testowaniem komponentów w WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Środowisko testowe

To całkowicie od Ciebie zależy, co chcesz uruchamiać w swoich testach i jak chcesz renderować komponenty. Zalecamy jednak korzystanie z [Testing Library](https://testing-library.com/) jako frameworka narzędziowego, ponieważ zapewnia wtyczki dla różnych frameworków komponentów, takich jak React, Preact, Svelte i Vue. Jest bardzo przydatny do renderowania komponentów na stronie testowej i automatycznie czyści te komponenty po każdym teście.

Możesz dowolnie łączyć prymitywy Testing Library z poleceniami WebdriverIO, np.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Uwaga:__ używanie metod renderowania z Testing Library pomaga usuwać utworzone komponenty między testami. Jeśli nie używasz Testing Library, upewnij się, że dołączasz swoje komponenty testowe do kontenera, który jest czyszczony między testami.

## Skrypty konfiguracyjne

Możesz przygotować swoje testy, uruchamiając dowolne skrypty w Node.js lub w przeglądarce, np. wstrzykując style, mockując API przeglądarki lub łącząc się z usługą zewnętrzną. [Hooki](/docs/configuration#hooks) WebdriverIO mogą być używane do uruchamiania kodu w Node.js, natomiast [`mochaOpts.require`](/docs/frameworks#require) pozwala importować skrypty do przeglądarki przed załadowaniem testów, np.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // dostarcz skrypt konfiguracyjny do uruchomienia w przeglądarce
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // skonfiguruj środowisko testowe w Node.js
    }
    // ...
}
```

Na przykład, jeśli chcesz zamockować wszystkie wywołania [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) w swoim teście za pomocą następującego skryptu konfiguracyjnego:

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

Teraz w swoich testach możesz dostarczać niestandardowe wartości odpowiedzi dla wszystkich żądań przeglądarki. Więcej o globalnych fixture'ach przeczytasz w [dokumentacji Mocha](https://mochajs.org/#global-fixtures).

## Obserwowanie plików testowych i plików aplikacji

Istnieje wiele sposobów debugowania testów przeglądarkowych. Najprostszym jest uruchomienie testrunnera WebdriverIO z flagą `--watch`, np.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Spowoduje to początkowe uruchomienie wszystkich testów i zatrzymanie się po ich wykonaniu. Następnie możesz wprowadzać zmiany w poszczególnych plikach, które zostaną ponownie uruchomione indywidualnie. Jeśli ustawisz [`filesToWatch`](/docs/configuration#filestowatch) wskazujące na pliki Twojej aplikacji, wszystkie testy zostaną uruchomione ponownie po wprowadzeniu zmian w aplikacji.

## Debugowanie

Chociaż nie jest (jeszcze) możliwe ustawianie punktów przerwania w IDE tak, aby były rozpoznawane przez zdalną przeglądarkę, możesz użyć polecenia [`debug`](/docs/api/browser/debug), aby zatrzymać test w dowolnym momencie. Pozwala to otworzyć DevTools, a następnie debugować test, ustawiając punkty przerwania w [zakładce sources](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Po wywołaniu polecenia `debug` otrzymasz również interfejs REPL Node.js w terminalu z komunikatem:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Naciśnij `Ctrl` lub `Command` + `c` albo wpisz `.exit`, aby kontynuować test.

## Uruchamianie przy użyciu Selenium Grid

Jeśli masz skonfigurowany [Selenium Grid](https://www.selenium.dev/documentation/grid/) i uruchamiasz przeglądarkę za jego pośrednictwem, musisz ustawić opcję `host` browser runnera, aby umożliwić przeglądarce dostęp do właściwego hosta, z którego serwowane są pliki testowe, np.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // adres IP w sieci maszyny, na której działa proces WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Zapewni to, że przeglądarka poprawnie otworzy właściwą instancję serwera hostowaną na maszynie, na której uruchamiane są testy WebdriverIO.

## Przykłady

Różne przykłady testowania komponentów przy użyciu popularnych frameworków komponentów znajdziesz w naszym [repozytorium z przykładami](https://github.com/webdriverio/component-testing-examples).