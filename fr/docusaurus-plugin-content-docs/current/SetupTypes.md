---
id: setuptypes
title: Types de configuration
description: "Comparez les différentes façons d'utiliser WebdriverIO, des liaisons de protocole brutes au mode autonome et au testrunner WDIO, et choisissez celle qui vous convient."
---

WebdriverIO peut être utilisé à des fins diverses. Il implémente l'API du protocole WebDriver et peut exécuter un navigateur de manière automatisée. Le framework est conçu pour fonctionner dans n'importe quel environnement et pour tout type de tâche. Il est indépendant de tout framework tiers et ne nécessite que Node.js pour fonctionner.

## Liaisons de protocole

Pour les interactions de base avec le protocole WebDriver, WebdriverIO utilise ses propres liaisons de protocole basées sur le package NPM [`webdriver`](https://www.npmjs.com/package/webdriver) :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Toutes les [commandes de protocole](api/webdriver) renvoient la réponse brute du driver d'automatisation. Le package est très léger et il n'y a __aucune__ logique intelligente comme les attentes automatiques pour simplifier l'interaction avec l'utilisation du protocole.

Les commandes de protocole appliquées à l'instance dépendent de la réponse initiale de session du driver. Par exemple, si la réponse indique qu'une session mobile a été démarrée, le package applique les commandes Appium au prototype de l'instance.

Pour plus d'informations sur l'interface du package `webdriver`, consultez [API des modules](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) n'est pas un protocole d'automatisation. Il s'agit de l'interface de débogage permettant de suivre une exécution en direct et de rejouer les traces par la suite.

## Mode autonome

Pour simplifier l'interaction avec le protocole WebDriver, le package `webdriverio` implémente une variété de commandes au-dessus du protocole (par exemple la commande [`dragAndDrop`](api/element/dragAndDrop)) ainsi que des concepts fondamentaux tels que les [sélecteurs intelligents](selectors) ou les [attentes automatiques](autowait). L'exemple ci-dessus peut être simplifié comme ceci :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

L'utilisation de WebdriverIO en mode autonome vous donne toujours accès à toutes les commandes de protocole, mais fournit un sur-ensemble de commandes supplémentaires offrant une interaction de plus haut niveau avec le navigateur. Cela vous permet d'intégrer cet outil d'automatisation dans votre propre projet (de test) pour créer une nouvelle bibliothèque d'automatisation. Parmi les exemples populaires figurent [Oxygen](https://github.com/oxygenhq/oxygen) ou [CodeceptJS](http://codecept.io). Vous pouvez également écrire de simples scripts Node pour extraire du contenu du web (ou toute autre tâche nécessitant un navigateur en cours d'exécution).

Si aucune option spécifique n'est définie, WebdriverIO tentera toujours de télécharger et de configurer le driver de navigateur correspondant à la propriété `browserName` de vos capabilities. Dans le cas de Chrome et Firefox, il pourra également les installer selon qu'il trouve ou non le navigateur correspondant sur la machine.

Pour plus d'informations sur les interfaces du package `webdriverio`, consultez [API des modules](/docs/api/modules).

## Le testrunner WDIO

L'objectif principal de WebdriverIO reste cependant les tests de bout en bout à grande échelle. Nous avons donc implémenté un test runner qui vous aide à construire une suite de tests fiable, facile à lire et à maintenir.

Le test runner prend en charge de nombreux problèmes courants lorsqu'on travaille avec de simples bibliothèques d'automatisation. D'une part, il organise vos exécutions de tests et répartit les specs de test afin que vos tests puissent être exécutés avec une concurrence maximale. Il gère également la gestion des sessions et fournit de nombreuses fonctionnalités pour vous aider à déboguer les problèmes et à trouver les erreurs dans vos tests.

Voici le même exemple que ci-dessus, écrit sous forme de spec de test et exécuté par WDIO :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Le test runner est une abstraction de frameworks de test populaires comme Mocha, Jasmine ou Cucumber. Pour exécuter vos tests avec le test runner WDIO, consultez la section [Premiers pas](gettingstarted) pour plus d'informations.

Pour plus d'informations sur l'interface du package testrunner `@wdio/cli`, consultez [API des modules](/docs/api/modules).