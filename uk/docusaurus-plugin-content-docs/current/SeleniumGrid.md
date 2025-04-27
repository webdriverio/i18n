---
id: seleniumgrid
title: Selenium Grid
---

Ви можете використовувати WebdriverIO із вашим існуючим екземпляром Selenium Grid. Щоб підключити ваші тести до Selenium Grid, вам просто потрібно оновити параметри у конфігураціях вашого тест-раннера.

Ось фрагмент коду із прикладу wdio.conf.ts.

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...

}
```
Вам потрібно надати відповідні значення для протоколу, хоста, порту та шляху відповідно до вашого налаштування Selenium Grid.
Якщо ви запускаєте Selenium Grid на тій же машині, що й ваші тестові скрипти, ось деякі типові параметри:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'http',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    // ...

}
```

### Базова автентифікація з захищеним Selenium Grid

Наполегливо рекомендується захищати ваш Selenium Grid. Якщо у вас є захищений Selenium Grid, який вимагає автентифікації, ви можете передавати заголовки автентифікації через параметри. 
Будь ласка, зверніться до розділу [headers](https://webdriver.io/docs/configuration/#headers) в документації для отримання додаткової інформації.

### Налаштування таймаутів з динамічним Selenium Grid

При використанні динамічного Selenium Grid, де браузери створюються на вимогу, створення сесії може зіткнутися з холодним стартом. У таких випадках рекомендується збільшити таймаути створення сесії. Значення за замовчуванням у параметрах становить 120 секунд, але ви можете збільшити його, якщо вашій мережі потрібно більше часу для створення нової сесії. 

```ts
connectionRetryTimeout: 180000,
```

### Розширені налаштування

Для розширених налаштувань, будь ласка, зверніться до [файлу конфігурації](https://webdriver.io/docs/configurationfile) Testrunner.

### Файлові операції з Selenium Grid

При запуску тестових випадків з віддаленим Selenium Grid, браузер працює на віддаленій машині, і вам потрібно приділити особливу увагу тестовим випадкам, що включають завантаження та скачування файлів.

### Скачування файлів

Для браузерів на основі Chromium, ви можете звернутися до документації [Download file](https://webdriver.io/docs/api/browser/downloadFile). Якщо вашим тестовим скриптам потрібно прочитати вміст скачаного файлу, вам потрібно завантажити його з віддаленого вузла Selenium на машину тест-раннера. Ось приклад фрагменту коду з прикладу конфігурації `wdio.conf.ts` для браузера Chrome:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    protocol: 'https',
    hostname: 'yourseleniumgridhost.yourdomain.com',
    port: 443,
    path: '/wd/hub',
    // ...
    capabilities: [{
        browserName: 'chrome',
        'se:downloadsEnabled': true
    }],
    //...
}
```

### Завантаження файлів з віддаленим Selenium Grid

Щоб завантажити файл у веб-додаток у віддаленому браузері, вам спочатку потрібно завантажити файл на віддалений grid. Ви можете звернутися до документації [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) для отримання деталей.

### Інші операції з файлами/grid

Існує ще кілька операцій, які ви можете виконувати з Selenium Grid. Інструкції для Selenium Standalone повинні працювати нормально з Selenium Grid. Будь ласка, зверніться до документації [Selenium Standalone](https://webdriver.io/docs/api/selenium/) для доступних опцій.


### Офіційна документація Selenium Grid

Для отримання додаткової інформації про Selenium Grid, ви можете звернутися до офіційної [документації](https://www.selenium.dev/documentation/grid/) Selenium Grid. 

Якщо ви бажаєте запустити Selenium Grid у Docker, Docker compose або Kubernetes, будь ласка, зверніться до [GitHub репозиторію](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.