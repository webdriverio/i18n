---
id: typegeneration
title: تولید تایپ‌ها
description: "ببینید مشخصات پروتکل چگونه به تایپ‌های TypeScript، تست‌های تایپ و مستندات API تبدیل می‌شوند و پیش از تولید مجدد، کدام فایل‌های منبع را باید ویرایش کرد."
---
مشخصات پروتکل چگونه به تایپ‌های TypeScript، تست‌های تایپ و مستندات API تبدیل می‌شوند.
ایجنت‌ها: فایل‌های تولیدشده را به‌صورت دستی ویرایش نکنید — منبع را در این نمودار تغییر دهید
و دوباره تولید کنید.

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

## چه چیزی را ویرایش کنیم

| می‌خواهید تغییر دهید | این را ویرایش کنید | سپس اجرا کنید |
|--------------------|-----------|----------|
| ساختار یک دستور WebDriver / Appium / مخصوص فروشنده | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` و `pnpm run test:typings:webdriver` |
| یک دستور کاربرمحور `browser.*` / `$().*` | `packages/webdriverio/src/commands/**` به‌همراه تست واحد و قطعه‌کد تایپ آن | `pnpm run test:package webdriverio` و `pnpm run test:typings:webdriverio` |
| تایپ‌های BiDi | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| متن مستندات API دستورات | JSDoc روی دستور webdriverio | `pnpm run docs:generate` |
| متن مستندات API پروتکل | `description` / `ref` در مشخصات پروتکل | `pnpm run docs:generate` |

همچنین [نمای کلی سطح بالا](/docs/flowcharts/highleveloverview) را ببینید. مالکیت مشخصات پروتکل
با `packages/wdio-protocols` است؛ پلاگین کامپایلر در
`infra/compiler/src/type-generation` قرار دارد.