---
id: wdio-lambdatest-service
title: LambdaTest Service
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Ein WebdriverIO-Service, der Tunnel und Job-Metadaten für LambdaTest-Benutzer verwaltet.

## Installation

```bash
npm i wdio-lambdatest-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted.html)


## Konfiguration

WebdriverIO bietet standardmäßig LambdaTest-Unterstützung. Sie sollten einfach `user` und `key` in Ihrer `wdio.conf.js` Datei einstellen. Um die Funktion für App-Automatisierung zu aktivieren, setzen Sie `product: 'appAutomation'` in Ihrer `wdio.conf.js` Datei. Dieses Service-Plugin bietet Unterstützung für [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Setzen Sie auch `tunnel: true`, um diese Funktion zu aktivieren.

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

### Um Testfehlerbemerkungen im Automatisierungs-Dashboard zu erhalten
Um Testfehlerbemerkungen im Automatisierungs-Dashboard zu erhalten, fügen Sie einfach `ltErrorRemark: true` in Ihrer `wdio.conf.js` hinzu.


### Um Apps von lokal oder URL hochzuladen
Laden Sie `android` oder `ios` Apps von lokalen oder gehosteten App-URLs hoch, indem Sie diese erforderliche Konfiguration in Ihrer `wdio.conf.js` hinzufügen. Um die hochgeladene App gleichzeitig in demselben Durchlauf zum Testen zu verwenden, setzen Sie `enableCapability = true`, dadurch wird der App-URL-Wert in den Capabilities festgelegt.

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

## Optionen

Um sich beim LambdaTest-Service zu authentifizieren, muss Ihre Konfiguration die Optionen [`user`](https://webdriver.io/docs/options.html#user) und [`key`](https://webdriver.io/docs/options.html#key) enthalten.

### tunnel
Setzen Sie dies auf true, um die Weiterleitung von Verbindungen von der LambdaTest-Cloud durch Ihren Computer zu ermöglichen. Sie müssen auch `tunnel` in den Browser-Capabilities auf true setzen.

Typ: `Boolean`<br />
Standard: `false`

### lambdatestOpts
Spezifizierte Optionen werden an LambdaTest Tunnel weitergegeben.

Typ: `Object`<br />
Standard: `{}`

Nachfolgend finden Sie eine umfassende Liste aller verfügbaren Optionen:

#### tunnelName
Gibt den benutzerdefinierten LambdaTest Tunnel-Namen an, der verwendet werden soll.

**Beispiel:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Port, auf dem LambdaTest Tunnel aktiviert werden soll.

**Beispiel:**
```json
{"port": 33000}
```
#### user
LambdaTest Benutzername.

**Beispiel:**
```json
{"user": "your_username"}
```

#### key
LambdaTest Zugangsschlüssel.

**Beispiel:**
```json
{"key": "your_access_key"}
```

#### verbose
Soll jede Proxyanfrage in der Standardausgabe protokolliert werden.

**Beispiel:**
```json
{"verbose": true}
```

#### logFile
Ort der LambdaTest Tunnel-Protokolldatei.

**Beispiel:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Pfad der zu verwendenden Konfigurationsdatei.
**Beispiel:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Geben Sie das lokale Verzeichnis an, das von einem Dateiserver am Tunnel-Port bereitgestellt wird.

**Beispiel:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Gibt den Hostnamen des Tunnel-Proxy-Ports an.

**Beispiel:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Gibt den Benutzernamen des Tunnel-Proxy-Ports an.

**Beispiel:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Gibt das Passwort des Tunnel-Proxy-Ports an.

**Beispiel:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Gibt die Portnummer an, an der der Tunnel-Proxy aktiviert wird.

**Beispiel:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Verwendet Proxy-Einstellungen nur für ausgehende Anfragen.

**Beispiel:**
```json
{"egressOnly": true}
```


#### ingressOnly
Leitet nur eingehenden Verkehr über den angegebenen Proxy.

**Beispiel:**
```json
{"ingressOnly": true}
```


#### pacfile
Um PAC (Proxy Auto-Configuration) beim lokalen Testen zu verwenden, geben Sie
den Pfad einer PAC-Datei an.

**Beispiel:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Aktiviert [Load Balancing](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) für LambdaTest Tunnel.

**Beispiel:**
```json
{"loadBalanced": true}
```

#### mode
Gibt an, in welchem Modus der Tunnel laufen soll: "ssh" oder "ws". (Standard "ssh").

**Beispiel:**
```json
{"mode": "ssh"}
```

#### sshConnType
Geben Sie den Typ der SSH-Verbindung an (over_22, over_443, over_ws). Um –sshConnType zu verwenden, geben Sie zuerst das Flag ––mode ssh an.

**Beispiel:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Erhöhen Sie die SSH-Verbindung vom Tunnel-Client zum Tunnel-Server. Der maximal zulässige Wert ist 30.

**Beispiel:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Tunnel unter Teammitgliedern teilen.

**Beispiel:**
```json
{"sharedTunnel": true}
```

#### env
Die Umgebung, in der der LambdaTest Tunnel ausgeführt wird.

**Beispiel:**
```json
{"env": "production"}
```


#### infoAPIPort
Stellt [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) am angegebenen Port zur Verfügung.

**Beispiel:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
Callback-URL für den Tunnel-Status.

**Beispiel:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Kommagetrennte Liste von Hosts, die über den Tunnel geleitet werden sollen. Alles andere wird über das Internet geleitet.

**Beispiel:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Kommagetrennte Liste von Hosts, die vom Tunnel umgangen werden sollen. Diese werden über das Internet geleitet.

**Beispiel:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
mTLS Client-Zertifikat-Dateipfad.

**Beispiel:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
mTLS Client-Schlüssel-Dateipfad.

**Beispiel:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Kommagetrennte Liste von mTLS-Hosts.

**Beispiel:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Kommagetrennte Liste von DNS-Servern.

**Beispiel:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Aktivieren Sie den [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) Modus für LambdaTest Tunnel.

**Beispiel:**
```json
{"mitm": true}
```

#### ntlm
Um die Microsoft NTLM (Windows NT LAN Manager) Authentifizierung für Kommunikations- oder Transportzwecke zu verwenden.

**Beispiel:**
```json
{"ntlm": true}
```

#### pidfile
Pfad der pidfile, in die die Prozess-ID geschrieben wird.

**Beispiel:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Setzt die Remote-Adresse auf eine interne IP der Client-Maschine.

**Beispiel:**
```json
{"usePrivateIp": true}
```

Weitere Informationen zu diesen Optionen finden Sie [hier](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Nur Cucumber. Setzen Sie den Sitzungsnamen auf den Szenarionamen, wenn nur ein einzelnes Szenario ausgeführt wurde.
Nützlich bei paralleler Ausführung mit [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Typ: `Boolean`<br />
Standard: `false`

### sessionNameFormat
Passen Sie das Sitzungsnamenformat an.

Typ: `Function`<br />
Standard (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Standard (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Nur Mocha. Hängen Sie den Testtitel nicht an den Sitzungsnamen an.

Typ: `Boolean`<br />
Standard: `false`

### sessionNamePrependTopLevelSuiteTitle
Nur Mocha. Stellen Sie den Titel der obersten Suite dem Sitzungsnamen voran.

Typ: `Boolean`<br />
Standard: `false`

### setSessionName
Legen Sie den Sitzungsnamen automatisch fest.

Typ: `Boolean`<br />
Standard: `true`

### setSessionStatus
Legen Sie den Sitzungsstatus automatisch fest (bestanden/fehlgeschlagen).

Typ: `Boolean`<br />
Standard: `true`


### ignoreTestCountInName
Ignorieren Sie die Anzahl der Wiederholungen eines Tests im Namen

Typ: `Boolean`<br />
Standard: `false`


### useScenarioName
Um Testnamen als Szenarionamen für Cucumber-spezifische Tests zu erhalten, fügen Sie einfach `useScenarioName: true` in Ihrer `wdio.conf.js` hinzu.

## Schritte zum Kompilieren und Veröffentlichen
1. Klonen Sie dieses Repository.
2. Führen Sie "npm install" aus
3. Führen Sie "npm run build" aus
4. Schritte zum Veröffentlichen: Führen Sie "npm login" aus
5. Führen Sie "npm publish --access public" aus

----

Weitere Informationen zu WebdriverIO finden Sie auf der [Homepage](https://webdriver.io).