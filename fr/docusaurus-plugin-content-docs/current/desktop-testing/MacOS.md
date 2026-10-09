---
id: macos
title: MacOS
description: "Automatisez des applications macOS natives avec WebdriverIO en utilisant Appium et le pilote Mac2, à partir de l'assistant de configuration du projet."
---

WebdriverIO peut automatiser n'importe quelle application MacOS en utilisant [Appium](https://appium.io/). Tout ce dont vous avez besoin, c'est d'avoir [XCode](https://developer.apple.com/xcode/) installé sur votre système, Appium et le [Mac2 Driver](https://github.com/appium/appium-mac2-driver) installés comme dépendances, ainsi que les bonnes capabilities définies.

## Premiers pas

Pour initialiser un nouveau projet WebdriverIO, exécutez :

```sh
npm create wdio@latest ./
```

Un assistant d'installation vous guidera tout au long du processus. Assurez-vous de sélectionner _"Desktop Testing - of MacOS Applications"_ lorsqu'il vous demande quel type de tests vous souhaitez effectuer. Ensuite, conservez simplement les valeurs par défaut ou modifiez-les selon vos préférences.

L'assistant de configuration installera tous les paquets Appium nécessaires et créera un fichier `wdio.conf.js` ou `wdio.conf.ts` avec la configuration requise pour tester sur MacOS. Si vous avez accepté de générer automatiquement des fichiers de test, vous pouvez exécuter votre premier test via `npm run wdio`.

<CreateMacOSProjectAnimation />

C'est tout 🎉

## Exemple

Voici à quoi peut ressembler un test simple qui ouvre l'application Calculatrice, effectue un calcul et vérifie son résultat :

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

__Remarque :__ l'application Calculatrice a été ouverte automatiquement au début de la session, car `'appium:bundleId': 'com.apple.calculator'` a été défini comme option de capability. Vous pouvez changer d'application à tout moment pendant la session.

## Plus d'informations

Pour obtenir des informations sur les spécificités des tests sur MacOS, nous vous recommandons de consulter le projet [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).