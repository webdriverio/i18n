---
id: ocr-testing
title: Tests OCR
---

Les tests automatisés sur les applications mobiles natives et les sites de bureau peuvent être particulièrement difficiles lorsqu'il s'agit d'éléments sans identifiants uniques. Les [sélecteurs WebdriverIO](https://webdriver.io/docs/selectors) standard ne vous aideront pas toujours. Entrez dans le monde du `@wdio/ocr-service`, un service puissant qui utilise l'OCR ([Reconnaissance Optique de Caractères](https://en.wikipedia.org/wiki/Optical_character_recognition)) pour rechercher, attendre et interagir avec des éléments à l'écran en fonction de leur **texte visible**.

Les commandes personnalisées suivantes seront fournies et ajoutées à l'objet `browser/driver` afin que vous disposiez des bons outils pour faire votre travail.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Comment ça fonctionne

Ce service va

1. créer une capture d'écran de votre écran/appareil. (Si nécessaire, vous pouvez fournir une zone de recherche, qui peut être un élément ou un objet rectangle, pour cibler une zone spécifique. Consultez la documentation de chaque commande.)
1. optimiser le résultat pour l'OCR en transformant la capture d'écran en noir/blanc avec un contraste élevé (le contraste élevé est nécessaire pour éviter beaucoup de bruit de fond dans l'image. Cela peut être personnalisé pour chaque commande.)
1. utiliser la [Reconnaissance Optique de Caractères](https://en.wikipedia.org/wiki/Optical_character_recognition) de [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) pour obtenir tout le texte de l'écran et mettre en évidence tout le texte trouvé sur une image. Il peut prendre en charge plusieurs langues qui peuvent être trouvées [ici.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utiliser la logique floue de [Fuse.js](https://fusejs.io/) pour trouver des chaînes qui sont _approximativement égales_ à un modèle donné (plutôt qu'exactement). Cela signifie par exemple que la valeur de recherche `Username` peut également trouver le texte `Usename` ou vice versa.
1. Fournir un assistant en ligne de commande (`npx ocr-service`) pour valider vos images et récupérer du texte via votre terminal

Un exemple des étapes 1, 2 et 3 peut être trouvé dans cette image

![Étapes du processus](/img/ocr/processing-steps.jpg)

Il fonctionne avec **ZÉRO** dépendances système (en dehors de ce que WebdriverIO utilise), mais si nécessaire, il peut également fonctionner avec une installation locale de [Tesseract](https://tesseract-ocr.github.io/tessdoc/) qui réduira considérablement le temps d'exécution ! (Voir aussi l'[Optimisation de l'exécution des tests](#test-execution-optimization) pour savoir comment accélérer vos tests.)

Enthousiaste ? Commencez à l'utiliser dès aujourd'hui en suivant le guide [Pour commencer](./getting-started).

:::caution Important
Il existe diverses raisons pour lesquelles vous pourriez ne pas obtenir une sortie de bonne qualité de Tesseract. L'une des principales raisons qui pourrait être liée à votre application et à ce module pourrait être le fait qu'il n'y a pas de distinction de couleur appropriée entre le texte qui doit être trouvé et l'arrière-plan. Par exemple, le texte blanc sur un fond sombre peut _facilement_ être trouvé, mais le texte clair sur un fond blanc ou le texte foncé sur un fond foncé peut difficilement être trouvé.

Voir aussi [cette page](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) pour plus d'informations de Tesseract.

N'oubliez pas non plus de lire la [FAQ](./ocr-faq).
:::