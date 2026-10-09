---
id: protractor-migration
title: Desde Protractor
description: "Migra un conjunto de pruebas de Protractor a WebdriverIO paso a paso, incluyendo dependencias, archivo de configuración y archivos de prueba, con la ayuda de un codemod."
---

Este tutorial es para personas que están usando Protractor y quieren migrar su framework a WebdriverIO. Se inició después de que el equipo de Angular [anunciara](https://github.com/angular/protractor/issues/5502) que Protractor dejaría de tener soporte. WebdriverIO ha sido influenciado por muchas de las decisiones de diseño de Protractor, por lo que probablemente sea el framework más cercano al que migrar. El equipo de WebdriverIO agradece el trabajo de cada uno de los colaboradores de Protractor y espera que este tutorial haga que la transición a WebdriverIO sea fácil y sencilla.

Aunque nos encantaría tener un proceso completamente automatizado para esto, la realidad es diferente. Cada persona tiene una configuración distinta y usa Protractor de formas diferentes. Cada paso debe verse como una orientación y no tanto como una instrucción paso a paso. Si tienes problemas con la migración, no dudes en [contactarnos](https://github.com/webdriverio/codemod/discussions/new).

## Configuración

La API de Protractor y la de WebdriverIO son en realidad muy similares, hasta el punto de que la mayoría de los comandos se pueden reescribir de forma automatizada mediante un [codemod](https://github.com/webdriverio/codemod).

Para instalar el codemod, ejecuta:

```sh
npm install jscodeshift @wdio/codemod
```

## Estrategia

Existen muchas estrategias de migración. Dependiendo del tamaño de tu equipo, la cantidad de archivos de prueba y la urgencia de la migración, puedes intentar transformar todas las pruebas a la vez o archivo por archivo. Dado que Protractor seguirá manteniéndose hasta la versión 15 de Angular (finales de 2022), todavía tienes tiempo suficiente. Puedes tener pruebas de Protractor y WebdriverIO ejecutándose al mismo tiempo y empezar a escribir las nuevas pruebas en WebdriverIO. Según tu presupuesto de tiempo, puedes empezar migrando primero los casos de prueba importantes e ir avanzando hasta las pruebas que incluso podrías eliminar.

## Primero el archivo de configuración

Después de haber instalado el codemod, podemos empezar a transformar el primer archivo. Echa un vistazo primero a las [opciones de configuración de WebdriverIO](configuration). Los archivos de configuración pueden volverse muy complejos y puede tener sentido portar solo las partes esenciales y ver cómo se puede añadir el resto una vez que se migren las pruebas correspondientes que necesitan ciertas opciones.

Para la primera migración solo transformamos el archivo de configuración y ejecutamos:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Tu configuración puede tener otro nombre, sin embargo el principio debería ser el mismo: empieza migrando primero la configuración.

:::

## Instalar las dependencias de WebdriverIO

El siguiente paso es configurar una instalación mínima de WebdriverIO que iremos ampliando a medida que migramos de un framework a otro. Primero instalamos el CLI de WebdriverIO mediante:

```sh
npm install --save-dev @wdio/cli
```

A continuación ejecutamos el asistente de configuración:

```sh
npx wdio config
```

Esto te guiará a través de un par de preguntas. Para este escenario de migración:
- elige las opciones predeterminadas
- recomendamos no generar automáticamente archivos de ejemplo
- elige una carpeta diferente para los archivos de WebdriverIO
- y elige Mocha en lugar de Jasmine.

:::info ¿Por qué Mocha?
Aunque es posible que antes usaras Protractor con Jasmine, Mocha ofrece mejores mecanismos de reintento. ¡La elección es tuya!
:::

Después del breve cuestionario, el asistente instalará todos los paquetes necesarios y los guardará en tu `package.json`.

## Migrar el archivo de configuración

Ahora que tenemos un `conf.ts` transformado y un nuevo `wdio.conf.ts`, es momento de migrar la configuración de un archivo a otro. Asegúrate de portar solo el código que sea esencial para que todas las pruebas puedan ejecutarse. En nuestro caso, portamos la función hook y el timeout del framework.

A partir de ahora continuaremos solo con nuestro archivo `wdio.conf.ts` y, por lo tanto, ya no necesitaremos ningún cambio en la configuración original de Protractor. Podemos revertir esos cambios para que ambos frameworks puedan ejecutarse en paralelo y podamos portar un archivo a la vez.

## Migrar un archivo de prueba

Ahora estamos listos para portar el primer archivo de prueba. Para empezar de forma sencilla, comencemos con uno que no tenga muchas dependencias de paquetes de terceros u otros archivos como PageObjects. En nuestro ejemplo, el primer archivo a migrar es `first-test.spec.ts`. Primero crea el directorio donde la nueva configuración de WebdriverIO espera sus archivos y luego muévelo allí:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Ahora transformemos este archivo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

¡Eso es todo! Este archivo es tan simple que no necesitamos ningún cambio adicional y podemos intentar ejecutar WebdriverIO directamente mediante:

```sh
npx wdio run wdio.conf.ts
```

¡Felicidades 🥳, acabas de migrar el primer archivo!

## Próximos pasos

A partir de este punto, continúa transformando prueba por prueba y page object por page object. Es posible que el codemod falle en ciertos archivos con un error como:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Para algunos comandos de Protractor simplemente no existe un reemplazo en WebdriverIO. En ese caso, el codemod te dará algunos consejos sobre cómo refactorizarlo. Si te encuentras con este tipo de mensajes de error con demasiada frecuencia, no dudes en [abrir un issue](https://github.com/webdriverio/codemod/issues/new) y solicitar que se añada una transformación concreta. Aunque el codemod ya transforma la mayor parte de la API de Protractor, todavía hay mucho margen de mejora.

## Conclusión

Esperamos que este tutorial te guíe un poco en el proceso de migración a WebdriverIO. La comunidad sigue mejorando el codemod mientras lo prueba con diversos equipos en distintas organizaciones. No dudes en [abrir un issue](https://github.com/webdriverio/codemod/issues/new) si tienes comentarios o [iniciar una discusión](https://github.com/webdriverio/codemod/discussions/new) si tienes dificultades durante el proceso de migración.