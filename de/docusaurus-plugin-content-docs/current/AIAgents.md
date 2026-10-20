---
id: ai-agents
title: WebdriverIO für Coding Agents
description: Richte Cursor, Claude Code, Copilot oder einen anderen Coding Agent so ein, dass er WebdriverIO-Tests mithilfe der maschinenlesbaren Dokumentation, des WebdriverIO MCP-Servers und von DevTools-Traces schreiben, ausführen und debuggen kann.
---

Die meisten WebdriverIO-Tests werden heute gemeinsam mit einem Coding Agent geschrieben. Diese Seite zeigt, wie du einem Agent die drei Dinge gibst, die er dafür braucht: **aktuelle Dokumentation** (damit er v10-Code schreibt, statt zu raten), **eine Möglichkeit, die zu testende App zu steuern** (damit er die UI erkunden und Selektoren überprüfen kann) und **debugbare Testläufe** (damit er fehlschlagende Tests selbstständig beheben kann).

## 1. Gib deinem Agent die Dokumentation

Jede Seite dieser Website ist als sauberes Markdown verfügbar, ohne Navigation, Skripte oder Styling:

| Ressource | URL | Verwendung |
| --- | --- | --- |
| Dokumentationsindex | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Eine kuratierte Übersicht aller Seiten mit einzeiligen Zusammenfassungen. Beginne hier. |
| Vollständige Dokumentation | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | Die komplette Dokumentation in einer einzigen Datei, für Agents mit großen Kontextfenstern. |
| Jede einzelne Seite | Hänge `.md` an die URL an, z. B. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Um genau die Seite zu laden, die der Agent benötigt. |
| Content Negotiation | Rufe eine beliebige `/docs/*`-URL mit `Accept: text/markdown` ab | Für Agents und Tools, die URLs unverändert abrufen. |

Jede Dokumentationsseite hat außerdem ein Menü **Copy page** mit Optionen, um die Seite als Markdown zu kopieren oder sie direkt in ChatGPT, Claude oder Cursor zu öffnen.

### Docs-MCP-Server

Die Dokumentation ist auch als Remote-MCP-Server unter `https://webdriver.io/mcp` verfügbar. Er stellt einem Agent drei Tools bereit: `search_docs`, um die richtige Seite zu finden, `get_page`, um sie als Markdown zu lesen, und `list_sections`, um einen ganzen Abschnitt auf einmal zu laden. Füge ihn neben dem unten beschriebenen WebdriverIO MCP-Server hinzu:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Für Claude Code führe `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp` aus.

## Lass deinen Agent `wdio session` verwenden

[`wdio session`](/docs/session) hält eine WebdriverIO-Session zwischen Shell-Befehlen am Leben. Ein Agent kann einen Browser, ein Smartphone oder eine Desktop-App öffnen, einen Snapshot dessen erstellen, was auf dem Bildschirm ist, auf Refs agieren und die erfolgreichen Schritte als Test exportieren. Das ist der Standardweg, um eine App von einem Coding Agent aus zu steuern. Der [MCP-Server](/docs/mcp) im nächsten Abschnitt ist die Alternative, wenn der Agent Tools statt der Shell aufrufen soll.

Installiere den Skill in das Projekt:

```sh
npx wdio session skill --install .
```

Dadurch wird `.agents/skills/wdio-session/SKILL.md` geschrieben. `npm init wdio` schreibt dieselbe Datei, wenn du die Unterstützung für Coding Agents akzeptierst, und fügt die unten beschriebenen Projektregeln hinzu.

Ein Agent kann das Projekt auch selbst erstellen. Der Assistent akzeptiert für jede Frage ein Flag, und `--yes` füllt für den Rest die Standardwerte aus, sodass er nie auf eine Eingabe wartet:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` listet alle Flags und ihre Werte auf. Siehe [Answer the wizard with flags](/docs/gettingstarted#answer-the-wizard-with-flags). Der Abschnitt [WebdriverIO Session](/docs/session) behandelt Targets, Snapshots, `exec`, Export und Debugging. Befehlsreferenz: [wdio session commands](/docs/session-commands).

### Füge die Dokumentation zu deinem Agent hinzu

Um die Dokumentation in jedem Chat verfügbar zu machen, füge den Index zu deinem Agent hinzu:

- **Cursor**: Füge `https://webdriver.io/llms.txt` als benutzerdefinierte Dokumentation in den Cursor-Einstellungen hinzu (_Indexing & Docs_) und referenziere sie dann im Chat mit `@` und dem Namen, den du ihr gegeben hast.
- **Claude Code / Codex / andere CLI-Agents**: Füge den Link zur `AGENTS.md` oder `CLAUDE.md` deines Projekts hinzu (siehe [Projektregeln](#3-add-project-rules) unten). Die Agents rufen die benötigten Seiten bei Bedarf ab.

## 2. Lass deinen Agent den Browser oder die App steuern

Der [WebdriverIO MCP-Server](/docs/mcp) (`@wdio/mcp`) ermöglicht es einem Agent, Browser (Chrome, Firefox, Edge, Safari), native und hybride mobile Apps (über Appium) sowie Cloud-Geräte zu öffnen, den Accessibility Tree zu inspizieren, zu klicken, zu tippen und Screenshots zu erstellen. Agents nutzen ihn, um eine Seite zu erkunden, bevor sie einen Test schreiben, um robuste Selektoren zu finden und um einen Fehler Schritt für Schritt zu reproduzieren.

Füge ihn zur Konfiguration deines MCP-Clients hinzu (zum Beispiel `.mcp.json` oder `.cursor/mcp.json` in deinem Projekt):

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

Für Claude Code registriere ihn über die Kommandozeile:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Siehe die [MCP-Konfiguration](/docs/mcp/configuration) für Session-Optionen und [Cloud Providers](/docs/mcp/cloud-providers), um auf BrowserStack, Sauce Labs, TestMu AI oder TestingBot auszuführen.

## 3. Füge Projektregeln hinzu

Agents halten sich deutlich zuverlässiger an die Konventionen eines Projekts, wenn diese schriftlich festgehalten sind. Füge einen Abschnitt wie den folgenden zur `AGENTS.md` (oder `CLAUDE.md`, `.cursor/rules`) deines Testprojekts hinzu und passe die Pfade und Befehle an:

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

Die obigen Regeln spiegeln die Empfehlungen aus [Best Practices](/docs/bestpractices), [Selektoren](/docs/selectors) und [Auto-waiting](/docs/autowait) wider.

## 4. Lass den Agent fehlschlagende Tests debuggen

Der Service [WebdriverIO DevTools](/docs/devtools) kann von jedem Lauf einen **Trace** aufzeichnen: ein portables Artefakt mit einem schrittweisen Markdown-Transkript, Screenshots, Snapshots des Accessibility Trees und Netzwerk-Logs für jede Aktion. Dadurch erhält ein Agent dieselben Informationen, die ein Mensch beim Beobachten des Tests bekommt, ohne ein Browserfenster zu benötigen.

Installiere den Service und aktiviere den Trace-Modus:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // ein Trace pro Test macht es einfach, einem Agent einen einzelnen Fehler zu übergeben
            traceGranularity: 'test',
            // einfache Dateien statt eines Zip-Archivs, damit Agents sie direkt lesen können
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Nach einem Lauf werden die Traces nach `test-results/` geschrieben. Verweise deinen Agent auf den Ordner des fehlschlagenden Tests und bitte ihn, zuerst `transcript.md` zu lesen. Siehe [Trace Mode](/docs/devtools/wdio/trace-mode) für alle Optionen, einschließlich Granularität und Aufbewahrung.

## Empfohlener Workflow

1. Bitte den Agent, das zu testende Feature mit dem MCP-Server zu erkunden und Selektoren vorzuschlagen.
2. Lass ihn die Spec und das Page Object gemäß deinen Projektregeln schreiben und dabei bei Bedarf WebdriverIO-Dokumentationsseiten abrufen.
3. Lass ihn die einzelne Spec mit `--spec` ausführen und iterieren, bis sie erfolgreich ist.
4. Wenn ein Test in der CI fehlschlägt, gib dem Agent den Trace dieses Tests und lass ihn den Test beheben oder den Bug melden.

## Nächste Schritte

- [Getting Started](/docs/gettingstarted) - erstelle ein Projekt mit `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - alle Tools, die der MCP-Server bereitstellt
- [DevTools](/docs/devtools) - Live-Modus und Trace-Modus
- [Best Practices](/docs/bestpractices) - wie gute WebdriverIO-Tests aussehen
- [Von v9 zu v10](/docs/v10-migration#migrate-with-a-coding-agent) - der Migrations-Skill für eine bestehende Test-Suite