---
id: custommatchers
title: தனிப்பயன் Matchers
---

WebdriverIO ஒரு Jest பாணியிலான [`expect`](https://webdriver.io/docs/api/expect-webdriverio) உறுதிப்படுத்தல் நூலகத்தைப் பயன்படுத்துகிறது, இது வலை மற்றும் மொபைல் சோதனைகளை இயக்குவதற்கான சிறப்பு அம்சங்கள் மற்றும் தனிப்பயன் matchers உடன் வருகிறது. matchers நூலகம் பெரியதாக இருந்தாலும், இது அனைத்து சாத்தியமான சூழ்நிலைகளுக்கும் பொருந்தாது. எனவே, ஏற்கனவே உள்ள matchers-ஐ நீங்கள் வரையறுக்கும் தனிப்பயன் matchers உடன் விரிவுபடுத்த முடியும்.

:::warning

தற்போது [`browser`](/docs/api/browser) பொருளுக்கு குறிப்பிட்ட matchers அல்லது [element](/docs/api/element) உள்ளமைப்புக்கு வரையறுக்கப்பட்ட matchers-க்கு வேறுபாடு இல்லை என்றாலும், எதிர்காலத்தில் இது நிச்சயமாக மாறக்கூடும். இந்த மேம்பாட்டைப் பற்றிய கூடுதல் தகவலுக்கு [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) ஐக் கவனியுங்கள்.

:::

## தனிப்பயன் உலாவி Matchers

தனிப்பயன் உலாவி matcher-ஐப் பதிவு செய்ய, `expect` பொருளில் உள்ள `extend`-ஐ அழைக்கவும், நேரடியாக உங்கள் spec கோப்பில் அல்லது உங்கள் `wdio.conf.js`-ல் உள்ள `before` hook-ன் ஒரு பகுதியாக:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

எடுத்துக்காட்டில் காட்டியுள்ளபடி, matcher செயல்பாடு எதிர்பார்க்கப்படும் பொருளை, எ.கா. உலாவி அல்லது element பொருளை, முதல் அளவுருவாகவும், எதிர்பார்க்கப்படும் மதிப்பை இரண்டாவது அளவுருவாகவும் எடுத்துக்கொள்கிறது. பின்னர் நீங்கள் matcher-ஐ பின்வருமாறு பயன்படுத்தலாம்:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## தனிப்பயன் Element Matchers

தனிப்பயன் உலாவி matchers போலவே, element matchers வேறுபடவில்லை. ஒரு element-ன் aria-label-ஐ உறுதிப்படுத்த தனிப்பயன் matcher உருவாக்குவதற்கான எடுத்துக்காட்டு இங்கே:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

இது பின்வருமாறு உறுதிப்படுத்தலை அழைக்க உங்களை அனுமதிக்கிறது:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript ஆதரவு

நீங்கள் TypeScript பயன்படுத்தினால், உங்கள் தனிப்பயன் matchers-ன் வகை பாதுகாப்பை உறுதிசெய்ய ஒரு கூடுதல் படி தேவைப்படுகிறது. `Matcher` இடைமுகத்தை உங்கள் தனிப்பயன் matchers உடன் விரிவுபடுத்துவதன் மூலம், அனைத்து வகை சிக்கல்களும் மறைந்துவிடும்:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

நீங்கள் தனிப்பயன் [asymmetric matcher](https://jestjs.io/docs/expect#expectextendmatchers) உருவாக்கியிருந்தால், அதேபோல் `expect` வகைகளை பின்வருமாறு விரிவுபடுத்தலாம்:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```