---
id: session-commands
title: Commandes wdio session
description: Toutes les actions et options de wdio session, de open à doctor et skill.
slug: /session-commands
---

<!-- Generated from packages/wdio-session/src/actions/specs.ts by `pnpm run docs:session-commands`. Do not edit by hand. -->

Toutes les actions de `wdio session`. Les options globales s'appliquent à chacune d'elles. `npx wdio session <action> --help` affiche le même texte. Le reste de la section [WebdriverIO Session](/docs/session) traite des [cibles](/docs/session/targets), des [snapshots](/docs/session/snapshots), d'[`exec`](/docs/session/exec), de l'[export](/docs/session/export) et du [débogage](/docs/session/debug).

```sh
npx wdio session <action> [arguments] [flags]
```

## Options globales

| Option | Description |
| --- | --- |
| `-s, --session` | Nom de la session (env WDIO_SESSION, par défaut "default") |
| `--json` | Afficher un seul objet JSON (env WDIO_SESSION_JSON=1) |
| `--timeout` | Délai d'expiration des requêtes en ms (plafonné à 60000, sauf pour wait) |
| `-q, --quiet` | Ne rien afficher en cas de succès, hormis les données demandées |
| `--color` | Utilisez --no-color pour désactiver les couleurs |

Codes de sortie : 0 succès, 1 échec de l'action ou de votre code, 2 erreur d'utilisation, 3 dépendance ou identifiants manquants, 4 aucune session portant ce nom.

## `open`

Démarre une session : navigateur, android, ios, macos, windows, electron, tauri, dioxus ou un fichier de configuration wdio.

Lance un démon en arrière-plan qui maintient la session active jusqu'à `close`, ou jusqu'à ce qu'elle reste inactive pendant la durée de --idle-timeout (30m par défaut). Les navigateurs s'exécutent en mode headless, sauf si vous passez --headed. Affiche le nom de la session, la cible, le répertoire des artefacts où sont enregistrés les snapshots, les captures d'écran et les exports, ainsi que, pour un navigateur ouvert sur une URL, le snapshot interactif de cette page.

Une seule session par nom. Ouvrir un nom déjà en cours d'exécution échoue : utilisez cette session, fermez-la ou passez --replace. Ne passez `-s <name>` que si vous avez besoin de deux sessions simultanément.

```sh
npx wdio session open <target> [url]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | chrome \| firefox \| edge \| safari \| android \| ios \| macos \| windows \| electron `<app>` \| tauri `<app>` \| dioxus `<app>` \| `<wdio.conf>` |
| `url` | non | URL à ouvrir (navigateurs), chemin de l'application (applications de bureau) ou capability (configuration) |

**Options**

| Option | Description |
| --- | --- |
| `--replace` | Fermer d'abord une session en cours portant le même nom |
| `--launch-timeout <n>` | Millisecondes d'attente avant que la session soit prête |
| `--idle-timeout <value>` | Arrêter après cette durée sans requête (p. ex. 30m, 0 pour désactiver) |
| `--capabilities <value>` | Capabilities supplémentaires en JSON ou chemin vers un fichier JSON |
| `--hostname <value>` | Hôte WebDriver distant |
| `--port <n>` | Port WebDriver distant |
| `--path <value>` | Chemin WebDriver distant |
| `--protocol <value>` | Protocole WebDriver distant |
| `--log-level <value>` | Niveau de log WebdriverIO écrit dans daemon.log |
| `--bidi` | Demander WebDriver BiDi (utilisez --no-bidi pour désactiver) |
| `--headed` | Afficher la fenêtre du navigateur |
| `--headless` | Exécuter sans fenêtre (par défaut pour les navigateurs ; remplace --headed) |
| `--snapshot` | Afficher le snapshot interactif de la page ouverte (utilisez --no-snapshot pour l'ignorer) |
| `--viewport <value>` | Viewport initial, p. ex. 1280x720 |
| `--browser-version <value>` | Version du navigateur |
| `--binary <value>` | Binaire du navigateur |
| `--arg <value>` | Argument supplémentaire du navigateur. Une valeur commençant par `-` nécessite `=`, p. ex. `--arg=--disable-gpu` (répétable) |
| `--profile <value>` | Répertoire de profil persistant |
| `--attach <value>` | Se connecter à un Chrome/Edge en cours d'exécution (port de débogage ou URL) |
| `--app <value>` | Fichier de l'application ou URL d'application cloud |
| `--package <value>` | Package de l'application Android |
| `--activity <value>` | Activity de l'application Android |
| `--bundle-id <value>` | Bundle id iOS/macOS |
| `--browser <value>` | Navigateur web mobile (chrome, safari) |
| `--device <value>` | Nom de l'appareil |
| `--platform-version <value>` | Version de la plateforme |
| `--udid <value>` | UDID de l'appareil |
| `--reset` | Utilisez --no-reset pour conserver l'état de l'application (appium:noReset) |
| `--full-reset` | appium:fullReset |
| `--orientation <portrait\|landscape>` | Orientation initiale |
| `--appium-url <value>` | Utiliser un serveur Appium en cours d'exécution |
| `--app-arg <value>` | Argument transmis à une application de bureau. Une valeur commençant par `-` nécessite `=`, p. ex. `--app-arg=--no-sandbox` (répétable) |
| `--chromedriver <value>` | Electron : binaire Chromedriver |
| `--electron-version <value>` | Electron : remplacer la détection de version |
| `--provider <browserstack\|saucelabs\|testingbot\|testmu>` | Fournisseur cloud |
| `--os <value>` | Cloud : OS de bureau |
| `--os-version <value>` | Cloud : version de l'OS de bureau |
| `--region <value>` | Cloud : région Sauce Labs |
| `--tunnel <value>` | Cloud : démarrer le tunnel du fournisseur (ou "external") |
| `--tunnel-name <value>` | Cloud : identifiant du tunnel |
| `--project <value>` | Cloud : libellé du projet |
| `--build <value>` | Cloud : libellé du build |
| `--name <value>` | Cloud : libellé du nom de session |

**Exemples**

```sh
# Ouvrir Chrome en mode headless sur une application locale
npx wdio session open chrome http://localhost:3000

# Ouvrir Firefox avec une fenêtre visible
npx wdio session open firefox http://localhost:3000 --headed

# Ouvrir une application Android via Appium
npx wdio session open android --app ./app.apk

# Ouvrir une application iOS installée
npx wdio session open ios --bundle-id com.example.shop

# Ouvrir une application Electron
npx wdio session open electron ./main.js

# Ouvrir la première capability d'une configuration
npx wdio session open ./wdio.conf.ts 0

# Ouvrir Chrome dans une grille cloud
npx wdio session open chrome https://example.com --provider browserstack
```

Voir aussi : [`snapshot`](#snapshot), [`close`](#close), [`doctor`](#doctor).

## `close`

Termine la session et arrête son démon.

Sur une session ouverte par `wdio run --debug=agent`, cette commande fait échouer le test en pause ; utilisez `resume` pour le laisser continuer.

```sh
npx wdio session close
```

**Options**

| Option | Description |
| --- | --- |
| `--all` | Fermer toutes les sessions |
| `--clean` | Supprimer également le répertoire des artefacts |

**Exemples**

```sh
# Fermer la session par défaut
npx wdio session close

# Fermer toutes les sessions et supprimer leurs artefacts
npx wdio session close --all --clean
```

Voir aussi : [`open`](#open), [`list`](#list).

## `list`

Liste les sessions en cours.

Affiche une ligne par session : nom, cible, URL et ancienneté. Supprime l'état laissé par les sessions qui se sont arrêtées.

```sh
npx wdio session list
```

**Exemples**

```sh
# Afficher toutes les sessions en cours
npx wdio session list
```

Voir aussi : [`info`](#info), [`status`](#status).

## `info`

Affiche les détails de la session.

Affiche la cible, le navigateur et sa version, la prise en charge de BiDi, le répertoire des artefacts ainsi que l'URL, le titre, la taille de la fenêtre et le frame actuels (web) ou le contexte et l'activity (mobile).

```sh
npx wdio session info
```

**Exemples**

```sh
# Afficher où en est la session et ce qu'elle exécute
npx wdio session info
```

Voir aussi : [`list`](#list), [`get`](#get).

## `restart`

Ferme puis rouvre avec la même cible et les mêmes options.

Conserve l'historique enregistré, de sorte que `export` couvre toujours les étapes antérieures au redémarrage.

```sh
npx wdio session restart
```

**Exemples**

```sh
# Recommencer avec un navigateur neuf
npx wdio session restart
```

Voir aussi : [`open`](#open), [`close`](#close).

## `status`

Quitte avec le code 0 si la session est en cours, 4 sinon.

```sh
npx wdio session status
```

**Exemples**

```sh
# Ouvrir une session uniquement si aucune n'est en cours
npx wdio session status || npx wdio session open chrome http://localhost:3000
```

Voir aussi : [`list`](#list), [`open`](#open).

## `exec`

Exécute du code WebdriverIO depuis stdin, -e ou un fichier.

S'exécute comme une fonction async avec `browser`, `$`, `$$`, `expect` et `ref('e3')` dans la portée. Les variables de premier niveau persistent entre les appels. `wdio session` sans action exécute `exec` lorsque du code est transmis sur stdin.

Utilisez toujours `await` avec les commandes. `$` renvoie exactement un élément et lève une StrictSelectorError lorsque plusieurs éléments correspondent. Préférez une action unique (click, fill, …) lorsqu'elle suffit ; utilisez `exec` pour les boucles, les conditions et les assertions.

```sh
npx wdio session exec [file]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `file` | non | Fichier de script (.js, .ts, .mjs) |

**Options**

| Option | Description |
| --- | --- |
| `-e, --eval <value>` | Code à exécuter |
| `--history` | Enregistrer le code dans l'historique (utilisez --no-history pour l'ignorer) |

**Exemples**

```sh
# Exécuter une seule ligne
npx wdio session exec -e "await browser.getTitle()"

# Faire une assertion sur la page (les guillemets simples empêchent le shell d'interpréter $)
npx wdio session exec -e 'await expect($("h1")).toHaveText("Cart")'

# Transmettre plusieurs étapes sur stdin
npx wdio session <<'JS'
await $('aria/Sign in').click()
await expect(browser).toHaveUrl(expect.stringContaining('/dashboard'))
JS

# Exécuter un fichier de script
npx wdio session exec ./scripts/login.ts
```

Voir aussi : [`helpers`](#helpers), [`history`](#history), [`export`](#export).

## `helpers`

Liste les helpers du projet depuis .wdio/helpers.

Chaque fichier sous .wdio/helpers exporte par défaut une fonction qui reçoit le navigateur et enregistre des commandes personnalisées avec addCommand. Les helpers sont chargés à l'ouverture de la session et deviennent des commandes personnalisées dans le test exporté.

```sh
npx wdio session helpers
```

**Options**

| Option | Description |
| --- | --- |
| `--reload` | Réimporter les helpers |

**Exemples**

```sh
# Lister les helpers et les commandes qu'ils ajoutent
npx wdio session helpers

# Prendre en compte les modifications d'un helper
npx wdio session helpers --reload
```

Voir aussi : [`exec`](#exec), [`export`](#export).

## `snapshot`

Snapshot d'accessibilité avec refs. S'applique au web, au mobile natif et au bureau natif.

Affiche l'arbre d'accessibilité, un nœud par ligne, p. ex. `button "Add to cart" [ref=e3]`. Passez une ref à click, fill, get et aux autres actions. Les refs restent valides tant que l'élément existe ; une action sur un élément supprimé échoue avec REF_STALE.

Chaque snapshot est écrit dans le répertoire des artefacts. Une sortie plus longue que --max-chars est affichée en plusieurs parties : la première partie, puis `--offset <line>` pour la suivante. `find` recherche dans l'ensemble.

La mise en forme du texte et la structure de --json sont expérimentales et peuvent changer dans une version mineure. La syntaxe des refs et les actions qui acceptent une ref restent stables.

```sh
npx wdio session snapshot
```

**Options**

| Option | Description |
| --- | --- |
| `--depth <n>` | Profondeur maximale |
| `--scope <value>` | Ne capturer que ce qui se trouve sous cette ref ou ce sélecteur |
| `-i, --interactive` | Uniquement les éléments interactifs |
| `--all` | Inclure les éléments masqués |
| `--boxes` | Ajouter les boîtes englobantes |
| `--viewport` | Uniquement ce qui est dans le viewport (web : ne met pas à jour la référence du diff) |
| `--selectors` | Terminer chaque ligne de ref par son meilleur sélecteur |
| `--compact` | Omettre les nœuds sans nom et sans contenu |
| `-u, --urls` | Inclure les href des liens |
| `--file-only` | Écrire uniquement le fichier |
| `--max-chars <n>` | Afficher au maximum ce nombre de caractères à la fois (8000 par défaut) |
| `--offset <n>` | Afficher à partir de cette ligne, pour la partie suivante d'un long snapshot |

**Exemples**

```sh
# Uniquement les éléments interactifs, le premier coup d'œil habituel
npx wdio session snapshot -i

# Page entière avec les cibles des liens
npx wdio session snapshot --compact --urls

# Seulement une partie de la page
npx wdio session snapshot --scope "#checkout" --depth 4

# Ce qui est actuellement à l'écran
npx wdio session snapshot --viewport -i

# Chaque ref avec un sélecteur à utiliser dans un test
npx wdio session snapshot --selectors -i

# Agir, puis regarder à nouveau
npx wdio session click e3 && npx wdio session snapshot -i
```

Voir aussi : [`find`](#find), [`diff`](#diff), [`screenshot`](#screenshot).

## `read`

Lit le texte de la page au format Markdown. S'applique au web.

Titres, paragraphes, éléments de liste, lignes de tableau et liens avec leur URL, issus du contenu principal lorsque la page le signale (main, article), sinon de la page entière ; la navigation, les pieds de page et le texte masqué sont exclus. Tronqué à --max-chars (6000 par défaut) ; la troncature indique quel --offset permet de lire la partie suivante. Avec --scope, la section défile jusqu'à être visible. Utilisez cette commande pour répondre à « que dit la page » ; utilisez snapshot ou find pour obtenir des refs sur lesquelles agir.

```sh
npx wdio session read
```

**Options**

| Option | Description |
| --- | --- |
| `--scope <value>` | Ne lire que ce qui se trouve sous cette ref ou ce sélecteur |
| `--max-chars <n>` | Afficher au maximum ce nombre de caractères (6000 par défaut) |
| `--offset <n>` | Commencer à ce caractère du texte, pour la partie suivante d'une longue page |

**Exemples**

```sh
# Lire le contenu principal
npx wdio session read

# Lire une section
npx wdio session read --scope e12
```

Voir aussi : [`find`](#find), [`snapshot`](#snapshot), [`get`](#get).

## `find`

Recherche du texte dans un nouveau snapshot. S'applique au web, au mobile natif et au bureau natif.

Prend un nouveau snapshot et affiche chaque correspondance avec le nœud qui l'entoure (p. ex. l'élément de liste entier, afin d'inclure une valeur voisine de la correspondance), avec les numéros de ligne et les refs, puis fait défiler jusqu'à la première correspondance. La recherche ignore la casse, puis les espaces ("SO2" trouve "SO 2"), puis cherche tous les mots et des mots similaires. Le texte qui ne se trouve que dans des parties masquées de la page (menus fermés, onglets, "Show more") est signalé comme tel. Moins coûteux que la lecture d'un snapshot complet d'une grande page. -A/-B/-C affichent à la place un simple contexte de lignes, comme grep.

```sh
npx wdio session find <text>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `text` | oui | Texte à rechercher |

**Options**

| Option | Description |
| --- | --- |
| `--regex` | Traiter le texte comme une expression régulière |
| `--scope <value>` | Ne rechercher que sous cette ref ou ce sélecteur |
| `-C, --context <n>` | Lignes de contexte avant et après, au lieu du nœud environnant |
| `-A, --after-context <n>` | Lignes de contexte après chaque correspondance |
| `-B, --before-context <n>` | Lignes de contexte avant chaque correspondance |
| `--offset <n>` | Ignorer ce nombre de correspondances, pour obtenir les suivantes lorsque la sortie est tronquée |

**Exemples**

```sh
# Trouver la ref d'un bouton
npx wdio session find "Add to cart"

# Lister tous les liens
npx wdio session find "^\s*link" --regex --context 0
```

Voir aussi : [`snapshot`](#snapshot), [`wait`](#wait).

## `diff`

Compare un nouveau snapshot au précédent. S'applique au web, au mobile natif et au bureau natif.

Affiche un diff unifié de ce qui a changé depuis le dernier snapshot, ou "No changes". Le premier appel enregistre une référence. Utilisez-le après une action pour voir ce que l'action a fait sans relire toute la page. Sur le web, la référence est le dernier snapshot pris sans `--viewport`.

```sh
npx wdio session diff
```

**Options**

| Option | Description |
| --- | --- |
| `--baseline <value>` | Fichier de snapshot avec lequel comparer |
| `--scope <value>` | Ne capturer que ce qui se trouve dans cette ref ou ce sélecteur, comme `snapshot --scope` |
| `--interactive` | Uniquement les éléments interactifs, comme `snapshot -i` |

**Exemples**

```sh
# Voir ce qu'un clic a modifié
npx wdio session click e7 && npx wdio session diff

# Comparer avec un snapshot enregistré
npx wdio session diff --baseline before.yml
```

Voir aussi : [`snapshot`](#snapshot), [`find`](#find).

## `screenshot`

Enregistre un PNG du viewport, d'un élément ou de la page entière. S'applique au web, au mobile natif et au bureau natif.

Affiche le chemin du fichier et la taille de l'image. Prenez une capture d'écran lorsque la question porte sur la mise en page ou l'apparence ; lisez le texte et l'état avec `snapshot` et `get`.

```sh
npx wdio session screenshot [target]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | non | Ref ou sélecteur de l'élément à capturer |

**Options**

| Option | Description |
| --- | --- |
| `--full` | Page entière (web) |
| `--path <value>` | Fichier de sortie |

**Exemples**

```sh
# Capturer le viewport
npx wdio session screenshot

# Capturer un élément
npx wdio session screenshot e5 --path card.png

# Capturer la page entière
npx wdio session screenshot --full
```

Voir aussi : [`visual`](#visual), [`pdf`](#pdf), [`snapshot`](#snapshot).

## `pdf`

Enregistre la page actuelle au format PDF. S'applique au web.

Appelle `browser.savePDF`. Une session BiDi imprime avec `browsingContext.print`, en mode headed ou headless, dans Chrome, Edge et Firefox. Une session Classic utilise `printPage`, que les anciennes versions de Chrome ne prennent en charge qu'en mode headless.

```sh
npx wdio session pdf [file]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `file` | non | Fichier de sortie (doit se terminer par .pdf) |

**Options**

| Option | Description |
| --- | --- |
| `--path <value>` | Fichier de sortie (doit se terminer par .pdf) |

**Exemples**

```sh
# Écrire report.pdf dans le répertoire courant
npx wdio session pdf report.pdf
```

Voir aussi : [`screenshot`](#screenshot).

## `source`

Enregistre le HTML de la page ou le XML de l'application. S'applique au web, au mobile natif et au bureau natif.

Écrit le fichier et affiche son chemin et sa taille. Utilisez cette commande lorsqu'un snapshot masque ce dont vous avez besoin, comme les attributs pour un sélecteur.

```sh
npx wdio session source
```

**Options**

| Option | Description |
| --- | --- |
| `--path <value>` | Fichier de sortie |

**Exemples**

```sh
# Enregistrer le HTML dans le répertoire courant
npx wdio session source --path page.html
```

Voir aussi : [`snapshot`](#snapshot), [`get`](#get).

## `get`

Lit le texte, le html, la valeur, un attribut, le titre, l'URL, un nombre d'éléments ou une boîte. S'applique au web.

Affiche la valeur, puis le code WebdriverIO exécuté (`→ …`). Passez -q pour n'afficher que la valeur, p. ex. pour la récupérer dans une variable shell. Lisez une valeur avant d'écrire une assertion à son sujet.

```sh
npx wdio session get <sub> [target] [name]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | text \| html \| value \| attr \| title \| url \| count \| box |
| `target` | non | Ref ou sélecteur (non utilisé pour title et url) |
| `name` | non | Nom de l'attribut (attr uniquement) |

**Exemples**

```sh
# Texte d'une ref
npx wdio session get text e1

# URL actuelle
npx wdio session get url

# Uniquement la valeur, pour une variable shell
url=$(npx wdio session get url -q)

# href d'un lien
npx wdio session get attr e3 href

# Nombre d'éléments correspondants
npx wdio session get count "aria/Remove"
```

Voir aussi : [`is`](#is), [`wait`](#wait), [`exec`](#exec).

## `is`

Vérifie si un élément est visible, activé ou coché. S'applique au web.

Affiche true ou false, puis le code WebdriverIO exécuté ; passez -q pour n'afficher que la valeur. Le code de sortie est 0 dans les deux cas.

```sh
npx wdio session is <sub> <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | visible \| enabled \| checked |
| `target` | oui | Ref ou sélecteur |

**Exemples**

```sh
# Afficher true ou false
npx wdio session is visible e1

# Vérifier un bouton par son libellé
npx wdio session is enabled "aria/Place order"
```

Voir aussi : [`get`](#get), [`wait`](#wait).

## `logs`

Affiche les logs de la console, des erreurs de page, du réseau et de l'appareil depuis le dernier appel. S'applique au web et au mobile natif.

Chaque appel fait avancer un curseur de lecture, de sorte que l'appel suivant n'affiche que les nouvelles entrées. Exécutez cette commande après une action pour voir les erreurs causées par cette action.

```sh
npx wdio session logs
```

**Options**

| Option | Description |
| --- | --- |
| `--errors` | Uniquement les erreurs |
| `--network` | Uniquement les entrées réseau |
| `--since <value>` | Uniquement les entrées plus récentes que cette durée (p. ex. 30s) |
| `--peek` | Ne pas faire avancer le curseur de lecture |
| `--source <browser\|driver\|logcat\|syslog\|main>` | Source des logs |

**Exemples**

```sh
# Erreurs causées par un clic
npx wdio session click e4 && npx wdio session logs --errors

# Entrées récentes, conservées pour le prochain appel
npx wdio session logs --since 30s --peek
```

Voir aussi : [`requests`](#requests).

## `navigate`

Ouvre une URL. S'applique au web.

Accepte `example.com`, les URL complètes et les chemins relatifs à baseUrl. Quitte d'abord tout frame. Affiche la nouvelle URL et le titre.

```sh
npx wdio session navigate <url>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `url` | oui | URL (les URL relatives utilisent baseUrl) |

**Exemples**

```sh
# Aller sur une page et l'examiner
npx wdio session navigate /cart && npx wdio session snapshot -i

# Ouvrir un autre site
npx wdio session navigate example.com
```

Voir aussi : [`back`](#back), [`reload`](#reload), [`wait`](#wait).

## `back`

Revient en arrière. S'applique au web.

```sh
npx wdio session back
```

**Exemples**

```sh
# Revenir d'une page en arrière
npx wdio session back
```

Voir aussi : [`forward`](#forward), [`navigate`](#navigate).

## `forward`

Avance. S'applique au web.

```sh
npx wdio session forward
```

**Exemples**

```sh
# Avancer d'une page
npx wdio session forward
```

Voir aussi : [`back`](#back), [`navigate`](#navigate).

## `reload`

Recharge la page. S'applique au web.

```sh
npx wdio session reload
```

**Exemples**

```sh
# Recharger et attendre que le réseau soit au repos
npx wdio session reload && npx wdio session wait --load networkidle
```

Voir aussi : [`navigate`](#navigate), [`wait`](#wait).

## `wait`

Attend un élément, un texte, une URL, un état de chargement, une condition ou quelques millisecondes. S'applique au web.

Passez exactement l'un des éléments suivants : une ref ou un sélecteur, --text, --url, --load, --fn, ou un nombre de millisecondes. Échoue avec le code de sortie 1 après --limit.

Préférez une condition à une pause, ici comme à la place de `sleep` dans une chaîne. Une pause de plus de 30 secondes est refusée.

```sh
npx wdio session wait [target]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | non | Ref, sélecteur ou millisecondes |

**Options**

| Option | Description |
| --- | --- |
| `--text <value>` | Attendre que la page contienne ce texte |
| `--url <value>` | Attendre que l'URL corresponde (sous-chaîne, ou globs * et **) |
| `--load <value>` | domcontentloaded, load ou networkidle |
| `--fn <value>` | Attendre que cette expression JavaScript soit vraie |
| `--state <value>` | Avec une cible : visible (par défaut), hidden, enabled ou disabled |
| `--limit <n>` | Millisecondes d'attente (10000 par défaut) |

**Exemples**

```sh
# Attendre qu'une ref soit visible
npx wdio session wait e1

# Attendre qu'un indicateur de chargement disparaisse
npx wdio session wait "aria/Loading" --state hidden

# Agir, attendre le résultat, regarder à nouveau
npx wdio session click e3 && npx wdio session wait --text "Cart (1)" && npx wdio session snapshot -i

# Attendre une URL
npx wdio session wait --url "**/dashboard"

# Attendre qu'aucune requête ne soit en cours
npx wdio session wait --load networkidle

# Pause de 500 ms
npx wdio session wait 500
```

Voir aussi : [`find`](#find), [`is`](#is), [`get`](#get).

## `click`

Clique sur un élément. S'applique au web, au mobile natif et au bureau natif.

Affiche ce qui a été cliqué et, si le clic a entraîné une navigation, la nouvelle URL. Prenez un nouveau snapshot avant d'utiliser des refs sur la page suivante. Un élément masqué ou recouvert échoue immédiatement en indiquant ce qui gêne. `x,y` clique sur un point du viewport (en pixels depuis le coin supérieur gauche, comme sur une capture d'écran) pour ce qui n'a pas de ref, comme un canvas ou une carte.

```sh
npx wdio session click <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12), sélecteur WebdriverIO ou coordonnées x,y du viewport |

**Options**

| Option | Description |
| --- | --- |
| `--double` | Double-clic |
| `--right` | Clic droit |
| `--new-tab` | Ouvrir le lien dans un nouvel onglet et y basculer |

**Exemples**

```sh
# Cliquer sur une ref du dernier snapshot
npx wdio session click e3

# Cliquer par nom accessible
npx wdio session click "aria/Add to cart"

# Cliquer, attendre, regarder à nouveau
npx wdio session click e3 && npx wdio session wait --load networkidle && npx wdio session snapshot -i

# Ouvrir un lien dans un nouvel onglet
npx wdio session click e8 --new-tab

# Cliquer sur un point du viewport, p. ex. sur une carte
npx wdio session click 320,480
```

Voir aussi : [`tap`](#tap), [`fill`](#fill), [`wait`](#wait), [`snapshot`](#snapshot).

## `tap`

Touche un élément (mobile). S'applique au mobile natif.

```sh
npx wdio session tap <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Exemples**

```sh
# Toucher une ref du dernier snapshot
npx wdio session tap e2
```

Voir aussi : [`click`](#click), [`long-press`](#long-press), [`swipe`](#swipe).

## `fill`

Remplace la valeur d'un champ de saisie. S'applique au web, au mobile natif et au bureau natif.

Vide d'abord le champ. Pour saisir du texte dans l'élément qui a le focus, utilisez `type` ; pour envoyer des touches comme Entrée, utilisez `press`.

```sh
npx wdio session fill <target> <text..>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |
| `text` | oui | Texte (les mots après la cible sont joints par des espaces) |

**Exemples**

```sh
# Remplir un champ
npx wdio session fill e2 ada@example.com

# Remplir un formulaire et le soumettre
npx wdio session fill e2 ada@example.com && npx wdio session fill e4 secret && npx wdio session press Enter
```

Voir aussi : [`type`](#type), [`press`](#press), [`select`](#select), [`check`](#check).

## `type`

Saisit du texte dans un élément ou dans l'élément qui a le focus. S'applique au web, au mobile natif et au bureau natif.

Envoie le texte sous forme de frappes de touches sans rien effacer : `type e2 Ada` saisit dans e2, `type Ada` dans l'élément qui a le focus. Pour remplacer une valeur, utilisez `fill`.

```sh
npx wdio session type <text..>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `text` | oui | Texte (les mots sont joints par des espaces). Commencez par une ref, p. ex. `type e2 Ada`, pour saisir dans cet élément plutôt que dans celui qui a le focus |

**Exemples**

```sh
# Saisir dans un champ
npx wdio session type e5 hello

# Saisir dans l'élément qui a le focus
npx wdio session focus e5 && npx wdio session type "hello"
```

Voir aussi : [`fill`](#fill), [`press`](#press), [`focus`](#focus).

## `press`

Appuie sur des touches, p. ex. Enter, Control+a. S'applique au web et au bureau natif.

Combinez les touches avec +. Les noms ne tiennent pas compte de la casse ; ctrl, cmd, esc, up, down, left et right sont acceptés comme formes abrégées.

```sh
npx wdio session press <keys>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `keys` | oui | Combinaison de touches |

**Options**

| Option | Description |
| --- | --- |
| `--times <n>` | Appuyer ce nombre de fois (jusqu'à 100), p. ex. pour déplacer un curseur |

**Exemples**

```sh
# Soumettre un formulaire
npx wdio session press Enter

# Déplacer de cinq crans un curseur qui a le focus
npx wdio session press ArrowRight --times 5

# Tout sélectionner
npx wdio session press Control+a

# Ramener le focus en arrière
npx wdio session press Shift+Tab
```

Voir aussi : [`type`](#type), [`fill`](#fill).

## `select`

Sélectionne une option d'un `<select>`. S'applique au web.

```sh
npx wdio session select <target> <value>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |
| `value` | oui | Texte, valeur ou index de l'option |

**Options**

| Option | Description |
| --- | --- |
| `--by <text\|value\|index>` | Manière de faire correspondre l'option (text par défaut) |

**Exemples**

```sh
# Sélectionner par texte visible
npx wdio session select e6 Germany

# Sélectionner par valeur
npx wdio session select e6 de --by value
```

Voir aussi : [`fill`](#fill), [`check`](#check).

## `upload`

Renseigne un champ de fichier. S'applique au web.

Le chemin est relatif à votre répertoire de travail. Ciblez le `<input type="file">` lui-même, et non le bouton qui ouvre le sélecteur de fichiers.

```sh
npx wdio session upload <target> <file>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |
| `file` | oui | Fichier à téléverser |

**Exemples**

```sh
# Joindre un fichier
npx wdio session upload e9 ./fixtures/avatar.png
```

Voir aussi : [`fill`](#fill).

## `hover`

Déplace le pointeur au-dessus d'un élément. S'applique au web et au bureau natif.

```sh
npx wdio session hover <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Exemples**

```sh
# Ouvrir un menu au survol et l'examiner
npx wdio session hover e4 && npx wdio session snapshot -i
```

Voir aussi : [`click`](#click).

## `focus`

Donne le focus à un élément. S'applique au web.

```sh
npx wdio session focus <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Exemples**

```sh
# Donner le focus à un champ avant `type`
npx wdio session focus e5
```

Voir aussi : [`type`](#type), [`press`](#press).

## `check`

Coche une case à cocher ou un bouton radio. S'applique au web.

Ne fait rien si l'élément est déjà coché, et échoue s'il ne finit pas coché.

```sh
npx wdio session check <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Exemples**

```sh
# Accepter les conditions
npx wdio session check e7
```

Voir aussi : [`uncheck`](#uncheck), [`is`](#is).

## `uncheck`

Décoche une case à cocher. S'applique au web.

Ne fait rien si elle est déjà décochée. Un bouton radio sélectionné ne peut pas être décoché.

```sh
npx wdio session uncheck <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Exemples**

```sh
# Se désinscrire de la newsletter
npx wdio session uncheck e7
```

Voir aussi : [`check`](#check), [`is`](#is).

## `drag`

Fait glisser un élément sur un autre. S'applique au web, au mobile natif et au bureau natif.

```sh
npx wdio session drag <from> <to>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `from` | oui | Ref ou sélecteur à faire glisser |
| `to` | oui | Ref ou sélecteur sur lequel déposer |

**Exemples**

```sh
# Déplacer une carte vers une autre colonne
npx wdio session drag e3 e9
```

Voir aussi : [`scroll`](#scroll).

## `scroll`

Fait défiler un élément jusqu'à le rendre visible, ou fait défiler la page. S'applique au web.

Sans cible, fait défiler de 600px vers le bas. Le contenu chargé à la demande apparaît dans le snapshot suivant.

```sh
npx wdio session scroll [target]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | non | Ref, sélecteur, up, down, top ou bottom |

**Options**

| Option | Description |
| --- | --- |
| `--px <n>` | Pixels pour up/down (600 par défaut) |

**Exemples**

```sh
# Rendre un élément visible
npx wdio session scroll e40

# Charger plus de résultats et les examiner
npx wdio session scroll bottom && npx wdio session snapshot -i

# Faire défiler de deux écrans
npx wdio session scroll down --px 1200
```

Voir aussi : [`swipe`](#swipe), [`snapshot`](#snapshot).

## `swipe`

Balaie l'écran (mobile). S'applique au mobile natif.

```sh
npx wdio session swipe <direction>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `direction` | oui | up \| down \| left \| right |

**Options**

| Option | Description |
| --- | --- |
| `--percent <n>` | Longueur du balayage 0..1 |

**Exemples**

```sh
# Faire défiler une liste et l'examiner
npx wdio session swipe up && npx wdio session snapshot
```

Voir aussi : [`scroll`](#scroll), [`tap`](#tap).

## `long-press`

Effectue un appui long sur un élément (mobile). S'applique au mobile natif.

```sh
npx wdio session long-press <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref (e12) ou sélecteur WebdriverIO |

**Options**

| Option | Description |
| --- | --- |
| `--duration <n>` | Millisecondes |

**Exemples**

```sh
# Ouvrir un menu contextuel
npx wdio session long-press e4 --duration 1500
```

Voir aussi : [`tap`](#tap).

## `tabs`

Liste, ouvre, change ou ferme des onglets. S'applique au web.

Sans sous-commande, liste les onglets avec leur index ; l'onglet actuel est marqué. `new` ouvre un onglet et y bascule. `switch` et `close` acceptent un index ou un handle.

```sh
npx wdio session tabs [sub] [arg]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | non | switch \| new \| close |
| `arg` | non | Index, handle ou URL |

**Exemples**

```sh
# Lister les onglets
npx wdio session tabs

# Ouvrir un onglet
npx wdio session tabs new http://localhost:3000/help

# Revenir au premier onglet
npx wdio session tabs switch 0

# Fermer le deuxième onglet
npx wdio session tabs close 1
```

Voir aussi : [`windows`](#windows), [`frame`](#frame).

## `windows`

Liste ou change de fenêtres. S'applique au web et au bureau natif.

```sh
npx wdio session windows [sub] [arg]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | non | switch |
| `arg` | non | Index ou handle |

**Exemples**

```sh
# Lister les fenêtres
npx wdio session windows

# Basculer vers la deuxième fenêtre
npx wdio session windows switch 1
```

Voir aussi : [`tabs`](#tabs).

## `frame`

Bascule dans une iframe, vers le parent ou vers le document principal. S'applique au web.

Le snapshot de la page affiche déjà le contenu de ses iframes, avec des refs utilisables directement par les actions ; `frame` n'est donc nécessaire que pour travailler un moment à l'intérieur d'un frame ou pour voir un frame que le snapshot a tronqué. Les snapshots et les actions s'appliquent au frame actuel jusqu'à ce que vous en sortiez. `navigate` revient au document principal.

```sh
npx wdio session frame <target>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | oui | Ref, sélecteur, parent ou top |

**Exemples**

```sh
# Entrer dans une iframe et regarder à l'intérieur
npx wdio session frame e12 && npx wdio session snapshot -i

# Revenir à la page
npx wdio session frame top
```

Voir aussi : [`tabs`](#tabs), [`snapshot`](#snapshot).

## `contexts`

Liste ou change les contextes natifs/webview. S'applique au mobile natif.

```sh
npx wdio session contexts [sub] [name]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | non | switch |
| `name` | non | Nom du contexte |

**Exemples**

```sh
# Lister les contextes NATIVE_APP et WEBVIEW
npx wdio session contexts

# Piloter la webview
npx wdio session contexts switch WEBVIEW_com.example.shop
```

Voir aussi : [`snapshot`](#snapshot).

## `dialog`

Accepte, rejette ou décrit une boîte de dialogue ouverte. S'applique au web et au mobile natif.

Une alert, un confirm ou un prompt ouvert bloque les autres actions, qui échouent en suggérant d'exécuter cette commande.

```sh
npx wdio session dialog <sub>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | accept \| dismiss \| status |

**Options**

| Option | Description |
| --- | --- |
| `--text <value>` | Texte du prompt (accept uniquement) |

**Exemples**

```sh
# Afficher la boîte de dialogue ouverte
npx wdio session dialog status

# Confirmer
npx wdio session dialog accept

# Répondre à un prompt
npx wdio session dialog accept --text "Ada"
```

Voir aussi : [`click`](#click).

## `app`

Lance, arrête, installe ou interroge une application. S'applique au mobile natif et au bureau natif.

```sh
npx wdio session app <sub> <id>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | launch \| terminate \| install \| state |
| `id` | oui | Id de l'application, bundle id ou fichier |

**Exemples**

```sh
# Redémarrer l'application
npx wdio session app terminate com.example.shop && npx wdio session app launch com.example.shop

# Est-elle en cours d'exécution ?
npx wdio session app state com.example.shop
```

Voir aussi : [`deeplink`](#deeplink), [`background`](#background).

## `deeplink`

Ouvre un deep link. S'applique au mobile natif.

```sh
npx wdio session deeplink <url>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `url` | oui | URL |

**Options**

| Option | Description |
| --- | --- |
| `--package <value>` | Package Android ou bundle id iOS |

**Exemples**

```sh
# Ouvrir un écran produit
npx wdio session deeplink shop://product/42 --package com.example.shop
```

Voir aussi : [`app`](#app).

## `rotate`

Fait pivoter l'appareil. S'applique au mobile natif.

```sh
npx wdio session rotate <orientation>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `orientation` | oui | portrait \| landscape |

**Exemples**

```sh
# Mettre l'appareil à l'horizontale
npx wdio session rotate landscape
```

## `keyboard`

Masque le clavier à l'écran. S'applique au mobile natif.

```sh
npx wdio session keyboard <sub>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | hide |

**Exemples**

```sh
# Découvrir les éléments situés sous le clavier
npx wdio session keyboard hide
```

## `background`

Envoie l'application en arrière-plan. S'applique au mobile natif.

```sh
npx wdio session background <seconds>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `seconds` | oui | Secondes (-1 l'y laisse) |

**Exemples**

```sh
# Mettre l'application en arrière-plan pendant 3 secondes
npx wdio session background 3
```

Voir aussi : [`app`](#app).

## `lock`

Verrouille l'appareil. S'applique au mobile natif.

```sh
npx wdio session lock
```

**Exemples**

```sh
# Verrouiller l'écran
npx wdio session lock
```

Voir aussi : [`unlock`](#unlock).

## `unlock`

Déverrouille l'appareil. S'applique au mobile natif.

```sh
npx wdio session unlock
```

**Exemples**

```sh
# Déverrouiller l'écran
npx wdio session unlock
```

Voir aussi : [`lock`](#lock).

## `geolocation`

Définit la géolocalisation. S'applique au web et au mobile natif.

```sh
npx wdio session geolocation <lat> <lon>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `lat` | oui | Latitude |
| `lon` | oui | Longitude |

**Options**

| Option | Description |
| --- | --- |
| `--accuracy <n>` | Précision en mètres |

**Exemples**

```sh
# Faire comme si l'on était à Berlin
npx wdio session geolocation 52.52 13.405
```

Voir aussi : [`emulate`](#emulate).

## `emulate`

Émule un appareil, un viewport, le réseau, le cpu, l'horloge ou une portée d'émulation BiDi. S'applique au web.

Une émulation reste active jusqu'à `emulate reset` ou jusqu'à la fin de la session ; redéfinir le même type la remplace. `emulate device` sans valeur liste les noms d'appareils. Les préréglages réseau et la limitation du cpu nécessitent un navigateur Chromium.

```sh
npx wdio session emulate <sub> [value]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | device \| viewport \| network \| cpu \| clock \| color-scheme \| user-agent \| media \| locale \| timezone \| touch \| orientation \| screen \| viewport-meta \| text-layout \| scripting \| scrollbar \| forced-colors \| reset |
| `value` | non | Valeur de l'émulation |

**Options**

| Option | Description |
| --- | --- |
| `--dpr <n>` | Ratio de pixels de l'appareil (viewport) |
| `--tick <n>` | Avancer l'horloge émulée de ce nombre de ms (clock) |

**Exemples**

```sh
# Émuler un téléphone
npx wdio session emulate device "iPhone 15"

# Définir un viewport
npx wdio session emulate viewport 375x812 --dpr 3

# Passer hors ligne
npx wdio session emulate network offline

# Mode sombre
npx wdio session emulate color-scheme dark

# Figer la date
npx wdio session emulate clock 2030-01-01T00:00:00Z

# Réduire les animations
npx wdio session emulate media prefersReducedMotion=reduce

# Annuler toutes les émulations
npx wdio session emulate reset
```

Voir aussi : [`geolocation`](#geolocation), [`screenshot`](#screenshot).

## `requests`

Liste les requêtes réseau capturées (BiDi). S'applique au web.

```sh
npx wdio session requests
```

**Options**

| Option | Description |
| --- | --- |
| `--filter <value>` | Sous-chaîne ou glob |
| `--failed` | Uniquement les requêtes en échec |
| `--since <value>` | Uniquement les requêtes plus récentes que cette durée |
| `--limit <n>` | Nombre maximal de lignes (50 par défaut) |

**Exemples**

```sh
# Uniquement les appels d'API
npx wdio session requests --filter "**/api/**"

# Requêtes cassées par un clic
npx wdio session click e3 && npx wdio session requests --failed --since 10s
```

Voir aussi : [`mock`](#mock), [`logs`](#logs).

## `mock`

Simule les réponses pour un motif d'URL (BiDi). S'applique au web.

Affiche l'id du mock (m1, m2, …). Simuler à nouveau le même motif remplace le mock précédent.

```sh
npx wdio session mock <pattern>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `pattern` | oui | Motif d'URL |

**Options**

| Option | Description |
| --- | --- |
| `--status <n>` | Code de statut |
| `--body <value>` | Corps en JSON/texte ou chemin de fichier |
| `--header <value>` | En-tête k:v (répétable) |
| `--abort` | Interrompre les requêtes correspondantes |
| `--method <value>` | Uniquement cette méthode |
| `--once` | Uniquement la prochaine requête |

**Exemples**

```sh
# Renvoyer un JSON fixe
npx wdio session mock "**/api/user" --body '{"name":"Mocked"}'

# Faire échouer la prochaine requête
npx wdio session mock "**/api/cart" --status 500 --once

# Bloquer les images
npx wdio session mock "**/*.png" --abort
```

Voir aussi : [`unmock`](#unmock), [`requests`](#requests).

## `unmock`

Supprime des mocks. S'applique au web.

```sh
npx wdio session unmock [pattern]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `pattern` | non | Motif ou id du mock |

**Options**

| Option | Description |
| --- | --- |
| `--all` | Supprimer tous les mocks |

**Exemples**

```sh
# Supprimer un mock
npx wdio session unmock m1

# Supprimer tous les mocks
npx wdio session unmock --all
```

Voir aussi : [`mock`](#mock).

## `cookies`

Lit, définit ou supprime des cookies. S'applique au web.

Sans sous-commande, affiche chaque cookie sous la forme name=value. `clear` sans nom supprime tous les cookies.

```sh
npx wdio session cookies [sub] [name] [value]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | non | get \| set \| clear |
| `name` | non | Nom du cookie |
| `value` | non | Valeur du cookie |

**Options**

| Option | Description |
| --- | --- |
| `--domain <value>` | Domaine du cookie (set) |
| `--path <value>` | Chemin du cookie (set) |
| `--http-only` | Cookie HttpOnly (set) |
| `--secure` | Cookie Secure (set) |
| `--same-site <value>` | lax, strict, none ou default (set) |
| `--expiry <n>` | Expiration sous forme de timestamp Unix en secondes (set) |

**Exemples**

```sh
# Lister les cookies
npx wdio session cookies

# Valeur d'un cookie
npx wdio session cookies get session

# Définir un cookie et recharger
npx wdio session cookies set session abc && npx wdio session reload

# Supprimer tous les cookies
npx wdio session cookies clear
```

Voir aussi : [`storage`](#storage), [`state`](#state).

## `storage`

Lit, définit ou vide le localStorage (ou le sessionStorage). S'applique au web.

Sans sous-commande, affiche chaque entrée. `clear` sans clé vide le stockage.

```sh
npx wdio session storage [sub] [key] [value]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | non | get \| set \| clear |
| `key` | non | Clé |
| `value` | non | Valeur |

**Options**

| Option | Description |
| --- | --- |
| `--session-storage` | Utiliser le sessionStorage |

**Exemples**

```sh
# Lister le localStorage
npx wdio session storage

# Définir une clé
npx wdio session storage set token abc

# Vider le sessionStorage
npx wdio session storage clear --session-storage
```

Voir aussi : [`cookies`](#cookies), [`state`](#state).

## `state`

Enregistre ou charge les cookies et le stockage. S'applique au web.

`save` écrit les cookies, le localStorage et le sessionStorage de l'origine actuelle dans un fichier JSON. `load` ouvre cette origine et les restaure, p. ex. pour éviter une connexion.

```sh
npx wdio session state <sub> <file>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | save \| load |
| `file` | oui | Fichier d'état |

**Exemples**

```sh
# Enregistrer un état connecté
npx wdio session state save .wdio/logged-in.json

# Démarrer en étant connecté
npx wdio session state load .wdio/logged-in.json && npx wdio session reload
```

Voir aussi : [`cookies`](#cookies), [`storage`](#storage).

## `visual`

Snapshots visuels via @wdio/visual-service. S'applique au web, au mobile natif et au bureau natif.

`save` enregistre une référence sous .wdio/visual/baseline, `check` compare avec celle-ci et affiche l'écart, `accept` transforme la dernière image réelle en référence, `list` affiche les tags. Nécessite @wdio/visual-service dans le projet.

```sh
npx wdio session visual <sub> [tag]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | save \| check \| accept \| list |
| `tag` | non | Tag de l'image |

**Options**

| Option | Description |
| --- | --- |
| `--element <value>` | Uniquement cet élément |
| `--full` | Page entière |
| `--tabbable` | Page tabulable |
| `--threshold <n>` | Écart autorisé en pourcentage (0 par défaut) |
| `--all` | accept : tous les tags |

**Exemples**

```sh
# Enregistrer une référence
npx wdio session visual save cart

# Comparer avec celle-ci
npx wdio session visual check cart --threshold 0.5

# Accepter une modification voulue
npx wdio session visual accept cart
```

Voir aussi : [`screenshot`](#screenshot).

## `trace`

Enregistre chaque étape avec des captures d'écran et des snapshots.

`stop` affiche le répertoire de la trace et une transcription des étapes.

```sh
npx wdio session trace <sub>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | start \| stop |

**Options**

| Option | Description |
| --- | --- |
| `--screenshots` | Capture d'écran après chaque étape (utilisez --no-screenshots pour l'ignorer) |
| `--snapshots` | Snapshot après chaque étape (utilisez --no-snapshots pour l'ignorer) |

**Exemples**

```sh
# Démarrer le traçage
npx wdio session trace start

# Arrêter et afficher la transcription
npx wdio session trace stop
```

Voir aussi : [`record`](#record), [`history`](#history).

## `record`

Enregistre une vidéo. S'applique au web et au mobile natif.

```sh
npx wdio session record <sub>
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `sub` | oui | start \| stop |

**Options**

| Option | Description |
| --- | --- |
| `--fps <n>` | Images par seconde (5 par défaut) |
| `--path <value>` | Fichier de sortie |

**Exemples**

```sh
# Démarrer l'enregistrement
npx wdio session record start

# Arrêter et enregistrer la vidéo
npx wdio session record stop --path checkout.mp4
```

Voir aussi : [`trace`](#trace), [`screenshot`](#screenshot).

## `history`

Affiche les étapes enregistrées.

Chaque action qui modifie la page enregistre le code WebdriverIO qu'elle a exécuté. `export` transforme cet historique en spec.

```sh
npx wdio session history
```

**Options**

| Option | Description |
| --- | --- |
| `--clear` | Effacer l'historique |

**Exemples**

```sh
# Afficher les étapes jusqu'ici
npx wdio session history

# Recommencer l'enregistrement avant les étapes que vous voulez conserver
npx wdio session history --clear
```

Voir aussi : [`export`](#export), [`exec`](#exec).

## `export`

Génère une spec à partir de l'historique.

Écrit une spec describe/it avec les étapes enregistrées. Les refs deviennent des sélecteurs stables et les helpers des commandes personnalisées. Sans --out, le fichier est placé dans le répertoire des artefacts. Exécutez-la avec `wdio run` pour confirmer qu'elle passe.

```sh
npx wdio session export
```

**Options**

| Option | Description |
| --- | --- |
| `--out <value>` | Fichier de sortie |
| `--title <value>` | Titre de la suite |
| `--page-objects` | Générer des page objects |
| `--framework <mocha\|jasmine>` | Framework (mocha par défaut) |

**Exemples**

```sh
# Écrire la spec
npx wdio session export --out test/specs/cart.e2e.ts

# Écrire la spec et l'exécuter
npx wdio session export --out test/specs/cart.e2e.ts && npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Voir aussi : [`history`](#history), [`helpers`](#helpers).

## `resume`

Reprend un test mis en pause par wdio run --debug=agent.

`wdio run --debug=agent` met en pause un test en échec et l'expose en tant que session debug-`<worker>`. Inspectez-le avec n'importe quelle action, puis reprenez. `close` sur cette session fait au contraire échouer le test.

```sh
npx wdio session resume
```

**Exemples**

```sh
# Examiner le test en pause, puis le laisser continuer
npx wdio session -s debug-0-0 snapshot -i && npx wdio session -s debug-0-0 resume
```

Voir aussi : [`close`](#close), [`list`](#list).

## `doctor`

Vérifie votre environnement.

Affiche une ligne par vérification, avec une correction pour chaque échec. Quitte avec le code 1 lorsqu'une vérification échoue.

```sh
npx wdio session doctor [target]
```

**Arguments**

| Nom | Requis | Description |
| --- | --- | --- |
| `target` | non | Ne vérifier que ce dont cette cible a besoin |

**Exemples**

```sh
# Tout vérifier
npx wdio session doctor

# Vérifier ce dont une session Android a besoin
npx wdio session doctor android
```

Voir aussi : [`open`](#open).

## `skill`

Affiche le skill de l'agent.

```sh
npx wdio session skill
```

**Options**

| Option | Description |
| --- | --- |
| `--install <value>` | L'écrire dans .agents/skills/wdio-session/SKILL.md (ou dans ce répertoire) |

**Exemples**

```sh
# Afficher le skill
npx wdio session skill

# L'ajouter à ce projet
npx wdio session skill --install .
```