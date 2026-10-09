---
id: custommatchers
title: தனிப்பயன் மேட்சர்கள்
description: "expect.extend மூலம் தனிப்பயன் browser மற்றும் element மேட்சர்களைப் பதிவுசெய்து, அவற்றுக்கான TypeScript வகைகளைச் சேர்க்கவும்."
---

WebdriverIO ஒரு Jest பாணி [`expect`](https://webdriver.io/docs/api/expect-webdriverio) assertion லைப்ரரியைப் பயன்படுத்துகிறது. இது வெப் மற்றும் மொபைல் சோதனைகளை இயக்குவதற்கென சிறப்பு அம்சங்களையும் தனிப்பயன் மேட்சர்களையும் கொண்டுள்ளது. மேட்சர்களின் லைப்ரரி பெரியதாக இருந்தாலும், அது சாத்தியமான அனைத்துச் சூழ்நிலைகளுக்கும் பொருந்தாது. எனவே, ஏற்கனவே உள்ள மேட்சர்களை நீங்களே வரையறுக்கும் தனிப்பயன் மேட்சர்களுடன் விரிவாக்க முடியும்.

:::warning

[`browser`](/docs/api/browser) ஆப்ஜெக்ட் அல்லது ஒரு [element](/docs/api/element) இன்ஸ்டன்ஸுக்கு குறிப்பிட்ட மேட்சர்கள் வரையறுக்கப்படும் விதத்தில் தற்போது எந்த வேறுபாடும் இல்லை என்றாலும், இது எதிர்காலத்தில் நிச்சயமாக மாறக்கூடும். இந்த மேம்பாடு குறித்த கூடுதல் தகவலுக்கு [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) ஐக் கவனித்து வாருங்கள்.

:::

:::info Jasmine

Jasmine ஃப்ரேம்வொர்க்கில், சோதனைகள் இயங்குவதற்கு முன், ஒரு spec கோப்பில் அல்லது `before` hook-இல் `expect.extend` ஐ அழைக்கவும். மேட்சர்கள் Jasmine async மேட்சர்களாக மாறுகின்றன, எனவே அவற்றை `await` செய்யவும். ஒரு Jasmine sync மேட்சரின் பெயரைக் கொண்ட மேட்சர், WebdriverIO மேட்சர்களைப் போலவே, WebdriverIO மதிப்புகளுக்கு மட்டுமே இயங்கும். தனிப்பயன் asymmetric மேட்சர்கள் (`expect.myMatcher()`) கிடைக்காது. sync மேட்சருக்கு `jasmine.addMatchers` அல்லது async மேட்சருக்கு `jasmine.addAsyncMatchers` ஐயும் நீங்கள் பயன்படுத்தலாம், [Jasmine தனிப்பயன் மேட்சர்கள் பயிற்சி](https://jasmine.github.io/tutorials/custom_matchers) ஐப் பார்க்கவும்.

:::

## தனிப்பயன் Browser மேட்சர்கள்

ஒரு தனிப்பயன் browser மேட்சரைப் பதிவுசெய்ய, உங்கள் spec கோப்பில் நேரடியாகவோ அல்லது உதாரணமாக உங்கள் `wdio.conf.js` இல் உள்ள `before` hook-இன் ஒரு பகுதியாகவோ `expect` ஆப்ஜெக்டில் `extend` ஐ அழைக்கவும்:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

உதாரணத்தில் காட்டப்பட்டுள்ளபடி, மேட்சர் ஃபங்ஷன் எதிர்பார்க்கப்படும் ஆப்ஜெக்டை, உதாரணமாக browser அல்லது element ஆப்ஜெக்டை, முதல் அளவுருவாகவும் எதிர்பார்க்கப்படும் மதிப்பை இரண்டாவது அளவுருவாகவும் எடுத்துக்கொள்கிறது. பின்னர் நீங்கள் மேட்சரைப் பின்வருமாறு பயன்படுத்தலாம்:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## தனிப்பயன் Element மேட்சர்கள்

தனிப்பயன் browser மேட்சர்களைப் போலவே, element மேட்சர்களும் வேறுபடுவதில்லை. ஒரு element-இன் aria-label ஐ assert செய்வதற்கான தனிப்பயன் மேட்சரை எவ்வாறு உருவாக்குவது என்பதற்கான உதாரணம் இதோ:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

இது assertion ஐப் பின்வருமாறு அழைக்க உங்களை அனுமதிக்கிறது:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript ஆதரவு

நீங்கள் TypeScript ஐப் பயன்படுத்தினால், உங்கள் தனிப்பயன் மேட்சர்களின் type safety ஐ உறுதிசெய்ய இன்னும் ஒரு படி தேவைப்படுகிறது. உங்கள் தனிப்பயன் மேட்சர்களுடன் `Matcher` இன்டர்ஃபேஸை விரிவாக்குவதன் மூலம், அனைத்து type சிக்கல்களும் மறைந்துவிடும்:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

நீங்கள் ஒரு தனிப்பயன் [asymmetric மேட்சரை](https://jestjs.io/docs/expect#expectextendmatchers) உருவாக்கியிருந்தால், அதேபோல் `expect` வகைகளைப் பின்வருமாறு விரிவாக்கலாம்:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```