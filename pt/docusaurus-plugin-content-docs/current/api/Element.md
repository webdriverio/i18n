---
id: element
title: O Objeto Element
---

Um Objeto Element é um objeto que representa um elemento no agente de usuário remoto, por exemplo, um [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) ao executar uma sessão em um navegador ou [um elemento móvel](https://developer.apple.com/documentation/swift/sequence/element) para dispositivos móveis. Ele pode ser recebido usando um dos muitos comandos de consulta de elementos, por exemplo, [`$`](/docs/api/element/$), [`custom$`](/docs/api/element/custom$), [`react$`](/docs/api/element/react$) ou [`shadow$`](/docs/api/element/shadow$).

## Propriedades

Um objeto element possui as seguintes propriedades:

| Nome | Tipo | Detalhes |
| ---- | ---- | ------- |
| `sessionId` | `String` | ID de sessão atribuído pelo servidor remoto. |
| `elementId` | `String` | [Referência do elemento web](https://w3c.github.io/webdriver/#elements) associada que pode ser usada para interagir com o elemento no nível do protocolo |
| `selector` | `String` | [Seletor](/docs/selectors) usado para consultar o elemento. |
| `parent` | `Object` | Pode ser o [Objeto Browser](/docs/api/browser) quando o elemento foi buscado a partir dele (por exemplo, `const elem = browser.$('selector')`) ou um [Objeto Element](/docs/api/element) se foi buscado a partir do escopo de um elemento (por exemplo, `elem.$('selector')`) |
| `options` | `Object` | [Opções](/docs/configuration) do WebdriverIO dependendo de como o objeto do navegador foi criado. Veja mais em [tipos de configuração](/docs/setuptypes). |

## Métodos
Um objeto element fornece todos os métodos da seção de protocolo, por exemplo, protocolo [WebDriver](/docs/api/webdriver), bem como comandos listados na seção de elementos. Os comandos de protocolo disponíveis dependem do tipo de sessão. Se você executar uma sessão de navegador automatizada, nenhum dos comandos [Appium](/docs/api/appium) estará disponível e vice-versa.

Além disso, os seguintes comandos estão disponíveis:

| Nome | Parâmetros | Detalhes |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite definir comandos personalizados que podem ser chamados a partir do objeto browser para fins de composição. Leia mais no guia [Comando Personalizado](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Tipo: `String`)<br />- `fn` (Tipo: `Function`) | Permite sobrescrever qualquer comando do navegador com funcionalidade personalizada. Use com cuidado, pois pode confundir os usuários do framework. Leia mais no guia [Comando Personalizado](/docs/customcommands#overwriting-native-commands). |

## Observações

### Encadeamento de Elementos

Ao trabalhar com elementos, o WebdriverIO fornece uma sintaxe especial para simplificar a consulta e compor pesquisas complexas de elementos aninhados. Como os objetos de elemento permitem que você encontre elementos dentro de sua ramificação na árvore usando métodos de consulta comuns, os usuários podem buscar elementos aninhados da seguinte forma:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // exibe "I am a headline"
```

Com estruturas profundamente aninhadas, atribuir qualquer elemento aninhado a uma array para então usá-lo pode ser bastante verboso. Portanto, o WebdriverIO tem o conceito de consultas de elementos encadeados que permitem buscar elementos aninhados assim:

```js
console.log(await $('#header').$('#headline').getText())
```

Isso também funciona ao buscar um conjunto de elementos, por exemplo:

```js
// obter o texto do 3º título dentro do 2º cabeçalho
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

Ao trabalhar com um conjunto de elementos, isso pode ser especialmente útil quando se tenta interagir com eles, então em vez de fazer:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

Você pode chamar métodos Array diretamente no encadeamento de elementos, por exemplo:

```js
const location = await $$('div').map((el) => el.getLocation())
```

o mesmo que:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

O WebdriverIO usa uma implementação personalizada que suporta iteradores assíncronos internamente, portanto, todos os comandos de sua API também são suportados para esses casos de uso.

__Nota:__ todos os iteradores assíncronos retornam uma promessa mesmo que seu callback não retorne uma, por exemplo:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ retorna "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ retorna "string[]"
```

### Comandos Personalizados

Você pode definir comandos personalizados no escopo do navegador para abstrair fluxos de trabalho que são comumente usados. Consulte nosso guia sobre [Comandos Personalizados](/docs/customcommands#adding-custom-commands) para obter mais informações.