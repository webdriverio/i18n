---
id: pageobjects
title: Patrón Page Object
description: "Estructura tus pruebas con el patrón page object moviendo los selectores y las acciones específicas de cada página a clases de página reutilizables."
---

La versión 5 de WebdriverIO fue diseñada teniendo en cuenta el soporte para el Patrón Page Object. Al introducir el principio de "elementos como ciudadanos de primera clase", ahora es posible construir grandes suites de pruebas utilizando este patrón.

No se requieren paquetes adicionales para crear page objects. Resulta que las clases limpias y modernas proporcionan todas las características necesarias que necesitamos:

- herencia entre page objects
- carga diferida (lazy loading) de elementos
- encapsulación de métodos y acciones

El objetivo de usar page objects es abstraer cualquier información de la página fuera de las pruebas reales. Idealmente, deberías almacenar todos los selectores o instrucciones específicas que son únicas para una página determinada en un page object, de modo que aún puedas ejecutar tu prueba después de haber rediseñado completamente tu página.

## Creando un Page Object

En primer lugar, necesitamos un page object principal al que llamaremos `Page.js`. Contendrá selectores o métodos generales de los que heredarán todos los page objects.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Siempre haremos `export` de una instancia de un page object, y nunca crearemos esa instancia en la prueba. Dado que estamos escribiendo pruebas end-to-end, siempre consideramos la página como una construcción sin estado&mdash;así como cada petición HTTP es una construcción sin estado.

Claro, el navegador puede llevar información de sesión y, por lo tanto, puede mostrar diferentes páginas según diferentes sesiones, pero esto no debería reflejarse dentro de un page object. Este tipo de cambios de estado deberían estar en tus pruebas reales.

Comencemos a probar la primera página. Con fines de demostración, usamos el sitio web [The Internet](http://the-internet.herokuapp.com) de [Elemental Selenium](http://elementalselenium.com) como conejillo de indias. Intentemos construir un ejemplo de page object para la [página de inicio de sesión](http://the-internet.herokuapp.com/login).

## Obteniendo (`Get`) tus selectores

El primer paso es escribir todos los selectores importantes que se requieren en nuestro objeto `login.page` como funciones getter:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Definir selectores en funciones getter puede parecer un poco extraño, pero es realmente útil. Estas funciones se evalúan _cuando accedes a la propiedad_, no cuando generas el objeto. Con eso, siempre solicitas el elemento antes de realizar una acción sobre él.

## Encadenando comandos

WebdriverIO recuerda internamente el último resultado de un comando. Si encadenas un comando de elemento con un comando de acción, encuentra el elemento del comando anterior y usa el resultado para ejecutar la acción. Con eso puedes eliminar el selector (primer parámetro) y el comando queda tan simple como:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Lo cual es básicamente lo mismo que:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

o

```js
await $('#username').setValue('Max Mustermann')
```

## Usando Page Objects en tus pruebas

Después de haber definido los elementos y métodos necesarios para la página, puedes comenzar a escribir la prueba para ella. Todo lo que necesitas hacer para usar el page object es hacer `import` (o `require`) de él. ¡Eso es todo!

Como exportaste una instancia ya creada del page object, importarlo te permite comenzar a usarlo de inmediato.

Si usas un framework de aserciones, tus pruebas pueden ser aún más expresivas:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

Desde el punto de vista estructural, tiene sentido separar los archivos de especificación y los page objects en diferentes directorios. Además, puedes dar a cada page object la terminación: `.page.js`. Esto deja más claro que estás importando un page object.

## Yendo más allá

Este es el principio básico de cómo escribir page objects con WebdriverIO. ¡Pero puedes construir estructuras de page objects mucho más complejas que esta! Por ejemplo, podrías tener page objects específicos para modales, o dividir un page object enorme en diferentes clases (cada una representando una parte diferente de la página web completa) que heredan del page object principal. El patrón realmente ofrece muchas oportunidades para separar la información de la página de tus pruebas, lo cual es importante para mantener tu suite de pruebas estructurada y clara a medida que el proyecto y el número de pruebas crecen.

Puedes encontrar este ejemplo (e incluso más ejemplos de page objects) en la [carpeta `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) en GitHub.