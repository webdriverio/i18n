---
id: setuptypes
title: Tipos de configuración
description: "Compara las formas de usar WebdriverIO, desde los enlaces de protocolo sin procesar hasta el modo independiente y el testrunner de WDIO, y elige la adecuada."
---

WebdriverIO puede utilizarse para diversos propósitos. Implementa la API del protocolo WebDriver y puede ejecutar un navegador de forma automatizada. El framework está diseñado para funcionar en cualquier entorno arbitrario y para cualquier tipo de tarea. Es independiente de cualquier framework de terceros y solo requiere Node.js para ejecutarse.

## Enlaces de protocolo

Para interacciones básicas con el protocolo WebDriver, WebdriverIO utiliza sus propios enlaces de protocolo basados en el paquete NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Todos los [comandos del protocolo](api/webdriver) devuelven la respuesta sin procesar del driver de automatización. El paquete es muy ligero y __no__ hay lógica inteligente como esperas automáticas para simplificar la interacción con el uso del protocolo.

Los comandos del protocolo aplicados a la instancia dependen de la respuesta inicial de sesión del driver. Por ejemplo, si la respuesta indica que se inició una sesión móvil, el paquete aplica los comandos de Appium al prototipo de la instancia.

Para obtener más información sobre la interfaz del paquete `webdriver`, consulta [API de módulos](/docs/api/modules).

[WebdriverIO DevTools](/docs/devtools) no es un protocolo de automatización. Es la interfaz de depuración para observar una ejecución en vivo y reproducir trazas posteriormente.

## Modo independiente

Para simplificar la interacción con el protocolo WebDriver, el paquete `webdriverio` implementa una variedad de comandos sobre el protocolo (por ejemplo, el comando [`dragAndDrop`](api/element/dragAndDrop)) y conceptos fundamentales como [selectores inteligentes](selectors) o [esperas automáticas](autowait). El ejemplo anterior se puede simplificar así:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Usar WebdriverIO en modo independiente te sigue dando acceso a todos los comandos del protocolo, pero proporciona un superconjunto de comandos adicionales que ofrecen una interacción de más alto nivel con el navegador. Te permite integrar esta herramienta de automatización en tu propio proyecto (de pruebas) para crear una nueva biblioteca de automatización. Algunos ejemplos populares son [Oxygen](https://github.com/oxygenhq/oxygen) o [CodeceptJS](http://codecept.io). También puedes escribir scripts de Node simples para extraer contenido de la web (o cualquier otra cosa que requiera un navegador en ejecución).

Si no se establecen opciones específicas, WebdriverIO siempre intentará descargar y configurar el driver del navegador que coincida con la propiedad `browserName` en tus capacidades. En el caso de Chrome y Firefox, también podría instalarlos dependiendo de si puede encontrar el navegador correspondiente en la máquina.

Para obtener más información sobre las interfaces del paquete `webdriverio`, consulta [API de módulos](/docs/api/modules).

## El Testrunner de WDIO

Sin embargo, el propósito principal de WebdriverIO son las pruebas de extremo a extremo a gran escala. Por ello, implementamos un test runner que te ayuda a construir una suite de pruebas fiable que sea fácil de leer y mantener.

El test runner se encarga de muchos problemas que son comunes al trabajar con bibliotecas de automatización simples. Por un lado, organiza tus ejecuciones de pruebas y divide las especificaciones de prueba para que tus pruebas se puedan ejecutar con la máxima concurrencia. También gestiona la administración de sesiones y proporciona muchas funciones para ayudarte a depurar problemas y encontrar errores en tus pruebas.

Aquí está el mismo ejemplo de arriba, escrito como una especificación de prueba y ejecutado por WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

El test runner es una abstracción de frameworks de pruebas populares como Mocha, Jasmine o Cucumber. Para ejecutar tus pruebas usando el test runner de WDIO, consulta la sección [Primeros pasos](gettingstarted) para obtener más información.

Para obtener más información sobre la interfaz del paquete testrunner `@wdio/cli`, consulta [API de módulos](/docs/api/modules).