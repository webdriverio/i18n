---
id: selectors
title: Selektoren
---

Der WebdriverIO MCP-Server unterstützt mehrere Selektorstrategien zur Lokalisierung von Elementen auf Webseiten und mobilen Apps.

:::info

Für eine umfassende Dokumentation zu Selektoren, einschließlich aller WebdriverIO-Selektorstrategien, siehe den Hauptleitfaden [Selektoren](/docs/selectors). Diese Seite konzentriert sich auf Selektoren, die häufig mit dem MCP-Server verwendet werden.

:::

## Web-Selektoren

Für die Browser-Automatisierung unterstützt der MCP-Server alle Standard-WebdriverIO-Selektoren. Die am häufigsten verwendeten sind:

| Selektor | Beispiel | Beschreibung |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Standard-CSS-Selektoren |
| XPath | `//button[@id='submit']` | XPath-Ausdrücke |
| Text | `button=Submit`, `a*=Click` | WebdriverIO-Textselektoren |
| ARIA | `aria/Submit Button` | Accessibility-Name-Selektoren |
| Test ID | `[data-testid="submit"]` | Empfohlen für Tests |

Für detaillierte Beispiele und Best Practices siehe die [Selektoren](/docs/selectors) Dokumentation.

---

## Mobile-Selektoren

Mobile Selektoren funktionieren mit iOS- und Android-Plattformen über Appium.

### Accessibility ID (Empfohlen)

Accessibility IDs sind die **zuverlässigsten plattformübergreifenden Selektoren**. Sie funktionieren sowohl auf iOS als auch auf Android und bleiben bei App-Updates stabil.

```
# Syntax
~accessibilityId

# Beispiele
~loginButton
~submitForm
~usernameField
```

:::tip Best Practice
Bevorzuge immer Accessibility IDs, wenn verfügbar. Sie bieten:
- Plattformübergreifende Kompatibilität (iOS + Android)
- Stabilität bei UI-Änderungen
- Bessere Wartbarkeit der Tests
- Verbesserte Barrierefreiheit deiner App
:::

### Android-Selektoren

#### UiAutomator

UiAutomator-Selektoren sind leistungsstark und schnell für Android.

```
# Nach Text
android=new UiSelector().text("Login")

# Nach Teil-Text
android=new UiSelector().textContains("Log")

# Nach Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Nach Klassenname
android=new UiSelector().className("android.widget.Button")

# Nach Beschreibung (Barrierefreiheit)
android=new UiSelector().description("Login button")

# Kombinierte Bedingungen
android=new UiSelector().className("android.widget.Button").text("Login")

# Scrollbarer Container
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource IDs bieten stabile Elementidentifikation auf Android.

```
# Vollständige Resource ID
id=com.example.app:id/login_button

# Teil-ID (App-Paket wird abgeleitet)
id=login_button
```

#### XPath (Android)

XPath funktioniert auf Android, ist aber langsamer als UiAutomator.

```
# Nach Klasse und Text
//android.widget.Button[@text='Login']

# Nach Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Nach Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Hierarchisch
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS-Selektoren

#### Predicate String

iOS Predicate Strings sind schnell und leistungsstark für die iOS-Automatisierung.

```
# Nach Label
-ios predicate string:label == "Login"

# Nach Teil-Label
-ios predicate string:label CONTAINS "Log"

# Nach Name
-ios predicate string:name == "loginButton"

# Nach Typ
-ios predicate string:type == "XCUIElementTypeButton"

# Nach Wert
-ios predicate string:value == "ON"

# Kombinierte Bedingungen
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Sichtbarkeit
-ios predicate string:label == "Login" AND visible == 1

# Groß-/Kleinschreibung ignorieren
-ios predicate string:label ==[c] "login"
```

**Predicate-Operatoren:**

| Operator | Beschreibung |
|----------|-------------|
| `==` | Gleich |
| `!=` | Ungleich |
| `CONTAINS` | Enthält Teilstring |
| `BEGINSWITH` | Beginnt mit |
| `ENDSWITH` | Endet mit |
| `LIKE` | Platzhalter-Match |
| `MATCHES` | Regex-Match |
| `AND` | Logisches UND |
| `OR` | Logisches ODER |

#### Class Chain

iOS Class Chains bieten hierarchische Elementlokalisierung mit guter Performance.

```
# Direktes Kind
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Beliebiger Nachfahre
-ios class chain:**/XCUIElementTypeButton

# Nach Index
-ios class chain:**/XCUIElementTypeCell[3]

# Kombiniert mit Predicate
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierarchisch
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Letztes Element
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath funktioniert auf iOS, ist aber langsamer als Predicate Strings.

```
# Nach Typ und Label
//XCUIElementTypeButton[@label='Login']

# Nach Name
//XCUIElementTypeTextField[@name='username']

# Nach Wert
//XCUIElementTypeSwitch[@value='1']

# Hierarchisch
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Plattformübergreifende Selektorstrategie

Beim Schreiben von Tests, die sowohl auf iOS als auch auf Android funktionieren sollen, verwende diese Prioritätsreihenfolge:

### 1. Accessibility ID (Beste Option)

```
# Funktioniert auf beiden Plattformen
~loginButton
```

### 2. Plattformspezifisch mit bedingter Logik

Wenn Accessibility IDs nicht verfügbar sind, verwende plattformspezifische Selektoren:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Letzte Option)

XPath funktioniert auf beiden Plattformen, aber mit unterschiedlichen Elementtypen:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Elementtyp-Referenz

### Android-Elementtypen

| Typ | Beschreibung |
|------|-------------|
| `android.widget.Button` | Button |
| `android.widget.EditText` | Texteingabe |
| `android.widget.TextView` | Textlabel |
| `android.widget.ImageView` | Bild |
| `android.widget.ImageButton` | Bildbutton |
| `android.widget.CheckBox` | Checkbox |
| `android.widget.RadioButton` | Radiobutton |
| `android.widget.Switch` | Schalter |
| `android.widget.Spinner` | Dropdown |
| `android.widget.ListView` | Listenansicht |
| `android.widget.RecyclerView` | Recycler-Ansicht |
| `android.widget.ScrollView` | Scroll-Container |

### iOS-Elementtypen

| Typ | Beschreibung |
|------|-------------|
| `XCUIElementTypeButton` | Button |
| `XCUIElementTypeTextField` | Texteingabe |
| `XCUIElementTypeSecureTextField` | Passworteingabe |
| `XCUIElementTypeStaticText` | Textlabel |
| `XCUIElementTypeImage` | Bild |
| `XCUIElementTypeSwitch` | Schalter |
| `XCUIElementTypeSlider` | Schieberegler |
| `XCUIElementTypePicker` | Auswahlrad |
| `XCUIElementTypeTable` | Tabellenansicht |
| `XCUIElementTypeCell` | Tabellenzelle |
| `XCUIElementTypeCollectionView` | Sammlungsansicht |
| `XCUIElementTypeScrollView` | Scrollansicht |

---

## Best Practices

### Do

- **Verwende Accessibility IDs** für stabile, plattformübergreifende Selektoren
- **Füge data-testid-Attribute** zu Web-Elementen für Tests hinzu
- **Verwende Resource IDs** auf Android, wenn Accessibility IDs nicht verfügbar sind
- **Bevorzuge Predicate Strings** gegenüber XPath auf iOS
- **Halte Selektoren einfach** und spezifisch

### Don't

- **Vermeide lange XPath-Ausdrücke** - sie sind langsam und fragil
- **Verlasse dich nicht auf Indizes** für dynamische Listen
- **Vermeide textbasierte Selektoren** für lokalisierte Apps
- **Verwende keinen absoluten XPath** (beginnend vom Wurzelelement)

### Beispiele für gute vs. schlechte Selektoren

```
# Gut - Stabile Accessibility ID
~loginButton

# Schlecht - Fragiler XPath mit Indizes
//div[3]/form/button[2]

# Gut - Spezifisches CSS mit Test-ID
[data-testid="submit-button"]

# Schlecht - Klasse, die sich ändern könnte
.btn-primary-lg-v2

# Gut - UiAutomator mit Resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Schlecht - Text, der lokalisiert sein könnte
android=new UiSelector().text("Submit")
```

---

## Debugging von Selektoren

### Web (Chrome DevTools)

1. Öffne Chrome DevTools (F12)
2. Verwende das Elements-Panel zum Untersuchen von Elementen
3. Rechtsklick auf ein Element → Kopieren → Selektor kopieren
4. Teste Selektoren in der Konsole: `document.querySelector('your-selector')`

### Mobile (Appium Inspector)

1. Starte Appium Inspector
2. Verbinde dich mit deiner laufenden Session
3. Klicke auf Elemente, um alle verfügbaren Attribute zu sehen
4. Verwende die "Search for element"-Funktion zum Testen von Selektoren

### Verwendung von `get_visible_elements`

Das `get_visible_elements`-Tool des MCP-Servers gibt mehrere Selektorstrategien für jedes Element zurück:

```
Ask Claude: "Get all visible elements on the screen"
```

Dies gibt Elemente mit vorgenerierten Selektoren zurück, die du direkt verwenden kannst.

#### Erweiterte Optionen

Für mehr Kontrolle bei der Elementsuche:

```
# Nur Bilder und visuelle Elemente abrufen
Get visible elements with elementType "visual"

# Elemente mit ihren Koordinaten für Layout-Debugging abrufen
Get visible elements with includeBounds enabled

# Die nächsten 20 Elemente abrufen (Paginierung)
Get visible elements with limit 20 and offset 20

# Layout-Container für Debugging einbeziehen
Get visible elements with includeContainers enabled
```

Das Tool liefert eine paginierte Antwort:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Verwendung von `get_accessibility` (Nur Browser)

Für Browser-Automatisierung bietet das `get_accessibility`-Tool semantische Informationen über Seitenelemente:

```
# Alle benannten Barrierefreiheitsknoten abrufen
Get accessibility tree

# Nur auf Buttons und Links filtern
Get accessibility tree filtered to button and link roles

# Nächste Seite mit Ergebnissen abrufen
Get accessibility tree with limit 50 and offset 50
```

Dies ist nützlich, wenn `get_visible_elements` nicht die erwarteten Elemente zurückgibt, da es die native Barrierefreiheits-API des Browsers abfragt.