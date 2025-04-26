---
id: react
title: React
---

[React](https://reactjs.org/) hace que sea sencillo crear interfaces de usuario interactivas. Diseña vistas simples para cada estado en tu aplicación, y React actualizará y renderizará eficientemente solo los componentes correctos cuando tus datos cambien. Puedes probar componentes de React directamente en un navegador real usando WebdriverIO y su [ejecutor de navegador](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto React, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `react` como preset dentro de tus opciones de ejecutor, por ejemplo:

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

Si ya estás utilizando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes reutilizar tu configuración en `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en [opciones del ejecutor](/docs/runner#runner-options).

:::

El preset de React requiere que `@vitejs/plugin-react` esté instalado. También recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribiendo Pruebas

Dado que tienes el siguiente componente React:

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

En tu prueba, utiliza el método `render` de `@testing-library/react` para adjuntar el componente a la página de prueba. Para interactuar con el componente, recomendamos usar comandos de WebdriverIO ya que se comportan más parecido a las interacciones reales del usuario, por ejemplo:

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

Puedes encontrar un ejemplo completo de una suite de pruebas de componentes WebdriverIO para React en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).