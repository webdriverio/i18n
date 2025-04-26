---
id: async-migration
title: De Sync a Async
---

Debido a cambios en V8, el equipo de WebdriverIO [anunció](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) la obsolescencia de la ejecución sincrónica de comandos para abril de 2023. El equipo ha trabajado arduamente para hacer la transición lo más fácil posible. En esta guía explicamos cómo puedes migrar gradualmente tu suite de pruebas de sincrónica a asincrónica. Como proyecto de ejemplo, usamos el [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), pero el enfoque es el mismo con todos los demás proyectos.

## Promesas en JavaScript

La razón por la que la ejecución sincrónica era popular en WebdriverIO es porque elimina la complejidad de manejar promesas. Particularmente si vienes de otros lenguajes donde este concepto no existe de esta manera, puede ser confuso al principio. Sin embargo, las Promesas son una herramienta muy poderosa para manejar código asincrónico y el JavaScript actual hace que sea realmente fácil trabajar con ellas. Si nunca has trabajado con Promesas, te recomendamos consultar la [guía de referencia de MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), ya que estaría fuera del alcance explicarlo aquí.

## Transición a Async

El test runner de WebdriverIO puede manejar ejecución asincrónica y sincrónica dentro de la misma suite de pruebas. Esto significa que puedes migrar tus pruebas y PageObjects paso a paso a tu ritmo. Por ejemplo, el Cucumber Boilerplate ha definido [un amplio conjunto de definiciones de pasos](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) para que los copies en tu proyecto. Podemos proceder y migrar una definición de paso o un archivo a la vez.

:::tip

WebdriverIO ofrece un [codemod](https://github.com/webdriverio/codemod) que permite transformar tu código sincrónico en código asincrónico casi automáticamente. Ejecuta el codemod como se describe en la documentación primero y usa esta guía para la migración manual si es necesario.

:::

En muchos casos, todo lo que es necesario hacer es convertir la función en la que llamas a comandos de WebdriverIO en `async` y agregar un `await` delante de cada comando. Mirando el primer archivo `clearInputField.ts` para transformar en el proyecto boilerplate, transformamos de:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

a:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Eso es todo. Puedes ver el commit completo con todos los ejemplos de reescritura aquí:

#### Commits:

- _transform all step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Esta transición es independiente de si usas TypeScript o no. Si usas TypeScript, asegúrate de cambiar eventualmente la propiedad `types` en tu `tsconfig.json` de `webdriverio/sync` a `@wdio/globals/types`. También asegúrate de que tu objetivo de compilación esté configurado al menos en `ES2018`.
:::

## Casos Especiales

Por supuesto, siempre hay casos especiales donde necesitas prestar un poco más de atención.

### Bucles ForEach

Si tienes un bucle `forEach`, por ejemplo, para iterar sobre elementos, debes asegurarte de que la función de callback del iterador se maneje correctamente de manera asincrónica, por ejemplo:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La función que pasamos a `forEach` es una función iteradora. En un mundo sincrónico, haría clic en todos los elementos antes de continuar. Si transformamos esto en código asincrónico, debemos asegurarnos de esperar a que cada función iteradora termine su ejecución. Al agregar `async`/`await`, estas funciones iteradoras devolverán una promesa que necesitamos resolver. Ahora, `forEach` no es ideal para iterar sobre los elementos porque no devuelve el resultado de la función iteradora, la promesa que necesitamos esperar. Por lo tanto, necesitamos reemplazar `forEach` con `map`, que devuelve esa promesa. El `map`, así como todos los demás métodos iteradores de Arrays como `find`, `every`, `reduce` y más, están implementados para que respeten las promesas dentro de las funciones iteradoras y, por lo tanto, se simplifican para usarlos en un contexto asincrónico. El ejemplo anterior transformado se ve así:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Por ejemplo, para obtener todos los elementos `<h3 />` y obtener su contenido de texto, puedes ejecutar:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Si esto parece demasiado complicado, puedes considerar usar bucles for simples, por ejemplo:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### Aserciones de WebdriverIO

Si usas el ayudante de aserciones de WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), asegúrate de colocar un `await` delante de cada llamada a `expect`, por ejemplo:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

debe transformarse a:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Métodos de PageObject Sincrónicos y Pruebas Asincrónicas

Si has estado escribiendo PageObjects en tu suite de pruebas de manera sincrónica, no podrás usarlos en pruebas asincrónicas. Si necesitas usar un método de PageObject tanto en pruebas sincrónicas como asincrónicas, recomendamos duplicar el método y ofrecerlos para ambos entornos, por ejemplo:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

Una vez que hayas terminado la migración, puedes eliminar los métodos sincrónicos de PageObject y limpiar la nomenclatura.

Si no te gusta mantener dos versiones diferentes de un método de PageObject, también puedes migrar todo el PageObject a async y usar [`browser.call`](https://webdriver.io/docs/api/browser/call) para ejecutar el método en un entorno sincrónico, por ejemplo:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

El comando `call` se asegurará de que el método asincrónico `someMethod` se resuelva antes de pasar al siguiente comando.

## Conclusión

Como puedes ver en el [PR de reescritura resultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), la complejidad de esta reescritura es bastante sencilla. Recuerda que puedes reescribir una definición de paso a la vez. WebdriverIO es perfectamente capaz de manejar ejecución sincrónica y asincrónica en un solo framework.