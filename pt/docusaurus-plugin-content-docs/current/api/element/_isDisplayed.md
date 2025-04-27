---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Retorna verdadeiro se o elemento DOM selecionado está exibido (mesmo quando o elemento está fora da viewport). Ele utiliza 
o método [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
fornecido pelo navegador para determinar se um elemento está sendo exibido ou não. Como o WebdriverIO age como um 
usuário real, os valores padrão para as flags `contentVisibilityAuto`, `opacityProperty` e `visibilityProperty` 
são definidos como `true` para um comportamento mais rigoroso por padrão. Isso significa que o comando verificará se o elemento está 
visível devido ao valor de suas propriedades `content-visibility`, `opacity` e `visibility`.

Se você também quiser verificar se o elemento está dentro da viewport, forneça a flag `withinViewport` ao comando.

:::info

Ao contrário de outros comandos de elemento, o WebdriverIO não esperará que o elemento 
exista para executar este comando.

:::

O WebdriverIO, ao conduzir testes de navegador, utiliza um [script personalizado](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts)
especificamente projetado para avaliar a visibilidade dos elementos. Este script é fundamental para determinar se um 
elemento está exibido na página. Por outro lado, para cenários de testes móveis nativos com Appium, o WebdriverIO 
recorre ao comando [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed)
fornecido pelo Appium. Este comando avalia a visibilidade dos elementos usando critérios estabelecidos pelo 
driver Appium subjacente, garantindo avaliações precisas e específicas do driver para aplicações móveis.

##### Uso

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
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
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar se o elemento está dentro da viewport. `false` por padrão.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar se a propriedade content-visibility do elemento tem (ou herda) o valor auto, e está atualmente pulando sua renderização. `true` por padrão.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar se a propriedade opacity do elemento tem (ou herda) um valor de 0. `true` por padrão.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`Boolean`</td>
      <td>`true` para verificar se o elemento está invisível devido ao valor de sua propriedade visibility. `true` por padrão.</td>
    </tr>
  </tbody>
</table>

##### Exemplos

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Retorna

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true se o elemento está exibido