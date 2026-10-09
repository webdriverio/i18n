---
id: repl
title: REPL-Schnittstelle
description: "Verwenden Sie die WebdriverIO REPL, um Befehle auszuprobieren und Tests interaktiv über die Kommandozeile oder innerhalb eines laufenden Tests zu debuggen."
---

Mit `v4.5.0` hat WebdriverIO eine [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)-Schnittstelle eingeführt, die Ihnen nicht nur hilft, die Framework-API zu lernen, sondern auch Ihre Tests zu debuggen und zu untersuchen. Sie kann auf verschiedene Arten verwendet werden.

Zunächst können Sie sie als CLI-Befehl verwenden, indem Sie `npm install -g @wdio/cli` installieren und eine WebDriver-Session über die Kommandozeile starten, z. B.

```sh
wdio repl chrome
```

Dies würde einen Chrome-Browser öffnen, den Sie mit der REPL-Schnittstelle steuern können. Stellen Sie sicher, dass ein Browser-Treiber auf Port `4444` läuft, um die Session zu initiieren. Wenn Sie ein [Sauce Labs](https://saucelabs.com)-Konto (oder ein Konto bei einem anderen Cloud-Anbieter) haben, können Sie den Browser auch direkt über Ihre Kommandozeile in der Cloud ausführen:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Wenn der Treiber auf einem anderen Port läuft, z. B. 9515, kann dieser mit dem Kommandozeilenargument --port oder dem Alias -p übergeben werden

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Die REPL kann auch mit den Capabilities aus der WebdriverIO-Konfigurationsdatei ausgeführt werden. Wdio unterstützt ein Capabilities-Objekt oder eine Multi-Remote-Capability-Liste bzw. ein Multi-Remote-Objekt.

Wenn die Konfigurationsdatei ein Capabilities-Objekt verwendet, übergeben Sie einfach den Pfad zur Konfigurationsdatei. Handelt es sich hingegen um eine Multi-Remote-Capability, geben Sie über das Positionsargument an, welche Capability aus der Liste oder aus Multi-Remote verwendet werden soll. Hinweis: Bei Listen wird ein nullbasierter Index verwendet.

### Beispiel

WebdriverIO mit Capability-Array:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // Browserversion
        platformName: 'Windows 10' // Betriebssystem-Plattform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO mit [Multi-Remote](https://webdriver.io/docs/multiremote/)-Capability-Objekt:

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

Oder wenn Sie lokale mobile Tests mit Appium ausführen möchten:

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

Dies würde eine Chrome/Safari-Session auf dem verbundenen Gerät/Emulator/Simulator öffnen. Stellen Sie sicher, dass Appium auf Port `4444` läuft, um die Session zu initiieren.

```sh
wdio repl './path/to/your_app.apk'
```

Dies würde eine App-Session auf dem verbundenen Gerät/Emulator/Simulator öffnen. Stellen Sie sicher, dass Appium auf Port `4444` läuft, um die Session zu initiieren.

Capabilities für iOS-Geräte können mit Argumenten übergeben werden:

* `-v`      - `platformVersion`: Version der Android/iOS-Plattform
* `-d`      - `deviceName`: Name des mobilen Geräts
* `-u`      - `udid`: udid für echte Geräte

Verwendung:

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

Sie können alle verfügbaren Optionen (siehe `wdio repl --help`) für Ihre REPL-Session anwenden.

### An eine `wdio session` anhängen

`wdio repl --session <name>` (Alias `-s`) startet keinen Browser. Es verbindet die REPL mit einer Session, die [`wdio session`](/docs/session) bereits geöffnet hat, und beim Trennen bleibt diese Session weiterhin aktiv. Das Pausieren eines Testlaufs wird in [Einen Test mit einer Session debuggen](/docs/session/debug) behandelt:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

In der REPL wird jede Zeile als `wdio session exec` ausgeführt. `.exit` gibt `Detached from "default" (still running)` aus.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Eine weitere Möglichkeit, die REPL zu verwenden, ist innerhalb Ihrer Tests über den Befehl [`debug`](/docs/api/browser/debug). Dieser hält den Browser beim Aufruf an und ermöglicht es Ihnen, in die Anwendung zu springen (z. B. in die Entwicklertools) oder den Browser über die Kommandozeile zu steuern. Dies ist hilfreich, wenn einige Befehle eine bestimmte Aktion nicht wie erwartet auslösen. Mit der REPL können Sie dann die Befehle ausprobieren, um herauszufinden, welche am zuverlässigsten funktionieren.