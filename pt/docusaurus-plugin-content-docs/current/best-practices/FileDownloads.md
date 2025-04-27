---
id: file-download
title: Download de Arquivos
---

Ao automatizar downloads de arquivos em testes web, é essencial tratá-los de forma consistente em diferentes navegadores para garantir a execução confiável dos testes.

Aqui, fornecemos as melhores práticas para downloads de arquivos e demonstramos como configurar diretórios de download para o **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**.

## Caminhos de Download

**Codificar diretamente** caminhos de download em scripts de teste pode levar a problemas de manutenção e portabilidade. Utilize **caminhos relativos** para diretórios de download para garantir portabilidade e compatibilidade em diferentes ambientes.

```javascript
// 👎
// Caminho de download hardcoded
const downloadPath = '/path/to/downloads';

// 👍
// Caminho de download relativo
const downloadPath = path.join(__dirname, 'downloads');
```

## Estratégias de Espera

Não implementar estratégias de espera adequadas pode levar a condições de corrida ou testes não confiáveis, especialmente para conclusão de downloads. Implemente estratégias de espera **explícitas** para aguardar a conclusão dos downloads de arquivos, garantindo sincronização entre as etapas do teste.

```javascript
// 👎
// Sem espera explícita para conclusão do download
await browser.pause(5000);

// 👍
// Espera pela conclusão do download do arquivo
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configurando Diretórios de Download

Para substituir o comportamento de download de arquivos para **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**, forneça o diretório de download nas capacidades do WebDriverIO:

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

Para um exemplo de implementação, consulte a [Receita de Comportamento de Download de Teste do WebdriverIO](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configurando Downloads de Navegadores Chromium

Para alterar o caminho de download para navegadores __baseados em Chromium__ (como Chrome, Edge, Brave, etc.) usando o método `getPuppeteer` do WebDriverIO para acessar o Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Iniciar uma Sessão CDP:
const cdpSession = await page.target().createCDPSession();
// Definir o Caminho de Download:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Lidando com Múltiplos Downloads de Arquivos

Ao lidar com cenários envolvendo múltiplos downloads de arquivos, é essencial implementar estratégias para gerenciar e validar cada download efetivamente. Considere as seguintes abordagens:

__Tratamento Sequencial de Download:__ Baixe arquivos um por um e verifique cada download antes de iniciar o próximo para garantir execução ordenada e validação precisa.

__Tratamento Paralelo de Download:__ Utilize técnicas de programação assíncrona para iniciar múltiplos downloads de arquivos simultaneamente, otimizando o tempo de execução do teste. Implemente mecanismos robustos de validação para verificar todos os downloads após a conclusão.

## Considerações de Compatibilidade Cross-Browser

Embora o WebDriverIO forneça uma interface unificada para automação de navegadores, é essencial considerar variações no comportamento e recursos dos navegadores. Considere testar sua funcionalidade de download de arquivos em diferentes navegadores para garantir compatibilidade e consistência.

__Configurações Específicas de Navegador:__ Ajuste as configurações de caminho de download e estratégias de espera para acomodar diferenças no comportamento e preferências do navegador entre Chrome, Firefox, Edge e outros navegadores suportados.

__Compatibilidade de Versão do Navegador:__ Atualize regularmente suas versões do WebDriverIO e do navegador para aproveitar os recursos e melhorias mais recentes, garantindo compatibilidade com sua suíte de testes existente.