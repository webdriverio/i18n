---
id: faq
title: 자주 묻는 질문
---

### `check(Screen/Element/FullPageScreen)`을 실행할 때 `save(Screen/Element/FullPageScreen)` 메소드를 사용해야 하나요?

아니요, 그럴 필요가 없습니다. `check(Screen/Element/FullPageScreen)`이 자동으로 이 작업을 처리해 줍니다.

### 내 시각적 테스트가 차이로 인해 실패했습니다. 어떻게 기준 이미지를 업데이트할 수 있나요?

명령줄에 `--update-visual-baseline` 인수를 추가하여 기준 이미지를 업데이트할 수 있습니다. 이렇게 하면

-   실제 촬영된 스크린샷을 자동으로 복사하여 기준 폴더에 저장합니다
-   차이가 있어도 기준이 업데이트되었기 때문에 테스트가 통과됩니다

**사용법:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

로그 정보/디버그 모드에서 실행할 때 다음과 같은 로그가 추가됩니다

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

### 너비와 높이는 음수가 될 수 없습니다

`Width and height cannot be negative` 오류가 발생할 수 있습니다. 10번 중 9번은 보기에 없는 요소의 이미지를 생성하려고 할 때 관련됩니다. 요소의 이미지를 만들기 전에 항상 해당 요소가 보기 내에 있는지 확인하십시오.

### Windows에서 Canvas 설치가 Node-Gyp 로그와 함께 실패했습니다

Windows에서 Node-Gyp 오류로 인해 Canvas 설치에 문제가 발생하는 경우, 이는 버전 4 이하에만 적용됩니다. 이러한 문제를 피하려면 이러한 종속성이 없고 이미지 처리에 [Jimp](https://github.com/jimp-dev/jimp)를 사용하는 버전 5 이상으로 업데이트하는 것을 고려하세요.

버전 4에서 문제를 해결해야 하는 경우 다음을 확인하세요:

-   [시작하기](/docs/visual-testing#system-requirements) 가이드의 Node Canvas 섹션
-   Windows에서 Node-Gyp 문제 해결에 관한 [이 게시물](https://spin.atomicobject.com/2019/03/27/node-gyp-windows/) (IgorSasovets에게 감사드립니다)