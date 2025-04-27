---
id: file-download
title: Téléchargement de fichiers
---

Lors de l'automatisation des téléchargements de fichiers dans les tests web, il est essentiel de les gérer de manière cohérente sur différents navigateurs pour assurer une exécution fiable des tests.

Nous fournissons ici les meilleures pratiques pour les téléchargements de fichiers et montrons comment configurer les répertoires de téléchargement pour **Google Chrome**, **Mozilla Firefox** et **Microsoft Edge**.

## Chemins de téléchargement

**Coder en dur** les chemins de téléchargement dans les scripts de test peut entraîner des problèmes de maintenance et de portabilité. Utilisez des **chemins relatifs** pour les répertoires de téléchargement afin d'assurer la portabilité et la compatibilité entre différents environnements.

```javascript
// 👎
// Chemin de téléchargement codé en dur
const downloadPath = '/path/to/downloads';

// 👍
// Chemin de téléchargement relatif
const downloadPath = path.join(__dirname, 'downloads');
```

## Stratégies d'attente

Ne pas implémenter de stratégies d'attente appropriées peut entraîner des conditions de course ou des tests peu fiables, en particulier pour l'achèvement des téléchargements. Implémentez des stratégies d'attente **explicites** pour attendre que les téléchargements de fichiers soient terminés, assurant ainsi la synchronisation entre les étapes de test.

```javascript
// 👎
// Pas d'attente explicite pour l'achèvement du téléchargement
await browser.pause(5000);

// 👍
// Attendre l'achèvement du téléchargement de fichier
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configuration des répertoires de téléchargement

Pour remplacer le comportement de téléchargement de fichiers pour **Google Chrome**, **Mozilla Firefox** et **Microsoft Edge**, fournissez le répertoire de téléchargement dans les capacités WebDriverIO :

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

Pour un exemple d'implémentation, consultez la [Recette de comportement de téléchargement de test WebdriverIO](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configuration des téléchargements pour les navigateurs Chromium

Pour changer le chemin de téléchargement pour les navigateurs __basés sur Chromium__ (comme Chrome, Edge, Brave, etc.) en utilisant la méthode `getPuppeteer` de WebDriverIO pour accéder à Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Initier une session CDP :
const cdpSession = await page.target().createCDPSession();
// Définir le chemin de téléchargement :
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestion de téléchargements multiples

Lorsqu'il s'agit de scénarios impliquant plusieurs téléchargements de fichiers, il est essentiel de mettre en œuvre des stratégies pour gérer et valider efficacement chaque téléchargement. Considérez les approches suivantes :

__Gestion séquentielle des téléchargements :__ Téléchargez les fichiers un par un et vérifiez chaque téléchargement avant d'en lancer un autre pour assurer une exécution ordonnée et une validation précise.

__Gestion parallèle des téléchargements :__ Utilisez des techniques de programmation asynchrone pour lancer plusieurs téléchargements de fichiers simultanément, optimisant ainsi le temps d'exécution des tests. Implémentez des mécanismes de validation robustes pour vérifier tous les téléchargements une fois terminés.

## Considérations de compatibilité multi-navigateurs

Bien que WebDriverIO fournisse une interface unifiée pour l'automatisation des navigateurs, il est essentiel de tenir compte des variations dans le comportement et les capacités des navigateurs. Envisagez de tester votre fonctionnalité de téléchargement de fichiers sur différents navigateurs pour assurer la compatibilité et la cohérence.

__Configurations spécifiques aux navigateurs :__ Ajustez les paramètres de chemin de téléchargement et les stratégies d'attente pour tenir compte des différences de comportement et de préférences des navigateurs entre Chrome, Firefox, Edge et autres navigateurs pris en charge.

__Compatibilité des versions de navigateur :__ Mettez régulièrement à jour vos versions de WebDriverIO et de navigateur pour tirer parti des dernières fonctionnalités et améliorations tout en assurant la compatibilité avec votre suite de tests existante.