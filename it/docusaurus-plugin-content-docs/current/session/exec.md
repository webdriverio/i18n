---
id: exec
title: Eseguire codice in una sessione
description: Esegui codice e asserzioni WebdriverIO in una sessione wdio attiva con exec.
---

`exec` esegue codice WebdriverIO nella sessione aperta. Usalo quando un passaggio è più di un singolo `click` o `fill`, e per ogni asserzione.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Usa sempre `await` con i comandi. `$` restituisce un elemento e genera un errore quando è assente. `$$` restituisce una lista. Non esiste una modalità sincrona né `browser.element`.

I nomi che dichiari restano disponibili nel successivo `exec`. Un `import` di primo livello viene caricato dalla directory del progetto.

## Asserzioni

Inserisci le asserzioni in `exec` con `expect-webdriverio`. Installalo nel tuo progetto. Senza di esso, `expect(...)` fallisce con un suggerimento per l'installazione.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Usa `visual check <tag>` quando la domanda riguarda l'aspetto dello schermo. Questo comando richiede `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` copia l'ultima immagine effettiva per quel tag sopra la baseline. Non copia le immagini precedenti che condividono il prefisso del tag.

## Quando usare invece una scorciatoia

`click`, `fill`, `type`, `press` e `tap` sono più brevi di `exec` per una singola interazione, e stampano la riga WebdriverIO che hanno eseguito. Preferiscili con un ref dall'ultimo [snapshot](/docs/session/snapshots). Usa `exec` per le attese, le asserzioni e tutto ciò che richiede più di un comando.

## Prossimi passi

- [Esportare un test](/docs/session/export) — salva i passaggi, incluso `exec`
- [Comandi](/docs/session-commands) — flag di `exec` e `visual`