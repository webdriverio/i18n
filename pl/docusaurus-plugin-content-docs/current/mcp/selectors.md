---
id: selectors
title: Selektory
---

Serwer WebdriverIO MCP obsługuje różne strategie selektorów do lokalizowania elementów na stronach internetowych i w aplikacjach mobilnych.

:::info

Pełną dokumentację selektorów, w tym wszystkie strategie selektorów WebdriverIO, znajdziesz w głównym przewodniku [Selektory](/docs/selectors). Ta strona koncentruje się na selektorach powszechnie używanych z serwerem MCP.

:::

## Selektory webowe

Do automatyzacji przeglądarek serwer MCP obsługuje wszystkie standardowe selektory WebdriverIO. Najczęściej używane to:

| Selektor | Przykład | Opis |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | Standardowe selektory CSS |
| XPath | `//button[@id='submit']` | Wyrażenia XPath |
| Tekst | `button=Submit`, `a*=Click` | Selektory tekstowe WebdriverIO |
| ARIA | `aria/Submit Button` | Selektory nazw dostępności |
| Test ID | `[data-testid="submit"]` | Zalecane do testowania |

Szczegółowe przykłady i najlepsze praktyki znajdziesz w dokumentacji [Selektory](/docs/selectors).

---

## Selektory mobilne

Selektory mobilne działają zarówno z platformami iOS, jak i Android poprzez Appium.

### Accessibility ID (Zalecane)

Identyfikatory dostępności to **najbardziej niezawodne selektory międzyplatformowe**. Działają zarówno na iOS, jak i Android i są stabilne podczas aktualizacji aplikacji.

```
# Składnia
~accessibilityId

# Przykłady
~loginButton
~submitForm
~usernameField
```

:::tip Najlepsza praktyka
Zawsze preferuj identyfikatory dostępności, gdy są dostępne. Zapewniają one:
- Kompatybilność międzyplatformową (iOS + Android)
- Stabilność podczas zmian UI
- Lepszą utrzymywalność testów
- Lepszą dostępność twojej aplikacji
:::

### Selektory Android

#### UiAutomator

Selektory UiAutomator są potężne i szybkie dla Androida.

```
# Według tekstu
android=new UiSelector().text("Login")

# Według częściowego tekstu
android=new UiSelector().textContains("Log")

# Według ID zasobu
android=new UiSelector().resourceId("com.example:id/login_button")

# Według nazwy klasy
android=new UiSelector().className("android.widget.Button")

# Według opisu (dostępność)
android=new UiSelector().description("Login button")

# Łączone warunki
android=new UiSelector().className("android.widget.Button").text("Login")

# Przewijalny kontener
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### ID zasobu

Identyfikatory zasobów zapewniają stabilną identyfikację elementów na Androidzie.

```
# Pełny identyfikator zasobu
id=com.example.app:id/login_button

# Częściowy ID (pakiet aplikacji jest domyślny)
id=login_button
```

#### XPath (Android)

XPath działa na Androidzie, ale jest wolniejszy niż UiAutomator.

```
# Według klasy i tekstu
//android.widget.Button[@text='Login']

# Według ID zasobu
//android.widget.EditText[@resource-id='com.example:id/username']

# Według opisu zawartości
//android.widget.ImageButton[@content-desc='Menu']

# Hierarchicznie
//android.widget.LinearLayout/android.widget.Button[1]
```

### Selektory iOS

#### Predicate String

Predicate Strings w iOS są szybkie i potężne do automatyzacji iOS.

```
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

# Łączone warunki
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# Widoczność
-ios predicate string:label == "Login" AND visible == 1

# Niewrażliwość na wielkość liter
-ios predicate string:label ==[c] "login"
```

**Operatory predykatów:**

| Operator | Opis |
|----------|-------------|
| `==` | Równa się |
| `!=` | Nie równa się |
| `CONTAINS` | Zawiera podciąg |
| `BEGINSWITH` | Zaczyna się od |
| `ENDSWITH` | Kończy się na |
| `LIKE` | Dopasowanie ze znakami wieloznacznymi |
| `MATCHES` | Dopasowanie wyrażenia regularnego |
| `AND` | Logiczne AND |
| `OR` | Logiczne OR |

#### Class Chain

Łańcuchy klas w iOS zapewniają hierarchiczną lokalizację elementów z dobrą wydajnością.

```
# Bezpośredni potomek
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# Dowolny potomek
-ios class chain:**/XCUIElementTypeButton

# Według indeksu
-ios class chain:**/XCUIElementTypeCell[3]

# Łączone z predykatem
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# Hierarchicznie
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# Ostatni element
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath działa na iOS, ale jest wolniejszy niż predicate strings.

```
# Według typu i etykiety
//XCUIElementTypeButton[@label='Login']

# Według nazwy
//XCUIElementTypeTextField[@name='username']

# Według wartości
//XCUIElementTypeSwitch[@value='1']

# Hierarchicznie
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## Strategia selektorów międzyplatformowych

Pisząc testy, które muszą działać zarówno na iOS, jak i Android, używaj tej kolejności priorytetów:

### 1. Accessibility ID (Najlepsze)

```
# Działa na obu platformach
~loginButton
```

### 2. Selektory specyficzne dla platformy z logiką warunkową

Gdy identyfikatory dostępności nie są dostępne, użyj selektorów specyficznych dla platformy:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (Ostatnia deska ratunku)

XPath działa na obu platformach, ale z różnymi typami elementów:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## Referencja typów elementów

### Typy elementów Android

| Typ | Opis |
|------|-------------|
| `android.widget.Button` | Przycisk |
| `android.widget.EditText` | Pole tekstowe |
| `android.widget.TextView` | Etykieta tekstowa |
| `android.widget.ImageView` | Obraz |
| `android.widget.ImageButton` | Przycisk graficzny |
| `android.widget.CheckBox` | Pole wyboru |
| `android.widget.RadioButton` | Przycisk radio |
| `android.widget.Switch` | Przełącznik |
| `android.widget.Spinner` | Lista rozwijana |
| `android.widget.ListView` | Widok listy |
| `android.widget.RecyclerView` | Widok recycler |
| `android.widget.ScrollView` | Kontener przewijania |

### Typy elementów iOS

| Typ | Opis |
|------|-------------|
| `XCUIElementTypeButton` | Przycisk |
| `XCUIElementTypeTextField` | Pole tekstowe |
| `XCUIElementTypeSecureTextField` | Pole hasła |
| `XCUIElementTypeStaticText` | Etykieta tekstowa |
| `XCUIElementTypeImage` | Obraz |
| `XCUIElementTypeSwitch` | Przełącznik |
| `XCUIElementTypeSlider` | Suwak |
| `XCUIElementTypePicker` | Kółko wyboru |
| `XCUIElementTypeTable` | Widok tabeli |
| `XCUIElementTypeCell` | Komórka tabeli |
| `XCUIElementTypeCollectionView` | Widok kolekcji |
| `XCUIElementTypeScrollView` | Widok przewijania |

---

## Najlepsze praktyki

### Zalecane

- **Używaj identyfikatorów dostępności** dla stabilnych, międzyplatformowych selektorów
- **Dodawaj atrybuty data-testid** do elementów webowych do testowania
- **Używaj identyfikatorów zasobów** na Androidzie, gdy identyfikatory dostępności nie są dostępne
- **Preferuj predicate strings** zamiast XPath na iOS
- **Utrzymuj selektory proste** i specyficzne

### Niezalecane

- **Unikaj długich wyrażeń XPath** - są wolne i kruche
- **Nie polegaj na indeksach** dla dynamicznych list
- **Unikaj selektorów opartych na tekście** dla aplikacji lokalizowanych
- **Nie używaj bezwzględnych ścieżek XPath** (zaczynających się od korzenia)

### Przykłady dobrych i złych selektorów

```
# Dobre - stabilny identyfikator dostępności
~loginButton

# Złe - kruchy XPath z indeksami
//div[3]/form/button[2]

# Dobre - specyficzny CSS z ID testowym
[data-testid="submit-button"]

# Złe - klasa, która może się zmienić
.btn-primary-lg-v2

# Dobre - UiAutomator z ID zasobu
android=new UiSelector().resourceId("com.app:id/submit")

# Złe - tekst, który może być lokalizowany
android=new UiSelector().text("Submit")
```

---

## Debugowanie selektorów

### Web (Chrome DevTools)

1. Otwórz Chrome DevTools (F12)
2. Użyj panelu Elements do inspekcji elementów
3. Kliknij prawym przyciskiem myszy na element → Kopiuj → Kopiuj selektor
4. Testuj selektory w Konsoli: `document.querySelector('twój-selektor')`

### Mobile (Appium Inspector)

1. Uruchom Appium Inspector
2. Połącz się z działającą sesją
3. Kliknij na elementy, aby zobaczyć wszystkie dostępne atrybuty
4. Użyj funkcji "Search for element" do testowania selektorów

### Używanie `get_visible_elements`

Narzędzie `get_visible_elements` serwera MCP zwraca wiele strategii selektorów dla każdego elementu:

```
Ask Claude: "Get all visible elements on the screen"
```

Zwraca to elementy z wygenerowanymi selektorami, których możesz używać bezpośrednio.

#### Opcje zaawansowane

Dla większej kontroli nad wykrywaniem elementów:

```
# Pobierz tylko obrazy i elementy wizualne
Get visible elements with elementType "visual"

# Pobierz elementy z ich współrzędnymi do debugowania układu
Get visible elements with includeBounds enabled

# Pobierz kolejne 20 elementów (paginacja)
Get visible elements with limit 20 and offset 20

# Dołącz kontenery układu do debugowania
Get visible elements with includeContainers enabled
```

Narzędzie zwraca paginowaną odpowiedź:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### Używanie `get_accessibility` (Tylko przeglądarka)

Do automatyzacji przeglądarki narzędzie `get_accessibility` dostarcza semantycznych informacji o elementach strony:

```
# Pobierz wszystkie nazwane węzły dostępności
Get accessibility tree

# Filtruj tylko przyciski i linki
Get accessibility tree filtered to button and link roles

# Pobierz następną stronę wyników
Get accessibility tree with limit 50 and offset 50
```

Jest to przydatne, gdy `get_visible_elements` nie zwraca oczekiwanych elementów, ponieważ odpytuje natywne API dostępności przeglądarki.