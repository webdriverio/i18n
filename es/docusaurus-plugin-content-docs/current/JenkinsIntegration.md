---
id: jenkins
title: Jenkins
description: "Ejecuta pruebas de WebdriverIO en Jenkins y publica los resultados del reporter JUnit para depurar fallos y hacer seguimiento del historial de pruebas."
---

WebdriverIO ofrece una integración estrecha con sistemas de CI como [Jenkins](https://jenkins-ci.org). Con el reporter `junit`, puedes depurar fácilmente tus pruebas y hacer seguimiento de los resultados de tus pruebas. La integración es bastante sencilla.

1. Instala el reporter de pruebas `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Actualiza tu configuración para guardar tus resultados XUnit donde Jenkins pueda encontrarlos,
    (y especifica el reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

Depende de ti qué framework elegir. Los informes serán similares.
Para este tutorial, usaremos Jasmine.

Después de haber escrito un par de pruebas, puedes configurar un nuevo job de Jenkins. Dale un nombre y una descripción:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

Luego asegúrate de que siempre obtenga la versión más reciente de tu repositorio:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**Ahora la parte importante:** Crea un paso `build` para ejecutar comandos de shell. El paso `build` necesita compilar tu proyecto. Como este proyecto de demostración solo prueba una aplicación externa, no necesitas compilar nada. Simplemente instala las dependencias de node y ejecuta el comando `npm test` (que es un alias de `node_modules/.bin/wdio test/wdio.conf.js`).

Si has instalado un plugin como AnsiColor, pero los logs siguen sin mostrarse en color, ejecuta las pruebas con la variable de entorno `FORCE_COLOR=1` (por ejemplo, `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

Después de tu prueba, querrás que Jenkins haga seguimiento de tu informe XUnit. Para ello, tienes que añadir una acción post-build llamada _"Publish JUnit test result report"_.

También podrías instalar un plugin externo de XUnit para hacer seguimiento de tus informes. El de JUnit viene con la instalación básica de Jenkins y es suficiente por ahora.

Según el archivo de configuración, los informes XUnit se guardarán en el directorio raíz del proyecto. Estos informes son archivos XML. Por lo tanto, todo lo que necesitas hacer para hacer seguimiento de los informes es indicarle a Jenkins todos los archivos XML de tu directorio raíz:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

¡Eso es todo! Ya has configurado Jenkins para ejecutar tus jobs de WebdriverIO. Tu job ahora proporcionará resultados de pruebas detallados con gráficos de historial, información de stacktrace en los jobs fallidos y una lista de comandos con el payload que se usó en cada prueba.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")