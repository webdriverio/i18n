---
id: wdio-wait-for
title: Biblioteca de Condições Esperadas Úteis Service
custom_edit_url: https://github.com/webdriverio/wdio-wait-for/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wait-for é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/webdriverio/wdio-wait-for) | [npm](https://www.npmjs.com/package/wdio-wait-for)

> wdio-wait-for é uma biblioteca Node.js para [WebdriverIO](http://webdriver.io/) que fornece um conjunto de condições comuns que proporcionam funcionalidades para aguardar certas condições até que uma tarefa definida seja concluída.

## Instalação
Para usar o `wdio-wait-for` no seu projeto, execute:

```shell
npm i -D wdio-wait-for
```

Se você usa Yarn, execute:

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

## Exemplos

### Importação
#### CommonJS

Se você estiver usando WebdriverIO v7 e inferior com [CommonJS](https://en.wikipedia.org/wiki/CommonJS), você deve usar `require` para importar o pacote, por exemplo:

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

Com TypeScript ou WebdriverIO v8 e superiores, você pode usar a declaração `import` para importar todos os métodos auxiliares, por exemplo:

```typescript
// import all methods
import * as EC from 'wdio-wait-for';

browser.waitUntil(EC.elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

ou apenas métodos específicos, por exemplo:

```typescript
// import specific method
import { elementToBeEnabled } from 'wdio-wait-for';

browser.waitUntil(elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

### Esperar por alerta
Este trecho de código mostra como usar condições

```typescript
browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

### Esperar por Elementos

Este trecho de código mostra como usar condições para esperar, por exemplo, por um certo número de elementos para existir:

```typescript
browser.waitUntil(numberOfElementsToBe('.links', 2), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the 2 elements' })
```

## Licença

[MIT licensed](https://github.com/webdriverio/wdio-wait-for/blob/main/./LICENSE).

## Autor

Yevhen Laichenkov - `elaichenkov@gmail.com`<br />
Christian Bromann - `mail@bromann.dev`