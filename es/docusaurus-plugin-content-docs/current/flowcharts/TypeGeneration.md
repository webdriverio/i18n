---
id: typegeneration
title: Generación de tipos
description: "Descubre cómo las especificaciones de protocolo se convierten en tipos de TypeScript, pruebas de tipado y documentación de la API, y qué archivos fuente editar antes de regenerarlos."
---
Cómo las especificaciones de protocolo se convierten en tipos de TypeScript, pruebas de tipado y documentación de la API.
Agentes: no editen manualmente los archivos generados; cambien la fuente indicada en este diagrama
y regeneren.

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

## Qué editar

| Quieres cambiar | Edita esto | Luego ejecuta |
|--------------------|-----------|----------|
| La estructura de un comando de WebDriver / Appium / de un proveedor | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` y `pnpm run test:typings:webdriver` |
| Un comando `browser.*` / `$().*` de cara al usuario | `packages/webdriverio/src/commands/**` junto con su prueba unitaria y su fragmento de tipado | `pnpm run test:package webdriverio` y `pnpm run test:typings:webdriverio` |
| Tipos de BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Texto de la documentación de la API de comandos | JSDoc en el comando de webdriverio | `pnpm run docs:generate` |
| Texto de la documentación de la API del protocolo | `description` / `ref` de la especificación del protocolo | `pnpm run docs:generate` |

Consulta también la [Descripción general de alto nivel](/docs/flowcharts/highleveloverview). Las especificaciones de protocolo
pertenecen a `packages/wdio-protocols`; el plugin del compilador se encuentra en
`infra/compiler/src/type-generation`.