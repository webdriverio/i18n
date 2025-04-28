---
id: testrunner
title: Testrunner
---

WebdriverIO jest dostarczany z własnym narzędziem do testowania, które pomaga szybko rozpocząć testy. Ma na celu wykonywanie całej pracy za ciebie, umożliwia integrację z usługami zewnętrznymi i pomaga uruchamiać testy w jak najbardziej efektywny sposób.

Narzędzie testowe WebdriverIO jest dostępne osobno w pakiecie NPM `@wdio/cli`.

Zainstaluj je w następujący sposób:

```sh npm2yarn
npm install @wdio/cli
```

Aby zobaczyć pomoc interfejsu wiersza poleceń, wpisz następujące polecenie w terminalu:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Świetnie! Teraz musisz zdefiniować plik konfiguracyjny, w którym znajdują się wszystkie informacje o testach, możliwościach i ustawieniach. Przejdź do sekcji [Plik konfiguracyjny](/docs/configuration), aby zobaczyć, jak powinien wyglądać ten plik.

Dzięki narzędziu konfiguracyjnemu `wdio` bardzo łatwo jest wygenerować plik konfiguracyjny. Po prostu uruchom:

```sh
$ npx wdio config
```

...i uruchomi się narzędzie pomocnicze.

Zada Ci pytania i wygeneruje plik konfiguracyjny w mniej niż minutę.

![Narzędzie konfiguracyjne WDIO](/img/config-utility.gif)

Gdy plik konfiguracyjny jest już gotowy, możesz uruchomić testy za pomocą polecenia:

```sh
npx wdio run wdio.conf.js
```

Możesz również zainicjować uruchomienie testu bez polecenia `run`:

```sh
npx wdio wdio.conf.js
```

To wszystko! Teraz możesz uzyskać dostęp do instancji selenium za pomocą zmiennej globalnej `browser`.

## Polecenia

### `wdio config`

Polecenie `config` uruchamia narzędzie pomocnicze konfiguracji WebdriverIO. Narzędzie to zada kilka pytań dotyczących projektu WebdriverIO i utworzy plik `wdio.conf.js` na podstawie twoich odpowiedzi.

Przykład:

```sh
wdio config
```

Opcje:

```
--help            wyświetla menu pomocy WebdriverIO                          [boolean]
--npm             Czy instalować pakiety za pomocą NPM zamiast yarn          [boolean]
```

### `wdio run`

> To jest domyślne polecenie do uruchamiania konfiguracji.

Polecenie `run` inicjalizuje plik konfiguracyjny WebdriverIO i uruchamia testy.

Przykład:

```sh
wdio run ./wdio.conf.js --watch
```

Opcje:

```
--help                wyświetla menu pomocy WebdriverIO            [boolean]
--version             wyświetla wersję WebdriverIO                 [boolean]
--hostname, -h        adres hosta sterownika automatyzacji          [string]
--port, -p            port sterownika automatyzacji                 [number]
--user, -u            nazwa użytkownika w przypadku korzystania z usługi chmurowej
                      jako backend automatyzacji                     [string]
--key, -k             odpowiedni klucz dostępu dla użytkownika      [string]
--watch               obserwuj specyfikacje pod kątem zmian        [boolean]
--logLevel, -l        poziom szczegółowości logowania
                      [wybór: "trace", "debug", "info", "warn", "error", "silent"]
--bail                zatrzymaj uruchamianie testów po niepowodzeniu określonej
                      liczby testów                                  [number]
--baseUrl             skróć wywołania poleceń url, ustawiając podstawowy url
                                                                     [string]
--waitforTimeout, -w  timeout dla wszystkich poleceń waitForXXX      [number]
--framework, -f       definiuje framework (Mocha, Jasmine lub Cucumber) do
                      uruchamiania specyfikacji                      [string]
--reporters, -r       reportery do wyświetlania wyników na stdout     [array]
--suite               nadpisuje atrybut specs i uruchamia zdefiniowany
                      zestaw                                          [array]
--spec                uruchom określony plik specyfikacji lub charaktery
                      wieloznaczne - nadpisuje specyfikacje przekazane
                      ze stdin                                        [array]
--exclude             wyklucz plik(i) specyfikacji z uruchomienia - nadpisuje
                      specyfikacje przekazane ze stdin                [array]
--repeat              Powtórz określone specyfikacje i/lub zestawy N razy
                                                                     [number]
--mochaOpts           Opcje Mocha
--jasmineOpts         Opcje Jasmine
--cucumberOpts        Opcje Cucumber
```

> Uwaga: Autokompilacją można łatwo sterować za pomocą zmiennych środowiskowych `tsx`. Zobacz również [dokumentację TypeScript](/docs/typescript).

### `wdio install`
Polecenie `install` pozwala dodawać reportery i usługi do projektów WebdriverIO za pomocą CLI.

Przykład:

```sh
wdio install service sauce # instaluje @wdio/sauce-service
wdio install reporter dot # instaluje @wdio/dot-reporter
wdio install framework mocha # instaluje @wdio/mocha-framework
```

Jeśli chcesz zainstalować pakiety za pomocą `yarn` zamiast tego, możesz przekazać flagę `--yarn` do polecenia:

```sh
wdio install service sauce --yarn
```

Możesz również przekazać niestandardową ścieżkę konfiguracji, jeśli Twój plik konfiguracyjny WDIO nie znajduje się w tym samym folderze, nad którym pracujesz:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Lista obsługiwanych usług

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Lista obsługiwanych reporterów

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Lista obsługiwanych frameworków

```
mocha
jasmine
cucumber
```

### `wdio repl`

Polecenie repl pozwala uruchomić interaktywny interfejs wiersza poleceń do wykonywania poleceń WebdriverIO. Może być używane do celów testowych lub do szybkiego uruchomienia sesji WebdriverIO.

Uruchom testy w lokalnym chromie:

```sh
wdio repl chrome
```

lub uruchom testy na Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Możesz zastosować te same argumenty, które możesz użyć w [poleceniu run](#wdio-run).