---
id: methods
title: முறைகள்
---

பின்வரும் முறைகள் உலகளாவிய WebdriverIO [`browser`](/docs/api/browser)-பொருளுக்கு சேர்க்கப்படுகின்றன.

## சேமிப்பு முறைகள்

:::info குறிப்பு
திரைகளை ஒப்பிட **விரும்பாத** போது மட்டுமே சேமிப்பு முறைகளைப் பயன்படுத்தவும், ஆனால் ஒரு உறுப்பு/திரைப்பிடிப்பு மட்டுமே வைத்திருக்க விரும்பும்போது.
:::

### `saveElement`

ஒரு உறுப்பின் படத்தை சேமிக்கிறது.

#### பயன்பாடு

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்
- மொபைல் ஹைப்ரிட் ஆப்ஸ்
- மொபைல் நேட்டிவ் ஆப்ஸ்

#### அளவுருக்கள்

-   **`element`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** WebdriverIO உறுப்பு
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`saveElementOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [சேமிப்பு விருப்பங்கள்](./method-options#save-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#savescreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `saveScreen`

பார்வைக்கான இடத்தின் படத்தை சேமிக்கிறது.

#### பயன்பாடு

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்
- மொபைல் ஹைப்ரிட் ஆப்ஸ்
- மொபைல் நேட்டிவ் ஆப்ஸ்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`saveScreenOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [சேமிப்பு விருப்பங்கள்](./method-options#save-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#savescreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `saveFullPageScreen`

#### பயன்பாடு

முழு திரையின் படத்தை சேமிக்கிறது.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`saveFullPageScreenOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [சேமிப்பு விருப்பங்கள்](./method-options#save-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#savescreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `saveTabbablePage`

டேப் செய்யக்கூடிய கோடுகள் மற்றும் புள்ளிகளுடன் முழுமையான திரையின் படத்தை சேமிக்கிறது.

#### பயன்பாடு

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`saveTabbableOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [சேமிப்பு விருப்பங்கள்](./method-options#save-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#savescreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

## சரிபார்க்கும் முறைகள்

:::info குறிப்பு
`check`-முறைகள் முதல் முறையாகப் பயன்படுத்தப்படும்போது, கீழே உள்ள எச்சரிக்கையை பதிவுகளில் காண்பீர்கள். இதன் பொருள் உங்கள் அடிப்படை வரியை உருவாக்க விரும்பினால் `save`- மற்றும் `check`-முறைகளை இணைக்க வேண்டியதில்லை.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

ஒரு உறுப்பின் படத்தை அடிப்படை படத்துடன் ஒப்பிடுகிறது.

#### பயன்பாடு

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்
- மொபைல் ஹைப்ரிட் ஆப்ஸ்
- மொபைல் நேட்டிவ் ஆப்ஸ்

#### அளவுருக்கள்
-   **`element`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** WebdriverIO உறுப்பு
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`checkElementOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [ஒப்பிடு/சரிபார்க்கும் விருப்பங்கள்](./method-options#compare-check-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#checkscreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `checkScreen`

பார்வைக்கான இடத்தின் படத்தை அடிப்படை படத்துடன் ஒப்பிடுகிறது.

#### பயன்பாடு

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்
- மொபைல் ஹைப்ரிட் ஆப்ஸ்
- மொபைல் நேட்டிவ் ஆப்ஸ்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`checkScreenOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [ஒப்பிடு/சரிபார்க்கும் விருப்பங்கள்](./method-options#compare-check-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#checkscreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `checkFullPageScreen`

முழு திரையின் படத்தை அடிப்படை படத்துடன் ஒப்பிடுகிறது.

#### பயன்பாடு

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்
- மொபைல் உலாவிகள்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`checkFullPageOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [ஒப்பிடு/சரிபார்க்கும் விருப்பங்கள்](./method-options#compare-check-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#checkscreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.

### `checkTabbablePage`

டேப் செய்யக்கூடிய கோடுகள் மற்றும் புள்ளிகளுடன் முழுமையான திரையின் படத்தை அடிப்படை படத்துடன் ஒப்பிடுகிறது.

#### பயன்பாடு

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### ஆதரவு

- டெஸ்க்டாப் உலாவிகள்

#### அளவுருக்கள்
-   **`tag`:**
    -   **கட்டாயம்:** ஆம்
    -   **வகை:** சரம்
-   **`checkTabbableOptions`:**
    -   **கட்டாயம்:** இல்லை
    -   **வகை:** விருப்பங்களின் ஒரு பொருள், [ஒப்பிடு/சரிபார்க்கும் விருப்பங்கள்](./method-options#compare-check-options) பார்க்கவும்

#### வெளியீடு:

[சோதனை வெளியீடு](./test-output#checkscreenelementfullpagescreen) பக்கத்தைப் பார்க்கவும்.