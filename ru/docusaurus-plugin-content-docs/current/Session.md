---
id: session
title: wdio session
description: Управляйте браузером, мобильным или десктопным приложением из командной строки с помощью коротких команд wdio session, а затем экспортируйте шаги в тест.
---

`wdio session` поддерживает одну сессию WebdriverIO активной на протяжении множества коротких команд оболочки. Используйте его, чтобы исследовать UI, проверить изменение и превратить сработавшие шаги в тест. Он входит в состав `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

Сессия называется `default`. Передавайте `-s <name>` только тогда, когда вам нужны две сессии одновременно. На странице [targets](/docs/session/targets) одно тестовое приложение Expo запускается в окне Chrome с интерфейсом и в окне Electron, оба в десктопном размере. Команды Android и iOS для того же приложения находятся на той же странице.

## Установка

`wdio session` входит в состав WebdriverIO CLI. `npx wdio` устанавливает пакет без области видимости [`wdio`](https://www.npmjs.com/package/wdio) и запускает этот CLI. Устанавливать `@wdio/session` самостоятельно не нужно.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` выводит рабочий процесс, действия по группам, глобальные флаги и коды выхода. `<action> --help` выводит аргументы, флаги, платформы, примеры и связанные действия для этого действия. Тот же текст есть на странице [commands](/docs/session-commands). Навык агента содержит только основной цикл и отправляет агентов к `--help` за остальным, поэтому он не устаревает при изменении CLI.

Создайте каркас проекта с помощью:

```sh
npm init wdio@latest
```

Согласитесь с пунктом "Set up coding agent support", чтобы записать `.agents/skills/wdio-session/SKILL.md`, раздел в `AGENTS.md` и запись `.wdio/session/` в gitignore. Установить навык позже можно так:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` проверяет Node.js, браузер, Appium, SDK и облачные учётные данные. `doctor <target>` проверяет только то, что нужно этой цели. Процесс завершается с кодом 1, если проверка не пройдена.

## Откройте страницу и взаимодействуйте с ней

Откройте Chrome в headless-режиме (добавьте `--headed`, чтобы показать окно). `open` выводит интерактивные элементы страницы:

```sh
npx wdio session open chrome http://localhost:3000
```

Элемент выглядит как `button "Add to cart" [ref=e3]`. Используйте этот ref. Каждое действие сообщает, что оно изменило на странице, с ref для новых элементов, поэтому отдельный `snapshot` нужен редко:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` и `open safari` принимают тот же URL. Chrome, Firefox и Edge загружаются при первом использовании, если они не установлены. Safari требует macOS.

### Android

Android и iOS работают через Appium 3. `doctor android` сообщает об отсутствующем сервере или драйвере вместе с командой установки.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Нативные десктопные приложения: `open macos --bundle-id com.example.shop` и `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` и `open dioxus ./my-app` требуют наличия своего драйвера в `PATH`. В Linux без `DISPLAY` или `WAYLAND_DISPLAY` установите Xvfb или weston.

## Наблюдение и ref

| Команда | Для чего использовать |
| --- | --- |
| `snapshot --interactive` | Элементы, с которыми можно взаимодействовать, каждый с ref |
| `snapshot --compact` | То же дерево без безымянных пустых обёрток |
| `snapshot --urls` | Адреса ссылок для каждой ссылки |
| `find "Add to cart"` | Строка из свежего снимка |
| `diff` | Что изменилось с момента предыдущего снимка |
| `screenshot` | Макет. Пропускайте, если снимок отвечает на вопрос |
| `pdf` | PDF текущей страницы (`pdf report.pdf`). Сессии BiDi печатают как в режиме с интерфейсом, так и в headless |
| `source` | HTML страницы или нативный XML |

Ref берутся из последнего снимка. После навигации сделайте снимок снова. Устаревший ref завершается ошибкой `REF_STALE`. Неизвестный ref завершается ошибкой `REF_NOT_FOUND`.

## `exec`

`exec` выполняет код WebdriverIO. Всегда используйте `await` для команд. `$` возвращает один элемент и выбрасывает исключение, если он отсутствует. Синхронного режима и `browser.element` нет.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Размещайте утверждения в `exec` с помощью `expect-webdriverio`. Используйте `visual check <tag>` (требуется `@wdio/visual-service`), когда вопрос в том, как выглядит экран.

## Экспорт

`export` записывает спецификацию из записанных шагов. Ref заменяются стабильными селекторами.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` и `open safari` принимают тот же URL. Другие цели, снимки, `exec`, экспорт и приостановленный запуск теста описаны на отдельных страницах этого раздела.

## Этот раздел

| Страница | Для чего использовать |
| --- | --- |
| [Цели](/docs/session/targets) | Браузеры, Android, iOS, десктоп, Electron, Tauri, Dioxus и облачные устройства, включая демо-приложение в Chrome, Android и Electron |
| [Снимки и ref](/docs/session/snapshots) | Что находится на экране и ref, по которым вы кликаете |
| [Выполнение кода](/docs/session/exec) | `exec`, утверждения и визуальные проверки |
| [Экспорт теста](/docs/session/export) | Спецификации, page objects и `.wdio/helpers` |
| [Отладка теста](/docs/session/debug) | `wdio run --debug=agent` и `wdio repl --session` |
| [Команды](/docs/session-commands) | Все действия и флаги |

## Устранение неполадок

| Сообщение | Что делать |
| --- | --- |
| `SESSION_EXISTS` | Сессия с этим именем уже запущена. Используйте `-s` с другим именем или `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Снова выполните `snapshot` и используйте ref из этого вывода. |
| `NOT_EDITABLE` | Цель `fill` не является редактируемым полем и не содержит внутри себя единственного редактируемого поля (или за `aria-controls`/`aria-owns`/label). Выполните `snapshot --scope <target>` и заполните ref поля. |
| `MISSING_DEPENDENCY` | Установите пакет, указанный в ошибке, или выполните `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Выполните строку `npx appium driver install …` из ошибки. |
| `MISSING_CREDENTIALS` | Экспортируйте указанные переменные. Doctor никогда не выводит их значения. |
| `Session closed from wdio session` | Сессия отладки была закрыта. Используйте resume вместо close, если тест должен продолжиться. |

Коды выхода: 0 — успех, 1 — действие не выполнено, 2 — ошибка использования, 3 — отсутствует зависимость или учётные данные, 4 — нет сессии с таким именем.

## Дальнейшие шаги

- [Цели](/docs/session/targets) — откройте браузер, приложение Android или iOS или окно Electron
- [WebdriverIO для ИИ-агентов](/docs/ai-agents) — навык, документация и правила проекта
- [Команды wdio session](/docs/session-commands) — все действия и флаги