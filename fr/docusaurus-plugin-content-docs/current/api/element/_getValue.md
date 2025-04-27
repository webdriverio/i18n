---
id: getValue
title: getValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

Obtenir la valeur d'un `<textarea>`, `<select>` ou d'un `<input>` de type texte trouvé par le sélecteur donné.
Si plusieurs éléments sont trouvés via le sélecteur donné, un tableau de valeurs est retourné à la place.
Pour les inputs de type checkbox ou radio, utilisez isSelected.

##### Utilisation

```js
$(selector).getValue()
```

##### Exemples

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   valeur(s) de l'élément demandé