---
id: moveTo
title: moveTo
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/moveTo.ts
---

Mova o mouse por um deslocamento do elemento especificado. Se nenhum elemento for especificado,
o movimento é relativo ao cursor atual do mouse. Se um elemento for fornecido mas
sem deslocamento, o mouse será movido para o centro do elemento. Se o elemento
não estiver visível, ele será rolado para a visualização.

##### Uso

```js
$(selector).moveTo({ xOffset, yOffset })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`MoveToOptions`</td>
      <td>opções do comando moveTo</td>
    </tr>
    <tr>
      <td><code><var>options.xOffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Deslocamento X para mover, relativo ao centro do elemento. Se não especificado, o mouse se moverá para o centro do elemento.</td>
    </tr>
    <tr>
      <td><code><var>options.yOffset</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>Deslocamento Y para mover, relativo ao centro do elemento. Se não especificado, o mouse se moverá para o centro do elemento.</td>
    </tr>
  </tbody>
</table>