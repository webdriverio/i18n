---
id: cli-wizard
title: Wizard CLI
description: "Verifica quale testo il servizio OCR riesce a trovare in un'immagine senza eseguire un test, utilizzando il wizard CLI OCR."
---

Puoi verificare quale testo può essere trovato in un'immagine senza eseguire un test utilizzando l'OCR CLI Wizard. Le uniche cose necessarie sono:

-   aver installato `@wdio/ocr-service` come dipendenza, vedi [Getting Started](./getting-started)
-   un'immagine che vuoi elaborare

Quindi esegui il seguente comando per avviare il wizard

```sh
npx ocr-service
```

Questo avvierà un wizard che ti guiderà attraverso i passaggi per selezionare un'immagine e utilizzare un haystack più la modalità avanzata. Vengono poste le seguenti domande

## Come vorresti specificare il file?

È possibile selezionare le seguenti opzioni

-   Usa un "file explorer"
-   Digita manualmente il percorso del file

### Usa un "file explorer"

Il wizard CLI offre l'opzione di utilizzare un "file explorer" per cercare i file sul tuo sistema. Parte dalla cartella da cui esegui il comando. Dopo aver selezionato un'immagine (usa i tasti freccia e il tasto INVIO) passerai alla domanda successiva

### Digita manualmente il percorso del file

Si tratta di un percorso diretto a un file da qualche parte sulla tua macchina locale

### Vorresti utilizzare un haystack?

Qui hai la possibilità di selezionare un'area da elaborare. Questo può velocizzare il processo o ridurre/restringere la quantità di testo che il motore OCR potrebbe trovare. Devi fornire i dati `x`, `y`, `width`, `height` in base alle seguenti domande:

-   Inserisci la coordinata x:
-   Inserisci la coordinata y:
-   Inserisci la larghezza:
-   Inserisci l'altezza:

## Vuoi utilizzare la modalità avanzata?

La modalità avanzata include funzionalità extra come:

-   l'impostazione del contrasto
-   altre ne seguiranno in futuro

## Demo

Ecco una demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>