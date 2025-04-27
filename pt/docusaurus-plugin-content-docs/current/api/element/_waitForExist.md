---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Espera que um elemento esteja presente no DOM durante a quantidade fornecida de 
milissegundos. Retorna verdadeiro se o seletor
corresponder a pelo menos um elemento que existe no DOM, caso contrário lança um
erro. Se a flag reverse for verdadeira, o comando retornará verdadeiro
se o seletor não corresponder a nenhum elemento.

:::info

Ao contrário de outros comandos de elemento, o WebdriverIO não esperará que o
elemento exista para executar este comando.

:::

##### Uso

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>`WaitForOptions`</td>
      <td>opções waitForEnabled (opcional)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>tempo em ms (padrão definido com base no valor de configuração [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>se verdadeiro, espera pelo oposto (padrão: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>se existir, substitui a mensagem de erro padrão</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Number`</td>
      <td>intervalo entre verificações (padrão: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  verdadeiro     se o elemento existe (ou não, se a flag estiver definida)