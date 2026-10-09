---
id: preact
title: Preact
description: "Configura el browser runner de WebdriverIO para un proyecto Preact con el preset preact y escribe pruebas de componentes con Testing Library."
---

[Preact](https://preactjs.com/) es una alternativa rápida de 3kB a React con la misma API moderna. Puedes probar componentes de Preact directamente en un navegador real usando WebdriverIO y su [browser runner](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Preact, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `preact` como preset dentro de las opciones de tu runner, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

Si ya estás usando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes simplemente reutilizar tu configuración de `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en las [opciones del runner](/docs/runner#runner-options).

:::

El preset de Preact requiere que `@preact/preset-vite` esté instalado. Además, recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribir pruebas

Dado que tienes el siguiente componente de Preact:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

En tu prueba, usa el método `render` de `@testing-library/preact` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar los comandos de WebdriverIO, ya que se comportan de forma más parecida a las interacciones reales de un usuario, por ejemplo:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

Puedes encontrar un ejemplo completo de una suite de pruebas de componentes de WebdriverIO para Preact en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).