---
id: element
title: எலிமெண்ட் ஆப்ஜெக்ட்
---

எலிமெண்ட் ஆப்ஜெக்ட் என்பது தொலை பயனர் ஏஜெண்டில் உள்ள ஒரு உறுப்பைக் குறிக்கும் ஆப்ஜெக்ட் ஆகும், எ.கா. பிரவுசரில் அமர்வை இயக்கும் போது [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) அல்லது மொபைலுக்கான [a mobile element](https://developer.apple.com/documentation/swift/sequence/element). இதை பல எலிமெண்ட் குவரி கட்டளைகளில் ஒன்றைப் பயன்படுத்தி பெறலாம், எ.கா. [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) அல்லது [`shadow$`](/docs/api/element/shadow$).

## பண்புகள்

எலிமெண்ட் ஆப்ஜெக்டில் பின்வரும் பண்புகள் உள்ளன:

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| `sessionId` | `String` | தொலை சேவையகத்திலிருந்து ஒதுக்கப்பட்ட அமர்வு ஐடி. |
| `elementId` | `String` | ப்ரோட்டோகால் நிலையில் எலிமெண்ட்டுடன் தொடர்புகொள்ள பயன்படுத்தக்கூடிய [web element reference](https://w3c.github.io/webdriver/#elements) |
| `selector` | `String` | எலிமெண்ட்டை குவரி செய்ய பயன்படுத்தப்படும் [Selector](/docs/selectors). |
| `parent` | `Object` | எலிமெண்ட் பிரவுசரிலிருந்து பெறப்பட்டால் [Browser Object](/docs/api/browser) (எ.கா. `const elem = browser.$('selector')`) அல்லது எலிமெண்ட் ஸ்கோப்பிலிருந்து பெறப்பட்டால் [Element Object](/docs/api/element) (எ.கா. `elem.$('selector')`) |
| `options` | `Object` | பிரவுசர் ஆப்ஜெக்ட் எவ்வாறு உருவாக்கப்பட்டது என்பதைப் பொறுத்து WebdriverIO [options](/docs/configuration). மேலும் [setup types](/docs/setuptypes) பார்க்கவும். |

## முறைகள்
எலிமெண்ட் ஆப்ஜெக்ட் ப்ரோட்டோகால் பிரிவிலிருந்து அனைத்து முறைகளையும் வழங்குகிறது, எ.கா. [WebDriver](/docs/api/webdriver) ப்ரோட்டோகால் மற்றும் எலிமெண்ட் பிரிவில் பட்டியலிடப்பட்டுள்ள கட்டளைகள். கிடைக்கக்கூடிய ப்ரோட்டோகால் கட்டளைகள் அமர்வின் வகையைப் பொறுத்தது. நீங்கள் தானியங்கி பிரவுசர் அமர்வை இயக்கினால், Appium [commands](/docs/api/appium) எதுவும் கிடைக்காது, அதேபோல் தலைகீழாகவும்.

அதற்கு கூடுதலாக பின்வரும் கட்டளைகள் கிடைக்கின்றன:

| பெயர் | அளவுருக்கள் | விவரங்கள் |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (வகை: `String`)<br />- `fn` (வகை: `Function`) | கம்போசிஷன் நோக்கங்களுக்காக பிரவுசர் ஆப்ஜெக்டிலிருந்து அழைக்கக்கூடிய தனிப்பயன் கட்டளைகளை வரையறுக்க அனுமதிக்கிறது. [Custom Command](/docs/customcommands) வழிகாட்டியில் மேலும் படிக்கவும். |
| `overwriteCommand` | - `commandName` (வகை: `String`)<br />- `fn` (வகை: `Function`) | எந்த பிரவுசர் கட்டளையையும் தனிப்பயன் செயல்பாட்டுடன் மேலெழுத அனுமதிக்கிறது. இது ஃப்ரேம்வொர்க் பயனர்களை குழப்பக்கூடும் என்பதால் கவனமாகப் பயன்படுத்தவும். [Custom Command](/docs/customcommands#overwriting-native-commands) வழிகாட்டியில் மேலும் படிக்கவும். |

## குறிப்புகள்

### எலிமெண்ட் சங்கிலி

எலிமெண்ட்களுடன் வேலை செய்யும்போது, WebdriverIO அவற்றைக் குவரி செய்வதையும், சிக்கலான நெஸ்டட் எலிமெண்ட் லுக்அப்களை உருவாக்குவதையும் எளிதாக்கும் சிறப்பு சின்டாக்ஸை வழங்குகிறது. எலிமெண்ட் ஆப்ஜெக்ட்கள் தங்கள் மரக்கிளையில் பொதுவான குவரி முறைகளைப் பயன்படுத்தி எலிமெண்ட்களைக் கண்டறிய அனுமதிப்பதால், பயனர்கள் நெஸ்டட் எலிமெண்ட்களை பின்வருமாறு பெறலாம்:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

ஆழமான நெஸ்டட் கட்டமைப்புகளுடன் எந்த நெஸ்டட் எலிமெண்ட்டையும் ஒரு அரேக்கு ஒதுக்கி பின்னர் அதைப் பயன்படுத்துவது மிகவும் நீளமானதாக இருக்கலாம். எனவே WebdriverIO இல் சங்கிலி எலிமெண்ட் குவரிகள் என்ற கருத்து உள்ளது, இது நெஸ்டட் எலிமெண்ட்களை இவ்வாறு பெற அனுமதிக்கிறது:

```js
console.log(await $('#header').$('#headline').getText())
```

இது பல எலிமெண்ட்களைப் பெறும்போதும் வேலை செய்கிறது, எ.கா.:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

எலிமெண்ட்களின் தொகுப்புடன் வேலை செய்யும்போது, அவற்றுடன் தொடர்புகொள்ள முயற்சிக்கும்போது இது குறிப்பாக பயனுள்ளதாக இருக்கும், எனவே இவ்வாறு செய்வதற்குப் பதிலாக:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

நீங்கள் நேரடியாக எலிமெண்ட் சங்கிலியில் அரே முறைகளை அழைக்கலாம், எ.கா.:

```js
const location = await $$('div').map((el) => el.getLocation())
```

அதாவது:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO அடிப்படையில் அசிங்க்ரோனஸ் இட்டரேட்டர்களை ஆதரிக்கும் தனிப்பயன் செயலாக்கத்தைப் பயன்படுத்துகிறது, எனவே அவற்றின் API இலிருந்து அனைத்து கட்டளைகளும் இந்த பயன்பாட்டு வழக்குகளுக்கும் ஆதரிக்கப்படுகின்றன.

__குறிப்பு:__ உங்கள் கால்பேக் ஒன்றை திருப்பி அனுப்பாவிட்டாலும் அசிங்க்ரோனஸ் இட்டரேட்டர்கள் அனைத்தும் ஒரு ப்ரமிஸை திருப்பி அனுப்புகின்றன, எ.கா.:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returns "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returns "string[]"
```

### தனிப்பயன் கட்டளைகள்

பொதுவாகப் பயன்படுத்தப்படும் வேலை ஓட்டங்களை சுருக்கமாக விளக்க பிரவுசர் ஸ்கோப்பில் தனிப்பயன் கட்டளைகளை அமைக்கலாம். மேலும் தகவலுக்கு எங்களின் [Custom Commands](/docs/customcommands#adding-custom-commands) வழிகாட்டியைப் பார்க்கவும்.