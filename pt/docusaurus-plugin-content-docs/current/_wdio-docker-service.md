---
id: wdio-docker-service
title: Serviço Docker
custom_edit_url: https://github.com/stsvilik/wdio-docker-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-docker-service é um pacote de terceiros, para mais informações, por favor consulte [GitHub](https://github.com/stsvilik/wdio-docker-service) | [npm](https://www.npmjs.com/package/wdio-docker-service)

Este serviço é destinado a uso com [WebdriverIO](http://webdriver.io/) e ajuda a executar testes funcionais/de integração 
contra/usando aplicações em contêineres. Ele usa o popular serviço [Docker](https://www.docker.com/) (instalado separadamente) para executar contêineres.

## Por que usá-lo?
Idealmente, seus testes seriam executados em alguma variedade de pipeline CI/CD onde frequentemente não há navegadores "reais" e outros recursos
dos quais sua aplicação depende. Com o advento do Docker, praticamente todas as dependências necessárias da aplicação podem ser conteinerizadas.
Com este serviço, você pode executar seu contêiner de aplicação ou um [docker-selenium](https://github.com/SeleniumHQ/docker-selenium) em seu CI e em completo isolamento 
(assumindo que o CI pode ter o Docker instalado como uma dependência). O mesmo pode ser aplicado ao desenvolvimento local se sua aplicação precisar ter um nível
de isolamento do seu sistema operacional principal.

## Como funciona
O serviço executará uma imagem docker existente e, uma vez pronta, iniciará os testes WebdriverIO que devem ser executados contra sua aplicação em contêiner.

## Instalação

Execute:

```bash
npm install wdio-docker-service --save-dev
```

Instruções sobre como instalar o WebdriverIO podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração
Por padrão, Google Chrome, Firefox e PhantomJS estão disponíveis quando instalados no sistema host. 
Para usar o serviço, você precisa adicionar `docker` ao seu array de serviços:

```javascript
// wdio.conf.js
exports.config = {
   // ...
   services: ['docker'],
   // ...
};
```

## Opções

### dockerOptions
Várias opções necessárias para executar o contêiner docker

Tipo: `Object`

Padrão: `{ 
    options: {
        rm: true
    }
}`

Exemplo:

```javascript
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

### dockerOptions.image
Tag do nome do contêiner Docker. Pode ser local ou do Docker HUB.

Tipo: `String`

Obrigatório: `true`

### dockerOptions.healthCheck
Configuração que verifica a prontidão dos seus contêineres antes de iniciar os testes. Normalmente, seria uma URL localhost.
Se o healthCheck não estiver configurado, o Webdriver começará a executar os testes imediatamente após o início do contêiner Docker, o que
pode ser muito cedo, considerando que leva tempo para que um serviço web inicie dentro de um contêiner Docker.

Tipo: `String|Object`

Opções para uso de Objeto:
- *url* - url para um aplicativo em execução dentro do seu contêiner
- *maxRetries* - número de tentativas até que o healthcheck falhe. Padrão: 10
- *inspectInterval* - intervalo entre cada tentativa em ms. Padrão: 500
- *startDelay* - atraso inicial para iniciar o healthcheck em ms. Padrão: 0

Exemplo 1 (String): `healthCheck: 'http://localhost:4444'`

Exemplo 2 (Objeto):

```javascript
healthCheck: {
    url: 'http://localhost:4444',
    maxRetries: 3,
    inspectInterval: 1000,
    startDelay: 2000
}
```

### dockerOptions.options
Mapa de opções usadas pelo comando `docker run`. Para mais detalhes sobre o comando `run`, clique [aqui](https://docs.docker.com/edge/engine/reference/commandline/run/).

Qualquer opção de letra única será convertida para `-[opção]` (ou seja, `d: true` -> `-d`). 

Qualquer opção de dois caracteres ou mais será
convertida para `--[opção]` (ou seja, `rm: true` -> `--rm`). 

Para opções que podem ser usadas mais de uma vez 
(ou seja, `-e`,`-add-host`, `--expose`, etc.), use a notação de array (ou seja, `e: ["NODE_ENV=development", "FOO=bar"]`).

Tipo: `Object`

Exemplo:

```javascript
options: {
    e: ['NODE_ENV=development', 'PROXY=http://myproxy:80']
    p: ['4444:4444', '5900:5900'],
    shmSize: '2g'
}
```

### dockerOptions.args
Quaisquer argumentos que você queira passar para o contêiner. Corresponde a `[ARG...]` no CLI do Docker run.

Tipo: `String`

### dockerOptions.command
Qualquer comando que você queira passar para o contêiner. Corresponde a `[COMMAND]` no CLI do Docker run.

Tipo: `String`

### onDockerReady
Um método de callback que é chamado quando a aplicação Docker está pronta. A prontidão é determinada pela capacidade de fazer ping na URL de `healthCheck`.

Tipo: `Function`

### dockerLogs
Caminho para onde os logs do contêiner docker devem ser armazenados

Tipo: `String`

## Casos de Uso de Teste / Receitas
Por favor, visite nossa [Wiki](https://github.com/stsvilik/wdio-docker-service/wiki) para mais detalhes.