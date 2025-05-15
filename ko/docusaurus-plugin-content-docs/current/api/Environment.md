---
id: environment
title: 환경 변수
---

WebdriverIO는 모든 워커 내에서 다음과 같은 환경 변수를 설정합니다:

## `NODE_ENV`

이미 다른 값으로 설정되어 있지 않다면 `'test'`로 설정됩니다.

## `WDIO_LOG_LEVEL`

`trace`, `debug`, `info`, `warn`, `error`, `silent` 값으로 설정하여 해당 세부 정보가 포함된 로그를 작성할 수 있습니다. 전달된 `logLevel` 값보다 우선순위가 높습니다.

## `WDIO_WORKER_ID`

워커 프로세스를 식별하는 데 도움이 되는 고유 ID입니다. `{number}-{number}` 형식을 가지며, 첫 번째 숫자는 기능(capability)을 식별하고 두 번째 숫자는 해당 기능이 실행 중인 스펙 파일을 식별합니다. 예를 들어, `0-5`는 첫 번째 기능에 대한 6번째 스펙 파일을 실행하는 워커를 나타냅니다.