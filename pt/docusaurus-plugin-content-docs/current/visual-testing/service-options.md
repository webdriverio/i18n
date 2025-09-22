---
id: service-options
title: Opções de Serviço
---

As opções de serviço são as opções que podem ser definidas quando o serviço é instanciado e serão usadas para cada chamada de método.

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
                // The options
            },
        ],
    ],
    // ...
};
```

## Opções Padrão

### `addressBarShadowPadding`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `6`
-   **Contextos de Aplicação Suportados:** Web

O preenchimento que precisa ser adicionado à barra de endereço no iOS e Android para fazer um recorte adequado da viewport.

### `autoElementScroll`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Esta opção permite desativar a rolagem automática do elemento para a visualização quando uma captura de tela do elemento é criada.

### `addIOSBezelCorners`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Adicionar cantos de moldura e entalhe/ilha dinâmica à captura de tela para dispositivos iOS.

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
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Se nenhuma imagem de linha de base for encontrada durante a comparação, a imagem será automaticamente copiada para a pasta de linha de base.

### `baselineFolder`

-   **Tipo:** `string|()=> string`
-   **Obrigatório:** Não
-   **Padrão:** `.path/to/testfile/__snapshots__/`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

O diretório que conterá todas as imagens de linha de base usadas durante a comparação. Se não for definido, o valor padrão será usado, o que armazenará os arquivos em uma pasta `__snapshots__/` ao lado do spec que executa os testes visuais. Uma função que retorna uma `string` também pode ser usada para definir o valor de `baselineFolder`:

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

### `clearRuntimeFolder`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Excluir pasta de tempo de execução (`actual` e `diff`) na inicialização

:::info NOTA
Isso só funcionará quando o [`screenshotPath`](#screenshotpath) for definido através das opções do plugin e **NÃO FUNCIONARÁ** quando você definir as pastas nos métodos
:::

### `createJsonReportFiles` **(NOVO)**

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`

Agora você tem a opção de exportar os resultados de comparação para um arquivo de relatório JSON. Fornecendo a opção `createJsonReportFiles: true`, cada imagem comparada criará um relatório armazenado na pasta `actual`, ao lado de cada resultado de imagem `actual`. A saída se parecerá com isto:

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
    e depois ordenados por:
-   `commandName`, que são os nomes de métodos de comparação usados para comparar as imagens
-   `instanceData`, primeiro navegador, depois dispositivo, depois plataforma
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

Os dados do relatório darão a você a oportunidade de construir seu próprio relatório visual sem fazer toda a mágica e coleta de dados você mesmo.

:::info NOTA
Você precisa usar a versão `@wdio/visual-testing` 5.2.0 ou superior
:::

### `disableBlinkingCursor`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ativar/Desativar o "piscar" do cursor de todos os elementos `input`, `textarea`, `[contenteditable]` na aplicação. Se definido como `true`, o cursor será definido como `transparent` antes de tirar uma captura de tela
e restaurado quando concluído

### `disableCSSAnimation`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ativar/Desativar todas as animações CSS na aplicação. Se definido como `true`, todas as animações serão desativadas antes de tirar uma captura de tela
e restauradas quando concluído

### `enableLayoutTesting`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web

Isso ocultará todo o texto em uma página para que apenas o layout seja usado para comparação. O ocultamento será feito adicionando o estilo `'color': 'transparent !important'` a **cada** elemento.

Para a saída, veja [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Ao usar essa flag, cada elemento que contém texto (não apenas `p, h1, h2, h3, h4, h5, h6, span, a, li`, mas também `div|button|..`) receberá essa propriedade. **Não** há opção para personalizar isso.
:::

### `formatImageName`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

O nome das imagens salvas pode ser personalizado passando o parâmetro `formatImageName` com uma string de formato como:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

As seguintes variáveis podem ser passadas para formatar a string e serão automaticamente lidas das capabilities da instância.
Se não puderem ser determinadas, os valores padrão serão usados.

-   `browserName`: O nome do navegador nas capabilities fornecidas
-   `browserVersion`: A versão do navegador fornecida nas capabilities
-   `deviceName`: O nome do dispositivo das capabilities
-   `dpr`: A proporção de pixels do dispositivo
-   `height`: A altura da tela
-   `logName`: O logName das capabilities
-   `mobile`: Isso adicionará `_app`, ou o nome do navegador após o `deviceName` para distinguir capturas de tela de aplicativo das capturas de tela do navegador
-   `platformName`: O nome da plataforma nas capabilities fornecidas
-   `platformVersion`: A versão da plataforma fornecida nas capabilities
-   `tag`: A tag que é fornecida nos métodos que estão sendo chamados
-   `width`: A largura da tela

:::info

Você não pode fornecer caminhos/pastas personalizados no `formatImageName`. Se você quiser alterar o caminho, verifique a alteração das seguintes opções:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) por método

:::

### `fullPageScrollTimeout`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `1500`
-   **Contextos de Aplicação Suportados:** Web

O tempo limite em milissegundos para aguardar após uma rolagem. Isso pode ajudar a identificar páginas com carregamento preguiçoso.

:::info

Isso só funcionará quando a opção de serviço/método `userBasedFullPageScreenshot` estiver definida como `true`, veja também [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Ocultar barras de rolagem na aplicação. Se definido como true, todas as barras de rolagem serão desativadas antes de tirar uma captura de tela. Isso é definido como padrão `true` para evitar problemas extras.

### `logLevel`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `info`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Adiciona logs extras, as opções são `debug | info | warn | silent`

Erros são sempre registrados no console.

### `savePerInstance`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

Salvar as imagens por instância em uma pasta separada, de modo que, por exemplo, todas as capturas de tela do Chrome serão salvas em uma pasta Chrome como `desktop_chrome`.

### `screenshotPath`

-   **Tipo:** `string | () => string`
-   **Padrão:** `.tmp/`
-   **Obrigatório:** não
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo

O diretório que conterá todas as capturas de tela atuais/diferentes. Se não for definido, o valor padrão será usado. Uma função que
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

### `toolBarShadowPadding`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** `6` para Android e `15` para iOS (`6` por padrão e `9` serão adicionados automaticamente para a possível barra de início em iPhones com um entalhe ou iPads que têm uma barra de início)
-   **Contextos de Aplicação Suportados:** Web

O preenchimento que precisa ser adicionado à barra de ferramentas no iOS e Android para fazer um recorte adequado da viewport.

### `userBasedFullPageScreenshot`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `false`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview) **Introduzido no visual-service@7.0.0**

Por padrão, capturas de tela de página inteira no desktop web são capturadas usando o protocolo WebDriver BiDi, que permite capturas de tela rápidas, estáveis e consistentes sem rolagem.
Quando userBasedFullPageScreenshot é definido como true, o processo de captura de tela simula um usuário real: rolando pela página, capturando capturas de tela do tamanho da viewport e costurando-as. Este método é útil para páginas com conteúdo carregado preguiçosamente ou renderização dinâmica que depende da posição de rolagem.

Use esta opção se sua página depende de conteúdo carregado durante a rolagem ou se você deseja preservar o comportamento de métodos de captura de tela mais antigos.

### `waitForFontsLoaded`

-   **Tipo:** `boolean`
-   **Obrigatório:** Não
-   **Padrão:** `true`
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview)

Fontes, incluindo fontes de terceiros, podem ser carregadas de forma síncrona ou assíncrona. O carregamento assíncrono significa que as fontes podem ser carregadas após o WebdriverIO determinar que uma página foi totalmente carregada. Para evitar problemas de renderização de fontes, este módulo, por padrão, aguardará que todas as fontes sejam carregadas antes de tirar uma captura de tela.

## Opções de Tabulação

:::info NOTA

Este módulo também suporta desenhar a forma como um usuário usaria seu teclado para _tabular_ pelo site, desenhando linhas e pontos de elemento tabulável para elemento tabulável.<br/>
O trabalho é inspirado no post do blog de [Viv Richards](https://github.com/vivrichards600) sobre ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
A forma como os elementos tabuláveis são selecionados é baseada no módulo [tabbable](https://github.com/davidtheclark/tabbable). Se houver algum problema relacionado à tabulação, verifique o [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) e especialmente a [seção Mais detalhes](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Tipo:** `object`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

As opções que podem ser alteradas para as linhas e pontos se você usar os métodos `{save|check}Tabbable`. As opções são explicadas abaixo.

#### `tabbableOptions.circle`

-   **Tipo:** `object`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

As opções para alterar o círculo.

##### `tabbableOptions.circle.backgroundColor`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A cor de fundo do círculo.

##### `tabbableOptions.circle.borderColor`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A cor da borda do círculo.

##### `tabbableOptions.circle.borderWidth`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A largura da borda do círculo.

##### `tabbableOptions.circle.fontColor`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A cor da fonte do texto no círculo. Isso só será mostrado se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A família da fonte do texto no círculo. Isso só será mostrado se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

Certifique-se de definir fontes que sejam suportadas pelos navegadores.

##### `tabbableOptions.circle.fontSize`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

O tamanho da fonte do texto no círculo. Isso só será mostrado se [`showNumber`](./#tabbableoptionscircleshownumber) estiver definido como `true`.

##### `tabbableOptions.circle.size`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

O tamanho do círculo.

##### `tabbableOptions.circle.showNumber`

-   **Tipo:** `showNumber`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

Mostrar o número da sequência de tabulação no círculo.

#### `tabbableOptions.line`

-   **Tipo:** `object`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

As opções para alterar a linha.

##### `tabbableOptions.line.color`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A cor da linha.

##### `tabbableOptions.line.width`

-   **Tipo:** `number`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web

A largura da linha.

## Opções de comparação

### `compareOptions`

-   **Tipo:** `object`
-   **Obrigatório:** Não
-   **Padrão:** Veja [aqui](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) para todos os valores padrão
-   **Contextos de Aplicação Suportados:** Web, Aplicativo Híbrido (Webview), Aplicativo Nativo (Veja [Opções de comparação de método](./method-options#compare-check-options) para mais informações)

As opções de comparação também podem ser definidas como opções de serviço, elas são descritas nas [Opções de comparação de método](/docs/visual-testing/method-options#compare-check-options)