---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

Ruft den Kontext der aktuellen Sitzung ab.

Diese Methode erweitert den Standard-Appium-Befehl `context`/WebdriverIO `getContext`, indem sie eine Option bietet,
detaillierte Kontextinformationen zurückzugeben, was die Arbeit mit Hybrid-Apps, die Webviews verwenden, erleichtert.

### Wie Kontexte funktionieren
Weitere Informationen finden Sie in der [Dokumentation zu Hybrid-Apps](/docs/api/mobile#hybrid-apps). Im Folgenden finden Sie eine Erklärung der Herausforderungen im Zusammenhang mit dem Befehl `getContext`:

#### Für Android:
- Webviews können mehrere Seiten (wie Browser-Tabs) enthalten, und zur Identifizierung der richtigen Seite sind zusätzliche Metadaten
  wie `title` oder `url` erforderlich.
- Die Standard-Appium-Methoden liefern nur grundlegende Kontextnamen (z.B. `WEBVIEW_{packageName}`) ohne detaillierte Informationen
  über die Seiten innerhalb des Webviews.

#### Für iOS:
- Jedes Webview wird durch eine generische Zeichenfolge `WEBVIEW_{id}` identifiziert, die weder dessen Inhalt noch den App-Bildschirm
  anzeigt, zu dem es gehört.

### Warum diese Methode verwenden?
- **Standardverhalten**:
  - Gibt den aktuellen Kontext als Zeichenfolge zurück (z.B. `NATIVE_APP` oder `WEBVIEW_{id}`).
- **Detaillierter Kontext**:
  - Wenn `returnDetailedContext` aktiviert ist, werden Metadaten wie folgende abgerufen:
    - **Android**: `packageName`, `title`, `url` und `webviewPageId`.
    - **iOS**: `bundleId`, `title` und `url`.
- **Android-spezifische Optionen**:
  - Wiederholungsintervalle und Timeouts können angepasst werden, um Verzögerungen bei der Webview-Initialisierung zu berücksichtigen.

:::info Hinweise und Einschränkungen

- Wenn `returnDetailedContext` nicht aktiviert ist, verhält sich die Methode wie die Standard-Appium-Methode `getContext`.
- Wenn Sie die "Standard"-Appium-Methode `context` verwenden möchten, können Sie die Methode `driver.getAppiumContext()` verwenden, siehe
auch den Befehl [Appium Contexts](/docs/api/appium#getappiumcontext).
- **Android:** Android-spezifische Optionen (`androidWebviewConnectionRetryTime` und `androidWebviewConnectTimeout`) haben keine Auswirkungen auf iOS.
- Gibt Warnungen aus, wenn mehrere oder keine detaillierten Kontexte gefunden werden:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`GetContextsOptions`</td>
      <td>Die `getContext`-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Standardmäßig geben wir nur den Kontextnamen basierend auf der Standard-Appium-`context`-API zurück, was nur eine Zeichenfolge ist. Wenn Sie detaillierte Kontextinformationen zurückbekommen möchten, setzen Sie diesen Wert auf `true`. Standard ist `false` (optional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Zeit in Millisekunden, die zwischen jedem Versuch, eine Verbindung zum Webview herzustellen, gewartet werden soll. Standard ist `500` ms (optional). <br /><strong>NUR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die maximale Zeit in Millisekunden, die gewartet werden soll, bis eine Webview-Seite erkannt wird. Standard ist `5000` ms (optional). <br /><strong>NUR ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Beispiele

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```