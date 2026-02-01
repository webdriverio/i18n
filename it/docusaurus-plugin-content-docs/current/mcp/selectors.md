---
id: selectors
title: Selettori
---

Il server WebdriverIO MCP supporta molteplici strategie di selettori per localizzare elementi su pagine web e applicazioni mobili.

:::info

Per una documentazione completa sui selettori, incluse tutte le strategie di selezione di WebdriverIO, consulta la guida principale [Selectors](/docs/selectors). Questa pagina si concentra sui selettori comunemente utilizzati con il server MCP.

:::

## Selettori Web

Per l'automazione del browser, il server MCP supporta tutti i selettori standard WebdriverIO. I più comunemente utilizzati includono:

| Selettore | Esempio | Descrizione |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Selettori CSS standard |
| XPath | `//button[@id='submit']` | Espressioni XPath |
| Testo | `button=Submit`, `a*=Click` | Selettori di testo WebdriverIO |
| ARIA | `aria/Submit Button` | Selettori di nome per accessibilità |
| Test ID | `[data-testid="submit"]` | Raccomandati per i test |

Per esempi dettagliati e best practice, consulta la documentazione [Selectors](/docs/selectors).

---

## Selettori Mobili

I selettori mobili funzionano con entrambe le piattaforme iOS e Android attraverso Appium.

### Accessibility ID (Raccomandato)

Gli Accessibility ID sono i **selettori cross-platform più affidabili**. Funzionano sia su iOS che su Android e sono stabili attraverso gli aggiornamenti delle app.

```
# Sintassi
~accessibilityId

# Esempi
~loginButton
~submitForm
~usernameField
```

:::tip Migliore Pratica
Preferisci sempre gli accessibility ID quando disponibili. Essi forniscono:
- Compatibilità cross-platform (iOS + Android)
- Stabilità attraverso modifiche dell'interfaccia utente
- Migliore manutenibilità dei test
- Miglioramento dell'accessibilità della tua app
:::

### Selettori Android

#### UiAutomator

I selettori UiAutomator sono potenti e veloci per Android.

```
# Per Testo
android=new UiSelector().text("Login")

# Per Testo Parziale
android=new UiSelector().textContains("Log")

# Per Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Per Nome Classe
android=new UiSelector().className("android.widget.Button")

# Per Descrizione (Accessibilità)
android=new UiSelector().description("Login button")

# Condizioni Combinate
android=new UiSelector().className("android.widget.Button").text("Login")

# Contenitore Scorrevole
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

I Resource ID forniscono un'identificazione stabile degli elementi su Android.

```
# Resource ID completo
id=com.example.app:id/login_button

# ID parziale (pacchetto app dedotto)
id=login_button
```

#### XPath (Android)

XPath funziona su Android ma è più lento di UiAutomator.

```
# Per Classe e Testo
//android.widget.Button[@text='Login']

# Per Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Per Descrizione Contenuto
//android.widget.ImageButton[@content-desc='Menu']

# Gerarchico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selettori iOS

#### Predicate String

Le iOS Predicate Strings sono veloci e potenti per l'automazione iOS.

```
# Per Etichetta
-ios predicate string:label == "Login"

# Per Etichetta Parziale
-ios predicate string:label CONTAINS "Log"

# Per Nome
-ios predicate string:name == "loginButton"

# Per Tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Per Valore
-ios predicate string:value == "ON"

# Condizioni Combinate
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilità
-ios predicate string:label == "Login" AND visible == 1

# Case Insensitive
-ios predicate string:label ==[c] "login"
```

**Operatori Predicate:**

| Operatore | Descrizione |
|----------|-------------|
| `==` | Uguale a |
| `!=` | Diverso da |
| `CONTAINS` | Contiene sottostringa |
| `BEGINSWITH` | Inizia con |
| `ENDSWITH` | Termina con |
| `LIKE` | Corrispondenza con caratteri jolly |
| `MATCHES` | Corrispondenza regex |
| `AND` | AND logico |
| `OR` | OR logico |

#### Class Chain

Le iOS Class Chains forniscono una localizzazione gerarchica degli elementi con buone prestazioni.

```
# Figlio Diretto
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Qualsiasi Discendente
-ios class chain:**/XCUIElementTypeButton

# Per Indice
-ios class chain:**/XCUIElementTypeCell[3]

# Combinato con Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Gerarchico
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Ultimo Elemento
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funziona su iOS ma è più lento delle predicate strings.

```
# Per Tipo ed Etichetta
//XCUIElementTypeButton[@label='Login']

# Per Nome
//XCUIElementTypeTextField[@name='username']

# Per Valore
//XCUIElementTypeSwitch[@value='1']

# Gerarchico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Strategia di Selezione Cross-Platform

Quando scrivi test che devono funzionare sia su iOS che su Android, usa questo ordine di priorità:

### 1. Accessibility ID (Migliore)

```
# Funziona su entrambe le piattaforme
~loginButton
```

### 2. Selettori Specifici della Piattaforma con Logica Condizionale

Quando gli accessibility ID non sono disponibili, usa selettori specifici per piattaforma:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Ultima Risorsa)

XPath funziona su entrambe le piattaforme ma con tipi di elementi diversi:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Riferimento Tipi di Elementi

### Tipi di Elementi Android

| Tipo | Descrizione |
|------|-------------|
| `android.widget.Button` | Pulsante |
| `android.widget.EditText` | Input testuale |
| `android.widget.TextView` | Etichetta testuale |
| `android.widget.ImageView` | Immagine |
| `android.widget.ImageButton` | Pulsante immagine |
| `android.widget.CheckBox` | Checkbox |
| `android.widget.RadioButton` | Pulsante radio |
| `android.widget.Switch` | Interruttore |
| `android.widget.Spinner` | Menu a discesa |
| `android.widget.ListView` | Vista a lista |
| `android.widget.RecyclerView` | Vista riciclabile |
| `android.widget.ScrollView` | Contenitore scorrevole |

### Tipi di Elementi iOS

| Tipo | Descrizione |
|------|-------------|
| `XCUIElementTypeButton` | Pulsante |
| `XCUIElementTypeTextField` | Input testuale |
| `XCUIElementTypeSecureTextField` | Input password |
| `XCUIElementTypeStaticText` | Etichetta testuale |
| `XCUIElementTypeImage` | Immagine |
| `XCUIElementTypeSwitch` | Interruttore |
| `XCUIElementTypeSlider` | Slider |
| `XCUIElementTypePicker` | Selettore a rotella |
| `XCUIElementTypeTable` | Vista tabella |
| `XCUIElementTypeCell` | Cella tabella |
| `XCUIElementTypeCollectionView` | Vista collezione |
| `XCUIElementTypeScrollView` | Vista scorrevole |

---

## Migliori Pratiche

### Da fare

- **Usa accessibility ID** per selettori stabili e cross-platform
- **Aggiungi attributi data-testid** agli elementi web per i test
- **Usa resource ID** su Android quando gli accessibility ID non sono disponibili
- **Preferisci predicate strings** rispetto a XPath su iOS
- **Mantieni i selettori semplici** e specifici

### Da evitare

- **Evita espressioni XPath lunghe** - sono lente e fragili
- **Non affidarti agli indici** per liste dinamiche
- **Evita selettori basati sul testo** per app localizzate
- **Non usare XPath assoluti** (partendo dalla radice)

### Esempi di Selettori Buoni vs Cattivi

```
# Buono - Accessibility ID stabile
~loginButton

# Cattivo - XPath fragile con indici
//div[3]/form/button[2]

# Buono - CSS specifico con test ID
[data-testid="submit-button"]

# Cattivo - Classe che potrebbe cambiare
.btn-primary-lg-v2

# Buono - UiAutomator con resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Cattivo - Testo che potrebbe essere localizzato
android=new UiSelector().text("Submit")
```

---

## Debug dei Selettori

### Web (Chrome DevTools)

1. Apri Chrome DevTools (F12)
2. Usa il pannello Elements per ispezionare gli elementi
3. Fai clic destro su un elemento → Copia → Copia selettore
4. Testa i selettori in Console: `document.querySelector('your-selector')`

### Mobile (Appium Inspector)

1. Avvia Appium Inspector
2. Connettiti alla tua sessione in esecuzione
3. Fai clic sugli elementi per vedere tutti gli attributi disponibili
4. Usa la funzione "Search for element" per testare i selettori

### Utilizzo di `get_visible_elements`

Lo strumento `get_visible_elements` del server MCP restituisce molteplici strategie di selezione per ogni elemento:

```
Ask Claude: "Get all visible elements on the screen"
```

Questo restituisce elementi con selettori pre-generati che puoi usare direttamente.

#### Opzioni Avanzate

Per un maggiore controllo sulla scoperta degli elementi:

```
# Ottieni solo immagini ed elementi visivi
Get visible elements with elementType "visual"

# Ottieni elementi con le loro coordinate per debug di layout
Get visible elements with includeBounds enabled

# Ottieni i successivi 20 elementi (paginazione)
Get visible elements with limit 20 and offset 20

# Includi contenitori di layout per debug
Get visible elements with includeContainers enabled
```

Lo strumento restituisce una risposta paginata:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Utilizzo di `get_accessibility` (Solo Browser)

Per l'automazione del browser, lo strumento `get_accessibility` fornisce informazioni semantiche sugli elementi della pagina:

```
# Ottieni tutti i nodi di accessibilità nominati
Get accessibility tree

# Filtra solo pulsanti e link
Get accessibility tree filtered to button and link roles

# Ottieni la pagina successiva dei risultati
Get accessibility tree with limit 50 and offset 50
```

Questo è utile quando `get_visible_elements` non restituisce gli elementi previsti, poiché interroga l'API di accessibilità nativa del browser.