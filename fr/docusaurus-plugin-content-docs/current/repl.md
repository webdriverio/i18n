---
id: repl
title: Interface REPL
description: "Utilisez le REPL de WebdriverIO pour essayer des commandes et déboguer des tests de manière interactive depuis la ligne de commande ou depuis un test en cours d'exécution."
---

Avec la `v4.5.0`, WebdriverIO a introduit une interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) qui vous aide non seulement à apprendre l'API du framework, mais aussi à déboguer et inspecter vos tests. Elle peut être utilisée de plusieurs façons.

Tout d'abord, vous pouvez l'utiliser comme commande CLI en installant `npm install -g @wdio/cli` et lancer une session WebDriver depuis la ligne de commande, par exemple :

```sh
wdio repl chrome
```

Cela ouvrirait un navigateur Chrome que vous pouvez contrôler avec l'interface REPL. Assurez-vous qu'un pilote de navigateur est en cours d'exécution sur le port `4444` afin d'initier la session. Si vous avez un compte [Sauce Labs](https://saucelabs.com) (ou d'un autre fournisseur cloud), vous pouvez également exécuter directement le navigateur dans le cloud depuis votre ligne de commande via :

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Si le pilote s'exécute sur un port différent, par exemple : 9515, celui-ci peut être transmis avec l'argument de ligne de commande --port ou l'alias -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Le REPL peut également être exécuté en utilisant les capabilities du fichier de configuration de WebdriverIO. Wdio prend en charge un objet de capabilities, ou une liste ou un objet de capabilities multi-remote.

Si le fichier de configuration utilise un objet de capabilities, il suffit de passer le chemin vers le fichier de configuration ; sinon, s'il s'agit d'une capability multi-remote, spécifiez quelle capability utiliser dans la liste ou le multi-remote à l'aide de l'argument positionnel. Remarque : pour une liste, l'index commence à zéro.

### Exemple

WebdriverIO avec un tableau de capabilities :

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

WebdriverIO avec un objet de capabilities [multi-remote](https://webdriver.io/docs/multiremote/) :

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

Ou si vous souhaitez exécuter des tests mobiles en local avec Appium :

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

Cela ouvrirait une session Chrome/Safari sur l'appareil/émulateur/simulateur connecté. Assurez-vous qu'Appium est en cours d'exécution sur le port `4444` afin d'initier la session.

```sh
wdio repl './path/to/your_app.apk'
```

Cela ouvrirait une session d'application sur l'appareil/émulateur/simulateur connecté. Assurez-vous qu'Appium est en cours d'exécution sur le port `4444` afin d'initier la session.

Les capabilities pour un appareil iOS peuvent être passées avec des arguments :

* `-v`      - `platformVersion` : version de la plateforme Android/iOS
* `-d`      - `deviceName` : nom de l'appareil mobile
* `-u`      - `udid` : udid pour les appareils réels

Utilisation :

<Tabs
  defaultValue="long"
  values={[
    {label: 'Noms de paramètres longs', value: 'long'},
    {label: 'Noms de paramètres courts', value: 'short'}
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

### Se rattacher à une `wdio session`

`wdio repl --session <name>` (alias `-s`) ne démarre pas de navigateur. Cette commande rattache le REPL à une session que [`wdio session`](/docs/session) a déjà ouverte, et le détachement laisse cette session en cours d'exécution. La mise en pause d'une exécution de test est traitée dans [Déboguer un test avec une session](/docs/session/debug) :

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Dans le REPL, chaque ligne s'exécute en tant que `wdio session exec`. `.exit` affiche `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Une autre façon d'utiliser le REPL est de l'utiliser à l'intérieur de vos tests via la commande [`debug`](/docs/api/browser/debug). Celle-ci arrêtera le navigateur lorsqu'elle est appelée, et vous permet d'accéder à l'application (par exemple aux outils de développement) ou de contrôler le navigateur depuis la ligne de commande. C'est utile lorsque certaines commandes ne déclenchent pas une action donnée comme prévu. Avec le REPL, vous pouvez alors essayer les commandes pour voir lesquelles fonctionnent de la manière la plus fiable.