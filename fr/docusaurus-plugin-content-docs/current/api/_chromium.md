---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
Indique si une boîte de dialogue simple est actuellement ouverte.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49).

##### Utilisation

```js
browser.isAlertOpen()
```

##### Exemple


```js
console.log(browser.isAlertOpen()); // affiche: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // affiche: true
```


##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` ou `false` selon qu'une boîte de dialogue simple est présente ou non.


---

## isAutoReporting
Indique s'il génère automatiquement des erreurs sur les journaux du navigateur.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://codereview.chromium.org/101203012).

##### Utilisation

```js
browser.isAutoReporting()
```


##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` ou `false` selon que le rapport automatique est activé.


---

## setAutoReporting
Active ou désactive le retour de réponse avec une erreur inconnue contenant la première erreur du navigateur (par exemple, échec de chargement d'une ressource en raison d'une réponse 403/404) pour toutes les commandes suivantes (une fois activé).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://codereview.chromium.org/101203012).

##### Utilisation

```js
browser.setAutoReporting(enabled)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` si le rapport automatique doit être activé, utilisez `false` pour désactiver un rapport automatique précédemment activé.</td>
    </tr>
  </tbody>
</table>

##### Exemples


```js
// Activer le rapport automatique dès le début après l'initialisation de la session avec des journaux de navigateur vides
console.log(browser.setAutoReporting(true)); // affiche: null
// En demandant une ressource non existante, l'exécution sera interrompue en raison d'une erreur inconnue
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// Pendant la session, effectuez certaines opérations qui remplissent les journaux du navigateur
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Activer le rapport automatique qui génère une erreur inconnue pour le premier journal du navigateur (réponse 404)
browser.setAutoReporting(true);
```


##### Retourne

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** Dans le cas où la première erreur du navigateur s'est déjà produite avant l'exécution de cette commande, elle lancera une erreur inconnue en réponse, qui est un objet avec une clé 'message' décrivant la première erreur du navigateur. Sinon, elle renvoie `null` en cas de succès.


---

## isLoading
Détermine l'état de chargement de la fenêtre active.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802).

##### Utilisation

```js
browser.isLoading()
```

##### Exemple


```js
console.log(browser.isLoading()); // affiche: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // affiche: true
```


##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` ou `false` selon que la fenêtre active est en cours de chargement ou non.


---

## takeHeapSnapshot
Prend un instantané de la mémoire du contexte d'exécution actuel.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202).

##### Utilisation

```js
browser.takeHeapSnapshot()
```


##### Retourne

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** Une représentation JSON de l'instantané de la mémoire. Qui peut être inspecté en le chargeant comme fichier dans Chrome DevTools.


---

## getNetworkConnection
Obtient le type de connexion pour l'émulation réseau. Cette commande n'est applicable que lorsque l'extrémité distante répond avec la capacité `networkConnectionEnabled` définie sur `true`.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Utilisation

```js
browser.getNetworkConnection()
```

##### Exemple


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // L'émulation réseau nécessite le mode appareil, qui n'est activé que lorsque l'émulation mobile est activée
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // affiche: 6 (Wi-Fi et données)
```


##### Retourne

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Un masque binaire pour représenter le type de connexion réseau. Mode Avion (`1`), Wi-Fi uniquement (`2`), Wi-Fi et données (`6`), 4G (`8`), 3G (`10`), 2G (`20`). Par défaut, [Wi-Fi et données sont activés](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
Change le type de connexion pour la connexion réseau. Cette commande n'est applicable que lorsque l'extrémité distante répond avec la capacité `networkConnectionEnabled` définie sur `true`.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Utilisation

```js
browser.setNetworkConnection(parameters)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>Objet contenant ConnectionType, définissez le masque binaire comme valeur pour la clé `type` dans l'objet. Mode Avion (`1`), Wi-Fi uniquement (`2`), Wi-Fi et données (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### Exemple


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // L'émulation réseau nécessite le mode appareil, qui n'est activé que lorsque l'émulation mobile est activée
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // affiche: 1 (Mode Avion)
```


##### Retourne

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Un masque binaire pour représenter le type de connexion réseau. La valeur doit correspondre au `type` spécifié dans l'objet, cependant, l'appareil peut ne pas être capable du type de connexion réseau demandé.


---

## getNetworkConditions
Obtient les conditions réseau actuelles utilisées pour l'émulation.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859).

##### Utilisation

```js
browser.getNetworkConditions()
```


##### Retourne

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** Objet contenant les conditions réseau pour `offline`, `latency`, `download_throughput` et `upload_throughput`. Les conditions réseau doivent être définies avant de pouvoir les récupérer.


---

## setNetworkConditions
Définit les conditions réseau utilisées pour l'émulation en limitant la connexion.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722).

##### Utilisation

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>Objet contenant les conditions réseau qui sont `latency`, `throughput` (ou `download_throughput`/`upload_throughput`) et `offline` (facultatif).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Nom du [préréglage de limitation réseau](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` ou `No throttling` pour désactiver. Lorsque le préréglage est spécifié, les valeurs passées dans le premier argument ne sont pas respectées.</td>
    </tr>
  </tbody>
</table>

##### Exemples


```js
// Utiliser différentes valeurs de débit en téléchargement (25kb/s) et en téléversement (50kb/s) pour la limitation avec une latence de 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Forcer la déconnexion du réseau en définissant 'offline' sur true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// Lorsque le nom du préréglage (par exemple 'DSL') est spécifié, il ne respecte pas les valeurs dans l'objet (par exemple 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// La meilleure pratique pour spécifier un préréglage de limitation réseau est d'utiliser un objet vide
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
Désactive toute limitation réseau qui pourrait avoir été définie. Équivalent à définir le préréglage `No throttling`.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745).

##### Utilisation

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
Envoie une commande au débogueur DevTools.<br />Pour une liste des commandes disponibles et leurs paramètres, consultez le [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304).

##### Utilisation

```js
browser.sendCommand(cmd, params)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Nom de la commande (par exemple [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Paramètres de la commande. En cas d'absence de paramètres pour la commande, spécifiez un objet vide.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
Envoie une commande au débogueur DevTools et attend le résultat.<br />Pour une liste des commandes disponibles et leurs paramètres, consultez le [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320).

##### Utilisation

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Nom de la commande qui renvoie un résultat (par exemple [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Paramètres de la commande. En cas d'absence de paramètres pour la commande, spécifiez un objet vide.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Soit la valeur de retour de votre commande, soit l'erreur qui était la raison de l'échec de votre commande.


---

## file
Téléverse un fichier sur la machine distante sur laquelle le navigateur s'exécute.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065).

##### Utilisation

```js
browser.file(file)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Archive zip encodée en base64 contenant __un seul__ fichier à téléverser. Si les données encodées en base64 ne représentent pas une archive zip ou si l'archive contient plus d'un fichier, elle génèrera une erreur inconnue.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Chemin absolu du fichier téléversé sur la machine distante.


---

## launchChromeApp
Lance une application Chrome par identifiant spécifié.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539).

##### Utilisation

```js
browser.launchChromeApp(id)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>Identifiant d'extension de l'application à lancer, tel que défini dans chrome://extensions.</td>
    </tr>
  </tbody>
</table>

##### Exemple


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Installer au démarrage du navigateur afin de le lancer
            extensions: [
              // L'entrée doit être une application Chrome empaquetée (.crx) encodée en base64
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
Récupère la valeur d'un élément de contrôle de formulaire donné.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443).

##### Utilisation

```js
browser.getElementValue(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identifiant de l'élément dont on veut obtenir la valeur</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** Valeur actuelle de l'élément. Si l'élément spécifié n'est pas un élément de contrôle de formulaire, elle renverra `null`.


---

## elementHover
Active l'état de survol pour un élément, qui est réinitialisé lors de la prochaine interaction.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146).

##### Utilisation

```js
browser.elementHover(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identifiant de l'élément à survoler</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
Déclenche un effet de zoom par pincement.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827).

##### Utilisation

```js
browser.touchPinch(x, y, scale)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>position x pour le pincement</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>position y pour le pincement</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>échelle de zoom par pincement</td>
    </tr>
  </tbody>
</table>



---

## freeze
Gèle la page actuelle. Extension pour [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633).

##### Utilisation

```js
browser.freeze()
```



---

## resume
Reprend la page actuelle. Extension pour [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645).

##### Utilisation

```js
browser.resume()
```



---

## getCastSinks
Renvoie la liste des récepteurs de diffusion (appareils Cast) disponibles pour le routeur multimédia Chrome.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748).

##### Utilisation

```js
browser.getCastSinks()
```


##### Retourne

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** Liste des récepteurs disponibles.


---

## selectCastSink
Sélectionne un récepteur de diffusion (appareil Cast) comme destinataire des intentions du routeur multimédia (connexion ou lecture).<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737).

##### Utilisation

```js
browser.selectCastSink(sinkName)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Le nom de l'appareil cible.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
Initie la mise en miroir de l'onglet pour l'onglet actuel du navigateur sur l'appareil spécifié.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741).

##### Utilisation

```js
browser.startCastTabMirroring(sinkName)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Le nom de l'appareil cible.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Renvoie un message d'erreur s'il y a un problème dans une session Cast.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751).

##### Utilisation

```js
browser.getCastIssueMessage()
```


##### Retourne

- **&lt;String&gt;**
            **<code><var>message</var></code>:** Message d'erreur, le cas échéant.


---

## stopCasting
Arrête la diffusion du routeur multimédia vers l'appareil spécifié, si connecté.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744).

##### Utilisation

```js
browser.stopCasting(sinkName)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Le nom de l'appareil cible.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
Arrête le processus ChromeDriver et par conséquent termine toutes les sessions actives.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498).

##### Utilisation

```js
browser.shutdown()
```



---

## takeElementScreenshot
La commande Take Element Screenshot prend une capture d'écran de la région visible englobée par le rectangle délimitant d'un élément.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Utilisation

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'un élément retourné lors d'un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>faire défiler l'élément pour le rendre visible. Par défaut : true</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Les données d'image PNG encodées en base64 constituant la capture d'écran de la région visible du rectangle délimitant d'un élément après qu'il ait été défilé pour être visible.


---

## getLogTypes
Obtient les types de journaux disponibles.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes).

##### Utilisation

```js
browser.getLogTypes()
```


##### Retourne

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** La liste des types de journaux disponibles, exemple : browser, driver.


---

## getLogs
Obtient le journal pour un type de journal donné. Le tampon du journal est réinitialisé après chaque demande.<br /><br />Commande Chromium non officielle et non documentée. Plus d'informations sur cette commande peuvent être trouvées [ici](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog).

##### Utilisation

```js
browser.getLogs(type)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>le type de journal</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** La liste des entrées de journal.
