---
id: sauce-service
title: Sauce Service
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---


WebdriverIO-Service, der eine bessere Integration in Sauce Labs bietet. Dieser Service kann verwendet werden für:

- die Sauce Labs Virtual Machine Cloud (Desktop Web/Emulator/Simulator)
- die Sauce Labs Real Device Cloud (iOS und Android)

Er kann die Job-Metadaten ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') aktualisieren und startet bei Bedarf Sauce Connect.

Was dieser Service sonst noch für Sie tut:

- Standardmäßig aktualisiert der Sauce Service den 'Namen' des Jobs, wenn der Job startet. Dies gibt Ihnen die Möglichkeit, den Namen zu jedem beliebigen Zeitpunkt zu aktualisieren.
- Sie können einen `setJobName`-Parameter definieren und den Jobnamen entsprechend Ihren Capabilities, Optionen und Suite-Titel anpassen
- Der Sauce Service überträgt auch den Fehlerstapel eines fehlgeschlagenen Tests zum Sauce Labs-Befehlstab
- Er ermöglicht Ihnen, [Sauce Connect](https://docs.saucelabs.com/secure-connections/) automatisch zu konfigurieren und zu starten
- Und er setzt Kontextpunkte in Ihrer Befehlsliste, um zu identifizieren, welche Befehle in welchem Test ausgeführt wurden

## Installation

Am einfachsten ist es, `@wdio/sauce-service` als devDependency in Ihrer `package.json` zu behalten, über:

```sh
npm install @wdio/sauce-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Konfiguration

Um den Service für die Virtual Desktop/Emulator/Simulator Machine und Real Device Cloud zu nutzen, müssen Sie `user` und `key` in Ihrer `wdio.conf.js`-Datei festlegen. Es wird automatisch Sauce Labs verwenden, um Ihre Integrationstests auszuführen. Wenn Sie Ihre Tests auf Sauce Labs ausführen, können Sie die Region, in der Sie Ihre Tests ausführen möchten, über die Eigenschaft `region` angeben. Verfügbare Kurzbezeichnungen für Regionen sind `us` (Standard) und `eu`. Diese Regionen werden für die Sauce Labs VM Cloud und die Sauce Labs Real Device Cloud verwendet. Wenn Sie keine Region angeben, wird standardmäßig `us` verwendet.

Wenn Sie möchten, dass WebdriverIO automatisch einen [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy)-Tunnel einrichtet, müssen Sie `sauceConnect: true` setzen. Wenn Sie das Rechenzentrum auf EU ändern möchten, fügen Sie `region:'eu'` hinzu, da das US-Rechenzentrum standardmäßig eingestellt ist.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // oder 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Wenn Sie einen bestehenden Sauce Connect-Tunnel verwenden möchten, müssen Sie nur einen `tunnelName` angeben. Wenn Sie einen gemeinsam genutzten Tunnel verwenden und nicht der Benutzer sind, der den Tunnel erstellt hat, müssen Sie den Sauce Labs-Benutzer identifizieren, der den Tunnel erstellt hat, um ihn für Ihren Test zu verwenden. Fügen Sie den `tunnelOwner` in den Capabilities wie folgt hinzu:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Sauce Service Optionen

Um den Sauce Labs-Service zu autorisieren, muss Ihre Konfiguration eine [`user`](https://webdriver.io/docs/options#user)- und [`key`](https://webdriver.io/docs/options#key)-Option enthalten.

### maxErrorStackLength

Dieser Service überträgt automatisch den Fehlerstapel an Sauce Labs, wenn ein Test fehlschlägt. Standardmäßig werden nur die ersten 5 Zeilen übertragen, aber bei Bedarf kann dies geändert werden. Beachten Sie, dass mehr Zeilen zu mehr WebDriver-Aufrufen führen können, was die Ausführung verlangsamen könnte.

Typ: `number`<br />
Standard: `5`

### sauceConnect

Wenn `true`, wird Sauce Connect ausgeführt und eine sichere Verbindung zwischen einer Sauce Labs-virtuellen Maschine hergestellt, die Ihre Browser-Tests ausführt.

Typ: `Boolean`<br />
Standard: `false`

### sauceConnectOpts

Wenden Sie Sauce Connect-Optionen an (z.B. um Port-Nummer oder logFile-Einstellungen zu ändern). Weitere Informationen finden Sie in [dieser Liste](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/).

HINWEIS: Bei der Angabe der Optionen sollte das `--` weggelassen werden. Es kann auch in camelCase umgewandelt werden (z.B. `shared-tunnel` oder `sharedTunnel`).

Typ: `Object`<br />
Standard: `{ }`

### uploadLogs

Wenn `true`, lädt diese Option alle WebdriverIO-Protokolldateien auf die Sauce Labs-Plattform zur weiteren Überprüfung hoch. Stellen Sie sicher, dass Sie [`outputDir`](https://webdriver.io/docs/options#outputdir) in Ihrer wdio-Konfiguration eingestellt haben, um Protokolle in Dateien zu schreiben, sonst werden Daten an stdout gestreamt und können nicht hochgeladen werden.

Typ: `Boolean`<br />
Standard: `true`

### setJobName

Ermöglicht Benutzern, den Jobnamen dynamisch basierend auf Worker-Parametern wie WebdriverIO-Konfiguration, verwendeten Capabilities und dem ursprünglichen Suite-Titel festzulegen.

Typ: `Function`<br />
Standard: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Überschreiben generierter Name-Metadaten

Der Service generiert automatisch einen Namen für jeden Test aus dem Suite-Namen, Browser-Namen und anderen Informationen.

Sie können dies überschreiben, indem Sie einen Wert für die gewünschte `name`-Capability angeben, aber dies hat den Nebeneffekt, dass alle Tests denselben Namen erhalten.

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).