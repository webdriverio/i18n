---
id: mocking
title: Mocking
description: "Simulez des fonctions, des modules et des requêtes réseau dans les tests de composants du browser runner avec fn, spyOn et mock de @wdio/browser-runner."
---

Lorsque vous écrivez des tests, ce n'est qu'une question de temps avant que vous ayez besoin de créer une version « factice » d'un service interne — ou externe. C'est ce qu'on appelle communément le mocking. WebdriverIO fournit des fonctions utilitaires pour vous aider. Vous pouvez faire `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` pour y accéder. Consultez plus d'informations sur les utilitaires de mocking disponibles dans la [documentation de l'API](/docs/api/modules#wdiobrowser-runner).

## Fonctions

Afin de valider si certains gestionnaires de fonctions sont appelés dans le cadre de vos tests de composants, le module `@wdio/browser-runner` exporte des primitives de mocking que vous pouvez utiliser pour tester si ces fonctions ont été appelées. Vous pouvez importer ces méthodes via :

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

En important `fn`, vous pouvez créer une fonction espion (mock) pour suivre son exécution, et avec `spyOn`, suivre une méthode sur un objet déjà créé.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

L'exemple complet se trouve dans le dépôt [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * vérifier que le gestionnaire a été appelé
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

L'exemple complet se trouve dans le répertoire [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

WebdriverIO se contente ici de réexporter [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy), une implémentation d'espion légère compatible avec Jest qui peut être utilisée avec les matchers [`expect`](/docs/api/expect-webdriverio) de WebdriverIO. Vous trouverez davantage de documentation sur ces fonctions mock sur la [page du projet Vitest](https://vitest.dev/api/mock.html).

Bien entendu, vous pouvez également installer et importer n'importe quel autre framework d'espionnage, par exemple [SinonJS](https://sinonjs.org/), tant qu'il prend en charge l'environnement du navigateur.

## Modules

Simulez des modules locaux ou observez des bibliothèques tierces qui sont invoquées dans un autre code, ce qui vous permet de tester les arguments, la sortie ou même de redéclarer leur implémentation.

Il existe deux façons de simuler des fonctions : soit en créant une fonction mock à utiliser dans le code de test, soit en écrivant un mock manuel pour remplacer une dépendance de module.

### Simuler les imports de fichiers

Imaginons que notre composant importe une méthode utilitaire depuis un fichier pour gérer un clic.

```js title=utils.js
export function handleClick () {
    // implémentation du gestionnaire
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

Pour simuler `handleClick` de `utils.js`, nous pouvons utiliser la méthode `mock` dans notre test comme suit :

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * simuler l'export nommé "handleClick" du fichier `utils.ts`
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

### Simuler les dépendances

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

Maintenant, afin de tester cette méthode sans réellement interroger l'API (et donc sans créer des tests lents et fragiles), nous pouvons utiliser la fonction `mock(...)` pour simuler automatiquement le module axios.

Une fois le module simulé, nous pouvons fournir un [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) pour `.get` qui renvoie les données sur lesquelles notre test doit effectuer ses assertions. En fait, nous indiquons que nous voulons que `axios.get('/users.json')` renvoie une fausse réponse.

```js title=users.test.js
import axios from 'axios'; // importe le mock défini
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * simuler l'export par défaut de la dépendance `axios`
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

        // ou vous pourriez utiliser ce qui suit selon votre cas d'utilisation :
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## Mocks partiels

Des sous-ensembles d'un module peuvent être simulés tandis que le reste du module conserve son implémentation réelle :

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

Le module original sera transmis à la fabrique de mock, que vous pouvez utiliser pour, par exemple, simuler partiellement une dépendance :

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Simuler l'export par défaut et l'export nommé 'foo'
    // et propager l'export nommé du module original
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

## Mocks manuels

Les mocks manuels sont définis en écrivant un module dans un sous-répertoire `__mocks__/` (voir aussi l'option `automockDir`). Si le module que vous simulez est un module Node (par exemple : `lodash`), le mock doit être placé dans le répertoire `__mocks__` et sera automatiquement simulé. Il n'est pas nécessaire d'appeler explicitement `mock('module_name')`.

Les modules à portée (également appelés paquets à portée ou scoped packages) peuvent être simulés en créant un fichier dans une structure de répertoires correspondant au nom du module à portée. Par exemple, pour simuler un module à portée appelé `@scope/project-name`, créez un fichier dans `__mocks__/@scope/project-name.js`, en créant le répertoire `@scope/` en conséquence.

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

Lorsqu'un mock manuel existe pour un module donné, WebdriverIO utilisera ce module lors de l'appel explicite à `mock('moduleName')`. Cependant, lorsque automock est défini sur true, l'implémentation du mock manuel sera utilisée à la place du mock créé automatiquement, même si `mock('moduleName')` n'est pas appelé. Pour désactiver ce comportement, vous devrez appeler explicitement `unmock('moduleName')` dans les tests qui doivent utiliser l'implémentation réelle du module, par exemple :

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

Afin que le mocking fonctionne dans le navigateur, WebdriverIO réécrit les fichiers de test et remonte (hoist) les appels de mock au-dessus de tout le reste (voir aussi [cet article de blog](https://www.coolcomputerclub.com/posts/jest-hoist-await/) sur le problème du hoisting dans Jest). Cela limite la manière dont vous pouvez transmettre des variables au résolveur de mock, par exemple :

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ ceci échoue car `dep` et `variable` ne sont pas définis à l'intérieur du résolveur de mock
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

Pour corriger cela, vous devez définir toutes les variables utilisées à l'intérieur du résolveur, par exemple :

```js title=component.test.js
/**
 * ✔️ ceci fonctionne car toutes les variables sont définies dans le résolveur
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

Si vous cherchez à simuler des requêtes du navigateur, par exemple des appels d'API, rendez-vous dans la section [Request Mock and Spies](/docs/mocksandspies).

Dans les tests de composants, utilisez un motif d'URL absolu avec un protocole et un nom d'hôte fixes pour `browser.mock()`, comme `https://api.webdriver.io/api/*`. Un motif sans hôte tel que `*/api/*` intercepte toutes les requêtes de la page, y compris le trafic propre au browser runner, à Vite et au driver.

Un seul `*` correspond également aux barres obliques. Dans un motif sous forme de chaîne, `**` équivaut à `*` ; dans un objet `URLPattern`, utilisez un seul `*`. Voir [créer un mock](/docs/mocksandspies#creating-a-mock).