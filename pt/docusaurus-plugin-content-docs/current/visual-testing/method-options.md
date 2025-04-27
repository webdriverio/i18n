---
id: method-options
title: Opções de Métodos
---

Methods options são as opções que podem ser definidas por [método](./methods). Se a opção tiver a mesma chave que uma opção que foi definida durante a instanciação do plugin, esta opção de método irá sobrescrever o valor da opção do plugin.

## Opções de Salvamento

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Ativa/Desativa o cursor "piscante" de todos os elementos `input`, `textarea`, `[contenteditable]` na aplicação. Se definido como `true`, o cursor será configurado como `transparent` antes de tirar uma captura de tela
e será restaurado quando concluído

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Ativa/Desativa todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de tirar uma captura de tela
e restauradas quando concluído

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** Todos os [métodos](./methods)
-   **Supported:** Web

Isso ocultará todo o texto em uma página para que apenas o layout seja usado para comparação. A ocultação será feita adicionando o estilo `'color': 'transparent !important'` a __cada__ elemento.

Para ver a saída, consulte [Test Output](./test-output#enablelayouttesting)

:::info
Ao usar esta flag, cada elemento que contém texto (não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá esta propriedade. __Não__ há opção para personalizar isso.
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** Todos os [métodos](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Oculta as barras de rolagem na aplicação. Se definido como true, todas as barras de rolagem serão desativadas antes de tirar uma captura de tela. Isso é definido como `true` por padrão para evitar problemas adicionais.

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Todos os [métodos](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Este método pode ocultar 1 ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Todos os [métodos](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Este método pode _remover_ 1 ou vários elementos adicionando a propriedade `display: none` a eles, fornecendo um array de elementos.

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Apenas para [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

Um objeto que precisa conter uma quantidade de pixels `top`, `right`, `bottom` e `left` que precisam tornar o recorte do elemento maior.

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

O tempo limite em milissegundos para aguardar após uma rolagem. Isso pode ajudar a identificar páginas com carregamento preguiçoso.

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Este método ocultará um ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.
Isso será útil quando uma página, por exemplo, mantém elementos fixos que rolam com a página quando a página é rolada, mas darão um efeito irritante quando uma captura de tela de página inteira é feita

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** Todos os [métodos](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas depois que o WebdriverIO determina que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará o carregamento de todas as fontes antes de tirar uma captura de tela.

## Opções de Comparação (Verificação)

As opções de comparação são opções que influenciam a maneira como a comparação, pelo [ResembleJS](https://github.com/Huddle/Resemble.js), é executada.

:::info NOTA

-   Todas as opções das [Opções de Salvamento](#save-options) podem ser usadas para os métodos de Comparação
-   Todas as opções de comparação podem ser usadas durante a instanciação do serviço __ou__ para cada método de verificação individual. Se uma opção de método tiver a mesma chave que uma opção definida durante a instanciação do serviço, então a opção de comparação do método sobrescreverá o valor da opção de comparação do serviço.
- Todas as opções podem ser usadas para:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Compara imagens e descarta o alfa.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Pode ser usado apenas para `checkScreen()`. Isso é **somente para iPad**_

Bloqueia automaticamente a barra lateral para iPads no modo paisagem durante as comparações. Isso evita falhas no componente nativo de guia/privado/favorito.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Isso é **somente para Mobile**_

Bloqueia automaticamente a barra de status e a barra de endereço durante as comparações. Isso evita falhas no horário, status de wifi ou bateria.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Isso é **somente para Mobile**_

Bloqueia automaticamente a barra de ferramentas.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Compara imagens e descarta o anti-aliasing.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Mesmo que as imagens estejam em cores, a comparação comparará 2 imagens em preto e branco

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Compara imagens com configuração `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Compara imagens com configuração `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Se verdadeiro, a porcentagem de retorno será como `0.12345678`, por padrão é `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Isso retornará todos os dados de comparação, não apenas a porcentagem de incompatibilidade

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Valor permitido de `misMatchPercentage` que impede o salvamento de imagens com diferenças

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Comparar imagens grandes pode levar a problemas de desempenho.
Ao fornecer um número para a quantidade de pixels aqui (maior que 0), o algoritmo de comparação pula pixels quando a largura ou altura da imagem é maior que `largeImageThreshold` pixels.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Dimensiona 2 imagens para o mesmo tamanho antes da execução da comparação. Altamente recomendado habilitar `ignoreAntialiasing` e `ignoreAlpha`

## Opções de pasta

A pasta de referência e as pastas de capturas de tela (atual, diferença) são opções que podem ser definidas durante a instanciação do plugin ou método. Para definir as opções de pasta em um método específico, passe as opções de pasta para o objeto de opções dos métodos. Isso pode ser usado para:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Você pode usar isso para todos os métodos
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

Pasta para a captura que foi capturada no teste.

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

Pasta para a imagem de referência que está sendo usada para comparação.

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

Pasta para a diferença de imagem renderizada pelo ResembleJS.