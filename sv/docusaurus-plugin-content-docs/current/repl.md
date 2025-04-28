---
id: repl
title: REPL gränssnitt
---

Med `v4.5.0` introducerade WebdriverIO ett [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) gränssnitt som hjälper dig att inte bara lära dig ramverkets API, utan också felsöka och inspektera dina tester. Det kan användas på flera sätt.

Först kan du använda det som CLI-kommando genom att installera `npm install -g @wdio/cli` och starta en WebDriver-session från kommandoraden, t.ex.

```sh
wdio repl chrome
```

Detta skulle öppna en Chrome-webbläsare som du kan kontrollera med REPL-gränssnittet. Se till att du har en webbläsardriver som körs på port `4444` för att initiera sessionen. Om du har ett [Sauce Labs](https://saucelabs.com) (eller annan molnleverantör) konto, kan du också köra webbläsaren direkt från kommandoraden i molnet via:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Om drivrutinen körs på en annan port t.ex.: 9515, kan den skickas med kommandoradsargumentet --port eller alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl kan också köras med kapaciteter från WebdriverIO-konfigurationsfilen. Wdio stöder kapacitetsobjekt; eller; multiremote kapacitetslista eller objekt.

Om konfigurationsfilen använder kapacitetsobjekt, skicka då bara sökvägen till konfigurationsfilen, annars om det är en multiremote kapacitet, specificera vilken kapacitet som ska användas från listan eller multiremote med positionsargumentet. Obs: för listor använder vi nollbaserat index.

### Exempel

WebdriverIO med kapacitetsarray:

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

WebdriverIO med [multiremote](https://webdriver.io/docs/multiremote/) kapacitetsobjekt:

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

Eller om du vill köra lokala mobila tester med Appium:

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

Detta skulle öppna Chrome/Safari-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att initiera sessionen.

```sh
wdio repl './path/to/your_app.apk'
```

Detta skulle öppna app-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att initiera sessionen.

Kapaciteter för iOS-enheter kan skickas med argument:

* `-v`      - `platformVersion`: version av Android/iOS-plattform
* `-d`      - `deviceName`: namn på mobil enhet
* `-u`      - `udid`: udid för fysiska enheter

Användning:

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

Du kan tillämpa alla alternativ (se `wdio repl --help`) som finns tillgängliga för din REPL-session.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Ett annat sätt att använda REPL är inuti dina tester via [`debug`](/docs/api/browser/debug)-kommandot. Detta kommer att stoppa webbläsaren när det anropas, och ger dig möjlighet att hoppa in i applikationen (t.ex. till utvecklarverktygen) eller kontrollera webbläsaren från kommandoraden. Detta är användbart när vissa kommandon inte utlöser en viss åtgärd som förväntat. Med REPL kan du sedan prova kommandon för att se vilka som fungerar mest tillförlitligt.