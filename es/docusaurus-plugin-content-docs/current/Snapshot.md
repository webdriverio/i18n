---
id: snapshot
title: Instantánea
description: "Verifica objetos, estructuras DOM y resultados de comandos con pruebas de instantáneas e instantáneas en línea, y compara instantáneas visuales."
---

Las pruebas de instantáneas pueden ser muy útiles para verificar una amplia gama de aspectos de tu componente o lógica al mismo tiempo. En WebdriverIO puedes tomar instantáneas de cualquier objeto arbitrario, así como de la estructura DOM de un WebElement o de los resultados de comandos de WebdriverIO.

Al igual que otros frameworks de pruebas, WebdriverIO tomará una instantánea del valor dado y luego la comparará con un archivo de instantánea de referencia almacenado junto a la prueba. La prueba fallará si las dos instantáneas no coinciden: o bien el cambio es inesperado, o bien la instantánea de referencia necesita actualizarse a la nueva versión del resultado.

:::info Soporte multiplataforma

Estas capacidades de instantáneas están disponibles tanto para ejecutar pruebas end-to-end dentro del entorno de Node.js como para ejecutar pruebas [unitarias y de componentes](/docs/component-testing) en el navegador o en dispositivos móviles.

:::

## Usar instantáneas
Para tomar una instantánea de un valor, puedes usar `toMatchSnapshot()` de la API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

La primera vez que se ejecuta esta prueba, WebdriverIO crea un archivo de instantánea con este aspecto:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

El artefacto de la instantánea debe incluirse en el commit junto con los cambios de código y revisarse como parte de tu proceso de revisión de código. En las ejecuciones posteriores de las pruebas, WebdriverIO comparará el resultado renderizado con la instantánea anterior. Si coinciden, la prueba pasará. Si no coinciden, o bien el ejecutor de pruebas encontró un error en tu código que debe corregirse, o bien la implementación ha cambiado y la instantánea necesita actualizarse.

Para actualizar la instantánea, pasa la opción `-s` (o `--updateSnapshot`) al comando `wdio`, por ejemplo:

```sh
npx wdio run wdio.conf.js -s
```

__Nota:__ si ejecutas pruebas con varios navegadores en paralelo, solo se crea una instantánea y se compara con ella. Si deseas tener una instantánea separada por capability, por favor [abre un issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) y cuéntanos tu caso de uso.

## Instantáneas en línea

De manera similar, puedes usar `toMatchInlineSnapshot()` para almacenar la instantánea en línea dentro del archivo de prueba.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

En lugar de crear un archivo de instantánea, Vitest modificará el archivo de prueba directamente para actualizar la instantánea como una cadena:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Esto te permite ver el resultado esperado directamente sin tener que saltar entre diferentes archivos.

## Instantáneas visuales

Tomar una instantánea DOM de un elemento podría no ser la mejor idea, especialmente si la estructura DOM es demasiado grande y contiene propiedades de elementos dinámicas. En estos casos, se recomienda recurrir a instantáneas visuales de los elementos.

Para habilitar las instantáneas visuales, añade `@wdio/visual-service` a tu configuración. Puedes seguir las instrucciones de configuración en la [documentación](/docs/visual-testing#installation) de Pruebas Visuales.

Luego puedes tomar una instantánea visual mediante `toMatchElementSnapshot()`, por ejemplo:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

A continuación, se almacena una imagen en el directorio de referencia (baseline). Consulta [Pruebas Visuales](/docs/visual-testing) para obtener más información.