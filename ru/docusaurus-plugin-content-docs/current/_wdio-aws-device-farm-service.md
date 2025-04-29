---
id: wdio-aws-device-farm-service
title: AWS Device Farm Сервис
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service является сторонним пакетом, для получения дополнительной информации см. [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## AWS Device Farm Сервис для WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) сервис для WebdriverIO.

Этот сервис поддерживает только тестирование настольных браузеров.

## Обновление до WebDriverIO v8

Пакет теперь поддерживает [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) начиная с версии v8.0.0. Однако обратите внимание, что поддержка WebDriverIO v7 будет продолжаться до окончания [поддержки LTS](https://webdriver.io/versions/) в октябре 2023 года.

С обновлением основной версии до v8, этот пакет перешел на систему модулей ES. Теперь он выпускает модули, совместимые как с CommonJS (CJS-), так и с ECMAScript Modules (ESM-).

## Установка

```
npm install --save-dev wdio-aws-device-farm-service
```

## Пример

Вы можете запустить предоставленный пример с помощью `npm run example`. Для этого требуется:

1. ARN проекта AWS Device Farm в качестве переменной среды `PROJECT_ARN`
2. Учетные данные AWS ([см. документацию](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Обратите внимание, что AWS Device Farm поддерживает только `us-west-2`. Вы можете принудительно установить регион AWS с помощью переменной среды `AWS_REGION`.

Например, вот как это будет выглядеть при использовании временных учетных данных AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Безопасность

См. [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) для получения дополнительной информации.

## Получение помощи

Лучший способ взаимодействия с нашей командой — через GitHub. Вы можете [открыть проблему](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new), чтобы получить помощь или сообщить о любых проблемах, которые вы испытываете.

## Лицензия

Этот проект лицензирован под лицензией Apache-2.0.