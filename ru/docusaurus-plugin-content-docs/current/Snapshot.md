---
id: snapshot
title: Снэпшот
---

Тесты снэпшотов могут быть очень полезны для проверки широкого спектра аспектов вашего компонента или логики одновременно. В WebdriverIO вы можете делать снэпшоты любого произвольного объекта, а также DOM-структуры WebElement или результатов команд WebdriverIO.

Аналогично другим тестовым фреймворкам, WebdriverIO делает снэпшот заданного значения, а затем сравнивает его с файлом эталонного снэпшота, хранящимся рядом с тестом. Тест не пройдет, если два снэпшота не совпадают: либо изменение неожиданное, либо эталонный снэпшот необходимо обновить до новой версии результата.

:::info Кроссплатформенная поддержка

Эти возможности снэпшотов доступны как для запуска end-to-end тестов в среде Node.js, так и для запуска [модульных и компонентных](/docs/component-testing) тестов в браузере или на мобильных устройствах.

:::

## Использование снэпшотов
Для создания снэпшота значения вы можете использовать `toMatchSnapshot()` из API [`expect()`](/docs/api/expect-webdriverio):

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

При первом запуске этого теста WebdriverIO создает файл снэпшота, который выглядит так:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

Артефакт снэпшота должен быть зафиксирован вместе с изменениями кода и пересмотрен в рамках процесса проверки кода. При последующих запусках тестов WebdriverIO будет сравнивать отображаемый результат с предыдущим снэпшотом. Если они совпадают, тест пройдет успешно. Если они не совпадают, либо тестовый раннер обнаружил ошибку в вашем коде, которую следует исправить, либо реализация изменилась, и снэпшот необходимо обновить.

Для обновления снэпшота передайте флаг `-s` (или `--updateSnapshot`) в команду `wdio`, например:

```sh
npx wdio run wdio.conf.js -s
```

__Примечание:__ если вы запускаете тесты с несколькими браузерами параллельно, создается и сравнивается только один снэпшот. Если вы хотите иметь отдельный снэпшот для каждой конфигурации, пожалуйста, [создайте задачу](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) и сообщите нам о вашем сценарии использования.

## Встроенные снэпшоты

Аналогично вы можете использовать `toMatchInlineSnapshot()` для хранения снэпшота непосредственно в файле теста.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Вместо создания файла снэпшота, Vitest изменит файл теста напрямую, чтобы обновить снэпшот в виде строки:

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

Это позволяет видеть ожидаемый результат непосредственно, не переключаясь между разными файлами.

## Визуальные снэпшоты

Создание DOM-снэпшота элемента может быть не лучшей идеей, особенно если DOM-структура слишком большая и содержит динамические свойства элементов. В таких случаях рекомендуется использовать визуальные снэпшоты для элементов.

Чтобы включить визуальные снэпшоты, добавьте `@wdio/visual-service` в вашу настройку. Вы можете следовать инструкциям по настройке в [документации](/docs/visual-testing#installation) по визуальному тестированию.

Затем вы можете сделать визуальный снэпшот с помощью `toMatchElementSnapshot()`, например:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

Изображение затем сохраняется в базовом каталоге. Узнайте больше в разделе [Визуальное тестирование](/docs/visual-testing).