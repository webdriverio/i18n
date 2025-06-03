---
id: macos
title: MacOS
---

WebdriverIO [Appium](https://appium.io/) பயன்படுத்தி எந்தவொரு MacOS பயன்பாட்டையும் தானியங்குபடுத்த முடியும். உங்கள் கணினியில் [XCode](https://developer.apple.com/xcode/) நிறுவப்பட்டிருப்பது, Appium மற்றும் [Mac2 Driver](https://github.com/appium/appium-mac2-driver) சார்புகளாக நிறுவப்பட்டிருப்பது மற்றும் சரியான திறன்களை அமைப்பது ஆகியவை மட்டுமே தேவை.

## தொடங்குதல்

புதிய WebdriverIO திட்டத்தைத் தொடங்க, இதை இயக்கவும்:

```sh
npm create wdio@latest ./
```

ஒரு நிறுவல் வழிகாட்டி உங்களை செயல்முறை வழியாக வழிநடத்தும். நீங்கள் என்ன வகையான சோதனை செய்ய விரும்புகிறீர்கள் என்று கேட்கும்போது _"Desktop Testing - of MacOS Applications"_ என்பதைத் தேர்ந்தெடுக்க உறுதிசெய்யவும். பின்னர் இயல்புநிலைகளை வைத்துக்கொள்ளலாம் அல்லது உங்கள் விருப்பத்தின் அடிப்படையில் மாற்றலாம்.

கட்டமைப்பு வழிகாட்டி தேவையான அனைத்து Appium தொகுப்புகளையும் நிறுவி, MacOS இல் சோதிக்க தேவையான கட்டமைப்புகளுடன் `wdio.conf.js` அல்லது `wdio.conf.ts` உருவாக்கும். சில சோதனை கோப்புகளை தானாக உருவாக்க ஒப்புக்கொண்டிருந்தால், `npm run wdio` மூலம் உங்கள் முதல் சோதனையை இயக்கலாம்.

<CreateMacOSProjectAnimation />

அவ்வளவுதான் 🎉

## உதாரணம்

கால்குலேட்டர் பயன்பாட்டைத் திறக்கும், ஒரு கணக்கைச் செய்து, அதன் முடிவை சரிபார்க்கும் ஒரு எளிய சோதனை எப்படி இருக்கும் என்பதை இங்கே காணலாம்:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__குறிப்பு:__ `'appium:bundleId': 'com.apple.calculator'` என்பது திறன் விருப்பமாக வரையறுக்கப்பட்டிருந்ததால், அமர்வின் தொடக்கத்தில் கால்குலேட்டர் பயன்பாடு தானாகவே திறக்கப்பட்டது. அமர்வின் போது எப்போது வேண்டுமானாலும் பயன்பாடுகளை மாற்றலாம்.

## மேலும் தகவல்

MacOS இல் சோதிப்பது குறித்த குறிப்பிட்ட தகவல்களுக்கு, [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) திட்டத்தைப் பார்க்க பரிந்துரைக்கிறோம்.