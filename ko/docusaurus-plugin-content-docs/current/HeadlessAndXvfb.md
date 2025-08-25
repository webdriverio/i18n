---
id: headless-and-xvfb
title: 테스트러너와 함께 Headless 및 Xvfb 사용하기
description: WebdriverIO가 Linux에서 헤드리스 테스트를 위해 Xvfb를 어떻게 사용하는지, 구성 옵션, CI 레시피 및 문제 해결 방법.
---

이 페이지는 WebdriverIO 테스트러너가 Xvfb(X Virtual Framebuffer)를 사용하여 Linux에서 헤드리스 실행을 지원하는 방법을 설명합니다. Xvfb가 유용한 경우, 구성 방법, CI 및 Docker에서의 동작 방식을 다룹니다.

## Xvfb와 네이티브 헤드리스 사용 시기

- 가능한 경우 최소한의 오버헤드를 위해 네이티브 헤드리스(예: Chrome `--headless=...`)를 사용하세요.
- 다음과 같은 경우 Xvfb를 사용하세요:
  - Electron이나 윈도우 매니저 또는 데스크톱 환경이 필요한 앱을 테스트할 때
  - GLX나 윈도우 매니저 의존적 동작에 의존할 때
  - 도구가 디스플레이 서버(`DISPLAY`)를 기대할 때
  - 다음과 같은 Chromium 오류가 발생할 때:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    사용자 데이터 디렉토리 충돌 오류는 종종 브라우저 충돌과 이전 인스턴스의 동일한 프로필 디렉토리를 재사용하는 즉각적인 재시작의 결과일 수 있으므로 오해의 소지가 있습니다. 안정적인 디스플레이(예: Xvfb를 통해)를 보장하면 종종 해결됩니다 - 그렇지 않으면 작업자당 고유한 `--user-data-dir`를 전달해야 합니다.

## 구성

Xvfb 동작을 제어하는 네 가지 러너 옵션:

- `autoXvfb` (boolean, 기본값: true)
  - 사용에 대한 권위 있는 토글. `false`이면 러너는 절대 Xvfb를 사용하지 않습니다.
  - `true`이면 필요할 때 러너가 Xvfb를 사용할 수 있습니다.

- `xvfbAutoInstall` (boolean, 기본값: false)
  - `xvfb-run`이 없을 경우 자동 설치 활성화
  - false일 경우, 러너는 경고하고 설치 없이 계속 진행합니다

- `xvfbAutoInstallMode` ('root' | 'sudo', 기본값: 'sudo')
  - 'root': 루트로 실행 중일 때만 설치(sudo 없음)
  - 'sudo': 루트가 아닌 경우 비대화형 sudo(`sudo -n`) 허용; sudo가 없으면 건너뜀

- `xvfbAutoInstallCommand` (string | string[], 선택 사항)
  - 내장 패키지 관리자 감지 대신 사용할 사용자 지정 설치 명령
  - 제공될 경우, 이 명령은 그대로 실행되며 내장 설치 로직을 재정의합니다

- `xvfbMaxRetries` (number, 기본값: 3)
  - xvfb 프로세스 실패에 대한 재시도 횟수.
  - Xvfb 시작이 가끔 실패할 수 있는 불안정한 CI 환경에 유용합니다.

- `xvfbRetryDelay` (number, 기본값: 1000)
  - xvfb 프로세스 실패에 대한 재시도 간 기본 지연 시간(밀리초).
  - 점진적 지연 사용: 지연 × 시도 횟수(예: 1000ms, 2000ms, 3000ms 등).

예시:

```ts
export const config: WebdriverIO.Config = {
  // 필요할 때 Xvfb 사용
  autoXvfb: true,

  // sudo를 사용하여 Xvfb 패키지 자동 설치
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // 필요할 때 Xvfb 사용
  autoXvfb: true,

  // 사용자 지정 명령어와 sudo를 사용하여 Xvfb 패키지 자동 설치
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // 필요할 때 Xvfb 사용
  autoXvfb: true,

  // sudo를 사용하여 Xvfb 패키지 자동 설치
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // 불안정한 CI 환경을 위한 재시도 동작 구성
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## 감지 로직

- 러너는 다음 조건에서 Xvfb를 고려합니다:

  - Linux에서 실행 중
  - `DISPLAY`가 설정되지 않았거나(헤드리스 환경), 헤드리스 브라우저 플래그가 전달됨

- `DISPLAY`가 설정된 경우, 러너는 기본적으로 Xvfb를 강제하지 않고 기존 X 서버/윈도우 매니저를 존중합니다.

참고:
- `autoXvfb: false`는 Xvfb 사용을 완전히 비활성화합니다(`xvfb-run`으로 래핑 안 함).
- `xvfbAutoInstall`은 `xvfb-run`이 없는 경우에만 설치에 영향을 미칩니다; 사용 여부를 켜거나 끄지 않습니다.
- `xvfbAutoInstallMode`는 설치 방법을 제어합니다: 'root'는 루트 전용 설치, 'sudo'는 sudo 기반 설치(기본값: 'sudo').
- 내장 패키지 설치는 항상 비대화형입니다. 'sudo' 모드를 선택하지 않는 한 루트 전용입니다.
- 재시도 메커니즘은 점진적 지연을 사용합니다: `xvfbRetryDelay × 시도 횟수`(예: 1000ms, 2000ms, 3000ms 등).

## CI에서 기존 DISPLAY 사용하기

CI가 자체 X 서버/윈도우 매니저(예: `Xvfb :99` 및 WM)를 설정하는 경우:

- `autoXvfb: true`를 유지하고 `DISPLAY`가 내보내지도록 합니다; 러너는 이를 존중하고 래핑을 피합니다.
- 또는 `autoXvfb: false`를 설정하여 러너의 모든 Xvfb 동작을 명시적으로 비활성화합니다.

## CI 및 Docker 레시피

GitHub Actions (네이티브 헤드리스 사용):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (누락되고 옵트인된 경우 Xvfb를 통한 가상 디스플레이):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (Ubuntu/Debian 예시 – xvfb 사전 설치):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

다른 배포판의 경우, 패키지 관리자와 패키지 이름을 적절히 조정하세요(예: Fedora/RHEL 기반에서는 `dnf install xorg-x11-server-Xvfb`, openSUSE/SLE에서는 `zypper install xvfb-run`).

## 자동 설치 지원 (xvfbAutoInstall)

`xvfbAutoInstall`이 활성화되면, WebdriverIO는 시스템 패키지 관리자를 사용하여 `xvfb`를 설치하려고 시도합니다. 다음 관리자 및 패키지가 지원됩니다:

| 패키지 관리자 | 명령           | 배포판 (예시)                                               | 패키지 이름                    |
|---------------|----------------|-------------------------------------------------------------|----------------------------------|
| apt           | `apt-get`      | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin 등         | `xvfb`                           |
| dnf           | `dnf`          | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite 등          | `xorg-x11-server-Xvfb`           |
| yum           | `yum`          | CentOS, RHEL (레거시)                                        | `xorg-x11-server-Xvfb`           |
| zypper        | `zypper`       | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman        | `pacman`       | Arch Linux, Manjaro, EndeavourOS, CachyOS 등                | `xorg-server-xvfb`               |
| apk           | `apk`          | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install  | `xbps-install` | Void Linux                                                  | `xvfb`                           |

참고:
- 환경에서 다른 패키지 관리자를 사용하는 경우, 설치는 오류와 함께 실패합니다; `xvfb`를 수동으로 설치하세요.
- 패키지 이름은 배포판마다 다릅니다; 표는 패밀리별 일반적인 이름을 반영합니다.

## 문제 해결

- "xvfb-run failed to start"
  - 러너는 점진적 백오프로 Xvfb 관련 실패를 자동으로 재시도합니다. 실패가 지속되면 불안정한 환경에서 `xvfbMaxRetries`와 `xvfbRetryDelay`를 늘리세요.

- CI에서 예기치 않게 Xvfb가 래핑됨
  - 사용자 정의 `DISPLAY` / WM 설정이 있는 경우, `autoXvfb: false`를 설정하거나 러너가 시작되기 전에 `DISPLAY`가 내보내지도록 하세요.

- `xvfb-run` 누락
  - 환경 수정을 피하려면 `xvfbAutoInstall: false`를 유지하세요; 기본 이미지를 통해 설치하거나 옵트인하려면 `xvfbAutoInstall: true`를 설정하세요.

- CI에서 Xvfb 시작 실패가 자주 발생
  - 불안정한 환경에서 더 탄력적인 동작을 위해 `xvfbMaxRetries`(예: 5-10으로)와 `xvfbRetryDelay`(예: 2000ms로)를 늘리세요.

## 고급

- 러너는 Xvfb가 필요하고 사용 가능한 경우 노드 워커를 `xvfb-run`으로 래핑하는 팩토리를 통해 프로세스를 생성합니다.
- 헤드리스 브라우저 플래그(Chrome/Edge/Firefox)는 헤드리스 사용을 신호하고 `DISPLAY`가 없는 환경에서 Xvfb를 트리거할 수 있습니다.