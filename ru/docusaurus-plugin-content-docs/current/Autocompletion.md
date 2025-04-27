---
id: autocompletion
title: Автодополнение
---

## IntelliJ

Автодополнение работает из коробки в IDEA и WebStorm.

Если вы пишете программный код уже некоторое время, вероятно, вам нравится автодополнение. Автодополнение доступно из коробки во многих редакторах кода.

![Autocompletion](/img/autocompletion/0.png)

Определения типов на основе [JSDoc](http://usejsdoc.org/) используются для документирования кода. Это помогает видеть дополнительные детали о параметрах и их типах.

![Autocompletion](/img/autocompletion/1.png)

Используйте стандартные сочетания клавиш <kbd>⇧ + ⌥ + SPACE</kbd> на платформе IntelliJ, чтобы увидеть доступную документацию:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code обычно имеет автоматически интегрированную поддержку типов, и никаких дополнительных действий не требуется.

![Autocompletion](/img/autocompletion/14.png)

Если вы используете обычный JavaScript и хотите иметь правильную поддержку типов, вам необходимо создать файл `jsconfig.json` в корне вашего проекта и указать используемые пакеты wdio, например:

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