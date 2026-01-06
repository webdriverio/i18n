---
id: lambdatest
title: Pruebas de Accesibilidad de LambdaTest
---

# Pruebas de Accesibilidad de LambdaTest

Puedes integrar fácilmente pruebas de accesibilidad en tus suites de pruebas de WebdriverIO utilizando [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Ventajas de las Pruebas de Accesibilidad de LambdaTest

Las Pruebas de Accesibilidad de LambdaTest te ayudan a identificar y solucionar problemas de accesibilidad en tus aplicaciones web. Las siguientes son las ventajas clave:

* Se integra perfectamente con tu automatización de pruebas existente de WebdriverIO.
* Escaneo automático de accesibilidad durante la ejecución de pruebas.
* Informes completos de cumplimiento de WCAG.
* Seguimiento detallado de problemas con orientación para su corrección.
* Soporte para múltiples estándares WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Información de accesibilidad en tiempo real en el panel de LambdaTest.

## Comienza con las Pruebas de Accesibilidad de LambdaTest

Sigue estos pasos para integrar tus suites de pruebas de WebdriverIO con las Pruebas de Accesibilidad de LambdaTest:

1. Instala el paquete de servicio LambdaTest WebdriverIO.

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

3. Ejecuta tus pruebas como de costumbre. LambdaTest escaneará automáticamente en busca de problemas de accesibilidad durante la ejecución de pruebas.

```bash
npx wdio run wdio.conf.js
```

## Opciones de Configuración

El objeto `accessibilityOptions` admite los siguientes parámetros:

* **wcagVersion**: Especifica la versión estándar WCAG contra la que realizar pruebas
  - `wcag20` - WCAG 2.0 Nivel A
  - `wcag21a` - WCAG 2.1 Nivel A
  - `wcag21aa` - WCAG 2.1 Nivel AA (predeterminado)
  - `wcag22aa` - WCAG 2.2 Nivel AA

* **bestPractice**: Incluye recomendaciones de mejores prácticas (predeterminado: `false`)

* **needsReview**: Incluye problemas que necesitan revisión manual (predeterminado: `true`)

## Visualización de Informes de Accesibilidad

Después de completar tus pruebas, puedes ver informes detallados de accesibilidad en el [Panel de LambdaTest](https://automation.lambdatest.com/):

1. Navega a tu ejecución de prueba
2. Haz clic en la pestaña "Accessibility"
3. Revisa los problemas identificados con niveles de gravedad
4. Obtén orientación para solucionar cada problema

Para obtener información más detallada, visita la [documentación de Automatización de Accesibilidad de LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).