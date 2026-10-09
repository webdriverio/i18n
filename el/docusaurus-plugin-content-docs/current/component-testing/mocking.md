---
id: mocking
title: Mocking
description: "Δημιουργήστε mocks για συναρτήσεις, modules και αιτήματα δικτύου σε component tests του browser runner με τα fn, spyOn και mock από το @wdio/browser-runner."
---

Όταν γράφετε tests, είναι θέμα χρόνου να χρειαστεί να δημιουργήσετε μια «ψεύτικη» έκδοση μιας εσωτερικής — ή εξωτερικής — υπηρεσίας. Αυτό συνήθως αναφέρεται ως mocking. Το WebdriverIO παρέχει βοηθητικές συναρτήσεις για να σας διευκολύνει. Μπορείτε να κάνετε `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` για να αποκτήσετε πρόσβαση σε αυτές. Δείτε περισσότερες πληροφορίες σχετικά με τα διαθέσιμα εργαλεία mocking στην [τεκμηρίωση API](/docs/api/modules#wdiobrowser-runner).

## Συναρτήσεις

Για να επαληθεύσετε αν ορισμένοι χειριστές συναρτήσεων καλούνται ως μέρος των component tests σας, το module `@wdio/browser-runner` εξάγει βασικά στοιχεία mocking που μπορείτε να χρησιμοποιήσετε για να ελέγξετε αν αυτές οι συναρτήσεις έχουν κληθεί. Μπορείτε να εισαγάγετε αυτές τις μεθόδους μέσω:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Εισάγοντας το `fn` μπορείτε να δημιουργήσετε μια συνάρτηση spy (mock) για να παρακολουθείτε την εκτέλεσή της, και με το `spyOn` να παρακολουθείτε μια μέθοδο σε ένα ήδη δημιουργημένο αντικείμενο.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

Το πλήρες παράδειγμα μπορεί να βρεθεί στο αποθετήριο [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * επαληθεύστε ότι ο χειριστής κλήθηκε
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

Το πλήρες παράδειγμα μπορεί να βρεθεί στον κατάλογο [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

Το WebdriverIO απλώς επανεξάγει εδώ το [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), το οποίο είναι μια ελαφριά υλοποίηση spy συμβατή με το Jest που μπορεί να χρησιμοποιηθεί με τους matchers [`expect`](/docs/api/expect-webdriverio) του WebdriverIO. Μπορείτε να βρείτε περισσότερη τεκμηρίωση για αυτές τις συναρτήσεις mock στη [σελίδα του έργου Vitest](https://vitest.dev/api/mock.html).

Φυσικά, μπορείτε επίσης να εγκαταστήσετε και να εισαγάγετε οποιοδήποτε άλλο framework spy, π.χ. το [SinonJS](https://sinonjs.org/), εφόσον υποστηρίζει το περιβάλλον του browser.

## Modules

Κάντε mock σε τοπικά modules ή παρακολουθήστε βιβλιοθήκες τρίτων που καλούνται σε κάποιον άλλο κώδικα, επιτρέποντάς σας να ελέγχετε ορίσματα, έξοδο ή ακόμα και να επαναορίσετε την υλοποίησή τους.

Υπάρχουν δύο τρόποι για να κάνετε mock σε συναρτήσεις: Είτε δημιουργώντας μια συνάρτηση mock για χρήση στον κώδικα του test, είτε γράφοντας ένα χειροκίνητο mock για να παρακάμψετε μια εξάρτηση module.

### Mocking σε εισαγωγές αρχείων

Ας φανταστούμε ότι το component μας εισάγει μια βοηθητική μέθοδο από ένα αρχείο για να χειριστεί ένα κλικ.

```js title=utils.js
export function handleClick () {
    // υλοποίηση του χειριστή
}
```

Στο component μας ο χειριστής κλικ χρησιμοποιείται ως εξής:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Για να κάνουμε mock το `handleClick` από το `utils.js` μπορούμε να χρησιμοποιήσουμε τη μέθοδο `mock` στο test μας ως εξής:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock στο named export "handleClick" του αρχείου `utils.ts`
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

### Mocking σε εξαρτήσεις

Ας υποθέσουμε ότι έχουμε μια κλάση που ανακτά χρήστες από το API μας. Η κλάση χρησιμοποιεί το [`axios`](https://github.com/axios/axios) για να καλέσει το API και στη συνέχεια επιστρέφει το χαρακτηριστικό data που περιέχει όλους τους χρήστες:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Τώρα, για να ελέγξουμε αυτή τη μέθοδο χωρίς να καλέσουμε πραγματικά το API (και έτσι να δημιουργήσουμε αργά και εύθραυστα tests), μπορούμε να χρησιμοποιήσουμε τη συνάρτηση `mock(...)` για να κάνουμε αυτόματα mock το module axios.

Μόλις κάνουμε mock το module, μπορούμε να παρέχουμε ένα [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) για το `.get` που επιστρέφει τα δεδομένα με τα οποία θέλουμε να γίνει ο έλεγχος στο test μας. Στην ουσία, λέμε ότι θέλουμε το `axios.get('/users.json')` να επιστρέψει μια ψεύτικη απόκριση.

```js title=users.test.js
import axios from 'axios'; // εισάγει το ορισμένο mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock στο default export της εξάρτησης `axios`
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

        // ή μπορείτε να χρησιμοποιήσετε το παρακάτω ανάλογα με την περίπτωσή σας:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Μερικά mocks

Μπορείτε να κάνετε mock σε υποσύνολα ενός module, ενώ το υπόλοιπο module διατηρεί την πραγματική του υλοποίηση:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Το αρχικό module θα περάσει στο mock factory, το οποίο μπορείτε να χρησιμοποιήσετε π.χ. για να κάνετε μερικό mock σε μια εξάρτηση:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock στο default export και στο named export 'foo'
    // και διάδοση των named exports από το αρχικό module
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

## Χειροκίνητα mocks

Τα χειροκίνητα mocks ορίζονται γράφοντας ένα module σε έναν υποκατάλογο `__mocks__/` (δείτε επίσης την επιλογή `automockDir`). Αν το module που κάνετε mock είναι ένα Node module (π.χ.: `lodash`), το mock θα πρέπει να τοποθετηθεί στον κατάλογο `__mocks__` και θα γίνει αυτόματα mock. Δεν χρειάζεται να καλέσετε ρητά το `mock('module_name')`.

Τα scoped modules (γνωστά και ως scoped packages) μπορούν να γίνουν mock δημιουργώντας ένα αρχείο σε μια δομή καταλόγων που ταιριάζει με το όνομα του scoped module. Για παράδειγμα, για να κάνετε mock ένα scoped module με όνομα `@scope/project-name`, δημιουργήστε ένα αρχείο στο `__mocks__/@scope/project-name.js`, δημιουργώντας αντίστοιχα τον κατάλογο `@scope/`.

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

Όταν υπάρχει χειροκίνητο mock για ένα συγκεκριμένο module, το WebdriverIO θα χρησιμοποιήσει αυτό το module όταν καλείται ρητά το `mock('moduleName')`. Ωστόσο, όταν το automock έχει οριστεί σε true, θα χρησιμοποιηθεί η υλοποίηση του χειροκίνητου mock αντί για το αυτόματα δημιουργημένο mock, ακόμα και αν δεν κληθεί το `mock('moduleName')`. Για να εξαιρεθείτε από αυτή τη συμπεριφορά, θα πρέπει να καλέσετε ρητά το `unmock('moduleName')` στα tests που πρέπει να χρησιμοποιούν την πραγματική υλοποίηση του module, π.χ.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Για να λειτουργήσει το mocking στον browser, το WebdriverIO ξαναγράφει τα αρχεία των tests και μετακινεί (hoists) τις κλήσεις mock πάνω από οτιδήποτε άλλο (δείτε επίσης [αυτή την ανάρτηση](https://www.coolcomputerclub.com/posts/jest-hoist-await/) σχετικά με το πρόβλημα του hoisting στο Jest). Αυτό περιορίζει τον τρόπο με τον οποίο μπορείτε να περάσετε μεταβλητές στον mock resolver, π.χ.:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ αυτό αποτυγχάνει καθώς τα `dep` και `variable` δεν ορίζονται μέσα στον mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Για να το διορθώσετε, πρέπει να ορίσετε όλες τις μεταβλητές που χρησιμοποιούνται μέσα στον resolver, π.χ.:

```js title=component.test.js
/**
 * ✔️ αυτό λειτουργεί καθώς όλες οι μεταβλητές ορίζονται μέσα στον resolver
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

## Αιτήματα

Αν ψάχνετε για mocking αιτημάτων του browser, π.χ. κλήσεων API, μεταβείτε στην ενότητα [Request Mock and Spies](/docs/mocksandspies).

Στα component tests, χρησιμοποιήστε ένα απόλυτο μοτίβο URL με σταθερό πρωτόκολλο και hostname για το `browser.mock()`, όπως `https://api.webdriver.io/api/*`. Ένα μοτίβο χωρίς host, όπως `*/api/*`, παρεμβαίνει σε κάθε αίτημα της σελίδας, συμπεριλαμβανομένης της κίνησης του ίδιου του browser runner από το Vite και τον driver.

Χρησιμοποιήστε ένα μόνο `*`, το οποίο ταιριάζει επίσης με καθέτους. Διαδοχικά wildcards πριν από σταθερό κείμενο, όπως `**/api/**` ή `**/data.json`, μπορεί να προκαλέσουν υπερβολικό regex backtracking σε άσχετα URLs και να παγώσουν ένα test. Δείτε το [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), το [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) και την [προειδοποίηση για τα URL wildcards](/docs/mocksandspies#creating-a-mock).