---
id: methods
title: मेथड्स
description: "स्क्रीनशॉट कैप्चर करने और स्क्रीन, एलिमेंट्स और फुल पेजों की बेसलाइन से तुलना करने के लिए विज़ुअल सर्विस के save और check मेथड्स का उपयोग करें।"
---

निम्नलिखित मेथड्स ग्लोबल WebdriverIO [`browser`](/docs/api/browser)-ऑब्जेक्ट में जोड़े जाते हैं।

## Save मेथड्स

:::info TIP
Save मेथड्स का उपयोग केवल तभी करें जब आप स्क्रीन की तुलना **नहीं** करना चाहते, बल्कि केवल एक एलिमेंट-/स्क्रीनशॉट चाहते हैं।
:::

### `saveElement`

किसी एलिमेंट की इमेज सेव करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स

-   **`element`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** WebdriverIO Element
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`saveElementOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveScreen`

किसी व्यूपोर्ट की इमेज सेव करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`saveScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveFullPageScreen`

#### उपयोग

पूरी स्क्रीन की इमेज सेव करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`saveFullPageScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

### `saveTabbablePage`

टैब करने योग्य (tabbable) लाइनों और डॉट्स के साथ पूरी स्क्रीन की इमेज सेव करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`saveTabbableOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Save Options](./method-options#save-options)

#### आउटपुट:

[Test Output](./test-output#savescreenelementfullpagescreen) पेज देखें।

## Check मेथड्स

:::info TIP
जब `check`-मेथड्स का पहली बार उपयोग किया जाता है, तो आपको लॉग्स में नीचे दी गई चेतावनी दिखाई देगी। इसका मतलब है कि यदि आप अपनी बेसलाइन बनाना चाहते हैं तो आपको `save`- और `check`-मेथड्स को एक साथ उपयोग करने की आवश्यकता नहीं है।

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

किसी एलिमेंट की इमेज की तुलना बेसलाइन इमेज से करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`element`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** WebdriverIO Element
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`checkElementOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkScreen`

किसी व्यूपोर्ट की इमेज की तुलना बेसलाइन इमेज से करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र
- मोबाइल हाइब्रिड ऐप्स
- मोबाइल नेटिव ऐप्स

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`checkScreenOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkFullPageScreen`

पूरी स्क्रीन की इमेज की तुलना बेसलाइन इमेज से करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र
- मोबाइल ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`checkFullPageOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।

### `checkTabbablePage`

टैब करने योग्य (tabbable) लाइनों और डॉट्स के साथ पूरी स्क्रीन की इमेज की तुलना बेसलाइन इमेज से करता है।

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

#### सपोर्ट

- डेस्कटॉप ब्राउज़र

#### पैरामीटर्स
-   **`tag`:**
    -   **अनिवार्य:** हाँ
    -   **टाइप:** string
-   **`checkTabbableOptions`:**
    -   **अनिवार्य:** नहीं
    -   **टाइप:** ऑप्शन्स का एक ऑब्जेक्ट, देखें [Compare/Check Options](./method-options#compare-check-options)

#### आउटपुट:

[Test Output](./test-output#checkscreenelementfullpagescreen) पेज देखें।