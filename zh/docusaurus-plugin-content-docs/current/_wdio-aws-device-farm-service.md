---
id: wdio-aws-device-farm-service
title: AWS Device Farm 服务
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## WebdriverIO 的 AWS Device Farm 服务

[AWS Device Farm](https://aws.amazon.com/device-farm/) WebdriverIO 的服务。

此服务仅支持桌面浏览器测试。

## 升级到 WebDriverIO v8

从版本 v8.0.0 开始，该包现在支持 [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/)。但请注意，WebDriverIO v7 将继续支持，直到 2023 年 10 月其 [LTS 支持](https://webdriver.io/versions/) 结束。

随着升级到 v8 的主要版本，此包已转换为 ES 模块系统。现在它同时输出 CommonJS (CJS-) 和 ECMAScript Modules (ESM-) 兼容的模块。

## 安装

```
npm install --save-dev wdio-aws-device-farm-service
```

## 示例

您可以使用 `npm run example` 运行提供的示例。它需要：

1. 作为环境变量 `PROJECT_ARN` 的 AWS Device Farm 项目 ARN
2. AWS 凭证（[参见文档](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)）。请注意，AWS Device Farm 仅支持 `us-west-2`。您可以使用 `AWS_REGION` 环境变量强制指定 AWS 区域。

例如，使用 AWS 临时凭证时，它看起来是这样的：

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## 安全

有关更多信息，请参阅 [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications)。

## 获取帮助

与我们团队互动的最佳方式是通过 GitHub。您可以[开启一个 issue](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) 获取帮助或报告您遇到的任何问题。

## 许可证

该项目采用 Apache-2.0 许可证。