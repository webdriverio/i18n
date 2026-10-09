---
id: repl
title: Interfejs REPL
description: "Użyj REPL WebdriverIO, aby wypróbowywać polecenia i interaktywnie debugować testy z wiersza poleceń lub z poziomu uruchomionego testu."
---

Wraz z `v4.5.0` WebdriverIO wprowadziło interfejs [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), który pomaga nie tylko poznać API frameworka, ale także debugować i analizować testy. Można go używać na wiele sposobów.

Po pierwsze, możesz używać go jako polecenia CLI, instalując `npm install -g @wdio/cli` i uruchamiając sesję WebDriver z wiersza poleceń, np.

```sh
wdio repl chrome
```

Spowoduje to otwarcie przeglądarki Chrome, którą możesz sterować za pomocą interfejsu REPL. Upewnij się, że sterownik przeglądarki działa na porcie `4444`, aby zainicjować sesję. Jeśli masz konto w [Sauce Labs](https://saucelabs.com) (lub u innego dostawcy chmurowego), możesz również bezpośrednio uruchomić przeglądarkę w chmurze z wiersza poleceń za pomocą:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Jeśli sterownik działa na innym porcie, np. 9515, można go przekazać za pomocą argumentu wiersza poleceń --port lub aliasu -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL można również uruchomić przy użyciu capabilities z pliku konfiguracyjnego WebdriverIO. Wdio obsługuje obiekt capabilities lub listę albo obiekt capabilities multi-remote.

Jeśli plik konfiguracyjny używa obiektu capabilities, wystarczy przekazać ścieżkę do pliku konfiguracyjnego. W przeciwnym razie, jeśli są to capabilities multi-remote, określ za pomocą argumentu pozycyjnego, której capability z listy lub z multi-remote użyć. Uwaga: w przypadku listy stosujemy indeksowanie od zera.

### Przykład

WebdriverIO z tablicą capabilities:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO z obiektem capabilities [multi-remote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Lub jeśli chcesz uruchamiać lokalne testy mobilne przy użyciu Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Spowoduje to otwarcie sesji Chrome/Safari na podłączonym urządzeniu/emulatorze/symulatorze. Upewnij się, że Appium działa na porcie `4444`, aby zainicjować sesję.

```sh
wdio repl './path/to/your_app.apk'
```

Spowoduje to otwarcie sesji aplikacji na podłączonym urządzeniu/emulatorze/symulatorze. Upewnij się, że Appium działa na porcie `4444`, aby zainicjować sesję.

Capabilities dla urządzenia iOS można przekazać za pomocą argumentów:

* `-v`      - `platformVersion`: wersja platformy Android/iOS
* `-d`      - `deviceName`: nazwa urządzenia mobilnego
* `-u`      - `udid`: udid dla rzeczywistych urządzeń

Użycie:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Możesz zastosować dowolne opcje (zobacz `wdio repl --help`) dostępne dla twojej sesji REPL.

### Podłączanie do `wdio session`

`wdio repl --session <name>` (alias `-s`) nie uruchamia przeglądarki. Podłącza REPL do sesji, którą [`wdio session`](/docs/session) już otworzyło, a odłączenie pozostawia tę sesję uruchomioną. Wstrzymywanie przebiegu testu zostało opisane w [Debugowanie testu za pomocą sesji](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

W REPL każda linia jest wykonywana jako `wdio session exec`. `.exit` wyświetla `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Innym sposobem korzystania z REPL jest użycie go wewnątrz testów za pomocą polecenia [`debug`](/docs/api/browser/debug). Po jego wywołaniu przeglądarka zostanie zatrzymana, co pozwala zajrzeć do aplikacji (np. do narzędzi deweloperskich) lub sterować przeglądarką z wiersza poleceń. Jest to pomocne, gdy niektóre polecenia nie wywołują określonej akcji zgodnie z oczekiwaniami. Dzięki REPL możesz wtedy wypróbować polecenia, aby sprawdzić, które działają najbardziej niezawodnie.