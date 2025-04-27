---
id: why-webdriverio
title: Pourquoi Webdriver.IO ?
---

WebdriverIO est un framework d'automatisation progressif conçu pour automatiser les applications web et mobiles modernes. Il simplifie l'interaction avec votre application et fournit un ensemble de plugins qui vous aident à créer une suite de tests évolutive, robuste et stable.

Il est conçu pour être :

- __Extensible__ - L'ajout de fonctions d'aide ou d'ensembles et de combinaisons plus complexes de commandes existantes est __simple__ et __vraiment utile__
- __Compatible__ - WebdriverIO peut être exécuté sur le [WebDriver Protocol](https://w3c.github.io/webdriver/) pour des __tests multi-navigateurs véritables__ ainsi que sur le [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) pour l'automatisation basée sur Chromium en utilisant [Puppeteer](https://pptr.dev/).
- __Riche en fonctionnalités__ - La grande variété de plugins intégrés et communautaires vous permet d'__intégrer facilement__ et d'__étendre__ votre configuration pour répondre à vos besoins.

Vous pouvez utiliser WebdriverIO pour automatiser :

- 🌐 <span>&nbsp;</span> __applications web modernes__ écrites avec React, Vue, Angular, Svelte ou d'autres frameworks frontend
- 📱 <span>&nbsp;</span> __applications mobiles hybrides__ ou __natives__ fonctionnant dans un émulateur/simulateur ou sur un appareil réel
- 💻 <span>&nbsp;</span> __applications de bureau natives__ (par exemple, écrites avec Electron.js)
- 📦 <span>&nbsp;</span> __tests unitaires ou de composants__ de composants web dans le navigateur

## Basé sur les standards Web

WebdriverIO exploite la puissance des protocoles [WebDriver](https://w3c.github.io/webdriver/) et [WebDriver-BiDi](https://github.com/w3c/webdriver-bidi) qui sont développés et pris en charge par tous les fournisseurs de navigateurs et garantissent une véritable expérience de test multi-navigateurs. Alors que d'autres outils d'automatisation vous obligent à télécharger des moteurs de navigateur modifiés qui ne sont pas utilisés par les utilisateurs réels ou à émuler le comportement des utilisateurs en injectant du JavaScript, WebdriverIO s'appuie sur une norme commune d'automatisation qui est [correctement testée](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned) et assure la compatibilité pour les décennies à venir.

De plus, WebdriverIO prend également en charge des protocoles d'automatisation alternatifs et propriétaires comme [Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/) à des fins de débogage et d'introspection. Cela permet à l'utilisateur de passer facilement des commandes conventionnelles basées sur WebDriver aux puissantes interactions de navigateur via [Puppeteer](https://pptr.dev/).

Pour en savoir plus sur les différences entre ces standards d'automatisation, consultez la section sur les [Protocoles d'automatisation](automationProtocols).

## Véritablement Open Source

Contrairement à de nombreux outils d'automatisation de l'écosystème, WebdriverIO est un projet véritablement open source qui est géré avec une gouvernance ouverte et appartient à une entité à but non lucratif appelée [OpenJS Foundation](https://openjsf.org/). Cela engage légalement le projet à se développer et à être dirigé dans l'intérêt de tous les participants. L'équipe du projet valorise l'ouverture et la collaboration et n'est pas motivée par des intérêts monétaires.

Cela rend le projet indépendant dans son développement et son orientation. Cela nous permet de fournir un support gratuit 24/7 dans notre [canal communautaire](https://discord.webdriver.io) en construisant une communauté durable qui se soutient et apprend les uns des autres. Enfin, cela offre de nombreuses opportunités aux personnes qui contribuent et s'engagent dans le projet grâce à sa [gouvernance ouverte](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md).