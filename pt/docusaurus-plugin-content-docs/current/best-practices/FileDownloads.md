---
id: file-download
title: Download de Arquivos
description: "Configure diretórios de download para Chrome, Firefox e Edge, aguarde a conclusão dos downloads e verifique os arquivos baixados em diferentes navegadores."
---

Ao automatizar downloads de arquivos em testes web, é essencial tratá-los de forma consistente em diferentes navegadores para garantir uma execução de testes confiável.

Aqui, apresentamos as melhores práticas para downloads de arquivos e demonstramos como configurar diretórios de download para o **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**.

## Caminhos de Download

**Fixar diretamente no código** os caminhos de download nos scripts de teste pode levar a problemas de manutenção e de portabilidade. Utilize **caminhos relativos** para os diretórios de download a fim de garantir portabilidade e compatibilidade entre diferentes ambientes.

```javascript
// 👎
// Caminho de download fixo no código
const downloadPath = '/path/to/downloads';

// 👍
// Caminho de download relativo
const downloadPath = path.join(__dirname, 'downloads');
```

## Estratégias de Espera

Não implementar estratégias de espera adequadas pode levar a condições de corrida ou testes não confiáveis, especialmente na conclusão de downloads. Implemente estratégias de espera **explícitas** para aguardar a conclusão dos downloads de arquivos, garantindo a sincronização entre as etapas do teste.

```javascript
// 👎
// Sem espera explícita pela conclusão do download
await browser.pause(5000);

// 👍
// Aguarda a conclusão do download do arquivo
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configurando Diretórios de Download

Para substituir o comportamento de download de arquivos no **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**, informe o diretório de download nas capabilities do WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Para um exemplo de implementação, consulte a [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configurando Downloads em Navegadores Chromium

Para alterar o caminho de download em navegadores __baseados em Chromium__ (como Chrome, Edge, Brave, etc.), utilize o método `getPuppeteer` do WebDriverIO para acessar o Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Inicia uma sessão CDP:
const cdpSession = await page.target().createCDPSession();
// Define o caminho de download:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Lidando com Múltiplos Downloads de Arquivos

Ao lidar com cenários que envolvem múltiplos downloads de arquivos, é essencial implementar estratégias para gerenciar e validar cada download de forma eficaz. Considere as seguintes abordagens:

__Tratamento Sequencial de Downloads:__ Baixe os arquivos um por um e verifique cada download antes de iniciar o próximo, garantindo uma execução ordenada e uma validação precisa.

__Tratamento Paralelo de Downloads:__ Utilize técnicas de programação assíncrona para iniciar múltiplos downloads de arquivos simultaneamente, otimizando o tempo de execução dos testes. Implemente mecanismos de validação robustos para verificar todos os downloads após a conclusão.

## Considerações sobre Compatibilidade entre Navegadores

Embora o WebDriverIO forneça uma interface unificada para automação de navegadores, é essencial levar em conta as variações no comportamento e nas capacidades dos navegadores. Considere testar sua funcionalidade de download de arquivos em diferentes navegadores para garantir compatibilidade e consistência.

__Configurações Específicas por Navegador:__ Ajuste as configurações de caminho de download e as estratégias de espera para acomodar diferenças no comportamento e nas preferências dos navegadores Chrome, Firefox, Edge e outros navegadores suportados.

__Compatibilidade de Versões de Navegador:__ Atualize regularmente as versões do WebDriverIO e dos navegadores para aproveitar os recursos e melhorias mais recentes, garantindo a compatibilidade com sua suíte de testes existente.