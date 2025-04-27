---
id: setuptypes
title: Types de Configuration
---

WebdriverIO peut être utilisé à diverses fins. Il implémente l'API du protocole WebDriver et peut exécuter un navigateur de manière automatisée. Le framework est conçu pour fonctionner dans n'importe quel environnement et pour tout type de tâche. Il est indépendant de tout framework tiers et nécessite uniquement Node.js pour fonctionner.

## Liaisons de Protocole

Pour les interactions de base avec WebDriver et d'autres protocoles d'automatisation, WebdriverIO utilise ses propres liaisons de protocole basées sur le package NPM [`webdriver`](https://www.npmjs.com/package/webdriver) :

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Toutes les [commandes de protocole](api/webdriver) renvoient la réponse brute du pilote d'automatisation. Le package est très léger et il n'y a __pas__ de logique intelligente comme les attentes automatiques pour simplifier l'interaction avec l'utilisation du protocole.

Les commandes de protocole appliquées à l'instance dépendent de la réponse de session initiale du pilote. Par exemple, si la réponse indique qu'une session mobile a été démarrée, le package applique toutes les commandes du protocole Appium et Mobile JSON Wire au prototype de l'instance.

Vous pouvez exécuter le même ensemble de commandes (à l'exception des commandes mobiles) en utilisant le protocole Chrome DevTools lors de l'importation du package NPM [`devtools`](https://www.npmjs.com/package/devtools). Il a la même interface que le package `webdriver` mais exécute son automatisation basée sur [Puppeteer](https://pptr.dev/).

Pour plus d'informations sur ces interfaces de package, consultez [API des Modules](/docs/api/modules).

## Mode Autonome

Pour simplifier l'interaction avec le protocole WebDriver, le package `webdriverio` implémente diverses commandes au-dessus du protocole (par exemple, la commande [`dragAndDrop`](api/element/dragAndDrop)) et des concepts de base tels que les [sélecteurs intelligents](selectors) ou les [attentes automatiques](autowait). L'exemple ci-dessus peut être simplifié comme ceci :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

L'utilisation de WebdriverIO en mode autonome vous donne toujours accès à toutes les commandes de protocole, mais fournit un ensemble supplémentaire de commandes qui permettent une interaction de plus haut niveau avec le navigateur. Cela vous permet d'intégrer cet outil d'automatisation dans votre propre projet (de test) pour créer une nouvelle bibliothèque d'automatisation. Des exemples populaires incluent [Oxygen](https://github.com/oxygenhq/oxygen) ou [CodeceptJS](http://codecept.io). Vous pouvez également écrire des scripts Node simples pour extraire du contenu du web (ou toute autre chose nécessitant un navigateur en cours d'exécution).

Si aucune option spécifique n'est définie, WebdriverIO tentera toujours de télécharger et de configurer le pilote de navigateur correspondant à la propriété `browserName` dans vos capacités. Dans le cas de Chrome et Firefox, il peut également les installer selon qu'il peut trouver le navigateur correspondant sur la machine.

Pour plus d'informations sur les interfaces du package `webdriverio`, consultez [API des Modules](/docs/api/modules).

## Le Testrunner WDIO

Cependant, l'objectif principal de WebdriverIO est de réaliser des tests de bout en bout à grande échelle. Nous avons donc implémenté un testrunner qui vous aide à créer une suite de tests fiable, facile à lire et à maintenir.

Le testrunner prend en charge de nombreux problèmes courants lors de l'utilisation de bibliothèques d'automatisation simples. D'une part, il organise vos exécutions de tests et divise les spécifications de test afin que vos tests puissent être exécutés avec une concurrence maximale. Il gère également la gestion des sessions et offre de nombreuses fonctionnalités pour vous aider à déboguer les problèmes et à trouver des erreurs dans vos tests.

Voici le même exemple que ci-dessus, écrit comme une spécification de test et exécuté par WDIO :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

Le testrunner est une abstraction de frameworks de test populaires comme Mocha, Jasmine ou Cucumber. Pour exécuter vos tests à l'aide du testrunner WDIO, consultez la section [Premiers Pas](gettingstarted) pour plus d'informations.

Pour plus d'informations sur l'interface du package testrunner `@wdio/cli`, consultez [API des Modules](/docs/api/modules).