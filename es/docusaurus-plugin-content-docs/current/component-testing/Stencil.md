---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) es una biblioteca para construir bibliotecas de componentes reutilizables y escalables. Puedes probar componentes de Stencil directamente en un navegador real usando WebdriverIO y su [ejecutor de navegador](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Stencil, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `stencil` como preset dentro de tus opciones de ejecutor, por ejemplo:

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

En caso de que uses Stencil con un framework como React o Vue, deberías mantener el preset para estos frameworks.

:::

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.ts
```

## Escribiendo Pruebas

Dado que tienes los siguientes componentes de Stencil:

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

En tu prueba, usa el método `render` de `@wdio/browser-runner/stencil` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar comandos de WebdriverIO ya que se comportan más cerca de las interacciones reales del usuario, por ejemplo:

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

#### Opciones de Render

El método `render` proporciona las siguientes opciones:

##### `components`

Un array de componentes para probar. Las clases de componentes pueden importarse en el archivo de especificación, luego su referencia debe agregarse al array `component` para ser utilizado a lo largo de la prueba.

__Tipo:__ `CustomElementConstructor[]`<br />
__Predeterminado:__ `[]`

##### `flushQueue`

Si es `false`, no vacía la cola de renderizado en la configuración inicial de la prueba.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `true`

##### `template`

El JSX inicial que se utiliza para generar la prueba. Usa `template` cuando quieras inicializar un componente usando sus propiedades, en lugar de sus atributos HTML. Renderizará la plantilla especificada (JSX) en `document.body`.

__Tipo:__ `JSX.Template`

##### `html`

El HTML inicial utilizado para generar la prueba. Esto puede ser útil para construir una colección de componentes que trabajen juntos y asignar atributos HTML.

__Tipo:__ `string`

##### `language`

Establece el atributo `lang` simulado en `<html>`.

__Tipo:__ `string`

##### `autoApplyChanges`

Por defecto, cualquier cambio en las propiedades y atributos del componente debe usar `env.waitForChanges()` para probar las actualizaciones. Como opción, `autoApplyChanges` vacía continuamente la cola en segundo plano.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `false`

##### `attachStyles`

Por defecto, los estilos no se adjuntan al DOM y no se reflejan en el HTML serializado. Establecer esta opción en `true` incluirá los estilos del componente en la salida serializable.

__Tipo:__ `boolean`<br />
__Predeterminado:__ `false`

#### Entorno de Render

El método `render` devuelve un objeto de entorno que proporciona ciertos ayudantes de utilidad para gestionar el entorno del componente.

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

Elemento contenedor en el que se renderiza la plantilla.

__Tipo:__ `HTMLElement`

##### `$container`

El elemento contenedor como un elemento WebdriverIO.

__Tipo:__ `WebdriverIO.Element`

##### `root`

El componente raíz de la plantilla.

__Tipo:__ `HTMLElement`

##### `$root`

El componente raíz como un elemento WebdriverIO.

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

## Actualizaciones de Elementos

Si defines propiedades o estados en tu componente Stencil, debes gestionar cuándo estos cambios deben aplicarse al componente para que se vuelva a renderizar.


## Ejemplos

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes WebdriverIO para Stencil en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).