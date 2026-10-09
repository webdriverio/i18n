---
id: stencil
title: Stencil
description: "Настройка браузерного раннера WebdriverIO для компонентов Stencil, их рендеринг с помощью хелпера render и ожидание обновлений элементов."
---

[Stencil](https://stenciljs.com/) — это библиотека для создания переиспользуемых, масштабируемых библиотек компонентов. Вы можете тестировать компоненты Stencil непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного раннера](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Stencil, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Обязательно выберите `stencil` в качестве пресета в опциях раннера, например:

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

Если вы используете Stencil вместе с фреймворком, таким как React или Vue, вам следует оставить пресет для этих фреймворков.

:::

Затем вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.ts
```

## Написание тестов

Предположим, у вас есть следующие компоненты Stencil:

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

В вашем тесте используйте метод `render` из `@wdio/browser-runner/stencil`, чтобы прикрепить компонент к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ведут себя ближе к реальным действиям пользователя, например:

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

#### Опции рендеринга

Метод `render` предоставляет следующие опции:

##### `components`

Массив компонентов для тестирования. Классы компонентов можно импортировать в файл спецификации, после чего ссылки на них следует добавить в массив `component`, чтобы использовать их на протяжении всего теста.

__Тип:__ `CustomElementConstructor[]`<br />
__По умолчанию:__ `[]`

##### `flushQueue`

Если `false`, очередь рендеринга не сбрасывается при начальной настройке теста.

__Тип:__ `boolean`<br />
__По умолчанию:__ `true`

##### `template`

Начальный JSX, используемый для генерации теста. Используйте `template`, когда хотите инициализировать компонент через его свойства, а не через HTML-атрибуты. Указанный шаблон (JSX) будет отрендерен в `document.body`.

__Тип:__ `JSX.Template`

##### `html`

Начальный HTML, используемый для генерации теста. Это может быть полезно для создания набора компонентов, работающих вместе, и назначения HTML-атрибутов.

__Тип:__ `string`

##### `language`

Устанавливает имитируемый атрибут `lang` у `<html>`.

__Тип:__ `string`

##### `autoApplyChanges`

По умолчанию для проверки обновлений после любых изменений свойств и атрибутов компонента необходимо вызывать `env.waitForChanges()`. В качестве альтернативы `autoApplyChanges` непрерывно сбрасывает очередь в фоновом режиме.

__Тип:__ `boolean`<br />
__По умолчанию:__ `false`

##### `attachStyles`

По умолчанию стили не прикрепляются к DOM и не отражаются в сериализованном HTML. Установка этой опции в `true` включит стили компонента в сериализуемый вывод.

__Тип:__ `boolean`<br />
__По умолчанию:__ `false`

#### Окружение рендеринга

Метод `render` возвращает объект окружения, который предоставляет определённые вспомогательные утилиты для управления окружением компонента.

##### `flushAll`

После внесения изменений в компонент, например обновления свойства или атрибута, тестовая страница не применяет изменения автоматически. Чтобы дождаться обновления и применить его, вызовите `await flushAll()`

__Тип:__ `() => void`

##### `unmount`

Удаляет элемент-контейнер из DOM.

__Тип:__ `() => void`

##### `styles`

Все стили, определённые компонентами.

__Тип:__ `Record<string, string>`

##### `container`

Элемент-контейнер, в котором рендерится шаблон.

__Тип:__ `HTMLElement`

##### `$container`

Элемент-контейнер в виде элемента WebdriverIO.

__Тип:__ `WebdriverIO.Element`

##### `root`

Корневой компонент шаблона.

__Тип:__ `HTMLElement`

##### `$root`

Корневой компонент в виде элемента WebdriverIO.

__Тип:__ `WebdriverIO.Element`

### `waitForChanges`

Вспомогательный метод для ожидания готовности компонента.

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

## Обновления элементов

Если вы определяете свойства или состояния в своём компоненте Stencil, вам необходимо управлять тем, когда эти изменения должны применяться к компоненту для его повторного рендеринга.


## Примеры

Полный пример набора тестов компонентов WebdriverIO для Stencil вы можете найти в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).