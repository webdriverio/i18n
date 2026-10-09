---
id: why-webdriverio
title: Dlaczego WebdriverIO?
description: Co wyróżnia WebdriverIO na tle innych narzędzi do automatyzacji testów - jedno API dla każdej platformy, standardy webowe, otwarte zarządzanie i pierwszorzędne wsparcie dla agentów kodujących.
---

WebdriverIO to open source'owy framework do automatyzacji testów dla Node.js. Za pomocą jednego test runnera i jednego API możesz automatyzować przeglądarki internetowe, natywne i hybrydowe aplikacje mobilne, aplikacje desktopowe oraz rozszerzenia edytorów, a do tego dodać testy wizualne, testy dostępności i testy komponentów. Projekt jest prowadzony przez społeczność pod egidą [OpenJS Foundation](https://openjsf.org/).

## Jeden framework dla każdej platformy

Większość zespołów dostarcza coś więcej niż tylko stronę internetową. WebdriverIO pozwala przetestować to wszystko przy użyciu tych samych selektorów, asercji, reporterów i konfiguracji CI:

| Platforma | Jak WebdriverIO ją automatyzuje | Zacznij tutaj |
| --- | --- | --- |
| Przeglądarki internetowe | WebDriver i WebDriver BiDi w Chrome, Firefox, Safari i Edge | [Web Browsers](/docs/platforms/web) |
| Komponenty webowe | Testy komponentów w prawdziwej przeglądarce dla React, Vue, Svelte, Solid, Preact, Lit i Stencil | [Component Testing](/docs/component-testing) |
| Aplikacje mobilne | Aplikacje natywne, hybrydowe i mobilne strony WWW na iOS i Android przez Appium, w tym Flutter | [Mobile Apps](/docs/platforms/mobile) |
| Aplikacje desktopowe | Aplikacje Electron, Tauri i Dioxus na macOS, Windows i Linux, natywne aplikacje macOS przez Appium | [Desktop Apps](/docs/platforms/desktop) |
| Edytory i rozszerzenia | Rozszerzenia VS Code i rozszerzenia przeglądarek | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| Regresje wizualne | Porównania ekranu, elementów i całych stron dla web i mobile | [Visual Testing](/docs/visual-testing) |

Ten sam test może nawet sterować kilkoma z nich jednocześnie, np. aplikacją mobilną i webowym dashboardem w jednym scenariuszu, dzięki [multi-remote](/docs/multiremote).

## Zbudowany na standardach webowych

WebdriverIO automatyzuje przeglądarki za pomocą [WebDriver](https://w3c.github.io/webdriver/) i [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) - standardów W3C, które implementuje i [testuje](https://wpt.fyi/results/webdriver/tests) każdy producent przeglądarek. Twoje testy działają na tych samych wersjach przeglądarek, których używają Twoi użytkownicy, a interakcje takie jak kliknięcia i naciśnięcia klawiszy są wysyłane przez samą przeglądarkę, zamiast być emulowane za pomocą JavaScriptu. WebDriver BiDi dodaje mockowanie sieci, zdarzenia konsoli i logów oraz wiele więcej we wszystkich przeglądarkach, nie tylko w Chromium.

Gdy potrzebujesz możliwości specyficznych dla danej przeglądarki, WebdriverIO daje Ci dostęp do Chrome DevTools Protocol poprzez [Puppeteer](/docs/api/browser/getPuppeteer). Przeczytaj więcej w [Automation Protocols](/docs/automationProtocols).

## Rozwijany przez społeczność i otwarcie zarządzany

WebdriverIO nie jest produktem dostawcy narzędzi testowych. Projekt:

- jest własnością [OpenJS Foundation](https://openjsf.org/), neutralnej wobec dostawców organizacji non-profit, co prawnie zobowiązuje go do służenia interesom wszystkich użytkowników
- stosuje publiczny [model zarządzania](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md): każdy może wnieść swój wkład, a committerzy i Technical Steering Committee wywodzą się ze społeczności
- nie ma płatnych planów ani funkcji zablokowanych za paywallem; każda funkcja jest darmowa i możesz uruchamiać testy wszędzie, lokalnie lub u dowolnego dostawcy chmury
- przekazuje środki ze sponsoringu z powrotem osobom, które go tworzą, poprzez [program stypendialny dla kontrybutorów](/blog/2024/02/15/new-contributor-stipend-program)
- oferuje darmowe wsparcie społeczności na [Discordzie](https://discord.webdriver.io) i w [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Gotowy na agentów kodujących

Dokumentacja, narzędzia i artefakty testów zostały zaprojektowane tak, aby agenci kodujący mogli samodzielnie pracować z WebdriverIO:

- **Dokumentacja gotowa dla agentów**: każda strona jest dostępna w formacie Markdown, dostępny jest wyselekcjonowany plik [`llms.txt`](https://webdriver.io/llms.txt) oraz serwer MCP dokumentacji pod adresem `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: serwer [`@wdio/mcp`](/docs/mcp) pozwala agentowi sterować przeglądarkami i aplikacjami mobilnymi, aby eksplorować Twój interfejs użytkownika i weryfikować selektory.
- **Trace'y**: [tryb trace DevTools](/docs/devtools/wdio/trace-mode) zapisuje transkrypcję w Markdown, zrzuty ekranu i snapshoty dostępności dla każdego nieudanego testu.

Zobacz [WebdriverIO for Coding Agents](/docs/ai-agents), aby dowiedzieć się, jak to skonfigurować.

## Wszystko w zestawie, łatwy do rozszerzenia

- [Test runner](/docs/testrunner) ze wsparciem dla Mocha, Jasmine i Cucumber, równoległym wykonywaniem, [shardingiem](/docs/sharding), [ponawianiem](/docs/retry) i [trybem watch](/docs/watcher)
- [Automatyczne oczekiwanie](/docs/autowait) przy każdej interakcji i wbudowana [biblioteka asercji](/docs/assertion)
- [Mockowanie sieci](/docs/mocksandspies), [emulacja](/docs/emulation) i [testy snapshotów](/docs/snapshot)
- [Dashboard do debugowania i przeglądarka trace'ów](/docs/devtools)
- [Ponad 70 serwisów i reporterów](/docs/ecosystem) dla chmur, frameworków i CI, a także proste API do pisania własnych [komend](/docs/customcommands), [serwisów](/docs/customservices) i [reporterów](/docs/customreporter)

## Kiedy wybrać coś innego

WebdriverIO dobrze się sprawdza, gdy testujesz więcej niż jedną platformę, chcesz uruchamiać testy na prawdziwych przeglądarkach i urządzeniach lub cenisz niezależne narzędzie należące do społeczności. Jeśli testujesz wyłącznie jedną aplikację webową w jednej przeglądarce i nie potrzebujesz urządzeń mobilnych, desktopowych ani chmurowych, narzędzie przeznaczone tylko dla przeglądarek może wydawać się lżejsze na start. Jeśli nie masz pewności, [utwórz projekt](/docs/gettingstarted) za pomocą `npm init wdio@latest` i wypróbuj go: konfiguracja zajmuje około minuty.

## Kolejne kroki

- [Getting Started](/docs/gettingstarted) - utwórz projekt i uruchom swój pierwszy test
- [Setup Types](/docs/setuptypes) - test runner lub tryb standalone
- [WebdriverIO for Coding Agents](/docs/ai-agents) - skonfiguruj swojego agenta