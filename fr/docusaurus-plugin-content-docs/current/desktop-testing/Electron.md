---
id: electron
title: Electron
---

Electron est un framework permettant de créer des applications de bureau en utilisant JavaScript, HTML et CSS. En intégrant Chromium et Node.js dans son binaire, Electron vous permet de maintenir une base de code JavaScript unique et de créer des applications multiplateformes qui fonctionnent sur Windows, macOS et Linux — aucune expérience en développement natif n'est requise.

WebdriverIO fournit un service intégré qui simplifie l'interaction avec votre application Electron et rend les tests très simples. Les avantages d'utiliser WebdriverIO pour tester les applications Electron sont :

- 🚗 configuration automatique du Chromedriver requis
- 📦 détection automatique du chemin de votre application Electron - prend en charge [Electron Forge](https://www.electronforge.io/) et [Electron Builder](https://www.electron.build/)
- 🧩 accès aux API Electron dans vos tests
- 🕵️ simulation des API Electron via une API similaire à Vitest

Vous n'avez besoin que de quelques étapes simples pour commencer. Regardez ce tutoriel vidéo étape par étape sur la chaîne [WebdriverIO YouTube](https://www.youtube.com/@webdriverio) :

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ou suivez le guide dans la section suivante.

## Premiers pas

Pour initier un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Un assistant d'installation vous guidera tout au long du processus. Assurez-vous de sélectionner _"Desktop Testing - of Electron Applications"_ lorsqu'il vous demande quel type de test vous souhaitez faire. Ensuite, indiquez le chemin vers votre application Electron compilée, par exemple `./dist`, puis conservez les valeurs par défaut ou modifiez-les selon vos préférences.

L'assistant de configuration installera tous les packages requis et créera un `wdio.conf.js` ou `wdio.conf.ts` avec la configuration nécessaire pour tester votre application. Si vous acceptez de générer automatiquement des fichiers de test, vous pouvez exécuter votre premier test via `npm run wdio`.

## Configuration manuelle

Si vous utilisez déjà WebdriverIO dans votre projet, vous pouvez ignorer l'assistant d'installation et simplement ajouter les dépendances suivantes :

```sh
npm install --save-dev wdio-electron-service
```

Ensuite, vous pouvez utiliser la configuration suivante :

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

C'est tout 🎉

Apprenez-en plus sur [comment configurer le service Electron](/docs/desktop-testing/electron/configuration), [comment simuler les API Electron](/docs/desktop-testing/electron/mocking) et [comment accéder aux API Electron](/docs/desktop-testing/electron/api).