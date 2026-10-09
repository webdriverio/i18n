---
id: typegeneration
title: Génération des types
description: "Découvrez comment les spécifications de protocole sont transformées en types TypeScript, en tests de typage et en documentation d'API, et quels fichiers sources modifier avant de régénérer."
---
Comment les spécifications de protocole deviennent des types TypeScript, des tests de typage et de la documentation d'API.
Agents : ne modifiez pas manuellement les fichiers générés — modifiez la source indiquée dans ce diagramme
puis régénérez.

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

## Quoi modifier

| Vous voulez modifier | Modifiez ceci | Puis exécutez |
|--------------------|-----------|----------|
| La forme d'une commande WebDriver / Appium / fournisseur | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` et `pnpm run test:typings:webdriver` |
| Une commande `browser.*` / `$().*` destinée aux utilisateurs | `packages/webdriverio/src/commands/**` ainsi que son test unitaire et son extrait de typage | `pnpm run test:package webdriverio` et `pnpm run test:typings:webdriverio` |
| Les types BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Le texte de la documentation d'API des commandes | Le JSDoc de la commande webdriverio | `pnpm run docs:generate` |
| Le texte de la documentation d'API des protocoles | La `description` / `ref` de la spécification du protocole | `pnpm run docs:generate` |

Voir aussi [Vue d'ensemble](/docs/flowcharts/highleveloverview). Les spécifications de protocole
appartiennent à `packages/wdio-protocols` ; le plugin du compilateur se trouve dans
`infra/compiler/src/type-generation`.
```