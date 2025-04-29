---
id: shared-store-service
title: பகிரப்பட்ட சேமிப்பக சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> முக்கிய செயல்முறை மற்றும் வேலையாட்கள் (specs) இடையே தரவை பரிமாறிக் கொள்ளுங்கள்.

## நிறுவல்

`@wdio/shared-store-service` ஐ உங்கள் `package.json` இல் dev dependency ஆக வைத்திருப்பது எளிதான வழி:

```sh
npm install @wdio/shared-store-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்பதற்கான வழிமுறைகளை [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## பயன்பாடு

key (string) மூலம் சேமிப்பகத்திற்கு/இருந்து மதிப்பை (ஒரு சாதாரண பொருள்) பெற/அமைக்க. key எந்த தன்னிச்சையான சரமாகவும் இருக்கலாம், ஆனால் `*` ஒதுக்கப்பட்டுள்ளது, ஏனெனில் இது முழு சேமிப்பகத்தையும் பெற அனுமதிக்கிறது.

### மதிப்புகளை அமைத்தல்

சேமிப்பகத்தில் மதிப்புகளை அமைக்க அழைக்கவும்:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### மதிப்புகளைப் பெறுதல்

சேமிப்பகத்திலிருந்து மதிப்புகளைப் பெற அழைக்கவும்:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // returns "foobar123"
```

நீங்கள் `*` key ஐப் பயன்படுத்தி அனைத்து key மதிப்புகளையும் பெறலாம்:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // returns `{ key: "foobar" }`
```

### WDIO Hooks இல் சேமிப்பகத்தை அணுகுதல்

நீங்கள் `setValue` மற்றும் `getValue` async handlers ஐ நேரடியாக அணுகலாம்.
நீங்கள் `await` சொற்றொடருடன் அவற்றை சரியாக அழைப்பதை உறுதிசெய்து கொள்ளுங்கள்.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

முக்கியம்! ஒவ்வொரு spec கோப்பும் மற்ற specs இலிருந்து தனித்தனியாகவும் தனிமையாகவும் இருக்க வேண்டும்.
சேவையின் யோசனை மிகவும் குறிப்பிட்ட சூழல் அமைப்பு சிக்கல்களைக் கையாள்வதாகும்.
சோதனை நிறைவேற்ற தரவைப் பகிர்வதைத் தவிர்க்கவும்!

### வள குழுக்கள்

ஒவ்வொரு வேலையாளருக்கும் ஒதுக்கப்பட வேண்டிய வளங்களுக்காக வேலையாள் நூல்கள் போட்டியிடுகின்றன என்றால், நீங்கள் Resource Pool API ஐப் பயன்படுத்தலாம்:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

இந்த எடுத்துக்காட்டு இரண்டு வேலையாட்களும் ஒரே `baseUrl` ஐப் பயன்படுத்துவதில்லை என்பதை உறுதிசெய்கிறது. தனித்துவமான url அது விடுவிக்கப்படும் வரை ஒரு வேலையாளருக்கு மட்டுமே ஒதுக்கப்படுகிறது.

## கட்டமைப்பு

சேவைகள் பட்டியலில் `shared-store` ஐச் சேர்க்கவும், உங்கள் சோதனையில் [`browser` scope](https://webdriver.io/docs/api/browser) இல் `sharedStore` பொருள் உங்களுக்கு அணுகக்கூடியதாக இருக்கும்.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

நீங்கள் typescript ஐப் பயன்படுத்துகிறீர்கள் என்றால், உங்கள் `compilerOptions.types` இல் `@wdio/shared-store-service` ஐச் சேர்ப்பதை உறுதிசெய்யவும்:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```