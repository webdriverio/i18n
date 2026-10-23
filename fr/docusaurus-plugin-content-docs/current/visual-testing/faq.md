---
id: faq
title: FAQ
description: "Trouvez des réponses aux questions courantes sur les tests visuels, comme la mise à jour des images de référence, la correction des erreurs d'installation de canvas et la mise à niveau vers la v10."
---

### Dois-je utiliser les méthodes `save(Screen/Element/FullPageScreen)` lorsque je veux exécuter `check(Screen/Element/FullPageScreen)` ?

Non, vous n'avez pas besoin de le faire. La méthode `check(Screen/Element/FullPageScreen)` le fera automatiquement pour vous.

### Mes tests visuels échouent avec une différence, comment puis-je mettre à jour mon image de référence ?

Vous pouvez mettre à jour les images de référence via la ligne de commande en ajoutant l'argument `--update-visual-baseline`. Cela va

-   copier automatiquement la capture d'écran réellement prise et la placer dans le dossier de référence
-   en cas de différences, laisser le test réussir car l'image de référence a été mise à jour

**Utilisation :**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Lors de l'exécution en mode de logs info/debug, vous verrez les logs suivants ajoutés

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

Il se peut que l'erreur `Width and height cannot be negative` soit levée. 9 fois sur 10, cela est lié à la création d'une image d'un élément qui n'est pas visible à l'écran. Assurez-vous toujours que l'élément est visible à l'écran avant d'essayer de créer une image de cet élément.

### L'installation de Canvas sur Windows a échoué avec des logs Node-Gyp

Si vous rencontrez des problèmes lors de l'installation de Canvas sur Windows en raison d'erreurs Node-Gyp, veuillez noter que cela ne concerne que la version 4 et les versions antérieures. Pour éviter ces problèmes, envisagez de passer à la version 5 ou supérieure, qui ne comporte pas ces dépendances. Les versions 5 à 9 utilisaient [Jimp](https://github.com/jimp-dev/jimp) pour le traitement des images ; la version 10 et les suivantes utilisent [fast-png](https://github.com/image-js/fast-png) et [Pixelmatch](https://github.com/mapbox/pixelmatch), sans aucune dépendance native.

Si vous devez tout de même résoudre les problèmes avec la version 4, veuillez consulter :

-   la section Node Canvas du guide [Premiers pas](/docs/visual-testing#system-requirements)
-   [cet article](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) pour corriger les problèmes Node-Gyp sous Windows. (Merci à [IgorSasovets](https://github.com/IgorSasovets))

### J'ai effectué la mise à niveau vers la v11, pourquoi un pourcentage de différence a-t-il changé ?

Dans la v11, le moteur de comparaison est pixelmatch 8, qui mesure les différences de couleur dans l'espace colorimétrique OKLab avec la distance HyAB au lieu de YIQ. L'échelle du seuil (`0` à `1`) et les préréglages `ignore*` n'ont pas changé, mais le nombre de pixels différents peut varier légèrement pour les mêmes images (environ −3 % à +3 % sur des captures d'écran réelles). Si une vérification dépend d'un pourcentage de différence exact ou d'une tolérance stricte, vérifiez-la à nouveau et ne mettez à jour l'image de référence avec `--update-visual-baseline` que lorsque le nouveau résultat est correct. Certaines corrections peuvent également modifier une image de référence une seule fois, par exemple les captures d'écran iOS d'éléments plus grands que la fenêtre d'affichage, qui ne comportent plus de zone noire. Consultez le [guide de migration v11](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md).

### J'ai effectué la mise à niveau vers la v10, pourquoi mes tests visuels échouent-ils ?

Le moteur de comparaison est passé de ResembleJS à [Pixelmatch](https://github.com/mapbox/pixelmatch) dans la v10. Pixelmatch utilise un modèle de couleur perceptuel (YIQ) au lieu du RGB brut, de sorte que les pourcentages de différence diffèrent de ceux de la v9. Vos tests ne sont pas cassés ; les images de référence doivent simplement être régénérées une fois. Exécutez vos tests avec `--update-visual-baseline` pour accepter les nouvelles valeurs, ou supprimez votre dossier de référence et laissez `autoSaveBaseline` le recréer.