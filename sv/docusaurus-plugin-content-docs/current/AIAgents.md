---
id: ai-agents
title: WebdriverIO för kodagenter
description: Konfigurera Cursor, Claude Code, Copilot eller någon annan kodagent för att skriva, köra och felsöka WebdriverIO-tester med hjälp av den maskinläsbara dokumentationen, WebdriverIO MCP-servern och DevTools-spår.
---

De flesta WebdriverIO-tester skrivs i dag tillsammans med en kodagent. Den här sidan visar hur du ger en agent de tre saker den behöver för att göra det bra: **aktuell dokumentation** (så att den skriver v10-kod i stället för att gissa), **ett sätt att styra appen som testas** (så att den kan utforska gränssnittet och verifiera selektorer) och **felsökningsbara testkörningar** (så att den kan åtgärda misslyckade tester på egen hand).

## 1. Ge din agent dokumentationen

Varje sida på den här webbplatsen finns tillgänglig som ren Markdown, utan navigering, skript eller formatering:

| Resurs | URL | Använd den för |
| --- | --- | --- |
| Dokumentationsindex | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | En kurerad karta över alla sidor med sammanfattningar på en rad. Börja här. |
| Fullständig dokumentation | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | Hela dokumentationen i en enda fil, för agenter med stora kontextfönster. |
| Valfri enskild sida | Lägg till `.md` i slutet av URL:en, t.ex. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Att läsa in exakt den sida agenten behöver. |
| Innehållsförhandling | Begär valfri `/docs/*`-URL med `Accept: text/markdown` | Agenter och verktyg som hämtar URL:er som de är. |

Varje dokumentationssida har också en **Kopiera sida**-meny med alternativ för att kopiera sidan som Markdown eller öppna den direkt i ChatGPT, Claude eller Cursor.

### MCP-server för dokumentationen

Dokumentationen finns också tillgänglig som en fjärransluten MCP-server på `https://webdriver.io/mcp`. Den ger en agent tre verktyg: `search_docs` för att hitta rätt sida, `get_page` för att läsa den som Markdown och `list_sections` för att läsa in ett helt avsnitt på en gång. Lägg till den bredvid WebdriverIO MCP-servern som beskrivs nedan:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

För Claude Code kör du `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Låt din agent använda `wdio session`

[`wdio session`](/docs/session) håller en WebdriverIO-session vid liv mellan skalkommandon. En agent kan öppna en webbläsare, telefon eller skrivbordsapp, ta en ögonblicksbild av det som visas på skärmen, agera på referenser och exportera de steg som fungerade som ett test. Det är standardsättet att styra en app från en kodagent. [MCP-servern](/docs/mcp) i nästa avsnitt är alternativet när agenten ska anropa verktyg i stället för skalet.

Installera färdigheten (skill) i projektet:

```sh
npx wdio session skill --install .
```

Det skriver `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` skriver samma fil när du accepterar stöd för kodagenter och lägger till projektreglerna nedan.

En agent kan skapa projektet själv. Guiden tar en flagga för varje fråga, och `--yes` fyller i standardvärdena för resten, så den väntar aldrig på inmatning:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` listar alla flaggor och deras värden. Se [Answer the wizard with flags](/docs/gettingstarted#answer-the-wizard-with-flags). Avsnittet [WebdriverIO Session](/docs/session) täcker mål, ögonblicksbilder, `exec`, export och felsökning. Kommandoreferens: [wdio session commands](/docs/session-commands).

### Lägg till dokumentationen i din agent

För att göra dokumentationen tillgänglig i varje chatt lägger du till indexet i din agent:

- **Cursor**: lägg till `https://webdriver.io/llms.txt` som en anpassad dokumentation i Cursor-inställningarna (_Indexing & Docs_) och referera sedan till den i chatten med `@` och namnet du gav den.
- **Claude Code / Codex / andra CLI-agenter**: lägg till länken i projektets `AGENTS.md` eller `CLAUDE.md` (se [projektregler](#3-add-project-rules) nedan). Agenterna hämtar de sidor de behöver vid behov.

## 2. Låt din agent styra webbläsaren eller appen

[WebdriverIO MCP-servern](/docs/mcp) (`@wdio/mcp`) låter en agent öppna webbläsare (Chrome, Firefox, Edge, Safari), native- och hybridmobilappar (via Appium) och molnenheter, inspektera tillgänglighetsträdet, klicka, skriva och ta skärmdumpar. Agenter använder den för att utforska en sida innan de skriver ett test, för att hitta robusta selektorer och för att återskapa ett fel steg för steg.

Lägg till den i konfigurationen för din MCP-klient (till exempel `.mcp.json` eller `.cursor/mcp.json` i ditt projekt):

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

För Claude Code registrerar du den från kommandoraden:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Se [MCP-konfigurationen](/docs/mcp/configuration) för sessionsalternativ och [Cloud Providers](/docs/mcp/cloud-providers) för att köra på BrowserStack, Sauce Labs, TestMu AI eller TestingBot.

## 3. Lägg till projektregler

Agenter följer ett projekts konventioner mycket mer tillförlitligt när de är nedskrivna. Lägg till ett avsnitt som följande i `AGENTS.md` (eller `CLAUDE.md`, `.cursor/rules`) i ditt testprojekt och justera sökvägarna och kommandona:

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

Reglerna ovan speglar rekommendationerna i [Best Practices](/docs/bestpractices), [Selectors](/docs/selectors) och [Auto-waiting](/docs/autowait).

## 4. Låt agenten felsöka misslyckade tester

Tjänsten [WebdriverIO DevTools](/docs/devtools) kan spela in ett **spår** (trace) av varje körning: en portabel artefakt med en steg-för-steg-transkription i Markdown, skärmdumpar, ögonblicksbilder av tillgänglighetsträdet och nätverksloggar för varje åtgärd. Det ger en agent samma information som en människa får genom att titta på testet, utan att behöva ett webbläsarfönster.

Installera tjänsten och aktivera spårläget:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // ett spår per test gör det enkelt att ge ett enskilt fel till en agent
            traceGranularity: 'test',
            // vanliga filer i stället för en zip, så att agenter kan läsa dem direkt
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Efter en körning skrivs spåren till `test-results/`. Peka din agent mot mappen för det misslyckade testet och be den att läsa `transcript.md` först. Se [Trace Mode](/docs/devtools/wdio/trace-mode) för alla alternativ, inklusive granularitet och lagringstid.

## Rekommenderat arbetsflöde

1. Be agenten att utforska funktionen som testas med MCP-servern och föreslå selektorer.
2. Låt den skriva specen och sidobjektet enligt dina projektregler och hämta sidor ur WebdriverIO-dokumentationen vid behov.
3. Låt den köra den enskilda specen med `--spec` och iterera tills den går igenom.
4. Om ett test misslyckas i CI ger du agenten spåret för det testet och låter den åtgärda testet eller rapportera buggen.

## Nästa steg

- [Getting Started](/docs/gettingstarted) - skapa ett projekt med `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - alla verktyg som MCP-servern tillhandahåller
- [DevTools](/docs/devtools) - liveläge och spårläge
- [Best Practices](/docs/bestpractices) - hur bra WebdriverIO-tester ser ut
- [From v9 to v10](/docs/v10-migration#migrate-with-a-coding-agent) - migreringsfärdigheten för en befintlig testsvit