---
id: security
title: Seguridad
description: "Protege los datos de prueba sensibles siguiendo las mejores prácticas de seguridad y enmascarando contraseñas y claves en logs e informes."
---

WebdriverIO tiene en cuenta el aspecto de la seguridad al proporcionar soluciones. A continuación se presentan algunas formas de proteger mejor tus pruebas.

## Mejores prácticas

- Nunca incluyas directamente en el código datos sensibles que puedan perjudicar a tu organización si se exponen en texto plano.
- Utiliza un mecanismo (como un vault) para almacenar de forma segura claves y contraseñas, y recupéralas al iniciar tus pruebas end-to-end.
- Verifica que no se expongan datos sensibles en los logs ni por parte del proveedor en la nube, como los tokens de autenticación en los Network Logs.

:::info

Incluso para los datos de prueba, es esencial preguntarse si, en las manos equivocadas, una persona malintencionada podría obtener información o utilizar esos recursos con fines maliciosos.

:::

## Enmascaramiento de datos sensibles

Si utilizas datos sensibles durante tus pruebas, es esencial asegurarse de que no sean visibles para todos, como por ejemplo en los logs. Además, al utilizar un proveedor en la nube, a menudo intervienen claves privadas. Esta información debe enmascararse en los logs, reporters y otros puntos de contacto. A continuación se presentan algunas soluciones de enmascaramiento para ejecutar pruebas sin exponer esos valores.

### WebDriverIO

#### Enmascarar el valor de texto de los comandos

Los comandos `addValue` y `setValue` admiten un valor booleano mask para enmascarar en los logs, así como en los reporters. Además, otras herramientas, como las herramientas de rendimiento y las herramientas de terceros, también recibirán la versión enmascarada, lo que mejora la seguridad.

Por ejemplo, si estás utilizando un usuario real de producción y necesitas introducir una contraseña que deseas enmascarar, ahora es posible hacerlo de la siguiente manera:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Lo anterior ocultará el valor de texto en los logs de WDIO de la siguiente manera:

Ejemplo de logs:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Los reporters, como Allure, y las herramientas de terceros como Percy de BrowserStack también manejarán la versión enmascarada.
Combinado con la versión adecuada de Appium, los logs de Appium también quedarán libres de tus datos sensibles.

:::info

Limitaciones:
  - En Appium, plugins adicionales podrían filtrar la información aunque solicitemos enmascararla.
  - Los proveedores en la nube podrían usar un proxy para el registro HTTP, lo que elude el mecanismo de enmascaramiento implementado.
  - El comando `getValue` no es compatible. Además, si se utiliza en el mismo elemento, puede exponer el valor que se pretendía enmascarar al usar `addValue` o `setValue`.

Versión mínima requerida:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Enmascarar en los logs de WDIO

Mediante la configuración `maskingPatterns`, podemos enmascarar información sensible en los logs de WDIO. Sin embargo, los logs de Appium no están cubiertos.

Por ejemplo, si utilizas un proveedor en la nube y usas el nivel info, es casi seguro que "filtrarás" la clave del usuario, como se muestra a continuación:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contrarrestarlo, podemos pasar la expresión regular `'--key=([^ ]*)'` y ahora en los logs verás

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Puedes lograr lo anterior proporcionando la expresión regular en el campo `maskingPatterns` de la configuración.
  - Para varias expresiones regulares, utiliza una sola cadena pero con valores separados por comas.
  - Para más detalles sobre los patrones de enmascaramiento, consulta la [sección Masking Patterns en el README de WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * configuraciones de prueba
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

:::warning
Para los secretos pasados a través de la línea de comandos, el enmascaramiento puede fallar porque el archivo wdio.conf.ts se analiza más tarde en el ciclo de ejecución. Para estos casos, se recomienda encarecidamente utilizar variables de entorno, ya que es mucho más seguro.
:::

#### Desactivar los loggers de WDIO

Otra forma de bloquear el registro de datos sensibles es reducir o silenciar el nivel de log, o desactivar el logger.
Se puede lograr de la siguiente manera:

```ts
import logger from '@wdio/logger';

/**
  * Establece el nivel del logger de WDIO en 'silent' antes de *ejecutar una promesa, lo que ayuda a ocultar información sensible en los logs.
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

### Soluciones de terceros

#### Appium
Appium ofrece su propia solución de enmascaramiento; consulta [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
 - Puede resultar complicado usar su solución. Una forma, si es posible, es pasar un token en tu cadena como `@mask@` y usarlo como expresión regular
 - En algunas versiones de Appium, los valores también se registran con cada carácter separado por comas, por lo que debemos tener cuidado.
 - Lamentablemente, BrowserStack no admite esta solución, pero sigue siendo útil en local

Usando el ejemplo de `@mask@` mencionado anteriormente, podemos utilizar el siguiente archivo JSON llamado `appiumMaskLogFilters.json`
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

Luego pasa el nombre del archivo JSON al campo `logFilters` en la configuración del servicio de appium:
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

BrowserStack también ofrece cierto nivel de enmascaramiento para ocultar algunos datos; consulta [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Lamentablemente, la solución es de todo o nada, por lo que se enmascararán todos los valores de texto de los comandos indicados.