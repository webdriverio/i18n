---
id: security
title: Seguridad
---

WebdriverIO tiene en cuenta el aspecto de seguridad al proporcionar soluciones. A continuación se presentan algunas formas para mejorar la seguridad de tus pruebas.

## Mejores Prácticas

- Nunca codifiques datos sensibles que puedan dañar a tu organización si se exponen en texto claro.
- Utiliza un mecanismo (como una bóveda) para almacenar de forma segura claves y contraseñas y recuperarlas al iniciar tus pruebas de extremo a extremo.
- Verifica que no haya datos sensibles expuestos en los registros y por el proveedor de la nube, como tokens de autenticación en los registros de red.

:::info

Incluso para datos de prueba, es esencial preguntarse si, en manos equivocadas, una persona malintencionada podría recuperar información o utilizar esos recursos con intenciones maliciosas.

:::

## Enmascaramiento de Datos Sensibles

Si estás utilizando datos sensibles durante tu prueba, es esencial asegurarse de que no sean visibles para todos, como en los registros. Además, al utilizar un proveedor de la nube, a menudo se involucran claves privadas. Esta información debe estar enmascarada en los registros, informes y otros puntos de contacto. A continuación, se proporcionan algunas soluciones de enmascaramiento para ejecutar pruebas sin exponer esos valores.

### WebDriverIO

#### Enmascarar Valor de Texto de Comandos

Los comandos `addValue` y `setValue` admiten un valor booleano de máscara para enmascarar en los registros, así como en los informes. Además, otras herramientas, como herramientas de rendimiento y herramientas de terceros, también recibirán la versión enmascarada, mejorando la seguridad.

Por ejemplo, si estás utilizando un usuario real de producción y necesitas ingresar una contraseña que quieres enmascarar, entonces ahora es posible con lo siguiente:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Lo anterior ocultará el valor de texto de los registros de WDIO de la siguiente manera:

Ejemplo de registros:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Los informes, como los informes de Allure, y herramientas de terceros como Percy de BrowserStack también manejarán la versión enmascarada.
Emparejado con la versión adecuada de Appium, los registros de Appium también estarán exentos de tus datos sensibles.

:::info

Limitaciones:
  - En Appium, los plugins adicionales podrían filtrar información a pesar de que pedimos enmascarar la información.
  - Los proveedores de la nube podrían usar un proxy para el registro HTTP, lo que evita el mecanismo de máscara establecido.
  - El comando `getValue` no es compatible. Además, si se usa en el mismo elemento, puede exponer el valor que se pretende enmascarar cuando se usa `addValue` o `setValue`.

Versión mínima requerida:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Enmascarar en Registros WDIO

Usando la configuración `maskingPatterns`, podemos enmascarar información sensible de los registros de WDIO. Sin embargo, los registros de Appium no están cubiertos.

Por ejemplo, si estás utilizando un proveedor de la nube y usas el nivel de información, entonces con casi toda seguridad "filtrarás" la clave del usuario como se muestra a continuación:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contrarrestar eso, podemos pasar la expresión regular `'--key=([^ ]*)'` y ahora en los registros verás 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Puedes lograr lo anterior proporcionando la expresión regular al campo `maskingPatterns` de la configuración.
  - Para múltiples expresiones regulares, utiliza una sola cadena pero con un valor separado por comas.
  - Para más detalles sobre patrones de enmascaramiento, consulta la [sección de Patrones de Enmascaramiento en el README del Registrador WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Versión mínima requerida:
 - WDIO v9.15.0

:::

#### Deshabilitar Registradores WDIO

Otra forma de bloquear el registro de datos sensibles es reducir o silenciar el nivel de registro o deshabilitar el registrador.
Se puede lograr de la siguiente manera:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

### Soluciones de Terceros

#### Appium
Appium ofrece su solución de enmascaramiento; consulta [Filtro de registro](https://appium.io/docs/en/latest/guides/log-filters/)
 - Puede ser complicado usar su solución. Una forma, si es posible, es pasar un token en tu cadena como `@mask@` y usarlo como una expresión regular
 - En algunas versiones de Appium, los valores también se registran con cada carácter separado por comas, así que debemos tener cuidado.
 - Desafortunadamente, BrowserStack no admite esta solución, pero sigue siendo útil localmente
 
Usando el ejemplo `@mask@` mencionado anteriormente, podemos usar el siguiente archivo JSON llamado `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Luego pasa el nombre del archivo JSON al campo `logFilters` en la configuración del servicio appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

#### BrowserStack

BrowserStack también ofrece cierto nivel de enmascaramiento para ocultar algunos datos; consulta [ocultar datos sensibles](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Desafortunadamente, la solución es todo o nada, por lo que todos los valores de texto de los comandos proporcionados se enmascararán.