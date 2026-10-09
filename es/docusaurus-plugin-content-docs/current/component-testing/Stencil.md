---
id: stencil
title: Stencil
description: "Configura el browser runner de WebdriverIO para componentes de Stencil, renderízalos con el helper render y espera las actualizaciones de los elementos."
---

[Stencil](https://stenciljs.com/) es una biblioteca para crear bibliotecas de componentes reutilizables y escalables. Puedes probar componentes de Stencil directamente en un navegador real usando WebdriverIO y su [browser runner](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto de Stencil, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `stencil` como preset dentro de las opciones de tu runner, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

En caso de que uses Stencil con un framework como React o Vue, deberías mantener el preset de esos frameworks.

:::

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.ts
```

## Escribir pruebas

Supongamos que tienes los siguientes componentes de Stencil:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

En tu prueba, usa el método `render` de `@wdio/browser-runner/stencil` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar comandos de WebdriverIO, ya que se comportan de forma más parecida a las interacciones reales de un usuario, por ejemplo:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Opciones de render

El método `render` ofrece las siguientes opciones:

##### `components`

Un array de componentes a probar. Las clases de los componentes pueden importarse en el archivo de especificación y luego su referencia debe añadirse al array `component` para usarse a lo largo de la prueba.

__Tipo:__ `CustomElementConstructor[]`<br />
__Valor predeterminado:__ `[]`

##### `flushQueue`

Si es `false`, no vacía la cola de renderizado en la configuración inicial de la prueba.

__Tipo:__ `boolean`<br />
__Valor predeterminado:__ `true`

##### `template`

El JSX inicial que se usa para generar la prueba. Usa `template` cuando quieras inicializar un componente usando sus propiedades, en lugar de sus atributos HTML. Renderizará la plantilla especificada (JSX) en `document.body`.

__Tipo:__ `JSX.Template`

##### `html`

El HTML inicial usado para generar la prueba. Esto puede ser útil para construir una colección de componentes que funcionan juntos y asignar atributos HTML.

__Tipo:__ `string`

##### `language`

Establece el atributo `lang` simulado en `<html>`.

__Tipo:__ `string`

##### `autoApplyChanges`

Por defecto, cualquier cambio en las propiedades y atributos del componente requiere `env.waitForChanges()` para probar las actualizaciones. Como alternativa, `autoApplyChanges` vacía continuamente la cola en segundo plano.

__Tipo:__ `boolean`<br />
__Valor predeterminado:__ `false`

##### `attachStyles`

Por defecto, los estilos no se adjuntan al DOM y no se reflejan en el HTML serializado. Establecer esta opción en `true` incluirá los estilos del componente en la salida serializable.

__Tipo:__ `boolean`<br />
__Valor predeterminado:__ `false`

#### Entorno de render

El método `render` devuelve un objeto de entorno que proporciona ciertos helpers de utilidad para gestionar el entorno del componente.

##### `flushAll`

Después de realizar cambios en un componente, como una actualización de una propiedad o atributo, la página de prueba no aplica automáticamente los cambios. Para esperar y aplicar la actualización, llama a `await flushAll()`

__Tipo:__ `() => void`

##### `unmount`

Elimina el elemento contenedor del DOM.

__Tipo:__ `() => void`

##### `styles`

Todos los estilos definidos por los componentes.

__Tipo:__ `Record<string, string>`

##### `container`

Elemento contenedor en el que se está renderizando la plantilla.

__Tipo:__ `HTMLElement`

##### `$container`

El elemento contenedor como un elemento de WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

##### `root`

El componente raíz de la plantilla.

__Tipo:__ `HTMLElement`

##### `$root`

El componente raíz como un elemento de WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

### `waitForChanges`

Método auxiliar para esperar a que el componente esté listo.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Actualizaciones de elementos

Si defines propiedades o estados en tu componente de Stencil, debes gestionar cuándo se deben aplicar estos cambios al componente para que se vuelva a renderizar.


## Ejemplos

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes de WebdriverIO para Stencil en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).