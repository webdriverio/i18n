---
id: macos
title: MacOS
---

WebdriverIO peut automatiser n'importe quelle application MacOS en utilisant [Appium](https://appium.io/). Tout ce dont vous avez besoin est [XCode](https://developer.apple.com/xcode/) installé sur votre système, Appium et le [Mac2 Driver](https://github.com/appium/appium-mac2-driver) installés comme dépendances, et les bonnes capacités définies.

## Premiers pas

Pour initier un nouveau projet WebdriverIO, exécutez:

```sh
npm create wdio@latest ./
```

Un assistant d'installation vous guidera à travers le processus. Assurez-vous de sélectionner _"Desktop Testing - of MacOS Applications"_ lorsqu'on vous demande quel type de test vous souhaitez faire. Ensuite, conservez simplement les valeurs par défaut ou modifiez-les selon vos préférences.

L'assistant de configuration installera tous les packages Appium nécessaires et créera un fichier `wdio.conf.js` ou `wdio.conf.ts` avec la configuration nécessaire pour tester sur MacOS. Si vous avez accepté de générer automatiquement des fichiers de test, vous pouvez exécuter votre premier test via `npm run wdio`.

<CreateMacOSProjectAnimation />

C'est tout 🎉

## Exemple

Voici à quoi peut ressembler un test simple qui ouvre l'application Calculatrice, effectue un calcul et vérifie son résultat:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Remarque:__ l'application calculatrice a été ouverte automatiquement au début de la session car `'appium:bundleId': 'com.apple.calculator'` a été défini comme option de capacité. Vous pouvez changer d'application pendant la session à tout moment.

## Plus d'informations

Pour des informations spécifiques concernant les tests sur MacOS, nous vous recommandons de consulter le projet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).