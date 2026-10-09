---
id: exec
title: Exécuter du code dans une session
description: Exécutez du code et des assertions WebdriverIO dans une session wdio active avec exec.
---

`exec` exécute du code WebdriverIO dans la session ouverte. Utilisez-le lorsqu'une étape va au-delà d'un simple `click` ou `fill`, ainsi que pour chaque assertion.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Utilisez toujours `await` avec les commandes. `$` renvoie un seul élément et lève une erreur lorsqu'il est absent. `$$` renvoie une liste. Il n'existe pas de mode synchrone ni de `browser.element`.

Les noms que vous déclarez restent disponibles dans le `exec` suivant. Un `import` de premier niveau est chargé depuis le répertoire du projet.

## Assertions

Placez les assertions dans `exec` avec `expect-webdriverio`. Installez-le dans votre projet. Sans lui, `expect(...)` échoue avec une indication d'installation.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Utilisez `visual check <tag>` lorsque la question porte sur l'apparence de l'écran. Cette commande nécessite `@wdio/visual-service` :

```sh
npx wdio session visual check cart
```

`visual accept cart` copie la dernière image réelle pour ce tag par-dessus la référence (baseline). Elle ne copie pas les images plus anciennes qui partagent le préfixe du tag.

## Quand utiliser plutôt un raccourci

`click`, `fill`, `type`, `press` et `tap` sont plus courts que `exec` pour une seule interaction, et ils affichent la ligne WebdriverIO qu'ils ont exécutée. Privilégiez-les avec une référence issue du dernier [snapshot](/docs/session/snapshots). Utilisez `exec` pour les attentes, les assertions et tout ce qui nécessite plus d'une commande.

## Étapes suivantes

- [Exporter un test](/docs/session/export) — enregistrez les étapes, y compris `exec`
- [Commandes](/docs/session-commands) — options de `exec` et `visual`