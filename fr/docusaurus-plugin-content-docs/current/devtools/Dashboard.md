---
id: dashboard
title: Le tableau de bord
description: "Suivez les exécutions de tests en direct dans le tableau de bord DevTools, relancez des tests individuels ou des suites, et configurez la fenêtre du tableau de bord et le backend."
---

Le mode live ouvre l'interface DevTools dans une fenêtre de navigateur externe et diffuse l'exécution de vos tests en temps réel. C'est le pendant interactif du [Trace Mode](/docs/devtools/wdio/trace-mode), qui se passe de l'interface et produit à la place un artefact hors ligne portable. Le mode live est activé par défaut (`mode: 'live'`), il suffit donc de lancer vos tests WebdriverIO pour ouvrir le tableau de bord.

Lorsque vous lancez vos tests, l'interface DevTools s'ouvre automatiquement dans une fenêtre de navigateur externe et les tests commencent à s'exécuter immédiatement avec une visualisation en temps réel. Une fois la première exécution terminée, utilisez les boutons de lecture pour relancer des tests ou des suites individuellement, et le bouton d'arrêt pour interrompre à tout moment les tests en cours.

## Ce qu'affiche le tableau de bord

- **Aperçu du navigateur en direct** — observez le navigateur testé pendant l'exécution des commandes.
- **Progression des tests** — les suites et les tests se mettent à jour au fur et à mesure de leur exécution.
- **Exécution des commandes** — chaque action apparaît dès qu'elle se produit.
- **Onglets de l'espace de travail** — Actions et Metadata, ainsi que Source, Log, Console, Network et Errors (chacun accompagné d'un badge indiquant un nombre), et Compare après un [Preserve & Rerun](/docs/devtools/wdio/preserve-and-rerun).

## Fonctionnalités du mode live

- **[Relance interactive des tests et visualisation](/docs/devtools/wdio/interactive-test-rerunning)** — Aperçus du navigateur en temps réel avec relance des tests
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** — Capturez un test en échec, relancez-le et comparez les deux exécutions côte à côte
- **[Logs de la console](/docs/devtools/wdio/console-logs)** — Capturez et inspectez la sortie de la console du navigateur
- **[Logs réseau](/docs/devtools/wdio/network-logs)** — Surveillez les appels API et l'activité réseau
- **[Metadata](/docs/devtools/wdio/metadata)** — Capabilities de session, environnement et durées pour chaque session de navigateur
- **[TestLens](/docs/devtools/wdio/testlens)** — Accédez au code source grâce à une navigation intelligente dans le code
- **[Prise en charge de plusieurs frameworks](/docs/devtools/wdio/multi-framework-support)** — Fonctionne avec Mocha, Jasmine et Cucumber
- **[Screencast de session](/docs/devtools/wdio/screencast)** — Enregistrement vidéo automatique des sessions de navigateur

## Configurer la fenêtre du tableau de bord

Les options `port`, `hostname` et `devtoolsCapabilities` contrôlent le serveur de l'interface DevTools et la fenêtre dans laquelle elle s'ouvre. Consultez la [référence de configuration](/docs/devtools/reference) pour plus de détails.

## Exécuter le backend de manière autonome

Les adaptateurs démarrent le serveur du tableau de bord dans le même processus, vous n'avez donc normalement jamais besoin d'y toucher. Il est également fourni sous forme de binaire autonome, ce qui est utile lorsque le tableau de bord doit survivre à une seule exécution - ou lorsque les tests ne sont pas écrits en JavaScript, comme avec l'adaptateur Python (voir la page [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

Les deux formes `--port 8080` et `--port=8080` sont acceptées. `--port` est une *préférence*, pas une garantie : si ce port est occupé, le serveur se lie à un port libre au lieu d'échouer. Il affiche le port auquel il s'est réellement lié, et c'est cette ligne qu'il faut lire plutôt que le port que vous avez demandé :

```
devtools-backend listening at http://localhost:3000
```

L'adaptateur Python se connecte à un serveur déjà à l'écoute lorsque `DEVTOOLS_PORT` est défini, au lieu d'en démarrer un second. Les adaptateurs JavaScript démarrent leur backend dans le même processus ; utilisez leur option `port` pour choisir le port.

Un second binaire, `show-trace`, ouvre une archive de trace dans le lecteur hors ligne - voir [Trace Player](/docs/devtools/trace-player).