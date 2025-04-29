---
id: wdio-ocr-service
title: Сервіс тестування OCR
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/ocr-service є пакетом сторонніх розробників, для отримання додаткової інформації перегляньте [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/ocr-service)

Для документації щодо візуального тестування з WebdriverIO, будь ласка, зверніться до [документації](https://webdriver.io/docs/visual-testing). Цей проект містить усі відповідні модулі для запуску візуальних тестів з WebdriverIO. У директорії `./packages` ви знайдете:

-   `@wdio/visual-testing`: сервіс WebdriverIO для інтеграції візуального тестування
-   `webdriver-image-comparison`: модуль порівняння зображень, який можна використовувати для різних фреймворків автоматизації тестування NodeJS, що підтримують протокол WebDriver

## Storybook Runner (BETA)

<details>
  <summary>Натисніть, щоб дізнатися більше про Storybook Runner BETA</summary>

> Storybook Runner все ще перебуває в BETA, документація пізніше буде перенесена на сторінки документації [WebdriverIO](https://webdriver.io/docs/visual-testing).

Цей модуль тепер підтримує Storybook з новим Visual Runner. Цей runner автоматично сканує локальний/віддалений екземпляр Storybook і створює знімки елементів для кожного компонента. Це можна зробити, додавши

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

до ваших `services` і запустивши `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` через командний рядок.
За замовчуванням він використовуватиме Chrome у безголовому режимі як браузер за замовчуванням.

> [!NOTE]
>
> -   Більшість опцій Visual Testing також працюватимуть для Storybook Runner, дивіться документацію [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Storybook Runner перезапише всі ваші capabilities і може працювати лише на тих браузерах, які він підтримує, дивіться [`--browsers`](#browsers).
> -   Storybook Runner не підтримує наявну конфігурацію, яка використовує можливості Multiremote, і викине помилку.
> -   Storybook Runner підтримує лише Desktop Web, а не Mobile Web.

### Опції сервісу Storybook Runner

Опції сервісу можна надати наступним чином

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Some default options
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // The storybook options, see cli options for the description
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` can be a string ('example-button--secondary'),
                // an array (['example-button--secondary', 'example-button--small'])
                // or a regex which needs to be provided as as string ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Optional - Allows overriding the baselines path. By default it will group the baselines by category and component (e.g. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Опції командного рядка Storybook Runner

#### `--additionalSearchParams`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** ''
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Додає додаткові параметри пошуку до URL Storybook.
Дивіться документацію [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) для отримання додаткової інформації. Рядок повинен бути дійсним рядком URLSearchParams.

> [!NOTE]
> Подвійні лапки потрібні, щоб запобігти інтерпретації `&` як роздільника команд.
> Наприклад, з `--additionalSearchParams="foo=bar&abc=def"` буде згенеровано наступний URL Storybook для тестування історій: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `chrome`, ви можете вибрати з `chrome|firefox|edge|safari`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **ПРИМІТКА:** Доступно лише через CLI

Буде використовувати надані браузери для створення знімків компонентів

> [!NOTE]
> Переконайтеся, що на вашій локальній машині встановлені браузери, які ви хочете запустити

#### `--clip`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

При вимкненні буде створено знімок області перегляду. При увімкненні буде створено знімки елементів на основі [`--clipSelector`](#clipselector), що зменшить кількість пустого простору навколо знімка компонента та зменшить розмір знімка.

#### `--clipSelector`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `#storybook-root > :first-child` для Storybook V7 та `#root > :first-child:not(script):not(style)` для Storybook V6, дивіться також [`--version`](#version)
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Це селектор, який буде використовуватися:

-   для вибору елемента, знімок якого потрібно зробити
-   для елемента, на видимість якого потрібно чекати перед створенням знімка

#### `--devices`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** Ви можете вибрати з [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **ПРИМІТКА:** Доступно лише через CLI

Буде використовувати надані пристрої, які відповідають [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts) для створення знімків компонентів

> [!NOTE]
>
> -   Якщо вам не вистачає конфігурації пристрою, будь ласка, подайте [запит на функцію](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Це працюватиме тільки з Chrome:
>     -   якщо ви надаєте `--devices`, то всі екземпляри Chrome будуть працювати в режимі **Mobile Emulation**
>     -   якщо ви також надаєте інші браузери, крім Chrome, наприклад, `--devices --browsers=firefox,safari,edge`, він автоматично додасть Chrome в режимі емуляції мобільних пристроїв
> -   Storybook Runner за замовчуванням створюватиме знімки елементів, якщо ви хочете побачити повний знімок мобільного емулятора, то вкажіть `--clip=false` через командний рядок
> -   Ім'я файлу буде виглядати, наприклад, так: `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Тестування мобільного сайту на десктопі за допомогою мобільної емуляції може бути корисним, але тестувальники повинні знати, що існує багато незначних відмінностей, таких як:
>     -   повністю інший GPU, що може призвести до великих змін продуктивності;
>     -   мобільний UI не емулюється (зокрема, приховування URL-рядка впливає на висоту сторінки);
>     -   спливаюче вікно розмежування (де ви вибираєте один із кількох цільових сенсорних елементів) не підтримується;
>     -   багато апаратних API (наприклад, подія orientationchange) недоступні.

#### `--headless`

-   **Тип:** `boolean`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **ПРИМІТКА:** Доступно лише через CLI

За замовчуванням буде запускати тести в безголовому режимі (якщо браузер його підтримує) або може бути вимкнений

#### `--numShards`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Це буде кількість паралельних екземплярів, які будуть використовуватися для запуску історій. Це буде обмежено параметром `maxInstances` у вашому файлі `wdio.conf`.

> [!IMPORTANT]
> При роботі в режимі `headless` не збільшуйте кількість більше 20, щоб запобігти нестабільності через обмеження ресурсів

#### `--skipStories`

-   **Тип:** `string|regex`
-   **Обов'язково:** Ні
-   **За замовчуванням:** null
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Це може бути:

-   рядок (`example-button--secondary,example-button--small`)
-   або регулярний вираз (`"/.*button.*/gm"`)

для пропуску певних історій. Використовуйте `id` історії, який можна знайти в URL історії. Наприклад, `id` в цьому URL `http://localhost:6006/?path=/story/example-page--logged-out` це `example-page--logged-out`

#### `--url`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `http://127.0.0.1:6006`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL, де розміщений ваш екземпляр Storybook.

#### `--version`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** 7
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Це версія Storybook, за замовчуванням `7`. Це потрібно для того, щоб знати, чи потрібно використовувати [`clipSelector`](#clipselector) для V6.

### Тестування взаємодії в Storybook

Тестування взаємодії в Storybook дозволяє взаємодіяти з вашим компонентом, створюючи власні скрипти з командами WDIO для встановлення компонента в певний стан. Наприклад, дивіться наведений нижче фрагмент коду:

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

Виконуються два тести на двох різних компонентах. Кожен тест спочатку встановлює стан, а потім робить знімок екрану. Ви також помітите, що була введена нова користувацька команда, яку можна знайти [тут](#new-custom-command).

Вищезазначений spec-файл можна зберегти в папці та додати до командного рядка такою командою:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook runner спочатку автоматично сканує ваш екземпляр Storybook, а потім додає ваші тести до історій, які потрібно порівняти. Якщо ви не хочете, щоб компоненти, які ви використовуєте для тестування взаємодії, порівнювалися двічі, ви можете додати фільтр для видалення "стандартних" історій зі сканування, надавши фільтр [`--skipStories`](#--skipstories). Це виглядатиме так:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Нова користувацька команда

Нова користувацька команда під назвою `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` буде додана до об'єкта `browser/driver`, що автоматично завантажить компонент і чекатиме, поки він буде готовий, тому вам не потрібно використовувати метод `browser.url('url.com')`. Її можна використовувати так:

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

Опції:

#### `additionalSearchParams`

-   **Тип:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Обов'язково:** Ні
-   **За замовчуванням:** `new URLSearchParams()`
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    additionalSearchParams: new URLSearchParams({ foo: "bar", abc: "def" }),
    id: "componentId",
});
```

Це додасть додаткові параметри пошуку до URL Storybook, у наведеному вище прикладі URL буде `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.
Дивіться документацію [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) для отримання додаткової інформації.

#### `clipSelector`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `#storybook-root > :first-child` для Storybook V7 та `#root > :first-child:not(script):not(style)` для Storybook V6
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    clipSelector: "#your-selector",
    id: "componentId",
});
```

Це селектор, який буде використовуватися:

-   для вибору елемента, знімок якого потрібно зробити
-   для елемента, на видимість якого потрібно чекати перед створенням знімка

#### `id`

-   **Тип:** `string`
-   **Обов'язково:** так
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Використовуйте `id` історії, який можна знайти в URL історії. Наприклад, `id` в цьому URL `http://localhost:6006/?path=/story/example-page--logged-out` є `example-page--logged-out`

#### `timeout`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** 1100 мілісекунд
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    timeout: 20000,
});
```

Максимальний час очікування видимості компонента після завантаження на сторінці

#### `url`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `http://127.0.0.1:6006`
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({
    id: "componentId",
    url: "https://your.url",
});
```

URL, де розміщений ваш екземпляр Storybook.

</details>

## Внески

### Оновлення пакетів

Ви можете оновити пакети за допомогою простого інструменту CLI. Переконайтеся, що ви встановили всі залежності, потім можете запустити

```sh
pnpm update.packages
```

Це викличе CLI, який запитає вас наступні питання

```logs
==========================
🤖 Package update Wizard 🧙
==========================

? Which version target would you like to update to? (Minor|Latest)
? Do you want to update the package.json files? (Y/n)
? Do you want to remove all "node_modules" and reinstall dependencies? (Y/n)
? Would you like reinstall the dependencies? (Y/n)
```

Це призведе до наступних логів

<details>
    <summary>Відкрийте, щоб побачити приклад логів</summary>
    
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

### Питання

Будь ласка, приєднуйтесь до нашого [Discord](https://discord.webdriver.io) сервера, якщо у вас є питання або проблеми з внеском у цей проект. Ви можете знайти нас в каналі `🙏-contributing`.

### Проблеми

Якщо у вас є питання, помилки або запити на функції, будь ласка, створіть задачу. Перед тим як подати задачу, будь ласка, пошукайте в архіві задач, щоб зменшити дублювання, і прочитайте [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Якщо ви не можете знайти відповіді, ви можете подати задачу, де ви можете:

-   🐛**Звіт про помилку**: Створіть звіт, щоб допомогти нам покращити
-   📖**Документація**: Запропонуйте покращення або повідомте про відсутню/незрозумілу документацію.
-   💡**Запит на функцію**: Запропонуйте ідею для цього модуля.
-   💬**Питання**: Задайте питання.

### Процес розробки

Щоб створити PR для цього проекту та почати робити внесок, дотримуйтесь цього покрокового посібника:

-   Зробіть форк проекту.
-   Клонуйте проект кудись на ваш комп'ютер

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Перейдіть до каталогу та налаштуйте проект

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Запустіть режим спостереження, який автоматично транспілюватиме код

    ```sh
    $ pnpm watch
    ```

    для збірки проекту запустіть:

    ```sh
    $ pnpm build
    ```

-   Переконайтеся, що ваші зміни не порушують жодних тестів, запустіть:

    ```sh
    $ pnpm test
    ```

Цей проект використовує [changesets](https://github.com/changesets/changesets) для автоматичного створення журналів змін та релізів.

### Тестування

Для тестування модуля необхідно виконати кілька тестів. При додаванні PR всі тести повинні принаймні пройти локальні тести. Кожен PR автоматично тестується на Sauce Labs, дивіться [наш конвеєр GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Перед затвердженням PR основні контрибьютори протестують PR на емуляторах/симуляторах / реальних пристроях.

#### Локальне тестування

Спочатку потрібно створити локальний базовий рівень. Це можна зробити за допомогою:

```sh
// With the webdriver protocol
$ pnpm run test.local.init
````

Ця команда створить папку під назвою `localBaseline`, яка буде містити всі базові зображення.

Потім запустіть:

```sh
// With the webdriver protocol
pnpm run test.local.desktop
```

Це запустить всі тести на локальній машині у Chrome.

#### Локальне тестування Storybook Runner (Beta)

Спочатку потрібно створити локальний базовий рівень. Це можна зробити за допомогою:

```sh
pnpm run test.local.desktop.storybook
```

Це запустить тести Storybook з Chrome у безголовому режимі проти демо-репозиторію Storybook, розташованого за адресою https://govuk-react.github.io/govuk-react/.

Щоб запустити тести з більшою кількістю браузерів, ви можете запустити

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Переконайтеся, що на вашій локальній машині встановлені браузери, які ви хочете запустити

#### CI тестування з Sauce Labs (не потрібно для PR)

Команда нижче використовується для тестування збірки на GitHub Actions, вона може бути використана лише там, а не для локальної розробки.

```
$ pnpm run test.saucelabs
```

Вона тестуватиме на основі багатьох конфігурацій, які можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Всі PR автоматично перевіряються на Sauce Labs.

## Випуск версій

Щоб випустити версію будь-якого з вищеперелічених пакетів, зробіть наступне:

-   запустіть [конвеєр випуску](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   створюється PR випуску, попросіть його переглянути та схвалити іншого члена WebdriverIO
-   злийте PR
-   знову запустіть [конвеєр випуску](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   нова версія повинна бути випущена 🎉

## Подяки

`@wdio/visual-testing` використовує ліцензію з відкритим кодом від [LambdaTest](https://www.lambdatest.com/) та [Sauce Labs](https://saucelabs.com/).