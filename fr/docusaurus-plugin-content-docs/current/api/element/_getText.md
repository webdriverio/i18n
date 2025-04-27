---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

Obtenir le contenu textuel d'un élément DOM. Assurez-vous que l'élément
dont vous voulez demander le texte [est interactif](http://www.w3.org/TR/webdriver/#interactable),
sinon vous obtiendrez une chaîne vide comme valeur de retour. Si l'élément est désactivé ou non
visible et que vous souhaitez quand même recevoir le contenu textuel, utilisez [getHTML](https://webdriver.io/docs/api/element/getHTML)
comme solution de contournement.

##### Utilisation

```js
$(selector).getText()
```

##### Exemples

```html title="index.html"
<div id="elem">
    Lorem ipsum <strong>dolor</strong> sit amet,<br />
    consetetur sadipscing elitr
</div>
<span style="display: none">I am invisible</span>
```

```js title="getText.js"
it('should demonstrate the getText function', async () => {
    const elem = await $('#elem');
    console.log(await elem.getText());
    // outputs the following:
    // "Lorem ipsum dolor sit amet,consetetur sadipscing elitr"

    const span = await $('span');
    console.log(await span.getText());
    // outputs "" (empty string) since element is not interactable
});
it('get content from table cell', async () => {
    await browser.url('http://the-internet.herokuapp.com/tables');
    const rows = await $$('#table1 tr');
    const columns = await rows[1].$$('td'); // get columns of 2nd row
    console.log(await columns[2].getText()); // get text of 3rd column
});
```

##### Retourne

- **&lt;String&gt;**
            **<code><var>return</var></code>:** contenu de l'élément sélectionné (toutes les balises HTML sont supprimées)