---
id: cli-wizard
title: Assistant CLI
---

Vous pouvez valider quel texte peut être trouvé dans une image sans exécuter un test en utilisant l'Assistant CLI OCR. Les seules choses nécessaires sont :

-   vous avez installé le `@wdio/ocr-service` comme dépendance, voir [Premiers pas](./getting-started)
-   une image que vous souhaitez traiter

Ensuite, exécutez la commande suivante pour démarrer l'assistant

```sh
npx ocr-service
```

Cela lancera un assistant qui vous guidera à travers les étapes pour sélectionner une image et utiliser une zone de recherche ainsi que le mode avancé. Les questions suivantes sont posées

## Comment souhaitez-vous spécifier le fichier ?

Les options suivantes peuvent être sélectionnées

-   Utiliser un "explorateur de fichiers"
-   Saisir le chemin du fichier manuellement

### Utiliser un "explorateur de fichiers"

L'assistant CLI propose une option pour utiliser un "explorateur de fichiers" afin de rechercher des fichiers sur votre système. Il commence à partir du dossier où vous appelez la commande. Après avoir sélectionné une image (utilisez les touches fléchées et la touche ENTRÉE), vous passerez à la question suivante

### Saisir le chemin du fichier manuellement

Il s'agit d'un chemin direct vers un fichier quelque part sur votre machine locale

### Souhaitez-vous utiliser une zone de recherche ?

Ici, vous avez la possibilité de sélectionner une zone qui doit être traitée. Cela peut accélérer le processus ou réduire/limiter la quantité de texte que le moteur OCR pourrait trouver. Vous devez fournir les données `x`, `y`, `width`, `height` en fonction des questions suivantes :

-   Entrez la coordonnée x :
-   Entrez la coordonnée y :
-   Entrez la largeur :
-   Entrez la hauteur :

## Voulez-vous utiliser le mode avancé ?

Le mode avancé comprendra des fonctionnalités supplémentaires comme :

-   réglage du contraste
-   d'autres fonctionnalités à venir dans le futur

## Démo

Voici une démo

<video controls width="100%">
  <source src="/img/ocr/ocr-service-cli.mp4" />
</video>