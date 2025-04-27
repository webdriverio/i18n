---
id: getWindowSize
title: getWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/getWindowSize.ts
---

Retorna o tamanho da janela do navegador.

##### Uso

```js
browser.getWindowSize()
```

##### Exemplo

```js title="getWindowSize.js"
it('should return browser window size', async () => {
    const windowSize = await browser.getWindowSize();
    console.log(windowSize);
    // outputs `{ width: 1280, height: 767 }`
});
```

##### Retorna

- **&lt;Object&gt;**
            **<code><var>return</var></code>:**  `{ x, y, width, height }` para navegadores W3C ou `{ width, height }` para navegadores não W3C