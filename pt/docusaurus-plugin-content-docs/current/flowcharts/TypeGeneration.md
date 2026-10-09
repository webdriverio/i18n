---
id: typegeneration
title: Geração de tipos
description: "Veja como as especificações de protocolo são transformadas em tipos TypeScript, testes de tipagem e documentação da API, e quais arquivos-fonte editar antes de regenerar."
---
Como as especificações de protocolo se tornam tipos TypeScript, testes de tipagem e documentação da API.
Agentes: não editem manualmente os arquivos gerados — alterem a fonte neste diagrama
e regenerem.

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

## O que editar

| Você quer alterar | Edite isto | Depois execute |
|--------------------|-----------|----------|
| O formato de um comando WebDriver / Appium / de fornecedor | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` e `pnpm run test:typings:webdriver` |
| Um comando `browser.*` / `$().*` voltado ao usuário | `packages/webdriverio/src/commands/**` mais seu teste unitário e trecho de tipagem | `pnpm run test:package webdriverio` e `pnpm run test:typings:webdriverio` |
| Tipos BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Texto da documentação da API de comandos | JSDoc no comando do webdriverio | `pnpm run docs:generate` |
| Texto da documentação da API de protocolos | `description` / `ref` da especificação do protocolo | `pnpm run docs:generate` |

Veja também [Visão geral de alto nível](/docs/flowcharts/highleveloverview). As especificações de protocolo
pertencem a `packages/wdio-protocols`; o plugin do compilador fica em
`infra/compiler/src/type-generation`.