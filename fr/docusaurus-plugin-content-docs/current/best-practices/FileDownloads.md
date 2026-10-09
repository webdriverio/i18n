---
id: file-download
title: Téléchargement de fichiers
description: "Configurez les répertoires de téléchargement pour Chrome, Firefox et Edge, attendez la fin des téléchargements et vérifiez les fichiers téléchargés sur différents navigateurs."
---

Lors de l'automatisation des téléchargements de fichiers dans les tests web, il est essentiel de les gérer de manière cohérente sur les différents navigateurs afin de garantir une exécution fiable des tests.

Nous présentons ici les bonnes pratiques pour les téléchargements de fichiers et montrons comment configurer les répertoires de téléchargement pour **Google Chrome**, **Mozilla Firefox** et **Microsoft Edge**.

## Chemins de téléchargement

**Coder en dur** les chemins de téléchargement dans les scripts de test peut entraîner des problèmes de maintenance et de portabilité. Utilisez des **chemins relatifs** pour les répertoires de téléchargement afin de garantir la portabilité et la compatibilité entre différents environnements.

```javascript
// 👎
// Chemin de téléchargement codé en dur
const downloadPath = '/path/to/downloads';

// 👍
// Chemin de téléchargement relatif
const downloadPath = path.join(__dirname, 'downloads');
```

## Stratégies d'attente

L'absence de stratégies d'attente appropriées peut entraîner des situations de concurrence (race conditions) ou des tests peu fiables, en particulier pour la fin des téléchargements. Mettez en œuvre des stratégies d'attente **explicites** pour attendre la fin des téléchargements de fichiers, garantissant ainsi la synchronisation entre les étapes de test.

```javascript
// 👎
// Pas d'attente explicite de la fin du téléchargement
await browser.pause(5000);

// 👍
// Attendre la fin du téléchargement du fichier
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configuration des répertoires de téléchargement

Pour modifier le comportement de téléchargement de fichiers pour **Google Chrome**, **Mozilla Firefox** et **Microsoft Edge**, indiquez le répertoire de téléchargement dans les capabilities de WebDriverIO :

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Pour un exemple d'implémentation, consultez la [recette WebdriverIO Test Download Behavior](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configuration des téléchargements pour les navigateurs Chromium

Pour modifier le chemin de téléchargement des navigateurs __basés sur Chromium__ (tels que Chrome, Edge, Brave, etc.), utilisez la méthode `getPuppeteer` de WebDriverIO pour accéder aux Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initier une session CDP :
const cdpSession = await page.target().createCDPSession();
// Définir le chemin de téléchargement :
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestion de plusieurs téléchargements de fichiers

Dans les scénarios impliquant plusieurs téléchargements de fichiers, il est essentiel de mettre en œuvre des stratégies pour gérer et valider efficacement chaque téléchargement. Envisagez les approches suivantes :

__Gestion séquentielle des téléchargements :__ Téléchargez les fichiers un par un et vérifiez chaque téléchargement avant de lancer le suivant afin de garantir une exécution ordonnée et une validation précise.

__Gestion parallèle des téléchargements :__ Utilisez des techniques de programmation asynchrone pour lancer plusieurs téléchargements de fichiers simultanément, optimisant ainsi le temps d'exécution des tests. Mettez en place des mécanismes de validation robustes pour vérifier tous les téléchargements une fois terminés.

## Considérations sur la compatibilité multi-navigateurs

Bien que WebDriverIO fournisse une interface unifiée pour l'automatisation des navigateurs, il est essentiel de tenir compte des variations de comportement et de capacités entre les navigateurs. Pensez à tester votre fonctionnalité de téléchargement de fichiers sur différents navigateurs afin de garantir la compatibilité et la cohérence.

__Configurations spécifiques aux navigateurs :__ Ajustez les paramètres de chemin de téléchargement et les stratégies d'attente pour tenir compte des différences de comportement et de préférences entre Chrome, Firefox, Edge et les autres navigateurs pris en charge.

__Compatibilité des versions de navigateurs :__ Mettez régulièrement à jour vos versions de WebDriverIO et des navigateurs afin de profiter des dernières fonctionnalités et améliorations, tout en garantissant la compatibilité avec votre suite de tests existante.