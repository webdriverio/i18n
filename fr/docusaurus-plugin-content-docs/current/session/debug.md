---
id: debug
title: Déboguer un test avec une session
description: Mettez en pause une exécution WebdriverIO qui échoue et inspectez-la avec wdio session, puis reprenez-la ou fermez-la.
---

`wdio run --debug=agent` met le worker en pause sur `await browser.debug()` et après un test échoué, et augmente le délai d'expiration du framework à 24 heures. La pause s'applique aussi bien aux tests Mocha qu'aux étapes Cucumber. L'exécution affiche le nom de la session (`debug-0-0` pour le premier worker) :

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` sur cette session fait échouer le test en pause avec `Session closed from wdio session`. Utilisez resume lorsque le test doit continuer. Utilisez close lorsque vous voulez que l'exécution échoue au niveau de la pause.

`browser.debug()` sans `--debug=agent` ouvre toujours le [REPL](/docs/repl) à l'intérieur du test. `--debug=agent` est la voie qui permet à un autre processus, y compris un agent de codage, de piloter le worker en pause avec `wdio session`.

## Attacher un REPL

`wdio repl --session <name>` s'attache à une session déjà ouverte et la laisse en cours d'exécution lorsque vous quittez :

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Chaque ligne du REPL s'exécute comme `wdio session exec`. `.exit` affiche `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` vérifie Node.js, le navigateur, Appium, les SDK et les identifiants cloud avant que vous n'ouvriez une session. `doctor <target>` vérifie uniquement ce dont cette cible a besoin. Le processus se termine avec le code 1 lorsqu'une vérification échoue. Une session encore en cours de démarrage est laissée en place. Une session dont le processus a disparu est supprimée.

## Dépannage

| Message | Que faire |
| --- | --- |
| `Session closed from wdio session` | Vous avez fermé la session de débogage. Utilisez `resume` lorsque le test doit continuer. |
| Aucune session `debug-0-0` | L'exécution n'est pas encore en pause, ou elle a utilisé un identifiant de worker différent. `wdio session list` affiche les noms. |
| La pause ne se produit jamais | La commande doit être `wdio run --debug=agent`. Un test qui réussit ne se met pas en pause, sauf s'il appelle `browser.debug()`. |

## Étapes suivantes

- [Débogage](/docs/debugging) — `browser.debug()`, points d'arrêt et tests instables
- [REPL](/docs/repl) — le shell interactif
- [wdio session](/docs/session) — ouvrir une session qui n'est pas attachée à une exécution de tests