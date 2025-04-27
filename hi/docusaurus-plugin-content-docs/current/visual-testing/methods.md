---
id: methods
title: मेथड्स
---

निम्नलिखित मेथड्स वैश्विक WebdriverIO [`browser`](/docs/api/browser)-ऑब्जेक्ट में जोड़े जाते हैं।

## सेव मेथड्स

:::info टिप
सेव मेथड्स का उपयोग केवल तभी करें जब आप स्क्रीन की तुलना **नहीं** करना चाहते हैं, बल्कि केवल एलिमेंट-/स्क्रीनशॉट चाहते हैं।
:::

### `saveElement`

किसी एलिमेंट की छवि सहेजता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स

-   **`element`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** WebdriverIO Element
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`saveElementOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveScreen`

व्यूपोर्ट की छवि सहेजता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`saveScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveFullPageScreen`

#### उपयोग

पूरी स्क्रीन की छवि सहेजता है।

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`saveFullPageScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveTabbablePage`

टैबेबल लाइनों और डॉट्स के साथ पूरी स्क्रीन की छवि सहेजता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`saveTabbableOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

## चेक मेथड्स

:::info टिप
जब `check`-मेथड्स पहली बार उपयोग किए जाते हैं तो आपको लॉग में नीचे दिया गया चेतावनी दिखाई देगी। इसका मतलब है कि अगर आप अपना बेसलाइन बनाना चाहते हैं तो आपको `save`- और `check`-मेथड्स को जोड़ने की आवश्यकता नहीं है।

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

किसी एलिमेंट की छवि की तुलना बेसलाइन छवि से करता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`element`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** WebdriverIO Element
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`checkElementOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkScreen`

व्यूपोर्ट की छवि की तुलना बेसलाइन छवि से करता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`checkScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkFullPageScreen`

पूरी स्क्रीन की छवि की तुलना बेसलाइन छवि से करता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`checkFullPageOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkTabbablePage`

टैबेबल लाइनों और डॉट्स के साथ पूरी स्क्रीन की छवि की तुलना बेसलाइन छवि से करता है।

#### उपयोग

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

#### समर्थन

- डेस्कटॉप ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **प्रकार:** string
-   **`checkTabbableOptions`:**
    -   **अनिवार्य:** नहीं
    -   **प्रकार:** विकल्पों का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।