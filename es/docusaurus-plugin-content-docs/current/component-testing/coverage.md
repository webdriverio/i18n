---
id: coverage
title: Cobertura
---

El ejecutor de navegador de WebdriverIO admite informes de cobertura de código utilizando [`istanbul`](https://istanbul.js.org/). El ejecutor de pruebas instrumentará automáticamente tu código y capturará la cobertura de código por ti.

## Configuración

Para habilitar los informes de cobertura de código, actívalo a través de la configuración del ejecutor de navegador de WebdriverIO, por ejemplo:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Consulta todas las [opciones de cobertura](/docs/runner#coverage-options) para aprender cómo configurarlo correctamente.

## Ignorando Código

Puede haber algunas secciones de tu código base que desees excluir deliberadamente del seguimiento de cobertura. Para hacerlo, puedes usar las siguientes indicaciones de análisis:

- `/* istanbul ignore if */`: ignora la siguiente declaración if.
- `/* istanbul ignore else */`: ignora la parte else de una declaración if.
- `/* istanbul ignore next */`: ignora lo siguiente en el código fuente (funciones, declaraciones if, clases, lo que sea).
- `/* istanbul ignore file */`: ignora un archivo fuente completo (esto debe colocarse en la parte superior del archivo).

:::info

Se recomienda excluir tus archivos de prueba de los informes de cobertura, ya que podría causar errores, por ejemplo, al llamar a los comandos `execute` o `executeAsync`. Si deseas mantenerlos en tu informe, asegúrate de excluirlos de la instrumentación mediante:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::