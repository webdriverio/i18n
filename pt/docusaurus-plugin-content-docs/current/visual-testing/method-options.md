---
id: method-options
title: Opções de Método
---

As opções de métodos são as opções que podem ser definidas por [método](./methods). Se a opção tiver a mesma chave que uma opção que foi definida durante a instanciação do plugin, esta opção de método substituirá o valor da opção do plugin.

:::info NOTA

-   Todas as opções das [Opções de Salvamento](#save-options) podem ser usadas para os métodos de [Comparação](#compare-check-options)
-   Todas as opções de comparação podem ser usadas durante a instanciação do serviço __ou__ para cada método de verificação individual. Se uma opção de método tiver a mesma chave que uma opção que foi definida durante a instanciação do serviço, então a opção de comparação do método substituirá o valor da opção de comparação do serviço.
- Todas as opções podem ser usadas para os contextos de aplicação abaixo, a menos que mencionado de outra forma:
    - Web
    - Aplicativo Híbrido
    - Aplicativo Nativo
- Os exemplos abaixo são com os métodos `save*`, mas também podem ser usados com os métodos `check*`

:::

## Opções de Salvamento

### `disableBlinkingCursor`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ativar/Desativar o "piscar" do cursor em todos os elementos `input`, `textarea`, `[contenteditable]` na aplicação. Se definido como `true`, o cursor será definido como `transparent` antes de tirar uma captura de tela
e redefinido quando concluído.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ativar/Desativar todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de tirar uma captura de tela
e redefinidas quando concluído

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Use esta opção para voltar ao método de captura de tela "mais antigo" baseado no protocolo W3C-WebDriver. Isso pode ser útil se seus testes dependem de imagens de linha de base existentes ou se você está executando em ambientes que não suportam totalmente as capturas de tela baseadas em BiDi mais recentes.
Observe que habilitar isso pode produzir capturas de tela com resolução ou qualidade ligeiramente diferentes.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Isso ocultará todo o texto em uma página para que apenas o layout seja usado para comparação. A ocultação será feita adicionando o estilo `'color': 'transparent !important'` a __cada__ elemento.

Para a saída, veja [Saída de Teste](./test-output#enablelayouttesting).

:::info
Ao usar esta flag, cada elemento que contém texto (não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá esta propriedade. __Não__ há opção para personalizar isso.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `true`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ocultar barra(s) de rolagem na aplicação. Se definido como true, todas as barra(s) de rolagem serão desativadas antes de tirar uma captura de tela. Isso é definido como `true` por padrão para evitar problemas extras.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Tipo:** `array`
- **Obrigatório:** Não
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Este método pode ocultar 1 ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **Tipo:** `array`
- **Obrigatório:** Não
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Este método pode _remover_ 1 ou vários elementos adicionando a propriedade `display: none` a eles, fornecendo um array de elementos.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **Tipo:** `object`
- **Obrigatório:** Não
- **Padrão:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Usado com:** Apenas para [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Um objeto que precisa conter uma quantidade de pixels `top`, `right`, `bottom` e `left` que precisam tornar o recorte do elemento maior.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `false`
- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) ou [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Quando definido como `true`, esta opção habilita a **estratégia de rolagem e costura** para capturar capturas de tela de página inteira.
Em vez de usar os recursos nativos de captura de tela do navegador, ele rola pela página manualmente e costura várias capturas de tela juntas.
Este método é especialmente útil para páginas com **conteúdo carregado preguiçosamente** ou layouts complexos que exigem rolagem para renderização completa.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Tipo:** `number`
- **Obrigatório:** Não
- **Padrão:** `1500`
- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

O tempo limite em milissegundos para esperar após uma rolagem. Isso pode ajudar a identificar páginas com carregamento preguiçoso.

> **NOTA:** Isso só funciona quando `userBasedFullPageScreenshot` está definido como `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Tipo:** `array`
- **Obrigatório:** Não
- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Este método ocultará um ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.
Isso será útil quando uma página, por exemplo, tiver elementos fixos que rolam com a página se a página for rolada, mas darão um efeito irritante quando uma captura de tela de página inteira for feita

> **NOTA:** Isso só funciona quando `userBasedFullPageScreenshot` está definido como `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **Tipo:** `boolean`
- **Obrigatório:** Não
- **Padrão:** `true`
- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas depois que o WebdriverIO determinar que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará que todas as fontes sejam carregadas antes de tirar uma captura de tela.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Opções de Comparação (Verificação)

As opções de comparação são opções que influenciam a forma como a comparação, pelo [ResembleJS](https://github.com/Huddle/Resemble.js), é executada.

### `ignoreAlpha`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Compara imagens e descarta o canal alfa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Tipo:** `boolean`
- **Padrão:** `true`
- **Obrigatório:** Não
- **Usado com:** _Pode ser usado apenas para `checkScreen()`. Isso é **apenas para iPad**_
- **Contextos de Aplicação Suportados:** Todos

Bloqueia automaticamente a barra lateral para iPads no modo paisagem durante as comparações. Isso evita falhas no componente nativo de guia/privado/favoritos.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Tipo:** `boolean`
- **Padrão:** `true`
- **Obrigatório:** Não
- **Usado com:** _Isso é **apenas para Mobile**_
- **Contextos de Aplicação Suportados:** Híbrido (parte nativa) e Aplicativos Nativos

Bloqueia automaticamente a barra de status e a barra de endereço durante as comparações. Isso evita falhas no tempo, status de Wi-Fi ou bateria.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Tipo:** `boolean`
- **Padrão:** `true`
- **Obrigatório:** Não
- **Usado com:** _Isso é **apenas para Mobile**_
- **Contextos de Aplicação Suportados:** Híbrido (parte nativa) e Aplicativos Nativos

Bloqueia automaticamente a barra de ferramentas.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Compara imagens e descarta o anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Mesmo que as imagens estejam em cores, a comparação comparará 2 imagens em preto e branco

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Compara imagens e compara com `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Compara imagens e compara com `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Se verdadeiro, a porcentagem de retorno será como `0.12345678`, o padrão é `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Isso retornará todos os dados de comparação, não apenas a porcentagem de incompatibilidade, veja também [Saída do Console](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Tipo:** `number`
- **Padrão:** `0`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Valor admissível de `misMatchPercentage` que impede o salvamento de imagens com diferenças

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Tipo:** `number`
- **Padrão:** `0`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Comparar imagens grandes pode levar a problemas de desempenho.
Ao fornecer um número para o número de pixels aqui (maior que 0), o algoritmo de comparação pula pixels quando a largura ou altura da imagem é maior que `largeImageThreshold` pixels.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Tipo:** `boolean`
- **Padrão:** `false`
- **Obrigatório:** Não
- **Usado com:** Todos os [Métodos de Verificação](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Redimensiona 2 imagens para o mesmo tamanho antes da execução da comparação. Altamente recomendado habilitar `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Tipo:** `array`
- **Obrigatório:** Não
- **Usado com:** Apenas com o método `checkScreen`, **NÃO** com o método `checkElement`
- **Contextos de Aplicação Suportados:** Aplicativo Nativo

Este método bloqueará automaticamente elementos ou uma área na tela com base em um array de elementos ou um objeto de `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## Opções de pasta

A pasta de linha de base e as pastas de captura de tela (atual, diff) são opções que podem ser definidas durante a instanciação do plugin ou método. Para definir as opções de pasta em um método específico, passe as opções de pasta para o objeto de opções dos métodos. Isso pode ser usado para:

- Web
- Aplicativo Híbrido
- Aplicativo Nativo

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

- **Tipo:** `string`
- **Obrigatório:** Não
- **Contextos de Aplicação Suportados:** Todos

Pasta para a captura que foi capturada no teste.

### `baselineFolder`

- **Tipo:** `string`
- **Obrigatório:** Não
- **Contextos de Aplicação Suportados:** Todos

Pasta para a imagem de linha de base que está sendo usada para comparação.

### `diffFolder`

- **Tipo:** `string`
- **Obrigatório:** Não
- **Contextos de Aplicação Suportados:** Todos

Pasta para a diferença de imagem renderizada pelo ResembleJS.