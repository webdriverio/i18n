---
id: docker
title: Docker
description: "Execute sua suíte de testes WebdriverIO dentro de um contêiner Docker com um navegador pré-instalado para obter resultados consistentes em diferentes máquinas."
---

Docker é uma poderosa tecnologia de conteinerização que permite encapsular sua suíte de testes em um contêiner que se comporta da mesma forma em todos os sistemas. Isso pode evitar instabilidades devido a diferentes versões de navegador ou plataforma. Para executar seus testes dentro de um contêiner, crie um `Dockerfile` no diretório do seu projeto, por exemplo:

```Dockerfile
FROM selenium/standalone-chrome:134.0-20250323 # Altere o navegador e a versão de acordo com suas necessidades
WORKDIR /app
ADD . /app

RUN npm install

CMD npx wdio
```

Certifique-se de não incluir seu `node_modules` na sua imagem Docker e de instalá-los ao construir a imagem. Para isso, adicione um arquivo `.dockerignore` com o seguinte conteúdo:

```
node_modules
```

:::info
Estamos usando aqui uma imagem Docker que vem com Selenium e Google Chrome pré-instalados. Existem várias imagens disponíveis com diferentes configurações e versões de navegadores. Confira as imagens mantidas pelo projeto Selenium [no Docker Hub](https://hub.docker.com/u/selenium).
:::

Como só podemos executar o Google Chrome em modo headless no nosso contêiner Docker, precisamos modificar nosso `wdio.conf.js` para garantir isso:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--headless',
                '--disable-gpu',
                '--window-size=1440,735'
            ],
        }
    }],
    // ...
}
```

Conforme mencionado em [Protocolos de Automação](/docs/automationProtocols), você pode executar o WebdriverIO usando o protocolo WebDriver ou o protocolo WebDriver BiDi. Certifique-se de que a versão do Chrome instalada na sua imagem corresponda à versão do [Chromedriver](https://www.npmjs.com/package/chromedriver) que você definiu no seu `package.json`.

Para construir o contêiner Docker, você pode executar:

```sh
docker build -t mytest -f Dockerfile .
```

Em seguida, para executar os testes, execute:

```sh
docker run -it mytest
```

Para mais informações sobre como configurar a imagem Docker, confira a [documentação do Docker](https://docs.docker.com/).