---
id: browserstack
title: Pruebas de accesibilidad con BrowserStack
description: "Agrega análisis de accesibilidad automatizados a las pruebas de WebdriverIO que se ejecutan en BrowserStack Automate y revisa los problemas encontrados en los informes de BrowserStack."
---

# Pruebas de accesibilidad con BrowserStack

Puedes integrar fácilmente pruebas de accesibilidad en tus suites de pruebas de WebdriverIO utilizando la [función de pruebas automatizadas de BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Ventajas de las pruebas automatizadas en BrowserStack Accessibility Testing

Para usar las pruebas automatizadas en BrowserStack Accessibility Testing, tus pruebas deben ejecutarse en BrowserStack Automate.

Las siguientes son las ventajas de las pruebas automatizadas:

* Se integran sin problemas en tu suite de pruebas de automatización existente.
* No se requieren cambios de código en los casos de prueba.
* No requieren ningún mantenimiento adicional para las pruebas de accesibilidad.
* Permiten comprender las tendencias históricas y obtener información sobre los casos de prueba.

## Primeros pasos con BrowserStack Accessibility Testing

Sigue estos pasos para integrar tus suites de pruebas de WebdriverIO con BrowserStack Accessibility Testing:

1. Instala el paquete npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Actualiza el archivo de configuración `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Opciones de configuración opcionales
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Puedes ver las instrucciones detalladas [aquí](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).