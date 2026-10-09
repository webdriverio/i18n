---
id: ai-agents
title: WebdriverIO dla agentów kodujących
description: Skonfiguruj Cursor, Claude Code, Copilot lub dowolnego innego agenta kodującego, aby pisał, uruchamiał i debugował testy WebdriverIO z użyciem dokumentacji czytelnej maszynowo, serwera MCP WebdriverIO oraz śladów DevTools.
---

Większość testów WebdriverIO pisze się dziś wspólnie z agentem kodującym. Ta strona pokazuje, jak zapewnić agentowi trzy rzeczy, których potrzebuje, aby robić to dobrze: **aktualną dokumentację** (aby pisał kod dla v10 zamiast zgadywać), **sposób sterowania testowaną aplikacją** (aby mógł eksplorować interfejs i weryfikować selektory) oraz **przebiegi testów, które da się debugować** (aby mógł samodzielnie naprawiać nieudane testy).

## 1. Udostępnij agentowi dokumentację

Każda strona tej witryny jest dostępna jako czysty Markdown, bez nawigacji, skryptów i stylów:

| Zasób | URL | Zastosowanie |
| --- | --- | --- |
| Indeks dokumentacji | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Wyselekcjonowana mapa wszystkich stron z jednozdaniowymi podsumowaniami. Zacznij tutaj. |
| Pełna dokumentacja | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | Cała dokumentacja w jednym pliku, dla agentów z dużym oknem kontekstu. |
| Dowolna pojedyncza strona | Dodaj `.md` do adresu URL, np. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Wczytanie dokładnie tej strony, której agent potrzebuje. |
| Negocjacja treści | Wyślij żądanie do dowolnego adresu `/docs/*` z nagłówkiem `Accept: text/markdown` | Agenci i narzędzia, które pobierają adresy URL bez zmian. |

Każda strona dokumentacji ma również menu **Copy page** z opcjami skopiowania strony jako Markdown lub otwarcia jej bezpośrednio w ChatGPT, Claude albo Cursor.

### Serwer MCP dokumentacji

Dokumentacja jest dostępna także jako zdalny serwer MCP pod adresem `https://webdriver.io/mcp`. Udostępnia agentowi trzy narzędzia: `search_docs` do znalezienia właściwej strony, `get_page` do odczytania jej jako Markdown oraz `list_sections` do wczytania całej sekcji naraz. Dodaj go obok serwera MCP WebdriverIO opisanego poniżej:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

W przypadku Claude Code uruchom `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Pozwól agentowi używać `wdio session`

[`wdio session`](/docs/session) utrzymuje sesję WebdriverIO pomiędzy poleceniami powłoki. Agent może otworzyć przeglądarkę, telefon lub aplikację desktopową, wykonać snapshot tego, co jest na ekranie, wykonywać akcje na refach i wyeksportować działające kroki jako test. To domyślny sposób sterowania aplikacją przez agenta kodującego. [Serwer MCP](/docs/mcp) opisany w następnej sekcji jest alternatywą, gdy agent powinien wywoływać narzędzia zamiast powłoki.

Zainstaluj skill w projekcie:

```sh
npx wdio session skill --install .
```

To polecenie tworzy plik `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` tworzy ten sam plik, gdy zaakceptujesz obsługę agentów kodujących, i dodaje poniższe reguły projektu.

Agent może sam utworzyć projekt. Kreator przyjmuje flagę dla każdego pytania, a `--yes` uzupełnia wartości domyślne dla pozostałych, więc nigdy nie czeka na dane wejściowe:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` wyświetla wszystkie flagi i ich wartości. Zobacz [Answer the wizard with flags](/docs/gettingstarted#answer-the-wizard-with-flags). Sekcja [WebdriverIO Session](/docs/session) omawia cele, snapshoty, `exec`, eksport i debugowanie. Dokumentacja poleceń: [wdio session commands](/docs/session-commands).

### Dodaj dokumentację do swojego agenta

Aby dokumentacja była dostępna w każdym czacie, dodaj indeks do swojego agenta:

- **Cursor**: dodaj `https://webdriver.io/llms.txt` jako niestandardową dokumentację w ustawieniach Cursora (_Indexing & Docs_), a następnie odwołuj się do niej w czacie za pomocą `@` i nadanej nazwy.
- **Claude Code / Codex / inni agenci CLI**: dodaj link do pliku `AGENTS.md` lub `CLAUDE.md` swojego projektu (zobacz [reguły projektu](#3-add-project-rules) poniżej). Agenci pobierają potrzebne strony na żądanie.

## 2. Pozwól agentowi sterować przeglądarką lub aplikacją

[Serwer MCP WebdriverIO](/docs/mcp) (`@wdio/mcp`) pozwala agentowi otwierać przeglądarki (Chrome, Firefox, Edge, Safari), natywne i hybrydowe aplikacje mobilne (przez Appium) oraz urządzenia w chmurze, przeglądać drzewo dostępności, klikać, wpisywać tekst i robić zrzuty ekranu. Agenci używają go do eksplorowania strony przed napisaniem testu, znajdowania solidnych selektorów oraz odtwarzania błędu krok po kroku.

Dodaj go do konfiguracji swojego klienta MCP (na przykład `.mcp.json` lub `.cursor/mcp.json` w projekcie):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

W przypadku Claude Code zarejestruj go z wiersza poleceń:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Zobacz [konfigurację MCP](/docs/mcp/configuration), aby poznać opcje sesji, oraz [Cloud Providers](/docs/mcp/cloud-providers), aby uruchamiać testy w BrowserStack, Sauce Labs, TestMu AI lub TestingBot.

## 3. Dodaj reguły projektu

Agenci znacznie rzetelniej przestrzegają konwencji projektu, gdy są one spisane. Dodaj sekcję podobną do poniższej do pliku `AGENTS.md` (lub `CLAUDE.md`, `.cursor/rules`) swojego projektu testowego i dostosuj ścieżki oraz polecenia:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

Powyższe reguły odzwierciedlają zalecenia z [Best Practices](/docs/bestpractices), [Selectors](/docs/selectors) i [Auto-waiting](/docs/autowait).

## 4. Pozwól agentowi debugować nieudane testy

Usługa [WebdriverIO DevTools](/docs/devtools) może rejestrować **ślad** (trace) każdego przebiegu: przenośny artefakt zawierający transkrypcję krok po kroku w formacie Markdown, zrzuty ekranu, snapshoty drzewa dostępności oraz logi sieciowe dla każdej akcji. Dzięki temu agent otrzymuje te same informacje, które człowiek uzyskuje, obserwując test, bez potrzeby otwierania okna przeglądarki.

Zainstaluj usługę i włącz tryb śladu:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // jeden ślad na test ułatwia przekazanie agentowi pojedynczego błędu
            traceGranularity: 'test',
            // zwykłe pliki zamiast archiwum zip, aby agenci mogli je czytać bezpośrednio
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Po przebiegu ślady są zapisywane w `test-results/`. Wskaż agentowi folder nieudanego testu i poproś, aby najpierw przeczytał `transcript.md`. Zobacz [Trace Mode](/docs/devtools/wdio/trace-mode), aby poznać wszystkie opcje, w tym szczegółowość i retencję.

## Zalecany przepływ pracy

1. Poproś agenta, aby za pomocą serwera MCP zbadał testowaną funkcjonalność i zaproponował selektory.
2. Pozwól mu napisać spec i page object zgodnie z regułami projektu, pobierając w razie potrzeby strony dokumentacji WebdriverIO.
3. Niech uruchomi pojedynczy spec z `--spec` i iteruje, aż test przejdzie.
4. Jeśli test nie przejdzie w CI, przekaż agentowi ślad tego testu i pozwól mu naprawić test lub zgłosić błąd.

## Następne kroki

- [Getting Started](/docs/gettingstarted) - utwórz projekt za pomocą `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - wszystkie narzędzia udostępniane przez serwer MCP
- [DevTools](/docs/devtools) - tryb na żywo i tryb śladu
- [Best Practices](/docs/bestpractices) - jak wyglądają dobre testy WebdriverIO
- [From v9 to v10](/docs/v10-migration#migrate-with-a-coding-agent) - skill migracyjny dla istniejącego zestawu testów