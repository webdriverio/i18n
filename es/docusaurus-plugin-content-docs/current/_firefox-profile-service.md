---
id: firefox-profile-service
title: Servicio de Perfil de Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


¿Quieres ejecutar tu navegador Firefox con una extensión específica o necesitas establecer algunas preferencias? Selenium te permite usar un perfil para el navegador Firefox pasando este perfil como cadena `base64` a la propiedad `moz:firefoxOptions.profile` en tus capacidades deseadas. Esto requiere construir ese perfil y convertirlo en `base64`. Este servicio para el [testrunner de wdio](https://webdriver.io/docs/clioptions) te quita el trabajo de compilar el perfil y te permite definir cómodamente tus opciones deseadas desde el archivo `wdio.conf.js`.

Para encontrar todas las opciones posibles, abre [about:config](about:config) en tu navegador Firefox o visita el sitio web de [mozillaZine](http://kb.mozillazine.org/About:config_entries) para encontrar toda la documentación sobre cada configuración. Además de eso, puedes definir extensiones de Firefox compiladas (como `*.xpi`) que deberían instalarse antes de que comience la prueba.

## Instalación

La forma más sencilla es mantener `@wdio/firefox-profile-service` como una devDependency en tu `package.json`, vía:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted)

## Configuración

Configura tu perfil añadiendo el servicio `firefox-profile` a tu lista de servicios. Luego define tus ajustes en la propiedad `firefoxProfile` de esta manera:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // ruta al archivo .xpi
                '/path/to/extensionB' // o ruta a la extensión de Firefox desempaquetada
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // solo usar para firefox <= 55
        }]
    ],
    // ...
};
```

Si has creado una extensión personalizada de Firefox que quieres instalar en el navegador, asegúrate de establecer `'xpinstall.signatures.required': false` como una bandera de perfil, ya que las extensiones de Firefox deben estar [firmadas por Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Para usar extensiones personalizadas sin firmar, también necesitarás usar [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) ya que el Firefox regular 48 y más reciente [no lo permiten](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Opciones

Contiene todos los ajustes como pares clave-valor. Puedes encontrar todos los ajustes disponibles en la página `about:config`.

### extensions

Añade una o múltiples extensiones a la sesión del navegador. Todas las entradas pueden ser tanto una ruta absoluta al archivo `.xpi` como la ruta a un directorio de extensión de Firefox desempaquetado.

Tipo: `String[]`<br />
Por defecto: `[]`

### profileDirectory

Crea un perfil de Firefox basado en uno existente estableciendo una ruta absoluta a ese perfil.

Tipo: `String`<br />
Por defecto: `null`

### proxy

Establece la configuración del proxy de red. El parámetro `proxy` es un hash cuya estructura depende del valor de la clave obligatoria `proxyType`, que toma uno de los siguientes valores de cadena:

 * `direct` - conexión directa (sin proxy)
 * `system` - usar la configuración de proxy del sistema operativo
 * `pac` - usar una configuración automática de proxy basada en el valor de la clave `autoconfigUrl`
 * `manual` - configuración manual de proxy definida por separado para diferentes protocolos usando valores de las siguientes claves: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Tipo: `Object`<br />
Por defecto: `null`<br />
Ejemplo:

- Proxy Automático:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP Manual:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP y HTTPS Manual:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Por favor, establece esta bandera a `true` si usas Firefox v55 o inferior.

Tipo: `Boolean`<br />
Por defecto: `false`

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).