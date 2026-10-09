---
id: service-options
title: Opções do Serviço
description: "Configure as opções padrão do serviço visual, incluindo captura de screenshots, screenshots de página inteira, baselines, pastas e relatórios."
---

As opções do serviço são as opções que podem ser definidas quando o serviço é instanciado e serão usadas em cada chamada de método.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // As opções
            },
        ],
    ],
    // ...
};
```

# Opções Padrão

## Captura de screenshots

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Oculta as barras de rolagem na aplicação. Se definido como true, todas as barras de rolagem serão desativadas antes de capturar um screenshot. O padrão é `true` para evitar problemas adicionais.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Ativa/Desativa o "piscar" do cursor de todos os `input`, `textarea` e `[contenteditable]` na aplicação. Se definido como `true`, o cursor será definido como `transparent` antes de capturar um screenshot
e restaurado ao final

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Ativa/Desativa todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de capturar um screenshot
e restauradas ao final

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Isso ocultará todo o texto de uma página, de modo que apenas o layout será usado para comparação. A ocultação é feita adicionando o estilo `'color': 'transparent !important'` a **cada** elemento.

Para ver o resultado, consulte [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Ao usar esta flag, cada elemento que contém texto (não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá essa propriedade. **Não** há opção para personalizar isso.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Padding em pixels do dispositivo adicionado a cada lado das regiões ignoradas, tornando cada região 2× esse valor mais larga e mais alta. Isso ajuda a evitar diferenças de 1 px nas bordas que podem aparecer em telas com DPR alto ou com o protocolo de screenshot BiDi. Defina como `0` para desativar.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas depois que o WebdriverIO determinar que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará que todas as fontes sejam carregadas antes de capturar um screenshot.

</Option>
## Screenshots de página inteira

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Por padrão, screenshots de página inteira na web desktop são capturados usando o protocolo WebDriver BiDi, que permite screenshots rápidos, estáveis e consistentes sem rolagem.
Quando userBasedFullPageScreenshot é definido como true, o processo de captura simula um usuário real: rolando pela página, capturando screenshots do tamanho do viewport e juntando-os. Este método é útil para páginas com conteúdo carregado sob demanda (lazy-loading) ou renderização dinâmica que depende da posição de rolagem.

Use esta opção se sua página depende de conteúdo carregado durante a rolagem ou se você deseja preservar o comportamento dos métodos de screenshot mais antigos.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

O tempo limite em milissegundos para aguardar após uma rolagem. Isso pode ajudar a identificar páginas com lazy loading.

:::info

Isso só funcionará quando a opção de serviço/método `userBasedFullPageScreenshot` estiver definida como `true`, veja também [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Mobile e dispositivo

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Defina como `true` ao testar um aplicativo híbrido (um shell nativo com uma ou mais webviews incorporadas). Isso ajusta como o módulo lida com os recortes da barra de status e da barra de endereço para telas baseadas em webview, recorrendo a padrões seguros quando os dados de retângulo nativos do dispositivo não estão disponíveis.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Adiciona cantos de moldura e notch/dynamic island ao screenshot para dispositivos iOS.

:::info NOTA
Isso só pode ser feito quando o nome do dispositivo **PODE** ser determinado automaticamente e corresponde à seguinte lista de nomes de dispositivos normalizados. A normalização será feita por este módulo.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6ª Geração: `ipadmini`
-   iPad Air 4ª Geração: `ipadair`
-   iPad Air 5ª Geração: `ipadair`
-   iPad Pro (11 polegadas) 1ª Geração: `ipadpro11`
-   iPad Pro (11 polegadas) 2ª Geração: `ipadpro11`
-   iPad Pro (11 polegadas) 3ª Geração: `ipadpro11`
-   iPad Pro (12,9 polegadas) 3ª Geração: `ipadpro129`
-   iPad Pro (12,9 polegadas) 4ª Geração: `ipadpro129`
-   iPad Pro (12,9 polegadas) 5ª Geração: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

O padding que precisa ser adicionado à barra de endereço no iOS e Android para fazer um recorte adequado do viewport.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

O padding que precisa ser adicionado à barra de ferramentas no iOS e Android para fazer um recorte adequado do viewport.

</Option>
## Gerenciamento de arquivos e pastas

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

O diretório que conterá todas as imagens de baseline usadas durante a comparação. Se não for definido, será usado o valor padrão, que armazenará os arquivos em uma pasta `__snapshots__/` ao lado do spec que executa os testes visuais. Uma função que retorna uma `string` também pode ser usada para definir o valor de `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OU
{
    baselineFolder: () => {
        // Faça alguma mágica aqui
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

O diretório que conterá todos os screenshots atuais/de diferença. Se não for definido, será usado o valor padrão. Uma função que
retorna uma string também pode ser usada para definir o valor de screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OU
{
    screenshotPath: () => {
        // Faça alguma mágica aqui
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Exclui a pasta de runtime (`actual` & `diff) na inicialização

:::info NOTA
Isso só funcionará quando o [`screenshotPath`](#screenshotpath) for definido através das opções do plugin, e **NÃO FUNCIONARÁ** quando você definir as pastas nos métodos
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Salva as imagens por instância em uma pasta separada, de modo que, por exemplo, todos os screenshots do Chrome serão salvos em uma pasta do Chrome como `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

O nome das imagens salvas pode ser personalizado passando o parâmetro `formatImageName` com uma string de formato como:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

As seguintes variáveis podem ser passadas para formatar a string e serão lidas automaticamente das capabilities da instância.
Se não puderem ser determinadas, os padrões serão usados.

-   `browserName`: O nome do navegador nas capabilities fornecidas
-   `browserVersion`: A versão do navegador fornecida nas capabilities
-   `deviceName`: O nome do dispositivo nas capabilities
-   `dpr`: A proporção de pixels do dispositivo (device pixel ratio)
-   `height`: A altura da tela
-   `logName`: O logName das capabilities
-   `mobile`: Isso adicionará `_app`, ou o nome do navegador após o `deviceName` para distinguir screenshots de apps de screenshots de navegadores
-   `platformName`: O nome da plataforma nas capabilities fornecidas
-   `platformVersion`: A versão da plataforma fornecida nas capabilities
-   `tag`: A tag fornecida nos métodos que estão sendo chamados
-   `width`: A largura da tela

:::info

Você não pode fornecer caminhos/pastas personalizados no `formatImageName`. Se quiser alterar o caminho, verifique a alteração das seguintes opções:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) por método

:::

</Option>
## Comportamento de baseline e salvamento

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Se nenhuma imagem de baseline for encontrada durante a comparação, a imagem será automaticamente copiada para a pasta de baseline.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Esta opção permite desativar a rolagem automática do elemento para a área visível quando um screenshot de elemento é criado.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Ao definir esta opção como `false`, ela irá:

- não salvar a imagem atual quando **não** houver diferença
- não armazenar o arquivo de relatório JSON quando `createJsonReportFiles` estiver definido como `true`. Também mostrará um aviso nos logs de que `createJsonReportFiles` está desativado

Isso deve proporcionar um melhor desempenho, pois nenhum arquivo é gravado no sistema, e deve garantir que não haja muito ruído na pasta `actual`.

</Option>
## Relatórios

---

### `createJsonReportFiles` **(NOVO)**

<Option type="boolean" default="false" required="No">

Agora você tem a opção de exportar os resultados da comparação para um arquivo de relatório JSON. Ao fornecer a opção `createJsonReportFiles: true`, cada imagem comparada criará um relatório armazenado na pasta `actual`, ao lado de cada resultado de imagem `actual`. A saída ficará assim:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Quando todos os testes forem executados, um novo arquivo JSON com a coleção das comparações será gerado e poderá ser encontrado na raiz da sua pasta `actual`. Os dados são agrupados por:

-   `describe` para Jasmine/Mocha ou `Feature` para CucumberJS
-   `it` para Jasmine/Mocha ou `Scenario` para CucumberJS
    e então ordenados por:
-   `commandName`, que são os nomes dos métodos de comparação usados para comparar as imagens
-   `instanceData`, primeiro o navegador, depois o dispositivo, depois a plataforma
    ficará assim

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Os dados do relatório lhe darão a oportunidade de criar seu próprio relatório visual sem precisar fazer toda a mágica e a coleta de dados por conta própria.

:::info NOTA
Você precisa usar a versão `5.2.0` ou superior do `@wdio/visual-testing`
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

A proximidade de pixels usada para agrupar os pixels de diferença no relatório JSON gerado por [`createJsonReportFiles`](#createjsonreportfiles). Valores mais altos agrupam mais pixels em menos bounding boxes; valores mais baixos produzem caixas mais precisas, porém mais numerosas.

</Option>
## Geral

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Adiciona logs extras, as opções são `debug | info | warn | silent`

Erros são sempre registrados no console.

</Option>
## Opções de Tabbable

:::info NOTA

Este módulo também suporta desenhar a forma como um usuário usaria o teclado para navegar com _tab_ pelo site, desenhando linhas e pontos de um elemento tabulável para outro.<br/>
O trabalho foi inspirado no post do blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
A forma como os elementos tabuláveis são selecionados é baseada no módulo [tabbable](https://github.com/davidtheclark/tabbable). Se houver algum problema relacionado à tabulação, verifique o [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e especialmente a [seção More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

As opções que podem ser alteradas para as linhas e pontos se você usar os métodos `{save|check}Tabbable`. As opções são explicadas abaixo.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

As opções para alterar o círculo.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A cor de fundo do círculo.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A cor da borda do círculo.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A largura da borda do círculo.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A cor da fonte do texto no círculo. Isso só será exibido se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A família da fonte do texto no círculo. Isso só será exibido se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

Certifique-se de definir fontes que sejam suportadas pelos navegadores.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

O tamanho da fonte do texto no círculo. Isso só será exibido se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

O tamanho do círculo.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Mostra o número da sequência de tabulação no círculo.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

As opções para alterar a linha.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A cor da linha.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

A largura da linha.

</Option>
## Opções de comparação

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

As opções de comparação também podem ser definidas como opções do serviço; elas estão descritas em [Method Compare options](/docs/visual-testing/method-options#compare-check-options)

</Option>