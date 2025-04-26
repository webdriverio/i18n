---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) es un framework para construir interfaces de usuario con reactividad simple y de alto rendimiento. Puedes probar componentes de SolidJS directamente en un navegador real usando WebdriverIO y su [ejecutor de navegador](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto SolidJS, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `solid` como preset dentro de tus opciones de ejecutor, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Si ya estás usando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes reutilizar tu configuración en `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en [opciones del ejecutor](/docs/runner#runner-options).

:::

El preset de SolidJS requiere que `vite-plugin-solid` esté instalado:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribiendo Pruebas

Dado que tienes el siguiente componente SolidJS:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

En tu prueba, usa el método `render` de `solid-js/web` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar comandos de WebdriverIO ya que se comportan más cercanos a las interacciones reales del usuario, por ejemplo:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes WebdriverIO para SolidJS en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).