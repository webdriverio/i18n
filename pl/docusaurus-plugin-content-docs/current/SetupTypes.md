---
id: setuptypes
title: Rodzaje konfiguracji
description: "Porównaj sposoby korzystania z WebdriverIO, od surowych powiązań protokołu, przez tryb standalone, po testrunner WDIO, i wybierz właściwy."
---

WebdriverIO może być używany do różnych celów. Implementuje API protokołu WebDriver i może uruchamiać przeglądarkę w sposób zautomatyzowany. Framework został zaprojektowany tak, aby działał w dowolnym środowisku i przy każdym rodzaju zadania. Jest niezależny od jakichkolwiek frameworków zewnętrznych i do działania wymaga jedynie Node.js.

## Powiązania protokołu

Do podstawowych interakcji z protokołem WebDriver WebdriverIO używa własnych powiązań protokołu opartych na pakiecie NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Wszystkie [polecenia protokołu](api/webdriver) zwracają surową odpowiedź ze sterownika automatyzacji. Pakiet jest bardzo lekki i __nie__ zawiera żadnej inteligentnej logiki, takiej jak automatyczne oczekiwanie, która upraszczałaby korzystanie z protokołu.

Polecenia protokołu dodawane do instancji zależą od początkowej odpowiedzi sesji sterownika. Na przykład, jeśli odpowiedź wskazuje, że uruchomiono sesję mobilną, pakiet dodaje polecenia Appium do prototypu instancji.

Więcej informacji na temat interfejsu pakietu `webdriver` znajdziesz w [Modules API](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) nie jest protokołem automatyzacji. Jest to interfejs debugowania do obserwowania przebiegu testów na żywo i późniejszego odtwarzania śladów (traces).

## Tryb standalone

Aby uprościć interakcję z protokołem WebDriver, pakiet `webdriverio` implementuje różnorodne polecenia działające w oparciu o protokół (np. polecenie [`dragAndDrop`](api/element/dragAndDrop)) oraz kluczowe koncepcje, takie jak [inteligentne selektory](selectors) czy [automatyczne oczekiwanie](autowait). Powyższy przykład można uprościć w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Używanie WebdriverIO w trybie standalone nadal daje dostęp do wszystkich poleceń protokołu, ale zapewnia również nadzbiór dodatkowych poleceń, które umożliwiają interakcję z przeglądarką na wyższym poziomie. Pozwala to zintegrować to narzędzie automatyzacji z własnym projektem (testowym) w celu stworzenia nowej biblioteki automatyzacji. Popularne przykłady to [Oxygen](https://github.com/oxygenhq/oxygen) lub [CodeceptJS](http://codecept.io). Możesz także pisać zwykłe skrypty Node do pobierania treści ze stron internetowych (lub do czegokolwiek innego, co wymaga uruchomionej przeglądarki).

Jeśli nie ustawiono żadnych konkretnych opcji, WebdriverIO zawsze spróbuje pobrać i skonfigurować sterownik przeglądarki odpowiadający właściwości `browserName` w Twoich capabilities. W przypadku Chrome i Firefox może również je zainstalować, w zależności od tego, czy uda mu się znaleźć odpowiednią przeglądarkę na komputerze.

Więcej informacji na temat interfejsów pakietu `webdriverio` znajdziesz w [Modules API](/docs/api/modules).

## Testrunner WDIO

Głównym celem WebdriverIO są jednak testy end-to-end na dużą skalę. Dlatego zaimplementowaliśmy test runner, który pomaga zbudować niezawodny zestaw testów, łatwy do czytania i utrzymania.

Test runner rozwiązuje wiele problemów, które są powszechne podczas pracy ze zwykłymi bibliotekami automatyzacji. Po pierwsze, organizuje przebiegi testów i dzieli specyfikacje testów, dzięki czemu testy mogą być wykonywane z maksymalną współbieżnością. Zajmuje się także zarządzaniem sesjami i zapewnia wiele funkcji pomagających debugować problemy i znajdować błędy w testach.

Oto ten sam przykład co powyżej, napisany jako specyfikacja testu i wykonany przez WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Test runner jest abstrakcją popularnych frameworków testowych, takich jak Mocha, Jasmine czy Cucumber. Aby uruchomić testy za pomocą test runnera WDIO, zapoznaj się z sekcją [Pierwsze kroki](gettingstarted), aby uzyskać więcej informacji.

Więcej informacji na temat interfejsu pakietu testrunnera `@wdio/cli` znajdziesz w [Modules API](/docs/api/modules).