---
id: wdio-visual-service
title: Сервис сравнения изображений (визуальное регрессионное тестирование)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service - это сторонний пакет, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

Для документации по визуальному тестированию с WebdriverIO, пожалуйста, обратитесь к [документации](https://webdriver.io/docs/visual-testing). Этот проект содержит все необходимые модули для проведения визуальных тестов с WebdriverIO. В директории `./packages` вы найдёте:

-   `@wdio/visual-testing`: сервис WebdriverIO для интеграции визуального тестирования
-   `webdriver-image-comparison`: модуль сравнения изображений, который можно использовать для различных фреймворков автоматизации тестирования NodeJS, поддерживающих протокол WebDriver

## Storybook Runner (БЕТА)

<details>
  <summary>Нажмите, чтобы узнать больше о Storybook Runner БЕТА</summary>

> Storybook Runner всё ещё находится в стадии БЕТА, документация позже будет перемещена на страницы документации [WebdriverIO](https://webdriver.io/docs/visual-testing).

Этот модуль теперь поддерживает Storybook с новым визуальным раннером. Этот раннер автоматически сканирует локальный/удалённый экземпляр Storybook и создаёт снимки элементов каждого компонента. Это можно сделать, добавив

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

в ваши `services` и запустив `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` через командную строку.
По умолчанию будет использоваться Chrome в режиме headless.

> [!NOTE]
>
> -   Большинство опций визуального тестирования также будут работать для Storybook Runner, см. документацию [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Storybook Runner перезапишет все ваши возможности и может запускаться только на поддерживаемых браузерах, см. [`--browsers`](#browsers).
> -   Storybook Runner не поддерживает существующую конфигурацию, использующую возможности Multiremote, и выдаст ошибку.
> -   Storybook Runner поддерживает только веб-интерфейс для десктопа, а не для мобильных устройств.

### Опции сервиса Storybook Runner

Опции сервиса можно предоставить следующим образом

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Некоторые опции по умолчанию
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Опции storybook, см. описание опций CLI
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` может быть строкой ('example-button--secondary'),
                // массивом (['example-button--secondary', 'example-button--small'])
                // или регулярным выражением, которое нужно предоставить в виде строки ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Опционально - Позволяет переопределять путь к базовым изображениям. По умолчанию они группируются по категории и компоненту (например, forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Опции CLI Storybook Runner

#### `--additionalSearchParams`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** ''
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Добавляет дополнительные параметры поиска к URL Storybook.
См. документацию [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) для получения дополнительной информации. Строка должна быть действительной строкой URLSearchParams.

> [!NOTE]
> Двойные кавычки необходимы, чтобы предотвратить интерпретацию `&` как разделителя команд.
> Например, с `--additionalSearchParams="foo=bar&abc=def"` будет сгенерирован следующий URL Storybook для тестов историй: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `chrome`, вы можете выбрать из `chrome|firefox|edge|safari`
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **ПРИМЕЧАНИЕ:** Доступно только через CLI

Использует указанные браузеры для создания снимков компонентов

> [!NOTE]
> Убедитесь, что у вас установлены браузеры, на которых вы хотите запускать тесты, на вашей локальной машине

#### `--clip`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

При отключении создаст снимок области просмотра. При включении создаст снимки элементов на основе [`--clipSelector`](#clipselector), что уменьшит количество пустого пространства вокруг снимка компонента и размер снимка.

#### `--clipSelector`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `#storybook-root > :first-child` для Storybook V7 и `#root > :first-child:not(script):not(style)` для Storybook V6, см. также [`--version`](#version)
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Это селектор, который будет использоваться:

-   для выбора элемента, снимок которого нужно сделать
-   для элемента, который должен быть видимым перед созданием снимка экрана

#### `--devices`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** Вы можете выбрать из [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **ПРИМЕЧАНИЕ:** Доступно только через CLI

Использует предоставленные устройства, соответствующие [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts), для создания снимков компонентов

> [!NOTE]
>
> -   Если вам не хватает конфигурации устройства, не стесняйтесь отправить [запрос на функцию](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Это будет работать только с Chrome:
>     -   если вы предоставите `--devices`, то все экземпляры Chrome будут работать в режиме **мобильной эмуляции**
>     -   если вы также предоставите другие браузеры, кроме Chrome, например, `--devices --browsers=firefox,safari,edge`, то автоматически добавится Chrome в режиме мобильной эмуляции
> -   Storybook Runner по умолчанию создаст снимки элементов, если вы хотите увидеть полный эмулированный мобильный снимок экрана, то укажите `--clip=false` через командную строку
> -   Имя файла, например, будет выглядеть так: `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Тестирование мобильного сайта на десктопе с использованием мобильной эмуляции может быть полезным, но тестировщики должны знать, что существует много тонких различий, таких как:
>     -   совершенно другой GPU, что может привести к большим изменениям производительности;
>     -   мобильный UI не эмулируется (в частности, скрывающаяся URL-панель влияет на высоту страницы);
>     -   всплывающее окно разъяснения (где вы выбираете один из нескольких сенсорных целей) не поддерживается;
>     -   многие аппаратные API (например, событие orientationchange) недоступны.

#### `--headless`

-   **Тип:** `boolean`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **ПРИМЕЧАНИЕ:** Доступно только через CLI

По умолчанию запускает тесты в режиме headless (когда браузер поддерживает его) или может быть отключено

#### `--numShards`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** `true`
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Количество параллельных экземпляров, которые будут использоваться для запуска историй. Это будет ограничено параметром `maxInstances` в вашем файле `wdio.conf`.

> [!IMPORTANT]
> При запуске в режиме `headless` не увеличивайте число больше 20, чтобы предотвратить нестабильность из-за ограничений ресурсов

#### `--skipStories`

-   **Тип:** `string|regex`
-   **Обязательно:** Нет
-   **По умолчанию:** null
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Это может быть:

-   строка (`example-button--secondary,example-button--small`)
-   или регулярное выражение (`"/.*button.*/gm"`)

для пропуска определенных историй. Используйте `id` истории, который можно найти в URL истории. Например, `id` в этом URL `http://localhost:6006/?path=/story/example-page--logged-out` - это `example-page--logged-out`

#### `--url`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `http://127.0.0.1:6006`
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL, где размещен ваш экземпляр Storybook.

#### `--version`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** 7
-   **Пример:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Это версия Storybook, по умолчанию `7`. Это необходимо для определения, нужно ли использовать [`clipSelector`](#clipselector) версии V6.

### Интерактивное тестирование Storybook

Интерактивное тестирование Storybook позволяет взаимодействовать с вашим компонентом, создавая пользовательские скрипты с командами WDIO для приведения компонента в определенное состояние. Например, см. фрагмент кода ниже:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Выполняются два теста на двух разных компонентах. Каждый тест сначала устанавливает состояние, а затем делает снимок экрана. Вы также заметите, что была введена новая пользовательская команда, которую можно найти [здесь](#new-custom-command).

Указанный выше spec-файл можно сохранить в папке и добавить в командную строку следующей командой:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook runner сначала автоматически просканирует ваш экземпляр Storybook, а затем добавит ваши тесты к историям, которые нужно сравнить. Если вы не хотите, чтобы компоненты, которые вы используете для интерактивного тестирования, сравнивались дважды, вы можете добавить фильтр для удаления "стандартных" историй из сканирования, предоставив фильтр [`--skipStories`](#--skipstories). Это будет выглядеть так:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Новая пользовательская команда

К объекту `browser/driver` будет добавлена новая пользовательская команда `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })`, которая автоматически загрузит компонент и дождется его загрузки, поэтому вам не нужно использовать метод `browser.url('url.com')`. Она может использоваться следующим образом:

```ts
import { browser, expect } from "@wdio/globals";

describe("Storybook Interaction", () => {
    it("should create screenshots for the logged in state when it logs out", async () => {
        const componentId = "example-page--logged-in";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
        await $("button=Log out").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
    });

    it("should create screenshots for the logged out state when it logs in", async () => {
        const componentId = "example-page--logged-out";
        await browser.waitForStorybookComponentToBeLoaded({ id: componentId });

        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-out-state`
        );
        await $("button=Log in").click();
        await expect($("header")).toMatchElementSnapshot(
            `${componentId}-logged-in-state`
        );
    });
});
```

Опции:

#### `additionalSearchParams`

-   **Тип:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Обязательно:** Нет
-   **По умолчанию:** `new URLSearchParams()`
-   **Пример:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Добавляет дополнительные параметры поиска к URL Storybook, в примере выше URL будет `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
См. документацию [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) для получения дополнительной информации.

#### `clipSelector`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `#storybook-root > :first-child` для Storybook V7 и `#root > :first-child:not(script):not(style)` для Storybook V6
-   **Пример:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Это селектор, который будет использоваться:

-   для выбора элемента, снимок которого нужно сделать
-   для элемента, который должен быть видимым перед созданием снимка экрана

#### `id`

-   **Тип:** `string`
-   **Обязательно:** да
-   **Пример:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Используйте `id` истории, который можно найти в URL истории. Например, `id` в этом URL `http://localhost:6006/?path=/story/example-page--logged-out` - это `example-page--logged-out`

#### `timeout`

-   **Тип:** `number`
-   **Обязательно:** Нет
-   **По умолчанию:** 1100 миллисекунд
-   **Пример:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Максимальное время ожидания видимости компонента после загрузки на странице

#### `url`

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `http://127.0.0.1:6006`
-   **Пример:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

URL, где размещен ваш экземпляр Storybook.

</details>

## Участие в разработке

### Обновление пакетов

Вы можете обновить пакеты с помощью простого инструмента CLI. Убедитесь, что вы установили все зависимости, затем запустите

```sh
pnpm update.packages
```

Это запустит CLI, который задаст вам следующие вопросы

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Это приведет к следующим логам

<details>
    <summary>Откройте, чтобы увидеть пример логов</summary>
    
```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? Minor
? Do you want to update the package.json files? yes
Updating root 'package.json' for minor updates...
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/package.json
[====================] 38/38 100%

@typescript-eslint/eslint-plugin ^8.7.0 → ^8.8.0
@typescript-eslint/parser ^8.7.0 → ^8.8.0
@typescript-eslint/utils ^8.7.0 → ^8.8.0
@vitest/coverage-v8 ^2.1.1 → ^2.1.2
vitest ^2.1.1 → ^2.1.2

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/ocr-service/package.json
[====================] 11/11 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-reporter/package.json
[====================] 11/11 100%

eslint-config-next 14.2.13 → 14.2.14
next 14.2.13 → 14.2.14

Run pnpm install to install new versions.
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/visual-service/package.json
[====================] 5/5 100%

All dependencies match the minor package versions :)
Updating packages for minor updates in /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison...
Using pnpm
Upgrading /Users/wswebcreation/Git/wdio/visual-testing/packages/webdriver-image-comparison/package.json
[====================] 8/8 100%

All dependencies match the minor package versions :)
? Do you want to remove all "node_modules" and reinstall dependencies? yes
Removing root dependencies in /Users/wswebcreation/Git/wdio/visual-testing...
Removing dependencies in ocr-service...
Removing dependencies in visual-reporter...
Removing dependencies in visual-service...
Removing dependencies in webdriver-image-comparison...
? Would you like reinstall the dependencies? yes
Installing dependencies in /Users/wswebcreation/Git/wdio/visual-testing...

> @wdio/visual-testing-monorepo@ pnpm.install.workaround /Users/wswebcreation/Git/wdio/visual-testing
> pnpm install --shamefully-hoist

Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1274
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 1274, reused 1265, downloaded 0, added 1274, done

dependencies:

-   @wdio/ocr-service 2.0.0 <- packages/ocr-service
-   @wdio/visual-service 6.0.0 <- packages/visual-service

devDependencies:

-   @changesets/cli 2.27.8
-   @inquirer/prompts 5.5.0
-   @tsconfig/node20 20.1.4
-   @types/eslint 9.6.1
-   @types/jsdom 21.1.7
-   @types/node 20.16.4
-   @types/react 18.3.5
-   @types/react-dom 18.3.0
-   @types/xml2js 0.4.14
-   @typescript-eslint/eslint-plugin 8.8.0
-   @typescript-eslint/parser 8.8.0
-   @typescript-eslint/utils 8.8.0
-   @vitest/coverage-v8 2.1.2
-   @wdio/appium-service 9.1.2
-   @wdio/cli 9.1.2
-   @wdio/globals 9.1.2
-   @wdio/local-runner 9.1.2
-   @wdio/mocha-framework 9.1.2
-   @wdio/sauce-service 9.1.2
-   @wdio/shared-store-service 9.1.2
-   @wdio/spec-reporter 9.1.2
-   @wdio/types 9.1.2
-   eslint 9.11.1
-   eslint-plugin-import 2.30.0
-   eslint-plugin-unicorn 55.0.0
-   eslint-plugin-wdio 9.0.8
-   husky 9.1.6
-   jsdom 25.0.1
-   pnpm-run-all2 6.2.3
-   release-it 17.6.0
-   rimraf 6.0.1
-   saucelabs 8.0.0
-   ts-node 10.9.2
-   typescript 5.6.2
-   vitest 2.1.2
-   webdriverio 9.1.2

. prepare$ husky
└─ Done in 204ms
Done in 9.5s
All packages updated!

````

</details>

### Вопросы

Пожалуйста, присоединяйтесь к нашему [Discord](https://discord.webdriver.io) серверу, если у вас есть вопросы или проблемы с участием в этом проекте. Вы можете связаться с разработчиками на канале `🙏-contributing`.

### Проблемы

Если у вас есть вопросы, ошибки или предложения функций, пожалуйста, создайте issue. Перед отправкой issue, пожалуйста, просмотрите архив проблем, чтобы уменьшить количество дубликатов, и прочитайте [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Если вы не можете найти ответ, вы можете отправить issue, где вы можете:

-   🐛**Отчет об ошибке**: Создать отчет, чтобы помочь нам улучшить
-   📖**Документация**: Предложить улучшения или сообщить о отсутствующей/неясной документации.
-   💡**Запрос на функцию**: Предложить идею для этого модуля.
-   💬**Вопрос**: Задать вопросы.

### Процесс разработки

Чтобы создать PR для этого проекта и начать вносить свой вклад, выполните эту пошаговую инструкцию:

-   Форкните проект.
-   Клонируйте проект на свой компьютер

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Перейдите в директорию и настройте проект

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Запустите режим отслеживания, который будет автоматически транспилировать код

    ```sh
    $ pnpm watch
    ```

    для сборки проекта, запустите:

    ```sh
    $ pnpm build
    ```

-   Убедитесь, что ваши изменения не нарушают работу тестов, выполните:

    ```sh
    $ pnpm test
    ```

Этот проект использует [changesets](https://github.com/changesets/changesets) для автоматического создания списков изменений и релизов.

### Тестирование

Для проверки модуля необходимо выполнить несколько тестов. При добавлении PR все тесты должны как минимум проходить локальные тесты. Каждый PR автоматически тестируется с использованием Sauce Labs, см. [наш пайплайн GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Перед утверждением PR основные участники протестируют PR на эмуляторах/симуляторах / реальных устройствах.

#### Локальное тестирование

Сначала необходимо создать локальный базовый набор. Это можно сделать с помощью:

```sh
// С протоколом webdriver
$ pnpm run test.local.init
```

Эта команда создаст папку с названием `localBaseline`, которая будет содержать все базовые изображения.

Затем запустите:

```sh
// С протоколом webdriver
pnpm run test.local.desktop
```

Это запустит все тесты на локальной машине в Chrome.

#### Локальное тестирование Storybook Runner (Beta)

Сначала необходимо создать локальный базовый набор. Это можно сделать с помощью:

```sh
pnpm run test.local.desktop.storybook
```

Это запустит тесты Storybook с Chrome в режиме headless против демо-репозитория Storybook, расположенного по адресу https://govuk-react.github.io/govuk-react/.

Чтобы запустить тесты с большим количеством браузеров, вы можете выполнить

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Убедитесь, что у вас установлены браузеры, на которых вы хотите запускать тесты, на вашей локальной машине

#### CI тестирование с Sauce Labs (не требуется для PR)

Команда ниже используется для тестирования сборки на GitHub Actions, она может использоваться только там, а не для локальной разработки.

```
$ pnpm run test.saucelabs
```

Она будет тестировать множество конфигураций, которые можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Все PR автоматически проверяются с помощью Sauce Labs.

## Релизы

Чтобы выпустить версию любого из перечисленных выше пакетов, выполните следующие действия:

-   запустите [пайплайн релиза](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   будет создан PR релиза, который должен быть рассмотрен и одобрен другим участником WebdriverIO
-   объедините PR
-   снова запустите [пайплайн релиза](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   новая версия должна быть выпущена 🎉

## Благодарности

`@wdio/visual-testing` использует лицензию с открытым исходным кодом от [LambdaTest](https://www.lambdatest.com/) и [Sauce Labs](https://saucelabs.com/).