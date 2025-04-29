---
id: wdio-performancetotal-service
title: Service PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---


> wdio-performancetotal-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Note:<br/>
Pour WebdriverIO v9 utilisez la version 4.x.x.<br/>
Pour WebdriverIO v8 utilisez la version 3.x.x.<br/>
Pour WebdriverIO v7 utilisez la version 2.x.x.<br/>
Pour WebdriverIO v6 utilisez la version 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Avec ce plugin pour [webdriver.io](https://webdriver.io/), vous pouvez facilement ajouter une analyse de performance à n'importe quel flux dans vos tests, qu'il s'agisse d'une interface utilisateur pure, d'une API ou d'une combinaison des deux. Ce plugin offre un moyen simple et efficace de mesurer les temps de réponse de diverses procédures et d'identifier les goulets d'étranglement potentiels dans votre application. Avec ces informations, vous pouvez prendre des décisions éclairées concernant les optimisations et les améliorations pour améliorer la performance globale de votre application.

## Installation

Le moyen le plus simple d'installer ce module en tant que dépendance de développement est d'utiliser la commande suivante :

```
npm install wdio-performancetotal-service --save-dev
```

## Utilisation

Ajoutez wdio-performancetotal-service à votre `wdio.conf.js` :

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...ou avec les options de service :

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // The options (with default values)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Options

#### __disableAppendToExistingFile__

Lorsque défini à `true`, les nouvelles exécutions de test commenceront à neuf et écraseront toutes les données de performance existantes.
Lorsque défini à `false` (par défaut), les données de performance seront ajoutées aux données existantes.

> **⚠️ Attention :**
>
> Cette action supprimera définitivement toutes vos données de performance. Assurez-vous d'avoir une sauvegarde avant de continuer.

#### __performanceResultsFileName__

Vous pouvez remplacer le nom de fichier de résultats par défaut (`performance-results`).
Un fichier de résultats nouvellement créé écrase normalement l'ancien fichier. Si vous souhaitez conserver les anciens fichiers, il est recommandé d'ajouter un horodatage au nom du fichier. Par exemple :

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

La valeur par défaut est `false`. Lorsque la valeur est définie à `true`, l'analyse de performance des tests échoués sera exclue.

#### __recentDays__

La valeur par défaut est `0` (sans limite). Pour définir le nombre de jours à prendre en compte pour l'analyse de performance, définissez le nombre de jours. Les jours partiels sont également pris en charge (par exemple `recentDays: 0.5`)

#### __performanceResultsDirectory__

Vous pouvez remplacer le chemin par défaut du répertoire des résultats dans le répertoire racine du projet.
Par exemple :

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

La valeur par défaut est `false`. Si `true`, les données de performance seront également analysées par type de navigateur.


### Utilisation dans les tests

Importez simplement __performancetotal__ où vous en avez besoin, que ce soit dans votre fichier de test ou dans n'importe quelle autre classe. Cet objet fournit des méthodes pour mesurer les données de performance dans vos tests, y compris sampleStart et sampleEnd pour démarrer et terminer les mesures de performance.
Voici un exemple de la façon dont vous pourriez utiliser l'objet performancetotal pour mesurer la performance de démarrage de deux sites web :

```typescript
// This test case measures the startup performance of Github and SourceForge using the performancetotal object.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Start a new performance measurement for Github
    performancetotal.sampleStart("GH-Startup");

    // Navigate to Github
    browser.url("https://github.com/");

    // End the Github measurement and save the results
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Start a new performance measurement for SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigate to SourceForge
    await browser.url("https://sourceforge.net/");

    // End the SourceForge measurement and save the results
    performancetotal.sampleEnd("SF-Startup");
});

```

Vous pouvez récupérer le temps pris pour un seul échantillon de performance en appelant performancetotal.getSampleTime(sampleName) dans votre test. Cela vous permet de vérifier la performance d'une section spécifique du code et de vous assurer qu'elle répond à vos attentes.

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Obtenir les résultats

Lorsque tous les tests sont terminés, un nouveau répertoire de résultats est créé dans le dossier racine de votre projet (le nom de répertoire par défaut est performance-results). À l'intérieur de ce répertoire, deux fichiers sont créés : performance-results.json et performance-results.csv. Ces fichiers contiennent des données analysées pour chaque échantillon, y compris le temps moyen, l'erreur standard de la moyenne (SEM), le nombre d'échantillons, la valeur minimale, la valeur maximale, l'heure la plus ancienne et l'heure la plus récente. Vous pouvez utiliser ces données pour identifier toute régression ou amélioration de performance au fil du temps.

### Analyser les données de performance en masse

Pour analyser les données de performance existantes en masse sans générer de nouveaux tests, il est recommandé d'utiliser l'[outil __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Support Typescript

Typescript est pris en charge pour ce plugin.

## Support

Pour le support et les suggestions, n'hésitez pas à me contacter à [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).