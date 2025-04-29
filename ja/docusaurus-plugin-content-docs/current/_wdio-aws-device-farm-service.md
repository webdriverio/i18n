---
id: wdio-aws-device-farm-service
title: AWS Device Farm サービス
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-serviceはサードパーティパッケージです。詳細については[GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)をご覧ください
## WebdriverIOのためのAWS Device Farmサービス

[AWS Device Farm](https://aws.amazon.com/device-farm/) service for WebdriverIO.

このサービスはデスクトップブラウザテストのみをサポートしています。

## WebDriverIO v8へのアップグレード

このパッケージは、バージョンv8.0.0から[WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/)のサポートを提供するようになりました。ただし、WebDriverIO v7は2023年10月までの[LTSサポート](https://webdriver.io/versions/)期間中はサポートが継続されることにご注意ください。

v8へのメジャーバージョンアップグレードにより、このパッケージはESモジュールシステムに移行しました。また、CommonJS (CJS-) およびECMAScript Modules (ESM-) の両方の互換モジュールを出力するようになりました。

## インストール

```
npm install --save-dev wdio-aws-device-farm-service
```

## 例

提供されている例は`npm run example`で実行できます。以下が必要です：

1. 環境変数`PROJECT_ARN`としてのAWS Device FarmプロジェクトのARN
2. AWSの認証情報（[ドキュメントを参照](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)）。AWS Device Farmは`us-west-2`のみをサポートしていることに注意してください。`AWS_REGION`環境変数でAWSリージョンを強制できます。

例えば、AWS一時認証情報を使用する場合は次のようになります：

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## セキュリティ

詳細については[CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications)を参照してください。

## サポートを受ける

私たちのチームと交流する最良の方法はGitHubを通じてです。[問題を開く](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new)ことで、サポートを受けたり、経験した問題を報告したりすることができます。

## ライセンス

このプロジェクトはApache-2.0ライセンスの下でライセンスされています。