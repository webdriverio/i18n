---
id: snapshots
title: Snapshoty i refy
description: Odczytaj stronę za pomocą wdio session snapshot, a następnie wykonuj akcje na wypisanych refach.
---

Zrób snapshot, zanim klikniesz. Snapshot to lista elementów, na których możesz wykonywać akcje. Każda interaktywna linia kończy się refem, takim jak `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Linia wygląda tak: `button "Add to cart" [ref=e3]`. Następne polecenie używa tego refa:

```sh
npx wdio session click e3
```

Refy pochodzą z najnowszego snapshotu. Po nawigacji zrób snapshot ponownie. Stary ref kończy się błędem `REF_STALE`. Nieznany ref kończy się błędem `REF_NOT_FOUND`.

:::caution Eksperymentalne

Układ tekstowy snapshotu oraz struktura, którą wypisuje dla niego `--json`, są eksperymentalne: wydanie minor może je zmienić, na przykład aby współdzielić jeden silnik snapshotów z [DevTools trace](/docs/devtools/wdio/trace-mode). Składnia refów (`e3`, `@e3`), akcje przyjmujące ref oraz kod, który rejestrują, pozostają stabilne. Pobieraj refy ze snapshotu i nie parsuj pozostałej części jego linii.

:::

## Co uruchomić

| Polecenie | Do czego służy |
| --- | --- |
| `snapshot --interactive` | Elementy, na których możesz wykonywać akcje, każdy z refem |
| `find "Add to cart"` | Każde dopasowanie wraz z otaczającym je węzłem, np. całym elementem listy, dzięki czemu wartość obok dopasowania również zostaje uwzględniona. `-A`, `-B` i `-C` wypisują zwykły kontekst linii, jak grep |
| `diff` | Co zmieniło się od poprzedniego snapshotu |
| `screenshot` | Układ strony. Pomiń go, gdy snapshot odpowiada na pytanie |
| `source` | HTML strony lub natywny XML |

`snapshot` bez `--interactive` obejmuje większą część drzewa. Wybieraj `--interactive`, gdy zamierzasz kliknąć lub wpisać tekst.

## Co zmieniła akcja

W sesji webowej `open` wypisuje interaktywny snapshot otwartej strony, a każda akcja, która może zmienić stronę (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …), raportuje, co się zmieniło:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Gdy akcja otworzyła kartę, raport o tym informuje (`Opened a new tab [1]: https://…`); sesja pozostaje na bieżącej karcie, dopóki nie uruchomisz `tabs switch`. Gdy zamiast witryny strona jest weryfikacją antybotową (Cloudflare, DataDome, Akamai, …), raport również o tym informuje, raz na stronę. Sesja nie próbuje jej obejść; w przeglądarce headless sugeruje ponowne otwarcie z `--headed`.

Na tej samej stronie otrzymujesz nowe lub zmienione linie wraz z ich refami, w tym tekst, który nie jest interaktywny, jak powyższy status. Po nawigacji otrzymujesz interaktywne elementy nowej strony, a w przypadku dużej strony jednoliniowe podsumowanie odsyłające do `find`. Dlatego rzadko potrzebujesz osobnego `snapshot` po akcji. Ustaw `WDIO_SESSION_CHANGES=0`, aby wyłączyć raport, a przekaż `open --no-snapshot`, aby pominąć snapshot po `open`.

## Ramki

W sesji WebDriver BiDi snapshot pokazuje zawartość iframe'ów strony, w tym tych z innych domen (cross-origin), pod iframe'em, w którym się znajdują:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Akcje na tych refach wchodzą do ramki, wykonują działanie i wracają do strony, a wypisany kod robi to samo. Wyświetlanych jest maksymalnie pięć iframe'ów, każdy przycięty do 300 elementów; `frame e4` i `snapshot` pokazują całą ramkę, która została przycięta. Iframe'y mniejsze niż 100 pikseli kwadratowych, takie jak piksele śledzące, są pomijane.

## Shadow DOM i klikalne elementy bez roli

Z WebDriver BiDi snapshot obejmuje także zamknięte shadow rooty, a elementy, które mają jedynie listener kliknięcia (ikona podpięta za pomocą `addEventListener`), otrzymują ref. Taki element nie ma nazwy dostępnej, więc snapshot zamiast tego go opisuje:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Na Androidzie, iOS, macOS i Windows snapshot pochodzi ze źródła strony Appium. Dwie kontrolki, które współdzielą accessibility id, pozostają osobnymi refami, gdy pozostałe części ich selektorów się różnią. `snapshot --scope e3` ogranicza drzewo do tego refa.

## Powtarzające się kontrolki

Gdy kilka kontrolek ma tę samą rolę i nazwę, jak przycisk "Add to cart" w każdym wierszu tabeli produktów, linia refa kończy się `∈ "<text>"`, czyli tekstem wiersza, karty lub elementu listy, który zawiera tę kontrolkę i żadnej innej o tej samej nazwie:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

Tekst jest przycinany do 80 znaków. Kontrolka, której elementem jest landmark strony (link "Sign in" zarówno w nagłówku, jak i w stopce), nie otrzymuje go. Etykieta widocznej kontrolki formularza nie jest wymieniana: nazwę niesie sama kontrolka.

## Natywne dotknięcia

Sesje webowe używają `click`. Sesje mobilne i natywne desktopowe używają `tap` na tym samym refie:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Rozwiązywanie problemów

| Komunikat | Co zrobić |
| --- | --- |
| `REF_STALE` | Element z ostatniego snapshotu zniknął. Uruchom `snapshot` i użyj nowego refa. |
| `REF_NOT_FOUND` | Tego id nigdy nie było w tej sesji. Ref w Twoim poleceniu nie pasuje do najnowszego snapshotu. |
| `NO_MATCH` | `find` nie znalazło tego tekstu. Zrób snapshot i odczytaj nazwy, które faktycznie tam są. |
| `NOT_EDITABLE` | Cel `fill` nie jest edytowalnym polem i nie zawiera w sobie pojedynczego edytowalnego pola (ani za `aria-controls`/`aria-owns`/etykietą). Uruchom `snapshot --scope <target>` i wypełnij ref pola. |

## Kolejne kroki

- [Uruchamianie kodu](/docs/session/exec) — asercje i kroki obejmujące więcej niż jedno polecenie
- [Polecenia](/docs/session-commands) — flagi `snapshot`, `find`, `diff`, `screenshot` i `source`