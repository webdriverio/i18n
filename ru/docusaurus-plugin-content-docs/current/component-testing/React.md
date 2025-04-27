---
id: react
title: React
---

[React](https://reactjs.org/) позволяет без труда создавать интерактивные пользовательские интерфейсы. Разрабатывайте простые представления для каждого состояния вашего приложения, и React будет эффективно обновлять и отображать только нужные компоненты при изменении данных. Вы можете тестировать компоненты React непосредственно в реальном браузере, используя WebdriverIO и его [браузерный раннер](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте React, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `react` в качестве пресета в параметрах раннера, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете просто использовать вашу конфигурацию из `vite.config.ts` в вашей конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [опциях раннера](/docs/runner#runner-options).

:::

Пресет React требует установки `@vitejs/plugin-react`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для отображения компонента на тестовой странице. Для этого необходимо установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Предположим, у вас есть следующий компонент React:

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

В вашем тесте используйте метод `render` из `@testing-library/react` для прикрепления компонента к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ведут себя ближе к реальным пользовательским взаимодействиям, например:

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

Полный пример набора тестов компонентов WebdriverIO для React можно найти в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).