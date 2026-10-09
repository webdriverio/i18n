---
id: debug
title: セッションでテストをデバッグする
description: 失敗した WebdriverIO の実行を一時停止して wdio session で調査し、その後再開またはクローズします。
---

`wdio run --debug=agent` は、`await browser.debug()` の箇所およびテストが失敗した後にワーカーを一時停止し、フレームワークのタイムアウトを 24 時間に引き上げます。この一時停止は Mocha のテストと Cucumber のステップの両方に適用されます。実行時にはセッション名が出力されます（最初のワーカーの場合は `debug-0-0`）：

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

そのセッションで `close` を実行すると、一時停止中のテストは `Session closed from wdio session` で失敗します。テストを続行させたい場合は resume を使用してください。一時停止した時点で実行を失敗させたい場合は close を使用してください。

`--debug=agent` を指定しない場合でも、`browser.debug()` はテスト内で [REPL](/docs/repl) を開きます。`--debug=agent` は、コーディングエージェントを含む別のプロセスが `wdio session` を使って一時停止中のワーカーを操作できるようにするための手段です。

## REPL をアタッチする

`wdio repl --session <name>` は、すでに開いているセッションにアタッチし、終了時にもそのセッションを実行したままにします：

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

REPL の各行は `wdio session exec` として実行されます。`.exit` を実行すると `Detached from "default" (still running)` が出力されます。

## Doctor

`npx wdio session doctor` は、セッションを開く前に Node.js、ブラウザ、Appium、SDK、およびクラウドの認証情報をチェックします。`doctor <target>` は、そのターゲットに必要なものだけをチェックします。チェックが失敗した場合、プロセスは終了コード 1 で終了します。起動中のセッションはそのまま残されます。プロセスが存在しなくなったセッションは削除されます。

## トラブルシューティング

| メッセージ | 対処方法 |
| --- | --- |
| `Session closed from wdio session` | デバッグセッションをクローズしました。テストを続行させたい場合は `resume` を使用してください。 |
| `debug-0-0` セッションがない | 実行がまだ一時停止していないか、別のワーカー ID が使用されています。`wdio session list` で名前を確認できます。 |
| 一時停止が発生しない | コマンドは `wdio run --debug=agent` である必要があります。成功したテストは、`browser.debug()` を呼び出さない限り一時停止しません。 |

## 次のステップ

- [デバッグ](/docs/debugging) — `browser.debug()`、ブレークポイント、不安定なテスト
- [REPL](/docs/repl) — インタラクティブシェル
- [wdio session](/docs/session) — テスト実行にアタッチされていないセッションを開く