---
id: faq
title: FAQ
---

### Dois-je utiliser les méthodes `save(Screen/Element/FullPageScreen)` lorsque je veux exécuter `check(Screen/Element/FullPageScreen)` ?

Non, vous n'avez pas besoin de le faire. La méthode `check(Screen/Element/FullPageScreen)` le fera automatiquement pour vous.

### Mes tests visuels échouent avec une différence, comment puis-je mettre à jour ma référence ?

Vous pouvez mettre à jour les images de référence via la ligne de commande en ajoutant l'argument `--update-visual-baseline`. Cela va

-   automatiquement copier la capture d'écran actuelle et la placer dans le dossier de référence
-   s'il y a des différences, cela permettra au test de passer car la référence a été mise à jour

**Utilisation :**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Lors de l'exécution en mode info/debug, vous verrez les journaux suivants ajoutés

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### La largeur et la hauteur ne peuvent pas être négatives

Il est possible que l'erreur `Width and height cannot be negative` soit générée. Dans 9 cas sur 10, cela est lié à la création d'une image d'un élément qui n'est pas dans la vue. Veuillez vous assurer que l'élément est toujours dans la vue avant d'essayer de créer une image de cet élément.

### L'installation de Canvas sur Windows a échoué avec des journaux Node-Gyp

Si vous rencontrez des problèmes avec l'installation de Canvas sur Windows en raison d'erreurs Node-Gyp, veuillez noter que cela s'applique uniquement à la version 4 et inférieure. Pour éviter ces problèmes, envisagez de passer à la version 5 ou supérieure, qui n'a pas ces dépendances et utilise [Jimp](https://github.com/jimp-dev/jimp) pour le traitement d'images.

Si vous devez toujours résoudre les problèmes avec la version 4, veuillez consulter :

-   la section Node Canvas dans le guide [Getting Started](/docs/visual-testing#system-requirements)
-   [cet article](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) pour résoudre les problèmes de Node-Gyp sur Windows. (Merci à [IgorSasovets](https://github.com/IgorSasovets))