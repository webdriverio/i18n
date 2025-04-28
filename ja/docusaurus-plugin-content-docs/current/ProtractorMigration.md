---
id: protractor-migration
title: Protractorからの移行
---

このチュートリアルは、Protractorを使用していて、フレームワークをWebdriverIOに移行したい人のためのものです。これは、AngularチームがProtractorのサポートを終了すると[発表した](https://github.com/angular/protractor/issues/5502)後に始まりました。WebdriverIOはProtractorの多くの設計上の決定に影響を受けており、そのため移行先として最も近いフレームワークと言えるでしょう。WebdriverIOチームは全てのProtractor貢献者の仕事に感謝し、このチュートリアルがWebdriverIOへの移行を簡単かつ分かりやすくすることを望んでいます。

完全に自動化されたプロセスがあれば理想的ですが、現実は異なります。誰もが異なるセットアップを持ち、Protractorを異なる方法で使用しています。各ステップはステップバイステップの指示というよりもガイダンスとして捉えるべきです。移行に問題がある場合は、遠慮なく[お問い合わせください](https://github.com/webdriverio/codemod/discussions/new)。

## セットアップ

ProtractorとWebdriverIOのAPIは実際にとても似ており、コマンドの大部分は[codemod](https://github.com/webdriverio/codemod)を通じて自動的に書き換えることができます。

codemodをインストールするには、次のコマンドを実行します：

```sh
npm install jscodeshift @wdio/codemod
```

## 戦略

移行戦略は多数あります。チームの規模、テストファイルの数、移行の緊急性に応じて、すべてのテストを一度に変換するか、ファイルごとに変換するかを試すことができます。ProtractorはAngularバージョン15（2022年末）までメンテナンスが続くため、まだ十分な時間があります。ProtractorとWebdriverIOのテストを同時に実行し、新しいテストをWebdriverIOで書き始めることができます。時間の予算に応じて、まず重要なテストケースから移行を始め、最終的には削除できるかもしれないテストまで順に移行していくことができます。

## まずは設定ファイルから

codemodをインストールした後、最初のファイルの変換を開始できます。まず[WebdriverIOの設定オプション](configuration)を確認してください。設定ファイルは非常に複雑になる可能性があり、必須部分だけを移植して、対応するテストが移行されるときに残りのオプションを追加する方が良いでしょう。

最初の移行では設定ファイルのみを変換し、以下を実行します：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

設定ファイルの名前は異なる場合がありますが、原則は同じです：まず設定ファイルの移行から始めてください。

:::

## WebdriverIOの依存関係をインストール

次のステップは、あるフレームワークから別のフレームワークへの移行を始めるにあたり、最小限のWebdriverIOセットアップを構成することです。まず、WebdriverIO CLIをインストールします：

```sh
npm install --save-dev @wdio/cli
```

次に、設定ウィザードを実行します：

```sh
npx wdio config
```

これにより、いくつかの質問に回答することになります。この移行シナリオでは：
- デフォルトの選択肢を選びます
- サンプルファイルを自動生成しないことをお勧めします
- WebdriverIOファイル用に異なるフォルダを選びます
- JasmineよりもMochaを選ぶことをお勧めします

:::info なぜMochaなのか？
以前にProtractorをJasmineで使用していたとしても、Mochaはより良いリトライメカニズムを提供します。選択はあなた次第です！
:::

質問が終わるとウィザードは必要なパッケージをすべてインストールし、`package.json`に保存します。

## 設定ファイルを移行する

変換された`conf.ts`と新しい`wdio.conf.ts`ができたら、設定を一方から他方に移行する時間です。すべてのテストが実行できるように必須のコードだけを移植するようにしてください。私たちの例ではフック関数とフレームワークのタイムアウトを移植します。

これからは`wdio.conf.ts`ファイルのみを継続して使用するため、元のProtractor設定への変更は必要なくなります。両方のフレームワークが並行して実行できるように元に戻し、一度に一つのファイルを移植することができます。

## テストファイルを移行する

これで最初のテストファイルを移植する準備ができました。簡単に始めるために、サードパーティのパッケージやPageObjectsなどの他のファイルへの依存が少ないものから始めましょう。例では最初に移行するファイルは`first-test.spec.ts`です。まず、新しいWebdriverIO設定が期待するディレクトリを作成し、そこにファイルを移動します：

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

次にこのファイルを変換しましょう：

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

それだけです！このファイルはとてもシンプルなので、追加の変更は必要なく、直接WebdriverIOを実行してみることができます：

```sh
npx wdio run wdio.conf.ts
```

おめでとうございます🥳 最初のファイルを移行しました！

## 次のステップ

この時点から、テストごと、ページオブジェクトごとに変換を続けます。特定のファイルでcodemodが失敗する可能性があり、次のようなエラーが表示されることがあります：

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

一部のProtractorコマンドには、WebdriverIOでの代替がありません。この場合、codemodはリファクタリング方法についてのアドバイスを提供します。このようなエラーメッセージにあまりにも頻繁に遭遇する場合は、[問題を提起](https://github.com/webdriverio/codemod/issues/new)して特定の変換の追加をリクエストしてください。codemodはすでにProtractor APIの大部分を変換していますが、まだ改善の余地はたくさんあります。

## 結論

このチュートリアルがWebdriverIOへの移行プロセスをガイドする一助となれば幸いです。コミュニティは様々な組織の様々なチームでテストしながら、codemodの改善を続けています。フィードバックがある場合は[問題を提起](https://github.com/webdriverio/codemod/issues/new)し、移行プロセスで問題が発生した場合は[ディスカッションを開始](https://github.com/webdriverio/codemod/discussions/new)することをためらわないでください。