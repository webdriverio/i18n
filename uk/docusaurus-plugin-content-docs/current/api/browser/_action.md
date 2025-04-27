---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

Команда action - це низькорівневий інтерфейс для надання віртуалізованих дій введення пристроїв у веб-браузер.

Окрім високорівневих команд, таких як `scrollIntoView`, `doubleClick`, API Actions забезпечує детальний 
контроль над тим, що саме можуть робити призначені пристрої введення. WebdriverIO надає інтерфейс для 3 типів 
джерел введення:

- клавіатурне введення для клавіатурних пристроїв
- введення вказівником для миші, пера або сенсорних пристроїв
- і введення колеса прокрутки для пристроїв з коліщатком прокрутки

Кожен ланцюжок команд дій повинен завершуватися викликом `perform`, щоб запустити набір дій. Це 
призводить до [вивільнення дій](https://w3c.github.io/webdriver/#release-actions) та генерації подій. Ви 
можете пропустити це, передавши `true` (наприклад, `browser.actions(...).perform(true)`).

:::info

Підтримка цієї команди та конкретних дій може відрізнятися залежно від середовища. Прогрес розробки 
можна відстежувати на [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Для мобільних пристроїв ви можете використовувати специфічні команди жестів Appium для [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch) 
та [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Джерело введення клавіш

Джерело введення клавіш - це джерело введення, пов'язане з пристроєм типу клавіатури. Його можна викликати 
за допомогою параметра типу `key`. Наприклад:

```ts
browser.action('key')
```

Він повертає об'єкт `KeyAction`, який підтримує такі дії:

- `down(value: string)`: генерує дію натискання клавіші
- `up(value: string)`: генерує дію відпускання клавіші
- `pause(ms: number)`: вказує, що джерело введення нічого не робить протягом певного тику

#### Спеціальні символи

Якщо ви хочете використовувати спеціальні символи, такі як `Control`, `Page Up` або `Shift`, обов'язково імпортуйте 
об'єкт [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417) 
з пакету `webdriverio` таким чином:

```ts
import { Key } from 'webdriverio'
```

Цей об'єкт дозволяє отримати доступ до юнікод-представлення потрібного спеціального символу.

### Джерело введення вказівника

Джерело введення вказівника - це джерело введення, пов'язане з пристроєм типу вказівника. Тип можна 
вказати під час виклику команди `action`, наприклад:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" - значення за замовчуванням, також можливо: "pen" або "touch"
})
```

Він повертає об'єкт `PointerAction`, який підтримує такі дії:

- `down (button: 'left' | 'middle' | 'right')`: створює дію для натискання однієї клавіші
- `down (params: PointerActionParams)`: створює дію для натискання однієї клавіші з детальними параметрами
- `move (x: number, y: number)`: створює дію для переміщення вказівника на `x` та `y` пікселів з області перегляду
- `move (params: PointerActionMoveParams)`: створює дію для переміщення вказівника на `x` та `y` пікселів від 
  вказаного `origin`. `origin` може бути визначений як поточна позиція вказівника (наприклад, "pointer"), область 
  перегляду (наприклад, "viewport") або центр певного елемента.
- `up (button: 'left' | 'middle' | 'right')`: створює дію для відпускання однієї клавіші
- `up (params: PointerActionUpParams)`: створює дію для відпускання однієї клавіші з детальними параметрами
- `cancel()`: дія, яка скасовує поточне введення цього вказівника.
- `pause(ms: number)`: вказує, що джерело введення нічого не робить протягом певного тику

Детальну інформацію про типи параметрів [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) та [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19) можна знайти у визначеннях типів проєкту.

### Джерело введення колеса

Джерело введення колеса - це джерело введення, пов'язане з пристроєм типу колеса.

```ts
browser.action('wheel')
```

Він повертає об'єкт `WheelAction`, який підтримує такі дії:

- `scroll (params: ScrollParams)`: прокручує сторінку до заданих координат або початкової точки
- `pause(ms: number)`: вказує, що джерело введення нічого не робить протягом певного тику

Детальну інформацію про тип параметрів [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) можна знайти у визначеннях типів проєкту.

##### Використання

```js
browser.action()
```

##### Приклади

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