---
id: session-commands
title: Polecenia wdio session
description: Każda akcja i flaga wdio session, od open po doctor i skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Każda akcja `wdio session`. Flagi globalne dotyczą wszystkich akcji. Ten sam tekst wypisuje `npx wdio session <action> --help`. Pozostała część sekcji [WebdriverIO Session](/docs/session) omawia [cele](/docs/session/targets), [snapshoty](/docs/session/snapshots), [`exec`](/docs/session/exec), [eksport](/docs/session/export) i [debugowanie](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Flagi globalne

| Flaga | Opis |
| --- | --- |
| `-s, --session` | Nazwa sesji (zmienna env WDIO_SESSION, domyślnie "default") |
| `--json` | Wypisz jeden obiekt JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Limit czasu żądania w ms (maksymalnie 60000, z wyjątkiem wait) |
| `-q, --quiet` | Przy powodzeniu nie wypisuj nic poza żądanymi danymi |
| `--color` | Użyj --no-color, aby wyłączyć kolory |

Kody wyjścia: 0 sukces, 1 akcja lub Twój kod zakończyły się błędem, 2 błąd użycia, 3 brak zależności lub danych uwierzytelniających, 4 brak sesji o tej nazwie.

## `open`

Uruchom sesję: browser, android, ios, macos, windows, electron, tauri, dioxus lub plik konfiguracyjny wdio.

Uruchamia w tle demona, który utrzymuje sesję aż do `close` lub do momentu, gdy pozostaje bezczynna przez --idle-timeout (domyślnie 30m). Przeglądarki działają w trybie headless, chyba że przekażesz --headed. Wypisuje nazwę sesji, cel, katalog artefaktów, do którego trafiają snapshoty, zrzuty ekranu i eksporty, a w przypadku przeglądarki otwartej na adresie URL — interaktywny snapshot tej strony.

Jedna sesja na nazwę. Otwarcie nazwy, która już działa, kończy się błędem; użyj jej, zamknij ją albo przekaż --replace. Przekazuj `-s <name>` tylko wtedy, gdy potrzebujesz dwóch sesji jednocześnie.

```sh
npx wdio session open <target> [url]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | nie | URL do otwarcia (przeglądarki), ścieżka aplikacji (aplikacje desktopowe) lub capability (konfiguracja) |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--replace` | Najpierw zamknij działającą sesję o tej samej nazwie |
| `--launch-timeout <n>` | Liczba milisekund oczekiwania na gotowość sesji |
| `--idle-timeout <value>` | Zamknij po takim czasie bez żądań (np. 30m, 0 wyłącza) |
| `--capabilities <value>` | Dodatkowe capabilities jako JSON lub ścieżka do pliku JSON |
| `--hostname <value>` | Zdalny host WebDriver |
| `--port <n>` | Zdalny port WebDriver |
| `--path <value>` | Zdalna ścieżka WebDriver |
| `--protocol <value>` | Zdalny protokół WebDriver |
| `--log-level <value>` | Poziom logowania WebdriverIO zapisywany do daemon.log |
| `--bidi` | Zażądaj WebDriver BiDi (użyj --no-bidi, aby wyłączyć) |
| `--headed` | Pokaż okno przeglądarki |
| `--headless` | Uruchom bez okna (domyślne dla przeglądarek; nadpisuje --headed) |
| `--snapshot` | Wypisz interaktywny snapshot otwartej strony (użyj --no-snapshot, aby pominąć) |
| `--viewport <value>` | Początkowy viewport, np. 1280x720 |
| `--browser-version <value>` | Wersja przeglądarki |
| `--binary <value>` | Plik binarny przeglądarki |
| `--arg <value>` | Dodatkowy argument przeglądarki. Wartość zaczynająca się od `-` wymaga `=`, np. `--arg=--disable-gpu` (można powtarzać) |
| `--profile <value>` | Katalog trwałego profilu |
| `--attach <value>` | Podłącz się do działającego Chrome/Edge (port debugowania lub URL) |
| `--app <value>` | Plik aplikacji lub URL aplikacji w chmurze |
| `--package <value>` | Pakiet aplikacji Android |
| `--activity <value>` | Aktywność aplikacji Android |
| `--bundle-id <value>` | Bundle id iOS/macOS |
| `--browser <value>` | Mobilna przeglądarka internetowa (chrome, safari) |
| `--device <value>` | Nazwa urządzenia |
| `--platform-version <value>` | Wersja platformy |
| `--udid <value>` | UDID urządzenia |
| `--reset` | Użyj --no-reset, aby zachować stan aplikacji (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Początkowa orientacja |
| `--appium-url <value>` | Użyj działającego serwera Appium |
| `--app-arg <value>` | Argument przekazywany do aplikacji desktopowej. Wartość zaczynająca się od `-` wymaga `=`, np. `--app-arg=--no-sandbox` (można powtarzać) |
| `--chromedriver <value>` | Electron: plik binarny Chromedriver |
| `--electron-version <value>` | Electron: nadpisz wykrywanie wersji |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Dostawca chmury |
| `--os <value>` | Chmura: system operacyjny desktopu |
| `--os-version <value>` | Chmura: wersja systemu operacyjnego desktopu |
| `--region <value>` | Chmura: region Sauce Labs |
| `--tunnel <value>` | Chmura: uruchom tunel dostawcy (lub "external") |
| `--tunnel-name <value>` | Chmura: identyfikator tunelu |
| `--project <value>` | Chmura: etykieta projektu |
| `--build <value>` | Chmura: etykieta buildu |
| `--name <value>` | Chmura: etykieta nazwy sesji |

**Przykłady**

```sh
# Otwórz Chrome w trybie headless dla lokalnej aplikacji
npx wdio session open chrome http://localhost:3000

# Otwórz Firefoksa z widocznym oknem
npx wdio session open firefox http://localhost:3000 --headed

# Otwórz aplikację Android przez Appium
npx wdio session open android --app ./app.apk

# Otwórz zainstalowaną aplikację iOS
npx wdio session open ios --bundle-id com.example.shop

# Otwórz aplikację Electron
npx wdio session open electron ./main.js

# Otwórz pierwszą capability z konfiguracji
npx wdio session open ./wdio.conf.ts 0

# Otwórz Chrome w gridzie w chmurze
npx wdio session open chrome https://example.com --provider browserstack
```

Zobacz też: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Zakończ sesję i zatrzymaj jej demona.

W sesji otwartej przez `wdio run --debug=agent` powoduje to niepowodzenie wstrzymanego testu; użyj `resume`, aby pozwolić mu kontynuować.

```sh
npx wdio session close
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--all` | Zamknij wszystkie sesje |
| `--clean` | Usuń również katalog artefaktów |

**Przykłady**

```sh
# Zamknij domyślną sesję
npx wdio session close

# Zamknij wszystkie sesje i usuń ich artefakty
npx wdio session close --all --clean
```

Zobacz też: [`open`](#open), [`list`](#list).

## `list`

Wyświetl działające sesje.

Wypisuje jedną linię na sesję: nazwę, cel, URL i wiek. Usuwa stan pozostawiony przez sesje, które przestały działać.

```sh
npx wdio session list
```

**Przykłady**

```sh
# Pokaż wszystkie działające sesje
npx wdio session list
```

Zobacz też: [`info`](#info), [`status`](#status).

## `info`

Pokaż szczegóły sesji.

Wypisuje cel, przeglądarkę i wersję, obsługę BiDi, katalog artefaktów oraz bieżący URL, tytuł, rozmiar okna i ramkę (web) albo kontekst i aktywność (mobile).

```sh
npx wdio session info
```

**Przykłady**

```sh
# Pokaż, gdzie jest sesja i co uruchamia
npx wdio session info
```

Zobacz też: [`list`](#list), [`get`](#get).

## `restart`

Zamknij i otwórz ponownie z tym samym celem i flagami.

Zachowuje zapisaną historię, więc `export` nadal obejmuje kroki sprzed restartu.

```sh
npx wdio session restart
```

**Przykłady**

```sh
# Zacznij od nowa ze świeżą przeglądarką
npx wdio session restart
```

Zobacz też: [`open`](#open), [`close`](#close).

## `status`

Zakończ z kodem 0, jeśli sesja działa, lub 4, jeśli nie.

```sh
npx wdio session status
```

**Przykłady**

```sh
# Otwórz sesję tylko wtedy, gdy żadna nie działa
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Zobacz też: [`list`](#list), [`open`](#open).

## `exec`

Uruchom kod WebdriverIO ze stdin, -e lub pliku.

Działa jako funkcja asynchroniczna z `browser`, `$`, `$$`, `expect` i `ref('e3')` w zasięgu. Zmienne najwyższego poziomu są zachowywane między wywołaniami. `wdio session` bez akcji uruchamia `exec`, gdy kod jest przekazywany potokiem na stdin.

Zawsze używaj `await` z poleceniami. `$` zwraca dokładnie jeden element i rzuca StrictSelectorError, gdy pasuje więcej niż jeden. Preferuj pojedynczą akcję (click, fill, …), gdy wystarcza; używaj `exec` do pętli, warunków i asercji.

```sh
npx wdio session exec [file]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `file` | nie | Plik skryptu (.js, .ts, .mjs) |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `-e, --eval <value>` | Kod do uruchomienia |
| `--history` | Zapisz kod w historii (użyj --no-history, aby pominąć) |

**Przykłady**

```sh
# Uruchom jednolinijkowiec
npx wdio session exec -e "await browser.getTitle()"

# Sprawdź asercję na stronie (pojedyncze cudzysłowy chronią $ przed powłoką)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Przekaż kilka kroków potokiem na stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Uruchom plik skryptu
npx wdio session exec ./scripts/login.ts
```

Zobacz też: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Wyświetl helpery projektu z .wdio/helpers.

Każdy plik w .wdio/helpers eksportuje domyślnie funkcję, która otrzymuje przeglądarkę i rejestruje własne polecenia przez addCommand. Helpery są ładowane przy otwarciu sesji i stają się własnymi poleceniami w wyeksportowanym teście.

```sh
npx wdio session helpers
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--reload` | Zaimportuj helpery ponownie |

**Przykłady**

```sh
# Wyświetl helpery i dodawane przez nie polecenia
npx wdio session helpers

# Uwzględnij zmiany w helperze
npx wdio session helpers --reload
```

Zobacz też: [`exec`](#exec), [`export`](#export).

## `snapshot`

Snapshot dostępności z refami. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wypisuje drzewo dostępności, jeden węzeł na linię, np. `button "Add to cart" [ref=e3]`. Przekaż ref do click, fill, get i innych akcji. Refy pozostają ważne, dopóki element istnieje; akcja na usuniętym elemencie kończy się błędem REF_STALE.

Każdy snapshot jest zapisywany w katalogu artefaktów. Wynik dłuższy niż --max-chars jest wypisywany w częściach: najpierw pierwsza część, potem `--offset <line>` dla następnej. `find` przeszukuje całość.

Układ tekstu i struktura --json są eksperymentalne i mogą się zmienić w wydaniu minor. Składnia refów i akcje przyjmujące ref pozostają stabilne.

```sh
npx wdio session snapshot
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--depth <n>` | Maksymalna głębokość |
| `--scope <value>` | Snapshot tylko poniżej tego refa lub selektora |
| `-i, --interactive` | Tylko elementy interaktywne |
| `--all` | Uwzględnij ukryte elementy |
| `--boxes` | Dołącz prostokąty ograniczające (bounding boxes) |
| `--viewport` | Tylko to, co jest w viewporcie (web: nie aktualizuje bazy porównania dla diff) |
| `--selectors` | Zakończ każdą linię z refem jego najlepszym selektorem |
| `--compact` | Pomiń nienazwane węzły bez zawartości |
| `-u, --urls` | Uwzględnij href linków |
| `--file-only` | Tylko zapisz plik |
| `--max-chars <n>` | Wypisuj naraz do tylu znaków (domyślnie 8000) |
| `--offset <n>` | Wypisuj od tej linii, dla następnej części długiego snapshotu |

**Przykłady**

```sh
# Tylko elementy interaktywne, zwykłe pierwsze spojrzenie
npx wdio session snapshot -i

# Cała strona z celami linków
npx wdio session snapshot --compact --urls

# Tylko część strony
npx wdio session snapshot --scope "#checkout" --depth 4

# Co jest teraz na ekranie
npx wdio session snapshot --viewport -i

# Każdy ref z selektorem do umieszczenia w teście
npx wdio session snapshot --selectors -i

# Wykonaj akcję, potem spójrz ponownie
npx wdio session click e3 && npx wdio session snapshot -i
```

Zobacz też: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Odczytaj tekst strony jako Markdown. Dotyczy: web.

Nagłówki, akapity, elementy list, wiersze tabel i linki z ich URL-em, z głównej treści, gdy strona ją oznacza (main, article), w przeciwnym razie z całej strony; nawigacja, stopki i ukryty tekst są pomijane. Obcinane na --max-chars (domyślnie 6000); przy obcięciu podawane jest, który --offset odczyta następną część. Z --scope sekcja jest przewijana do widoku. Używaj tego, aby odpowiedzieć na pytanie „co jest napisane na stronie”; do refów, na których chcesz wykonywać akcje, używaj snapshot lub find.

```sh
npx wdio session read
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--scope <value>` | Odczytaj tylko poniżej tego refa lub selektora |
| `--max-chars <n>` | Wypisz do tylu znaków (domyślnie 6000) |
| `--offset <n>` | Zacznij od tego znaku tekstu, dla następnej części długiej strony |

**Przykłady**

```sh
# Odczytaj główną treść
npx wdio session read

# Odczytaj jedną sekcję
npx wdio session read --scope e12
```

Zobacz też: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Przeszukaj świeży snapshot pod kątem tekstu. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wykonuje nowy snapshot i wypisuje każde dopasowanie wraz z otaczającym węzłem (np. cały element listy, więc wartość obok dopasowania jest uwzględniona), z numerami linii i refami, oraz przewija pierwsze dopasowanie do widoku. Dopasowywanie ignoruje wielkość liter, potem spacje ("SO2" znajduje "SO 2"), a następnie szuka wszystkich słów oraz słów do nich podobnych. Tekst, który znajduje się wyłącznie w ukrytych częściach strony (zamknięte menu, karty, „Pokaż więcej”), jest oznaczany jako taki. Tańsze niż czytanie całego snapshotu dużej strony. -A/-B/-C wypisują zamiast tego zwykły kontekst linii, jak grep.

```sh
npx wdio session find <text>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `text` | tak | Tekst do wyszukania |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--regex` | Traktuj tekst jako wyrażenie regularne |
| `--scope <value>` | Szukaj tylko poniżej tego refa lub selektora |
| `-C, --context <n>` | Liczba linii kontekstu przed i po zamiast otaczającego węzła |
| `-A, --after-context <n>` | Liczba linii kontekstu po każdym dopasowaniu |
| `-B, --before-context <n>` | Liczba linii kontekstu przed każdym dopasowaniem |
| `--offset <n>` | Pomiń tyle dopasowań, aby zobaczyć kolejne, gdy wynik jest obcięty |

**Przykłady**

```sh
# Znajdź ref przycisku
npx wdio session find "Add to cart"

# Wyświetl wszystkie linki
npx wdio session find "^\s*link" --regex --context 0
```

Zobacz też: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Porównaj świeży snapshot z poprzednim. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wypisuje zunifikowany diff zmian od ostatniego snapshotu lub "No changes". Pierwsze wywołanie zapisuje bazę porównania. Używaj tego po akcji, aby zobaczyć, co akcja zrobiła, bez ponownego czytania całej strony. W przypadku web bazą jest ostatni snapshot wykonany bez `--viewport`.

```sh
npx wdio session diff
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--baseline <value>` | Plik snapshotu do porównania |
| `--scope <value>` | Snapshot tylko w obrębie tego refa lub selektora, jak `snapshot --scope` |
| `--interactive` | Tylko elementy interaktywne, jak `snapshot -i` |

**Przykłady**

```sh
# Zobacz, co zmieniło kliknięcie
npx wdio session click e7 && npx wdio session diff

# Porównaj z zapisanym snapshotem
npx wdio session diff --baseline before.yml
```

Zobacz też: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Zapisz PNG viewportu, elementu lub całej strony. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wypisuje ścieżkę pliku i rozmiar obrazu. Rób zrzut ekranu, gdy pytanie dotyczy układu lub wyglądu; tekst i stan odczytuj za pomocą `snapshot` i `get`.

```sh
npx wdio session screenshot [target]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | nie | Ref lub selektor elementu do przechwycenia |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--full` | Cała strona (web) |
| `--path <value>` | Plik wyjściowy |

**Przykłady**

```sh
# Przechwyć viewport
npx wdio session screenshot

# Przechwyć jeden element
npx wdio session screenshot e5 --path card.png

# Przechwyć całą stronę
npx wdio session screenshot --full
```

Zobacz też: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Zapisz bieżącą stronę jako PDF. Dotyczy: web.

Wywołuje `browser.savePDF`. Sesja BiDi drukuje za pomocą `browsingContext.print`, w trybie headed lub headless, w Chrome, Edge i Firefox. Sesja Classic używa `printPage`, które starsze wersje Chrome obsługują tylko w trybie headless.

```sh
npx wdio session pdf [file]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `file` | nie | Plik wyjściowy (musi kończyć się na .pdf) |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--path <value>` | Plik wyjściowy (musi kończyć się na .pdf) |

**Przykłady**

```sh
# Zapisz report.pdf w bieżącym katalogu
npx wdio session pdf report.pdf
```

Zobacz też: [`screenshot`](#screenshot).

## `source`

Zapisz HTML strony lub XML aplikacji. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Zapisuje plik i wypisuje jego ścieżkę i rozmiar. Używaj tego, gdy snapshot ukrywa to, czego potrzebujesz, np. atrybuty dla selektora.

```sh
npx wdio session source
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--path <value>` | Plik wyjściowy |

**Przykłady**

```sh
# Zapisz HTML w bieżącym katalogu
npx wdio session source --path page.html
```

Zobacz też: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Odczytaj tekst, html, wartość, atrybut, tytuł, URL, liczbę lub prostokąt. Dotyczy: web.

Wypisuje wartość, a następnie uruchomiony kod WebdriverIO (`→ …`). Przekaż -q, aby wypisać tylko wartość, np. by zapisać ją w zmiennej powłoki. Odczytaj wartość, zanim napiszesz dla niej asercję.

```sh
npx wdio session get <sub> [target] [name]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | nie | Ref lub selektor (nieużywany dla title i url) |
| `name` | nie | Nazwa atrybutu (tylko attr) |

**Przykłady**

```sh
# Tekst refa
npx wdio session get text e1

# Bieżący URL
npx wdio session get url

# Tylko wartość, dla zmiennej powłoki
url=$(npx wdio session get url -q)

# href linku
npx wdio session get attr e3 href

# Ile elementów pasuje
npx wdio session get count "aria/Remove"
```

Zobacz też: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Sprawdź, czy element jest widoczny, włączony lub zaznaczony. Dotyczy: web.

Wypisuje true lub false, a następnie uruchomiony kod WebdriverIO; przekaż -q, aby wypisać tylko wartość. Kod wyjścia w obu przypadkach wynosi 0.

```sh
npx wdio session is <sub> <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | visible \| enabled \| checked |
| `target` | tak | Ref lub selektor |

**Przykłady**

```sh
# Wypisz true lub false
npx wdio session is visible e1

# Sprawdź przycisk po jego etykiecie
npx wdio session is enabled "aria/Place order"
```

Zobacz też: [`get`](#get), [`wait`](#wait).

## `logs`

Wypisz logi konsoli, błędów strony, sieci i urządzenia od ostatniego wywołania. Dotyczy: web, natywne aplikacje mobilne.

Każde wywołanie przesuwa kursor odczytu, więc następne wywołanie pokazuje tylko nowe wpisy. Uruchom to po akcji, aby zobaczyć błędy, które ta akcja spowodowała.

```sh
npx wdio session logs
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--errors` | Tylko błędy |
| `--network` | Tylko wpisy sieciowe |
| `--since <value>` | Tylko wpisy nowsze niż podany czas (np. 30s) |
| `--peek` | Nie przesuwaj kursora odczytu |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Źródło logów |

**Przykłady**

```sh
# Błędy spowodowane kliknięciem
npx wdio session click e4 && npx wdio session logs --errors

# Ostatnie wpisy, zachowaj je dla następnego wywołania
npx wdio session logs --since 30s --peek
```

Zobacz też: [`requests`](#requests).

## `navigate`

Otwórz URL. Dotyczy: web.

Akceptuje `example.com`, pełne adresy URL i ścieżki względne wobec baseUrl. Najpierw opuszcza ramkę, jeśli jest w niej. Wypisuje nowy URL i tytuł.

```sh
npx wdio session navigate <url>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `url` | tak | URL (względne adresy URL używają baseUrl) |

**Przykłady**

```sh
# Przejdź do strony i obejrzyj ją
npx wdio session navigate /cart && npx wdio session snapshot -i

# Otwórz inną witrynę
npx wdio session navigate example.com
```

Zobacz też: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Przejdź wstecz. Dotyczy: web.

```sh
npx wdio session back
```

**Przykłady**

```sh
# Cofnij się o jedną stronę
npx wdio session back
```

Zobacz też: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Przejdź dalej. Dotyczy: web.

```sh
npx wdio session forward
```

**Przykłady**

```sh
# Przejdź o jedną stronę do przodu
npx wdio session forward
```

Zobacz też: [`back`](#back), [`navigate`](#navigate).

## `reload`

Przeładuj stronę. Dotyczy: web.

```sh
npx wdio session reload
```

**Przykłady**

```sh
# Przeładuj i poczekaj, aż ruch sieciowy ucichnie
npx wdio session reload && npx wdio session wait --load networkidle
```

Zobacz też: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Czekaj na element, tekst, URL, stan ładowania, warunek lub kilka milisekund. Dotyczy: web.

Przekaż dokładnie jedno z: ref lub selektor, --text, --url, --load, --fn lub liczbę milisekund. Po upływie --limit kończy się kodem wyjścia 1.

Preferuj warunek zamiast pauzy, zarówno tutaj, jak i zamiast `sleep` w łańcuchu. Pauza dłuższa niż 30 sekund jest odrzucana.

```sh
npx wdio session wait [target]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | nie | Ref, selektor lub milisekundy |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--text <value>` | Czekaj, aż strona będzie zawierać ten tekst |
| `--url <value>` | Czekaj, aż URL będzie pasować (podciąg albo globy * i **) |
| `--load <value>` | domcontentloaded, load lub networkidle |
| `--fn <value>` | Czekaj, aż to wyrażenie JavaScript będzie prawdziwe |
| `--state <value>` | Z celem: visible (domyślnie), hidden, enabled lub disabled |
| `--limit <n>` | Liczba milisekund oczekiwania (domyślnie 10000) |

**Przykłady**

```sh
# Czekaj, aż ref będzie widoczny
npx wdio session wait e1

# Czekaj, aż spinner zniknie
npx wdio session wait "aria/Loading" --state hidden

# Wykonaj akcję, poczekaj na wynik, spójrz ponownie
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Czekaj na URL
npx wdio session wait --url "**/dashboard"

# Czekaj, aż żadne żądanie nie będzie w toku
npx wdio session wait --load networkidle

# Pauza 500ms
npx wdio session wait 500
```

Zobacz też: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Kliknij element. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wypisuje, co zostało kliknięte, oraz nowy URL, gdy kliknięcie spowodowało nawigację. Wykonaj nowy snapshot, zanim użyjesz refów na następnej stronie. Kliknięcie ukrytego lub zasłoniętego elementu od razu kończy się błędem z informacją, co go zasłania. `x,y` klika punkt viewportu (piksele od lewego górnego rogu, jak na zrzucie ekranu) w przypadku czegoś, co nie ma refa, np. canvas lub mapy.

```sh
npx wdio session click <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12), selektor WebdriverIO lub współrzędne x,y viewportu |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--double` | Podwójne kliknięcie |
| `--right` | Kliknięcie prawym przyciskiem |
| `--new-tab` | Otwórz link w nowej karcie i przełącz się na nią |

**Przykłady**

```sh
# Kliknij ref z najnowszego snapshotu
npx wdio session click e3

# Kliknij po dostępnej nazwie
npx wdio session click "aria/Add to cart"

# Kliknij, poczekaj, spójrz ponownie
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Otwórz link w nowej karcie
npx wdio session click e8 --new-tab

# Kliknij punkt viewportu, np. na mapie
npx wdio session click 320,480
```

Zobacz też: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Stuknij element (mobile). Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session tap <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Przykłady**

```sh
# Stuknij ref z najnowszego snapshotu
npx wdio session tap e2
```

Zobacz też: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Zastąp wartość pola input. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Najpierw czyści pole. Aby pisać w elemencie, który ma fokus, użyj `type`; aby wysłać klawisze takie jak Enter, użyj `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |
| `text` | tak | Tekst (słowa po celu są łączone spacjami) |

**Przykłady**

```sh
# Wypełnij pole
npx wdio session fill e2 ada@example.com

# Wypełnij formularz i wyślij go
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Zobacz też: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Wpisz tekst w element lub w element z fokusem. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

Wysyła tekst jako naciśnięcia klawiszy bez czyszczenia czegokolwiek: `type e2 Ada` wpisuje w e2, `type Ada` w to, co ma fokus. Aby zastąpić wartość, użyj `fill`.

```sh
npx wdio session type <text..>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `text` | tak | Tekst (słowa są łączone spacjami). Zacznij od refa, np. `type e2 Ada`, aby wpisać w ten element zamiast w element z fokusem |

**Przykłady**

```sh
# Wpisz w pole
npx wdio session type e5 hello

# Wpisz w to, co ma fokus
npx wdio session focus e5 && npx wdio session type "hello"
```

Zobacz też: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Naciśnij klawisze, np. Enter, Control+a. Dotyczy: web, natywne aplikacje desktopowe.

Łącz klawisze za pomocą +. Wielkość liter w nazwach nie ma znaczenia; ctrl, cmd, esc, up, down, left i right są akceptowane jako formy skrócone.

```sh
npx wdio session press <keys>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `keys` | tak | Kombinacja klawiszy |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--times <n>` | Naciśnij tyle razy (do 100), np. aby przesunąć suwak |

**Przykłady**

```sh
# Wyślij formularz
npx wdio session press Enter

# Przesuń suwak z fokusem o pięć kroków
npx wdio session press ArrowRight --times 5

# Zaznacz wszystko
npx wdio session press Control+a

# Przenieś fokus wstecz
npx wdio session press Shift+Tab
```

Zobacz też: [`type`](#type), [`fill`](#fill).

## `select`

Wybierz opcję elementu `<select>`. Dotyczy: web.

```sh
npx wdio session select <target> <value>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |
| `value` | tak | Tekst, wartość lub indeks opcji |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--by <text\|value\|index>` | Sposób dopasowania opcji (domyślnie text) |

**Przykłady**

```sh
# Wybierz po widocznym tekście
npx wdio session select e6 Germany

# Wybierz po wartości
npx wdio session select e6 de --by value
```

Zobacz też: [`fill`](#fill), [`check`](#check).

## `upload`

Ustaw pole wyboru pliku. Dotyczy: web.

Ścieżka jest względna wobec katalogu roboczego. Wskaż sam element `<input type="file">`, a nie przycisk otwierający okno wyboru pliku.

```sh
npx wdio session upload <target> <file>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |
| `file` | tak | Plik do przesłania |

**Przykłady**

```sh
# Dołącz plik
npx wdio session upload e9 ./fixtures/avatar.png
```

Zobacz też: [`fill`](#fill).

## `hover`

Przesuń wskaźnik nad element. Dotyczy: web, natywne aplikacje desktopowe.

```sh
npx wdio session hover <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Przykłady**

```sh
# Otwórz menu rozwijane po najechaniu i obejrzyj je
npx wdio session hover e4 && npx wdio session snapshot -i
```

Zobacz też: [`click`](#click).

## `focus`

Ustaw fokus na elemencie. Dotyczy: web.

```sh
npx wdio session focus <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Przykłady**

```sh
# Ustaw fokus na polu przed `type`
npx wdio session focus e5
```

Zobacz też: [`type`](#type), [`press`](#press).

## `check`

Zaznacz checkbox lub przycisk radio. Dotyczy: web.

Nic nie robi, gdy jest już zaznaczony, i kończy się błędem, gdy ostatecznie nie zostanie zaznaczony.

```sh
npx wdio session check <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Przykłady**

```sh
# Zaakceptuj regulamin
npx wdio session check e7
```

Zobacz też: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Odznacz checkbox. Dotyczy: web.

Nic nie robi, gdy jest już odznaczony. Wybranego przycisku radio nie można odznaczyć.

```sh
npx wdio session uncheck <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Przykłady**

```sh
# Zrezygnuj z newslettera
npx wdio session uncheck e7
```

Zobacz też: [`check`](#check), [`is`](#is).

## `drag`

Przeciągnij element na inny. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

```sh
npx wdio session drag <from> <to>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `from` | tak | Ref lub selektor elementu do przeciągnięcia |
| `to` | tak | Ref lub selektor elementu, na który ma zostać upuszczony |

**Przykłady**

```sh
# Przenieś kartę do innej kolumny
npx wdio session drag e3 e9
```

Zobacz też: [`scroll`](#scroll).

## `scroll`

Przewiń element do widoku lub przewiń stronę. Dotyczy: web.

Bez celu przewija w dół o 600px. Treść ładowana leniwie pojawia się w następnym snapshocie.

```sh
npx wdio session scroll [target]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | nie | Ref, selektor, up, down, top lub bottom |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--px <n>` | Piksele dla up/down (domyślnie 600) |

**Przykłady**

```sh
# Przewiń element do widoku
npx wdio session scroll e40

# Załaduj więcej wyników i obejrzyj je
npx wdio session scroll bottom && npx wdio session snapshot -i

# Przewiń o dwa ekrany
npx wdio session scroll down --px 1200
```

Zobacz też: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Przesuń palcem po ekranie (mobile). Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session swipe <direction>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `direction` | tak | up \| down \| left \| right |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--percent <n>` | Długość przesunięcia 0..1 |

**Przykłady**

```sh
# Przewiń listę i obejrzyj ją
npx wdio session swipe up && npx wdio session snapshot
```

Zobacz też: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Przytrzymaj element (mobile). Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session long-press <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref (e12) lub selektor WebdriverIO |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--duration <n>` | Milisekundy |

**Przykłady**

```sh
# Otwórz menu kontekstowe
npx wdio session long-press e4 --duration 1500
```

Zobacz też: [`tap`](#tap).

## `tabs`

Wyświetl, otwórz, przełącz lub zamknij karty. Dotyczy: web.

Bez podpolecenia wyświetla karty z ich indeksami; bieżąca jest oznaczona. `new` otwiera kartę i przełącza się na nią. `switch` i `close` przyjmują indeks lub uchwyt.

```sh
npx wdio session tabs [sub] [arg]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | nie | switch \| new \| close |
| `arg` | nie | Indeks, uchwyt lub URL |

**Przykłady**

```sh
# Wyświetl karty
npx wdio session tabs

# Otwórz kartę
npx wdio session tabs new http://localhost:3000/help

# Wróć do pierwszej karty
npx wdio session tabs switch 0

# Zamknij drugą kartę
npx wdio session tabs close 1
```

Zobacz też: [`windows`](#windows), [`frame`](#frame).

## `windows`

Wyświetl lub przełącz okna. Dotyczy: web, natywne aplikacje desktopowe.

```sh
npx wdio session windows [sub] [arg]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | nie | switch |
| `arg` | nie | Indeks lub uchwyt |

**Przykłady**

```sh
# Wyświetl okna
npx wdio session windows

# Przełącz na drugie okno
npx wdio session windows switch 1
```

Zobacz też: [`tabs`](#tabs).

## `frame`

Przełącz się do iframe, do ramki nadrzędnej lub na najwyższy poziom. Dotyczy: web.

Snapshot strony już pokazuje zawartość jej iframe'ów, z refami, których akcje używają bezpośrednio, więc `frame` jest potrzebne tylko do pracy przez dłuższy czas wewnątrz jednej ramki lub do zobaczenia ramki, którą snapshot obciął. Snapshoty i akcje dotyczą bieżącej ramki, dopóki nie przełączysz się z powrotem. `navigate` wraca do dokumentu najwyższego poziomu.

```sh
npx wdio session frame <target>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | tak | Ref, selektor, parent lub top |

**Przykłady**

```sh
# Wejdź do iframe i zajrzyj do środka
npx wdio session frame e12 && npx wdio session snapshot -i

# Wróć do strony
npx wdio session frame top
```

Zobacz też: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Wyświetl lub przełącz konteksty native/webview. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session contexts [sub] [name]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | nie | switch |
| `name` | nie | Nazwa kontekstu |

**Przykłady**

```sh
# Wyświetl konteksty NATIVE_APP i WEBVIEW
npx wdio session contexts

# Steruj webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Zobacz też: [`snapshot`](#snapshot).

## `dialog`

Zaakceptuj, odrzuć lub zgłoś otwarte okno dialogowe. Dotyczy: web, natywne aplikacje mobilne.

Otwarty alert, confirm lub prompt blokuje inne akcje, które kończą się błędem ze wskazówką, aby uruchomić to polecenie.

```sh
npx wdio session dialog <sub>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | accept \| dismiss \| status |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--text <value>` | Tekst odpowiedzi na prompt (tylko accept) |

**Przykłady**

```sh
# Pokaż otwarte okno dialogowe
npx wdio session dialog status

# Potwierdź
npx wdio session dialog accept

# Odpowiedz na prompt
npx wdio session dialog accept --text "Ada"
```

Zobacz też: [`click`](#click).

## `app`

Uruchom, zakończ, zainstaluj lub odpytaj aplikację. Dotyczy: natywne aplikacje mobilne, natywne aplikacje desktopowe.

```sh
npx wdio session app <sub> <id>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | launch \| terminate \| install \| state |
| `id` | tak | Id aplikacji, bundle id lub plik |

**Przykłady**

```sh
# Uruchom ponownie aplikację
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Czy działa?
npx wdio session app state com.example.shop
```

Zobacz też: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Otwórz deep link. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session deeplink <url>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `url` | tak | URL |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--package <value>` | Pakiet Android lub bundle id iOS |

**Przykłady**

```sh
# Otwórz ekran produktu
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Zobacz też: [`app`](#app).

## `rotate`

Obróć urządzenie. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session rotate <orientation>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `orientation` | tak | portrait \| landscape |

**Przykłady**

```sh
# Obróć urządzenie poziomo
npx wdio session rotate landscape
```

## `keyboard`

Ukryj klawiaturę ekranową. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session keyboard <sub>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | hide |

**Przykłady**

```sh
# Odsłoń elementy pod klawiaturą
npx wdio session keyboard hide
```

## `background`

Przenieś aplikację w tło. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session background <seconds>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `seconds` | tak | Sekundy (-1 pozostawia ją w tle) |

**Przykłady**

```sh
# Przenieś aplikację w tło na 3 sekundy
npx wdio session background 3
```

Zobacz też: [`app`](#app).

## `lock`

Zablokuj urządzenie. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session lock
```

**Przykłady**

```sh
# Zablokuj ekran
npx wdio session lock
```

Zobacz też: [`unlock`](#unlock).

## `unlock`

Odblokuj urządzenie. Dotyczy: natywne aplikacje mobilne.

```sh
npx wdio session unlock
```

**Przykłady**

```sh
# Odblokuj ekran
npx wdio session unlock
```

Zobacz też: [`lock`](#lock).

## `geolocation`

Ustaw geolokalizację. Dotyczy: web, natywne aplikacje mobilne.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `lat` | tak | Szerokość geograficzna |
| `lon` | tak | Długość geograficzna |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--accuracy <n>` | Dokładność w metrach |

**Przykłady**

```sh
# Udawaj, że jesteś w Berlinie
npx wdio session geolocation 52.52 13.405
```

Zobacz też: [`emulate`](#emulate).

## `emulate`

Emuluj urządzenie, viewport, sieć, CPU, zegar lub zakres emulacji BiDi. Dotyczy: web.

Emulacja obowiązuje do `emulate reset` lub do końca sesji; ponowne ustawienie tego samego rodzaju emulacji ją zastępuje. `emulate device` bez wartości wyświetla nazwy urządzeń. Presety sieci i dławienie CPU wymagają przeglądarki opartej na Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | nie | Wartość emulacji |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--dpr <n>` | Współczynnik pikseli urządzenia (viewport) |
| `--tick <n>` | Przesuń emulowany zegar o podaną liczbę ms (clock) |

**Przykłady**

```sh
# Emuluj telefon
npx wdio session emulate device "iPhone 15"

# Ustaw viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Przejdź w tryb offline
npx wdio session emulate network offline

# Tryb ciemny
npx wdio session emulate color-scheme dark

# Zamroź datę
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Ogranicz animacje
npx wdio session emulate media prefersReducedMotion=reduce

# Cofnij wszystkie emulacje
npx wdio session emulate reset
```

Zobacz też: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Wyświetl przechwycone żądania sieciowe (BiDi). Dotyczy: web.

```sh
npx wdio session requests
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--filter <value>` | Podciąg lub glob |
| `--failed` | Tylko nieudane żądania |
| `--since <value>` | Tylko żądania nowsze niż podany czas |
| `--limit <n>` | Maksymalna liczba linii (domyślnie 50) |

**Przykłady**

```sh
# Tylko wywołania API
npx wdio session requests --filter "**/api/**"

# Żądania, które zepsuło kliknięcie
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Zobacz też: [`mock`](#mock), [`logs`](#logs).

## `mock`

Mockuj odpowiedzi dla wzorca URL (BiDi). Dotyczy: web.

Wypisuje id mocka (m1, m2, …). Ponowne mockowanie tego samego wzorca zastępuje wcześniejszy mock.

```sh
npx wdio session mock <pattern>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `pattern` | tak | Wzorzec URL |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--status <n>` | Kod statusu |
| `--body <value>` | Treść jako JSON/tekst lub ścieżka do pliku |
| `--header <value>` | Nagłówek k:v (można powtarzać) |
| `--abort` | Przerwij pasujące żądania |
| `--method <value>` | Tylko ta metoda |
| `--once` | Tylko następne żądanie |

**Przykłady**

```sh
# Zwróć stały JSON
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Spraw, by następne żądanie się nie powiodło
npx wdio session mock "**/api/cart" --status 500 --once

# Zablokuj obrazy
npx wdio session mock "**/*.png" --abort
```

Zobacz też: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Usuń mocki. Dotyczy: web.

```sh
npx wdio session unmock [pattern]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `pattern` | nie | Wzorzec lub id mocka |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--all` | Usuń wszystkie mocki |

**Przykłady**

```sh
# Usuń jeden mock
npx wdio session unmock m1

# Usuń wszystkie mocki
npx wdio session unmock --all
```

Zobacz też: [`mock`](#mock).

## `cookies`

Pobierz, ustaw lub wyczyść ciasteczka. Dotyczy: web.

Bez podpolecenia wypisuje każde ciasteczko jako name=value. `clear` bez nazwy usuwa wszystkie ciasteczka.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | nie | get \| set \| clear |
| `name` | nie | Nazwa ciasteczka |
| `value` | nie | Wartość ciasteczka |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--domain <value>` | Domena ciasteczka (set) |
| `--path <value>` | Ścieżka ciasteczka (set) |
| `--http-only` | Ciasteczko HttpOnly (set) |
| `--secure` | Ciasteczko Secure (set) |
| `--same-site <value>` | lax, strict, none lub default (set) |
| `--expiry <n>` | Wygaśnięcie jako znacznik czasu Unix w sekundach (set) |

**Przykłady**

```sh
# Wyświetl ciasteczka
npx wdio session cookies

# Wartość jednego ciasteczka
npx wdio session cookies get session

# Ustaw ciasteczko i przeładuj
npx wdio session cookies set session abc && npx wdio session reload

# Usuń wszystkie ciasteczka
npx wdio session cookies clear
```

Zobacz też: [`storage`](#storage), [`state`](#state).

## `storage`

Pobierz, ustaw lub wyczyść localStorage (lub sessionStorage). Dotyczy: web.

Bez podpolecenia wypisuje każdy wpis. `clear` bez klucza opróżnia magazyn.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | nie | get \| set \| clear |
| `key` | nie | Klucz |
| `value` | nie | Wartość |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--session-storage` | Użyj sessionStorage |

**Przykłady**

```sh
# Wyświetl localStorage
npx wdio session storage

# Ustaw klucz
npx wdio session storage set token abc

# Opróżnij sessionStorage
npx wdio session storage clear --session-storage
```

Zobacz też: [`cookies`](#cookies), [`state`](#state).

## `state`

Zapisz lub wczytaj ciasteczka i storage. Dotyczy: web.

`save` zapisuje ciasteczka, localStorage i sessionStorage bieżącego originu do pliku JSON. `load` otwiera ten origin i je przywraca, np. aby pominąć logowanie.

```sh
npx wdio session state <sub> <file>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | save \| load |
| `file` | tak | Plik stanu |

**Przykłady**

```sh
# Zapisz stan zalogowania
npx wdio session state save .wdio/logged-in.json

# Zacznij jako zalogowany
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Zobacz też: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Wizualne snapshoty przez @wdio/visual-service. Dotyczy: web, natywne aplikacje mobilne, natywne aplikacje desktopowe.

`save` zapisuje bazę w .wdio/visual/baseline, `check` porównuje z nią i wypisuje niezgodność, `accept` zamienia ostatni rzeczywisty obraz w bazę, `list` pokazuje tagi. Wymaga @wdio/visual-service w projekcie.

```sh
npx wdio session visual <sub> [tag]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | save \| check \| accept \| list |
| `tag` | nie | Tag obrazu |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--element <value>` | Tylko ten element |
| `--full` | Cała strona |
| `--tabbable` | Strona z elementami osiągalnymi klawiszem Tab |
| `--threshold <n>` | Dopuszczalna niezgodność w procentach (domyślnie 0) |
| `--all` | accept: wszystkie tagi |

**Przykłady**

```sh
# Zapisz bazę
npx wdio session visual save cart

# Porównaj z nią
npx wdio session visual check cart --threshold 0.5

# Zaakceptuj zamierzoną zmianę
npx wdio session visual accept cart
```

Zobacz też: [`screenshot`](#screenshot).

## `trace`

Nagrywaj każdy krok ze zrzutami ekranu i snapshotami.

`stop` wypisuje katalog trace i transkrypcję kroków.

```sh
npx wdio session trace <sub>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | start \| stop |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--screenshots` | Zrzut ekranu po każdym kroku (użyj --no-screenshots, aby pominąć) |
| `--snapshots` | Snapshot po każdym kroku (użyj --no-snapshots, aby pominąć) |

**Przykłady**

```sh
# Rozpocznij śledzenie
npx wdio session trace start

# Zatrzymaj i wypisz transkrypcję
npx wdio session trace stop
```

Zobacz też: [`record`](#record), [`history`](#history).

## `record`

Nagraj wideo. Dotyczy: web, natywne aplikacje mobilne.

```sh
npx wdio session record <sub>
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `sub` | tak | start \| stop |

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--fps <n>` | Klatki na sekundę (domyślnie 5) |
| `--path <value>` | Plik wyjściowy |

**Przykłady**

```sh
# Rozpocznij nagrywanie
npx wdio session record start

# Zatrzymaj i zapisz wideo
npx wdio session record stop --path checkout.mp4
```

Zobacz też: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Wypisz zapisane kroki.

Każda akcja, która zmienia stronę, zapisuje uruchomiony kod WebdriverIO. `export` zamienia tę historię w spec.

```sh
npx wdio session history
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--clear` | Wyczyść historię |

**Przykłady**

```sh
# Pokaż dotychczasowe kroki
npx wdio session history

# Rozpocznij nagrywanie od nowa przed krokami, które chcesz zachować
npx wdio session history --clear
```

Zobacz też: [`export`](#export), [`exec`](#exec).

## `export`

Wygeneruj spec z historii.

Zapisuje spec describe/it z zapisanymi krokami. Refy stają się stabilnymi selektorami, a helpery własnymi poleceniami. Bez --out plik trafia do katalogu artefaktów. Uruchom go przez `wdio run`, aby potwierdzić, że przechodzi.

```sh
npx wdio session export
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--out <value>` | Plik wyjściowy |
| `--title <value>` | Tytuł zestawu testów |
| `--page-objects` | Wygeneruj page objecty |
| `--framework <mocha\|jasmine>` | Framework (domyślnie mocha) |

**Przykłady**

```sh
# Zapisz spec
npx wdio session export --out test/specs/cart.e2e.ts

# Zapisz spec i uruchom go
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Zobacz też: [`history`](#history), [`helpers`](#helpers).

## `resume`

Kontynuuj test wstrzymany przez wdio run --debug=agent.

`wdio run --debug=agent` wstrzymuje nieudany test i udostępnia go jako sesję debug-`<worker>`. Zbadaj go dowolną akcją, a następnie wznów. `close` na tej sesji zamiast tego oznacza test jako nieudany.

```sh
npx wdio session resume
```

**Przykłady**

```sh
# Obejrzyj wstrzymany test, a następnie pozwól mu kontynuować
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Zobacz też: [`close`](#close), [`list`](#list).

## `doctor`

Sprawdź swoje środowisko.

Wypisuje jedną linię na sprawdzenie, z poprawką dla każdego niepowodzenia. Kończy się kodem 1, gdy któreś sprawdzenie się nie powiedzie.

```sh
npx wdio session doctor [target]
```

**Argumenty**

| Nazwa | Wymagany | Opis |
| --- | --- | --- |
| `target` | nie | Sprawdź tylko to, czego potrzebuje ten cel |

**Przykłady**

```sh
# Sprawdź wszystko
npx wdio session doctor

# Sprawdź, czego potrzebuje sesja Android
npx wdio session doctor android
```

Zobacz też: [`open`](#open).

## `skill`

Wypisz skill agenta.

```sh
npx wdio session skill
```

**Flagi**

| Flaga | Opis |
| --- | --- |
| `--install <value>` | Zapisz go do .agents/skills/wdio-session/SKILL.md (lub do tego katalogu) |

**Przykłady**

```sh
# Wypisz skill
npx wdio session skill

# Dodaj go do tego projektu
npx wdio session skill --install .
```