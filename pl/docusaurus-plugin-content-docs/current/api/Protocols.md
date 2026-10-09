---
id: protocols
title: Komendy protokołów
---

WebdriverIO to framework do automatyzacji, który opiera się na różnych protokołach automatyzacji w celu sterowania zdalnym agentem, np. przeglądarką, urządzeniem mobilnym lub telewizorem. W zależności od zdalnego urządzenia w grę wchodzą różne protokoły. Te komendy są przypisywane do obiektu [Browser](/docs/api/browser) lub [Element](/docs/api/element) w zależności od informacji o sesji przekazanych przez zdalny serwer (np. sterownik przeglądarki).

Wewnętrznie WebdriverIO używa komend protokołów do niemal wszystkich interakcji ze zdalnym agentem. Jednak dodatkowe komendy przypisane do obiektu [Browser](/docs/api/browser) lub [Element](/docs/api/element) upraszczają korzystanie z WebdriverIO, np. pobranie tekstu elementu przy użyciu komend protokołu wyglądałoby tak:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Dzięki wygodnym komendom obiektu [Browser](/docs/api/browser) lub [Element](/docs/api/element) można to skrócić do:

```js
$('#lst-ib').getText()
```

W poniższej sekcji wyjaśniono każdy z protokołów.

## WebDriver Protocol

Protokół [WebDriver](https://w3c.github.io/webdriver/#elements) to standard sieciowy do automatyzacji przeglądarek. W przeciwieństwie do niektórych innych narzędzi E2E gwarantuje on, że automatyzacja może odbywać się w rzeczywistych przeglądarkach, z których korzystają Twoi użytkownicy, np. Firefox, Safari i Chrome oraz przeglądarkach opartych na Chromium, takich jak Edge, a nie tylko na silnikach przeglądarek, np. WebKit, które bardzo się od nich różnią.

Zaletą korzystania z protokołu WebDriver w przeciwieństwie do protokołów debugowania, takich jak [Chrome DevTools](https://w3c.github.io/webdriver/#elements), jest to, że masz określony zestaw komend, które pozwalają na interakcję z przeglądarką w taki sam sposób we wszystkich przeglądarkach, co zmniejsza prawdopodobieństwo niestabilności testów. Ponadto protokół ten oferuje możliwość ogromnej skalowalności dzięki dostawcom chmurowym, takim jak [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) i [inni](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## WebDriver Bidi Protocol

Protokół [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) to druga generacja protokołu, nad którą obecnie pracuje większość producentów przeglądarek. W porównaniu ze swoim poprzednikiem protokół obsługuje dwukierunkową komunikację (stąd „Bidi”) między frameworkiem a zdalnym urządzeniem. Wprowadza on ponadto dodatkowe prymitywy umożliwiające lepszą introspekcję przeglądarki, aby skuteczniej automatyzować nowoczesne aplikacje webowe w przeglądarce.

Ponieważ protokół ten jest wciąż w trakcie prac, z czasem będą dodawane kolejne funkcje i obsługiwane przez przeglądarki. Jeśli korzystasz z wygodnych komend WebdriverIO, nic się dla Ciebie nie zmieni. WebdriverIO będzie korzystać z nowych możliwości protokołu, gdy tylko będą one dostępne i obsługiwane w przeglądarce.

## Appium

Projekt [Appium](https://appium.io/) zapewnia możliwość automatyzacji urządzeń mobilnych, desktopowych i wszelkiego rodzaju urządzeń IoT. Podczas gdy WebDriver koncentruje się na przeglądarkach i sieci, wizją Appium jest stosowanie tego samego podejścia, ale dla dowolnego urządzenia. Oprócz komend zdefiniowanych przez WebDriver posiada on specjalne komendy, które często są specyficzne dla automatyzowanego zdalnego urządzenia. W scenariuszach testów mobilnych jest to idealne rozwiązanie, gdy chcesz pisać i uruchamiać te same testy zarówno dla aplikacji na Androida, jak i iOS.

Zgodnie z [dokumentacją](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) Appium został zaprojektowany tak, aby sprostać potrzebom automatyzacji mobilnej zgodnie z filozofią opisaną przez następujące cztery zasady:

- Nie powinno być konieczne ponowne kompilowanie aplikacji ani jej jakakolwiek modyfikacja w celu jej automatyzacji.
- Nie powinieneś być ograniczony do konkretnego języka lub frameworka, aby pisać i uruchamiać swoje testy.
- Framework do automatyzacji mobilnej nie powinien wymyślać koła na nowo, jeśli chodzi o API automatyzacji.
- Framework do automatyzacji mobilnej powinien być open source, zarówno w duchu i praktyce, jak i z nazwy!

## Chromium

Protokół Chromium oferuje nadzbiór komend w stosunku do protokołu WebDriver, obsługiwany wyłącznie podczas uruchamiania zautomatyzowanej sesji za pośrednictwem [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) lub [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Protokół Firefox oferuje nadzbiór komend w stosunku do protokołu WebDriver, obsługiwany wyłącznie podczas uruchamiania zautomatyzowanej sesji za pośrednictwem [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Protokół [Sauce Labs](https://saucelabs.com/) oferuje nadzbiór komend w stosunku do protokołu WebDriver, obsługiwany wyłącznie podczas uruchamiania zautomatyzowanej sesji w chmurze Sauce Labs.

## Selenium Standalone

Protokół [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) oferuje nadzbiór komend w stosunku do protokołu WebDriver, obsługiwany wyłącznie podczas uruchamiania zautomatyzowanej sesji przy użyciu Selenium Grid.