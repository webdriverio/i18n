---
id: wdio-aws-device-farm-service
title: Servizio AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---


> wdio-aws-device-farm-service è un pacchetto di terze parti, per ulteriori informazioni consultare [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## AWS Device Farm Service per WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) service for WebdriverIO.

Questo servizio supporta solo test su browser desktop.

## Aggiornamento a WebDriverIO v8

Il pacchetto ora fornisce supporto per [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) a partire dalla versione v8.0.0. Tuttavia, si noti che WebDriverIO v7 continuerà ad essere supportato fino alla fine del suo supporto [LTS](https://webdriver.io/versions/) a ottobre 2023.

Con l'aggiornamento della versione principale a v8, questo pacchetto è passato al sistema di moduli ES. E ora emette moduli compatibili sia con CommonJS (CJS-) che con ECMAScript Modules (ESM-).

## Installazione

```
npm install --save-dev wdio-aws-device-farm-service
```

## Esempio

Puoi eseguire l'esempio fornito con `npm run example`. Richiede:

1. Un ARN di progetto AWS Device Farm come variabile d'ambiente `PROJECT_ARN`
2. Credenziali AWS ([vedi la documentazione](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Nota che AWS Device Farm supporta solo `us-west-2`. Puoi forzare una regione AWS con la variabile d'ambiente `AWS_REGION`.

Ad esempio, ecco come apparirebbe utilizzando le credenziali temporanee AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Sicurezza

Vedi [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) per maggiori informazioni.

## Ottenere Aiuto

Il modo migliore per interagire con il nostro team è tramite GitHub. Puoi [aprire una issue](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) per ottenere aiuto o per segnalare eventuali problemi riscontrati.

## Licenza

Questo progetto è concesso in licenza secondo la Licenza Apache-2.0.