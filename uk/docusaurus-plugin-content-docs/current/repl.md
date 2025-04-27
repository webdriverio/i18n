---
id: repl
title: REPL інтерфейс
---

З версії `v4.5.0` WebdriverIO представив [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) інтерфейс, який допомагає не тільки вивчати API фреймворку, але також налагоджувати та аналізувати ваші тести. Його можна використовувати різними способами.

Спочатку ви можете використовувати його як команду CLI, встановивши `npm install -g @wdio/cli` та запустити WebDriver сесію з командного рядка, наприклад:

```sh
wdio repl chrome
```

Це відкриє браузер Chrome, яким ви можете керувати через REPL інтерфейс. Переконайтеся, що у вас запущений драйвер браузера на порту `4444` для ініціалізації сесії. Якщо у вас є акаунт [Sauce Labs](https://saucelabs.com) (або іншого хмарного провайдера), ви також можете запустити браузер безпосередньо з командного рядка в хмарі через:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Якщо драйвер працює на іншому порту, наприклад: 9515, його можна передати за допомогою аргументу командного рядка --port або скорочено -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl також можна запустити, використовуючи можливості з конфігураційного файлу webdriverIO. Wdio підтримує об'єкт capabilities; або список можливостей multiremote або об'єкт.

Якщо конфігураційний файл використовує об'єкт capabilities, то просто передайте шлях до конфігураційного файлу, інакше, якщо це можливість multiremote, вкажіть, яку можливість використовувати зі списку або multiremote, використовуючи позиційний аргумент. Примітка: для списку ми розглядаємо індекс на основі нуля.

### Приклад

WebdriverIO з масивом capabilities:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO з об'єктом можливостей [multiremote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Або якщо ви хочете запустити локальні мобільні тести за допомогою Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Це відкриє сесію Chrome/Safari на підключеному пристрої/емуляторі/симуляторі. Переконайтеся, що Appium працює на порту `4444` для ініціалізації сесії.

```sh
wdio repl './path/to/your_app.apk'
```

Це відкриє сесію додатка на підключеному пристрої/емуляторі/симуляторі. Переконайтеся, що Appium працює на порту `4444` для ініціалізації сесії.

Можливості для пристрою iOS можна передати за допомогою аргументів:

* `-v`      - `platformVersion`: версія платформи Android/iOS
* `-d`      - `deviceName`: назва мобільного пристрою
* `-u`      - `udid`: udid для реальних пристроїв

Використання:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Ви можете застосувати будь-які опції (див. `wdio repl --help`), доступні для вашої сесії REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Інший спосіб використання REPL - всередині ваших тестів через команду [`debug`](/docs/api/browser/debug). Це зупинить браузер при виклику і дозволить вам перейти до додатку (наприклад, до інструментів розробника) або керувати браузером з командного рядка. Це корисно, коли деякі команди не викликають певну дію, як очікувалося. За допомогою REPL ви можете спробувати команди, щоб побачити, які з них працюють найбільш надійно.