---
id: seleniumgrid
title: Selenium Grid
---

Вы можете использовать WebdriverIO с вашим существующим экземпляром Selenium Grid. Чтобы подключить ваши тесты к Selenium Grid, вам просто нужно обновить параметры в конфигурациях вашего тест-раннера.

Вот фрагмент кода из примера wdio.conf.ts.

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
Вам нужно указать соответствующие значения для протокола, хоста, порта и пути в зависимости от вашей настройки Selenium Grid.
Если вы запускаете Selenium Grid на той же машине, что и ваши тестовые скрипты, вот некоторые типичные параметры:

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

### Базовая аутентификация с защищенным Selenium Grid

Настоятельно рекомендуется защищать ваш Selenium Grid. Если у вас есть защищенный Selenium Grid, требующий аутентификации, вы можете передать заголовки аутентификации через параметры.
Пожалуйста, обратитесь к разделу [headers](https://webdriver.io/docs/configuration/#headers) в документации для получения дополнительной информации.

### Настройки тайм-аутов с динамическим Selenium Grid

При использовании динамического Selenium Grid, где поды браузеров запускаются по требованию, создание сессии может столкнуться с холодным стартом. В таких случаях рекомендуется увеличить тайм-ауты создания сессии. Значение по умолчанию в параметрах составляет 120 секунд, но вы можете увеличить его, если вашей сетке требуется больше времени для создания новой сессии.

```ts
connectionRetryTimeout: 180000,
```

### Расширенные конфигурации

Для расширенных конфигураций, пожалуйста, обратитесь к [файлу конфигурации](https://webdriver.io/docs/configurationfile) Testrunner.

### Операции с файлами в Selenium Grid

При выполнении тестовых сценариев с удаленным Selenium Grid, браузер работает на удаленной машине, и вам нужно уделить особое внимание тестовым сценариям, связанным с загрузкой и скачиванием файлов.

### Скачивание файлов

Для браузеров на основе Chromium вы можете обратиться к документации [Download file](https://webdriver.io/docs/api/browser/downloadFile). Если вашим тестовым скриптам нужно прочитать содержимое скачанного файла, вам нужно скачать его с удаленного узла Selenium на машину тест-раннера. Вот пример фрагмента кода из примера конфигурации `wdio.conf.ts` для браузера Chrome:

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

### Загрузка файлов с удаленным Selenium Grid

Чтобы загрузить файл в веб-приложение в удаленном браузере, вам сначала нужно загрузить файл в удаленную сетку. Вы можете обратиться к документации [uploadFile](https://webdriver.io/docs/api/browser/uploadFile) для получения подробной информации.

### Другие операции с файлами/сеткой

Существует еще несколько операций, которые вы можете выполнять с Selenium Grid. Инструкции для Selenium Standalone должны хорошо работать и с Selenium Grid. Пожалуйста, обратитесь к документации [Selenium Standalone](https://webdriver.io/docs/api/selenium/) для доступных опций.


### Официальная документация Selenium Grid

Для получения дополнительной информации о Selenium Grid вы можете обратиться к официальной [документации](https://www.selenium.dev/documentation/grid/) Selenium Grid.

Если вы хотите запустить Selenium Grid в Docker, Docker compose или Kubernetes, пожалуйста, обратитесь к [GitHub-репозиторию](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.