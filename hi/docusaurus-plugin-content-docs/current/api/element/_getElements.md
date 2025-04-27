---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

`WebdriverIO.ElementArray` गुणों जैसे `length` या `selector` को एलिमेंट्स रेफरेंस से एक्सेस करें।

##### उपयोग

```js
$(selector).getElements()
```

##### उदाहरण

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### रिटर्न्स

- **&lt;WebdriverIO.ElementArray&gt;**
    