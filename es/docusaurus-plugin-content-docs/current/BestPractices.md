---
id: bestpractices
title: Mejores Prácticas
description: "Escribe pruebas rápidas y resilientes con WebdriverIO usando selectores estables, menos consultas de elementos, aserciones integradas y sin pausas manuales."
---

# Mejores Prácticas

Esta guía tiene como objetivo compartir nuestras mejores prácticas que te ayudan a escribir pruebas eficientes y resilientes.

## Usa selectores resilientes

Al usar selectores que son resilientes a los cambios en el DOM, tendrás menos o incluso ninguna prueba fallando cuando, por ejemplo, se elimina una clase de un elemento.

Las clases se pueden aplicar a múltiples elementos y deben evitarse si es posible, a menos que deliberadamente quieras obtener todos los elementos con esa clase.

```js
// 👎
await $('.button')
```

Todos estos selectores deberían devolver un único elemento.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Nota:__ Para conocer todos los selectores posibles que admite WebdriverIO, consulta nuestra página de [Selectores](./Selectors.md).

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

El único momento en que deberías usar el encadenamiento es cuando quieres combinar diferentes [estrategias de selectores](https://webdriver.io/docs/selectors/#custom-selector-strategies).
En el ejemplo usamos los [Selectores Profundos](https://webdriver.io/docs/selectors#deep-selectors), que es una estrategia para entrar en el shadow DOM de un elemento.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Prefiere localizar un único elemento en lugar de tomar uno de una lista

No siempre es posible hacer esto, pero usando pseudoclases de CSS como [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) puedes seleccionar elementos basándote en los índices de los elementos en la lista de hijos de sus padres.

Consulta todas las filas de la tabla.

```js
// 👎
await $$('table tr')[15]
```

Consulta una única fila de la tabla.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Usa las aserciones integradas

No uses aserciones manuales que no esperan automáticamente a que los resultados coincidan, ya que esto provocará pruebas inestables.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Al usar las aserciones integradas, WebdriverIO esperará automáticamente a que el resultado real coincida con el resultado esperado, lo que resulta en pruebas resilientes.
Esto se logra reintentando automáticamente la aserción hasta que pase o se agote el tiempo de espera.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Carga diferida y encadenamiento de promesas

WebdriverIO tiene algunos trucos bajo la manga cuando se trata de escribir código limpio, ya que puede cargar el elemento de forma diferida, lo que te permite encadenar tus promesas y reduce la cantidad de `await`. Esto también te permite pasar el elemento como un ChainablePromiseElement en lugar de un Element y facilita su uso con page objects.

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

Cuando usas expect.toBeDisplayed, implícitamente también esperas a que el elemento exista. No hay necesidad de usar los comandos waitForXXX cuando ya tienes una aserción que hace lo mismo.

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

No es necesario esperar a que un elemento exista o se muestre al interactuar con él o al verificar algo como su texto, a menos que el elemento pueda ser explícitamente invisible (opacity: 0, por ejemplo) o pueda estar explícitamente deshabilitado (atributo disabled, por ejemplo), en cuyo caso esperar a que el elemento se muestre tiene sentido.

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

## Pruebas dinámicas

Usa variables de entorno para almacenar datos de prueba dinámicos, por ejemplo, credenciales secretas, dentro de tu entorno en lugar de codificarlos directamente en la prueba. Dirígete a la página de [Parametrizar pruebas](parameterize-tests) para obtener más información sobre este tema.

## Analiza tu código con un linter

Al usar eslint para analizar tu código, puedes detectar errores de forma temprana. Usa nuestras [reglas de linting](https://www.npmjs.com/package/eslint-plugin-wdio) para asegurarte de que algunas de las mejores prácticas se apliquen siempre.

## No uses pausas

Puede ser tentador usar el comando pause, pero usarlo es una mala idea, ya que no es resiliente y solo provocará pruebas inestables a largo plazo.

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

## Bucles asíncronos

Cuando tienes código asíncrono que quieres repetir, es importante saber que no todos los bucles pueden hacerlo.
Por ejemplo, la función forEach de Array no permite callbacks asíncronos, como se puede leer en [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Nota:__ Todavía puedes usarlos cuando no necesitas que la operación sea asíncrona, como se muestra en este ejemplo `console.log(await $$('h1').map((h1) => h1.getText()))`.

A continuación se muestran algunos ejemplos de lo que esto significa.

Lo siguiente no funcionará, ya que los callbacks asíncronos no son compatibles.

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

A veces vemos que nuestros usuarios mapean datos como texto o valores. A menudo esto no es necesario y suele ser un indicio de código problemático (code smell). Consulta los ejemplos a continuación para ver por qué es así.

```js
// 👎 demasiado complejo, aserción síncrona, usa las aserciones integradas para evitar pruebas inestables
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

Otra cosa que a veces vemos es que cosas simples tienen una solución demasiado complicada.

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

## Ejecutar código en paralelo

Si no te importa el orden en que se ejecuta cierto código, puedes utilizar [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) para acelerar la ejecución.

__Nota:__ Dado que esto hace que el código sea más difícil de leer, podrías abstraerlo usando un page object o una función, aunque también deberías cuestionarte si el beneficio en rendimiento vale el costo en legibilidad.

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

Si se abstrae, podría verse algo como lo siguiente, donde la lógica se coloca en un método llamado submitWithDataOf y los datos se obtienen mediante la clase Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```