---
id: ai-agents
title: WebdriverIO для ИИ-агентов программирования
description: Настройте Cursor, Claude Code, Copilot или любого другого агента программирования для написания, запуска и отладки тестов WebdriverIO с помощью машиночитаемой документации, MCP-сервера WebdriverIO и трассировок DevTools.
---

Сегодня большинство тестов WebdriverIO пишутся вместе с агентом программирования. На этой странице показано, как дать агенту три вещи, необходимые для качественной работы: **актуальную документацию** (чтобы он писал код для v10, а не гадал), **способ управлять тестируемым приложением** (чтобы он мог исследовать UI и проверять селекторы) и **отлаживаемые запуски тестов** (чтобы он мог самостоятельно исправлять падающие тесты).

## 1. Предоставьте агенту документацию

Каждая страница этого сайта доступна в виде чистого Markdown, без навигации, скриптов и стилей:

| Ресурс | URL | Для чего использовать |
| --- | --- | --- |
| Индекс документации | [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt) | Тщательно составленная карта всех страниц с кратким описанием в одну строку. Начните отсюда. |
| Полная документация | [`https://webdriver.io/llms-full.txt`](https://webdriver.io/llms-full.txt) | Вся документация в одном файле — для агентов с большим контекстным окном. |
| Любая отдельная страница | Добавьте `.md` к URL, например [`/docs/api/browser/url.md`](https://webdriver.io/docs/api/browser/url.md) | Загрузка именно той страницы, которая нужна агенту. |
| Согласование содержимого | Запросите любой URL `/docs/*` с заголовком `Accept: text/markdown` | Агенты и инструменты, которые загружают URL как есть. |

На каждой странице документации также есть меню **Copy page** с возможностью скопировать страницу в формате Markdown или открыть её напрямую в ChatGPT, Claude или Cursor.

### MCP-сервер документации

Документация также доступна в виде удалённого MCP-сервера по адресу `https://webdriver.io/mcp`. Он предоставляет агенту три инструмента: `search_docs` для поиска нужной страницы, `get_page` для чтения её в формате Markdown и `list_sections` для загрузки целого раздела за раз. Добавьте его рядом с MCP-сервером WebdriverIO, описанным ниже:

```json title=".mcp.json"
{
    "mcpServers": {
        "webdriverio-docs": {
            "url": "https://webdriver.io/mcp"
        }
    }
}
```

Для Claude Code выполните `claude mcp add --transport http webdriverio-docs https://webdriver.io/mcp`.

## Позвольте агенту использовать `wdio session`

[`wdio session`](/docs/session) поддерживает сессию WebdriverIO активной между командами оболочки. Агент может открыть браузер, телефон или десктопное приложение, сделать снимок того, что находится на экране, выполнять действия по ссылкам (refs) и экспортировать успешные шаги в виде теста. Это стандартный способ управления приложением из агента программирования. [MCP-сервер](/docs/mcp), описанный в следующем разделе, — альтернатива на случай, когда агенту нужно вызывать инструменты, а не оболочку.

Установите навык (skill) в проект:

```sh
npx wdio session skill --install .
```

Эта команда создаёт файл `.agents/skills/wdio-session/SKILL.md`. `npm init wdio` создаёт тот же файл, если вы соглашаетесь на поддержку агентов программирования, и добавляет приведённые ниже правила проекта.

Агент может создать проект самостоятельно. Мастер настройки принимает флаг для каждого вопроса, а `--yes` заполняет остальные значения по умолчанию, поэтому он никогда не ожидает ввода:

```sh
npm init wdio@latest . -- --yes --typescript --framework mocha --browsers chrome --reporters spec
```

`npm init wdio@latest -- --help` выводит список всех флагов и их значений. См. [Ответы на вопросы мастера с помощью флагов](/docs/gettingstarted#answer-the-wizard-with-flags). Раздел [WebdriverIO Session](/docs/session) охватывает цели, снимки, `exec`, экспорт и отладку. Справочник команд: [команды wdio session](/docs/session-commands).

### Добавьте документацию в агента

Чтобы документация была доступна в каждом чате, добавьте индекс в своего агента:

- **Cursor**: добавьте `https://webdriver.io/llms.txt` как пользовательскую документацию в настройках Cursor (_Indexing & Docs_), затем ссылайтесь на неё в чате с помощью `@` и заданного вами имени.
- **Claude Code / Codex / другие CLI-агенты**: добавьте ссылку в файл `AGENTS.md` или `CLAUDE.md` вашего проекта (см. [правила проекта](#3-add-project-rules) ниже). Агенты загружают нужные страницы по мере необходимости.

## 2. Позвольте агенту управлять браузером или приложением

[MCP-сервер WebdriverIO](/docs/mcp) (`@wdio/mcp`) позволяет агенту открывать браузеры (Chrome, Firefox, Edge, Safari), нативные и гибридные мобильные приложения (через Appium) и облачные устройства, исследовать дерево доступности, выполнять клики, вводить текст и делать скриншоты. Агенты используют его, чтобы исследовать страницу перед написанием теста, находить надёжные селекторы и пошагово воспроизводить сбой.

Добавьте его в конфигурацию вашего MCP-клиента (например, `.mcp.json` или `.cursor/mcp.json` в вашем проекте):

```json title=".mcp.json"
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

Для Claude Code зарегистрируйте его из командной строки:

```sh
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```

См. [конфигурацию MCP](/docs/mcp/configuration) для параметров сессии и [Облачные провайдеры](/docs/mcp/cloud-providers) для запуска на BrowserStack, Sauce Labs, TestMu AI или TestingBot.

## 3. Добавьте правила проекта

Агенты гораздо надёжнее следуют соглашениям проекта, когда они записаны. Добавьте раздел, подобный приведённому ниже, в `AGENTS.md` (или `CLAUDE.md`, `.cursor/rules`) вашего тестового проекта и скорректируйте пути и команды:

````md title="AGENTS.md"
## End-to-end tests (WebdriverIO v10)

- Docs: https://webdriver.io/llms.txt - fetch the relevant page as Markdown (append `.md`) before using an API you are not sure about. Do not use APIs from WebdriverIO v8 or older.
- Config: `wdio.conf.ts`. Specs: `test/specs/**/*.e2e.ts`. Page objects: `test/pageobjects/`.
- Run all tests: `npx wdio run wdio.conf.ts`
- Run a single spec: `npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts`
- Tests are async: always `await` commands, e.g. `await $('button').click()`. Never use the removed sync mode.
- Prefer user-facing selectors: accessibility name or text (`$('aria/Submit')`, `$('button=Submit')`), then `data-testid`. Avoid XPath and generated CSS classes.
- Rely on auto-waiting and `expect-webdriverio` matchers (`await expect($('h1')).toHaveText('Welcome')`) instead of `browser.pause()`.
- To explore the app or verify a selector, use the `wdio-mcp` MCP server.
- To drive the app from the shell, follow `.agents/skills/wdio-session/SKILL.md` (`npx wdio session`).
- When a test fails, read the DevTools trace in `test-results/` (see `transcript.md`) before changing code.
````

Приведённые выше правила отражают рекомендации из разделов [Лучшие практики](/docs/bestpractices), [Селекторы](/docs/selectors) и [Автоожидание](/docs/autowait).

## 4. Позвольте агенту отлаживать падающие тесты

Сервис [WebdriverIO DevTools](/docs/devtools) может записывать **трассировку** каждого запуска: переносимый артефакт с пошаговой расшифровкой в формате Markdown, скриншотами, снимками дерева доступности и сетевыми логами для каждого действия. Это даёт агенту ту же информацию, которую человек получает, наблюдая за выполнением теста, без необходимости в окне браузера.

Установите сервис и включите режим трассировки:

```sh
npm install @wdio/devtools-service --save-dev
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    services: [
        ['devtools', {
            mode: 'trace',
            // одна трассировка на тест упрощает передачу отдельного сбоя агенту
            traceGranularity: 'test',
            // обычные файлы вместо zip-архива, чтобы агенты могли читать их напрямую
            traceFormat: 'ndjson-directory'
        }]
    ]
}
```

После запуска трассировки записываются в `test-results/`. Укажите агенту папку упавшего теста и попросите его сначала прочитать `transcript.md`. См. [Режим трассировки](/docs/devtools/wdio/trace-mode) для всех параметров, включая гранулярность и хранение.

## Рекомендуемый рабочий процесс

1. Попросите агента исследовать тестируемую функциональность с помощью MCP-сервера и предложить селекторы.
2. Позвольте ему написать спецификацию и page object в соответствии с правилами вашего проекта, загружая страницы документации WebdriverIO по мере необходимости.
3. Пусть он запустит отдельную спецификацию с `--spec` и повторяет итерации, пока она не пройдёт.
4. Если тест падает в CI, передайте агенту трассировку этого теста и позвольте ему исправить тест или сообщить об ошибке.

## Следующие шаги

- [Начало работы](/docs/gettingstarted) — создайте проект с помощью `npm init wdio@latest`
- [WebdriverIO MCP](/docs/mcp) — все инструменты, предоставляемые MCP-сервером
- [DevTools](/docs/devtools) — живой режим и режим трассировки
- [Лучшие практики](/docs/bestpractices) — как выглядят хорошие тесты WebdriverIO
- [С v9 на v10](/docs/v10-migration#migrate-with-a-coding-agent) — навык миграции для существующего набора тестов