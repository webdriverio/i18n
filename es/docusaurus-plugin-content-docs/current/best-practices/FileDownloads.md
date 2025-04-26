---
id: file-download
title: Descarga de Archivos
---

Al automatizar descargas de archivos en pruebas web, es esencial manejarlas de manera consistente en diferentes navegadores para garantizar una ejecución confiable de las pruebas.

Aquí, proporcionamos mejores prácticas para descargas de archivos y demostramos cómo configurar directorios de descarga para **Google Chrome**, **Mozilla Firefox** y **Microsoft Edge**.

## Rutas de Descarga

**Codificar de forma rígida** las rutas de descarga en scripts de prueba puede llevar a problemas de mantenimiento y portabilidad. Utiliza **rutas relativas** para directorios de descarga para garantizar la portabilidad y compatibilidad en diferentes entornos.

```javascript
// 👎
// Ruta de descarga codificada de forma rígida
const downloadPath = '/path/to/downloads';

// 👍
// Ruta de descarga relativa
const downloadPath = path.join(__dirname, 'downloads');
```

## Estrategias de Espera

No implementar estrategias de espera adecuadas puede llevar a condiciones de carrera o pruebas poco confiables, especialmente para la finalización de descargas. Implementa estrategias de espera **explícitas** para esperar a que se completen las descargas de archivos, asegurando la sincronización entre los pasos de prueba.

```javascript
// 👎
// Sin espera explícita para la finalización de la descarga
await browser.pause(5000);

// 👍
// Esperar a que se complete la descarga del archivo
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configuración de Directorios de Descarga

Para anular el comportamiento de descarga de archivos para **Google Chrome**, **Mozilla Firefox** y **Microsoft Edge**, proporciona el directorio de descarga en las capacidades de WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Para un ejemplo de implementación, consulta la [Receta de Comportamiento de Descarga de Prueba de WebdriverIO](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configuración de Descargas en Navegadores Chromium

Para cambiar la ruta de descarga para navegadores __basados en Chromium__ (como Chrome, Edge, Brave, etc.) utilizando el método `getPuppeteer` de WebDriverIO para acceder a Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Iniciar una sesión CDP:
const cdpSession = await page.target().createCDPSession();
// Establecer la ruta de descarga:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Manejo de Múltiples Descargas de Archivos

Al tratar con escenarios que involucran múltiples descargas de archivos, es esencial implementar estrategias para gestionar y validar cada descarga de manera efectiva. Considera los siguientes enfoques:

__Manejo Secuencial de Descargas:__ Descarga archivos uno por uno y verifica cada descarga antes de iniciar la siguiente para garantizar una ejecución ordenada y una validación precisa.

__Manejo Paralelo de Descargas:__ Utiliza técnicas de programación asíncrona para iniciar múltiples descargas de archivos simultáneamente, optimizando el tiempo de ejecución de las pruebas. Implementa mecanismos de validación robustos para verificar todas las descargas al finalizar.

## Consideraciones de Compatibilidad entre Navegadores

Aunque WebDriverIO proporciona una interfaz unificada para la automatización de navegadores, es esencial tener en cuenta las variaciones en el comportamiento y las capacidades de los navegadores. Considera probar tu funcionalidad de descarga de archivos en diferentes navegadores para garantizar la compatibilidad y consistencia.

__Configuraciones Específicas del Navegador:__ Ajusta la configuración de la ruta de descarga y las estrategias de espera para adaptarse a las diferencias en el comportamiento y las preferencias del navegador en Chrome, Firefox, Edge y otros navegadores compatibles.

__Compatibilidad de Versiones de Navegador:__ Actualiza regularmente tus versiones de WebDriverIO y navegador para aprovechar las últimas características y mejoras, garantizando la compatibilidad con tu suite de pruebas existente.