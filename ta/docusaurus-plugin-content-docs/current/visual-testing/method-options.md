---
id: method-options
title: முறை விருப்பங்கள்
---

முறை விருப்பங்கள் என்பவை [முறை](./methods) ஒவ்வொன்றுக்கும் அமைக்கக்கூடிய விருப்பங்கள் ஆகும். ஒரு விருப்பத்தின் திறவுச்சொல் செருகுநிரலை உருவாக்கும்போது அமைக்கப்பட்ட விருப்பத்தின் திறவுச்சொல்லுடன் ஒரே மாதிரியாக இருந்தால், இந்த முறை விருப்பமானது செருகுநிரல் விருப்ப மதிப்பை மேலெழுதும்.

## சேமிப்பு விருப்பங்கள்

### `disableBlinkingCursor`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் அனைத்து `input`, `textarea`, `[contenteditable]` கர்சர் "மின்னுவதை" இயக்கு/முடக்கு. `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் கர்சர் `transparent` என அமைக்கப்படும்
மற்றும் முடிந்ததும் மீட்டமைக்கப்படும்

### `disableCSSAnimation`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் அனைத்து CSS அனிமேஷன்களையும் இயக்கு/முடக்கு. `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் அனைத்து அனிமேஷன்களும் முடக்கப்படும்
மற்றும் முடிந்ததும் மீட்டமைக்கப்படும்

### `enableLayoutTesting`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **பயன்படுத்தப்படுகிறது:** அனைத்து [முறைகளுடனும்](./methods)
-   **ஆதரிக்கப்படுகிறது:** வலை

இது ஒரு பக்கத்தில் உள்ள அனைத்து உரைகளையும் மறைத்து, ஒப்பீட்டிற்கு லேஅவுட் மட்டுமே பயன்படுத்தப்படும். மறைப்பது `'color': 'transparent !important'` என்ற பாணியை __ஒவ்வொரு__ உறுப்புக்கும் சேர்ப்பதன் மூலம் செய்யப்படும்.

வெளியீட்டைப் பார்க்க [சோதனை வெளியீடு](./test-output#enablelayouttesting) ஐப் பார்க்கவும்

:::info
இந்த கொடியைப் பயன்படுத்துவதன் மூலம், உரை கொண்ட ஒவ்வொரு உறுப்பும் (அதாவது `p, h1, h2, h3, h4, h5, h6, span, a, li` மட்டுமல்ல, `div|button|..` போன்றவையும்) இந்தப் பண்பைப் பெறும். இதை மாற்றியமைக்க __எந்த__ விருப்பமும் இல்லை.
:::

### `hideScrollBars`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **பயன்படுத்தப்படுகிறது:** அனைத்து [முறைகளுடனும்](./methods)
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் உள்ள ஸ்க்ரோல்பார்(கள்) மறைக்கவும். `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் அனைத்து ஸ்க்ரோல்பார்(கள்) முடக்கப்படும். கூடுதல் சிக்கல்களைத் தடுக்க இது இயல்பாக `true` என அமைக்கப்பட்டுள்ளது.

### `hideElements`

-   **வகை:** `array`
-   **கட்டாயம்:** இல்லை
-   **பயன்படுத்தப்படுகிறது:** அனைத்து [முறைகளுடனும்](./methods)
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

இந்த முறையானது உறுப்புகளின் வரிசையை வழங்குவதன் மூலம் அவற்றுக்கு `visibility: hidden` பண்பைச் சேர்ப்பதன் மூலம் 1 அல்லது பல உறுப்புகளை மறைக்க முடியும்.

### `removeElements`

-   **வகை:** `array`
-   **கட்டாயம்:** இல்லை
-   **பயன்படுத்தப்படுகிறது:** அனைத்து [முறைகளுடனும்](./methods)
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

இந்த முறையானது உறுப்புகளின் வரிசையை வழங்குவதன் மூலம் அவற்றுக்கு `display: none` பண்பைச் சேர்ப்பதன் மூலம் 1 அல்லது பல உறுப்புகளை _அகற்ற_ முடியும்.

### `resizeDimensions`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **பயன்படுத்தப்படுகிறது:** [`saveElement`](./methods#saveelement) அல்லது [`checkElement`](./methods#checkelement) க்கு மட்டுமே
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

உறுப்பு வெட்டி எடுப்பதை பெரிதாக்குவதற்கு தேவையான பிக்சல்களின் `top`, `right`, `bottom` மற்றும் `left` அளவுகளை கொண்டிருக்க வேண்டிய ஒரு பொருள்.

### `fullPageScrollTimeout`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `1500`
-   **பயன்படுத்தப்படுகிறது:** [`saveFullPageScreen`](./methods#savefullpagescreen) அல்லது [`saveTabbablePage`](./methods#savetabbablepage) க்கு மட்டுமே
-   **ஆதரிக்கப்படுகிறது:** வலை

ஸ்க்ரோல் செய்த பின் காத்திருக்க வேண்டிய மில்லிவினாடிகளில் நேரம். இது சோம்பேறி ஏற்றுதலுடன் பக்கங்களை அடையாளம் காண உதவலாம்.

### `hideAfterFirstScroll`

-   **வகை:** `array`
-   **கட்டாயம்:** இல்லை
-   **பயன்படுத்தப்படுகிறது:** [`saveFullPageScreen`](./methods#savefullpagescreen) அல்லது [`saveTabbablePage`](./methods#savetabbablepage) க்கு மட்டுமே
-   **ஆதரிக்கப்படுகிறது:** வலை

இந்த முறையானது உறுப்புகளின் வரிசையை வழங்குவதன் மூலம் அவற்றுக்கு `visibility: hidden` பண்பைச் சேர்ப்பதன் மூலம் ஒன்று அல்லது பல உறுப்புகளை மறைக்கும்.
இது எடுத்துக்காட்டாக, ஒரு பக்கம் ஸ்க்ரோல் செய்யப்படும்போது பக்கத்துடன் சேர்ந்து ஸ்க்ரோல் செய்யும் ஒட்டும் உறுப்புகளைக் கொண்டிருக்கும்போது பயனுள்ளதாக இருக்கும், ஆனால் முழு பக்க ஸ்கிரீன்ஷாட் எடுக்கும்போது எரிச்சலூட்டும் விளைவைத் தரும்

### `waitForFontsLoaded`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **பயன்படுத்தப்படுகிறது:** அனைத்து [முறைகளுடனும்](./methods)
-   **ஆதரிக்கப்படுகிறது:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

எழுத்துருக்கள், மூன்றாம் தரப்பு எழுத்துருக்கள் உட்பட, ஒத்திசைவாகவோ அல்லது ஒத்திசைவற்றதாகவோ ஏற்றப்படலாம். ஒத்திசைவற்ற ஏற்றுதல் என்பது WebdriverIO ஒரு பக்கம் முழுமையாக ஏற்றப்பட்டுள்ளதாக தீர்மானித்த பிறகு எழுத்துருக்கள் ஏற்றப்படலாம் என்பதைக் குறிக்கிறது. எழுத்துரு வழங்கல் சிக்கல்களைத் தடுக்க, இந்த மாட்யூல், இயல்பாக, திரைப்பிடிப்பு எடுப்பதற்கு முன் அனைத்து எழுத்துருக்களும் ஏற்றப்படும் வரை காத்திருக்கும்.

## ஒப்பிடு (சரிபார்ப்பு) விருப்பங்கள்

ஒப்பிடு விருப்பங்கள் என்பவை [ResembleJS](https://github.com/Huddle/Resemble.js) மூலம் ஒப்பீடு செயல்படுத்தப்படும் வழியை பாதிக்கும் விருப்பங்கள் ஆகும்.

:::info குறிப்பு

-   [சேமிப்பு விருப்பங்களில்](#save-options) இருந்து அனைத்து விருப்பங்களும் ஒப்பிடு முறைகளுக்குப் பயன்படுத்தப்படலாம்
-   அனைத்து ஒப்பிடு விருப்பங்களும் சேவைப் பயன்படுத்தும் போது __அல்லது__ ஒவ்வொரு தனிப்பட்ட சரிபார்ப்பு முறைக்கும் பயன்படுத்தப்படலாம். ஒரு முறை விருப்பத்தின் திறவுச்சொல் சேவையைத் தொடங்கும்போது அமைக்கப்பட்ட விருப்பத்தின் திறவுச்சொல்லுடன் ஒரே மாதிரியாக இருந்தால், முறை ஒப்பிடு விருப்பமானது சேவை ஒப்பிடு விருப்ப மதிப்பை மேலெழுதும்.
- அனைத்து விருப்பங்களும் பயன்படுத்தப்படலாம்:
    - வலை
    - ஹைப்ரிட் ஆப்
    - நேட்டிவ் ஆப்

:::

### `ignoreAlpha`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

படங்களை ஒப்பிட்டு ஆல்ஃபாவை நிராகரிக்கவும்.

### `blockOutSideBar`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `true`
-   **கட்டாயம்:** இல்லை
-   **குறிப்பு:** _`checkScreen()` க்கு மட்டுமே பயன்படுத்தப்படலாம். இது **iPad மட்டுமே**_

லேண்ட்ஸ்கேப் முறையில் iPad க்கான ஒப்பீடுகளின் போது பக்கப்பட்டியை தானாகவே தடுக்கவும். இது தாவல்/தனிப்பட்ட/புக்மார்க் நேட்டிவ் கூறுகளில் தோல்விகளைத் தடுக்கிறது.

### `blockOutStatusBar`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `true`
-   **கட்டாயம்:** இல்லை
-   **குறிப்பு:** _இது **மொபைல் மட்டுமே**_

ஒப்பீடுகளின் போது நிலை மற்றும் முகவரி பட்டையை தானாகவே தடுக்கவும். இது நேரம், வைஃபை அல்லது பேட்டரி நிலையில் தோல்விகளைத் தடுக்கிறது.

### `blockOutToolBar`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `true`
-   **கட்டாயம்:** இல்லை
-   **குறிப்பு:** _இது **மொபைல் மட்டுமே**_

கருவிப்பட்டையை தானாகவே தடுக்கவும்.

### `ignoreAntialiasing`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

படங்களை ஒப்பிட்டு ஆன்டி-அலையாசிங்கை நிராகரிக்கவும்.

### `ignoreColors`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

படங்கள் வண்ணத்தில் இருந்தாலும், ஒப்பீடு 2 கருப்பு/வெள்ளை படங்களை ஒப்பிடும்

### `ignoreLess`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

படங்களை ஒப்பிட்டு `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` என ஒப்பிடவும்

### `ignoreNothing`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

படங்களை ஒப்பிட்டு `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` என ஒப்பிடவும்

### `rawMisMatchPercentage`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

`true` எனில் திரும்பும் சதவீதம் `0.12345678` போல் இருக்கும், இயல்புநிலை `0.12` ஆகும்

### `returnAllCompareData`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

இது பொருத்தமின்மை சதவீதத்தை மட்டும் அல்லாமல் அனைத்து ஒப்பீட்டுத் தரவையும் திருப்பி அனுப்பும்

### `saveAboveTolerance`

-   **வகை:** `number`
-   **இயல்புநிலை:** `0`
-   **கட்டாயம்:** இல்லை

வேறுபாடுகளுடன் படங்களை சேமிப்பதைத் தடுக்கும் `misMatchPercentage` இன் அனுமதிக்கக்கூடிய மதிப்பு

### `largeImageThreshold`

-   **வகை:** `number`
-   **இயல்புநிலை:** `0`
-   **கட்டாயம்:** இல்லை

பெரிய படங்களை ஒப்பிடுவது செயல்திறன் சிக்கல்களுக்கு வழிவகுக்கலாம்.
இங்கே பிக்ஸல்களின் எண்ணிக்கையை (0-ஐ விட அதிகமாக) வழங்கும்போது, பட அகலம் அல்லது உயரம் `largeImageThreshold` பிக்ஸல்களை விட பெரியதாக இருக்கும்போது ஒப்பிடும் அல்காரிதம் பிக்ஸல்களைத் தவிர்க்கிறது.

### `scaleImagesToSameSize`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை

ஒப்பீட்டை செயல்படுத்துவதற்கு முன் 2 படங்களை ஒரே அளவுக்கு அளவிடுகிறது. `ignoreAntialiasing` மற்றும் `ignoreAlpha` ஐ இயக்க பெரிதும் பரிந்துரைக்கப்படுகிறது

## கோப்புறை விருப்பங்கள்

அடிப்படைக் கோப்புறை மற்றும் திரைப்பிடிப்பு கோப்புறைகள் (உண்மையான, வேறுபாடு) ஆகியவை செருகுநிரலை அல்லது முறையைத் தொடங்கும்போது அமைக்கக்கூடிய விருப்பங்கள் ஆகும். ஒரு குறிப்பிட்ட முறையில் கோப்புறை விருப்பங்களை அமைக்க, முறைகள் விருப்ப பொருளுக்கு கோப்புறை விருப்பங்களை அனுப்பவும். இது பயன்படுத்தப்படலாம்:

- வலை
- ஹைப்ரிட் ஆப்
- நேட்டிவ் ஆப்

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை

சோதனையில் பிடிக்கப்பட்ட ஸ்னாப்ஷாட்டிற்கான கோப்புறை.

### `baselineFolder`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை

ஒப்பிட பயன்படுத்தப்படும் அடிப்படைப் படத்திற்கான கோப்புறை.

### `diffFolder`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை

ResembleJS மூலம் வழங்கப்பட்ட பட வேறுபாட்டிற்கான கோப்புறை.