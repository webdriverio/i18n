---
id: why-webdriverio
title: なぜWebdriver.IOなのか？
---

WebdriverIOは、モダンなウェブおよびモバイルアプリケーションを自動化するために構築された進歩的な自動化フレームワークです。アプリケーションとの対話を簡素化し、スケーラブルで堅牢かつ安定したテストスイートを作成するのに役立つプラグインセットを提供します。

以下のような設計になっています：

- __拡張可能__ - ヘルパー関数や、既存のコマンドのより複雑なセットや組み合わせを追加することが__シンプル__で__非常に有用__です
- __互換性__ - WebdriverIOは[WebDriverプロトコル](https://w3c.github.io/webdriver/)上で__真のクロスブラウザテスト__のために実行できるだけでなく、[Puppeteer](https://pptr.dev/)を使用したChromiumベースの自動化のための[Chrome DevToolsプロトコル](https://chromedevtools.github.io/devtools-protocol/)でも実行できます。
- __機能豊富__ - 組み込みおよびコミュニティプラグインの豊富な種類により、セットアップを__簡単に統合__および__拡張__して要件を満たすことができます。

WebdriverIOを使用して以下を自動化できます：

- 🌐 <span>&nbsp;</span> React、Vue、Angular、Svelteまたはその他のフロントエンドフレームワークで書かれた__モダンなウェブアプリケーション__
- 📱 <span>&nbsp;</span> エミュレータ/シミュレータまたは実デバイスで実行される__ハイブリッド__または__ネイティブモバイルアプリケーション__
- 💻 <span>&nbsp;</span> __ネイティブデスクトップアプリケーション__（例：Electron.jsで書かれたもの）
- 📦 <span>&nbsp;</span> ブラウザ内でのウェブコンポーネントの__ユニットまたはコンポーネントテスト__

## ウェブ標準に基づく

WebdriverIOは[WebDriver](https://w3c.github.io/webdriver/)と[WebDriver-BiDi](https://github.com/w3c/webdriver-bidi)プロトコルのパワーを活用しています。これらは全てのブラウザベンダーによって開発・サポートされ、真のクロスブラウザテスト体験を保証します。他の自動化ツールが実際のユーザーが使用していない修正されたブラウザエンジンをダウンロードさせたり、JavaScriptを注入してユーザー行動をエミュレートしたりする必要がある一方、WebdriverIOは自動化のための共通の合意された標準に依存しており、それは[適切にテスト](https://wpt.fyi/results/webdriver/tests?label=experimental&label=master&aligned)され、今後数十年にわたる互換性を保証します。

さらに、WebdriverIOは、デバッグおよび内部検査の目的で[Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/)のような代替の独自自動化プロトコルもサポートしています。これにより、ユーザーはWebDriverに基づく従来のコマンドと[Puppeteer](https://pptr.dev/)を通じた強力なブラウザ操作の間をシームレスに切り替えることができます。

これらの自動化標準の違いについて詳しくは、[自動化プロトコル](automationProtocols)のセクションをご覧ください。

## 真のオープンソース

エコシステム内の多くの自動化ツールと比較して、WebdriverIOは[OpenJS Foundation](https://openjsf.org/)と呼ばれる非営利団体が所有し、オープンガバナンスで運営される真のオープンソースプロジェクトです。これにより、プロジェクトは法的に全ての参加者の利益のために成長し、方向づけられることが保証されています。プロジェクトチームはオープン性とコラボレーションを重視し、金銭的な利益に駆られることはありません。

これにより、プロジェクトの開発方法と向かうべき方向において独立性が保たれます。私たちは持続可能なコミュニティを構築し、互いに支援し学び合うために、[コミュニティチャンネル](https://discord.webdriver.io)で24時間無料サポートを提供することができます。最後に、[オープンガバナンス](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md)により、プロジェクトに貢献し関わる人々に多くの機会を提供しています。