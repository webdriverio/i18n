---
id: trace-player
title: Lecteur de traces
description: "Ouvrez les artefacts du mode trace dans le lecteur show-trace pour une relecture et une analyse hors ligne, ou chargez-les dans d'autres visionneuses de traces."
---

Le lecteur `show-trace` ouvre toute trace produite en [Mode Trace](/docs/devtools/wdio/trace-mode) directement dans l'interface WebdriverIO DevTools — un mode **lecteur** dédié, en lecture seule, pour la relecture hors ligne, l'analyse et la comparaison par des agents IA.

## Démo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — le lecteur officiel

Ouvrez une trace dans l'interface DevTools :

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Le bin `show-trace` est fourni avec chaque adaptateur (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), il est donc disponible dans tout projet qui en installe un, sans dépendance supplémentaire. C'est également un bin de `@wdio/devtools-backend` lui-même, de sorte qu'un projet sans adaptateur JavaScript (par exemple un projet Python) peut exécuter `npx -p @wdio/devtools-backend show-trace <trace.zip>`. Il démarre la même interface DevTools dans un mode **lecteur** dédié et l'ouvre dans votre navigateur :

- **Liste des actions** (à gauche) — les commandes capturées, avec un onglet **Metadata** à côté.
- **Panneau navigateur** (au centre) — la page reconstruite pour l'action sélectionnée (voir [voyage dans le temps du DOM](#trace-player-features) ci-dessous). Lorsque la trace contient un filmstrip/une vidéo, un bouton **Snapshot / Screencast** permet de basculer vers la vidéo enregistrée.
- **Bande de chronologie** (en haut) — un filmstrip de miniatures positionnées selon l'heure réelle, ainsi qu'une barre de défilement avec une tête de lecture déplaçable. Cliquez sur une miniature ou faites glisser n'importe où pour vous déplacer.
- **Barre de contrôle** — lecture/pause, pas à pas et vitesse.
- **Onglets du dock** (en bas) — **Source**, **Log**, **Console**, **Network**, **Errors** (chacun avec un badge indiquant son nombre), ainsi que les onglets **A11y** et **Transcript** propres au lecteur. Cliquez sur une ligne de **Network** pour afficher le détail de la requête (en-têtes, timing, statut).
- **Raccourcis clavier** — `Space` lecture/pause, `←`/`→` passer d'une action à l'autre, `Home`/`End` aller à la première/dernière, `,`/`.` changer la vitesse, `/` focus sur le filtre, `?` afficher tous les raccourcis.

> N'accepte qu'un fichier `.zip` ; compressez d'abord une trace `ndjson-directory`, ou ouvrez-la dans une autre visionneuse compatible. Les mêmes raccourcis fonctionnent dans le tableau de bord en direct (`←`/`→` parcourent la liste des commandes, `?` affiche l'aide).

### Fonctionnalités du lecteur de traces

Au-delà du simple défilement image par image, le lecteur reconstruit l'exécution et en croise les données :

- **Voyage dans le temps du DOM** — le panneau navigateur rejoue le flux de mutations DOM capturé (ainsi que l'état des champs de formulaire — `value` des inputs, `checked` des cases à cocher, y compris les champs vidés) pour reconstruire le *véritable* DOM au moment de l'action sélectionnée, et pas seulement une capture d'écran. Les points sans image capturée (assertions, attentes statiques) affichent tout de même l'état réel de la page.
- **Onglet A11y + superposition des éléments (« pick locator »)** — l'onglet **A11y** affiche l'arbre d'accessibilité (rôles + noms accessibles) capturé pour la commande sélectionnée. Activez la superposition des éléments dans la barre du navigateur pour encadrer chaque élément avec lequel le test a interagi ; **survolez** un cadre pour mettre en évidence sa ligne dans l'arbre A11y, **cliquez** pour copier un localisateur robuste. Les localisateurs sont écrits dans le dialecte du runner ayant effectué l'enregistrement : `a*=Logout` avec WebdriverIO, `//a[contains(., "Logout")]` avec une légende `By.xpath()` avec Selenium, et du CSS simple avec Nightwatch avec un repli XPath. Dans une session Appium native, ils se lisent sous la forme `android=new UiSelector()…` ou `-ios predicate string:…`. Le lien est bidirectionnel — survoler une ligne de l'arbre met en évidence l'élément dans le snapshot.
- **Onglet Transcript + Copy-for-LLM** — l'onglet **Transcript** affiche le `transcript.md` de l'exécution (un résumé lisible par un humain/LLM dans l'ordre d'exécution). Un bouton **Copy** en un clic regroupe la transcription avec les erreurs des commandes en échec, sous forme de contexte prêt à coller dans un LLM.
- **Marqueurs d'entrée sur la chronologie** — chaque action est marquée sur la barre de défilement selon son type : les actions clavier par une barre verte, les actions de pointeur (qui comportent un point d'impact) par un point bleu, les autres par un simple trait — ce qui vous permet de saisir le rythme des interactions d'un coup d'œil.
- **Imbrication Cucumber** — les exécutions Cucumber sont imbriquées sous leur scénario dans l'arbre des actions. La profondeur varie selon l'adaptateur (Selenium imbrique Feature → Scenario → Step, WebdriverIO Scenario → Step, Nightwatch Feature → Scenario) ; voir [Prise en charge multi-frameworks](/docs/devtools/cross-framework).
- **Défilement dense du filmstrip** — lorsque [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) est activé, la chronologie regroupe les images denses pour un défilement fluide au lieu de sauts d'une image par action.

## Autres visionneuses de traces

Comme l'artefact utilise un format sur disque standard et portable de visionneuse de traces, le même `.zip` (ou répertoire) s'ouvre également dans des **visionneuses de traces autonomes** compatibles et — partageant ce format — dans la **visionneuse de traces intégrée d'un rapport Allure** (Allure ≥ 2.35). Elles affichent :
- La chronologie des actions avec leurs durées
- Des captures d'écran par action
- Des snapshots d'éléments
- La cascade réseau
- Les événements de la console

Pour une utilisation par un LLM / agent, lisez directement `transcript.md` — il s'agit d'un rendu Markdown concis des actions avec les sélecteurs et les valeurs.

Le pipeline de traces (mappage des actions, sérialiseurs de snapshots, writer NDJSON, writer zip / répertoire) est partagé entre les adaptateurs via [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), de sorte que la structure de l'artefact est identique quel que soit l'adaptateur qui l'a produit — voir [Prise en charge multi-frameworks](/docs/devtools/cross-framework).