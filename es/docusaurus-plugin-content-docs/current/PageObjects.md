---
id: pageobjects
title: Patrón de Objeto de Página
---

La versión 5 de WebdriverIO fue diseñada teniendo en cuenta el soporte para el Patrón de Objeto de Página. Al introducir el principio de "elementos como ciudadanos de primera clase", ahora es posible construir grandes conjuntos de pruebas utilizando este patrón.

No se requieren paquetes adicionales para crear objetos de página. Resulta que las clases limpias y modernas proporcionan todas las características necesarias que necesitamos:

- herencia entre objetos de página
- carga diferida de elementos
- encapsulación de métodos y acciones

El objetivo de usar objetos de página es abstraer cualquier información de la página de las pruebas reales. Idealmente, deberías almacenar todos los selectores o instrucciones específicas que son únicas para una determinada página en un objeto de página, para que puedas seguir ejecutando tu prueba después de haber rediseñado completamente tu página.

## Creando un Objeto de Página

En primer lugar, necesitamos un objeto de página principal que llamaremos `Page.js`. Contendrá selectores o métodos generales que todos los objetos de página heredarán.

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

Siempre `export` una instancia de un objeto de página, y nunca creamos esa instancia en la prueba. Como estamos escribiendo pruebas de extremo a extremo, siempre consideramos la página como una construcción sin estado&mdash;al igual que cada solicitud HTTP es una construcción sin estado.

Claro, el navegador puede llevar información de sesión y, por lo tanto, puede mostrar diferentes páginas basadas en diferentes sesiones, pero esto no debería reflejarse dentro de un objeto de página. Este tipo de cambios de estado deberían estar en tus pruebas reales.

Comencemos a probar la primera página. Para fines de demostración, usamos el sitio web [The Internet](http://the-internet.herokuapp.com) de [Elemental Selenium](http://elementalselenium.com) como conejillo de indias. Intentemos construir un ejemplo de objeto de página para la [página de inicio de sesión](http://the-internet.herokuapp.com/login).

## Obteniendo tus selectores con `Get`

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

## Encadenando Comandos

WebdriverIO internamente recuerda el último resultado de un comando. Si encadenas un comando de elemento con un comando de acción, encuentra el elemento del comando anterior y usa el resultado para ejecutar la acción. Con eso puedes eliminar el selector (primer parámetro) y el comando se ve tan simple como:

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

## Usando Objetos de Página en tus Pruebas

Después de haber definido los elementos y métodos necesarios para la página, puedes comenzar a escribir la prueba para ella. Todo lo que necesitas hacer para usar el objeto de página es `import` (o `require`). ¡Eso es todo!

Como exportaste una instancia ya creada del objeto de página, importarla te permite comenzar a usarla de inmediato.

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

Desde el lado estructural, tiene sentido separar los archivos de especificaciones y los objetos de página en diferentes directorios. Además, puedes dar a cada objeto de página la terminación: `.page.js`. Esto hace más claro que estás importando un objeto de página.

## Yendo más allá

Este es el principio básico de cómo escribir objetos de página con WebdriverIO. ¡Pero puedes construir estructuras de objetos de página mucho más complejas que esta! Por ejemplo, podrías tener objetos de página específicos para modales, o dividir un objeto de página enorme en diferentes clases (cada una representando una parte diferente de la página web general) que heredan del objeto de página principal. El patrón realmente proporciona muchas oportunidades para separar la información de la página de tus pruebas, lo cual es importante para mantener tu suite de pruebas estructurada y clara en tiempos donde el proyecto y el número de pruebas crece.

Puedes encontrar este ejemplo (e incluso más ejemplos de objetos de página) en la [`carpeta de ejemplos`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) en GitHub.