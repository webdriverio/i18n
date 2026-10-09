---
id: session-commands
title: Comandi di wdio session
description: Ogni azione e flag di wdio session, da open fino a doctor e skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Questa pagina elenca ogni azione di `wdio session`. I flag globali valgono per tutte le azioni. Lo stesso testo viene stampato da `npx wdio session <action> --help`. Il resto della sezione [WebdriverIO Session](/docs/session) tratta [target](/docs/session/targets), [snapshot](/docs/session/snapshots), [`exec`](/docs/session/exec), [esportazione](/docs/session/export) e [debug](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Flag globali

| Flag | Descrizione |
| --- | --- |
| `-s, --session` | Nome della sessione (env WDIO_SESSION, predefinito "default") |
| `--json` | Stampa un singolo oggetto JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Timeout della richiesta in ms (limitato a 60000 tranne che per wait) |
| `-q, --quiet` | In caso di successo non stampa nulla tranne i dati richiesti |
| `--color` | Usa --no-color per disattivare i colori |

Codici di uscita: 0 successo, 1 l'azione o il tuo codice non è riuscito, 2 errore di utilizzo, 3 dipendenza o credenziali mancanti, 4 nessuna sessione con quel nome.

## `open`

Avvia una sessione: browser, android, ios, macos, windows, electron, tauri, dioxus o un file di configurazione wdio.

Avvia un daemon in background che mantiene attiva la sessione fino a `close`, oppure finché resta inattiva per il tempo di --idle-timeout (predefinito 30m). I browser vengono eseguiti in modalità headless, a meno che tu non passi --headed. Stampa il nome della sessione, il target e la directory degli artefatti, in cui vengono salvati snapshot, screenshot ed esportazioni. Per un browser aperto su un URL stampa anche lo snapshot interattivo di quella pagina.

È possibile una sola sessione per nome. Aprire un nome già in esecuzione non riesce: usa quella sessione, chiudila oppure passa --replace. Passa `-s <name>` solo quando ti servono due sessioni contemporaneamente.

```sh
npx wdio session open <target> [url]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | no | URL da aprire (browser), percorso dell'app (app desktop) o capability (configurazione) |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--replace` | Chiude prima una sessione in esecuzione con lo stesso nome |
| `--launch-timeout <n>` | Millisecondi di attesa prima che la sessione sia pronta |
| `--idle-timeout <value>` | Arresta la sessione dopo questo tempo senza richieste (es. 30m, 0 lo disattiva) |
| `--capabilities <value>` | Capability aggiuntive come JSON o percorso di un file JSON |
| `--hostname <value>` | Host WebDriver remoto |
| `--port <n>` | Porta WebDriver remota |
| `--path <value>` | Percorso WebDriver remoto |
| `--protocol <value>` | Protocollo WebDriver remoto |
| `--log-level <value>` | Livello di log di WebdriverIO scritto in daemon.log |
| `--bidi` | Richiede WebDriver BiDi (usa --no-bidi per disattivarlo) |
| `--headed` | Mostra la finestra del browser |
| `--headless` | Esegue senza finestra (predefinito per i browser; ha la precedenza su --headed) |
| `--snapshot` | Stampa lo snapshot interattivo della pagina aperta (usa --no-snapshot per saltarlo) |
| `--viewport <value>` | Viewport iniziale, es. 1280x720 |
| `--browser-version <value>` | Versione del browser |
| `--binary <value>` | Binario del browser |
| `--arg <value>` | Argomento aggiuntivo per il browser. Un valore che inizia con `-` richiede `=`, es. `--arg=--disable-gpu` (ripetibile) |
| `--profile <value>` | Directory del profilo persistente |
| `--attach <value>` | Si collega a un Chrome/Edge in esecuzione (porta di debug o URL) |
| `--app <value>` | File dell'app o URL dell'app nel cloud |
| `--package <value>` | Package dell'app Android |
| `--activity <value>` | Activity dell'app Android |
| `--bundle-id <value>` | Bundle id iOS/macOS |
| `--browser <value>` | Browser web mobile (chrome, safari) |
| `--device <value>` | Nome del dispositivo |
| `--platform-version <value>` | Versione della piattaforma |
| `--udid <value>` | UDID del dispositivo |
| `--reset` | Usa --no-reset per mantenere lo stato dell'app (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Orientamento iniziale |
| `--appium-url <value>` | Usa un server Appium in esecuzione |
| `--app-arg <value>` | Argomento passato a un'app desktop. Un valore che inizia con `-` richiede `=`, es. `--app-arg=--no-sandbox` (ripetibile) |
| `--chromedriver <value>` | Electron: binario di Chromedriver |
| `--electron-version <value>` | Electron: sostituisce il rilevamento della versione |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Provider cloud |
| `--os <value>` | Cloud: sistema operativo desktop |
| `--os-version <value>` | Cloud: versione del sistema operativo desktop |
| `--region <value>` | Cloud: regione Sauce Labs |
| `--tunnel <value>` | Cloud: avvia il tunnel del provider (o "external") |
| `--tunnel-name <value>` | Cloud: identificativo del tunnel |
| `--project <value>` | Cloud: etichetta del progetto |
| `--build <value>` | Cloud: etichetta della build |
| `--name <value>` | Cloud: etichetta del nome della sessione |

**Esempi**

```sh
# Apri Chrome headless su un'app locale
npx wdio session open chrome http://localhost:3000

# Apri Firefox con una finestra visibile
npx wdio session open firefox http://localhost:3000 --headed

# Apri un'app Android tramite Appium
npx wdio session open android --app ./app.apk

# Apri un'app iOS installata
npx wdio session open ios --bundle-id com.example.shop

# Apri un'app Electron
npx wdio session open electron ./main.js

# Apri la prima capability di una configurazione
npx wdio session open ./wdio.conf.ts 0

# Apri Chrome in una griglia cloud
npx wdio session open chrome https://example.com --provider browserstack
```

Vedi anche: [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Termina la sessione e arresta il suo daemon.

Su una sessione aperta da `wdio run --debug=agent`, questo comando fa fallire il test in pausa; usa `resume` per lasciarlo proseguire.

```sh
npx wdio session close
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--all` | Chiude tutte le sessioni |
| `--clean` | Elimina anche la directory degli artefatti |

**Esempi**

```sh
# Chiudi la sessione predefinita
npx wdio session close

# Chiudi tutte le sessioni ed elimina i loro artefatti
npx wdio session close --all --clean
```

Vedi anche: [`open`](#open), [`list`](#list).

## `list`

Elenca le sessioni in esecuzione.

Stampa una riga per sessione con nome, target, URL ed età. Rimuove lo stato lasciato dalle sessioni terminate in modo anomalo.

```sh
npx wdio session list
```

**Esempi**

```sh
# Mostra tutte le sessioni in esecuzione
npx wdio session list
```

Vedi anche: [`info`](#info), [`status`](#status).

## `info`

Mostra i dettagli della sessione.

Stampa il target, il browser e la sua versione, il supporto BiDi e la directory degli artefatti. Mostra anche URL, titolo, dimensione della finestra e frame correnti (web), oppure contesto e activity correnti (mobile).

```sh
npx wdio session info
```

**Esempi**

```sh
# Mostra dove si trova la sessione e cosa esegue
npx wdio session info
```

Vedi anche: [`list`](#list), [`get`](#get).

## `restart`

Chiude e riapre la sessione con lo stesso target e gli stessi flag.

Conserva la cronologia registrata, quindi `export` include ancora i passaggi precedenti al riavvio.

```sh
npx wdio session restart
```

**Esempi**

```sh
# Ricomincia con un browser nuovo
npx wdio session restart
```

Vedi anche: [`open`](#open), [`close`](#close).

## `status`

Esce con 0 se la sessione è in esecuzione, con 4 in caso contrario.

```sh
npx wdio session status
```

**Esempi**

```sh
# Apri una sessione solo se non ce n'è nessuna in esecuzione
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Vedi anche: [`list`](#list), [`open`](#open).

## `exec`

Esegue codice WebdriverIO da stdin, da -e o da un file.

Il codice viene eseguito come funzione async con `browser`, `$`, `$$`, `expect` e `ref('e3')` disponibili nello scope. Le variabili di primo livello persistono tra una chiamata e l'altra. Se invochi `wdio session` senza azione e passi codice tramite pipe su stdin, viene eseguito `exec`.

Usa sempre `await` con i comandi. `$` restituisce esattamente un elemento e lancia StrictSelectorError quando più elementi corrispondono. Quando basta una singola azione (click, fill, …), preferiscila; usa `exec` per cicli, condizioni e asserzioni.

```sh
npx wdio session exec [file]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `file` | no | File di script (.js, .ts, .mjs) |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `-e, --eval <value>` | Codice da eseguire |
| `--history` | Registra il codice nella cronologia (usa --no-history per saltarlo) |

**Esempi**

```sh
# Esegui un comando su una riga
npx wdio session exec -e "await browser.getTitle()"

# Fai un'asserzione sulla pagina (gli apici singoli impediscono alla shell di interpretare $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Passa più passaggi tramite pipe su stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Esegui un file di script
npx wdio session exec ./scripts/login.ts
```

Vedi anche: [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Elenca gli helper del progetto presenti in .wdio/helpers.

Ogni file in .wdio/helpers esporta come default una funzione che riceve il browser e registra comandi personalizzati con addCommand. Gli helper vengono caricati all'apertura della sessione e nel test esportato diventano comandi personalizzati.

```sh
npx wdio session helpers
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--reload` | Reimporta gli helper |

**Esempi**

```sh
# Elenca gli helper e i comandi che aggiungono
npx wdio session helpers

# Carica le modifiche a un helper
npx wdio session helpers --reload
```

Vedi anche: [`exec`](#exec), [`export`](#export).

## `snapshot`

Snapshot di accessibilità con ref. Si applica a: web, mobile nativo, desktop nativo.

Stampa l'albero di accessibilità, un nodo per riga, ad es. `button "Add to cart" [ref=e3]`. Puoi passare un ref a click, fill, get e alle altre azioni. I ref restano validi finché l'elemento esiste; un'azione su un elemento rimosso fallisce con REF_STALE.

Ogni snapshot viene scritto nella directory degli artefatti. Un output più lungo di --max-chars viene stampato a parti: prima la prima parte, poi `--offset <line>` indica come ottenere la successiva. `find` effettua la ricerca sull'intero snapshot.

Il layout testuale e la struttura di --json sono sperimentali e possono cambiare in una release minor. La sintassi dei ref e le azioni che accettano un ref restano stabili.

```sh
npx wdio session snapshot
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--depth <n>` | Profondità massima |
| `--scope <value>` | Esegue lo snapshot solo al di sotto di questo ref o selettore |
| `-i, --interactive` | Solo elementi interattivi |
| `--all` | Include gli elementi nascosti |
| `--boxes` | Aggiunge i bounding box |
| `--viewport` | Solo ciò che è nel viewport (web: non aggiorna la baseline del diff) |
| `--selectors` | Termina ogni riga con ref con il suo selettore migliore |
| `--compact` | Scarta i nodi senza nome privi di contenuto |
| `-u, --urls` | Include gli href dei link |
| `--file-only` | Scrive solo il file |
| `--max-chars <n>` | Stampa al massimo questo numero di caratteri alla volta (predefinito 8000) |
| `--offset <n>` | Stampa a partire da questa riga, per la parte successiva di uno snapshot lungo |

**Esempi**

```sh
# Solo elementi interattivi, il consueto primo sguardo
npx wdio session snapshot -i

# Intera pagina con le destinazioni dei link
npx wdio session snapshot --compact --urls

# Solo una parte della pagina
npx wdio session snapshot --scope "#checkout" --depth 4

# Cosa c'è ora sullo schermo
npx wdio session snapshot --viewport -i

# Ogni ref con un selettore da inserire in un test
npx wdio session snapshot --selectors -i

# Esegui un'azione, poi guarda di nuovo
npx wdio session click e3 && npx wdio session snapshot -i
```

Vedi anche: [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Legge il testo della pagina come Markdown. Si applica a: web.

Restituisce titoli, paragrafi, elementi di elenco, righe di tabella e link con il loro URL. Il testo viene preso dal contenuto principale quando la pagina lo contrassegna (main, article), altrimenti dall'intera pagina. Navigazione, footer e testo nascosto vengono esclusi. L'output viene tagliato a --max-chars (predefinito 6000) e il punto di taglio indica quale --offset usare per leggere la parte successiva. Con --scope, la sezione viene fatta scorrere nel campo visivo. Usa `read` per rispondere a "cosa dice la pagina"; usa snapshot o find per ottenere i ref su cui agire.

```sh
npx wdio session read
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--scope <value>` | Legge solo al di sotto di questo ref o selettore |
| `--max-chars <n>` | Stampa al massimo questo numero di caratteri (predefinito 6000) |
| `--offset <n>` | Inizia da questo carattere del testo, per la parte successiva di una pagina lunga |

**Esempi**

```sh
# Leggi il contenuto principale
npx wdio session read

# Leggi una sezione
npx wdio session read --scope e12
```

Vedi anche: [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Cerca un testo in uno snapshot nuovo. Si applica a: web, mobile nativo, desktop nativo.

Esegue un nuovo snapshot e stampa ogni corrispondenza insieme al nodo che la contiene, con numeri di riga e ref. Ad esempio, include l'intero elemento di elenco, così compare anche un valore accanto alla corrispondenza. Inoltre fa scorrere la prima corrispondenza nel campo visivo.

La ricerca procede per gradi:

- prima ignora maiuscole e minuscole;
- poi ignora gli spazi ("SO2" trova "SO 2");
- infine cerca tutte le parole e parole simili.

Il testo presente solo in parti nascoste della pagina (menu chiusi, schede, "Mostra altro") viene segnalato come tale. È più economico che leggere l'intero snapshot di una pagina grande. Con -A/-B/-C stampa invece semplici righe di contesto, come grep.

```sh
npx wdio session find <text>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `text` | sì | Testo da cercare |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--regex` | Tratta il testo come un'espressione regolare |
| `--scope <value>` | Cerca solo al di sotto di questo ref o selettore |
| `-C, --context <n>` | Righe di contesto prima e dopo, al posto del nodo circostante |
| `-A, --after-context <n>` | Righe di contesto dopo ogni corrispondenza |
| `-B, --before-context <n>` | Righe di contesto prima di ogni corrispondenza |
| `--offset <n>` | Salta questo numero di corrispondenze, per ottenere le successive quando l'output viene tagliato |

**Esempi**

```sh
# Trova il ref di un pulsante
npx wdio session find "Add to cart"

# Elenca tutti i link
npx wdio session find "^\s*link" --regex --context 0
```

Vedi anche: [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Confronta uno snapshot nuovo con il precedente. Si applica a: web, mobile nativo, desktop nativo.

Stampa un diff unificato di ciò che è cambiato dall'ultimo snapshot, oppure "No changes". La prima chiamata memorizza una baseline. Usalo dopo un'azione per vedere cosa ha fatto l'azione senza rileggere l'intera pagina. Sul web la baseline è l'ultimo snapshot eseguito senza `--viewport`.

```sh
npx wdio session diff
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--baseline <value>` | File di snapshot con cui confrontare |
| `--scope <value>` | Esegue lo snapshot solo all'interno di questo ref o selettore, come `snapshot --scope` |
| `--interactive` | Solo elementi interattivi, come `snapshot -i` |

**Esempi**

```sh
# Vedi cosa ha cambiato un click
npx wdio session click e7 && npx wdio session diff

# Confronta con uno snapshot salvato
npx wdio session diff --baseline before.yml
```

Vedi anche: [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Salva un PNG del viewport, di un elemento o dell'intera pagina. Si applica a: web, mobile nativo, desktop nativo.

Stampa il percorso del file e la dimensione dell'immagine. Fai uno screenshot quando la domanda riguarda il layout o l'aspetto; per testo e stato usa `snapshot` e `get`.

```sh
npx wdio session screenshot [target]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | no | Ref o selettore dell'elemento da catturare |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--full` | Intera pagina (web) |
| `--path <value>` | File di output |

**Esempi**

```sh
# Cattura il viewport
npx wdio session screenshot

# Cattura un elemento
npx wdio session screenshot e5 --path card.png

# Cattura l'intera pagina
npx wdio session screenshot --full
```

Vedi anche: [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Salva la pagina corrente come PDF. Si applica a: web.

Richiama `browser.savePDF`. In Chrome, Edge e Firefox, una sessione BiDi stampa con `browsingContext.print`, sia in modalità headed che headless. Una sessione Classic usa `printPage`, che nelle versioni meno recenti di Chrome è supportato solo in modalità headless.

```sh
npx wdio session pdf [file]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `file` | no | File di output (deve terminare con .pdf) |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--path <value>` | File di output (deve terminare con .pdf) |

**Esempi**

```sh
# Scrivi report.pdf nella directory corrente
npx wdio session pdf report.pdf
```

Vedi anche: [`screenshot`](#screenshot).

## `source`

Salva l'HTML della pagina o l'XML dell'app. Si applica a: web, mobile nativo, desktop nativo.

Scrive il file e ne stampa percorso e dimensione. Usalo quando uno snapshot nasconde ciò che ti serve, ad esempio gli attributi per un selettore.

```sh
npx wdio session source
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--path <value>` | File di output |

**Esempi**

```sh
# Salva l'HTML nella directory corrente
npx wdio session source --path page.html
```

Vedi anche: [`snapshot`](#snapshot), [`get`](#get).

## `get`

Legge testo, html, valore, un attributo, il titolo, l'URL, un conteggio o un box. Si applica a: web.

Stampa il valore, seguito dal codice WebdriverIO eseguito (`→ …`). Passa -q per stampare solo il valore, ad esempio per salvarlo in una variabile di shell. Leggi un valore prima di scrivere un'asserzione su di esso.

```sh
npx wdio session get <sub> [target] [name]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | no | Ref o selettore (non usato per title e url) |
| `name` | no | Nome dell'attributo (solo attr) |

**Esempi**

```sh
# Testo di un ref
npx wdio session get text e1

# URL corrente
npx wdio session get url

# Solo il valore, per una variabile di shell
url=$(npx wdio session get url -q)

# href di un link
npx wdio session get attr e3 href

# Quanti elementi corrispondono
npx wdio session get count "aria/Remove"
```

Vedi anche: [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Verifica se un elemento è visibile, abilitato o selezionato. Si applica a: web.

Stampa true o false, seguito dal codice WebdriverIO eseguito; passa -q per stampare solo il valore. Il codice di uscita è 0 in entrambi i casi.

```sh
npx wdio session is <sub> <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | visible \| enabled \| checked |
| `target` | sì | Ref o selettore |

**Esempi**

```sh
# Stampa true o false
npx wdio session is visible e1

# Verifica un pulsante tramite la sua etichetta
npx wdio session is enabled "aria/Place order"
```

Vedi anche: [`get`](#get), [`wait`](#wait).

## `logs`

Stampa i log di console, gli errori di pagina, i log di rete e quelli del dispositivo dall'ultima chiamata. Si applica a: web, mobile nativo.

Ogni chiamata fa avanzare un cursore di lettura, quindi la chiamata successiva mostra solo le nuove voci. Eseguilo dopo un'azione per vedere gli errori causati da quell'azione.

```sh
npx wdio session logs
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--errors` | Solo errori |
| `--network` | Solo voci di rete |
| `--since <value>` | Solo voci più recenti di questa durata (es. 30s) |
| `--peek` | Non fa avanzare il cursore di lettura |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Origine dei log |

**Esempi**

```sh
# Errori causati da un click
npx wdio session click e4 && npx wdio session logs --errors

# Voci recenti, conservate per la chiamata successiva
npx wdio session logs --since 30s --peek
```

Vedi anche: [`requests`](#requests).

## `navigate`

Apre un URL. Si applica a: web.

Accetta `example.com`, URL completi e percorsi relativi a baseUrl. Esce prima da qualsiasi frame. Stampa il nuovo URL e il titolo.

```sh
npx wdio session navigate <url>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `url` | sì | URL (gli URL relativi usano baseUrl) |

**Esempi**

```sh
# Vai a una pagina e guardala
npx wdio session navigate /cart && npx wdio session snapshot -i

# Apri un altro sito
npx wdio session navigate example.com
```

Vedi anche: [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Torna indietro. Si applica a: web.

```sh
npx wdio session back
```

**Esempi**

```sh
# Torna indietro di una pagina
npx wdio session back
```

Vedi anche: [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Va avanti. Si applica a: web.

```sh
npx wdio session forward
```

**Esempi**

```sh
# Vai avanti di una pagina
npx wdio session forward
```

Vedi anche: [`back`](#back), [`navigate`](#navigate).

## `reload`

Ricarica la pagina. Si applica a: web.

```sh
npx wdio session reload
```

**Esempi**

```sh
# Ricarica e attendi che la rete sia inattiva
npx wdio session reload && npx wdio session wait --load networkidle
```

Vedi anche: [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Attende un elemento, un testo, un URL, uno stato di caricamento, una condizione o alcuni millisecondi. Si applica a: web.

Passa esattamente uno tra: un ref o selettore, --text, --url, --load, --fn, oppure un numero di millisecondi. Se la condizione non si verifica entro --limit, fallisce con codice di uscita 1.

Preferisci una condizione a una pausa, sia qui sia rispetto a `sleep` in una catena di comandi. Una pausa superiore a 30 secondi viene rifiutata.

```sh
npx wdio session wait [target]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | no | Ref, selettore o millisecondi |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--text <value>` | Attende finché la pagina non contiene questo testo |
| `--url <value>` | Attende finché l'URL non corrisponde (sottostringa, oppure glob * e **) |
| `--load <value>` | domcontentloaded, load o networkidle |
| `--fn <value>` | Attende finché questa espressione JavaScript non è vera |
| `--state <value>` | Con un target: visible (predefinito), hidden, enabled o disabled |
| `--limit <n>` | Millisecondi di attesa (predefinito 10000) |

**Esempi**

```sh
# Attendi che un ref sia visibile
npx wdio session wait e1

# Attendi che uno spinner scompaia
npx wdio session wait "aria/Loading" --state hidden

# Esegui un'azione, attendi il risultato, guarda di nuovo
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Attendi un URL
npx wdio session wait --url "**/dashboard"

# Attendi che non ci siano richieste in corso
npx wdio session wait --load networkidle

# Pausa di 500ms
npx wdio session wait 500
```

Vedi anche: [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Fa clic su un elemento. Si applica a: web, mobile nativo, desktop nativo.

Stampa l'elemento cliccato e, se il clic ha causato una navigazione, il nuovo URL. Esegui un nuovo snapshot prima di usare i ref nella pagina successiva. Se l'elemento è nascosto o coperto, il comando fallisce subito e indica cosa lo ostacola. `x,y` fa clic su un punto del viewport (pixel dall'angolo in alto a sinistra, come in uno screenshot) per ciò che non ha un ref, come un canvas o una mappa.

```sh
npx wdio session click <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12), selettore WebdriverIO o coordinate x,y del viewport |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--double` | Doppio clic |
| `--right` | Clic destro |
| `--new-tab` | Apre il link in una nuova scheda e passa a essa |

**Esempi**

```sh
# Fai clic su un ref dell'ultimo snapshot
npx wdio session click e3

# Fai clic tramite nome accessibile
npx wdio session click "aria/Add to cart"

# Fai clic, attendi, guarda di nuovo
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Apri un link in una nuova scheda
npx wdio session click e8 --new-tab

# Fai clic su un punto del viewport, ad es. su una mappa
npx wdio session click 320,480
```

Vedi anche: [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Tocca un elemento (mobile). Si applica a: mobile nativo.

```sh
npx wdio session tap <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Esempi**

```sh
# Tocca un ref dell'ultimo snapshot
npx wdio session tap e2
```

Vedi anche: [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Sostituisce il valore di un input. Si applica a: web, mobile nativo, desktop nativo.

Svuota prima il campo. Per digitare nell'elemento che ha il focus usa `type`; per inviare tasti come Invio usa `press`.

```sh
npx wdio session fill <target> <text..>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |
| `text` | sì | Testo (le parole dopo il target vengono unite con spazi) |

**Esempi**

```sh
# Compila un campo
npx wdio session fill e2 ada@example.com

# Compila un modulo e invialo
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Vedi anche: [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Digita in un elemento o nell'elemento che ha il focus. Si applica a: web, mobile nativo, desktop nativo.

Invia il testo come pressioni di tasti senza svuotare nulla: `type e2 Ada` digita in e2, `type Ada` digita nell'elemento che ha il focus. Per sostituire un valore usa `fill`.

```sh
npx wdio session type <text..>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `text` | sì | Testo (le parole vengono unite con spazi). Inizia con un ref, ad es. `type e2 Ada`, per digitare in quell'elemento invece che in quello con il focus |

**Esempi**

```sh
# Digita in un campo
npx wdio session type e5 hello

# Digita nell'elemento che ha il focus
npx wdio session focus e5 && npx wdio session type "hello"
```

Vedi anche: [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Preme dei tasti, ad es. Enter, Control+a. Si applica a: web, desktop nativo.

Combina i tasti con +. I nomi non distinguono tra maiuscole e minuscole; sono accettate le forme brevi ctrl, cmd, esc, up, down, left e right.

```sh
npx wdio session press <keys>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `keys` | sì | Combinazione di tasti |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--times <n>` | Preme il tasto questo numero di volte (fino a 100), ad es. per spostare uno slider |

**Esempi**

```sh
# Invia un modulo
npx wdio session press Enter

# Sposta di cinque passi uno slider con il focus
npx wdio session press ArrowRight --times 5

# Seleziona tutto
npx wdio session press Control+a

# Sposta indietro il focus
npx wdio session press Shift+Tab
```

Vedi anche: [`type`](#type), [`fill`](#fill).

## `select`

Seleziona un'opzione di un `<select>`. Si applica a: web.

```sh
npx wdio session select <target> <value>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |
| `value` | sì | Testo, valore o indice dell'opzione |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--by <text\|value\|index>` | Come individuare l'opzione (predefinito text) |

**Esempi**

```sh
# Seleziona tramite testo visibile
npx wdio session select e6 Germany

# Seleziona tramite valore
npx wdio session select e6 de --by value
```

Vedi anche: [`fill`](#fill), [`check`](#check).

## `upload`

Imposta un input di tipo file. Si applica a: web.

Il percorso è relativo alla tua directory di lavoro. Indica come target l'`<input type="file">` stesso, non il pulsante che apre il selettore di file.

```sh
npx wdio session upload <target> <file>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |
| `file` | sì | File da caricare |

**Esempi**

```sh
# Allega un file
npx wdio session upload e9 ./fixtures/avatar.png
```

Vedi anche: [`fill`](#fill).

## `hover`

Sposta il puntatore sopra un elemento. Si applica a: web, desktop nativo.

```sh
npx wdio session hover <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Esempi**

```sh
# Apri un menu al passaggio del mouse e guardalo
npx wdio session hover e4 && npx wdio session snapshot -i
```

Vedi anche: [`click`](#click).

## `focus`

Assegna il focus a un elemento. Si applica a: web.

```sh
npx wdio session focus <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Esempi**

```sh
# Assegna il focus a un campo prima di `type`
npx wdio session focus e5
```

Vedi anche: [`type`](#type), [`press`](#press).

## `check`

Seleziona una checkbox o un radio button. Si applica a: web.

Non fa nulla se l'elemento è già selezionato e fallisce se alla fine non risulta selezionato.

```sh
npx wdio session check <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Esempi**

```sh
# Accetta i termini
npx wdio session check e7
```

Vedi anche: [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Deseleziona una checkbox. Si applica a: web.

Non fa nulla se è già deselezionata. Un radio button selezionato non può essere deselezionato.

```sh
npx wdio session uncheck <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Esempi**

```sh
# Disiscriviti dalla newsletter
npx wdio session uncheck e7
```

Vedi anche: [`check`](#check), [`is`](#is).

## `drag`

Trascina un elemento su un altro. Si applica a: web, mobile nativo, desktop nativo.

```sh
npx wdio session drag <from> <to>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `from` | sì | Ref o selettore da trascinare |
| `to` | sì | Ref o selettore su cui rilasciare |

**Esempi**

```sh
# Sposta una scheda in un'altra colonna
npx wdio session drag e3 e9
```

Vedi anche: [`scroll`](#scroll).

## `scroll`

Fa scorrere un elemento nel campo visivo oppure scorre la pagina. Si applica a: web.

Senza target scorre verso il basso di 600px. Il contenuto caricato in modo lazy compare nello snapshot successivo.

```sh
npx wdio session scroll [target]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | no | Ref, selettore, up, down, top o bottom |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--px <n>` | Pixel per up/down (predefinito 600) |

**Esempi**

```sh
# Porta un elemento nel campo visivo
npx wdio session scroll e40

# Carica altri risultati e guardali
npx wdio session scroll bottom && npx wdio session snapshot -i

# Scorri di due schermate
npx wdio session scroll down --px 1200
```

Vedi anche: [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Esegue uno swipe sullo schermo (mobile). Si applica a: mobile nativo.

```sh
npx wdio session swipe <direction>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `direction` | sì | up \| down \| left \| right |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--percent <n>` | Lunghezza dello swipe 0..1 |

**Esempi**

```sh
# Scorri un elenco e guardalo
npx wdio session swipe up && npx wdio session snapshot
```

Vedi anche: [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Esegue una pressione prolungata su un elemento (mobile). Si applica a: mobile nativo.

```sh
npx wdio session long-press <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref (e12) o selettore WebdriverIO |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--duration <n>` | Millisecondi |

**Esempi**

```sh
# Apri un menu contestuale
npx wdio session long-press e4 --duration 1500
```

Vedi anche: [`tap`](#tap).

## `tabs`

Elenca, apre, cambia o chiude le schede. Si applica a: web.

Senza sottocomando elenca le schede con il loro indice e contrassegna quella corrente. `new` apre una scheda e passa a essa. `switch` e `close` accettano un indice o un handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | no | switch \| new \| close |
| `arg` | no | Indice, handle o URL |

**Esempi**

```sh
# Elenca le schede
npx wdio session tabs

# Apri una scheda
npx wdio session tabs new http://localhost:3000/help

# Torna alla prima scheda
npx wdio session tabs switch 0

# Chiudi la seconda scheda
npx wdio session tabs close 1
```

Vedi anche: [`windows`](#windows), [`frame`](#frame).

## `windows`

Elenca o cambia le finestre. Si applica a: web, desktop nativo.

```sh
npx wdio session windows [sub] [arg]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | no | switch |
| `arg` | no | Indice o handle |

**Esempi**

```sh
# Elenca le finestre
npx wdio session windows

# Passa alla seconda finestra
npx wdio session windows switch 1
```

Vedi anche: [`tabs`](#tabs).

## `frame`

Entra in un iframe, passa al frame padre o al documento principale. Si applica a: web.

Lo snapshot della pagina mostra già il contenuto dei suoi iframe, con ref che le azioni usano direttamente. Per questo `frame` serve solo per lavorare per un po' all'interno di un singolo frame, oppure per vedere un frame che lo snapshot ha troncato. Snapshot e azioni si applicano al frame corrente finché non torni indietro. `navigate` riporta al documento principale.

```sh
npx wdio session frame <target>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | sì | Ref, selettore, parent o top |

**Esempi**

```sh
# Entra in un iframe e guarda all'interno
npx wdio session frame e12 && npx wdio session snapshot -i

# Torna alla pagina
npx wdio session frame top
```

Vedi anche: [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Elenca o cambia i contesti native/webview. Si applica a: mobile nativo.

```sh
npx wdio session contexts [sub] [name]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | no | switch |
| `name` | no | Nome del contesto |

**Esempi**

```sh
# Elenca i contesti NATIVE_APP e WEBVIEW
npx wdio session contexts

# Controlla la webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Vedi anche: [`snapshot`](#snapshot).

## `dialog`

Accetta, chiude o mostra lo stato di una finestra di dialogo aperta. Si applica a: web, mobile nativo.

Un alert, confirm o prompt aperto blocca le altre azioni, che falliscono con il suggerimento di eseguire questo comando.

```sh
npx wdio session dialog <sub>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | accept \| dismiss \| status |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--text <value>` | Testo del prompt (solo accept) |

**Esempi**

```sh
# Mostra la finestra di dialogo aperta
npx wdio session dialog status

# Conferma
npx wdio session dialog accept

# Rispondi a un prompt
npx wdio session dialog accept --text "Ada"
```

Vedi anche: [`click`](#click).

## `app`

Avvia, termina, installa o interroga un'app. Si applica a: mobile nativo, desktop nativo.

```sh
npx wdio session app <sub> <id>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | launch \| terminate \| install \| state |
| `id` | sì | Id dell'app, bundle id o file |

**Esempi**

```sh
# Riavvia l'app
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# È in esecuzione?
npx wdio session app state com.example.shop
```

Vedi anche: [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Apre un deep link. Si applica a: mobile nativo.

```sh
npx wdio session deeplink <url>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `url` | sì | URL |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--package <value>` | Package Android o bundle id iOS |

**Esempi**

```sh
# Apri la schermata di un prodotto
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Vedi anche: [`app`](#app).

## `rotate`

Ruota il dispositivo. Si applica a: mobile nativo.

```sh
npx wdio session rotate <orientation>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `orientation` | sì | portrait \| landscape |

**Esempi**

```sh
# Metti il dispositivo in orizzontale
npx wdio session rotate landscape
```

## `keyboard`

Nasconde la tastiera su schermo. Si applica a: mobile nativo.

```sh
npx wdio session keyboard <sub>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | hide |

**Esempi**

```sh
# Scopri gli elementi sotto la tastiera
npx wdio session keyboard hide
```

## `background`

Manda l'app in background. Si applica a: mobile nativo.

```sh
npx wdio session background <seconds>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `seconds` | sì | Secondi (-1 la lascia in background) |

**Esempi**

```sh
# Manda l'app in background per 3 secondi
npx wdio session background 3
```

Vedi anche: [`app`](#app).

## `lock`

Blocca il dispositivo. Si applica a: mobile nativo.

```sh
npx wdio session lock
```

**Esempi**

```sh
# Blocca lo schermo
npx wdio session lock
```

Vedi anche: [`unlock`](#unlock).

## `unlock`

Sblocca il dispositivo. Si applica a: mobile nativo.

```sh
npx wdio session unlock
```

**Esempi**

```sh
# Sblocca lo schermo
npx wdio session unlock
```

Vedi anche: [`lock`](#lock).

## `geolocation`

Imposta la geolocalizzazione. Si applica a: web, mobile nativo.

```sh
npx wdio session geolocation <lat> <lon>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `lat` | sì | Latitudine |
| `lon` | sì | Longitudine |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--accuracy <n>` | Precisione in metri |

**Esempi**

```sh
# Fingi di essere a Berlino
npx wdio session geolocation 52.52 13.405
```

Vedi anche: [`emulate`](#emulate).

## `emulate`

Emula un dispositivo, un viewport, la rete, la cpu, l'orologio o un ambito di emulazione BiDi. Si applica a: web.

Un'emulazione resta attiva fino a `emulate reset` o alla fine della sessione; impostare di nuovo lo stesso tipo la sostituisce. `emulate device` senza valore elenca i nomi dei dispositivi. I preset di rete e il throttling della cpu richiedono un browser Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | no | Valore per l'emulazione |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--dpr <n>` | Device pixel ratio (viewport) |
| `--tick <n>` | Fa avanzare l'orologio emulato di ms (clock) |

**Esempi**

```sh
# Emula un telefono
npx wdio session emulate device "iPhone 15"

# Imposta un viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Vai offline
npx wdio session emulate network offline

# Modalità scura
npx wdio session emulate color-scheme dark

# Blocca la data
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Riduci le animazioni
npx wdio session emulate media prefersReducedMotion=reduce

# Annulla tutte le emulazioni
npx wdio session emulate reset
```

Vedi anche: [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Elenca le richieste di rete catturate (BiDi). Si applica a: web.

```sh
npx wdio session requests
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--filter <value>` | Sottostringa o glob |
| `--failed` | Solo richieste fallite |
| `--since <value>` | Solo richieste più recenti di questa durata |
| `--limit <n>` | Numero massimo di righe (predefinito 50) |

**Esempi**

```sh
# Solo chiamate API
npx wdio session requests --filter "**/api/**"

# Richieste fallite a causa di un click
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Vedi anche: [`mock`](#mock), [`logs`](#logs).

## `mock`

Simula le risposte per un pattern di URL (BiDi). Si applica a: web.

Stampa l'id del mock (m1, m2, …). Simulare di nuovo lo stesso pattern sostituisce il mock precedente.

```sh
npx wdio session mock <pattern>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `pattern` | sì | Pattern di URL |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--status <n>` | Codice di stato |
| `--body <value>` | Body come JSON/testo o percorso di un file |
| `--header <value>` | Header k:v (ripetibile) |
| `--abort` | Interrompe le richieste corrispondenti |
| `--method <value>` | Solo questo metodo |
| `--once` | Solo la richiesta successiva |

**Esempi**

```sh
# Restituisci un JSON fisso
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Fai fallire la richiesta successiva
npx wdio session mock "**/api/cart" --status 500 --once

# Blocca le immagini
npx wdio session mock "**/*.png" --abort
```

Vedi anche: [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Rimuove i mock. Si applica a: web.

```sh
npx wdio session unmock [pattern]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `pattern` | no | Pattern o id del mock |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--all` | Rimuove tutti i mock |

**Esempi**

```sh
# Rimuovi un mock
npx wdio session unmock m1

# Rimuovi tutti i mock
npx wdio session unmock --all
```

Vedi anche: [`mock`](#mock).

## `cookies`

Legge, imposta o cancella i cookie. Si applica a: web.

Senza sottocomando stampa ogni cookie come name=value. `clear` senza nome elimina tutti i cookie.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | no | get \| set \| clear |
| `name` | no | Nome del cookie |
| `value` | no | Valore del cookie |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--domain <value>` | Dominio del cookie (set) |
| `--path <value>` | Percorso del cookie (set) |
| `--http-only` | Cookie HttpOnly (set) |
| `--secure` | Cookie Secure (set) |
| `--same-site <value>` | lax, strict, none o default (set) |
| `--expiry <n>` | Scadenza come timestamp Unix in secondi (set) |

**Esempi**

```sh
# Elenca i cookie
npx wdio session cookies

# Valore di un cookie
npx wdio session cookies get session

# Imposta un cookie e ricarica
npx wdio session cookies set session abc && npx wdio session reload

# Elimina tutti i cookie
npx wdio session cookies clear
```

Vedi anche: [`storage`](#storage), [`state`](#state).

## `storage`

Legge, imposta o cancella il localStorage (o il sessionStorage). Si applica a: web.

Senza sottocomando stampa ogni voce. `clear` senza chiave svuota lo storage.

```sh
npx wdio session storage [sub] [key] [value]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | no | get \| set \| clear |
| `key` | no | Chiave |
| `value` | no | Valore |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--session-storage` | Usa il sessionStorage |

**Esempi**

```sh
# Elenca il localStorage
npx wdio session storage

# Imposta una chiave
npx wdio session storage set token abc

# Svuota il sessionStorage
npx wdio session storage clear --session-storage
```

Vedi anche: [`cookies`](#cookies), [`state`](#state).

## `state`

Salva o carica cookie e storage. Si applica a: web.

`save` scrive in un file JSON i cookie, il localStorage e il sessionStorage dell'origine corrente. `load` apre quell'origine e li ripristina, ad esempio per saltare un login.

```sh
npx wdio session state <sub> <file>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | save \| load |
| `file` | sì | File di stato |

**Esempi**

```sh
# Salva uno stato con login effettuato
npx wdio session state save .wdio/logged-in.json

# Parti con il login già effettuato
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Vedi anche: [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Snapshot visivi tramite @wdio/visual-service. Si applica a: web, mobile nativo, desktop nativo.

I sottocomandi disponibili sono:

- `save` memorizza una baseline in .wdio/visual/baseline;
- `check` la confronta con lo stato attuale e stampa la differenza;
- `accept` trasforma l'ultima immagine effettiva nella baseline;
- `list` mostra i tag.

Richiede @wdio/visual-service nel progetto.

```sh
npx wdio session visual <sub> [tag]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | save \| check \| accept \| list |
| `tag` | no | Tag dell'immagine |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--element <value>` | Solo questo elemento |
| `--full` | Intera pagina |
| `--tabbable` | Pagina con gli elementi raggiungibili tramite Tab |
| `--threshold <n>` | Differenza consentita in percentuale (predefinito 0) |
| `--all` | accept: tutti i tag |

**Esempi**

```sh
# Memorizza una baseline
npx wdio session visual save cart

# Confronta con la baseline
npx wdio session visual check cart --threshold 0.5

# Accetta una modifica intenzionale
npx wdio session visual accept cart
```

Vedi anche: [`screenshot`](#screenshot).

## `trace`

Registra ogni passaggio con screenshot e snapshot.

`stop` stampa la directory della traccia e una trascrizione dei passaggi.

```sh
npx wdio session trace <sub>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | start \| stop |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--screenshots` | Screenshot dopo ogni passaggio (usa --no-screenshots per saltarlo) |
| `--snapshots` | Snapshot dopo ogni passaggio (usa --no-snapshots per saltarlo) |

**Esempi**

```sh
# Avvia il tracciamento
npx wdio session trace start

# Interrompi e stampa la trascrizione
npx wdio session trace stop
```

Vedi anche: [`record`](#record), [`history`](#history).

## `record`

Registra un video. Si applica a: web, mobile nativo.

```sh
npx wdio session record <sub>
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `sub` | sì | start \| stop |

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--fps <n>` | Fotogrammi al secondo (predefinito 5) |
| `--path <value>` | File di output |

**Esempi**

```sh
# Avvia la registrazione
npx wdio session record start

# Interrompi e salva il video
npx wdio session record stop --path checkout.mp4
```

Vedi anche: [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Stampa i passaggi registrati.

Ogni azione che modifica la pagina registra il codice WebdriverIO che ha eseguito. `export` trasforma questa cronologia in una spec.

```sh
npx wdio session history
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--clear` | Cancella la cronologia |

**Esempi**

```sh
# Mostra i passaggi finora
npx wdio session history

# Ricomincia la registrazione prima dei passaggi che vuoi conservare
npx wdio session history --clear
```

Vedi anche: [`export`](#export), [`exec`](#exec).

## `export`

Genera una spec dalla cronologia.

Scrive una spec describe/it con i passaggi registrati. I ref diventano selettori stabili e gli helper diventano comandi personalizzati. Senza --out il file viene salvato nella directory degli artefatti. Eseguila con `wdio run` per verificare che passi.

```sh
npx wdio session export
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--out <value>` | File di output |
| `--title <value>` | Titolo della suite |
| `--page-objects` | Genera page object |
| `--framework <mocha\|jasmine>` | Framework (predefinito mocha) |

**Esempi**

```sh
# Scrivi la spec
npx wdio session export --out test/specs/cart.e2e.ts

# Scrivi la spec ed eseguila
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Vedi anche: [`history`](#history), [`helpers`](#helpers).

## `resume`

Riprende un test messo in pausa da wdio run --debug=agent.

`wdio run --debug=agent` mette in pausa un test che fallisce e lo espone come sessione debug-`<worker>`. Ispezionalo con qualsiasi azione, poi usa resume. Eseguire `close` su quella sessione fa invece fallire il test.

```sh
npx wdio session resume
```

**Esempi**

```sh
# Esamina il test in pausa, poi lascialo proseguire
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Vedi anche: [`close`](#close), [`list`](#list).

## `doctor`

Verifica il tuo ambiente.

Stampa una riga per ogni controllo, con una correzione per ogni errore. Esce con 1 quando un controllo fallisce.

```sh
npx wdio session doctor [target]
```

**Argomenti**

| Nome | Obbligatorio | Descrizione |
| --- | --- | --- |
| `target` | no | Verifica solo ciò che serve a questo target |

**Esempi**

```sh
# Verifica tutto
npx wdio session doctor

# Verifica ciò che serve a una sessione Android
npx wdio session doctor android
```

Vedi anche: [`open`](#open).

## `skill`

Stampa la skill per agenti.

```sh
npx wdio session skill
```

**Flag**

| Flag | Descrizione |
| --- | --- |
| `--install <value>` | La scrive in .agents/skills/wdio-session/SKILL.md (o in questa directory) |

**Esempi**

```sh
# Stampa la skill
npx wdio session skill

# Aggiungila a questo progetto
npx wdio session skill --install .
```