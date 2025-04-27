---
id: typescript
title: Налаштування TypeScript
---

Ви можете писати тести, використовуючи [TypeScript](http://www.typescriptlang.org), щоб отримати автозаповнення та типову безпеку.

Вам знадобиться встановлений [`tsx`](https://github.com/privatenumber/tsx) у `devDependencies`, через:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO автоматично виявить, чи встановлені ці залежності, і скомпілює ваш конфіг та тести для вас. Переконайтеся, що у вас є `tsconfig.json` в тій же директорії, що і ваш конфіг WDIO.

#### Користувацький TSConfig

Якщо вам потрібно встановити інший шлях для `tsconfig.json`, будь ласка, встановіть змінну середовища TSCONFIG_PATH з бажаним шляхом або використовуйте [налаштування tsConfigPath](/docs/configurationfile) у конфігурації wdio.

Альтернативно, ви можете використовувати [змінну середовища](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) для `tsx`.

#### Перевірка типів

Зауважте, що `tsx` не підтримує перевірку типів - якщо ви бажаєте перевірити свої типи, вам потрібно зробити це окремим кроком за допомогою `tsc`.

## Налаштування фреймворку

Ваш `tsconfig.json` потребує наступного:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Будь ласка, уникайте явного імпорту `webdriverio` або `@wdio/sync`.
Типи `WebdriverIO` та `WebDriver` доступні звідусіль після додавання до `types` у `tsconfig.json`. Якщо ви використовуєте додаткові сервіси WebdriverIO, плагіни або пакет автоматизації `devtools`, будь ласка, також додайте їх до списку `types`, оскільки багато з них надають додаткові типи.

## Типи фреймворків

Залежно від фреймворку, який ви використовуєте, вам потрібно буде додати типи для цього фреймворку до властивості `types` вашого `tsconfig.json`, а також встановити його визначення типів. Це особливо важливо, якщо ви хочете мати підтримку типів для вбудованої бібліотеки тверджень [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Наприклад, якщо ви вирішите використовувати фреймворк Mocha, вам потрібно встановити `@types/mocha` і додати його таким чином, щоб усі типи були доступні глобально:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## Сервіси

Якщо ви використовуєте сервіси, які додають команди до області браузера, вам також потрібно включити їх у свій `tsconfig.json`. Наприклад, якщо ви використовуєте `@wdio/lighthouse-service`, переконайтеся, що ви також додали його до `types`, наприклад:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

Додавання сервісів та репортерів до вашої конфігурації TypeScript також посилює типову безпеку вашого конфігураційного файлу WebdriverIO.

## Визначення типів

При запуску команд WebdriverIO всі властивості зазвичай типізовані, тому вам не потрібно мати справу з імпортом додаткових типів. Однак є випадки, коли ви хочете визначити змінні заздалегідь. Щоб забезпечити їх типову безпеку, ви можете використовувати всі типи, визначені в пакеті [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Наприклад, якщо ви хочете визначити віддалені опції для `webdriverio`, ви можете зробити:

```ts
import type { Options } from '@wdio/types'

// Ось приклад, де ви можете захотіти імпортувати типи безпосередньо
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Для інших випадків ви можете використовувати простір імен `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Інші опції конфігурації
}
```

## Поради та підказки

### Компіляція та лінт

Щоб бути повністю безпечним, ви можете розглянути наступні найкращі практики: компілювати свій код за допомогою компілятора TypeScript (запустити `tsc` або `npx tsc`) та мати [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), що працює на [хуку pre-commit](https://github.com/typicode/husky).