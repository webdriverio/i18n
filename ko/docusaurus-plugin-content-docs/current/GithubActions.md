---
id: githubactions
title: Github Actions
---

만약 당신의 리포지토리가 Github에 호스팅되어 있다면, [Github Actions](https://docs.github.com/en/actions)를 사용하여 Github의 인프라에서 테스트를 실행할 수 있습니다.

1. 변경사항을 푸시할 때마다
2. 모든 풀 리퀘스트 생성 시
3. 예약된 시간에
4. 수동 트리거로

리포지토리의 루트에 `.github/workflows` 디렉토리를 생성하세요. 예를 들어 `.github/workflows/ci.yaml`과 같은 Yaml 파일을 추가하세요. 여기서 테스트 실행 방법을 구성할 수 있습니다.

참조 구현을 위해 [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml)를 확인하고, [샘플 테스트 실행](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI)을 참조하세요.

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

워크플로우 파일 생성에 대한 자세한 정보는 [Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli)에서 확인하세요.