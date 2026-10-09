---
id: selectors
title: Selektorer
description: "Välj selektorer för att hitta element på webbsidor och i mobilappar vid automatisering med WebdriverIO MCP-servern."
---

WebdriverIO MCP-servern stöder flera selektorstrategier för att hitta element på webbsidor och i mobilappar.

:::info

För fullständig dokumentation om selektorer, inklusive alla WebdriverIOs selektorstrategier, se huvudguiden [Selectors](/docs/selectors). Den här sidan fokuserar på selektorer som ofta används med MCP-servern.

:::

## Webbselektorer

För webbläsarautomatisering stöder MCP-servern alla vanliga WebdriverIO-selektorer. De vanligaste är:

| Selektor | Exempel                        | Beskrivning                      |
| -------- | ------------------------------ | -------------------------------- |
| CSS      | `#login-button`, `.submit-btn` | Vanliga CSS-selektorer           |
| XPath    | `//button[@id='submit']`       | XPath-uttryck                    |
| Text     | `button=Submit`, `a*=Click`    | WebdriverIO-textselektorer       |
| ARIA     | `aria/Submit Button`           | Selektorer för tillgänglighetsnamn |
| Test ID  | `[data-testid="submit"]`       | Rekommenderas för testning       |

För detaljerade exempel och bästa praxis, se dokumentationen för [Selectors](/docs/selectors).

## Mobilselektorer

Mobilselektorer fungerar med både iOS- och Android-plattformar via Appium.

### Accessibility ID (rekommenderas)

Accessibility ID:n är den **mest pålitliga plattformsoberoende selektorn**. De fungerar på både iOS och Android och är stabila mellan appuppdateringar.

```text
# Syntax
~accessibilityId

# Exempel
~loginButton
~submitForm
~usernameField
```

:::tip Bästa praxis
Föredra alltid accessibility ID:n när de finns tillgängliga. De ger:
- Plattformsoberoende kompatibilitet (iOS + Android)
- Stabilitet vid ändringar i användargränssnittet
- Bättre underhållbarhet av tester
- Förbättrad tillgänglighet i din app
:::

### Android-selektorer

#### UiAutomator

UiAutomator-selektorer är kraftfulla och snabba för Android.

```text
# Efter text
android=new UiSelector().text("Login")

# Efter deltext
android=new UiSelector().textContains("Log")

# Efter resurs-ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Efter klassnamn
android=new UiSelector().className("android.widget.Button")

# Efter beskrivning (tillgänglighet)
android=new UiSelector().description("Login button")

# Kombinerade villkor
android=new UiSelector().className("android.widget.Button").text("Login")

# Skrollbar behållare
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resurs-ID

Resurs-ID:n ger stabil identifiering av element på Android.

```text
# Fullständigt resurs-ID
id=com.example.app:id/login_button

# Partiellt ID (appens paket härleds)
id=login_button
```

#### XPath (Android)

XPath fungerar på Android men är långsammare än UiAutomator.

```text
# Efter klass och text
//android.widget.Button[@text='Login']

# Efter resurs-ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Efter innehållsbeskrivning
//android.widget.ImageButton[@content-desc='Menu']

# Hierarkisk
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS-selektorer

#### Predicate String

iOS Predicate Strings är snabba och kraftfulla för iOS-automatisering.

```text
# Efter etikett
-ios predicate string:label == "Login"

# Efter deletikett
-ios predicate string:label CONTAINS "Log"

# Efter namn
-ios predicate string:name == "loginButton"

# Efter typ
-ios predicate string:type == "XCUIElementTypeButton"

# Efter värde
-ios predicate string:value == "ON"

# Kombinerade villkor
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Synlighet
-ios predicate string:label == "Login" AND visible == 1

# Skiftlägesokänslig
-ios predicate string:label ==[c] "login"
```

**Predikatoperatorer:**

| Operator     | Beskrivning             |
| ------------ | ----------------------- |
| `==`         | Lika med                |
| `!=`         | Inte lika med           |
| `CONTAINS`   | Innehåller delsträng    |
| `BEGINSWITH` | Börjar med              |
| `ENDSWITH`   | Slutar med              |
| `LIKE`       | Jokerteckenmatchning    |
| `MATCHES`    | Regex-matchning         |
| `AND`        | Logiskt OCH             |
| `OR`         | Logiskt ELLER           |

#### Class Chain

iOS Class Chains ger hierarkisk lokalisering av element med god prestanda.

```text
# Direkt barn
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Valfri ättling
-ios class chain:**/XCUIElementTypeButton

# Efter index
-ios class chain:**/XCUIElementTypeCell[3]

# Kombinerat med predikat
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierarkisk
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Sista elementet
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath fungerar på iOS men är långsammare än predicate strings.

```text
# Efter typ och etikett
//XCUIElementTypeButton[@label='Login']

# Efter namn
//XCUIElementTypeTextField[@name='username']

# Efter värde
//XCUIElementTypeSwitch[@value='1']

# Hierarkisk
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Plattformsoberoende selektorstrategi

När du skriver tester som behöver fungera på både iOS och Android, använd denna prioritetsordning:

### 1. Accessibility ID (bäst)

```text
# Fungerar på båda plattformarna
~loginButton
```

### 2. Plattformsspecifik med villkorslogik

När accessibility ID:n inte finns tillgängliga, använd plattformsspecifika selektorer:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (sista utväg)

XPath fungerar på båda plattformarna men med olika elementtyper:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Referens för elementtyper

### Elementtyper för Android

| Typ                           | Beskrivning          |
| ----------------------------- | -------------------- |
| `android.widget.Button`       | Knapp                |
| `android.widget.EditText`     | Textinmatning        |
| `android.widget.TextView`     | Textetikett          |
| `android.widget.ImageView`    | Bild                 |
| `android.widget.ImageButton`  | Bildknapp            |
| `android.widget.CheckBox`     | Kryssruta            |
| `android.widget.RadioButton`  | Alternativknapp      |
| `android.widget.Switch`       | Växlingsknapp        |
| `android.widget.Spinner`      | Rullgardinsmeny      |
| `android.widget.ListView`     | Listvy               |
| `android.widget.RecyclerView` | Recycler-vy          |
| `android.widget.ScrollView`   | Skrollbehållare      |

### Elementtyper för iOS

| Typ                              | Beskrivning         |
| -------------------------------- | ------------------- |
| `XCUIElementTypeButton`          | Knapp               |
| `XCUIElementTypeTextField`       | Textinmatning       |
| `XCUIElementTypeSecureTextField` | Lösenordsinmatning  |
| `XCUIElementTypeStaticText`      | Textetikett         |
| `XCUIElementTypeImage`           | Bild                |
| `XCUIElementTypeSwitch`          | Växlingsknapp       |
| `XCUIElementTypeSlider`          | Skjutreglage        |
| `XCUIElementTypePicker`          | Väljarhjul          |
| `XCUIElementTypeTable`           | Tabellvy            |
| `XCUIElementTypeCell`            | Tabellcell          |
| `XCUIElementTypeCollectionView`  | Samlingsvy          |
| `XCUIElementTypeScrollView`      | Skrollvy            |

## Bästa praxis

### Gör

- **Använd accessibility ID:n** för stabila, plattformsoberoende selektorer
- **Lägg till data-testid-attribut** på webbelement för testning
- **Använd resurs-ID:n** på Android när accessibility ID:n inte finns tillgängliga
- **Föredra predicate strings** framför XPath på iOS
- **Håll selektorer enkla** och specifika

### Gör inte

- **Undvik långa XPath-uttryck** – de är långsamma och sköra
- **Förlita dig inte på index** för dynamiska listor
- **Undvik textbaserade selektorer** för lokaliserade appar
- **Använd inte absolut XPath** (som börjar från roten)

### Exempel på bra respektive dåliga selektorer

```text
# Bra – stabilt accessibility ID
~loginButton

# Dåligt – skör XPath med index
//div[3]/form/button[2]

# Bra – specifik CSS med test-ID
[data-testid="submit-button"]

# Dåligt – klass som kan ändras
.btn-primary-lg-v2

# Bra – UiAutomator med resurs-ID
android=new UiSelector().resourceId("com.app:id/submit")

# Dåligt – text som kan lokaliseras
android=new UiSelector().text("Submit")
```

## Felsöka selektorer

### Webb (Chrome DevTools)

1. Öppna Chrome DevTools (F12)
2. Använd panelen Elements för att inspektera element
3. Högerklicka på ett element → Copy → Copy selector
4. Testa selektorer i konsolen: `document.querySelector('your-selector')`

### Mobil (Appium Inspector)

1. Starta Appium Inspector
2. Anslut till din pågående session
3. Klicka på element för att se alla tillgängliga attribut
4. Använd funktionen "Search for element" för att testa selektorer

### Använda `get_elements`

MCP-serverns verktyg `get_elements` returnerar flera selektorstrategier för varje element:

```text
Ask: "Get all visible elements on the screen"
```

Detta returnerar element med förgenererade selektorer som du kan använda direkt.

#### Avancerade alternativ

För mer kontroll över hur element hittas:

```text
# Hämta endast bilder och visuella element
Get visible elements with elementType "visual"

# Hämta element med deras koordinater för felsökning av layout
Get visible elements with includeBounds enabled

# Hämta nästa 20 element (paginering)
Get visible elements with limit 20 and offset 20

# Inkludera layoutbehållare för felsökning
Get visible elements with includeContainers enabled
```

Verktyget returnerar ett paginerat svar:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Använda `get_accessibility` (endast webbläsare)

För webbläsarautomatisering tillhandahåller verktyget `get_accessibility` semantisk information om sidans element:

```text
# Hämta alla namngivna tillgänglighetsnoder
Get accessibility tree

# Filtrera till endast knappar och länkar
Get accessibility tree filtered to button and link roles

# Hämta nästa sida med resultat
Get accessibility tree with limit 50 and offset 50
```

Detta är användbart när `get_elements` inte returnerar förväntade element, eftersom det frågar webbläsarens inbyggda tillgänglighets-API.