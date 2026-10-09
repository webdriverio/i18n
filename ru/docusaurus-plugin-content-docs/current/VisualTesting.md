---
id: visual-testing
title: Визуальное тестирование
description: "Сравнение скриншотов экранов, элементов или целых страниц с эталонными изображениями с помощью @wdio/visual-service, включая установку и использование."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Что он умеет?

WebdriverIO предоставляет сравнение изображений экранов, элементов или целых страниц для

-   🖥️ Десктопных браузеров (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Мобильных / планшетных браузеров (Chrome на эмуляторах Android / Safari на симуляторах iOS / симуляторах / реальных устройствах) через Appium
-   📱 Нативных приложений (эмуляторы Android / симуляторы iOS / реальные устройства) через Appium (🌟 **НОВОЕ** 🌟)
-   📳 Гибридных приложений через Appium

с помощью [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) — легковесного сервиса WebdriverIO.

Это позволяет:

-   сохранять или сравнивать скриншоты **экранов/элементов/целых страниц** с эталоном
-   автоматически **создавать эталон**, если он отсутствует
-   **закрывать пользовательские области** и даже **автоматически исключать** строку состояния и/или панели инструментов (только для мобильных устройств) во время сравнения
-   увеличивать размеры скриншотов элементов
-   **скрывать текст** при сравнении веб-сайтов, чтобы:
    -   **повысить стабильность** и избежать нестабильности, связанной с рендерингом шрифтов
    -   сосредоточиться только на **макете** веб-сайта
-   использовать **различные методы сравнения** и набор **дополнительных матчеров** для лучшей читаемости тестов
-   проверять, как ваш веб-сайт **поддерживает навигацию с помощью клавиши Tab на клавиатуре)**, см. также [Навигация по веб-сайту с помощью Tab](#tabbing-through-a-website)
-   и многое другое, см. параметры [сервиса](./visual-testing/service-options) и [методов](./visual-testing/method-options)

Сервис представляет собой легковесный модуль для получения необходимых данных и скриншотов для всех браузеров/устройств. Возможности сравнения обеспечиваются библиотекой [Pixelmatch](https://github.com/mapbox/pixelmatch) — быстрой и точной библиотекой перцептивного сравнения изображений, использующей цветовое пространство YIQ. Изображения обрабатываются с помощью [fast-png](https://github.com/image-js/fast-png) — PNG-кодека без нативных зависимостей.

:::info ПРИМЕЧАНИЕ для нативных/гибридных приложений
Методы `saveScreen`, `saveElement`, `checkScreen`, `checkElement` и матчеры `toMatchScreenSnapshot` и `toMatchElementSnapshot` можно использовать для нативных приложений/контекста.

Пожалуйста, используйте свойство `isHybridApp:true` в настройках сервиса, если хотите использовать его для гибридных приложений.
:::

:::caution Обновляетесь с v9 (или ниже)?

В `@wdio/visual-service` **v10** движок сравнения был изменён с **ResembleJS** на **[Pixelmatch](https://github.com/mapbox/pixelmatch)**. Pixelmatch использует перцептивную цветовую модель (YIQ) вместо необработанного RGB, поэтому процент несовпадения будет отличаться от v9. Это означает:

-   **Код ваших тестов менять не нужно.** Все имена методов, имена параметров и матчеры остались прежними.
-   **Возможно, потребуется обновить эталонные изображения.** После обновления запустите набор тестов и просмотрите все визуальные различия. Вы можете обновить отдельные непрошедшие эталоны с помощью `--update-visual-baseline` или удалить всю папку с эталонами, чтобы `autoSaveBaseline` создал их заново. Подробнее см. в [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline).

:::

## Установка

Проще всего добавить `@wdio/visual-service` в качестве dev-зависимости в ваш `package.json` с помощью:

```sh
npm install --save-dev @wdio/visual-service
```

## Использование

`@wdio/visual-service` можно использовать как обычный сервис. Настроить его в конфигурационном файле можно следующим образом:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Некоторые параметры, подробнее см. в документации
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... другие параметры
            },
        ],
    ],
    // ...
};
```

Другие параметры сервиса можно найти [здесь](/docs/visual-testing/service-options).

После настройки в конфигурации WebdriverIO вы можете добавлять визуальные проверки в [ваши тесты](/docs/visual-testing/writing-tests).

### Capabilities
Чтобы использовать модуль визуального тестирования, **не нужно добавлять никаких дополнительных параметров в capabilities**. Однако в некоторых случаях вы можете захотеть добавить дополнительные метаданные к визуальным тестам, например `logName`.

`logName` позволяет назначить пользовательское имя каждой capability, которое затем может быть включено в имена файлов изображений. Это особенно полезно для различения скриншотов, сделанных в разных браузерах, на разных устройствах или в разных конфигурациях.

Для этого определите `logName` в разделе `capabilities` и убедитесь, что параметр `formatImageName` в сервисе визуального тестирования ссылается на него. Вот как это можно настроить:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Пользовательское имя лога для Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Пользовательское имя лога для Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Некоторые параметры, подробнее см. в документации
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Формат ниже будет использовать `logName` из capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... другие параметры
            },
        ],
    ],
    // ...
};
```

#### Как это работает
1. Настройка `logName`:

    - В разделе `capabilities` назначьте уникальный `logName` каждому браузеру или устройству. Например, `chrome-mac-15` обозначает тесты, запускаемые в Chrome на macOS версии 15.

2. Пользовательское именование изображений:

    - Параметр `formatImageName` встраивает `logName` в имена файлов скриншотов. Например, если `tag` — homepage, а разрешение — `1920x1080`, итоговое имя файла может выглядеть так:

        `homepage-chrome-mac-15-1920x1080.png`

3. Преимущества пользовательского именования:

    - Различать скриншоты из разных браузеров или устройств становится гораздо проще, особенно при управлении эталонами и отладке расхождений.

4. Примечание о значениях по умолчанию:

    -Если `logName` не задан в capabilities, параметр `formatImageName` отобразит его как пустую строку в именах файлов (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

Мы также поддерживаем [multi-remote](https://webdriver.io/docs/multiremote/). Чтобы это работало корректно, убедитесь, что вы добавили `wdio-ics:options` в ваши
capabilities, как показано ниже. Это обеспечит уникальное имя для каждого скриншота.

[Написание тестов](/docs/visual-testing/writing-tests) ничем не будет отличаться от использования [testrunner](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ВОТ ЭТО!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // ВОТ ЭТО!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Программный запуск

Вот минимальный пример использования `@wdio/visual-service` через параметры `remote`:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// "Запустите" сервис, чтобы добавить пользовательские команды в `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// или используйте это ТОЛЬКО для сохранения скриншота
await browser.saveFullPageScreen("examplePaged", {});

// или используйте это для проверки. Оба метода не нужно комбинировать, см. FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Навигация по веб-сайту с помощью Tab

Вы можете проверить, доступен ли веб-сайт при использовании клавиши <kbd>TAB</kbd> на клавиатуре. Тестирование этой части доступности всегда было трудоёмкой (ручной) работой, которую довольно сложно автоматизировать.
С помощью методов `saveTabbablePage` и `checkTabbablePage` теперь можно рисовать линии и точки на веб-сайте, чтобы проверить порядок перехода по Tab.

Имейте в виду, что это полезно только для десктопных браузеров и **НЕ\*\*** для мобильных устройств. Все десктопные браузеры поддерживают эту функцию.

:::note

Эта работа вдохновлена записью в блоге [Viv Richards](https://github.com/vivrichards600) ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Способ выбора элементов, доступных через Tab, основан на модуле [tabbable](https://github.com/davidtheclark/tabbable). Если возникают проблемы с навигацией по Tab, ознакомьтесь с [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) и особенно с разделом [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Как это работает

Оба метода создают элемент `canvas` на вашем веб-сайте и рисуют линии и точки, чтобы показать, куда переместится фокус при нажатии TAB конечным пользователем. После этого создаётся скриншот всей страницы, чтобы дать вам хороший обзор последовательности переходов.

:::important

**Используйте `saveTabbablePage` только тогда, когда нужно создать скриншот и НЕ нужно сравнивать его **с **эталонным** изображением.\*\*\*\*

:::

Если вы хотите сравнить последовательность переходов по Tab с эталоном, используйте метод `checkTabbablePage`. Вам **НЕ** нужно использовать оба метода вместе. Если эталонное изображение уже создано (что может быть сделано автоматически, если указать `autoSaveBaseline: true` при создании экземпляра сервиса),
`checkTabbablePage` сначала создаст _фактическое_ изображение, а затем сравнит его с эталоном.

##### Параметры

Оба метода используют те же параметры, что и `saveFullPageScreen` или `compareFullPageScreen`.

#### Пример

Вот пример того, как работает навигация по Tab на нашем [тестовом веб-сайте](https://guinea-pig.webdriver.io/image-compare.html):

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Автоматическое обновление непрошедших визуальных снимков

Обновляйте эталонные изображения через командную строку, добавив аргумент `--update-visual-baseline`. Это

-   автоматически скопирует фактический сделанный скриншот и поместит его в папку эталонов
-   при наличии различий позволит тесту пройти, поскольку эталон был обновлён

**Использование:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

При запуске в режиме логирования info/debug вы увидите следующие добавленные логи

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Поддержка TypeScript

Этот модуль включает поддержку TypeScript, что позволяет пользоваться автодополнением, типобезопасностью и улучшенным опытом разработки при работе с сервисом визуального тестирования.

### Шаг 1: Добавьте определения типов
Чтобы TypeScript распознавал типы модуля, добавьте следующую запись в поле types вашего tsconfig.json:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Шаг 2: Включите типобезопасность для параметров сервиса
Чтобы включить проверку типов для параметров сервиса, обновите конфигурацию WebdriverIO:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Импортируйте определение типа
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Параметры сервиса
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Обеспечивает типобезопасность
        ],
    ],
    // ...
};
```

## Системные требования

### Версия 10 и выше (текущая)

Для версии 10 и выше этот модуль не имеет дополнительных системных зависимостей помимо общих [требований проекта](/docs/gettingstarted#system-requirements). Он использует [Pixelmatch](https://github.com/mapbox/pixelmatch) для перцептивного сравнения изображений и [fast-png](https://github.com/image-js/fast-png) для кодирования/декодирования изображений. Обе библиотеки написаны на чистом JavaScript и не имеют нативных зависимостей.

### Версии с 5 по 9 (устаревшие)

Версии с 5 по 9 использовали [Jimp](https://github.com/jimp-dev/jimp) — библиотеку обработки изображений для Node, полностью написанную на JavaScript, без нативных зависимостей. Дополнительные системные зависимости не требовались.

### Версия 4 и ниже

Для версии 4 и ниже этот модуль использует [Canvas](https://github.com/Automattic/node-canvas) — реализацию canvas для Node.js. Canvas зависит от [Cairo](https://cairographics.org/).

#### Подробности установки

По умолчанию бинарные файлы для macOS, Linux и Windows загружаются во время выполнения `npm install` в вашем проекте. Если ваша ОС или архитектура процессора не поддерживается, модуль будет скомпилирован в вашей системе. Для этого требуется ряд зависимостей, включая Cairo и Pango.

Подробную информацию об установке см. в [вики node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages). Ниже приведены однострочные инструкции по установке для распространённых операционных систем. Обратите внимание, что `libgif/giflib`, `librsvg` и `libjpeg` являются необязательными и нужны только для поддержки GIF, SVG и JPEG соответственно. Требуется Cairo v1.10.0 или новее.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     С помощью [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Если вы недавно обновились до Mac OS X v10.11+ и испытываете проблемы при компиляции, выполните следующую команду: `xcode-select --install`. Подробнее о проблеме читайте [на Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Если у вас установлен Xcode 10.0 или новее, для сборки из исходного кода требуется NPM 6.4.1 или новее.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    См. [вики](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    См. [вики](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>