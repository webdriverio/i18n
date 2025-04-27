---
id: autocompletion
title: Autocomplétion
---

## IntelliJ

L'autocomplétion fonctionne nativement dans IDEA et WebStorm.

Si vous écrivez du code depuis un certain temps, vous appréciez probablement l'autocomplétion. L'autocomplétion est disponible nativement dans de nombreux éditeurs de code.

![Autocompletion](/img/autocompletion/0.png)

Les définitions de types basées sur [JSDoc](http://usejsdoc.org/) sont utilisées pour documenter le code. Cela permet de voir plus de détails supplémentaires sur les paramètres et leurs types.

![Autocompletion](/img/autocompletion/1.png)

Utilisez les raccourcis standard <kbd>⇧ + ⌥ + SPACE</kbd> sur la plateforme IntelliJ pour voir la documentation disponible :

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code dispose généralement d'une prise en charge des types automatiquement intégrée et aucune action n'est nécessaire.

![Autocompletion](/img/autocompletion/14.png)

Si vous utilisez du JavaScript vanilla et souhaitez avoir une prise en charge appropriée des types, vous devez créer un fichier `jsconfig.json` à la racine de votre projet et faire référence aux packages wdio utilisés, par exemple :

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