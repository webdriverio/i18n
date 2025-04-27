---
id: tap
title: tap
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/tap.ts
---

Executa um gesto de toque em:
- ou no elemento fornecido. Irá **automaticamente rolar** se não puder ser encontrado.
- ou na tela de um dispositivo móvel fornecendo coordenadas `x` e `y`

Internamente, utiliza:
- Toque no elemento:
     - o comando `click` para ambientes Web (navegadores Chrome/Safari ou aplicativos híbridos)
     - o Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
ou iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) para aplicativos nativos, incluindo o comando
`scrollIntoView` para rolagem automática
- Toque na tela:
     - o comando `action` para ambientes Web (navegadores Chrome/Safari ou aplicativos híbridos)
     - o Android [`mobile: clickGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-clickgesture)
ou iOS [`mobile: tap`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-tap) para aplicativos nativos

Essa diferença torna o comando `tap` uma alternativa mais confiável ao comando `click` para aplicativos móveis.

Para aplicativos nativos, este comando difere do comando `click`, pois irá <strong>automaticamente deslizar</strong> até o elemento usando o comando `scrollIntoView`,
que não é suportado para aplicativos nativos com o comando `click`. Em aplicativos híbridos ou ambientes web, a rolagem automática é suportada para ambos os comandos `click` e `tap`.

:::info

Este comando só funciona com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja atualizado regularmente para evitar problemas de compatibilidade.

:::

:::caution Para toques na tela

Se você deseja tocar em uma coordenada específica na tela e usa uma captura de tela para determinar as coordenadas, lembre-se de que as
coordenadas para iOS são baseadas no tamanho da tela do dispositivo, e não no tamanho da captura de tela. O tamanho da captura de tela é maior devido à taxa de pixels do dispositivo.
A taxa média de pixels do dispositivo até o iPhone 8 e os iPads atuais é 2, para iPhones a partir do iPhone X a taxa é 3. Isso significa que o tamanho da captura de tela
é 2 ou 3 vezes maior que o tamanho da tela do dispositivo, o que significa que se você encontrar as coordenadas na captura de tela, divida-as pela taxa de pixels do
dispositivo para obter as coordenadas corretas da tela. Por exemplo:

```js
const screenshotCoordinates = { x: 600, y: 900 };
const dpr = 3; // Exemplo para iPhone 16
const screenCoordinates = {
    x: screenshotCoordinates.x / dpr,
    y: screenshotCoordinates.y / dpr
};
await browser.tap(screenCoordinates);
```

:::

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`TapOptions`</td>
      <td>Opções de toque (opcional)</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opções de toque no elemento</strong></td>
            </tr>
    <tr>
      <td><code><var>options.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Número (opcional, obrigatório se y estiver definido) <br /><strong>Apenas para toque na TELA, não para toque no ELEMENTO</strong></td>
    </tr>
    <tr>
      <td><code><var>options.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Número (opcional, obrigatório se x estiver definido) <br /><strong>Apenas para toque na TELA, não para toque no ELEMENTO</strong></td>
    </tr>
    <tr>
              <td colspan="3"><strong>Opções de toque na tela</strong></td>
            </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Pode ser um de `down`, `up`, `left` ou `right`, o padrão é `down`. <br /><strong>Apenas para toque no ELEMENTO, não para toque na TELA</strong><br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.maxScrolls</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>O número máximo de rolagens até parar de procurar pelo elemento, o padrão é `10`. <br /><strong>Apenas para toque no ELEMENTO, não para toque na TELA</strong><br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Elemento que é usado para rolar dentro. Se nenhum elemento for fornecido, usará o seguinte seletor para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e o seguinte para Android `//android.widget.ScrollView'`. Se mais elementos corresponderem ao seletor padrão, então por padrão ele escolherá o primeiro elemento correspondente. <br /><strong>Apenas para toque no ELEMENTO, não para toque na TELA</strong><br /><strong>APENAS-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="element.tap.example.js"
it('should be able to tap an on element', async () => {
    const elem = $('~myElement')
    // It will automatically scroll to the element if it's not already in the viewport
    await elem.tap()
})

```

```js title="element.tap.scroll.options.example.js"
it('should be able to swipe right 3 times in a custom scroll areas to an element and tap on the element', async () => {
    const elem = $('~myElement')
    // Swipe right 3 times in the custom scrollable element to find the element
    await elem.tap({
        direction: 'right',
        maxScrolls: 3,
        scrollableElement: $('#scrollable')
    })
})

```

```js title="screen.tap.example.js"
it('should be able to tap on screen coordinates', async () => {
    await browser.tap({ x: 200, y: 400 })
})
```