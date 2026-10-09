---
id: seleniumgrid
title: Selenium Grid
description: "Подключите тесты WebdriverIO к существующему Selenium Grid, указав protocol, hostname, port и path в вашей конфигурации."
---

Вы можете использовать WebdriverIO с вашим существующим экземпляром Selenium Grid. Чтобы подключить тесты к Selenium Grid, достаточно обновить параметры в конфигурации тест-раннера.

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
Вам необходимо указать соответствующие значения protocol, hostname, port и path в зависимости от настройки вашего Selenium Grid.
Если вы запускаете Selenium Grid на той же машине, что и тестовые скрипты, вот типичные параметры:

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

### Базовая аутентификация в защищённом Selenium Grid

Настоятельно рекомендуется защищать ваш Selenium Grid. Если у вас защищённый Selenium Grid, требующий аутентификации, вы можете передать заголовки аутентификации через параметры. 
Подробнее см. раздел [headers](https://webdriver.io/docs/configuration/#headers) в документации.

### Настройка таймаутов для динамического Selenium Grid

При использовании динамического Selenium Grid, в котором поды браузеров создаются по запросу, создание сессии может столкнуться с холодным стартом. В таких случаях рекомендуется увеличить таймауты создания сессии. Значение по умолчанию в параметрах составляет 120 секунд, но вы можете увеличить его, если вашему гриду требуется больше времени для создания новой сессии. 

```ts
connectionRetryTimeout: 180000,
```

### Расширенная конфигурация

Для расширенной конфигурации обратитесь к [файлу конфигурации](https://webdriver.io/docs/configurationfile) Testrunner.

### Операции с файлами в Selenium Grid

При запуске тестов с удалённым Selenium Grid браузер работает на удалённой машине, поэтому необходимо уделять особое внимание тестам, связанным с загрузкой и скачиванием файлов.

### Скачивание файлов

Для браузеров на основе Chromium вы можете обратиться к документации [Download file](https://webdriver.io/docs/api/browser/downloadFile). Если вашим тестовым скриптам нужно прочитать содержимое скачанного файла, его необходимо скачать с удалённого узла Selenium на машину тест-раннера. Вот пример фрагмента кода из образца конфигурации `wdio.conf.ts` для браузера Chrome:

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

### Загрузка файлов в удалённый Selenium Grid

[`element.setFiles()`](/docs/api/element/setFiles) задаёт значение поля ввода файла через WebDriver BiDi. Передаваемые пути открываются браузером, поэтому они должны существовать на машине, где запущен браузер. WebdriverIO не переносит локальный файл на узел Selenium.

```ts
await $('#file-upload').setFiles('/path/on/the/node/file.png')
```

Набор тестов, который использовал `browser.uploadFile()` для передачи данных на узел, должен разместить файл там, где браузер может его прочитать, а затем вызвать `setFiles`. Эндпоинт Selenium [`file`](/docs/api/selenium#file) по-прежнему доступен как `browser.file()` для Chromedriver, Edgedriver и Selenium Grid. Это не команда WebDriver или WebDriver BiDi.

### Другие операции с файлами/гридом

Существует ещё несколько операций, которые можно выполнять с Selenium Grid. Инструкции для Selenium Standalone также должны корректно работать с Selenium Grid. Доступные параметры см. в документации [Selenium Standalone](https://webdriver.io/docs/api/selenium/).


### Официальная документация Selenium Grid

Для получения дополнительной информации о Selenium Grid вы можете обратиться к официальной [документации](https://www.selenium.dev/documentation/grid/) Selenium Grid. 

Если вы хотите запустить Selenium Grid в Docker, Docker compose или Kubernetes, обратитесь к [репозиторию на GitHub](https://github.com/SeleniumHQ/docker-selenium) Selenium-Docker.