---
id: autowait
title: Attente automatique
description: "Comprenez comment WebdriverIO attend automatiquement que les éléments deviennent interactifs, quand attendre manuellement, et pourquoi les délais d'attente implicites sont déconseillés."
---

Lorsque vous utilisez une commande qui interagit directement avec un élément, WebdriverIO attend automatiquement que l'élément soit visible et interactif. Aucune attente manuelle n'est donc nécessaire lors de l'utilisation de ces commandes (pensez à click, setValue, etc.).
Un élément est considéré comme interactif lorsque les conditions de [isClickable](https://webdriver.io/docs/api/element/isClickable) sont remplies.

Bien que WebdriverIO attende automatiquement que les éléments deviennent interactifs, il existe de rares cas pour lesquels vous pourriez avoir besoin d'attendre manuellement. Pour ces rares cas, nous proposons des commandes telles que [`waitForDisplayed`](/docs/api/element/waitForDisplayed).


## Délais d'attente implicites (non recommandé)

Bien que nous ne recommandions pas leur utilisation, le protocole WebDriver propose des [délais d'attente implicites](https://w3c.github.io/webdriver/#timeouts) qui permettent de spécifier combien de temps le driver doit attendre qu'un élément apparaisse. Par défaut, ce délai est fixé à `0`, ce qui fait que le driver renvoie immédiatement une erreur `no such element` si un élément est introuvable sur la page. Augmenter ce délai à l'aide de [`setTimeout`](/docs/api/browser/setTimeout) ferait attendre le driver et augmenterait les chances que l'élément finisse par apparaître.

:::note

Pour en savoir plus sur les délais d'attente liés à WebDriver et aux frameworks, consultez le [guide des délais d'attente](/docs/timeouts)

:::