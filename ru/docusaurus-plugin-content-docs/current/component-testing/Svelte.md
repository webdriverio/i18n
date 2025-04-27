---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) — это радикально новый подход к созданию пользовательских интерфейсов. В то время как традиционные фреймворки, такие как React и Vue, выполняют основную часть своей работы в браузере, Svelte переносит эту работу в этап компиляции, который происходит при сборке вашего приложения. Вы можете тестировать компоненты Svelte непосредственно в реальном браузере, используя WebdriverIO и его [browser runner](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Svelte, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `svelte` в качестве пресета в опциях запуска, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете повторно использовать вашу конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Для получения дополнительной информации см. `viteConfig` в [опциях запуска](/docs/runner#runner-options).

:::

Пресет Svelte требует установки `@sveltejs/vite-plugin-svelte`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для рендеринга компонента на тестовой странице. Для этого вам необходимо установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Допустим, у вас есть следующий компонент Svelte:

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

В вашем тесте используйте метод `render` из `@testing-library/svelte` для прикрепления компонента к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они более близки к реальным взаимодействиям пользователя, например:

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

Вы можете найти полный пример набора тестов компонентов WebdriverIO для Svelte в нашем [примере репозитория](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).