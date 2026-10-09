---
id: ocr-testing
title: Tests OCR
description: "Localisez les éléments et interagissez avec eux grâce à leur texte visible sur les applications web et mobiles avec le service OCR lorsque les sélecteurs classiques ne suffisent pas."
---

Les tests automatisés sur les applications mobiles natives et les sites desktop peuvent être particulièrement difficiles lorsqu'il s'agit d'éléments dépourvus d'identifiants uniques. Les [sélecteurs WebdriverIO](https://webdriver.io/docs/selectors) standard ne vous aideront pas toujours. Entrez dans le monde du `@wdio/ocr-service`, un service puissant qui exploite l'OCR ([Reconnaissance Optique de Caractères](https://en.wikipedia.org/wiki/Optical_character_recognition)) pour rechercher des éléments à l'écran, les attendre et interagir avec eux en fonction de leur **texte visible**.

Les commandes personnalisées suivantes seront fournies et ajoutées à l'objet `browser/driver` afin que vous disposiez des bons outils pour faire votre travail.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Comment ça fonctionne

Ce service va

1. créer une capture d'écran de votre écran/appareil. (Si nécessaire, vous pouvez fournir une zone de recherche (haystack), qui peut être un élément ou un objet rectangle, pour cibler une zone spécifique. Consultez la documentation de chaque commande.)
1. optimiser le résultat pour l'OCR en convertissant la capture d'écran en noir et blanc avec un contraste élevé (le contraste élevé est nécessaire pour éviter beaucoup de bruit de fond dans l'image. Cela peut être personnalisé pour chaque commande.)
1. utiliser la [Reconnaissance Optique de Caractères](https://en.wikipedia.org/wiki/Optical_character_recognition) de [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) pour récupérer tout le texte de l'écran et mettre en évidence tout le texte trouvé sur une image. Il prend en charge plusieurs langues, que vous pouvez trouver [ici.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utiliser la logique floue de [Fuse.js](https://fusejs.io/) pour trouver des chaînes _approximativement égales_ à un motif donné (plutôt qu'exactement égales). Cela signifie par exemple que la valeur de recherche `Username` peut également trouver le texte `Usename` ou inversement.
1. fournir un assistant CLI (`npx ocr-service`) pour valider vos images et récupérer du texte via votre terminal

Un exemple des étapes 1, 2 et 3 est présenté dans cette image

![Process steps](/img/ocr/processing-steps.jpg)

Il fonctionne avec **ZÉRO** dépendance système (en dehors de celles qu'utilise WebdriverIO), mais si nécessaire, il peut également fonctionner avec une installation locale de [Tesseract](https://tesseract-ocr.github.io/tessdoc/), ce qui réduira considérablement le temps d'exécution ! (Consultez également la section [Optimisation de l'exécution des tests](#test-execution-optimization) pour savoir comment accélérer vos tests.)

Enthousiaste ? Commencez à l'utiliser dès aujourd'hui en suivant le guide [Premiers pas](./getting-started).

:::caution Important
Il existe diverses raisons pour lesquelles vous pourriez ne pas obtenir un résultat de bonne qualité avec Tesseract. L'une des principales raisons liées à votre application et à ce module pourrait être l'absence de distinction de couleur suffisante entre le texte à trouver et l'arrière-plan. Par exemple, un texte blanc sur un fond sombre peut être trouvé _facilement_, mais un texte clair sur un fond blanc ou un texte sombre sur un fond sombre sera difficilement détecté.

Consultez également [cette page](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) pour plus d'informations de la part de Tesseract.

N'oubliez pas non plus de lire la [FAQ](./ocr-faq).
:::