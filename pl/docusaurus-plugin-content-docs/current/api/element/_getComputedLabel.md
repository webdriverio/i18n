---
id: getComputedLabel
title: getComputedLabel
description: Pobierz obliczoną etykietę WAI-ARIA elementu.
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getComputedLabel.ts
---

Pobierz obliczoną etykietę WAI-ARIA elementu.

##### Użycie

```js
$(selector).getComputedLabel()
```

##### Przykład

```js title="getComputedLabel.js"
it('should demonstrate the getComputedLabel command', async () => {
    await browser.url('https://www.google.com/ncr')
    const elem = await $('*[name="q"]');
    console.log(await elem.getComputedLabel()); // outputs: "Search"
})
```

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  obliczoną etykietę WAI-ARIA