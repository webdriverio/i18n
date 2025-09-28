---
id: selectors
title: Selectores
---

The [WebDriver Protocol](https://w3c.github.io/webdriver/) provides several selector strategies to query an element. WebdriverIO simplifies them to keep selecting elements simple. Please note that even though the command to query elements is called `$` and `$$`, they have nothing to do with jQuery or the [Sizzle Selector Engine](https://github.com/jquery/sizzle).

While there are so many different selectors available, only a few of them provide a resilient way to find the right element. For example, given the following button:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Recomendamos y NO recomendamos los siguientes selectores:

| Selector | Recomendado | Notas |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nunca | Lo peor - demasiado genérico, sin contexto. |
| `$('.btn.btn-large')` | 🚨 Nunca | Malo. Acoplado al estilo. Altamente susceptible a cambios. |
| `$('#main')` | ⚠️ Con moderación | Mejor. Pero aún acoplado al estilo o listeners de eventos JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Con moderación | Consulta efectiva, compleja de escribir. |
| `$('button[name="submission"]')` | ⚠️ Con moderación | Acoplado al atributo `name` que tiene semántica HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bueno | Requiere atributo adicional, no conectado a a11y. |
| `$('aria/Submit')` | ✅ Bueno | Bueno. Se asemeja a cómo el usuario interactúa con la página. Se recomienda usar archivos de traducción para que tus pruebas no fallen cuando se actualizan las traducciones. Nota: Este selector puede ser más lento que otros en páginas grandes. |
| `$('button=Submit')` | ✅ Siempre | El mejor. Se asemeja a cómo el usuario interactúa con la página y es rápido. Se recomienda usar archivos de traducción para que tus pruebas no fallen cuando se actualizan las traducciones. |

## Selector de consulta CSS

Si no se indica lo contrario, WebdriverIO consultará elementos utilizando el patrón de [selector CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), por ejemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texto de enlace

Para obtener un elemento de anclaje con un texto específico, consulta el texto comenzando con un signo igual (`=`).

Por ejemplo:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Texto parcial de enlace

Para encontrar un elemento de anclaje cuyo texto visible coincida parcialmente con tu valor de búsqueda,
consúltalo usando `*=` delante de la cadena de consulta (por ejemplo, `*=driver`).

Puedes consultar el elemento del ejemplo anterior también llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Nota:__ No puedes mezclar múltiples estrategias de selector en un solo selector. Usa múltiples consultas de elementos encadenados para lograr el mismo objetivo, por ejemplo:

```js
const elem = await $('header h1*=Welcome') // ¡no funciona!
// usa en su lugar
const elem = await $('header').$('*=driver')
```

## Elemento con cierto texto

La misma técnica se puede aplicar a elementos también. Además, también es posible hacer una coincidencia sin distinción entre mayúsculas y minúsculas usando `.=` o `.*=` dentro de la consulta.

Por ejemplo, aquí hay una consulta para un encabezado de nivel 1 con el texto "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

O utilizando la consulta de texto parcial:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Lo mismo funciona para nombres de `id` y `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Nota:__ No puedes mezclar múltiples estrategias de selector en un solo selector. Usa múltiples consultas de elementos encadenados para lograr el mismo objetivo, por ejemplo:

```js
const elem = await $('header h1*=Welcome') // ¡no funciona!
// usa en su lugar
const elem = await $('header').$('h1*=Welcome')
```

## Nombre de etiqueta

Para consultar un elemento con un nombre de etiqueta específico, usa `<tag>` o `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Atributo de nombre

Para consultar elementos con un atributo de nombre específico, puedes usar un selector CSS3 normal o la estrategia de nombre proporcionada por el [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) pasando algo como [name="some-name"] como parámetro de selector:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Nota:__ Esta estrategia de selector está obsoleta y solo funciona en navegadores antiguos que se ejecutan mediante el protocolo JSONWireProtocol o utilizando Appium.

## xPath

También es posible consultar elementos a través de un [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) específico.

Un selector xPath tiene un formato como `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Puedes consultar el segundo párrafo llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Puedes usar xPath para también recorrer hacia arriba y hacia abajo en el árbol DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selector de nombre de accesibilidad

Consulta elementos por su nombre accesible. El nombre accesible es lo que anuncia un lector de pantalla cuando ese elemento recibe el foco. El valor del nombre accesible puede ser tanto contenido visual como alternativas de texto ocultas.

:::info

Puedes leer más sobre este selector en nuestro [post del blog de lanzamiento](/blog/2022/09/05/accessibility-selector)

:::

### Obtener por `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Obtener por `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Obtener por contenido

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Obtener por título

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Obtener por propiedad `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Atributo de rol

Para consultar elementos basados en [roles ARIA](https://www.w3.org/TR/html-aria/#docconformance), puedes especificar directamente el rol del elemento como `[role=button]` como parámetro de selector:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atributo ID

La estrategia de localizador "id" no es compatible con el protocolo WebDriver, se debe usar estrategias de selector CSS o xPath en su lugar para encontrar elementos usando ID.

Sin embargo, algunos controladores (por ejemplo, [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) podrían aún [soportar](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) este selector.

Las sintaxis de selector actualmente soportadas para ID son:

```js
//localizador css
const button = await $('#someid')
//localizador xpath
const button = await $('//*[@id="someid"]')
//estrategia id
// Nota: funciona solo en Appium o frameworks similares que soportan la estrategia de localizador "ID"
const button = await $('id=resource-id/iosname')
```

## Función JS

También puedes usar funciones JavaScript para obtener elementos utilizando APIs nativas web. Por supuesto, solo puedes hacer esto dentro de un contexto web (por ejemplo, `browser`, o contexto web en móvil).

Dada la siguiente estructura HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Puedes consultar el elemento hermano de `#elem` de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Selectores profundos

:::warning

A partir de la `v9` de WebdriverIO no hay necesidad de este selector especial ya que WebdriverIO automáticamente atraviesa el Shadow DOM por ti. Se recomienda migrar de este selector eliminando el `>>>` frente a él.

:::

Muchas aplicaciones frontend dependen en gran medida de elementos con [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Es técnicamente imposible consultar elementos dentro del shadow DOM sin soluciones alternativas. Los comandos [`shadow$`](https://webdriver.io/docs/api/element/shadow$) y [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) han sido tales soluciones alternativas que tenían sus [limitaciones](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Con el selector profundo ahora puedes consultar todos los elementos dentro de cualquier shadow DOM usando el comando de consulta común.

Supongamos que tenemos una aplicación con la siguiente estructura:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Con este selector puedes consultar el elemento `<button />` que está anidado dentro de otro shadow DOM, por ejemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Selectores móviles

Para pruebas móviles híbridas, es importante que el servidor de automatización esté en el *contexto* correcto antes de ejecutar comandos. Para automatizar gestos, idealmente el controlador debería establecerse en el contexto nativo. Pero para seleccionar elementos del DOM, el controlador necesitará establecerse en el contexto de webview de la plataforma. Solo *entonces* se pueden utilizar los métodos mencionados anteriormente.

Para pruebas móviles nativas, no hay cambio entre contextos, ya que tienes que usar estrategias móviles y usar la tecnología de automatización del dispositivo subyacente directamente. Esto es especialmente útil cuando una prueba necesita un control más preciso sobre la búsqueda de elementos.

### Android UiAutomator

El framework UI Automator de Android proporciona varias formas de encontrar elementos. Puedes usar la [API de UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), en particular la [clase UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) para localizar elementos. En Appium, envías el código Java, como una cadena, al servidor, que lo ejecuta en el entorno de la aplicación, devolviendo el elemento o elementos.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher y ViewMatcher (solo Espresso)

La estrategia DataMatcher de Android proporciona una forma de encontrar elementos mediante [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Y de manera similar [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (solo Espresso)

La estrategia de view tag proporciona una forma conveniente de encontrar elementos por su [etiqueta](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Al automatizar una aplicación iOS, se puede utilizar el [framework de UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) de Apple para encontrar elementos.

Esta [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) de JavaScript tiene métodos para acceder a la vista y todo lo que contiene.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

También puedes usar la búsqueda de predicados dentro de UI Automation de iOS en Appium para refinar aún más la selección de elementos. Consulta [aquí](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) para más detalles.

### iOS XCUITest cadenas de predicados y cadenas de clase

Con iOS 10 y superior (usando el controlador `XCUITest`), puedes usar [cadenas de predicados](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Y [cadenas de clase](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### ID de accesibilidad

La estrategia de localizador `accessibility id` está diseñada para leer un identificador único para un elemento de UI. Esto tiene el beneficio de no cambiar durante la localización o cualquier otro proceso que pueda cambiar el texto. Además, puede ser una ayuda en la creación de pruebas multiplataforma, si los elementos que son funcionalmente iguales tienen el mismo id de accesibilidad.

- Para iOS, este es el `accessibility identifier` establecido por Apple [aquí](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Para Android, el `accessibility id` se mapea a la `content-description` del elemento, como se describe [aquí](https://developer.android.com/training/accessibility/accessible-app.html).

Para ambas plataformas, obtener un elemento (o múltiples elementos) por su `accessibility id` es generalmente el mejor método. También es la forma preferida sobre la estrategia `name` obsoleta.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Nombre de clase

La estrategia `class name` es una `cadena` que representa un elemento UI en la vista actual.

- Para iOS, es el nombre completo de una [clase de UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), y comenzará con `UIA-`, como `UIATextField` para un campo de texto. Se puede encontrar una referencia completa [aquí](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Para Android, es el nombre completamente calificado de una [clase de UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html), como `android.widget.EditText` para un campo de texto. Se puede encontrar una referencia completa [aquí](https://developer.android.com/reference/android/widget/package-summary.html).
- Para Youi.tv, es el nombre completo de una clase Youi.tv, y comenzará con `CYI-`, como `CYIPushButtonView` para un elemento de botón de presión. Se puede encontrar una referencia completa en la [página de GitHub de You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Ejemplo iOS
await $('UIATextField').click()
// Ejemplo Android
await $('android.widget.DatePicker').click()
// Ejemplo Youi.tv
await $('CYIPushButtonView').click()
```

## Selectores en cadena

Si quieres ser más específico en tu consulta, puedes encadenar selectores hasta que hayas encontrado el elemento correcto. Si llamas a `element` antes de tu comando real, WebdriverIO inicia la consulta desde ese elemento.

Por ejemplo, si tienes una estructura DOM como:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Y quieres añadir el producto B al carrito, sería difícil hacerlo solo usando el selector CSS.

Con la encadenación de selectores, es mucho más fácil. Simplemente reduce paso a paso al elemento deseado:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Selector de imagen de Appium

Usando la estrategia de localizador `-image`, es posible enviar a Appium un archivo de imagen que representa un elemento al que quieres acceder.

Formatos de archivo soportados `jpg,png,gif,bmp,svg`

Se puede encontrar una referencia completa [aquí](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Nota**: La forma en que Appium funciona con este selector es que internamente hará una captura de pantalla (de la aplicación) y usará el selector de imagen proporcionado para verificar si el elemento se puede encontrar en esa captura de pantalla.

Ten en cuenta que Appium podría cambiar el tamaño de la captura de pantalla tomada para hacerla coincidir con el tamaño CSS de tu pantalla (de aplicación) (esto sucederá en iPhones pero también en máquinas Mac con pantalla Retina porque el DPR es mayor que 1). Esto resultará en no encontrar una coincidencia porque el selector de imagen proporcionado podría haber sido tomado de la captura de pantalla original.
Puedes solucionar esto actualizando la configuración del Servidor Appium, consulta los [documentos de Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) para la configuración y [este comentario](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) para una explicación detallada.

## Selectores de React

WebdriverIO proporciona una forma de seleccionar componentes de React basados en el nombre del componente. Para hacer esto, tienes la opción de dos comandos: `react$` y `react$$`.

Estos comandos te permiten seleccionar componentes del [VirtualDOM de React](https://reactjs.org/docs/faq-internals.html) y devuelven un solo Elemento WebdriverIO o una matriz de elementos (dependiendo de qué función se utilice).

**Nota**: Los comandos `react$` y `react$$` son similares en funcionalidad, excepto que `react$$` devolverá *todas* las instancias coincidentes como una matriz de elementos WebdriverIO, y `react$` devolverá la primera instancia encontrada.

#### Ejemplo básico

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

En el código anterior hay una instancia simple de `MyComponent` dentro de la aplicación, que React está renderizando dentro de un elemento HTML con `id="root"`.

Con el comando `browser.react$`, puedes seleccionar una instancia de `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Ahora que tienes el elemento WebdriverIO almacenado en la variable `myCmp`, puedes ejecutar comandos de elementos contra él.

#### Filtrando componentes

La biblioteca que WebdriverIO usa internamente permite filtrar tu selección por props y/o estado del componente. Para hacerlo, necesitas pasar un segundo argumento para props y/o un tercer argumento para estado al comando del navegador.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Si quieres seleccionar la instancia de `MyComponent` que tiene una propiedad `name` como `WebdriverIO`, puedes ejecutar el comando de la siguiente manera:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Si quisieras filtrar nuestra selección por estado, el comando `browser` se vería algo como:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### Tratando con `React.Fragment`

Cuando usas el comando `react$` para seleccionar [fragmentos](https://reactjs.org/docs/fragments.html) de React, WebdriverIO devolverá el primer hijo de ese componente como el nodo del componente. Si usas `react$$`, recibirás una matriz que contiene todos los nodos HTML dentro de los fragmentos que coinciden con el selector.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Dado el ejemplo anterior, así es como funcionarían los comandos:

```js
await browser.react$('MyComponent') // devuelve el Elemento WebdriverIO para el primer <div />
await browser.react$$('MyComponent') // devuelve los Elementos WebdriverIO para el array [<div />, <div />]
```

**Nota:** Si tienes múltiples instancias de `MyComponent` y usas `react$$` para seleccionar estos componentes de fragmentos, se te devolverá un array unidimensional de todos los nodos. En otras palabras, si tienes 3 instancias de `<MyComponent />`, se te devolverá un array con seis elementos WebdriverIO.

## Estrategias de selector personalizado

Si tu aplicación requiere una forma específica de buscar elementos, puedes definir tú mismo una estrategia de selector personalizada que puedes usar con `custom$` y `custom$$`. Para eso, registra tu estrategia una vez al principio de la prueba, por ejemplo, en un hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Dado el siguiente fragmento HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Luego úsalo llamando a:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Nota:** esto solo funciona en un entorno web en el que se pueda ejecutar el comando [`execute`](/docs/api/browser/execute).