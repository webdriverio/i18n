---
id: file-download
title: Загрузка файлов
description: "Настройка каталогов загрузки для Chrome, Firefox и Edge, ожидание завершения загрузок и проверка загруженных файлов в разных браузерах."
---

При автоматизации загрузки файлов в веб-тестировании важно обрабатывать их единообразно во всех браузерах, чтобы обеспечить надёжное выполнение тестов.

Здесь мы приводим лучшие практики работы с загрузкой файлов и показываем, как настроить каталоги загрузки для **Google Chrome**, **Mozilla Firefox** и **Microsoft Edge**.

## Пути загрузки

**Жёсткое задание** путей загрузки в тестовых скриптах может привести к проблемам с сопровождением и переносимостью. Используйте **относительные пути** для каталогов загрузки, чтобы обеспечить переносимость и совместимость в различных окружениях.

```javascript
// 👎
// Жёстко заданный путь загрузки
const downloadPath = '/path/to/downloads';

// 👍
// Относительный путь загрузки
const downloadPath = path.join(__dirname, 'downloads');
```

## Стратегии ожидания

Отсутствие правильных стратегий ожидания может привести к состояниям гонки или ненадёжным тестам, особенно при ожидании завершения загрузки. Используйте **явные** стратегии ожидания завершения загрузки файлов, чтобы обеспечить синхронизацию между шагами теста.

```javascript
// 👎
// Нет явного ожидания завершения загрузки
await browser.pause(5000);

// 👍
// Ожидание завершения загрузки файла
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Настройка каталогов загрузки

Чтобы переопределить поведение загрузки файлов для **Google Chrome**, **Mozilla Firefox** и **Microsoft Edge**, укажите каталог загрузки в capabilities WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Пример реализации смотрите в [рецепте WebdriverIO Test Download Behavior](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Настройка загрузок в браузерах на базе Chromium

Изменить путь загрузки для браузеров __на базе Chromium__ (таких как Chrome, Edge, Brave и т. д.) можно с помощью метода WebDriverIO `getPuppeteer`, предоставляющего доступ к Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Инициировать сессию CDP:
const cdpSession = await page.target().createCDPSession();
// Установить путь загрузки:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Обработка загрузки нескольких файлов

В сценариях с загрузкой нескольких файлов важно применять стратегии, позволяющие эффективно управлять каждой загрузкой и проверять её. Рассмотрите следующие подходы:

__Последовательная обработка загрузок:__ Загружайте файлы по одному и проверяйте каждую загрузку перед началом следующей, чтобы обеспечить упорядоченное выполнение и точную проверку.

__Параллельная обработка загрузок:__ Используйте методы асинхронного программирования, чтобы запускать загрузку нескольких файлов одновременно и сократить время выполнения тестов. Реализуйте надёжные механизмы проверки всех загрузок после их завершения.

## Вопросы кросс-браузерной совместимости

Хотя WebDriverIO предоставляет единый интерфейс для автоматизации браузеров, важно учитывать различия в поведении и возможностях браузеров. Рекомендуется тестировать функциональность загрузки файлов в разных браузерах, чтобы обеспечить совместимость и согласованность.

__Настройки для конкретных браузеров:__ Корректируйте настройки пути загрузки и стратегии ожидания с учётом различий в поведении и параметрах Chrome, Firefox, Edge и других поддерживаемых браузеров.

__Совместимость версий браузеров:__ Регулярно обновляйте WebDriverIO и браузеры, чтобы использовать новейшие функции и улучшения, сохраняя при этом совместимость с вашим набором тестов.