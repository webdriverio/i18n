---
id: typegeneration
title: Typgenerering
description: "Se hur protokollspecifikationer omvandlas till TypeScript-typer, typningstester och API-dokumentation, och vilka källfiler du ska redigera innan du genererar om."
---
Hur protokollspecifikationer blir TypeScript-typer, typningstester och API-dokumentation.
Agenter: redigera inte genererade filer för hand – ändra källan i detta diagram
och generera om.

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

## Vad du ska redigera

| Du vill ändra | Redigera detta | Kör sedan |
|--------------------|-----------|----------|
| Formen på ett WebDriver-/Appium-/leverantörskommando | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` och `pnpm run test:typings:webdriver` |
| Ett användarvänt `browser.*`-/`$().*`-kommando | `packages/webdriverio/src/commands/**` samt dess enhetstest och typningsexempel | `pnpm run test:package webdriverio` och `pnpm run test:typings:webdriverio` |
| BiDi-typer | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Text i kommandots API-dokumentation | JSDoc på webdriverio-kommandot | `pnpm run docs:generate` |
| Text i protokollets API-dokumentation | protokollspecifikationens `description` / `ref` | `pnpm run docs:generate` |

Se även [Översikt på hög nivå](/docs/flowcharts/highleveloverview). Protokollspecifikationerna
ägs av `packages/wdio-protocols`; kompilatorpluginet finns i
`infra/compiler/src/type-generation`.