---
id: browserstack
title: Pruebas de Accesibilidad de BrowserStack
---

# BrowserStack Accessibility Testing

Puedes integrar fácilmente pruebas de accesibilidad en tus suites de pruebas de WebdriverIO utilizando la [función de pruebas automatizadas de BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Ventajas de las Pruebas Automatizadas en BrowserStack Accessibility Testing

Para utilizar las pruebas automatizadas en BrowserStack Accessibility Testing, tus pruebas deben ejecutarse en BrowserStack Automate.

Las siguientes son las ventajas de las pruebas automatizadas:

* Se integra perfectamente en tu suite de pruebas de automatización preexistente.
* No se requieren cambios de código en los casos de prueba.
* No requiere mantenimiento adicional para las pruebas de accesibilidad.
* Comprende tendencias históricas y obtén información sobre casos de prueba.

## Comenzar con BrowserStack Accessibility Testing

Sigue estos pasos para integrar tus suites de pruebas de WebdriverIO con las Pruebas de Accesibilidad de BrowserStack:

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
        // Optional configuration options
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

Puedes ver instrucciones detalladas [aquí](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).