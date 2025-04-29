---
id: static-server-service
title: நிலையான சேவையக சேவை
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

சில திட்டங்கள் முன்-முனை சொத்துக்கள் மட்டுமே, மேலும் நிலையான சேவையகத்தைத் தவிர வேறு எதிலும் இயங்காது. இந்த சேவை சோதனையின் போது நிலையான கோப்பு சேவையகத்தை இயக்க உதவுகிறது.

## நிறுவல்

எளிதான வழி `@wdio/static-server-service` ஐ `package.json` இல் `devDependency` ஆக சேர்ப்பது:

```sh
npm install @wdio/static-server-service --save-dev
```

`WebdriverIO` எவ்வாறு நிறுவுவது என்ற வழிமுறைகளைப் [இங்கே](https://webdriver.io/docs/gettingstarted) காணலாம்.

## கட்டமைப்பு

நிலையான சேவையக சேவையைப் பயன்படுத்த, உங்கள் சேவை வரிசையில் `static-server` ஐச் சேர்க்கவும்:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## விருப்பங்கள்

### `folders` (தேவை)

கோப்புறை பாதைகள் மற்றும் இணைப்பு புள்ளிகளின் வரிசை.

வகை: `Array<Object>`
பண்புகள்:
 - mount `{String}` - கோப்புறை இணைக்கப்படும் URL முடிப்பு.
 - path `{String}` - இணைக்க வேண்டிய கோப்புறைக்கான பாதை.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

சேவையகத்தைப் பிணைக்க போர்ட்.

வகை: `Number`

இயல்புநிலை: `4567`

### `middleware`

இடைநிலை பொருள்களின் வரிசை. இவற்றை கட்டமைப்பில் ஏற்றி துவக்கி, நிலையான சேவையகம் பயன்படுத்த அவற்றை அனுப்பவும்.

வகை: `Array<Object>`
பண்புகள்:
 - mount `{String}` - இடைநிலை இணைக்கப்படும் URL முடிப்பு.
 - middleware `<Object>` - இடைநிலை செயல்பாடு கால்பேக்.

இயல்புநிலை: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு, [முகப்புப்பக்கத்தைப்](http://webdriver.io) பார்க்கவும்.