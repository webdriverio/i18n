---
id: method-options
title: Opções de Método
---

As opções de métodos são as opções que podem ser definidas por [método](./methods). Se a opção tiver a mesma chave que uma opção que foi definida durante a instanciação do plugin, esta opção de método substituirá o valor da opção do plugin.

## Opções de Salvamento

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Suportado:** Web, Aplicativo Híbrido (Webview)

Ativa/Desativa o "piscar" do cursor em todos os `input`, `textarea`, `[contenteditable]` na aplicação. Se definido como `true`, o cursor será definido como `transparent` antes de tirar uma captura de tela
e restaurado quando concluído

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Suportado:** Web, Aplicativo Híbrido (Webview)

Ativa/Desativa todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de tirar uma captura de tela
e restauradas quando concluído

### `enableLegacyScreenshotMethod`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Suportado:** Web, Aplicativo Híbrido (Webview)

Use esta opção para voltar ao método de captura de tela "mais antigo" baseado no protocolo W3C-WebDriver. Isso pode ser útil se seus testes dependem de imagens de linha de base existentes ou se você está executando em ambientes que não suportam totalmente as capturas de tela baseadas em BiDi mais recentes.
Observe que habilitar isso pode produzir capturas de tela com resolução ou qualidade ligeiramente diferentes.

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Usado com:** Todos os [métodos](./methods)
-   **Suportado:** Web

Isso ocultará todo o texto em uma página para que apenas o layout seja usado para comparação. A ocultação será feita adicionando o estilo `'color': 'transparent !important'` a __cada__ elemento.

Para a saída, veja [Saída de Teste](./test-output#enablelayouttesting)

:::info
Ao usar esta flag, cada elemento que contém texto (não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá esta propriedade. Não há __nenhuma__ opção para personalizar isso.
:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Usado com:** Todos os [métodos](./methods)
-   **Suportado:** Web, Aplicativo Híbrido (Webview)

Oculta barras de rolagem na aplicação. Se definido como true, todas as barras de rolagem serão desativadas antes de tirar uma captura de tela. Isso é definido como padrão `true` para evitar problemas extras.

### `hideElements`

-   **Tipo:** `array`
-   **Obrigatório:** não
-   **Usado com:** Todos os [métodos](./methods)
-   **Suportado:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Este método pode ocultar 1 ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.

### `removeElements`

-   **Tipo:** `array`
-   **Obrigatório:** não
-   **Usado com:** Todos os [métodos](./methods)
-   **Suportado:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Este método pode _remover_ 1 ou vários elementos adicionando a propriedade `display: none` a eles, fornecendo um array de elementos.

### `resizeDimensions`

-   **Tipo:** `object`
-   **Obrigatório:** não
-   **Padrão:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Usado com:** Apenas para [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
-   **Suportado:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Um objeto que precisa conter uma quantidade de pixels `top`, `right`, `bottom` e `left` que precisam tornar o recorte do elemento maior.

### `userBasedFullPageScreenshot`

* **Tipo:** `boolean`
* **Obrigatório:** Não
* **Padrão:** `false`
* **Suportado:** Web, Aplicativo Híbrido (Webview)

Quando definido como `true`, esta opção habilita a **estratégia de rolagem e costura** para capturar capturas de tela de página inteira.
Em vez de usar os recursos nativos de captura de tela do navegador, ele rola pela página manualmente e costura várias capturas de tela juntas.
Este método é especialmente útil para páginas com **conteúdo carregado lentamente** ou layouts complexos que exigem rolagem para renderizar completamente.

### `fullPageScrollTimeout`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `1500`
-   **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
-   **Suportado:** Web

O tempo limite em milissegundos para aguardar após uma rolagem. Isso pode ajudar a identificar páginas com carregamento lento.

> **NOTA:** Isso só funciona quando `userBasedFullPageScreenshot` está definido como `true`

### `hideAfterFirstScroll`

-   **Tipo:** `array`
-   **Obrigatório:** não
-   **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
-   **Suportado:** Web

Este método ocultará um ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.
Isso será útil quando uma página, por exemplo, contém elementos fixos que rolam com a página quando a página é rolada, mas darão um efeito irritante quando uma captura de tela de página inteira é feita

> **NOTA:** Isso só funciona quando `userBasedFullPageScreenshot` está definido como `true`

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Usado com:** Todos os [métodos](./methods)
-   **Suportado:** Web, Aplicativo Híbrido (Webview)

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas após o WebdriverIO determinar que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará que todas as fontes sejam carregadas antes de tirar uma captura de tela.

## Opções de Comparação (Verificação)

As opções de comparação são opções que influenciam a maneira como a comparação, feita pelo [ResembleJS](https://github.com/Huddle/Resemble.js), é executada.

:::info NOTA

-   Todas as opções de [Opções de Salvamento](#opções-de-salvamento) podem ser usadas para os métodos de Comparação
-   Todas as opções de comparação podem ser usadas durante a instanciação do serviço __ou__ para cada método de verificação individual. Se uma opção de método tiver a mesma chave que uma opção definida durante a instanciação do serviço, então a opção de comparação do método substituirá o valor da opção de comparação do serviço.
- Todas as opções podem ser usadas para:
    - Web
    - Aplicativo Híbrido
    - Aplicativo Nativo

:::

### `ignoreAlpha`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Compara imagens e descarta alfa.

### `blockOutSideBar`

-   **Tipo:** `boolean`
-   **Padrão:** `true`
-   **Obrigatório:** não
-   **Observação:** _Só pode ser usado para `checkScreen()`. Isso é **apenas para iPad**_

Bloqueia automaticamente a barra lateral para iPads no modo paisagem durante comparações. Isso evita falhas no componente nativo de abas/privado/favoritos.

### `blockOutStatusBar`

-   **Tipo:** `boolean`
-   **Padrão:** `true`
-   **Obrigatório:** não
-   **Observação:** _Isso é **apenas para Mobile**_

Bloqueia automaticamente a barra de status e a barra de endereço durante comparações. Isso evita falhas devido a horário, wifi ou status da bateria.

### `blockOutToolBar`

-   **Tipo:** `boolean`
-   **Padrão:** `true`
-   **Obrigatório:** não
-   **Observação:** _Isso é **apenas para Mobile**_

Bloqueia automaticamente a barra de ferramentas.

### `ignoreAntialiasing`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Compara imagens e descarta anti-aliasing.

### `ignoreColors`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Mesmo que as imagens estejam em cores, a comparação irá comparar 2 imagens em preto/branco

### `ignoreLess`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Compara imagens e compara com `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Compara imagens e compara com `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Se true, a porcentagem de retorno será como `0.12345678`, o padrão é `0.12`

### `returnAllCompareData`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Isso retornará todos os dados de comparação, não apenas a porcentagem de incompatibilidade

### `saveAboveTolerance`

-   **Tipo:** `number`
-   **Padrão:** `0`
-   **Obrigatório:** não

Valor permitido de `misMatchPercentage` que impede o salvamento de imagens com diferenças

### `largeImageThreshold`

-   **Tipo:** `number`
-   **Padrão:** `0`
-   **Obrigatório:** não

Comparar imagens grandes pode levar a problemas de desempenho.
Ao fornecer um número para o número de pixels aqui (maior que 0), o algoritmo de comparação pula pixels quando a largura ou altura da imagem é maior que `largeImageThreshold` pixels.

### `scaleImagesToSameSize`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não

Escala 2 imagens para o mesmo tamanho antes da execução da comparação. Altamente recomendado ativar `ignoreAntialiasing` e `ignoreAlpha`

## Opções de pasta

A pasta de linha de base e as pastas de captura de tela (atual, diferença) são opções que podem ser definidas durante a instanciação do plugin ou método. Para definir as opções de pasta em um método específico, passe as opções de pasta para o objeto de opções dos métodos. Isso pode ser usado para:

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

-   **Tipo:** `string`
-   **Obrigatório:** não

Pasta para a captura que foi capturada no teste.

### `baselineFolder`

-   **Tipo:** `string`
-   **Obrigatório:** não

Pasta para a imagem de linha de base que está sendo usada para comparar.

### `diffFolder`

-   **Tipo:** `string`
-   **Obrigatório:** não

Pasta para a diferença de imagem renderizada pelo ResembleJS.