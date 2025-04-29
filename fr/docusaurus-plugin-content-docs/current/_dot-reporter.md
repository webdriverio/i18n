---
id: dot-reporter
title: Rapporteur Point (Dot)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---


> Un plugin WebdriverIO pour générer des rapports en style point.

![Dot Reporter](/img/dot.png "Dot Reporter")

## Installation

La façon la plus simple est de maintenir `@wdio/dot-reporter` comme devDependency dans votre `package.json`, via:

```sh
npm install @wdio/dot-reporter --save-dev
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici](/docs/gettingstarted).

## Configuration

Le code suivant montre la configuration par défaut du test runner wdio. Ajoutez simplement `'dot'` comme rapporteur
dans le tableau.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).