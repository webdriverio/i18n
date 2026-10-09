---
id: session
title: wdio session
description: Steruj przeglądarką, aplikacją mobilną lub aplikacją desktopową z poziomu powłoki za pomocą krótkich poleceń wdio session, a następnie wyeksportuj kroki jako test.
---

`wdio session` utrzymuje jedną sesję WebdriverIO przy życiu przez wiele krótkich poleceń powłoki. Używaj go do eksplorowania interfejsu użytkownika, sprawdzania zmian i przekształcania kroków, które zadziałały, w test. Jest częścią `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

Sesja nosi nazwę `default`. Przekazuj `-s <name>` tylko wtedy, gdy potrzebujesz dwóch sesji jednocześnie. Strona [targets](/docs/session/targets) steruje jedną aplikacją testową Expo (guinea pig) w widocznym oknie Chrome oraz w oknie Electron, w obu przypadkach w rozmiarze desktopowym. Polecenia dla Androida i iOS dla tej samej aplikacji znajdują się na tej stronie.

## Instalacja

`wdio session` jest częścią WebdriverIO CLI. `npx wdio` instaluje pakiet bez zakresu [`wdio`](https://www.npmjs.com/package/wdio) i uruchamia to CLI. Nie instalujesz `@wdio/session` samodzielnie.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` wypisuje przepływ pracy, akcje pogrupowane według kategorii, flagi globalne i kody wyjścia. `<action> --help` wypisuje argumenty, flagi, platformy, przykłady i powiązane akcje danej akcji. Ten sam tekst znajduje się na stronie [commands](/docs/session-commands). Skill agenta zawiera tylko podstawową pętlę i odsyła agentów do `--help` po resztę, dzięki czemu nie dezaktualizuje się, gdy CLI się zmienia.

Utwórz szkielet projektu za pomocą:

```sh
npm init wdio@latest
```

Zaakceptuj „Set up coding agent support”, aby zapisać `.agents/skills/wdio-session/SKILL.md`, sekcję w `AGENTS.md` oraz wpis `.wdio/session/` w gitignore. Skill możesz zainstalować później za pomocą:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` sprawdza Node.js, przeglądarkę, Appium, SDK i dane uwierzytelniające chmury. `doctor <target>` sprawdza tylko to, czego potrzebuje dany cel. Proces kończy się kodem 1, gdy któreś sprawdzenie się nie powiedzie.

## Otwórz stronę i wykonuj na niej akcje

Otwórz Chrome w trybie headless (dodaj `--headed`, aby pokazać okno). `open` wypisuje interaktywne elementy strony:

```sh
npx wdio session open chrome http://localhost:3000
```

Element wygląda tak: `button "Add to cart" [ref=e3]`. Użyj tej referencji (ref). Każda akcja raportuje, co zmieniła na stronie, wraz z referencjami nowych elementów, więc rzadko potrzebujesz osobnego `snapshot`:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` i `open safari` przyjmują ten sam URL. Chrome, Firefox i Edge są pobierane przy pierwszym użyciu, jeśli nie są zainstalowane. Safari wymaga macOS.

### Android

Android i iOS działają przez Appium 3. `doctor android` zgłasza brakujący serwer lub sterownik wraz z poleceniem instalacji.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Natywny desktop: `open macos --bundle-id com.example.shop` oraz `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` i `open dioxus ./my-app` wymagają swojego sterownika w `PATH`. Na Linuksie bez `DISPLAY` lub `WAYLAND_DISPLAY` zainstaluj Xvfb lub weston.

## Obserwacja i referencje

| Polecenie | Do czego służy |
| --- | --- |
| `snapshot --interactive` | Elementy, na których możesz wykonywać akcje, każdy z referencją |
| `snapshot --compact` | To samo drzewo bez nienazwanych pustych elementów opakowujących |
| `snapshot --urls` | Adresy linków przy każdym linku |
| `find "Add to cart"` | Wiersz ze świeżego snapshotu |
| `diff` | Co się zmieniło od poprzedniego snapshotu |
| `screenshot` | Układ strony. Pomiń, gdy snapshot odpowiada na pytanie |
| `pdf` | PDF bieżącej strony (`pdf report.pdf`). Sesje BiDi drukują w trybie headed i headless |
| `source` | HTML strony lub natywny XML |

Referencje pochodzą z najnowszego snapshotu. Po nawigacji wykonaj snapshot ponownie. Stara referencja kończy się błędem `REF_STALE`. Nieznana referencja kończy się błędem `REF_NOT_FOUND`.

## `exec`

`exec` uruchamia kod WebdriverIO. Zawsze używaj `await` przy poleceniach. `$` zwraca jeden element i rzuca wyjątek, gdy go brakuje. Nie ma trybu synchronicznego ani `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Umieszczaj asercje w `exec` z użyciem `expect-webdriverio`. Użyj `visual check <tag>` (wymaga `@wdio/visual-service`), gdy pytanie dotyczy tego, jak wygląda ekran.

## Eksport

`export` zapisuje specyfikację na podstawie zarejestrowanych kroków. Referencje są zastępowane stabilnymi selektorami.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` i `open safari` przyjmują ten sam URL. Inne cele, snapshoty, `exec`, eksport i wstrzymane uruchomienie testu są opisane na osobnych stronach w tej sekcji.

## Ta sekcja

| Strona | Do czego służy |
| --- | --- |
| [Targets](/docs/session/targets) | Przeglądarki, Android, iOS, desktop, Electron, Tauri, Dioxus i urządzenia w chmurze, w tym aplikacja demonstracyjna w Chrome, Androidzie i Electronie |
| [Snapshots and refs](/docs/session/snapshots) | Co jest na ekranie i referencje, które klikasz |
| [Run code](/docs/session/exec) | `exec`, asercje i kontrole wizualne |
| [Export a test](/docs/session/export) | Specyfikacje, page objects i `.wdio/helpers` |
| [Debug a test](/docs/session/debug) | `wdio run --debug=agent` i `wdio repl --session` |
| [Commands](/docs/session-commands) | Każda akcja i flaga |

## Rozwiązywanie problemów

| Komunikat | Co zrobić |
| --- | --- |
| `SESSION_EXISTS` | Sesja o tej nazwie już działa. Użyj `-s` z inną nazwą lub `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Uruchom ponownie `snapshot` i użyj referencji z tego wyniku. |
| `NOT_EDITABLE` | Cel `fill` nie jest polem edytowalnym i nie zawiera pojedynczego pola edytowalnego wewnątrz (ani za `aria-controls`/`aria-owns`/etykietą). Uruchom `snapshot --scope <target>` i wypełnij referencję pola. |
| `MISSING_DEPENDENCY` | Zainstaluj pakiet wymieniony w błędzie lub uruchom `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Uruchom wiersz `npx appium driver install …` z komunikatu błędu. |
| `MISSING_CREDENTIALS` | Wyeksportuj wymienione zmienne. Doctor nigdy nie wypisuje ich wartości. |
| `Session closed from wdio session` | Sesja debugowania została zamknięta. Wznów zamiast zamykać, jeśli test ma być kontynuowany. |

Kody wyjścia: 0 sukces, 1 akcja się nie powiodła, 2 nieprawidłowe użycie, 3 brakująca zależność lub dane uwierzytelniające, 4 brak sesji o tej nazwie.

## Następne kroki

- [Targets](/docs/session/targets) — otwórz przeglądarkę, aplikację na Androida lub iOS albo okno Electron
- [WebdriverIO for Coding Agents](/docs/ai-agents) — skill, dokumentacja i reguły projektu
- [wdio session commands](/docs/session-commands) — każda akcja i flaga