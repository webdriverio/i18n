---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilizzo

```js
driver.getAppiumContext()
```


##### Restituisce

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** una stringa che rappresenta il contesto corrente o null che rappresenta 'nessun contesto'


---

## switchAppiumContext
Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilizzo

```js
driver.switchAppiumContext(name)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>una stringa che rappresenta un contesto disponibile</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilizzo

```js
driver.getAppiumContexts()
```


##### Restituisce

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** un array di stringhe che rappresentano i contesti disponibili, ad esempio 'WEBVIEW', o 'NATIVE'


---

## shake
Esegue un'azione di scuotimento sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Utilizzo

```js
driver.shake()
```




##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Blocca il dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Utilizzo

```js
driver.lock(seconds)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>per quanto tempo bloccare lo schermo (solo iOS)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Sblocca il dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Utilizzo

```js
driver.unlock()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Controlla se il dispositivo è bloccato o meno.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Utilizzo

```js
driver.isLocked()
```


##### Restituisce

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True se il dispositivo è bloccato, false se non lo è

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Inizia a registrare lo schermo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Utilizzo

```js
driver.startRecordingScreen(options)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>object</td>
      <td>parametri del comando che possono contenere chiavi come: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (vedi maggiori descrizioni nella documentazione Appium)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Interrompe la registrazione dello schermo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Utilizzo

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il percorso della posizione remota, dove dovrebbe essere caricato il video risultante. Sono supportati i seguenti protocolli http/https, ftp. Questa opzione ha effetto solo se è in corso un processo di registrazione dello schermo e il parametro forceRestart non è impostato su true. Un valore nullo o una stringa vuota (l'impostazione predefinita) significa che il contenuto del file risultante dovrebbe essere codificato come Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il nome utente per l'autenticazione remota.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>La password per l'autenticazione remota.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il nome del metodo di caricamento multipart http. Viene utilizzato 'PUT' per impostazione predefinita.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Stringa codificata in Base64. Se remote_path è impostato, la risposta è una stringa vuota

##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Restituisce i tipi di informazioni sullo stato del sistema che sono supportati per la lettura come cpu, memoria, traffico di rete e batteria.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Utilizzo

```js
driver.getPerformanceDataTypes()
```


##### Restituisce

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** I tipi di dati prestazionali disponibili (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Restituisce le informazioni sullo stato del sistema che sono supportate per la lettura come cpu, memoria, traffico di rete e batteria.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Utilizzo

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>il nome del pacchetto dell'applicazione</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>il tipo di stato del sistema che si vuole leggere. Dovrebbe essere uno dei tipi di dati prestazionali supportati</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>il numero di tentativi di lettura</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Il tipo di informazione sullo stato del sistema che è supportato per la lettura come cpu, memoria, traffico di rete e batteria

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Premere un tasto specifico sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Utilizzo

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>keycode da premere</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>stato meta con cui premere il keycode</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>flag per la pressione del tasto</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Premere e tenere premuto un particolare codice tasto sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Utilizzo

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>keycode da premere sul dispositivo</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>metastate per la pressione del tasto</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>flag per la pressione del tasto</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Invia un codice tasto al dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilizzo

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>keycode da premere</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>stato meta con cui premere il keycode</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Ruota il dispositivo in tre dimensioni.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Utilizzo

```js
driver.rotateDevice(x, y, z)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>offset x da utilizzare per il centro del gesto di rotazione</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>offset y da utilizzare per il centro del gesto di rotazione</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>offset z da utilizzare per il centro del gesto di rotazione</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Ottiene il nome dell'attività Android corrente.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Utilizzo

```js
driver.getCurrentActivity()
```


##### Restituisce

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Nome dell'attività corrente

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Ottiene il nome del pacchetto Android corrente.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Utilizzo

```js
driver.getCurrentPackage()
```


##### Restituisce

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Nome del pacchetto corrente

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Installa l'applicazione fornita sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Utilizzo

```js
driver.installApp(appPath)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>percorso del file .apk dell'applicazione</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Attiva l'applicazione data sul dispositivo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Utilizzo

```js
driver.activateApp(appId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID dell'app (ID pacchetto per Android, ID bundle per iOS)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Rimuove un'app dal dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Utilizzo

```js
driver.removeApp(appId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID dell'app (ID pacchetto per Android, ID bundle per iOS)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Termina l'applicazione data sul dispositivo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Utilizzo

```js
driver.terminateApp(appId, options)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID dell'app (ID pacchetto per Android, ID bundle per iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>object</td>
      <td>Opzioni del comando. Ad esempio "timeout": (Solo Android) Timeout per riprovare a terminare l'app (vedi di più nella documentazione Appium)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Verifica se l'applicazione specificata è installata sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Utilizzo

```js
driver.isAppInstalled(appId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID dell'app (ID pacchetto per Android, ID bundle per iOS)</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Restituisce true se installata, false se non lo è

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Ottiene lo stato dell'applicazione data sul dispositivo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Utilizzo

```js
driver.queryAppState(appId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID dell'app (ID pacchetto per Android, ID bundle per iOS)</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 non è installata. 1 non è in esecuzione. 2 è in esecuzione in background o sospesa. 3 è in esecuzione in background. 4 è in esecuzione in primo piano

##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Nasconde la tastiera software.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Utilizzo

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>strategia per nascondere la tastiera (solo UIAutomation), strategie disponibili - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>valore del tasto se la strategia è 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>codice tasto se la strategia è 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>nome del tasto se la strategia è 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Verifica se la tastiera software è visualizzata.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Utilizzo

```js
driver.isKeyboardShown()
```


##### Restituisce

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True se la tastiera è mostrata

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Posiziona un file sul dispositivo in un luogo particolare.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Utilizzo

```js
driver.pushFile(path, data)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>percorso in cui installare i dati</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>contenuti del file in base64</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Recupera un file dal file system del dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Utilizzo

```js
driver.pullFile(path)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>percorso sul dispositivo da cui estrarre il file</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenuto del file in base64

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Recupera una cartella dal file system del dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Utilizzo

```js
driver.pullFolder(path)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>percorso di un'intera cartella sul dispositivo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Attiva/disattiva la modalità aereo sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Utilizzo

```js
driver.toggleAirplaneMode()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Cambia lo stato del servizio dati.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Utilizzo

```js
driver.toggleData()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Cambia lo stato del servizio wifi.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Utilizzo

```js
driver.toggleWiFi()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Cambia lo stato del servizio di localizzazione.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Utilizzo

```js
driver.toggleLocationServices()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Imposta la velocità di rete (solo emulatore)<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Utilizzo

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Tipo di rete - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Apre le notifiche Android (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Utilizzo

```js
driver.openNotifications()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Avvia un'attività Android fornendo il nome del pacchetto e il nome dell'attività.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Utilizzo

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>nome dell'app</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>nome dell'attività</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>nome dell'app da attendere</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>nome dell'attività da attendere</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>azione intent che verrà utilizzata per avviare l'attività</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>categoria intent che verrà utilizzata per avviare l'attività</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>flag che verranno utilizzati per avviare l'attività</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>argomenti intent aggiuntivi che verranno utilizzati per avviare l'attività</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>non interrompe il processo dell'app in fase di test, prima di avviare l'app utilizzando adb</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Recupera informazioni sulla visibilità e i limiti delle barre di stato e navigazione.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Utilizzo

```js
driver.getSystemBars()
```


##### Restituisce

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Informazioni sulla visibilità e i limiti della barra di stato e navigazione

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Ottiene l'ora sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Utilizzo

```js
driver.getDeviceTime()
```


##### Restituisce

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Ora sul dispositivo

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Ottiene la densità del display dal dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilizzo

```js
driver.getDisplayDensity()
```


##### Restituisce

- **&lt;*&gt;**


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simula un evento [touch id](https://support.apple.com/en-ca/ht201371) (solo simulatore iOS). Per abilitare questa funzionalità, la capacità desiderata `allowTouchIdEnroll` deve essere impostata su true e il Simulatore deve essere [registrato](https://support.apple.com/en-ca/ht201371). Quando imposti allowTouchIdEnroll su true, imposterà il Simulatore come registrato per impostazione predefinita. Lo stato di registrazione può essere [attivato/disattivato](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Questa chiamata funzionerà solo se il processo Appium o la sua applicazione padre (ad esempio Terminal.app o Appium.app) ha accesso all'accessibilità di Mac OS in Preferenze di Sistema > Sicurezza e privacy > Privacy > Accessibilità.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Utilizzo

```js
driver.touchId(match)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>stiamo simulando un tocco riuscito (true) o un tocco fallito (false)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Attiva/disattiva il simulatore [registrato](https://support.apple.com/en-ca/ht201371) per accettare touchId (solo simulatore iOS). Per abilitare questa funzionalità, la capacità desiderata `allowTouchIdEnroll` deve essere impostata su true. Quando `allowTouchIdEnroll` è impostato su true, il Simulatore sarà registrato per impostazione predefinita, e 'Toggle Touch ID Enrollment' cambia lo stato di registrazione. Questa chiamata funzionerà solo se il processo Appium o la sua applicazione padre (ad esempio Terminal.app o Appium.app) ha accesso all'accessibilità di Mac OS in Preferenze di Sistema > Sicurezza e privacy > Privacy > Accessibilità.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Utilizzo

```js
driver.toggleEnrollTouchId(enabled)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>boolean</td>
      <td>uguale a true se la registrazione TouchID dovrebbe essere abilitata</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Avvia un'app sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Questo comando del protocollo è deprecato<br />Per iOS, utilizza `driver.execute('mobile: launchApp', { ... })`, e per Android, utilizza `driver.execute('mobile: activateApp', { ... })`.
:::

##### Utilizzo

```js
driver.launchApp()
```




##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Chiude un'app sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Questo comando del protocollo è deprecato<br />Usa `driver.execute('mobile: terminateApp', { ... })` invece
:::

##### Utilizzo

```js
driver.closeApp()
```




##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Invia l'app attualmente in esecuzione per questa sessione in background.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Questo comando del protocollo è deprecato<br />Usa `driver.execute('mobile: backgroundApp', { ... })` invece
:::

##### Utilizzo

```js
driver.background(seconds)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>timeout per ripristinare l'app, se 'null' l'app non verrà ripristinata</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Ottiene i dati di copertura del test.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Utilizzo

```js
driver.endCoverage(intent, path)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intent da trasmettere</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>percorso al file .ec</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Ottiene le stringhe dell'app.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Utilizzo

```js
driver.getStrings(language, stringFile)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>codice lingua</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>percorso al file di stringa</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** tutte le stringhe definite da un'app per la lingua specificata e il nome del file di stringhe

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilizzo

```js
driver.setValueImmediate(elementId, text)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una chiamata precedente a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>testo da impostare a un elemento</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Sostituisci il valore all'elemento direttamente.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilizzo

```js
driver.replaceValue(elementId, value)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'id di un elemento restituito in una chiamata precedente a Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>valore da sostituire sull'elemento</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Recupera le impostazioni correnti sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Utilizzo

```js
driver.getSettings()
```


##### Restituisce

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** hash JSON di tutte le impostazioni attualmente specificate, vedi Settings API

##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Aggiorna l'impostazione corrente sul dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Utilizzo

```js
driver.updateSettings(settings)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>oggetto chiave/valore con le impostazioni da aggiornare</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL di callback per l'esecuzione asincrona di JavaScript.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilizzo

```js
driver.receiveAsyncResponse(response)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>risposta da ricevere sul dispositivo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Effettua una chiamata GSM (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Utilizzo

```js
driver.gsmCall(phoneNumber, action)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>il numero di telefono da chiamare</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>L'azione - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Imposta la potenza del segnale GSM (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Utilizzo

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>potenza del segnale nell'intervallo [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>potenza del segnale nell'intervallo [0, 4]. Si prega di impostare anche questo parametro con lo stesso valore se si utilizza Appium v1.11.0 o inferiore (vedi https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Imposta la percentuale della batteria (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Utilizzo

```js
driver.powerCapacity(percent)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>valore percentuale nell'intervallo [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Imposta lo stato del caricabatterie su collegato o non collegato (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Utilizzo

```js
driver.powerAC(state)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>imposta lo stato. on o off</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Imposta lo stato della voce GSM (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Utilizzo

```js
driver.gsmVoice(state)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>stato della voce GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simula un messaggio SMS (solo emulatore).<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Utilizzo

```js
driver.sendSms(phoneNumber, message)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>il numero di telefono a cui inviare l'SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>il messaggio SMS</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Autentica gli utenti utilizzando le scansioni delle impronte digitali su emulatori supportati.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Utilizzo

```js
driver.fingerPrint(fingerprintId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>impronte digitali memorizzate nel sistema Android Keystore (da 1 a 10)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Imposta il contenuto degli appunti di sistema<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Utilizzo

```js
driver.setClipboard(content, contentType, label)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Il contenuto degli appunti codificato in base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il tipo di contenuto da ottenere. Plaintext, Image, URL. Android supporta solo plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Etichetta dei dati degli appunti per Android</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Risposta dal server Appium

##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Ottieni il contenuto degli appunti di sistema<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Utilizzo

```js
driver.getClipboard(contentType)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il tipo di contenuto da ottenere. Plaintext, Image, URL. Android supporta solo plaintext</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenuto degli appunti come stringa codificata in base64 o una stringa vuota se gli appunti sono vuoti

##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Questa funzionalità è disponibile solo all'interno di un contesto nativo. 'Touch Perform' funziona in modo simile alle altre interazioni touch singole, tranne che questo ti consente di concatenare insieme più di un'azione touch come un unico comando. Questo è utile perché i comandi Appium vengono inviati tramite la rete e c'è latenza tra i comandi. Questa latenza può rendere impossibili alcune interazioni touch perché alcune interazioni devono essere eseguite in una sequenza. Vertical, ad esempio, richiede di premere, spostarsi su una coordinata y diversa e poi rilasciare. Affinché funzioni, non ci può essere un ritardo tra le interazioni.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Utilizzo

```js
driver.touchPerform(actions)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Il tipo di azione da eseguire (ad es. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Esempio


```js
// do a horizontal swipe by percentage
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Questa funzionalità è disponibile solo all'interno di un contesto nativo. Esegue una sequenza di azioni multi-touch.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Utilizzo

```js
driver.multiTouchPerform(actions)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Il tipo di azione da eseguire (ad es. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Questo comando ti consente di specificare uno script WebdriverIO come stringa e trasmetterlo al server Appium per l'esecuzione locale sul server stesso. Questo approccio aiuta a ridurre al minimo la potenziale latenza associata a ciascun comando. ***Per utilizzare questo comando con Appium 2.0, devi avere il plugin [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) installato.***<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Utilizzo

```js
driver.executeDriverScript(script, type, timeout)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Lo script da eseguire. Ha accesso a un oggetto 'driver' che rappresenta una sessione WebdriverIO collegata al server corrente.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>Il linguaggio/framework utilizzato nello script. Attualmente, solo 'webdriverio' è supportato ed è il valore predefinito.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>Il numero di millisecondi in cui lo script dovrebbe essere autorizzato a funzionare prima di essere interrotto dal server Appium. Il valore predefinito è l'equivalente di 1 ora.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un oggetto contenente due campi: 'result', che è il valore di ritorno dello script stesso, e 'logs', che contiene 3 campi interni, 'log', 'warn' e 'error', che contengono un array di stringhe registrate da console.log, console.warn e console.error nell'esecuzione dello script.


---

## getEvents
Ottieni gli eventi memorizzati nel server appium.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Utilizzo

```js
driver.getEvents(type)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Ottieni gli eventi filtrati con il tipo se il tipo è fornito.</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un hash JSON di eventi come `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Memorizza un evento personalizzato.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Utilizzo

```js
driver.logEvent(vendor, event)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Il nome del vendor. Sarà `vendor` in `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Il nome dell'evento. Sarà `event` in `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Questa funzionalità conduce confronti di immagini utilizzando le capacità del framework OpenCV. Si noti che affinché questa funzionalità funzioni, sia il framework OpenCV che il modulo opencv4nodejs devono essere installati sulla macchina in cui è operativo il server Appium. ***Inoltre, dovrai avere il plugin [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) installato per utilizzare questa funzionalità con Appium 2.0.***<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Utilizzo

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Una delle modalità di confronto possibili: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' è predefinito.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Dati dell'immagine. Sono supportati tutti i formati di immagine che la libreria OpenCV stessa accetta.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Dati dell'immagine. Sono supportati tutti i formati di immagine che la libreria OpenCV stessa accetta.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Il contenuto di questo dizionario dipende dal valore effettivo di `mode`. Consulta la documentazione sul modulo `appium-support` per maggiori dettagli. </td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Il contenuto del dizionario risultante dipende dai valori effettivi di `mode` e `options`. Consulta la documentazione sul modulo `appium-support` per maggiori dettagli.


---

## implicitWait
Imposta la quantità di tempo che il driver dovrebbe attendere durante la ricerca degli elementi. Quando si cerca un singolo elemento, il driver dovrebbe interrogare la pagina fino a quando un elemento viene trovato o il timeout scade, a seconda di quale evento si verifica per primo. Quando si cercano più elementi, il driver dovrebbe interrogare la pagina fino a quando almeno un elemento viene trovato o il timeout scade, momento in cui dovrebbe restituire un elenco vuoto. Se questo comando non viene mai inviato, il driver dovrebbe impostare un'attesa implicita di 0ms per impostazione predefinita.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.implicitWait(ms)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La quantità di tempo, in millisecondi, da attendere su un elemento.</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Determina la posizione di un elemento sullo schermo una volta che è stato fatto scorrere in vista.<br /><br />__Nota:__ Questo è considerato un comando interno e dovrebbe essere utilizzato solo per determinare la posizione di un elemento per generare correttamente eventi nativi.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getLocationInView(elementId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID dell'elemento a cui instradare il comando</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Le coordinate X e Y dell'elemento nella pagina.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Invia una sequenza di battute di tasti all'elemento attivo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.sendKeys(value)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>La sequenza di tasti da digitare. Deve essere fornito un array.</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Elenca tutti i motori disponibili sulla macchina. Per utilizzare un motore, deve essere presente in questo elenco.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.availableIMEEngines()
```


##### Restituisce

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Un elenco di motori disponibili

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Ottiene il nome del motore IME attivo. La stringa del nome è specifica per la piattaforma.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getActiveIMEEngine()
```


##### Restituisce

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Il nome del motore IME attivo

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indica se l'input IME è attivo al momento<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.isIMEActivated()
```


##### Restituisce

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** True se l'input IME è disponibile e attualmente attivo, altrimenti false

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Disattiva il motore IME attualmente attivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.deactivateIMEEngine()
```




##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Rende attivo un motore disponibile<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.activateIMEEngine(engine)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>nome del motore da attivare</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Imposta la quantità di tempo, in millisecondi, che gli script asincroni eseguiti da `/session/:sessionId/execute_async` sono autorizzati a funzionare prima di essere interrotti e un errore `Timeout` viene restituito al client.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.asyncScriptTimeout(ms)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La quantità di tempo, in millisecondi, che i comandi con limite di tempo sono autorizzati a funzionare</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Invia un elemento del modulo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.submit(elementId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID dell'elemento del modulo da inviare</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Determina la dimensione di un elemento in pixel. La dimensione verrà restituita come un oggetto JSON con proprietà `width` e `height`.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getElementSize(elementId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID dell'elemento a cui instradare il comando</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** La larghezza e l'altezza dell'elemento, in pixel.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Determina la posizione di un elemento nella pagina. Il punto `(0, 0)` si riferisce all'angolo in alto a sinistra della pagina. Le coordinate dell'elemento vengono restituite come un oggetto JSON con proprietà `x` e `y`.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getElementLocation(elementId)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID dell'elemento a cui instradare il comando</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Le coordinate X e Y dell'elemento nella pagina.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Tocco singolo sul dispositivo abilitato al tocco.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchClick(element)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID dell'elemento su cui fare un tocco singolo.</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Dito giù sullo schermo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchDown(x, y)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordinata x sullo schermo</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordinata y sullo schermo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Dito su sullo schermo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchUp(x, y)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordinata x sullo schermo</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordinata y sullo schermo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Movimento del dito sullo schermo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchMove(x, y)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordinata x sullo schermo</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordinata y sullo schermo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Pressione prolungata sullo schermo touch utilizzando eventi di movimento delle dita.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchLongClick(element)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID dell'elemento su cui effettuare una pressione prolungata</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Scorrimento veloce sullo schermo touch utilizzando eventi di movimento delle dita. Questo comando di scorrimento inizia in una particolare posizione dello schermo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>l'offset x in pixel per il flick</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>l'offset y in pixel per il flick</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>string</td>
      <td>ID dell'elemento dove inizia il flick</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>la velocità in pixel al secondo</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>la velocità x in pixel al secondo</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>number</td>
      <td>la velocità y in pixel al secondo</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Ottiene l'orientamento corrente del dispositivo.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getOrientation()
```


##### Restituisce

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** L'orientamento corrente corrispondente a un valore definito in ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Imposta l'orientamento del dispositivo<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.setOrientation(orientation)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>il nuovo orientamento del browser come definito in ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Ottiene il log per un determinato tipo di log. Il buffer di log viene azzerato dopo ogni richiesta.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getLogs(type)
```


##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>il tipo di log</td>
    </tr>
  </tbody>
</table>


##### Restituisce

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** L'elenco delle voci di log.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Ottieni i tipi di log disponibili.<br /><br />Comando Appium. Maggiori dettagli possono essere trovati nella [documentazione ufficiale del protocollo](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilizzo

```js
driver.getLogTypes()
```


##### Restituisce

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** L'elenco dei tipi di log disponibili.

##### Supporto

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
