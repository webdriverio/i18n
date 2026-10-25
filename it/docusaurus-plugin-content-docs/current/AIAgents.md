---
id: ai-agents
title: WebdriverIO per Coding Agent
description: Configura Cursor, Claude Code, Copilot o qualsiasi altro coding agent per scrivere, eseguire e fare il debug dei test WebdriverIO utilizzando la documentazione leggibile dalle macchine, il server MCP di WebdriverIO e le trace di DevTools.
---

La maggior parte dei test WebdriverIO oggi viene scritta insieme a un coding agent. Questa pagina mostra come fornire a un agent le tre cose di cui ha bisogno per farlo bene: **documentazione aggiornata** (così scrive codice v10 invece di tirare a indovinare), **un modo per pilotare l'applicazione da testare** (così può esplorare la UI e verificare i selettori) e **esecuzioni dei test di cui è possibile fare il debug** (così può correggere autonomamente i test che falliscono).

## 1. Fornisci la documentazione al tuo agent

Ogni pagina di questo sito è disponibile come Markdown pulito, senza navigazione, script o stili:

| Risorsa | URL | Utilizzala per |
| --- | --- | --- |
| Indice della documentazione | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Una mappa curata di tutte le pagine con riepiloghi di una riga. Inizia da qui. |
| Documentazione completa | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | L'intera documentazione in un unico file, per agent con finestre di contesto ampie. |
| Qualsiasi singola pagina | Aggiungi `.md` all'URL, ad es. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Caricare esattamente la pagina di cui l'agent ha bisogno. |
| Negoziazione del contenuto | Richiedi qualsiasi URL `/docs/*` con `Accept: text/markdown` | Agent e strumenti che recuperano gli URL così come sono. |

Ogni pagina della documentazione dispone inoltre di un menu **Copy page** con opzioni per copiare la pagina come Markdown o aprirla direttamente in ChatGPT, Claude o Cursor.

### Server MCP della documentazione

La documentazione è disponibile anche come server MCP remoto all'indirizzo `https://webdriver.io/mcp`. Fornisce a un agent tre strumenti: `search_docs` per trovare la pagina giusta, `get_page` per leggerla come Markdown e `list_sections` per caricare un'intera sezione in una volta. Aggiungilo accanto al server MCP di WebdriverIO descritto di seguito:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Per Claude Code, esegui `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Consenti al tuo agent di usare `wdio session`

[`wdio session`](/docs/session) mantiene attiva una sessione WebdriverIO tra un comando di shell e l'altro. Un agent può aprire un browser, un telefono o un'app desktop, acquisire uno snapshot di ciò che è sullo schermo, agire sui ref ed esportare come test i passaggi che hanno funzionato. Questo è il modo predefinito per pilotare un'app da un coding agent. Il [server MCP](/docs/mcp) nella sezione successiva è l'alternativa quando l'agent deve chiamare strumenti invece della shell.

Installa la skill nel progetto:

```sh
npx wdio session skill --install .
```

Questo scrive `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` scrive lo stesso file quando accetti il supporto per i coding agent e aggiunge le regole di progetto riportate di seguito.

Un agent può creare il progetto da solo. Il wizard accetta un flag per ogni domanda e `--yes` compila i valori predefiniti per il resto, così non resta mai in attesa di input:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` elenca tutti i flag e i relativi valori. Vedi [Rispondere al wizard con i flag](/docs/gettingstarted#answer-the-wizard-with-flags). La sezione [WebdriverIO Session](/docs/session) tratta target, snapshot, `exec`, esportazione e debug. Riferimento dei comandi: [comandi di wdio session](/docs/session-commands).

### Aggiungi la documentazione al tuo agent

Per rendere la documentazione disponibile in ogni chat, aggiungi l'indice al tuo agent:

- **Cursor**: aggiungi `https://webdriver.io/llms.txt` come documentazione personalizzata nelle impostazioni di Cursor (_Indexing & Docs_), quindi fai riferimento ad essa in chat con `@` e il nome che le hai assegnato.
- **Claude Code / Codex / altri agent CLI**: aggiungi il link al file `AGENTS.md` o `CLAUDE.md` del tuo progetto (vedi [regole di progetto](#3-add-project-rules) più sotto). Gli agent recuperano le pagine di cui hanno bisogno su richiesta.

## 2. Consenti al tuo agent di pilotare il browser o l'app

Il [server MCP di WebdriverIO](/docs/mcp) (`@wdio/mcp`) consente a un agent di aprire browser (Chrome, Firefox, Edge, Safari), app mobili native e ibride (tramite Appium) e dispositivi cloud, ispezionare l'albero di accessibilità, fare clic, digitare e acquisire screenshot. Gli agent lo utilizzano per esplorare una pagina prima di scrivere un test, per trovare selettori robusti e per riprodurre un errore passo dopo passo.

Aggiungilo alla configurazione del tuo client MCP (ad esempio `.mcp.json` o `.cursor/mcp.json` nel tuo progetto):

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

Per Claude Code, registralo dalla riga di comando:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Consulta la [configurazione MCP](/docs/mcp/configuration) per le opzioni di sessione e [Cloud Providers](/docs/mcp/cloud-providers) per eseguire su BrowserStack, Sauce Labs, TestMu AI o TestingBot.

## 3. Aggiungi regole di progetto

Gli agent seguono le convenzioni di un progetto in modo molto più affidabile quando sono messe per iscritto. Aggiungi una sezione come la seguente al file `AGENTS.md` (o `CLAUDE.md`, `.cursor/rules`) del tuo progetto di test e adatta percorsi e comandi:

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

Le regole sopra riportate riflettono le raccomandazioni presenti in [Best Practices](/docs/bestpractices), [Selettori](/docs/selectors) e [Auto-waiting](/docs/autowait).

## 4. Consenti all'agent di fare il debug dei test che falliscono

Il servizio [WebdriverIO DevTools](/docs/devtools) può registrare una **trace** di ogni esecuzione: un artefatto portabile con una trascrizione Markdown passo dopo passo, screenshot, snapshot dell'albero di accessibilità e log di rete per ogni azione. Questo fornisce a un agent le stesse informazioni che un essere umano ottiene osservando il test, senza bisogno di una finestra del browser.

Installa il servizio e abilita la modalità trace:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // una trace per test rende facile passare un singolo errore a un agent
            traceGranularity: 'test',
            // file semplici invece di uno zip, così gli agent possono leggerli direttamente
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Dopo un'esecuzione, le trace vengono scritte in `test-results/`. Indirizza il tuo agent alla cartella del test che fallisce e chiedigli di leggere prima `transcript.md`. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode) per tutte le opzioni, incluse granularità e conservazione.

## Flusso di lavoro consigliato

1. Chiedi all'agent di esplorare la funzionalità da testare con il server MCP e di proporre dei selettori.
2. Lascia che scriva la spec e il page object seguendo le regole del tuo progetto, recuperando le pagine della documentazione di WebdriverIO secondo necessità.
3. Fagli eseguire la singola spec con `--spec` e iterare finché non passa.
4. Se un test fallisce in CI, fornisci all'agent la trace di quel test e lascia che corregga il test o segnali il bug.

## Prossimi passi

- [Per iniziare](/docs/gettingstarted) - crea un progetto con `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - tutti gli strumenti forniti dal server MCP
- [DevTools](/docs/devtools) - modalità live e modalità trace
- [Best Practices](/docs/bestpractices) - come sono fatti dei buoni test WebdriverIO
- [Da v9 a v10](/docs/v10-migration#migrate-with-a-coding-agent) - la skill di migrazione per una suite esistente