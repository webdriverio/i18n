---
id: wdio-intercept-service
title: Servicio de Intercepción
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-service es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Captura y verifica llamadas HTTP ajax en [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Este es un plugin para [webdriver.io](http://webdriver.io/). Si aún no lo conoces, échale un vistazo, es bastante interesante.

Aunque selenium y webdriver se utilizan para pruebas e2e y especialmente pruebas de UI, es posible que desees evaluar las peticiones HTTP realizadas por tu código cliente (por ejemplo, cuando no tienes retroalimentación inmediata en la UI, como en llamadas de métricas o seguimiento). Con wdio-intercept-service puedes interceptar llamadas HTTP ajax iniciadas por alguna acción del usuario (por ejemplo, al presionar un botón, etc.) y realizar afirmaciones sobre la petición y las respuestas correspondientes más adelante.

Sin embargo, hay una limitación: no puedes interceptar llamadas HTTP que se inician en la carga de la página (como en la mayoría de las SPAs), ya que requiere un trabajo de configuración que solo se puede hacer después de que la página esté cargada (debido a limitaciones en selenium). **Esto significa que solo puedes capturar peticiones que fueron iniciadas dentro de una prueba.** Si estás de acuerdo con eso, este plugin podría ser para ti, así que sigue leyendo.

## Prerrequisitos

* webdriver.io **v5.x** o más reciente.

**¡Atención! Si todavía estás usando webdriver.io v4, por favor usa la rama v2.x de este plugin!**

## Instalación

```shell
npm install wdio-intercept-service -D
```

## Uso

### Uso con WebDriver CLI

Debería ser tan fácil como agregar wdio-intercept-service a tu `wdio.conf.js`:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

y todo está listo.

### Uso con WebDriver Standalone

Al usar WebdriverIO Standalone, las funciones `before` y `beforeTest` / `beforeScenario` deben ser llamadas manualmente.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // Ver ejemplo de uso
});
```

Una vez inicializado, se agregan algunas funciones relacionadas a la cadena de comandos de tu navegador (ver [API](#api)).

## Inicio rápido

Ejemplo de uso:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // captura llamadas ajax
browser.expectRequest('GET', '/api/foo', 200); // espera petición GET a /api/foo con código de estado 200
browser.expectRequest('POST', '/api/foo', 400); // espera petición POST a /api/foo con código de estado 400
browser.expectRequest('GET', /\/api\/foo/, 200); // también puede validar una URL con regex
browser.click('#button'); // botón que inicia la petición ajax
browser.pause(1000); // quizás esperar un poco hasta que la petición termine
browser.assertRequests(); // validar las peticiones
```

Obtener detalles sobre las peticiones:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Navegadores soportados

Debería funcionar con versiones algo más recientes de todos los navegadores. Por favor, reporta un problema si no parece funcionar con el tuyo.

## API

Consulta el archivo de declaración TypeScript para conocer la sintaxis completa de los comandos personalizados agregados al objeto navegador de WebdriverIO. En general, cualquier método que toma un objeto "options" como parámetro puede ser llamado sin ese parámetro para obtener el comportamiento predeterminado. Estos objetos "opciones opcionales" están seguidos por `?: = {}` y los valores predeterminados inferidos se describen para cada método.

### Descripción de opciones

Esta biblioteca ofrece una pequeña cantidad de configuración al emitir comandos. Las opciones de configuración que son utilizadas por múltiples métodos se describen aquí (ver la definición de cada método para determinar el soporte específico).

* `orderBy` (`'START' | 'END'`): Esta opción controla el ordenamiento de las peticiones capturadas por el interceptor, cuando se devuelven a tu prueba. Para mantener compatibilidad con versiones existentes de esta biblioteca, el ordenamiento predeterminado es `'END'`, que corresponde a cuándo se completó la petición. Si estableces la opción `orderBy` en `'START'`, entonces las peticiones se ordenarán según el momento en que se iniciaron.
* `includePending` (`boolean`): Esta opción controla si se devolverán las peticiones que aún no se han completado. Para mantener compatibilidad con versiones existentes de esta biblioteca, el valor predeterminado es `false`, y solo se devolverán las peticiones completadas.

### browser.setupInterceptor()

Captura llamadas ajax en el navegador. Siempre debes llamar a la función de configuración para poder evaluar las peticiones más tarde.

### browser.disableInterceptor()

Evita la captura adicional de llamadas ajax en el navegador. Se elimina toda la información de peticiones capturadas. La mayoría de los usuarios no necesitarán deshabilitar el interceptor, pero si una prueba es particularmente larga o excede la capacidad de almacenamiento de la sesión, entonces deshabilitar el interceptor puede ser útil.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Excluye peticiones de ciertas URLs de ser registradas. Toma una matriz de cadenas o expresiones regulares. Antes de escribir en el almacenamiento, prueba la URL de la petición contra cada cadena o expresión regular. Si coincide, la petición no se escribe en el almacenamiento. Al igual que disableInterceptor, esto puede ser útil si se enfrenta a problemas con el almacenamiento de sesión que excede la capacidad.

### browser.expectRequest(method: string, url: string, statusCode: number)

Haz expectativas sobre las peticiones ajax que se van a iniciar durante la prueba. Puede (y debe) ser encadenado. El orden de las expectativas debe corresponder al orden en que se realizan las peticiones.

* `method` (`String`): método http que se espera. Puede ser cualquier cosa que `xhr.open()` acepte como primer argumento.
* `url` (`String`|`RegExp`): URL exacta que se llama en la petición como una cadena o RegExp para coincidir
* `statusCode` (`Number`): código de estado esperado de la respuesta

### browser.getExpectations()

Método auxiliar. Devuelve todas las expectativas que has hecho hasta ese punto

### browser.resetExpectations()

Método auxiliar. Restablece todas las expectativas que has hecho hasta ese punto

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Llama a este método cuando todas las peticiones ajax esperadas hayan terminado. Compara las expectativas con las peticiones reales realizadas y verifica lo siguiente:

- Recuento de las peticiones que se realizaron
- El orden de las peticiones
- El método, la URL y el código de estado deben coincidir para cada petición realizada
- El objeto de opciones predeterminado es `{ orderBy: 'END' }`, es decir, cuando se completaron las peticiones, para ser consistente con el comportamiento de la v4.1.10 y anteriores. Cuando la opción `orderBy` se establece en `'START'`, las peticiones se ordenarán según cuándo fueron iniciadas por la página.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Similar a `browser.assertRequests`, pero valida solo las peticiones que especificas en tus directivas `expectRequest`, sin tener que mapear todas las peticiones de red que podrían ocurrir alrededor de eso. Si la opción `inOrder` es `true` (predeterminado), se espera que las peticiones se encuentren en el mismo orden en que se configuraron con `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Para hacer afirmaciones más sofisticadas sobre una petición específica, puedes obtener detalles para una petición específica. Debes proporcionar el índice basado en 0 de la petición a la que deseas acceder, en el orden en que se completaron las peticiones (predeterminado), o se iniciaron (pasando la opción `orderBy: 'START'`).

* `index` (`number`): número de la petición a la que deseas acceder
* `options` (`object`): Opciones de configuración
* `options.includePending` (`boolean`): Si las peticiones aún no completadas deben ser devueltas. Por defecto, esto es falso, para coincidir con el comportamiento de la biblioteca en la v4.1.10 y anteriores.
* `options.orderBy` (`'START' | 'END'`): Cómo deben ordenarse las peticiones. Por defecto, esto es `'END'`, para coincidir con el comportamiento de la biblioteca en la v4.1.10 y anteriores. Si es `'START'`, las peticiones se ordenarán por el momento de iniciación, en lugar del momento de finalización de la petición. (Dado que una petición pendiente aún no se ha completado, al ordenar por `'END'` todas las peticiones pendientes vendrán después de todas las peticiones completadas).

**Devuelve** objeto `request`:

* `request.url`: URL solicitada
* `request.method`: método HTTP utilizado
* `request.body`: datos de carga útil/cuerpo utilizados en la petición
* `request.headers`: encabezados http de la petición como objeto JS
* `request.pending`: bandera booleana que indica si esta petición está completa (es decir, tiene una propiedad `response`), o en vuelo.
* `request.response`: un objeto JS que solo está presente si la petición está completada (es decir, `request.pending === false`), que contiene datos sobre la respuesta.
* `request.response?.headers`: encabezados http de respuesta como objeto JS
* `request.response?.body`: cuerpo de la respuesta (se analizará como JSON si es posible)
* `request.response?.statusCode`: código de estado de la respuesta

**Una nota sobre `request.body`:** wdio-intercept-service intentará analizar el cuerpo de la petición de la siguiente manera:

* string: Simplemente devuelve la cadena (`'value'`)
* JSON: Analiza el objeto JSON utilizando `JSON.parse()` (`({ key: value })`)
* FormData: Mostrará el FormData en el formato `{ key: [value1, value2, ...] }`
* ArrayBuffer: Intentará convertir el buffer en una cadena (experimental)
* Cualquier otra cosa: Utilizará un brutal `JSON.stringify()` en tus datos. ¡Buena suerte!

**¡Para la API `fetch`, solo admitimos datos de cadena y JSON!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Obtiene todas las peticiones capturadas como una matriz, admitiendo las mismas opciones opcionales que `getRequest`.

**Devuelve** una matriz de objetos `request`.

### browser.hasPendingRequests()

Un método de utilidad que verifica si hay peticiones HTTP aún pendientes. Puede ser utilizado por las pruebas para asegurar que todas las peticiones se hayan completado dentro de un tiempo razonable, o para verificar que una llamada a `getRequests()` o `assertRequests()` incluirá todas las peticiones HTTP deseadas.

**Devuelve** booleano

## Soporte de TypeScript

Este plugin proporciona sus propios tipos TS. Solo apunta tu tsconfig a las extensiones de tipo como se menciona [aquí](https://webdriver.io/docs/typescript.html#framework-types):

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Ejecutando las pruebas

Se requieren versiones recientes de Chrome y Firefox para ejecutar las pruebas localmente. Es posible que necesites actualizar las dependencias `chromedriver` y `geckodriver` para que coincidan con la versión instalada en tu sistema.

```shell
npm test
```

## Contribuyendo

Estoy feliz por cada contribución. Solo abre un issue o presenta directamente un PR.  
Ten en cuenta que esta biblioteca interceptora está escrita para funcionar con navegadores heredados como Internet Explorer. Como tal, cualquier código utilizado en `lib/interceptor.js` debe al menos ser analizable por el tiempo de ejecución de JavaScript de Internet Explorer.

## Licencia

MIT