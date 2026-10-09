---
id: react
title: React
description: "Настройте браузерный раннер WebdriverIO для проекта на React с пресетом react и пишите компонентные тесты с помощью Testing Library."
---

[React](https://reactjs.org/) делает создание интерактивных пользовательских интерфейсов простым и безболезненным. Создавайте простые представления для каждого состояния вашего приложения, и React будет эффективно обновлять и отрисовывать именно те компоненты, которые нужно, при изменении данных. Вы можете тестировать компоненты React непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного раннера](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте на React, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по компонентному тестированию. Убедитесь, что в параметрах раннера выбран пресет `react`, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете просто повторно использовать свою конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [параметрах раннера](/docs/runner#runner-options).

:::

Для работы пресета React необходимо установить `@vitejs/plugin-react`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для отрисовки компонента на тестовой странице. Поэтому вам потребуется установить следующие дополнительные зависимости:

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

В своем тесте используйте метод `render` из `@testing-library/react`, чтобы прикрепить компонент к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ведут себя ближе к реальным действиям пользователя, например:

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

Полный пример набора компонентных тестов WebdriverIO для React можно найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).