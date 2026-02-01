---
id: tools
title: Strumenti
---

I seguenti strumenti sono disponibili tramite il server WebdriverIO MCP. Questi strumenti consentono agli assistenti AI di automatizzare browser e applicazioni mobili.

## Gestione della Sessione

### `start_browser`

Avvia una sessione del browser Chrome.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `headless` | boolean | No | `false` | Esegui Chrome in modalità headless |
| `windowWidth` | number | No | `1920` | Larghezza della finestra del browser (400-3840) |
| `windowHeight` | number | No | `1080` | Altezza della finestra del browser (400-2160) |
| `navigationUrl` | string | No | - | URL a cui navigare dopo l'avvio del browser |

#### Esempio

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### Supporto

- Browser Desktop

---

### `start_app_session`

Avvia una sessione di app mobile su iOS o Android tramite Appium.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `platform` | string | Sì | - | Piattaforma da automatizzare: `iOS` o `Android` |
| `deviceName` | string | Sì | - | Nome del dispositivo o simulatore/emulatore |
| `appPath` | string | No* | - | Percorso al file dell'app (.app, .ipa, o .apk) |
| `platformVersion` | string | No | - | Versione del sistema operativo (es., `17.0`, `14`) |
| `automationName` | string | No | Auto | `XCUITest` (iOS), `UiAutomator2` o `Espresso` (Android) |
| `udid` | string | No | - | Identificatore unico del dispositivo (richiesto per dispositivi iOS reali) |
| `noReset` | boolean | No | `false` | Preserva lo stato dell'app tra le sessioni |
| `fullReset` | boolean | No | `true` | Disinstalla e reinstalla l'app prima della sessione |
| `autoGrantPermissions` | boolean | No | `true` | Concedi automaticamente i permessi all'app |
| `autoAcceptAlerts` | boolean | No | `true` | Accetta automaticamente gli avvisi di sistema |
| `autoDismissAlerts` | boolean | No | `false` | Ignora (invece di accettare) gli avvisi |
| `appWaitActivity` | string | No | - | Activity da attendere all'avvio (solo Android) |
| `newCommandTimeout` | number | No | `60` | Secondi prima che la sessione scada per inattività |
| `appiumHost` | string | No | `127.0.0.1` | Hostname del server Appium |
| `appiumPort` | number | No | `4723` | Porta del server Appium |
| `appiumPath` | string | No | `/` | Percorso del server Appium |

*È necessario fornire `appPath` o impostare `noReset: true` per connettersi a un'app già in esecuzione.

#### Esempio

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### Supporto

- Simulatori iOS
- Dispositivi iOS reali
- Emulatori Android
- Dispositivi Android reali

---

### `close_session`

Chiude la sessione corrente del browser o dell'app.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `detach` | boolean | No | `false` | Separa dalla sessione invece di chiuderla (mantiene browser/app in esecuzione) |

#### Note

Le sessioni con `noReset: true` o senza `appPath` si separano automaticamente alla chiusura per preservare lo stato.

#### Supporto

- Browser Desktop
- App Mobili

---

## Navigazione

### `navigate`

Naviga a un URL.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `url` | string | Sì | L'URL a cui navigare |

#### Esempio

```
Navigate to https://webdriver.io
```

#### Supporto

- Browser Desktop

---

## Interazione con Elementi

### `click_element`

Clicca un elemento identificato da un selettore.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `selector` | string | Sì | - | Selettore CSS, XPath o selettore mobile |
| `scrollToView` | boolean | No | `true` | Scorri l'elemento in vista prima di cliccare |
| `timeout` | number | No | `3000` | Tempo massimo di attesa per l'elemento (ms) |

#### Note

- Supporta i selettori di testo WebdriverIO: `button=Testo esatto` o `a*=Contiene testo`
- Utilizza l'allineamento centrale per il posizionamento durante lo scorrimento

#### Esempio

```
Click the element with selector "#submit-button"
```

#### Supporto

- Browser Desktop
- App Native Mobili

---

### `set_value`

Digita testo in un campo di input.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `selector` | string | Sì | - | Selettore per l'elemento di input |
| `value` | string | Sì | - | Testo da digitare |
| `scrollToView` | boolean | No | `true` | Scorri l'elemento in vista prima di digitare |
| `timeout` | number | No | `3000` | Tempo massimo di attesa per l'elemento (ms) |

#### Note

Cancella il valore esistente prima di digitare il nuovo testo.

#### Esempio

```
Set the value "john@example.com" in the element with selector "#email"
```

#### Supporto

- Browser Desktop
- App Native Mobili

---

## Analisi della Pagina

### `get_visible_elements`

Ottiene gli elementi visibili e interagibili nella pagina o schermata corrente. Questo è lo strumento principale per scoprire quali elementi sono disponibili per l'interazione.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `elementType` | string | No | `interactable` | Tipo di elementi: `interactable` (pulsanti/link/input), `visual` (immagini/SVG), o `all` |
| `inViewportOnly` | boolean | No | `true` | Restituisce solo elementi visibili nel viewport |
| `includeContainers` | boolean | No | `false` | Includi container di layout (ViewGroup, ScrollView, ecc.) |
| `includeBounds` | boolean | No | `false` | Includi coordinate degli elementi (x, y, larghezza, altezza) |
| `limit` | number | No | `0` | Numero massimo di elementi da restituire (0 = illimitato) |
| `offset` | number | No | `0` | Numero di elementi da saltare (per la paginazione) |

#### Restituisce

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**Gli elementi web includono:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**Gli elementi mobili includono:** Molteplici strategie di localizzazione (accessibility ID, resource ID, XPath, UiAutomator/predicates), tipo di elemento, testo e opzionalmente i limiti

#### Note

- **Web**: Utilizza uno script browser ottimizzato per il rilevamento rapido degli elementi
- **Mobile**: Utilizza l'analisi efficiente della sorgente XML della pagina (2 chiamate HTTP anziché 600+ per le query sugli elementi)
- Utilizza la paginazione (`limit` e `offset`) per pagine grandi per ridurre l'uso di token

#### Esempio

```
Get all visible elements on the page with their coordinates
```

#### Supporto

- Browser Desktop
- App Mobili

---

### `get_accessibility`

Ottiene l'albero di accessibilità della pagina corrente con informazioni semantiche su ruoli, nomi e stati.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `limit` | number | No | `100` | Numero massimo di nodi da restituire (0 = illimitato) |
| `offset` | number | No | `0` | Numero di nodi da saltare (per la paginazione) |
| `roles` | string[] | No | Tutti | Filtra per ruoli specifici (es., `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | No | `true` | Restituisce solo nodi con un nome/etichetta |

#### Restituisce

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### Note

- Solo browser. Per app mobili, usa `get_visible_elements` invece
- Utile quando `get_visible_elements` non restituisce gli elementi previsti
- `namedOnly: true` filtra i contenitori anonimi e riduce il rumore

#### Supporto

- Browser Desktop

---

## Screenshot

### `take_screenshot`

Cattura uno screenshot del viewport corrente.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `outputPath` | string | No | Percorso per salvare il file screenshot. Se omesso, restituisce dati base64 |

#### Restituisce

Dati immagine codificati in base64 (PNG o JPEG) con informazioni sulla dimensione.

#### Note

Gli screenshot vengono automaticamente ottimizzati:
- Dimensione massima: 2000px (ridotta in scala se più grande)
- Dimensione massima file: 1MB
- Formato: PNG con compressione massima, o JPEG se necessario per rispettare il limite di dimensione

#### Supporto

- Browser Desktop
- App Mobili

---

## Scorrimento

### `scroll`

Scorre la pagina verso l'alto o verso il basso di un numero specificato di pixel.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `direction` | string | Sì | - | Direzione di scorrimento: `up` o `down` |
| `pixels` | number | No | `500` | Numero di pixel da scorrere |

#### Note

Solo browser. Per lo scorrimento su mobile, usa lo strumento `swipe` invece.

#### Supporto

- Browser Desktop

---

## Gestione dei Cookie

### `get_cookies`

Ottiene i cookie dalla sessione corrente.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `name` | string | No | Nome specifico del cookie da recuperare (ometti per tutti i cookie) |

#### Restituisce

Oggetti cookie con proprietà name, value, domain, path, expiry, secure e httpOnly.

#### Supporto

- Browser Desktop

---

### `set_cookie`

Imposta un cookie nella sessione corrente.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `name` | string | Sì | - | Nome del cookie |
| `value` | string | Sì | - | Valore del cookie |
| `domain` | string | No | Corrente | Dominio del cookie |
| `path` | string | No | `/` | Percorso del cookie |
| `expiry` | number | No | - | Scadenza come timestamp Unix (secondi) |
| `secure` | boolean | No | - | Flag secure |
| `httpOnly` | boolean | No | - | Flag HttpOnly |
| `sameSite` | string | No | - | Attributo SameSite: `strict`, `lax` o `none` |

#### Supporto

- Browser Desktop

---

### `delete_cookies`

Elimina i cookie dalla sessione corrente.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `name` | string | No | Nome specifico del cookie da eliminare (ometti per eliminare tutti) |

#### Supporto

- Browser Desktop

---

## Gesti Touch (Mobile)

### `tap_element`

Tocca un elemento o coordinate dello schermo.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `selector` | string | No* | Selettore per l'elemento da toccare |
| `x` | number | No* | Coordinata X per il tocco |
| `y` | number | No* | Coordinata Y per il tocco |

*È richiesto o `selector` o entrambi `x` e `y`.

#### Supporto

- App Mobili

---

### `swipe`

Esegue un gesto di scorrimento nella direzione specificata.

#### Parametri

| Parametro | Tipo | Obbligatorio | Predefinito | Descrizione |
|-----------|------|--------------|-------------|-------------|
| `direction` | string | Sì | - | Direzione di scorrimento: `up`, `down`, `left`, `right` |
| `duration` | number | No | `500` | Durata dello scorrimento in millisecondi (100-5000) |
| `percent` | number | No | 0.5/0.95 | Percentuale di schermo da scorrere (0-1) |

#### Note

- Percentuale predefinita: 0.5 per scorrimenti verticali, 0.95 per scorrimenti orizzontali
- La direzione indica il movimento del contenuto: "swipe up" fa scorrere il contenuto verso l'alto

#### Esempio

```
Swipe up to scroll down the screen
```

#### Supporto

- App Mobili

---

### `drag_and_drop`

Trascina un elemento su un altro elemento o coordinate.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `sourceSelector` | string | Sì | Selettore dell'elemento di origine da trascinare |
| `targetSelector` | string | No* | Selettore dell'elemento di destinazione su cui rilasciare |
| `x` | number | No* | Offset X di destinazione (se non c'è targetSelector) |
| `y` | number | No* | Offset Y di destinazione (se non c'è targetSelector) |
| `duration` | number | No | Predefinito | Durata del trascinamento in millisecondi (100-5000) |

*È richiesto o `targetSelector` o entrambi `x` e `y`.

#### Supporto

- App Mobili

---

## Ciclo di vita dell'App (Mobile)

### `get_app_state`

Ottiene lo stato corrente di un'app.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `bundleId` | string | Sì | Identificatore dell'app (bundle ID per iOS, nome pacchetto per Android) |

#### Restituisce

Stato dell'app: `not installed`, `not running`, `running in background (suspended)`, `running in background`, o `running in foreground`.

#### Supporto

- App Mobili

---

## Cambio di Contesto (App Ibride)

### `get_contexts`

Elenca tutti i contesti disponibili (nativi e webview).

#### Parametri

Nessuno

#### Restituisce

Array di nomi di contesto (es., `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### Supporto

- App Ibride Mobili

---

### `get_current_context`

Ottiene il contesto attualmente attivo.

#### Parametri

Nessuno

#### Restituisce

Nome del contesto corrente (es., `NATIVE_APP` o `WEBVIEW_*`).

#### Supporto

- App Ibride Mobili

---

### `switch_context`

Passa tra contesti nativi e webview.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `context` | string | Sì | Nome del contesto o indice (a base 1) da `get_contexts` |

#### Esempio

```
Switch to the WEBVIEW_com.example.app context
```

#### Supporto

- App Ibride Mobili

---

## Controllo Dispositivo (Mobile)

### `rotate_device`

Ruota il dispositivo in un orientamento specifico.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `orientation` | string | Sì | `PORTRAIT` o `LANDSCAPE` |

#### Supporto

- App Mobili

---

### `hide_keyboard`

Nasconde la tastiera sullo schermo.

#### Parametri

Nessuno

#### Supporto

- App Mobili

---

### `get_geolocation`

Ottiene le coordinate GPS correnti.

#### Parametri

Nessuno

#### Restituisce

Oggetto con `latitude`, `longitude` e `altitude`.

#### Supporto

- App Mobili

---

### `set_geolocation`

Imposta le coordinate GPS del dispositivo.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `latitude` | number | Sì | Coordinata di latitudine (-90 a 90) |
| `longitude` | number | Sì | Coordinata di longitudine (-180 a 180) |
| `altitude` | number | No | Altitudine in metri |

#### Esempio

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### Supporto

- App Mobili

---

## Esecuzione di Script

### `execute_script`

Esegue JavaScript nel browser o comandi mobili tramite Appium.

#### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `script` | string | Sì | Codice JavaScript (browser) o comando mobile (es., `mobile: pressKey`) |
| `args` | array | No | Argomenti per lo script |

#### Esempi Browser

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### Esempi Mobile (Appium)

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### Codici Tasti Android Comuni

| Tasto | Codice |
|-------|--------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### Altri Comandi Mobili

Per un elenco completo dei comandi mobili disponibili di Appium, vedi:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### Supporto

- Browser Desktop
- App Mobili (tramite comandi mobili Appium)