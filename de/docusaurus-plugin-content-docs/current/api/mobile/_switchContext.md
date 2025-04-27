---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

Wechseln Sie zu einem bestimmten Kontext unter Verwendung eines gegebenen Webview `name`, `title` oder `url`.

Diese Methode erweitert den Standard-Appium-Befehl `context`, indem sie mehr Flexibilität und Präzision
beim Wechseln zwischen nativen und Webview-Kontexten in hybriden mobilen Anwendungen bietet.

### Wie Kontexte funktionieren
Einen Überblick über Hybrid-Apps und Webviews finden Sie in der [Hybrid-Apps-Dokumentation](/docs/api/mobile#hybrid-apps).
Nachfolgend eine Zusammenfassung, wie der Befehl `switchContext` häufige Herausforderungen angeht:

#### Android-Herausforderungen
- Webviews enthalten oft mehrere Seiten (ähnlich wie Browser-Tabs). Die Identifizierung der richtigen Seite erfordert zusätzliche
  Metadaten wie `title` oder `url`, die von Standard-Appium-Methoden nicht bereitgestellt werden.
- Standard-Appium-Methoden geben nur grundlegende Kontextnamen zurück (z.B. `WEBVIEW_{packageName}`) ohne Details über
  den Inhalt oder die Seiten innerhalb des Webviews.
- Das Umschalten von Kontexten auf Android umfasst zwei Schritte, die von dieser Methode automatisch behandelt werden:
  1. Wechsel zum Webview-Kontext mit `WEBVIEW_{packageName}`.
  2. Auswahl der entsprechenden Seite innerhalb des Webviews mit der Methode `switchToWindow`.

#### iOS-Herausforderungen
- Webviews werden durch generische IDs identifiziert (z.B. `WEBVIEW_{id}`), die keine Informationen über den Inhalt
  oder den App-Bildschirm liefern, zu dem sie gehören.
- Die Bestimmung des richtigen Webviews für die Interaktion erfordert oft ein Vorgehen nach dem Versuch-und-Irrtum-Prinzip.

Die Methode `switchContext` vereinfacht diesen Prozess durch das Abrufen detaillierter Metadaten (z.B. `title`, `url` und Sichtbarkeit),
um ein genaues und zuverlässiges Umschalten zwischen Kontexten zu gewährleisten.

### Warum diese Methode verwenden?
- **Vereinfachter Wechsel**: Wenn Sie den `title` oder die `url` des gewünschten Webviews kennen, macht diese Methode zusätzliche
  Aufrufe wie `getContexts` oder die Kombination mehrerer Methoden wie `switchContext({id})` und `getTitle()` überflüssig.
- **Automatische Kontextabgleichung**: Findet die beste Übereinstimmung für einen Kontext basierend auf:
  - Plattformspezifischen Kennungen (`bundleId` für iOS, `packageName` für Android).
  - Exakte oder teilweise Übereinstimmungen für `title` oder `url` (unterstützt sowohl Strings als auch reguläre Ausdrücke).
  - Android-spezifische Prüfungen, um sicherzustellen, dass Webviews angehängt und sichtbar sind.
- **Feinkörnige Kontrolle**: Benutzerdefinierte Wiederholungsintervalle und Timeouts (nur Android) ermöglichen es Ihnen, Verzögerungen bei der Webview-Initialisierung zu behandeln.
- **Zugriff auf die Standard-Appium-Methode**: Bei Bedarf können Sie den Standard-Appium-Befehl `switchContext` über `driver.switchAppiumContext()` verwenden.

:::info Hinweise und Einschränkungen

- Wenn der `title` oder die `url` des gewünschten Webviews bekannt ist, kann diese Methode automatisch den passenden Kontext lokalisieren und umschalten, ohne zusätzliche `getContexts`-Aufrufe.
- Android-spezifische Optionen wie `androidWebviewConnectionRetryTime` und `androidWebviewConnectTimeout` sind für iOS nicht anwendbar.
- Protokolliert Gründe für Kontextabgleichsfehler, um bei der Fehlersuche zu helfen.
- Bei Verwendung eines Objekts als Eingabe ist entweder `title` oder `url` erforderlich.

:::

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>Der Name des Kontexts, zu dem gewechselt werden soll. Ein Objekt mit weiteren Kontextoptionen kann bereitgestellt werden.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>switchContext-Befehlsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Der Titel der Seite, zu der gewechselt werden soll. Dies wird der Inhalt des title-Tags einer Webview-Seite sein. Sie können einen String verwenden, der vollständig übereinstimmen muss, oder einen regulären Ausdruck.<br /><strong>WICHTIG:</strong> Wenn Sie Optionen verwenden, ist entweder die Eigenschaft `title` oder `url` erforderlich.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string, RegExp`</td>
      <td>Die URL der Seite, zu der gewechselt werden soll. Dies wird die `url` einer Webview-Seite sein. Sie können einen String verwenden, der vollständig übereinstimmen muss, oder einen regulären Ausdruck.<br /><strong>WICHTIG:</strong> Wenn Sie Optionen verwenden, ist entweder die Eigenschaft `title` oder `url` erforderlich.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Zeit in Millisekunden, die zwischen jedem Versuch, eine Verbindung zum Webview herzustellen, gewartet werden soll. Standard ist `500` ms (optional). <br /><strong>NUR FÜR ANDROID</strong> und wird nur verwendet, wenn ein `title` oder eine `url` angegeben ist.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die maximale Zeit in Millisekunden, die auf die Erkennung einer Webview-Seite gewartet werden soll. Standard ist `5000` ms (optional). <br /><strong>NUR FÜR ANDROID</strong> und wird nur verwendet, wenn ein `title` oder eine `url` angegeben ist.</td>
    </tr>
  </tbody>
</table>

##### Beispiele

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```
