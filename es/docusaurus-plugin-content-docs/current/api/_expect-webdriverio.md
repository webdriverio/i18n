---
id: expect-webdriverio
title: Expect 
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---



Al escribir pruebas, a menudo necesitas verificar que los valores cumplan ciertas condiciones. `expect` te da acceso a una serie de "matchers" que te permiten validar diferentes cosas en el objeto `browser`, un objeto `element` o `mock`.

## Opciones predeterminadas

Estas opciones predeterminadas a continuación están conectadas a las opciones [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) y [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) establecidas en la configuración.

Solo configura las opciones a continuación si deseas esperar tiempos específicos para tus aserciones.

```js
{
    wait: 2000, // ms para esperar a que la expectativa tenga éxito
    interval: 100, // intervalo entre intentos
}
```

Si deseas elegir diferentes tiempos de espera e intervalos, configura estas opciones de la siguiente manera:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### Opciones de Matcher

Cada matcher puede tomar varias opciones que te permiten modificar la aserción:

##### Opciones de comando

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | tiempo en ms para esperar a que la expectativa tenga éxito. Predeterminado: `3000` |
| <code><var>interval</var></code> | number | intervalo entre intentos. Predeterminado: `100` |
| <code><var>beforeAssertion</var></code> | function | función que se llamará antes de que se haga la aserción |
| <code><var>afterAssertion</var></code> | function | función que se llamará después de que se haga la aserción conteniendo los resultados de la aserción |
| <code><var>message</var></code> | string | mensaje de usuario para anteponer antes del error de aserción |

##### Opciones de cadena

Esta opción se puede aplicar además de las opciones de comando cuando se están afirmando cadenas.

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | aplicar `toLowerCase` a los valores real y esperado |
| <code><var>trim</var></code> | boolean | aplicar `trim` al valor real |
| <code><var>replace</var></code> | Replacer \| Replacer[] | reemplazar partes del valor real que coincidan con la cadena/RegExp. El reemplazo puede ser una cadena o una función.
| <code><var>containing</var></code> | boolean | esperar que el valor real contenga el valor esperado, de lo contrario igual estricto. |
| <code><var>asString</var></code> | boolean | puede ser útil para forzar la conversión del valor de propiedad a cadena |
| <code><var>atStart</var></code> | boolean | esperar que el valor real comience con el valor esperado |
| <code><var>atEnd</var></code> | boolean | esperar que el valor real termine con el valor esperado |
| <code><var>atIndex</var></code> | number | esperar que el valor real tenga el valor esperado en el índice dado |

##### Opciones de número

Esta opción se puede aplicar además de las opciones de comando cuando se están afirmando números.

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | igual a |
| <code><var>lte</var></code> | number | menor o igual que |
| <code><var>gte</var></code> | number | mayor o igual que |

### Manejo de entidades HTML

Una entidad HTML es un fragmento de texto ("cadena") que comienza con un ampersand (`&`) y termina con un punto y coma (`;`). Las entidades se utilizan frecuentemente para mostrar caracteres reservados (que de otro modo se interpretarían como código HTML) y caracteres invisibles (como espacios sin romper, por ejemplo, `&nbsp;`).

Para encontrar o interactuar con dicho elemento, usa el equivalente unicode de la entidad. por ejemplo:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

Puedes encontrar todas las referencias unicode en la [especificación HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**Nota:** unicode no distingue entre mayúsculas y minúsculas, por lo que tanto `\u00a0` como `\u00A0` funcionan. Para encontrar elementos en la inspección del navegador, quita `u` del unicode, por ejemplo: `div[data="Some\00a0Value"]`

## Matchers de navegador

### toHaveUrl

Comprueba si el navegador está en una página específica.

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

Comprueba si el sitio web tiene un título específico.

##### Uso

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

Comprueba si el navegador tiene un texto específico almacenado en su portapapeles.

##### Uso

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## Matchers de elemento

### toBeDisplayed

Llama a [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) en el elemento dado.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

Llama a [`isExisting`](https://webdriver.io/docs/api/element/isExisting) en el elemento dado.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

Igual que `toExist`.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

Igual que `toExist`.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

Comprueba si el elemento tiene foco. Esta aserción solo funciona en un contexto web.

##### Uso

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

Comprueba si un elemento tiene un cierto atributo con un valor específico.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

Igual que `toHaveAttribute`.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

Comprueba si un elemento tiene un solo nombre de clase. También se puede llamar con un array como parámetro cuando el elemento puede tener múltiples nombres de clase.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

Comprueba si un elemento tiene una cierta propiedad.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

Comprueba si un elemento de entrada tiene un cierto valor.

##### Uso

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

Comprueba si un elemento puede ser clickeado llamando a [`isClickable`](https://webdriver.io/docs/api/element/isClickable) en el elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

Comprueba si un elemento está deshabilitado llamando a [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) en el elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

Comprueba si un elemento está habilitado llamando a [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) en el elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

Comprueba si un elemento está habilitado llamando a [`isSelected`](https://webdriver.io/docs/api/element/isSelected) en el elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

Igual que `toBeSelected`.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

Comprueba si el elemento tiene una etiqueta WAI-ARIA computada específica. También se puede llamar con un array como parámetro en el caso donde el elemento puede tener diferentes etiquetas.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

Comprueba si el elemento tiene un rol WAI-ARIA calculado específico. También se puede llamar con un array como parámetro en el caso donde el elemento puede tener diferentes etiquetas.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

Comprueba si el elemento de enlace tiene un objetivo de enlace específico.

##### Uso

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

Igual que `toHaveHref`.

##### Uso

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

Comprueba si el elemento tiene un atributo `id` específico.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

Comprueba si el elemento tiene un texto específico. También se puede llamar con un array como parámetro en el caso donde el elemento puede tener diferentes textos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

En caso de que haya una lista de elementos en el div a continuación:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

Puedes afirmarlos usando un array:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

Comprueba si el elemento tiene un texto específico. También se puede llamar con un array como parámetro en el caso donde el elemento puede tener diferentes textos.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

Comprueba si un elemento está dentro del viewport llamando a [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) en el elemento.

##### Uso

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

Comprueba la cantidad de hijos del elemento fetcheado llamando al comando `element.$('./*')`.

##### Uso

```js
const list = await $('ul')
await expect(list).toHaveChildren() // la lista tiene al menos un elemento
// mismo que
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // la lista tiene 3 elementos
// mismo que 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

Comprueba si el elemento tiene un ancho específico.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

Comprueba si el elemento tiene una altura específica.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

Comprueba si el elemento tiene un tamaño específico.

##### Uso

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

Comprueba la cantidad de elementos obtenidos usando el comando [`$$`](https://webdriver.io/docs/api/element/$).

**Nota:** Este matcher actualizará el array pasado con los últimos elementos si la aserción pasa. Sin embargo, si has reasignado la variable, tendrás que buscar los elementos de nuevo.

##### Uso

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 elementos en la lista

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// mismo que
assert.ok(listItems.length <= 10)
```

## Matchers de red

### toBeRequested

Comprueba que el mock fue llamado

##### Uso

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

Comprueba que el mock fue llamado por la cantidad esperada de veces

##### Uso

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // petición llamada al menos 5 veces pero menos de 11
```

### toBeRequestedWith

Comprueba que el mock fue llamado de acuerdo con las opciones esperadas.

La mayoría de las opciones admiten matchers parciales de expect/jasmine como [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### Uso

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [opcional] string | function | custom matcher
    method: 'POST',                                 // [opcional] string | array
    statusCode: 200,                                // [opcional] number | array
    requestHeaders: { Authorization: 'foo' },       // [opcional] object | function | custom matcher
    responseHeaders: { Authorization: 'bar' },      // [opcional] object | function | custom matcher
    postData: { title: 'foo', description: 'bar' }, // [opcional] object | function | custom matcher
    response: { success: true },                    // [opcional] object | function | custom matcher
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // ya sea POST o PUT
    statusCode: [401, 403],  // ya sea 401 o 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## Matcher de instantánea

WebdriverIO admite pruebas básicas de instantáneas así como pruebas de instantáneas DOM.

### toMatchSnapshot

Comprueba si cualquier objeto arbitrario coincide con un valor determinado. Si pasas un [`WebdriverIO.Element`](https://webdriver.io/docs/api/element), automáticamente capturará el estado [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML) del mismo.

##### Uso

```js
// instantánea de objetos arbitrarios (no se necesita "await" aquí)
expect({ foo: 'bar' }).toMatchSnapshot()
// instantánea de `outerHTML` de WebdriverIO.Element (instantánea DOM, requiere "await")
await expect($('elem')).toMatchSnapshot()
// instantánea del resultado del comando de elemento
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

De manera similar, puedes usar `toMatchInlineSnapshot()` para almacenar la instantánea en línea dentro del archivo de prueba. Por ejemplo, dado:

```js
await expect($('img')).toMatchInlineSnapshot()
```

En lugar de crear un archivo de instantánea, WebdriverIO modificará el archivo de prueba directamente para actualizar la instantánea como una cadena:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## Matchers de instantánea visual

<!--
    These matchers aren't implemented in the `expect-webdriverio` project and can be found
    here: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

Los siguientes matchers se implementan como parte del plugin `@wdio/visual-service` y solo están disponibles cuando el servicio está configurado. Asegúrate de seguir las [instrucciones de configuración](https://webdriver.io/docs/visual-testing) en consecuencia.

### toMatchElementSnapshot

Comprueba que si el elemento dado coincide con la instantánea de la línea base.

##### Uso

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // opciones
})
```

El resultado esperado es por defecto `0`, por lo que puedes escribir la misma aserción como:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // opciones
})
```

o no pasar ninguna opción en absoluto:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

Comprueba que si la pantalla actual coincide con la instantánea de la línea base.

##### Uso

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // opciones
})
```

El resultado esperado es por defecto `0`, por lo que puedes escribir la misma aserción como:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // opciones
})
```

o no pasar ninguna opción en absoluto:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

Comprueba que si la captura de pantalla de página completa coincide con la instantánea de la línea base.

##### Uso

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // opciones
})
```

El resultado esperado es por defecto `0`, por lo que puedes escribir la misma aserción como:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // opciones
})
```

o no pasar ninguna opción en absoluto:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

Comprueba que si la captura de pantalla de página completa incluyendo marcas de tabulación coincide con la instantánea de la línea base.

##### Uso

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // opciones
})
```

El resultado esperado es por defecto `0`, por lo que puedes escribir la misma aserción como:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // opciones
})
```

o no pasar ninguna opción en absoluto:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## Uso de expresiones regulares

También puedes usar directamente expresiones regulares para todos los matchers que hacen comparación de texto.

##### Uso

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## Matchers predeterminados

Además de los matchers de `expect-webdriverio`, puedes usar las aserciones integradas de [expect](https://jestjs.io/docs/en/expect) de Jest o [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) para Jasmine.

## Matchers asimétricos

WebdriverIO admite el uso de matchers asimétricos dondequiera que compares valores de texto, por ejemplo:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

o

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

Si estás usando el [WDIO Testrunner](https://webdriver.io/docs/clioptions), todo se configurará automáticamente. Solo sigue la [guía de configuración](https://webdriver.io/docs/typescript#framework-setup) de la documentación. Sin embargo, si ejecutas WebdriverIO con un testrunner diferente o en un simple script de Node.js, necesitarás agregar `expect-webdriverio` a `types` en el `tsconfig.json`.

- `"expect-webdriverio"` para todos excepto los usuarios de Jasmine/Jest.
- `"expect-webdriverio/jasmine"` Jasmine
- `"expect-webdriverio/jest"` Jest

## JavaScript (VSCode)

Es necesario crear `jsconfig.json` en la raíz del proyecto y hacer referencia a las definiciones de tipo para que el autocompletado funcione en javascript vanilla.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## Añadiendo tus propios matchers

Similar a cómo `expect-webdriverio` extiende los matchers de Jasmine/Jest, es posible añadir matchers personalizados.

- Jasmine ver la documentación de [custom matchers](https://jasmine.github.io/2.5/custom_matcher.html)
- Todos los demás ver [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) de Jest

Los matchers personalizados deben agregarse en el hook `before` de wdio

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - Ejemplo de Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // Solución temporal. Ver https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```