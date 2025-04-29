---
id: wdio-lambdatest-service
title: Servicio LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---


> wdio-lambdatest-service es un paquete de terceros, para más información consulte [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Un servicio de WebdriverIO que gestiona el túnel y los metadatos de trabajos para usuarios de LambdaTest.

## Instalación

```bash
npm i wdio-lambdatest-service --save-dev
```

Las instrucciones sobre cómo instalar `WebdriverIO` se pueden encontrar [aquí.](https://webdriver.io/docs/gettingstarted.html)


## Configuración

WebdriverIO tiene soporte para LambdaTest incorporado. Simplemente debes establecer `user` y `key` en tu archivo `wdio.conf.js`. Para habilitar la función para automatización de aplicaciones, establece `product: 'appAutomation'` en tu archivo `wdio.conf.js`. Este plugin de servicio proporciona soporte para [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Establece también `tunnel: true` para activar esta característica.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### Para obtener observaciones de errores de prueba en el panel de automatización
Para obtener observaciones de errores de prueba en el panel de automatización, simplemente añade `ltErrorRemark: true` en tu `wdio.conf.js`.


### Para cargar aplicaciones desde local o URL
Sube aplicaciones `android` o `ios` desde local o desde URL de aplicación alojada agregando esta configuración requerida en tu `wdio.conf.js`. Para usar la aplicación cargada para pruebas en la misma ejecución, establece `enableCapability = true`, esto establecerá el valor de la URL de la aplicación en las capacidades.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //proporciona el nombre deseado para tu aplicación
            app_path : "/path/to/your/app/file", //proporciona la ubicación local de la aplicación
            // o
            app_url : "https://example.test_android.apk", //proporciona la URL donde está alojada o almacenada tu aplicación
            custom_id : "12345", //proporciona tu ID personalizado deseado
            enableCapability : true
        }
    }
    ]
]
```

## Opciones

Para autorizarse en el servicio LambdaTest, tu configuración debe contener las opciones [`user`](https://webdriver.io/docs/options.html#user) y [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Establece esto como true para habilitar el enrutamiento de conexiones desde la nube de LambdaTest a través de tu computadora. También necesitarás establecer `tunnel` como true en las capacidades del navegador.

Tipo: `Boolean`<br />
Predeterminado: `false`

### lambdatestOpts
Las opciones específicas especificadas se transmitirán a LambdaTest Tunnel.

Tipo: `Object`<br />
Predeterminado: `{}`

A continuación se muestra una lista completa de todas las opciones disponibles:

#### tunnelName
Especifica el nombre personalizado del túnel LambdaTest que se utilizará.

**Ejemplo:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Puerto para activar LambdaTest Tunnel.

**Ejemplo:**
```json
{"port": 33000}
```
#### user
Nombre de usuario de LambdaTest.

**Ejemplo:**
```json
{"user": "your_username"}
```

#### key
Clave de acceso de LambdaTest.

**Ejemplo:**
```json
{"key": "your_access_key"}
```

#### verbose
¿Debe registrarse cada solicitud de proxy en stdout?

**Ejemplo:**
```json
{"verbose": true}
```

#### logFile
Ubicación del archivo de registro de LambdaTest Tunnel.

**Ejemplo:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Ruta del archivo de configuración a utilizar.
**Ejemplo:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Especifica el directorio local que será servido por un servidor de archivos en el puerto del túnel.

**Ejemplo:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Especifica el nombre de host del puerto proxy del túnel.

**Ejemplo:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Especifica el nombre de usuario del puerto proxy del túnel.

**Ejemplo:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Especifica la contraseña del puerto proxy del túnel.

**Ejemplo:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Especifica el número de puerto donde se activará el proxy del túnel.

**Ejemplo:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Usa la configuración de proxy solo para solicitudes salientes.

**Ejemplo:**
```json
{"egressOnly": true}
```


#### ingressOnly
Enruta solo el tráfico entrante a través del proxy especificado.

**Ejemplo:**
```json
{"ingressOnly": true}
```


#### pacfile
Para usar PAC (Proxy Auto-Configuration) en pruebas locales, proporciona
la ruta de un archivo PAC.

**Ejemplo:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Activa el [Balanceo de Carga](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) para LambdaTest Tunnel.

**Ejemplo:**
```json
{"loadBalanced": true}
```

#### mode
Especifica en qué modo debe ejecutarse el túnel "ssh" o "ws". (predeterminado "ssh").

**Ejemplo:**
```json
{"mode": "ssh"}
```

#### sshConnType
Especifica el tipo de conexión ssh (over_22, over_443, over_ws). Para usar –sshConnType, especifica primero la bandera ––mode ssh.

**Ejemplo:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Aumenta la conexión SSH desde el Cliente del Túnel al Servidor del Túnel. El valor máximo permitido es 30.

**Ejemplo:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Compartir túnel entre miembros del equipo.

**Ejemplo:**
```json
{"sharedTunnel": true}
```

#### env
El entorno en el que se ejecutará LambdaTest Tunnel.

**Ejemplo:**
```json
{"env": "production"}
```


#### infoAPIPort
Expone [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) en el puerto especificado.

**Ejemplo:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL de devolución de llamada para el estado del túnel.

**Ejemplo:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Lista separada por comas de hosts para enrutar a través del túnel. Todo lo demás se enrutará a través de Internet.

**Ejemplo:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Lista separada por comas de hosts para omitir del túnel. Estos se enrutarán a través de Internet.

**Ejemplo:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Ruta del archivo del Certificado de Cliente mTLS.

**Ejemplo:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Ruta del archivo de la Clave de Cliente mTLS.

**Ejemplo:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Lista separada por comas de hosts mTLS.

**Ejemplo:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Lista separada por comas de Servidores DNS.

**Ejemplo:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Habilitar el modo [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) para LambdaTest Tunnel.

**Ejemplo:**
```json
{"mitm": true}
```

#### ntlm
Para utilizar la autenticación Microsoft NTLM (Windows NT LAN Manager) para fines de comunicación o transporte.

**Ejemplo:**
```json
{"ntlm": true}
```

#### pidfile
Ruta del archivo pid, donde se escribirá el ID del proceso.

**Ejemplo:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Establece la dirección remota a una IP interna de la máquina cliente.

**Ejemplo:**
```json
{"usePrivateIp": true}
```

Puedes encontrar más información sobre estas opciones [aquí](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Solo para Cucumber. Establece el nombre de la sesión al nombre del Escenario si solo se ejecutó un único Escenario.
Útil cuando se ejecuta en paralelo con [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Predeterminado: `false`

### sessionNameFormat
Personaliza el formato del nombre de la sesión.

Tipo: `Function`<br />
Predeterminado (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Predeterminado (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Solo para Mocha. No añade el título de la prueba al nombre de la sesión.

Tipo: `Boolean`<br />
Predeterminado: `false`

### sessionNamePrependTopLevelSuiteTitle
Solo para Mocha. Antepone el título del suite de nivel superior al nombre de la sesión.

Tipo: `Boolean`<br />
Predeterminado: `false`

### setSessionName
Establece automáticamente el nombre de la sesión.

Tipo: `Boolean`<br />
Predeterminado: `true`

### setSessionStatus
Establece automáticamente el estado de la sesión (aprobado/fallido).

Tipo: `Boolean`<br />
Predeterminado: `true`


### ignoreTestCountInName
Ignora el recuento de reintentos de una prueba en el nombre

Tipo: `Boolean`<br />
Predeterminado: `false`


### useScenarioName
Para obtener nombres de pruebas como nombres de escenarios para pruebas específicas de cucumber, simplemente añade `useScenarioName: true` en tu `wdio.conf.js`.

## Pasos para compilar y publicar
1. git clone este repositorio.
2. ejecuta "npm install"
3. ejecuta "npm run build"
4. Pasos para publicar: ejecuta "npm login"
5. ejecuta "npm publish --access public"

----

Para más información sobre WebdriverIO, consulta la [página principal](https://webdriver.io).