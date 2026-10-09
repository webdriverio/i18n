---
id: autocompletion
title: オートコンプリート
description: "IntelliJ、WebStorm、Visual Studio CodeでWebdriverIOコマンドのオートコンプリートとインラインAPIドキュメントを利用できます。"
---

## IntelliJ

IDEAとWebStormでは、オートコンプリートは追加の設定なしですぐに機能します。

しばらくプログラムコードを書いてきた方なら、おそらくオートコンプリートを気に入っていることでしょう。オートコンプリートは多くのコードエディタで標準で利用できます。

![Autocompletion](/img/autocompletion/0.png)

コードのドキュメント化には、[JSDoc](http://usejsdoc.org/)に基づく型定義が使用されています。これにより、パラメータとその型に関する追加の詳細を確認できます。

![Autocompletion](/img/autocompletion/1.png)

IntelliJ Platformでは、標準のショートカット<kbd>⇧ + ⌥ + SPACE</kbd>を使用して利用可能なドキュメントを表示できます：

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Codeには通常、型サポートが自動的に統合されているため、特に操作は必要ありません。

![Autocompletion](/img/autocompletion/14.png)

素のJavaScriptを使用していて適切な型サポートを得たい場合は、プロジェクトのルートに`jsconfig.json`を作成し、使用しているwdioパッケージを参照する必要があります。例：

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```