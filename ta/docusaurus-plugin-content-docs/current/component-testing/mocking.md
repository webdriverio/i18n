---
id: mocking
title: மாதிரியாக்கம்
---

சோதனைகளை எழுதும்போது, ஒரு உள் — அல்லது வெளி — சேவையின் "போலி" பதிப்பை உருவாக்க வேண்டிய நேரம் வரும். இது பொதுவாக மாதிரியாக்கம் (mocking) என்று குறிப்பிடப்படுகிறது. WebdriverIO உங்களுக்கு உதவ பயன்பாட்டு செயல்பாடுகளை வழங்குகிறது. நீங்கள் `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` மூலம் அதை அணுகலாம். கிடைக்கக்கூடிய மாதிரியாக்க பயன்பாடுகள் பற்றிய கூடுதல் தகவலுக்கு [API ஆவணங்களைப்](/docs/api/modules#wdiobrowser-runner) பார்க்கவும்.

## செயல்பாடுகள்

உங்கள் கூறு சோதனைகளின் ஒரு பகுதியாக சில செயல்பாட்டு கையாளுநர்கள் அழைக்கப்படுகின்றனவா என்பதை சரிபார்க்க, `@wdio/browser-runner` தொகுதி மாதிரியாக்க முறைகளை ஏற்றுமதி செய்கிறது, இவற்றை நீங்கள் பயன்படுத்தி, இந்த செயல்பாடுகள் அழைக்கப்பட்டுள்ளனவா என்பதை சோதிக்கலாம். பின்வரும் முறையில் இந்த முறைகளை இறக்குமதி செய்யலாம்:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn` ஐ இறக்குமதி செய்வதன் மூலம் நீங்கள் அதன் செயல்பாட்டைக் கண்காணிக்க ஒரு உளவு செயல்பாட்டை (மாதிரி) உருவாக்கலாம் மற்றும் `spyOn` மூலம் ஏற்கனவே உருவாக்கப்பட்ட பொருளின் முறையைக் கண்காணிக்கலாம்.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

முழு எடுத்துக்காட்டையும் [கூறு சோதனை எடுத்துக்காட்டு](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) களஞ்சியத்தில் காணலாம்.

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * verify the handler was called
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

முழு எடுத்துக்காட்டையும் [எடுத்துக்காட்டுகள்](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) அடைவில் காணலாம்.

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO இங்கே [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) ஐ மீண்டும் ஏற்றுமதி செய்கிறது, இது WebdriverIOs [`expect`](/docs/api/expect-webdriverio) பொருத்திகளுடன் பயன்படுத்தக்கூடிய ஒரு இலகுரக Jest இணக்கமான உளவு செயல்படுத்தலாகும். இந்த மாதிரி செயல்பாடுகளில் மேலும் ஆவணங்களை [Vitest திட்ட பக்கத்தில்](https://vitest.dev/api/mock.html) காணலாம்.

நிச்சயமாக, நீங்கள் வேறு எந்த உளவு கட்டமைப்பையும் நிறுவலாம் மற்றும் இறக்குமதி செய்யலாம், எ.கா. [SinonJS](https://sinonjs.org/), அது உலாவி சூழலை ஆதரிக்கும் வரை.

## தொகுதிகள்

உள்ளூர் தொகுதிகளை மாதிரியாக்கவும் அல்லது வேறு கோடில் அழைக்கப்படும் மூன்றாம் தரப்பு நூலகங்களை கவனிக்கவும், அதன் மூலம் உங்களுக்கு அதன் அளவுருக்கள், வெளியீடு அல்லது அதன் செயல்படுத்தலை மீண்டும் அறிவிக்க முடியும்.

செயல்பாடுகளை மாதிரியாக்கும் இரண்டு வழிகள் உள்ளன: சோதனைக் கோடில் பயன்படுத்த ஒரு மாதிரி செயல்பாட்டை உருவாக்குவது, அல்லது ஒரு தொகுதி சார்பை மேலெழுதும் கையேடு மாதிரியை எழுதுவது.

### கோப்பு இறக்குமதிகளை மாதிரியாக்குதல்

நமது கூறு ஒரு கிளிக்கை கையாள ஒரு கோப்பிலிருந்து பயன்பாட்டு முறையை இறக்குமதி செய்கிறது என்று கற்பனை செய்வோம்.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

நமது கூறில் கிளிக் கையாளுநர் பின்வருமாறு பயன்படுத்தப்படுகிறது:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js` இலிருந்து `handleClick` ஐ மாதிரியாக்க, நாம் நமது சோதனையில் `mock` முறையை பின்வருமாறு பயன்படுத்தலாம்:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### சார்புகளை மாதிரியாக்கம்

நமது API இலிருந்து பயனர்களைப் பெறும் ஒரு வகுப்பு இருப்பதாக வைத்துக்கொள்வோம். இந்த வகுப்பு API ஐ அழைக்க [`axios`](https://github.com/axios/axios) ஐப் பயன்படுத்துகிறது, பின்னர் அனைத்து பயனர்களையும் கொண்ட தரவு பண்புக்கூறை திருப்பித் தருகிறது:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

இப்போது, உண்மையில் API ஐ தாக்காமல் இந்த முறையை சோதிக்க (மேலும் மெதுவான மற்றும் எளிதில் உடையக்கூடிய சோதனைகளை உருவாக்குவது), `mock(...)` செயல்பாட்டைப் பயன்படுத்தி axios தொகுதியை தானாகவே மாதிரியாக்கலாம்.

தொகுதியை மாதிரியாக்கியபின், நம் சோதனை உறுதிப்படுத்த விரும்பும் தரவை வழங்கும் `.get` க்கான [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) ஐ வழங்கலாம். உண்மையில், `axios.get('/users.json')` ஒரு போலி பதிலைத் திருப்பி அனுப்ப வேண்டும் என்று நாங்கள் கூறுகிறோம்.

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## பகுதிகள்

ஒரு தொகுதியின் உட்கூறுகளை மாதிரியாக்கலாம் மற்றும் தொகுதியின் மீதமுள்ள பகுதிகளை அவற்றின் உண்மையான செயல்முறையைத் தக்க வைக்கலாம்:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

அசல் தொகுதி மாதிரி தொழிற்சாலைக்கு அனுப்பப்படும், அதை நீங்கள் e.g. சார்பை பகுதியாக மாதிரியாக்கப் பயன்படுத்தலாம்:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## கையேடு மாதிரிகள்

கையேடு மாதிரிகள் `__mocks__/` (மேலும் `automockDir` விருப்பத்தையும் பார்க்கவும்) துணை கோப்பகத்தில் ஒரு தொகுதியை எழுதுவதன் மூலம் வரையறுக்கப்படுகின்றன. நீங்கள் மாதிரியாக்கும் தொகுதி ஒரு Node தொகுதியாக இருந்தால் (எ.கா.: `lodash`), மாதிரி `__mocks__` கோப்பகத்தில் வைக்கப்பட வேண்டும் மற்றும் தானாகவே மாதிரியாக்கப்படும். `mock('module_name')` ஐ வெளிப்படையாக அழைக்கத் தேவையில்லை.

வரம்புக்குட்பட்ட தொகுதிகளை (வரம்புக்குட்பட்ட தொகுப்புகள் என்றும் அழைக்கப்படுகின்றன) வரம்புக்குட்பட்ட தொகுதியின் பெயருக்குப் பொருந்தும் கோப்பக அமைப்பில் ஒரு கோப்பை உருவாக்குவதன் மூலம் மாதிரியாக்கலாம். உதாரணமாக, `@scope/project-name` என்று அழைக்கப்படும் வரம்புக்குட்பட்ட தொகுதியை மாதிரியாக்க, `__mocks__/@scope/project-name.js` இல் ஒரு கோப்பை உருவாக்கவும், அதற்கேற்ப `@scope/` கோப்பகத்தை உருவாக்கவும்.

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

ஒரு குறிப்பிட்ட தொகுதிக்கு ஒரு கையேடு மாதிரி இருக்கும்போது, WebdriverIO `mock('moduleName')` ஐ வெளிப்படையாக அழைக்கும்போது அந்த தொகுதியைப் பயன்படுத்தும். இருப்பினும், automock true என அமைக்கப்பட்டிருக்கும்போது, `mock('moduleName')` அழைக்கப்படாவிட்டாலும், தானாகவே உருவாக்கப்பட்ட மாதிரிக்குப் பதிலாக கையேடு மாதிரி செயல்படுத்தல் பயன்படுத்தப்படும். இந்த நடத்தையை விலக்க, உண்மையான தொகுதி செயல்படுத்தலைப் பயன்படுத்த வேண்டிய சோதனைகளில் `unmock('moduleName')` ஐ வெளிப்படையாக அழைக்க வேண்டும், எ.கா.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## உயர்த்துதல்

உலாவியில் மாதிரியாக்கத்தை வேலை செய்ய வைக்க, WebdriverIO சோதனை கோப்புகளை மறுஎழுதுகிறது மற்றும் மற்ற அனைத்திற்கும் மேலே மாதிரி அழைப்புகளை உயர்த்துகிறது (Jest இல் உயர்த்தும் பிரச்சினை குறித்த [இந்த வலைப்பதிவையும்](https://www.coolcomputerclub.com/posts/jest-hoist-await/) பார்க்கவும்). இது மாதிரி தீர்வாளருக்கு மாறிகளை எவ்வாறு அனுப்ப முடியும் என்பதை வரையறுக்கிறது, எ.கா.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

இதைச் சரிசெய்ய, தீர்வாளருக்குள் அனைத்து பயன்படுத்தப்பட்ட மாறிகளையும் வரையறுக்க வேண்டும், எ.கா.:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## கோரிக்கைகள்

உலாவி கோரிக்கைகளை மாதிரியாக்க தேடுகிறீர்களா, எ.கா. API அழைப்புகள், [கோரிக்கை மாதிரி மற்றும் உளவுகள்](/docs/mocksandspies) பிரிவுக்குச் செல்லவும்.