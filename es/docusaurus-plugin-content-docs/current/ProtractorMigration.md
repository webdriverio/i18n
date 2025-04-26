---
id: protractor-migration
title: Desde Protractor
---

Este tutorial está dirigido a personas que utilizan Protractor y desean migrar su framework a WebdriverIO. Se inició después de que el equipo de Angular [anunciara](https://github.com/angular/protractor/issues/5502) que Protractor ya no sería mantenido. WebdriverIO ha sido influenciado por muchas de las decisiones de diseño de Protractor, por lo que probablemente es el framework más cercano al que migrar. El equipo de WebdriverIO aprecia el trabajo de cada uno de los contribuyentes de Protractor y espera que este tutorial haga la transición a WebdriverIO fácil y directa.

Aunque nos encantaría tener un proceso completamente automatizado para esto, la realidad es diferente. Cada uno tiene una configuración diferente y utiliza Protractor de diferentes maneras. Cada paso debe verse como una guía y menos como una instrucción paso a paso. Si tienes problemas con la migración, no dudes en [contactarnos](https://github.com/webdriverio/codemod/discussions/new).

## Configuración

La API de Protractor y WebdriverIO es en realidad muy similar, hasta el punto en que la mayoría de los comandos pueden reescribirse de manera automatizada a través de un [codemod](https://github.com/webdriverio/codemod).

Para instalar el codemod, ejecuta:

```sh
npm install jscodeshift @wdio/codemod
```

## Estrategia

Hay muchas estrategias de migración. Dependiendo del tamaño de tu equipo, la cantidad de archivos de prueba y la urgencia para migrar, puedes intentar transformar todas las pruebas a la vez o archivo por archivo. Dado que Protractor continuará siendo mantenido hasta la versión 15 de Angular (finales de 2022), todavía tienes tiempo suficiente. Puedes tener pruebas de Protractor y WebdriverIO ejecutándose al mismo tiempo y comenzar a escribir nuevas pruebas en WebdriverIO. Según tu presupuesto de tiempo, puedes comenzar migrando primero los casos de prueba importantes y trabajar hasta llegar a pruebas que incluso podrías eliminar.

## Primero el archivo de configuración

Después de haber instalado el codemod, podemos comenzar a transformar el primer archivo. Primero, echa un vistazo a las [opciones de configuración de WebdriverIO](configuration). Los archivos de configuración pueden volverse muy complejos y podría tener sentido portar solo las partes esenciales y ver cómo se pueden agregar el resto una vez que se migren las pruebas correspondientes que necesitan ciertas opciones.

Para la primera migración, solo transformamos el archivo de configuración y ejecutamos:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Tu configuración puede tener un nombre diferente, sin embargo, el principio debería ser el mismo: comienza migrando la configuración primero.

:::

## Instalar dependencias de WebdriverIO

El siguiente paso es configurar una configuración mínima de WebdriverIO que comenzaremos a construir a medida que migramos de un framework a otro. Primero instalamos la CLI de WebdriverIO a través de:

```sh
npm install --save-dev @wdio/cli
```

Luego ejecutamos el asistente de configuración:

```sh
npx wdio config
```

Esto te guiará a través de algunas preguntas. Para este escenario de migración:
- elige las opciones predeterminadas
- recomendamos no generar automáticamente archivos de ejemplo
- elige una carpeta diferente para los archivos de WebdriverIO
- y elegir Mocha en lugar de Jasmine.

:::info ¿Por qué Mocha?
Aunque es posible que hayas estado usando Protractor con Jasmine antes, Mocha proporciona mejores mecanismos de reintento. ¡La elección es tuya!
:::

Después del pequeño cuestionario, el asistente instalará todos los paquetes necesarios y los almacenará en tu `package.json`.

## Migrar archivo de configuración

Después de haber transformado `conf.ts` y tener un nuevo `wdio.conf.ts`, ahora es el momento de migrar la configuración de un archivo a otro. Asegúrate de portar solo el código que es esencial para que todas las pruebas puedan ejecutarse. En el nuestro, portamos la función de hook y el tiempo de espera del framework.

Ahora continuaremos solo con nuestro archivo `wdio.conf.ts` y, por lo tanto, no necesitaremos ningún cambio en la configuración original de Protractor. Podemos revertirlos para que ambos frameworks puedan ejecutarse uno al lado del otro y podamos portar un archivo a la vez.

## Migrar archivo de prueba

Ahora estamos listos para portar el primer archivo de prueba. Para empezar de manera simple, comencemos con uno que no tenga muchas dependencias de paquetes de terceros u otros archivos como PageObjects. En nuestro ejemplo, el primer archivo a migrar es `first-test.spec.ts`. Primero crea el directorio donde la nueva configuración de WebdriverIO espera sus archivos y luego muévelo:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Ahora transformemos este archivo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

¡Eso es todo! Este archivo es tan simple que no necesitamos cambios adicionales y podemos intentar ejecutar WebdriverIO directamente mediante:

```sh
npx wdio run wdio.conf.ts
```

¡Felicidades 🥳 acabas de migrar el primer archivo!

## Próximos pasos

A partir de este punto, continúas transformando prueba por prueba y page object por page object. Existe la posibilidad de que el codemod falle para ciertos archivos con un error como:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Para algunos comandos de Protractor simplemente no hay reemplazo en WebdriverIO. En este caso, el codemod te dará algunos consejos sobre cómo refactorizarlo. Si te encuentras con tales mensajes de error con demasiada frecuencia, no dudes en [crear un issue](https://github.com/webdriverio/codemod/issues/new) y solicitar agregar una cierta transformación. Si bien el codemod ya transforma la mayoría de la API de Protractor, todavía hay mucho espacio para mejoras.

## Conclusión

Esperamos que este tutorial te guíe un poco a través del proceso de migración a WebdriverIO. La comunidad continúa mejorando el codemod mientras lo prueba con varios equipos en diversas organizaciones. No dudes en [crear un issue](https://github.com/webdriverio/codemod/issues/new) si tienes comentarios o [iniciar una discusión](https://github.com/webdriverio/codemod/discussions/new) si tienes dificultades durante el proceso de migración.