---
id: macos
title: MacOS
---

WebdriverIO può automatizzare qualsiasi applicazione MacOS utilizzando [Appium](https://appium.io/docs/en/2.0/). Tutto ciò di cui hai bisogno è [XCode](https://developer.apple.com/xcode/) installato sul tuo sistema, Appium e il [Mac2 Driver](https://github.com/appium/appium-mac2-driver) installati come dipendenze e le capabilities impostate correttamente.

## Iniziare

Per iniziare un nuovo progetto WebdriverIO, esegui:

```sh
npm create wdio@latest ./
```

Una procedura guidata di installazione ti accompagnerà attraverso il processo. Assicurati di selezionare _"Desktop Testing - of MacOS Applications"_ quando ti viene chiesto che tipo di test vorresti fare. Successivamente, mantieni le impostazioni predefinite o modificale in base alle tue preferenze.

La procedura guidata di configurazione installerà tutti i pacchetti Appium necessari e creerà un file `wdio.conf.js` o `wdio.conf.ts` con la configurazione necessaria per testare su MacOS. Se hai accettato di generare automaticamente alcuni file di test, puoi eseguire il tuo primo test tramite `npm run wdio`.

<CreateMacOSProjectAnimation />

Ecco fatto 🎉

## Esempio

Ecco come può apparire un semplice test che apre l'applicazione Calcolatrice, esegue un calcolo e verifica il risultato:

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

__Nota:__ l'applicazione calcolatrice è stata aperta automaticamente all'inizio della sessione perché `'appium:bundleId': 'com.apple.calculator'` è stato definito come opzione capability. Puoi cambiare applicazione durante la sessione in qualsiasi momento.

## Ulteriori Informazioni

Per informazioni specifiche sui test su MacOS, ti consigliamo di consultare il progetto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).