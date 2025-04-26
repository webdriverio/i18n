---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) es un enfoque radicalmente nuevo para construir interfaces de usuario. Mientras que los frameworks tradicionales como React y Vue realizan la mayor parte de su trabajo en el navegador, Svelte traslada ese trabajo a un paso de compilación que ocurre cuando construyes tu aplicación. Puedes probar componentes Svelte directamente en un navegador real usando WebdriverIO y su [ejecutor de navegador](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Svelte, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `svelte` como preset dentro de tus opciones de ejecutor, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Si ya estás utilizando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes reutilizar tu configuración en `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en [opciones del ejecutor](/docs/runner#runner-options).

:::

El preset de Svelte requiere que `@sveltejs/vite-plugin-svelte` esté instalado. También recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribiendo Pruebas

Dado que tienes el siguiente componente Svelte:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

En tu prueba, utiliza el método `render` de `@testing-library/svelte` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar comandos de WebdriverIO ya que se comportan más cerca de las interacciones reales del usuario, por ejemplo:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes WebdriverIO para Svelte en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).