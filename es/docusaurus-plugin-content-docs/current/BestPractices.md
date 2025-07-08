---
id: bestpractices
title: Mejores Prácticas
---

# Mejores Prácticas

Esta guía pretende compartir nuestras mejores prácticas que te ayudarán a escribir pruebas eficientes y resilientes.

## Usa selectores resilientes

Usando selectores que son resilientes a cambios en el DOM, tendrás menos o incluso ninguna prueba fallando cuando, por ejemplo, se elimina una clase de un elemento.

Las clases pueden aplicarse a múltiples elementos y deben evitarse si es posible, a menos que deliberadamente quieras obtener todos los elementos con esa clase.

```js
// 👎
await $('.button')
```

Todos estos selectores deberían devolver un solo elemento.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Nota:__ Para descubrir todos los selectores posibles que WebdriverIO soporta, consulta nuestra página de [Selectores](./Selectors.md).

## Limita la cantidad de consultas de elementos

Cada vez que usas el comando [`$`](https://webdriver.io/docs/api/browser/$) o [`$$`](https://webdriver.io/docs/api/browser/$$) (esto incluye encadenarlos), WebdriverIO intenta localizar el elemento en el DOM. Estas consultas son costosas, por lo que deberías intentar limitarlas tanto como sea posible.

Consulta tres elementos.

```js
// 👎
await $('table').$('tr').$('td')
```

Consulta solo un elemento.

``` js
// 👍
await $('table tr td')
```

El único momento en que deberías usar encadenamiento es cuando quieres combinar diferentes [estrategias de selector](https://webdriver.io/docs/selectors/#custom-selector-strategies).
En el ejemplo usamos los [Selectores Profundos](https://webdriver.io/docs/selectors#deep-selectors), que es una estrategia para entrar en el DOM shadow de un elemento.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Prefiere localizar un solo elemento en lugar de tomar uno de una lista

No siempre es posible hacer esto, pero usando pseudo-clases CSS como [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) puedes hacer coincidir elementos basados en los índices de los elementos en la lista de hijos de sus padres.

Consulta todas las filas de la tabla.

```js
// 👎
await $$('table tr')[15]
```

Consulta una sola fila de la tabla.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Usa las aserciones integradas

No uses aserciones manuales que no esperan automáticamente a que los resultados coincidan, ya que esto causará pruebas inestables.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Al usar las aserciones integradas, WebdriverIO esperará automáticamente a que el resultado real coincida con el resultado esperado, lo que resulta en pruebas resilientes.
Lo logra reintentando automáticamente la aserción hasta que pase o se agote el tiempo.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Carga perezosa y encadenamiento de promesas

WebdriverIO tiene algunos trucos bajo la manga cuando se trata de escribir código limpio, ya que puede cargar perezosamente el elemento, lo que te permite encadenar tus promesas y reducir la cantidad de `await`. Esto también te permite pasar el elemento como un ChainablePromiseElement en lugar de un Element y para un uso más fácil con objetos de página.

Entonces, ¿cuándo tienes que usar `await`?
Siempre deberías usar `await` con la excepción de los comandos `$` y `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// o
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// o
await $('div').$('button').click()
```

## No abuses de comandos y aserciones

Cuando usas expect.toBeDisplayed implícitamente también esperas a que el elemento exista. No hay necesidad de usar los comandos waitForXXX cuando ya tienes una aserción haciendo lo mismo.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

No es necesario esperar a que un elemento exista o sea mostrado cuando interactúas o cuando afirmas algo como su texto, a menos que el elemento pueda estar explícitamente invisible (opacity: 0 por ejemplo) o pueda estar explícitamente deshabilitado (atributo disabled por ejemplo), en cuyo caso esperar a que el elemento se muestre tiene sentido.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Pruebas Dinámicas

Usa variables de entorno para almacenar datos de prueba dinámicos, por ejemplo, credenciales secretas, dentro de tu entorno en lugar de codificarlas directamente en la prueba. Dirígete a la página [Parameterize Tests](parameterize-tests) para más información sobre este tema.

## Lintea tu código

Usando eslint para lintear tu código puedes potencialmente detectar errores temprano, usa nuestras [reglas de linting](https://www.npmjs.com/package/eslint-plugin-wdio) para asegurarte de que algunas de las mejores prácticas siempre se apliquen.

## No pauses

Puede ser tentador usar el comando pause, pero usarlo es una mala idea ya que no es resiliente y solo causará pruebas inestables a largo plazo.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // esperar a que el botón de envío se habilite
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Bucles asincrónicos

Cuando tienes algún código asincrónico que quieres repetir, es importante saber que no todos los bucles pueden hacer esto.
Por ejemplo, la función forEach de Array no permite callbacks asincrónicos como se puede leer en [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Nota:__ Aún puedes usarlos cuando no necesitas que la operación sea asincrónica como se muestra en este ejemplo `console.log(await $$('h1').map((h1) => h1.getText()))`.

A continuación se muestran algunos ejemplos de lo que esto significa.

Lo siguiente no funcionará ya que los callbacks asincrónicos no son compatibles.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Lo siguiente funcionará.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Mantenlo simple

A veces vemos a nuestros usuarios mapear datos como texto o valores. Esto a menudo no es necesario y suele ser un indicador de código problemático, comprueba los ejemplos a continuación por qué es el caso.

```js
// 👎 demasiado complejo, aserción sincrónica, usa las aserciones integradas para prevenir pruebas inestables
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 demasiado complejo
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 encuentra elementos por su texto pero no tiene en cuenta la posición de los elementos
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 usa identificadores únicos (a menudo usados para elementos personalizados)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nombres de accesibilidad (a menudo usados para elementos html nativos)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Otra cosa que a veces vemos es que cosas simples tienen una solución excesivamente complicada.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Ejecutando código en paralelo

Si no te importa el orden en el que se ejecuta algún código, puedes utilizar [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) para acelerar la ejecución.

__Nota:__ Dado que esto hace que el código sea más difícil de leer, podrías abstraerlo usando un objeto de página o una función, aunque también deberías cuestionar si el beneficio en rendimiento vale el costo de legibilidad.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Si se abstrae, podría verse algo como lo siguiente, donde la lógica se coloca en un método llamado submitWithDataOf y los datos se obtienen de la clase Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```