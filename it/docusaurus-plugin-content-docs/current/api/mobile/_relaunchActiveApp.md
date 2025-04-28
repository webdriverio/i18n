---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Esegue un riavvio dell'app nativa attiva tramite:

- terminazione dell'app attiva
- avvio dell'app precedentemente attiva

:::important
Questo comando riavvierà (terminerà/chiuderà e lancerà/avvierà) l'app attiva corrente e NON resetterà lo stato dell'app. Appium non può eseguire un reset completo dell'app a meno che:

- tu non avvii una nuova sessione e il gestore della sessione rimuova lo stato dell'app/pulisca il dispositivo
- tu non abbia una backdoor nella tua app per resettare lo stato dell'app e Appium possa chiamare questa backdoor

Se vuoi resettare lo stato dell'app per Android o iOS devi creare il tuo meccanismo/comando di reset nel tuo script. Le opzioni potrebbero essere:

- Android: Usa il comando `adb` per cancellare i dati dell'app: `adb shell pm clear <appPackage>`
- iOS: reinstalla l'app usando il comando `mobile: installApp`
- ....
- non usare questo comando

Le opzioni che hai dipendono dalla piattaforma, dall'app e dalla posizione (locale con la maggior parte delle volte accesso completo al dispositivo, o nel cloud con meno accesso) in cui stai testando.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```