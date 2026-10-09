---
id: typegeneration
title: Генерация типов
description: "Узнайте, как спецификации протоколов превращаются в типы TypeScript, тесты типизации и документацию API, и какие исходные файлы нужно редактировать перед повторной генерацией."
---
Как спецификации протоколов превращаются в типы TypeScript, тесты типизации и документацию API.
Агентам: не редактируйте сгенерированные файлы вручную — измените исходный файл, указанный на этой схеме,
и выполните повторную генерацию.

```mermaid
graph TD
    SPEC["Hand-authored specs<br>packages/wdio-protocols/src/protocols/*.ts"] --> AGG["infra/utils/src/protocols.ts<br>exports PROTOCOLS"]
    AGG --> COMP["@wdio/compiler<br>infra/compiler type-generation plugin"]
    COMP --> GEN["Generated types<br>packages/wdio-protocols/src/commands<br>gitignored — do not edit"]
    GEN --> WD["webdriver client<br>implements protocol HTTP / BiDi"]
    GEN --> WDIO["webdriverio commands<br>JSDoc on src/commands/**"]
    WD --> TYPWD["tests/typings/webdriver"]
    WDIO --> TYPWDIO["tests/typings/webdriverio<br>mocha / jasmine / cucumber"]
    TYPWD --> TSC["pnpm run test:typings"]
    TYPWDIO --> TSC
    WDIO --> DOCS["pnpm run docs:generate<br>website/docs/api command pages"]
    SPEC --> PROTODOCS["protocolDocs.ts<br>website protocol API pages"]
    CDDL["infra/bidiCodegen CDDL pipeline"] --> BIDI["packages/webdriver/src/bidi<br>pnpm run generate:bidi"]
    BIDI --> WD
```

## Что редактировать

| Что вы хотите изменить | Что редактировать | Что затем запустить |
|--------------------|-----------|----------|
| Структуру команды WebDriver / Appium / вендора | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` и `pnpm run test:typings:webdriver` |
| Пользовательскую команду `browser.*` / `$().*` | `packages/webdriverio/src/commands/**`, а также её модульный тест и фрагмент типизации | `pnpm run test:package webdriverio` и `pnpm run test:typings:webdriverio` |
| Типы BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Текст документации API команд | JSDoc в команде webdriverio | `pnpm run docs:generate` |
| Текст документации API протоколов | `description` / `ref` в спецификации протокола | `pnpm run docs:generate` |

См. также [Общий обзор](/docs/flowcharts/highleveloverview). Спецификации протоколов
находятся в пакете `packages/wdio-protocols`; плагин компилятора расположен в
`infra/compiler/src/type-generation`.