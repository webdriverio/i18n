---
id: repl
title: Interfejs REPL
---

Od wersji `v4.5.0` WebdriverIO wprowadził interfejs [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), który pomaga nie tylko nauczyć się API frameworka, ale także debugować i analizować testy. Może być używany na wiele sposobów.

Po pierwsze, możesz używać go jako polecenia CLI, instalując `npm install -g @wdio/cli` i uruchamiając sesję WebDrivera z linii poleceń, np.

```sh
wdio repl chrome
```

Otworzy to przeglądarkę Chrome, którą możesz kontrolować za pomocą interfejsu REPL. Upewnij się, że masz uruchomiony sterownik przeglądarki na porcie `4444`, aby zainicjować sesję. Jeśli masz konto [Sauce Labs](https://saucelabs.com) (lub innego dostawcy chmury), możesz również bezpośrednio uruchomić przeglądarkę z linii poleceń w chmurze za pomocą:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Jeśli sterownik działa na innym porcie, np.: 9515, można go przekazać za pomocą argumentu wiersza poleceń --port lub aliasu -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl może być również uruchamiany przy użyciu konfiguracji z pliku konfiguracyjnego webdriverIO. Wdio obsługuje obiekt capabilities; lub listę capabilities multiremote lub obiekt.

Jeśli plik konfiguracyjny używa obiektu capabilities, to wystarczy przekazać ścieżkę do pliku konfiguracyjnego, a jeśli to jest konfiguracja multiremote, to określ, które capabilities użyć z listy lub multiremote za pomocą argumentu pozycyjnego. Uwaga: dla listy używamy indeksu bazującego na zeru.

### Przykład

WebdriverIO z tablicą capability:

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

WebdriverIO z obiektem capability [multiremote](https://webdriver.io/docs/multiremote/):

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

Lub jeśli chcesz uruchomić lokalne testy mobilne za pomocą Appium:

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

Otworzy to sesję Chrome/Safari na podłączonym urządzeniu/emulatorze/symulatorze. Upewnij się, że Appium działa na porcie `4444`, aby zainicjować sesję.

```sh
wdio repl './path/to/your_app.apk'
```

Otworzy to sesję aplikacji na podłączonym urządzeniu/emulatorze/symulatorze. Upewnij się, że Appium działa na porcie `4444`, aby zainicjować sesję.

Konfiguracje dla urządzenia iOS można przekazać za pomocą argumentów:

* `-v`      - `platformVersion`: wersja platformy Android/iOS
* `-d`      - `deviceName`: nazwa urządzenia mobilnego
* `-u`      - `udid`: udid dla rzeczywistych urządzeń

Użycie:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Długie nazwy parametrów', value: 'long'},
    {label: 'Krótkie nazwy parametrów', value: 'short'}
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

Możesz zastosować dowolne opcje (zobacz `wdio repl --help`) dostępne dla Twojej sesji REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Innym sposobem korzystania z REPL jest użycie go wewnątrz testów za pomocą polecenia [`debug`](/docs/api/browser/debug). Zatrzyma to przeglądarkę po wywołaniu i umożliwi przejście do aplikacji (np. do narzędzi programistycznych) lub sterowanie przeglądarką z wiersza poleceń. Jest to pomocne, gdy niektóre polecenia nie wywołują określonej akcji zgodnie z oczekiwaniami. Za pomocą REPL możesz wtedy wypróbować polecenia, aby zobaczyć, które działają najbardziej niezawodnie.