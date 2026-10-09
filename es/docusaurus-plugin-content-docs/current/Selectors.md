---
id: selectors
title: Selectores
description: "Encuentra elementos con CSS, texto, XPath, nombre accesible, rol ARIA y otras estrategias de selectores, y aprende cuáles son las más resistentes."
---

El [Protocolo WebDriver](https://w3c.github.io/webdriver/) proporciona varias estrategias de selectores para consultar un elemento. WebdriverIO las simplifica para que seleccionar elementos siga siendo sencillo. Ten en cuenta que, aunque los comandos para consultar elementos se llaman `$` y `$$`, no tienen nada que ver con jQuery ni con el [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Aunque hay muchísimos selectores diferentes disponibles, solo unos pocos ofrecen una forma resistente de encontrar el elemento correcto. Por ejemplo, dado el siguiente botón:

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

__Sí__ y __no__ recomendamos los siguientes selectores:

| Selector | Recomendado | Notas |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nunca | El peor: demasiado genérico, sin contexto. |
| `$('.btn.btn-large')` | 🚨 Nunca | Malo. Acoplado a los estilos. Muy propenso a cambios. |
| `$('#main')` | ⚠️ Con moderación | Mejor. Pero sigue acoplado a los estilos o a los event listeners de JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Con moderación | Consulta eficaz, compleja de escribir. |
| `$('button[name="submission"]')` | ⚠️ Con moderación | Acoplado al atributo `name`, que tiene semántica HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bueno | Requiere un atributo adicional, no está conectado con la a11y. |
| `$('aria/Submit')` | ✅ Bueno | Bueno. Se asemeja a cómo el usuario interactúa con la página. Se recomienda usar archivos de traducción para que tus pruebas no fallen cuando se actualicen las traducciones. En sesiones WebDriver BiDi utiliza el árbol de accesibilidad del navegador. En sesiones Classic recurre a XPath y puede ser más lento en páginas grandes. |
| `$('button=Submit')` | ✅ Siempre | El mejor. Se asemeja a cómo el usuario interactúa con la página y es rápido. Se recomienda usar archivos de traducción para que tus pruebas no fallen cuando se actualicen las traducciones. |

## Modo estricto

A partir de la v10, el comando [`$`](/docs/api/browser/$) es __estricto__: representa exactamente un elemento. Si el selector coincide con más de un elemento, el comando lanza un `StrictSelectorError` en lugar de elegir silenciosamente la primera coincidencia:

```js
// hay 12 botones en la página
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Este es el mismo comportamiento que el de los [locators de Playwright](https://playwright.dev/docs/locators#strictness). Cypress es diferente: sus consultas pueden resolverse en varios elementos, y son los comandos de acción como [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) los que rechazan por defecto un sujeto con varios elementos. El modo estricto pone de manifiesto los selectores demasiado amplios, que de otro modo interactuarían silenciosamente con el elemento equivocado en cuanto la página creciera.

La regla se aplica a cada paso de una [cadena](#chain-selectors) y a cada tipo de selector que acepta `$`: selectores de tipo string (incluidos los que atraviesan el shadow DOM), [funciones JS](#js-function), [selectores móviles](#mobile-selectors) y referencias a [estrategias personalizadas](#custom-selector-strategies).

### Lo que no se ve afectado

- `$$` sigue devolviendo cero o varios elementos, como un [`ElementArray`](/docs/api/browser/$$). Espera con await la lista (o su `.length`) antes de leer el recuento o usar `for...of`. `for await` funciona directamente sobre la lista.
- Los comandos auxiliares dedicados `custom$`, `shadow$` y `react$` no son estrictos: siguen devolviendo su primera coincidencia, al igual que sus equivalentes `$$`.
- Un selector que no coincide con nada sigue devolviendo un elemento resuelto de forma diferida, por lo que [`waitForExist`](/docs/api/element/waitForExist) y el comportamiento de [espera automática](/docs/autowait) no cambian.
- Pasar una referencia de elemento, p. ej. `$(await browser.getActiveElement())`, siempre hace referencia a un único nodo y nunca se comprueba.

:::info Migración a v10

Para saber cómo auditar tu suite en busca de infracciones del modo estricto, acotar o excluir consultas individuales y desactivar el modo estricto en todo el proyecto, consulta la [guía de migración a v10](/docs/v10-migration).

:::

## Selector de consulta CSS

Si no se indica lo contrario, WebdriverIO consultará los elementos usando el patrón de [selector CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), p. ej.:

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

## Texto de enlace parcial

Para encontrar un elemento de anclaje cuyo texto visible coincida parcialmente con tu valor de búsqueda,
consúltalo usando `*=` delante de la cadena de consulta (p. ej. `*=driver`).

También puedes consultar el elemento del ejemplo anterior llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Nota:__ No puedes mezclar varias estrategias de selectores en un mismo selector. Usa varias consultas de elementos encadenadas para lograr el mismo objetivo, p. ej.:

```js
const elem = await $('header h1*=Welcome') // ¡¡¡no funciona!!!
// usa en su lugar
const elem = await $('header').$('*=driver')
```

## Elemento con un texto determinado

La misma técnica se puede aplicar también a elementos. Además, también es posible hacer una coincidencia sin distinguir mayúsculas y minúsculas usando `.=` o `.*=` dentro de la consulta.

Por ejemplo, aquí hay una consulta para un encabezado de nivel 1 con el texto "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

O usando una consulta de texto parcial:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Lo mismo funciona para los nombres de `id` y `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Puedes consultar este elemento llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Nota:__ No puedes mezclar varias estrategias de selectores en un mismo selector. Usa varias consultas de elementos encadenadas para lograr el mismo objetivo, p. ej.:

```js
const elem = await $('header h1*=Welcome') // ¡¡¡no funciona!!!
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

## Atributo name

Para consultar elementos con un atributo name específico, usa un selector CSS como `[name="some-name"]`. En una sesión móvil, esa misma forma abreviada se envía con la estrategia de localización `name` de Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Nota:__ La estrategia de localización `name` es un localizador de Appium. Las sesiones de escritorio mantienen `[name="some-name"]` en la estrategia CSS.

## xPath

También es posible consultar elementos mediante un [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) específico.

Un selector xPath tiene un formato como `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Puedes consultar el segundo párrafo llamando a:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

También puedes usar xPath para recorrer el árbol DOM hacia arriba y hacia abajo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selector de nombre accesible

Consulta elementos por su nombre accesible. El nombre accesible es lo que anuncia un lector de pantalla cuando ese elemento recibe el foco. El valor del nombre accesible puede ser tanto contenido visual como alternativas de texto ocultas.

En sesiones [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox y otros navegadores compatibles con BiDi), WebdriverIO usa primero [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) con un localizador de accesibilidad. Esto consulta directamente el árbol de accesibilidad del navegador y suele ser mucho más rápido que la aproximación con XPath. Si el localizador de accesibilidad no encuentra nada, WebdriverIO recurre a la heurística XPath de Classic para que las consultas `aria/` existentes sigan coincidiendo.

:::info

Puedes leer más sobre este selector en nuestra [entrada del blog del lanzamiento](/blog/2022/09/05/accessibility-selector)

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

### Obtener por la propiedad `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Selector de rol

Consulta elementos por su rol ARIA y su nombre accesible, de la forma en que los describe un lector de pantalla: "el botón *Add to cart*". Un rol junto con un nombre sigue coincidiendo aunque cambien los nombres de clase, los test ids o la estructura del DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// solo el rol
const rows = await $$('role/row')

// limitado a un elemento padre
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

La sintaxis es `role/<role>` o `role/<role>[name="<accessible name>"]`. Las comillas simples también funcionan, y una comilla dentro del nombre se escapa con una barra invertida: `role/button[name="Say \"hi\""]`.

- El nombre tiene que coincidir con el nombre accesible completo.
- El rol tiene que ser un rol ARIA. Un error tipográfico falla indicando el rol válido más cercano, por ejemplo `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` y su nombre en ARIA 1.3, `image`, son el mismo rol.
- El selector sigue el [modo estricto](#strict-mode) de `$` como cualquier otro selector.

En una sesión [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), WebdriverIO pasa el rol y el nombre a [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). El propio navegador calcula ambos, de la misma forma en que la tecnología de asistencia ve la página. Se encuentran los elementos dentro de shadow roots abiertos y dentro de frames, incluidos los frames de otro origen. Si el navegador no encuentra ningún elemento, no se recurre a ninguna heurística. Ten en cuenta que es el navegador quien decide el rol: por ejemplo, una `<table>` sin encabezados ni caption puede ser una tabla de maquetación, y entonces sus filas no tienen el rol `row`.

En una sesión WebDriver Classic, y cuando un navegador no admite el localizador de rol, WebdriverIO calcula el rol y el nombre accesible en la página con [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), la implementación que usa Testing Library. Un campo de texto sin etiqueta recibe como nombre su `placeholder`, como hacen los navegadores. El selector de rol no está disponible en un contexto de aplicación móvil nativa. Usa allí un [accessibility id](#accessibility-id).

## ARIA - Atributo role

Para consultar elementos basándote en [roles ARIA](https://www.w3.org/TR/html-aria/#docconformance), puedes especificar directamente el rol del elemento, como `[role=button]`, como parámetro del selector. Este selector aproxima el rol a partir del nombre y los atributos del elemento. Es preferible el [selector de rol](#role-selector), que usa el rol que calcula el navegador y también puede coincidir con el nombre accesible:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atributo ID

La estrategia de localización "id" no es compatible con el protocolo WebDriver; en su lugar, se deben usar las estrategias de selectores CSS o xPath para encontrar elementos por ID.

Sin embargo, algunos drivers (p. ej. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) todavía podrían [admitir](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) este selector.

Las sintaxis de selector actualmente admitidas para ID son:

```js
//localizador css
const button = await $('#someid')
//localizador xpath
const button = await $('//*[@id="someid"]')
//estrategia id
// Nota: solo funciona en Appium o frameworks similares que admiten la estrategia de localización "ID"
const button = await $('id=resource-id/iosname')
```

## Función JS

También puedes usar funciones de JavaScript para obtener elementos mediante APIs web nativas. Por supuesto, solo puedes hacerlo dentro de un contexto web (p. ej., `browser`, o un contexto web en móvil).

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

A partir de la `v9` de WebdriverIO no es necesario este selector especial, ya que WebdriverIO atraviesa automáticamente el Shadow DOM por ti. Se recomienda dejar de usar este selector eliminando el `>>>` que lo precede.

:::

Muchas aplicaciones frontend dependen en gran medida de elementos con [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Técnicamente es imposible consultar elementos dentro del shadow DOM sin soluciones alternativas. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) y [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) han sido soluciones alternativas de este tipo que tenían sus [limitaciones](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Con el selector profundo ahora puedes consultar todos los elementos dentro de cualquier shadow DOM usando el comando de consulta habitual.

Supongamos que tenemos una aplicación con la siguiente estructura:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Con este selector puedes consultar el elemento `<button />` que está anidado dentro de otro shadow DOM, p. ej.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Selectores móviles

Para las pruebas móviles híbridas, es importante que el servidor de automatización esté en el *contexto* correcto antes de ejecutar comandos. Para automatizar gestos, lo ideal es que el driver esté configurado en el contexto nativo. Pero para seleccionar elementos del DOM, el driver tendrá que estar configurado en el contexto webview de la plataforma. Solo *entonces* se pueden usar los métodos mencionados anteriormente.

Para las pruebas móviles nativas no hay cambio entre contextos, ya que tienes que usar estrategias móviles y utilizar directamente la tecnología de automatización subyacente del dispositivo. Esto es especialmente útil cuando una prueba necesita un control detallado sobre la búsqueda de elementos.

### Android UiAutomator

El framework UI Automator de Android ofrece varias formas de encontrar elementos. Puedes usar la [API de UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), en particular la [clase UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), para localizar elementos. En Appium envías el código Java, como una cadena, al servidor, que lo ejecuta en el entorno de la aplicación y devuelve el elemento o los elementos.

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

Y de forma similar [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (solo Espresso)

La estrategia view tag proporciona una forma cómoda de encontrar elementos por su [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Al automatizar una aplicación iOS, se puede usar el [framework UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) de Apple para encontrar elementos.

Esta [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) de JavaScript tiene métodos para acceder a la vista y a todo lo que hay en ella.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

También puedes usar búsquedas con predicados dentro de iOS UI Automation en Appium para refinar aún más la selección de elementos. Consulta [aquí](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) para más detalles.

### Predicate strings y class chains de iOS XCUITest

Con iOS 10 y versiones posteriores (usando el driver `XCUITest`), puedes usar [predicate strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Y [class chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

La estrategia de localización `accessibility id` está diseñada para leer un identificador único de un elemento de la interfaz. Esto tiene la ventaja de que no cambia durante la localización ni durante ningún otro proceso que pueda cambiar el texto. Además, puede ser de ayuda para crear pruebas multiplataforma, si los elementos que son funcionalmente iguales tienen el mismo accessibility id.

- En iOS es el `accessibility identifier` descrito por Apple [aquí](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- En Android, el `accessibility id` corresponde a la `content-description` del elemento, como se describe [aquí](https://developer.android.com/training/accessibility/accessible-app.html).

En ambas plataformas, obtener un elemento (o varios elementos) por su `accessibility id` suele ser el mejor método. También es la forma preferida frente a la estrategia obsoleta `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

La estrategia `class name` es un `string` que representa un elemento de la interfaz en la vista actual.

- En iOS es el nombre completo de una [clase de UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html), y comenzará por `UIA-`, como `UIATextField` para un campo de texto. Puedes encontrar una referencia completa [aquí](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- En Android es el nombre completo cualificado de una [clase](https://developer.android.com/reference/android/widget/package-summary.html) de [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), como `android.widget.EditText` para un campo de texto. Puedes encontrar una referencia completa [aquí](https://developer.android.com/reference/android/widget/package-summary.html).
- En Youi.tv es el nombre completo de una clase de Youi.tv, y comenzará por `CYI-`, como `CYIPushButtonView` para un elemento de botón. Puedes encontrar una referencia completa en la [página de GitHub de You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Ejemplo de iOS
await $('UIATextField').click()
// Ejemplo de Android
await $('android.widget.DatePicker').click()
// Ejemplo de Youi.tv
await $('CYIPushButtonView').click()
```

## Encadenar selectores

Si quieres ser más específico en tu consulta, puedes encadenar selectores hasta encontrar el elemento
correcto. Si llamas a `element` antes de tu comando real, WebdriverIO inicia la consulta desde ese elemento.

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

Y quieres añadir el producto B al carrito, sería difícil hacerlo usando únicamente el selector CSS.

Con el encadenamiento de selectores es mucho más fácil. Simplemente acota el elemento deseado paso a paso:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Selector de imagen de Appium

Usando la estrategia de localización `-image`, es posible enviar a Appium un archivo de imagen que represente un elemento al que quieres acceder.

Formatos de archivo admitidos: `jpg,png,gif,bmp,svg`

Puedes encontrar la referencia completa [aquí](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Nota**: La forma en que Appium trabaja con este selector es que internamente hará una captura de pantalla (de la app) y usará el selector de imagen proporcionado
para verificar si el elemento se puede encontrar en esa captura de pantalla (de la app).

Ten en cuenta que Appium podría redimensionar la captura de pantalla (de la app) tomada para que coincida con el tamaño CSS de tu pantalla (de la app) (esto ocurrirá
en iPhones, pero también en equipos Mac con pantalla Retina, porque el DPR es mayor que 1). Esto hará que no se encuentre ninguna coincidencia, porque
el selector de imagen proporcionado podría haberse tomado de la captura de pantalla original.
Puedes solucionarlo actualizando la configuración del servidor de Appium; consulta la [documentación de Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
para ver la configuración y [este comentario](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) para una explicación detallada.

## Selectores de React

WebdriverIO proporciona una forma de seleccionar componentes de React basándose en el nombre del componente. Para ello, puedes elegir entre dos comandos: `react$` y `react$$`.

Estos comandos te permiten seleccionar componentes del [VirtualDOM de React](https://reactjs.org/docs/faq-internals.html) y devuelven un único elemento de WebdriverIO o un array de elementos (según la función que se use).

**Nota**: Los comandos `react$` y `react$$` tienen una funcionalidad similar, excepto que `react$$` devolverá *todas* las instancias coincidentes como un array de elementos de WebdriverIO, y `react$` devolverá la primera instancia encontrada.

Los comandos funcionan con React 16 a 19, para una app que se inicia con `createRoot` o con `ReactDOM.render`. Leen los componentes del renderizado actual, por lo que también encuentran componentes añadidos por un cambio de estado. Si React aún no ha renderizado una raíz de la página, esperan hasta 5 segundos a que lo haga.

#### Ejemplo básico

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

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

createRoot(document.querySelector('#root')).render(<App />)
```

En el código anterior hay una instancia sencilla de `MyComponent` dentro de la aplicación, que React renderiza dentro de un elemento HTML con `id="root"`.

Con el comando `browser.react$` puedes seleccionar una instancia de `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Ahora que tienes el elemento de WebdriverIO almacenado en la variable `myCmp`, puedes ejecutar comandos de elemento sobre él.

#### Filtrar componentes

Puedes filtrar tu selección por las props y/o el estado del componente. Para ello, pasa `props` y/o `state` en el segundo argumento del comando.

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

Si quieres seleccionar la instancia de `MyComponent` que tiene una prop `name` con el valor `WebdriverIO`, puedes ejecutar el comando así:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Si quisieras filtrar la selección por estado, el comando de `browser` sería algo así:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Un filtro coincide cuando cada una de sus claves que también tiene el componente coincide. Una clave que el componente no tiene se ignora. Un objeto anidado coincide de la misma forma, y un array coincide cuando tiene un valor en común con el array del componente. `null`, `false` y `0` coinciden con el mismo valor. Para un componente de función con hooks, el estado es el estado del primer hook (`useState` o `useReducer`): si el primer hook es otro hook, por ejemplo `useRef`, el filtro de estado no coincide. Con `props` y `state` a la vez, un componente debe coincidir con ambos.

#### Reglas del selector

- `*` coincide con uno o más caracteres: `browser.react$$('My*')` encuentra `MyComponent` y `MyOtherComponent`.
- Los nombres separados por espacios encuentran un componente dentro de otro: `browser.react$$('List Item')` encuentra cada `Item` dentro de un `List`.
- El nombre de un componente es su `displayName` o, en su defecto, el nombre de su función o clase. Un componente de `React.memo` tiene el nombre de su función (la build de desarrollo de React 17 también le asigna el `displayName` del objeto memo). Un componente de `React.forwardRef` no tiene nombre, a menos que tenga un `displayName`.
- Para un componente de orden superior con un nombre como `withRouter(MyComponent)`, se usa el nombre que está entre paréntesis: `MyComponent`.
- Sin un ámbito de elemento, los comandos buscan en todas las raíces de React de la página, en el orden del documento, incluidas las raíces dentro de otras raíces y las raíces en shadow roots abiertos. `react$` devuelve la primera coincidencia. Para buscar solo en una raíz, llama al comando sobre su contenedor o sobre un elemento de esa raíz: `$('#other-root').react$$('MyComponent')`.
- Los resultados se devuelven raíz tras raíz. Dentro de una raíz, se devuelven en el orden del árbol de componentes, nivel por nivel, no en el orden del documento. `react$$` devuelve cada nodo DOM una sola vez.
- Para una app en un frame, llama al comando sobre el contexto de navegación del frame, o sobre un elemento del frame: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Limitaciones conocidas:

- Un componente que solo renderiza texto devuelve un nodo de texto. Con WebDriver Classic, un nodo de texto no se puede devolver, y el comando falla con `javascript error: circular reference`.
- Mientras React hidrata un límite `Suspense` de una página renderizada en el servidor, los componentes que contiene aún no existen. Espera hasta que la página haya terminado de hidratarse.

#### Trabajar con `React.Fragment`

Al usar el comando `react$` para seleccionar [fragmentos](https://reactjs.org/docs/fragments.html) de React, WebdriverIO devolverá el primer hijo de ese componente como nodo del componente. Si usas `react$$`, recibirás un array que contiene todos los nodos HTML dentro de los fragmentos que coinciden con el selector.

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
await browser.react$('MyComponent') // devuelve el elemento de WebdriverIO para el primer <div />
await browser.react$$('MyComponent') // devuelve los elementos de WebdriverIO para el array [<div />, <div />]
```

**Nota:** Si tienes varias instancias de `MyComponent` y usas `react$$` para seleccionar estos componentes de fragmento, se te devolverá un array unidimensional con todos los nodos. En otras palabras, si tienes 3 instancias de `<MyComponent />`, se te devolverá un array con seis elementos de WebdriverIO.

## Estrategias de selectores personalizadas


Si tu app requiere una forma específica de obtener elementos, puedes definir tú mismo una estrategia de selector personalizada que puedes usar con `custom$` y `custom$$`. Para ello, registra tu estrategia una vez al comienzo de la prueba, p. ej. en un hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Dado el siguiente fragmento HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Luego úsala llamando a:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Nota:** esto solo funciona en un entorno web en el que se pueda ejecutar el comando [`execute`](/docs/api/browser/execute).