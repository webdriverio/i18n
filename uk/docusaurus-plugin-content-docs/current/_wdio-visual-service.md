---
id: wdio-visual-service
title: Сервіс порівняння зображень (Візуальне регресійне тестування)
custom_edit_url: https://github.com/webdriverio/visual-testing/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @wdio/visual-service є пакетом від третьої сторони, для отримання додаткової інформації дивіться [GitHub](https://github.com/webdriverio/visual-testing) | [npm](https://www.npmjs.com/package/@wdio/visual-service)

Для документації з візуального тестування з WebdriverIO, будь ласка, зверніться до [документації](https://webdriver.io/docs/visual-testing). Цей проект містить всі відповідні модулі для проведення візуальних тестів з WebdriverIO. У директорії `./packages` ви знайдете:

-   `@wdio/visual-testing`: сервіс WebdriverIO для інтеграції візуального тестування
-   `webdriver-image-comparison`: модуль порівняння зображень, який можна використовувати для різних фреймворків автоматизації тестування NodeJS, що підтримують протокол WebDriver

## Storybook Runner (БЕТА)

<details>
  <summary>Натисніть, щоб дізнатися більше документації про Storybook Runner БЕТА</summary>

> Storybook Runner все ще знаходиться в БЕТА-версії, документація пізніше буде перенесена на сторінки документації [WebdriverIO](https://webdriver.io/docs/visual-testing).

Цей модуль тепер підтримує Storybook з новим візуальним раннером. Цей раннер автоматично сканує локальний/віддалений екземпляр Storybook і створює елементні знімки екрану кожного компонента. Це можна зробити, додавши

```ts
export const config: WebdriverIO.Config = {
    // ...
    services: ["visual"],
    // ....
};
```

до ваших `services` і запустивши `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook` через командний рядок.
За замовчуванням використовується Chrome у безголовому режимі.

> [!NOTE]
>
> -   Більшість опцій візуального тестування також працюватимуть для Storybook Runner, дивіться документацію [WebdriverIO](https://webdriver.io/docs/visual-testing).
> -   Storybook Runner перевизначить всі ваші можливості і може запускатися тільки на браузерах, які він підтримує, див. [`--browsers`](#browsers).
> -   Storybook Runner не підтримує існуючу конфігурацію, яка використовує Multiremote capabilities і видасть помилку.
> -   Storybook Runner підтримує тільки Desktop Web, а не Mobile Web.

### Опції сервісу Storybook Runner

Опції сервісу можна надати так

```ts
export const config: WebdriverIO.Config  = {
    // ...
    services: [
      [
        'visual',
        {
            // Деякі опції за замовчуванням
            baselineFolder: join(process.cwd(), './__snapshots__/'),
            debug: true,
            // Опції storybook, дивіться опції CLI для опису
            storybook: {
                additionalSearchParams: new URLSearchParams({foo: 'bar', abc: 'def'}),
                clip: false,
                clipSelector: ''#some-id,
                numShards: 4,
                // `skipStories` може бути рядком ('example-button--secondary'),
                // масивом (['example-button--secondary', 'example-button--small'])
                // або регулярним виразом, який потрібно надати як рядок ("/.*button.*/gm")
                skipStories: ['example-button--secondary', 'example-button--small'],
                url: 'https://www.bbc.co.uk/iplayer/storybook/',
                version: 6,
                // Опційно - Дозволяє перевизначити шлях до базових знімків. За замовчуванням вони групуються за категорією та компонентом (напр. forms/input/baseline.png)
                getStoriesBaselinePath: (category, component) => `path__${category}__${component}`,
            },
        },
      ],
    ],
    // ....
}
```

### Опції CLI для Storybook Runner

#### `--additionalSearchParams`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** ''
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --additionalSearchParams="foo=bar&abc=def"`

Додає додаткові параметри пошуку до URL Storybook.
Дивіться документацію [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) для отримання додаткової інформації. Рядок має бути валідним рядком URLSearchParams.

> [!NOTE]
> Подвійні лапки потрібні, щоб запобігти інтерпретації `&` як роздільника команд.
> Наприклад, з `--additionalSearchParams="foo=bar&abc=def"` буде створено наступний URL Storybook для тестування історій: `http://storybook.url/iframe.html?id=story-id&foo=bar&abc=def`.

#### `--browsers`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `chrome`, ви можете вибрати з `chrome|firefox|edge|safari`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --browsers=chrome,firefox,edge,safari`
-   **ПРИМІТКА:** Доступно тільки через CLI

Використовуватиме вказані браузери для створення знімків екрану компонентів

> [!NOTE]
> Переконайтеся, що у вас встановлені браузери, які ви хочете використовувати, на локальній машині

#### `--clip`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clip=false`

Якщо вимкнено, буде створено знімок екрану всього вікна. Якщо включено, буде створено знімки екрану елементів на основі [`--clipSelector`](#clipselector), що зменшить кількість білого простору навколо знімка компонента та зменшить розмір знімка.

#### `--clipSelector`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `#storybook-root > :first-child` для Storybook V7 та `#root > :first-child:not(script):not(style)` для Storybook V6, див. також [`--version`](#version)
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --clipSelector="#some-id"`

Це селектор, який буде використовуватися:

-   для вибору елемента, знімок якого потрібно зробити
-   для елемента, який потрібно дочекатися, щоб він став видимим, перед створенням знімка

#### `--devices`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** Ви можете вибрати з [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts)
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --devices="iPhone 14 Pro Max","Pixel 3 XL"`
-   **ПРИМІТКА:** Доступно тільки через CLI

Використовуватиме вказані пристрої, які відповідають [`deviceDescriptors.ts`](https://github.com/webdriverio/visual-testing/blob/main/./packages/service/src/storybook/deviceDescriptors.ts), для створення знімків екрану компонентів

> [!NOTE]
>
> -   Якщо вам не вистачає конфігурації пристрою, будь ласка, не соромтеся подати [запит на функцію](https://github.com/webdriverio/visual-testing/issues/new?assignees=&labels=&projects=&template=--feature-request.md)
> -   Це працюватиме тільки з Chrome:
>     -   якщо ви надасте `--devices`, то всі екземпляри Chrome працюватимуть у режимі **Mobile Emulation**
>     -   якщо ви також вказуєте інші браузери, окрім Chrome, наприклад, `--devices --browsers=firefox,safari,edge`, то Chrome у режимі мобільної емуляції буде автоматично додано
> -   Storybook Runner за замовчуванням створює знімки елементів, якщо ви хочете побачити повний знімок екрану з мобільною емуляцією, то вкажіть `--clip=false` через командний рядок
> -   Ім'я файлу буде, наприклад, виглядати так `__snapshots__/example/button/desktop_chrome/example-button--large-local-chrome-iPhone-14-Pro-Max-430x932-dpr-3.png`
> -   **[SRC:](https://chromedriver.chromium.org/mobile-emulation#h.p_ID_167)** Тестування мобільного веб-сайту на десктопі з використанням мобільної емуляції може бути корисним, але тестувальники повинні знати, що існує багато тонких відмінностей, таких як:
>     -   повністю інший GPU, що може призвести до великих змін у продуктивності;
>     -   мобільний інтерфейс не емулюється (зокрема, приховування URL-бару впливає на висоту сторінки);
>     -   спливаюче вікно роз'яснення (де ви вибираєте одну з кількох дотичних цілей) не підтримується;
>     -   багато апаратних API (наприклад, подія orientationchange) недоступні.

#### `--headless`

-   **Тип:** `boolean`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --headless=false`
-   **ПРИМІТКА:** Доступно тільки через CLI

За замовчуванням запускає тести в безголовому режимі (якщо браузер його підтримує) або можна вимкнути

#### `--numShards`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `true`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --numShards=10`

Це кількість паралельних екземплярів, які будуть використовуватися для запуску історій. Це буде обмежено `maxInstances` у вашому файлі `wdio.conf`.

> [!IMPORTANT]
> При запуску в `headless`-режимі не збільшуйте кількість до більше ніж 20, щоб запобігти нестабільності через обмеження ресурсів

#### `--skipStories`

-   **Тип:** `string|regex`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** null
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --skipStories="/.*button.*/gm"`

Це може бути:

-   рядок (`example-button--secondary,example-button--small`)
-   або регулярний вираз (`"/.*button.*/gm"`)

для пропуску певних історій. Використовуйте `id` історії, який можна знайти в URL історії. Наприклад, `id` в цьому URL `http://localhost:6006/?path=/story/example-page--logged-out` - це `example-page--logged-out`

#### `--url`

-   **Тип:** `string`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** `http://127.0.0.1:6006`
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --url="https://example.com"`

URL, де розміщений ваш екземпляр Storybook.

#### `--version`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
-   **За замовчуванням:** 7
-   **Приклад:** `npx wdio tests/configs/wdio.local.desktop.storybook.conf.ts --storybook --version=6`

Це версія Storybook, за замовчуванням `7`. Це потрібно, щоб знати, чи потрібно використовувати [`clipSelector`](#clipselector) для V6.

### Storybook Interaction Testing

Storybook Interaction Testing дозволяє взаємодіяти з вашим компонентом, створюючи користувацькі скрипти з командами WDIO для встановлення компонента у певний стан. Наприклад, див. фрагмент коду нижче:

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

Виконуються два тести на двох різних компонентах. Кожен тест спочатку встановлює стан, а потім робить знімок екрану. Ви також помітите, що було введено нову власну команду, яку можна знайти [тут](#new-custom-command).

Вищевказаний spec-файл можна зберегти в папці та додати до командного рядка наступною командою:

```sh
pnpm run test.local.desktop.storybook.localhost -- --spec='tests/specs/storybook-interaction/*.ts'
```

Storybook Runner спочатку автоматично просканує ваш екземпляр Storybook, а потім додасть ваші тести до історій, які потрібно порівняти. Якщо ви не хочете, щоб компоненти, які ви використовуєте для тестування взаємодії, порівнювалися двічі, ви можете додати фільтр для видалення "типових" історій зі сканування, надавши фільтр [`--skipStories`](#--skipstories). Це виглядатиме так:

```sh
pnpm run test.local.desktop.storybook.localhost -- --skipStories="/example-page.*/gm" --spec='tests/specs/storybook-interaction/*.ts'
```

### Нова власна команда

Нова власна команда `browser.waitForStorybookComponentToBeLoaded({ id: 'componentId' })` буде додана до об'єкту `browser/driver`, яка автоматично завантажить компонент і чекатиме, доки він не буде готовий, тому вам не потрібно використовувати метод `browser.url('url.com')`. Її можна використовувати так:

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

Опції такі:

#### `additionalSearchParams`

-   **Тип:** [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
-   **Обов'язковий:** Ні
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
-   **Обов'язковий:** Ні
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
-   для елемента, який потрібно дочекатися, щоб він став видимим, перед створенням знімка

#### `id`

-   **Тип:** `string`
-   **Обов'язковий:** так
-   **Приклад:**

```ts
await browser.waitForStorybookComponentToBeLoaded({ '#your-selector', id: 'componentId' })
```

Використовуйте `id` історії, який можна знайти в URL історії. Наприклад, `id` в цьому URL `http://localhost:6006/?path=/story/example-page--logged-out` - це `example-page--logged-out`

#### `timeout`

-   **Тип:** `number`
-   **Обов'язковий:** Ні
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
-   **Обов'язковий:** Ні
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

## Внесок

### Оновлення пакетів

Ви можете оновити пакети за допомогою простого CLI-інструменту. Переконайтеся, що ви встановили всі залежності, а потім запустіть

```sh
pnpm update.packages
```

Це запустить CLI, який поставить вам наступні запитання

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

Будь ласка, приєднуйтесь до нашого [серверу Discord](https://discord.webdriver.io), якщо у вас є питання або проблеми з внеском до цього проекту. Вловіть наших контриб'юторів у каналі `🙏-contributing`.

### Проблеми

Якщо у вас є питання, помилки або функціональні запити, будь ласка, створіть проблему. Перед відправкою проблеми, будь ласка, пошукайте в архіві проблем, щоб зменшити дублювання, і прочитайте [FAQ](https://webdriver.io/docs/visual-testing/faq/).

Якщо ви не можете знайти відповідь там, ви можете надіслати проблему, де ви можете відправити:

-   🐛**Звіт про помилку**: Створіть звіт, щоб допомогти нам покращити
-   📖**Документація**: Запропонуйте покращення або повідомте про відсутню/незрозумілу документацію.
-   💡**Запит на функцію**: Запропонуйте ідею для цього модуля.
-   💬**Питання**: Задайте питання.

### Робочий процес розробки

Щоб створити PR для цього проекту і почати вносити свій внесок, дотримуйтесь цього покрокового посібника:

-   Форкніть проект.
-   Клонуйте проект кудись на свій комп'ютер

    ```sh
    $ git clone https://github.com/webdriverio/visual-testing.git
    ```

-   Перейдіть до директорії та налаштуйте проект

    ```sh
    $ cd visual-testing
    $ corepack enable
    $ pnpm pnpm.install.workaround
    ```

-   Запустіть режим спостереження, який автоматично транспілює код

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

Цей проект використовує [changesets](https://github.com/changesets/changesets) для автоматичного створення змін логів і релізів.

### Тестування

Потрібно виконати кілька тестів, щоб мати можливість тестувати модуль. При додаванні PR всі тести повинні принаймні пройти локальні тести. Кожен PR автоматично тестується на Sauce Labs, див. [наш конвеєр GitHub Actions](https://github.com/webdriverio/visual-testing/actions/workflows/tests.yml). Перед затвердженням PR основні контриб'ютори протестують PR на емуляторах/симуляторах / реальних пристроях.

#### Локальне тестування

Спочатку потрібно створити локальну базову лінію. Це можна зробити за допомогою:

```sh
// З протоколом webdriver
$ pnpm run test.local.init
```

Ця команда створить папку під назвою `localBaseline`, яка міститиме всі базові зображення.

Потім запустіть:

```sh
// З протоколом webdriver
pnpm run test.local.desktop
```

Це запустить всі тести на локальній машині на Chrome.

#### Локальне тестування Storybook Runner (Бета)

Спочатку потрібно створити локальну базову лінію. Це можна зробити за допомогою:

```sh
pnpm run test.local.desktop.storybook
```

Це запустить тести Storybook з Chrome у безголовому режимі проти демо-репозиторію Storybook, розташованого за адресою https://govuk-react.github.io/govuk-react/.

Щоб запустити тести з більшою кількістю браузерів, ви можете запустити

```sh
pnpm run test.local.desktop.storybook -- --browsers=chrome,firefox,edge,safari
```

> [!NOTE]
> Переконайтеся, що у вас встановлені браузери, на яких ви хочете запускати, на вашій локальній машині

#### CI тестування з Sauce Labs (не потрібно для PR)

Команда нижче використовується для тестування збірки на GitHub Actions, її можна використовувати тільки там і не для локальної розробки.

```
$ pnpm run test.saucelabs
```

Вона тестуватиме проти багатьох конфігурацій, які можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/./tests/configs/wdio.saucelabs.web.conf.ts).
Всі PR автоматично перевіряються на Sauce Labs.

## Випуск

Щоб випустити версію будь-якого з пакетів, перерахованих вище, зробіть наступне:

-   запустіть [конвеєр випуску](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   створюється PR випуску, який повинен бути переглянутий і затверджений іншим членом WebdriverIO
-   об'єднайте PR
-   знову запустіть [конвеєр випуску](https://github.com/webdriverio/visual-testing/actions/workflows/release.yml)
-   нова версія повинна бути випущена 🎉

## Подяки

`@wdio/visual-testing` використовує ліцензію з відкритим кодом від [LambdaTest](https://www.lambdatest.com/) і [Sauce Labs](https://saucelabs.com/).