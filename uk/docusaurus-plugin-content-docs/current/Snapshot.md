---
id: snapshot
title: Знімки
---

Тести знімків можуть бути дуже корисними для перевірки широкого спектру аспектів вашого компонента або логіки одночасно. У WebdriverIO ви можете робити знімки будь-якого довільного об'єкта, а також DOM-структури WebElement або результатів команд WebdriverIO.

Подібно до інших тестових фреймворків, WebdriverIO робить знімок заданого значення, а потім порівнює його з файлом еталонного знімка, що зберігається поряд із тестом. Тест не пройде, якщо два знімки не збігаються: або зміна неочікувана, або еталонний знімок потрібно оновити до нової версії результату.

:::info Підтримка різних платформ

Ці можливості знімків доступні для запуску наскрізних тестів у середовищі Node.js, а також для запуску [юніт-тестів та тестів компонентів](/docs/component-testing) у браузері або на мобільних пристроях.

:::

## Використання знімків
Для створення знімка значення можна використовувати метод `toMatchSnapshot()` з API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

Коли цей тест запускається вперше, WebdriverIO створює файл знімка, який виглядає так:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Артефакт знімка слід комітити разом зі змінами коду та перевіряти в рамках процесу рецензування коду. Під час наступних запусків тестів WebdriverIO порівнює отриманий результат із попереднім знімком. Якщо вони збігаються, тест пройде. Якщо вони не збігаються, тест показав помилку у вашому коді, яку слід виправити, або реалізація змінилася, і знімок потрібно оновити.

Для оновлення знімка передайте прапор `-s` (або `--updateSnapshot`) у команду `wdio`, наприклад:

```sh
npx wdio run wdio.conf.js -s
```

__Примітка:__ якщо ви запускаєте тести з кількома браузерами паралельно, створюється та порівнюється лише один знімок. Якщо ви хочете мати окремий знімок для кожної можливості, будь ласка, [створіть запит](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) і розкажіть нам про ваш випадок використання.

## Вбудовані знімки

Аналогічно, ви можете використовувати `toMatchInlineSnapshot()` для зберігання знімка безпосередньо у файлі тесту.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Замість створення файлу знімка, Vitest безпосередньо змінить файл тесту, щоб оновити знімок як рядок:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

Це дозволяє бачити очікуваний результат безпосередньо, не перемикаючись між різними файлами.

## Візуальні знімки

Створення DOM-знімка елемента може бути не найкращою ідеєю, особливо якщо DOM-структура занадто велика і містить динамічні властивості елементів. У таких випадках рекомендується покладатися на візуальні знімки для елементів.

Щоб увімкнути візуальні знімки, додайте `@wdio/visual-service` до вашого налаштування. Ви можете слідувати інструкціям з налаштування в [документації](/docs/visual-testing#installation) для візуального тестування.

Потім ви можете зробити візуальний знімок за допомогою `toMatchElementSnapshot()`, наприклад:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Зображення потім зберігається в базовому каталозі. Перегляньте [Візуальне тестування](/docs/visual-testing) для отримання додаткової інформації.