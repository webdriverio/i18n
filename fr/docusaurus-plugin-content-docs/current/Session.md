---
id: session
title: wdio session
description: Pilotez un navigateur, une application mobile ou une application de bureau depuis le shell avec de courtes commandes wdio session, puis exportez les étapes sous forme de test.
---

`wdio session` maintient une session WebdriverIO active à travers de nombreuses commandes shell courtes. Utilisez-le pour explorer une interface utilisateur, vérifier une modification et transformer les étapes qui ont fonctionné en test. Il fait partie de `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

La session s'appelle `default`. Passez `-s <name>` uniquement lorsque vous avez besoin de deux sessions simultanément. La page [cibles](/docs/session/targets) pilote une application de démonstration Expo dans une fenêtre Chrome visible et dans une fenêtre Electron, toutes deux à une taille de bureau. Les commandes Android et iOS pour la même application se trouvent sur cette page.

## Installation

`wdio session` fait partie de la CLI WebdriverIO. `npx wdio` installe le paquet non scopé [`wdio`](https://www.npmjs.com/package/wdio) et exécute cette CLI. Vous n'installez pas `@wdio/session` vous-même.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` affiche le flux de travail, les actions par groupe, les options globales et les codes de sortie. `<action> --help` affiche les arguments, les options, les plateformes, les exemples et les actions associées de cette action. Le même texte se trouve sur la page [commandes](/docs/session-commands). La compétence d'agent ne conserve que la boucle principale et renvoie les agents vers `--help` pour le reste, afin de ne pas devenir obsolète lorsque la CLI évolue.

Créez la structure d'un projet avec :

```sh
npm init wdio@latest
```

Acceptez « Set up coding agent support » pour écrire `.agents/skills/wdio-session/SKILL.md`, une section `AGENTS.md` et une entrée gitignore `.wdio/session/`. Installez la compétence ultérieurement avec :

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` vérifie Node.js, le navigateur, Appium, les SDK et les identifiants cloud. `doctor <target>` vérifie uniquement ce dont cette cible a besoin. Le processus se termine avec le code 1 lorsqu'une vérification échoue.

## Ouvrir une page et interagir avec elle

Ouvrez Chrome en mode headless (ajoutez `--headed` pour afficher la fenêtre). `open` affiche les éléments interactifs de la page :

```sh
npx wdio session open chrome http://localhost:3000
```

Un élément ressemble à `button "Add to cart" [ref=e3]`. Utilisez cette ref. Chaque action indique ce qu'elle a modifié sur la page, avec des refs pour les nouveaux éléments, de sorte que vous avez rarement besoin d'un `snapshot` séparé :

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` et `open safari` acceptent la même URL. Chrome, Firefox et Edge sont téléchargés lors de la première utilisation s'ils ne sont pas installés. Safari nécessite macOS.

### Android

Android et iOS fonctionnent via Appium 3. `doctor android` signale un serveur ou un pilote manquant avec la commande d'installation.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS : `open ios --bundle-id com.example.shop`. Bureau natif : `open macos --bundle-id com.example.shop` et `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` et `open dioxus ./my-app` nécessitent que leur pilote soit dans le `PATH`. Sous Linux sans `DISPLAY` ni `WAYLAND_DISPLAY`, installez Xvfb ou weston.

## Observation et refs

| Commande | Utilisation |
| --- | --- |
| `snapshot --interactive` | Les éléments avec lesquels vous pouvez interagir, chacun avec une ref |
| `snapshot --compact` | Le même arbre sans les conteneurs vides et sans nom |
| `snapshot --urls` | Les adresses de chaque lien |
| `find "Add to cart"` | Une ligne issue d'un nouveau snapshot |
| `diff` | Ce qui a changé depuis le snapshot précédent |
| `screenshot` | La mise en page. Ignorez-la lorsqu'un snapshot répond à la question |
| `pdf` | Un PDF de la page actuelle (`pdf report.pdf`). Les sessions BiDi impriment en mode visible et headless |
| `source` | Le HTML de la page ou le XML natif |

Les refs proviennent du dernier snapshot. Après une navigation, refaites un snapshot. Une ancienne ref échoue avec `REF_STALE`. Une ref inconnue échoue avec `REF_NOT_FOUND`.

## `exec`

`exec` exécute du code WebdriverIO. Utilisez toujours `await` avec les commandes. `$` renvoie un élément et lève une erreur lorsqu'il est absent. Il n'y a pas de mode synchrone ni de `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Placez les assertions dans `exec` avec `expect-webdriverio`. Utilisez `visual check <tag>` (nécessite `@wdio/visual-service`) lorsque la question porte sur l'apparence de l'écran.

## Export

`export` écrit une spec à partir des étapes enregistrées. Les refs sont remplacées par des sélecteurs stables.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` et `open safari` acceptent la même URL. Les autres cibles, les snapshots, `exec`, l'export et une exécution de test en pause font l'objet de pages distinctes dans cette section.

## Cette section

| Page | Utilisation |
| --- | --- |
| [Cibles](/docs/session/targets) | Navigateurs, Android, iOS, bureau, Electron, Tauri, Dioxus et appareils cloud, y compris l'application de démonstration dans Chrome, Android et Electron |
| [Snapshots et refs](/docs/session/snapshots) | Ce qui est à l'écran, et les refs sur lesquelles vous cliquez |
| [Exécuter du code](/docs/session/exec) | `exec`, assertions et vérifications visuelles |
| [Exporter un test](/docs/session/export) | Specs, page objects et `.wdio/helpers` |
| [Déboguer un test](/docs/session/debug) | `wdio run --debug=agent` et `wdio repl --session` |
| [Commandes](/docs/session-commands) | Chaque action et option |

## Dépannage

| Message | Que faire |
| --- | --- |
| `SESSION_EXISTS` | Ce nom est déjà en cours d'exécution. Utilisez `-s` avec un autre nom, ou `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Relancez `snapshot` et utilisez une ref issue de cette sortie. |
| `NOT_EDITABLE` | La cible de `fill` n'est pas un champ modifiable et ne contient pas un unique champ modifiable (ni derrière `aria-controls`/`aria-owns`/label). Exécutez `snapshot --scope <target>` et remplissez la ref du champ. |
| `MISSING_DEPENDENCY` | Installez le paquet mentionné dans l'erreur, ou exécutez `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Exécutez la ligne `npx appium driver install …` indiquée dans l'erreur. |
| `MISSING_CREDENTIALS` | Exportez les variables mentionnées. Doctor n'affiche jamais leurs valeurs. |
| `Session closed from wdio session` | La session de débogage a été fermée. Reprenez-la au lieu de la fermer lorsque le test doit continuer. |

Codes de sortie : 0 succès, 1 l'action a échoué, 2 erreur d'utilisation, 3 une dépendance ou des identifiants manquants, 4 aucune session portant ce nom.

## Étapes suivantes

- [Cibles](/docs/session/targets) — ouvrir un navigateur, une application Android ou iOS, ou une fenêtre Electron
- [WebdriverIO pour les agents de code](/docs/ai-agents) — compétence, documentation et règles de projet
- [Commandes wdio session](/docs/session-commands) — chaque action et option