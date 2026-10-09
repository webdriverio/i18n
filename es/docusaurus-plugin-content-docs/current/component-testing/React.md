---
id: react
title: React
description: "Configura el browser runner de WebdriverIO para un proyecto de React con el preset react y escribe pruebas de componentes con Testing Library."
---

[React](https://reactjs.org/) hace que sea sencillo crear interfaces de usuario interactivas. Diseña vistas simples para cada estado de tu aplicación y React actualizará y renderizará de manera eficiente solo los componentes adecuados cuando cambien tus datos. Puedes probar componentes de React directamente en un navegador real usando WebdriverIO y su [browser runner](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO en tu proyecto de React, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `react` como preset dentro de las opciones de tu runner, por ejemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

Si ya estás usando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes reutilizar tu configuración de `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en las [opciones del runner](/docs/runner#runner-options).

:::

El preset de React requiere que `@vitejs/plugin-react` esté instalado. Además, recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribir pruebas

Supongamos que tienes el siguiente componente de React:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

En tu prueba, usa el método `render` de `@testing-library/react` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar los comandos de WebdriverIO, ya que se comportan de forma más parecida a las interacciones reales del usuario, por ejemplo:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes de WebdriverIO para React en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).