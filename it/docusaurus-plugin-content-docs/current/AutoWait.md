---
id: autowait
title: Attesa automatica
---

Quando si utilizza un comando che interagisce direttamente con un elemento, WebdriverIO attenderà automaticamente che l'elemento sia visibile e interagibile, non sono necessarie attese manuali quando si utilizzano i comandi (come click, setValue ecc.).
Un elemento è considerato interagibile quando sono soddisfatte le condizioni per [isClickable](https://webdriver.io/docs/api/element/isClickable).

Mentre WebdriverIO attende automaticamente che gli elementi diventino interagibili, ci sono rari casi in cui potrebbe essere necessario attendere manualmente. Per questi rari casi offriamo comandi come [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeout impliciti (non consigliati)

Sebbene non lo consigliamo, il protocollo WebDriver offre [timeout impliciti](https://w3c.github.io/webdriver/#timeouts) che permettono di specificare per quanto tempo il driver deve attendere che un elemento appaia. Per impostazione predefinita, questo timeout è impostato a `0` e quindi fa sì che il driver restituisca immediatamente un errore `no such element` se un elemento non può essere trovato nella pagina. Aumentare questo timeout utilizzando [`setTimeout`](/docs/api/browser/setTimeout) farebbe attendere il driver e aumenterebbe le possibilità che l'elemento appaia eventualmente.

:::note

Leggi di più sui timeout relativi a WebDriver e al framework nella [guida ai timeout](/docs/timeouts)

:::