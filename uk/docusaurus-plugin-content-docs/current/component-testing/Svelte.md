---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) — це радикально новий підхід до створення користувацьких інтерфейсів. У той час як традиційні фреймворки, такі як React і Vue, виконують більшу частину своєї роботи в браузері, Svelte переносить цю роботу на етап компіляції, який відбувається під час збірки вашого додатку. Ви можете тестувати компоненти Svelte безпосередньо в реальному браузері за допомогою WebdriverIO та його [браузерного раннера](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у вашому проєкті Svelte, дотримуйтесь [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Переконайтеся, що ви вибрали `svelte` як пресет у налаштуваннях раннера, наприклад:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Якщо ви вже використовуєте [Vite](https://vitejs.dev/) як сервер розробки, ви також можете повторно використовувати вашу конфігурацію з `vite.config.ts` у конфігурації WebdriverIO. Додаткову інформацію дивіться в розділі `viteConfig` у [налаштуваннях раннера](/docs/runner#runner-options).

:::

Пресет Svelte вимагає встановлення `@sveltejs/vite-plugin-svelte`. Також ми рекомендуємо використовувати [Testing Library](https://testing-library.com/) для рендерингу компонента на тестовій сторінці. Для цього вам потрібно встановити такі додаткові залежності:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Потім ви можете запустити тести, виконавши:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є такий компонент Svelte:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

У вашому тесті використовуйте метод `render` з `@testing-library/svelte`, щоб приєднати компонент до тестової сторінки. Для взаємодії з компонентом ми рекомендуємо використовувати команди WebdriverIO, оскільки вони поводяться більше як реальні взаємодії користувача, наприклад:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Ви можете знайти повний приклад набору тестів компонентів WebdriverIO для Svelte у нашому [репозиторії з прикладами](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).