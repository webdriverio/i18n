---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Obtenir le nom de balise d'un élément DOM.

##### Utilisation

```js
$(selector).getTagName()
```

##### Exemples

```html title="index.html"
<div id="elem">Lorem ipsum</div>

```

```js title="getTagName.js"
it('should demonstrate the getTagName command', async () => {
    const elem = await $('#elem');

    const tagName = await elem.getTagName();
    console.log(tagName); // outputs: "div"
})
```

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:** le nom de balise de l'élément, sous forme de chaîne de caractères en minuscules