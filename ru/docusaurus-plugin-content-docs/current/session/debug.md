---
id: debug
title: Отладка теста с помощью сессии
description: Приостановите упавший запуск WebdriverIO и исследуйте его с помощью wdio session, затем возобновите или закройте его.
---

`wdio run --debug=agent` приостанавливает воркер на `await browser.debug()` и после упавшего теста, а также увеличивает таймаут фреймворка до 24 часов. Пауза распространяется как на тесты Mocha, так и на шаги Cucumber. Запуск выводит имя сессии (`debug-0-0` для первого воркера):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` для этой сессии завершает приостановленный тест с ошибкой `Session closed from wdio session`. Используйте resume, если тест должен продолжиться. Используйте close, если хотите, чтобы запуск завершился с ошибкой в точке паузы.

`browser.debug()` без `--debug=agent` по-прежнему открывает [REPL](/docs/repl) внутри теста. `--debug=agent` — это способ, позволяющий другому процессу, в том числе ИИ-агенту для программирования, управлять приостановленным воркером с помощью `wdio session`.

## Подключение REPL

`wdio repl --session <name>` подключается к уже открытой сессии и оставляет её работающей после выхода:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Каждая строка REPL выполняется как `wdio session exec`. `.exit` выводит `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` проверяет Node.js, браузер, Appium, SDK и учётные данные облачных сервисов перед открытием сессии. `doctor <target>` проверяет только то, что нужно для указанной цели. Если проверка не проходит, процесс завершается с кодом 1. Сессия, которая ещё запускается, остаётся на месте. Сессия, процесс которой уже завершён, удаляется.

## Устранение неполадок

| Сообщение | Что делать |
| --- | --- |
| `Session closed from wdio session` | Вы закрыли отладочную сессию. Используйте `resume`, если тест должен продолжиться. |
| Нет сессии `debug-0-0` | Запуск ещё не приостановлен или использует другой идентификатор воркера. `wdio session list` выводит имена сессий. |
| Пауза так и не происходит | Команда должна быть `wdio run --debug=agent`. Успешный тест не приостанавливается, если в нём не вызывается `browser.debug()`. |

## Дальнейшие шаги

- [Отладка](/docs/debugging) — `browser.debug()`, точки останова и нестабильные тесты
- [REPL](/docs/repl) — интерактивная оболочка
- [wdio session](/docs/session) — открытие сессии, не привязанной к запуску тестов