---
id: typegeneration
title: Generazione dei tipi
description: "Scopri come le specifiche dei protocolli vengono trasformate in tipi TypeScript, test di tipizzazione e documentazione API, e quali file sorgente modificare prima di rigenerarli."
---
Come le specifiche dei protocolli diventano tipi TypeScript, test di tipizzazione e documentazione API.
Agenti: non modificate manualmente i file generati — modificate il sorgente indicato in questo diagramma
e rigenerate.

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

## Cosa modificare

| Vuoi modificare | Modifica questo | Poi esegui |
|--------------------|-----------|----------|
| La struttura di un comando WebDriver / Appium / vendor | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` e `pnpm run test:typings:webdriver` |
| Un comando `browser.*` / `$().*` rivolto all'utente | `packages/webdriverio/src/commands/**` più il relativo unit test e lo snippet di tipizzazione | `pnpm run test:package webdriverio` e `pnpm run test:typings:webdriverio` |
| Tipi BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Testo della documentazione API dei comandi | JSDoc sul comando webdriverio | `pnpm run docs:generate` |
| Testo della documentazione API dei protocolli | `description` / `ref` della specifica del protocollo | `pnpm run docs:generate` |

Vedi anche [Panoramica di alto livello](/docs/flowcharts/highleveloverview). Le specifiche dei protocolli sono
gestite da `packages/wdio-protocols`; il plugin del compilatore si trova in
`infra/compiler/src/type-generation`.