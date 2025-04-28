---
id: protocols
title: Komendy Protokołu
---

WebdriverIO to framework automatyzacyjny, który opiera się na różnych protokołach automatyzacji do kontrolowania zdalnego agenta, np. przeglądarki, urządzenia mobilnego lub telewizora. W zależności od zdalnego urządzenia wykorzystywane są różne protokoły. Te komendy są przypisywane do obiektów [Browser](/docs/api/browser) lub [Element](/docs/api/element) w zależności od informacji sesji z serwera zdalnego (np. sterownika przeglądarki).

Wewnętrznie WebdriverIO używa komend protokołu do prawie wszystkich interakcji ze zdalnym agentem. Jednak dodatkowe komendy przypisane do obiektów [Browser](/docs/api/browser) lub [Element](/docs/api/element) upraszczają korzystanie z WebdriverIO, np. pobieranie tekstu elementu za pomocą komend protokołu wyglądałoby tak:

```js
const searchInput = await browser.findElement('css selector', '#lst-ib')
await client.getElementText(searchInput['element-6066-11e4-a52e-4f735466cecf'])
```

Używając wygodnych komend obiektu [Browser](/docs/api/browser) lub [Element](/docs/api/element) można to zredukować do:

```js
$('#lst-ib').getText()
```

Poniższa sekcja wyjaśnia każdy z protokołów.

## Protokół WebDriver

[WebDriver](https://w3c.github.io/webdriver/#elements) to standard sieciowy do automatyzacji przeglądarek. W przeciwieństwie do niektórych innych narzędzi E2E gwarantuje, że automatyzacja może być wykonywana na rzeczywistych przeglądarkach używanych przez użytkowników, np. Firefox, Safari i Chrome oraz przeglądarkach opartych na Chromium, takich jak Edge, a nie tylko na silnikach przeglądarek, np. WebKit, które są bardzo różne.

Zaletą korzystania z protokołu WebDriver w przeciwieństwie do protokołów debugowania, takich jak [Chrome DevTools](https://w3c.github.io/webdriver/#elements), jest posiadanie określonego zestawu poleceń, które pozwalają na interakcję z przeglądarką w ten sam sposób we wszystkich przeglądarkach, co zmniejsza prawdopodobieństwo niestabilności. Ponadto protokół ten oferuje możliwości masowej skalowalności dzięki wykorzystaniu dostawców chmurowych, takich jak [Sauce Labs](https://saucelabs.com/), [BrowserStack](https://www.browserstack.com/) i [innych](https://github.com/christian-bromann/awesome-selenium#cloud-services).

## Protokół WebDriver Bidi

Protokół [WebDriver Bidi](https://w3c.github.io/webdriver-bidi/) to druga generacja protokołu, nad którą obecnie pracuje większość producentów przeglądarek. W porównaniu do poprzednika, protokół ten obsługuje dwukierunkową komunikację (stąd "Bidi") między frameworkiem a zdalnym urządzeniem. Ponadto wprowadza dodatkowe prymitywy dla lepszej inspekcji przeglądarki, aby lepiej automatyzować nowoczesne aplikacje internetowe w przeglądarkach.

Ponieważ ten protokół jest obecnie w trakcie rozwoju, z czasem będzie dodawanych więcej funkcji, które będą obsługiwane przez przeglądarki. Jeśli używasz wygodnych komend WebdriverIO, nic się dla Ciebie nie zmieni. WebdriverIO będzie korzystać z tych nowych możliwości protokołu, gdy tylko będą dostępne i obsługiwane w przeglądarce.

## Appium

Projekt [Appium](https://appium.io/) zapewnia możliwości automatyzacji urządzeń mobilnych, komputerów stacjonarnych i wszystkich innych rodzajów urządzeń IoT. Podczas gdy WebDriver koncentruje się na przeglądarkach i sieci, wizją Appium jest zastosowanie tego samego podejścia, ale dla dowolnego urządzenia. Oprócz poleceń, które definiuje WebDriver, ma specjalne polecenia, które często są specyficzne dla zdalnego urządzenia, które jest automatyzowane. Dla scenariuszy testowania mobilnego jest to idealne, gdy chcesz pisać i uruchamiać te same testy zarówno dla aplikacji Android, jak i iOS.

Zgodnie z [dokumentacją](https://appium.github.io/appium.io/docs/en/about-appium/intro/?lang=en) Appium został zaprojektowany, aby spełnić potrzeby automatyzacji mobilnej zgodnie z filozofią opisaną przez następujące cztery zasady:

- Nie powinieneś musieć ponownie kompilować swojej aplikacji ani modyfikować jej w żaden sposób, aby ją zautomatyzować.
- Nie powinieneś być zmuszony do używania konkretnego języka lub frameworka do pisania i uruchamiania swoich testów.
- Framework automatyzacji mobilnej nie powinien wymyślać koła na nowo, jeśli chodzi o API automatyzacji.
- Framework automatyzacji mobilnej powinien być open source, zarówno w duchu, jak i w praktyce, a także z nazwy!

## Chromium

Protokół Chromium oferuje rozszerzony zestaw komend na bazie protokołu WebDriver, który jest obsługiwany tylko podczas uruchamiania zautomatyzowanych sesji przez [Chromedriver](https://chromedriver.chromium.org/chromedriver-canary) lub [Edgedriver](https://developer.microsoft.com/fr-fr/microsoft-edge/tools/webdriver).

## Firefox

Protokół Firefox oferuje rozszerzony zestaw komend na bazie protokołu WebDriver, który jest obsługiwany tylko podczas uruchamiania zautomatyzowanych sesji przez [Geckodriver](https://github.com/mozilla/geckodriver).

## Sauce Labs

Protokół [Sauce Labs](https://saucelabs.com/) oferuje rozszerzony zestaw komend na bazie protokołu WebDriver, który jest obsługiwany tylko podczas uruchamiania zautomatyzowanych sesji za pomocą chmury Sauce Labs.

## Selenium Standalone

Protokół [Selenium Standalone](https://www.selenium.dev/documentation/grid/advanced_features/endpoints/) oferuje rozszerzony zestaw komend na bazie protokołu WebDriver, który jest obsługiwany tylko podczas uruchamiania zautomatyzowanych sesji za pomocą Selenium Grid.

## Protokół JSON Wire

[Protokół JSON Wire](https://www.selenium.dev/documentation/legacy/json_wire_protocol/) to poprzednik protokołu WebDriver i jest __przestarzały__ obecnie. Chociaż niektóre komendy mogą być nadal obsługiwane w niektórych środowiskach, nie zaleca się używania żadnej z jego komend.

## Protokół Mobile JSON Wire

[Protokół Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) to rozszerzony zestaw komend mobilnych na bazie protokołu JSON Wire. Ponieważ ten ostatni jest przestarzały, protokół Mobile JSON Wire również stał się __przestarzały__. Appium może nadal obsługiwać niektóre z jego komend, ale nie zaleca się ich używania.