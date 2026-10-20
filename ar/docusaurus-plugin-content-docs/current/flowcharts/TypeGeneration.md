---
id: typegeneration
title: توليد الأنواع
description: "تعرّف على كيفية تحويل مواصفات البروتوكول إلى أنواع TypeScript واختبارات الأنواع (typings) ووثائق API، وما هي الملفات المصدرية التي يجب تعديلها قبل إعادة التوليد."
---
كيف تتحول مواصفات البروتوكول إلى أنواع TypeScript واختبارات الأنواع (typings) ووثائق API.
ملاحظة للوكلاء (Agents): لا تعدّلوا الملفات المُولَّدة يدويًا — غيّروا المصدر الموضح في هذا المخطط
ثم أعيدوا التوليد.

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

## ما الذي يجب تعديله

| ما تريد تغييره | عدّل هذا | ثم شغّل |
|--------------------|-----------|----------|
| بنية أمر WebDriver / Appium / خاص بمورّد معيّن | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` و `pnpm run test:typings:webdriver` |
| أمر موجّه للمستخدم من نوع `browser.*` / `$().*` | `packages/webdriverio/src/commands/**` بالإضافة إلى اختبار الوحدة الخاص به ومقتطف الأنواع (typings) | `pnpm run test:package webdriverio` و `pnpm run test:typings:webdriverio` |
| أنواع BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| نص وثائق API للأوامر | JSDoc الخاص بأمر webdriverio | `pnpm run docs:generate` |
| نص وثائق API للبروتوكول | الحقلان `description` / `ref` في مواصفة البروتوكول | `pnpm run docs:generate` |

انظر أيضًا [نظرة عامة عالية المستوى](/docs/flowcharts/highleveloverview). مواصفات البروتوكول
مملوكة للحزمة `packages/wdio-protocols`؛ وتوجد إضافة المُصرِّف (compiler plugin) في
`infra/compiler/src/type-generation`.