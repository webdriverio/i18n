---
id: selectors
title: Selektory
description: "Wybieraj selektory do lokalizowania elementów na stronach internetowych i w aplikacjach mobilnych podczas automatyzacji z serwerem WebdriverIO MCP."
---

Serwer WebdriverIO MCP obsługuje wiele strategii selektorów do lokalizowania elementów na stronach internetowych i w aplikacjach mobilnych.

:::info

Pełną dokumentację selektorów, obejmującą wszystkie strategie selektorów WebdriverIO, znajdziesz w głównym przewodniku [Selektory](/docs/selectors). Ta strona koncentruje się na selektorach najczęściej używanych z serwerem MCP.

:::

## Selektory webowe

W przypadku automatyzacji przeglądarki serwer MCP obsługuje wszystkie standardowe selektory WebdriverIO. Najczęściej używane to:

| Selektor | Przykład                       | Opis                                  |
| -------- | ------------------------------ | ------------------------------------- |
| CSS      | `#login-button`, `.submit-btn` | Standardowe selektory CSS             |
| XPath    | `//button[@id='submit']`       | Wyrażenia XPath                       |
| Text     | `button=Submit`, `a*=Click`    | Selektory tekstowe WebdriverIO        |
| ARIA     | `aria/Submit Button`           | Selektory nazw dostępności            |
| Test ID  | `[data-testid="submit"]`       | Zalecane do testowania                |

Szczegółowe przykłady i najlepsze praktyki znajdziesz w dokumentacji [Selektory](/docs/selectors).

## Selektory mobilne

Selektory mobilne działają zarówno na platformie iOS, jak i Android za pośrednictwem Appium.

### Accessibility ID (zalecane)

Accessibility ID to **najbardziej niezawodny selektor wieloplatformowy**. Działają zarówno na iOS, jak i na Androidzie, i pozostają stabilne pomiędzy aktualizacjami aplikacji.

```text
# Składnia
~accessibilityId

# Przykłady
~loginButton
~submitForm
~usernameField
```

:::tip Najlepsza praktyka
Zawsze preferuj accessibility ID, jeśli są dostępne. Zapewniają one:
- Zgodność wieloplatformową (iOS + Android)
- Stabilność przy zmianach interfejsu użytkownika
- Łatwiejsze utrzymanie testów
- Lepszą dostępność Twojej aplikacji
:::

### Selektory Android

#### UiAutomator

Selektory UiAutomator są potężne i szybkie na Androidzie.

```text
# Według tekstu
android=new UiSelector().text("Login")

# Według częściowego tekstu
android=new UiSelector().textContains("Log")

# Według Resource ID
android=new UiSelector().resourceId("com.example:id/login_button")

# Według nazwy klasy
android=new UiSelector().className("android.widget.Button")

# Według opisu (dostępność)
android=new UiSelector().description("Login button")

# Połączone warunki
android=new UiSelector().className("android.widget.Button").text("Login")

# Przewijalny kontener
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID zapewniają stabilną identyfikację elementów na Androidzie.

```text
# Pełny Resource ID
id=com.example.app:id/login_button

# Częściowy ID (pakiet aplikacji wywnioskowany)
id=login_button
```

#### XPath (Android)

XPath działa na Androidzie, ale jest wolniejszy niż UiAutomator.

```text
# Według klasy i tekstu
//android.widget.Button[@text='Login']

# Według Resource ID
//android.widget.EditText[@resource-id='com.example:id/username']

# Według Content Description
//android.widget.ImageButton[@content-desc='Menu']

# Hierarchicznie
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selektory iOS

#### Predicate String

iOS Predicate String są szybkie i potężne w automatyzacji iOS.

```text
# Według etykiety
-ios predicate string:label == "Login"

# Według częściowej etykiety
-ios predicate string:label CONTAINS "Log"

# Według nazwy
-ios predicate string:name == "loginButton"

# Według typu
-ios predicate string:type == "XCUIElementTypeButton"

# Według wartości
-ios predicate string:value == "ON"

# Połączone warunki
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Widoczność
-ios predicate string:label == "Login" AND visible == 1

# Bez rozróżniania wielkości liter
-ios predicate string:label ==[c] "login"
```

**Operatory predykatów:**

| Operator     | Opis                          |
| ------------ | ----------------------------- |
| `==`         | Równa się                     |
| `!=`         | Nie równa się                 |
| `CONTAINS`   | Zawiera podciąg               |
| `BEGINSWITH` | Zaczyna się od                |
| `ENDSWITH`   | Kończy się na                 |
| `LIKE`       | Dopasowanie z symbolami wieloznacznymi |
| `MATCHES`    | Dopasowanie wyrażenia regularnego |
| `AND`        | Logiczne AND                  |
| `OR`         | Logiczne OR                   |

#### Class Chain

iOS Class Chain zapewniają hierarchiczną lokalizację elementów przy dobrej wydajności.

```text
# Bezpośrednie dziecko
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Dowolny potomek
-ios class chain:**/XCUIElementTypeButton

# Według indeksu
-ios class chain:**/XCUIElementTypeCell[3]

# W połączeniu z predykatem
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierarchicznie
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Ostatni element
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath działa na iOS, ale jest wolniejszy niż predicate string.

```text
# Według typu i etykiety
//XCUIElementTypeButton[@label='Login']

# Według nazwy
//XCUIElementTypeTextField[@name='username']

# Według wartości
//XCUIElementTypeSwitch[@value='1']

# Hierarchicznie
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## Strategia selektorów wieloplatformowych

Pisząc testy, które muszą działać zarówno na iOS, jak i na Androidzie, stosuj następującą kolejność priorytetów:

### 1. Accessibility ID (najlepsze)

```text
# Działa na obu platformach
~loginButton
```

### 2. Selektory specyficzne dla platformy z logiką warunkową

Gdy accessibility ID nie są dostępne, użyj selektorów specyficznych dla platformy:

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath (ostateczność)

XPath działa na obu platformach, ale z różnymi typami elementów:

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## Informacje o typach elementów

### Typy elementów Android

| Typ                           | Opis                   |
| ----------------------------- | ---------------------- |
| `android.widget.Button`       | Przycisk               |
| `android.widget.EditText`     | Pole tekstowe          |
| `android.widget.TextView`     | Etykieta tekstowa      |
| `android.widget.ImageView`    | Obraz                  |
| `android.widget.ImageButton`  | Przycisk z obrazem     |
| `android.widget.CheckBox`     | Pole wyboru            |
| `android.widget.RadioButton`  | Przycisk opcji         |
| `android.widget.Switch`       | Przełącznik            |
| `android.widget.Spinner`      | Lista rozwijana        |
| `android.widget.ListView`     | Widok listy            |
| `android.widget.RecyclerView` | Widok Recycler         |
| `android.widget.ScrollView`   | Kontener przewijania   |

### Typy elementów iOS

| Typ                              | Opis                   |
| -------------------------------- | ---------------------- |
| `XCUIElementTypeButton`          | Przycisk               |
| `XCUIElementTypeTextField`       | Pole tekstowe          |
| `XCUIElementTypeSecureTextField` | Pole hasła             |
| `XCUIElementTypeStaticText`      | Etykieta tekstowa      |
| `XCUIElementTypeImage`           | Obraz                  |
| `XCUIElementTypeSwitch`          | Przełącznik            |
| `XCUIElementTypeSlider`          | Suwak                  |
| `XCUIElementTypePicker`          | Koło wyboru            |
| `XCUIElementTypeTable`           | Widok tabeli           |
| `XCUIElementTypeCell`            | Komórka tabeli         |
| `XCUIElementTypeCollectionView`  | Widok kolekcji         |
| `XCUIElementTypeScrollView`      | Widok przewijania      |

## Najlepsze praktyki

### Rób

- **Używaj accessibility ID** dla stabilnych, wieloplatformowych selektorów
- **Dodawaj atrybuty data-testid** do elementów webowych na potrzeby testów
- **Używaj Resource ID** na Androidzie, gdy accessibility ID nie są dostępne
- **Preferuj predicate string** zamiast XPath na iOS
- **Utrzymuj selektory proste** i konkretne

### Nie rób

- **Unikaj długich wyrażeń XPath** - są wolne i kruche
- **Nie polegaj na indeksach** w przypadku dynamicznych list
- **Unikaj selektorów opartych na tekście** w zlokalizowanych aplikacjach
- **Nie używaj bezwzględnego XPath** (zaczynającego się od korzenia)

### Przykłady dobrych i złych selektorów

```text
# Dobrze - stabilny accessibility ID
~loginButton

# Źle - kruchy XPath z indeksami
//div[3]/form/button[2]

# Dobrze - konkretny CSS z test ID
[data-testid="submit-button"]

# Źle - klasa, która może się zmienić
.btn-primary-lg-v2

# Dobrze - UiAutomator z Resource ID
android=new UiSelector().resourceId("com.app:id/submit")

# Źle - tekst, który może zostać zlokalizowany
android=new UiSelector().text("Submit")
```

## Debugowanie selektorów

### Web (Chrome DevTools)

1. Otwórz Chrome DevTools (F12)
2. Użyj panelu Elements, aby sprawdzić elementy
3. Kliknij element prawym przyciskiem myszy → Copy → Copy selector
4. Przetestuj selektory w konsoli: `document.querySelector('your-selector')`

### Urządzenia mobilne (Appium Inspector)

1. Uruchom Appium Inspector
2. Połącz się z uruchomioną sesją
3. Klikaj elementy, aby zobaczyć wszystkie dostępne atrybuty
4. Użyj funkcji „Search for element”, aby przetestować selektory

### Używanie `get_elements`

Narzędzie `get_elements` serwera MCP zwraca wiele strategii selektorów dla każdego elementu:

```text
Ask: "Get all visible elements on the screen"
```

Zwraca to elementy z wstępnie wygenerowanymi selektorami, których możesz używać bezpośrednio.

#### Opcje zaawansowane

Aby uzyskać większą kontrolę nad wykrywaniem elementów:

```text
# Pobierz tylko obrazy i elementy wizualne
Get visible elements with elementType "visual"

# Pobierz elementy wraz z ich współrzędnymi do debugowania układu
Get visible elements with includeBounds enabled

# Pobierz kolejne 20 elementów (paginacja)
Get visible elements with limit 20 and offset 20

# Uwzględnij kontenery układu do debugowania
Get visible elements with includeContainers enabled
```

Narzędzie zwraca odpowiedź z paginacją:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Używanie `get_accessibility` (tylko przeglądarka)

W przypadku automatyzacji przeglądarki narzędzie `get_accessibility` dostarcza semantycznych informacji o elementach strony:

```text
# Pobierz wszystkie nazwane węzły dostępności
Get accessibility tree

# Filtruj tylko do przycisków i linków
Get accessibility tree filtered to button and link roles

# Pobierz następną stronę wyników
Get accessibility tree with limit 50 and offset 50
```

Jest to przydatne, gdy `get_elements` nie zwraca oczekiwanych elementów, ponieważ odpytuje natywne API dostępności przeglądarki.