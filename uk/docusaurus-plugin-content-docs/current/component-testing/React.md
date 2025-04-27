---
id: react
title: React
---

[React](https://reactjs.org/) полегшує створення інтерактивних інтерфейсів користувача. Розробляйте прості представлення для кожного стану у своєму додатку, і React ефективно оновлюватиме та рендеритиме лише потрібні компоненти при зміні даних. Ви можете тестувати компоненти React безпосередньо у справжньому браузері за допомогою WebdriverIO та його [браузерного раннера](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у своєму проекті React, дотримуйтесь [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Переконайтеся, що ви вибрали `react` як пресет у параметрах раннера, наприклад:

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

Якщо ви вже використовуєте [Vite](https://vitejs.dev/) як сервер розробки, ви також можете повторно використовувати свою конфігурацію з `vite.config.ts` у конфігурації WebdriverIO. Для отримання додаткової інформації див. `viteConfig` у [параметрах раннера](/docs/runner#runner-options).

:::

Пресет React вимагає встановлення `@vitejs/plugin-react`. Також ми рекомендуємо використовувати [Testing Library](https://testing-library.com/) для рендерингу компонента на тестовій сторінці. Для цього вам потрібно встановити такі додаткові залежності:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Потім ви можете запустити тести, виконавши:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є такий компонент React:

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

У своєму тесті використовуйте метод `render` з `@testing-library/react`, щоб прикріпити компонент до тестової сторінки. Для взаємодії з компонентом ми рекомендуємо використовувати команди WebdriverIO, оскільки вони поводяться більш схоже на реальні взаємодії користувача, наприклад:

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

Повний приклад набору тестів компонентів WebdriverIO для React можна знайти в нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).