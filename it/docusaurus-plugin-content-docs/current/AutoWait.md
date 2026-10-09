---
id: autowait
title: Attesa automatica
description: "Scopri come WebdriverIO attende automaticamente che gli elementi diventino interagibili, quando è necessario attendere manualmente e perché i timeout impliciti sono sconsigliati."
---

Quando si utilizza un comando che interagisce direttamente con un elemento, WebdriverIO attenderà automaticamente che l'elemento sia visibile e interagibile; non sono necessarie attese manuali quando si utilizzano questi comandi (ad esempio click, setValue ecc.).
Un elemento è considerato interagibile quando sono soddisfatte le condizioni di [isClickable](https://webdriver.io/docs/api/element/isClickable).

Sebbene WebdriverIO attenda automaticamente che gli elementi diventino interagibili, ci sono rari casi in cui potrebbe essere necessario attendere manualmente. Per questi rari casi offriamo comandi come [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeout impliciti (non raccomandati)

Anche se non ne raccomandiamo l'uso, il protocollo WebDriver offre dei [timeout impliciti](https://w3c.github.io/webdriver/#timeouts) che consentono di specificare per quanto tempo il driver deve attendere che un elemento compaia. Per impostazione predefinita questo timeout è impostato a `0`, pertanto il driver restituisce immediatamente un errore `no such element` se un elemento non viene trovato nella pagina. Aumentare questo timeout utilizzando [`setTimeout`](/docs/api/browser/setTimeout) farebbe attendere il driver e aumenterebbe le probabilità che l'elemento alla fine compaia.

:::note

Leggi di più sui timeout relativi a WebDriver e ai framework nella [guida ai timeout](/docs/timeouts)

:::