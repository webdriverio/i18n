---
id: githubactions
title: Github Actions
---

如果您的仓库托管在Github上，您可以使用[Github Actions](https://docs.github.com/en/actions)在Github的基础设施上运行您的测试。

1. 每次推送更改时
2. 在每次创建拉取请求时
3. 在计划的时间
4. 通过手动触发

在您仓库的根目录中，创建一个`.github/workflows`目录。添加一个Yaml文件，例如`.github/workflows/ci.yaml`。在那里您将配置如何运行您的测试。

参考[jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml)的实现，以及[示例测试运行](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI)。

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

在[Github文档](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli)中了解更多关于创建工作流文件的信息。