---
id: async-migration
title: De síncrono a asíncrono
description: "Migra tus pruebas de WebdriverIO de la ejecución síncrona de comandos a la asíncrona paso a paso, incluyendo bucles forEach, aserciones y page objects síncronos."
---

Debido a cambios en V8, el equipo de WebdriverIO [anunció](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) que dejaría de dar soporte a la ejecución síncrona de comandos en abril de 2023. El equipo ha trabajado duro para que la transición sea lo más sencilla posible. En esta guía explicamos cómo puedes migrar poco a poco tu suite de pruebas de síncrona a asíncrona. Como proyecto de ejemplo usamos el [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), pero el enfoque es el mismo para cualquier otro proyecto.

## Promesas en JavaScript

La razón por la que la ejecución síncrona era popular en WebdriverIO es que elimina la complejidad de trabajar con promesas. Especialmente si vienes de otros lenguajes donde este concepto no existe de esta forma, puede resultar confuso al principio. Sin embargo, las promesas son una herramienta muy potente para manejar código asíncrono, y el JavaScript actual hace que trabajar con ellas sea realmente sencillo. Si nunca has trabajado con promesas, te recomendamos consultar la [guía de referencia de MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), ya que explicarlas aquí queda fuera del alcance de esta guía.

## Transición a asíncrono

El testrunner de WebdriverIO puede manejar ejecución asíncrona y síncrona dentro de la misma suite de pruebas. Esto significa que puedes migrar tus pruebas y PageObjects poco a poco, paso a paso y a tu ritmo. Por ejemplo, el Cucumber Boilerplate ha definido [un gran conjunto de definiciones de pasos](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) para que los copies en tu proyecto. Podemos migrar una definición de paso o un archivo a la vez.

:::tip

WebdriverIO ofrece un [codemod](https://github.com/webdriverio/codemod) que permite transformar tu código síncrono en código asíncrono de forma casi totalmente automática. Ejecuta primero el codemod tal como se describe en la documentación y utiliza esta guía para la migración manual si es necesario.

:::

En muchos casos, lo único que hay que hacer es convertir en `async` la función en la que llamas a los comandos de WebdriverIO y añadir un `await` delante de cada comando. Si observamos el primer archivo a transformar en el proyecto boilerplate, `clearInputField.ts`, pasamos de:

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

- _transformar todas las definiciones de pasos_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Esta transición es independiente de si usas TypeScript o no. Si usas TypeScript, asegúrate de cambiar en algún momento la propiedad `types` de tu `tsconfig.json` de `webdriverio/sync` a `@wdio/globals/types`. Asegúrate también de que tu objetivo de compilación esté configurado al menos en `ES2018`.
:::

## Casos especiales

Por supuesto, siempre hay casos especiales a los que debes prestar un poco más de atención.

### Bucles ForEach

Si tienes un bucle `forEach`, por ejemplo para iterar sobre elementos, debes asegurarte de que el callback del iterador se maneje correctamente de forma asíncrona, por ejemplo:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La función que pasamos a `forEach` es una función iteradora. En un mundo síncrono, haría clic en todos los elementos antes de continuar. Si transformamos esto en código asíncrono, tenemos que asegurarnos de esperar a que cada función iteradora termine su ejecución. Al añadir `async`/`await`, estas funciones iteradoras devolverán una promesa que debemos resolver. Por lo tanto, `forEach` ya no es ideal para iterar sobre los elementos, porque no devuelve el resultado de la función iteradora, es decir, la promesa que necesitamos esperar. Por ello, debemos reemplazar `forEach` por `map`, que sí devuelve esa promesa. Tanto `map` como el resto de métodos iteradores de los Arrays, como `find`, `every`, `reduce` y otros, están implementados de forma que respetan las promesas dentro de las funciones iteradoras y, por tanto, se simplifica su uso en un contexto asíncrono. El ejemplo anterior, una vez transformado, queda así:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Por ejemplo, para obtener todos los elementos `<h3 />` y su contenido de texto, puedes ejecutar:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * devuelve:
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

Si esto te parece demasiado complicado, quizá quieras considerar el uso de bucles for simples, por ejemplo:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` devuelve un [`ElementArray`](/docs/api/browser/$$). También puedes iterarlo antes de esperar a la lista:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` lanza un error hasta que la lista se haya resuelto, porque un bucle síncrono no puede esperar a la consulta. Espera primero a la lista, como en el ejemplo anterior, o usa `for await`.

### Aserciones de WebdriverIO

Si usas el asistente de aserciones de WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), asegúrate de poner un `await` delante de cada llamada a `expect`, por ejemplo:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

debe transformarse en:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Métodos de PageObject síncronos y pruebas asíncronas

Si has escrito los PageObjects de tu suite de pruebas de forma síncrona, ya no podrás usarlos en pruebas asíncronas. Si necesitas usar un método de PageObject tanto en pruebas síncronas como asíncronas, te recomendamos duplicar el método y ofrecerlo para ambos entornos, por ejemplo:

```js
class MyPageObject extends Page {
    /**
     * definir elementos
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // código síncrono
    }

    someMethodAsync () {
        // versión asíncrona de MyPageObject.someMethod()
    }
}
```

Una vez que hayas terminado la migración, puedes eliminar los métodos síncronos del PageObject y limpiar los nombres.

Si no quieres mantener dos versiones distintas de un método de PageObject, también puedes migrar todo el PageObject a asíncrono y usar [`browser.call`](https://webdriver.io/docs/api/browser/call) para ejecutar el método en un entorno síncrono, por ejemplo:

```js
// antes:
// MyPageObject.someMethod()
// después:
browser.call(() => MyPageObject.someMethod())
```

El comando `call` se asegurará de que el método asíncrono `someMethod` se resuelva antes de pasar al siguiente comando.

## Conclusión

Como puedes ver en el [PR de reescritura resultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), la complejidad de esta reescritura es bastante baja. Recuerda que puedes reescribir una definición de paso a la vez. WebdriverIO es perfectamente capaz de manejar la ejecución síncrona y asíncrona en un mismo framework.