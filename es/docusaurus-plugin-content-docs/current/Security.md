---
id: security
title: Seguridad
---

WebdriverIO tiene en cuenta el aspecto de seguridad al proporcionar soluciones. A continuación se presentan algunas formas de mejorar la seguridad de tus pruebas.

# Enmascaramiento de datos sensibles

Si estás utilizando datos sensibles durante tus pruebas, es esencial asegurarte de que no sean visibles para todos, como en los registros. Además, cuando se utiliza un proveedor en la nube, a menudo se involucran claves privadas. Esta información debe estar enmascarada en los registros, reporteros y otros puntos de contacto. A continuación se presentan algunas soluciones de enmascaramiento para ejecutar pruebas sin exponer esos valores.

## WebDriverIO

### Enmascarar el valor de texto de los comandos

Los comandos `addValue` y `setValue` admiten un valor booleano de máscara para enmascarar en los registros de WDIO y Appium, así como en los reporteros. Además, otras herramientas, como herramientas de rendimiento y herramientas de terceros, también recibirán la versión enmascarada, mejorando la seguridad.

Por ejemplo, si estás utilizando un usuario real de producción y necesitas ingresar una contraseña que deseas enmascarar, ahora es posible con lo siguiente:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Lo anterior ocultará el valor del texto de los registros de WDIO y también de los registros de Appium.

Ejemplo de registros:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Limitaciones:
  - En Appium, los plugins adicionales podrían filtrar información aunque pidamos enmascarar la información.
  - Los proveedores en la nube podrían usar un proxy para el registro HTTP, lo que elude el mecanismo de enmascaramiento implementado.

:::info

Versión mínima requerida:
 - WDIO v9.15.0
 - Appium v2.19.0

### Enmascarar en los registros de WDIO

Utilizando la configuración `maskingPatterns`, podemos enmascarar información sensible de los registros de WDIO. Sin embargo, los registros de Appium no están cubiertos.

Por ejemplo, si estás utilizando un proveedor en la nube y usas el nivel de información, entonces casi con seguridad "filtrarás" la clave del usuario como se muestra a continuación:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contrarrestar eso, podemos pasar la expresión regular `'--key=([^ ]*)'` y ahora en los registros verás:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Puedes lograr lo anterior proporcionando la expresión regular al campo `maskingPatterns` de la configuración.
  - Para múltiples expresiones regulares, usa una sola cadena pero con valores separados por comas.
  - Para más detalles sobre patrones de enmascaramiento, consulta la [sección de Patrones de Enmascaramiento en el README del Logger de WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

### Deshabilitar los registradores de WDIO

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

## Soluciones de terceros

### Appium
Appium ofrece su propia solución de enmascaramiento; consulta [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Puede ser complicado usar su solución. Una manera, si es posible, es pasar un token en tu cadena como `@mask@` y usarlo como una expresión regular
 - En algunas versiones de Appium, los valores también se registran con cada carácter separado por comas, por lo que debemos tener cuidado.
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

### BrowserStack

BrowserStack también ofrece cierto nivel de enmascaramiento para ocultar algunos datos; consulta [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Desafortunadamente, la solución es todo o nada, por lo que todos los valores de texto de los comandos proporcionados serán enmascarados.