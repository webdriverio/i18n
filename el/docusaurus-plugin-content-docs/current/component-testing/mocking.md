---
id: mocking
title: Δημιουργία Ψευδών Αντικειμένων (Mocking)
---

When writing tests it's only a matter of time before you need to create a "fake" version of an internal — or external — service. This is commonly referred to as mocking. WebdriverIO provides utility functions to help you out. You can `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` to access it. See more information about the available mocking utilities in the [API docs](/docs/api/modules#wdiobrowser-runner).

## Functions

Για την επαλήθευση του αν συγκεκριμένοι χειριστές συναρτήσεων καλούνται ως μέρος των δοκιμών των στοιχείων σας, η μονάδα `@wdio/browser-runner` εξάγει πρωτόγονα στοιχεία mocking που μπορείτε να χρησιμοποιήσετε για να ελέγξετε αν αυτές οι συναρτήσεις έχουν κληθεί. Μπορείτε να εισάγετε αυτές τις μεθόδους μέσω:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

Εισάγοντας το `fn` μπορείτε να δημιουργήσετε μια συνάρτηση κατασκοπείας (mock) για να παρακολουθήσετε την εκτέλεσή της και με το `spyOn` να παρακολουθήσετε μια μέθοδο σε ένα ήδη δημιουργημένο αντικείμενο.

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

Το WebdriverIO απλά επανεξάγει το [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) εδώ, το οποίο είναι μια ελαφριά υλοποίηση κατασκοπείας συμβατή με το Jest που μπορεί να χρησιμοποιηθεί με τους ελεγκτές [`expect`](/docs/api/expect-webdriverio) του WebdriverIO. Μπορείτε να βρείτε περισσότερη τεκμηρίωση για αυτές τις λειτουργίες mock στη [σελίδα του έργου Vitest](https://vitest.dev/api/mock.html).

Φυσικά, μπορείτε επίσης να εγκαταστήσετε και να εισαγάγετε οποιοδήποτε άλλο πλαίσιο κατασκοπείας, π.χ. [SinonJS](https://sinonjs.org/), αρκεί να υποστηρίζει το περιβάλλον του προγράμματος περιήγησης.

## Modules

Δημιουργήστε ψευδή τοπικά modules ή παρακολουθήστε βιβλιοθήκες τρίτων, που επικαλούνται σε κάποιον άλλο κώδικα, επιτρέποντάς σας να ελέγξετε τα ορίσματα, την έξοδο ή ακόμα και να επαναπροσδιορίσετε την υλοποίησή τους.

Υπάρχουν δύο τρόποι για να δημιουργήσετε ψευδή αντικείμενα συναρτήσεων: Είτε δημιουργώντας μια συνάρτηση mock για χρήση στον κώδικα δοκιμών, είτε γράφοντας ένα χειροκίνητο mock για να παρακάμψετε μια εξάρτηση της μονάδας.

### Δημιουργία Ψευδών Αντικειμένων για Εισαγωγές Αρχείων

Ας φανταστούμε ότι το στοιχείο μας εισάγει μια βοηθητική μέθοδο από ένα αρχείο για τον χειρισμό ενός κλικ.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

Στο στοιχείο μας ο χειριστής κλικ χρησιμοποιείται ως εξής:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Για να δημιουργήσουμε ένα ψευδές αντικείμενο για το `handleClick` από το `utils.js` μπορούμε να χρησιμοποιήσουμε τη μέθοδο `mock` στη δοκιμή μας ως εξής:

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

### Δημιουργία Ψευδών Αντικειμένων για Εξαρτήσεις

Ας υποθέσουμε ότι έχουμε μια κλάση που ανακτά χρήστες από το API μας. Η κλάση χρησιμοποιεί το [`axios`](https://github.com/axios/axios) για να καλέσει το API και στη συνέχεια επιστρέφει το χαρακτηριστικό δεδομένων που περιέχει όλους τους χρήστες:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Τώρα, για να δοκιμάσουμε αυτή τη μέθοδο χωρίς να χτυπήσουμε πραγματικά το API (και έτσι δημιουργώντας αργές και εύθραυστες δοκιμές), μπορούμε να χρησιμοποιήσουμε τη συνάρτηση `mock(...)` για να δημιουργήσουμε αυτόματα ένα ψευδές αντικείμενο της μονάδας axios.

Μόλις δημιουργήσουμε το ψευδές αντικείμενο της μονάδας, μπορούμε να παρέχουμε ένα [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) για το `.get` που επιστρέφει τα δεδομένα που θέλουμε να ελέγξει η δοκιμή μας. Στην ουσία, λέμε ότι θέλουμε το `axios.get('/users.json')` να επιστρέψει μια ψεύτικη απάντηση.

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

## Partials

Υποσύνολα μιας μονάδας μπορούν να γίνουν ψευδή αντικείμενα και το υπόλοιπο της μονάδας μπορεί να διατηρήσει την πραγματική τους υλοποίηση:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Η αρχική μονάδα θα περαστεί στο εργοστάσιο ψευδών αντικειμένων που μπορείτε να χρησιμοποιήσετε π.χ. για να δημιουργήσετε μερικώς ψευδή αντικείμενα για μια εξάρτηση:

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

## Manual Mocks

Τα χειροκίνητα mock ορίζονται γράφοντας μια μονάδα σε έναν υποκατάλογο `__mocks__/` (δείτε επίσης την επιλογή `automockDir`). Αν η μονάδα που δημιουργείτε ψευδές αντικείμενο είναι μια μονάδα Node (π.χ.: `lodash`), το ψευδές αντικείμενο θα πρέπει να τοποθετηθεί στον κατάλογο `__mocks__` και θα γίνει αυτόματα ψευδές αντικείμενο. Δεν χρειάζεται να καλέσετε ρητά `mock('module_name')`.

Μπορούν να δημιουργηθούν ψευδή αντικείμενα για μονάδες με scope (γνωστές και ως πακέτα με scope) δημιουργώντας ένα αρχείο σε μια δομή καταλόγου που αντιστοιχεί στο όνομα της μονάδας με scope. Για παράδειγμα, για να δημιουργήσετε ένα ψευδές αντικείμενο για μια μονάδα με scope που ονομάζεται `@scope/project-name`, δημιουργήστε ένα αρχείο στο `__mocks__/@scope/project-name.js`, δημιουργώντας αντίστοιχα τον κατάλογο `@scope/`.

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

Όταν υπάρχει ένα χειροκίνητο ψευδές αντικείμενο για μια δεδομένη μονάδα, το WebdriverIO θα χρησιμοποιήσει αυτή τη μονάδα όταν καλείται ρητά `mock('moduleName')`. Ωστόσο, όταν το automock έχει οριστεί σε true, η υλοποίηση του χειροκίνητου ψευδούς αντικειμένου θα χρησιμοποιηθεί αντί του αυτόματα δημιουργημένου ψευδούς αντικειμένου, ακόμη και αν δεν καλείται το `mock('moduleName')`. Για να εξαιρεθείτε από αυτήν τη συμπεριφορά, θα πρέπει να καλέσετε ρητά το `unmock('moduleName')` σε δοκιμές που πρέπει να χρησιμοποιούν την πραγματική υλοποίηση της μονάδας, π.χ.:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Για να λειτουργήσει η δημιουργία ψευδών αντικειμένων στο πρόγραμμα περιήγησης, το WebdriverIO ξαναγράφει τα αρχεία δοκιμών και ανυψώνει τις κλήσεις mock πάνω από όλα τα άλλα (δείτε επίσης [αυτήν την ανάρτηση ιστολογίου](https://www.coolcomputerclub.com/posts/jest-hoist-await/) σχετικά με το πρόβλημα ανύψωσης στο Jest). Αυτό περιορίζει τον τρόπο με τον οποίο μπορείτε να περάσετε μεταβλητές στον επιλυτή mock, π.χ.:

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

Για να το διορθώσετε αυτό, πρέπει να ορίσετε όλες τις χρησιμοποιούμενες μεταβλητές μέσα στον επιλυτή, π.χ.:

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

## Requests

Αν ψάχνετε για τη δημιουργία ψευδών αντικειμένων για αιτήματα προγράμματος περιήγησης, π.χ. κλήσεις API, μεταβείτε στην ενότητα [Request Mock and Spies](/docs/mocksandspies).