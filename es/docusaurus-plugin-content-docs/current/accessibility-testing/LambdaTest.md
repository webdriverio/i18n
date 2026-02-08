---
id: testmuai
title: Pruebas de accesibilidad de TestMu AI (anteriormente LambdaTest)
---

# TestMu AI Accessibility Testing

Puede integrar fácilmente pruebas de accesibilidad en sus suites de pruebas de WebdriverIO utilizando [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Ventajas de TestMu AI Accessibility Testing

TestMu AI Accessibility Testing le ayuda a identificar y solucionar problemas de accesibilidad en sus aplicaciones web. Las siguientes son las ventajas clave:

* Se integra perfectamente con su automatización de pruebas existente de WebdriverIO.
* Escaneo automatizado de accesibilidad durante la ejecución de pruebas.
* Informes completos de cumplimiento de WCAG.
* Seguimiento detallado de problemas con orientación para la corrección.
* Soporte para múltiples estándares WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Información de accesibilidad en tiempo real en el panel de TestMu AI.

## Comience con TestMu AI Accessibility Testing

Siga estos pasos para integrar sus suites de pruebas de WebdriverIO con las pruebas de accesibilidad de TestMu AI:

1. Instale el paquete de servicio TestMu AI WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Actualice su archivo de configuración `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Ejecute sus pruebas como de costumbre. TestMu AI escaneará automáticamente en busca de problemas de accesibilidad durante la ejecución de pruebas.

```bash
npx wdio run wdio.conf.js
```

## Opciones de configuración

El objeto `accessibilityOptions` admite los siguientes parámetros:

* **wcagVersion**: Especifique la versión del estándar WCAG contra la que realizar pruebas
  - `wcag20` - WCAG 2.0 Nivel A
  - `wcag21a` - WCAG 2.1 Nivel A
  - `wcag21aa` - WCAG 2.1 Nivel AA (predeterminado)
  - `wcag22aa` - WCAG 2.2 Nivel AA

* **bestPractice**: Incluir recomendaciones de mejores prácticas (predeterminado: `false`)

* **needsReview**: Incluir problemas que necesitan revisión manual (predeterminado: `true`)

## Visualización de informes de accesibilidad

Después de completar sus pruebas, puede ver informes detallados de accesibilidad en el [Panel de TestMu AI](https://automation.lambdatest.com/):

1. Navegue a su ejecución de prueba
2. Haga clic en la pestaña "Accessibility"
3. Revise los problemas identificados con niveles de gravedad
4. Obtenga orientación para la corrección de cada problema

Para obtener información más detallada, visite la [documentación de automatización de accesibilidad de TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).