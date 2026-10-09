---
id: typegeneration
title: Δημιουργία τύπων
description: "Δείτε πώς οι προδιαγραφές πρωτοκόλλων μετατρέπονται σε τύπους TypeScript, δοκιμές τύπων (typings tests) και τεκμηρίωση API, καθώς και ποια αρχεία πηγαίου κώδικα πρέπει να επεξεργαστείτε πριν από την αναδημιουργία."
---
Πώς οι προδιαγραφές πρωτοκόλλων γίνονται τύποι TypeScript, δοκιμές τύπων (typings tests) και τεκμηρίωση API.
Agents: μην επεξεργάζεστε χειροκίνητα τα παραγόμενα αρχεία — αλλάξτε την πηγή σε αυτό το διάγραμμα
και εκτελέστε ξανά τη δημιουργία.

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

## Τι να επεξεργαστείτε

| Θέλετε να αλλάξετε | Επεξεργαστείτε αυτό | Στη συνέχεια εκτελέστε |
|--------------------|-----------|----------|
| Τη μορφή μιας εντολής WebDriver / Appium / vendor | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` και `pnpm run test:typings:webdriver` |
| Μια εντολή `browser.*` / `$().*` που απευθύνεται στον χρήστη | `packages/webdriverio/src/commands/**` μαζί με το unit test της και το απόσπασμα typings | `pnpm run test:package webdriverio` και `pnpm run test:typings:webdriverio` |
| Τύπους BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| Κείμενο τεκμηρίωσης API εντολών | Το JSDoc στην εντολή webdriverio | `pnpm run docs:generate` |
| Κείμενο τεκμηρίωσης API πρωτοκόλλου | Τα `description` / `ref` της προδιαγραφής πρωτοκόλλου | `pnpm run docs:generate` |

Δείτε επίσης την [Επισκόπηση υψηλού επιπέδου](/docs/flowcharts/highleveloverview). Οι προδιαγραφές πρωτοκόλλων
ανήκουν στο `packages/wdio-protocols`· το plugin του compiler βρίσκεται στο
`infra/compiler/src/type-generation`.