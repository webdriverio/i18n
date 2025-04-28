---
id: repl
title: REPL-gränssnitt
---

Med `v4.5.0` introducerade WebdriverIO ett [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)-gränssnitt som hjälper dig att inte bara lära dig ramverkets API, utan också felsöka och inspektera dina tester. Det kan användas på flera sätt.

Först kan du använda det som CLI-kommando genom att installera `npm install -g @wdio/cli` och starta en WebDriver-session från kommandoraden, t.ex.

```sh
wdio repl chrome
```

Detta skulle öppna en Chrome-webbläsare som du kan kontrollera med REPL-gränssnittet. Se till att du har en webbläsardrivrutin som körs på port `4444` för att kunna starta sessionen. Om du har ett [Sauce Labs](https://saucelabs.com) (eller annan molnleverantör) konto, kan du även direkt köra webbläsaren på din kommandorad i molnet via:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Om drivrutinen körs på en annan port, t.ex. 9515, kan det skickas med kommandoradsargumentet --port eller alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl kan också köras med hjälp av funktionerna från webdriverIO-konfigurationsfilen. Wdio stöder capabilities-objekt; eller multiremote capability-lista eller objekt.

Om konfigurationsfilen använder capabilities-objekt så skicka bara sökvägen till konfigurationsfilen, annars om det är en multiremote capability, specificera vilken capability som ska användas från listan eller multiremote med hjälp av positionsargumentet. Obs: för listor använder vi nollbaserat index.

### Exempel

WebdriverIO med capability-array:

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

WebdriverIO med [multiremote](https://webdriver.io/docs/multiremote/) capability-objekt:

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

Eller om du vill köra lokala mobila tester med hjälp av Appium:

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

Detta skulle öppna Chrome/Safari-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att starta sessionen.

```sh
wdio repl './path/to/your_app.apk'
```

Detta skulle öppna en App-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att starta sessionen.

Capabilities för iOS-enheter kan skickas med argument:

* `-v`      - `platformVersion`: version av Android/iOS-plattform
* `-d`      - `deviceName`: namnet på mobilenheten
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

Du kan tillämpa alla tillgängliga alternativ (se `wdio repl --help`) för din REPL-session.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Ett annat sätt att använda REPL är inuti dina tester via [`debug`](/docs/api/browser/debug)-kommandot. Detta kommer att stoppa webbläsaren när den anropas, och gör det möjligt för dig att hoppa in i applikationen (t.ex. till utvecklarverktygen) eller kontrollera webbläsaren från kommandoraden. Detta är användbart när vissa kommandon inte utlöser en viss åtgärd som förväntat. Med REPL kan du sedan prova kommandona för att se vilka som fungerar mest tillförlitligt.