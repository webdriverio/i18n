---
id: svelte
title: Svelte
description: "Настройте браузерный раннер WebdriverIO для проекта на Svelte с пресетом svelte и пишите тесты компонентов с помощью Testing Library."
---

[Svelte](https://svelte.dev/) — это радикально новый подход к созданию пользовательских интерфейсов. В то время как традиционные фреймворки, такие как React и Vue, выполняют основную часть работы в браузере, Svelte переносит эту работу на этап компиляции, который происходит при сборке вашего приложения. Вы можете тестировать компоненты Svelte непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного раннера](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте на Svelte, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Обязательно выберите `svelte` в качестве пресета в настройках раннера, например:

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

Если вы уже используете [Vite](https://vitejs.dev/) в качестве сервера разработки, вы также можете просто повторно использовать свою конфигурацию из `vite.config.ts` в конфигурации WebdriverIO. Подробнее см. `viteConfig` в [настройках раннера](/docs/runner#runner-options).

:::

Для работы пресета Svelte необходимо установить `@sveltejs/vite-plugin-svelte`. Также мы рекомендуем использовать [Testing Library](https://testing-library.com/) для рендеринга компонента на тестовой странице. Поэтому вам потребуется установить следующие дополнительные зависимости:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Предположим, у вас есть следующий компонент Svelte:

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

В своем тесте используйте метод `render` из `@testing-library/svelte`, чтобы подключить компонент к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ведут себя ближе к реальным действиям пользователя, например:

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

Полный пример набора тестов компонентов WebdriverIO для Svelte вы можете найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).