---
id: why-webdriverio
title: なぜWebdriver.IO？
---

WebdriverIOは、モダンなウェブおよびモバイルアプリケーションを自動化するために構築された先進的な自動化フレームワークです。アプリケーションとの対話を簡素化し、スケーラブルで堅牢かつ安定したテストスイートを作成するのに役立つプラグインセットを提供します。

以下のように設計されています：

- __拡張可能__ - ヘルパー関数の追加や、既存のコマンドのより複雑なセットと組み合わせが__シンプル__で__非常に便利__
- __互換性__ - WebdriverIOは[WebDriverプロトコル](https://w3c.github.io/webdriver/)上で実行して__真のクロスブラウザテスト__を行うことも、[Chrome DevToolsプロトコル](https://chromedevtools.github.io/devtools-protocol/)を使用して[Puppeteer](https://pptr.dev/)によるChromiumベースの自動化を行うこともできます。
- __機能豊富__ - 多種多様な組み込みおよびコミュニティプラグインにより、あなたの要件を満たすためにセットアップを__簡単に統合__および__拡張__できます。

WebdriverIOを使用して以下を自動化できます：

- 🌐 <span>&nbsp;</span> React、Vue、Angular、Svelte、またはその他のフロントエンドフレームワークで書かれた__モダンなウェブアプリケーション__
- 📱 <span>&nbsp;</span> エミュレータ/シミュレータまたは実機で実行される__ハイブリッド__または__ネイティブモバイルアプリケーション__
- 💻 <span>&nbsp;</span> __ネイティブデスクトップアプリケーション__（例：Electron.jsで書かれたもの）
- 📦 <span>&nbsp;</span> ブラウザでのウェブコンポーネントの__ユニットまたはコンポーネントテスト__

## ウェブ標準に基づく

WebdriverIOは、すべてのブラウザベンダーによって開発・サポートされている[WebDriver](https://w3c.github.io/webdriver/)および[WebDriver-BiDi](https://github.com/w3c/webdriver-bidi)プロトコルの力を活用し、真のクロスブラウザテスト体験を保証します。他の自動化ツールでは、実際のユーザーが使用していない修正されたブラウザエンジンをダウンロードするか、JavaScriptを注入してユーザー行動をエミュレートする必要がありますが、WebdriverIOは[適切にテストされ](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned)、今後数十年にわたる互換性を確保する自動化のための共通の合意された標準に依存しています。

さらに、WebdriverIOはデバッグと内部検査の目的で[Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)のような代替の独自自動化プロトコルもサポートしています。これにより、ユーザーはWebDriverに基づく従来のコマンドと[Puppeteer](https://pptr.dev/)を介した強力なブラウザインタラクションの間をシームレスに切り替えることができます。

これらの自動化標準の違いについては、[自動化プロトコル](automationProtocols)のセクションで詳しく説明しています。

## 真のオープンソース

エコシステム内の多くの自動化ツールと比較して、WebdriverIOは、オープンガバナンスで運営され、[OpenJS Foundation](https://openjsf.org/)と呼ばれる非営利団体が所有する真のオープンソースプロジェクトです。これにより、プロジェクトは法的にすべての参加者の利益のために成長し、方向付けられることが保証されます。プロジェクトチームはオープン性とコラボレーションを重視し、金銭的な利益によって動かされていません。

これにより、プロジェクトの開発方法とその方向性が独立して決定されます。持続可能なコミュニティを構築し、お互いにサポートし学び合う[コミュニティチャンネル](https://discord.webdriver.io)で24時間365日の無料サポートを提供することができます。最後に、[オープンガバナンス](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md)のおかげで、プロジェクトに貢献し関わる人々に多くの機会を提供します。