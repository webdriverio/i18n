---
id: proxy
title: ப்ராக்ஸி அமைப்பு
---

இரண்டு வகையான கோரிக்கைகளை ப்ராக்ஸி வழியாக அனுப்பலாம்:

- உங்கள் சோதனை ஸ்கிரிப்ட் மற்றும் பிரௌசர் டிரைவர் (அல்லது WebDriver எண்ட்பாயிண்ட்) இடையேயான இணைப்பு
- பிரௌசர் மற்றும் இணையம் இடையேயான இணைப்பு

## டிரைவர் மற்றும் சோதனைக்கு இடையே ப்ராக்ஸி

உங்கள் நிறுவனத்தில் அனைத்து வெளிச்செல்லும் கோரிக்கைகளுக்கும் கார்ப்பரேட் ப்ராக்ஸி (எ.கா. `http://my.corp.proxy.com:9090`) இருந்தால், [undici](https://github.com/nodejs/undici)-ஐ நிறுவி கட்டமைக்க கீழே உள்ள படிகளைப் பின்பற்றவும்.

### undici-ஐ நிறுவவும்

```bash npm2yarn
npm install undici --save-dev
```

### உங்கள் கான்ஃபிக் கோப்பில் undici setGlobalDispatcher சேர்க்கவும்

உங்கள் கான்ஃபிக் கோப்பின் மேல் பகுதியில் பின்வரும் require ஸ்டேட்மென்ட்டை சேர்க்கவும்.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

ப்ராக்ஸியை கட்டமைப்பது பற்றிய கூடுதல் தகவல்களை [இங்கே](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) காணலாம்.

நீங்கள் [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5)-ஐ பயன்படுத்தினால், அதை பின்வருமாறு தொடங்கவும்:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## பிரௌசர் மற்றும் இணையத்திற்கு இடையே ப்ராக்ஸி

பிரௌசர் மற்றும் இணையத்திற்கு இடையேயான இணைப்பை ப்ராக்ஸி வழியாக அனுப்ப, நீங்கள் ஒரு ப்ராக்ஸியை அமைக்கலாம். இது நெட்வொர்க் தகவல்களை மற்றும் பிற தரவுகளை [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) போன்ற கருவிகளைப் பயன்படுத்தி பிடிக்க பயனுள்ளதாக இருக்கும்.

`proxy` அளவுருக்களை ஸ்டாண்டர்ட் கேபாபிலிட்டிகள் மூலம் பின்வருமாறு பயன்படுத்தலாம்:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

மேலும் தகவலுக்கு, [WebDriver ஸ்பெசிஃபிகேஷன்](https://w3c.github.io/webdriver/#proxy)-ஐப் பார்க்கவும்.