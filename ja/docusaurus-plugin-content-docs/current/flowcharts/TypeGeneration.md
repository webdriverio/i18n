---
id: typegeneration
title: 型生成
description: "プロトコル仕様がどのようにTypeScriptの型、型付けテスト、APIドキュメントに変換されるか、また再生成の前にどのソースファイルを編集すべきかを確認します。"
---
プロトコル仕様がTypeScriptの型、型付けテスト、APIドキュメントになるまでの流れ。
エージェントへ：生成されたファイルを手動で編集しないでください。このチャート内のソースを変更してから再生成してください。

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

## 編集する場所

| 変更したい内容 | 編集する場所 | その後に実行するコマンド |
|--------------------|-----------|----------|
| WebDriver / Appium / ベンダーコマンドの形式 | `packages/wdio-protocols/src/protocols/*.ts` | `pnpm run compile:all` および `pnpm run test:typings:webdriver` |
| ユーザー向けの `browser.*` / `$().*` コマンド | `packages/webdriverio/src/commands/**` と、その単体テストおよび型付けスニペット | `pnpm run test:package webdriverio` および `pnpm run test:typings:webdriverio` |
| BiDiの型 | `infra/bidiCodegen/` | `pnpm run generate:bidi` |
| コマンドAPIドキュメントのテキスト | webdriverioコマンドのJSDoc | `pnpm run docs:generate` |
| プロトコルAPIドキュメントのテキスト | プロトコル仕様の `description` / `ref` | `pnpm run docs:generate` |

[ハイレベルな概要](/docs/flowcharts/highleveloverview)も参照してください。プロトコル仕様は
`packages/wdio-protocols` が管理しており、コンパイラプラグインは
`infra/compiler/src/type-generation` にあります。