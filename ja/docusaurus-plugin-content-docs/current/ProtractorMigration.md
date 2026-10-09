---
id: protractor-migration
title: Protractorからの移行
description: "codemodを活用して、依存関係、設定ファイル、テストファイルを含むProtractorのテストスイートをWebdriverIOへ段階的に移行します。"
---

このチュートリアルは、Protractorを使用していて、フレームワークをWebdriverIOに移行したい方を対象としています。Angularチームが、Protractorのサポートを終了すると[発表した](https://github.com/angular/protractor/issues/5502)ことを受けて作成されました。WebdriverIOはProtractorの多くの設計上の判断から影響を受けているため、おそらく最も移行しやすいフレームワークです。WebdriverIOチームは、Protractorのすべてのコントリビューターの尽力に感謝するとともに、このチュートリアルによってWebdriverIOへの移行が簡単かつスムーズになることを願っています。

完全に自動化されたプロセスがあれば理想的ですが、現実はそうではありません。セットアップは人それぞれ異なり、Protractorの使い方もさまざまです。各ステップは、手順書というよりもガイダンスとして捉えてください。移行で問題が発生した場合は、遠慮なく[お問い合わせください](https://github.com/webdriverio/codemod/discussions/new)。

## セットアップ

ProtractorとWebdriverIOのAPIは実際によく似ており、大部分のコマンドは[codemod](https://github.com/webdriverio/codemod)によって自動的に書き換えることができます。

codemodをインストールするには、次を実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## 戦略

移行戦略はたくさんあります。チームの規模、テストファイルの量、移行の緊急度に応じて、すべてのテストを一度に変換することも、ファイルごとに変換することもできます。ProtractorはAngularバージョン15（2022年末）までメンテナンスが継続されるため、まだ十分な時間があります。ProtractorとWebdriverIOのテストを同時に実行しながら、新しいテストはWebdriverIOで書き始めることができます。時間の余裕に応じて、まず重要なテストケースから移行を始め、削除してもよいかもしれないテストへと順に進めていくことができます。

## まずは設定ファイルから

codemodをインストールしたら、最初のファイルの変換を始めることができます。まず[WebdriverIOの設定オプション](configuration)を確認してください。設定ファイルは非常に複雑になることがあるため、必要不可欠な部分だけを移植し、特定のオプションを必要とするテストを移行する際に残りをどう追加できるかを検討するのが賢明かもしれません。

最初の移行では設定ファイルのみを変換し、次を実行します：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 設定ファイルの名前は異なる場合がありますが、原則は同じです：まず設定ファイルから移行を始めてください。

:::

## WebdriverIOの依存関係をインストールする

次のステップは、あるフレームワークから別のフレームワークへ移行しながら構築していくための、最小限のWebdriverIOセットアップを構成することです。まず、次のコマンドでWebdriverIO CLIをインストールします：

```sh
npm install --save-dev @wdio/cli
```

次に、設定ウィザードを実行します：

```sh
npx wdio config
```

これにより、いくつかの質問が表示されます。この移行シナリオでは、次のようにします：
- デフォルトの選択肢を選ぶ
- サンプルファイルは自動生成しないことを推奨します
- WebdriverIOのファイル用に別のフォルダを選ぶ
- JasmineではなくMochaを選ぶ

:::info なぜMochaなのか？
以前はProtractorをJasmineと一緒に使っていたかもしれませんが、Mochaのほうがより優れたリトライの仕組みを提供しています。選択はあなた次第です！
:::

簡単な質問に答え終わると、ウィザードは必要なパッケージをすべてインストールし、`package.json`に保存します。

## 設定ファイルを移行する

変換済みの`conf.ts`と新しい`wdio.conf.ts`が揃ったら、いよいよ一方の設定からもう一方へ設定を移行します。すべてのテストを実行するために必要不可欠なコードだけを移植するようにしてください。今回の例では、フック関数とフレームワークのタイムアウトを移植します。

ここからは`wdio.conf.ts`ファイルだけを扱うため、元のProtractorの設定に変更を加える必要はもうありません。両方のフレームワークを並行して実行し、1ファイルずつ移植できるように、それらの変更は元に戻しておくことができます。

## テストファイルを移行する

これで最初のテストファイルを移植する準備が整いました。簡単なところから始めるために、サードパーティのパッケージやPageObjectなどの他のファイルへの依存が少ないものから始めましょう。この例では、最初に移行するファイルは`first-test.spec.ts`です。まず、新しいWebdriverIOの設定がファイルを読み込むディレクトリを作成し、そこへファイルを移動します：

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

次に、このファイルを変換しましょう：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

以上です！このファイルは非常にシンプルなので、追加の変更は不要で、次のコマンドですぐにWebdriverIOを実行してみることができます：

```sh
npx wdio run wdio.conf.ts
```

おめでとうございます 🥳 最初のファイルの移行が完了しました！

## 次のステップ

ここからは、テストを1つずつ、ページオブジェクトを1つずつ変換していきます。ファイルによっては、codemodが次のようなエラーで失敗する可能性があります：

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Protractorのコマンドの中には、WebdriverIOに代替となるものが存在しないものもあります。その場合、codemodがリファクタリングの方法についてアドバイスを提示します。このようなエラーメッセージに頻繁に遭遇する場合は、気軽に[issueを作成](https://github.com/webdriverio/codemod/issues/new)して、特定の変換の追加をリクエストしてください。codemodはすでにProtractor APIの大部分を変換できますが、まだ改善の余地はたくさんあります。

## まとめ

このチュートリアルが、WebdriverIOへの移行プロセスの一助となれば幸いです。コミュニティは、さまざまな組織のさまざまなチームでテストしながら、codemodの改善を続けています。フィードバックがある場合は[issueを作成](https://github.com/webdriverio/codemod/issues/new)し、移行プロセスで困ったことがあれば[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)してください。遠慮は無用です。