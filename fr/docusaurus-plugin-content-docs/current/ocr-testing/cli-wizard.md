---
id: cli-wizard
title: Assistant CLI
description: "Vérifiez quel texte le service OCR peut trouver dans une image sans exécuter de test, en utilisant l'assistant CLI OCR."
---

Vous pouvez vérifier quel texte peut être trouvé dans une image sans exécuter de test en utilisant l'assistant CLI OCR. Les seules choses nécessaires sont :

-   avoir installé `@wdio/ocr-service` en tant que dépendance, voir [Premiers pas](./getting-started)
-   une image que vous souhaitez traiter

Exécutez ensuite la commande suivante pour démarrer l'assistant

```sh
npx ocr-service
```

Cela démarrera un assistant qui vous guidera à travers les étapes pour sélectionner une image et utiliser une zone de recherche (haystack) ainsi que le mode avancé. Les questions suivantes sont posées

## Comment souhaitez-vous spécifier le fichier ?

Les options suivantes peuvent être sélectionnées

-   Utiliser un « explorateur de fichiers »
-   Saisir le chemin du fichier manuellement

### Utiliser un « explorateur de fichiers »

L'assistant CLI offre la possibilité d'utiliser un « explorateur de fichiers » pour rechercher des fichiers sur votre système. Il démarre à partir du dossier depuis lequel vous exécutez la commande. Après avoir sélectionné une image (utilisez les touches fléchées et la touche ENTRÉE), vous passerez à la question suivante

### Saisir le chemin du fichier manuellement

Il s'agit d'un chemin direct vers un fichier situé quelque part sur votre machine locale

### Souhaitez-vous utiliser une zone de recherche (haystack) ?

Vous avez ici la possibilité de sélectionner une zone à traiter. Cela peut accélérer le processus ou réduire/restreindre la quantité de texte que le moteur OCR pourrait trouver. Vous devez fournir les données `x`, `y`, `width`, `height` en répondant aux questions suivantes :

-   Entrez la coordonnée x :
-   Entrez la coordonnée y :
-   Entrez la largeur :
-   Entrez la hauteur :

## Voulez-vous utiliser le mode avancé ?

Le mode avancé comprendra des fonctionnalités supplémentaires telles que :

-   le réglage du contraste
-   d'autres à venir

## Démo

Voici une démo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>