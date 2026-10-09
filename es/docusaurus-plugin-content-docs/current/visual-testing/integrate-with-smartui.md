---
id: integrate-with-smartui
title: SmartUI
description: "Agrega pruebas de regresión visual impulsadas por IA a las pruebas de WebdriverIO con SmartUI de TestMu AI (anteriormente LambdaTest), incluyendo configuración y opciones."
---

TestMu AI (anteriormente LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) proporciona pruebas de regresión visual impulsadas por IA para tus pruebas de WebdriverIO. Captura capturas de pantalla, las compara con las líneas base y resalta las diferencias visuales mediante algoritmos de comparación inteligentes.

## Configuración

**Crear un proyecto de SmartUI**

[Inicia sesión](https://accounts.lambdatest.com/register) en TestMu AI (anteriormente LambdaTest) y navega a [SmartUI Projects](https://smartui.lambdatest.com/) para crear un nuevo proyecto. Selecciona **Web** como plataforma y configura el nombre de tu proyecto, los aprobadores y las etiquetas.

**Configurar las credenciales**

Obtén tu `LT_USERNAME` y `LT_ACCESS_KEY` desde el panel de TestMu AI (anteriormente LambdaTest) y configúralos como variables de entorno:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Instalar el SDK de SmartUI**

```sh
npm install @lambdatest/wdio-driver
```

**Configurar WebdriverIO**

Actualiza tu `wdio.conf.js`:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## Uso

Usa `browser.execute('smartui.takeScreenshot')` para tomar capturas de pantalla:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**Ejecutar las pruebas**

```sh
npx wdio wdio.conf.js
```

Consulta los resultados en el [SmartUI Dashboard](https://smartui.lambdatest.com/).

## Opciones avanzadas

**Ignorar elementos**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**Seleccionar áreas específicas**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## Recursos

| Recurso                                                                                           | Descripción                                    |
|---------------------------------------------------------------------------------------------------|------------------------------------------------|
| [Documentación oficial](https://www.testmuai.com/support/docs/smart-ui-cypress/)                 | Documentación de SmartUI                       |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Accede a tus proyectos y builds de SmartUI     |
| [Configuración avanzada](https://www.testmuai.com/support/docs/test-settings-options/)           | Configura la sensibilidad de la comparación    |
| [Opciones de build](https://www.testmuai.com/support/docs/smart-ui-build-options/)               | Configuración avanzada de builds               |