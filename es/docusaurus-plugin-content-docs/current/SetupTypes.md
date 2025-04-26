---
id: setuptypes
title: Tipos de Configuración
---

WebdriverIO puede ser utilizado para diversos propósitos. Implementa la API del protocolo WebDriver y puede ejecutar un navegador de forma automatizada. El framework está diseñado para trabajar en cualquier entorno arbitrario y para cualquier tipo de tarea. Es independiente de frameworks de terceros y solo requiere Node.js para ejecutarse.

## Enlaces de Protocolo

Para interacciones básicas con WebDriver y otros protocolos de automatización, WebdriverIO utiliza sus propios enlaces de protocolo basados en el paquete NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Todos los [comandos de protocolo](api/webdriver) devuelven la respuesta sin procesar del controlador de automatización. El paquete es muy ligero y __no__ hay lógica inteligente como auto-esperas para simplificar la interacción con el uso del protocolo.

Los comandos de protocolo aplicados a la instancia dependen de la respuesta inicial de sesión del controlador. Por ejemplo, si la respuesta indica que se inició una sesión móvil, el paquete aplica todos los comandos del protocolo Appium y Mobile JSON Wire al prototipo de la instancia.

Puedes ejecutar el mismo conjunto de comandos (excepto los móviles) utilizando el protocolo Chrome DevTools al importar el paquete NPM [`devtools`](https://www.npmjs.com/package/devtools). Tiene la misma interfaz que el paquete `webdriver` pero ejecuta su automatización basada en [Puppeteer](https://pptr.dev/).

Para más información sobre estas interfaces de paquetes, consulta [API de Módulos](/docs/api/modules).

## Modo Independiente

Para simplificar la interacción con el protocolo WebDriver, el paquete `webdriverio` implementa una variedad de comandos sobre el protocolo (por ejemplo, el comando [`dragAndDrop`](api/element/dragAndDrop)) y conceptos básicos como [selectores inteligentes](selectors) o [auto-esperas](autowait). El ejemplo anterior se puede simplificar así:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Usar WebdriverIO en modo independiente todavía te da acceso a todos los comandos del protocolo, pero proporciona un superconjunto de comandos adicionales que ofrecen una interacción de nivel superior con el navegador. Te permite integrar esta herramienta de automatización en tu propio proyecto (de prueba) para crear una nueva biblioteca de automatización. Ejemplos populares incluyen [Oxygen](https://github.com/oxygenhq/oxygen) o [CodeceptJS](http://codecept.io). También puedes escribir scripts simples de Node para extraer contenido web (o cualquier otra cosa que requiera un navegador en ejecución).

Si no se establecen opciones específicas, WebdriverIO siempre intentará descargar y configurar el controlador del navegador que coincida con la propiedad `browserName` en tus capacidades. En el caso de Chrome y Firefox, también podría instalarlos dependiendo de si puede encontrar el navegador correspondiente en la máquina.

Para más información sobre las interfaces del paquete `webdriverio`, consulta [API de Módulos](/docs/api/modules).

## El Ejecutor de Pruebas WDIO

Sin embargo, el propósito principal de WebdriverIO es realizar pruebas de extremo a extremo a gran escala. Por lo tanto, implementamos un ejecutor de pruebas que te ayuda a construir un conjunto de pruebas confiable que sea fácil de leer y mantener.

El ejecutor de pruebas se encarga de muchos problemas que son comunes cuando se trabaja con bibliotecas de automatización simples. Por un lado, organiza tus ejecuciones de prueba y divide las especificaciones de prueba para que tus pruebas puedan ejecutarse con la máxima concurrencia. También maneja la gestión de sesiones y proporciona muchas funciones para ayudarte a depurar problemas y encontrar errores en tus pruebas.

Aquí está el mismo ejemplo de arriba, escrito como una especificación de prueba y ejecutado por WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

El ejecutor de pruebas es una abstracción de frameworks de prueba populares como Mocha, Jasmine o Cucumber. Para ejecutar tus pruebas usando el ejecutor de pruebas WDIO, consulta la sección [Primeros Pasos](gettingstarted) para obtener más información.

Para más información sobre la interfaz del paquete ejecutor de pruebas `@wdio/cli`, consulta [API de Módulos](/docs/api/modules).