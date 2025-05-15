---
id: pageobjects
title: 페이지 객체 패턴
---

WebdriverIO 버전 5는 페이지 객체 패턴 지원을 염두에 두고 설계되었습니다. "요소를 일급 시민으로" 원칙을 도입함으로써 이 패턴을 사용하여 대규모 테스트 스위트를 구축할 수 있게 되었습니다.

페이지 객체를 생성하기 위해 추가 패키지가 필요하지 않습니다. 깔끔하고 현대적인 클래스가 필요한 모든 기능을 제공합니다:

- 페이지 객체 간의 상속
- 요소의 지연 로딩
- 메서드 및 액션의 캡슐화

페이지 객체를 사용하는 목표는 페이지 정보를 실제 테스트에서 추상화하는 것입니다. 이상적으로, 특정 페이지에 고유한 모든 선택자나 특정 지침을 페이지 객체에 저장해야 합니다. 그러면 페이지를 완전히 재설계한 후에도 테스트를 계속 실행할 수 있습니다.

## 페이지 객체 만들기

먼저 `Page.js`라고 부르는 메인 페이지 객체가 필요합니다. 이 객체는 모든 페이지 객체가 상속받을 일반적인 선택자나 메서드를 포함할 것입니다.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

우리는 항상 페이지 객체의 인스턴스를 `export`하고, 테스트에서 해당 인스턴스를 생성하지 않습니다. 엔드 투 엔드 테스트를 작성하고 있으므로, 각 HTTP 요청이 상태 비저장 구조인 것처럼 페이지를 항상 상태 비저장 구조로 간주합니다.

물론 브라우저는 세션 정보를 유지할 수 있으므로 다른 세션에 따라 다른 페이지를 표시할 수 있지만, 이는 페이지 객체 내에 반영되어서는 안 됩니다. 이러한 상태 변경은 실제 테스트에 있어야 합니다.

첫 번째 페이지 테스트를 시작해 보겠습니다. 데모 목적으로 [Elemental Selenium](http://elementalselenium.com)의 [The Internet](http://the-internet.herokuapp.com) 웹사이트를 테스트 대상으로 사용합니다. [로그인 페이지](http://the-internet.herokuapp.com/login)에 대한 페이지 객체 예제를 만들어 보겠습니다.

## 선택자 `Get`하기

첫 번째 단계는 `login.page` 객체에 필요한 모든 중요한 선택자를 getter 함수로 작성하는 것입니다:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

getter 함수에서 선택자를 정의하는 것이 조금 이상해 보일 수 있지만 정말 유용합니다. 이 함수들은 객체를 생성할 때가 아니라 _속성에 접근할 때_ 평가됩니다. 이렇게 하면 항상 액션을 수행하기 전에 요소를 요청하게 됩니다.

## 명령 체이닝

WebdriverIO는 내부적으로 마지막 명령의 결과를 기억합니다. 요소 명령을 액션 명령과 체이닝하면, 이전 명령에서 요소를 찾아 그 결과를 사용하여 액션을 실행합니다. 이를 통해 선택자(첫 번째 파라미터)를 제거하고 명령을 다음과 같이 간단하게 만들 수 있습니다:

```js
await LoginPage.username.setValue('Max Mustermann')
```

이는 기본적으로 다음과 같은 것과 동일합니다:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

또는

```js
await $('#username').setValue('Max Mustermann')
```

## 테스트에서 페이지 객체 사용하기

페이지에 필요한 요소와 메서드를 정의한 후, 테스트를 작성할 수 있습니다. 페이지 객체를 사용하기 위해 필요한 것은 단지 `import`(또는 `require`)하는 것뿐입니다. 그게 전부입니다!

이미 생성된 페이지 객체의 인스턴스를 내보냈기 때문에, 가져오기만 하면 바로 사용할 수 있습니다.

단언 프레임워크를 사용하면 테스트가 더욱 표현력이 풍부해질 수 있습니다:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

구조적인 측면에서 스펙 파일과 페이지 객체를 서로 다른 디렉토리로 분리하는 것이 좋습니다. 또한 각 페이지 객체에 `.page.js` 접미사를 붙일 수 있습니다. 이렇게 하면 페이지 객체를 가져오고 있다는 것이 더 명확해집니다.

## 더 나아가기

이것은 WebdriverIO로 페이지 객체를 작성하는 기본 원칙입니다. 하지만 이보다 훨씬 더 복잡한 페이지 객체 구조를 구축할 수 있습니다! 예를 들어, 모달용 특정 페이지 객체를 가질 수도 있고, 큰 페이지 객체를 여러 클래스(각각 전체 웹 페이지의 다른 부분을 나타냄)로 분할하여 메인 페이지 객체에서 상속받을 수도 있습니다. 이 패턴은 페이지 정보를 테스트에서 분리하는 많은 기회를 제공하며, 이는 프로젝트와 테스트 수가 증가하는 시점에서 테스트 스위트를 구조적이고 명확하게 유지하는 데 중요합니다.

이 예제(및 더 많은 페이지 객체 예제)는 GitHub의 [`example` 폴더](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject)에서 찾을 수 있습니다.