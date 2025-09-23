---
id: testrunner
title: Testrunner
---

WebdriverIO viene con su propio ejecutor de pruebas para ayudarte a comenzar a probar lo más rápido posible. Se supone que debe hacer todo el trabajo por ti, permite integrar servicios de terceros y te ayuda a ejecutar tus pruebas de la manera más eficiente posible.

El ejecutor de pruebas de WebdriverIO está empaquetado por separado en el paquete NPM `@wdio/cli`.

Instálalo así:

```sh npm2yarn
npm install @wdio/cli
```

Para ver la ayuda de la interfaz de línea de comandos, escribe el siguiente comando en tu terminal:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

¡Genial! Ahora necesitas definir un archivo de configuración donde se establezca toda la información sobre tus pruebas, capacidades y ajustes. Pasa a la sección de [Archivo de Configuración](/docs/configuration) para ver cómo debe ser ese archivo.

Con el asistente de configuración `wdio`, es muy fácil generar tu archivo de configuración. Simplemente ejecuta:

```sh
$ npx wdio config
```

...y se iniciará la utilidad de asistencia.

Te hará preguntas y generará un archivo de configuración para ti en menos de un minuto.

![Utilidad de configuración WDIO](/img/config-utility.gif)

Una vez que tengas tu archivo de configuración configurado, puedes comenzar tus pruebas ejecutando:

```sh
npx wdio run wdio.conf.js
```

También puedes inicializar tu ejecución de pruebas sin el comando `run`:

```sh
npx wdio wdio.conf.js
```

¡Eso es todo! Ahora, puedes acceder a la instancia de selenium a través de la variable global `browser`.

## Comandos

### `wdio config`

El comando `config` ejecuta el asistente de configuración de WebdriverIO. Este asistente te hará algunas preguntas sobre tu proyecto WebdriverIO y creará un archivo `wdio.conf.js` basado en tus respuestas.

Ejemplo:

```sh
wdio config
```

Opciones:

```
--help            muestra el menú de ayuda de WebdriverIO                     [boolean]
--npm             Si instalar los paquetes usando NPM en lugar de yarn        [boolean]
```

### `wdio run`

> Este es el comando predeterminado para ejecutar tu configuración.

El comando `run` inicializa tu archivo de configuración de WebdriverIO y ejecuta tus pruebas.

Ejemplo:

```sh
wdio run ./wdio.conf.js --watch
```

Opciones:

```
--help                muestra el menú de ayuda de WebdriverIO        [boolean]
--version             muestra la versión de WebdriverIO              [boolean]
--hostname, -h        dirección host del driver de automatización     [string]
--port, -p            puerto del driver de automatización             [number]
--user, -u            nombre de usuario si se utiliza un servicio en la nube como backend de automatización
                                                                        [string]
--key, -k             clave de acceso correspondiente al usuario      [string]
--watch               observa los specs para cambios                 [boolean]
--logLevel, -l        nivel de detalle de los registros
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                detiene el ejecutor de pruebas después de que una cantidad específica de pruebas hayan
                        fallado                                          [number]
--baseUrl             acorta las llamadas de comando de url estableciendo una url base [string]
--waitforTimeout, -w  tiempo de espera para todos los comandos waitForXXX [number]
--framework, -f       define el framework (Mocha, Jasmine o Cucumber) para
                        ejecutar los specs                                [string]
--reporters, -r       reporteros para mostrar los resultados en stdout     [array]
--suite               sobrescribe el atributo specs y ejecuta la suite
                        definida                                           [array]
--spec                ejecuta un archivo spec específico o comodines - sobrescribe los specs canalizados
                        desde stdin                                        [array]
--exclude             excluye archivo(s) spec de una ejecución - sobrescribe los specs canalizados
                        desde stdin                                        [array]
--repeat              Repite specs y/o suites específicos N veces         [number]
--mochaOpts           Opciones de Mocha
--jasmineOpts         Opciones de Jasmine
--cucumberOpts        Opciones de Cucumber
--tsConfigPath        Ruta personalizada para `tsconfig.json` o usar la [configuración tsConfigPath](/docs/configurationfile) del config wdio
```

> Nota: La autocompilación se puede controlar fácilmente con las variables de entorno `tsx`. Ver también la [documentación de TypeScript](/docs/typescript).

### `wdio install`
El comando `install` te permite añadir reporteros y servicios a tus proyectos WebdriverIO a través de la CLI.

Ejemplo:

```sh
wdio install service sauce # instala @wdio/sauce-service
wdio install reporter dot # instala @wdio/dot-reporter
wdio install framework mocha # instala @wdio/mocha-framework
```

Si quieres instalar los paquetes usando `yarn` en su lugar, puedes pasar la bandera `--yarn` al comando:

```sh
wdio install service sauce --yarn
```

También podrías pasar una ruta de configuración personalizada si tu archivo de configuración WDIO no está en la misma carpeta en la que estás trabajando:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Lista de servicios compatibles

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Lista de reporteros compatibles

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Lista de frameworks compatibles

```
mocha
jasmine
cucumber
```

### `wdio repl`

El comando repl permite iniciar una interfaz de línea de comandos interactiva para ejecutar comandos WebdriverIO. Se puede utilizar con fines de prueba o simplemente para iniciar rápidamente una sesión de WebdriverIO.

Ejecutar pruebas en chrome local:

```sh
wdio repl chrome
```

o ejecutar pruebas en Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Puedes aplicar los mismos argumentos que puedes usar en el [comando run](#wdio-run).