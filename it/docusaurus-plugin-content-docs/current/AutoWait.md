---
id: autowait
title: Auto-attesa
---

Quando si utilizza un comando che interagisce direttamente con un elemento, WebdriverIO attenderà automaticamente che l'elemento sia visibile e interattivo, non sono necessarie attese manuali quando si utilizzano i comandi (come click, setValue ecc.).
Un elemento è considerato interattivo quando sono soddisfatte le condizioni per [isClickable](https://webdriver.io/docs/api/element/isClickable).

Anche se WebdriverIO attende automaticamente che gli elementi diventino interattivi, ci sono rari casi in cui potrebbe essere necessario attendere manualmente. Per questi rari casi offriamo comandi come [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeout impliciti (non raccomandati)

Anche se non lo raccomandiamo, il protocollo WebDriver offre [timeout impliciti](https://w3c.github.io/webdriver/#timeouts) che permettono di specificare quanto a lungo il driver deve attendere che un elemento appaia. Per impostazione predefinita, questo timeout è impostato su `0` e quindi fa sì che il driver restituisca immediatamente un errore `no such element` se un elemento non può essere trovato nella pagina. Aumentare questo timeout utilizzando [`setTimeout`](/docs/api/browser/setTimeout) farebbe attendere il driver e aumenterebbe le possibilità che l'elemento appaia alla fine.

:::note

Leggi di più sui timeout relativi a WebDriver e framework nella [guida ai timeout](/docs/timeouts)

:::