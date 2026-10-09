---
id: method-options
title: Opções de Método
description: "Defina opções de salvamento, comparação e pastas por método para os métodos de teste visual, que substituem as opções definidas no nível do serviço."
---

As opções de método são as opções que podem ser definidas por [método](./methods). Se a opção tiver a mesma chave que uma opção definida durante a instanciação do plugin, essa opção de método substituirá o valor da opção do plugin.

:::info NOTA

-   Todas as opções das [Opções de Salvamento](#save-options) podem ser usadas para os métodos de [Comparação](#compare-check-options)
-   Todas as opções de comparação podem ser usadas durante a instanciação do serviço __ou__ para cada método de verificação individual. Se uma opção de método tiver a mesma chave que uma opção definida durante a instanciação do serviço, a opção de comparação do método substituirá o valor da opção de comparação do serviço.
- Todas as opções podem ser usadas para os contextos de aplicação abaixo, salvo indicação em contrário:
    - Web
    - Hybrid App
    - Native App
- Os exemplos abaixo usam os métodos `save*`, mas também podem ser usados com os métodos `check*`

:::

# Opções de Salvamento

## Exibição e renderização

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Oculta a(s) barra(s) de rolagem na aplicação. Se definido como true, todas as barras de rolagem serão desativadas antes de capturar uma screenshot. O padrão é `true` para evitar problemas extras.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Ativa/desativa o "piscar" do cursor em todos os `input`, `textarea` e `[contenteditable]` na aplicação. Se definido como `true`, o cursor será definido como `transparent` antes de capturar uma screenshot
e restaurado ao final.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Ativa/desativa todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de capturar uma screenshot
e restauradas ao final

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Isso ocultará todo o texto de uma página, de modo que apenas o layout será usado para comparação. A ocultação é feita adicionando o estilo `'color': 'transparent !important'` a __cada__ elemento.

Para a saída, veja [Saída de Teste](./test-output#enablelayouttesting).

:::info
Ao usar essa flag, cada elemento que contém texto (portanto, não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá essa propriedade. __Não__ há opção para personalizar isso.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Use esta opção para voltar ao método de screenshot "mais antigo", baseado no protocolo W3C-WebDriver. Isso pode ser útil se seus testes dependem de imagens de baseline existentes ou se você está executando em ambientes que não suportam totalmente as screenshots mais recentes baseadas em BiDi.
Observe que habilitar essa opção pode produzir screenshots com resolução ou qualidade ligeiramente diferentes.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Padding em pixels do dispositivo adicionado a cada lado das regiões ignoradas, tornando cada região 2× esse valor mais larga e mais alta. Isso ajuda a evitar diferenças de 1 px nas bordas, que podem aparecer em telas com DPR alto ou com o protocolo de screenshot BiDi. Defina como `0` para desativar.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas depois que o WebdriverIO determina que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará o carregamento de todas as fontes antes de capturar uma screenshot.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Visibilidade de elementos

---

### `hideElements`

<Option type="array" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

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

</Option>
### `removeElements`

<Option type="array" required="No">

- **Usado com:** Todos os [métodos](./methods)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

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

</Option>
## Específicas de elemento

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Usado com:** Apenas para [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview), Native App

Um objeto que deve conter uma quantidade de pixels `top`, `right`, `bottom` e `left` para tornar o recorte do elemento maior.

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

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Usado com:** Apenas para [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Opção exclusiva do BiDi que controla qual origem de coordenadas é usada ao capturar screenshots de elementos através do protocolo WebDriver BiDi.

- `'document'` _(padrão)_: renderiza o layout do documento. Funciona para qualquer posição de elemento, mas **não** captura camadas compostas (por exemplo, barras de rolagem, sobreposições fixed/sticky, elementos com `will-change`).
- `'viewport'`: captura o frame composto como foi pintado, incluindo barras de rolagem e sobreposições. Requer que o elemento esteja **totalmente visível** no viewport e lança um erro descritivo quando o elemento está fora do viewport ou é maior que ele.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Específicas de página inteira

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) ou [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Quando definida como `true`, esta opção habilita a **estratégia de rolar e costurar (scroll-and-stitch)** para capturar screenshots de página inteira.
Em vez de usar os recursos nativos de screenshot do navegador, ela rola a página manualmente e costura várias screenshots juntas.
Este método é especialmente útil para páginas com **conteúdo carregado sob demanda (lazy-loaded)** ou layouts complexos que exigem rolagem para serem totalmente renderizados.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

O tempo limite em milissegundos a aguardar após uma rolagem. Isso pode ajudar a identificar páginas com lazy loading.

> **NOTA:** Isso só funciona quando `userBasedFullPageScreenshot` está definido como `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Usado com:** Apenas para [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextos de Aplicação Suportados:** Web, Hybrid App (Webview)

Este método ocultará um ou vários elementos adicionando a propriedade `visibility: hidden` a eles, fornecendo um array de elementos.
Isso é útil quando uma página, por exemplo, contém elementos sticky que rolam junto com a página quando ela é rolada, mas que causam um efeito incômodo quando uma screenshot de página inteira é feita

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

# Opções de Comparação (Check)

As opções de comparação são opções que influenciam a forma como a comparação é executada.

</Option>
## Sensibilidade visual

---

:::info Histórico de versões das opções `ignore*`
Esses presets mudaram de comportamento uma vez, como uma breaking change, quando o mecanismo de comparação passou do ResembleJS (v9 e anteriores) para o Pixelmatch (v10 em diante). Consulte a [tabela de histórico de versões](./compare-options#visual-sensitivity) na página de Opções de Comparação para mais detalhes. Tudo desde a v10.0.0 é indicado com uma nota "Desde" na opção relevante abaixo.
:::

**Ordem "o último vence":** quando mais de uma flag `ignore*` está habilitada ao mesmo tempo, apenas um preset é aplicado, seguindo esta ordem (o posterior vence): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. A partir da `v10.1.0`, um aviso é registrado informando qual preset venceu.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Desde:** `v10.1.0`: comparação apenas de brilho usando os pesos de luma do resemble (`0.3/0.59/0.11`).

Compara apenas o brilho (pesos de luma do resemble `0.3/0.59/0.11`), ignorando diferenças de matiz/cor. Use isso quando se espera que a própria cor varie, mas você ainda quer detectar mudanças de layout ou brilho.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente de outras flags `ignore*`.

Compara imagens e descarta diferenças no canal alfa. Use isso quando a renderização de transparência/opacidade é instável, mas as cores dos pixels por baixo importam.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Desde:** `v10`: o padrão mudou para `true` (era `false` na v9 e anteriores).

Tolera pixels com anti-aliasing durante a comparação. Defina como `false` para uma comparação estrita, em que pixels com anti-aliasing devem contar como divergências. Isso resolve a fonte mais comum de instabilidade em testes visuais: bordas de texto/formas renderizadas com anti-aliasing ligeiramente diferente entre máquinas, mesmo que nada tenha mudado.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente de outras flags `ignore*`.

Compara imagens usando uma tolerância RGB relaxada (~16/255 por canal no espaço YIQ). O anti-aliasing não é tolerado. Use isso para ter um pouco de margem para ruído de renderização (artefatos de compressão, arredondamento de cores) sem tolerar anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente de outras flags `ignore*`.

Usa tolerância zero: qualquer diferença de pixel conta como divergência, incluindo anti-aliasing. Use isso quando você precisa de uma prova pixel-perfect de que absolutamente nada mudou.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos
- **Adicionado em:** `v10.1.0`

Substitui o modo de comparação para uma única chamada `check*` com configurações diretas do [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), em vez de um preset `ignore*`. Use isso quando os presets forem muito genéricos para um teste específico, por exemplo, quando ele precisa de seu próprio valor de threshold ou de uma cor de diff que realmente se destaque no seu relatório. Consulte [Controle direto do pixelmatch](./compare-options#direct-pixelmatch-control) para a referência completa dos campos e o que cada campo resolve.

Não pode ser combinado com opções `ignore*` no mesmo objeto de opções da chamada: isso lança `CompareOptionsConflictError`. No entanto, pode substituir uma configuração de serviço que usa presets `ignore*` (ou vice-versa); um aviso é registrado quando uma chamada de método altera o modo de comparação dessa forma.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Redimensiona 2 imagens para o mesmo tamanho antes da execução da comparação. É altamente recomendado habilitar `ignoreAntialiasing` e `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Bloqueios em dispositivos móveis

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Usado com:** _Isso é **apenas para Mobile**_
- **Contextos de Aplicação Suportados:** Hybrid (parte nativa) e Native Apps

Bloqueia automaticamente a barra de status e a barra de endereço durante as comparações. Isso evita falhas por causa de horário, wifi ou status da bateria.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Usado com:** _Isso é **apenas para Mobile**_
- **Contextos de Aplicação Suportados:** Hybrid (parte nativa) e Native Apps

Bloqueia automaticamente a barra de ferramentas.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Usado com:** _Só pode ser usado para `checkScreen()`. Isso é **apenas para iPad**_
- **Contextos de Aplicação Suportados:** Todos

Bloqueia automaticamente a barra lateral em iPads no modo paisagem durante as comparações. Isso evita falhas no componente nativo de abas/privado/favoritos.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Tratamento de regiões

---

### `blockOut`

<Option type="array" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Um array de áreas retangulares a serem bloqueadas antes da comparação. Cada entrada deve ser um objeto com valores `x`, `y`, `width` e `height` (em pixels). As áreas bloqueadas são pintadas antes de o diff ser calculado, impedindo que essas regiões contribuam para a porcentagem de divergência.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Usado com:** Apenas com o método `checkScreen`, **NÃO** com o método `checkElement`
- **Contextos de Aplicação Suportados:** Native App

Este método bloqueará automaticamente elementos ou uma área da tela com base em um array de elementos ou em um objeto de `x|y|width|height`.

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

</Option>
## Resultados e relatórios

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Se true, a porcentagem retornada será como `0.12345678`; o padrão é `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Isso retornará todos os dados da comparação, não apenas a porcentagem de divergência; veja também [Saída do Console](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

Valor permitido de `misMatchPercentage` que impede o salvamento de imagens com diferenças

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Usado com:** Todos os [métodos Check](./methods#check-methods)
- **Contextos de Aplicação Suportados:** Todos

A proximidade em pixels usada para agrupar pixels de diferença nos relatórios JSON. Valores mais altos agrupam mais pixels em menos caixas delimitadoras; valores mais baixos produzem caixas mais precisas, porém mais numerosas. Relevante apenas quando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) está habilitado.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Opções de pasta

---

A pasta de baseline e as pastas de screenshots (actual, diff) são opções que podem ser definidas durante a instanciação do plugin ou do método. Para definir as opções de pasta em um método específico, passe as opções de pasta para o objeto de opções do método. Isso pode ser usado para:

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

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Pasta para o snapshot capturado no teste.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Pasta para a imagem de baseline usada como referência na comparação.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Pasta para a imagem de diferença renderizada durante a comparação.

</Option>