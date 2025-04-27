---
id: scrollIntoView
title: scrollIntoView
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/scrollIntoView.ts
---

Rola o elemento para a área visível tanto para Web Desktop/Mobile <strong>QUANTO</strong> para Aplicativos Nativos Móveis.

:::info

A rolagem para Aplicativos Nativos Móveis é feita com base no comando móvel `swipe`.

:::

##### Uso

```js
$(selector).scrollIntoView({ behavior, block, inline, direction, maxScrolls, duration, scrollableElement, percent })
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
      <td>`object, boolean`</td>
      <td>opções para `Element.scrollIntoView()`. Padrão para desktop/web móvel: <br/> `{ block: 'start', inline: 'nearest' }` <br /> Padrão para Aplicativo Nativo Móvel <br /> `{ maxScrolls: 10, scrollDirection: 'down' }`</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Apenas Desktop/Web Móvel</strong></td>
            </tr>
    <tr>
      <td><code><var>options.behavior</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Móvel)</td>
    </tr>
    <tr>
      <td><code><var>options.block</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Móvel)</td>
    </tr>
    <tr>
      <td><code><var>options.inline</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Veja [Referência MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView). <br /><strong>APENAS-WEB</strong> (Desktop/Móvel)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Apenas Aplicativo Nativo Móvel</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Pode ser `down`, `up`, `left` ou `right`, o padrão é `up`. <br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>O número máximo de rolagens até parar de procurar o elemento, o padrão é `10`. <br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A duração em milissegundos para o deslize. O padrão é `1500` ms. Quanto menor o valor, mais rápido o deslize.<br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Element`</td>
      <td>Elemento usado para rolar dentro. Se nenhum elemento for fornecido, utilizará o seguinte seletor para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e o seguinte para Android `//android.widget.ScrollView'`. Se mais elementos corresponderem ao seletor padrão, por padrão ele escolherá o primeiro elemento correspondente. <br /> <strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>A porcentagem do elemento rolável (padrão) para deslizar. Este é um valor entre 0 e 1. O padrão é `0.95`.<br /><strong>NUNCA</strong> deslize a partir do topo|fundo|esquerda|direita exatos da tela, você pode acionar, por exemplo, a barra de notificação ou outros recursos do SO/App que podem levar a resultados inesperados.<br /> <strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
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