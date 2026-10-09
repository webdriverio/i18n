---
id: ai-steps
title: ИИ-шаги в тестах
description: Описывайте шаги тестов как намерения с помощью browser.act() и получайте типизированные данные через browser.extract() с @wdio/ai-service, затем воспроизводите их из закоммиченного кеша без модели и проверяйте каждое исправление (heal).
---

`@wdio/ai-service` позволяет тесту описывать шаг, а не программировать его: `browser.act('Add a blue shirt to the cart')` просит вашу модель выполнить действие, записывает выполненные ею команды WebdriverIO и воспроизводит их из файла кеша при каждом последующем запуске. Модель вызывается повторно, только если страница изменилась и записанный шаг больше нельзя исправить без неё. Используйте этот сервис для сценариев, разметка которых часто меняется, или чтобы запустить тест ещё до того, как вы узнаете селекторы. Для всего, что вы уже умеете описать скриптом, используйте обычные команды WebdriverIO.

## Настройка сервиса

Установите сервис и пакет LangChain для вашего провайдера модели:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

Добавьте сервис в конфигурацию и задайте API-ключ провайдера (здесь `ANTHROPIC_API_KEY`) в переменных окружения:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

`webSocketUrl: true` открывает сессию WebDriver BiDi. Сервис работает и через WebDriver Classic, но BiDi позволяет ему проверять, что сделал каждый шаг, и читать ответы API страницы. Все опции и провайдеры, включая локальные модели через Ollama, описаны на странице [AI Service](/docs/ai-service).

## Написание теста

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- `act` выполняет шаг и никогда ничего не проверяет. Проверяйте результат с помощью `expect`.
- `extract` только читает страницу и проверяет ответ на соответствие схеме. Он никогда не кешируется.
- Секреты передаются через плейсхолдеры. Модель видит `{{password}}`, но никогда не видит само значение:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- Вызывайте `act` на элементе, чтобы модель работала только внутри него, или на удерживаемом фрейме или вкладке:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## Записать один раз, воспроизводить без модели

Первый запуск записывает шаги каждого вызова `act` в файл `__act__/<spec file>.json` рядом со спецификацией:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

Закоммитьте директорию `__act__`. Последующие запуски воспроизводят записанные команды, поэтому успешный запуск не обращается к модели и не тратит токены.

| `cache` | Для чего использовать |
| --- | --- |
| `auto` (по умолчанию) | `write` локально, `heal`, если задана `process.env.CI` |
| `write` | запись и обновление файлов кеша |
| `heal` | CI: исправление падающих шагов, запись исправленных записей в `<outputDir>/act-cache/` без изменения файлов кеша |
| `locked` | запуски в CI, которые не должны вызывать модель: только воспроизведение, падение, если шаг нельзя исправить без модели |
| `off` | всегда обращаться к модели |

Запустите `npx wdio run wdio.conf.ts -s`, чтобы заново записать все вызовы `act`.

## Проверка исправлений

Когда записанный шаг падает, сервис сначала пробует другие селекторы, записанные для элемента, а затем его роль и доступное имя. Только если это не помогло, модель продолжает работу с упавшего шага. Каждый воспроизведённый или исправленный шаг должен делать то же, что и при записи: отправлять те же запросы, переходить на ту же страницу и изменять те же части страницы. Исправление, указывающее на похожую, но неправильную кнопку, отклоняется.

Запуск завершается сводкой:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

Папка с доказательствами содержит скриншот страницы в момент падения шага, по одному скриншоту после каждого шага исправления и видео исправления в браузерах, которые записывают скринкаст WebDriver BiDi (на сегодня это Firefox). Проверьте исправление, а затем закоммитьте обновлённый файл кеша.

## Превращение шагов в обычный код

Когда сценарий стабилизировался, замените его вызовы `act` записанными командами:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: Add a blue shirt in size M to the shopping cart
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## Устранение неполадок

| Ошибка | Решение |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | Задайте `model` в опциях сервиса или экспортируйте `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | Установите пакет провайдера. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | Экспортируйте ключ в оболочке или в секрете CI, в которых запускаются тесты. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | Запишите вызов локально с `cache: 'write'` и закоммитьте файл `__act__`. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | Элемент всё ещё на месте, но делает что-то другое: это регрессия, а не изменение разметки. Проверьте приложение. |
| `act("…") failed: …`, за которым следует `Evidence: <folder>` | Модель не смогла выполнить инструкцию. Папка содержит все сделанные ею снимки, события консоли и сети, а также выполненные шаги. |

## Дальнейшие шаги

- [AI Service](/docs/ai-service): все опции, формат кеша, эффекты шагов и рабочее пространство
- [Селекторы](/docs/selectors#role-selector): селектор `role/`, используемый записанными шагами
- [WebdriverIO для агентов-программистов](/docs/ai-agents): пишите тесты вместе с агентом-программистом