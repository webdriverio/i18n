---
id: wdio-lambdatest-service
title: Service LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---


> wdio-lambdatest-service est un package tiers, pour plus d'informations, voir [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Un service WebdriverIO qui gère le tunnel et les métadonnées des tâches pour les utilisateurs de LambdaTest.

## Installation

```bash
npm i wdio-lambdatest-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)


## Configuration

WebdriverIO prend en charge LambdaTest nativement. Vous devez simplement définir `user` et `key` dans votre fichier `wdio.conf.js`. Pour activer la fonctionnalité pour l'automatisation d'applications, définissez `product: 'appAutomation'` dans votre fichier `wdio.conf.js`. Ce plugin de service prend en charge [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Définissez également `tunnel: true` pour activer cette fonctionnalité.

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

### Pour obtenir des remarques sur les erreurs de test sur le tableau de bord d'automatisation
Pour obtenir des remarques sur les erreurs de test sur le tableau de bord d'automatisation, ajoutez simplement `ltErrorRemark: true` dans votre `wdio.conf.js`.


### Pour télécharger une application depuis un emplacement local ou une URL
Téléchargez des applications `android` ou `ios` depuis un emplacement local ou une URL d'application hébergée en ajoutant cette configuration requise dans votre `wdio.conf.js`. Pour utiliser l'application téléchargée pour les tests dans la même exécution, définissez `enableCapability = true`, cela définira la valeur de l'URL de l'application dans les capacités.

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

## Options

Pour s'authentifier auprès du service LambdaTest, votre configuration doit contenir une option [`user`](https://webdriver.io/docs/options.html#user) et [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Définissez-le sur true pour permettre aux connexions du cloud LambdaTest de passer par votre ordinateur. Vous devrez également définir `tunnel` sur true dans les capacités du navigateur.

Type: `Boolean`<br />
Par défaut: `false`

### lambdatestOpts
Les options spécifiées seront transmises à LambdaTest Tunnel.

Type: `Object`<br />
Par défaut: `{}`

Voici une liste complète de toutes les options disponibles :

#### tunnelName
Spécifie le nom personnalisé du tunnel LambdaTest à utiliser.

**Exemple:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Port pour activer LambdaTest Tunnel.

**Exemple:**
```json
{"port": 33000}
```
#### user
Nom d'utilisateur LambdaTest.

**Exemple:**
```json
{"user": "your_username"}
```

#### key
Clé d'accès LambdaTest.

**Exemple:**
```json
{"key": "your_access_key"}
```

#### verbose
Chaque demande de proxy doit-elle être enregistrée dans stdout.

**Exemple:**
```json
{"verbose": true}
```

#### logFile
Emplacement du fichier journal LambdaTest Tunnel.

**Exemple:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Chemin du fichier de configuration à utiliser.
**Exemple:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Spécifiez le répertoire local qui sera servi par un serveur de fichiers sur le port Tunnel.

**Exemple:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Spécifie le nom d'hôte du port proxy Tunnel.

**Exemple:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Spécifie le nom d'utilisateur du port proxy Tunnel.

**Exemple:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Spécifie le mot de passe du port proxy Tunnel.

**Exemple:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Spécifie le numéro de port où le proxy Tunnel s'activera.

**Exemple:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Utilise les paramètres de proxy uniquement pour les requêtes sortantes.

**Exemple:**
```json
{"egressOnly": true}
```


#### ingressOnly
Route uniquement le trafic entrant via le proxy spécifié.

**Exemple:**
```json
{"ingressOnly": true}
```


#### pacfile
Pour utiliser PAC (Proxy Auto-Configuration) dans les tests locaux, fournissez
le chemin d'un fichier PAC.

**Exemple:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Active [l'équilibrage de charge](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) pour LambdaTest Tunnel.

**Exemple:**
```json
{"loadBalanced": true}
```

#### mode
Spécifie dans quel mode le tunnel doit fonctionner "ssh" ou "ws". (par défaut "ssh").

**Exemple:**
```json
{"mode": "ssh"}
```

#### sshConnType
Spécifiez le type de connexion ssh (over_22, over_443, over_ws). Pour utiliser –sshConnType, spécifiez d'abord le drapeau ––mode ssh.

**Exemple:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Augmente la connexion SSH du client Tunnel au serveur Tunnel. La valeur maximale autorisée est 30.

**Exemple:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Partage du tunnel entre les membres de l'équipe.

**Exemple:**
```json
{"sharedTunnel": true}
```

#### env
L'environnement sur lequel le tunnel LambdaTest fonctionnera.

**Exemple:**
```json
{"env": "production"}
```


#### infoAPIPort
Expose [l'API d'informations sur le tunnel](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) sur le port spécifié.

**Exemple:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL de rappel pour l'état du tunnel.

**Exemple:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Liste séparée par des virgules des hôtes à acheminer via le tunnel. Tout le reste sera acheminé via Internet.

**Exemple:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Liste séparée par des virgules des hôtes à contourner du tunnel. Ceux-ci seront acheminés via Internet.

**Exemple:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Chemin du fichier de certificat client mTLS.

**Exemple:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Chemin du fichier de clé client mTLS.

**Exemple:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Liste séparée par des virgules des hôtes mTLS.

**Exemple:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Liste séparée par des virgules des serveurs DNS.

**Exemple:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Activer le mode [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) pour LambdaTest Tunnel.

**Exemple:**
```json
{"mitm": true}
```

#### ntlm
Pour utiliser l'authentification Microsoft NTLM (Windows NT LAN Manager) à des fins de communication ou de transport.

**Exemple:**
```json
{"ntlm": true}
```

#### pidfile
Chemin du fichier pid, où l'ID du processus sera écrit.

**Exemple:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Définit l'adresse distante à une IP interne de la machine client.

**Exemple:**
```json
{"usePrivateIp": true}
```

Vous pouvez en savoir plus sur ces options [ici](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Cucumber uniquement. Définit le nom de la session sur le nom du scénario si un seul scénario est exécuté.
Utile lors de l'exécution en parallèle avec [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Type: `Boolean`<br />
Par défaut: `false`

### sessionNameFormat
Personnalisez le format du nom de la session.

Type: `Function`<br />
Par défaut (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Par défaut (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Mocha uniquement. N'ajoutez pas le titre du test au nom de la session.

Type: `Boolean`<br />
Par défaut: `false`

### sessionNamePrependTopLevelSuiteTitle
Mocha uniquement. Ajoutez le titre de la suite de niveau supérieur au nom de la session.

Type: `Boolean`<br />
Par défaut: `false`

### setSessionName
Définit automatiquement le nom de la session.

Type: `Boolean`<br />
Par défaut: `true`

### setSessionStatus
Définit automatiquement le statut de la session (réussi/échoué).

Type: `Boolean`<br />
Par défaut: `true`


### ignoreTestCountInName
Ignorer le nombre de tentatives d'un test dans le nom

Type: `Boolean`<br />
Par défaut: `false`


### useScenarioName
Pour obtenir des noms de tests en tant que noms de scénarios pour les tests spécifiques à Cucumber, ajoutez simplement `useScenarioName: true` dans votre `wdio.conf.js`.

## Étapes pour compiler et publier
1. clonez ce dépôt git.
2. exécutez "npm install"
3. exécutez "npm run build"
4. Étapes pour publier : exécutez "npm login"
5. exécutez "npm publish --access public"

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).