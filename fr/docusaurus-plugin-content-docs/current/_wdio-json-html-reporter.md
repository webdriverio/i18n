---
id: wdio-json-html-reporter
title: Rapporteur JSON HTML Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---


> wdio-json-html-reporter est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Ceci est un rapporteur personnalisé WebDriverIO qui génère des rapports JSON détaillés pendant l'exécution des tests et fournit un générateur de rapports HTML portable pour visualiser vos résultats de test. Il enregistre les horodatages, les métadonnées d'exécution, et peut capturer des captures d'écran à la demande. Le package suit la convention WebDriverIO pour les rapporteurs et est publié comme un package npm sous le nom `wdio-json-html-reporter`.

## Table des matières

- [Aperçu](#overview)
- [Fonctionnalités](#features)
- [Installation](#installation)
  - [1. Installer le package](#1-install-the-package)
  - [2. Vérifier l'installation](#2-verify-installation)
  - [3. Mettre à jour la configuration WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Exécuter vos tests](#4-run-your-tests)
- [Utilisation en ligne de commande](#cli-usage)
- [Option d'historique et génération d'historique agrégé](#history-option-and-aggregated-history-generation)
- [Captures d'écran](#screenshots)

## Overview

WDIO JSON HTML REPORTER fournit deux composants principaux :

- **JSONReporter** : Un rapporteur personnalisé qui étend l'interface de rapporteur WebDriverIO pour collecter des événements de test et générer un fichier JSON avec des métadonnées, des résultats de test et (en option) des captures d'écran.
- **HTMLReportGenerator** : Un utilitaire pour convertir plusieurs fichiers de rapport JSON en un rapport HTML complet avec des graphiques interactifs, un filtrage et une fonctionnalité d'exportation. De plus, le générateur de rapports prend désormais en charge un fichier d'historique optionnel pour afficher les données d'exécution historiques si disponibles. Lorsqu'aucune donnée d'historique n'est fournie, le rapport omet la section historique et n'affiche que les erreurs uniques.

Ces outils vous aident à obtenir des aperçus clairs de vos exécutions de test, ce qui est essentiel pour le débogage et l'intégration continue.

## Features

- **Rapport JSON** : Rapport détaillé avec horodatages, noms de suites, résultats de tests, erreurs et captures d'écran optionnelles.
- **Rapport HTML** : Convertit les rapports JSON en un rapport HTML portable avec un tableau de bord, des graphiques, un rapport de test détaillé et des capacités de filtrage.
- **Exportation vers Excel** : Le rapport de test détaillé peut être exporté vers un fichier Excel.
- **Prise en charge des captures d'écran** : Capture des captures d'écran pour les tests échoués (ou tous les tests) en fonction de votre configuration.
- **Métadonnées d'exécution** : Enregistre les informations du navigateur, les heures de début/fin d'exécution et la durée globale.
- **Exécution historique (optionnelle)** : Fournissez un fichier JSON d'historique pour inclure les données d'exécution historiques par suite. Si aucune donnée historique n'est fournie, le rapport masquera automatiquement cette section et n'affichera que les erreurs uniques.
- **Génération d'historique agrégé** : Le rapporteur JSON inclut désormais une fonctionnalité de génération d'historique agrégé. En utilisant la méthode statique `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, vous pouvez automatiquement scanner tous les fichiers de rapport JSON (correspondant au modèle `test-report-*.json`) dans votre répertoire de rapports, agréger les résultats des tests et calculer les comparaisons de défauts basées sur les données historiques. L'enregistrement d'historique agrégé est ensuite ajouté à votre fichier d'historique et peut être utilisé par le générateur de rapports HTML pour visualiser les tendances au fil du temps.

## Installation

Pour installer le package `wdio-json-html-reporter`, suivez ces étapes :

### 1. Install the package

Exécutez la commande suivante pour installer le package en tant que dépendance de développement :

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Assurez-vous que le package a été correctement installé en exécutant :

```bash
npm list wdio-json-html-reporter
```

Si l'installation est correcte, vous devriez voir une sortie similaire à :

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Modifiez votre fichier `wdio.conf.js` ou `wdio.conf.ts` pour inclure le rapporteur personnalisé :

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Exécutez votre suite de tests WebDriverIO :

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

En plus de l'intégration avec WebDriverIO, vous pouvez exécuter le générateur de rapports HTML directement depuis la ligne de commande en utilisant l'interface CLI intégrée.

**Utilisation :**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Par exemple, si vous avez vos fichiers JSON dans un dossier nommé `test/reports/json-reports` et que vous souhaitez générer un rapport HTML nommé `test/reports/report.html`, vous pouvez exécuter :

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Si vous avez également un fichier d'historique (par exemple, `test/reports/history.json`), incluez-le en tant que quatrième paramètre optionnel :

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Remarque :**  
La fonctionnalité CLI est déclenchée uniquement lorsque vous passez la commande `generate-html` comme premier paramètre. Lors de l'exécution via WebDriverIO (par exemple, avec `wdio run wdio.conf.js`), la logique CLI est contournée.

## History Option and Aggregated History Generation

Le générateur de rapports HTML prend désormais en charge une **option d'historique**. Cela vous permet de fournir un fichier JSON contenant des données d'exécution historiques qui sont fusionnées dans le rapport sous la section "Exécution historique par suite". Si le fichier d'historique est fourni et contient des données valides, le rapport affichera les tendances historiques ainsi que des graphiques interactifs et un accordéon pour chaque suite. Si aucun fichier d'historique n'est transmis ou si le fichier ne contient aucune donnée de suite, le rapport masquera automatiquement la section historique et n'affichera que l'aperçu des erreurs uniques.

De plus, le rapporteur JSON inclut désormais une fonctionnalité de **génération d'historique agrégé**. Avec la méthode statique `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, vous pouvez automatiquement scanner tous les fichiers de rapport JSON (correspondant au modèle `test-report-*.json`) dans votre répertoire de rapports, agréger les résultats des tests (en additionnant les comptages de tests et en fusionnant les données de suite), et calculer les comparaisons de défauts en comparant avec le dernier enregistrement agrégé. L'enregistrement d'historique nouvellement généré est ensuite ajouté au fichier d'historique spécifié. Ces données d'historique agrégées peuvent ensuite être utilisées par le générateur de rapports HTML pour fournir des informations sur l'exécution historique sur plusieurs exécutions de tests.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)