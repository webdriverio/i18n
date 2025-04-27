---
id: mocking
title: Simulation (Mocking)
---

Lors de l'écriture de tests, ce n'est qu'une question de temps avant que vous ayez besoin de créer une version "factice" d'un service interne ou externe. C'est ce qu'on appelle communément le mocking (simulation). WebdriverIO fournit des fonctions utilitaires pour vous aider. Vous pouvez `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` pour y accéder. Consultez plus d'informations sur les utilitaires de simulation disponibles dans la [documentation API](/docs/api/modules#wdiobrowser-runner).

## Fonctions

Afin de valider si certains gestionnaires de fonctions sont appelés dans le cadre de vos tests de composants, le module `@wdio/browser-runner` exporte des primitives de simulation que vous pouvez utiliser pour tester si ces fonctions ont été appelées. Vous pouvez importer ces méthodes via :

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

En important `fn`, vous pouvez créer une fonction espion (mock) pour suivre son exécution et avec `spyOn` suivre une méthode sur un objet déjà créé.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

L'exemple complet peut être trouvé dans le dépôt [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

L'exemple complet peut être trouvé dans le répertoire [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO réexporte simplement [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) ici, qui est une implémentation légère d'espion compatible avec Jest qui peut être utilisée avec les matchers [`expect`](/docs/api/expect-webdriverio) de WebdriverIO. Vous pouvez trouver plus de documentation sur ces fonctions de simulation sur la [page du projet Vitest](https://vitest.dev/api/mock.html).

Bien sûr, vous pouvez également installer et importer n'importe quel autre framework d'espionnage, par exemple [SinonJS](https://sinonjs.org/), tant qu'il prend en charge l'environnement du navigateur.

## Modules

Simulez des modules locaux ou observez des bibliothèques tierces, qui sont invoquées dans un autre code, vous permettant de tester les arguments, la sortie ou même de redéfinir leur implémentation.

Il existe deux façons de simuler des fonctions : soit en créant une fonction de simulation à utiliser dans le code de test, soit en écrivant une simulation manuelle pour remplacer une dépendance de module.

### Simulation des importations de fichiers

Imaginons que notre composant importe une méthode utilitaire d'un fichier pour gérer un clic.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

Dans notre composant, le gestionnaire de clic est utilisé comme suit :

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

Pour simuler le `handleClick` de `utils.js`, nous pouvons utiliser la méthode `mock` dans notre test comme suit :

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

### Simulation des dépendances

Supposons que nous ayons une classe qui récupère des utilisateurs depuis notre API. La classe utilise [`axios`](https://github.com/axios/axios) pour appeler l'API puis renvoie l'attribut data qui contient tous les utilisateurs :

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

Maintenant, pour tester cette méthode sans réellement accéder à l'API (et ainsi créer des tests lents et fragiles), nous pouvons utiliser la fonction `mock(...)` pour simuler automatiquement le module axios.

Une fois que nous simulons le module, nous pouvons fournir un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) pour `.get` qui renvoie les données sur lesquelles notre test doit s'appuyer. En effet, nous disons que nous voulons que `axios.get('/users.json')` renvoie une réponse factice.

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

## Partiels

Des sous-ensembles d'un module peuvent être simulés et le reste du module peut conserver leur implémentation réelle :

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Le module original sera passé dans la fabrique de simulation que vous pouvez utiliser pour, par exemple, simuler partiellement une dépendance :

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

## Simulations manuelles

Les simulations manuelles sont définies en écrivant un module dans un sous-répertoire `__mocks__/` (voir aussi l'option `automockDir`). Si le module que vous simulez est un module Node (par exemple : `lodash`), la simulation doit être placée dans le répertoire `__mocks__` et sera automatiquement simulée. Il n'est pas nécessaire d'appeler explicitement `mock('module_name')`.

Les modules à portée (également connus sous le nom de packages à portée) peuvent être simulés en créant un fichier dans une structure de répertoire qui correspond au nom du module à portée. Par exemple, pour simuler un module à portée appelé `@scope/project-name`, créez un fichier à `__mocks__/@scope/project-name.js`, en créant le répertoire `@scope/` en conséquence.

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

Lorsqu'une simulation manuelle existe pour un module donné, WebdriverIO utilisera ce module lors de l'appel explicite à `mock('moduleName')`. Cependant, lorsque automock est défini sur true, l'implémentation de la simulation manuelle sera utilisée à la place de la simulation créée automatiquement, même si `mock('moduleName')` n'est pas appelé. Pour désactiver ce comportement, vous devrez appeler explicitement `unmock('moduleName')` dans les tests qui devraient utiliser l'implémentation réelle du module, par exemple :

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hissage (Hoisting)

Pour que la simulation fonctionne dans le navigateur, WebdriverIO réécrit les fichiers de test et hisse les appels de simulation au-dessus de tout le reste (voir aussi [cet article de blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sur le problème de hissage dans Jest). Cela limite la façon dont vous pouvez passer des variables dans le résolveur de simulation, par exemple :

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

Pour résoudre ce problème, vous devez définir toutes les variables utilisées à l'intérieur du résolveur, par exemple :

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

## Requêtes

Si vous recherchez à simuler des requêtes de navigateur, par exemple des appels API, consultez la section [Simulation et espionnage de requêtes](/docs/mocksandspies).