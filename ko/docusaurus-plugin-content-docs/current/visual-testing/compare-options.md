---
id: compare-options
title: 비교 옵션
---

비교 옵션은 [ResembleJS](https://github.com/Huddle/Resemble.js)에 의해 실행되는 비교 방식에 영향을 미치는 옵션입니다.

:::info 참고
모든 비교 옵션은 서비스 인스턴스 생성 시 또는 각각의 `checkElement`, `checkScreen`, `checkFullPageScreen` 메서드에서 사용할 수 있습니다. 만약 메서드 옵션이 서비스 인스턴스 생성 시 설정된 옵션과 동일한 키를 가진다면, 메서드 비교 옵션이 서비스 비교 옵션 값을 재정의합니다.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지를 비교할 때 알파 채널을 무시합니다.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkScreen()`에서만 사용할 수 있습니다. 플러그인 설정을 재정의합니다. 이것은 **iPad에서만 적용됩니다**_

가로 모드의 iPad에서 비교할 때 사이드바를 자동으로 차단합니다. 이것은 탭/비공개/북마크 네이티브 컴포넌트에서 실패를 방지합니다.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다. 이것은 **모바일에서만 적용됩니다**_

비교할 때 상태 표시줄과 주소 표시줄을 자동으로 차단합니다. 이렇게 하면 시간, 와이파이 또는 배터리 상태에 따른 실패를 방지할 수 있습니다.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다. 이것은 **모바일에서만 적용됩니다**_

툴바를 자동으로 차단합니다.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지를 비교할 때 안티앨리어싱을 무시합니다.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지가 컬러이더라도 비교 시 흑백 이미지 2개를 비교합니다.

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지를 비교할 때 `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` 값으로 비교합니다.

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지를 비교할 때 `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` 값으로 비교합니다.

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

이미지를 비교할 때 한 이미지에서 투명도가 있는 모든 픽셀을 무시합니다.

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

true인 경우 반환되는an 백분율은 `0.12345678`와 같이 표시되며, 기본값은 `0.12`입니다.

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

모든 비교 데이터를 반환하며, 불일치 백분율만 반환하지 않습니다.

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

차이가 있는 이미지를 저장하지 않도록 하는 `misMatchPercentage`의 허용 가능한 값입니다.

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

큰 이미지를 비교하면 성능 문제가 발생할 수 있습니다.
여기서 픽셀 수를 지정하면(0보다 큰 경우), 이미지 너비나 높이가 `largeImageThreshold` 픽셀보다 클 때 비교 알고리즘이 일부 픽셀을 건너뜁니다.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _`checkElement`, `checkScreen()` 및 `checkFullPageScreen()`에서도 사용할 수 있습니다. 플러그인 설정을 재정의합니다_

비교 실행 전에 두 이미지를 같은 크기로 조정합니다. `ignoreAntialiasing`과 `ignoreAlpha`를 활성화하는 것을 적극 권장합니다.