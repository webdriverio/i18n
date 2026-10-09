---
id: browsingContext
title: Объект BrowsingContext
description: Храните вкладку, окно или фрейм как объект и выполняйте команды прямо в нём, не переключая на него сессию.
---

Контекст просмотра (browsing context) — это вкладка, окно или фрейм, который вы храните как объект. Команды, вызываемые на нём, выполняются в этой вкладке или фрейме, тогда как сессия и все остальные контексты остаются на своих местах. Начиная с v10, именно так WebdriverIO работает с вкладками, окнами и фреймами в сессии WebDriver BiDi, и в таких сессиях этот подход заменяет `switchWindow()` и `switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## Получение контекста просмотра

| Вызов | Возвращает |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Первый контекст верхнего уровня сессии после перехода в нём по адресу. `browser.url()` всегда выполняет навигацию именно в нём. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Новую вкладку (`type: 'tab'`) или окно после загрузки страницы. Сессия на него не переключается. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Все открытые контексты верхнего уровня (вкладки и окна, но не фреймы), например вкладку, которую страница открыла сама. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Фрейм контекста, в том числе кросс-доменный и вложенный. |

Сохраните объект и вызывайте команды на нём. «Текущей» вкладки или фрейма, между которыми нужно переключаться, не существует, поэтому контексты можно использовать и параллельно:

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Сессии WebDriver BiDi и Classic

Для контекстов просмотра нужна сессия WebDriver BiDi, которая начиная с v10 используется по умолчанию для Chrome, Edge и Firefox. В сессии WebDriver Classic, например с Appium или Safari, существует только текущий контекст сессии. В этом случае:

- `browser.url()` возвращает заместитель браузера. Команды вроде `$`, `execute` или `getTitle` выполняются на браузере, `url`, `isFrame` и `parent` описывают текущую страницу, а `contextId` равен `undefined`.
- `frame()`, `navigate()` и `activate()` завершаются с ошибкой и называют команду Classic, которую следует использовать вместо них: [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) или [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Проверяйте `browser.isBidi`, если один и тот же код выполняется в сессиях обоих типов.

## Свойства

| Имя | Тип | Подробности |
| ---- | ---- | ------- |
| `contextId` | `String` | Идентификатор контекста просмотра WebDriver BiDi. `undefined` в сессии Classic. |
| `url` | `String` | URL, на который контекст был в последний раз переведён с помощью `browser.url()`, `navigate()` или `newWindow()`. Переходы, которые страница выполняет сама (ссылки, `location`, `history.pushState`), отображаются только после вызова [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` для фрейма, `false` для вкладки или окна. |
| `parent` | `BrowsingContext \| undefined` | Для фрейма — контекст, на котором был вызван `frame()` (или промежуточный фрейм для фрейма с более глубокой вложенностью). `undefined` для вкладки или окна. |
| `browser` | `Browser` | [Объект браузера](/docs/api/browser) сессии. |
| `request` | `Request \| undefined` | Информация о загрузке при последней навигации через `browser.url()` или `navigate()`: URL, заголовки, ответ, перенаправления и запросы, выполненные страницей. |
| `sessionId` | `String` | Идентификатор сессии, то же, что `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities сессии, то же, что `browser.capabilities`. |
| `options` | `Object` | Опции WebdriverIO, то же, что `browser.options`. |
| `isBidi` | `Boolean` | Использует ли сессия WebDriver BiDi. |
| `isMobile` | `Boolean` | Автоматизирует ли сессия мобильное устройство. |

## Методы

### Команды контекста просмотра

Эти команды действуют на контекст, на котором они вызваны. У каждой есть собственная справочная страница.

| Команда | Подробности |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Получить фрейм этого контекста как отдельный контекст просмотра. |
| [`navigate`](/docs/api/browsingContext/navigate) | Выполнить навигацию в этом контексте с теми же опциями, что и у `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Перезагрузить этот контекст. Фрейм перезагружает только собственный документ. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Перемещаться по истории этой вкладки или окна. |
| [`activate`](/docs/api/browsingContext/activate) | Вывести эту вкладку или окно на передний план. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Закрыть эту вкладку или окно. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Прочитать заголовок или URL документа, отображаемого в этом контексте. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Ответить на пользовательский диалог, открытый в этом контексте, или прочитать его текст. |

### Команды браузера, выполняемые в контексте

Это одноимённые [команды браузера](/docs/api/browser), применяемые к данному контексту, а не к первому контексту сессии. Они принимают те же аргументы.

| Команда | В контексте просмотра |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Находят элементы в документе этого контекста. |
| [`execute`](/docs/api/browser/execute) | Выполняет скрипт в документе этого контекста. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Отправляют ввод в этот контекст, даже если это фоновая вкладка. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Делают снимок этого контекста. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Читают и изменяют cookie раздела хранилища этого контекста. |
| [`setViewport`](/docs/api/browser/setViewport) | Изменяет размер области просмотра этой вкладки или окна. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Выполняет скрипт перед скриптами страницы, только в этой вкладке или окне. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Подменяют запросы только этой вкладки или окна. Мок прекращает действие, когда его вкладка закрывается. |
| [`emulate`](/docs/api/browser/emulate) | Эмулирует свойство устройства, например геолокацию или часы, только в этой вкладке или окне. |
| [`restore`](/docs/api/browser/restore) | Отменяет эмуляции, то же, что `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | То же, что и на браузере. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // запросы `tab` получают подменённый ответ, запросы `page` доходят до сервера
})
```

### Только для верхнего уровня

Фрейм разделяет со своей вкладкой историю, область просмотра, сеть и эмуляцию, поэтому на фрейме эти команды завершаются с ошибкой `` `<command>` is only available on a top-level browsing context ``. Вызывайте их на вкладке: переходите по `frame.parent`, пока `parent` не станет `undefined`, или используйте контекст, на котором вы вызвали `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Недоступно в контексте просмотра

Команды сессии, такие как `deleteSession`, `newWindow` или `browsingContexts`, есть только у [объекта браузера](/docs/api/browser). То же касается пользовательских команд: [`addCommand`](/docs/customcommands) и `overwriteCommand` завершаются с ошибкой на контексте — регистрируйте их на `browser`.

### События

`on`, `once`, `off`, `emit`, `removeListener` и `removeAllListeners` регистрируют обработчики на браузере, поэтому события относятся ко всей сессии. Например, событие [`dialog`](/docs/api/dialog) срабатывает для диалога в любой вкладке или фрейме.

## Элементы контекста просмотра

Элемент, полученный через контекст, принадлежит этому контексту. Команды элементов, такие как `click`, `setValue` или `getText`, выполняются в документе этого контекста, даже если это фоновая вкладка или фрейм. Они следуют спецификации WebDriver так же, как драйверы, поэтому возвращают те же результаты и те же ошибки (например, `element click intercepted`), что и для элемента страницы на переднем плане. `getComputedRole` и `getComputedLabel` завершаются с ошибкой для элемента контекста, отличного от первого контекста сессии.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // outputs: "BOTTOM"
```

## Устранение неполадок

| Ошибка | Причина и решение |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Вызовите [`frame()`](/docs/api/browsingContext/frame) на контексте, возвращённом `browser.url()` или `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Сохраните контекст, возвращённый `browser.url()` или `browser.newWindow()`, или найдите нужный с помощью `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | Сессия является сессией Classic (например, Appium или Safari). Используйте команду Classic, указанную в сообщении. |
| `` `<command>` is only available on a top-level browsing context `` | Команда была вызвана на фрейме. Вызовите её на вкладке фрейма, см. [Только для верхнего уровня](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Регистрируйте пользовательские команды на `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | Страница, содержавшая фрейм, перешла по другому адресу. Получите фрейм заново с помощью `frame()` на новой странице. |

## См. также

- [Объект Browser](/docs/api/browser)
- [Миграция на v10: `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Диалоги](/docs/api/dialog)