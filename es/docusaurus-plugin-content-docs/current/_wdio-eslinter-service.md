---
id: wdio-eslinter-service
title: Detección automática de importaciones faltantes con el servicio eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---


> wdio-eslinter-service es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

¿Alguna vez has ejecutado tus pruebas e2e, solo para descubrir 10, 15 o 30 minutos después que había una importación faltante/mal escrita, que no apareció hasta la mitad de la ejecución de la prueba? Cuando esto sucede, el ejecutor de pruebas reporta estas pruebas como defectuosas.

eslint es una gran herramienta para detectar diferentes errores antes de la ejecución, y este servicio ejecuta la herramienta eslint, antes de ejecutar las pruebas de WebdriverIO, como un paso automatizado en lugar de uno manual.

Muchas veces es mejor fallar más rápido para que podamos solucionar problemas antes en lugar de después.

La configuración recomendada es usar el ejecutor unresolved para verificar solo las importaciones faltantes, pero si lo deseas, también puedes configurar el servicio para ejecutar el eslinter en tu proyecto usando el ejecutor de npm o yarn, o pasando una bandera que le indica al sistema que use también tu configuración .eslintrc.

## Installation

Instala el wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### Quick Start - Check for missing or unresolved imports only

Por defecto, esta configuración mínima, el ejecutor "unresolved", verifica las importaciones require no resueltas y genera un error si se encuentran importaciones no resueltas. El servicio entonces detiene la ejecución. Puedes personalizar .eslintrc.js para realizar más verificaciones utilizando los ejecutores "npm" o "yarn", si lo deseas. Consulta [eslint](https://www.npmjs.com/package/eslint) para más detalles.

Si no tienes una configuración `.eslintrc.js` en tu proyecto, entonces wdio-eslinter-service puede configurarse para usar una predeterminada que solo verifica las importaciones faltantes antes de ejecutar las pruebas. Esto es útil para que descubras sobre importaciones incorrectas más pronto que tarde. Para configurar esto, agrega la siguiente configuración de eslinter a tu array de servicios (asumiendo que ya estás usando el servicio chromedriver; de lo contrario, omite esa parte):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

En este punto, comienza a ejecutar las pruebas, y si hay una importación faltante o incorrecta, WebdriverIO la registrará y terminará inmediatamente la ejecución de la prueba:

```
$ npx wdio
```


#### Optional - if using module-alias

Si estás usando el módulo [module-alias](https://www.npmjs.com/package/module-alias), que te permite configurar alias para reemplazar rutas relativas, necesitarás pasarlo a la configuración de eslinter usando el plugin eslint-import-resolver-custom-alias. A continuación un ejemplo:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

Instala el plugin en tu proyecto:

```
$ npm i eslint-import-resolver-custom-alias
```

Ejecuta las pruebas y verifica que el sistema encontrará importaciones incorrectas que usan alias de módulos:

```
$ npx wdio
```

#### Experimental - Use along with an existing eslintrc configuration in your project

Para que el servicio eslinter también use una configuración eslintrc existente en tu proyecto, establece `includeProjectEslintrc` como true en el array de servicios de configuración wdio.conf.js.

He experimentado problemas con plugins en conflicto. Si la configuración de eslint de tu proyecto también está buscando importaciones no resueltas, entonces esto puede no funcionar y puede requerir ajustes en tu .eslintrc.js. Esto no se recomienda en este momento.


### Advanced Alternatives - Using the npm and yarn runners

Los ejecutores npm y yarn te ayudan a tener un control adicional sobre la ejecución de una configuración de eslinter existente en tu proyecto. Con esta configuración, puedes definir comandos adicionales para ejecutar en la sección run-scripts de tu package.json:

Dentro de tu `package.json`, agrega esta entrada a tus scripts de ejecución:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**NOTA: Agregar eslint al package.json es requerido para que el servicio funcione cuando se usan los ejecutores npm o yarn.**

Si aún no tienes eslint instalado y configurado, necesitarás instalarlo y configurarlo en tu proyecto, así como cualquier plugin que estés usando, como eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

Si estás usando el plugin eslint-import-resolver-custom-alias para mapear alias de módulos a sus rutas reales, entonces también necesitarás instalarlo:

```
$ npm i eslint-import-resolver-custom-alias
```

También necesitarás crear un archivo `.eslintrc.js`, si aún no tienes uno de los archivos de configuración eslintrc en tu proyecto. Aquí hay una configuración básica para solo buscar importaciones no resueltas, y puedes expandir esta configuración para validar otras verificaciones de calidad de código antes de ejecutar pruebas:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

Por último, agrega el servicio `eslinter` al array de servicios en `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

Ejecuta `npm run eslint` para verificar y buscar errores.

Si usas `yarn` puedes configurar la opción de servicio `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

Si ya tienes un script de linter que te gustaría reutilizar (en lugar de `eslint`), puedes configurar la opción de servicio `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## Using in WebdriverIO

Inicia el ejecutor de pruebas de WebdriverIO normalmente. eslint verificará el código. Si se encuentran errores, la ejecución cesará inmediatamente.

```bash
$ npx wdio
```


**Example:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```