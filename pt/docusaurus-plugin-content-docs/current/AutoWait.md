---
id: autowait
title: Espera Automática
---

Quando usa um comando que interage diretamente com um elemento, o WebdriverIO espera automaticamente que o elemento esteja visível e interativo; não são necessárias esperas manuais ao utilizar os comandos (como click, setValue etc.).
Um elemento é considerado interativo quando as condições para [isClickable](https://webdriver.io/docs/api/element/isClickable) são atendidas.

Embora o WebdriverIO aguarde automaticamente que os elementos se tornem interativos, existem casos raros em que você pode precisar esperar manualmente. Para esses casos raros, oferecemos comandos como [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Timeouts implícitos (não recomendado)

Embora não recomendemos o uso, o protocolo WebDriver oferece [timeouts implícitos](https://w3c.github.io/webdriver/#timeouts) que permitem especificar quanto tempo o driver deve esperar para que um elemento apareça. Por padrão, esse timeout é definido como `0` e, portanto, faz com que o driver retorne imediatamente um erro `no such element` se um elemento não puder ser encontrado na página. Aumentar esse timeout usando [`setTimeout`](/docs/api/browser/setTimeout) faria o driver esperar e aumentaria as chances de o elemento eventualmente aparecer.

:::note

Leia mais sobre timeouts relacionados ao WebDriver e ao framework no [guia de timeouts](/docs/timeouts)

:::