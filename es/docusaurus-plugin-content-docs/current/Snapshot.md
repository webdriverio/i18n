---
id: snapshot
title: Snapshot
---

Las pruebas de instantáneas pueden ser muy útiles para verificar una amplia gama de aspectos de tu componente o lógica al mismo tiempo. En WebdriverIO puedes tomar instantáneas de cualquier objeto arbitrario, así como de la estructura DOM de un WebElement o resultados de comandos de WebdriverIO.

De manera similar a otros frameworks de pruebas, WebdriverIO tomará una instantánea del valor dado, luego la comparará con un archivo de instantánea de referencia almacenado junto con la prueba. La prueba fallará si las dos instantáneas no coinciden: ya sea porque el cambio es inesperado, o porque la instantánea de referencia necesita actualizarse a la nueva versión del resultado.

:::info Soporte multiplataforma

Estas capacidades de instantáneas están disponibles para ejecutar pruebas end-to-end dentro del entorno Node.js, así como para ejecutar [pruebas unitarias y de componentes](/docs/component-testing) en el navegador o en dispositivos móviles.

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

La primera vez que se ejecuta esta prueba, WebdriverIO crea un archivo de instantánea que se ve así:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

El artefacto de instantánea debe ser confirmado junto con los cambios de código y revisado como parte de tu proceso de revisión de código. En las ejecuciones de prueba posteriores, WebdriverIO comparará la salida renderizada con la instantánea anterior. Si coinciden, la prueba pasará. Si no coinciden, el ejecutor de pruebas encontró un error en tu código que debe ser corregido, o la implementación ha cambiado y la instantánea necesita ser actualizada.

Para actualizar la instantánea, pasa el flag `-s` (o `--updateSnapshot`) al comando `wdio`, por ejemplo:

```sh
npx wdio run wdio.conf.js -s
```

__Nota:__ si ejecutas pruebas con múltiples navegadores en paralelo, solo se crea y compara una instantánea. Si deseas tener una instantánea separada por capacidad, por favor [crea un issue](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) y cuéntanos sobre tu caso de uso.

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

Esto te permite ver la salida esperada directamente sin tener que saltar entre diferentes archivos.

## Instantáneas visuales

Tomar una instantánea DOM de un elemento puede no ser la mejor idea, especialmente si la estructura DOM es demasiado grande y contiene propiedades de elementos dinámicos. En estos casos, se recomienda confiar en instantáneas visuales para los elementos.

Para habilitar las instantáneas visuales, agrega el `@wdio/visual-service` a tu configuración. Puedes seguir las instrucciones de configuración en la [documentación](/docs/visual-testing#installation) para Pruebas Visuales.

Luego puedes tomar una instantánea visual mediante `toMatchElementSnapshot()`, por ejemplo:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Una imagen se almacena entonces en el directorio de referencia. Consulta las [Pruebas Visuales](/docs/visual-testing) para obtener más información.