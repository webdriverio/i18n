---
id: integrate-with-percy
title: Para Aplicação Web
---

## Integre seus testes WebdriverIO com Percy

Antes da integração, você pode explorar o [tutorial de amostra de build do Percy para WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integre seus testes automatizados WebdriverIO com BrowserStack Percy e aqui está uma visão geral das etapas de integração:

### Passo 1: Criar um projeto Percy
[Faça login](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) no Percy. No Percy, crie um projeto do tipo Web e, em seguida, nomeie o projeto. Depois que o projeto for criado, o Percy gera um token. Anote-o. Você terá que usá-lo para definir sua variável de ambiente na próxima etapa.

Para detalhes sobre como criar um projeto, consulte [Criar um projeto Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Passo 2: Definir o token do projeto como uma variável de ambiente

Execute o comando fornecido para definir PERCY_TOKEN como uma variável de ambiente:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Passo 3: Instalar as dependências do Percy

Instale os componentes necessários para estabelecer o ambiente de integração para sua suíte de testes.

Para instalar as dependências, execute o seguinte comando:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### Passo 4: Atualizar seu script de teste

Importe a biblioteca Percy para usar o método e atributos necessários para tirar capturas de tela.
O seguinte exemplo usa a função percySnapshot() no modo assíncrono:

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

Ao usar o WebdriverIO no [modo standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation), forneça o objeto de navegador como o primeiro argumento para a função `percySnapshot`:

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
// the browser object is required in standalone mode
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

- browser (obrigatório) - O objeto de navegador do WebdriverIO
- name (obrigatório) - O nome da captura; deve ser exclusivo para cada captura
- options - Veja as opções de configuração por captura

Para saber mais, consulte [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

### Passo 5: Executar Percy
Execute seus testes usando o comando `percy exec` como mostrado abaixo:

Se você não conseguir usar o comando `percy:exec` ou preferir executar seus testes usando opções de execução do IDE, você pode usar os comandos `percy:exec:start` e `percy:exec:stop`. Para saber mais, visite [Executar Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

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
- [Integre seus testes WebdriverIO com Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variáveis de ambiente](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integração usando BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) se você estiver usando o BrowserStack Automate.


| Recurso                                                                                                                                                            | Descrição                         |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentação oficial](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentação WebdriverIO do Percy |
| [Build de exemplo - Tutorial](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial WebdriverIO do Percy      |
| [Vídeo oficial](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Teste Visual com Percy            |
| [Blog](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Apresentando o Visual Reviews 2.0  |