---
id: wdio-aws-device-farm-service
title: Сервіс AWS Device Farm
custom_edit_url: https://github.com/awslabs/wdio-aws-device-farm-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-aws-device-farm-service є пакетом третьої сторони, для отримання додаткової інформації перегляньте [GitHub](https://github.com/awslabs/wdio-aws-device-farm-service) | [npm](https://www.npmjs.com/package/wdio-aws-device-farm-service)
## Сервіс AWS Device Farm для WebdriverIO

[AWS Device Farm](https://aws.amazon.com/device-farm/) сервіс для WebdriverIO.

Цей сервіс підтримує лише тестування настільних браузерів.

## Оновлення до WebDriverIO v8

Пакет тепер підтримує [WebDriverIO v8](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released/) починаючи з версії v8.0.0. Однак зверніть увагу, що WebDriverIO v7 буде підтримуватися до кінця своєї [LTS підтримки](https://webdriver.io/versions/) у жовтні 2023 року.

З основним оновленням версії до v8, цей пакет перейшов на систему модулів ES. Тепер він випускає модулі, сумісні як з CommonJS (CJS-), так і з ECMAScript Modules (ESM-).

## Встановлення

```
npm install --save-dev wdio-aws-device-farm-service
```

## Приклад

Ви можете запустити наданий приклад за допомогою `npm run example`. Він вимагає:

1. ARN проекту AWS Device Farm як змінну середовища `PROJECT_ARN`
2. Облікові дані AWS ([див. документацію](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)). Зауважте, що AWS Device Farm підтримує лише `us-west-2`. Ви можете примусово встановити регіон AWS за допомогою змінної середовища `AWS_REGION`.

Наприклад, ось як це виглядатиме при використанні тимчасових облікових даних AWS:

```sh
export PROJECT_ARN="<your project arn>"
export AWS_ACCESS_KEY_ID="<aws access key id>"
export AWS_SECRET_ACCESS_KEY="<aws secret access key>"
export AWS_SESSION_TOKEN="<aws session token>"
export AWS_REGION="us-west-2"

npm run example
```

## Безпека

Дивіться [CONTRIBUTING](https://github.com/awslabs/wdio-aws-device-farm-service/blob/main/CONTRIBUTING.md#security-issue-notifications) для отримання додаткової інформації.

## Отримання допомоги

Найкращий спосіб взаємодії з нашою командою – через GitHub. Ви можете [відкрити проблему](https://github.com/awslabs/wdio-aws-device-farm-service/issues/new), щоб отримати допомогу або повідомити про будь-які проблеми, з якими ви стикаєтеся.

## Ліцензія

Цей проект ліцензований відповідно до ліцензії Apache-2.0.