---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Espera que um elemento (selecionado por um seletor css) esteja (des/hab)ilitado durante o tempo fornecido em milissegundos. Se vários elementos forem consultados pelo seletor fornecido, retorna verdadeiro se pelo menos um elemento estiver (des/hab)ilitado.

:::info

Ao contrário de outros comandos de elemento, o WebdriverIO não esperará que o elemento
exista para executar este comando.

:::

##### Uso

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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

##### Exemplos

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  verdadeiro     se o elemento estiver (des/hab)ilitado    