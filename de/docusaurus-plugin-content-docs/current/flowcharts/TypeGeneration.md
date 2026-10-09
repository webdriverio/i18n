---
id: typegeneration
title: Typgenerierung
description: "Erfahre, wie Protokollspezifikationen in TypeScript-Typen, Typisierungstests und API-Dokumentation umgewandelt werden und welche Quelldateien vor der erneuten Generierung bearbeitet werden müssen."
---
Wie aus Protokollspezifikationen TypeScript-Typen, Typisierungstests und API-Dokumentation werden.
Agents: Generierte Dateien nicht manuell bearbeiten – ändere die Quelle in diesem Diagramm
und generiere neu.

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

## Was bearbeitet werden muss

| Du möchtest ändern | Bearbeite dies | Führe dann aus |
|--------------------|-----------|----------|
| Die Struktur eines WebDriver- / Appium- / Hersteller-Befehls | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` und `pnpm run test:typings:webdriver` |
| Einen nutzerseitigen `browser.*` / `$().*` Befehl | `packages/webdriverio/src/commands/**` sowie den zugehörigen Unit-Test und das Typisierungs-Snippet | `pnpm run test:package webdriverio` und `pnpm run test:typings:webdriverio` |
| BiDi-Typen | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Text der Befehls-API-Dokumentation | JSDoc des webdriverio-Befehls | `pnpm run docs:generate` |
| Text der Protokoll-API-Dokumentation | `description` / `ref` der Protokollspezifikation | `pnpm run docs:generate` |

Siehe auch [Überblick auf hoher Ebene](/docs/flowcharts/highleveloverview). Die Protokollspezifikationen
gehören zu `packages/wdio-protocols`; das Compiler-Plugin befindet sich in
`infra/compiler/src/type-generation`.