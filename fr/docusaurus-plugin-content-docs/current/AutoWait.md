---
id: autowait
title: Attente automatique
---

Lors de l'utilisation d'une commande qui interagit directement avec un élément, WebdriverIO attendra automatiquement que l'élément soit visible et interactif, aucune attente manuelle n'est nécessaire lors de l'utilisation des commandes (comme click, setValue, etc.).
Un élément est considéré comme interactif lorsque les conditions pour [isClickable](https://webdriver.io/docs/api/element/isClickable) sont remplies.

Bien que WebdriverIO attende automatiquement que les éléments deviennent interactifs, il existe des cas rares pour lesquels vous pourriez avoir besoin d'attendre manuellement. Pour ces cas rares, nous proposons des commandes telles que [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Délais d'attente implicites (non recommandés)

Bien que nous ne le recommandions pas, le protocole WebDriver offre des [délais d'attente implicites](https://w3c.github.io/webdriver/#timeouts) qui permettent de spécifier combien de temps le pilote est censé attendre qu'un élément apparaisse. Par défaut, ce délai est défini sur `0` et fait donc que le pilote renvoie immédiatement une erreur `no such element` si un élément n'a pas pu être trouvé sur la page. Augmenter ce délai en utilisant [`setTimeout`](/docs/api/browser/setTimeout) ferait attendre le pilote et augmenterait les chances que l'élément apparaisse éventuellement.

:::note

En savoir plus sur les délais d'attente liés à WebDriver et au framework dans le [guide des délais d'attente](/docs/timeouts)

:::