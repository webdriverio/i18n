---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Ett element anses vara klickbart när följande villkor är uppfyllda:

- elementet existerar
- elementet visas
- elementet är inte inaktiverat
- elementet är inom viewporten
- elementet kan scrollas in i viewporten
- elementets centrum överlappar inte med ett annat element

annars returneras false.

:::info

Observera att `isClickable` fungerar endast i webbläsare och i mobila webvyer,
det fungerar inte i mobilappens nativa kontext. Dessutom, till skillnad från andra element-
kommandon kommer WebdriverIO inte att vänta på att elementet ska existera för att utföra detta kommando.

:::

##### Användning

```js
$(selector).isClickable()
```

##### Exempel

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             true om elementet är klickbart