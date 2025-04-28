---
id: wdio-aws-device-farm-service
title: AWS Device Farm Service
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## AWS Device Farm Service für WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) Service für WebdriverIO.

Dieser Service unterstützt nur Desktop-Browser-Tests.

## Aktualisierung auf WebDriverIO v8

Das Paket bietet jetzt Unterstützung für [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) ab Version v8.0.0. Bitte beachten Sie jedoch, dass WebDriverIO v7 bis zum Ende seiner [LTS-Unterstützung](https://webdriver.io/versions/) im Oktober 2023 weiterhin unterstützt wird.

Mit dem großen Versionsupgrade auf v8 hat dieses Paket zum ES-Modulsystem gewechselt. Es stellt jetzt sowohl CommonJS (CJS-) als auch ECMAScript Modules (ESM-) kompatible Module bereit.

## Installation

```
npm install --save-dev wdio-aws-device-farm-service
```

## Beispiel

Sie können das bereitgestellte Beispiel mit `npm run example` ausführen. Es erfordert:

1. Eine AWS Device Farm Projekt-ARN als Umgebungsvariable `PROJECT_ARN`
2. AWS-Anmeldeinformationen ([siehe Dokumentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Beachten Sie, dass AWS Device Farm nur `us-west-2` unterstützt. Sie können eine AWS-Region mit der Umgebungsvariable `AWS_REGION` erzwingen.

So würde es beispielsweise mit temporären AWS-Anmeldeinformationen aussehen:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Sicherheit

Weitere Informationen finden Sie unter [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications).

## Hilfe erhalten

Der beste Weg, mit unserem Team zu interagieren, ist über GitHub. Sie können [ein Issue eröffnen](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new), um Hilfe zu erhalten oder Probleme zu melden, die Sie erleben.

## Lizenz

Dieses Projekt ist unter der Apache-2.0-Lizenz lizenziert.