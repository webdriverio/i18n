---
id: selectors
title: Selettori
description: "Scegli i selettori per individuare gli elementi nelle pagine web e nelle app mobili durante l'automazione con il server MCP di WebdriverIO."
---

Il server MCP di WebdriverIO supporta diverse strategie di selezione per individuare gli elementi nelle pagine web e nelle app mobili.

:::info

Per una documentazione completa sui selettori, comprese tutte le strategie di selezione di WebdriverIO, consulta la guida principale [Selettori](/docs/selectors). Questa pagina si concentra sui selettori comunemente utilizzati con il server MCP.

:::

## Selettori Web

Per l'automazione del browser, il server MCP supporta tutti i selettori standard di WebdriverIO. I più utilizzati includono:

| Selettore | Esempio                        | Descrizione                          |
| --------- | ------------------------------ | ------------------------------------ |
| CSS       | `#login-button`, `.submit-btn` | Selettori CSS standard               |
| XPath     | `//button[@id='submit']`       | Espressioni XPath                    |
| Text      | `button=Submit`, `a*=Click`    | Selettori di testo di WebdriverIO    |
| ARIA      | `aria/Submit Button`           | Selettori per nome di accessibilità  |
| Test ID   | `[data-testid="submit"]`       | Consigliati per i test               |

Per esempi dettagliati e buone pratiche, consulta la documentazione sui [Selettori](/docs/selectors).

## Selettori Mobile

I selettori mobile funzionano sia su piattaforme iOS che Android tramite Appium.

### Accessibility ID (Consigliato)

Gli Accessibility ID sono il **selettore multipiattaforma più affidabile**. Funzionano sia su iOS che su Android e rimangono stabili tra gli aggiornamenti dell'app.

```text
# Sintassi
~accessibilityId

# Esempi
~loginButton
~submitForm
~usernameField
```

:::tip Buona pratica
Preferisci sempre gli accessibility ID quando disponibili. Offrono:
- Compatibilità multipiattaforma (iOS + Android)
- Stabilità rispetto alle modifiche dell'interfaccia utente
- Migliore manutenibilità dei test
- Migliore accessibilità della tua app
:::

### Selettori Android

#### UiAutomator

I selettori UiAutomator sono potenti e veloci per Android.

```text
# Per testo
android=new UiSelector().text("Login")

# Per testo parziale
android=new UiSelector().textContains("Log")

# Per Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Per nome della classe
android=new UiSelector().className("android.widget.Button")

# Per descrizione (accessibilità)
android=new UiSelector().description("Login button")

# Condizioni combinate
android=new UiSelector().className("android.widget.Button").text("Login")

# Contenitore scorrevole
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

I Resource ID forniscono un'identificazione stabile degli elementi su Android.

```text
# Resource ID completo
id=com.example.app:id/login_button

# ID parziale (package dell'app dedotto)
id=login_button
```

#### XPath (Android)

XPath funziona su Android ma è più lento di UiAutomator.

```text
# Per classe e testo
//android.widget.Button[@text='Login']

# Per Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Per Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Gerarchico
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selettori iOS

#### Predicate String

Le Predicate String di iOS sono veloci e potenti per l'automazione iOS.

```text
# Per label
-ios predicate string:label == "Login"

# Per label parziale
-ios predicate string:label CONTAINS "Log"

# Per nome
-ios predicate string:name == "loginButton"

# Per tipo
-ios predicate string:type == "XCUIElementTypeButton"

# Per valore
-ios predicate string:value == "ON"

# Condizioni combinate
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibilità
-ios predicate string:label == "Login" AND visible == 1

# Senza distinzione tra maiuscole e minuscole
-ios predicate string:label ==[c] "login"
```

**Operatori dei predicati:**

| Operatore    | Descrizione                    |
| ------------ | ------------------------------ |
| `==`         | Uguale                         |
| `!=`         | Diverso                        |
| `CONTAINS`   | Contiene la sottostringa       |
| `BEGINSWITH` | Inizia con                     |
| `ENDSWITH`   | Termina con                    |
| `LIKE`       | Corrispondenza con caratteri jolly |
| `MATCHES`    | Corrispondenza con regex       |
| `AND`        | AND logico                     |
| `OR`         | OR logico                      |

#### Class Chain

Le Class Chain di iOS consentono di individuare gli elementi in modo gerarchico con buone prestazioni.

```text
# Figlio diretto
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Qualsiasi discendente
-ios class chain:**/XCUIElementTypeButton

# Per indice
-ios class chain:**/XCUIElementTypeCell[3]

# Combinato con un predicato
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Gerarchico
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Ultimo elemento
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funziona su iOS ma è più lento delle predicate string.

```text
# Per tipo e label
//XCUIElementTypeButton[@label='Login']

# Per nome
//XCUIElementTypeTextField[@name='username']

# Per valore
//XCUIElementTypeSwitch[@value='1']

# Gerarchico
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Strategia di selezione multipiattaforma

Quando scrivi test che devono funzionare sia su iOS che su Android, utilizza questo ordine di priorità:

### 1. Accessibility ID (Migliore)

```text
# Funziona su entrambe le piattaforme
~loginButton
```

### 2. Specifico per piattaforma con logica condizionale

Quando gli accessibility ID non sono disponibili, utilizza selettori specifici per la piattaforma:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (Ultima risorsa)

XPath funziona su entrambe le piattaforme ma con tipi di elementi diversi:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Riferimento ai tipi di elementi

### Tipi di elementi Android

| Tipo                          | Descrizione              |
| ----------------------------- | ------------------------ |
| `android.widget.Button`       | Pulsante                 |
| `android.widget.EditText`     | Campo di testo           |
| `android.widget.TextView`     | Etichetta di testo       |
| `android.widget.ImageView`    | Immagine                 |
| `android.widget.ImageButton`  | Pulsante con immagine    |
| `android.widget.CheckBox`     | Casella di controllo     |
| `android.widget.RadioButton`  | Pulsante di opzione      |
| `android.widget.Switch`       | Interruttore             |
| `android.widget.Spinner`      | Menu a tendina           |
| `android.widget.ListView`     | Vista elenco             |
| `android.widget.RecyclerView` | Recycler view            |
| `android.widget.ScrollView`   | Contenitore scorrevole   |

### Tipi di elementi iOS

| Tipo                             | Descrizione           |
| -------------------------------- | --------------------- |
| `XCUIElementTypeButton`          | Pulsante              |
| `XCUIElementTypeTextField`       | Campo di testo        |
| `XCUIElementTypeSecureTextField` | Campo password        |
| `XCUIElementTypeStaticText`      | Etichetta di testo    |
| `XCUIElementTypeImage`           | Immagine              |
| `XCUIElementTypeSwitch`          | Interruttore          |
| `XCUIElementTypeSlider`          | Cursore               |
| `XCUIElementTypePicker`          | Selettore a rotella   |
| `XCUIElementTypeTable`           | Vista tabella         |
| `XCUIElementTypeCell`            | Cella di tabella      |
| `XCUIElementTypeCollectionView`  | Collection view       |
| `XCUIElementTypeScrollView`      | Vista scorrevole      |

## Buone pratiche

### Da fare

- **Usa gli accessibility ID** per selettori stabili e multipiattaforma
- **Aggiungi attributi data-testid** agli elementi web per i test
- **Usa i resource ID** su Android quando gli accessibility ID non sono disponibili
- **Preferisci le predicate string** rispetto a XPath su iOS
- **Mantieni i selettori semplici** e specifici

### Da non fare

- **Evita espressioni XPath lunghe** - sono lente e fragili
- **Non fare affidamento sugli indici** per elenchi dinamici
- **Evita selettori basati sul testo** per app localizzate
- **Non usare XPath assoluti** (che partono dalla radice)

### Esempi di selettori buoni e cattivi

```text
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

## Debug dei selettori

### Web (Chrome DevTools)

1. Apri Chrome DevTools (F12)
2. Usa il pannello Elements per ispezionare gli elementi
3. Fai clic con il tasto destro su un elemento → Copy → Copy selector
4. Testa i selettori nella Console: `document.querySelector('your-selector')`

### Mobile (Appium Inspector)

1. Avvia Appium Inspector
2. Connettiti alla tua sessione in esecuzione
3. Fai clic sugli elementi per vedere tutti gli attributi disponibili
4. Usa la funzione "Search for element" per testare i selettori

### Utilizzo di `get_elements`

Lo strumento `get_elements` del server MCP restituisce diverse strategie di selezione per ogni elemento:

```text
Ask: "Get all visible elements on the screen"
```

Questo restituisce gli elementi con selettori pre-generati che puoi utilizzare direttamente.

#### Opzioni avanzate

Per un maggiore controllo sull'individuazione degli elementi:

```text
# Ottieni solo immagini ed elementi visivi
Get visible elements with elementType "visual"

# Ottieni gli elementi con le loro coordinate per il debug del layout
Get visible elements with includeBounds enabled

# Ottieni i 20 elementi successivi (paginazione)
Get visible elements with limit 20 and offset 20

# Includi i contenitori di layout per il debug
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

### Utilizzo di `get_accessibility` (solo browser)

Per l'automazione del browser, lo strumento `get_accessibility` fornisce informazioni semantiche sugli elementi della pagina:

```text
# Ottieni tutti i nodi di accessibilità con nome
Get accessibility tree

# Filtra solo pulsanti e link
Get accessibility tree filtered to button and link roles

# Ottieni la pagina successiva dei risultati
Get accessibility tree with limit 50 and offset 50
```

Questo è utile quando `get_elements` non restituisce gli elementi previsti, poiché interroga l'API di accessibilità nativa del browser.