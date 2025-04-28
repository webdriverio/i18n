---
id: more-test-optimization
title: Tempo di esecuzione dei test
---

Per impostazione predefinita, questo modulo verificherà se hai un'installazione locale di Tesseract sulla tua macchina/nella tua pipeline. Se non hai un'installazione locale, utilizzerà automaticamente una versione [NodeJS](https://github.com/naptha/tesseract.js). Questo potrebbe causare alcuni rallentamenti perché l'elaborazione delle immagini sarà eseguita da Node.js. NodeJS non è il sistema migliore per eseguire elaborazioni pesanti.

**MA....**, ci sono modi per ottimizzare il tempo di esecuzione. Prendiamo il seguente script di test

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webbrowser.io");
        await browser.ocrClickOnText({
            text: "Search",
        });
        await browser.ocrSetValue({
            text: "docs",
            value: "specfileretries",
        });
        await browser.ocrWaitForTextDisplayed({
            text: "specFileRetries",
        });
    });
});
```

Quando lo esegui per la prima volta, potresti vedere i seguenti risultati in cui sono stati necessari 5,9 secondi per completare il test.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:52:53.405Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 126
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: d281dcdc43962b95835aea8f64cab6c7
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (5.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

## Ritagliare l'area di ricerca di uno schermo

Puoi ottimizzare il tempo di esecuzione fornendo un'area ritagliata su cui eseguire l'OCR.

Se modificassi lo script in questo modo:

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webdriver.io");
        await driver.ocrClickOnText({
            haystack: $(".DocSearch"),
            text: "Search",
        });
        await driver.ocrSetValue({
            haystack: $(".DocSearch-Form"),
            text: "docs",
            value: "specfileretries",
        });
        await driver.ocrWaitForTextDisplayed({
            haystack: $(".DocSearch-Dropdown"),
            text: "specFileRetries",
        });
    });
});
```

Allora vedrai un tempo di esecuzione diverso.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:56:55.326Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 124
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: c6cb1843535bda3ee3af07920ce232b8
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (4.8s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

:::tip Ritaglio delle immagini
Questo ha ridotto il tempo di esecuzione locale da **5,9** a **4,8 secondi**. Questa è una riduzione di quasi il **19%**. Immagina cosa può fare per uno script più grande con più dati.
:::

## Utilizzare un'installazione locale di Tesseract

Puoi accelerare il tuo tempo di esecuzione a meno di un minuto se hai un'installazione locale di Tesseract sulla tua macchina locale e/o nella tua pipeline (maggiori informazioni sull'installazione di Tesseract sul tuo sistema locale possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Installation.html)). Di seguito puoi trovare il tempo di esecuzione dello stesso script utilizzando un'installazione locale di Tesseract.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:59:11.620Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: 87f8c1e949e15a383b902e4d59b1f738
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (3.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:06
```

:::tip Installazione locale
Questo ha ridotto il tempo di esecuzione locale da **5,9** a **3,9 secondi**. Questa è una riduzione di quasi il **34%**. Immagina cosa può fare per uno script più grande con più dati.
:::