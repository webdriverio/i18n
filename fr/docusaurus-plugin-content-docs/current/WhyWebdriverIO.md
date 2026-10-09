---
id: why-webdriverio
title: Pourquoi WebdriverIO ?
description: Ce qui distingue WebdriverIO des autres outils d'automatisation de tests - une seule API pour toutes les plateformes, les standards du web, une gouvernance ouverte et une prise en charge de premier ordre des agents de codage.
---

WebdriverIO est un framework open source d'automatisation de tests pour Node.js. Avec un seul exécuteur de tests et une seule API, vous pouvez automatiser des navigateurs web, des applications mobiles natives et hybrides, des applications de bureau et des extensions d'éditeurs, et y ajouter des tests visuels, d'accessibilité et de composants. Il est géré par sa communauté sous l'égide de l'[OpenJS Foundation](https://openjsf.org/).

## Un seul framework pour toutes les plateformes

La plupart des équipes livrent plus qu'un simple site web. WebdriverIO vous permet de tout tester avec les mêmes sélecteurs, assertions, rapporteurs et la même configuration CI :

| Plateforme | Comment WebdriverIO l'automatise | Commencer ici |
| --- | --- | --- |
| Navigateurs web | WebDriver et WebDriver BiDi dans Chrome, Firefox, Safari et Edge | [Navigateurs web](/docs/platforms/web) |
| Composants web | Tests de composants dans un vrai navigateur pour React, Vue, Svelte, Solid, Preact, Lit et Stencil | [Tests de composants](/docs/component-testing) |
| Applications mobiles | Natives, hybrides et web mobile sur iOS et Android via Appium, y compris Flutter | [Applications mobiles](/docs/platforms/mobile) |
| Applications de bureau | Applications Electron, Tauri et Dioxus sur macOS, Windows et Linux, applications macOS natives via Appium | [Applications de bureau](/docs/platforms/desktop) |
| Éditeurs et extensions | Extensions VS Code et extensions de navigateur | [Extensions et éditeurs](/docs/platforms/apps-and-extensions) |
| Régressions visuelles | Comparaisons d'écran, d'éléments et de pages entières pour le web et le mobile | [Tests visuels](/docs/visual-testing) |

Un même test peut même piloter plusieurs de ces plateformes à la fois, par exemple une application mobile et un tableau de bord web dans un seul scénario, grâce au [multi-remote](/docs/multiremote).

## Construit sur les standards du web

WebdriverIO automatise les navigateurs via [WebDriver](https://w3c.github.io/webdriver/) et [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), les standards du W3C que chaque éditeur de navigateur implémente et [teste](https://wpt.fyi/results/webdriver/tests). Vos tests s'exécutent sur les mêmes versions de navigateurs que celles de vos utilisateurs, et les interactions telles que les clics et les frappes de touches sont déclenchées par le navigateur lui-même au lieu d'être émulées en JavaScript. WebDriver BiDi ajoute la simulation réseau, les événements de console et de journaux, et bien plus encore sur tous les navigateurs, pas seulement Chromium.

Lorsque vous avez besoin de fonctionnalités spécifiques à un navigateur, WebdriverIO vous donne accès au Chrome DevTools Protocol via [Puppeteer](/docs/api/browser/getPuppeteer). Pour en savoir plus, consultez [Protocoles d'automatisation](/docs/automationProtocols).

## Piloté par la communauté et gouverné de manière ouverte

WebdriverIO n'est pas le produit d'un éditeur de solutions de test. Le projet :

- appartient à l'[OpenJS Foundation](https://openjsf.org/), une organisation à but non lucratif neutre vis-à-vis des fournisseurs, ce qui l'oblige légalement à servir les intérêts de tous ses utilisateurs
- suit un [modèle de gouvernance](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md) public : tout le monde peut contribuer, et les committers ainsi que le Technical Steering Committee sont issus de la communauté
- n'a pas d'offre payante ni de fonctionnalités réservées ; chaque fonctionnalité est gratuite et vous pouvez exécuter vos tests n'importe où, en local ou chez n'importe quel fournisseur cloud
- reverse les fonds de sponsoring aux personnes qui le construisent grâce à un [programme de rémunération des contributeurs](/blog/2024/02/15/new-contributor-stipend-program)
- offre un support communautaire gratuit sur [Discord](https://discord.webdriver.io) et [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Prêt pour les agents de codage

La documentation, les outils et les artefacts de test sont conçus pour que les agents de codage puissent travailler avec WebdriverIO de manière autonome :

- **Documentation adaptée aux agents** : chaque page est disponible en Markdown, il existe un fichier [`llms.txt`](https://webdriver.io/llms.txt) soigneusement organisé et un serveur MCP de documentation à l'adresse `https://webdriver.io/mcp`.
- **WebdriverIO MCP** : le serveur [`@wdio/mcp`](/docs/mcp) permet à un agent de piloter des navigateurs et des applications mobiles pour explorer votre interface et vérifier les sélecteurs.
- **Traces** : le [mode trace de DevTools](/docs/devtools/wdio/trace-mode) génère une transcription en Markdown, des captures d'écran et des instantanés d'accessibilité pour chaque test en échec.

Consultez [WebdriverIO pour les agents de codage](/docs/ai-agents) pour la configuration.

## Tout inclus, facile à étendre

- Un [exécuteur de tests](/docs/testrunner) prenant en charge Mocha, Jasmine et Cucumber, avec exécution parallèle, [sharding](/docs/sharding), [nouvelles tentatives](/docs/retry) et un [mode watch](/docs/watcher)
- L'[attente automatique](/docs/autowait) pour chaque interaction et une [bibliothèque d'assertions](/docs/assertion) intégrée
- La [simulation réseau](/docs/mocksandspies), l'[émulation](/docs/emulation) et les [tests par snapshot](/docs/snapshot)
- Un [tableau de bord de débogage et un visualiseur de traces](/docs/devtools)
- [Plus de 70 services et rapporteurs](/docs/ecosystem) pour les clouds, les frameworks et la CI, ainsi que des API simples pour écrire vos propres [commandes](/docs/customcommands), [services](/docs/customservices) et [rapporteurs](/docs/customreporter)

## Quand choisir autre chose

WebdriverIO est un bon choix lorsque vous testez plus d'une plateforme, souhaitez exécuter vos tests sur de vrais navigateurs et appareils, ou appréciez un outil indépendant appartenant à sa communauté. Si vous ne testez qu'une seule application web dans un seul navigateur et n'avez pas besoin d'appareils mobiles, de bureau ou cloud, un outil limité aux navigateurs peut sembler plus léger pour démarrer. En cas de doute, [créez un projet](/docs/gettingstarted) avec `npm init wdio@latest` et essayez-le : la configuration prend environ une minute.

## Prochaines étapes

- [Premiers pas](/docs/gettingstarted) - créez un projet et exécutez votre premier test
- [Types de configuration](/docs/setuptypes) - exécuteur de tests ou mode autonome
- [WebdriverIO pour les agents de codage](/docs/ai-agents) - configurez votre agent