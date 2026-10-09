---
id: react
title: React
description: "Configure o browser runner do WebdriverIO para um projeto React com o preset react e escreva testes de componentes com Testing Library."
---

[React](https://reactjs.org/) torna fácil a criação de UIs interativas. Projete visualizações simples para cada estado da sua aplicação, e o React atualizará e renderizará de forma eficiente apenas os componentes certos quando seus dados mudarem. Você pode testar componentes React diretamente em um navegador real usando o WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO no seu projeto React, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de testes de componentes. Certifique-se de selecionar `react` como preset nas opções do seu runner, por exemplo:

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

Se você já estiver usando o [Vite](https://vitejs.dev/) como servidor de desenvolvimento, também pode simplesmente reutilizar sua configuração do `vite.config.ts` na sua configuração do WebdriverIO. Para mais informações, consulte `viteConfig` em [opções do runner](/docs/runner#runner-options).

:::

O preset do React requer que `@vitejs/plugin-react` esteja instalado. Também recomendamos usar a [Testing Library](https://testing-library.com/) para renderizar o componente na página de teste. Portanto, você precisará instalar as seguintes dependências adicionais:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Dado que você tenha o seguinte componente React:

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

No seu teste, use o método `render` de `@testing-library/react` para anexar o componente à página de teste. Para interagir com o componente, recomendamos usar os comandos do WebdriverIO, pois eles se comportam de forma mais próxima às interações reais do usuário, por exemplo:

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

Você pode encontrar um exemplo completo de uma suíte de testes de componentes do WebdriverIO para React em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).