---
id: typegeneration
title: टाइप जनरेशन
description: "देखें कि प्रोटोकॉल स्पेक्स को TypeScript टाइप्स, टाइपिंग्स टेस्ट्स और API डॉक्स में कैसे बदला जाता है, और पुनः जनरेट करने से पहले किन सोर्स फ़ाइलों को एडिट करना है।"
---
प्रोटोकॉल स्पेक्स TypeScript टाइप्स, टाइपिंग्स टेस्ट्स और API डॉक्स कैसे बनते हैं।
एजेंट्स: जनरेट की गई फ़ाइलों को मैन्युअल रूप से एडिट न करें — इस चार्ट में दिए गए सोर्स को बदलें
और पुनः जनरेट करें।

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

## क्या एडिट करें

| आप बदलना चाहते हैं | इसे एडिट करें | फिर चलाएँ |
|--------------------|-----------|----------|
| किसी WebDriver / Appium / वेंडर कमांड का स्वरूप | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` और `pnpm run test:typings:webdriver` |
| कोई यूज़र-फ़ेसिंग `browser.*` / `$().*` कमांड | `packages/webdriverio/src/commands/**` साथ ही उसका यूनिट टेस्ट और टाइपिंग्स स्निपेट | `pnpm run test:package webdriverio` और `pnpm run test:typings:webdriverio` |
| BiDi टाइप्स | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| कमांड API डॉक्स टेक्स्ट | webdriverio कमांड पर JSDoc | `pnpm run docs:generate` |
| प्रोटोकॉल API डॉक्स टेक्स्ट | प्रोटोकॉल स्पेक का `description` / `ref` | `pnpm run docs:generate` |

[उच्च स्तरीय अवलोकन](/docs/flowcharts/highleveloverview) भी देखें। प्रोटोकॉल स्पेक्स
`packages/wdio-protocols` के स्वामित्व में हैं; कंपाइलर प्लगइन
`infra/compiler/src/type-generation` में स्थित है।