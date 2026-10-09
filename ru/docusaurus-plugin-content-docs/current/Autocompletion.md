---
id: autocompletion
title: Автодополнение
description: "Получайте автодополнение и встроенную документацию API для команд WebdriverIO в IntelliJ, WebStorm и Visual Studio Code."
---

## IntelliJ

Автодополнение работает «из коробки» в IDEA и WebStorm.

Если вы уже какое-то время пишете программный код, вам, вероятно, нравится автодополнение. Автодополнение доступно «из коробки» во многих редакторах кода.

![Autocompletion](/img/autocompletion/0.png)

Для документирования кода используются определения типов на основе [JSDoc](http://usejsdoc.org/). Это помогает увидеть дополнительные сведения о параметрах и их типах.

![Autocompletion](/img/autocompletion/1.png)

Используйте стандартные сочетания клавиш <kbd>⇧ + ⌥ + SPACE</kbd> на платформе IntelliJ, чтобы просмотреть доступную документацию:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

В Visual Studio Code поддержка типов обычно интегрирована автоматически, и никаких действий не требуется.

![Autocompletion](/img/autocompletion/14.png)

Если вы используете чистый JavaScript и хотите получить полноценную поддержку типов, вам необходимо создать файл `jsconfig.json` в корне проекта и указать в нём используемые пакеты wdio, например:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```