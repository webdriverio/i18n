---
id: why-webdriverio
title: なぜ WebdriverIO なのか？
description: WebdriverIO が他のテスト自動化ツールと異なる点 - あらゆるプラットフォームに対応する単一の API、Web 標準、オープンなガバナンス、そしてコーディングエージェントへの最高水準のサポート。
---

WebdriverIO は Node.js 向けのオープンソースのテスト自動化フレームワークです。1 つのテストランナーと 1 つの API で、Web ブラウザ、ネイティブおよびハイブリッドのモバイルアプリ、デスクトップアプリ、エディタ拡張機能を自動化でき、さらにビジュアルテスト、アクセシビリティテスト、コンポーネントテストを追加することもできます。WebdriverIO は [OpenJS Foundation](https://openjsf.org/) の傘下で、コミュニティによって運営されています。

## あらゆるプラットフォームに対応する 1 つのフレームワーク

ほとんどのチームは Web サイト以外のものもリリースしています。WebdriverIO を使えば、同じセレクタ、アサーション、レポーター、CI 設定でそのすべてをテストできます：

| プラットフォーム | WebdriverIO による自動化の方法 | ここから始める |
| --- | --- | --- |
| Web ブラウザ | Chrome、Firefox、Safari、Edge における WebDriver および WebDriver BiDi | [Web Browsers](/docs/platforms/web) |
| Web コンポーネント | React、Vue、Svelte、Solid、Preact、Lit、Stencil 向けの実ブラウザでのコンポーネントテスト | [Component Testing](/docs/component-testing) |
| モバイルアプリ | Appium を介した iOS および Android 上のネイティブ、ハイブリッド、モバイル Web（Flutter を含む） | [Mobile Apps](/docs/platforms/mobile) |
| デスクトップアプリ | macOS、Windows、Linux 上の Electron、Tauri、Dioxus アプリ、および Appium を介したネイティブ macOS アプリ | [Desktop Apps](/docs/platforms/desktop) |
| エディタと拡張機能 | VS Code 拡張機能とブラウザ拡張機能 | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| ビジュアルリグレッション | Web とモバイル向けの画面、要素、フルページの比較 | [Visual Testing](/docs/visual-testing) |

[multi-remote](/docs/multiremote) を使えば、1 つのテストでこれらの複数を同時に操作することもできます。たとえば、1 つのシナリオでモバイルアプリと Web ダッシュボードを同時に操作できます。

## Web 標準に基づいて構築

WebdriverIO は、すべてのブラウザベンダーが実装し[テスト](https://wpt.fyi/results/webdriver/tests)している W3C 標準である [WebDriver](https://w3c.github.io/webdriver/) と [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) を通じてブラウザを自動化します。テストはユーザーが使用しているものと同じブラウザビルドに対して実行され、クリックやキー入力などの操作は JavaScript でエミュレートされるのではなく、ブラウザ自体によってディスパッチされます。WebDriver BiDi は、Chromium だけでなくすべてのブラウザで、ネットワークモック、コンソールやログのイベントなどの機能を提供します。

ブラウザ固有の強力な機能が必要な場合、WebdriverIO は [Puppeteer](/docs/api/browser/getPuppeteer) を通じて Chrome DevTools Protocol へのアクセスを提供します。詳しくは [Automation Protocols](/docs/automationProtocols) をご覧ください。

## コミュニティ主導でオープンなガバナンス

WebdriverIO はテストツールベンダーの製品ではありません。このプロジェクトは：

- ベンダー中立の非営利団体である [OpenJS Foundation](https://openjsf.org/) によって所有されており、すべてのユーザーの利益に奉仕することが法的に義務付けられています
- 公開された[ガバナンスモデル](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md)に従っています：誰でも貢献でき、コミッターや Technical Steering Committee はコミュニティの中から生まれます
- 有料プランや機能制限はありません。すべての機能は無料で、ローカルでも任意のクラウドプロバイダーでも、どこでもテストを実行できます
- [コントリビューター奨励金プログラム](/blog/2024/02/15/new-contributor-stipend-program)を通じて、スポンサーシップをプロジェクトを構築する人々に還元しています
- [Discord](https://discord.webdriver.io) と [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions) で無料のコミュニティサポートを提供しています

## コーディングエージェントに対応

ドキュメント、ツール、テストの成果物は、コーディングエージェントが自律的に WebdriverIO を扱えるように設計されています：

- **エージェント対応のドキュメント**：すべてのページが Markdown で利用可能で、厳選された [`llms.txt`](https://webdriver.io/llms.txt) と、`https://webdriver.io/mcp` にあるドキュメント MCP サーバーが用意されています。
- **WebdriverIO MCP**：[`@wdio/mcp`](/docs/mcp) サーバーを使うと、エージェントがブラウザやモバイルアプリを操作して UI を探索し、セレクタを検証できます。
- **トレース**：[DevTools トレースモード](/docs/devtools/wdio/trace-mode)は、失敗したすべてのテストについて Markdown のトランスクリプト、スクリーンショット、アクセシビリティスナップショットを書き出します。

セットアップについては [WebdriverIO for Coding Agents](/docs/ai-agents) をご覧ください。

## 必要な機能がすべて揃い、拡張も簡単

- Mocha、Jasmine、Cucumber をサポートし、並列実行、[シャーディング](/docs/sharding)、[リトライ](/docs/retry)、[ウォッチモード](/docs/watcher)を備えた[テストランナー](/docs/testrunner)
- すべての操作に対する[自動待機](/docs/autowait)と組み込みの[アサーションライブラリ](/docs/assertion)
- [ネットワークモック](/docs/mocksandspies)、[エミュレーション](/docs/emulation)、[スナップショットテスト](/docs/snapshot)
- [デバッグダッシュボードとトレースビューア](/docs/devtools)
- クラウド、フレームワーク、CI 向けの [70 以上のサービスとレポーター](/docs/ecosystem)、さらに独自の[コマンド](/docs/customcommands)、[サービス](/docs/customservices)、[レポーター](/docs/customreporter)を作成するためのシンプルな API

## 他のツールを選ぶべき場合

WebdriverIO は、複数のプラットフォームをテストする場合、実際のブラウザやデバイスに対して実行したい場合、または独立したコミュニティ所有のツールを重視する場合に適しています。単一のブラウザで単一の Web アプリしかテストせず、モバイル、デスクトップ、クラウドデバイスが不要な場合は、ブラウザ専用のツールの方が手軽に始められると感じるかもしれません。迷った場合は、`npm init wdio@latest` で[プロジェクトを作成](/docs/gettingstarted)して試してみてください。セットアップは約 1 分で完了します。

## 次のステップ

- [Getting Started](/docs/gettingstarted) - プロジェクトを作成して最初のテストを実行する
- [Setup Types](/docs/setuptypes) - テストランナーモードまたはスタンドアロンモード
- [WebdriverIO for Coding Agents](/docs/ai-agents) - エージェントをセットアップする