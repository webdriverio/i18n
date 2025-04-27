---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Команда action представляет собой низкоуровневый интерфейс для предоставления виртуализированных действий устройства ввода в веб-браузере.

В дополнение к высокоуровневым командам, таким как `scrollIntoView`, `doubleClick`, API действий предоставляет детальный 
контроль над тем, что именно могут делать назначенные устройства ввода. WebdriverIO предоставляет интерфейс для 3 типов источников ввода:

- клавишный ввод для клавиатурных устройств
- указательный ввод для мыши, пера или сенсорных устройств
- и колесиковый ввод для устройств с колесом прокрутки

Каждая цепочка команд действий должна завершаться вызовом `perform`, чтобы запустить набор действий. Это
вызывает [освобождение действий](https://w3c.github.io/webdriver/#release-actions) и запуск событий. Вы можете
пропустить это, передав `true` (например, `browser.actions(...).perform(true)`).

:::info

Поддержка этой команды и определенных действий может отличаться в зависимости от среды. За прогрессом разработки
можно следить на [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Для мобильных устройств вы можете использовать специфичные для Appium команды жестов на [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
и [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Источник клавишного ввода

Источник клавишного ввода - это источник ввода, связанный с устройством типа клавиатуры. Его можно вызвать
используя параметр типа `key`. Например:

```ts
browser.action('key')
```

Он возвращает объект `KeyAction`, который поддерживает следующие действия:

- `down(value: string)`: генерирует действие нажатия клавиши
- `up(value: string)`: генерирует действие отпускания клавиши
- `pause(ms: number)`: указывает, что источник ввода ничего не делает в течение определенного тика

#### Специальные символы

Если вы хотите использовать специальные символы, такие как `Control`, `Page Up` или `Shift`, убедитесь, что импортировали
объект [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)
из пакета `webdriverio` следующим образом:

```ts
import { Key } from 'webdriverio'
```

Этот объект позволяет получить доступ к юникод-представлению нужного специального символа.

### Источник указательного ввода

Источник указательного ввода - это источник ввода, связанный с устройством типа указателя. Тип может быть
указан при вызове команды `action`, например:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" - значение по умолчанию, также возможны: "pen" или "touch"
})
```

Он возвращает объект `PointerAction`, который поддерживает следующие действия:

- `down (button: 'left' | 'middle' | 'right')`: создает действие для нажатия одной кнопки
- `down (params: PointerActionParams)`: создает действие для нажатия одной кнопки с детальными параметрами
- `move (x: number, y: number)`: Создает действие для перемещения указателя на `x` и `y` пикселей от области просмотра
- `move (params: PointerActionMoveParams)`: Создает действие для перемещения указателя на `x` и `y` пикселей от
  указанного `origin`. `origin` может быть определен как текущее положение указателя (например, "pointer"), область просмотра
  (например, "viewport") или центр определенного элемента.
- `up (button: 'left' | 'middle' | 'right')`: создает действие для отпускания одной кнопки
- `up (params: PointerActionUpParams)`: создает действие для отпускания одной кнопки с детальными параметрами
- `cancel()`: Действие, отменяющее текущий ввод этого указателя.
- `pause(ms: number)`: указывает, что источник ввода ничего не делает в течение определенного тика

Вы можете найти подробную информацию о типах параметров [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) и [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)
в определении типов проекта.

### Источник колесикового ввода

Источник колесикового ввода - это источник ввода, связанный с устройством типа колесика.

```ts
browser.action('wheel')
```

Он возвращает объект `WheelAction`, который поддерживает следующие действия:

- `scroll (params: ScrollParams)`: прокручивает страницу к заданным координатам или точке отсчета
- `pause(ms: number)`: указывает, что источник ввода ничего не делает в течение определенного тика

Вы можете найти подробную информацию о типе параметра [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) в определении типов проекта.

##### Использование

```js
browser.action()
```

##### Примеры

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```