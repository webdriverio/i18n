---
id: getText
title: getText
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getText.ts
---

DOM-एलिमेंट से टेक्स्ट कंटेंट प्राप्त करें। सुनिश्चित करें कि जिस एलिमेंट से आप टेक्स्ट का अनुरोध करना चाहते हैं वह [इंटरैक्ट करने योग्य है](http://www.w3.org/TR/webdriver/#interactable), अन्यथा आपको रिटर्न वैल्यू के रूप में एक खाली स्ट्रिंग मिलेगी। यदि एलिमेंट अक्षम या दृश्यमान नहीं है और आप फिर भी टेक्स्ट कंटेंट प्राप्त करना चाहते हैं, तो वर्कअराउंड के रूप में [getHTML](https://webdriver.io/docs/api/element/getHTML) का उपयोग करें।

##### उपयोग

```js
$(selector).getText()
```

##### उदाहरण

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

##### रिटर्न

- **&lt;String&gt;**
            **<code><var>return</var></code>:** चयनित एलिमेंट की सामग्री (सभी HTML टैग हटा दिए जाते हैं)