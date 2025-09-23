---
id: testrunner
title: Testrunner
---

WebdriverIO dostarcza własny testrunner, aby pomóc Ci rozpocząć testowanie tak szybko, jak to możliwe. Ma on wykonywać za Ciebie całą pracę, umożliwia integrację z usługami firm trzecich i pomaga uruchamiać testy tak efektywnie, jak to tylko możliwe.

Testrunner WebdriverIO jest dostępny osobno w pakiecie NPM `@wdio/cli`.

Zainstaluj go w następujący sposób:

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

Świetnie! Teraz musisz zdefiniować plik konfiguracyjny, w którym ustawione są wszystkie informacje o Twoich testach, możliwościach i ustawieniach. Przejdź do sekcji [Plik konfiguracyjny](/docs/configuration), aby zobaczyć, jak powinien wyglądać ten plik.

Dzięki pomocnikowi konfiguracji `wdio` wygenerowanie pliku konfiguracyjnego jest bardzo proste. Wystarczy uruchomić:

```sh
$ npx wdio config
```

...a uruchomi się narzędzie pomocnicze.

Zada Ci pytania i wygeneruje plik konfiguracyjny w mniej niż minutę.

![Narzędzie konfiguracyjne WDIO](/img/config-utility.gif)

Po skonfigurowaniu pliku konfiguracyjnego możesz rozpocząć testy, uruchamiając:

```sh
npx wdio run wdio.conf.js
```

Możesz również zainicjować uruchomienie testu bez polecenia `run`:

```sh
npx wdio wdio.conf.js
```

To wszystko! Teraz możesz uzyskać dostęp do instancji selenium za pośrednictwem zmiennej globalnej `browser`.

## Polecenia

### `wdio config`

Polecenie `config` uruchamia pomocnika konfiguracji WebdriverIO. Ten pomocnik zada Ci kilka pytań na temat Twojego projektu WebdriverIO i stworzy plik `wdio.conf.js` na podstawie Twoich odpowiedzi.

Przykład:

```sh
wdio config
```

Opcje:

```
--help            wyświetla menu pomocy WebdriverIO                            [boolean]
--npm             Czy instalować pakiety za pomocą NPM zamiast yarn            [boolean]
```

### `wdio run`

> To jest domyślne polecenie do uruchamiania konfiguracji.

Polecenie `run` inicjalizuje plik konfiguracyjny WebdriverIO i uruchamia Twoje testy.

Przykład:

```sh
wdio run ./wdio.conf.js --watch
```

Opcje:

```
--help                wyświetla menu pomocy WebdriverIO               [boolean]
--version             wyświetla wersję WebdriverIO                    [boolean]
--hostname, -h        adres hosta sterownika automatyzacji             [string]
--port, -p            port sterownika automatyzacji                    [number]
--user, -u            nazwa użytkownika, jeśli korzystasz z usługi chmurowej jako backendu automatyzacji
                                                                        [string]
--key, -k             odpowiedni klucz dostępu dla użytkownika         [string]
--watch               obserwuj zmiany w specyfikacjach                [boolean]
--logLevel, -l        poziom szczegółowości logowania
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                zatrzymanie test runnera po określonej liczbie testów, które
                        nie powiodły się                                [number]
--baseUrl             skracanie wywołań poleceń url poprzez ustawienie url bazowego [string]
--waitforTimeout, -w  limit czasu dla wszystkich poleceń waitForXXX     [number]
--framework, -f       określa framework (Mocha, Jasmine lub Cucumber) do
                        uruchamiania specyfikacji                       [string]
--reporters, -r       reportery do wyświetlania wyników w stdout         [array]
--suite               nadpisuje atrybut specs i uruchamia zdefiniowany
                        zestaw                                           [array]
--spec                uruchamia określony plik specyfikacji lub symbole wieloznaczne - nadpisuje specs przekazane
                        ze stdin                                         [array]
--exclude             wyklucza pliki specyfikacji z uruchomienia - nadpisuje specs przekazane
                        ze stdin                                         [array]
--repeat              Powtarza określone specyfikacje i/lub zestawy N razy [number]
--mochaOpts           Opcje Mocha
--jasmineOpts         Opcje Jasmine
--cucumberOpts        Opcje Cucumber
--tsConfigPath        Niestandardowa ścieżka dla `tsconfig.json` lub użyj [tsConfigPath setting](/docs/configurationfile) w konfiguracji wdio
```

> Uwaga: Autokompilacja może być łatwo kontrolowana za pomocą zmiennych środowiskowych `tsx`. Zobacz również [dokumentację TypeScript](/docs/typescript).

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

Możesz również przekazać niestandardową ścieżkę konfiguracji, jeśli Twój plik konfiguracyjny WDIO nie znajduje się w tym samym folderze, w którym pracujesz:

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

Polecenie repl pozwala uruchomić interaktywny interfejs wiersza poleceń do uruchamiania poleceń WebdriverIO. Może być używane do celów testowych lub po prostu do szybkiego uruchomienia sesji WebdriverIO.

Uruchom testy w lokalnym chrome:

```sh
wdio repl chrome
```

lub uruchom testy na Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Możesz zastosować te same argumenty, co w [poleceniu run](#wdio-run).