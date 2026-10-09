---
id: globals
title: Globales
---

Dans vos fichiers de test, WebdriverIO place chacune de ces méthodes et chacun de ces objets dans l'environnement global. Vous n'avez rien à importer pour les utiliser. Cependant, si vous préférez les imports explicites, vous pouvez faire `import { browser, $, $$, expect } from '@wdio/globals'` et définir `injectGlobals: false` dans votre configuration WDIO.

Les objets globaux suivants sont définis, sauf configuration contraire :

- `browser` : [objet Browser](https://webdriver.io/docs/api/browser) de WebdriverIO
- `driver` : alias de `browser` (utilisé lors de l'exécution de tests mobiles)
- `multiRemoteBrowser` : alias de `browser` ou `driver`, mais défini uniquement pour les sessions [multi-remote](/docs/multiremote)
- `$` : commande pour récupérer un élément (voir plus dans la [documentation de l'API](/docs/api/browser/$))
- `$$` : commande pour récupérer des éléments (voir plus dans la [documentation de l'API](/docs/api/browser/$$))
- `expect` : framework d'assertion pour WebdriverIO (voir la [documentation de l'API](/docs/api/expect-webdriverio))

__Remarque :__ WebdriverIO n'a aucun contrôle sur les frameworks utilisés (par exemple Mocha ou Jasmine) qui définissent des variables globales lors de l'initialisation de leur environnement.