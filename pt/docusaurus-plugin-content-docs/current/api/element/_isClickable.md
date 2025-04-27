---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

Um elemento é considerado clicável quando as seguintes condições são atendidas:

- o elemento existe
- o elemento está sendo exibido
- o elemento não está desativado
- o elemento está dentro da área visível
- o elemento pode ser rolado para a área visível
- o centro do elemento não está sobreposto por outro elemento

caso contrário, retorna falso.

:::info

Observe que `isClickable` funciona apenas em navegadores web e em webviews móveis,
não funciona no contexto nativo de aplicativos móveis. Além disso, ao contrário de outros comandos
de elemento, o WebdriverIO não esperará que o elemento exista para executar este comando.

:::

##### Uso

```js
$(selector).isClickable()
```

##### Exemplo

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             verdadeiro se o elemento for clicável