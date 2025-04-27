---
id: isEqual
title: isEqual
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isEqual.ts
---

Retorna verdadeiro se o elemento selecionado corresponde ao fornecido.

##### Uso

```js
$(selector).isEqual(el)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>el</var></code></td>
      <td>`Element`</td>
      <td>elemento para comparar</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="isEqual.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    const sameEl = await $('#el')
    const anotherEl = await $('#anotherEl')

    el.isEqual(sameEl) // outputs: true

    el.isEqual(anotherEl) // outputs: false
});
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**    verdadeiro se os elementos são iguais