---
id: protractor-migration
title: Protractorから移行する
---

このチュートリアルは、Protractorを使用していて、WebdriverIOにフレームワークを移行したい人向けです。これは、Angularチームが[Protractorのサポート終了を発表](https://github.com/angular/protractor/issues/5502)した後に始まりました。WebdriverIOはProtractorの多くの設計決定に影響を受けており、そのため移行先として最も近いフレームワークと言えるでしょう。WebdriverIOチームはすべてのProtractor貢献者の仕事に感謝し、このチュートリアルがWebdriverIOへの移行を容易かつ明快にすることを望んでいます。

完全に自動化されたプロセスを提供したいところですが、現実は異なります。誰もが異なるセットアップを持ち、Protractorを異なる方法で使用しています。各ステップは、ステップバイステップの指示というよりも、ガイダンスとして見るべきです。移行に問題がある場合は、遠慮なく[お問い合わせ](https://github.com/webdriverio/codemod/discussions/new)ください。

## セットアップ

ProtractorとWebdriverIO APIは実際にとても似ており、コマンドの大部分は[codemod](https://github.com/webdriverio/codemod)を通じて自動的に書き換えることができます。

codemodeをインストールするには、次のコマンドを実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## 戦略

移行戦略は多くあります。チームの規模、テストファイルの量、移行の緊急性によって、すべてのテストを一度に変換するか、ファイルごとに変換するかを選択できます。ProtractorはAngularバージョン15（2022年末）までメンテナンスが継続されるため、まだ十分な時間があります。ProtractorとWebdriverIOのテストを同時に実行し、新しいテストをWebdriverIOで書き始めることができます。時間的な余裕に応じて、まず重要なテストケースの移行を開始し、削除できるようなテストまで段階的に作業を進めることができます。

## まずは設定ファイルから

codemodeをインストールした後、最初のファイルの変換を開始できます。まず[WebdriverIOの設定オプション](configuration)を確認してください。設定ファイルは非常に複雑になる可能性があり、基本的な部分だけを移植し、特定のオプションを必要とするテストが移行される際に残りの部分を追加するという方法が理にかなっているかもしれません。

最初の移行では、設定ファイルのみを変換し、次のコマンドを実行します：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

あなたの設定ファイルの名前は異なる場合がありますが、原則は同じです：まず設定の移行から始めてください。

:::

## WebdriverIO依存関係のインストール

次のステップは、あるフレームワークから別のフレームワークへ移行するにつれて構築していく最小限のWebdriverIOセットアップを構成することです。まず、WebdriverIO CLIをインストールします：

```sh
npm install --save-dev @wdio/cli
```

次に、設定ウィザードを実行します：

```sh
npx wdio config
```

これにより、いくつかの質問が表示されます。この移行シナリオでは：
- デフォルトの選択肢を選びます
- サンプルファイルの自動生成はお勧めしません
- WebdriverIOファイル用に別のフォルダを選びます
- JasmineよりもMochaを選ぶことをお勧めします。

:::info なぜMochaなのか？
以前にProtractorでJasmineを使用していたかもしれませんが、Mochaはより良いリトライメカニズムを提供します。選択はあなた次第です！
:::

質問に回答した後、ウィザードは必要なパッケージをすべてインストールし、`package.json`に保存します。

## 設定ファイルの移行

変換された`conf.ts`と新しい`wdio.conf.ts`ができたら、ある設定から別の設定に設定を移行する時です。すべてのテストが実行できるために不可欠なコードのみを移植するようにしてください。私たちの例では、フック関数とフレームワークのタイムアウトを移植します。

ここからは`wdio.conf.ts`ファイルのみで作業を続けるため、元のProtractor設定にはもう変更を加える必要はありません。両方のフレームワークが並行して実行できるように元に戻し、一度に1つのファイルを移植することができます。

## テストファイルの移行

これで最初のテストファイルを移植する準備ができました。シンプルに始めるために、サードパーティパッケージやPageObjectsなどの他のファイルへの依存が少ないものから始めましょう。私たちの例では、最初に移行するファイルは`first-test.spec.ts`です。まず、新しいWebdriverIO設定がファイルを期待するディレクトリを作成し、そこにファイルを移動します：

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

次に、このファイルを変換しましょう：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

それだけです！このファイルはとてもシンプルなので、追加の変更は必要なく、すぐにWebdriverIOを実行してみることができます：

```sh
npx wdio run wdio.conf.ts
```

おめでとうございます🥳 最初のファイルの移行に成功しました！

## 次のステップ

ここからテストごと、ページオブジェクトごとに変換を続けます。特定のファイルでcodemodeが失敗し、次のようなエラーが発生する可能性があります：

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

一部のProtractorコマンドにはWebdriverIOでの代替がありません。この場合、codemodeはリファクタリング方法についてのアドバイスを提供します。このようなエラーメッセージが頻繁に発生する場合は、遠慮なく[問題を報告](https://github.com/webdriverio/codemod/issues/new)し、特定の変換の追加をリクエストしてください。codemodeはすでにProtractor APIの大部分を変換していますが、まだ改善の余地がたくさんあります。

## 結論

このチュートリアルがWebdriverIOへの移行プロセスのガイドになることを願っています。コミュニティは様々なチームや組織でテストしながら、codemodeの改善を続けています。フィードバックがある場合は[問題を報告](https://github.com/webdriverio/codemod/issues/new)したり、移行プロセスで困った場合は[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)することをためらわないでください。