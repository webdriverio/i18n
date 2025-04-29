---
id: wdio-reportportal-service
title: Report Portal 服务
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-service 是一个第三方包，更多信息请参见 [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## 安装
最简单的方法是将 `wdio-reportportal-service` 作为 devDependency 保存在您的 `package.json` 中。
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
您可以通过以下方式安装：

```bash
npm install wdio-reportportal-reporter --save-dev
```

有关如何安装 `WebdriverIO` 的说明可以在[这里](https://webdriver.io/docs/gettingstarted)找到。

## 配置
在您的 wdio.conf.js 文件中配置输出目录：
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## 许可证

该项目采用 MIT 许可证 - 详情请参阅 [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) 文件