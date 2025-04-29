---
id: wdio-cleanuptotal-service
title: Сервис CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service является сторонним пакетом, для получения дополнительной информации см. [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

С помощью сервиса `cleanup-total` для [webdriver.io](https://webdriver.io/) вы можете легко обеспечить правильную очистку после каждого теста. Сервис предоставляет систематический способ пометки сущностей для удаления сразу после их создания. Это особенно полезно, когда тесты включают создание сложных структур, таких как банковский счет с инвестиционным планом и депозитом. Без надлежащей очистки попытка удалить счет может привести к ошибкам, таким как отказ из-за того, что счет не пустой. Однако с помощью __cleanup-total__ сущности удаляются в правильном порядке, гарантируя, что тесты очищают за собой и не мешают друг другу.

## Установка
Самый простой способ установить этот модуль как (dev-)зависимость - использовать следующую команду:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Использование

Добавьте wdio-cleanuptotal-service в ваш `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... другие опции

  services: ['cleanuptotal']

  // ... другие опции
};
```

или с параметрами сервиса:

```typescript
export const config: WebdriverIO.Config = {
  // ... другие опции

  services: [
    [
      'cleanuptotal',
      {
        // Используйте собственную функцию логирования для записи сообщений в отчет о тестировании
        customLoggerMethod: console.log(), // TODO: замените на вашу собственную функцию логирования, если необходимо

        // Записывайте в лог только когда происходит ошибка, чтобы уменьшить загромождение
        logErrorsOnly: false, // TODO: рассмотрите возможность изменения на 'true', если у вас слишком много сообщений в отчете
      }
    ]
  ]

  // ... другие опции
};
```

## Использование в тесте

Вы можете импортировать сервис __cleanuptotal__ где он необходим, будь то в вашем тестовом файле или любом другом классе.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Создаем аккаунт и добавляем его в список очистки для удаления после теста
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Добавляем инвестиционный план к аккаунту и добавляем его в список очистки
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Вносим средства на счет и добавляем операцию в список очистки
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Обратите внимание, что фактический код очистки будет выполнен после завершения теста
```

## Поддержка Typescript

Этот плагин поддерживает Typescript.

## Поддержка

Для поддержки и предложений не стесняйтесь обращаться ко мне по адресу [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).