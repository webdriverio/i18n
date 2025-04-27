---
id: autocompletion
title: Автодоповнення
---

## IntelliJ

Автодоповнення працює без додаткових налаштувань в IDEA та WebStorm.

Якщо ви пишете програмний код вже деякий час, ви, ймовірно, любите автодоповнення. Автодоповнення доступне без додаткових налаштувань у багатьох редакторах коду.

![Autocompletion](/img/autocompletion/0.png)

Визначення типів на основі [JSDoc](http://usejsdoc.org/) використовується для документування коду. Це допомагає бачити більше додаткових деталей про параметри та їх типи.

![Autocompletion](/img/autocompletion/1.png)

Використовуйте стандартні комбінації клавіш <kbd>⇧ + ⌥ + SPACE</kbd> на платформі IntelliJ, щоб побачити доступну документацію:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code зазвичай має автоматично інтегровану підтримку типів, і ніяких додаткових дій не потрібно.

![Autocompletion](/img/autocompletion/14.png)

Якщо ви використовуєте звичайний JavaScript і хочете мати належну підтримку типів, вам потрібно створити `jsconfig.json` у кореневій папці проекту та посилатися на використовувані пакети wdio, наприклад:

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