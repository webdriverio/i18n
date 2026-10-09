---
id: targets
title: Cele sesji
description: Otwórz przeglądarkę, aplikację mobilną, aplikację desktopową, aplikację Electron lub urządzenie w chmurze za pomocą wdio session.
---

`wdio session open` uruchamia sesję. Pierwszym argumentem jest cel. Korzystaj ponownie z sesji `default`. Przekazuj `-s <name>` tylko wtedy, gdy potrzebujesz dwóch sesji jednocześnie. Uruchom najpierw `npx wdio session doctor <target>`, gdy cel wymaga Appium, sterownika desktopowego lub danych uwierzytelniających do chmury.

Odtwarzacze Chrome, Android i Electron sterują tą samą [aplikacją demonstracyjną WebdriverIO](https://github.com/webdriverio/native-demo-app) (aplikacją testową Expo, tag `v2.2.0`). Chrome i Electron korzystają z lokalnego serwera webowego Expo w zwykłym oknie desktopowym. Android instaluje [apk z wydania v2.2.0](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk) (`com.wdiodemoapp`). iOS instaluje aplikację symulatora v2.2.0 (`org.wdiodemoapp`) i używa `touchId`. Każdy odtwarzacz wpisuje polecenie, a następnie okno pokazuje wynik. Zatrzymaj odtwarzanie lub przejdź do poprzedniego albo następnego polecenia, aby przeczytać linię, która zmieniła okno.

Wspólna ścieżka wygląda następująco: otwórz aplikację, zaloguj się jako `alice@webdriver.io` / `supersecret`, dotrzyj do logo robota („You found me!!!”), a następnie ułóż 9-elementową układankę. Chrome i Electron dodatkowo ustawiają lokalizację i nocny zegar w widoku Weather, otwierają wbudowany w aplikację WebView strony głównej WebdriverIO i przeciągają karuzelę. Odtwarzacz Android przewija natywny ekran swipe do tego robota. `export` zapisuje specyfikację Mocha sesji, którą właśnie sterowałeś.

<a id="postcard"></a>

## Przeglądarki

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session open firefox http://localhost:3000
npx wdio session open edge http://localhost:3000
npx wdio session open safari http://localhost:3000
```

Chrome otwiera się w trybie headless. Dodaj `--headed`, aby wyświetlić okno. Chrome, Firefox i Edge są pobierane przy pierwszym użyciu, jeśli nie są zainstalowane. Safari wymaga systemu macOS.

### User agent w trybie headless

Chrome i Edge w trybie headless identyfikują się w user agencie jako `HeadlessChrome/<version>`. Widoczne okno tej samej przeglądarki wysyła `Chrome/<version>`. Wiele witryn odrzuca żądania z tokenem headless: Akamai odpowiada „Access Denied”, a Cloudflare wyświetla „Just a moment...”. Decydują na podstawie żądania, zanim uruchomi się jakikolwiek skrypt strony. Agent zobaczyłby wtedy stronę blokady, której osoba otwierająca tę samą witrynę nigdy nie dostaje.

Dlatego sesja Chrome lub Edge w trybie headless wysyła taki user agent, jaki wysłałoby widoczne okno tej samej przeglądarki. Zmienia to tylko token. Nie ukrywa automatyzacji:

- `navigator.webdriver` pozostaje `true`.
- Własne znaczniki chromedrivera nadal są na stronie.
- Witryny, które sprawdzają automatyzację, nadal ją widzą.

Gdy user agent jest nadpisany, Chrome nie wysyła client hints user agenta, więc `navigator.userAgentData.brands` jest puste. Nadpisanie wymaga WebDriver BiDi, więc sesja otwarta z `--no-bidi` zachowuje user agenta headless.

Aby wysłać konkretny user agent, przekaż go jako argument przeglądarki. Sesja wtedy nie zmienia user agenta:

```sh
npx wdio session open chrome https://example.com --arg=--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/154.0.0.0 Safari/537.36"
```

Jeśli witryna nadal wyświetla weryfikację botów, spróbuj widocznego okna z `--headed`. Jeśli to również jest blokowane, witryna nie wpuszcza zautomatyzowanych przeglądarek. Zgłoś to, zamiast próbować obejść weryfikację.

Okno Chrome w trybie headed zachowuje pasek kart i pasek adresu — po tym odróżnisz je od okna Electron. `--viewport 1280x800` to zwykła strona przeglądarki. W wersji webowej aplikacja używa lewego paska bocznego. Logo WebdriverIO znajduje się na górze tego paska. Elementy to Home, Weather, Web, Login, Forms, Swipe, Drag, Perms i Data. Ekran główny wymienia przeglądarkę i desktop obok iOS i Androida.

Weather odczytuje `navigator.geolocation` i `Date`. `geolocation 35.6762 139.6503` to Tokio. Ustawienie obowiązuje przy następnym załadowaniu, więc uruchom `reload` przed `click "aria/Weather"`. Widżet pokazuje wtedy Tokio, 21° i deszcz. `emulate clock 2026-06-21T23:30:00Z` przełącza tę samą kartę z dziennego nieba na nocne i ustawia zegar na 11:30 PM. Drugie `emulate clock` zastępuje pierwsze.

Karta WebView ładuje `https://webdriver.io/` wewnątrz aplikacji. Logowanie czeka około 1,5 sekundy, a następnie otwiera okno dialogowe z tekstem `Success` i `You are logged in!`. Przycisk LOGIN pozostaje pomarańczową kontrolką 200×50, gdy to oczekiwanie jest widoczne na ekranie. `dialog accept` zamyka okno dialogowe. `swipe` działa tylko na urządzeniach mobilnych. Przeciągnij `[data-testid=Carousel]` na `aria/Next card` dwukrotnie, aby przewinąć karuzelę. Nagrana wersja webowa nasłuchuje `pointerup` na `document`, więc przeciąganie może zacząć się na karuzeli, a wskaźnik może zostać zwolniony na `Next card`, który znajduje się poza karuzelą. `scroll down --px 560` wyświetla robota WebdriverIO. Podpis pod nim brzmi „You found me!!!”. Elementy układanki to `aria/drag-l2` do `aria/drag-l3`, upuszczane na odpowiadający cel `aria/drop-…`. Kolejność na tacy to `l2`, `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1`, `l3`.

```sh
npx wdio session open chrome http://127.0.0.1:8081 --headed --viewport 1280x800
npx wdio session geolocation 35.6762 139.6503
npx wdio session reload
npx wdio session click "aria/Weather"
npx wdio session emulate clock 2026-06-21T23:30:00Z
npx wdio session click "aria/Webview"
npx wdio session click "aria/Login"
npx wdio session fill "aria/input-email" "alice@webdriver.io"
npx wdio session fill "aria/input-password" "supersecret"
npx wdio session click "aria/button-LOGIN"
npx wdio session dialog accept
npx wdio session click "aria/Swipe"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session scroll down --px 560
npx wdio session click "aria/Drag"
npx wdio session drag "aria/drag-l2" "aria/drop-l2"
```

Powtórz `drag` dla `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` i `l3`.

<SessionTarget id="browser" />

`--viewport 1280x720` ustawia rozmiar początkowy. `--arg` dodaje argument przeglądarki i może być powtarzany. `--profile <dir>` zachowuje profil między otwarciami.

<a id="boarding-pass"></a>
<a id="on-your-laptop"></a>
<a id="on-a-phone"></a>

## Android i iOS

Android i iOS działają przez Appium 3. `doctor android` zgłasza brakujący serwer lub sterownik wraz z poleceniem instalacji.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Zainstalowany pakiet Androida używa `--package` i `--activity`. Mobilny web używa `--browser chrome` lub `--browser safari` zamiast aplikacji. `--appium-url http://127.0.0.1:4723/` podłącza się do już działającego serwera. Adres URL aplikacji w chmurze, taki jak `bs://…`, jest przekazywany jako `--app` i nie jest traktowany jako plik lokalny.

<a id="native-boarding-pass"></a>

### Natywna aplikacja demonstracyjna

Na emulatorze lub urządzeniu ta sama aplikacja testowa to apk v2.2.0:

```sh
curl -fsSL -o android.wdio.native.app.v2.2.0.apk \
    https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/android.wdio.native.app.v2.2.0.apk
adb install -r android.wdio.native.app.v2.2.0.apk
```

`open` czeka do ośmiu minut. UiAutomator2 instaluje serwer i uruchamia instrumentację, zanim aplikacja będzie gotowa do użycia, a to trwa dłużej niż uruchomienie przeglądarki. Pierwsze żądanie nie jest ponawiane: ponowienie uruchomiłoby drugą sesję Appium na tym samym urządzeniu, podczas gdy pierwsza wciąż się instaluje. `tap "~Login"`, `fill`, a następnie `tap "~button-LOGIN"` loguje przy użyciu tego samego adresu e-mail i hasła. Na niskim ekranie przycisk LOGIN znajduje się poniżej widocznego obszaru, więc przewiń `~Login-screen` przed tym dotknięciem. `dialog accept` zamyka alert o powodzeniu i musi zostać uruchomione, gdy ten alert jest już na ekranie. Tekst alertu to `Success` / `You are logged in!`.

Przycisk odcisku palca to `~button-biometric`. Pojawia się w formularzu logowania dopiero po zarejestrowaniu odcisku palca, więc ten odtwarzacz go nie dotyka. `exec -e "await browser.fingerPrint(1)"` odpowiada na monit systemowy (`fingerPrint` działa tylko na Androidzie; nie ma dla niego podpolecenia `wdio session`).

`tap "~Webview"` to wbudowany w aplikację WebView strony `https://webdriver.io/`. Na programowym emulatorze z jednym CPU renderer WebView kończy działanie z `SIGTRAP` w `libmonochrome` po etykiecie LOADING, a strona nigdy się nie rysuje. Odtwarzacz pomija tę kartę.

`tap "~Swipe"` otwiera karuzelę. `swipe left` jej nie przewija: karuzela to `react-native-reanimated-carousel`, a przesunięcie UIAutomator odbija z powrotem do pierwszej karty. To powtarzane `exec` z `mobile: swipeGesture` na widoku przewijania wyświetla robota i podpis „You found me!!!”. Pełnoekranowe `swipe up` od dolnej krawędzi otwiera zamiast tego interfejs zrzutów ekranu Androida. `drag "~drag-l2" "~drop-l2"` (i pozostałe osiem par, w kolejności na tacy) kończy układankę. Ostatnia klatka to złożony robot i kontrolka ponowienia.

`-s android` utrzymuje tę sesję obok sesji przeglądarki. Pomiń `-s android`, gdy jest to jedyna sesja. `open` używa pakietu i aktywności już zainstalowanych z apk, z `--no-reset`, aby zarejestrowany odcisk palca pozostał. `"~Login"` to etykieta dostępności karty. `wait` nie dotyczy sesji natywnej.

```sh
npx wdio session -s android open android --package com.wdiodemoapp --activity com.wdiodemoapp.MainActivity --no-reset
npx wdio session -s android tap "~Login"
npx wdio session -s android fill "~input-email" "alice@webdriver.io"
npx wdio session -s android fill "~input-password" "supersecret"
npx wdio session -s android exec -e 'await browser.execute("mobile: scrollGesture", { elementId: (await $("~Login-screen")).elementId, direction: "down", percent: 0.75 }); return "scrolled the login form"'
npx wdio session -s android tap "~button-LOGIN"
npx wdio session -s android dialog accept
npx wdio session -s android tap "~Swipe"
npx wdio session -s android exec -e 'for (let i = 0; i < 6; i++) { await browser.execute("mobile: swipeGesture", { left: 80, top: 180, width: 560, height: 320, direction: "up", percent: 0.95 }) } for (let i = 0; i < 4; i++) { await browser.execute("mobile: swipeGesture", { left: 40, top: 700, width: 640, height: 280, direction: "up", percent: 0.9 }) } return "revealed the robot"'
npx wdio session -s android tap "~Drag"
npx wdio session -s android drag "~drag-l2" "~drop-l2"
```

Powtórz `drag` dla `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` i `l3`.

<SessionTarget id="android" />

### Symulator iOS

Te same ekrany znajdują się w kompilacji v2.2.0 dla symulatora, [ios.simulator.wdio.native.app.v2.2.0.zip](https://github.com/webdriverio/native-demo-app/releases/download/v2.2.0/ios.simulator.wdio.native.app.v2.2.0.zip). Rozpakuj ją i zainstaluj `wdiodemoapp.app` na uruchomionym symulatorze (`xcrun simctl install booted`). Identyfikator pakietu to `org.wdiodemoapp`. Ten plik binarny to aplikacja dla iPhone Simulator (arm64, iOS 15.1 lub nowszy). Wymaga systemu macOS i Xcode. Na tej stronie nie ma odtwarzacza iOS.

Logowanie, przesuwanie i przeciąganie używają tych samych etykiet dostępności co Android. `swipe left` nie zostało uruchomione na symulatorze. Na apk dla Androida nie przewija ono tej karuzeli. Wywołanie biometryczne to `browser.touchId(true)`, a nie `fingerPrint`. `touchId` wymaga capability `appium:allowTouchIdEnroll` ustawionej na `true` (przekaż ją za pomocą `--capabilities`). Zarejestruj Touch ID na symulatorze przed otwarciem formularza logowania, w przeciwnym razie przycisk biometryczny pozostanie ukryty.

```sh
npx wdio session -s ios open ios --bundle-id org.wdiodemoapp --capabilities '{"appium:allowTouchIdEnroll":true}'
npx wdio session -s ios tap "~Webview"
npx wdio session -s ios tap "~Login"
npx wdio session -s ios fill "~input-email" "alice@webdriver.io"
npx wdio session -s ios fill "~input-password" "supersecret"
npx wdio session -s ios tap "~button-LOGIN"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~button-biometric"
npx wdio session -s ios exec -e "await browser.touchId(true)"
npx wdio session -s ios dialog accept
npx wdio session -s ios tap "~Swipe"
npx wdio session -s ios swipe left
npx wdio session -s ios swipe left
npx wdio session -s ios swipe up
npx wdio session -s ios tap "~Drag"
npx wdio session -s ios drag "~drag-l2" "~drop-l2"
```

Powtórz `drag` dla pozostałych ośmiu elementów, w tej samej kolejności na tacy co na Androidzie.

## Aplikacje desktopowe

```sh
npx wdio session open macos --bundle-id com.example.shop
npx wdio session open windows --app Root
```

`macos` wymaga systemu macOS. `windows` wymaga systemu Windows. `--app Root` podłącza się do pulpitu. Zainstalowaną aplikację Windows określa się przez jej identyfikator aplikacji, na przykład `--app Microsoft.WindowsCalculator`. Ścieżka lub `.exe` jest rozpoznawana jako plik.

<a id="launch-console"></a>

## Electron, Tauri i Dioxus

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` i `open dioxus ./my-app` wymagają, aby ich sterownik był w `PATH`, chyba że pakiet usługi sam uruchamia sesję. Na Linuksie bez `DISPLAY` lub `WAYLAND_DISPLAY` zainstaluj Xvfb lub weston. Electron pozostaje przy klasycznym protokole WebDriver. Przekaż `--app-arg`, aby przekazać flagę do aplikacji, w tym `--app-arg=--no-sandbox`, gdy wymaga tego środowisko. Wartość zaczynająca się od `-` musi używać `=`, ponieważ w przeciwnym razie ścisły parser traktuje ją jako osobną opcję.

Zainstaluj `electron` i `@wdio/electron-service` w katalogu, który otwierasz. `main.js` używa `import`, więc `package.json` tego katalogu potrzebuje `"type": "module"` (lub nazwij plik `main.mjs`). Dopasuj rozmiar okna do obszaru roboczego, aby na mniejszym ekranie pasek tytułu nie znalazł się poza ekranem:

```json
{ "type": "module" }
```

```js
import { app, BrowserWindow, screen } from 'electron'

app.whenReady().then(() => {
    const area = screen.getPrimaryDisplay().workArea
    const width = Math.min(1280, area.width)
    const height = Math.min(800, area.height)
    const win = new BrowserWindow({
        width,
        height,
        x: area.x + Math.max(0, Math.round((area.width - width) / 2)),
        y: area.y + Math.max(0, Math.round((area.height - height) / 2)),
        autoHideMenuBar: true,
        webPreferences: { contextIsolation: true, sandbox: true }
    })
    win.loadURL('http://127.0.0.1:8081/')
})
```

Poniższe polecenie open nie wyłącza sandboxa renderera. Dodaj `--app-arg=--no-sandbox` tylko wtedy, gdy środowisko nie może uruchomić Electrona z sandboxem, na przykład w niektórych kontenerach linuksowych. Odtwarzacz Electron ładuje ten sam adres URL Expo w oknie 1280×800 bez paska adresu. Logo, pasek boczny, karta pogody, karta logowania, karuzela i układanka są takie same jak w przeglądarce. `-s electron` to nazwa sesji używana obok demonstracji przeglądarkowej. Electron pozostaje przy klasycznym protokole, więc `geolocation` i `emulate clock` przechodzą przez Chromedriver zamiast BiDi. Polecenia są takie same jak w Chrome, łącznie z `reload` przed Weather, z wyjątkiem okna dialogowego o powodzeniu. Na Linuksie `dialog accept` akceptuje natywny alert, a dymek pozostaje narysowany. Ten dymek nie jest częścią strony, więc późniejsze kliknięcie nie może do niego dotrzeć. Nagranie zastępuje `window.alert` oknem dialogowym na stronie i uruchamia `click "aria/OK"`. Przycisk LOGIN pozostaje pomarańczową kontrolką 200×50 podczas oczekiwania. Karuzela, przewijanie i układanka używają tych samych poleceń co Chrome.

```sh
npx wdio session -s electron open electron ./main.js
npx wdio session -s electron geolocation 35.6762 139.6503
npx wdio session -s electron reload
npx wdio session -s electron click "aria/Weather"
npx wdio session -s electron emulate clock 2026-06-21T23:30:00Z
npx wdio session -s electron click "aria/Webview"
npx wdio session -s electron click "aria/Login"
npx wdio session -s electron fill "aria/input-email" "alice@webdriver.io"
npx wdio session -s electron fill "aria/input-password" "supersecret"
npx wdio session -s electron click "aria/button-LOGIN"
npx wdio session -s electron click "aria/OK"
npx wdio session -s electron click "aria/Swipe"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron drag "[data-testid=Carousel]" "aria/Next card"
npx wdio session -s electron scroll down --px 560
npx wdio session -s electron click "aria/Drag"
npx wdio session -s electron drag "aria/drag-l2" "aria/drop-l2"
```

Powtórz `drag` dla `r3`, `r1`, `c1`, `c3`, `r2`, `c2`, `l1` i `l3`.

<SessionTarget id="electron" />

## Urządzenia w chmurze

```sh
npx wdio session open chrome https://webdriver.io --provider browserstack
```

`--provider` to `browserstack`, `saucelabs`, `testingbot` lub `testmu`. Wyeksportuj nazwę użytkownika i klucz dostępu dostawcy. `doctor <provider>` sprawdza, czy są ustawione, i nie wyświetla ich wartości. `--tunnel` uruchamia tunel dostawcy, gdy testowana aplikacja znajduje się na twojej maszynie.

## Konfiguracja WebdriverIO

`open` może przyjąć plik konfiguracyjny i indeks capability zamiast nazwy celu:

```sh
npx wdio session open ./wdio.conf.ts 0
```

Konfiguracja TypeScript ładuje się za pomocą `tsx`, jeśli twój projekt go zawiera. `tsx` jest opcjonalny: bez niego konfiguracja ładuje się przez type stripping w Node lub jiti, a konfiguracja, której nie uda się załadować, zgłasza `MISSING_DEPENDENCY` z linią instalacji.

`--hostname`, `--port`, `--path` i `--protocol` kierują sesję do już działającego endpointu WebDriver. Zamknięcie sesji nie zatrzymuje tego endpointu.

## Rozwiązywanie problemów

| Komunikat | Co zrobić |
| --- | --- |
| `MISSING_DEPENDENCY` | Zainstaluj pakiet wymieniony w błędzie. `doctor <target>` wyświetla tę samą linię instalacji. Electron potrzebuje `@wdio/electron-service` i `electron` w katalogu, który otwierasz. |
| `MISSING_APPIUM_DRIVER` | Uruchom linię `npx appium driver install …` z błędu. |
| `MISSING_BINARY` | Umieść wskazany sterownik (`tauri-driver` lub `wdio-dioxus-driver`) w `PATH`. |
| `MISSING_CREDENTIALS` | Wyeksportuj zmienne wymienione w błędzie. |
| `NOT_SUPPORTED` | `macos` działa tylko na macOS, a `windows` tylko na Windows. `swipe` działa tylko na urządzeniach mobilnych. W Chrome i Electronie przeciągnij `[data-testid=Carousel]` na `aria/Next card`. |
| `No dialog open.` | Alert nie jest otwarty. Na Androidzie poczekaj, aż alert o powodzeniu będzie widoczny, przed `dialog accept`. W Electronie na Linuksie natywny dymek może pozostać narysowany po `acceptAlert` i nadal zgłaszać brak okna dialogowego. Odtwarzacz używa zamiast tego okna dialogowego na stronie i `click "aria/OK"`. |
| `The instrumentation process cannot be initialized` | UiAutomator2 nie zaczął nasłuchiwać na czas. Sesja daje 240 s na to uruchomienie, po maksymalnie 180 s na instalację serwera. Na programowym emulatorze jeden CPU i skórka 720×1280 pozwalają apk v2.2.0 dotrzeć do ekranu głównego. Obraz 1080×2400 z dwoma CPU powoduje ANR `system_server`, a serwer nigdy nie zaczyna nasłuchiwać. |
| `Request timed out! Consider increasing the "connectionRetryTimeout" option.` | Klient zrezygnował, gdy Appium wciąż tworzył sesję. Android i iOS czekają 480 s na to pierwsze żądanie i nie wysyłają go ponownie. |
| `"wait" is not supported for android (UiAutomator2) sessions.` | `wait` jest przeznaczone dla sesji przeglądarki. |
| `The fingerPrint command is only available for Android.` | `browser.fingerPrint` to wywołanie dla Androida. iOS używa `browser.touchId`. |
| `App not found:` | Przekaż istniejącą ścieżkę do apk lub użyj `--package` i `--activity` dla aplikacji, która jest już zainstalowana. |
| `Pass --package <id>.` | `deeplink` wymaga `--package` na Androidzie. |

## Następne kroki

- [Migawki i referencje](/docs/session/snapshots) — odczytaj ekran po `open`
- [Polecenia](/docs/session-commands) — wszystkie flagi `open`
- [wdio session](/docs/session) — domyślna pętla