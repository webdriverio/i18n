---
id: preserve-and-rerun
title: Preserve & Rerun (porównanie)
description: "Zapisz migawkę nieudanego uruchomienia i uruchom test ponownie jednym kliknięciem dzięki Preserve & Rerun, a następnie porównaj oba uruchomienia, aby znaleźć to, co się zmieniło."
---

Gdy test kończy się niepowodzeniem, typowa pętla debugowania wygląda tak: uruchom go ponownie, a następnie porównaj dwie ściany logów, aby ustalić, co się zmieniło. Preserve & Rerun sprowadza to do jednego kliknięcia. Funkcja ta **zapisuje migawkę nieudanego uruchomienia i ponownie wykonuje test w jednej akcji**, a następnie wyświetla oba uruchomienia obok siebie w widoku **Compare**, wyrównane polecenie po poleceniu - dzięki czemu możesz dokładnie zobaczyć, w którym miejscu się rozeszły, bez ponownego czytania czegokolwiek.

To najszybszy sposób na zdiagnozowanie niestabilnego testu: polecenie, które zachowało się inaczej w udanym i nieudanym uruchomieniu, zostaje dla Ciebie podświetlone wraz z asercją, która zawiodła.

Dostępne we wszystkich trzech adapterach - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** oraz **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Jak to działa

1. Uruchom testy jak zwykle. Gdy test zakończy się w stanie **failed**, najedź kursorem na jego wiersz na pasku bocznym.
2. Obok zwykłego przycisku ponownego uruchomienia ▶ pojawi się ikona bug-play (🐞▶). Jest widoczna tylko w wierszach nieudanych testów/zestawów, wszędzie tam, gdzie zwykłe ponowne uruchomienie jest już obsługiwane (np. scenariusze Cucumber w wierszu scenariusza, testy Mocha/Jasmine w wierszu testu lub zestawu).
3. Kliknij ją. DevTools zapisuje migawkę nieudanego uruchomienia, a następnie ponownie uruchamia tylko ten test.
4. Otwiera się karta **Compare** z oboma uruchomieniami wyrównanymi według poleceń. Punkt rozbieżności oraz błąd asercji (**Expected vs Received**) są wyraźnie wskazane.

## Kluczowe funkcje

- **Migawka + ponowne uruchomienie jednym kliknięciem** - Zachowaj nieudane uruchomienie i wykonaj je ponownie w jednej akcji, bez zmian w kodzie i bez restartu całego zestawu.
- **Wyrównanie polecenie po poleceniu** - Oba uruchomienia są wyświetlane obok siebie i wyrównane według poleceń, dzięki czemu różnice są od razu widoczne.
- **Podświetlony punkt niepowodzenia** - Przenosi Cię bezpośrednio do polecenia, w którym oba uruchomienia się rozeszły.
- **Różnice w asercjach** - Pokazuje asercję, która zawiodła, z wartościami Expected i Received obok siebie.
- **Okno wyskakujące** - Otwórz porównanie w osobnym, ostylowanym oknie, aby uzyskać bardziej przestronny widok.
- **Analiza niestabilnych testów** - Zobacz, które polecenie różniło się między udanym a nieudanym uruchomieniem, bez ponownego czytania logów.

## Ograniczenia

- **Cucumber**: ponowne uruchamianie pojedynczych kroków jest wyłączone, ponieważ filtr `--name` w Cucumber dotyczy scenariuszy, a nie poszczególnych kroków Gherkin. Preserve & Rerun na poziomie scenariusza nadal działa.