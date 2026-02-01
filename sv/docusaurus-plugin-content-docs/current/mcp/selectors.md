---
id: selectors
title: Selektorer
---

WebdriverIO MCP-servern stöder flera selektorstrategier för att lokalisera element på webbsidor och mobilappar.

:::info

För omfattande selektordokumentation inklusive alla WebdriverIO selektorstrategier, se huvudguiden [Selektorer](/docs/selectors). Denna sida fokuserar på selektorer som vanligtvis används med MCP-servern.

:::

## Webbselektorer

För webbläsarautomatisering stöder MCP-servern alla standard WebdriverIO-selektorer. De mest använda inkluderar:

| Selektor | Exempel | Beskrivning |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Standard CSS-selektorer |
| XPath | `//button[@id='submit']` | XPath-uttryck |
| Text | `button=Submit`, `a*=Click` | WebdriverIO textselektorer |
| ARIA | `aria/Submit Button` | Tillgänglighetsnamnsselektorer |
| Test ID | `[data-testid="submit"]` | Rekommenderas för testning |

För detaljerade exempel och bästa praxis, se [Selektorer](/docs/selectors) dokumentationen.

---

## Mobilselektorer

Mobilselektorer fungerar med både iOS- och Android-plattformar genom Appium.

### Accessibility ID (Rekommenderas)

Tillgänglighets-ID:n är den **mest pålitliga plattformsoberoende selektorn**. De fungerar på både iOS och Android och är stabila genom appuppdateringar.

```
# Syntax
~accessibilityId

# Examples
~loginButton
~submitForm
~usernameField
```

:::tip Bästa praxis
Prioritera alltid tillgänglighets-ID:n när de är tillgängliga. De ger:
- Plattformskompatibilitet (iOS + Android)
- Stabilitet genom UI-förändringar
- Bättre testunderhåll
- Förbättrad tillgänglighet för din app
:::

### Android-selektorer

#### UiAutomator

UiAutomator-selektorer är kraftfulla och snabba för Android.

```
# By Text
android=new UiSelector().text("Login")

# By Partial Text
android=new UiSelector().textContains("Log")

# By Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# By Class Name
android=new UiSelector().className("android.widget.Button")

# By Description (Accessibility)
android=new UiSelector().description("Login button")

# Combined Conditions
android=new UiSelector().className("android.widget.Button").text("Login")

# Scrollable Container
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resurs-ID:n ger stabil elementidentifiering på Android.

```
# Full Resource ID
id=com.example.app:id/login_button

# Partial ID (app package inferred)
id=login_button
```

#### XPath (Android)

XPath fungerar på Android men är långsammare än UiAutomator.

```
# By Class and Text
//android.widget.Button[@text='Login']

# By Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# By Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Hierarchical
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS-selektorer

#### Predicate String

iOS Predicate Strings är snabba och kraftfulla för iOS-automatisering.

```
# By Label
-ios predicate string:label == "Login"

# By Partial Label
-ios predicate string:label CONTAINS "Log"

# By Name
-ios predicate string:name == "loginButton"

# By Type
-ios predicate string:type == "XCUIElementTypeButton"

# By Value
-ios predicate string:value == "ON"

# Combined Conditions
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Visibility
-ios predicate string:label == "Login" AND visible == 1

# Case Insensitive
-ios predicate string:label ==[c] "login"
```

**Predicate-operatorer:**

| Operator | Beskrivning |
|----------|-------------|
| `==` | Lika med |
| `!=` | Inte lika med |
| `CONTAINS` | Innehåller delstring |
| `BEGINSWITH` | Börjar med |
| `ENDSWITH` | Slutar med |
| `LIKE` | Wildcard-matchning |
| `MATCHES` | Regex-matchning |
| `AND` | Logisk OCH |
| `OR` | Logisk ELLER |

#### Class Chain

iOS Class Chains ger hierarkisk elementlokalisering med bra prestanda.

```
# Direct Child
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Any Descendant
-ios class chain:**/XCUIElementTypeButton

# By Index
-ios class chain:**/XCUIElementTypeCell[3]

# Combined with Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierarchical
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Last Element
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath fungerar på iOS men är långsammare än predicate strings.

```
# By Type and Label
//XCUIElementTypeButton[@label='Login']

# By Name
//XCUIElementTypeTextField[@name='username']

# By Value
//XCUIElementTypeSwitch[@value='1']

# Hierarchical
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Plattformsoberoende selektorstrategi

När du skriver tester som behöver fungera på både iOS och Android, använd denna prioritetsordning:

### 1. Accessibility ID (Bäst)

```
# Works on both platforms
~loginButton
```

### 2. Plattformsspecifik med villkorlig logik

När tillgänglighets-ID:n inte är tillgängliga, använd plattformsspecifika selektorer:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Sista utvägen)

XPath fungerar på båda plattformarna men med olika elementtyper:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Elementtyper referens

### Android elementtyper

| Typ | Beskrivning |
|------|-------------|
| `android.widget.Button` | Knapp |
| `android.widget.EditText` | Textinmatning |
| `android.widget.TextView` | Textetikett |
| `android.widget.ImageView` | Bild |
| `android.widget.ImageButton` | Bildknapp |
| `android.widget.CheckBox` | Kryssruta |
| `android.widget.RadioButton` | Radioknapp |
| `android.widget.Switch` | Växlingsknapp |
| `android.widget.Spinner` | Rullgardinsmeny |
| `android.widget.ListView` | Listvy |
| `android.widget.RecyclerView` | Återvinningsvy |
| `android.widget.ScrollView` | Rullbehållare |

### iOS elementtyper

| Typ | Beskrivning |
|------|-------------|
| `XCUIElementTypeButton` | Knapp |
| `XCUIElementTypeTextField` | Textinmatning |
| `XCUIElementTypeSecureTextField` | Lösenordsinmatning |
| `XCUIElementTypeStaticText` | Textetikett |
| `XCUIElementTypeImage` | Bild |
| `XCUIElementTypeSwitch` | Växlingsknapp |
| `XCUIElementTypeSlider` | Reglage |
| `XCUIElementTypePicker` | Väljare |
| `XCUIElementTypeTable` | Tabellvy |
| `XCUIElementTypeCell` | Tabellcell |
| `XCUIElementTypeCollectionView` | Samlingsvy |
| `XCUIElementTypeScrollView` | Rullvy |

---

## Bästa praxis

### Gör så här

- **Använd tillgänglighets-ID:n** för stabila, plattformsoberoende selektorer
- **Lägg till data-testid-attribut** till webbelement för testning
- **Använd resurs-ID:n** på Android när tillgänglighets-ID:n inte är tillgängliga
- **Föredra predicate strings** framför XPath på iOS
- **Håll selektorer enkla** och specifika

### Undvik att

- **Undvik långa XPath-uttryck** - de är långsamma och ömtåliga
- **Förlita dig inte på index** för dynamiska listor
- **Undvik textbaserade selektorer** för lokaliserade appar
- **Använd inte absolut XPath** (med start från roten)

### Exempel på bra vs dåliga selektorer

```
# Bra - Stabilt tillgänglighets-ID
~loginButton

# Dåligt - Ömtålig XPath med index
//div[3]/form/button[2]

# Bra - Specifik CSS med test-ID
[data-testid="submit-button"]

# Dåligt - Klass som kan ändras
.btn-primary-lg-v2

# Bra - UiAutomator med resurs-ID
android=new UiSelector().resourceId("com.app:id/submit")

# Dåligt - Text som kan lokaliseras
android=new UiSelector().text("Submit")
```

---

## Felsökning av selektorer

### Webb (Chrome DevTools)

1. Öppna Chrome DevTools (F12)
2. Använd Elements-panelen för att inspektera element
3. Högerklicka på ett element → Kopiera → Kopiera selektor
4. Testa selektorer i Konsolen: `document.querySelector('your-selector')`

### Mobil (Appium Inspector)

1. Starta Appium Inspector
2. Anslut till din körande session
3. Klicka på element för att se alla tillgängliga attribut
4. Använd funktionen "Search for element" för att testa selektorer

### Använd `get_visible_elements`

MCP-serverns verktyg `get_visible_elements` returnerar flera selektorstrategier för varje element:

```
Ask Claude: "Get all visible elements on the screen"
```

Detta returnerar element med förgenererade selektorer som du kan använda direkt.

#### Avancerade alternativ

För mer kontroll över elementupptäckt:

```
# Get only images and visual elements
Get visible elements with elementType "visual"

# Get elements with their coordinates for layout debugging
Get visible elements with includeBounds enabled

# Get the next 20 elements (pagination)
Get visible elements with limit 20 and offset 20

# Include layout containers for debugging
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

### Använd `get_accessibility` (Endast webbläsare)

För webbläsarautomatisering ger verktyget `get_accessibility` semantisk information om sidelement:

```
# Get all named accessibility nodes
Get accessibility tree

# Filter to only buttons and links
Get accessibility tree filtered to button and link roles

# Get next page of results
Get accessibility tree with limit 50 and offset 50
```

Detta är användbart när `get_visible_elements` inte returnerar förväntade element, eftersom det frågar webbläsarens inbyggda tillgänglighets-API.