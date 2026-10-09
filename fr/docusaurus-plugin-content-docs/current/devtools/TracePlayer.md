---
id: trace-player
title: Lecteur de traces
description: "Ouvrez les artefacts du mode trace dans le lecteur show-trace pour une relecture et un examen hors ligne, ou chargez-les dans d'autres visionneuses de traces."
---

Le lecteur `show-trace` ouvre toute trace produite en [Mode Trace](/docs/devtools/wdio/trace-mode) directement dans l'interface WebdriverIO DevTools — un mode **lecteur** dédié, en lecture seule, pour la relecture hors ligne, l'examen et la comparaison par des agents IA.

## Démo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — le lecteur officiel

Ouvrez une trace dans l'interface DevTools :

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Le bin `show-trace` est fourni avec chaque adaptateur (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), il est donc disponible dans tout projet qui en installe un — aucune dépendance supplémentaire. Il démarre la même interface DevTools dans un mode **lecteur** dédié et l'ouvre dans votre navigateur :

- **Liste des actions** (à gauche) — les commandes capturées, avec un onglet **Metadata** à côté.
- **Volet navigateur** (au centre) — la page reconstruite pour l'action sélectionnée (voir [voyage dans le temps du DOM](#trace-player-features) ci-dessous). Lorsque la trace contient une pellicule/vidéo, un bouton **Snapshot / Screencast** permet de basculer vers la vidéo enregistrée.
- **Bande chronologique** (en haut) — une pellicule de miniatures positionnées selon leur horodatage réel, ainsi qu'une barre de défilement avec une tête de lecture déplaçable. Cliquez sur une miniature ou faites glisser n'importe où pour vous positionner.
- **Barre de contrôles** — lecture/pause, pas à pas et vitesse.
- **Onglets du dock** (en bas) — **Source**, **Log**, **Console**, **Network**, **Errors** (chacun avec un badge indiquant son nombre), plus les onglets **A11y** et **Transcript** propres au lecteur. Cliquez sur une ligne de **Network** pour afficher le détail de la requête (en-têtes, durées, statut).
- **Raccourcis clavier** — `Space` lecture/pause, `←`/`→` passer d'une action à l'autre, `Home`/`End` aller à la première/dernière, `,`/`.` modifier la vitesse, `/` placer le focus sur le filtre, `?` afficher tous les raccourcis.

> N'accepte que les fichiers `.zip`. Les mêmes raccourcis fonctionnent dans le tableau de bord en direct (`←`/`→` parcourent la liste des commandes, `?` affiche l'aide).

### Fonctionnalités du lecteur de traces

Au-delà du simple défilement d'images statiques, le lecteur reconstruit l'exécution et en croise les informations :

- **Voyage dans le temps du DOM** — le volet navigateur rejoue le flux de mutations du DOM capturé (ainsi que l'état des champs de formulaire — `value` des inputs, `checked` des cases à cocher, y compris les champs vidés) pour reconstruire le *vrai* DOM tel qu'il était au moment de l'action sélectionnée, et pas seulement une capture d'écran. Les points qui ne disposent d'aucune image capturée (assertions, attentes statiques) affichent tout de même l'état réel de la page.
- **Onglet A11y + superposition d'éléments (« pick locator »)** — l'onglet **A11y** affiche l'arbre d'accessibilité (rôles + noms accessibles) capturé pour la commande sélectionnée. Activez la superposition d'éléments dans la barre du navigateur pour encadrer chaque élément avec lequel le test a interagi ; **survolez** un cadre pour mettre en évidence sa ligne dans l'arbre A11y, **cliquez** pour copier un sélecteur robuste. Le lien est bidirectionnel — survoler une ligne de l'arbre met en évidence l'élément dans l'instantané.
- **Onglet Transcript + Copy-for-LLM** — l'onglet **Transcript** affiche le fichier `transcript.md` de l'exécution (un résumé lisible par un humain ou un LLM, dans l'ordre d'exécution). Un bouton **Copy** regroupe en un clic la transcription et les erreurs des commandes en échec, sous forme de contexte prêt à coller pour un LLM.
- **Marqueurs d'entrée sur la chronologie** — chaque action est signalée sur la barre de défilement selon son type : les actions clavier par une barre verte, les actions de pointeur (qui comportent un point d'impact) par un point bleu, les autres par une simple graduation — pour saisir d'un coup d'œil le rythme des interactions.
- **Imbrication Cucumber** — les exécutions Cucumber s'imbriquent sous la forme Feature → Scenario → Step dans l'arbre des actions, de sorte que les étapes se rangent sous leur scénario et leur feature.
- **Défilement dense de la pellicule** — lorsque [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) est activé, la chronologie regroupe les images denses pour un défilement fluide, au lieu de sauts d'une image par action.

## Autres visionneuses de traces

Comme l'artefact utilise un format sur disque portable et standard pour les visionneuses de traces, le même `.zip` (ou répertoire) s'ouvre également dans des **visionneuses de traces autonomes** compatibles et — puisqu'elle partage ce format — dans la **visionneuse de traces intégrée d'un rapport Allure** (Allure ≥ 2.35). Elles affichent :
- La chronologie des actions avec leurs durées
- Des captures d'écran par action
- Des instantanés d'éléments
- La cascade réseau
- Les événements de la console

Pour une utilisation par un LLM / agent, lisez directement `transcript.md` — il s'agit d'un rendu Markdown concis des actions, avec les sélecteurs et les valeurs.

Le pipeline de traces (mappage des actions, sérialiseurs d'instantanés, écriture NDJSON, écriture zip / répertoire) est partagé entre les adaptateurs via [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), de sorte que la structure de l'artefact est identique quel que soit l'adaptateur qui l'a produit — voir [Prise en charge multi-frameworks](/docs/devtools/cross-framework).