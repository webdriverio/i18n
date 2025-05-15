---
id: sharding
title: 샤딩
---

기본적으로 WebdriverIO는 테스트를 병렬로 실행하며 기기의 CPU 코어를 최적으로 활용하기 위해 노력합니다. 더 높은 병렬화를 달성하기 위해 여러 기기에서 동시에 테스트를 실행하여 WebdriverIO 테스트 실행을 확장할 수 있습니다. 이러한 작동 모드를 "샤딩"이라고 합니다.

## 여러 기기 간 테스트 샤딩

테스트 스위트를 샤딩하려면 명령줄에 `--shard=x/y`를 전달하세요. 예를 들어, 스위트를 4개의 샤드로 나누어 각각 테스트의 4분의 1을 실행하려면:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

이제 이러한 샤드를 다른 컴퓨터에서 병렬로 실행하면 테스트 스위트가 4배 빠르게 완료됩니다.

## GitHub Actions 예제

GitHub Actions는 [`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) 옵션을 사용하여 [여러 작업 간 테스트 샤딩](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)을 지원합니다. 매트릭스 옵션은 제공된 옵션의 모든 가능한 조합에 대해 별도의 작업을 실행합니다.

다음 예제는 4대의 기기에서 병렬로 테스트를 실행하도록 작업을 구성하는 방법을 보여줍니다. 전체 파이프라인 설정은 [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml) 프로젝트에서 찾을 수 있습니다.

-   먼저 생성하려는 샤드 수가 포함된 샤드 옵션으로 작업 구성에 매트릭스 옵션을 추가합니다. `shard: [1, 2, 3, 4]`는 각각 다른 샤드 번호를 가진 4개의 샤드를 생성합니다.
-   그런 다음 `--shard ${{ matrix.shard }}/${{ strategy.job-total }}` 옵션으로 WebdriverIO 테스트를 실행합니다. 이것이 각 샤드의 테스트 명령이 됩니다.
-   마지막으로 wdio 로그 보고서를 GitHub Actions Artifacts에 업로드합니다. 이렇게 하면 샤드가 실패할 경우 로그를 사용할 수 있습니다.

테스트 파이프라인은 다음과 같이 정의됩니다:

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

이것은 모든 샤드를 병렬로 실행하여 테스트 실행 시간을 4배 줄입니다:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) 프로젝트의 [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) 커밋을 참조하세요. 이 커밋은 테스트 파이프라인에 샤딩을 도입하여 전체 실행 시간을 `2:23 분`에서 `1:30 분`으로 줄였습니다. 즉, __37%__ 감소되었습니다 🎉.