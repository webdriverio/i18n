---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
Überprüft, ob ein einfacher Dialog derzeit geöffnet ist.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49) gefunden werden.

##### Verwendung

```js
browser.isAlertOpen()
```

##### Beispiel


```js
console.log(browser.isAlertOpen()); // gibt aus: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // gibt aus: true
```


##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` oder `false` abhängig davon, ob ein einfacher Dialog vorhanden ist oder nicht.


---

## isAutoReporting
Überprüft, ob automatisch Fehler bei Browser-Logs ausgegeben werden sollen.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://codereview.chromium.org/101203012) gefunden werden.

##### Verwendung

```js
browser.isAutoReporting()
```


##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` oder `false` abhängig davon, ob die automatische Berichterstattung aktiviert ist.


---

## setAutoReporting
Schaltet ein oder aus, ob bei allen folgenden Befehlen eine Antwort mit unbekanntem Fehler beim ersten Browser-Fehler (z.B. fehlgeschlagenes Laden einer Ressource aufgrund einer 403/404-Antwort) zurückgegeben werden soll (sobald aktiviert).<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://codereview.chromium.org/101203012) gefunden werden.

##### Verwendung

```js
browser.setAutoReporting(enabled)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` wenn automatische Berichterstattung aktiviert werden soll, `false` um eine zuvor aktivierte automatische Berichterstattung zu deaktivieren.</td>
    </tr>
  </tbody>
</table>

##### Beispiele


```js
// Automatische Berichterstattung direkt nach Sitzungsbeginn mit leeren Browser-Logs aktivieren
console.log(browser.setAutoReporting(true)); // gibt aus: null
// Bei Anfrage einer nicht existierenden Ressource wird die Ausführung aufgrund eines unbekannten Fehlers abgebrochen
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// Während der Sitzung einige Operationen durchführen, die Browser-Logs füllen
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Automatische Berichterstattung aktivieren, die einen unbekannten Fehler für den ersten Browser-Log (404-Antwort) auslöst
browser.setAutoReporting(true);
```


##### Gibt zurück

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** Falls der erste Browser-Fehler bereits vor der Ausführung dieses Befehls aufgetreten ist, wird ein unbekannter Fehler als Antwort ausgegeben, der ein Objekt mit einem 'message'-Schlüssel ist, der den ersten Browser-Fehler beschreibt. Andernfalls wird bei Erfolg `null` zurückgegeben.


---

## isLoading
Ermittelt den Ladestatus für den aktiven Fenster-Handle.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802) gefunden werden.

##### Verwendung

```js
browser.isLoading()
```

##### Beispiel


```js
console.log(browser.isLoading()); // gibt aus: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // gibt aus: true
```


##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` oder `false` abhängig davon, ob der aktive Fenster-Handle lädt oder nicht.


---

## takeHeapSnapshot
Erstellt einen Heap-Snapshot des aktuellen Ausführungskontexts.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202) gefunden werden.

##### Verwendung

```js
browser.takeHeapSnapshot()
```


##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** Eine JSON-Darstellung des Heap-Snapshots. Dieser kann durch Laden als Datei in Chrome DevTools untersucht werden.


---

## getNetworkConnection
Gibt den Verbindungstyp für die Netzwerkemulation zurück. Dieser Befehl ist nur anwendbar, wenn das Remote-Ende mit der Capability `networkConnectionEnabled` auf `true` gesetzt antwortet.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) gefunden werden.

##### Verwendung

```js
browser.getNetworkConnection()
```

##### Beispiel


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Netzwerkemulation erfordert den Gerätemodus, der nur aktiviert ist, wenn die mobile Emulation eingeschaltet ist
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // gibt aus: 6 (Sowohl WLAN als auch Daten)
```


##### Gibt zurück

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Eine Bitmaske zur Darstellung des Netzwerkverbindungstyps. Flugmodus (`1`), nur WLAN (`2`), WLAN und Daten (`6`), 4G (`8`), 3G (`10`), 2G (`20`). Standardmäßig sind [WLAN und Daten aktiviert](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
Ändert den Verbindungstyp für die Netzwerkverbindung. Dieser Befehl ist nur anwendbar, wenn das Remote-Ende mit der Capability `networkConnectionEnabled` auf `true` gesetzt antwortet.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) gefunden werden.

##### Verwendung

```js
browser.setNetworkConnection(parameters)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>Objekt mit ConnectionType, Bitmaske als Wert für den Schlüssel `type` im Objekt. Flugmodus (`1`), nur WLAN (`2`), WLAN und Daten (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### Beispiel


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Netzwerkemulation erfordert den Gerätemodus, der nur aktiviert ist, wenn die mobile Emulation eingeschaltet ist
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // gibt aus: 1 (Flugmodus)
```


##### Gibt zurück

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Eine Bitmaske zur Darstellung des Netzwerkverbindungstyps. Der Wert sollte dem im Objekt angegebenen `type` entsprechen, jedoch ist das Gerät möglicherweise nicht in der Lage, den angeforderten Netzwerkverbindungstyp zu unterstützen.


---

## getNetworkConditions
Gibt die aktuellen Netzwerkbedingungen zurück, die für die Emulation verwendet werden.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859) gefunden werden.

##### Verwendung

```js
browser.getNetworkConditions()
```


##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** Objekt mit Netzwerkbedingungen für `offline`, `latency`, `download_throughput` und `upload_throughput`. Netzwerkbedingungen müssen zuerst gesetzt werden, bevor sie abgerufen werden können.


---

## setNetworkConditions
Setzt Netzwerkbedingungen, die für die Emulation durch Drosselung der Verbindung verwendet werden.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722) gefunden werden.

##### Verwendung

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>Objekt mit Netzwerkbedingungen wie `latency`, `throughput` (oder `download_throughput`/`upload_throughput`) und `offline` (optional).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Name der [Netzwerkdrosselungsvoreinstellung](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` oder `No throttling` zum Deaktivieren. Wenn eine Voreinstellung angegeben ist, werden die im ersten Argument übergebenen Werte nicht berücksichtigt.</td>
    </tr>
  </tbody>
</table>

##### Beispiele


```js
// Verwende unterschiedliche Download- (25kb/s) und Upload- (50kb/s) Durchsatzwerte für die Drosselung mit einer Latenz von 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Erzwinge die Trennung vom Netzwerk, indem 'offline' auf true gesetzt wird
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// Wenn ein Voreinstellungsname (z.B. 'DSL') angegeben ist, werden Werte im Objekt (z.B. 'offline') nicht berücksichtigt
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Die beste Praxis für die Angabe einer Netzwerkdrosselungsvoreinstellung ist die Verwendung eines leeren Objekts
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
Deaktiviert jede Netzwerkdrosselung, die möglicherweise eingestellt wurde. Entspricht dem Einstellen der Voreinstellung `No throttling`.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745) gefunden werden.

##### Verwendung

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
Sendet einen Befehl an den DevTools-Debugger.<br />Eine Liste der verfügbaren Befehle und ihrer Parameter finden Sie im [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304) gefunden werden.

##### Verwendung

```js
browser.sendCommand(cmd, params)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Name des Befehls (z.B. [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parameter für den Befehl. Falls keine Parameter für den Befehl erforderlich sind, geben Sie ein leeres Objekt an.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
Sendet einen Befehl an den DevTools-Debugger und wartet auf das Ergebnis.<br />Eine Liste der verfügbaren Befehle und ihrer Parameter finden Sie im [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320) gefunden werden.

##### Verwendung

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Name des Befehls, der ein Ergebnis zurückgibt (z.B. [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parameter für den Befehl. Falls keine Parameter für den Befehl erforderlich sind, geben Sie ein leeres Objekt an.</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Entweder der Rückgabewert Ihres Befehls oder der Fehler, der der Grund für das Fehlschlagen Ihres Befehls war.


---

## file
Lädt eine Datei auf die Remote-Maschine hoch, auf der der Browser läuft.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065) gefunden werden.

##### Verwendung

```js
browser.file(file)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-codiertes Zip-Archiv, das __eine einzige__ Datei enthält, die hochgeladen werden soll. Falls die Base64-codierten Daten kein Zip-Archiv darstellen oder das Archiv mehr als eine Datei enthält, wird ein unbekannter Fehler ausgelöst.</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absoluter Pfad der hochgeladenen Datei auf der Remote-Maschine.


---

## launchChromeApp
Startet eine Chrome-App durch die angegebene ID.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539) gefunden werden.

##### Verwendung

```js
browser.launchChromeApp(id)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>Erweiterungs-ID der zu startenden App, wie in chrome://extensions definiert.</td>
    </tr>
  </tbody>
</table>

##### Beispiel


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Installiere beim Starten des Browsers, um ihn starten zu können
            extensions: [
              // Eintrag sollte eine Base64-codierte gepackte Chrome-App (.crx) sein
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
Ruft den Wert eines bestimmten Formularsteuerelements ab.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443) gefunden werden.

##### Verwendung

```js
browser.getElementValue(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Elements, von dem der Wert abgerufen werden soll</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** Aktueller Wert des Elements. Falls das angegebene Element kein Formularsteuerelement ist, wird `null` zurückgegeben.


---

## elementHover
Aktiviert den Hover-Status für ein Element, der bei der nächsten Interaktion zurückgesetzt wird.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146) gefunden werden.

##### Verwendung

```js
browser.elementHover(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Elements, über das gehovered werden soll</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
Löst einen Pinch-Zoom-Effekt aus.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827) gefunden werden.

##### Verwendung

```js
browser.touchPinch(x, y, scale)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-Position zum Pinchen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-Position zum Pinchen</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>Pinch-Zoom-Skala</td>
    </tr>
  </tbody>
</table>



---

## freeze
Friert die aktuelle Seite ein. Erweiterung für die [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633) gefunden werden.

##### Verwendung

```js
browser.freeze()
```



---

## resume
Setzt die aktuelle Seite fort. Erweiterung für die [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645) gefunden werden.

##### Verwendung

```js
browser.resume()
```



---

## getCastSinks
Gibt die Liste der Cast-Senken (Cast-Geräte) zurück, die für den Chrome-Medienrouter verfügbar sind.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748) gefunden werden.

##### Verwendung

```js
browser.getCastSinks()
```


##### Gibt zurück

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** Liste der verfügbaren Senken.


---

## selectCastSink
Wählt eine Cast-Senke (Cast-Gerät) als Empfänger von Medienrouter-Intentionen (verbinden oder abspielen) aus.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737) gefunden werden.

##### Verwendung

```js
browser.selectCastSink(sinkName)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Der Name des Zielgeräts.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
Initiiert Tab-Spiegelung für den aktuellen Browser-Tab auf dem angegebenen Gerät.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741) gefunden werden.

##### Verwendung

```js
browser.startCastTabMirroring(sinkName)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Der Name des Zielgeräts.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Gibt eine Fehlermeldung zurück, falls ein Problem in einer Cast-Sitzung vorliegt.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751) gefunden werden.

##### Verwendung

```js
browser.getCastIssueMessage()
```


##### Gibt zurück

- **&lt;String&gt;**
            **<code><var>message</var></code>:** Fehlermeldung, falls vorhanden.


---

## stopCasting
Stoppt das Casting vom Medienrouter zum angegebenen Gerät, falls verbunden.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744) gefunden werden.

##### Verwendung

```js
browser.stopCasting(sinkName)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Der Name des Zielgeräts.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
Fährt den ChromeDriver-Prozess herunter und beendet damit alle aktiven Sitzungen.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498) gefunden werden.

##### Verwendung

```js
browser.shutdown()
```



---

## takeElementScreenshot
Der Take Element Screenshot-Befehl macht einen Screenshot des sichtbaren Bereichs, der vom Begrenzungsrechteck eines Elements umfasst wird.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) gefunden werden.

##### Verwendung

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>die ID eines Elements, die in einem vorherigen Aufruf von Find Element(s) zurückgegeben wurde</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>scrolle das Element in die Ansicht. Standard: true</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Die Base64-codierten PNG-Bilddaten, die den Screenshot des sichtbaren Bereichs des Begrenzungsrechtecks eines Elements umfassen, nachdem es in die Ansicht gescrollt wurde.


---

## getLogTypes
Ruft verfügbare Log-Typen ab.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) gefunden werden.

##### Verwendung

```js
browser.getLogTypes()
```


##### Gibt zurück

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Die Liste der verfügbaren Log-Typen, Beispiel: browser, driver.


---

## getLogs
Ruft das Log für einen bestimmten Log-Typ ab. Der Log-Puffer wird nach jeder Anfrage zurückgesetzt.<br /><br />Inoffizieller und undokumentierter Chromium-Befehl. Mehr über diesen Befehl kann [hier](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) gefunden werden.

##### Verwendung

```js
browser.getLogs(type)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>der Log-Typ</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Die Liste der Log-Einträge.
