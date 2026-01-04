---
id: globals
title: Globales
---

Dans vos fichiers de test, WebdriverIO place chacune de ces méthodes et objets dans l'environnement global. Vous n'avez pas besoin d'importer quoi que ce soit pour les utiliser. Cependant, si vous préférez des importations explicites, vous pouvez faire `import { browser, $, $$, expect } from '@wdio/globals'` et définir `injectGlobals: false` dans votre configuration WDIO.

Les objets globaux suivants sont définis si non configurés autrement :

- `browser` : [Objet Browser](https://webdriver.io/docs/api/browser) de WebdriverIO
- `driver` : alias de `browser` (utilisé lors de l'exécution de tests mobiles)
- `multiRemoteBrowser` : alias de `browser` ou `driver` mais uniquement défini pour les sessions [Multiremote](/docs/multiremote)
- `$` : commande pour récupérer un élément (voir plus dans [API docs](/docs/api/browser/$))
- `$$` : commande pour récupérer des éléments (voir plus dans [API docs](/docs/api/browser/$$))
- `expect` : framework d'assertion pour WebdriverIO (voir [API docs](/docs/api/expect-webdriverio))

__Remarque :__ WebdriverIO n'a aucun contrôle sur les frameworks utilisés (par exemple Mocha ou Jasmine) qui définissent des variables globales lors de l'initialisation de leur environnement.