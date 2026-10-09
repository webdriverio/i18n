---
id: snapshots
title: Snapshots et refs
description: Lisez la page avec wdio session snapshot, puis agissez sur les refs qu'il affiche.
---

Prenez un snapshot avant de cliquer. Le snapshot est la liste des éléments sur lesquels vous pouvez agir. Chaque ligne interactive se termine par une ref telle que `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Une ligne ressemble à `button "Add to cart" [ref=e3]`. La commande suivante utilise cette ref :

```sh
npx wdio session click e3
```

Les refs proviennent du dernier snapshot. Après une navigation, reprenez un snapshot. Une ancienne ref échoue avec `REF_STALE`. Une ref inconnue échoue avec `REF_NOT_FOUND`.

:::caution Expérimental

La mise en forme textuelle d'un snapshot, ainsi que la structure que `--json` affiche pour celui-ci, sont expérimentales : une version mineure peut les modifier, par exemple pour partager un même moteur de snapshot avec la [trace DevTools](/docs/devtools/wdio/trace-mode). La syntaxe des refs (`e3`, `@e3`), les actions qui acceptent une ref et le code qu'elles enregistrent restent stables. Prenez les refs d'un snapshot et n'analysez pas le reste de ses lignes.

:::

## Quoi exécuter

| Commande | À utiliser pour |
| --- | --- |
| `snapshot --interactive` | Les éléments sur lesquels vous pouvez agir, chacun avec une ref |
| `find "Add to cart"` | Chaque correspondance avec le nœud qui l'entoure, par exemple un élément de liste entier, de sorte qu'une valeur voisine de la correspondance soit incluse. `-A`, `-B` et `-C` affichent un contexte de lignes brut, comme grep |
| `diff` | Ce qui a changé depuis le snapshot précédent |
| `screenshot` | La mise en page. Ignorez-le lorsqu'un snapshot répond à la question |
| `source` | Le HTML de la page ou le XML natif |

`snapshot` sans `--interactive` inclut une plus grande partie de l'arbre. Préférez `--interactive` lorsque vous êtes sur le point de cliquer ou de saisir du texte.

## Ce qu'une action a modifié

Dans une session web, `open` affiche le snapshot interactif de la page qu'il a ouverte, et chaque action susceptible de modifier la page (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) indique ce qui a changé :

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Lorsque l'action a ouvert un onglet, le rapport l'indique (`Opened a new tab [1]: https://…`) ; la session reste sur l'onglet actuel jusqu'à ce que vous exécutiez `tabs switch`. Lorsque la page est une vérification anti-bot (Cloudflare, DataDome, Akamai, …) plutôt que le site, le rapport l'indique également, une fois par page. La session n'essaie pas de la contourner ; dans un navigateur headless, elle suggère de rouvrir avec `--headed`.

Sur la même page, vous obtenez les lignes nouvelles ou modifiées avec leurs refs, y compris le texte non interactif, comme le statut ci-dessus. Après une navigation, vous obtenez les éléments interactifs de la nouvelle page, ou, pour une page volumineuse, un résumé d'une ligne qui renvoie vers `find`. Vous avez donc rarement besoin d'un `snapshot` séparé après une action. Définissez `WDIO_SESSION_CHANGES=0` pour désactiver le rapport, et passez `open --no-snapshot` pour ignorer le snapshot après `open`.

## Frames

Dans une session WebDriver BiDi, le snapshot affiche le contenu des iframes de la page, y compris celles d'origine différente, sous l'iframe qui les contient :

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Les actions sur ces refs entrent dans la frame, agissent, puis reviennent à la page, et le code affiché fait de même. Jusqu'à cinq iframes sont affichées, chacune tronquée à 300 éléments ; `frame e4` et `snapshot` affichent l'intégralité d'une frame qui a été tronquée. Les iframes de moins de 100 pixels carrés, comme les pixels de suivi, sont exclues.

## Shadow DOM et éléments cliquables sans rôle

Avec WebDriver BiDi, le snapshot couvre également les shadow roots fermés, et les éléments qui n'ont qu'un écouteur de clic (une icône branchée avec `addEventListener`) reçoivent une ref. Un tel élément n'a pas de nom accessible, le snapshot le décrit donc à la place :

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

Sur Android, iOS, macOS et Windows, le snapshot provient du page source d'Appium. Deux contrôles qui partagent un accessibility id restent des refs distinctes lorsque le reste de leurs sélecteurs diffère. `snapshot --scope e3` limite l'arbre à cette ref.

## Contrôles répétés

Lorsque plusieurs contrôles partagent un rôle et un nom, comme le bouton « Add to cart » de chaque ligne d'un tableau de produits, la ligne de la ref se termine par `∈ "<text>"`, le texte de la ligne, de la carte ou de l'élément de liste qui contient ce contrôle et aucun autre du même nom :

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

Le texte est tronqué à 80 caractères. Un contrôle dont l'élément est un landmark de la page (un lien « Sign in » à la fois dans l'en-tête et le pied de page) n'en reçoit pas. Le libellé d'un contrôle de formulaire visible n'est pas listé : le contrôle porte le nom.

## Taps natifs

Les sessions web utilisent `click`. Les sessions mobiles et de bureau natives utilisent `tap` sur la même ref :

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Dépannage

| Message | Que faire |
| --- | --- |
| `REF_STALE` | L'élément du dernier snapshot a disparu. Exécutez `snapshot` et utilisez une nouvelle ref. |
| `REF_NOT_FOUND` | Cet identifiant n'a jamais existé dans cette session. La ref de votre commande ne correspond pas au dernier snapshot. |
| `NO_MATCH` | `find` n'a pas trouvé ce texte. Prenez un snapshot et lisez les noms qui sont réellement présents. |
| `NOT_EDITABLE` | La cible de `fill` n'est pas un champ modifiable et ne contient pas un unique champ modifiable (ni derrière `aria-controls`/`aria-owns`/un libellé). Exécutez `snapshot --scope <target>` et remplissez la ref du champ. |

## Étapes suivantes

- [Exécuter du code](/docs/session/exec) — assertions et étapes qui nécessitent plus d'une commande
- [Commandes](/docs/session-commands) — options de `snapshot`, `find`, `diff`, `screenshot` et `source`