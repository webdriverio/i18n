---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) proporciona pruebas de regresión visual potenciadas por IA para tus pruebas de WebdriverIO. Captura capturas de pantalla, las compara con las líneas base y resalta las diferencias visuales con algoritmos de comparación inteligentes.

## Setup

**Crear un proyecto SmartUI**

[Inicia sesión](https://accounts.lambdatest.com/register) en LambdaTest y navega a [Proyectos SmartUI](https://smartui.lambdatest.com/) para crear un nuevo proyecto. Selecciona **Web** como plataforma y configura el nombre de tu proyecto, aprobadores y etiquetas.

**Configurar credenciales**

Obtén tu `LT_USERNAME` y `LT_ACCESS_KEY` desde el dashboard de LambdaTest y configúralas como variables de entorno:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**Instalar SmartUI SDK**

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

## Usage

Usa `browser.execute('smartui.takeScreenshot')` para capturar capturas de pantalla:

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

**Ejecutar pruebas**

```sh
npx wdio wdio.conf.js
```

Ver resultados en el [Dashboard de SmartUI](https://smartui.lambdatest.com/).

## Advanced Options

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

## Resources

| Resource                                                                                          | Description                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [Official Documentation](https://www.lambdatest.com/support/docs/smart-ui-cypress/)              | Documentación de SmartUI                 |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | Accede a tus proyectos y builds de SmartUI |
| [Advanced Settings](https://www.lambdatest.com/support/docs/test-settings-options/)              | Configurar la sensibilidad de comparación |
| [Build Options](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                 | Configuración avanzada de build           |