---
id: setuptypes
title: Typy konfiguracji
---

WebdriverIO może być używany do różnych celów. Implementuje API protokołu WebDriver i może uruchamiać przeglądarkę w sposób zautomatyzowany. Framework jest zaprojektowany do pracy w dowolnym środowisku i do dowolnych zadań. Jest niezależny od jakichkolwiek zewnętrznych frameworków i wymaga jedynie Node.js do uruchomienia.

## Wiązania protokołów

Do podstawowych interakcji z WebDriverem i innymi protokołami automatyzacji, WebdriverIO używa własnych wiązań protokołów opartych na pakiecie NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Wszystkie [polecenia protokołu](api/webdriver) zwracają surową odpowiedź z drivera automatyzacji. Pakiet jest bardzo lekki i __nie zawiera__ inteligentnej logiki, takiej jak automatyczne oczekiwania, aby uprościć interakcję z protokołem.

Polecenia protokołu zastosowane do instancji zależą od początkowej odpowiedzi sesji drivera. Na przykład, jeśli odpowiedź wskazuje, że rozpoczęto sesję mobilną, pakiet zastosuje wszystkie polecenia protokołu Appium i Mobile JSON Wire do prototypu instancji.

Możesz uruchomić ten sam zestaw poleceń (z wyjątkiem mobilnych) za pomocą protokołu Chrome DevTools, importując pakiet NPM [`devtools`](https://www.npmjs.com/package/devtools). Ma on ten sam interfejs co pakiet `webdriver`, ale uruchamia automatyzację na podstawie [Puppeteer](https://pptr.dev/).

Więcej informacji na temat interfejsów tych pakietów znajdziesz w [API modułów](/docs/api/modules).

## Tryb samodzielny

Aby uprościć interakcję z protokołem WebDriver, pakiet `webdriverio` implementuje różne polecenia na podstawie protokołu (np. polecenie [`dragAndDrop`](api/element/dragAndDrop)) i podstawowe koncepcje, takie jak [inteligentne selektory](selectors) lub [automatyczne oczekiwania](autowait). Przykład z powyżej można uprościć w następujący sposób:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Korzystanie z WebdriverIO w trybie samodzielnym nadal daje dostęp do wszystkich poleceń protokołu, ale zapewnia nadrzędny zestaw dodatkowych poleceń, które zapewniają interakcję z przeglądarką na wyższym poziomie. Pozwala to zintegrować to narzędzie automatyzacji w swoim własnym projekcie (testowym), aby stworzyć nową bibliotekę automatyzacji. Popularne przykłady to [Oxygen](https://github.com/oxygenhq/oxygen) lub [CodeceptJS](http://codecept.io). Możesz także pisać zwykłe skrypty Node do przeszukiwania sieci w poszukiwaniu treści (lub do czegokolwiek innego, co wymaga uruchomionej przeglądarki).

Jeśli nie ustawiono określonych opcji, WebdriverIO zawsze będzie próbować pobrać i skonfigurować sterownik przeglądarki, który pasuje do właściwości `browserName` w Twoich możliwościach. W przypadku Chrome i Firefox może również zainstalować je, w zależności od tego, czy może znaleźć odpowiednią przeglądarkę na maszynie.

Więcej informacji na temat interfejsów pakietu `webdriverio` znajdziesz w [API modułów](/docs/api/modules).

## Testrunner WDIO

Głównym celem WebdriverIO jest jednak testowanie end-to-end na dużą skalę. Dlatego zaimplementowaliśmy test runner, który pomaga w budowaniu niezawodnego zestawu testów, który jest łatwy do czytania i utrzymania.

Test runner rozwiązuje wiele problemów, które są powszechne podczas pracy z prostymi bibliotekami automatyzacji. Po pierwsze, organizuje wykonywanie testów i dzieli testy na specyfikacje, aby testy mogły być wykonywane z maksymalną współbieżnością. Obsługuje również zarządzanie sesjami i oferuje wiele funkcji, które pomagają w debugowaniu problemów i znajdowaniu błędów w testach.

Oto ten sam przykład co powyżej, zapisany jako specyfikacja testu i uruchomiony przez WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Test runner jest abstrakcją popularnych frameworków testowych, takich jak Mocha, Jasmine lub Cucumber. Aby uruchomić testy za pomocą test runnera WDIO, sprawdź sekcję [Pierwsze kroki](gettingstarted), aby uzyskać więcej informacji.

Więcej informacji na temat interfejsu pakietu testrunner `@wdio/cli` znajdziesz w [API modułów](/docs/api/modules).