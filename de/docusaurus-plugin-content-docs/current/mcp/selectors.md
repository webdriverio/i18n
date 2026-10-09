---
id: selectors
title: Selektoren
description: "Wählen Sie Selektoren, um Elemente auf Webseiten und in mobilen Apps zu finden, wenn Sie mit dem WebdriverIO MCP-Server automatisieren."
---

Der WebdriverIO MCP-Server unterstützt mehrere Selektor-Strategien, um Elemente auf Webseiten und in mobilen Apps zu finden.

:::info

Eine umfassende Dokumentation zu Selektoren, einschließlich aller WebdriverIO-Selektor-Strategien, finden Sie im Hauptleitfaden [Selektoren](/docs/selectors). Diese Seite konzentriert sich auf Selektoren, die häufig mit dem MCP-Server verwendet werden.

:::

## Web-Selektoren

Für die Browser-Automatisierung unterstützt der MCP-Server alle Standard-Selektoren von WebdriverIO. Zu den am häufigsten verwendeten gehören:

| Selektor | Beispiel                       | Beschreibung                       |
| -------- | ------------------------------ | ---------------------------------- |
| CSS      | `#login-button`, `.submit-btn` | Standard-CSS-Selektoren            |
| XPath    | `//button[@id='submit']`       | XPath-Ausdrücke                    |
| Text     | `button=Submit`, `a*=Click`    | WebdriverIO-Textselektoren         |
| ARIA     | `aria/Submit Button`           | Selektoren für barrierefreie Namen |
| Test ID  | `[data-testid="submit"]`       | Empfohlen für Tests                |

Ausführliche Beispiele und Best Practices finden Sie in der Dokumentation zu [Selektoren](/docs/selectors).

## Mobile Selektoren

Mobile Selektoren funktionieren über Appium sowohl auf iOS- als auch auf Android-Plattformen.

### Accessibility ID (empfohlen)

Accessibility IDs sind der **zuverlässigste plattformübergreifende Selektor**. Sie funktionieren sowohl auf iOS als auch auf Android und bleiben über App-Updates hinweg stabil.

```text
# Syntax
~accessibilityId

# Beispiele
~loginButton
~submitForm
~usernameField
```

:::tip Best Practice
Bevorzugen Sie immer Accessibility IDs, wenn sie verfügbar sind. Sie bieten:
- Plattformübergreifende Kompatibilität (iOS + Android)
- Stabilität bei UI-Änderungen
- Bessere Wartbarkeit der Tests
- Verbesserte Barrierefreiheit Ihrer App
:::

### Android-Selektoren

#### UiAutomator

UiAutomator-Selektoren sind leistungsstark und schnell für Android.

```text
# Nach Text
android=new UiSelector().text("Login")

# Nach Teiltext
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

Resource IDs ermöglichen eine stabile Identifizierung von Elementen auf Android.

```text
# Vollständige Resource ID
id=com.example.app:id/login_button

# Teilweise ID (App-Paket wird abgeleitet)
id=login_button
```

#### XPath (Android)

XPath funktioniert auf Android, ist aber langsamer als UiAutomator.

```text
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

```text
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

| Operator     | Beschreibung              |
| ------------ | ------------------------- |
| `==`         | Gleich                    |
| `!=`         | Ungleich                  |
| `CONTAINS`   | Enthält Teilzeichenfolge  |
| `BEGINSWITH` | Beginnt mit               |
| `ENDSWITH`   | Endet mit                 |
| `LIKE`       | Platzhalter-Übereinstimmung |
| `MATCHES`    | Regex-Übereinstimmung     |
| `AND`        | Logisches UND             |
| `OR`         | Logisches ODER            |

#### Class Chain

iOS Class Chains ermöglichen eine hierarchische Elementsuche mit guter Performance.

```text
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

```text
# Nach Typ und Label
//XCUIElementTypeButton[@label='Login']

# Nach Name
//XCUIElementTypeTextField[@name='username']

# Nach Wert
//XCUIElementTypeSwitch[@value='1']

# Hierarchisch
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Plattformübergreifende Selektor-Strategie

Wenn Sie Tests schreiben, die sowohl auf iOS als auch auf Android funktionieren sollen, verwenden Sie diese Prioritätsreihenfolge:

### 1. Accessibility ID (am besten)

```text
# Funktioniert auf beiden Plattformen
~loginButton
```

### 2. Plattformspezifisch mit bedingter Logik

Wenn keine Accessibility IDs verfügbar sind, verwenden Sie plattformspezifische Selektoren:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (letzter Ausweg)

XPath funktioniert auf beiden Plattformen, jedoch mit unterschiedlichen Elementtypen:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Referenz der Elementtypen

### Android-Elementtypen

| Typ                           | Beschreibung       |
| ----------------------------- | ------------------ |
| `android.widget.Button`       | Schaltfläche       |
| `android.widget.EditText`     | Texteingabe        |
| `android.widget.TextView`     | Textlabel          |
| `android.widget.ImageView`    | Bild               |
| `android.widget.ImageButton`  | Bildschaltfläche   |
| `android.widget.CheckBox`     | Kontrollkästchen   |
| `android.widget.RadioButton`  | Optionsfeld        |
| `android.widget.Switch`       | Umschalter         |
| `android.widget.Spinner`      | Dropdown           |
| `android.widget.ListView`     | Listenansicht      |
| `android.widget.RecyclerView` | Recycler View      |
| `android.widget.ScrollView`   | Scroll-Container   |

### iOS-Elementtypen

| Typ                              | Beschreibung      |
| -------------------------------- | ----------------- |
| `XCUIElementTypeButton`          | Schaltfläche      |
| `XCUIElementTypeTextField`       | Texteingabe       |
| `XCUIElementTypeSecureTextField` | Passworteingabe   |
| `XCUIElementTypeStaticText`      | Textlabel         |
| `XCUIElementTypeImage`           | Bild              |
| `XCUIElementTypeSwitch`          | Umschalter        |
| `XCUIElementTypeSlider`          | Schieberegler     |
| `XCUIElementTypePicker`          | Auswahlrad        |
| `XCUIElementTypeTable`           | Tabellenansicht   |
| `XCUIElementTypeCell`            | Tabellenzelle     |
| `XCUIElementTypeCollectionView`  | Collection View   |
| `XCUIElementTypeScrollView`      | Scroll View       |

## Best Practices

### Empfohlen

- **Verwenden Sie Accessibility IDs** für stabile, plattformübergreifende Selektoren
- **Fügen Sie data-testid-Attribute** zu Web-Elementen für Tests hinzu
- **Verwenden Sie Resource IDs** auf Android, wenn keine Accessibility IDs verfügbar sind
- **Bevorzugen Sie Predicate Strings** gegenüber XPath auf iOS
- **Halten Sie Selektoren einfach** und spezifisch

### Zu vermeiden

- **Vermeiden Sie lange XPath-Ausdrücke** – sie sind langsam und fehleranfällig
- **Verlassen Sie sich nicht auf Indizes** bei dynamischen Listen
- **Vermeiden Sie textbasierte Selektoren** bei lokalisierten Apps
- **Verwenden Sie keinen absoluten XPath** (beginnend beim Wurzelelement)

### Beispiele für gute und schlechte Selektoren

```text
# Gut - Stabile Accessibility ID
~loginButton

# Schlecht - Fehleranfälliger XPath mit Indizes
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

## Debuggen von Selektoren

### Web (Chrome DevTools)

1. Öffnen Sie die Chrome DevTools (F12)
2. Verwenden Sie das Elements-Panel, um Elemente zu untersuchen
3. Rechtsklick auf ein Element → Copy → Copy selector
4. Testen Sie Selektoren in der Konsole: `document.querySelector('your-selector')`

### Mobil (Appium Inspector)

1. Starten Sie den Appium Inspector
2. Verbinden Sie sich mit Ihrer laufenden Session
3. Klicken Sie auf Elemente, um alle verfügbaren Attribute zu sehen
4. Verwenden Sie die Funktion „Search for element“, um Selektoren zu testen

### Verwendung von `get_elements`

Das Tool `get_elements` des MCP-Servers liefert für jedes Element mehrere Selektor-Strategien:

```text
Ask: "Get all visible elements on the screen"
```

Dies liefert Elemente mit vorgenerierten Selektoren, die Sie direkt verwenden können.

#### Erweiterte Optionen

Für mehr Kontrolle bei der Elementsuche:

```text
# Nur Bilder und visuelle Elemente abrufen
Get visible elements with elementType "visual"

# Elemente mit ihren Koordinaten zum Debuggen des Layouts abrufen
Get visible elements with includeBounds enabled

# Die nächsten 20 Elemente abrufen (Paginierung)
Get visible elements with limit 20 and offset 20

# Layout-Container zum Debuggen einbeziehen
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

### Verwendung von `get_accessibility` (nur Browser)

Für die Browser-Automatisierung liefert das Tool `get_accessibility` semantische Informationen über Seitenelemente:

```text
# Alle benannten Accessibility-Knoten abrufen
Get accessibility tree

# Nur nach Schaltflächen- und Link-Rollen filtern
Get accessibility tree filtered to button and link roles

# Nächste Ergebnisseite abrufen
Get accessibility tree with limit 50 and offset 50
```

Dies ist nützlich, wenn `get_elements` nicht die erwarteten Elemente liefert, da es die native Accessibility-API des Browsers abfragt.