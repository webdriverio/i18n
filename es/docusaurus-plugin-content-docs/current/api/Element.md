---
id: element
title: El Objeto Element
---

Un Objeto Element es un objeto que representa un elemento en el agente de usuario remoto, por ejemplo, un [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) cuando se ejecuta una sesión dentro de un navegador o [un elemento móvil](https://developer.apple.com/documentation/swift/sequence/element) para móviles. Se puede recibir utilizando uno de los muchos comandos de consulta de elementos, por ejemplo, [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) o [`shadow$`](/docs/api/element/shadow$).

## Propiedades

Un objeto elemento tiene las siguientes propiedades:

| Nombre | Tipo | Detalles |
| ---- | ---- | ------- |
| `sessionId` | `String` | ID de sesión asignado desde el servidor remoto. |
| `elementId` | `String` | [Referencia de elemento web](https://w3c.github.io/webdriver/#elements) asociada que se puede utilizar para interactuar con el elemento a nivel de protocolo |
| `selector` | `String` | [Selector](/docs/selectors) utilizado para consultar el elemento. |
| `parent` | `Object` | Ya sea el [Objeto Browser](/docs/api/browser) cuando el elemento se obtuvo de él (por ejemplo, `const elem = browser.$('selector')`) o un [Objeto Element](/docs/api/element) si se obtuvo desde el ámbito de un elemento (por ejemplo, `elem.$('selector')`) |
| `options` | `Object` | [Opciones](/docs/configuration) de WebdriverIO dependiendo de cómo se creó el objeto del navegador. Ver más [tipos de configuración](/docs/setuptypes). |

## Métodos
Un objeto elemento proporciona todos los métodos de la sección de protocolo, por ejemplo, el protocolo [WebDriver](/docs/api/webdriver), así como los comandos enumerados en la sección de elementos. Los comandos de protocolo disponibles dependen del tipo de sesión. Si ejecutas una sesión de navegador automatizada, ninguno de los comandos de Appium [commands](/docs/api/appium) estará disponible y viceversa.

Además de eso, los siguientes comandos están disponibles:

| Nombre | Parámetros | Detalles |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite definir comandos personalizados que se pueden llamar desde el objeto del navegador con fines de composición. Lee más en la guía de [Comandos Personalizados](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite sobrescribir cualquier comando del navegador con funcionalidad personalizada. Úsalo con cuidado ya que puede confundir a los usuarios del framework. Lee más en la guía de [Comandos Personalizados](/docs/customcommands#overwriting-native-commands). |

## Observaciones

### Cadena de Elementos

Cuando se trabaja con elementos, WebdriverIO proporciona una sintaxis especial para simplificar su consulta y componer búsquedas complejas de elementos anidados. Como los objetos de elementos te permiten encontrar elementos dentro de su rama de árbol utilizando métodos de consulta comunes, los usuarios pueden obtener elementos anidados de la siguiente manera:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // muestra "I am a headline"
```

Con estructuras anidadas profundas, asignar cualquier elemento anidado a un array para luego usarlo puede ser bastante verboso. Por lo tanto, WebdriverIO tiene el concepto de consultas de elementos encadenados que permiten obtener elementos anidados así:

```js
console.log(await $('#header').$('#headline').getText())
```

Esto también funciona cuando se obtiene un conjunto de elementos, por ejemplo:

```js
// obtener el texto del tercer titular dentro del segundo encabezado
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Cuando se trabaja con un conjunto de elementos, esto puede ser especialmente útil al intentar interactuar con ellos, así que en lugar de hacer:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Puedes llamar directamente a los métodos de Array en la cadena de elementos, por ejemplo:

```js
const location = await $$('div').map((el) => el.getLocation())
```

igual que:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO utiliza una implementación personalizada que admite iteradores asincrónicos internamente, por lo que todos los comandos de su API también son compatibles con estos casos de uso.

__Nota:__ todos los iteradores asincrónicos devuelven una promesa incluso si tu callback no devuelve una, por ejemplo:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ devuelve "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ devuelve "string[]"
```

### Comandos Personalizados

Puedes establecer comandos personalizados en el ámbito del navegador para abstraer flujos de trabajo que se utilizan comúnmente. Consulta nuestra guía sobre [Comandos Personalizados](/docs/customcommands#adding-custom-commands) para obtener más información.