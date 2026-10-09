---
id: testmuai
title: Pruebas de accesibilidad con TestMu AI (anteriormente LambdaTest)
description: "Habilita las pruebas de accesibilidad de TestMu AI (anteriormente LambdaTest) en tu suite de WebdriverIO, configura las opciones de escaneo y consulta los informes de accesibilidad."
---

# Pruebas de accesibilidad con TestMu AI

Puedes integrar fácilmente pruebas de accesibilidad en tus suites de pruebas de WebdriverIO utilizando [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Ventajas de las pruebas de accesibilidad con TestMu AI

Las pruebas de accesibilidad de TestMu AI te ayudan a identificar y corregir problemas de accesibilidad en tus aplicaciones web. Estas son sus principales ventajas:

* Se integra perfectamente con tu automatización de pruebas de WebdriverIO existente.
* Escaneo automatizado de accesibilidad durante la ejecución de las pruebas.
* Informes completos de cumplimiento de WCAG.
* Seguimiento detallado de problemas con orientación para su corrección.
* Compatibilidad con múltiples estándares WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Información de accesibilidad en tiempo real en el panel de TestMu AI.

## Primeros pasos con las pruebas de accesibilidad de TestMu AI

Sigue estos pasos para integrar tus suites de pruebas de WebdriverIO con las pruebas de accesibilidad de TestMu AI:

1. Instala el paquete del servicio de WebdriverIO de TestMu AI.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Actualiza tu archivo de configuración `wdio.conf.js`.

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
            accessibility: true, // Habilitar pruebas de accesibilidad
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Versión de WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Ejecuta tus pruebas como de costumbre. TestMu AI escaneará automáticamente los problemas de accesibilidad durante la ejecución de las pruebas.

```bash
npx wdio run wdio.conf.js
```

## Opciones de configuración

El objeto `accessibilityOptions` admite los siguientes parámetros:

* **wcagVersion**: Especifica la versión del estándar WCAG con la que realizar las pruebas
  - `wcag20` - WCAG 2.0 Nivel A
  - `wcag21a` - WCAG 2.1 Nivel A
  - `wcag21aa` - WCAG 2.1 Nivel AA (predeterminado)
  - `wcag22aa` - WCAG 2.2 Nivel AA

* **bestPractice**: Incluye recomendaciones de buenas prácticas (predeterminado: `false`)

* **needsReview**: Incluye problemas que requieren revisión manual (predeterminado: `true`)

## Visualización de los informes de accesibilidad

Una vez finalizadas tus pruebas, puedes consultar informes detallados de accesibilidad en el [panel de TestMu AI](https://automation.lambdatest.com/):

1. Navega hasta la ejecución de tu prueba
2. Haz clic en la pestaña "Accessibility"
3. Revisa los problemas identificados con sus niveles de gravedad
4. Obtén orientación para corregir cada problema

Para obtener información más detallada, visita la [documentación de TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).