---
id: autocompletion
title: Autocomplétion
description: "Obtenez l'autocomplétion et la documentation de l'API en ligne pour les commandes WebdriverIO dans IntelliJ, WebStorm et Visual Studio Code."
---

## IntelliJ

L'autocomplétion fonctionne immédiatement dans IDEA et WebStorm.

Si vous écrivez du code depuis un certain temps, vous appréciez probablement l'autocomplétion. L'autocomplétion est disponible par défaut dans de nombreux éditeurs de code.

![Autocompletion](/img/autocompletion/0.png)

Des définitions de types basées sur [JSDoc](http://usejsdoc.org/) sont utilisées pour documenter le code. Elles permettent de voir des détails supplémentaires sur les paramètres et leurs types.

![Autocompletion](/img/autocompletion/1.png)

Utilisez les raccourcis standard <kbd>⇧ + ⌥ + SPACE</kbd> sur la plateforme IntelliJ pour voir la documentation disponible :

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code intègre généralement la prise en charge des types automatiquement, et aucune action n'est nécessaire.

![Autocompletion](/img/autocompletion/14.png)

Si vous utilisez du JavaScript pur et souhaitez bénéficier d'une prise en charge correcte des types, vous devez créer un fichier `jsconfig.json` à la racine de votre projet et y référencer les paquets wdio utilisés, par exemple :

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```