---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) - это фреймворк для создания пользовательских интерфейсов с простой и производительной реактивностью. Вы можете тестировать компоненты SolidJS непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного запускателя](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте SolidJS, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `solid` в качестве пресета для вашего запускателя, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете повторно использовать вашу конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [опциях запускателя](/docs/runner#runner-options).

:::

Пресет SolidJS требует установки `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Допустим, у вас есть следующий компонент SolidJS:

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

В вашем тесте используйте метод `render` из `solid-js/web`, чтобы прикрепить компонент к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, поскольку они ведут себя ближе к реальному взаимодействию пользователя, например:

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

Полный пример набора тестов компонентов WebdriverIO для SolidJS можно найти в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).