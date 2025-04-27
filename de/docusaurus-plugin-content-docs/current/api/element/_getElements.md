---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Greife auf `WebdriverIO.ElementArray` Eigenschaften wie `length` oder `selector` aus der Elementreferenz zu.

##### Verwendung

```js
$(selector).getElements()
```

##### Beispiel

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Gibt zurück

- **&lt;WebdriverIO.ElementArray&gt;**