---
id: bamboo
title: Bamboo
---

WebdriverIO ofrece una integración estrecha con sistemas de CI como [Bamboo](https://www.atlassian.com/software/bamboo). Con el reportero [JUnit](https://webdriver.io/docs/junit-reporter.html) o [Allure](https://webdriver.io/docs/allure-reporter.html), puedes depurar fácilmente tus pruebas y hacer seguimiento de tus resultados. La integración es bastante sencilla.

1. Instala el reportero de pruebas JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. Actualiza tu configuración para guardar tus resultados JUnit donde Bamboo pueda encontrarlos (y especifica el reportero `junit`):

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
Nota: *Siempre es un buen estándar mantener los resultados de las pruebas en una carpeta separada y no en la carpeta raíz.*

```js
// wdio.conf.js - Para pruebas ejecutándose en paralelo
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

A estas alturas, creemos que ya tienes las pruebas escritas y los resultados se generan en la carpeta ```./testresults/```, y tu Bamboo está en funcionamiento.

## Integra tus pruebas en Bamboo

1. Abre tu proyecto de Bamboo
    > Crea un nuevo plan, enlaza tu repositorio (asegúrate de que siempre apunte a la versión más reciente de tu repositorio) y crea tus etapas

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    Yo iré con la etapa y trabajo predeterminados. En tu caso, puedes crear tus propias etapas y trabajos

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. Abre tu trabajo de pruebas y crea tareas para ejecutar tus pruebas en Bamboo
    >**Tarea 1:** Checkout del código fuente

    >**Tarea 2:** Ejecuta tus pruebas ```npm i && npm run test```. Puedes usar la tarea *Script* y el *Intérprete de Shell* para ejecutar los comandos anteriores (Esto generará los resultados de las pruebas y los guardará en la carpeta ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Tarea: 3** Añade la tarea *jUnit Parser* para analizar tus resultados de pruebas guardados. Por favor, especifica el directorio de resultados de pruebas aquí (también puedes usar patrones de estilo Ant)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    Nota: *Asegúrate de mantener la tarea del analizador de resultados en la sección *Final*, para que siempre se ejecute incluso si tu tarea de prueba falla*

    >**Tarea: 4** (opcional) Para asegurarte de que tus resultados de pruebas no se mezclen con archivos antiguos, puedes crear una tarea para eliminar la carpeta ```./testresults/``` después de un análisis exitoso en Bamboo. Puedes añadir un script de shell como ```rm -f ./testresults/*.xml``` para eliminar los resultados o ```rm -r testresults``` para eliminar la carpeta completa

Una vez que se completa la *ciencia espacial* anterior, habilita el plan y ejecútalo. Tu resultado final será como:

## Prueba exitosa

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## Prueba fallida

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## Fallida y arreglada

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

¡Genial! Eso es todo. Has integrado con éxito tus pruebas de WebdriverIO en Bamboo.