---
id: react
title: React
---

[React](https://reactjs.org/) torna indolor a criação de interfaces de usuário interativas. Projete visualizações simples para cada estado em sua aplicação, e o React atualizará e renderizará eficientemente apenas os componentes certos quando seus dados mudarem. Você pode testar componentes React diretamente em um navegador real usando WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO em seu projeto React, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de teste de componentes. Certifique-se de selecionar `react` como preset dentro das suas opções de runner, por exemplo:

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

Se você já está usando [Vite](https://vitejs.dev/) como servidor de desenvolvimento, você também pode reutilizar sua configuração em `vite.config.ts` dentro da sua configuração WebdriverIO. Para mais informações, veja `viteConfig` nas [opções de runner](/docs/runner#runner-options).

:::

O preset React requer que `@vitejs/plugin-react` esteja instalado. Também recomendamos usar [Testing Library](https://testing-library.com/) para renderizar o componente na página de teste. Para isso, você precisará instalar as seguintes dependências adicionais:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Dado que você tem o seguinte componente React:

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

No seu teste, use o método `render` de `@testing-library/react` para anexar o componente à página de teste. Para interagir com o componente, recomendamos usar comandos WebdriverIO, pois eles se comportam mais próximos às interações reais do usuário, por exemplo:

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

Você pode encontrar um exemplo completo de uma suíte de testes de componentes WebdriverIO para React em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).