---
id: snapshots
title: Snapshot e ref
description: Leggi la pagina con wdio session snapshot, poi agisci sui ref che stampa.
---

Fai uno snapshot prima di cliccare. Lo snapshot è l'elenco degli elementi su cui puoi agire. Ogni riga interattiva termina con un ref come `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Una riga si presenta così: `button "Add to cart" [ref=e3]`. Il comando successivo usa quel ref:

```sh
npx wdio session click e3
```

I ref provengono dall'ultimo snapshot. Dopo una navigazione, fai di nuovo lo snapshot. Un ref vecchio fallisce con `REF_STALE`. Un ref sconosciuto fallisce con `REF_NOT_FOUND`.

:::caution Sperimentale

Il layout testuale di uno snapshot, e la forma che `--json` stampa per esso, sono sperimentali: una release minor potrebbe modificarli, ad esempio per condividere un unico motore di snapshot con il [trace di DevTools](/docs/devtools/wdio/trace-mode). La sintassi dei ref (`e3`, `@e3`), le azioni che accettano un ref e il codice che registrano restano stabili. Prendi i ref da uno snapshot e non analizzare il resto delle sue righe.

:::

## Cosa eseguire

| Comando | Usalo per |
| --- | --- |
| `snapshot --interactive` | Gli elementi su cui puoi agire, ciascuno con un ref |
| `find "Add to cart"` | Ogni corrispondenza con il nodo che la contiene, ad es. un intero elemento di lista, così un valore accanto alla corrispondenza viene incluso. `-A`, `-B` e `-C` stampano semplici righe di contesto come grep |
| `diff` | Cosa è cambiato dallo snapshot precedente |
| `screenshot` | Il layout. Saltalo quando uno snapshot risponde alla domanda |
| `source` | L'HTML della pagina o l'XML nativo |

`snapshot` senza `--interactive` include una parte più ampia dell'albero. Preferisci `--interactive` quando stai per cliccare o digitare.

## Cosa ha cambiato un'azione

In una sessione web, `open` stampa lo snapshot interattivo della pagina che ha aperto, e ogni azione che può modificare la pagina (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) riporta cosa è cambiato:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Quando l'azione ha aperto una scheda, il report lo indica (`Opened a new tab [1]: https://…`); la sessione resta sulla scheda corrente finché non esegui `tabs switch`. Quando la pagina è un controllo anti-bot (Cloudflare, DataDome, Akamai, …) anziché il sito, il report lo indica anche in questo caso, una volta per pagina. La sessione non tenta di superarlo; in un browser headless suggerisce di riaprire con `--headed`.

Sulla stessa pagina ottieni le righe nuove o modificate con i loro ref, incluso il testo non interattivo, come lo status qui sopra. Dopo una navigazione ottieni gli elementi interattivi della nuova pagina oppure, per una pagina grande, un riepilogo di una riga che rimanda a `find`. Quindi raramente hai bisogno di uno `snapshot` separato dopo un'azione. Imposta `WDIO_SESSION_CHANGES=0` per disattivare il report e passa `open --no-snapshot` per saltare lo snapshot dopo `open`.

## Frame

In una sessione WebDriver BiDi lo snapshot mostra il contenuto degli iframe della pagina, inclusi quelli cross-origin, sotto l'iframe in cui si trovano:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Le azioni su questi ref entrano nel frame, agiscono e tornano alla pagina, e il codice stampato fa lo stesso. Vengono mostrati fino a cinque iframe, ciascuno troncato a 300 elementi; `frame e4` e `snapshot` mostrano per intero un frame che è stato troncato. Gli iframe più piccoli di 100 pixel quadrati, come i pixel di tracciamento, vengono esclusi.

## Shadow DOM ed elementi cliccabili senza ruolo

Con WebDriver BiDi, lo snapshot copre anche gli shadow root chiusi, e gli elementi che hanno solo un listener di click (un'icona collegata con `addEventListener`) ricevono un ref. Un elemento di questo tipo non ha un nome accessibile, quindi lo snapshot lo descrive:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Su Android, iOS, macOS e Windows lo snapshot proviene dal page source di Appium. Due controlli che condividono un accessibility id restano ref separati quando il resto dei loro selettori è diverso. `snapshot --scope e3` limita l'albero a quel ref.

## Controlli ripetuti

Quando più controlli condividono un ruolo e un nome, come il pulsante "Add to cart" di ogni riga in una tabella di prodotti, la riga del ref termina con `∈ "<text>"`, il testo della riga, della card o dell'elemento di lista che contiene quel controllo e nessun altro con lo stesso nome:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

Il testo viene troncato a 80 caratteri. Un controllo il cui elemento è un landmark della pagina (un link "Sign in" sia nell'header sia nel footer) non lo riceve. L'etichetta di un controllo di form visibile non viene elencata: il nome lo porta il controllo stesso.

## Tap nativi

Le sessioni web usano `click`. Le sessioni mobile e desktop native usano `tap` sullo stesso ref:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Risoluzione dei problemi

| Messaggio | Cosa fare |
| --- | --- |
| `REF_STALE` | L'elemento dell'ultimo snapshot non c'è più. Esegui `snapshot` e usa un nuovo ref. |
| `REF_NOT_FOUND` | Quell'id non è mai esistito in questa sessione. Il ref nel tuo comando non corrisponde all'ultimo snapshot. |
| `NO_MATCH` | `find` non ha trovato quel testo. Fai uno snapshot e leggi i nomi effettivamente presenti. |
| `NOT_EDITABLE` | Il target di `fill` non è un campo modificabile e non contiene un unico campo modificabile al suo interno (o dietro `aria-controls`/`aria-owns`/label). Esegui `snapshot --scope <target>` e usa `fill` sul ref del campo. |

## Prossimi passi

- [Eseguire codice](/docs/session/exec) — asserzioni e passaggi che richiedono più di un comando
- [Comandi](/docs/session-commands) — i flag di `snapshot`, `find`, `diff`, `screenshot` e `source`