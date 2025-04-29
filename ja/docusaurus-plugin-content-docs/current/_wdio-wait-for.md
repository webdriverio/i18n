---
id: wdio-wait-for
title: 便利な期待条件ライブラリサービス
custom_edit_url: https://github.com/webdriverio/wdio-wait-for/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wait-forは、サードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio/wdio-wait-for) | [npm](https://www.npmjs.com/package/wdio-wait-for)をご覧ください。

> wdio-wait-forは[WebdriverIO](http://webdriver.io/)向けのNode.jsライブラリで、定義されたタスクが完了するまで特定の条件を待機するための機能を提供する一般的な条件セットを提供します。

## Installation
プロジェクトで`wdio-wait-for`を使用するには、次のコマンドを実行します：

```shell
npm i -D wdio-wait-for
```

Yarnを使用している場合は、次のコマンドを実行します：

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

## Examples

### Import
#### CommonJS

WebdriverIO v7以下と[CommonJS](https://en.wikipedia.org/wiki/CommonJS)を使用している場合は、`require`を使用してパッケージをインポートする必要があります：

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

TypeScriptまたはWebdriverIO v8以上では、`import`文を使用してすべてのヘルパーメソッドをインポートできます：

```typescript
// import all methods
import * as EC from 'wdio-wait-for';

browser.waitUntil(EC.elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

または特定のメソッドだけをインポートすることもできます：

```typescript
// import specific method
import { elementToBeEnabled } from 'wdio-wait-for';

browser.waitUntil(elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

### Wait for alert
このコードスニペットは条件の使い方を示しています

```typescript
browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

### Wait for Elements

このコードスニペットは、特定の数の要素が存在するのを待つなどの条件の使い方を示しています：

```typescript
browser.waitUntil(numberOfElementsToBe('.links', 2), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the 2 elements' })
```

## License

[MIT licensed](https://github.com/webdriverio/wdio-wait-for/blob/main/./LICENSE).

## Author

Yevhen Laichenkov - `elaichenkov@gmail.com`<br />
Christian Bromann - `mail@bromann.dev`