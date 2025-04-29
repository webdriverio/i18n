---
id: concise-reporter
title: Reporter Concis
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---


> Un plugin WebdriverIO pour produire des rapports dans un style concis.

## Installation

La façon la plus simple est de garder `@wdio/concise-reporter` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/concise-reporter --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici](https://webdriver.io/docs/gettingstarted).

## Configuration

Le code suivant montre la configuration par défaut du test runner wdio. Ajoutez simplement `'concise'` comme reporter
au tableau.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```