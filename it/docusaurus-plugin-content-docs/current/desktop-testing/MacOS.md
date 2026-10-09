---
id: macos
title: MacOS
description: "Automatizza le applicazioni native macOS con WebdriverIO utilizzando Appium e il driver Mac2, partendo dalla procedura guidata di configurazione del progetto."
---

WebdriverIO può automatizzare qualsiasi applicazione MacOS utilizzando [Appium](https://appium.io/). Tutto ciò di cui hai bisogno è [XCode](https://developer.apple.com/xcode/) installato sul tuo sistema, Appium e il [Mac2 Driver](https://github.com/appium/appium-mac2-driver) installati come dipendenze e le capabilities corrette impostate.

## Per Iniziare

Per avviare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti accompagnerà attraverso il processo. Assicurati di selezionare _"Desktop Testing - of MacOS Applications"_ quando ti viene chiesto quale tipo di test desideri eseguire. Successivamente mantieni le impostazioni predefinite o modificale in base alle tue preferenze.

La procedura guidata di configurazione installerà tutti i pacchetti Appium necessari e creerà un file `wdio.conf.js` o `wdio.conf.ts` con la configurazione necessaria per testare su MacOS. Se hai accettato di generare automaticamente alcuni file di test, puoi eseguire il tuo primo test tramite `npm run wdio`.

<CreateMacOSProjectAnimation />

Ecco fatto 🎉

## Esempio

Ecco come può apparire un semplice test che apre l'applicazione Calcolatrice, esegue un calcolo e ne verifica il risultato:

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

__Nota:__ l'app calcolatrice è stata aperta automaticamente all'inizio della sessione perché `'appium:bundleId': 'com.apple.calculator'` è stato definito come opzione delle capabilities. Puoi cambiare app durante la sessione in qualsiasi momento.

## Ulteriori Informazioni

Per informazioni sui dettagli specifici dei test su MacOS, ti consigliamo di consultare il progetto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).