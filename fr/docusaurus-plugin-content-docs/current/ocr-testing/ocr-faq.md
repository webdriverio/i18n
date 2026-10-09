---
id: ocr-faq
title: Foire aux questions
description: "Trouvez des réponses aux questions courantes sur les tests OCR lents, le texte introuvable et la combinaison des commandes OCR avec les sélecteurs classiques."
---

## Mes tests sont très lents

Lorsque vous utilisez ce `@wdio/ocr-service`, ce n'est pas pour accélérer vos tests, mais parce que vous avez du mal à localiser des éléments dans votre application web/mobile et que vous souhaitez un moyen plus simple de les localiser. Et nous savons tous, je l'espère, que lorsque l'on veut quelque chose, on perd autre chose. **Mais....**, il existe un moyen de faire en sorte que le `@wdio/ocr-service` s'exécute plus rapidement que la normale. Plus d'informations à ce sujet sont disponibles [ici](./more-test-optimization).

## Puis-je utiliser les commandes de ce service avec les commandes/sélecteurs par défaut de WebdriverIO ?

Oui, vous pouvez combiner les commandes pour rendre votre script encore plus puissant ! Le conseil est d'utiliser autant que possible les commandes/sélecteurs par défaut de WebdriverIO et de n'utiliser ce service que lorsque vous ne parvenez pas à trouver un sélecteur unique, ou lorsque votre sélecteur deviendrait trop fragile.

## Mon texte n'est pas trouvé, comment est-ce possible ?

Tout d'abord, il est important de comprendre comment fonctionne le processus OCR dans ce module, veuillez donc lire [cette](./ocr-testing) page. Si vous ne trouvez toujours pas votre texte, vous pouvez essayer les choses suivantes.

### La zone de l'image est trop grande

Lorsque le module doit traiter une grande zone de la capture d'écran, il se peut qu'il ne trouve pas le texte. Vous pouvez fournir une zone plus petite en fournissant un haystack lorsque vous utilisez une commande. Veuillez consulter les [commandes](./ocr-click-on-text) pour savoir lesquelles prennent en charge un haystack.

### Le contraste entre le texte et l'arrière-plan n'est pas correct

Cela signifie que vous pourriez avoir un texte clair sur un fond blanc ou un texte foncé sur un fond sombre. Cela peut empêcher de trouver le texte. Dans les exemples ci-dessous, vous pouvez voir que le texte `Why WebdriverIO?` est blanc et entouré d'un bouton gris. Dans ce cas, le texte `Why WebdriverIO?` ne sera pas trouvé. En augmentant le contraste pour la commande concernée, le texte est trouvé et il est possible de cliquer dessus, voir la deuxième image.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Avec le contraste par défaut de 0.25, le texte n'est pas trouvé
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Pourquoi mon élément est-il cliqué mais le clavier de mes appareils mobiles n'apparaît jamais ?

Cela peut se produire sur certains champs de texte où le clic est jugé trop long et considéré comme un appui long. Vous pouvez utiliser l'option `clickDuration` sur [`ocrClickOnText`](./ocr-click-on-text) et [`ocrSetValue`](./ocr-set-value) pour y remédier. Voir [ici](./ocr-click-on-text#options).

## Ce module peut-il renvoyer plusieurs éléments comme WebdriverIO peut normalement le faire ?

Non, ce n'est actuellement pas possible. Si le module trouve plusieurs éléments correspondant au sélecteur fourni, il trouvera automatiquement l'élément ayant le score de correspondance le plus élevé.

## Puis-je automatiser entièrement mon application avec les commandes OCR fournies par ce service ?

Je ne l'ai jamais fait, mais en théorie, cela devrait être possible. N'hésitez pas à nous faire savoir si vous y parvenez ☺️.

## Je vois un fichier supplémentaire appelé `{languageCode}.traineddata` être ajouté, qu'est-ce que c'est ?

`{languageCode}.traineddata` est un fichier de données linguistiques utilisé par Tesseract. Il contient les données d'entraînement pour la langue sélectionnée, qui incluent les informations nécessaires pour que Tesseract reconnaisse efficacement les caractères et les mots anglais.

### Contenu de `{languageCode}.traineddata`

Le fichier contient généralement :

1. **Données du jeu de caractères :** Informations sur les caractères de la langue anglaise.
1. **Modèle linguistique :** Un modèle statistique de la façon dont les caractères forment des mots et les mots forment des phrases.
1. **Extracteurs de caractéristiques :** Données sur la façon d'extraire des caractéristiques des images pour la reconnaissance des caractères.
1. **Données d'entraînement :** Données issues de l'entraînement de Tesseract sur un large ensemble d'images de texte en anglais.

### Pourquoi le fichier `{languageCode}.traineddata` est-il important ?

1. **Reconnaissance de la langue :** Tesseract s'appuie sur ces fichiers de données entraînées pour reconnaître et traiter avec précision le texte dans une langue spécifique. Sans `{languageCode}.traineddata`, Tesseract ne serait pas en mesure de reconnaître le texte anglais.
1. **Performance :** La qualité et la précision de l'OCR sont directement liées à la qualité des données d'entraînement. L'utilisation du bon fichier de données entraînées garantit que le processus OCR est aussi précis que possible.
1. **Compatibilité :** S'assurer que le fichier `{languageCode}.traineddata` est inclus dans votre projet facilite la reproduction de l'environnement OCR sur différents systèmes ou sur les machines des membres de l'équipe.

### Versionnage de `{languageCode}.traineddata`

Il est recommandé d'inclure `{languageCode}.traineddata` dans votre système de gestion de versions pour les raisons suivantes :

1. **Cohérence :** Cela garantit que tous les membres de l'équipe ou tous les environnements de déploiement utilisent exactement la même version des données d'entraînement, ce qui permet d'obtenir des résultats OCR cohérents dans différents environnements.
1. **Reproductibilité :** Stocker ce fichier dans le système de gestion de versions facilite la reproduction des résultats lors de l'exécution du processus OCR à une date ultérieure ou sur une autre machine.
1. **Gestion des dépendances :** L'inclure dans le système de gestion de versions aide à gérer les dépendances et garantit que toute installation ou configuration d'environnement inclut les fichiers nécessaires au bon fonctionnement du projet.

## Existe-t-il un moyen simple de voir quel texte est trouvé sur mon écran sans exécuter de test ?

Oui, vous pouvez utiliser notre assistant CLI pour cela. La documentation est disponible [ici](./cli-wizard)