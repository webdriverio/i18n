---
id: session
title: wdio session
description: Controlla un browser, un'app mobile o un'app desktop dalla shell con brevi comandi wdio session, poi esporta i passaggi come test.
---

`wdio session` mantiene attiva una sessione WebdriverIO attraverso molti brevi comandi shell. Usalo per esplorare un'interfaccia utente, verificare una modifica e trasformare i passaggi che hanno funzionato in un test. Fa parte di `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

La sessione si chiama `default`. Passa `-s <name>` solo quando hai bisogno di due sessioni contemporaneamente. La pagina [targets](/docs/session/targets) controlla una guinea pig Expo in una finestra Chrome headed e in una finestra Electron, entrambe a dimensione desktop. I comandi Android e iOS per la stessa app si trovano in quella pagina.

## Installazione

`wdio session` fa parte della CLI di WebdriverIO. `npx wdio` installa il pacchetto senza scope [`wdio`](https://www.npmjs.com/package/wdio) ed esegue quella CLI. Non devi installare `@wdio/session` manualmente.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` stampa il flusso di lavoro, le azioni per gruppo, i flag globali e i codici di uscita. `<action> --help` stampa gli argomenti, i flag, le piattaforme, gli esempi e le azioni correlate di quell'azione. Lo stesso testo si trova nella pagina [commands](/docs/session-commands). La skill per agenti mantiene solo il ciclo principale e rimanda gli agenti a `--help` per il resto, così non diventa obsoleta quando la CLI cambia.

Crea lo scaffold di un progetto con:

```sh
npm init wdio@latest
```

Accetta "Set up coding agent support" per scrivere `.agents/skills/wdio-session/SKILL.md`, una sezione `AGENTS.md` e una voce `.wdio/session/` nel gitignore. Installa la skill in un secondo momento con:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` controlla Node.js, il browser, Appium, gli SDK e le credenziali cloud. `doctor <target>` controlla solo ciò di cui ha bisogno quel target. Il processo termina con codice 1 quando un controllo fallisce.

## Aprire una pagina e interagire con essa

Apri Chrome headless (aggiungi `--headed` per mostrare la finestra). `open` stampa gli elementi interattivi della pagina:

```sh
npx wdio session open chrome http://localhost:3000
```

Un elemento appare come `button "Add to cart" [ref=e3]`. Usa quel ref. Ogni azione riporta cosa ha modificato nella pagina, con i ref per i nuovi elementi, quindi raramente ti serve uno `snapshot` separato:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` e `open safari` accettano lo stesso URL. Chrome, Firefox ed Edge vengono scaricati al primo utilizzo quando non sono installati. Safari richiede macOS.

### Android

Android e iOS funzionano tramite Appium 3. `doctor android` segnala un server o un driver mancante insieme al comando di installazione.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Desktop nativo: `open macos --bundle-id com.example.shop` e `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` e `open dioxus ./my-app` richiedono il rispettivo driver nel `PATH`. Su Linux senza `DISPLAY` o `WAYLAND_DISPLAY`, installa Xvfb o weston.

## Osservazione e ref

| Comando | Usalo per |
| --- | --- |
| `snapshot --interactive` | Gli elementi su cui puoi agire, ciascuno con un ref |
| `snapshot --compact` | Lo stesso albero senza i wrapper vuoti privi di nome |
| `snapshot --urls` | Gli indirizzi di ciascun link |
| `find "Add to cart"` | Una riga da uno snapshot aggiornato |
| `diff` | Cosa è cambiato rispetto allo snapshot precedente |
| `screenshot` | Il layout. Evitalo quando uno snapshot risponde alla domanda |
| `pdf` | Un PDF della pagina corrente (`pdf report.pdf`). Le sessioni BiDi stampano sia in modalità headed che headless |
| `source` | L'HTML della pagina o l'XML nativo |

I ref provengono dall'ultimo snapshot. Dopo una navigazione, esegui di nuovo lo snapshot. Un ref vecchio fallisce con `REF_STALE`. Un ref sconosciuto fallisce con `REF_NOT_FOUND`.

## `exec`

`exec` esegue codice WebdriverIO. Usa sempre `await` con i comandi. `$` restituisce un elemento e genera un errore quando è assente. Non esiste una modalità sincrona né `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Inserisci le asserzioni in `exec` con `expect-webdriverio`. Usa `visual check <tag>` (richiede `@wdio/visual-service`) quando la domanda riguarda l'aspetto dello schermo.

## Esportazione

`export` scrive una spec a partire dai passaggi registrati. I ref vengono sostituiti con selettori stabili.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` e `open safari` accettano lo stesso URL. Gli altri target, gli snapshot, `exec`, l'esportazione e un'esecuzione di test in pausa sono trattati in pagine separate di questa sezione.

## Questa sezione

| Pagina | Usala per |
| --- | --- |
| [Targets](/docs/session/targets) | Browser, Android, iOS, desktop, Electron, Tauri, Dioxus e dispositivi cloud, inclusa l'app demo in Chrome, Android ed Electron |
| [Snapshot e ref](/docs/session/snapshots) | Cosa c'è sullo schermo e i ref su cui fai clic |
| [Eseguire codice](/docs/session/exec) | `exec`, asserzioni e controlli visivi |
| [Esportare un test](/docs/session/export) | Spec, page object e `.wdio/helpers` |
| [Eseguire il debug di un test](/docs/session/debug) | `wdio run --debug=agent` e `wdio repl --session` |
| [Comandi](/docs/session-commands) | Ogni azione e flag |

## Risoluzione dei problemi

| Messaggio | Cosa fare |
| --- | --- |
| `SESSION_EXISTS` | Il nome è già in esecuzione. Usa `-s` con un altro nome, oppure `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Esegui di nuovo `snapshot` e usa un ref da quell'output. |
| `NOT_EDITABLE` | Il target di `fill` non è un campo modificabile e non contiene un singolo campo modificabile al suo interno (o dietro `aria-controls`/`aria-owns`/label). Esegui `snapshot --scope <target>` e compila il ref del campo. |
| `MISSING_DEPENDENCY` | Installa il pacchetto indicato nell'errore, oppure esegui `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Esegui la riga `npx appium driver install …` riportata nell'errore. |
| `MISSING_CREDENTIALS` | Esporta le variabili indicate. Doctor non stampa mai i loro valori. |
| `Session closed from wdio session` | La sessione di debug è stata chiusa. Riprendi invece di chiudere quando il test deve continuare. |

Codici di uscita: 0 successo, 1 l'azione è fallita, 2 utilizzo errato, 3 dipendenza o credenziali mancanti, 4 nessuna sessione con quel nome.

## Prossimi passi

- [Targets](/docs/session/targets) — apri un browser, un'app Android o iOS, o una finestra Electron
- [WebdriverIO per agenti di programmazione](/docs/ai-agents) — skill, documentazione e regole del progetto
- [Comandi di wdio session](/docs/session-commands) — ogni azione e flag