---
id: swipe
title: deslizar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Deslize em uma direção específica dentro da viewport ou elemento para Web Desktop/Mobile <strong>E</strong> Aplicativos Nativos Móveis.

:::info

Deslizar para Aplicativos Nativos Móveis é baseado no protocolo de ações W3C, simulando um toque e movimento do dedo.
Isso é diferente do [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) para Android
ou [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) para iOS que são baseados no protocolo do Driver Appium e estão
disponíveis apenas para plataformas móveis no contexto NATIVO.

Este comando funciona apenas com os seguintes componentes atualizados:
 - Servidor Appium (versão 2.0.0 ou superior)
 - `appium-uiautomator2-driver` (para Android)
 - `appium-xcuitest-driver` (para iOS)

Certifique-se de que seu ambiente Appium local ou baseado em nuvem seja regularmente atualizado para evitar problemas de compatibilidade.

:::

:::caution Deslizamento baseado em coordenadas

Evite usar as opções `from` e `to` a menos que seja absolutamente necessário. Estas são específicas para dispositivos e podem não funcionar consistentemente em dispositivos diferentes.
Use a opção `scrollableElement` para deslizamentos confiáveis dentro de um elemento.

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
      <td>`object, boolean`</td>
      <td>opções para `browser.swipe()`. Padrão para desktop/mobile web: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Pode ser um de `down`, `up`, `left` ou `right`, o padrão é `up`. <br /><strong>APENAS-PARA-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Para baixo</strong><br /><strong>Ponto de início:</strong><br/>Você coloca seu dedo próximo à parte superior da tela.<br/><strong>Movimento:</strong><br/>Você desliza seu dedo para baixo em direção à parte inferior da tela.<br/><strong>Ação:</strong><br/>Isso também varia conforme o contexto:<br />- Na tela inicial ou em aplicativos, geralmente rola o conteúdo para cima.<br />- A partir da borda superior, frequentemente abre o painel de notificações ou configurações rápidas.<br />- Em navegadores ou aplicativos de leitura, pode ser usado para rolar pelo conteúdo.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Para a esquerda</strong><br /><strong>Ponto de início:</strong><br/>Você coloca seu dedo no lado direito da tela.<br/><strong>Movimento:</strong><br/>Você desliza seu dedo horizontalmente para a esquerda.><br/><strong>Ação:</strong><br/>A resposta a esse gesto depende do aplicativo:<br />- Pode mover para o próximo item em um carrossel ou conjunto de imagens.<br />- Em um contexto de navegação, pode retornar à página anterior ou fechar a visualização atual.<br />- Na tela inicial, geralmente muda para a próxima área de trabalho virtual ou tela.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Para a direita</strong><br /><strong>Ponto de início:</strong><br/>Você coloca seu dedo no lado esquerdo da tela.<br/><strong>Movimento:</strong><br/>Você desliza seu dedo horizontalmente para a direita.<br/><strong>Ação:</strong><br/>Similar ao deslizamento para a esquerda, mas na direção oposta:<br />-- Muitas vezes move para o item anterior em um carrossel ou galeria.<br />- Pode ser usado para abrir menus laterais ou gavetas de navegação em aplicativos.<br />- Na tela inicial, normalmente muda para a área de trabalho virtual anterior.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Para cima</strong><br /><strong>Ponto de início:</strong><br/>Você coloca seu dedo próximo à parte inferior da tela.<br/><strong>Movimento:</strong><br/>Você desliza seu dedo para cima em direção à parte superior da tela.><br/><strong>Ação:</strong><br/>Dependendo do contexto, diferentes ações podem ocorrer:<br />- Na tela inicial ou em uma lista, geralmente rola o conteúdo para baixo.<br />- Em um aplicativo de tela cheia, pode abrir opções adicionais ou a gaveta de aplicativos.<br />- Em certas interfaces, pode acionar uma ação de 'atualização' ou abrir uma barra de pesquisa.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A duração em milissegundos para o deslizamento. O padrão é `1500` ms. Quanto menor o valor, mais rápido o deslizamento.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Element`</td>
      <td>Elemento que é usado para deslizar dentro. Se nenhum elemento for fornecido, usará o seguinte seletor para iOS `-ios predicate string:type == "XCUIElementTypeApplication"` e o seguinte para Android `//android.widget.ScrollView'`. Se mais elementos corresponderem ao seletor padrão, então por padrão escolherá o primeiro elemento correspondente. <br /> <strong>APENAS-PARA-APLICATIVO-NATIVO-MÓVEL</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A porcentagem do elemento rolável (padrão) para deslizar. Este é um valor entre 0 e 1. O padrão é `0.95`.<br /><strong>NUNCA</strong> deslize a partir do topo|fundo|esquerda|direita exatos da tela, você pode acionar, por exemplo, a barra de notificações ou outros recursos do SO/App, o que pode levar a resultados inesperados.<br />Isso não tem efeito se `from` e `to` forem fornecidos.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Os valores abaixo <strong>SOMENTE</strong> têm efeito se o `scrollableElement` <strong>NÃO</strong> for fornecido, caso contrário, eles são ignorados.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>As coordenadas x e y do início do deslizamento. Se um `scrollableElement` for fornecido, essas coordenadas não terão efeito.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A coordenada x do início do deslizamento.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A coordenada y do início do deslizamento.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`object`</td>
      <td>As coordenadas x e y do fim do deslizamento. Se um `scrollableElement` for fornecido, essas coordenadas não terão efeito.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A coordenada x do fim do deslizamento.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>A coordenada y do fim do deslizamento.</td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```