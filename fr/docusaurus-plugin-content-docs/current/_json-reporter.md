---
id: json-reporter
title: Rapporteur Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---



## Installation

```bash
npm install @wdio/json-reporter --save-dev
```

## Configuration

### Résultats vers `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### Résultats vers un fichier

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### Résultats vers un fichier avec un nom personnalisé

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## Fichiers de résultats

Avec WDIO v5 et versions ultérieures, la génération de rapports est passée d'un processus centralisé à un processus géré par chacune des "sessions" créées pour l'exécution de tests en parallèle. Ce changement a permis de réduire la quantité de communications pendant l'exécution des tests WDIO et d'améliorer ainsi les performances. L'inconvénient est qu'il n'est plus possible d'obtenir un rapport unique pour toute l'exécution des tests.

`@wdio/json-reporter` fournit une fonction utilitaire pour fusionner plusieurs fichiers JSON en un seul fichier. Suivez les étapes ci-dessous pour profiter de cet utilitaire.

Vous pouvez exécuter ceci dans la fonction [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) de votre `wdio.conf.js`:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_Remarque :_ `wdio-custom-filename.json` est facultatif, si le paramètre n'est pas fourni, la valeur par défaut est `wdio-merged.json`.

## Contribution

Le code source de ce rapporteur a été fortement inspiré par le rapporteur communautaire [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) créé par [Jim Davis](https://github.com/fijijavis). Merci pour tout le travail de maintenance du projet !

---

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](http://webdriver.io).