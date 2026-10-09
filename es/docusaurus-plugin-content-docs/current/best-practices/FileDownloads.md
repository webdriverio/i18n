---
id: file-download
title: Descarga de archivos
description: "Configura los directorios de descarga para Chrome, Firefox y Edge, espera a que finalicen las descargas y verifica los archivos descargados en todos los navegadores."
---

Al automatizar descargas de archivos en pruebas web, es fundamental gestionarlas de manera coherente en los distintos navegadores para garantizar una ejecución fiable de las pruebas.

Aquí ofrecemos las mejores prácticas para la descarga de archivos y mostramos cómo configurar los directorios de descarga para **Google Chrome**, **Mozilla Firefox** y **Microsoft Edge**.

## Rutas de descarga

**Codificar de forma fija** las rutas de descarga en los scripts de prueba puede provocar problemas de mantenimiento y de portabilidad. Utiliza **rutas relativas** para los directorios de descarga para garantizar la portabilidad y la compatibilidad entre distintos entornos.

```javascript
// 👎
// Ruta de descarga codificada de forma fija
const downloadPath = '/path/to/downloads';

// 👍
// Ruta de descarga relativa
const downloadPath = path.join(__dirname, 'downloads');
```

## Estrategias de espera

No implementar estrategias de espera adecuadas puede provocar condiciones de carrera o pruebas poco fiables, especialmente en lo que respecta a la finalización de las descargas. Implementa estrategias de espera **explícitas** para esperar a que se completen las descargas de archivos, garantizando la sincronización entre los pasos de la prueba.

```javascript
// 👎
// Sin espera explícita para la finalización de la descarga
await browser.pause(5000);

// 👍
// Esperar a que finalice la descarga del archivo
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configuración de directorios de descarga

Para sobrescribir el comportamiento de descarga de archivos en **Google Chrome**, **Mozilla Firefox** y **Microsoft Edge**, proporciona el directorio de descarga en las capacidades de WebDriverIO:

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

Para ver un ejemplo de implementación, consulta la [receta de WebdriverIO sobre el comportamiento de descarga en pruebas](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configuración de descargas en navegadores Chromium

Para cambiar la ruta de descarga en navegadores __basados en Chromium__ (como Chrome, Edge, Brave, etc.), utiliza el método `getPuppeteer` de WebDriverIO para acceder a Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Iniciar una sesión CDP:
const cdpSession = await page.target().createCDPSession();
// Establecer la ruta de descarga:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestión de múltiples descargas de archivos

Al tratar con escenarios que implican múltiples descargas de archivos, es fundamental implementar estrategias para gestionar y validar cada descarga de forma eficaz. Considera los siguientes enfoques:

__Gestión secuencial de descargas:__ Descarga los archivos uno por uno y verifica cada descarga antes de iniciar la siguiente para garantizar una ejecución ordenada y una validación precisa.

__Gestión paralela de descargas:__ Utiliza técnicas de programación asíncrona para iniciar múltiples descargas de archivos simultáneamente, optimizando el tiempo de ejecución de las pruebas. Implementa mecanismos de validación robustos para verificar todas las descargas una vez completadas.

## Consideraciones de compatibilidad entre navegadores

Aunque WebDriverIO proporciona una interfaz unificada para la automatización de navegadores, es fundamental tener en cuenta las variaciones en el comportamiento y las capacidades de cada navegador. Considera probar la funcionalidad de descarga de archivos en distintos navegadores para garantizar la compatibilidad y la coherencia.

__Configuraciones específicas del navegador:__ Ajusta la configuración de la ruta de descarga y las estrategias de espera para adaptarte a las diferencias de comportamiento y preferencias entre Chrome, Firefox, Edge y otros navegadores compatibles.

__Compatibilidad de versiones del navegador:__ Actualiza periódicamente tus versiones de WebDriverIO y de los navegadores para aprovechar las funciones y mejoras más recientes, garantizando al mismo tiempo la compatibilidad con tu conjunto de pruebas existente.