---
id: autocompletion
title: オートコンプリート
---

## IntelliJ

オートコンプリートはIDEAとWebStormですぐに使用できます。

プログラムコードを書いたことがある場合は、オートコンプリートが好きなはずです。オートコンプリートは多くのコードエディタで標準装備されています。

![Autocompletion](/img/autocompletion/0.png)

[JSDoc](http://usejsdoc.org/)に基づいた型定義がコードの文書化に使用されています。これにより、パラメータとその型についてより詳細な情報を確認できます。

![Autocompletion](/img/autocompletion/1.png)

IntelliJ Platformでは標準のショートカット<kbd>⇧ + ⌥ + SPACE</kbd>を使用して利用可能なドキュメントを確認できます：

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Codeには通常、型サポートが自動的に統合されており、追加の操作は必要ありません。

![Autocompletion](/img/autocompletion/14.png)

バニラJavaScriptを使用していて、適切な型サポートが必要な場合は、プロジェクトのルートに`jsconfig.json`を作成し、使用するwdioパッケージを参照する必要があります。例：

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