---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Reduz o desempenho da CPU para emular um processador mais lento.

:::info

Observe que usar o comando `throttleCPU` requer suporte para o protocolo Chrome DevTools e, por exemplo,
não pode ser usado ao executar testes automatizados na nuvem. O protocolo Chrome DevTools não é instalado por padrão,
use `npm install puppeteer-core` para instalá-lo.
Saiba mais na seção [Protocolos de Automação](/docs/automationProtocols).

:::

##### Uso

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>fator de desaceleração (1 é sem redução, 2 é 2x mais lento, etc)</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```