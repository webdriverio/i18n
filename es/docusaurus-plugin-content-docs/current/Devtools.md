---
id: devtools
title: DevTools
---

El servicio DevTools proporciona una potente interfaz de depuración basada en navegador para las ejecuciones de pruebas de WebdriverIO. Permite visualizar, depurar y controlar tus pruebas en tiempo real a través de una aplicación web interactiva.

## Visión general

Este servicio te permite:

- **Volver a ejecutar pruebas selectivamente** - Haz clic en cualquier caso de prueba o suite para volver a ejecutarlo instantáneamente
- **Depurar visualmente** - Ver previsualizaciones en vivo del navegador con capturas de pantalla automáticas
- **Seguimiento de ejecución** - Ver registros detallados de comandos con marcas de tiempo y resultados
- **Monitorear red y consola** - Inspeccionar llamadas a API y registros de JavaScript
- **Navegar al código** - Ir directamente a los archivos fuente de prueba

## Instalación

Instala el servicio como dependencia de desarrollo:

```sh
npm install --save-dev @wdio/devtools-service
```

## Configuración

Añade el servicio a tu configuración de WebDriverIO:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Opciones del servicio

Configura el servicio DevTools con estas opciones:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Puerto para la UI de devtools (por defecto: 3000)
        }]
    ],
    // ...
};
```

#### Opciones

- **port** (número, predeterminado: `3000`) - Número de puerto para el servidor de la interfaz de DevTools

## Cómo funciona

Cuando ejecutas tus pruebas de WebdriverIO con el servicio DevTools habilitado:

1. El servicio abre una ventana del navegador en `http://localhost:3000` (configurable)
2. Tus pruebas se ejecutan normalmente mientras la interfaz de DevTools muestra actualizaciones en tiempo real
3. La interfaz muestra la jerarquía de pruebas, la vista previa del navegador, la línea de tiempo de comandos y los registros
4. Después de completar las pruebas, puedes hacer clic en cualquier prueba para volver a ejecutarla individualmente
5. Las pruebas se vuelven a ejecutar en la misma sesión del navegador para una depuración más rápida

## Características

Explora las características de DevTools en detalle:

- **[Ejecución interactiva de pruebas y visualización](devtools/interactive-test-rerunning)** - Vistas previas del navegador en tiempo real con reejecución de pruebas
- **[Compatibilidad con múltiples frameworks](devtools/multi-framework-support)** - Funciona con Mocha, Jasmine y Cucumber
- **[Registros de consola](devtools/console-logs)** - Captura e inspección de la salida de la consola del navegador
- **[Registros de red](devtools/network-logs)** - Supervisión de llamadas a API y actividad de red
- **[TestLens](devtools/testlens)** - Navega al código fuente con navegación inteligente de código