---
id: cloudservices
title: Uso de Servicios en la Nube
---

El uso de servicios bajo demanda como Sauce Labs, Browserstack, TestingBot, LambdaTest o Perfecto con WebdriverIO es bastante simple. Todo lo que necesitas hacer es configurar el `user` y `key` de tu servicio en tus opciones.

Opcionalmente, también puedes parametrizar tu prueba configurando capacidades específicas de la nube como `build`. Si solo quieres ejecutar servicios en la nube en Travis, puedes usar la variable de entorno `CI` para verificar si estás en Travis y modificar la configuración en consecuencia.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Puedes configurar tus pruebas para que se ejecuten de forma remota en [Sauce Labs](https://saucelabs.com).

El único requisito es establecer el `user` y `key` en tu configuración (ya sea exportado por `wdio.conf.js` o pasado a `webdriverio.remote(...)`) con tu nombre de usuario y clave de acceso de Sauce Labs.

También puedes pasar cualquier [opción de configuración de prueba](https://docs.saucelabs.com/dev/test-configuration-options/) opcional como clave/valor en las capacidades para cualquier navegador.

### Sauce Connect

Si deseas ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Está fuera del alcance de WebdriverIO soportar esto, por lo que tendrás que iniciarlo por tu cuenta.

Si estás utilizando el testrunner de WDIO, descarga y configura el [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) en tu `wdio.conf.js`. Ayuda a ejecutar Sauce Connect y viene con características adicionales que integran mejor tus pruebas en el servicio de Sauce.

### Con Travis CI

Sin embargo, Travis CI [tiene soporte](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) para iniciar Sauce Connect antes de cada prueba, por lo que seguir sus instrucciones para eso es una opción.

Si lo haces, debes establecer la opción de configuración de prueba `tunnel-identifier` en las `capabilities` de cada navegador. Travis establece esto en la variable de entorno `TRAVIS_JOB_NUMBER` por defecto.

Además, si deseas que Sauce Labs agrupe tus pruebas por número de compilación, puedes establecer el `build` en `TRAVIS_BUILD_NUMBER`.

Por último, si estableces `name`, esto cambia el nombre de esta prueba en Sauce Labs para esta compilación. Si estás utilizando el testrunner de WDIO combinado con el [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), WebdriverIO establece automáticamente un nombre adecuado para la prueba.

Ejemplo de `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Tiempos de espera

Dado que estás ejecutando tus pruebas de forma remota, puede ser necesario aumentar algunos tiempos de espera.

Puedes cambiar el [tiempo de espera de inactividad](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) pasando `idle-timeout` como una opción de configuración de prueba. Esto controla cuánto tiempo esperará Sauce entre comandos antes de cerrar la conexión.

## BrowserStack

WebdriverIO también tiene una integración con [Browserstack](https://www.browserstack.com) incorporada.

El único requisito es establecer el `user` y `key` en tu configuración (ya sea exportado por `wdio.conf.js` o pasado a `webdriverio.remote(...)`) con tu nombre de usuario y clave de acceso de automatización de Browserstack.

También puedes pasar cualquier [capacidad soportada](https://www.browserstack.com/automate/capabilities) opcional como clave/valor en las capacidades para cualquier navegador. Si estableces `browserstack.debug` en `true`, grabará una captura de pantalla de la sesión, lo que podría ser útil.

### Pruebas locales

Si deseas ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Pruebas locales](https://www.browserstack.com/local-testing#command-line).

Está fuera del alcance de WebdriverIO soportar esto, por lo que debes iniciarlo por tu cuenta.

Si usas local, debes establecer `browserstack.local` en `true` en tus capacidades.

Si estás utilizando el testrunner de WDIO, descarga y configura el [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) en tu `wdio.conf.js`. Ayuda a ejecutar BrowserStack y viene con características adicionales que integran mejor tus pruebas en el servicio de BrowserStack.

### Con Travis CI

Si deseas agregar Pruebas locales en Travis, debes iniciarlo por tu cuenta.

El siguiente script descargará e iniciará en segundo plano. Deberías ejecutar esto en Travis antes de iniciar las pruebas.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Además, es posible que desees establecer el `build` en el número de compilación de Travis.

Ejemplo de `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

El único requisito es establecer el `user` y `key` en tu configuración (ya sea exportado por `wdio.conf.js` o pasado a `webdriverio.remote(...)`) con tu nombre de usuario y clave secreta de [TestingBot](https://testingbot.com).

También puedes pasar cualquier [capacidad soportada](https://testingbot.com/support/other/test-options) opcional como clave/valor en las capacidades para cualquier navegador.

### Pruebas locales

Si deseas ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Pruebas locales](https://testingbot.com/support/other/tunnel). TestingBot proporciona un túnel basado en Java para permitirte probar sitios web no accesibles desde Internet.

Su página de soporte de túnel contiene la información necesaria para ponerlo en marcha.

Si estás utilizando el testrunner de WDIO, descarga y configura el [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) en tu `wdio.conf.js`. Ayuda a ejecutar TestingBot y viene con características adicionales que integran mejor tus pruebas en el servicio de TestingBot.

## LambdaTest

La integración con [LambdaTest](https://www.lambdatest.com) también está incorporada.

El único requisito es establecer el `user` y `key` en tu configuración (ya sea exportado por `wdio.conf.js` o pasado a `webdriverio.remote(...)`) con tu nombre de usuario y clave de acceso de la cuenta de LambdaTest.

También puedes pasar cualquier [capacidad soportada](https://www.lambdatest.com/capabilities-generator/) opcional como clave/valor en las capacidades para cualquier navegador. Si estableces `visual` en `true`, grabará una captura de pantalla de la sesión, lo que podría ser útil.

### Túnel para pruebas locales

Si deseas ejecutar pruebas contra un servidor que no es accesible desde Internet (como en `localhost`), entonces necesitas usar [Pruebas locales](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/).

Está fuera del alcance de WebdriverIO soportar esto, por lo que debes iniciarlo por tu cuenta.

Si usas local, debes establecer `tunnel` en `true` en tus capacidades.

Si estás utilizando el testrunner de WDIO, descarga y configura el [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) en tu `wdio.conf.js`. Ayuda a ejecutar LambdaTest y viene con características adicionales que integran mejor tus pruebas en el servicio de LambdaTest.

### Con Travis CI

Si deseas agregar Pruebas locales en Travis, debes iniciarlo por tu cuenta.

El siguiente script descargará e iniciará en segundo plano. Deberías ejecutar esto en Travis antes de iniciar las pruebas.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Además, es posible que desees establecer el `build` en el número de compilación de Travis.

Ejemplo de `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Cuando usas wdio con [`Perfecto`](https://www.perfecto.io), necesitas crear un token de seguridad para cada usuario y agregarlo en la estructura de capacidades (además de otras capacidades), de la siguiente manera:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Además, necesitas agregar la configuración de la nube, de la siguiente manera:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```