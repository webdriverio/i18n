---
id: wdio-aws-device-farm-service
title: Usługa AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service jest pakietem zewnętrznym, aby uzyskać więcej informacji, odwiedź [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## Usługa AWS Device Farm dla WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) usługa dla WebdriverIO.

Ta usługa obsługuje tylko testowanie przeglądarek na komputerach.

## Aktualizacja do WebDriverIO v8

Pakiet teraz zapewnia wsparcie dla [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) począwszy od wersji v8.0.0. Należy jednak pamiętać, że WebDriverIO v7 będzie nadal wspierane do końca jego [wsparcia LTS](https://webdriver.io/versions/) w październiku 2023 roku.

Wraz z główną aktualizacją wersji do v8, ten pakiet przeszedł na system modułów ES. Teraz emituje moduły kompatybilne zarówno z CommonJS (CJS-), jak i ECMAScript Modules (ESM-).

## Instalacja

```
npm install --save-dev wdio-aws-device-farm-service
```

## Przykład

Możesz uruchomić dostarczony przykład za pomocą `npm run example`. Wymaga to:

1. ARN projektu AWS Device Farm jako zmiennej środowiskowej `PROJECT_ARN`
2. Poświadczeń AWS ([zobacz dokumentację](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Pamiętaj, że AWS Device Farm obsługuje tylko region `us-west-2`. Możesz wymusić region AWS za pomocą zmiennej środowiskowej `AWS_REGION`.

Na przykład, tak to wygląda przy użyciu tymczasowych poświadczeń AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Bezpieczeństwo

Zobacz [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications), aby uzyskać więcej informacji.

## Uzyskiwanie pomocy

Najlepszym sposobem na interakcję z naszym zespołem jest GitHub. Możesz [otworzyć zgłoszenie](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new), aby uzyskać pomoc lub zgłosić napotkane problemy.

## Licencja

Ten projekt jest objęty licencją Apache-2.0.