---
id: proxy
title: பிராக்ஸி அமைப்பு
---

நீங்கள் இரண்டு வெவ்வேறு வகையான கோரிக்கைகளை ஒரு பிராக்ஸி வழியாக அனுப்பலாம்:

- உங்கள் சோதனை ஸ்கிரிப்ட் மற்றும் உலாவி இயக்கி (அல்லது WebDriver முடிவுப்புள்ளி) இடையேயான இணைப்பு
- உலாவி மற்றும் இணையத்திற்கு இடையேயான இணைப்பு

## இயக்கி மற்றும் சோதனைக்கு இடையே பிராக்ஸி

உங்கள் நிறுவனத்தின் அனைத்து வெளிச்செல்லும் கோரிக்கைகளுக்கும் ஒரு பெருநிறுவன பிராக்ஸி (எ.கா. `http://my.corp.proxy.com:9090`) இருந்தால், WebdriverIO ஐ பிராக்ஸியைப் பயன்படுத்த அமைக்க இரண்டு விருப்பங்கள் உள்ளன:

### விருப்பம் 1: சுற்றுச்சூழல் மாறிகளைப் பயன்படுத்துதல் (பரிந்துரைக்கப்படுகிறது)

WebdriverIO v9.12.0 முதல், நீங்கள் நிலையான பிராக்ஸி சுற்றுச்சூழல் மாறிகளை அமைக்கலாம்:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# விருப்பத்தேர்வு: குறிப்பிட்ட ஹோஸ்ட்களுக்கு பிராக்ஸியைத் தவிர்க்கவும்
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

பின்னர் உங்கள் சோதனைகளை வழக்கம்போல் இயக்கவும். WebdriverIO தானாகவே பிராக்ஸி கட்டமைப்புக்கு இந்த சுற்றுச்சூழல் மாறிகளைப் பயன்படுத்தும்.

### விருப்பம் 2: undici இன் setGlobalDispatcher ஐப் பயன்படுத்துதல்

மேம்பட்ட பிராக்ஸி கட்டமைப்புகளுக்கு அல்லது நிரல் கட்டுப்பாடு தேவைப்பட்டால், undici இன் `setGlobalDispatcher` முறையைப் பயன்படுத்தலாம்:

#### undici நிறுவுதல்

```bash npm2yarn
npm install undici --save-dev
```

#### உங்கள் கட்டமைப்பு கோப்பில் undici setGlobalDispatcher ஐச் சேர்க்கவும்

பின்வரும் require அறிக்கையை உங்கள் கட்டமைப்பு கோப்பின் மேல் பகுதியில் சேர்க்கவும்.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

பிராக்ஸியை கட்டமைப்பது பற்றிய கூடுதல் தகவல்களை [இங்கே](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md) காணலாம்.

### நான் எந்த முறையைப் பயன்படுத்த வேண்டும்?

- **சுற்றுச்சூழல் மாறிகளைப் பயன்படுத்தவும்** எளிய, நிலையான அணுகுமுறை வேண்டுமென்றால், இது வெவ்வேறு கருவிகளில் செயல்படும் மற்றும் குறியீடு மாற்றங்கள் தேவையில்லை.
- **setGlobalDispatcher ஐப் பயன்படுத்தவும்** தனிப்பயன் அங்கீகாரம், வெவ்வேறு சூழல்களுக்கான வெவ்வேறு பிராக்ஸி கட்டமைப்புகள் போன்ற மேம்பட்ட பிராக்ஸி அம்சங்கள் தேவைப்பட்டால் அல்லது பிராக்ஸி நடத்தையை நிரல் ரீதியாக கட்டுப்படுத்த விரும்பினால்.

இரண்டு முறைகளும் முழுமையாக ஆதரிக்கப்படுகின்றன மற்றும் WebdriverIO முதலில் ஒரு உலகளாவிய டிஸ்பேச்சரைச் சரிபார்த்து பின்னர் சுற்றுச்சூழல் மாறிகளுக்கு திரும்பும்.

### Sauce Connect பிராக்ஸி

நீங்கள் [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5) ஐப் பயன்படுத்தினால், அதை இவ்வாறு தொடங்கவும்:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## உலாவி மற்றும் இணையத்திற்கு இடையே பிராக்ஸி

உலாவி மற்றும் இணையத்திற்கு இடையேயான இணைப்பை டன்னல் செய்ய, நீங்கள் ஒரு பிராக்ஸியை அமைக்கலாம், இது (எடுத்துக்காட்டாக) [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy) போன்ற கருவிகளுடன் நெட்வொர்க் தகவல்களையும் பிற தரவுகளையும் பிடிக்க பயனுள்ளதாக இருக்கும்.

`proxy` அளவுருக்களை நிலையான திறன்கள் மூலம் பின்வரும் வழியில் பயன்படுத்தலாம்:

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

மேலும் தகவலுக்கு, [WebDriver விவரக்குறிப்பைப்](https://w3c.github.io/webdriver/#proxy) பார்க்கவும்.