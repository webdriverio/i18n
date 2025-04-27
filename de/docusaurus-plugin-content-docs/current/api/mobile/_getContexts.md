---
id: getContexts
title: getContexts
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

Die WebdriverIO `getContexts`-Methode ist eine verbesserte Version des Standard-Appium-Befehls `contexts`
(und des früheren WebdriverIO-Befehls `getContexts`). Sie liefert detaillierte und verwertbare Informationen
über verfügbare Kontexte in einer mobilen App-Sitzung und adressiert die Einschränkungen der Standard-Appium-Methoden.

### Wie Webviews funktionieren und warum diese Methode hilft
Weitere Details finden Sie in der [Dokumentation zu Hybrid Apps](/docs/api/mobile#hybrid-apps). Hier eine Zusammenfassung der Herausforderungen, die der `getContexts`-Befehl adressiert:

#### Herausforderungen bei Android
- Ein einzelnes Webview (z.B. `WEBVIEW_{packageName}`) kann mehrere Seiten enthalten (ähnlich wie Browser-Tabs).
- Die Standard-Appium-Methoden enthalten keine Details zu diesen Seiten, wie deren `title`, `url` oder Sichtbarkeit,
  was die Identifizierung der richtigen Seite erschwert und zu potenzieller Instabilität führen kann.

#### Herausforderungen bei iOS
- Die Standard-Appium-Methode gibt nur generische Webview-IDs zurück (z.B. `WEBVIEW_{id}`) ohne zusätzliche Metadaten.
- Dies macht es schwierig zu bestimmen, welches Webview dem Ziel-App-Bildschirm entspricht.

Die erweiterte `getContexts`-Methode löst diese Probleme, indem sie detaillierte Kontext-Objekte zurückgibt, die Folgendes enthalten:
- **Für Android:** `title`, `url`, `packageName`, `webviewPageId` und Layout-Details (`screenX`, `screenY`, `width` und `height`).
- **Für iOS:** `bundleId`, `title` und `url`.

Diese Verbesserungen machen das Debugging und die Interaktion mit Hybrid-Apps zuverlässiger.

### Warum diese Methode verwenden?
Standardmäßig gibt die Appium-Methode `contexts` nur ein Array von Strings zurück, die verfügbare Kontexte darstellen:
- **Für Android:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **Für iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

Obwohl für einfache Szenarien ausreichend, fehlen in diesen Standardantworten kritische Metadaten für Hybrid-App-Tests:
- **Für Android:** Das Fehlen seitenspezifischer Metadaten erschwert die Interaktion mit dem richtigen Webview.
- **Für iOS:** Generische Webview-IDs bieten keinen Einblick in den Inhalt oder Bildschirm der App, den sie darstellen.

Die erweiterte `getContexts`-Methode bietet:
- Detaillierte Metadaten für Android und iOS.
- Optionen zum Filtern und Anpassen der zurückgegebenen Kontexte für eine bessere Zielausrichtung und Interaktion.

:::info Hinweise und Einschränkungen

- Die erweiterte `getContexts`-Methode funktioniert sowohl auf Android- als auch auf iOS-Plattformen. Die zurückgegebenen Daten können jedoch je nach Plattform und getesteter App variieren.
- Wenn Sie die Option `returnDetailedContexts` nicht angeben, verhält sich die Methode wie die Standard-Appium-Methode `contexts` und gibt ein einfaches Kontext-Array zurück.
- Um die "Standard"-Appium-Methode `contexts` zu verwenden, nutzen Sie `driver.getAppiumContexts()`. Weitere Informationen finden Sie in der [Appium Contexts-Dokumentation](/docs/api/appium#getappiumcontexts).

#### Android Webviews:
- Metadaten wie `androidWebviewData` sind nur verfügbar, wenn `returnAndroidDescriptionData` auf `true` gesetzt ist.
- Die Verwendung der `getContexts`-Methode in einem Chrome-Browser kann gelegentlich unvollständige Daten zurückgeben, aufgrund nicht übereinstimmender Versionen von Browser/Webview/ChromeDriver. In solchen Fällen werden möglicherweise Standardwerte oder eine falsche `webviewPageId` (z.B. `0`) zurückgegeben.

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
      <td>Die `getContexts`-Optionen (optional)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Standardmäßig geben wir nur die Kontextnamen basierend auf der Standard-Appium-`contexts`-API zurück. Wenn Sie alle Daten erhalten möchten, können Sie dies auf `true` setzen. Standard ist `false` (optional).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die Zeit in Millisekunden, die zwischen jedem Wiederholungsversuch zur Verbindung mit dem Webview gewartet werden soll. Standard ist `500` ms (optional). <br /><strong>NUR FÜR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Die maximale Zeit in Millisekunden, die auf die Erkennung einer Webview-Seite gewartet werden soll. Standard ist `5000` ms (optional). <br /><strong>NUR FÜR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Standardmäßig geben wir alle Webviews zurück. Wenn Sie die Webviews nach der aktuell geöffneten Android-App filtern möchten, können Sie dies auf `true` setzen. Standard ist `false` (optional). <br /><strong>HINWEIS:</strong> Beachten Sie, dass Sie aufgrund dieser "Einschränkung" auch KEIN Webview finden können. <br /><strong>NUR FÜR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Standardmäßig geben wir nur die Webviews zurück, die angehängt und sichtbar sind. Wenn Sie alle Webviews erhalten möchten, können Sie dies auf `false` setzen (optional). Standard ist `true`. <br /><strong>NUR FÜR ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Standardmäßig keine Android-Webview (Chrome) Beschreibungsdaten. Wenn Sie alle Daten erhalten möchten, können Sie dies auf `true` setzen. Standard ist `false` (optional). <br />Durch Aktivieren dieser Option erhalten Sie zusätzliche Daten in der Antwort, siehe `description.data.test.js` für weitere Informationen. <br /><strong>NUR FÜR ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### Beispiele

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```