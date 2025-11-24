---
id: gettingstarted
title: Premiers pas
---

Bienvenue dans la documentation WebdriverIO. Elle vous aidera à démarrer rapidement. Si vous rencontrez des problèmes, vous pouvez trouver de l'aide et des réponses sur notre [Serveur de Support Discord](https://discord.webdriver.io) ou vous pouvez nous contacter sur [𝕏](https://x.com/webdriverio).

:::info
Ceci est la documentation pour la dernière version (__>=9.x__) de WebdriverIO. Si vous utilisez encore une ancienne version, veuillez consulter les [anciens sites de documentation](/versions) !
:::

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

:::tip Chaîne YouTube officielle 🎥

Vous pouvez trouver plus de vidéos sur WebdriverIO sur la [chaîne YouTube officielle](https://youtube.com/@webdriverio). Assurez-vous de vous abonner !

:::

## Initier une configuration WebdriverIO

Pour ajouter une configuration complète de WebdriverIO à un projet existant ou nouveau en utilisant le [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio), exécutez :

Si vous êtes dans le répertoire racine d'un projet existant, exécutez :

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

ou si vous voulez créer un nouveau projet :

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

ou si vous voulez créer un nouveau projet :

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

ou si vous voulez créer un nouveau projet :

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

ou si vous voulez créer un nouveau projet :

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Cette commande unique télécharge l'outil CLI WebdriverIO et exécute un assistant de configuration qui vous aide à configurer votre suite de tests.

<CreateProjectAnimation />

L'assistant vous posera une série de questions qui vous guideront à travers la configuration. Vous pouvez passer un paramètre `--yes` pour choisir une configuration par défaut qui utilisera Mocha avec Chrome en utilisant le modèle [Page Object](https://martinfowler.com/bliki/PageObject.html).

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

## Installer la CLI manuellement

Vous pouvez également ajouter manuellement le package CLI à votre projet via :

```sh
npm i --save-dev @wdio/cli
npx wdio --version # affiche p. ex. `8.13.10`

# exécuter l'assistant de configuration
npx wdio config
```

## Exécuter les tests

Vous pouvez démarrer votre suite de tests en utilisant la commande `run` et en pointant vers la configuration WebdriverIO que vous venez de créer :

```sh
npx wdio run ./wdio.conf.js
```

Si vous souhaitez exécuter des fichiers de test spécifiques, vous pouvez ajouter un paramètre `--spec` :

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

ou définir des suites dans votre fichier de configuration et exécuter uniquement les fichiers de test définis dans une suite :

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## Exécuter dans un script

Si vous souhaitez utiliser WebdriverIO comme moteur d'automatisation en [Mode autonome](/docs/setuptypes#standalone-mode) dans un script Node.JS, vous pouvez également installer directement WebdriverIO et l'utiliser comme un package, par exemple pour générer une capture d'écran d'un site web :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Remarque :__ toutes les commandes WebdriverIO sont asynchrones et doivent être correctement gérées en utilisant [`async/await`](https://javascript.info/async-await).

## Enregistrer des tests

WebdriverIO fournit des outils pour vous aider à démarrer en enregistrant vos actions de test à l'écran et en générant automatiquement des scripts de test WebdriverIO. Voir [Enregistrer des tests avec Chrome DevTools Recorder](/docs/record) pour plus d'informations.

## Prérequis système

Vous aurez besoin de [Node.js](http://nodejs.org) installé.

- Installez au moins la version v18.20.0 ou supérieure car c'est la plus ancienne version LTS active
- Seules les versions qui sont ou deviendront une version LTS sont officiellement supportées

Si Node n'est pas actuellement installé sur votre système, nous vous suggérons d'utiliser un outil tel que [NVM](https://github.com/creationix/nvm) ou [Volta](https://volta.sh/) pour vous aider à gérer plusieurs versions actives de Node.js. NVM est un choix populaire, tandis que Volta est également une bonne alternative.