---
id: repl
title: Interface REPL
---

Avec `v4.5.0`, WebdriverIO a introduit une interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) qui vous aide non seulement à apprendre l'API du framework, mais aussi à déboguer et inspecter vos tests. Elle peut être utilisée de plusieurs façons.

Tout d'abord, vous pouvez l'utiliser comme commande CLI en installant `npm install -g @wdio/cli` et lancer une session WebDriver depuis la ligne de commande, par exemple :

```sh
wdio repl chrome
```

Cela ouvrirait un navigateur Chrome que vous pouvez contrôler avec l'interface REPL. Assurez-vous d'avoir un pilote de navigateur fonctionnant sur le port `4444` afin d'initier la session. Si vous avez un compte [Sauce Labs](https://saucelabs.com) (ou autre fournisseur cloud), vous pouvez également exécuter directement le navigateur sur votre ligne de commande dans le cloud via :

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Si le pilote fonctionne sur un port différent, par exemple : 9515, il peut être passé avec l'argument de ligne de commande --port ou l'alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl peut également être exécuté en utilisant les capacités du fichier de configuration webdriverIO. Wdio prend en charge l'objet de capacités; ou; la liste de capacités multiremote ou l'objet.

Si le fichier de configuration utilise un objet de capacités, il suffit de passer le chemin vers le fichier de configuration, sinon s'il s'agit d'une capacité multiremote, spécifiez quelle capacité utiliser à partir de la liste ou du multiremote en utilisant l'argument positionnel. Remarque : pour la liste, nous considérons l'index basé sur zéro.

### Exemple

WebdriverIO avec un tableau de capacités :

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

WebdriverIO avec un objet de capacité [multiremote](https://webdriver.io/docs/multiremote/) :

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

Ou si vous souhaitez exécuter des tests mobiles locaux à l'aide d'Appium :

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

Cela ouvrirait une session Chrome/Safari sur l'appareil/émulateur/simulateur connecté. Assurez-vous qu'Appium fonctionne sur le port `4444` afin d'initier la session.

```sh
wdio repl './path/to/your_app.apk'
```

Cela ouvrirait une session d'application sur l'appareil/émulateur/simulateur connecté. Assurez-vous qu'Appium fonctionne sur le port `4444` afin d'initier la session.

Les capacités pour les appareils iOS peuvent être transmises avec des arguments :

* `-v`      - `platformVersion` : version de la plateforme Android/iOS
* `-d`      - `deviceName` : nom de l'appareil mobile
* `-u`      - `udid` : udid pour les appareils réels

Utilisation :

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

Vous pouvez appliquer toutes les options (voir `wdio repl --help`) disponibles pour votre session REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Une autre façon d'utiliser le REPL est à l'intérieur de vos tests via la commande [`debug`](/docs/api/browser/debug). Cela arrêtera le navigateur lorsqu'il est appelé, et vous permet de passer dans l'application (par exemple, aux outils de développement) ou de contrôler le navigateur depuis la ligne de commande. C'est utile lorsque certaines commandes ne déclenchent pas une certaine action comme prévu. Avec le REPL, vous pouvez alors essayer les commandes pour voir lesquelles fonctionnent le plus efficacement.