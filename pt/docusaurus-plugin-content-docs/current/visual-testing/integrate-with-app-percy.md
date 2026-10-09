---
id: integrate-with-app-percy
title: Para Aplicativos Móveis
description: "Integre testes de aplicativos móveis do WebdriverIO com o BrowserStack App Percy para testes visuais, começando pela configuração do seu PERCY_TOKEN."
---

## Integre seus testes WebdriverIO com o App Percy

Antes da integração, você pode explorar o [tutorial de build de exemplo do App Percy para WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Integre sua suíte de testes com o BrowserStack App Percy. Aqui está uma visão geral das etapas de integração:

### Etapa 1: Crie um novo projeto de aplicativo no painel do Percy

[Faça login](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) no Percy e [crie um novo projeto do tipo aplicativo](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Depois de criar o projeto, será exibida uma variável de ambiente `PERCY_TOKEN`. O Percy usará o `PERCY_TOKEN` para saber para qual organização e projeto enviar as capturas de tela. Você precisará deste `PERCY_TOKEN` nas próximas etapas.

### Etapa 2: Defina o token do projeto como uma variável de ambiente

Execute o comando a seguir para definir o PERCY_TOKEN como uma variável de ambiente:

```sh
export PERCY_TOKEN="<your token here>"   // macOS ou Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Etapa 3: Instale os pacotes do Percy

Instale os componentes necessários para estabelecer o ambiente de integração para sua suíte de testes.
Para instalar as dependências, execute o seguinte comando:

```sh
npm install --save-dev @percy/cli
```

### Etapa 4: Instale as dependências

Instale o Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Etapa 5: Atualize o script de teste
Certifique-se de importar @percy/appium-app no seu código.

Abaixo está um exemplo de teste usando a função percyScreenshot. Use esta função sempre que precisar tirar uma captura de tela.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Estamos passando os argumentos necessários para o método percyScreenshot.

Os argumentos do método de captura de tela são:

```sh
percyScreenshot(driver, name[, options])
```
### Etapa 6: Execute seu script de teste

Execute seus testes usando `percy app:exec`.

Se você não puder usar o comando percy app:exec ou preferir executar seus testes usando as opções de execução da IDE, você pode usar os comandos percy app:exec:start e percy app:exec:stop. Para saber mais, visite [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Este comando inicia o Percy, cria um novo build do Percy, tira snapshots e os envia para o seu projeto, e encerra o Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Visite as seguintes páginas para mais detalhes:
- [Integre seus testes WebdriverIO com o Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Página de variáveis de ambiente](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Integre usando o BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) se você estiver usando o BrowserStack Automate.


| Recurso                                                                                                                                                            | Descrição                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Documentação oficial](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Documentação do App Percy para WebdriverIO |
| [Build de exemplo - Tutorial](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Tutorial do App Percy para WebdriverIO      |
| [Vídeo oficial](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Testes Visuais com o App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Conheça o App Percy: plataforma de testes visuais automatizados com IA para aplicativos nativos    |