---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) - это библиотека для создания многократно используемых, масштабируемых библиотек компонентов. Вы можете тестировать компоненты Stencil непосредственно в реальном браузере с помощью WebdriverIO и его [браузерного раннера](/docs/runner#browser-runner).

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Stencil, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Убедитесь, что вы выбрали `stencil` в качестве пресета в опциях раннера, например:

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

В случае, если вы используете Stencil с фреймворком, таким как React или Vue, вы должны сохранить пресет для этих фреймворков.

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

В вашем тесте используйте метод `render` из `@wdio/browser-runner/stencil` для прикрепления компонента к тестовой странице. Для взаимодействия с компонентом мы рекомендуем использовать команды WebdriverIO, так как они ближе к реальным пользовательским взаимодействиям, например:

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

Массив компонентов для тестирования. Классы компонентов можно импортировать в файл спецификации, затем их ссылки следует добавить в массив `component` для использования в течение теста.

__Тип:__ `CustomElementConstructor[]`<br />
__По умолчанию:__ `[]`

##### `flushQueue`

Если `false`, не очищать очередь рендеринга при начальной настройке теста.

__Тип:__ `boolean`<br />
__По умолчанию:__ `true`

##### `template`

Начальный JSX, который используется для создания теста. Используйте `template`, когда вы хотите инициализировать компонент, используя их свойства, а не их HTML-атрибуты. Он отобразит указанный шаблон (JSX) в `document.body`.

__Тип:__ `JSX.Template`

##### `html`

Начальный HTML, используемый для создания теста. Это может быть полезно для создания набора компонентов, работающих вместе, и назначения HTML-атрибутов.

__Тип:__ `string`

##### `language`

Устанавливает имитированный атрибут `lang` на `<html>`.

__Тип:__ `string`

##### `autoApplyChanges`

По умолчанию, для любых изменений свойств и атрибутов компонента необходимо вызвать `env.waitForChanges()` для тестирования обновлений. В качестве опции, `autoApplyChanges` непрерывно очищает очередь в фоновом режиме.

__Тип:__ `boolean`<br />
__По умолчанию:__ `false`

##### `attachStyles`

По умолчанию стили не прикрепляются к DOM и не отражаются в сериализованном HTML. Установка этой опции в `true` включит стили компонента в сериализуемый вывод.

__Тип:__ `boolean`<br />
__По умолчанию:__ `false`

#### Среда рендеринга

Метод `render` возвращает объект среды, который предоставляет определенные вспомогательные утилиты для управления средой компонента.

##### `flushAll`

После внесения изменений в компонент, таких как обновление свойства или атрибута, тестовая страница не применяет изменения автоматически. Чтобы дождаться и применить обновление, вызовите `await flushAll()`

__Тип:__ `() => void`

##### `unmount`

Удаляет контейнерный элемент из DOM.

__Тип:__ `() => void`

##### `styles`

Все стили, определенные компонентами.

__Тип:__ `Record<string, string>`

##### `container`

Контейнерный элемент, в котором отображается шаблон.

__Тип:__ `HTMLElement`

##### `$container`

Контейнерный элемент как элемент WebdriverIO.

__Тип:__ `WebdriverIO.Element`

##### `root`

Корневой компонент шаблона.

__Тип:__ `HTMLElement`

##### `$root`

Корневой компонент как элемент WebdriverIO.

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

Если вы определяете свойства или состояния в вашем компоненте Stencil, вы должны управлять тем, когда эти изменения должны быть применены к компоненту для повторного рендеринга.


## Примеры

Вы можете найти полный пример набора тестов компонентов WebdriverIO для Stencil в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).