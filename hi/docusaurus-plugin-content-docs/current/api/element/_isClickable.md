---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

एक तत्व को क्लिक करने योग्य माना जाता है जब निम्नलिखित शर्तें पूरी होती हैं:

- तत्व मौजूद है
- तत्व प्रदर्शित है
- तत्व अक्षम नहीं है
- तत्व व्यूपोर्ट के भीतर है
- तत्व को व्यूपोर्ट में स्क्रॉल किया जा सकता है
- तत्व का केंद्र किसी अन्य तत्व के साथ ओवरलैप नहीं होता है

अन्यथा false लौटाता है।

:::info

कृपया ध्यान दें कि `isClickable` केवल वेब ब्राउज़र और मोबाइल वेबव्यू में काम करता है, 
यह मोबाइल ऐप नेटिव कॉन्टेक्स्ट में काम नहीं करता है। साथ ही, अन्य तत्व 
कमांड के विपरीत WebdriverIO इस कमांड को निष्पादित करने के लिए तत्व के मौजूद होने की प्रतीक्षा नहीं करेगा।

:::

##### उपयोग

```js
$(selector).isClickable()
```

##### उदाहरण

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### रिटर्न

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true if element is clickable    