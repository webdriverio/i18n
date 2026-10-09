---
id: macos
title: MacOS
description: "Automatiza aplicaciones nativas de macOS con WebdriverIO usando Appium y el driver Mac2, comenzando desde el asistente de configuración del proyecto."
---

WebdriverIO puede automatizar cualquier aplicación de MacOS usando [Appium](https://appium.io/). Todo lo que necesitas es tener [XCode](https://developer.apple.com/xcode/) instalado en tu sistema, Appium y el [Mac2 Driver](https://github.com/appium/appium-mac2-driver) instalados como dependencias y las capabilities correctas configuradas.

## Primeros pasos

Para iniciar un nuevo proyecto de WebdriverIO, ejecuta:

```sh
npm create wdio@latest ./
```

Un asistente de instalación te guiará a través del proceso. Asegúrate de seleccionar _"Desktop Testing - of MacOS Applications"_ cuando te pregunte qué tipo de pruebas te gustaría realizar. Después, simplemente mantén los valores predeterminados o modifícalos según tus preferencias.

El asistente de configuración instalará todos los paquetes de Appium necesarios y creará un `wdio.conf.js` o `wdio.conf.ts` con la configuración necesaria para probar en MacOS. Si aceptaste generar automáticamente algunos archivos de prueba, puedes ejecutar tu primera prueba mediante `npm run wdio`.

<CreateMacOSProjectAnimation />

Eso es todo 🎉

## Ejemplo

Así es como puede verse una prueba sencilla que abre la aplicación Calculadora, realiza un cálculo y verifica su resultado:

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

__Nota:__ la aplicación de la calculadora se abrió automáticamente al comienzo de la sesión porque `'appium:bundleId': 'com.apple.calculator'` se definió como opción de capability. Puedes cambiar de aplicación durante la sesión en cualquier momento.

## Más información

Para obtener información sobre los detalles específicos de las pruebas en MacOS, te recomendamos consultar el proyecto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).