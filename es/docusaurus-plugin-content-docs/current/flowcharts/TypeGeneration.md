---
id: typegeneration
title: Generación de tipos
description: "Descubre cómo las especificaciones de protocolo se convierten en tipos de TypeScript, pruebas de tipados y documentación de la API, y qué archivos fuente editar antes de regenerarlos."
---
Cómo las especificaciones de protocolo se convierten en tipos de TypeScript, pruebas de tipados y documentación de la API.
Agentes: no editen manualmente los archivos generados; cambien el código fuente indicado en este diagrama
y vuelvan a generarlos.

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

| Si quieres cambiar | Edita esto | Luego ejecuta |
|--------------------|-----------|----------|
| La estructura de un comando de WebDriver / Appium / de un proveedor | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` y `pnpm run test:typings:webdriver` |
| Un comando `browser.*` / `$().*` orientado al usuario | `packages/webdriverio/src/commands/**` junto con su prueba unitaria y su fragmento de tipados | `pnpm run test:package webdriverio` y `pnpm run test:typings:webdriverio` |
| Los tipos de BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| El texto de la documentación de la API de comandos | El JSDoc del comando de webdriverio | `pnpm run docs:generate` |
| El texto de la documentación de la API de protocolos | La `description` / `ref` de la especificación del protocolo | `pnpm run docs:generate` |

Consulta también [High level overview](/docs/flowcharts/highleveloverview). Las especificaciones de protocolo
pertenecen a `packages/wdio-protocols`; el plugin del compilador se encuentra en
`infra/compiler/src/type-generation`.