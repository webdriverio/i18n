---
id: wdio-reportportal-service
title: レポートポータルサービス
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service は、サードパーティのパッケージです。詳細については [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service) をご覧ください。

## インストール
最も簡単な方法は、`wdio-reportportal-service` を `package.json` の devDependency として保持することです。
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
以下のようにインストールできます：

```bash
npm install wdio-reportportal-reporter --save-dev
```

`WebdriverIO` のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定
wdio.conf.js ファイルで出力ディレクトリを設定します：
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています - 詳細は [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) ファイルをご覧ください。