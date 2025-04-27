---
id: getElement
title: तत्व प्राप्त करें (getElement)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

एलिमेंट रेफरेंस से `WebdriverIO.Element` प्रॉपर्टीज जैसे `selector` या `elementId` तक पहुंचें।

##### उपयोग

```js
$(selector).getElement()
```

##### उदाहरण

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### रिटर्न्स

- **&lt;WebdriverIO.Element&gt;**
    