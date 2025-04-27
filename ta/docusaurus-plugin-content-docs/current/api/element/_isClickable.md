---
id: isClickable
title: கிளிக் செய்யக்கூடியது
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

ஒரு உறுப்பு பின்வரும் நிபந்தனைகள் பூர்த்தி செய்யப்படும்போது கிளிக் செய்யக்கூடியதாகக் கருதப்படுகிறது:

- உறுப்பு இருக்கிறது
- உறுப்பு காட்டப்படுகிறது
- உறுப்பு முடக்கப்படவில்லை
- உறுப்பு பார்வை எல்லைக்குள் உள்ளது
- உறுப்பு பார்வை எல்லைக்குள் ஸ்க்ரோல் செய்யப்படலாம்
- உறுப்பின் மையம் மற்றொரு உறுப்புடன் மேற்பொருந்தவில்லை

இல்லையெனில் false திரும்பும்.

:::info

`isClickable` வெப் பிரெளசர் மற்றும் மொபைல் வெப்வியூக்களில் மட்டுமே செயல்படும், 
இது மொபைல் ஆப் நேட்டிவ் சூழலில் செயல்படாது என்பதை கவனிக்கவும். மேலும், மற்ற உறுப்பு 
கட்டளைகளுக்கு எதிராக, இந்த கட்டளையை செயல்படுத்த WebdriverIO உறுப்பு இருப்பதை காத்திருக்காது.

:::

##### பயன்பாடு

```js
$(selector).isClickable()
```

##### உதாரணம்

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### திரும்பப்பெறுபவை

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             உறுப்பு கிளிக் செய்யக்கூடியதாக இருந்தால் true