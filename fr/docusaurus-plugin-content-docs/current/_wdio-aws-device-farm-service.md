---
id: wdio-aws-device-farm-service
title: Service AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---


> wdio-aws-device-farm-service est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## Service AWS Device Farm pour WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) service pour WebdriverIO.

Ce service ne prend en charge que les tests de navigateur sur ordinateur.

## Mise à niveau vers WebDriverIO v8

Le package offre désormais la prise en charge de [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) à partir de la version v8.0.0. Cependant, veuillez noter que WebDriverIO v7 continuera d'être pris en charge jusqu'à la fin de son support [LTS](https://webdriver.io/versions/) en octobre 2023.

Avec la mise à niveau majeure vers v8, ce package est passé au système de modules ES. Il émet désormais des modules compatibles à la fois avec CommonJS (CJS-) et ECMAScript Modules (ESM-).

## Installation

```
npm install --save-dev wdio-aws-device-farm-service
```

## Exemple

Vous pouvez exécuter l'exemple fourni avec `npm run example`. Cela nécessite :

1. Un ARN de projet AWS Device Farm comme variable d'environnement `PROJECT_ARN`
2. Des identifiants AWS ([voir la documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Notez qu'AWS Device Farm ne prend en charge que `us-west-2`. Vous pouvez forcer une région AWS avec la variable d'environnement `AWS_REGION`.

Par exemple, voici à quoi cela ressemblerait en utilisant des identifiants temporaires AWS :

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Sécurité

Consultez [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) pour plus d'informations.

## Obtenir de l'aide

La meilleure façon d'interagir avec notre équipe est via GitHub. Vous pouvez [ouvrir un ticket](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) pour obtenir de l'aide ou signaler tout problème que vous rencontrez.

## Licence

Ce projet est sous licence Apache-2.0.