---
id: getText
title: getText பெறு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

DOM-உறுப்பிலிருந்து உரை உள்ளடக்கத்தைப் பெறுங்கள். நீங்கள் 
உரையைக் கோர விரும்பும் உறுப்பு [தொடர்புகொள்ளக்கூடியதாக இருக்கிறது](http://www.w3.org/TR/webdriver/#interactable) 
என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள், இல்லையெனில் நீங்கள் வெற்று சரத்தை திருப்பி பெறுவீர்கள். உறுப்பு முடக்கப்பட்டிருந்தாலோ அல்லது
தெரியவில்லை என்றாலும் நீங்கள் இன்னும் உரை உள்ளடக்கத்தைப் பெற விரும்பினால், மாற்று வழியாக [getHTML](https://webdriver.io/docs/api/element/getHTML) ஐப் பயன்படுத்தவும்.

##### பயன்பாடு

```js
$(selector).getText()
```

##### எடுத்துக்காட்டுகள்

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

##### திரும்பப் பெறுபவை

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  தேர்ந்தெடுக்கப்பட்ட உறுப்பின் உள்ளடக்கம் (அனைத்து HTML குறிச்சொற்களும் அகற்றப்படுகின்றன)