---
id: jenkins
title: Jenkins
---

WebdriverIO ofrece una integración estrecha con sistemas CI como [Jenkins](https://jenkins-ci.org). Con el reportero `junit`, puedes depurar fácilmente tus pruebas y hacer seguimiento de tus resultados. La integración es bastante sencilla.

1. Instala el reportero de pruebas `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. Actualiza tu configuración para guardar tus resultados XUnit donde Jenkins pueda encontrarlos,
    (y especifica el reportero `junit`):

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

Después de haber escrito un par de pruebas, puedes configurar un nuevo trabajo en Jenkins. Dale un nombre y una descripción:

![Nombre y Descripción](/img/jenkins/jobname.png "Nombre y Descripción")

Luego asegúrate de que siempre tome la versión más reciente de tu repositorio:

![Configuración Git de Jenkins](/img/jenkins/gitsetup.png "Configuración Git de Jenkins")

**Ahora la parte importante:** Crea un paso de `build` para ejecutar comandos shell. El paso de `build` necesita construir tu proyecto. Como este proyecto de demostración solo prueba una aplicación externa, no necesitas construir nada. Simplemente instala las dependencias de node y ejecuta el comando `npm test` (que es un alias para `node_modules/.bin/wdio test/wdio.conf.js`).

Si has instalado un plugin como AnsiColor, pero los logs aún no tienen color, ejecuta las pruebas con la variable de entorno `FORCE_COLOR=1` (por ejemplo, `FORCE_COLOR=1 npm test`).

![Paso de Build](/img/jenkins/runjob.png "Paso de Build")

Después de tu prueba, querrás que Jenkins haga seguimiento de tu informe XUnit. Para hacerlo, tienes que añadir una acción post-build llamada _"Publish JUnit test result report"_.

También podrías instalar un plugin XUnit externo para hacer seguimiento de tus informes. El de JUnit viene con la instalación básica de Jenkins y es suficiente por ahora.

De acuerdo con el archivo de configuración, los informes XUnit se guardarán en el directorio raíz del proyecto. Estos informes son archivos XML. Así que, todo lo que necesitas hacer para hacer seguimiento de los informes es indicar a Jenkins que busque todos los archivos XML en tu directorio raíz:

![Acción Post-build](/img/jenkins/postjob.png "Acción Post-build")

¡Eso es todo! Ahora has configurado Jenkins para ejecutar tus trabajos de WebdriverIO. Tu trabajo ahora proporcionará resultados detallados de las pruebas con gráficos históricos, información de seguimiento de pila en trabajos fallidos y una lista de comandos con carga útil que se utilizaron en cada prueba.

![Integración Final de Jenkins](/img/jenkins/final.png "Integración Final de Jenkins")