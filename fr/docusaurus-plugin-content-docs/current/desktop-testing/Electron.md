---
id: electron
title: Electron
description: "Testez des applications Electron avec le service Electron de WebdriverIO, qui configure Chromedriver, détecte le binaire de votre application et vous permet de simuler les API Electron."
---

Electron est un framework permettant de créer des applications de bureau à l'aide de JavaScript, HTML et CSS. En intégrant Chromium et Node.js dans son binaire, Electron vous permet de maintenir une seule base de code JavaScript et de créer des applications multiplateformes qui fonctionnent sous Windows, macOS et Linux — aucune expérience en développement natif n'est requise.

WebdriverIO fournit un service intégré qui simplifie l'interaction avec votre application Electron et rend son test très simple. Les avantages de l'utilisation de WebdriverIO pour tester des applications Electron sont :

- 🚗 configuration automatique du Chromedriver requis
- 📦 détection automatique du chemin de votre application Electron - prend en charge [Electron Forge](https://www.electronforge.io/) et [Electron Builder](https://www.electron.build/)
- 🧩 accès aux API Electron dans vos tests
- 🕵️ simulation (mocking) des API Electron via une API similaire à celle de Vitest

Il vous suffit de quelques étapes simples pour commencer. Regardez ce tutoriel vidéo de prise en main simple et détaillé, étape par étape, de la chaîne [YouTube de WebdriverIO](https://www.youtube.com/@webdriverio) :

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ou suivez le guide de la section suivante.

## Premiers pas

Pour initier un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Un assistant d'installation vous guidera tout au long du processus. Lorsqu'on vous demande quel type de test vous souhaitez effectuer, sélectionnez _"Desktop Testing - of Electron, Tauri, or macOS Applications"_, puis choisissez _Electron_ à l'invite du framework. Ensuite, indiquez le chemin vers votre application Electron compilée, par exemple `./dist`, puis conservez simplement les valeurs par défaut ou modifiez-les selon vos préférences.

L'assistant de configuration installera tous les paquets requis et créera un fichier `wdio.conf.js` ou `wdio.conf.ts` avec la configuration nécessaire pour tester votre application. Si vous acceptez de générer automatiquement des fichiers de test, vous pouvez exécuter votre premier test via `npm run wdio`.

## Configuration manuelle

Si vous utilisez déjà WebdriverIO dans votre projet, vous pouvez ignorer l'assistant d'installation et simplement ajouter les dépendances suivantes :

```sh
npm install --save-dev @wdio/electron-service
```

Vous pouvez ensuite utiliser la configuration suivante :

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

Apprenez-en davantage sur [la configuration du service Electron](/docs/desktop-testing/electron/configuration), [la simulation des API Electron](/docs/desktop-testing/electron/api-reference) et [l'accès aux API Electron](/docs/desktop-testing/electron/api).