---
id: wdio-wait-for
title: பயனுள்ள எதிர்பார்க்கப்படும் நிபந்தனைகளின் நூலகம் சேவை
custom_edit_url: https://github.com/webdriverio/wdio-wait-for/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wait-for என்பது ஒரு 3வது தரப்பு தொகுப்பாகும், மேலும் தகவலுக்கு [GitHub](https://github.com/webdriverio/wdio-wait-for) | [npm](https://www.npmjs.com/package/wdio-wait-for) ஐப் பார்க்கவும்

> wdio-wait-for என்பது [WebdriverIO](http://webdriver.io/) க்கான Node.js நூலகமாகும், இது வரையறுக்கப்பட்ட பணி முடிக்கப்படும் வரை குறிப்பிட்ட நிபந்தனைகளுக்காக காத்திருக்க செயல்பாடுகளை வழங்கும் பொதுவான நிபந்தனைகளின் தொகுப்பை வழங்குகிறது.

## நிறுவல்
உங்கள் திட்டத்தில் `wdio-wait-for` ஐப் பயன்படுத்த, இயக்கவும்:

```shell
npm i -D wdio-wait-for
```

நீங்கள் Yarn ஐப் பயன்படுத்தினால், இயக்கவும்:

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

## எடுத்துக்காட்டுகள்

### இறக்குமதி
#### CommonJS

நீங்கள் WebdriverIO v7 மற்றும் அதற்கு கீழ் [CommonJS](https://en.wikipedia.org/wiki/CommonJS) உடன் பயன்படுத்தினால், தொகுப்பை இறக்குமதி செய்ய `require` ஐப் பயன்படுத்த வேண்டும், எ.கா.:

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

TypeScript அல்லது WebdriverIO v8 மற்றும் அதற்கு மேல் நீங்கள் அனைத்து உதவி முறைகளையும் இறக்குமதி செய்ய `import` அறிக்கையைப் பயன்படுத்தலாம், எ.கா.:

```typescript
// import all methods
import * as EC from 'wdio-wait-for';

browser.waitUntil(EC.elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

அல்லது குறிப்பிட்ட ஒன்றை மட்டும், எ.கா.:

```typescript
// import specific method
import { elementToBeEnabled } from 'wdio-wait-for';

browser.waitUntil(elementToBeEnabled('input'), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the element to be enabled' })
```

### விழிப்பூட்டலுக்காக காத்திரு
இந்த குறியீடு துணுக்கு நிபந்தனைகளை எவ்வாறு பயன்படுத்துவது என்பதைக் காட்டுகிறது

```typescript
browser.waitUntil(alertIsPresent(), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the alert to be present' })
```

### உறுப்புகளுக்காக காத்திரு

இந்த குறியீடு துணுக்கு நிபந்தனைகளை எவ்வாறு பயன்படுத்துவது என்பதைக் காட்டுகிறது, எ.கா. குறிப்பிட்ட எண்ணிக்கையிலான உறுப்புகள் இருப்பதற்காக காத்திருப்பது:

```typescript
browser.waitUntil(numberOfElementsToBe('.links', 2), { timeout: 5000, timeoutMsg: 'Failed, after waiting for the 2 elements' })
```

## உரிமம்

[MIT உரிமம் பெற்றது](https://github.com/webdriverio/wdio-wait-for/blob/main/./LICENSE).

## ஆசிரியர்

யெவ்ஹென் லைச்சென்கோவ் - `elaichenkov@gmail.com`<br />
கிறிஸ்டியன் ப்ரோமன் - `mail@bromann.dev`