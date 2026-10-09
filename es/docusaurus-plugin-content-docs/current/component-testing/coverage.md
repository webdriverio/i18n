---
id: coverage
title: Cobertura
description: "Recopila la cobertura de código para pruebas de componentes con el browser runner, que instrumenta tu código con istanbul a través de Vite."
---

El browser runner de WebdriverIO admite informes de cobertura de código mediante [`istanbul`](https://istanbul.js.org/). El testrunner instrumentará automáticamente tu código usando Vite y capturará la cobertura de código por ti.

## Cómo funciona

El `@wdio/browser-runner` utiliza Vite para servir tu aplicación. Cuando habilitas la cobertura, se añade un plugin al servidor de Vite que intenta instrumentar tu código fuente sobre la marcha a medida que el navegador lo solicita.

:::warning Importante
**¡No navegues fuera del test runner!**

La cobertura de código depende de que los archivos sean servidos e instrumentados por el servidor local de Vite iniciado por WebdriverIO.
Si usas `browser.url('http://...')` o `browser.url('file://...')` para navegar a una página diferente, estarás abandonando el entorno instrumentado. Tu código se ejecutará, pero **no se recopilará ninguna cobertura**.

**Enfoque correcto (pruebas de componentes):**
Renderiza tu componente o importa tu módulo directamente en el archivo de prueba.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Esto está cubierto
})
```

**Enfoque incorrecto (estilo E2E):**
```js
it('will not have coverage', async () => {
    // ❌ navegar fuera rompe la instrumentación
    await browser.url('http://localhost:3000')
})
```
:::

## Configuración

Para habilitar los informes de cobertura de código, actívalos a través de la configuración del browser runner de WebdriverIO, p. ej.:

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

Consulta todas las [opciones de cobertura](/docs/runner#coverage-options) para aprender a configurarla correctamente.

:::tip Consejos de configuración
Si estás probando archivos no estándar (como scripts en línea en `.html`) o si tus archivos no están siendo detectados, es posible que necesites verificar explícitamente tus opciones `include` y `extension`:

```js
coverage: {
    enabled: true,
    // Apunta explícitamente a tus archivos fuente si la resolución predeterminada falla
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Añade .html si tienes scripts en línea
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorar código

Puede haber algunas secciones de tu código base que desees excluir intencionadamente del seguimiento de cobertura; para ello, puedes usar las siguientes indicaciones de análisis:

- `/* istanbul ignore if */`: ignora la siguiente sentencia if.
- `/* istanbul ignore else */`: ignora la parte else de una sentencia if.
- `/* istanbul ignore next */`: ignora el siguiente elemento del código fuente (funciones, sentencias if, clases, lo que sea).
- `/* istanbul ignore file */`: ignora un archivo fuente completo (debe colocarse al principio del archivo).

:::info

Se recomienda excluir tus archivos de prueba de los informes de cobertura, ya que podrían causar errores, p. ej., al llamar al comando `execute`. Si prefieres mantenerlos en tu informe, asegúrate de excluirlos de la instrumentación mediante:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::