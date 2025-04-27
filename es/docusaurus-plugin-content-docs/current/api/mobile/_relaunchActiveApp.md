---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Realiza un reinicio de la aplicación nativa activa mediante:

- terminando la aplicación activa
- lanzando la aplicación previamente activa

:::important
Este comando reiniciará (terminará/cerrará y lanzará/iniciará) la aplicación activa actual y NO restablecerá el estado de la aplicación. Appium no puede realizar un restablecimiento completo de
la aplicación a menos que:

- inicies una nueva sesión y el manejador de sesión elimine el estado de la aplicación/limpie el dispositivo
- tengas una puerta trasera en tu aplicación para restablecer el estado de la aplicación y Appium pueda llamar a esta puerta trasera

Si deseas restablecer el estado de la aplicación para Android o iOS, necesitas crear tu propio mecanismo/comando de restablecimiento en tu script. Las opciones podrían ser:

- Android: Usa el comando `adb` para borrar los datos de la aplicación: `adb shell pm clear <appPackage>`
- iOS: reinstala la aplicación usando el comando `mobile: installApp`
- ....
- no usar este comando

Las opciones que tienes dependen de la plataforma, la aplicación y la ubicación (local con la mayoría de las veces acceso completo al dispositivo, o en la nube con menos acceso) donde estás realizando pruebas.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```