---
id: ai-agents
title: WebdriverIO pour les agents de codage
description: Configurez Cursor, Claude Code, Copilot ou tout autre agent de codage pour écrire, exécuter et déboguer des tests WebdriverIO à l'aide de la documentation lisible par machine, du serveur MCP WebdriverIO et des traces DevTools.
---

La plupart des tests WebdriverIO sont aujourd'hui écrits avec l'aide d'un agent de codage. Cette page explique comment fournir à un agent les trois éléments dont il a besoin pour bien faire ce travail : **une documentation à jour** (pour qu'il écrive du code v10 au lieu de deviner), **un moyen de piloter l'application testée** (pour qu'il puisse explorer l'interface et vérifier les sélecteurs) et **des exécutions de tests débogables** (pour qu'il puisse corriger lui-même les tests en échec).

## 1. Donnez la documentation à votre agent

Chaque page de ce site est disponible en Markdown épuré, sans navigation, scripts ni mise en forme :

| Ressource | URL | À utiliser pour |
| --- | --- | --- |
| Index de la documentation | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Une carte organisée de toutes les pages avec un résumé d'une ligne. Commencez ici. |
| Documentation complète | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | L'intégralité de la documentation dans un seul fichier, pour les agents disposant de grandes fenêtres de contexte. |
| N'importe quelle page | Ajoutez `.md` à l'URL, par ex. [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Charger exactement la page dont l'agent a besoin. |
| Négociation de contenu | Demandez n'importe quelle URL `/docs/*` avec `Accept: text/markdown` | Les agents et outils qui récupèrent les URL telles quelles. |

Chaque page de documentation dispose également d'un menu **Copy page** offrant des options pour copier la page en Markdown ou l'ouvrir directement dans ChatGPT, Claude ou Cursor.

### Serveur MCP de la documentation

La documentation est également disponible sous forme de serveur MCP distant à l'adresse `https://webdriver.io/mcp`. Il fournit trois outils à un agent : `search_docs` pour trouver la bonne page, `get_page` pour la lire en Markdown et `list_sections` pour charger une section entière en une seule fois. Ajoutez-le à côté du serveur MCP WebdriverIO décrit ci-dessous :

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Pour Claude Code, exécutez `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Laissez votre agent utiliser `wdio session`

[`wdio session`](/docs/session) maintient une session WebdriverIO active entre les commandes shell. Un agent peut ouvrir un navigateur, un téléphone ou une application de bureau, prendre un instantané de ce qui est affiché à l'écran, agir sur des références et exporter les étapes qui ont fonctionné sous forme de test. C'est la manière par défaut de piloter une application depuis un agent de codage. Le [serveur MCP](/docs/mcp) présenté dans la section suivante est l'alternative lorsque l'agent doit appeler des outils plutôt que le shell.

Installez la compétence (skill) dans le projet :

```sh
npx wdio session skill --install .
```

Cela crée le fichier `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` crée ce même fichier lorsque vous acceptez la prise en charge des agents de codage, et ajoute les règles de projet ci-dessous.

Un agent peut créer le projet lui-même. L'assistant accepte un flag pour chaque question, et `--yes` remplit les valeurs par défaut pour le reste, de sorte qu'il n'attend jamais de saisie :

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` liste tous les flags et leurs valeurs. Voir [Répondre à l'assistant avec des flags](/docs/gettingstarted#answer-the-wizard-with-flags). La section [WebdriverIO Session](/docs/session) couvre les cibles, les instantanés, `exec`, l'export et le débogage. Référence des commandes : [commandes wdio session](/docs/session-commands).

### Ajoutez la documentation à votre agent

Pour rendre la documentation disponible dans chaque conversation, ajoutez l'index à votre agent :

- **Cursor** : ajoutez `https://webdriver.io/llms.txt` comme documentation personnalisée dans les paramètres de Cursor (_Indexing & Docs_), puis référencez-la dans le chat avec `@` et le nom que vous lui avez donné.
- **Claude Code / Codex / autres agents CLI** : ajoutez le lien au fichier `AGENTS.md` ou `CLAUDE.md` de votre projet (voir les [règles de projet](#3-add-project-rules) ci-dessous). Les agents récupèrent les pages dont ils ont besoin à la demande.

## 2. Laissez votre agent piloter le navigateur ou l'application

Le [serveur MCP WebdriverIO](/docs/mcp) (`@wdio/mcp`) permet à un agent d'ouvrir des navigateurs (Chrome, Firefox, Edge, Safari), des applications mobiles natives et hybrides (via Appium) et des appareils cloud, d'inspecter l'arbre d'accessibilité, de cliquer, de saisir du texte et de prendre des captures d'écran. Les agents l'utilisent pour explorer une page avant d'écrire un test, pour trouver des sélecteurs robustes et pour reproduire un échec étape par étape.

Ajoutez-le à la configuration de votre client MCP (par exemple `.mcp.json` ou `.cursor/mcp.json` dans votre projet) :

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Pour Claude Code, enregistrez-le depuis la ligne de commande :

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

Consultez la [configuration MCP](/docs/mcp/configuration) pour les options de session, et [Fournisseurs cloud](/docs/mcp/cloud-providers) pour exécuter sur BrowserStack, Sauce Labs, TestMu AI ou TestingBot.

## 3. Ajoutez des règles de projet

Les agents suivent bien plus fidèlement les conventions d'un projet lorsqu'elles sont écrites. Ajoutez une section comme celle-ci au fichier `AGENTS.md` (ou `CLAUDE.md`, `.cursor/rules`) de votre projet de test et adaptez les chemins et les commandes :

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

Les règles ci-dessus reflètent les recommandations des pages [Bonnes pratiques](/docs/bestpractices), [Sélecteurs](/docs/selectors) et [Attente automatique](/docs/autowait).

## 4. Laissez l'agent déboguer les tests en échec

Le service [WebdriverIO DevTools](/docs/devtools) peut enregistrer une **trace** de chaque exécution : un artefact portable contenant une transcription Markdown étape par étape, des captures d'écran, des instantanés de l'arbre d'accessibilité et des journaux réseau pour chaque action. Cela donne à un agent les mêmes informations qu'un humain obtient en regardant le test, sans avoir besoin d'une fenêtre de navigateur.

Installez le service et activez le mode trace :

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // une trace par test permet de transmettre facilement un seul échec à un agent
            traceGranularity: 'test',
            // des fichiers simples au lieu d'un zip, pour que les agents puissent les lire directement
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

Après une exécution, les traces sont écrites dans `test-results/`. Indiquez à votre agent le dossier du test en échec et demandez-lui de lire d'abord `transcript.md`. Consultez [Mode trace](/docs/devtools/wdio/trace-mode) pour toutes les options, y compris la granularité et la rétention.

## Flux de travail recommandé

1. Demandez à l'agent d'explorer la fonctionnalité à tester avec le serveur MCP et de proposer des sélecteurs.
2. Laissez-le écrire la spec et le page object en suivant les règles de votre projet, en récupérant les pages de documentation WebdriverIO selon les besoins.
3. Faites-lui exécuter la spec seule avec `--spec` et itérer jusqu'à ce qu'elle réussisse.
4. Si un test échoue en CI, donnez à l'agent la trace de ce test et laissez-le corriger le test ou signaler le bug.

## Étapes suivantes

- [Premiers pas](/docs/gettingstarted) - créer un projet avec `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) - tous les outils fournis par le serveur MCP
- [DevTools](/docs/devtools) - mode live et mode trace
- [Bonnes pratiques](/docs/bestpractices) - à quoi ressemblent de bons tests WebdriverIO
- [De la v9 à la v10](/docs/v10-migration#migrate-with-a-coding-agent) - la compétence de migration pour une suite existante