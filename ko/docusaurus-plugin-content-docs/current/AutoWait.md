---
id: autowait
title: 자동 대기
---

WebdriverIO에서 요소와 직접 상호작용하는 명령을 사용할 때, 요소가 보이고 상호작용 가능할 때까지 자동으로 대기합니다. 명령(예: click, setValue 등)을 사용할 때 수동으로 대기할 필요가 없습니다.
요소는 [isClickable](https://webdriver.io/docs/api/element/isClickable)의 조건이 충족될 때 상호작용 가능한 것으로 간주됩니다.

WebdriverIO가 요소가 상호작용 가능해질 때까지 자동으로 대기하지만, 수동으로 대기해야 하는 드문 경우가 있습니다. 이러한 드문 경우를 위해 [`waitForDisplayed`](/docs/api/element/waitForDisplayed)와 같은 명령어를 제공합니다.


## 암시적 타임아웃 (권장하지 않음)

권장하지는 않지만 WebDriver 프로토콜은 드라이버가 요소가 나타날 때까지 얼마나 오래 기다려야 하는지 지정할 수 있는 [암시적 타임아웃](https://w3c.github.io/webdriver/#timeouts)을 제공합니다. 기본적으로 이 타임아웃은 `0`으로 설정되어 있어 페이지에서 요소를 찾을 수 없으면 드라이버가 즉시 `no such element` 오류를 반환합니다. [`setTimeout`](/docs/api/browser/setTimeout)을 사용하여 이 타임아웃을 늘리면 드라이버가 기다리게 되고 요소가 결국 나타날 가능성이 높아집니다.

:::note

WebDriver 및 프레임워크 관련 타임아웃에 대한 자세한 내용은 [타임아웃 가이드](/docs/timeouts)에서 확인하세요.

:::