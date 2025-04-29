---
id: wdio-html-nice-reporter
title: Rapporteur HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---


> wdio-html-nice-reporter est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Un rapporteur pour webdriver.io qui génère un rapport HTML agréable.  
Le nom est idiot mais offre une intégration avec webdriverio

### Nouveau : n'est plus en version bêta.

### Nouveau : nettoyé et changé la journalisation vers wdio-logging. Les exemples sont mis à jour.
    Vous devez supprimer l'initialisation du logger log4Js de votre configuration

### Nouveau : réécrit comme un module ES pour la compatibilité avec webdriverio 8.
    Vous pourriez avoir besoin de modifications dans votre application de test

### Correction de bug : webdriverio s'arrêtait au milieu de l'écriture asynchrone du json.

### Correction de bug : l'écriture json n'était pas correctement attendue

### Grande nouvelle amélioration : plus d'erreurs de mémoire insuffisante dues à json.stringify

### Excellente nouvelle fonctionnalité : prenez des vidéos de chaque test


## [Journal des modifications](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Information

Ce projet est une réécriture de [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
Il est écrit en typescript avec de nombreuses améliorations.



## Configuration

### WDIO.config.ts

Le code suivant montre la configuration par défaut du testeur wdio. Ajoutez simplement un objet HtmlReporter comme un autre rapporteur au tableau des rapporteurs :

### Un wdio.config.ts fonctionnel est fourni dans [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

Voici des extraits de ce fichier.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Options de configuration:
  
### Pour générer un rapport principal pour toutes les suites

webdriver.io appellera le rapporteur pour chaque suite de tests. Il n'agrège pas les rapports. Pour ce faire, ajoutez les gestionnaires d'événements suivants à votre wdio.config.js

Ajoutez au fichier de configuration du navigateur :
```
let reportAggregator : ReportAggregator;
```
Ajoutez à l'objet de configuration du navigateur :
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Pour générer un fichier pdf à partir de ce rapport

Nécessite un plugin supplémentaire pour garder le support léger pour ceux qui n'en veulent pas.
voir [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Exemple de sortie :

![Capture d'écran du rapport](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Cela doit être défini manuellement. Ce n'est pas disponible au moment de la configuration car l'objet navigateur n'existe pas avant que vous ne démarriez une session.