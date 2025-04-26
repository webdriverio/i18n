---
id: selectors
title: Selectores
---

El [Protocolo WebDriver](https://w3c.github.io/webdriver/) proporciona varias estrategias de selección para consultar un elemento. WebdriverIO las simplifica para mantener la selección de elementos simple. Tenga en cuenta que aunque el comando para consultar elementos se llama `$` y `$$`, no tienen nada que ver con jQuery o el [Motor de Selección Sizzle](https://github.com/jquery/sizzle).

Aunque hay tantos selectores diferentes disponibles, solo unos pocos de ellos proporcionan una forma resistente de encontrar el elemento correcto. Por ejemplo, dado el siguiente botón:

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

__Recomendamos__ y __no recomendamos__ los siguientes selectores:

| Selector | Recomendado | Notas |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nunca | El peor - demasiado genérico, sin contexto. |
| `$('.btn.btn-large')` | 🚨 Nunca | Malo. Acoplado al estilo. Altamente sujeto a cambios. |
| `$('#main')` | ⚠️ Con moderación | Mejor. Pero aún acoplado al estilo o a los escuchadores de eventos JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Con moderación | Consulta efectiva, compleja de escribir. |
| `$('button[name="submission"]')` | ⚠️ Con moderación | Acoplado al atributo `name` que tiene semántica HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bueno | Requiere atributo adicional, no conectado a a11y. |
| `$('aria/Submit')` o `$('button=Submit')` | ✅ Siempre | El mejor. Se asemeja a cómo el usuario interactúa con la página. Se recomienda usar los archivos de traducción de su frontend para que sus pruebas nunca fallen cuando se actualizan las traducciones |

## Selector de consulta CSS

Si no se indica lo contrario, WebdriverIO consultará elementos utilizando el patrón [selector CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), por ejemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texto de enlace

Para obtener un elemento de anclaje con un texto específico, consulte el texto comenzando con un signo igual (`=`).

Por ejemplo:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Puede consultar este elemento llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Texto parcial de enlace

Para encontrar un elemento de anclaje cuyo texto visible coincide parcialmente con su valor de búsqueda,
consúltelo usando `*=` delante de la cadena de consulta (por ejemplo, `*=driver`).

Puede consultar el elemento del ejemplo anterior también llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Nota:__ No puede mezclar múltiples estrategias de selector en un solo selector. Use múltiples consultas de elementos encadenados para alcanzar el mismo objetivo, por ejemplo:

```js
const elem = await $('header h1*=Welcome') // ¡no funciona!
// use en su lugar
const elem = await $('header').$('*=driver')
```

## Elemento con cierto texto

La misma técnica se puede aplicar a los elementos también. Además, también es posible hacer una coincidencia sin distinción entre mayúsculas y minúsculas usando `.=` o `.*=` dentro de la consulta.

Por ejemplo, aquí hay una consulta para un encabezado de nivel 1 con el texto "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Puede consultar este elemento llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

O usando texto parcial de consulta:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Lo mismo funciona para nombres de `id` y `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Puede consultar este elemento llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Nota:__ No puede mezclar múltiples estrategias de selector en un solo selector. Use múltiples consultas de elementos encadenados para alcanzar el mismo objetivo, por ejemplo:

```js
const elem = await $('header h1*=Welcome') // ¡no funciona!
// use en su lugar
const elem = await $('header').$('h1*=Welcome')
```

## Nombre de etiqueta

Para consultar un elemento con un nombre de etiqueta específico, use `<tag>` o `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Puede consultar este elemento llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Atributo de nombre

Para consultar elementos con un atributo de nombre específico, puede usar un selector CSS3 normal o la estrategia de nombre proporcionada por el [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) pasando algo como [name="some-name"] como parámetro selector:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Nota:__ Esta estrategia de selector está obsoleta y solo funciona en navegadores antiguos que se ejecutan con el protocolo JSONWireProtocol o usando Appium.

## xPath

También es posible consultar elementos a través de un [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) específico.

Un selector xPath tiene un formato como `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Puede consultar el segundo párrafo llamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Puede usar xPath para también recorrer hacia arriba y hacia abajo el árbol DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Selector de nombre de accesibilidad

Consulta elementos por su nombre accesible. El nombre accesible es lo que anuncia un lector de pantalla cuando ese elemento recibe el foco. El valor del nombre accesible puede ser tanto contenido visual como alternativas de texto ocultas.

:::info

Puede leer más sobre este selector en nuestra [publicación del blog de lanzamiento](/blog/2022/09/05/accessibility-selector)

:::

### Buscar por `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Buscar por `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Buscar por contenido

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Buscar por título

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Buscar por propiedad `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - Atributo de rol

Para consultar elementos basados en [roles ARIA](https://www.w3.org/TR/html-aria/#docconformance), puede especificar directamente el rol del elemento como `[role=button]` como parámetro selector:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atributo ID

La estrategia de localizador "id" no es compatible con el protocolo WebDriver, se debe usar estrategias de selector CSS o xPath para encontrar elementos usando ID.

Sin embargo, algunos controladores (por ejemplo, [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) podrían seguir [soportando](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) este selector.

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

También puede usar funciones JavaScript para obtener elementos usando APIs nativas web. Por supuesto, solo puede hacer esto dentro de un contexto web (por ejemplo, `browser`, o contexto web en móvil).

Dada la siguiente estructura HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Puede consultar el elemento hermano de `#elem` de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Selectores profundos

:::warning

A partir de la `v9` de WebdriverIO no hay necesidad de este selector especial ya que WebdriverIO automáticamente atraviesa el Shadow DOM por ti. Se recomienda migrar de este selector eliminando el `>>>` delante de él.

:::

Muchas aplicaciones frontend dependen en gran medida de elementos con [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Es técnicamente imposible consultar elementos dentro del shadow DOM sin soluciones alternativas. Los comandos [`shadow$`](https://webdriver.io/docs/api/element/shadow$) y [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) han sido tales soluciones alternativas que tenían sus [limitaciones](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Con el selector profundo ahora puede consultar todos los