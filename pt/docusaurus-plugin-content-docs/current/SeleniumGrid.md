---
id: seleniumgrid
title: Selenium Grid
---

Você pode usar o WebdriverIO com sua instância existente do Selenium Grid. Para conectar seus testes ao Selenium Grid, você só precisa atualizar as opções nas configurações do seu executor de testes.

Aqui está um trecho de código do exemplo wdio.conf.ts.

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

É altamente recomendável proteger seu Selenium Grid. Se você tiver um Selenium Grid protegido que requer autenticação, você pode passar cabeçalhos de autenticação através de opções.
Por favor, consulte a seção [headers](https://webdriver.io/docs/configuration/#headers) na documentação para mais informações.

### Configurações de timeout com Selenium Grid dinâmico

Ao usar um Selenium Grid dinâmico onde os pods de navegadores são iniciados sob demanda, a criação de sessão pode enfrentar um arranque a frio. Nesses casos, é aconselhável aumentar os timeouts de criação de sessão. O valor padrão nas opções é de 120 segundos, mas você pode aumentá-lo se a sua grid levar mais tempo para criar uma nova sessão.

```ts
connectionRetryTimeout: 180000,
```

### Configurações avançadas

Para configurações avançadas, consulte o [arquivo de configuração](https://webdriver.io/docs/configurationfile) do Testrunner.

### Operações de arquivo com Selenium Grid

Ao executar casos de teste com um Selenium Grid remoto, o navegador é executado em uma máquina remota, e você precisa ter cuidado especial com casos de teste envolvendo uploads e downloads de arquivos.

### Downloads de arquivos

Para navegadores baseados em Chromium, você pode consultar a documentação [Download file](https://webdriver.io/docs/api/browser/downloadFile). Se seus scripts de teste precisarem ler o conteúdo de um arquivo baixado, você precisa baixá-lo do nó remoto do Selenium para a máquina do executor de teste. Aqui está um exemplo de trecho de código da configuração de amostra `wdio.conf.ts` para o navegador Chrome:

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

### Upload de arquivo com Selenium Grid remoto

Para fazer upload de um arquivo para um aplicativo web no navegador remoto, você primeiro precisa fazer o upload do arquivo para a grid remota. Você pode consultar a documentação [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) para detalhes.

### Outras operações de arquivo/grid

Existem algumas outras operações que você pode realizar com o Selenium Grid. As instruções para o Selenium Standalone devem funcionar bem com o Selenium Grid também. Por favor, consulte a documentação do [Selenium Standalone](https://webdriver.io/docs/api/selenium/) para as opções disponíveis.


### Documentação oficial do Selenium Grid

Para mais informações sobre o Selenium Grid, você pode consultar a [documentação](https://www.selenium.dev/documentation/grid/) oficial do Selenium Grid.

Se você deseja executar o Selenium Grid em Docker, Docker compose ou Kubernetes, consulte o [repositório GitHub](https://github.com/SeleniumHQ/docker-selenium) do Selenium-Docker.