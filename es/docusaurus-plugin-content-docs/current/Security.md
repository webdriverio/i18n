---
id: security
title: Seguridad
description: "Protege los datos sensibles de las pruebas siguiendo las mejores prácticas de seguridad y enmascarando contraseñas y claves en registros e informes."
---

WebdriverIO tiene en cuenta el aspecto de la seguridad al proporcionar soluciones. A continuación se presentan algunas formas de asegurar mejor tus pruebas.

## Mejores prácticas

- Nunca escribas directamente en el código datos sensibles que puedan perjudicar a tu organización si quedan expuestos en texto plano.
- Utiliza un mecanismo (como un vault) para almacenar de forma segura claves y contraseñas y recuperarlas al iniciar tus pruebas end-to-end.
- Verifica que no se expongan datos sensibles en los registros ni por parte del proveedor en la nube, como tokens de autenticación en los registros de red.

:::info

Incluso para los datos de prueba, es fundamental preguntarse si, en las manos equivocadas, una persona malintencionada podría obtener información o utilizar esos recursos con fines maliciosos.

:::

## Enmascaramiento de datos sensibles

Si utilizas datos sensibles durante tus pruebas, es fundamental asegurarse de que no sean visibles para todos, por ejemplo, en los registros. Además, al usar un proveedor en la nube, a menudo intervienen claves privadas. Esta información debe enmascararse en los registros, reporters y otros puntos de contacto. A continuación se ofrecen algunas soluciones de enmascaramiento para ejecutar pruebas sin exponer esos valores.

### WebDriverIO

#### Enmascarar el valor de texto de los comandos

Los comandos `addValue` y `setValue` admiten un valor booleano `mask` para enmascarar en los registros, así como en los reporters. Además, otras herramientas, como las herramientas de rendimiento y las de terceros, también recibirán la versión enmascarada, lo que mejora la seguridad.

Por ejemplo, si estás utilizando un usuario real de producción y necesitas introducir una contraseña que deseas enmascarar, ahora es posible hacerlo de la siguiente manera:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Obtener el foco
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

Lo anterior ocultará el valor de texto en los registros de WDIO de la siguiente manera:

Ejemplo de registros:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Los reporters, como los reporters de Allure, y las herramientas de terceros como Percy de BrowserStack también manejarán la versión enmascarada.
Junto con la versión adecuada de Appium, los registros de Appium también quedarán libres de tus datos sensibles.

:::info

Limitaciones:
  - En Appium, plugins adicionales podrían filtrar la información aunque solicitemos enmascararla.
  - Los proveedores en la nube podrían utilizar un proxy para el registro HTTP, lo que evita el mecanismo de enmascaramiento implementado.
  - El comando `getValue` no es compatible. Además, si se utiliza sobre el mismo elemento, puede exponer el valor que se pretendía enmascarar al usar `addValue` o `setValue`.

Versión mínima requerida:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Enmascarar en los registros de WDIO

Usando la configuración `maskingPatterns`, podemos enmascarar información sensible en los registros de WDIO. Sin embargo, los registros de Appium no están cubiertos.

Por ejemplo, si utilizas un proveedor en la nube y el nivel info, lo más seguro es que "filtres" la clave del usuario, como se muestra a continuación:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contrarrestarlo, podemos pasar la expresión regular `'--key=([^ ]*)'` y ahora en los registros verás

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
Para los secretos pasados a través de la línea de comandos, el enmascaramiento puede fallar porque el archivo wdio.conf.ts se analiza más tarde en el ciclo de ejecución. En estos casos, se recomienda encarecidamente utilizar variables de entorno, ya que es mucho más seguro.
:::

#### Desactivar los loggers de WDIO

Otra forma de bloquear el registro de datos sensibles es reducir o silenciar el nivel de registro, o desactivar el logger.
Se puede lograr de la siguiente manera:

```ts
import logger from '@wdio/logger';

/**
  * Establece el nivel del logger de WDIO en 'silent' antes de *ejecutar una promesa, lo que ayuda a ocultar información sensible en los registros.
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
 - Puede resultar complicado usar su solución. Una forma, si es posible, es incluir un token en tu cadena como `@mask@` y usarlo como expresión regular
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

Luego, pasa el nombre del archivo JSON al campo `logFilters` en la configuración del servicio de Appium:
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