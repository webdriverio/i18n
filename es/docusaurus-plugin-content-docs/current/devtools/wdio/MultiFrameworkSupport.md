---
id: multi-framework-support
title: Compatibilidad con múltiples frameworks
description: "Utiliza el servicio DevTools con Mocha, Jasmine o Cucumber sin configuración específica del framework."
---

DevTools funciona automáticamente con Mocha, Jasmine y Cucumber sin requerir ninguna configuración específica del framework. Simplemente agrega el servicio a tu configuración de WebDriverIO y todas las funcionalidades funcionarán sin problemas, independientemente del framework de pruebas que estés utilizando.

**Frameworks compatibles:**
- **Mocha** - Ejecución a nivel de prueba y de suite con filtrado mediante grep
- **Jasmine** - Integración completa con filtrado basado en grep
- **Cucumber** - Ejecución a nivel de escenario y de ejemplo con selección mediante feature:line

La misma interfaz de depuración, la reejecución de pruebas y las funcionalidades de visualización funcionan de manera consistente en todos los frameworks.

## Configuración

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // o 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```