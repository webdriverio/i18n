---
id: wdio-lambdatest-service
title: Servizio LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---


> wdio-lambdatest-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Un servizio WebdriverIO che gestisce il tunnel e i metadati dei job per gli utenti LambdaTest.

## Installazione

```bash
npm i wdio-lambdatest-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` si trovano [qui.](https://webdriver.io/docs/gettingstarted.html)


## Configurazione

WebdriverIO ha il supporto per LambdaTest integrato. Dovresti semplicemente impostare `user` e `key` nel tuo file `wdio.conf.js`. Per abilitare la funzionalità per l'automazione delle app, imposta `product: 'appAutomation'` nel tuo file `wdio.conf.js`. Questo plugin di servizio fornisce supporto per [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Imposta anche `tunnel: true` per attivare questa funzionalità.

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

### Per ottenere i commenti sugli errori dei test sulla dashboard di automazione
Per ottenere i commenti sugli errori dei test sulla dashboard di automazione, aggiungi semplicemente `ltErrorRemark: true` nel tuo `wdio.conf.js`.


### Per caricare app da locale o URL
Carica app `android` o `ios` da locale o URL dell'app ospitato aggiungendo questa configurazione richiesta nel tuo `wdio.conf.js`. Per utilizzare l'app caricata per i test nella stessa esecuzione, imposta `enableCapability = true`, questo imposterà il valore dell'URL dell'app nelle capabilities.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true,
        app:{
            app_name : "xyz", //fornisci il nome desiderato per la tua app
            app_path : "/path/to/your/app/file", //fornisci la posizione locale dell'app
            // o
            app_url : "https://example.test_android.apk", //fornisci l'URL dove la tua app è ospitata o memorizzata
            custom_id : "12345", //fornisci il tuo ID personalizzato desiderato
            enableCapability : true
        }
    }
    ]
]
```

## Opzioni

Per autorizzare il servizio LambdaTest, la tua configurazione deve contenere le opzioni [`user`](https://webdriver.io/docs/options.html#user) e [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Imposta questo a true per abilitare il routing delle connessioni dal cloud LambdaTest attraverso il tuo computer. Dovrai anche impostare `tunnel` a true nelle capabilities del browser.

Tipo: `Boolean`<br />
Default: `false`

### lambdatestOpts
Le opzioni specificate verranno passate a LambdaTest Tunnel.

Tipo: `Object`<br />
Default: `{}`

Di seguito è riportato un elenco completo di tutte le opzioni disponibili:

#### tunnelName
Specifica il nome personalizzato del LambdaTest Tunnel da utilizzare.

**Esempio:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Porta per l'attivazione di LambdaTest Tunnel.

**Esempio:**
```json
{"port": 33000}
```
#### user
Nome utente LambdaTest.

**Esempio:**
```json
{"user": "your_username"}
```

#### key
AccessKey LambdaTest.

**Esempio:**
```json
{"key": "your_access_key"}
```

#### verbose
Indica se ogni richiesta proxy deve essere registrata su stdout.

**Esempio:**
```json
{"verbose": true}
```

#### logFile
Posizione del file di log di LambdaTest Tunnel.

**Esempio:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Percorso del file di configurazione da utilizzare.
**Esempio:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Specifica la directory locale che verrà servita da un file server sulla porta del Tunnel.

**Esempio:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Specifica il nome host della porta proxy del Tunnel.

**Esempio:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Specifica il nome utente della porta proxy del Tunnel.

**Esempio:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Specifica la password della porta proxy del Tunnel.

**Esempio:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Specifica il numero di porta in cui si attiverà il proxy del Tunnel.

**Esempio:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Utilizza le impostazioni del proxy solo per le richieste in uscita.

**Esempio:**
```json
{"egressOnly": true}
```


#### ingressOnly
Instrada solo il traffico in entrata tramite il proxy specificato.

**Esempio:**
```json
{"ingressOnly": true}
```


#### pacfile
Per utilizzare PAC (Proxy Auto-Configuration) nei test locali, fornisci
il percorso di un file PAC.

**Esempio:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Attiva il [Bilanciamento del carico](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) per LambdaTest Tunnel.

**Esempio:**
```json
{"loadBalanced": true}
```

#### mode
Specifica in quale modalità deve funzionare il tunnel "ssh" o "ws". (predefinito "ssh").

**Esempio:**
```json
{"mode": "ssh"}
```

#### sshConnType
Specifica il tipo di connessione ssh (over_22, over_443, over_ws). Per utilizzare –sshConnType, specifica prima il flag ––mode ssh.

**Esempio:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Aumenta la connessione SSH dal Client Tunnel al Server Tunnel. Il valore massimo consentito è 30.

**Esempio:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Condivisione del Tunnel tra i membri del team.

**Esempio:**
```json
{"sharedTunnel": true}
```

#### env
L'ambiente su cui verrà eseguito LambdaTest Tunnel.

**Esempio:**
```json
{"env": "production"}
```


#### infoAPIPort
Espone [Tunnel Info API](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) sulla porta specificata.

**Esempio:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL di callback per lo stato del tunnel.

**Esempio:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Elenco separato da virgole di host da instradare tramite tunnel. Tutto il resto sarà instradato tramite Internet.

**Esempio:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Elenco separato da virgole di host da bypassare dal tunnel. Questi saranno instradati tramite internet.

**Esempio:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Percorso del file del Certificato Client mTLS.

**Esempio:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Percorso del file della Chiave Client mTLS.

**Esempio:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Elenco separato da virgole di host mTLS.

**Esempio:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Elenco separato da virgole di server DNS.

**Esempio:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Abilita la modalità [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) per LambdaTest Tunnel.

**Esempio:**
```json
{"mitm": true}
```

#### ntlm
Per utilizzare l'autenticazione Microsoft NTLM (Windows NT LAN Manager) per scopi di comunicazione o trasporto.

**Esempio:**
```json
{"ntlm": true}
```

#### pidfile
Percorso del pidfile, dove verrà scritto l'ID del processo.

**Esempio:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Imposta l'indirizzo remoto a un IP interno della macchina client.

**Esempio:**
```json
{"usePrivateIp": true}
```

Puoi trovare maggiori informazioni su queste opzioni [qui](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Solo per Cucumber. Imposta il nome della sessione al nome dello Scenario se è stato eseguito un solo Scenario.
Utile quando si esegue in parallelo con [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Default: `false`

### sessionNameFormat
Personalizza il formato del nome della sessione.

Tipo: `Function`<br />
Default (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Default (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Solo per Mocha. Non aggiungere il titolo del test al nome della sessione.

Tipo: `Boolean`<br />
Default: `false`

### sessionNamePrependTopLevelSuiteTitle
Solo per Mocha. Anteponi il titolo della suite di livello superiore al nome della sessione.

Tipo: `Boolean`<br />
Default: `false`

### setSessionName
Imposta automaticamente il nome della sessione.

Tipo: `Boolean`<br />
Default: `true`

### setSessionStatus
Imposta automaticamente lo stato della sessione (passato/fallito).

Tipo: `Boolean`<br />
Default: `true`


### ignoreTestCountInName
Ignora il conteggio dei tentativi di un test nel nome

Tipo: `Boolean`<br />
Default: `false`


### useScenarioName
Per ottenere i nomi dei test come nomi di scenario per test specifici di cucumber, aggiungi semplicemente `useScenarioName: true` nel tuo `wdio.conf.js`.

## Passaggi per compilare e pubblicare
1. git clone di questo repository.
2. esegui "npm install"
3. esegui "npm run build"
4. Passaggi per pubblicare: esegui "npm login"
5. esegui "npm publish --access public"

----

Per ulteriori informazioni su WebdriverIO, consulta la [homepage](https://webdriver.io).
