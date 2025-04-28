---
id: wdio-wait-for
title: Servicio de Biblioteca de condiciones esperadas útiles
custom_edit_url: https://github.com/webdriverio/wdio-wait-for/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wait-for es un paquete de terceros, para más información, consulte [GitHub](https://github.com/webdriverio/wdio-wait-for) | [npm](https://www.npmjs.com/package/wdio-wait-for)

> wdio-wait-for es una biblioteca de Node.js para [WebdriverIO](http://webdriver.io/) que proporciona un conjunto de condiciones comunes que ofrecen funcionalidades para esperar ciertas condiciones hasta que una tarea definida se complete.

## Instalación
Para usar `wdio-wait-for` en tu proyecto, ejecuta:

```shell
npm i -D wdio-wait-for
```

Si usas Yarn, ejecuta:

```sh
yarn add --dev wdio-wait-for
```

## [API](https://github.com/webdriverio/wdio-wait-for/blob/main/./docs/modules.md)

- [alertIsPresent](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_alertispresent.md)
- [numberOfWindowsToBe​](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_numberofwindowstobe_.md)
- [titleContains](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_titlecontains.md)
- [titleIs](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_titleis.md)
- [urlContains](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_urlcontains.md)
- [urlIs](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/browser_urlis.md)
- [elementToBeClickable](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeclickable.md)
- [elementToBeEnabled](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeenabled.md)
- [elementToBeSelected](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_elementtobeselected.md)
- [invisibilityOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_invisibilityof.md)
- [numberOfElementsToBe](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobe.md)
- [numberOfElementsToBeLessThan](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobelessthan.md)
- [numberOfElementsToBeMoreThan​](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_numberofelementstobemorethan_.md)
- [presenceOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_presenceof.md)
- [sizeOfElementToBe](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_sizeofelementtobe.md)
- [stalenessOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_stalenessof.md)
- [textToBePresentInElement](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_texttobepresentinelement.md)
- [textToBePresentInElementValue](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_texttobepresentinelementvalue.md)
- [visibilityOf](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/element_visibilityof.md)
- [and](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_and.md)
- [not](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_not.md)
- [or](https://github.com/webdriverio/wdio-wait-for/blob/main/docs/modules/logical_or.md)

## Ejemplos

### Importación
#### CommonJS

Si estás usando WebdriverIO v7 o inferior con [CommonJS](https://en.wikipedia.org/wiki/CommonJS) tienes que usar `require` para importar el paquete, por ejemplo:

```javascript
// import all methods
const EC = require('wdio-wait-for');

browser.waitUntil(EC.alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

```javascript
// import specific method
const { alertIsPresent } = require('wdio-wait-for');

browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

#### ESM

Con TypeScript o WebdriverIO v8 y versiones superiores puedes usar la declaración `import` para importar todos los métodos auxiliares, por ejemplo:

```typescript
// import all methods
import * as EC from 'wdio-wait-for';

browser.waitUntil(EC.elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

o solo específicos, por ejemplo:

```typescript
// import specific method
import { elementToBeEnabled } from 'wdio-wait-for';

browser.waitUntil(elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

### Esperar una alerta
Este fragmento de código muestra cómo usar condiciones

```typescript
browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

### Esperar Elementos

Este fragmento de código muestra cómo usar condiciones para esperar, por ejemplo, un cierto número de elementos que existan:

```typescript
browser.waitUntil(numberOfElementsToBe('.links', 2), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the 2 elements' })
```

## Licencia

[Licencia MIT](https://github.com/webdriverio/wdio-wait-for/blob/main/./LICENSE).

## Autor

Yevhen Laichenkov - `elaichenkov@gmail.com`<br />
Christian Bromann - `mail@bromann.dev`