---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) - це швидка 3кБ альтернатива React з тим же сучасним API. Ви можете тестувати Preact компоненти безпосередньо в реальному браузері за допомогою WebdriverIO та його [браузерного запускача](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у вашому Preact проекті, дотримуйтесь [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Переконайтеся, що ви вибрали `preact` як пресет в опціях запускача, наприклад:

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

Якщо ви вже використовуєте [Vite](https://vitejs.dev/) як сервер розробки, ви також можете повторно використовувати вашу конфігурацію з `vite.config.ts` у конфігурації WebdriverIO. Для отримання додаткової інформації, див. `viteConfig` в [опціях запускача](/docs/runner#runner-options).

:::

Пресет Preact вимагає встановлення `@preact/preset-vite`. Також ми рекомендуємо використовувати [Testing Library](https://testing-library.com/) для рендерингу компонента на тестовій сторінці. Для цього вам потрібно встановити такі додаткові залежності:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Потім ви можете запустити тести, виконавши:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є наступний Preact компонент:

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

У вашому тесті використовуйте метод `render` з `@testing-library/preact` для приєднання компонента до тестової сторінки. Для взаємодії з компонентом ми рекомендуємо використовувати команди WebdriverIO, оскільки вони поводяться більш подібно до фактичних взаємодій користувача, наприклад:

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

Ви можете знайти повний приклад набору тестів компонентів WebdriverIO для Preact у нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).