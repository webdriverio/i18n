---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/scrollIntoView.ts
---

Rolar elemento para dentro da viewport para Web Desktop/Mobile <strong>E</strong> Aplicativos Nativos Mobile.

:::info

A rolagem para Aplicativos Nativos Mobile é feita com base no comando mobile `swipe`.

Este comando funciona apenas com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja atualizado regularmente para evitar problemas de compatibilidade.

:::

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
      <td>`object, boolean`</td>
      <td>opções para `Element.scrollIntoView()`. Padrão para desktop/mobile web: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Padrão para Aplicativo Nativo Mobile <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Apenas Desktop/Mobile Web</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Mobile)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Apenas Aplicativo Nativo Mobile</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Pode ser um de `down`, `up`, `left` ou `right`, o padrão é `up`. <br /><strong>APENAS-APLICATIVO-NATIVO-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A quantidade máxima de rolagens até parar de procurar pelo elemento, o padrão é `10`. <br /><strong>APENAS-APLICATIVO-NATIVO-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A duração em milissegundos para o deslize. O padrão é `1500` ms. Quanto menor o valor, mais rápido o deslize.<br /><strong>APENAS-APLICATIVO-NATIVO-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Element`</td>
      <td>Elemento que é usado para rolar dentro. Se nenhum elemento for fornecido, ele usará o seguinte seletor para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e o seguinte para Android `//android.widget.ScrollView'`. Se mais elementos corresponderem ao seletor padrão, por padrão ele escolherá o primeiro elemento correspondente. <br /> <strong>APENAS-APLICATIVO-NATIVO-MOBILE</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A porcentagem do elemento rolável (padrão) para deslizar. Este é um valor entre 0 e 1. O padrão é `0.95`.<br /><strong>NUNCA</strong> deslize a partir do topo|fundo|esquerda|direita exatos da tela, você pode acionar, por exemplo, a barra de notificação ou outros recursos do SO/Aplicativo, o que pode levar a resultados inesperados.<br /> <strong>APENAS-APLICATIVO-NATIVO-MOBILE</strong></td>
    </tr>
  </tbody>
</table>

##### Exemplos

```js title="desktop.mobile.web.scrollIntoView.js"
it('should demonstrate the desktop/mobile web scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to specific element
    await elem.scrollIntoView();
    // center element within the viewport
    await elem.scrollIntoView({ block: 'center', inline: 'center' });
});

```

```js title="mobile.native.app.scrollIntoView.js"
it('should demonstrate the mobile native app scrollIntoView command', async () => {
    const elem = await $('#myElement');
    // scroll to a specific element in the default scrollable element for Android or iOS for a maximum of 10 scrolls
    await elem.scrollIntoView();
    // Scroll to the left in the scrollable element called '#scrollable' for a maximum of 5 scrolls
    await elem.scrollIntoView({
        direction: 'left',
        maxScrolls: 5,
        scrollableElement: $('#scrollable')
    });
});
```