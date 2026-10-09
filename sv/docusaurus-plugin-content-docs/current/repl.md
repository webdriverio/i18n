---
id: repl
title: REPL-gränssnitt
description: "Använd WebdriverIO REPL för att testa kommandon och felsöka tester interaktivt från kommandoraden eller inifrån ett pågående test."
---

Med `v4.5.0` introducerade WebdriverIO ett [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)-gränssnitt som hjälper dig att inte bara lära dig ramverkets API, utan också felsöka och inspektera dina tester. Det kan användas på flera sätt.

Först kan du använda det som ett CLI-kommando genom att installera `npm install -g @wdio/cli` och starta en WebDriver-session från kommandoraden, t.ex.

```sh
wdio repl chrome
```

Detta öppnar en Chrome-webbläsare som du kan styra med REPL-gränssnittet. Se till att du har en webbläsardrivrutin som körs på port `4444` för att kunna initiera sessionen. Om du har ett konto hos [Sauce Labs](https://saucelabs.com) (eller en annan molnleverantör) kan du också köra webbläsaren direkt i molnet från din kommandorad via:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Om drivrutinen körs på en annan port, t.ex. 9515, kan den anges med kommandoradsargumentet --port eller aliaset -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL kan också köras med capabilities från WebdriverIO:s konfigurationsfil. Wdio stöder ett capabilities-objekt, eller en multi-remote capability-lista eller ett multi-remote-objekt.

Om konfigurationsfilen använder ett capabilities-objekt räcker det att ange sökvägen till konfigurationsfilen. Om det istället är en multi-remote capability anger du vilken capability som ska användas från listan eller multi-remote med hjälp av det positionella argumentet. Obs: för listor använder vi nollbaserat index.

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

WebdriverIO med [multi-remote](https://webdriver.io/docs/multiremote/) capability-objekt:

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

Eller om du vill köra lokala mobiltester med Appium:

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

Detta öppnar en Chrome/Safari-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att kunna initiera sessionen.

```sh
wdio repl './path/to/your_app.apk'
```

Detta öppnar en app-session på ansluten enhet/emulator/simulator. Se till att Appium körs på port `4444` för att kunna initiera sessionen.

Capabilities för iOS-enheter kan anges med argument:

* `-v`      - `platformVersion`: version av Android/iOS-plattformen
* `-d`      - `deviceName`: namn på mobilenheten
* `-u`      - `udid`: udid för riktiga enheter

Användning:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Långa parameternamn', value: 'long'},
    {label: 'Korta parameternamn', value: 'short'}
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

Du kan använda alla alternativ (se `wdio repl --help`) som är tillgängliga för din REPL-session.

### Anslut till en `wdio session`

`wdio repl --session <name>` (alias `-s`) startar ingen webbläsare. Det ansluter REPL till en session som [`wdio session`](/docs/session) redan har öppnat, och när du kopplar från fortsätter sessionen att köras. Hur du pausar en testkörning beskrivs i [Felsök ett test med en session](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

I REPL körs varje rad som `wdio session exec`. `.exit` skriver ut `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Ett annat sätt att använda REPL är inuti dina tester via kommandot [`debug`](/docs/api/browser/debug). Detta stoppar webbläsaren när det anropas och gör det möjligt för dig att hoppa in i applikationen (t.ex. till utvecklarverktygen) eller styra webbläsaren från kommandoraden. Detta är användbart när vissa kommandon inte utlöser en viss åtgärd som förväntat. Med REPL kan du sedan prova kommandona för att se vilka som fungerar mest tillförlitligt.