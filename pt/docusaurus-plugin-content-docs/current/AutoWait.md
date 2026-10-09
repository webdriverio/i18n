---
id: autowait
title: Espera Automática
description: "Entenda como o WebdriverIO espera automaticamente que os elementos se tornem interagíveis, quando esperar manualmente e por que timeouts implícitos são desencorajados."
---

Ao usar um comando que interage diretamente com um elemento, o WebdriverIO esperará automaticamente que o elemento esteja visível e interagível, de modo que nenhuma espera manual é necessária ao usar esses comandos (como click, setValue etc).
Um elemento é considerado interagível quando as condições para [isClickable](https://webdriver.io/docs/api/element/isClickable) são atendidas.

Embora o WebdriverIO espere automaticamente que os elementos se tornem interagíveis, há casos raros em que você pode precisar esperar manualmente. Para esses casos raros, oferecemos comandos como [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeouts implícitos (não recomendado)

Embora não recomendemos seu uso, o protocolo WebDriver oferece [timeouts implícitos](https://w3c.github.io/webdriver/#timeouts) que permitem especificar quanto tempo o driver deve esperar até que um elemento apareça. Por padrão, esse timeout é definido como `0` e, portanto, faz com que o driver retorne imediatamente um erro `no such element` caso um elemento não seja encontrado na página. Aumentar esse timeout usando o [`setTimeout`](/docs/api/browser/setTimeout) faria o driver esperar e aumentaria as chances de o elemento eventualmente aparecer.

:::note

Leia mais sobre timeouts relacionados ao WebDriver e ao framework no [guia de timeouts](/docs/timeouts)

:::