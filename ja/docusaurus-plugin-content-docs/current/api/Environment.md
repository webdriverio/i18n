---
id: environment
title: 環境変数
---

WebdriverIOは、各ワーカー内で以下の環境変数を設定します：

## `NODE_ENV`

他の値に設定されていない場合、`'test'`に設定されます。

## `WDIO_LOG_LEVEL`

`trace`、`debug`、`info`、`warn`、`error`、`silent`の値に設定でき、対応する詳細情報でログを記録します。渡された`logLevel`値よりも優先されます。

## `WDIO_WORKER_ID`

ワーカープロセスを識別するための一意のIDです。`{number}-{number}`の形式を持ち、最初の数字はケイパビリティを識別し、2番目の数字はそのケイパビリティが実行しているspecファイルを識別します。例えば、`0-5`は最初のケイパビリティの6番目のspecファイルを実行しているワーカーを示します。