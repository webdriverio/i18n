---
id: seleniumgrid
title: Selenium Grid
description: "Conecte os testes do WebdriverIO a um Selenium Grid existente definindo o protocolo, o hostname, a porta e o caminho na sua configuração."
---

Você pode usar o WebdriverIO com a sua instância existente do Selenium Grid. Para conectar seus testes ao Selenium Grid, basta atualizar as opções nas configurações do seu test runner.

Aqui está um trecho de código de um exemplo de wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Você precisa fornecer os valores apropriados para o protocolo, hostname, porta e caminho com base na configuração do seu Selenium Grid.
Se você estiver executando o Selenium Grid na mesma máquina que seus scripts de teste, aqui estão algumas opções típicas:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Autenticação básica com Selenium Grid protegido

É altamente recomendável proteger o seu Selenium Grid. Se você tiver um Selenium Grid protegido que exige autenticação, pode passar cabeçalhos de autenticação por meio das opções. 
Consulte a seção [headers](https://webdriver.io/docs/configuration/#headers) na documentação para obter mais informações.

### Configurações de timeout com Selenium Grid dinâmico

Ao usar um Selenium Grid dinâmico, em que os pods de navegador são criados sob demanda, a criação da sessão pode enfrentar um cold start. Nesses casos, recomenda-se aumentar os timeouts de criação de sessão. O valor padrão nas opções é de 120 segundos, mas você pode aumentá-lo se o seu grid demorar mais para criar uma nova sessão. 

```ts
connectionRetryTimeout: 180000,
```

### Configurações avançadas

Para configurações avançadas, consulte o [arquivo de configuração](https://webdriver.io/docs/configurationfile) do Testrunner.

### Operações com arquivos no Selenium Grid

Ao executar casos de teste com um Selenium Grid remoto, o navegador é executado em uma máquina remota, e você precisa ter cuidado especial com casos de teste que envolvem upload e download de arquivos.

### Downloads de arquivos

Para navegadores baseados em Chromium, você pode consultar a documentação de [Download file](https://webdriver.io/docs/api/browser/downloadFile). Se seus scripts de teste precisarem ler o conteúdo de um arquivo baixado, você precisa baixá-lo do nó remoto do Selenium para a máquina do test runner. Aqui está um exemplo de trecho de código da configuração de exemplo `wdio.conf.ts` para o navegador Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Upload de arquivos com Selenium Grid remoto

[`element.setFiles()`](/docs/api/element/setFiles) define um input de arquivo por meio do WebDriver BiDi. Os caminhos que você passa são abertos pelo navegador, portanto precisam existir na máquina que executa o navegador. O WebdriverIO não transfere um arquivo local para um nó do Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Uma suíte que usava `browser.uploadFile()` para enviar bytes ao nó precisa colocar o arquivo onde o navegador possa lê-lo e, em seguida, chamar `setFiles`. O endpoint [`file`](/docs/api/selenium#file) do Selenium ainda está disponível como `browser.file()` para Chromedriver, Edgedriver e Selenium Grid. Ele não é um comando WebDriver nem WebDriver BiDi.

### Outras operações de arquivo/grid

Há mais algumas operações que você pode realizar com o Selenium Grid. As instruções para o Selenium Standalone também devem funcionar bem com o Selenium Grid. Consulte a documentação do [Selenium Standalone](https://webdriver.io/docs/api/selenium/) para ver as opções disponíveis.


### Documentação oficial do Selenium Grid

Para mais informações sobre o Selenium Grid, você pode consultar a [documentação](https://www.selenium.dev/documentation/grid/) oficial do Selenium Grid. 

Se você deseja executar o Selenium Grid no Docker, Docker Compose ou Kubernetes, consulte o [repositório no GitHub](https://github.com/SeleniumHQ/docker-selenium) do Selenium-Docker.