---
id: selectors
title: Seletores
description: "Encontre elementos com CSS, texto, XPath, nome acessível, papel ARIA e outras estratégias de seletores, e saiba quais são as mais resilientes."
---

O [Protocolo WebDriver](https://w3c.github.io/webdriver/) oferece várias estratégias de seletores para consultar um elemento. O WebdriverIO as simplifica para manter a seleção de elementos simples. Observe que, embora os comandos para consultar elementos se chamem `$` e `$$`, eles não têm nenhuma relação com o jQuery ou com o [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Embora existam muitos seletores diferentes disponíveis, apenas alguns deles oferecem uma maneira resiliente de encontrar o elemento certo. Por exemplo, dado o seguinte botão:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

Nós __recomendamos__ e __não recomendamos__ os seguintes seletores:

| Seletor | Recomendado | Observações |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Nunca | Pior - genérico demais, sem contexto. |
| `$('.btn.btn-large')` | 🚨 Nunca | Ruim. Acoplado à estilização. Muito sujeito a mudanças. |
| `$('#main')` | ⚠️ Com moderação | Melhor. Mas ainda acoplado à estilização ou a event listeners de JS. |
| `$(() => document.queryElement('button'))` | ⚠️ Com moderação | Consulta eficaz, mas complexa de escrever. |
| `$('button[name="submission"]')` | ⚠️ Com moderação | Acoplado ao atributo `name`, que tem semântica HTML. |
| `$('button[data-testid="submit"]')` | ✅ Bom | Requer um atributo adicional, não está ligado à a11y. |
| `$('aria/Submit')` | ✅ Bom | Bom. Assemelha-se à forma como o usuário interage com a página. Recomenda-se usar arquivos de tradução para que seus testes não quebrem quando as traduções forem atualizadas. Em sessões WebDriver BiDi, usa a árvore de acessibilidade do navegador. Em sessões Classic, recorre ao XPath e pode ser mais lento em páginas grandes. |
| `$('button=Submit')` | ✅ Sempre | Melhor. Assemelha-se à forma como o usuário interage com a página e é rápido. Recomenda-se usar arquivos de tradução para que seus testes não quebrem quando as traduções forem atualizadas. |

## Modo Estrito

A partir da v10, o comando [`$`](/docs/api/browser/$) é __estrito__: ele representa exatamente um elemento. Se o seletor corresponder a mais de um elemento, o comando lança um `StrictSelectorError` em vez de escolher silenciosamente a primeira correspondência:

```js
// há 12 botões na página
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Esse é o mesmo comportamento dos [locators do Playwright](https://playwright.dev/docs/locators#strictness). O Cypress é diferente: suas consultas podem resolver para vários elementos, e são os comandos de ação, como [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), que rejeitam por padrão um alvo com vários elementos. O modo estrito expõe seletores amplos demais, que de outra forma interagiriam silenciosamente com o elemento errado assim que a página crescesse.

A regra se aplica a cada etapa de uma [cadeia](#chain-selectors) e a todo tipo de seletor que `$` aceita — seletores de string (incluindo os que atravessam o shadow DOM), [funções JS](#js-function), [seletores mobile](#mobile-selectors) e referências a [estratégias personalizadas](#custom-selector-strategies).

### O que não é afetado

- `$$` continua retornando zero ou vários elementos, como um [`ElementArray`](/docs/api/browser/$$). Aguarde a lista (ou seu `.length`) antes de ler a contagem ou usar `for...of`. `for await` funciona diretamente na lista.
- Os comandos auxiliares dedicados `custom$`, `shadow$` e `react$` não são estritos — eles ainda retornam sua primeira correspondência, assim como suas contrapartes `$$`.
- Um seletor que não corresponde a nada ainda retorna um elemento resolvido de forma lazy, então o [`waitForExist`](/docs/api/element/waitForExist) e o comportamento de [espera automática](/docs/autowait) não mudam.
- Passar uma referência de elemento, por exemplo `$(await browser.getActiveElement())`, sempre se refere a um único nó e nunca é verificado.

:::info Migrando para a v10

Para saber como auditar sua suíte em busca de violações do modo estrito, restringir ou desativar consultas individuais e desabilitar o modo estrito em todo o projeto, consulte o [guia de migração da v10](/docs/v10-migration).

:::

## Seletor de Consulta CSS

Se não for indicado de outra forma, o WebdriverIO consultará elementos usando o padrão de [seletor CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), por exemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Texto do Link

Para obter um elemento âncora com um texto específico, consulte o texto começando com um sinal de igual (`=`).

Por exemplo:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Você pode consultar esse elemento chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Texto Parcial do Link

Para encontrar um elemento âncora cujo texto visível corresponda parcialmente ao valor pesquisado,
consulte-o usando `*=` na frente da string de consulta (por exemplo, `*=driver`).

Você também pode consultar o elemento do exemplo acima chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Observação:__ Você não pode misturar várias estratégias de seletor em um único seletor. Use várias consultas de elementos encadeadas para alcançar o mesmo objetivo, por exemplo:

```js
const elem = await $('header h1*=Welcome') // não funciona!!!
// use em vez disso
const elem = await $('header').$('*=driver')
```

## Elemento com determinado texto

A mesma técnica também pode ser aplicada a elementos. Além disso, também é possível fazer uma correspondência sem diferenciar maiúsculas de minúsculas usando `.=` ou `.*=` na consulta.

Por exemplo, aqui está uma consulta para um título de nível 1 com o texto "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Você pode consultar esse elemento chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Ou usando uma consulta de texto parcial:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

O mesmo funciona para nomes de `id` e `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Você pode consultar esse elemento chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Observação:__ Você não pode misturar várias estratégias de seletor em um único seletor. Use várias consultas de elementos encadeadas para alcançar o mesmo objetivo, por exemplo:

```js
const elem = await $('header h1*=Welcome') // não funciona!!!
// use em vez disso
const elem = await $('header').$('h1*=Welcome')
```

## Nome da Tag

Para consultar um elemento com um nome de tag específico, use `<tag>` ou `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Você pode consultar esse elemento chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Atributo Name

Para consultar elementos com um atributo name específico, use um seletor CSS como `[name="some-name"]`. Em uma sessão mobile, essa mesma abreviação é enviada com a estratégia de localização `name` do Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Observação:__ A estratégia de localização `name` é um locator do Appium. Sessões desktop mantêm `[name="some-name"]` na estratégia CSS.

## xPath

Também é possível consultar elementos por meio de um [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) específico.

Um seletor xPath tem um formato como `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Você pode consultar o segundo parágrafo chamando:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Você também pode usar xPath para percorrer a árvore DOM para cima e para baixo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Seletor por Nome Acessível

Consulte elementos pelo seu nome acessível. O nome acessível é o que é anunciado por um leitor de tela quando aquele elemento recebe o foco. O valor do nome acessível pode ser tanto conteúdo visual quanto alternativas de texto ocultas.

Em sessões [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox e outros navegadores compatíveis com BiDi), o WebdriverIO usa primeiro o [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) com um locator de acessibilidade. Ele consulta diretamente a árvore de acessibilidade do navegador e normalmente é muito mais rápido do que a aproximação via XPath. Se o locator de acessibilidade não encontrar nada, o WebdriverIO recorre à heurística XPath do Classic, para que as consultas `aria/` existentes continuem funcionando.

:::info

Você pode ler mais sobre esse seletor em nosso [post de lançamento no blog](/blog/2022/09/05/accessibility-selector)

:::

### Buscar por `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Buscar por `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Buscar por conteúdo

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Buscar por título

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Buscar pela propriedade `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Seletor por Papel (Role)

Consulte elementos pelo seu papel ARIA e nome acessível, da forma como um leitor de tela os descreve: "o botão *Add to cart*". Um papel mais um nome continua correspondendo quando nomes de classe, test ids ou a estrutura do DOM mudam.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// apenas o papel
const rows = await $$('role/row')

// restrito a um elemento pai
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

A sintaxe é `role/<role>` ou `role/<role>[name="<accessible name>"]`. Aspas simples também funcionam, e uma aspa dentro do nome é escapada com uma barra invertida: `role/button[name="Say \"hi\""]`.

- O nome deve corresponder ao nome acessível completo.
- O papel deve ser um papel ARIA. Um erro de digitação falha indicando o papel válido mais próximo, por exemplo `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` e seu nome ARIA 1.3 `image` são o mesmo papel.
- O seletor segue o [modo estrito](#strict-mode) de `$`, como todos os outros seletores.

Em uma sessão [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), o WebdriverIO passa o papel e o nome para o [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). O próprio navegador calcula ambos, da mesma forma que a tecnologia assistiva vê a página. Elementos dentro de shadow roots abertos e dentro de frames, incluindo frames de outra origem, são encontrados. Se o navegador não encontrar nenhum elemento, não há fallback para uma heurística. Observe que é o navegador quem decide o papel: por exemplo, uma `<table>` sem cabeçalhos ou legenda pode ser uma tabela de layout, e suas linhas então não têm o papel `row`.

Em uma sessão WebDriver Classic, e quando um navegador não suporta o locator por papel, o WebdriverIO calcula o papel e o nome acessível na página com o [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), a implementação que o Testing Library usa. Um campo de texto sem rótulo é nomeado pelo seu `placeholder`, como os navegadores fazem. O seletor por papel não está disponível em um contexto de app mobile nativo. Use um [accessibility id](#accessibility-id) nesse caso.

## ARIA - Atributo Role

Para consultar elementos com base em [papéis ARIA](https://www.w3.org/TR/html-aria/#docconformance), você pode especificar diretamente o papel do elemento, como `[role=button]`, como parâmetro do seletor. Esse seletor aproxima o papel a partir do nome do elemento e de seus atributos. Prefira o [seletor por papel](#role-selector), que usa o papel calculado pelo navegador e também pode corresponder ao nome acessível:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Atributo ID

A estratégia de localização "id" não é suportada no protocolo WebDriver; deve-se usar as estratégias de seletor CSS ou xPath para encontrar elementos usando ID.

No entanto, alguns drivers (por exemplo, o [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ainda podem [suportar](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) esse seletor.

As sintaxes de seletor atualmente suportadas para ID são:

```js
//locator css
const button = await $('#someid')
//locator xpath
const button = await $('//*[@id="someid"]')
//estratégia id
// Observação: funciona apenas no Appium ou em frameworks semelhantes que suportam a estratégia de localização "ID"
const button = await $('id=resource-id/iosname')
```

## Função JS

Você também pode usar funções JavaScript para buscar elementos usando APIs nativas da web. Claro, você só pode fazer isso dentro de um contexto web (por exemplo, `browser`, ou contexto web no mobile).

Dada a seguinte estrutura HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Você pode consultar o elemento irmão de `#elem` da seguinte forma:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Seletores Profundos

:::warning

A partir da `v9` do WebdriverIO, não há necessidade desse seletor especial, pois o WebdriverIO atravessa automaticamente o Shadow DOM para você. Recomenda-se migrar deste seletor removendo o `>>>` na frente dele.

:::

Muitas aplicações frontend dependem fortemente de elementos com [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). É tecnicamente impossível consultar elementos dentro do shadow DOM sem workarounds. Os comandos [`shadow$`](https://webdriver.io/docs/api/element/shadow$) e [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) foram esses workarounds, que tinham suas [limitações](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). Com o seletor profundo, agora você pode consultar todos os elementos dentro de qualquer shadow DOM usando o comando de consulta comum.

Suponha que temos uma aplicação com a seguinte estrutura:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Com esse seletor, você pode consultar o elemento `<button />` que está aninhado dentro de outro shadow DOM, por exemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Seletores Mobile

Para testes mobile híbridos, é importante que o servidor de automação esteja no *contexto* correto antes de executar comandos. Para automatizar gestos, o driver idealmente deve estar definido no contexto nativo. Mas, para selecionar elementos do DOM, o driver precisará estar definido no contexto de webview da plataforma. Só *então* os métodos mencionados acima podem ser usados.

Para testes mobile nativos, não há troca entre contextos, pois você precisa usar estratégias mobile e utilizar diretamente a tecnologia de automação subjacente do dispositivo. Isso é especialmente útil quando um teste precisa de um controle refinado sobre como encontrar elementos.

### Android UiAutomator

O framework UI Automator do Android oferece várias maneiras de encontrar elementos. Você pode usar a [API do UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), em particular a [classe UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), para localizar elementos. No Appium, você envia o código Java, como uma string, para o servidor, que o executa no ambiente da aplicação, retornando o elemento ou os elementos.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher e ViewMatcher (somente Espresso)

A estratégia DataMatcher do Android oferece uma maneira de encontrar elementos por [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

E, de forma semelhante, por [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (somente Espresso)

A estratégia view tag oferece uma maneira conveniente de encontrar elementos pela sua [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29).

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Ao automatizar uma aplicação iOS, o [framework UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) da Apple pode ser usado para encontrar elementos.

Essa [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript possui métodos para acessar a view e tudo o que há nela.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Você também pode usar buscas por predicados dentro do iOS UI Automation no Appium para refinar ainda mais a seleção de elementos. Veja [aqui](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) para mais detalhes.

### iOS XCUITest predicate strings e class chains

Com o iOS 10 e superior (usando o driver `XCUITest`), você pode usar [predicate strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

E [class chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

A estratégia de localização `accessibility id` foi projetada para ler um identificador único de um elemento de UI. Isso tem a vantagem de não mudar durante a localização (tradução) ou qualquer outro processo que possa alterar o texto. Além disso, pode ajudar na criação de testes multiplataforma, se elementos funcionalmente iguais tiverem o mesmo accessibility id.

- Para iOS, este é o `accessibility identifier` descrito pela Apple [aqui](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Para Android, o `accessibility id` corresponde ao `content-description` do elemento, conforme descrito [aqui](https://developer.android.com/training/accessibility/accessible-app.html).

Para ambas as plataformas, obter um elemento (ou vários elementos) pelo seu `accessibility id` geralmente é o melhor método. Também é a forma preferida em relação à estratégia `name`, que está obsoleta.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

A estratégia `class name` é uma `string` que representa um elemento de UI na view atual.

- Para iOS, é o nome completo de uma [classe UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) e começa com `UIA-`, como `UIATextField` para um campo de texto. Uma referência completa pode ser encontrada [aqui](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Para Android, é o nome totalmente qualificado de uma [classe](https://developer.android.com/reference/android/widget/package-summary.html) do [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), como `android.widget.EditText` para um campo de texto. Uma referência completa pode ser encontrada [aqui](https://developer.android.com/reference/android/widget/package-summary.html).
- Para Youi.tv, é o nome completo de uma classe Youi.tv e começa com `CYI-`, como `CYIPushButtonView` para um elemento push button. Uma referência completa pode ser encontrada na [página do GitHub do You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// exemplo iOS
await $('UIATextField').click()
// exemplo Android
await $('android.widget.DatePicker').click()
// exemplo Youi.tv
await $('CYIPushButtonView').click()
```

## Seletores Encadeados

Se você quiser ser mais específico na sua consulta, pode encadear seletores até encontrar o elemento
certo. Se você chamar `element` antes do seu comando propriamente dito, o WebdriverIO inicia a consulta a partir desse elemento.

Por exemplo, se você tiver uma estrutura DOM como:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

E quiser adicionar o produto B ao carrinho, seria difícil fazer isso usando apenas o seletor CSS.

Com o encadeamento de seletores, é muito mais fácil. Basta restringir o elemento desejado passo a passo:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Seletor de Imagem do Appium

Usando a estratégia de localização `-image`, é possível enviar ao Appium um arquivo de imagem que representa o elemento que você deseja acessar.

Formatos de arquivo suportados: `jpg,png,gif,bmp,svg`

A referência completa pode ser encontrada [aqui](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Observação**: A forma como o Appium trabalha com esse seletor é que ele internamente faz uma captura de tela (do app) e usa o seletor de imagem fornecido
para verificar se o elemento pode ser encontrado nessa captura de tela (do app).

Esteja ciente de que o Appium pode redimensionar a captura de tela (do app) feita para corresponder ao tamanho CSS da sua tela (do app) (isso acontecerá
em iPhones, mas também em Macs com tela Retina, porque o DPR é maior que 1). Isso fará com que nenhuma correspondência seja encontrada, porque
o seletor de imagem fornecido pode ter sido obtido a partir da captura de tela original.
Você pode corrigir isso atualizando as configurações do Appium Server; veja a [documentação do Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
para as configurações e [este comentário](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) para uma explicação detalhada.

## Seletores React

O WebdriverIO oferece uma maneira de selecionar componentes React com base no nome do componente. Para isso, você pode escolher entre dois comandos: `react$` e `react$$`.

Esses comandos permitem selecionar componentes a partir do [VirtualDOM do React](https://reactjs.org/docs/faq-internals.html) e retornam um único Element do WebdriverIO ou um array de elementos (dependendo da função utilizada).

**Observação**: Os comandos `react$` e `react$$` têm funcionalidade semelhante, exceto que `react$$` retornará *todas* as instâncias correspondentes como um array de elementos do WebdriverIO, e `react$` retornará a primeira instância encontrada.

Os comandos funcionam com React 16 a 19, para um app que inicia com `createRoot` ou com `ReactDOM.render`. Eles leem os componentes da renderização atual, então também encontram componentes adicionados por uma mudança de estado. Se o React ainda não renderizou uma raiz da página, eles aguardam até 5 segundos por ela.

#### Exemplo básico

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

No código acima, há uma instância simples de `MyComponent` dentro da aplicação, que o React está renderizando dentro de um elemento HTML com `id="root"`.

Com o comando `browser.react$`, você pode selecionar uma instância de `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Agora que você tem o elemento do WebdriverIO armazenado na variável `myCmp`, pode executar comandos de elemento sobre ele.

#### Filtrando componentes

Você pode filtrar sua seleção pelas props e/ou pelo state do componente. Para isso, passe `props` e/ou `state` no segundo argumento do comando.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Se você quiser selecionar a instância de `MyComponent` que tem a prop `name` igual a `WebdriverIO`, pode executar o comando assim:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Se você quisesse filtrar a seleção pelo state, o comando `browser` ficaria mais ou menos assim:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Um filtro corresponde quando cada uma de suas chaves que o componente também possui corresponde. Uma chave que o componente não possui é ignorada. Um objeto aninhado corresponde da mesma forma, e um array corresponde quando tem um valor em comum com o array do componente. `null`, `false` e `0` correspondem ao mesmo valor. Para um componente de função com hooks, o state é o state do primeiro hook (`useState` ou `useReducer`): se o primeiro hook for outro hook, por exemplo `useRef`, o filtro de state não corresponde. Com `props` e `state` juntos, um componente deve corresponder a ambos.

#### Regras do seletor

- `*` corresponde a um ou mais caracteres: `browser.react$$('My*')` encontra `MyComponent` e `MyOtherComponent`.
- Nomes separados por espaços encontram um componente dentro de outro: `browser.react$$('List Item')` encontra cada `Item` dentro de uma `List`.
- O nome de um componente é seu `displayName` ou, caso contrário, o nome de sua função ou classe. Um componente de `React.memo` tem o nome de sua função (a build de desenvolvimento do React 17 também lhe dá o `displayName` do objeto memo). Um componente de `React.forwardRef` não tem nome, a menos que tenha um `displayName`.
- Para um higher-order component com um nome como `withRouter(MyComponent)`, o nome dentro dos parênteses é usado: `MyComponent`.
- Sem um escopo de elemento, os comandos pesquisam todas as raízes React da página, na ordem do documento, incluindo raízes dentro de outras raízes e raízes em shadow roots abertos. `react$` retorna a primeira correspondência. Para pesquisar apenas uma raiz, chame o comando no seu container ou em um elemento dessa raiz: `$('#other-root').react$$('MyComponent')`.
- Os resultados vêm raiz após raiz. Dentro de uma raiz, eles vêm na ordem da árvore de componentes, nível por nível, e não na ordem do documento. `react$$` retorna cada nó DOM uma única vez.
- Para um app em um frame, chame o comando no browsing context do frame ou em um elemento do frame: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Limitações conhecidas:

- Um componente que renderiza apenas texto gera um nó de texto. Com o WebDriver Classic, um nó de texto não pode ser retornado, e o comando falha com `javascript error: circular reference`.
- Enquanto o React hidrata uma boundary `Suspense` de uma página renderizada no servidor, os componentes dentro dela ainda não existem. Aguarde até que a página termine de hidratar.

#### Lidando com `React.Fragment`

Ao usar o comando `react$` para selecionar [fragments](https://reactjs.org/docs/fragments.html) do React, o WebdriverIO retornará o primeiro filho desse componente como o nó do componente. Se você usar `react$$`, receberá um array contendo todos os nós HTML dentro dos fragments que correspondem ao seletor.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Dado o exemplo acima, é assim que os comandos funcionariam:

```js
await browser.react$('MyComponent') // retorna o Element do WebdriverIO para o primeiro <div />
await browser.react$$('MyComponent') // retorna os Elements do WebdriverIO para o array [<div />, <div />]
```

**Observação:** Se você tiver várias instâncias de `MyComponent` e usar `react$$` para selecionar esses componentes fragment, receberá um array unidimensional com todos os nós. Em outras palavras, se você tiver 3 instâncias de `<MyComponent />`, receberá um array com seis elementos do WebdriverIO.

## Estratégias de Seletor Personalizadas


Se o seu app exigir uma forma específica de buscar elementos, você pode definir uma estratégia de seletor personalizada para usar com `custom$` e `custom$$`. Para isso, registre sua estratégia uma vez no início do teste, por exemplo em um hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Dado o seguinte trecho de HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Em seguida, use-a chamando:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Observação:** isso só funciona em um ambiente web no qual o comando [`execute`](/docs/api/browser/execute) possa ser executado.