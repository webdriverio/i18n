---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) — це бібліотека для створення повторно використовуваних, масштабованих бібліотек компонентів. Ви можете тестувати компоненти Stencil безпосередньо у реальному браузері, використовуючи WebdriverIO та його [браузерний запускач](/docs/runner#browser-runner).

## Налаштування

Щоб налаштувати WebdriverIO у вашому проекті Stencil, дотримуйтесь [інструкцій](/docs/component-testing#set-up) в нашій документації з тестування компонентів. Переконайтеся, що вибрали `stencil` як пресет у опціях запускача, наприклад:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

У випадку, якщо ви використовуєте Stencil з фреймворком, таким як React або Vue, вам слід зберегти пресет для цих фреймворків.

:::

Після цього ви можете запустити тести, виконавши:

```sh
npx wdio run ./wdio.conf.ts
```

## Написання тестів

Припустимо, у вас є наступні компоненти Stencil:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

У своєму тесті використовуйте метод `render` з `@wdio/browser-runner/stencil`, щоб прикріпити компонент до тестової сторінки. Для взаємодії з компонентом ми рекомендуємо використовувати команди WebdriverIO, оскільки вони поводяться ближче до реальних взаємодій користувача, наприклад:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Опції Render

Метод `render` надає наступні опції:

##### `components`

Масив компонентів для тестування. Класи компонентів можна імпортувати у файл специфікації, потім їх посилання слід додати до масиву `component` для використання протягом тесту.

__Тип:__ `CustomElementConstructor[]`<br />
__За замовчуванням:__ `[]`

##### `flushQueue`

Якщо `false`, не очищати чергу рендерингу при початковому налаштуванні тесту.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `true`

##### `template`

Початковий JSX, який використовується для генерації тесту. Використовуйте `template`, коли ви хочете ініціалізувати компонент, використовуючи їхні властивості, а не HTML-атрибути. Це рендерить вказаний шаблон (JSX) у `document.body`.

__Тип:__ `JSX.Template`

##### `html`

Початковий HTML, який використовується для генерації тесту. Це може бути корисно для створення колекції компонентів, що працюють разом, і призначення HTML-атрибутів.

__Тип:__ `string`

##### `language`

Встановлює мокований атрибут `lang` на `<html>`.

__Тип:__ `string`

##### `autoApplyChanges`

За замовчуванням, будь-які зміни властивостей та атрибутів компонента повинні використовувати `env.waitForChanges()` для тестування оновлень. Як опція, `autoApplyChanges` безперервно очищає чергу у фоновому режимі.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `false`

##### `attachStyles`

За замовчуванням, стилі не приєднуються до DOM і не відображаються у серіалізованому HTML. Встановлення цієї опції в `true` включить стилі компонента у серіалізований вихід.

__Тип:__ `boolean`<br />
__За замовчуванням:__ `false`

#### Середовище Render

Метод `render` повертає об'єкт середовища, який надає певні допоміжні утиліти для управління середовищем компонента.

##### `flushAll`

Після внесення змін до компонента, таких як оновлення властивості або атрибута, тестова сторінка не застосовує зміни автоматично. Щоб дочекатися та застосувати оновлення, викличте `await flushAll()`

__Тип:__ `() => void`

##### `unmount`

Видаляє елемент контейнера з DOM.

__Тип:__ `() => void`

##### `styles`

Усі стилі, визначені компонентами.

__Тип:__ `Record<string, string>`

##### `container`

Елемент контейнера, в якому рендериться шаблон.

__Тип:__ `HTMLElement`

##### `$container`

Елемент контейнера як елемент WebdriverIO.

__Тип:__ `WebdriverIO.Element`

##### `root`

Кореневий компонент шаблону.

__Тип:__ `HTMLElement`

##### `$root`

Кореневий компонент як елемент WebdriverIO.

__Тип:__ `WebdriverIO.Element`

### `waitForChanges`

Допоміжний метод для очікування готовності компонента.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Оновлення елементів

Якщо ви визначаєте властивості чи стани у вашому компоненті Stencil, вам потрібно керувати тим, коли ці зміни повинні бути застосовані до компонента для його перерендерингу.


## Приклади

Ви можете знайти повний приклад набору тестів компонентів WebdriverIO для Stencil у нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).