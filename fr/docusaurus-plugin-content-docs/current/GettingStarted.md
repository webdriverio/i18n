---
id: gettingstarted
title: Prise en main
description: Créez un projet WebdriverIO avec npm init wdio@latest, exécutez votre premier test et trouvez le guide suivant pour votre plateforme.
---

Configurez WebdriverIO dans un projet existant ou nouveau avec une seule commande, puis exécutez votre premier test. L'assistant de configuration vous demande ce que vous souhaitez tester (web, mobile, desktop ou extensions VS Code), quel framework et quels reporters utiliser, et installe tout pour vous.

:::info
Ceci est la documentation de WebdriverIO __v10__. Vous êtes toujours sur la v9 ? Utilisez la [documentation v9](https://v9.webdriver.io) ou suivez le [guide de migration v10](/docs/v10-migration).
:::

:::tip Vous utilisez un agent de codage ?
Dirigez-le vers [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) ou connectez le serveur MCP de la documentation à `https://webdriver.io/mcp`. Consultez [WebdriverIO pour les agents de codage](/docs/ai-agents).
:::

## Initier une configuration WebdriverIO

Le [WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) ajoute une configuration WebdriverIO complète à un projet existant ou nouveau. Dans le répertoire racine d'un projet existant, exécutez :

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

ou si vous souhaitez créer un nouveau projet :

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

ou si vous souhaitez créer un nouveau projet :

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

ou si vous souhaitez créer un nouveau projet :

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

ou si vous souhaitez créer un nouveau projet :

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

Cette seule commande télécharge l'outil CLI de WebdriverIO et lance un assistant de configuration qui vous aide à configurer votre suite de tests.

<CreateProjectAnimation />

L'assistant vous posera une série de questions qui vous guideront tout au long de la configuration. Vous pouvez passer un paramètre `--yes` pour choisir une configuration par défaut qui utilisera Mocha avec Chrome en suivant le modèle [Page Object](https://martinfowler.com/bliki/PageObject.html).

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

### Répondre à l'assistant avec des options

Chaque question de l'assistant dispose d'une option en ligne de commande. Une option répond à sa question et l'assistant ne pose que les autres. Combiné avec `--yes`, l'assistant utilise les valeurs par défaut pour le reste et ne pose jamais de question, ce dont un agent de codage ou une tâche CI a besoin :

```sh
# Cucumber en JavaScript, avec les reporters spec et JUnit
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Firefox et Edge au lieu de Chrome
npm init wdio@latest . -- --yes --browsers firefox,edge

# Une application Android avec Appium
npm init wdio@latest . -- --yes --mobile-environment android

# Tests de composants React
npm init wdio@latest . -- --yes --runner component --preset react

# Écrire la configuration, mais installer les dépendances vous-même
npm init wdio@latest . -- --yes --no-npm-install
```

Avec Yarn, pnpm et bun, passez les options sans le séparateur `--`, par exemple `pnpm create wdio@latest . --yes --framework cucumber`.

Les options les plus courantes :

| Option | Valeurs |
| --- | --- |
| `--runner` | `e2e` (par défaut), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (par défaut), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | TypeScript est utilisé par défaut lorsque le projet possède un `tsconfig.json` |
| `--browsers` | Liste séparée par des virgules parmi `chrome` (par défaut), `firefox`, `safari`, `edge` |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (par défaut), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, avec `--runner component` |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, avec `--runner desktop` |
| `--reporters`, `--services`, `--plugins` | Noms courts séparés par des virgules, par exemple `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | Écrire la section `AGENTS.md` et la compétence `wdio-session` (activé par défaut) |
| `--npm-install` / `--no-npm-install` | Installer les dépendances (activé par défaut) |

`npm init wdio@latest -- --help` liste toutes les options, les valeurs qu'elles acceptent et la question à laquelle elles répondent. Les options booléennes acceptent un préfixe `--no-`. Les mêmes options fonctionnent avec `npx wdio config`.

L'assistant vérifie chaque option par rapport à votre configuration. Une valeur inconnue, une option pour une question qu'il ne poserait pas, ou une valeur qu'il ne proposerait pas pour votre configuration l'arrête avec le code de sortie 2 avant qu'il n'écrive le moindre fichier :

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## Installer le CLI manuellement

Vous pouvez également ajouter le package CLI à votre projet manuellement via :

```sh
npm i --save-dev @wdio/cli
npx wdio --version # affiche par exemple `8.13.10`

# lancer l'assistant de configuration
npx wdio config
```

## Exécuter un test

Vous pouvez démarrer votre suite de tests en utilisant la commande `run` et en indiquant la configuration WebdriverIO que vous venez de créer :

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

Si vous souhaitez utiliser WebdriverIO comme moteur d'automatisation en [mode autonome](/docs/setuptypes#standalone-mode) dans un script Node.JS, vous pouvez également installer directement WebdriverIO et l'utiliser comme package, par exemple pour générer une capture d'écran d'un site web :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__Remarque :__ toutes les commandes WebdriverIO sont asynchrones et doivent être correctement gérées à l'aide de [`async/await`](https://javascript.info/async-await).

## Enregistrer des tests

WebdriverIO fournit des outils pour vous aider à démarrer en enregistrant vos actions de test à l'écran et en générant automatiquement des scripts de test WebdriverIO. Consultez [Enregistrer des tests avec Chrome DevTools Recorder](/docs/record) pour plus d'informations.

## Configuration requise

Vous aurez besoin d'avoir [Node.js](http://nodejs.org) installé.

- Installez au minimum la v22.19.0 ou une version supérieure, car il s'agit de la plus ancienne version LTS prise en charge
- Seules les versions qui sont ou deviendront des versions LTS sont officiellement prises en charge

Si Node n'est pas encore installé sur votre système, nous vous suggérons d'utiliser un outil tel que [NVM](https://github.com/creationix/nvm) ou [Volta](https://volta.sh/) pour vous aider à gérer plusieurs versions actives de Node.js. NVM est un choix populaire, tandis que Volta constitue également une bonne alternative.

## Regarder l'introduction

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

D'autres vidéos sont disponibles sur la [chaîne YouTube officielle](https://youtube.com/@webdriverio).

## Prochaines étapes

- Choisissez votre plateforme : [Navigateurs web](/docs/platforms/web), [Applications mobiles](/docs/platforms/mobile), [Applications de bureau](/docs/platforms/desktop) ou [Extensions et éditeurs](/docs/platforms/apps-and-extensions)
- Apprenez à [sélectionner des éléments](/docs/selectors) et à écrire des [assertions](/docs/assertion)
- Configurez le test runner dans [`wdio.conf.ts`](/docs/configurationfile)
- Obtenez de l'aide sur [Discord](https://discord.webdriver.io)