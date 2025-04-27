---
id: typescript
title: Настройка TypeScript
---

Вы можете писать тесты с использованием [TypeScript](http://www.typescriptlang.org) для получения автозаполнения и типобезопасности.

Вам понадобится установить [`tsx`](https://github.com/privatenumber/tsx) в `devDependencies`, через:

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIO автоматически определит, установлены ли эти зависимости, и скомпилирует вашу конфигурацию и тесты за вас. Убедитесь, что в том же каталоге, что и ваша конфигурация WDIO, есть файл `tsconfig.json`.

#### Пользовательский TSConfig

Если вам нужно указать другой путь для `tsconfig.json`, установите переменную окружения TSCONFIG_PATH с вашим желаемым путем или используйте настройку [tsConfigPath](/docs/configurationfile) в конфигурации wdio.

Альтернативно, вы можете использовать [переменную окружения](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path) для `tsx`.

#### Проверка типов

Обратите внимание, что `tsx` не поддерживает проверку типов - если вы хотите проверить ваши типы, вам нужно будет сделать это отдельным шагом с помощью `tsc`.

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
Типы `WebdriverIO` и `WebDriver` доступны отовсюду после добавления их в `types` в `tsconfig.json`. Если вы используете дополнительные сервисы WebdriverIO, плагины или пакет автоматизации `devtools`, также добавьте их в список `types`, так как многие из них предоставляют дополнительные типы.

## Типы фреймворка

В зависимости от используемого фреймворка, вам нужно будет добавить типы для этого фреймворка в свойство `types` файла `tsconfig.json`, а также установить его определения типов. Это особенно важно, если вы хотите иметь поддержку типов для встроенной библиотеки утверждений [`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio).

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

## Сервисы

Если вы используете сервисы, которые добавляют команды в область браузера, вам также нужно включить их в ваш `tsconfig.json`. Например, если вы используете `@wdio/lighthouse-service`, убедитесь, что вы также добавили его в `types`, например:

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

Добавление сервисов и репортеров в вашу конфигурацию TypeScript также усиливает типобезопасность вашего конфигурационного файла WebdriverIO.

## Определения типов

При выполнении команд WebdriverIO все свойства обычно типизированы, так что вам не нужно заботиться об импорте дополнительных типов. Однако бывают случаи, когда вы хотите определить переменные заранее. Чтобы убедиться, что они типобезопасны, вы можете использовать все типы, определенные в пакете [`@wdio/types`](https://www.npmjs.com/package/@wdio/types). Например, если вы хотите определить удаленные опции для `webdriverio`, вы можете сделать:

```ts
import type { Options } from '@wdio/types'

// Вот пример, где вы можете захотеть импортировать типы напрямую
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // Error: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// Для других случаев вы можете использовать пространство имен `WebdriverIO`
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // Другие опции конфигурации
}
```

## Советы и подсказки

### Компиляция и линтинг

Чтобы быть полностью безопасным, вы можете рассмотреть следование лучшим практикам: компилируйте свой код с помощью компилятора TypeScript (запустите `tsc` или `npx tsc`) и используйте [eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin), работающий на [pre-commit хуке](https://github.com/typicode/husky).