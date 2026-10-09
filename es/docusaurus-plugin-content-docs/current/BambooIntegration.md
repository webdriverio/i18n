---
id: bamboo
title: Bamboo
description: "Ejecuta pruebas de WebdriverIO en Atlassian Bamboo y publica los resultados de JUnit para que puedas hacer un seguimiento de las pruebas exitosas, fallidas y corregidas en cada build."
---

WebdriverIO ofrece una integración estrecha con sistemas de CI como [Bamboo](https://www.atlassian.com/software/bamboo). Con el reporter de [JUnit](https://webdriver.io/docs/junit-reporter.html) o de [Allure](https://webdriver.io/docs/allure-reporter.html), puedes depurar fácilmente tus pruebas, así como hacer un seguimiento de los resultados de tus pruebas. La integración es bastante sencilla.

1. Instala el reporter de pruebas JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Actualiza tu configuración para guardar los resultados de JUnit donde Bamboo pueda encontrarlos (y especifica el reporter `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
Nota: *Siempre es una buena práctica guardar los resultados de las pruebas en una carpeta separada en lugar de en la carpeta raíz.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

Los informes serán similares para todos los frameworks y puedes usar cualquiera: Mocha, Jasmine o Cucumber.

A estas alturas, suponemos que ya tienes las pruebas escritas, que los resultados se generan en la carpeta ```./testresults/``` y que tu Bamboo está funcionando.

## Integra tus pruebas en Bamboo

1. Abre tu proyecto de Bamboo
    > Crea un nuevo plan, vincula tu repositorio (asegúrate de que siempre apunte a la versión más reciente de tu repositorio) y crea tus stages

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Yo usaré el stage y el job predeterminados. En tu caso, puedes crear tus propios stages y jobs

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Abre tu job de pruebas y crea tareas para ejecutar tus pruebas en Bamboo
    >**Tarea 1:** Checkout del código fuente

    >**Tarea 2:** Ejecuta tus pruebas ```npm i && npm run test```. Puedes usar la tarea *Script* y el *Shell Interpreter* para ejecutar los comandos anteriores (esto generará los resultados de las pruebas y los guardará en la carpeta ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Tarea: 3** Añade la tarea *jUnit Parser* para analizar los resultados de pruebas guardados. Especifica aquí el directorio de resultados de las pruebas (también puedes usar patrones de estilo Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Asegúrate de mantener la tarea de análisis de resultados en la sección *Final*, para que siempre se ejecute incluso si tu tarea de pruebas falla*

    >**Tarea: 4** (opcional) Para asegurarte de que tus resultados de pruebas no se mezclen con archivos antiguos, puedes crear una tarea que elimine la carpeta ```./testresults/``` después de un análisis exitoso en Bamboo. Puedes añadir un script de shell como ```rm -f ./testresults/*.xml``` para eliminar los resultados o ```rm -r testresults``` para eliminar la carpeta completa

Una vez terminada esta *ciencia espacial*, habilita el plan y ejecútalo. El resultado final será similar a:

## Prueba exitosa

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Prueba fallida

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fallida y corregida

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

¡¡Bien!! Eso es todo. Has integrado con éxito tus pruebas de WebdriverIO en Bamboo.