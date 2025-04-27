---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

अपने ओएस पर एक तत्व का स्क्रीनशॉट पीएनजी फाइल में सहेजें।

##### उपयोग

```js
$(selector).saveScreenshot(filename)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>उत्पन्न छवि का पथ (`.png` प्रत्यय आवश्यक है) निष्पादन निर्देशिका के सापेक्ष</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### रिटर्न्स

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             स्क्रीनशॉट बफर