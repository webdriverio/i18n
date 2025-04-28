---
id: cli-wizard
title: Wizard CLI
---

Puoi validare quale testo può essere trovato in un'immagine senza eseguire un test utilizzando il Wizard CLI OCR. Le uniche cose necessarie sono:

-   aver installato `@wdio/ocr-service` come dipendenza, vedi [Guida Introduttiva](./getting-started)
-   un'immagine che vuoi elaborare

Quindi esegui il seguente comando per avviare il wizard

```sh
npx ocr-service
```

Questo avvierà un wizard che ti guiderà attraverso i passaggi per selezionare un'immagine e utilizzare un haystack più la modalità avanzata. Vengono poste le seguenti domande

## Come vorresti specificare il file?

Possono essere selezionate le seguenti opzioni

-   Usa un "esploratore di file"
-   Digita manualmente il percorso del file

### Usa un "esploratore di file"

Il wizard CLI offre un'opzione per utilizzare un "esploratore di file" per cercare file sul tuo sistema. Inizia dalla cartella in cui chiami il comando. Dopo aver selezionato un'immagine (usa i tasti freccia e il tasto INVIO) procederai alla domanda successiva

### Digita manualmente il percorso del file

Questo è un percorso diretto a un file da qualche parte sulla tua macchina locale

### Vorresti utilizzare un haystack?

Qui hai l'opzione di selezionare un'area che deve essere elaborata. Questo può velocizzare il processo o ridurre/restringere la quantità di testo che il motore OCR potrebbe trovare. Devi fornire i dati `x`, `y`, `width`, `height` in base alle seguenti domande:

-   Inserisci la coordinata x:
-   Inserisci la coordinata y:
-   Inserisci la larghezza:
-   Inserisci l'altezza:

## Vuoi utilizzare la modalità avanzata?

La modalità avanzata includerà funzionalità extra come:

-   impostazione del contrasto
-   altre funzionalità in arrivo in futuro

## Demo

Ecco una demo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>