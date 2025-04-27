---
id: integrate-with-percy
title: வெப் பயன்பாட்டிற்கு
---

## உங்கள் WebdriverIO சோதனைகளை Percy உடன் ஒருங்கிணைக்கவும்

ஒருங்கிணைப்பு முன், நீங்கள் [WebdriverIO-க்கான Percy-ன் மாதிரி உருவாக்க பயிற்சியை](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) ஆராயலாம்.
உங்கள் WebdriverIO தானியங்கி சோதனைகளை BrowserStack Percy உடன் ஒருங்கிணைக்கவும் இதோ ஒருங்கிணைப்பு படிகளின் கண்ணோட்டம்:

### படி 1: ஒரு Percy திட்டத்தை உருவாக்கவும்
Percy-க்கு [உள்நுழையவும்](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Percy-ல், 'வெப்' வகையான ஒரு திட்டத்தை உருவாக்கி, பின்னர் திட்டத்திற்கு பெயரிடவும். திட்டம் உருவாக்கப்பட்ட பிறகு, Percy ஒரு டோக்கனை உருவாக்குகிறது. அதைக் குறித்து வைக்கவும். அடுத்த படியில் உங்கள் சூழல் மாறியை அமைக்க நீங்கள் அதைப் பயன்படுத்த வேண்டும்.

ஒரு திட்டத்தை உருவாக்குவது பற்றிய விவரங்களுக்கு, [Percy திட்டத்தை உருவாக்கு](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) பார்க்கவும்.

### படி 2: திட்ட டோக்கனை சூழல் மாறியாக அமைக்கவும்

PERCY_TOKEN-ஐ சூழல் மாறியாக அமைக்க கொடுக்கப்பட்ட கட்டளையை இயக்கவும்:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### படி 3: Percy சார்புகளை நிறுவவும்

உங்கள் சோதனைத் தொகுப்பிற்கான ஒருங்கிணைப்பு சூழலை நிறுவ தேவையான கூறுகளை நிறுவவும்.

சார்புகளை நிறுவ, பின்வரும் கட்டளையை இயக்கவும்:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### படி 4: உங்கள் சோதனை ஸ்கிரிப்டை புதுப்பிக்கவும்

திரைப்பிடிப்புகள் எடுக்க தேவையான முறை மற்றும் பண்புகளைப் பயன்படுத்த Percy நூலகத்தை இறக்குமதி செய்யவும்.
பின்வரும் எடுத்துக்காட்டு ஒத்திசைவற்ற முறையில் percySnapshot() செயல்பாட்டைப் பயன்படுத்துகிறது:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

WebdriverIO-ஐ [தனித்து இயங்கும் முறையில்](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) பயன்படுத்தும்போது, `percySnapshot` செயல்பாட்டிற்கு முதல் அளவுருவாக உலாவி பொருளை வழங்கவும்:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
ஸ்னாப்ஷாட் முறை அளவுருக்கள்:

```sh
percySnapshot(name[, options])
```
### தனித்து இயங்கும் முறை

```sh
percySnapshot(browser, name[, options])
```

- browser (தேவை) - WebdriverIO உலாவி பொருள்
- name (தேவை) - ஸ்னாப்ஷாட் பெயர்; ஒவ்வொரு ஸ்னாப்ஷாட்டிற்கும் தனித்துவமாக இருக்க வேண்டும்
- options - ஒவ்வொரு ஸ்னாப்ஷாட்டிற்கான கட்டமைப்பு விருப்பங்களைப் பார்க்கவும்

மேலும் அறிய, [Percy ஸ்னாப்ஷாட்](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) பார்க்கவும்.

### படி 5: Percy இயக்கவும்
கீழே காட்டியுள்ளபடி `percy exec` கட்டளையைப் பயன்படுத்தி உங்கள் சோதனைகளை இயக்கவும்:

நீங்கள் `percy:exec` கட்டளையைப் பயன்படுத்த முடியவில்லை அல்லது IDE இயக்க விருப்பங்களைப் பயன்படுத்தி உங்கள் சோதனைகளை இயக்க விரும்பினால், `percy:exec:start` மற்றும் `percy:exec:stop` கட்டளைகளைப் பயன்படுத்தலாம். மேலும் அறிய, [Percy இயக்கு](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) பார்வையிடவும்.

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## மேலும் விவரங்களுக்கு பின்வரும் பக்கங்களைப் பார்வையிடவும்:
- [உங்கள் WebdriverIO சோதனைகளை Percy உடன் ஒருங்கிணைக்கவும்](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [சூழல் மாறி பக்கம்](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- நீங்கள் BrowserStack Automate பயன்படுத்தினால் [BrowserStack SDK ஐப் பயன்படுத்தி ஒருங்கிணைக்கவும்](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).


| வளம்                                                                                                                                                              | விளக்கம்                            |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [அதிகாரப்பூர்வ ஆவணங்கள்](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)    | Percy இன் WebdriverIO ஆவணங்கள்    |
| [மாதிரி உருவாக்கம் - பயிற்சி](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Percy இன் WebdriverIO பயிற்சி      |
| [அதிகாரப்பூர்வ வீடியோ](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                         | Percy உடன் காட்சி சோதனை           |
| [வலைப்பதிவு](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)              | காட்சி மதிப்பாய்வுகள் 2.0 அறிமுகம்    |