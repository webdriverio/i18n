---
id: wdio-nuxt-service
title: நக்ஸ்ட் சர்வீஸ் சர்வீஸ்
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service is a 3rd party package, for more information please see [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

இந்த சேவை [Nuxt](https://nuxt.com/) ஐ கட்டமைப்பு கருவியாகப் பயன்படுத்தும்போது உங்கள் பயன்பாட்டைத் தொடங்க உதவுகிறது. சோதனையைத் தொடங்குவதற்கு முன் உங்கள் `nuxt.conf.js` ஐப் பயன்படுத்தி Nuxt சர்வரைத் தானாகவே தொடங்குகிறது.

## நிறுவல்

WebdriverIO உடன் தொடங்குகிறீர்கள் என்றால், அனைத்தையும் அமைக்க கட்டமைப்பு வழிகாட்டியைப் பயன்படுத்தலாம்:

```sh
npm init wdio@latest .
```

இது உங்கள் திட்டத்தை Nuxt திட்டமாகக் கண்டறிந்து, தேவையான அனைத்து செருகுநிரல்களையும் உங்களுக்காக நிறுவும். ஏற்கனவே உள்ள அமைப்பில் இந்த சேவையை சேர்க்கிறீர்கள் என்றால், எப்போதும் இதன் மூலம் நிறுவலாம்:

```bash
npm install wdio-nuxt-service --save-dev
```

## கட்டமைப்பு

சேவையை இயக்க, அதை உங்கள் `wdio.conf.js` கோப்பில் உள்ள `services` பட்டியலில் சேர்க்கவும், எ.கா.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

கட்டமைப்பு பொருளுடன் ஒரு வரிசையைப் அனுப்புவதன் மூலம் சேவை விருப்பத்தைப் பயன்படுத்தலாம், எ.கா.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## பயன்பாடு

உங்கள் கட்டமைப்பு அதன்படி அமைக்கப்பட்டிருந்தால், சேவை [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) விருப்பத்தை உங்கள் பயன்பாட்டைக் குறிக்க அமைக்கும். நீங்கள் [`url`](https://webdriver.io/docs/api/browser/url) கட்டளை மூலம் அதற்குச் செல்லலாம், எ.கா.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## விருப்பங்கள்

### `rootDir`

திட்டத்தின் மூல அடைவு.

வகை: `string`<br />
இயல்புநிலை: `process.cwd()`

### `dotenv`

சர்வர் தொடங்குவதற்கு முன் ஏற்றப்பட வேண்டிய சூழல் கோப்பு.

வகை: `string`<br />
இயல்புநிலை: `.env`

### `hostname`

சர்வரைத் தொடங்க வேண்டிய ஹோஸ்ட்பெயர்.

வகை: `string`<br />
இயல்புநிலை: `localhost`

### `port`

சர்வரைத் தொடங்க வேண்டிய போர்ட்.

வகை: `number`<br />
இயல்புநிலை: `process.env.NUXT_PORT || config.devServer.port`

### `https`

சோதனை சர்வர் https இல் தொடங்கப்பட வேண்டும் என்றால் true என அமைக்கவும் (சான்றிதழ்கள் Nuxt கட்டமைப்பில் உள்ளமைக்கப்பட வேண்டும்).

வகை: `boolean`<br />
இயல்புநிலை: `false`

### `sslCert`

https இல் சர்வரைத் தொடங்குவதற்குப் பயன்படுத்தப்படும் SSL சான்றிதழ்.

வகை: `string`

### `sslKey`

https இல் சர்வரைத் தொடங்குவதற்குப் பயன்படுத்தப்படும் SSL விசை.

வகை: `string`

----

WebdriverIO பற்றிய கூடுதல் தகவலுக்கு [முகப்புப்பக்கம்](https://webdriver.io) பார்க்கவும்.