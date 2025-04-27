---
id: watcher
title: Surveiller les fichiers de test
---

Avec le testrunner WDIO, vous pouvez surveiller les fichiers pendant que vous travaillez dessus. Ils s'exécutent automatiquement si vous modifiez quelque chose dans votre application ou dans vos fichiers de test. En ajoutant un drapeau `--watch` lors de l'appel à la commande `wdio`, le testrunner attendra les changements de fichiers après avoir exécuté tous les tests, par exemple :

```sh
wdio wdio.conf.js --watch
```

Par défaut, il surveille uniquement les changements dans vos fichiers `specs`. Cependant, en définissant une propriété `filesToWatch` dans votre `wdio.conf.js` qui contient une liste de chemins de fichiers (avec prise en charge des motifs globaux), il surveillera également les modifications de ces fichiers pour réexécuter toute la suite. Cela est utile si vous souhaitez réexécuter automatiquement tous vos tests lorsque vous avez modifié le code de votre application, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Essayez d'exécuter les tests en parallèle autant que possible. Les tests E2E sont, par nature, lents. La réexécution des tests n'est utile que si vous pouvez maintenir le temps d'exécution des tests individuels court. Pour gagner du temps, le testrunner maintient les sessions WebDriver actives pendant qu'il attend les changements de fichiers. Assurez-vous que votre backend WebDriver peut être modifié pour qu'il ne ferme pas automatiquement la session si aucune commande n'a été exécutée après une certaine durée.
:::