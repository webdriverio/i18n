---
id: autocompletion
title: 자동 완성
---

## IntelliJ

자동 완성은 IDEA 및 WebStorm에서 별도의 설정 없이 작동합니다.

코드를 오랫동안 작성해 왔다면 아마도 자동 완성 기능을 좋아할 것입니다. 자동 완성은 많은 코드 편집기에서 기본적으로 제공됩니다.

![Autocompletion](/img/autocompletion/0.png)

[JSDoc](http://usejsdoc.org/)을 기반으로 한 타입 정의는 코드 문서화에 사용됩니다. 이를 통해 매개변수 및 해당 유형에 대한 추가 세부 정보를 볼 수 있습니다.

![Autocompletion](/img/autocompletion/1.png)

IntelliJ 플랫폼에서 표준 단축키 <kbd>⇧ + ⌥ + SPACE</kbd>를 사용하여 사용 가능한 문서를 확인하세요:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

Visual Studio Code는 일반적으로 타입 지원이 자동으로 통합되어 있어 별도의 조치가 필요하지 않습니다.

![Autocompletion](/img/autocompletion/14.png)

바닐라 JavaScript를 사용하고 적절한 타입 지원을 원한다면 프로젝트 루트에 `jsconfig.json`을 생성하고 사용된 wdio 패키지를 참조해야 합니다. 예:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```