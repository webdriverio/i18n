---
id: typegeneration
title: Generowanie typów
description: "Zobacz, jak specyfikacje protokołów są przekształcane w typy TypeScript, testy typowań i dokumentację API, oraz które pliki źródłowe należy edytować przed ponownym wygenerowaniem."
---
Jak specyfikacje protokołów stają się typami TypeScript, testami typowań i dokumentacją API.
Agenci: nie edytujcie ręcznie wygenerowanych plików — zmieńcie źródło wskazane na tym diagramie
i wygenerujcie pliki ponownie.

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

## Co edytować

| Chcesz zmienić | Edytuj to | Następnie uruchom |
|--------------------|-----------|----------|
| Kształt polecenia WebDriver / Appium / dostawcy | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` oraz `pnpm run test:typings:webdriver` |
| Polecenie `browser.*` / `$().*` dostępne dla użytkownika | `packages/webdriverio/src/commands/**` wraz z jego testem jednostkowym i fragmentem typowań | `pnpm run test:package webdriverio` oraz `pnpm run test:typings:webdriverio` |
| Typy BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Tekst dokumentacji API poleceń | JSDoc polecenia webdriverio | `pnpm run docs:generate` |
| Tekst dokumentacji API protokołów | `description` / `ref` w specyfikacji protokołu | `pnpm run docs:generate` |

Zobacz także [Przegląd ogólny](/docs/flowcharts/highleveloverview). Specyfikacje protokołów
należą do `packages/wdio-protocols`; wtyczka kompilatora znajduje się w
`infra/compiler/src/type-generation`.