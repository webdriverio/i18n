---
id: wdio-cleanuptotal-service
title: CleanupTotal Service
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service це пакет третьої сторони, для отримання додаткової інформації дивіться [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

За допомогою сервісу `cleanup-total` для [webdriver.io](https://webdriver.io/) ви можете легко забезпечити належне очищення після кожного тесту. Сервіс надає систематичний спосіб позначення сутностей для видалення відразу після їх створення. Це особливо корисно, коли тести включають створення складних структур, таких як банківський рахунок з інвестиційним планом та депозитом. Без належного очищення спроба видалити рахунок може призвести до помилок, наприклад, відмови через те, що рахунок не порожній. Однак з __cleanup-total__ сутності видаляються у правильному порядку, забезпечуючи очищення після тестів і запобігаючи їх взаємному втручанню.

## Встановлення
Найпростіший спосіб встановити цей модуль як (dev-)залежність - використати наступну команду:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Використання

Додайте wdio-cleanuptotal-service до вашого `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... інші опції

  services: ['cleanuptotal']

  // ... інші опції
};
```

або з опціями сервісу:

```typescript
export const config: WebdriverIO.Config = {
  // ... інші опції

  services: [
    [
      'cleanuptotal',
      {
        // Використовуйте власну функцію логування для запису повідомлень у звіт тесту
        customLoggerMethod: console.log(), // TODO: замініть на власну функцію логування, якщо потрібно

        // Записувати в лог тільки коли виникає помилка, щоб зменшити кількість повідомлень
        logErrorsOnly: false, // TODO: розгляньте зміну на 'true', якщо у вас забагато повідомлень у звіті
      }
    ]
  ]

  // ... інші опції
};
```

## Використання в тесті

Ви можете імпортувати сервіс __cleanuptotal__ де завгодно, чи то у вашому тестовому файлі, чи у будь-якому іншому класі.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Створюємо рахунок і додаємо його до списку очищення для видалення після тесту
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Додаємо інвестиційний план до рахунку і додаємо його до списку очищення
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Вносимо кошти на рахунок і додаємо операцію до списку очищення
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Зауважте, що фактичний код очищення буде виконано після завершення тесту
```

## Підтримка Typescript

Для цього плагіна передбачена підтримка Typescript.

## Підтримка

Для підтримки та пропозицій, не соромтеся звертатися до мене за адресою [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).