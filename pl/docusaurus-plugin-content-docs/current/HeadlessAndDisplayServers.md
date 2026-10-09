---
id: headless-and-display-servers
title: Tryb headless i serwery wyświetlania
description: Uruchamiaj przeglądarki w trybie z interfejsem oraz aplikacje desktopowe w systemie Linux w CI i w kontenerach, korzystając z wirtualnego ekranu Weston lub Xvfb uruchamianego przez testrunner. Strona opisuje dostępne opcje, przepisy dla CI i rozwiązywanie problemów.
---

W systemie Linux, gdy żaden ekran nie jest dostępny, testrunner uruchamia na czas przebiegu wirtualny serwer wyświetlania: [Weston](https://gitlab.freedesktop.org/wayland/weston) w trybie headless lub, awaryjnie, [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). Ta strona opisuje, kiedy to następuje, jak to skonfigurować oraz jak to działa w CI i w Dockerze. W większości konfiguracji wystarczy mieć zainstalowany Weston lub Xvfb w obrazie albo ustawić `displayServerAutoInstall: true` w konfiguracji.

## Kiedy używać wirtualnego ekranu, a kiedy natywnego trybu headless

Wirtualny ekran zapewnia przeglądarkom i aplikacjom ekran tam, gdzie go nie ma, np. na runnerach CI i w kontenerach. Pozostaw go, gdy:

- Testujesz aplikacje desktopowe, które potrzebują prawdziwego okna.
- Twoje testy wymagają przeglądarki z interfejsem, na przykład aby zgadzały się z wzorcowymi zrzutami ekranu wykonanymi w widocznej przeglądarce.
- Chrome nie uruchamia się z błędem `DevToolsActivePort file doesn't exist` lub `user data directory is already in use`, jak opisano w sekcji [Rozwiązywanie problemów](#troubleshooting).

Dla testów przeglądarkowych, które nie potrzebują widocznego okna, natywny tryb headless, taki jak `--headless=new` w Chrome, ma mniejszy narzut. Ustaw wtedy `displayServerEnabled: false`, w przeciwnym razie testrunner i tak uruchomi serwer wyświetlania. Zrób to samo, gdy wszystkie przeglądarki działają w usłudze chmurowej lub na zdalnym gridzie, ponieważ lokalnie nic nie potrzebuje ekranu.

## Jak to działa

Testrunner uruchamia jeden serwer wyświetlania przed hookiem `onPrepare` jakiejkolwiek usługi i ustawia jego środowisko w `process.env`:

| Zmienna | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | nieustawiona |
| `DISPLAY` | nieustawiona | pierwszy wolny ekran, np. `:0` |
| `XDG_RUNTIME_DIR` | prywatny katalog w `/tmp` dla danego przebiegu | bez zmian |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Workery dziedziczą te zmienne, podobnie jak sterowniki i aplikacje uruchamiane przez usługi w `onPrepare`. Przeglądarki i biblioteki GUI wybierają na ich podstawie Wayland lub X11. W przypadku Westona prywatny `XDG_RUNTIME_DIR` zastępuje na czas przebiegu dowolną wcześniejszą wartość.

Serwer wyświetlania działa do zakończenia hooków `onComplete`, dzięki czemu usługi mogą z niego korzystać podczas sprzątania. Następnie testrunner go zatrzymuje i przywraca poprzednie wartości. Jeśli proces zakończy się wcześniej, również przez Ctrl+C, serwer wyświetlania zostaje zabity razem z nim.

Testrunner uruchamia serwer wyświetlania tylko wtedy, gdy spełnione są wszystkie poniższe warunki:

- Działa w systemie Linux.
- Ani `DISPLAY`, ani `WAYLAND_DISPLAY` nie są ustawione.
- `displayServerEnabled` nie ma wartości `false`.

Jeśli ekran już istnieje, testrunner go używa i niczego nie uruchamia. Gdy ustawiona jest tylko zmienna `WAYLAND_DISPLAY`, na przykład przez Westona uruchomionego w Twoim CI, testrunner i tak ustawia na czas przebiegu `XDG_SESSION_TYPE`, `GDK_BACKEND` i `ELECTRON_OZONE_PLATFORM_HINT` na `wayland`. Dzięki temu przeglądarki korzystają z właściwego ekranu, ponieważ nadpisywane są odziedziczone wartości, takie jak `XDG_SESSION_TYPE=tty` z logowania przez SSH, które kierowałyby je do X11, gdzie nie ma serwera. Dzieje się tak nawet przy `displayServerEnabled: false`, które steruje jedynie tym, czy serwer wyświetlania zostanie uruchomiony.

### Który serwer wyświetlania jest używany

Przy domyślnym `displayServer: 'auto'` testrunner najpierw próbuje Westona, a potem Xvfb. Zainstalowane serwery są sprawdzane, zanim cokolwiek zostanie zainstalowane, więc istniejący Xvfb zostanie użyty zamiast instalowania Westona. Jeśli Weston nie uruchomi się, testrunner przełącza się na Xvfb. Jeśli żaden serwer wyświetlania się nie uruchomi, testrunner zapisuje ostrzeżenie w logu, a przebieg kontynuowany jest bez niego. Przy `displayServer: 'wayland'` lub `displayServer: 'xvfb'` testrunner próbuje tylko wskazanego serwera.

Obsługiwany jest Weston 10 i nowszy. Ubuntu 22.04 i Debian 11 dostarczają Westona 9, a Enterprise Linux 9 z włączonym EPEL otrzymuje Westona 8, więc tam ustaw `displayServer: 'xvfb'`. Weston uruchamia się bez Xwayland, więc nie udostępnia `DISPLAY`. Jeśli Twoje testy lub narzędzia potrzebują X11, na przykład `xdotool`, `xclip` lub aplikacja Java, ustaw `displayServer: 'xvfb'`.

### Fokus okna

Wszystkie workery korzystają z tego samego ekranu. W WebdriverIO v9 każdy worker był opakowany w `xvfb-run` i otrzymywał własny ekran, więc jego przeglądarka zawsze miała fokus. Przeglądarki oparte na Chromium, takie jak Chrome i Edge, mogą teraz nie mieć fokusu: pod Westonem żadne okno nie otrzymuje fokusu, a pod Xvfb ma go tylko ostatnio otwarte okno. Wejście WebDriver nadal trafia do strony, ale `document.hasFocus()` zwraca `false`, zdarzenia `focus` nie są wywoływane, a style `:focus` nie są stosowane. Jeśli Twoje testy zależą od fokusu, włącz emulację fokusu — eksperymentalne polecenie Chrome DevTools Protocol (CDP), które utrzymuje się między przeładowaniami strony:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

Firefoxa to nie dotyczy, ponieważ pod WebDriverem traktuje swoje strony jako mające fokus.

### Samodzielne skrypty

Testrunner sam uruchamia serwer wyświetlania. Samodzielny skrypt wywołujący `remote()` może go uruchomić za pomocą `startDisplayDaemonFromConfig` z `@wdio/display-server`. Funkcja przyjmuje te same opcje `displayServer*`, ustawia zmienne ekranu w `process.env`, aby przeglądarka je odziedziczyła, i przywraca je przy `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null poza Linuksem, gdy ekran X11 już istnieje lub gdy żaden się nie uruchomi. Przy istniejącym
// ekranie Wayland zwraca uchwyt, którego stop() przywraca ustawione przez nią zmienne sesji.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Możesz też uruchomić skrypt pod `xvfb-run`, jak w sekcji [Korzystanie z istniejącego ekranu](#using-an-existing-display).

## Konfiguracja przeglądarek

### Przeglądarki uruchamiane przez WebdriverIO

Te przeglądarki nie wymagają konfiguracji:

- Chrome i Edge 140 i nowsze oraz Chrome for Testing 135 i nowszy stosują się do `XDG_SESSION_TYPE=wayland` ustawianego przez serwer wyświetlania.
- Starsze wersje Chrome i Edge ignorują `XDG_SESSION_TYPE`. Dla nich WebdriverIO dodaje `--ozone-platform=wayland` do argumentów każdego uruchamianego Chrome i Edge, gdy działa Wayland bez serwera X, chyba że argumenty już ustawiają `--ozone-platform` lub `--headless`.
- Aplikacje Electron: Electron 38 i nowszy stosuje się do `XDG_SESSION_TYPE`, a Electron od 28 do 37 do `ELECTRON_OZONE_PLATFORM_HINT`, którą serwer wyświetlania również ustawia. Electron 27 i starsze polegają na fladze `--ozone-platform=wayland`, którą WebdriverIO dodaje, gdy uruchamia aplikację przez Chromedriver.
- Firefox i aplikacje GTK, takie jak aplikacje Tauri, wybierają Wayland na podstawie `WAYLAND_DISPLAY` i `GDK_BACKEND`. Firefox w wersjach starszych niż 120 nie był testowany.

### Przeglądarki, których WebdriverIO nie uruchamia

Przeglądarki na gridzie lub w usłudze chmurowej nie wymagają konfiguracji, ponieważ działają na ekranie zdalnego hosta.

Lokalne przeglądarki uruchamiane przez coś innego, np. samodzielnie uruchomiony sterownik, serwer Appium lub własny launcher usługi, nie otrzymują flagi `--ozone-platform=wayland` od WebdriverIO. Chrome i Edge 140 i nowsze oraz Electron 28 i nowszy jej nie potrzebują, ponieważ stosują się do zmiennych sesji, ale starsze Chrome i Edge tak. Co zrobić, zależy od momentu uruchomienia przeglądarki:

- **W trakcie przebiegu**, na przykład z `onPrepare` usługi, nowsze przeglądarki nie potrzebują niczego, ponieważ dziedziczą ekran i zmienne sesji. Dla starszych Chrome i Edge:
  - ustaw `displayServer: 'xvfb'`, aby używać Xvfb, lub
  - ustaw `displayServer: 'wayland'` i dodaj `--ozone-platform=wayland` do ich argumentów, aby używać Westona.
- **Przed WebdriverIO**, na przykład we wcześniejszym kroku CI lub w innej powłoce, nie mogą korzystać z serwera wyświetlania uruchamianego przez WebdriverIO, ponieważ nie dziedziczą jego zmiennych. Uruchom ekran samodzielnie, jak w sekcji [Korzystanie z istniejącego ekranu](#using-an-existing-display), i:
  - użyj Xvfb, który nie wymaga niczego więcej, lub
  - użyj Westona, a następnie wyeksportuj `XDG_SESSION_TYPE=wayland` (Chrome i Edge 140 i nowsze, Electron 38 i nowszy) lub `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron od 28 do 37) i dodaj `--ozone-platform=wayland` do argumentów starszych Chrome i Edge.

## Konfiguracja

Wszystkie opcje są wymienione w [dokumentacji konfiguracji](/docs/configuration#displayserverenabled). Na przykład:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Zainstaluj serwer wyświetlania, jeśli żaden nie jest zainstalowany
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Zawsze używaj Xvfb w mniejszym rozmiarze, instalowanego własnym poleceniem zakładającym kontener z uprawnieniami root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

Własne polecenie jest wspólne dla obu serwerów. Przy `displayServer: 'auto'` uruchamia się najpierw dla Westona, a ponownie dla Xvfb tylko wtedy, gdy Weston nadal jest niedostępny lub nie uruchamia się, a Xvfb wciąż brakuje. Ustaw `displayServer` na serwer, który instaluje Twoje polecenie, tak jak w tym przykładzie.

Opcje `autoXvfb` i `xvfb*` z v9 są przestarzałe i zostaną usunięte w v11. Ich zamienniki znajdziesz w [przewodniku migracji do v10](/docs/v10-migration#virtual-displays-on-linux).

## CI i Docker

Zainstaluj wcześniej serwer wyświetlania w obrazie lub ustaw `displayServerAutoInstall: true`, aby zainstalować go przy starcie przebiegu.

### Wstępna instalacja serwera wyświetlania

#### Weston

W Ubuntu 24.04 lub Debianie 12 i nowszych:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

W RHEL 10 i Oracle Linux 10 włącz samodzielnie EPEL i CodeReady Builder zgodnie z [dokumentacją EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), a następnie zainstaluj `weston`.

Aby opakować testrunner we własnego Westona, jak w sekcji [Korzystanie z istniejącego ekranu](#using-an-existing-display), zainstaluj również `xwayland-run`. Jest on dostępny jako pakiet dla Debiana 13, Ubuntu 24.04, Fedory i openSUSE Tumbleweed. Bez niego musisz uruchomić Westona w tle z własnymi `XDG_RUNTIME_DIR` i `WAYLAND_DISPLAY` i poczekać na jego gniazdo przed uruchomieniem WebdriverIO. Alternatywnie użyj Xvfb.

#### Xvfb

W Ubuntu lub Debianie:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

Ubuntu 22.04 i Debian 11 dostarczają zbyt starą wersję Westona, więc tam użyj Xvfb. Gdy zainstalowany jest tylko Xvfb, testrunner używa go bez dodatkowej konfiguracji.

W przypadku innych dystrybucji użyj nazw pakietów z sekcji [Obsługa automatycznej instalacji](#automatic-installation-support).

### Korzystanie z istniejącego ekranu

Jeśli Twoje CI już zapewnia ekran, testrunner go używa i niczego nie uruchamia.

Aby użyć Westona, opakuj testrunner poleceniem `wlheadless-run` z pakietu `xwayland-run`. Zapewnia ono Westonowi prywatny katalog runtime i czeka na jego gniazdo, a flagi odpowiadają Westonowi uruchamianemu przez testrunner:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Aby użyć Xvfb, opakuj testrunner poleceniem `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Obsługa automatycznej instalacji

`displayServerAutoInstall` działa z poniższymi menedżerami pakietów. Instalacje są nieinteraktywne i kończą się przekroczeniem limitu czasu po 240 sekundach. W przypadku innych menedżerów pakietów zainstaluj serwer wyświetlania samodzielnie.

| Menedżer pakietów | Dystrybucje | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- W Arch Linux instalacja uruchamia `pacman -Syu`, czyli pełną aktualizację systemu, ponieważ Arch nie obsługuje częściowych aktualizacji. Na nieaktualnym obrazie może to przekroczyć limit 240 sekund, więc tam zainstaluj serwer wyświetlania wcześniej.
- Enterprise Linux 10 nie ma Xvfb, a Westona dostarcza tylko w EPEL, które wymaga CRB. W CentOS Stream, AlmaLinux i Rocky Linux instalacja włącza oba repozytoria i pozostawia je włączone. W RHEL i Oracle Linux skonfiguruj je samodzielnie, jak w sekcji [Wstępna instalacja serwera wyświetlania](#preinstalling-a-display-server).

## Logi

Serwer wyświetlania działa w procesie launchera, więc jego komunikaty znajdują się w logu launchera: `wdio.log` w Twoim `outputDir` lub w terminalu, jeśli `outputDir` nie jest ustawiony. Log pokazuje, który serwer wyświetlania został uruchomiony i jakie zmienne ustawił. Aby uzyskać więcej szczegółów, podnieś jego poziom logowania:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Rozwiązywanie problemów

### Chrome kończy działanie z błędem `DevToolsActivePort file doesn't exist`

Pełny komunikat to `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Częstą przyczyną jest Chrome w trybie z interfejsem bez ekranu, na którym mógłby otworzyć okno. Sprawdź w [logu launchera](#logs), który serwer wyświetlania został uruchomiony. Jeśli żaden, zobacz [Log launchera pokazuje `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Jeśli Twoje testy nie potrzebują widocznego okna, użyj zamiast tego natywnego trybu headless, jak w sekcji [Kiedy używać wirtualnego ekranu, a kiedy natywnego trybu headless](#when-to-use-a-virtual-display-vs-native-headless).

### Chrome kończy działanie z błędem `user data directory is already in use`

Pełny komunikat zaczyna się od `session not created: probably user data directory is already in use`. Często jest on mylący: zazwyczaj oznacza, że przeglądarka uległa awarii i uruchomiła się ponownie z katalogiem profilu poprzedniej instancji. Stabilny ekran często rozwiązuje ten problem. Jeśli nie, przekaż unikalny `--user-data-dir` dla każdego workera.

### Log launchera pokazuje `No display server could be started`

Pełny komunikat to `No display server could be started; continuing without a virtual display`. Żaden serwer wyświetlania nie jest zainstalowany lub żaden się nie uruchomił. Wcześniejsze komunikaty wyjaśniają przyczynę:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` lub `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: nic nie jest zainstalowane, a automatyczna instalacja jest wyłączona.
- `wayland failed to start: ...` lub `xvfb failed to start: ...`: dalej znajduje się wyjście błędów serwera.
- `Failed to install Weston` lub `Failed to install Xvfb`: instalacja nie powiodła się.
- `wayland still not found after installing` lub `xvfb still not found after installing`: instalacja się powiodła, ale nie dostarczyła danego serwera, na przykład dlatego, że własne polecenie `displayServerAutoInstallCommand` instaluje tylko ten drugi. Ustaw `displayServer` na serwer, który instaluje Twoje polecenie.

Zainstaluj Westona lub Xvfb w obrazie albo ustaw `displayServerAutoInstall: true`.

### Xvfb kończy działanie z błędem `Failed to find a socket to listen on`

Xvfb tworzy swoje gniazdo w `/tmp/.X11-unix`. Jeśli ten katalog istnieje, musi być zapisywalny przez użytkownika testów, co zapewniają uprawnienia `1777`.

### Chrome lub Electron kończy działanie pod Westonem z błędem `Missing X server or $DISPLAY`

Przeglądarka próbowała użyć X11 zamiast Waylanda. Jeśli nie uruchomiło jej WebdriverIO, zobacz [Przeglądarki, których WebdriverIO nie uruchamia](#browsers-webdriverio-doesnt-launch). W przeciwnym razie usuń `--ozone-platform=x11` z jej argumentów.

### Testy zależne od fokusu nie przechodzą w Chrome lub Edge

`document.hasFocus()` zwraca `false`, ponieważ strony na współdzielonym ekranie mogą nie mieć fokusu. Włącz emulację fokusu, jak w sekcji [Fokus okna](#window-focus).

### Narzędzie lub aplikacja X11 kończy działanie pod Westonem z błędem `cannot open display` lub `Can't open display`

Weston nie udostępnia `DISPLAY`. Ustaw `displayServer: 'xvfb'`, aby testrunner uruchomił zamiast niego Xvfb. Jeśli uruchomiłeś Westona samodzielnie, opakuj przebieg poleceniem `xvfb-run`, ponieważ testrunner korzysta z istniejącego ekranu, zamiast uruchamiać nowy.

## Kolejne kroki

- Dokumentacja [konfiguracji](/docs/configuration#displayserverenabled) z opisem każdej opcji `displayServer*`.
- [Przewodnik migracji do v10](/docs/v10-migration#virtual-displays-on-linux) z zamiennikami opcji `autoXvfb` i `xvfb*` z v9.
- [Docker](/docs/docker) i [GitHub Actions](/docs/githubactions), aby uruchamiać zestaw testów w CI.
- [Aplikacje desktopowe](/docs/platforms/desktop#linux) dla Electron, Tauri i Dioxus w systemie Linux.