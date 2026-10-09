---
id: faq
title: FAQ
description: "Znajdź odpowiedzi na najczęstsze pytania dotyczące instalacji, używania i rozwiązywania problemów z serwerem WebdriverIO MCP do automatyzacji przeglądarek i urządzeń mobilnych."
---

Najczęściej zadawane pytania dotyczące WebdriverIO MCP.

## Ogólne

### Czym jest MCP?

MCP (Model Context Protocol) to otwarty protokół, który umożliwia asystentom AI, takim jak Claude, interakcję z zewnętrznymi narzędziami i usługami. WebdriverIO MCP implementuje ten protokół, aby zapewnić możliwości automatyzacji przeglądarek i urządzeń mobilnych w Claude Desktop i Claude Code.

### Co mogę zautomatyzować za pomocą WebdriverIO MCP?

Możesz automatyzować:
-   **Przeglądarki desktopowe** (Chrome, Firefox, Edge, Safari) - nawigację, klikanie, wpisywanie tekstu, zrzuty ekranu
-   **Aplikacje iOS** - na symulatorach lub prawdziwych urządzeniach
-   **Aplikacje Android** - na emulatorach lub prawdziwych urządzeniach
-   **Aplikacje hybrydowe** - przełączanie między kontekstem natywnym a webowym
-   **Urządzenia w chmurze** - za pośrednictwem chmur urządzeń BrowserStack, Sauce Labs, TestMu i TestingBot

### Czy muszę pisać kod?

Nie! To główna zaleta MCP. Możesz opisać w języku naturalnym, co chcesz zrobić, a Claude użyje odpowiednich narzędzi, aby wykonać zadanie.

**Przykładowe polecenia:**
-   "Otwórz Chrome i przejdź do webdriver.io"
-   "Kliknij przycisk Get Started"
-   "Zrób zrzut ekranu bieżącej strony"
-   "Uruchom moją aplikację iOS i zaloguj się jako użytkownik testowy"

## Instalacja i konfiguracja

### Jak zainstalować WebdriverIO MCP?

Nie musisz instalować go osobno. Serwer MCP uruchamia się automatycznie przez npx, gdy skonfigurujesz go w swoim środowisku. Dodaj to do swojej konfiguracji:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

### Gdzie znajduje się plik konfiguracyjny Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Czy potrzebuję Appium do automatyzacji przeglądarki?

Nie. Automatyzacja przeglądarki wymaga jedynie zainstalowania docelowej przeglądarki. WebdriverIO automatycznie zarządza sterownikami.

### Czy potrzebuję Appium do automatyzacji mobilnej?

Tak. Automatyzacja mobilna wymaga:
1. Uruchomionego serwera Appium (`npm install -g appium && appium`)
2. Zainstalowanych sterowników platform (`appium driver install xcuitest` dla iOS, `appium driver install uiautomator2` dla Androida)
3. Odpowiednich narzędzi deweloperskich (Xcode dla iOS, Android SDK dla Androida)

## Automatyzacja przeglądarki

### Które przeglądarki są obsługiwane?

Obsługiwane są Chrome, Firefox, Edge i Safari. Użyj parametru `browser` w `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Czy mogę uruchomić przeglądarkę w trybie headless?

Tak. Tryb headless jest domyślny (`headless: true`). Poproś Claude o uruchomienie w trybie z interfejsem, jeśli chcesz widzieć przeglądarkę:

"Uruchom Chrome w trybie z interfejsem (nie headless)"

### Czy mogę ustawić rozmiar okna przeglądarki?

Tak. Możesz określić wymiary podczas uruchamiania przeglądarki:

"Uruchom Chrome z rozmiarem okna 1920x1080"

Obsługiwane wymiary: szerokość 400–3840 pikseli, wysokość 400–2160 pikseli. Domyślnie 1920×1080.

### Czy mogę uruchomić przeglądarkę i przejść do strony w jednym kroku?

Tak! Użyj parametru `navigationUrl`:

"Uruchom Chrome i przejdź do https://webdriver.io"

Jest to bardziej wydajne niż uruchamianie przeglądarki i osobna nawigacja.

### Jak robić zrzuty ekranu?

Po prostu poproś:

"Zrób zrzut ekranu bieżącej strony"

Zrzuty ekranu są automatycznie optymalizowane:
- Skalowane do maksymalnego wymiaru 2000px
- Kompresowane do maksymalnego rozmiaru pliku 1MB
- Format: PNG lub JPEG (wybierany automatycznie dla optymalnej jakości)

### Czy mogę wchodzić w interakcję z ramkami iframe?

Tak. Użyj narzędzia `switch_frame`, aby przełączyć się do ramki iframe za pomocą selektora CSS lub XPath. Wszystkie kolejne wywołania `click_element`, `set_value` i `get_elements` działają w obrębie przełączonej ramki. Pomiń selektor, aby wrócić do ramki najwyższego poziomu. Ramki iframe muszą pochodzić z tego samego źródła (origin) co strona główna.

### Czy mogę wykonywać własny kod JavaScript?

Tak! Użyj narzędzia `execute_script`:

"Wykonaj skrypt, aby pobrać tytuł strony"
"Wykonaj skrypt: return document.querySelectorAll('button').length"

### Czy mogę podłączyć się do istniejącej sesji Chrome?

Tak. Najpierw użyj `launch_chrome` (otwiera Chrome ze zdalnym debugowaniem), a następnie `start_session` z `attach: true`.

"Uruchom Chrome ze zdalnym debugowaniem, a następnie się do niego podłącz"

### Czy mogę pracować z wieloma kartami?

Tak. Użyj `get_tabs`, aby wyświetlić listę otwartych kart, oraz `switch_tab`, aby przełączyć się na konkretną kartę:

"Pobierz wszystkie otwarte karty"
"Przełącz na kartę o indeksie 1"

## Automatyzacja mobilna

### Jak rozpocząć sesję iOS lub Android?

Użyj `start_session` z odpowiednią platformą:

"Uruchom moją aplikację iOS znajdującą się w /path/to/MyApp.app na symulatorze iPhone 15"

"Uruchom moją aplikację Android z /path/to/app.apk na emulatorze Pixel 7"

Lub dla już zainstalowanej aplikacji:

"Uruchom aplikację z włączonym noReset na symulatorze iPhone 15"

### Czy mogę testować na prawdziwych urządzeniach?

Tak! W przypadku prawdziwych urządzeń potrzebujesz UDID urządzenia:

-   **iOS:** Podłącz urządzenie, otwórz Finder, kliknij urządzenie, kliknij numer seryjny, aby wyświetlić UDID
-   **Android:** Uruchom `adb devices` w terminalu

Następnie poproś:

"Uruchom moją aplikację iOS na prawdziwym urządzeniu z UDID abc123..."

### Jak obsługiwać okna dialogowe uprawnień?

Domyślnie uprawnienia są przyznawane automatycznie (`autoGrantPermissions: true`). Jeśli musisz przetestować przepływy uprawnień, możesz to wyłączyć:

"Uruchom moją aplikację bez automatycznego przyznawania uprawnień"

### Jakie gesty są obsługiwane?

-   **Dotknięcie:** Dotykanie elementów lub współrzędnych (`tap_element`)
-   **Przesunięcie:** Przesuwanie w górę, w dół, w lewo lub w prawo (`swipe`)
-   **Przeciągnij i upuść:** Przeciąganie z jednego elementu na inny lub do współrzędnych (`drag_and_drop`)

Uwaga: `long_press` jest dostępne przez `execute_script` z poleceniami mobilnymi Appium.

### Jak przewijać w aplikacjach mobilnych?

Użyj gestów przesunięcia:

"Przesuń w górę, aby przewinąć w dół"
"Przesuń w dół, aby przewinąć w górę"

### Czy mogę obrócić urządzenie?

Tak:

"Obróć urządzenie do orientacji poziomej"
"Obróć urządzenie do orientacji pionowej"

### Jak obsługiwać aplikacje hybrydowe?

W przypadku aplikacji z widokami webview możesz przełączać konteksty:

"Pobierz dostępne konteksty"
"Przełącz na kontekst webview"
"Przełącz z powrotem na kontekst natywny"

### Czy mogę wykonywać polecenia mobilne Appium?

Tak! Użyj narzędzia `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Naciśnij BACK na Androidzie
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Wybór elementów

### Skąd asystent AI wie, z którym elementem wejść w interakcję?

Używa zasobu `wdio://session/current/elements` lub narzędzia `get_elements`, aby zidentyfikować interaktywne elementy na stronie/ekranie. Każdy element zawiera gotowe do użycia selektory.

### Co jeśli na stronie jest zbyt wiele elementów?

Użyj paginacji do zarządzania dużymi listami elementów:

"Pobierz pierwsze 20 elementów"
"Pobierz elementy z przesunięciem 20 i limitem 20"

Odpowiedź zawiera `total`, `showing` i `hasMore`, aby ułatwić nawigację po elementach.

### Co jeśli Claude kliknie niewłaściwy element?

Możesz być bardziej precyzyjny:

-   Podaj dokładny tekst: "Kliknij przycisk z napisem 'Submit Order'"
-   Podaj selektor: "Kliknij element z selektorem #submit-btn"
-   Podaj identyfikator dostępności: "Kliknij element z identyfikatorem dostępności loginButton"

### Jaka jest najlepsza strategia selektorów dla urządzeń mobilnych?

1. **Accessibility ID** (najlepsza) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (ostateczność) - wolniejszy, ale działa wszędzie

### Czym jest drzewo dostępności i kiedy powinienem go używać?

Drzewo dostępności dostarcza informacji semantycznych o elementach strony (role, nazwy, stany). Użyj `get_accessibility_tree`, gdy:
- `get_elements` nie zwraca oczekiwanych elementów
- Musisz znaleźć elementy według roli dostępności (button, link, textbox itp.)
- Potrzebujesz szczegółowych informacji semantycznych o elementach

"Pobierz drzewo dostępności przefiltrowane do ról button i link"

## Zarządzanie sesjami

### Czy mogę mieć wiele sesji jednocześnie?

Nie. Serwer MCP korzysta z modelu pojedynczej sesji. W danym momencie może być aktywna tylko jedna sesja przeglądarki lub aplikacji.

### Co się dzieje, gdy zamknę sesję?

To zależy od typu sesji i ustawień:

-   **Przeglądarka:** Przeglądarka zostaje całkowicie zamknięta
-   **Urządzenie mobilne z `noReset: false`:** Aplikacja zostaje zakończona
-   **Urządzenie mobilne z `noReset: true` lub bez `appPath`:** Aplikacja pozostaje otwarta (sesja odłącza się automatycznie)

### Czy mogę zachować stan aplikacji między sesjami?

Tak! Użyj opcji `noReset`:

"Uruchom moją aplikację z włączonym noReset"

Zachowuje to stan logowania, preferencje i inne dane aplikacji.

### Jaka jest różnica między zamknięciem a odłączeniem?

-   **Zamknięcie:** Całkowicie kończy działanie przeglądarki/aplikacji
-   **Odłączenie:** Rozłącza automatyzację, ale pozostawia przeglądarkę/aplikację uruchomioną

Odłączenie jest przydatne, gdy chcesz ręcznie sprawdzić stan po zakończeniu automatyzacji.

### Moja sesja ciągle wygasa podczas debugowania

Zwiększ limit czasu poleceń:

"Uruchom moją aplikację z newCommandTimeout wynoszącym 300 sekund"

Domyślnie jest to 300 sekund. W przypadku bardzo długich sesji debugowania spróbuj 600 sekund.

## Rozwiązywanie problemów

### Błąd "Session not found"

Oznacza to, że nie istnieje żadna aktywna sesja. Najpierw uruchom sesję przeglądarki lub aplikacji:

"Uruchom Chrome i przejdź do google.com"

### Błąd "Element not found"

Element może być niewidoczny lub mieć inny selektor. Spróbuj:

1. Poprosić Claude o pobranie najpierw wszystkich widocznych elementów
2. Podać bardziej precyzyjny selektor
3. Poczekać na pełne załadowanie strony/aplikacji
4. Użyć `inViewportOnly: false`, aby znaleźć elementy poza ekranem

### Przeglądarka się nie uruchamia

1. Upewnij się, że docelowa przeglądarka jest zainstalowana
2. Sprawdź, czy inny proces nie używa portu debugowania (9222)
3. Spróbuj trybu headless

### Nie udało się połączyć z Appium

To najczęstszy problem podczas rozpoczynania automatyzacji mobilnej.

1. **Sprawdź, czy Appium działa**: `curl http://localhost:4723/status`
2. W razie potrzeby uruchom Appium: `appium`
3. Sprawdź, czy połączenie z Appium odpowiada serwerowi (użyj `appiumConfig` w `start_session`)
4. Upewnij się, że sterowniki są zainstalowane: `appium driver list --installed`

:::tip
Serwer MCP wymaga, aby Appium było uruchomione przed rozpoczęciem sesji mobilnych. Pamiętaj, aby najpierw uruchomić Appium:
```sh
appium
```
Przyszłe wersje mogą zawierać automatyczne zarządzanie usługą Appium.
:::

### Symulator iOS się nie uruchamia

1. Upewnij się, że Xcode jest zainstalowany: `xcode-select --install`
2. Wyświetl listę dostępnych symulatorów: `xcrun simctl list devices`
3. Sprawdź błędy konkretnego symulatora w Console.app

### Emulator Androida się nie uruchamia

1. Ustaw `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Sprawdź emulatory: `emulator -list-avds`
3. Uruchom emulator ręcznie: `emulator -avd <avd-name>`
4. Sprawdź, czy urządzenie jest podłączone: `adb devices`

### Zrzuty ekranu nie działają

1. W przypadku urządzeń mobilnych upewnij się, że sesja jest aktywna
2. W przypadku przeglądarki spróbuj innej strony (niektóre strony blokują zrzuty ekranu)
3. Sprawdź logi Claude Desktop pod kątem błędów

Zrzuty ekranu są automatycznie kompresowane do maksymalnie 1MB, więc duże zrzuty ekranu będą działać, ale mogą mieć niższą jakość.

## Wydajność

### Dlaczego automatyzacja mobilna jest wolna?

Automatyzacja mobilna obejmuje:
1. Komunikację sieciową z serwerem Appium
2. Komunikację Appium z urządzeniem/symulatorem
3. Renderowanie i odpowiedź urządzenia

Wskazówki dotyczące szybszej automatyzacji:
-   Używaj emulatorów/symulatorów zamiast prawdziwych urządzeń podczas programowania
-   Używaj identyfikatorów dostępności zamiast XPath
-   Włącz `inViewportOnly: true` do wykrywania elementów
-   Używaj paginacji (`limit`), aby zmniejszyć zużycie tokenów

### Jak przyspieszyć wykrywanie elementów?

Serwer MCP już optymalizuje wykrywanie elementów, korzystając z parsowania źródła strony XML (2 wywołania HTTP zamiast ponad 600 przy tradycyjnych zapytaniach o elementy). Dodatkowe wskazówki:

-   Ustaw `inViewportOnly: true`, aby odfiltrować elementy poza ekranem
-   Ustaw `includeContainers: false` (domyślnie)
-   Używaj `limit` i `offset` do paginacji na dużych ekranach
-   Używaj konkretnych selektorów zamiast wyszukiwania wszystkich elementów

### Zrzuty ekranu są wolne lub kończą się niepowodzeniem

Zrzuty ekranu są automatycznie optymalizowane:
- Zmniejszane, jeśli są większe niż 2000px
- Kompresowane, aby nie przekraczały 1MB
- Konwertowane do JPEG, jeśli PNG jest zbyt duży

Ta optymalizacja skraca czas przetwarzania i zapewnia, że Claude może obsłużyć obraz.

## Ograniczenia

### Jakie są obecne ograniczenia?

-   **Pojedyncza sesja:** Tylko jedna przeglądarka/aplikacja naraz
-   **Obsługa iframe:** Ramki iframe z tego samego źródła są obsługiwane przez `switch_frame`; ramki iframe z innych źródeł są niedostępne ze względu na ograniczenia bezpieczeństwa przeglądarki
-   **Przesyłanie plików:** Nieobsługiwane bezpośrednio przez narzędzia
-   **Audio/Wideo:** Brak możliwości interakcji z odtwarzaniem multimediów
-   **Rozszerzenia przeglądarki:** Nieobsługiwane

### Czy mogę używać tego do testów produkcyjnych?

WebdriverIO MCP jest przeznaczony do interaktywnej automatyzacji wspomaganej przez AI. Do produkcyjnych testów CI/CD rozważ użycie tradycyjnego test runnera WebdriverIO z pełną kontrolą programistyczną.

## Bezpieczeństwo

### Czy moje dane są bezpieczne?

Serwer MCP działa lokalnie na Twoim komputerze. Cała automatyzacja odbywa się przez lokalne połączenia z przeglądarką/Appium. Żadne dane nie są wysyłane na zewnętrzne serwery poza tymi, do których jawnie nawigujesz.

W trybie transportu HTTP (`--http`) serwer domyślnie akceptuje połączenia tylko z `localhost`; użyj `--allowedHosts` i `--allowedOrigins`, aby kontrolować dostęp. Szczegóły znajdziesz w sekcji [Transport](./transport).

### Czy Claude ma dostęp do moich haseł?

Claude widzi zawartość strony i może wchodzić w interakcję z elementami, ale:
-   Hasła w polach `<input type="password">` są maskowane
-   Należy unikać automatyzacji z użyciem poufnych danych uwierzytelniających
-   Do automatyzacji używaj kont testowych

## Współtworzenie

### Jak mogę się zaangażować?

Odwiedź [repozytorium GitHub](https://github.com/webdriverio/mcp), aby:
-   Zgłaszać błędy
-   Proponować nowe funkcje
-   Przesyłać pull requesty

### Gdzie mogę uzyskać pomoc?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Dokumentacja WebdriverIO](https://webdriver.io/)