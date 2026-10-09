---
id: repl
title: Интерфейс REPL
description: "Используйте REPL WebdriverIO, чтобы пробовать команды и интерактивно отлаживать тесты из командной строки или изнутри запущенного теста."
---

Начиная с версии `v4.5.0`, в WebdriverIO появился интерфейс [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), который помогает не только изучить API фреймворка, но и отлаживать и исследовать ваши тесты. Его можно использовать несколькими способами.

Во-первых, вы можете использовать его как команду CLI, установив `npm install -g @wdio/cli`, и запустить сессию WebDriver из командной строки, например:

```sh
wdio repl chrome
```

Эта команда откроет браузер Chrome, которым можно управлять через интерфейс REPL. Убедитесь, что драйвер браузера запущен на порту `4444`, чтобы инициировать сессию. Если у вас есть аккаунт [Sauce Labs](https://saucelabs.com) (или другого облачного провайдера), вы также можете запустить браузер в облаке прямо из командной строки:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Если драйвер запущен на другом порту, например 9515, его можно указать с помощью аргумента командной строки --port или его псевдонима -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL также можно запустить, используя capabilities из конфигурационного файла WebdriverIO. Wdio поддерживает объект capabilities, а также список или объект capabilities для multi-remote.

Если в конфигурационном файле используется объект capabilities, просто передайте путь к конфигурационному файлу; если же это список или multi-remote capabilities, укажите, какую capability использовать из списка или multi-remote, с помощью позиционного аргумента. Примечание: для списка используется индексация с нуля.

### Пример

WebdriverIO с массивом capabilities:

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

WebdriverIO с объектом capabilities для [multi-remote](https://webdriver.io/docs/multiremote/):

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

Или, если вы хотите запускать локальные мобильные тесты с помощью Appium:

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

Эта команда откроет сессию Chrome/Safari на подключённом устройстве/эмуляторе/симуляторе. Убедитесь, что Appium запущен на порту `4444`, чтобы инициировать сессию.

```sh
wdio repl './path/to/your_app.apk'
```

Эта команда откроет сессию приложения на подключённом устройстве/эмуляторе/симуляторе. Убедитесь, что Appium запущен на порту `4444`, чтобы инициировать сессию.

Capabilities для iOS-устройства можно передать с помощью аргументов:

* `-v`      - `platformVersion`: версия платформы Android/iOS
* `-d`      - `deviceName`: название мобильного устройства
* `-u`      - `udid`: udid для реальных устройств

Использование:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Длинные имена параметров', value: 'long'},
    {label: 'Короткие имена параметров', value: 'short'}
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

Вы можете применить любые опции (см. `wdio repl --help`), доступные для вашей сессии REPL.

### Подключение к `wdio session`

`wdio repl --session <name>` (псевдоним `-s`) не запускает браузер. Эта команда подключает REPL к сессии, которую уже открыл [`wdio session`](/docs/session), а при отключении эта сессия продолжает работать. Приостановка выполнения теста описана в разделе [Отладка теста с помощью сессии](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

В REPL каждая строка выполняется как `wdio session exec`. `.exit` выводит `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Другой способ использовать REPL — внутри ваших тестов с помощью команды [`debug`](/docs/api/browser/debug). При вызове она останавливает браузер и позволяет перейти в приложение (например, в инструменты разработчика) или управлять браузером из командной строки. Это полезно, когда некоторые команды не вызывают ожидаемого действия. С помощью REPL вы можете опробовать команды и выяснить, какие из них работают наиболее надёжно.