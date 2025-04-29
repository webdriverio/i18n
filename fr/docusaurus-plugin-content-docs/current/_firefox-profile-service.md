---
id: firefox-profile-service
title: Service de Profil Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


Vous souhaitez exécuter votre navigateur Firefox avec une extension spécifique ou définir quelques préférences ? Selenium vous permet d'utiliser un profil pour le navigateur Firefox en transmettant ce profil sous forme de chaîne `base64` à la propriété `moz:firefoxOptions.profile` dans vos capacités souhaitées. Cela nécessite de construire ce profil et de le convertir en `base64`. Ce service pour le [testrunner wdio](https://webdriver.io/docs/clioptions) vous évite le travail de compilation du profil et vous permet de définir confortablement vos options souhaitées à partir du fichier `wdio.conf.js`.

Pour trouver toutes les options possibles, ouvrez [about:config](about:config) dans votre navigateur Firefox ou visitez le site [mozillaZine](http://kb.mozillazine.org/About:config_entries) pour trouver la documentation complète sur chaque paramètre. En plus de cela, vous pouvez définir des extensions Firefox compilées (sous forme de `*.xpi`) qui doivent être installées avant le début du test.

## Installation

La façon la plus simple est de garder `@wdio/firefox-profile-service` comme devDependency dans votre `package.json`, via :

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Configuration

Configurez votre profil en ajoutant le service `firefox-profile` à votre liste de services. Ensuite, définissez vos paramètres dans la propriété `firefoxProfile` comme ceci :

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // chemin vers le fichier .xpi
                '/path/to/extensionB' // ou chemin vers l'extension Firefox décompressée
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // utiliser uniquement pour firefox <= 55
        }]
    ],
    // ...
};
```

Si vous avez créé une extension Firefox personnalisée que vous souhaitez installer dans le navigateur, assurez-vous de définir `'xpinstall.signatures.required': false` comme indicateur de profil car les extensions Firefox doivent être [signées par Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Pour utiliser des extensions personnalisées non signées, vous devrez également utiliser [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) car le Firefox standard 48 et plus récent [ne le permettent pas](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Options

Contient tous les paramètres sous forme de paires clé-valeur. Vous pouvez trouver tous les paramètres disponibles sur la page `about:config`.

### extensions

Ajoutez une ou plusieurs extensions à la session du navigateur. Toutes les entrées peuvent être soit un chemin absolu vers le fichier `.xpi`, soit le chemin vers un répertoire d'extension Firefox décompressé.

Type: `String[]`<br />
Par défaut: `[]`

### profileDirectory

Créez un profil Firefox basé sur un profil existant en définissant un chemin absolu vers ce profil.

Type: `String`<br />
Par défaut: `null`

### proxy

Définissez les paramètres de proxy réseau. Le paramètre `proxy` est un objet dont la structure dépend de la valeur de la clé obligatoire `proxyType`, qui prend l'une des valeurs de chaîne suivantes :

 * `direct` - connexion directe (pas de proxy)
 * `system` - utiliser les paramètres de proxy du système d'exploitation
 * `pac` - utiliser une configuration de proxy automatique basée sur la valeur de la clé `autoconfigUrl`
 * `manual` - paramètres de proxy manuels définis séparément pour différents protocoles en utilisant les valeurs des clés suivantes : `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Type: `Object`<br />
Par défaut: `null`<br />
Exemple:

- Proxy Automatique:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP Manuel:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP et HTTPS Manuel:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Veuillez définir cet indicateur sur `true` si vous utilisez Firefox v55 ou inférieur.

Type: `Boolean`<br />
Par défaut: `false`

----

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).