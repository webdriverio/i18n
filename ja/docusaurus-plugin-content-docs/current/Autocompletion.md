---
id: autocompletion
title: オートコンプリート
---

## IntelliJ

オートコンプリートはIDEAとWebStormでは最初から動作します。

しばらくプログラムコードを書いていると、おそらくオートコンプリート機能が気に入っているでしょう。オートコンプリートは多くのコードエディタで標準で利用可能です。

![Autocompletion](/img/autocompletion/0.png)

[JSDoc](http://usejsdoc.org/)に基づく型定義は、コードを文書化するために使用されています。これにより、パラメータとその型に関する詳細情報を確認できます。

![Autocompletion](/img/autocompletion/1.png)

IntelliJプラットフォームで標準のショートカット<kbd>⇧ + ⌥ + SPACE</kbd>を使用して、利用可能なドキュメントを表示できます：

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Codeでは通常、型サポートが自動的に統合されており、特別な操作は必要ありません。

![Autocompletion](/img/autocompletion/14.png)

バニラJavaScriptを使用していて、適切な型サポートを持ちたい場合は、プロジェクトのルートに`jsconfig.json`を作成し、使用するwdioパッケージを参照する必要があります：

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