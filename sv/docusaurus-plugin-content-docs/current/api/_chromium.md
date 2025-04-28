---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
Om en enkel dialogruta är öppen för närvarande.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49).

##### Användning

```js
browser.isAlertOpen()
```

##### Exempel


```js
console.log(browser.isAlertOpen()); // skriver ut: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // skriver ut: true
```


##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` eller `false` baserat på om enkel dialogruta finns eller inte.


---

## isAutoReporting
Om det automatiskt ska generera fel vid webbläsarloggar.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://codereview.chromium.org/101203012).

##### Användning

```js
browser.isAutoReporting()
```


##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` eller `false` baserat på om automatisk rapportering är aktiverad.


---

## setAutoReporting
Växla om svar ska returneras med okänt fel med första webbläsarfelet (t.ex. misslyckades att ladda resurs på grund av 403/404-svar) för alla efterföljande kommandon (när det är aktiverat).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://codereview.chromium.org/101203012).

##### Användning

```js
browser.setAutoReporting(enabled)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` om automatisk rapportering ska aktiveras, använd `false` för att inaktivera tidigare aktiverad automatisk rapportering.</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
// Aktivera automatisk rapportering direkt efter sessionen startades med tomma webbläsarloggar
console.log(browser.setAutoReporting(true)); // skriver ut: null
// Vid begäran av en icke-existerande resurs kommer den att avbryta exekveringen på grund av kastat okänt fel
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// Under sessionen, gör några operationer som fyller webbläsarloggarna
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Aktivera automatisk rapportering som kastar ett okänt fel för första webbläsarloggen (404-svar)
browser.setAutoReporting(true);
```


##### Returnerar

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** Om första webbläsarfelet redan inträffade innan detta kommando kördes kommer det att kasta ett okänt fel som svar, vilket är ett objekt med en 'message'-nyckel som beskriver första webbläsarfelet. Annars returnerar det `null` vid framgång.


---

## isLoading
Fastställer laddningsstatus för aktivt fönsterhandtag.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802).

##### Användning

```js
browser.isLoading()
```

##### Exempel


```js
console.log(browser.isLoading()); // skriver ut: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // skriver ut: true
```


##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` eller `false` baserat på om aktivt fönsterhandtag laddar eller inte.


---

## takeHeapSnapshot
Tar en heap-ögonblicksbild av den aktuella exekveringskontexten.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202).

##### Användning

```js
browser.takeHeapSnapshot()
```


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** En JSON-representation av heap-ögonblicksbilden. Den kan inspekteras genom att ladda den som fil i Chrome DevTools.


---

## getNetworkConnection
Hämta anslutningstypen för nätverksemulering. Detta kommando är bara tillämpligt när fjärrslut svarar med `networkConnectionEnabled`-kapabilitet satt till `true`.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Användning

```js
browser.getNetworkConnection()
```

##### Exempel


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Nätverksemulering kräver enhetsläge, som endast är aktiverat när mobilemulering är på
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // skriver ut: 6 (Både Wi-Fi och data)
```


##### Returnerar

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** En bitmask för att representera nätverksanslutningstypen. Flygplansläge (`1`), endast Wi-Fi (`2`), Wi-Fi och data (`6`), 4G (`8`), 3G (`10`), 2G (`20`). Som standard är [Wi-Fi och data aktiverade](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
Ändra anslutningstyp för nätverksanslutning. Detta kommando är bara tillämpligt när fjärrslut svarar med `networkConnectionEnabled`-kapabilitet satt till `true`.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Användning

```js
browser.setNetworkConnection(parameters)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>Objekt som innehåller ConnectionType, ange bitmask som värde för `type`-nyckeln i objektet. Flygplansläge (`1`), endast Wi-Fi (`2`), Wi-Fi och data (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Nätverksemulering kräver enhetsläge, som endast är aktiverat när mobilemulering är på
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // skriver ut: 1 (Flygplansläge)
```


##### Returnerar

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** En bitmask för att representera nätverksanslutningstypen. Värdet bör matcha specificerad `type` i objektet, men enheten kanske inte kan hantera den begärda nätverksanslutningstypen.


---

## getNetworkConditions
Hämta aktuella nätverksförhållanden som används för emulering.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859).

##### Användning

```js
browser.getNetworkConditions()
```


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** Objekt som innehåller nätverksförhållanden för `offline`, `latency`, `download_throughput` och `upload_throughput`. Nätverksförhållanden måste ställas in innan de kan hämtas.


---

## setNetworkConditions
Ställa in nätverksförhållanden som används för emulering genom att begränsa anslutningen.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722).

##### Användning

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>Objekt som innehåller nätverksförhållanden som är `latency`, `throughput` (eller `download_throughput`/`upload_throughput`) och `offline` (valfritt).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Namn på [förinställning för nätverksbegränsning](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` eller `No throttling` för att inaktivera. När förinställning anges respekteras inte värden som skickas i första argumentet.</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
// Använd olika nedladdnings- (25kb/s) och uppladdningsvärden (50kb/s) för begränsning med en latens på 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Tvinga frånkoppling från nätverk genom att ställa in 'offline' till true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// När ett förinställningsnamn (t.ex. 'DSL') är angivet respekterar det inte värden i objektet (t.ex. 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Bästa praxis för att ange förinställning för nätverksbegränsning är att använda ett tomt objekt
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
Inaktivera alla nätverksbegränsningar som kan ha ställts in. Motsvarar att ställa in förinställningen `No throttling`.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745).

##### Användning

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
Skicka ett kommando till DevTools-felsökaren.<br />För en lista över tillgängliga kommandon och deras parametrar, se [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304).

##### Användning

```js
browser.sendCommand(cmd, params)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Namn på kommandot (t.ex. [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parametrar till kommandot. Om det inte finns några parametrar för kommandot, ange ett tomt objekt.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
Skicka ett kommando till DevTools-felsökaren och vänta på resultatet.<br />För en lista över tillgängliga kommandon och deras parametrar, se [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320).

##### Användning

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Namn på kommandot som returnerar ett resultat (t.ex. [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Parametrar till kommandot. Om det inte finns några parametrar för kommandot, ange ett tomt objekt.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Antingen returvärdet för ditt kommando, eller felet som var orsaken till ditt kommandos misslyckande.


---

## file
Ladda upp en fil till fjärrmaskinen där webbläsaren körs.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065).

##### Användning

```js
browser.file(file)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-kodad zip-arkiv som innehåller __en enda__ fil som ska laddas upp. Om base64-kodad data inte representerar ett zip-arkiv eller arkivet innehåller mer än en fil kommer det att kasta ett okänt fel.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Absolut sökväg till uppladdad fil på fjärrmaskinen.


---

## launchChromeApp
Startar en Chrome-app genom angivet id.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539).

##### Användning

```js
browser.launchChromeApp(id)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>Tilläggs-id för appen som ska startas, som definierat i chrome://extensions.</td>
    </tr>
  </tbody>
</table>

##### Exempel


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Installera vid start av webbläsaren för att kunna starta den
            extensions: [
              // Inmatning ska vara en base64-kodad paketerad Chrome-app (.crx)
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
Hämtar värdet av ett givet formulärkontrollelement.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443).

##### Användning

```js
browser.getElementValue(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>id för element att hämta värde från</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** Aktuellt värde för elementet. Om det angivna elementet inte är ett formulärkontrollelement, kommer det att returnera `null`.


---

## elementHover
Aktivera hovertillstånd för ett element, som återställs vid nästa interaktion.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146).

##### Användning

```js
browser.elementHover(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>id för element att hovra över</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
Utlös en nyp-zoom-effekt.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827).

##### Användning

```js
browser.touchPinch(x, y, scale)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-position att nypa på</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-position att nypa på</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>nyp-zoom-skala</td>
    </tr>
  </tbody>
</table>



---

## freeze
Frys den aktuella sidan. Tillägg för [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633).

##### Användning

```js
browser.freeze()
```



---

## resume
Återuppta den aktuella sidan. Tillägg för [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645).

##### Användning

```js
browser.resume()
```



---

## getCastSinks
Returnerar listan över cast-mottagare (Cast-enheter) tillgängliga för Chrome media router.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748).

##### Användning

```js
browser.getCastSinks()
```


##### Returnerar

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** Lista över tillgängliga mottagare.


---

## selectCastSink
Väljer en cast-mottagare (Cast-enhet) som mottagare av media router-avsikter (anslut eller spela).<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737).

##### Användning

```js
browser.selectCastSink(sinkName)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Namnet på målenheten.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
Initierar flikspegning för den aktuella webbläsarfliken på den angivna enheten.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741).

##### Användning

```js
browser.startCastTabMirroring(sinkName)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Namnet på målenheten.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Returnerar felmeddelande om det finns något problem i en Cast-session.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751).

##### Användning

```js
browser.getCastIssueMessage()
```


##### Returnerar

- **&lt;String&gt;**
            **<code><var>message</var></code>:** Felmeddelande, om något.


---

## stopCasting
Stoppar casting från media router till den angivna enheten, om ansluten.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744).

##### Användning

```js
browser.stopCasting(sinkName)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Namnet på målenheten.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
Stäng av ChromeDriver-processen och följaktligen avsluta alla aktiva sessioner.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498).

##### Användning

```js
browser.shutdown()
```



---

## takeElementScreenshot
Kommandot Take Element Screenshot tar en skärmdump av det synliga området som omfattas av den omgivande rektangeln för ett element.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Användning

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>id för ett element som returnerades i ett tidigare anrop till Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>scrolla elementet till visning. Standard: true</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Den base64-kodade PNG-bilddata som utgör skärmdumpen av det synliga området för ett elements omgivande rektangel efter att det har skrollats in i vyområdet.


---

## getLogTypes
Hämta tillgängliga loggtyper.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes).

##### Användning

```js
browser.getLogTypes()
```


##### Returnerar

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Listan över tillgängliga loggtyper, exempel: browser, driver.


---

## getLogs
Hämta loggen för en given loggtyp. Loggbufferten återställs efter varje begäran.<br /><br />Inofficiellt och odokumenterat Chromium-kommando. Mer om detta kommando finns [här](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog).

##### Användning

```js
browser.getLogs(type)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>loggtypen</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Listan över loggposter.

