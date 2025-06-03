---
id: macos
title: MacOS
---

WebdriverIO puede automatizar aplicaciones arbitrarias de MacOS usando [Appium](https://appium.io/). Todo lo que necesitas es tener instalado [XCode](https://developer.apple.com/xcode/) en tu sistema, Appium y el [Mac2 Driver](https://github.com/appium/appium-mac2-driver) instalados como dependencias y las capacidades correctamente configuradas.

## Comenzando

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar _"Desktop Testing - of MacOS Applications"_ cuando te pregunte qué tipo de pruebas te gustaría realizar. Después, simplemente mantén los valores predeterminados o modifícalos según tu preferencia.

El asistente de configuración instalará todos los paquetes de Appium necesarios y creará un `wdio.conf.js` o `wdio.conf.ts` con la configuración necesaria para realizar pruebas en MacOS. Si aceptaste autogenerar algunos archivos de prueba, puedes ejecutar tu primera prueba a través de `npm run wdio`.

<CreateMacOSProjectAnimation />

Eso es todo 🎉

## Ejemplo

Así es como puede verse una prueba simple que abre la aplicación Calculadora, realiza un cálculo y verifica su resultado:

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

__Nota:__ la aplicación de calculadora se abrió automáticamente al inicio de la sesión porque `'appium:bundleId': 'com.apple.calculator'` fue definido como opción de capacidad. Puedes cambiar de aplicación durante la sesión en cualquier momento.

## Más información

Para obtener información sobre aspectos específicos relacionados con las pruebas en MacOS, recomendamos consultar el proyecto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).