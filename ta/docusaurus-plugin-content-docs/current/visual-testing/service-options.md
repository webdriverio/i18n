---
id: service-options
title: சேவை விருப்பங்கள்
---

சேவை விருப்பங்கள் என்பவை சேவையை உருவாக்கும்போது அமைக்கப்படும் விருப்பங்கள் ஆகும், மேலும் இவை ஒவ்வொரு முறை அழைப்பிற்கும் பயன்படுத்தப்படும்.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## இயல்புநிலை விருப்பங்கள்

### `addressBarShadowPadding`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `6`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

iOS மற்றும் Android இல் முகவரிப் பட்டியில் சரியான காட்சியைப் பெறுவதற்கு இந்த அளவுரு சேர்க்கப்பட வேண்டும்.

### `autoElementScroll`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

ஒரு உறுப்பு திரைப்பிடிப்பு உருவாக்கப்படும்போது, உறுப்பினை தானாக பார்வைக்கு உருட்டுவதை இந்த விருப்பம் மூலம் முடக்கலாம்.

### `addIOSBezelCorners`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

iOS சாதனங்களுக்கான திரைப்பிடிப்பில் பெசல் மூலைகள் மற்றும் நாட்ச்/டைனமிக் தீவைச் சேர்க்கிறது.

:::info குறிப்பு
இது சாதனத்தின் பெயரைத் **தானாகவே** தீர்மானிக்க முடியும் பட்சத்தில் மட்டுமே செய்யப்படும் மற்றும் பின்வரும் இயல்பாக்கப்பட்ட சாதன பெயர்களுடன் பொருந்தும். இந்த இயல்பாக்கம் இந்த தொகுதியால் செய்யப்படும்.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

ஒப்பீடு செய்யும்போது அடிப்படை படம் காணப்படவில்லை எனில், படம் தானாகவே அடிப்படை கோப்புறைக்கு நகலெடுக்கப்படும்.

### `baselineFolder`

-   **வகை:** `string|()=> string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `.path/to/testfile/__snapshots__/`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

ஒப்பீடு செய்யும்போது பயன்படுத்தப்படும் எல்லா அடிப்படை படங்களையும் வைத்திருக்கும் கோப்புறை. அமைக்கப்படவில்லை எனில், இயல்புநிலை மதிப்பு பயன்படுத்தப்படும், இது காட்சி சோதனைகளை இயக்கும் spec அருகில் உள்ள `__snapshots__/` கோப்புறையில் கோப்புகளை சேமிக்கும். `string` ஐ திருப்பி அளிக்கும் செயல்பாடும் `baselineFolder` மதிப்பை அமைக்க பயன்படுத்தலாம்:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// அல்லது
{
    baselineFolder: () => {
        // இங்கே சில மாயாஜாலம் செய்யவும்
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

ஆரம்பிக்கும்போது ரன்டைம் கோப்புறை (`actual` & `diff`) ஐ நீக்கும்

:::info குறிப்பு
இது [`screenshotPath`](#screenshotpath) செருகுநிரல் விருப்பங்கள் மூலம் அமைக்கப்படும்போது மட்டுமே வேலை செய்யும், மேலும் நீங்கள் முறைகளில் கோப்புறைகளை அமைக்கும்போது **வேலை செய்யாது**
:::

### `createJsonReportFiles` **(புதிய)**

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`

இப்போது ஒப்பீடு முடிவுகளை JSON அறிக்கை கோப்பில் ஏற்றுமதி செய்ய விருப்பம் உள்ளது. `createJsonReportFiles: true` விருப்பத்தை வழங்குவதன் மூலம், ஒப்பிடப்படும் ஒவ்வொரு படமும் `actual` கோப்புறையில், ஒவ்வொரு `actual` பட முடிவிற்கு அருகில் ஒரு அறிக்கையை உருவாக்கும். வெளியீடு இவ்வாறு இருக்கும்:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

எல்லா சோதனைகளும் இயக்கப்பட்ட பிறகு, ஒப்பீடுகளின் தொகுப்புடன் ஒரு புதிய JSON கோப்பு உருவாக்கப்படும், இதை உங்கள் `actual` கோப்புறையின் ரூட்டில் காணலாம். தரவு இவ்வாறு குழுவாக்கப்படுகிறது:

-   Jasmine/Mocha க்கு `describe` அல்லது CucumberJS க்கு `Feature`
-   Jasmine/Mocha க்கு `it` அல்லது CucumberJS க்கு `Scenario`
    மேலும் இவ்வாறு வரிசைப்படுத்தப்படுகிறது:
-   `commandName`, இவை படங்களை ஒப்பிட பயன்படுத்தப்படும் ஒப்பீட்டு முறைகளின் பெயர்கள்
-   `instanceData`, முதலில் உலாவி, பின்னர் சாதனம், பின்னர் தளம்
    இது இவ்வாறு இருக்கும்

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

அறிக்கை தரவு எல்லா மாயாஜாலமும் தரவு சேகரிப்பையும் தானாகவே செய்யாமல் உங்கள் சொந்த காட்சி அறிக்கையை உருவாக்க உங்களுக்கு வாய்ப்பு அளிக்கும்.

:::info குறிப்பு
நீங்கள் `@wdio/visual-testing` பதிப்பு `5.2.0` அல்லது அதற்கு மேலே பயன்படுத்த வேண்டும்
:::

### `disableBlinkingCursor`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் உள்ள அனைத்து `input`, `textarea`, `[contenteditable]` கேரட் "மின்னுவதை" செயல்படுத்த/முடக்க. `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் கேரட் `transparent` ஆக அமைக்கப்படும் 
மற்றும் முடிந்ததும் மீட்டமைக்கப்படும்

### `disableCSSAnimation`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் உள்ள அனைத்து CSS அனிமேஷன்களையும் செயல்படுத்த/முடக்க. `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் அனைத்து அனிமேஷன்களும் முடக்கப்படும்
மற்றும் முடிந்ததும் மீட்டமைக்கப்படும்

### `enableLayoutTesting`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

இது பக்கத்தில் உள்ள அனைத்து உரையையும் மறைக்கும், எனவே ஒப்பிடுவதற்கு அமைப்பு மட்டுமே பயன்படுத்தப்படும். மறைப்பது **ஒவ்வொரு** உறுப்பிலும் `'color': 'transparent !important'` என்ற பாணியைச் சேர்ப்பதன் மூலம் செய்யப்படும்.

வெளியீட்டுக்கு [சோதனை வெளியீடு](/docs/visual-testing/test-output#enablelayouttesting) ஐப் பார்க்கவும்

:::info
இந்த கொடியைப் பயன்படுத்துவதன் மூலம், உரை கொண்ட ஒவ்வொரு உறுப்பும் (அதாவது `p, h1, h2, h3, h4, h5, h6, span, a, li` மட்டுமல்ல, ஆனால் `div|button|..` கூட) இந்த பண்பைப் பெறும். இதை மாற்றுவதற்கான **எந்த** விருப்பமும் இல்லை.
:::

### `formatImageName`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

சேமிக்கப்பட்ட படங்களின் பெயரை `formatImageName` அளவுருவுடன் பின்வரும் வடிவ சரத்தை வழங்குவதன் மூலம் தனிப்பயனாக்கலாம்:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

பின்வரும் மாறிகள் சரத்தை வடிவமைக்க அனுப்பப்படலாம் மற்றும் இன்ஸ்டன்ஸ் திறன்களிலிருந்து தானாகவே படிக்கப்படும்.
அவற்றை தீர்மானிக்க முடியாவிட்டால், இயல்புநிலைகள் பயன்படுத்தப்படும்.

-   `browserName`: வழங்கப்பட்ட திறன்களில் உலாவியின் பெயர்
-   `browserVersion`: திறன்களில் வழங்கப்பட்ட உலாவியின் பதிப்பு
-   `deviceName`: திறன்களில் இருந்து சாதனப் பெயர்
-   `dpr`: சாதன பிக்சல் விகிதம்
-   `height`: திரையின் உயரம்
-   `logName`: திறன்களிலிருந்து logName
-   `mobile`: இது `_app` அல்லது ஆப் திரைப்பிடிப்புகளை உலாவி திரைப்பிடிப்புகளிலிருந்து வேறுபடுத்த `deviceName` க்குப் பிறகு உலாவியின் பெயரைச் சேர்க்கும்
-   `platformName`: வழங்கப்பட்ட திறன்களில் தளத்தின் பெயர்
-   `platformVersion`: திறன்களில் வழங்கப்பட்ட தளத்தின் பதிப்பு
-   `tag`: அழைக்கப்படும் முறைகளில் வழங்கப்படும் டேக்
-   `width`: திரையின் அகலம்

:::info

நீங்கள் `formatImageName` இல் தனிப்பயன் பாதைகள்/கோப்புறைகளை வழங்க முடியாது. நீங்கள் பாதையை மாற்ற விரும்பினால் பின்வரும் விருப்பங்களை மாற்றுவதைப் பார்க்கவும்:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- ஒவ்வொரு முறைக்கும் [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `1500`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

ஸ்க்ரோல் செய்த பிறகு காத்திருக்க வேண்டிய நேரம் மில்லிவினாடிகளில். இது சோம்பி ஏற்றப்படும் பக்கங்களை அடையாளம் காண உதவலாம்.

:::info

சேவை/முறை விருப்பம் `userBasedFullPageScreenshot` `true` என அமைக்கப்பட்டிருந்தால் மட்டுமே இது வேலை செய்யும், [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot) ஐயும் பார்க்கவும்

:::

### `hideScrollBars`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

பயன்பாட்டில் உள்ள ஸ்க்ரோல்பார்களை மறைக்கும். `true` என அமைக்கப்பட்டால், திரைப்பிடிப்பு எடுக்கும் முன் அனைத்து ஸ்க்ரோல்பார்களும் முடக்கப்படும். கூடுதல் சிக்கல்களைத் தடுக்க இது இயல்பாக `true` என அமைக்கப்பட்டுள்ளது.

### `logLevel`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `info`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

கூடுதல் பதிவுகளைச் சேர்க்கும், விருப்பங்கள் `debug | info | warn | silent`

பிழைகள் எப்போதும் கன்சோலில் பதிவு செய்யப்படும்.

### `savePerInstance`

-   **வகை:** `boolean`
-   **இயல்புநிலை:** `false`
-   **கட்டாயம்:** இல்லை
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

படங்களை ஒவ்வொரு இன்ஸ்டன்ஸிற்கும் தனித்தனி கோப்புறையில் சேமிக்கும், எடுத்துக்காட்டாக எல்லா Chrome திரைப்பிடிப்புகளும் `desktop_chrome` போன்ற Chrome கோப்புறையில் சேமிக்கப்படும்.

### `screenshotPath`

-   **வகை:** `string | () => string`
-   **இயல்புநிலை:** `.tmp/`
-   **கட்டாயம்:** இல்லை
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப்

அனைத்து உண்மையான/வேறுபட்ட திரைப்பிடிப்புகளை வைத்திருக்கும் கோப்புறை. அமைக்கப்படவில்லை எனில், இயல்புநிலை மதிப்பு பயன்படுத்தப்படும். screenshotPath மதிப்பை அமைக்க string ஐ திருப்பி அளிக்கும் செயல்பாடும் பயன்படுத்தப்படலாம்:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// அல்லது
{
    screenshotPath: () => {
        // இங்கே சில மாயாஜாலம் செய்யவும்
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** Android க்கு `6` மற்றும் iOS க்கு `15` (இயல்பாக `6` மற்றும் நாட்ச் கொண்ட iPhones அல்லது ஹோம் பார் கொண்ட iPads க்கான சாத்தியமான ஹோம் பாருக்கு `9` தானாகவே சேர்க்கப்படும்)
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

iOS மற்றும் Android இல் கருவிப்பட்டைக்கு காட்சியை சரியாக வெட்ட சேர்க்க வேண்டிய படிங்.

### `userBasedFullPageScreenshot`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ) **visual-service@7.0.0 இல் அறிமுகப்படுத்தப்பட்டது**

இயல்பாக, டெஸ்க்டாப் வலையில் முழுப்-பக்க திரைப்பிடிப்புகள் WebDriver BiDi நெறிமுறையைப் பயன்படுத்தி எடுக்கப்படுகின்றன, இது ஸ்க்ரோல் செய்யாமலேயே வேகமான, நிலையான மற்றும் ஒத்திசைவான திரைப்பிடிப்புகளை இயக்குகிறது.
userBasedFullPageScreenshot `true` என அமைக்கப்படும்போது, திரைப்பிடிப்பு செயல்முறை உண்மையான பயனரை போன்று செயல்படுகிறது: பக்கத்தில் ஸ்க்ரோல் செய்து, காட்சி அளவு திரைப்பிடிப்புகளை எடுத்து, அவற்றை இணைக்கிறது. இந்த முறையானது சோம்பல் ஏற்றப்பட்ட உள்ளடக்கத்தைக் கொண்ட பக்கங்களுக்கு அல்லது ஸ்க்ரோல் நிலையைப் பொறுத்து மாறும் டைனமிக் ரெண்டரிங்கிற்கு பயனுள்ளதாக இருக்கும்.

உங்கள் பக்கம் ஸ்க்ரோலிங் செய்யும்போது உள்ளடக்கம் ஏற்றப்படுவதை நம்பியிருந்தால் அல்லது நீங்கள் பழைய திரைப்பிடிப்பு முறைகளின் நடத்தையைப் பராமரிக்க விரும்பினால் இந்த விருப்பத்தைப் பயன்படுத்தவும்.

### `waitForFontsLoaded`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `true`
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ)

எழுத்துருக்கள், மூன்றாம் தரப்பு எழுத்துருக்கள் உட்பட, ஒத்திசைவாகவோ அல்லது ஒத்திசைவற்றோ ஏற்றப்படலாம். ஒத்திசைவற்ற ஏற்றுதல் என்பது WebdriverIO ஒரு பக்கம் முழுமையாக ஏற்றப்பட்டுள்ளதாக தீர்மானிக்கும் பிறகு எழுத்துருக்கள் ஏற்றப்படலாம் என்று பொருள். எழுத்துரு வழங்கல் சிக்கல்களைத் தடுக்க, இந்த தொகுதி, இயல்பாக, திரைப்பிடிப்பு எடுப்பதற்கு முன் எல்லா எழுத்துருக்களும் ஏற்றப்படுவதற்காக காத்திருக்கும்.

## Tabbable விருப்பங்கள்

:::info குறிப்பு

இந்த தொகுதி ஒரு பயனர் கீபோர்டைப் பயன்படுத்தி வலைத்தளத்தில் _tab_ எப்படி செய்வார் என்பதை டேப் செய்யக்கூடிய உறுப்பில் இருந்து டேப் செய்யக்கூடிய உறுப்பிற்கு கோடுகள் மற்றும் புள்ளிகளை வரைவதன் மூலம் காட்டுவதை ஆதரிக்கிறது.<br/>
இந்த வேலை [Viv Richards](https://github.com/vivrichards600) அவர்களின் ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) என்ற வலைப்பதிவால் ஈர்க்கப்பட்டது.<br/>
டேப் செய்யக்கூடிய உறுப்புகள் தேர்ந்தெடுக்கப்படும் முறை [tabbable](https://github.com/davidtheclark/tabbable) தொகுதியை அடிப்படையாகக் கொண்டது. டேப்பிங் தொடர்பான எந்த சிக்கல்களும் இருந்தால், [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) மற்றும் குறிப்பாக [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) ஐ சரிபார்க்கவும்.

:::

### `tabbableOptions`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

நீங்கள் `{save|check}Tabbable`-முறைகளைப் பயன்படுத்தினால் கோடுகள் மற்றும் புள்ளிகளுக்கு மாற்றக்கூடிய விருப்பங்கள். விருப்பங்கள் கீழே விளக்கப்பட்டுள்ளன.

#### `tabbableOptions.circle`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தை மாற்றுவதற்கான விருப்பங்கள்.

##### `tabbableOptions.circle.backgroundColor`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தின் பின்னணி நிறம்.

##### `tabbableOptions.circle.borderColor`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தின் எல்லை நிறம்.

##### `tabbableOptions.circle.borderWidth`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தின் எல்லை அகலம்.

##### `tabbableOptions.circle.fontColor`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தில் உள்ள உரையின் எழுத்துரு நிறம். [`showNumber`](./#tabbableoptionscircleshownumber) `true` என அமைக்கப்பட்டிருந்தால் மட்டுமே இது காட்டப்படும்.

##### `tabbableOptions.circle.fontFamily`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தில் உள்ள உரையின் எழுத்துரு குடும்பம். [`showNumber`](./#tabbableoptionscircleshownumber) `true` என அமைக்கப்பட்டிருந்தால் மட்டுமே இது காட்டப்படும்.

உலாவிகளால் ஆதரிக்கப்படும் எழுத்துருக்களை அமைக்கவும்.

##### `tabbableOptions.circle.fontSize`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தில் உள்ள உரையின் எழுத்துரு அளவு. [`showNumber`](./#tabbableoptionscircleshownumber) `true` என அமைக்கப்பட்டிருந்தால் மட்டுமே இது காட்டப்படும்.

##### `tabbableOptions.circle.size`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தின் அளவு.

##### `tabbableOptions.circle.showNumber`

-   **வகை:** `showNumber`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

வட்டத்தில் டேப் வரிசை எண்ணைக் காட்டும்.

#### `tabbableOptions.line`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

கோட்டை மாற்றுவதற்கான விருப்பங்கள்.

##### `tabbableOptions.line.color`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

கோட்டின் நிறம்.

##### `tabbableOptions.line.width`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை

கோட்டின் அகலம்.

## ஒப்பிடும் விருப்பங்கள்

### `compareOptions`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** அனைத்து இயல்புநிலை மதிப்புகளுக்கும் [இங்கே](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) பார்க்கவும்
-   **ஆதரிக்கப்படும் பயன்பாட்டு சூழல்கள்:** வலை, ஹைப்ரிட் ஆப் (வெப்வியூ), நேட்டிவ் ஆப் (மேலும் தகவலுக்கு [முறை ஒப்பீட்டு விருப்பங்கள்](./method-options#compare-check-options) பார்க்கவும்)

ஒப்பீட்டு விருப்பங்களை சேவை விருப்பங்களாகவும் அமைக்கலாம், அவை [முறை ஒப்பீட்டு விருப்பங்கள்](/docs/visual-testing/method-options#compare-check-options) இல் விவரிக்கப்பட்டுள்ளன