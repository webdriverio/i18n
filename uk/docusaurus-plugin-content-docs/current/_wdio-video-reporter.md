---
id: wdio-video-reporter
title: Відео Репортер
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter це пакет третьої сторони, для отримання додаткової інформації відвідайте [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Це репортер для [Webdriver IO v6 та вище](https://webdriver.io/), який генерує відео ваших тестових виконань wdio. Якщо ви використовуєте allure, тоді тестові випадки автоматично доповнюються відео. (Для Webdriver IO v5, будь ласка, використовуйте wdio-video-reporter версії ^2.0.0.)

Відео зберігаються у `wdio.config.outputDir`

Перегляньте приклад звіту Allure з включеними відео для тестів, що завершились невдало, тут:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Переваги:
- Гарні відео у ваших звітах allure
- Гарні відео зі швидкістю, зручною для людини, навіть якщо тести швидкі
- Працює з Selenium grid
- Працює з усіма веб-драйверами, які підтримують `saveScreenshot`
- Перевірено на наступних настільних браузерах за допомогою Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Перевірено на наступних пристроях iOS та Android з [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Недоліки:
- Працює шляхом створення знімків екрану після "дій", що робить тести трохи повільнішими. Це зменшується шляхом ретельного вибору повідомлень [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), які повинні призвести до створення знімка екрану
- Selenium драйвери не включають alert-boxes та спливаючі вікна у знімках екрану, тому вони не видимі у відео


Швидкий старт
===========

Перегляньте простий шаблон у [wdio-template](https://github.com/presidenten/wdio-template), щоб швидко почати роботу.

Клонуйте один з репозиторіїв та встановіть залежності за допомогою `yarn` або `npm install`. Потім запустіть `yarn e2e` або `npm run e2e` у директорії demo і нарешті `yarn report` або `npm run report`, щоб побачити звіт allure.


Встановлення
============

Встановіть репортер
--------------------

`yarn add wdio-video-reporter`
або
`npm install wdio-video-reporter`


Додайте репортер до конфігурації
--------------------------

У верхній частині файлу `wdio.conf.js` імпортуйте бібліотеку:
```
const video = require('wdio-video-reporter');
```

Потім додайте відео репортер до конфігурації у властивість reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Якщо true, також зберігає відео для успішних тестових випадків
      videoSlowdownMultiplier: 3, // Більше для повільніших відео, менше для швидших відео [Значення 1-100]
    }],
  ],
```


Використання з Allure
-----------------

Додавання репортера Allure автоматично оновлює звіти з відео без необхідності налаштування чогось додатково :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Якщо true, також зберігає відео для успішних тестових випадків
      videoSlowdownMultiplier: 3, // Більше для повільніших відео, менше для швидших відео [Значення 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Конфігурація
=============

Звичайні параметри конфігурації
-------------------------------

Більшість користувачів можуть захотіти встановити такі

- `saveAllVideos` Встановіть true, щоб зберігати відео для тестів, що пройшли. `За замовчуванням: false`
- `videoSlowdownMultiplier` Ціле число між [1-100]. Збільште, якщо відео відтворюються занадто швидко. `За замовчуванням: 3`
- `videoRenderTimeout` Максимальна кількість секунд очікування рендерингу відео. `За замовчуванням: 5`
- `outputDir` Якщо не встановлено, використовується wdio.config.outputDir. `За замовчуванням: undefined`
- `outputDir` Якщо не встановлено, використовується wdio.config.outputDir. `За замовчуванням: undefined`
- `maxTestNameCharacters` Максимальна довжина назви тесту. `За замовчуванням: 250`

Розширені параметри конфігурації
---------------------------------

Просунуті користувачі, які хочуть змінити, коли двигун робить знімок екрану, можуть редагувати ці параметри. Ці масиви можуть бути заповнені останнім словом повідомлення [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), тобто /session/:sessionId/`buttondown`.

- `addExcludedActions` Додати дії, де знімки екрану не потрібні. `За замовчуванням: []`
- `addJsonWireActions` Додати дії, де знімки екрану відсутні. `За замовчуванням: []`
- `recordAllActions` Пропустити фільтрацію і знімати все. (Не рекомендується) `За замовчуванням: false`

Щоб побачити оброблені повідомлення, встановіть `wdio.config.logLevel: 'debug'` і перевірте `outputDir/wdio-X-Y-Video-reporter.log`. Це також залишить вихідну директорію знімків екрану не видаленою для перегляду.

Щоб уникнути додаткового логування і отримувати лише відеофайли, встановіть `wdio.config.logLevel: 'silent'`.

Підтримка Cucumber
----------------

Якщо ви використовуєте репортер Allure, вам потрібно забезпечити наступне:

- Використовуйте `chai` замість вбудованих в Node.js assertions, інакше тести, що не пройшли, будуть відображатися як зламані у ваших step definitions
- Додайте `useCucumberStepReporter: true` до опцій Allure у файлі `wdio.conf.js`, типова конфігурація може виглядати так:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Якщо true, також зберігає відео для успішних тестових випадків
      videoSlowdownMultiplier: 3, // Більше для повільніших відео, менше для швидших відео [Значення 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Для повного прикладу перегляньте гілку cucumber у [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Налаштування Appium
------------

З версії `wdio-video-reporter` 1.2.4 є підтримка, щоб допомогти Allure розрізняти браузери safari та chrome на настільних комп'ютерах та пристроях.
Репортер використовує користувацьку властивість `deviceType` для ідентифікації різних пристроїв.
Рекомендовані значення - `phone` та `tablet`.
Рекомендується також включити `browserVersion` для _всіх_ браузерів, щоб уникнути помилки в веб-драйвері Chrome при використанні пристроїв в одній Selenium grid з настільними браузерами Chrome.

Згенеровані відеофайли також отримають `deviceType`, доданий до назви браузера.

Приклад конфігурації appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

І `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Участь у розробці
============

Зробіть fork, внесіть зміни, напишіть тести, пройдіть linting, запустіть тести, виконайте збірку та перевірте в демо, що зміни працюють як слід, а потім зробіть PR.

Папка demo працює з зібраною версією бібліотеки, тому не забудьте зібрати її, якщо ви додали нові функції і хочете їх перевірити.


Подяки
======

Дякую [Johnson E](https://github.com/jonn-set) за виправлення підтримки Cucumber, про яку запитували багато користувачів.