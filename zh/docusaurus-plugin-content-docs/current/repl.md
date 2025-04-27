---
id: repl
title: REPL接口
---

从`v4.5.0`版本开始，WebdriverIO引入了[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)接口，它不仅帮助你学习框架API，还可以调试和检查你的测试。它可以通过多种方式使用。

首先，你可以通过安装`npm install -g @wdio/cli`作为CLI命令使用，并从命令行启动WebDriver会话，例如：

```sh
wdio repl chrome
```

这将打开一个Chrome浏览器，你可以通过REPL接口控制它。确保你有一个在端口`4444`上运行的浏览器驱动程序以初始化会话。如果你有[Sauce Labs](https://saucelabs.com)（或其他云供应商）账户，你也可以直接通过命令行在云端运行浏览器：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

如果驱动程序运行在不同的端口上，例如：9515，可以通过命令行参数--port或简写-p来传递

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

也可以使用WebdriverIO配置文件中的capabilities来运行Repl。Wdio支持capabilities对象；或；多远程capability列表或对象。

如果配置文件使用capabilities对象，则只需传递配置文件的路径，否则如果是多远程capability，则使用位置参数指定要从列表或多远程中使用哪个capability。注意：对于列表，我们考虑基于零的索引。

### 示例

使用capability数组的WebdriverIO：

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

使用[multiremote](https://webdriver.io/docs/multiremote/)capability对象的WebdriverIO：

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

或者如果你想使用Appium运行本地移动测试：

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

这将在连接的设备/模拟器/模拟器上打开Chrome/Safari会话。确保Appium在端口`4444`上运行，以便初始化会话。

```sh
wdio repl './path/to/your_app.apk'
```

这将在连接的设备/模拟器/模拟器上打开应用程序会话。确保Appium在端口`4444`上运行，以便初始化会话。

iOS设备的capabilities可以通过以下参数传递：

* `-v`      - `platformVersion`: Android/iOS平台的版本
* `-d`      - `deviceName`: 移动设备的名称
* `-u`      - `udid`: 真实设备的udid

用法：

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

你可以为REPL会话应用任何可用的选项（参见`wdio repl --help`）。

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

使用REPL的另一种方式是通过[`debug`](/docs/api/browser/debug)命令在测试内部使用。这将在调用时停止浏览器，并使你能够跳转到应用程序（例如开发工具）或从命令行控制浏览器。当某些命令无法按预期触发特定操作时，这很有帮助。使用REPL，你可以尝试不同的命令，看看哪些命令最可靠。