---
id: wdio-lambdatest-service
title: Usługa LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Usługa WebdriverIO, która zarządza tunelem i metadanymi zadań dla użytkowników LambdaTest.

## Instalacja

```bash
npm i wdio-lambdatest-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](https://webdriver.io/docs/gettingstarted.html)


## Konfiguracja

WebdriverIO ma wbudowaną obsługę LambdaTest. Wystarczy ustawić `user` i `key` w pliku `wdio.conf.js`. Aby włączyć funkcję automatyzacji aplikacji, ustaw `product: 'appAutomation'` w pliku `wdio.conf.js`. Ta wtyczka usługi zapewnia wsparcie dla [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Ustaw również `tunnel: true`, aby aktywować tę funkcję.

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

### Aby uzyskać uwagi o błędach testu na pulpicie automatyzacji
Aby uzyskać uwagi o błędach testu na pulpicie automatyzacji, po prostu dodaj `ltErrorRemark: true` w swoim `wdio.conf.js`.


### Aby przesłać aplikację z lokalnego źródła lub URL
Prześlij aplikacje `android` lub `ios` z lokalnego źródła lub hostowanego URL aplikacji, dodając wymaganą konfigurację w swoim `wdio.conf.js`. Aby używać przesłanej aplikacji do testowania w tym samym uruchomieniu, ustaw `enableCapability = true`, co ustawi wartość URL aplikacji w możliwościach.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## Opcje

Aby autoryzować usługę LambdaTest, Twoja konfiguracja musi zawierać opcje [`user`](https://webdriver.io/docs/options.html#user) i [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Ustaw to na true, aby włączyć przekierowanie połączeń z chmury LambdaTest przez Twój komputer. Będziesz musiał również ustawić `tunnel` na true w możliwościach przeglądarki.

Typ: `Boolean`<br />
Domyślnie: `false`

### lambdatestOpts
Określone opcjonalne parametry zostaną przekazane do LambdaTest Tunnel.

Typ: `Object`<br />
Domyślnie: `{}`

Poniżej znajduje się kompleksowa lista wszystkich dostępnych opcji:

#### tunnelName
Określa niestandardową nazwę LambdaTest Tunnel, która ma być używana.

**Przykład:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Port, na którym ma być aktywowany LambdaTest Tunnel.

**Przykład:**
```json
{"port": 33000}
```
#### user
Nazwa użytkownika LambdaTest.

**Przykład:**
```json
{"user": "your_username"}
```

#### key
Klucz dostępu LambdaTest.

**Przykład:**
```json
{"key": "your_access_key"}
```

#### verbose
Czy każde żądanie proxy powinno być logowane do stdout.

**Przykład:**
```json
{"verbose": true}
```

#### logFile
Lokalizacja pliku dziennika LambdaTest Tunnel.

**Przykład:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Ścieżka pliku konfiguracyjnego do użycia.
**Przykład:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Określ lokalny katalog, który będzie udostępniany przez serwer plików na porcie Tunnel.

**Przykład:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Określa nazwę hosta portu proxy Tunnel.

**Przykład:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Określa nazwę użytkownika portu proxy Tunnel.

**Przykład:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Określa hasło portu proxy Tunnel.

**Przykład:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Określa numer portu, na którym zostanie aktywowany proxy Tunnel.

**Przykład:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Używa ustawień proxy tylko dla żądań wychodzących.

**Przykład:**
```json
{"egressOnly": true}
```


#### ingressOnly
Kieruje tylko ruch przychodzący przez określone proxy.

**Przykład:**
```json
{"ingressOnly": true}
```


#### pacfile
Aby używać PAC (Proxy Auto-Configuration) w testach lokalnych, podaj
ścieżkę do pliku PAC.

**Przykład:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Aktywuje [Load Balancing](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) dla LambdaTest Tunnel.

**Przykład:**
```json
{"loadBalanced": true}
```

#### mode
Określa, w jakim trybie powinien działać tunel: "ssh" lub "ws". (domyślnie "ssh").

**Przykład:**
```json
{"mode": "ssh"}
```

#### sshConnType
Określa typ połączenia ssh (over_22, over_443, over_ws). Aby użyć –sshConnType, najpierw określ flagę ––mode ssh.

**Przykład:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Zwiększa liczbę połączeń SSH z klienta Tunnel do serwera Tunnel. Maksymalna dozwolona wartość to 30.

**Przykład:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Udostępnianie Tunnel między członkami zespołu.

**Przykład:**
```json
{"sharedTunnel": true}
```

#### env
Środowisko, na którym będzie działał LambdaTest Tunnel.

**Przykład:**
```json
{"env": "production"}
```


#### infoAPIPort
Udostępnia [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) na określonym porcie.

**Przykład:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL wywołania zwrotnego dla statusu tunelu.

**Przykład:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Lista hostów oddzielonych przecinkami, które mają być kierowane przez tunel. Wszystko inne będzie kierowane przez Internet.

**Przykład:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Lista hostów oddzielonych przecinkami, które mają być pomijane przez tunel. Będą one kierowane przez internet.

**Przykład:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```


#### clientCert
Ścieżka pliku certyfikatu klienta mTLS.

**Przykład:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Ścieżka pliku klucza klienta mTLS.

**Przykład:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Lista hostów mTLS oddzielonych przecinkami.

**Przykład:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Lista serwerów DNS oddzielonych przecinkami.

**Przykład:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Włącz tryb [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) dla LambdaTest Tunnel.

**Przykład:**
```json
{"mitm": true}
```

#### ntlm
Aby używać uwierzytelniania Microsoft NTLM (Windows NT LAN Manager) do komunikacji lub celów transportowych.

**Przykład:**
```json
{"ntlm": true}
```

#### pidfile
Ścieżka pliku pid, gdzie będzie zapisany identyfikator procesu.

**Przykład:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Ustawia zdalny adres na wewnętrzny adres IP maszyny klienta.

**Przykład:**
```json
{"usePrivateIp": true}
```

Więcej informacji o tych opcjach znajdziesz [tutaj](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Tylko dla Cucumber. Ustaw nazwę sesji na nazwę scenariusza, jeśli uruchomiono tylko jeden scenariusz.
Przydatne podczas uruchamiania równoległego z [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Typ: `Boolean`<br />
Domyślnie: `false`

### sessionNameFormat
Dostosuj format nazwy sesji.

Typ: `Function`<br />
Domyślnie (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Domyślnie (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Tylko dla Mocha. Nie dołączaj tytułu testu do nazwy sesji.

Typ: `Boolean`<br />
Domyślnie: `false`

### sessionNamePrependTopLevelSuiteTitle
Tylko dla Mocha. Dodaj tytuł zestawu najwyższego poziomu do nazwy sesji.

Typ: `Boolean`<br />
Domyślnie: `false`

### setSessionName
Automatycznie ustaw nazwę sesji.

Typ: `Boolean`<br />
Domyślnie: `true`

### setSessionStatus
Automatycznie ustaw status sesji (zaliczony/niezaliczony).

Typ: `Boolean`<br />
Domyślnie: `true`


### ignoreTestCountInName
Ignoruj liczbę powtórzeń testu w nazwie

Typ: `Boolean`<br />
Domyślnie: `false`


### useScenarioName
Aby uzyskać nazwy testów jako nazwy scenariuszy dla testów Cucumber, po prostu dodaj `useScenarioName: true` w swoim `wdio.conf.js`.

## Kroki do kompilacji i publikacji
1. git clone tego repozytorium.
2. uruchom "npm install"
3. uruchom "npm run build"
4. Kroki do publikacji: uruchom "npm login"
5. uruchom "npm publish --access public"

----

Więcej informacji na temat WebdriverIO można znaleźć na [stronie głównej](https://webdriver.io).