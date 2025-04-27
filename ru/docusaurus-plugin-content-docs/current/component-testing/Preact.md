---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) - это быстрая 3кБ альтернатива React с таким же современным API. Вы можете тестировать компоненты Preact непосредственно в реальном браузере, используя WebdriverIO и его [браузерный запускальщик](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Preact, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `preact` как пресет в опциях запуска, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете повторно использовать свою конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [опциях запуска](/docs/runner#runner-options).

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

В вашем тесте используйте метод `render` из `@testing-library/preact` для прикрепления компонента к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они больше соответствуют фактическим пользовательским взаимодействиям, например:

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

Полный пример набора тестов компонентов WebdriverIO для Preact можно найти в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).