---
id: wdio-aws-device-farm-service
title: AWS Device Farm Service
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service är ett paket från tredje part, för mer information se [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## AWS Device Farm Service för WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) tjänst för WebdriverIO.

Denna tjänst stöder endast testning av skrivbordwebbläsare.

## Uppgradering till WebDriverIO v8

Paketet stöder nu [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) från och med version v8.0.0. Observera dock att WebDriverIO v7 kommer att fortsätta stödjas fram till slutet av dess [LTS-stöd](https://webdriver.io/versions/) i oktober 2023.

Med den stora versionsuppgraderingen till v8 har detta paket övergått till ES-modulsystemet. Det producerar nu både CommonJS (CJS-) och ECMAScript Modules (ESM-) kompatibla moduler.

## Installation

```
npm install --save-dev wdio-aws-device-farm-service
```

## Exempel

Du kan köra det medföljande exemplet med `npm run example`. Det kräver:

1. Ett AWS Device Farm projekt ARN som en miljövariabel `PROJECT_ARN`
2. AWS-autentiseringsuppgifter ([se dokumentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Observera att AWS Device Farm endast stöder `us-west-2`. Du kan tvinga en AWS-region med miljövariabeln `AWS_REGION`.

Till exempel, så här skulle det se ut med AWS temporära autentiseringsuppgifter:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Säkerhet

Se [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) för mer information.

## Få hjälp

Det bästa sättet att interagera med vårt team är via GitHub. Du kan [öppna ett ärende](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new) för att få hjälp eller rapportera eventuella problem du upplever.

## Licens

Detta projekt är licensierat under Apache-2.0 licensen.