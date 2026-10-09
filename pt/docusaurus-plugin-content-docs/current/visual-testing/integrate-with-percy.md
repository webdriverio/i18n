---
id: integrate-with-percy
title: Para Aplicação Web
description: "Integre testes WebdriverIO para aplicações web com o BrowserStack Percy para testes visuais, desde a criação de um projeto até a execução de builds."
---

## Integre seus testes WebdriverIO com o Percy

Antes da integração, você pode explorar o [tutorial de build de exemplo do Percy para WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integre seus testes automatizados WebdriverIO com o BrowserStack Percy. Aqui está uma visão geral das etapas de integração:

### Etapa 1: Crie um projeto Percy
[Faça login](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) no Percy. No Percy, crie um projeto do tipo Web e, em seguida, dê um nome ao projeto. Após a criação do projeto, o Percy gera um token. Anote-o. Você precisará usá-lo para definir sua variável de ambiente na próxima etapa.

Para detalhes sobre como criar um projeto, consulte [Criar um projeto Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Etapa 2: Defina o token do projeto como uma variável de ambiente

Execute o comando abaixo para definir PERCY_TOKEN como uma variável de ambiente:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Etapa 3: Instale as dependências do Percy

Instale os componentes necessários para estabelecer o ambiente de integração para sua suíte de testes.

Para instalar as dependências, execute o seguinte comando:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Etapa 4: Atualize seu script de teste

Importe a biblioteca do Percy para usar o método e os atributos necessários para capturar screenshots.
O exemplo a seguir usa a função percySnapshot() no modo assíncrono:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

Ao usar o WebdriverIO no [modo standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), forneça o objeto browser como o primeiro argumento para a função `percySnapshot`:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// o objeto browser é obrigatório no modo standalone
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
Os argumentos do método snapshot são:

```sh
percySnapshot(name[, options])
```
### Modo standalone

```sh
percySnapshot(browser, name[, options])
```

- browser (obrigatório) - O objeto browser do WebdriverIO
- name (obrigatório) - O nome do snapshot; deve ser único para cada snapshot
- options - Consulte as opções de configuração por snapshot

Para saber mais, consulte [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Etapa 5: Execute o Percy
Execute seus testes usando o comando `percy exec`, conforme mostrado abaixo:

Se você não conseguir usar o comando `percy:exec` ou preferir executar seus testes usando as opções de execução da IDE, você pode usar os comandos `percy:exec:start` e `percy:exec:stop`. Para saber mais, visite [Executar o Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## Visite as seguintes páginas para mais detalhes:
- [Integre seus testes WebdriverIO com o Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variáveis de ambiente](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integre usando o BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) se você estiver usando o BrowserStack Automate.


| Recurso                                                                                                                                                             | Descrição                         |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentação oficial](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)      | Documentação do Percy para WebdriverIO |
| [Build de exemplo - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial do Percy para WebdriverIO |
| [Vídeo oficial](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                               | Testes Visuais com o Percy        |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Apresentando o Visual Reviews 2.0 |