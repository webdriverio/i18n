---
id: environment
title: Variables d'Environnement
---

WebdriverIO définit les variables d'environnement suivantes dans chaque processus de travail :

## `NODE_ENV`

Défini sur `'test'` s'il n'est pas déjà défini sur une autre valeur.

## `WDIO_LOG_LEVEL`

Peut être défini sur les valeurs `trace`, `debug`, `info`, `warn`, `error`, `silent` pour écrire des journaux avec les détails correspondants. A la priorité sur la valeur `logLevel` transmise.

## `WDIO_WORKER_ID`

Un identifiant unique qui aide à identifier le processus de travail. Il a le format `{number}-{number}` où le premier nombre identifie la capacité et le second le fichier de spécification que cette capacité exécute, par exemple `0-5` indique un processus exécutant le 6ème fichier de spécification pour la première capacité.