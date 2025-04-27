---
id: sharding
title: 分片
---

默认情况下，WebdriverIO 并行运行测试，并努力在您的机器上实现 CPU 核心的最佳利用率。为了实现更大的并行化，您可以通过同时在多台机器上运行测试来进一步扩展 WebdriverIO 测试执行。我们称这种操作模式为"分片"。

## 在多台机器之间分片测试

要对测试套件进行分片，请在命令行中传递 `--shard=x/y`。例如，要将套件分成四个分片，每个分片运行四分之一的测试：

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

现在，如果您在不同的计算机上并行运行这些分片，您的测试套件完成速度将提高四倍。

## GitHub Actions 示例

GitHub Actions 支持[在多个作业之间分片测试](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)，使用 [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) 选项。矩阵选项将为提供的选项的每种可能组合运行单独的作业。

以下示例向您展示如何配置一个作业，以在四台机器上并行运行测试。您可以在 [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml) 项目中找到完整的流水线设置。

- 首先，我们在作业配置中添加一个矩阵选项，其中包含我们要创建的分片数量的分片选项。`shard: [1, 2, 3, 4]` 将创建四个分片，每个分片具有不同的分片编号。
- 然后我们使用 `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` 选项运行我们的 WebdriverIO 测试。这将是每个分片的测试命令。
- 最后，我们将 wdio 日志报告上传到 GitHub Actions Artifacts。这将使日志在分片失败的情况下可用。

测试流水线定义如下：

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

这将并行运行所有分片，将测试的执行时间减少 4 倍：

![GitHub Actions 示例](/img/sharding.png "GitHub Actions 示例")

请参阅 [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) 项目中引入分片到其测试流水线的提交 [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8)，这帮助将总体执行时间从 `2:23 分钟` 减少到 `1:30 分钟`，减少了 __37%__ 🎉。