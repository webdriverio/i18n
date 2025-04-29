---
id: wdio-aws-device-farm-service
title: Serviço AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## Serviço AWS Device Farm para WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) service for WebdriverIO.

Este serviço suporta apenas testes de navegador desktop.

## Atualizando para WebDriverIO v8

O pacote agora oferece suporte para [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) a partir da versão v8.0.0. No entanto, observe que o WebDriverIO v7 continuará sendo suportado até o final do seu [suporte LTS](https://webdriver.io/versions/) em outubro de 2023.

Com a atualização de versão principal para v8, este pacote passou para o sistema de módulos ES. E agora emite módulos compatíveis com CommonJS (CJS-) e ECMAScript Modules (ESM-).

## Instalação

```
npm install --save-dev wdio-aws-device-farm-service
```

## Exemplo

Você pode executar o exemplo fornecido com `npm run example`. Ele requer:

1. Um ARN de projeto AWS Device Farm como variável de ambiente `PROJECT_ARN`
2. Credenciais AWS ([veja a documentação](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Observe que o AWS Device Farm suporta apenas `us-west-2`. Você pode forçar uma região AWS com a variável de ambiente `AWS_REGION`.

Por exemplo, é assim que ficaria usando credenciais temporárias da AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Segurança

Veja [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) para mais informações.

## Obtendo Ajuda

A melhor maneira de interagir com nossa equipe é através do GitHub. Você pode [abrir uma issue](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) para obter ajuda ou relatar quaisquer problemas que você esteja enfrentando.

## Licença

Este projeto é licenciado sob a Licença Apache-2.0.