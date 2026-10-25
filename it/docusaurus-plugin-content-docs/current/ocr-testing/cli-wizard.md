---
id: cli-wizard
title: Procedura guidata CLI
description: "Verifica quale testo il servizio OCR riesce a trovare in un'immagine senza eseguire un test, utilizzando la procedura guidata CLI di OCR."
---

Puoi verificare quale testo può essere trovato in un'immagine senza eseguire un test utilizzando la procedura guidata CLI di OCR. Le uniche cose necessarie sono:

-   aver installato `@wdio/ocr-service` come dipendenza, vedi [Per Iniziare](./getting-started)
-   un'immagine che vuoi elaborare

Quindi esegui il seguente comando per avviare la procedura guidata

```sh
npx ocr-service
```

Questo avvierà una procedura guidata che ti accompagnerà attraverso i passaggi per selezionare un'immagine e utilizzare un haystack più la modalità avanzata. Vengono poste le seguenti domande

## How would you like to specify the file?

È possibile selezionare le seguenti opzioni

-   Use a "file explorer"
-   Type the file path manually

### Use a "file explorer"

La procedura guidata CLI offre l'opzione di utilizzare un "file explorer" per cercare file sul tuo sistema. Parte dalla cartella da cui richiami il comando. Dopo aver selezionato un'immagine (usa i tasti freccia e il tasto INVIO) passerai alla domanda successiva

### Type the file path manually

Si tratta di un percorso diretto a un file da qualche parte sul tuo computer locale

### Would you like to use a haystack?

Qui hai la possibilità di selezionare un'area che deve essere elaborata. Questo può velocizzare il processo o ridurre/restringere la quantità di testo che il motore OCR potrebbe trovare. Devi fornire i dati `x`, `y`, `width`, `height` in base alle seguenti domande:

-   Enter the x coordinate:
-   Enter the y coordinate:
-   Enter the width:
-   Enter the height:

## Do you want to use the advanced mode?

La modalità avanzata includerà funzionalità extra come:

-   l'impostazione del contrasto
-   altre funzionalità in arrivo in futuro

## Demo

Ecco una demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>