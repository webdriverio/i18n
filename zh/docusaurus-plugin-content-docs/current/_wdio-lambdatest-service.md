---
id: wdio-lambdatest-service
title: LambdaTest 服务
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service 是一个第三方包，更多信息请查看 [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> 一个WebdriverIO服务，用于管理LambdaTest用户的隧道和工作元数据。

## 安装

```bash
npm i wdio-lambdatest-service --save-dev
```

关于如何安装`WebdriverIO`的说明可以在[这里](https://webdriver.io/docs/gettingstarted.html)找到。


## 配置

WebdriverIO内置了对LambdaTest的支持。你只需在`wdio.conf.js`文件中设置`user`和`key`即可。要为应用自动化启用此功能，请在`wdio.conf.js`文件中设置`product: 'appAutomation'`。此服务插件提供对[LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/)的支持。同时设置`tunnel: true`也可以激活此功能。

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### 在自动化仪表板上获取测试错误备注
要在自动化仪表板上获取测试错误备注，只需在`wdio.conf.js`中添加`ltErrorRemark: true`。


### 从本地或URL上传应用
通过在`wdio.conf.js`中添加此必需配置，从本地或托管应用URL上传`android`或`ios`应用。要在同一运行中使用上传的应用进行测试，请设置`enableCapability = true`，这将在功能中设置应用URL值。

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //提供你想要的应用名称
            app_path : "/path/to/your/app/file", //提供本地应用位置
            // 或
            app_url : "https://example.test_android.apk", //提供托管或存储应用的URL
            custom_id : "12345", //提供你想要的自定义ID
            enableCapability : true
        }
    }
    ]
]
```

## 选项

为了授权访问LambdaTest服务，你的配置需要包含[`user`](https://webdriver.io/docs/options.html#user)和[`key`](https://webdriver.io/docs/options.html#key)选项。

### tunnel
将此设置为true以启用从LambdaTest云通过你的计算机路由连接。你还需要在浏览器功能中将`tunnel`设置为true。

类型：`Boolean`<br />
默认值：`false`

### lambdatestOpts
指定的可选项将传递给LambdaTest Tunnel。

类型：`Object`<br />
默认值：`{}`

以下是所有可用选项的完整列表：

#### tunnelName
指定要使用的自定义LambdaTest Tunnel名称。

**示例：**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
LambdaTest Tunnel激活的端口。

**示例：**
```json
{"port": 33000}
```
#### user
LambdaTest用户名。

**示例：**
```json
{"user": "your_username"}
```

#### key
LambdaTest访问密钥。

**示例：**
```json
{"key": "your_access_key"}
```

#### verbose
是否将每个代理请求记录到标准输出。

**示例：**
```json
{"verbose": true}
```

#### logFile
LambdaTest Tunnel日志文件的位置。

**示例：**
```json
{"logFile": "/path/to/log/file"}
```

#### config

要使用的配置文件路径。
**示例：**
```json
{"config": "/path/to/config/file"}
```

#### dir
指定将由Tunnel端口上的文件服务器提供服务的本地目录。

**示例：**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
指定Tunnel代理端口主机名。

**示例：**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
指定Tunnel代理端口用户名。

**示例：**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
指定Tunnel代理端口密码。

**示例：**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
指定Tunnel代理将激活的端口号。

**示例：**
```json
{"proxyPort": 8080}
```

#### egressOnly
仅对出站请求使用代理设置。

**示例：**
```json
{"egressOnly": true}
```


#### ingressOnly
仅通过指定的代理路由传入流量。

**示例：**
```json
{"ingressOnly": true}
```


#### pacfile
要在本地测试中使用PAC（代理自动配置），请提供PAC文件的路径。

**示例：**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
为LambdaTest Tunnel激活[负载均衡](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/)。

**示例：**
```json
{"loadBalanced": true}
```

#### mode
指定隧道应以哪种模式运行："ssh"或"ws"。（默认为"ssh"）。

**示例：**
```json
{"mode": "ssh"}
```

#### sshConnType
指定ssh连接类型（over_22、over_443、over_ws）。要使用–sshConnType，请先指定––mode ssh标志。

**示例：**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
增加从Tunnel客户端到Tunnel服务器的SSH连接。最大允许值为30。

**示例：**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
在团队成员之间共享Tunnel。

**示例：**
```json
{"sharedTunnel": true}
```

#### env
LambdaTest Tunnel将运行的环境。

**示例：**
```json
{"env": "production"}
```


#### infoAPIPort
在指定端口上暴露[Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis)。

**示例：**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
隧道状态的回调URL。

**示例：**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
通过隧道路由的主机的逗号分隔列表。其他所有内容将通过互联网路由。

**示例：**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
从隧道绕过的主机的逗号分隔列表。这些将通过互联网路由。

**示例：**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
mTLS客户端证书文件路径。

**示例：**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
mTLS客户端密钥文件路径。

**示例：**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
mTLS主机的逗号分隔列表。

**示例：**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
DNS服务器的逗号分隔列表。

**示例：**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
为LambdaTest Tunnel启用[MITM（中间人）](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting)模式。

**示例：**
```json
{"mitm": true}
```

#### ntlm
使用Microsoft NTLM（Windows NT LAN Manager）认证进行通信或传输。

**示例：**
```json
{"ntlm": true}
```

#### pidfile
将写入进程ID的pidfile路径。

**示例：**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
将远程地址设置为客户机的内部IP。

**示例：**
```json
{"usePrivateIp": true}
```

你可以在[这里](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/)找到有关这些选项的更多信息。

### preferScenarioName
仅适用于Cucumber。如果只运行单个场景，则将会话名称设置为场景名称。
在与[wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution)并行运行时很有用。

类型：`Boolean`<br />
默认值：`false`

### sessionNameFormat
自定义会话名称格式。

类型：`Function`<br />
默认值（Cucumber/Jasmine）：`(config, capabilities, suiteTitle) => suiteTitle`<br />
默认值（Mocha）：`(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
仅适用于Mocha。不要将测试标题附加到会话名称。

类型：`Boolean`<br />
默认值：`false`

### sessionNamePrependTopLevelSuiteTitle
仅适用于Mocha。将顶级套件标题前置到会话名称。

类型：`Boolean`<br />
默认值：`false`

### setSessionName
自动设置会话名称。

类型：`Boolean`<br />
默认值：`true`

### setSessionStatus
自动设置会话状态（通过/失败）。

类型：`Boolean`<br />
默认值：`true`


### ignoreTestCountInName
在名称中忽略测试重试的计数

类型：`Boolean`<br />
默认值：`false`


### useScenarioName
要获取特定于cucumber的测试的场景名称作为测试名称，只需在`wdio.conf.js`中添加`useScenarioName: true`。

## 编译和发布的步骤
1. 克隆此存储库。
2. 运行"npm install"
3. 运行"npm run build"
4. 发布步骤：运行"npm login"
5. 运行"npm publish --access public"

----

有关WebdriverIO的更多信息，请查看[主页](https://webdriver.io)。