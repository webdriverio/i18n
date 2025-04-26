---
id: repl
title: REPL-Schnittstelle
---

Mit `v4.5.0` hat WebdriverIO eine [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)-Schnittstelle eingeführt, die Ihnen nicht nur hilft, die Framework-API zu erlernen, sondern auch Ihre Tests zu debuggen und zu inspizieren. Sie kann auf verschiedene Arten verwendet werden.

Zunächst können Sie sie als CLI-Befehl verwenden, indem Sie `npm install -g @wdio/cli` installieren und eine WebDriver-Sitzung von der Kommandozeile aus starten, z.B.

```sh
wdio repl chrome
```

Dies würde einen Chrome-Browser öffnen, den Sie mit der REPL-Schnittstelle steuern können. Stellen Sie sicher, dass Sie einen Browser-Treiber auf Port `4444` laufen haben, um die Sitzung zu initiieren. Wenn Sie ein [Sauce Labs](https://saucelabs.com) (oder anderer Cloud-Anbieter) Konto haben, können Sie den Browser auch direkt über Ihre Kommandozeile in der Cloud ausführen:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Wenn der Treiber auf einem anderen Port läuft, z.B. 9515, kann dies mit dem Kommandozeilenargument --port oder dem Alias -p übergeben werden

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl kann auch mit den Capabilities aus der WebdriverIO-Konfigurationsdatei ausgeführt werden. Wdio unterstützt Capabilities-Objekte oder Multiremote-Capability-Listen oder -Objekte.

Wenn die Konfigurationsdatei ein Capabilities-Objekt verwendet, geben Sie einfach den Pfad zur Konfigurationsdatei an. Wenn es sich um eine Multiremote-Capability handelt, geben Sie an, welche Capability aus der Liste oder Multiremote mit dem Positionsargument verwendet werden soll. Hinweis: Für Listen verwenden wir einen nullbasierten Index.

### Beispiel

WebdriverIO mit Capability-Array:

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

WebdriverIO mit [Multiremote](https://webdriver.io/docs/multiremote/) Capability-Objekt:

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

Dies würde eine Chrome/Safari-Sitzung auf dem verbundenen Gerät/Emulator/Simulator öffnen. Stellen Sie sicher, dass Appium auf Port `4444` läuft, um die Sitzung zu initiieren.

```sh
wdio repl './path/to/your_app.apk'
```

Dies würde eine App-Sitzung auf dem verbundenen Gerät/Emulator/Simulator öffnen. Stellen Sie sicher, dass Appium auf Port `4444` läuft, um die Sitzung zu initiieren.

Capabilities für iOS-Geräte können mit Argumenten übergeben werden:

* `-v`      - `platformVersion`: Version der Android/iOS-Plattform
* `-d`      - `deviceName`: Name des mobilen Geräts
* `-u`      - `udid`: UDID für echte Geräte

Verwendung:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Lange Parameternamen', value: 'long'},
    {label: 'Kurze Parameternamen', value: 'short'}
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

Sie können alle verfügbaren Optionen (siehe `wdio repl --help`) für Ihre REPL-Sitzung anwenden.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Eine andere Möglichkeit, das REPL zu verwenden, ist innerhalb Ihrer Tests über den [`debug`](/docs/api/browser/debug)-Befehl. Dies stoppt den Browser, wenn er aufgerufen wird, und ermöglicht es Ihnen, in die Anwendung zu springen (z.B. zu den Entwicklertools) oder den Browser von der Kommandozeile aus zu steuern. Dies ist hilfreich, wenn einige Befehle eine bestimmte Aktion nicht wie erwartet auslösen. Mit dem REPL können Sie dann die Befehle ausprobieren, um zu sehen, welche am zuverlässigsten funktionieren.