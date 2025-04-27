---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Effectue un redémarrage de l'application native active en:

- fermant l'application active
- lançant à nouveau l'application précédemment active

:::important
Cette commande redémarrera (fermer/terminer et lancer/démarrer) l'application active actuelle et NE réinitialisera PAS l'état de l'application. Appium ne peut pas effectuer une réinitialisation complète de l'application sauf si:

- vous démarrez une nouvelle session et le gestionnaire de session supprime l'état de l'application/nettoie l'appareil
- vous avez une porte dérobée dans votre application pour réinitialiser l'état de l'application et Appium peut appeler cette porte dérobée

Si vous souhaitez réinitialiser l'état de l'application pour Android ou iOS, vous devez créer votre propre mécanisme/commande de réinitialisation dans votre script. Les options pourraient être:

- Android: Utiliser la commande `adb` pour effacer les données de l'application: `adb shell pm clear <appPackage>`
- iOS: réinstaller l'application en utilisant la commande `mobile: installApp`
- ....
- ne pas utiliser cette commande

Les options dont vous disposez dépendent de la plateforme, de l'application et de l'emplacement (local avec la plupart du temps un accès complet à l'appareil, ou dans le cloud avec moins d'accès) où vous effectuez les tests.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```