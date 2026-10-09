---
id: export
title: Eksportowanie sesji jako testu
description: Zamień kroki wykonane w wdio session na specyfikację, obiekty stron i niestandardowe polecenia.
---

`export` tworzy specyfikację z zarejestrowanych kroków. Refy są zastępowane stabilnymi selektorami. W przypadku strony internetowej używany jest pierwszy z poniższych, który pasuje do dokładnie jednego elementu: test id (`data-testid`, `data-test`, `data-qa`), [selektor roli](/docs/selectors#role-selector), taki jak `role/button[name="Add to cart"]`, nazwa dostępna (`aria/Add to cart`), id, tekst przycisku lub linku, nazwa pola formularza, a na końcu ścieżka CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` wyświetla kroki przed eksportem. `history clear` je usuwa.

## Obiekty stron

`--page-objects` zapisuje obiekt strony obok specyfikacji. Selektory są grupowane według ścieżki, na której zostały wykonane. Dosłowne `$('…')` w zarejestrowanym kroku staje się getterem. `$$`, ciągi znaków, które przypadkiem zawierają `$('…')`, oraz dynamiczne `$(selector)` pozostają bez zmian.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

Polecenie odmawia nadpisania obiektu strony, który już znajduje się w katalogu wyjściowym. Najpierw zmień `--out` lub usuń ten plik. Sam plik specyfikacji jest zapisywany ponownie.

`import` na początku kroku `exec` jest przenoszony na początek specyfikacji, poza funkcję testową.

## Funkcje pomocnicze

Dodaj plik w `.wdio/helpers/`, gdy krok jest zbyt długi dla `exec`. Każdy plik eksportuje domyślnie funkcję, która otrzymuje przeglądarkę i rejestruje polecenia za pomocą `addCommand`. Importy względne pozostają względne wobec tego pliku. Importy samych nazw pakietów są rozwiązywane z poziomu projektu.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Funkcje pomocnicze są ładowane przy otwarciu sesji oraz ponownie za pomocą `npx wdio session helpers --reload`. Jeśli `.wdio/helpers` jeszcze nie istnieje, sesja oczekuje na jego pojawienie się. Funkcje pomocnicze stają się niestandardowymi poleceniami w wyeksportowanym teście.

## Następne kroki

- [Uruchamianie kodu](/docs/session/exec) — kroki, które rejestruje `export`
- [Polecenia](/docs/session-commands) — flagi `export`, `history` i `helpers`