---
id: preact
title: Preact
description: "Настройка браузерного раннера WebdriverIO для проекта на Preact с пресетом preact и написание компонентных тестов с помощью Testing Library."
---

[Preact](https://preactjs.com/) — это быстрая альтернатива React размером 3 КБ с тем же современным API. Вы можете тестировать компоненты Preact непосредственно в реальном браузере, используя WebdriverIO и его [браузерный раннер](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте на Preact, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по компонентному тестированию. Обязательно выберите `preact` в качестве пресета в параметрах раннера, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете просто повторно использовать свою конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [параметрах раннера](/docs/runner#runner-options).

:::

Пресет Preact требует установки `@preact/preset-vite`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для рендеринга компонента на тестовой странице. Поэтому вам потребуется установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Допустим, у вас есть следующий компонент Preact:

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

В своем тесте используйте метод `render` из `@testing-library/preact`, чтобы прикрепить компонент к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ведут себя ближе к реальным действиям пользователя, например:

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

Полный пример набора компонентных тестов WebdriverIO для Preact вы можете найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).