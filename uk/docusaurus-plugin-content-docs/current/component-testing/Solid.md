---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) — це фреймворк для створення користувацьких інтерфейсів з простою та продуктивною реактивністю. Ви можете тестувати компоненти SolidJS безпосередньо в реальному браузері за допомогою WebdriverIO та його [браузерного раннера](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у вашому проекті SolidJS, дотримуйтесь [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Переконайтеся, що ви вибрали `solid` як пресет для вашого раннера, наприклад:

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

Якщо ви вже використовуєте [Vite](https://vitejs.dev/) як сервер розробки, ви також можете повторно використовувати вашу конфігурацію з `vite.config.ts` у конфігурації WebdriverIO. Для отримання додаткової інформації див. `viteConfig` в [опціях раннера](/docs/runner#runner-options).

:::

Пресет SolidJS вимагає встановлення `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Після цього ви можете запустити тести за допомогою:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є наступний компонент SolidJS:

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

У вашому тесті використовуйте метод `render` з `solid-js/web`, щоб прикріпити компонент до тестової сторінки. Для взаємодії з компонентом ми рекомендуємо використовувати команди WebdriverIO, оскільки вони поводяться більш схоже на реальні взаємодії користувача, наприклад:

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

Повний приклад тестового набору компонентів WebdriverIO для SolidJS можна знайти в нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).