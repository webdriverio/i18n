---
id: multi-framework-support
title: Soporte Multi-Framework
---

DevTools funciona automáticamente con Mocha, Jasmine y Cucumber sin necesitar ninguna configuración específica del framework. Simplemente añade el servicio a tu configuración de WebDriverIO y todas las características funcionan perfectamente sin importar qué framework de pruebas estés utilizando.

**Frameworks Soportados:**
- **Mocha** - Ejecución a nivel de prueba y suite con filtrado grep
- **Jasmine** - Integración completa con filtrado basado en grep
- **Cucumber** - Ejecución a nivel de escenario y ejemplo con orientación feature:line

La misma interfaz de depuración, la repetición de pruebas y las características de visualización funcionan consistentemente en todos los frameworks.

## Configuración

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // o 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```