---
id: export
title: Exporter une session sous forme de test
description: Transformez les étapes exécutées dans wdio session en spec, page objects et commandes personnalisées.
---

`export` écrit une spec à partir des étapes enregistrées. Les refs sont remplacées par des sélecteurs stables. Pour une page web, le premier des éléments suivants qui correspond à exactement un élément est utilisé : un test id (`data-testid`, `data-test`, `data-qa`), un [sélecteur de rôle](/docs/selectors#role-selector) tel que `role/button[name="Add to cart"]`, un nom accessible (`aria/Add to cart`), un id, le texte d'un bouton ou d'un lien, le nom d'un champ de formulaire, et enfin un chemin CSS.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

`history` affiche les étapes avant l'export. `history clear` les supprime.

## Page objects

`--page-objects` écrit un page object à côté de la spec. Les sélecteurs sont regroupés selon le chemin sur lequel ils ont été exécutés. Un `$('…')` littéral dans une étape enregistrée devient un getter. `$$`, les chaînes qui contiennent par hasard `$('…')`, ainsi qu'un `$(selector)` dynamique restent tels quels.

```sh
npx wdio session export --page-objects --out test/specs/cart.e2e.ts
```

La commande refuse d'écraser un page object déjà présent dans le répertoire de sortie. Changez `--out` ou supprimez d'abord ce fichier. Le fichier de spec lui-même est réécrit.

Un `import` en haut d'une étape `exec` est remonté en haut de la spec, en dehors de la fonction de test.

## Helpers

Ajoutez un fichier dans `.wdio/helpers/` lorsqu'une étape est trop longue pour `exec`. Chaque fichier exporte par défaut une fonction qui reçoit le navigateur et enregistre des commandes avec `addCommand`. Les imports relatifs restent relatifs à ce fichier. Les imports de paquets nus sont résolus depuis le projet.

```js title=".wdio/helpers/login.js"
import { mark } from './util.js'

export default function login (browser) {
    browser.addCommand('fillLogin', async (email) => {
        await browser.$('#email').setValue(email + mark)
    })
}
```

Les helpers sont chargés à l'ouverture de la session, puis de nouveau avec `npx wdio session helpers --reload`. Si `.wdio/helpers` n'existe pas encore, la session surveille sa création. Les helpers deviennent des commandes personnalisées dans le test exporté.

## Étapes suivantes

- [Exécuter du code](/docs/session/exec) — les étapes que `export` enregistre
- [Commandes](/docs/session-commands) — options de `export`, `history` et `helpers`