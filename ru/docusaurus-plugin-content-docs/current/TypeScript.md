---
id: typescript
title: Настройка TypeScript
description: "Пишите тесты WebdriverIO на TypeScript с помощью tsx, настройте tsconfig.json и добавьте определения типов для фреймворков, сервисов и пользовательских команд."
---

Вы можете писать тесты на [TypeScript](http://www.typescriptlang.org), чтобы получить автодополнение и типобезопасность.

Вам потребуется установить [`tsx`](https://github.com/privatenumber/tsx) в `devDependencies` с помощью команды:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO автоматически определит, установлены ли эти зависимости, и скомпилирует вашу конфигурацию и тесты. Убедитесь, что файл `tsconfig.json` находится в той же директории, что и ваш конфигурационный файл WDIO.

#### Пользовательский TSConfig

Если вам нужно указать другой путь к `tsconfig.json`, задайте нужный путь в переменной окружения TSCONFIG_PATH или используйте [настройку tsConfigPath](/docs/configurationfile) в конфигурации wdio.

В качестве альтернативы вы можете использовать [переменную окружения](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) для `tsx`.


#### Проверка типов

Обратите внимание, что `tsx` не поддерживает проверку типов — если вы хотите проверить типы, вам нужно сделать это отдельным шагом с помощью `tsc`.

## Настройка фреймворка

Ваш `tsconfig.json` должен содержать следующее:

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

Пожалуйста, избегайте явного импорта `webdriverio` или `@wdio/sync`.
Типы `WebdriverIO` и `WebDriver` доступны из любого места после добавления в `types` в `tsconfig.json`. Если вы используете дополнительные сервисы, плагины WebdriverIO или пакет автоматизации `devtools`, пожалуйста, также добавьте их в список `types`, поскольку многие из них предоставляют дополнительные типы.

## Типы фреймворков

В зависимости от используемого фреймворка вам нужно добавить его типы в свойство types вашего `tsconfig.json`, а также установить его определения типов. Это особенно важно, если вы хотите иметь поддержку типов для встроенной библиотеки утверждений [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

Например, если вы решили использовать фреймворк Mocha, вам нужно установить `@types/mocha` и добавить его следующим образом, чтобы все типы были доступны глобально:

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
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine` загружает `@types/jasmine`, который предоставляет `jasmine`, `spyOn` и `expectAsync`. С `@wdio/jasmine-framework` глобальный `expect` возвращает `void` для синхронных матчеров Jasmine и `Promise` для матчеров WebdriverIO и асинхронных матчеров Jasmine. `expectAsync` также содержит матчеры WebdriverIO. Экспорт `expect` из `expect-webdriverio` сохраняет свои матчеры Jest.

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

## Сервисы

Если вы используете сервисы, которые добавляют команды в область видимости браузера, вам также нужно включить их в ваш `tsconfig.json`. Например, если вы используете `@wdio/lighthouse-service`, убедитесь, что вы также добавили его в `types`, например:

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

Добавление сервисов и репортеров в конфигурацию TypeScript также усиливает типобезопасность вашего конфигурационного файла WebdriverIO.

## Определения типов

При выполнении команд WebdriverIO все свойства обычно типизированы, поэтому вам не нужно импортировать дополнительные типы. Однако бывают случаи, когда вы хотите определить переменные заранее. Чтобы обеспечить их типобезопасность, вы можете использовать все типы, определённые в пакете [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Например, если вы хотите определить параметры remote для `webdriverio`, вы можете сделать так:

```ts
import type { Options } from '@wdio/types'

// Пример, когда может понадобиться импортировать типы напрямую
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// В других случаях можно использовать пространство имён `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Другие параметры конфигурации
}
```

## Советы и подсказки

### Компиляция и линтинг

Чтобы быть полностью уверенным, вы можете следовать лучшим практикам: компилировать код с помощью компилятора TypeScript (запустите `tsc` или `npx tsc`) и запускать [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) в [pre-commit хуке](https://github.com/typicode/husky).