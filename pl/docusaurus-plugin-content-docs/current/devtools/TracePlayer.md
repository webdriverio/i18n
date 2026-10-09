---
id: trace-player
title: Odtwarzacz śladów
description: "Otwieraj artefakty trybu śledzenia w odtwarzaczu show-trace, aby je odtwarzać i przeglądać offline, lub wczytuj je do innych przeglądarek śladów."
---

Odtwarzacz `show-trace` otwiera każdy ślad wygenerowany w [Trace Mode](/docs/devtools/wdio/trace-mode) bezpośrednio w interfejsie WebdriverIO DevTools — w dedykowanym trybie **odtwarzacza** tylko do odczytu, przeznaczonym do odtwarzania offline, przeglądania oraz porównywania (diffingu) przez agentów AI.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — natywny odtwarzacz

Otwórz ślad w interfejsie DevTools:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Plik wykonywalny `show-trace` jest dostarczany z każdym adapterem (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), więc jest dostępny w każdym projekcie, który instaluje którykolwiek z nich — bez dodatkowych zależności. Uruchamia ten sam interfejs DevTools w dedykowanym trybie **odtwarzacza** i otwiera go w przeglądarce:

- **Lista akcji** (po lewej) — przechwycone polecenia wraz z zakładką **Metadata** obok.
- **Panel przeglądarki** (pośrodku) — zrekonstruowana strona dla wybranej akcji (zobacz [podróż w czasie po DOM](#trace-player-features) poniżej). Gdy ślad zawiera filmstrip/wideo, przełącznik **Snapshot / Screencast** pozwala przejść do nagranego wideo.
- **Pasek osi czasu** (u góry) — filmstrip miniatur umieszczonych w ich rzeczywistych pozycjach czasowych oraz suwak z przeciąganym wskaźnikiem odtwarzania. Kliknij miniaturę lub przeciągnij w dowolnym miejscu, aby przewinąć.
- **Pasek sterowania** — odtwarzanie/pauza, krok oraz prędkość.
- **Zakładki doku** (u dołu) — **Source**, **Log**, **Console**, **Network**, **Errors** (każda z plakietką z liczbą elementów), a także dostępne tylko w odtwarzaczu zakładki **A11y** i **Transcript**. Kliknij wiersz w **Network**, aby zobaczyć szczegóły żądania (nagłówki, czasy, status).
- **Skróty klawiszowe** — `Space` odtwarzanie/pauza, `←`/`→` przechodzenie między akcjami, `Home`/`End` skok do pierwszej/ostatniej, `,`/`.` zmiana prędkości, `/` fokus na filtrze, `?` wyświetlenie wszystkich skrótów.

> Akceptuje wyłącznie pliki `.zip`. Te same skróty działają w panelu na żywo (`←`/`→` poruszanie się po liście poleceń, `?` wyświetla pomoc).

### Funkcje odtwarzacza śladów

Poza statycznym przechodzeniem klatka po klatce odtwarzacz rekonstruuje przebieg i powiązuje jego elementy:

- **Podróż w czasie po DOM** — panel przeglądarki odtwarza przechwycony strumień mutacji DOM (oraz stan pól formularzy — `value` pól input, `checked` pól wyboru, w tym pola wyczyszczone z powrotem do pustych), aby odbudować *rzeczywisty* DOM w momencie wybranej akcji, a nie tylko zrzut ekranu. Punkty bez przechwyconej klatki (asercje, statyczne oczekiwania) nadal pokazują prawdziwy stan strony.
- **Zakładka A11y + nakładka elementów („pick locator”)** — zakładka **A11y** pokazuje drzewo dostępności (role + nazwy dostępne) przechwycone dla wybranego polecenia. Włącz nakładkę elementów w ramce przeglądarki, aby obrysować każdy element, z którym test wchodził w interakcję; **najedź** na ramkę, aby podświetlić odpowiadający jej wiersz w drzewie A11y, **kliknij**, aby skopiować odporny lokalizator. Powiązanie działa w obie strony — najechanie na wiersz drzewa podświetla element w migawce.
- **Zakładka Transcript + Copy-for-LLM** — zakładka **Transcript** renderuje plik `transcript.md` przebiegu (podsumowanie czytelne dla człowieka/LLM w kolejności wykonania). Jedno kliknięcie **Copy** łączy transkrypcję z błędami nieudanych poleceń w gotowy do wklejenia kontekst dla LLM.
- **Znaczniki wejścia na osi czasu** — każda akcja jest oznaczona na suwaku według rodzaju: akcje klawiatury jako zielony pasek, akcje wskaźnika (które mają punkt trafienia) jako niebieska kropka, pozostałe jako zwykły znacznik — dzięki temu od razu widać rytm interakcji.
- **Zagnieżdżanie Cucumber** — przebiegi Cucumber są zagnieżdżane w drzewie akcji jako Feature → Scenario → Step, więc kroki znajdują się pod swoim scenariuszem i funkcjonalnością.
- **Gęste przewijanie filmstripu** — przy włączonej opcji [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) oś czasu zawiera gęste klatki, co zapewnia płynne przewijanie zamiast skoków o jedną klatkę na akcję.

## Inne przeglądarki śladów

Ponieważ artefakt korzysta z przenośnego, standardowego formatu dyskowego przeglądarek śladów, ten sam plik `.zip` (lub katalog) można również otworzyć w kompatybilnych **samodzielnych przeglądarkach śladów**, a — dzięki wspólnemu formatowi — także we **wbudowanej przeglądarce śladów raportu Allure** (Allure ≥ 2.35). Wyświetlają one:
- Oś czasu akcji wraz z czasami
- Zrzuty ekranu dla poszczególnych akcji
- Migawki elementów
- Wykres kaskadowy sieci
- Zdarzenia konsoli

Na potrzeby LLM / agentów czytaj bezpośrednio plik `transcript.md` — to zwięzła reprezentacja akcji w Markdown wraz z selektorami i wartościami.

Potok śladów (mapowanie akcji, serializatory migawek, zapis NDJSON, zapis zip / katalogu) jest współdzielony między adapterami za pośrednictwem [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), więc struktura artefaktu jest identyczna niezależnie od tego, który adapter go wygenerował — zobacz [Cross-Framework Support](/docs/devtools/cross-framework).