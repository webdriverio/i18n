---
id: watcher
title: Surveiller les fichiers de test
description: "Relancez automatiquement les tests lorsque les fichiers de spécification ou de l'application changent en exécutant le testrunner WDIO avec l'option --watch et filesToWatch."
---

Avec le testrunner WDIO, vous pouvez surveiller les fichiers pendant que vous travaillez dessus. Les tests sont automatiquement relancés si vous modifiez quelque chose dans votre application ou dans vos fichiers de test. En ajoutant l'option `--watch` lors de l'appel de la commande `wdio`, le testrunner attendra des modifications de fichiers après avoir exécuté tous les tests, par exemple :

```sh
wdio wdio.conf.js --watch
```

Par défaut, il surveille uniquement les modifications de vos fichiers `specs`. Cependant, en définissant une propriété `filesToWatch` dans votre `wdio.conf.js` contenant une liste de chemins de fichiers (le globbing est pris en charge), il surveillera également les modifications de ces fichiers afin de relancer l'ensemble de la suite. C'est utile si vous souhaitez relancer automatiquement tous vos tests lorsque vous avez modifié le code de votre application, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // surveiller tous les fichiers JS de mon application
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Essayez d'exécuter les tests en parallèle autant que possible. Les tests E2E sont, par nature, lents. Relancer les tests n'est utile que si vous parvenez à maintenir une durée d'exécution courte pour chaque test. Afin de gagner du temps, le testrunner maintient les sessions WebDriver actives pendant qu'il attend des modifications de fichiers. Assurez-vous que votre backend WebDriver peut être configuré de manière à ne pas fermer automatiquement la session si aucune commande n'a été exécutée après un certain temps.
:::