---
id: repl
title: Интерфейс REPL
---

Начиная с версии `v4.5.0`, WebdriverIO представил интерфейс [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), который помогает не только изучать API фреймворка, но также отлаживать и проверять ваши тесты. Он может использоваться различными способами.

Во-первых, вы можете использовать его как команду CLI, установив `npm install -g @wdio/cli` и запустив сессию WebDriver из командной строки, например:

```sh
wdio repl chrome
```

Это откроет браузер Chrome, которым вы можете управлять через интерфейс REPL. Убедитесь, что драйвер браузера запущен на порту `4444` для инициализации сессии. Если у вас есть аккаунт [Sauce Labs](https://saucelabs.com) (или другого облачного провайдера), вы также можете напрямую запустить браузер в облаке через командную строку:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Если драйвер запущен на другом порту, например, 9515, его можно указать с помощью аргумента командной строки --port или сокращенно -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl также может быть запущен с использованием возможностей из конфигурационного файла webdriverIO. Wdio поддерживает объект capabilities; или; список возможностей multiremote или объект.

Если конфигурационный файл использует объект capabilities, просто укажите путь к файлу конфигурации, а если это возможность multiremote, то укажите, какую возможность использовать из списка или multiremote, используя позиционный аргумент. Примечание: для списка мы используем индекс с нуля.

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

WebdriverIO с объектом возможностей [multiremote](https://webdriver.io/docs/multiremote/):

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

Или если вы хотите запустить локальные мобильные тесты с использованием Appium:

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

Это откроет сессию Chrome/Safari на подключенном устройстве/эмуляторе/симуляторе. Убедитесь, что Appium запущен на порту `4444` для инициализации сессии.

```sh
wdio repl './path/to/your_app.apk'
```

Это откроет сессию приложения на подключенном устройстве/эмуляторе/симуляторе. Убедитесь, что Appium запущен на порту `4444` для инициализации сессии.

Возможности для устройства iOS можно передать с аргументами:

* `-v`      - `platformVersion`: версия платформы Android/iOS
* `-d`      - `deviceName`: имя мобильного устройства
* `-u`      - `udid`: udid для реальных устройств

Использование:

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

Вы можете применить любые доступные опции (см. `wdio repl --help`) для вашей сессии REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Другой способ использования REPL - это внутри ваших тестов через команду [`debug`](/docs/api/browser/debug). Это остановит браузер при вызове и позволит вам перейти в приложение (например, в инструменты разработчика) или управлять браузером из командной строки. Это полезно, когда некоторые команды не срабатывают должным образом. С помощью REPL вы можете попробовать разные команды, чтобы определить, какие из них работают наиболее надежно.