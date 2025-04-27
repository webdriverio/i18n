---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilisation

```js
driver.getAppiumContext()
```


##### Retourne

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** une chaîne de caractères représentant le contexte actuel ou null représentant 'pas de contexte'


---

## switchAppiumContext
Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilisation

```js
driver.switchAppiumContext(name)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>une chaîne de caractères représentant un contexte disponible</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Utilisation

```js
driver.getAppiumContexts()
```


##### Retourne

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** un tableau de chaînes de caractères représentant les contextes disponibles, par exemple 'WEBVIEW', ou 'NATIVE'


---

## shake
Exécuter une action de secousse sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Utilisation

```js
driver.shake()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Verrouiller l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Utilisation

```js
driver.lock(seconds)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>combien de temps verrouiller l'écran (iOS uniquement)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Déverrouiller l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Utilisation

```js
driver.unlock()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Vérifier si l'appareil est verrouillé ou non.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Utilisation

```js
driver.isLocked()
```


##### Retourne

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True si l'appareil est verrouillé, false sinon

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Commencer à enregistrer l'écran.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Utilisation

```js
driver.startRecordingScreen(options)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>paramètres de commande qui peuvent contenir des clés comme: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (voir plus de description dans la documentation Appium)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Arrêter l'enregistrement de l'écran<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Utilisation

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le chemin vers l'emplacement distant, où la vidéo résultante doit être téléchargée. Les protocoles suivants sont pris en charge http/https, ftp. Cette option n'a d'effet que s'il y a un processus d'enregistrement d'écran en cours et que le paramètre forceRestart n'est pas défini sur true. La valeur de chaîne nulle ou vide (le paramètre par défaut) signifie que le contenu du fichier résultant doit être encodé en Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le nom d'utilisateur pour l'authentification à distance.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le mot de passe pour l'authentification à distance.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le nom de la méthode de téléchargement HTTP multipart. Le 'PUT' est utilisé par défaut.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Chaîne encodée en Base64. Si remote_path est défini, la réponse est une chaîne vide

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Renvoie les types d'informations sur l'état du système qui peuvent être lus comme le CPU, la mémoire, le trafic réseau et la batterie.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Utilisation

```js
driver.getPerformanceDataTypes()
```


##### Retourne

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Les types de données de performance disponibles (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Renvoie les informations sur l'état du système qui peuvent être lues comme le CPU, la mémoire, le trafic réseau et la batterie.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Utilisation

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>le nom du package de l'application</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>le type d'état système que l'on souhaite lire. Il doit être l'un des types de données de performance pris en charge</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>le nombre de tentatives de lecture</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Le type d'information de l'état du système qui est pris en charge pour la lecture comme le CPU, la mémoire, le trafic réseau et la batterie

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Appuyer sur une touche particulière sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Utilisation

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>code de touche à appuyer</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>état méta pour appuyer sur le code de touche</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>drapeaux pour l'appui sur la touche</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Appuyer et maintenir un code de touche particulier sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Utilisation

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>code de touche à appuyer sur l'appareil</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>métaétat pour l'appui sur la touche</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>drapeaux pour l'appui sur la touche</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Envoyer un code de touche à l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilisation

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>code de touche à appuyer</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>état méta pour appuyer sur le code de touche</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Faire pivoter l'appareil en trois dimensions.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Utilisation

```js
driver.rotateDevice(x, y, z)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>décalage x à utiliser pour le centre du geste de rotation</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>décalage y à utiliser pour le centre du geste de rotation</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>décalage z à utiliser pour le centre du geste de rotation</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Obtenir le nom de l'activité Android actuelle.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Utilisation

```js
driver.getCurrentActivity()
```


##### Retourne

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Nom de l'activité actuelle

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Obtenir le nom du package Android actuel.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Utilisation

```js
driver.getCurrentPackage()
```


##### Retourne

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Nom du package actuel

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Installer l'application donnée sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Utilisation

```js
driver.installApp(appPath)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>chemin vers le fichier .apk de l'application</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Activer l'application donnée sur l'appareil<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Utilisation

```js
driver.activateApp(appId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de l'application (ID du package pour Android, ID du bundle pour iOS)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Supprimer une application de l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Utilisation

```js
driver.removeApp(appId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de l'application (ID du package pour Android, ID du bundle pour iOS)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Terminer l'application donnée sur l'appareil<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Utilisation

```js
driver.terminateApp(appId, options)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de l'application (ID du package pour Android, ID du bundle pour iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Options de commande. Ex. "timeout": (Android uniquement) Délai pour réessayer de terminer l'application (voir plus dans la documentation Appium)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Vérifier si l'application spécifiée est installée sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Utilisation

```js
driver.isAppInstalled(appId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de l'application (ID du package pour Android, ID du bundle pour iOS)</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Retourne true si installée, false sinon

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Obtenir l'état de l'application donnée sur l'appareil<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Utilisation

```js
driver.queryAppState(appId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID de l'application (ID du package pour Android, ID du bundle pour iOS)</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 n'est pas installé. 1 n'est pas en cours d'exécution. 2 s'exécute en arrière-plan ou est suspendu. 3 s'exécute en arrière-plan. 4 s'exécute au premier plan

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Masquer le clavier virtuel.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Utilisation

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>stratégie de masquage du clavier (UIAutomation uniquement), stratégies disponibles - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>valeur de la touche si la stratégie est 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>code de la touche si la stratégie est 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>nom de la touche si la stratégie est 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Si le clavier virtuel est affiché ou non.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Utilisation

```js
driver.isKeyboardShown()
```


##### Retourne

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True si le clavier est affiché

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Placer un fichier sur l'appareil à un endroit particulier.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Utilisation

```js
driver.pushFile(path, data)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>chemin pour installer les données</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>contenu du fichier en base64</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Récupérer un fichier du système de fichiers de l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Utilisation

```js
driver.pullFile(path)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>chemin sur l'appareil pour extraire le fichier</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenu du fichier en base64

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Récupérer un dossier du système de fichiers de l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Utilisation

```js
driver.pullFolder(path)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>chemin vers un dossier entier sur l'appareil</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Activer/désactiver le mode avion sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Utilisation

```js
driver.toggleAirplaneMode()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Changer l'état du service de données.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Utilisation

```js
driver.toggleData()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Changer l'état du service WiFi.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Utilisation

```js
driver.toggleWiFi()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Changer l'état du service de localisation.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Utilisation

```js
driver.toggleLocationServices()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Définir la vitesse du réseau (Émulateur uniquement)<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Utilisation

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Type de réseau - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Ouvrir les notifications Android (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Utilisation

```js
driver.openNotifications()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Démarrer une activité Android en fournissant le nom du package et le nom de l'activité.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Utilisation

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>nom de l'application</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>nom de l'activité</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>nom de l'application à attendre</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>nom de l'activité à attendre</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>action d'intention qui sera utilisée pour démarrer l'activité</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>catégorie d'intention qui sera utilisée pour démarrer l'activité</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>drapeaux qui seront utilisés pour démarrer l'activité</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>arguments d'intention supplémentaires qui seront utilisés pour démarrer l'activité</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>n'arrête pas le processus de l'application en test, avant de démarrer l'application à l'aide d'adb</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Récupérer les informations de visibilité et de limites des barres d'état et de navigation.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Utilisation

```js
driver.getSystemBars()
```


##### Retourne

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Informations sur la visibilité et les limites de la barre d'état et de navigation

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Obtenir l'heure sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Utilisation

```js
driver.getDeviceTime()
```


##### Retourne

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Heure sur l'appareil

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Obtenir la densité d'affichage de l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilisation

```js
driver.getDisplayDensity()
```


##### Retourne

- **&lt;*&gt;**


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simuler un événement [touch id](https://support.apple.com/en-ca/ht201371) (iOS Simulator uniquement). Pour activer cette fonctionnalité, la capacité désirée `allowTouchIdEnroll` doit être définie sur true et le Simulator doit être [enregistré](https://support.apple.com/en-ca/ht201371). Lorsque vous définissez allowTouchIdEnroll sur true, cela configurera par défaut le Simulator pour être enregistré. L'état d'enregistrement peut être [basculé](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Cet appel ne fonctionnera que si le processus Appium ou son application parent (par exemple Terminal.app ou Appium.app) a accès à l'accessibilité de Mac OS dans Préférences Système > Sécurité et confidentialité > Confidentialité > Accessibilité.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Utilisation

```js
driver.touchId(match)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>simulons-nous un toucher réussi (true) ou un toucher échoué (false)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Basculer le simulateur [enregistré](https://support.apple.com/en-ca/ht201371) pour accepter touchId (iOS Simulator uniquement). Pour activer cette fonctionnalité, la capacité désirée `allowTouchIdEnroll` doit être définie sur true. Lorsque `allowTouchIdEnroll` est défini sur true, le Simulator sera enregistré par défaut, et le 'Toggle Touch ID Enrollment' change l'état d'enregistrement. Cet appel ne fonctionnera que si le processus Appium ou son application parent (par exemple, Terminal.app ou Appium.app) a accès à l'accessibilité de Mac OS dans Préférences Système > Sécurité et confidentialité > Confidentialité > Accessibilité.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Utilisation

```js
driver.toggleEnrollTouchId(enabled)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>égal à true si l'inscription TouchID doit être activée</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Lancer une application sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Cette commande de protocole est dépréciée<br />Pour iOS, utilisez `driver.execute('mobile: launchApp', { ... })`, et pour Android, utilisez `driver.execute('mobile: activateApp', { ... })`.
:::

##### Utilisation

```js
driver.launchApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Fermer une application sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Cette commande de protocole est dépréciée<br />Utilisez `driver.execute('mobile: terminateApp', { ... })` à la place
:::

##### Utilisation

```js
driver.closeApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Envoyer l'application en cours d'exécution pour cette session en arrière-plan.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Cette commande de protocole est dépréciée<br />Utilisez `driver.execute('mobile: backgroundApp', { ... })` à la place
:::

##### Utilisation

```js
driver.background(seconds)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>délai pour restaurer l'application, si 'null' l'application ne sera pas restaurée</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Obtenir les données de couverture de test.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Utilisation

```js
driver.endCoverage(intent, path)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intention à diffuser</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>chemin vers le fichier .ec</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Obtenir les chaînes de l'application.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Utilisation

```js
driver.getStrings(language, stringFile)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>code de langue</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>chemin vers le fichier de chaînes</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** toutes les chaînes définies d'une application pour la langue et le nom de fichier de chaînes spécifiés

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilisation

```js
driver.setValueImmediate(elementId, text)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'un élément retourné dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>texte à définir pour un élément</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Remplacer directement la valeur d'un élément.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilisation

```js
driver.replaceValue(elementId, value)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>l'identifiant d'un élément retourné dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>valeur à remplacer sur l'élément</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Récupérer les paramètres actuels sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Utilisation

```js
driver.getSettings()
```


##### Retourne

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** Hachage JSON de tous les paramètres actuellement spécifiés, voir API des paramètres

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Mettre à jour le paramètre actuel sur l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Utilisation

```js
driver.updateSettings(settings)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>objet clé/valeur avec les paramètres à mettre à jour</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL de rappel pour l'exécution asynchrone de JavaScript.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Utilisation

```js
driver.receiveAsyncResponse(response)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>réponse à recevoir sur l'appareil</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Effectuer un appel GSM (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Utilisation

```js
driver.gsmCall(phoneNumber, action)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>le numéro de téléphone à appeler</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>L'action - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Définir la force du signal GSM (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Utilisation

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>force du signal dans la plage [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>force du signal dans la plage [0, 4]. Veuillez également définir ce paramètre avec la même valeur si vous utilisez Appium v1.11.0 ou inférieur (voir https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Définir le pourcentage de batterie (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Utilisation

```js
driver.powerCapacity(percent)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>valeur en pourcentage dans la plage [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Définir l'état du chargeur de batterie comme connecté ou non (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Utilisation

```js
driver.powerAC(state)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>définir l'état. on ou off</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Définir l'état de la voix GSM (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Utilisation

```js
driver.gsmVoice(state)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>état de la voix GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simuler un message SMS (Émulateur uniquement).<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Utilisation

```js
driver.sendSms(phoneNumber, message)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>le numéro de téléphone pour envoyer le SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>le message SMS</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Authentifier les utilisateurs en utilisant leurs empreintes digitales sur les émulateurs pris en charge.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Utilisation

```js
driver.fingerPrint(fingerprintId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>empreintes digitales stockées dans le système Android Keystore (de 1 à 10)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Définir le contenu du presse-papiers système<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Utilisation

```js
driver.setClipboard(content, contentType, label)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Le contenu réel du presse-papiers encodé en base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le type de contenu à obtenir. Plaintext, Image, URL. Android ne prend en charge que plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Étiquette des données du presse-papiers pour Android</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Réponse du serveur Appium

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Obtenir le contenu du presse-papiers système<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Utilisation

```js
driver.getClipboard(contentType)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le type de contenu à obtenir. Plaintext, Image, URL. Android ne prend en charge que plaintext</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Contenu du presse-papiers sous forme de chaîne encodée en base64 ou une chaîne vide si le presse-papiers est vide

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Cette fonctionnalité n'est disponible que dans un contexte natif. 'Touch Perform' fonctionne de manière similaire aux autres interactions tactiles singulières, sauf que cela vous permet d'enchaîner plus d'une action tactile en une seule commande. Ceci est utile car les commandes Appium sont envoyées via le réseau et il y a une latence entre les commandes. Cette latence peut rendre certaines interactions tactiles impossibles car certaines interactions doivent être effectuées en une seule séquence. Le glissement vertical, par exemple, nécessite d'appuyer, de se déplacer vers une coordonnée y différente, puis de relâcher. Pour que cela fonctionne, il ne peut pas y avoir de délai entre les interactions.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Utilisation

```js
driver.touchPerform(actions)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Le type d'action à effectuer (par exemple moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Exemple


```js
// faire un glissement horizontal par pourcentage
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Cette fonctionnalité n'est disponible que dans un contexte natif. Effectuer une séquence d'actions tactiles multiples.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Utilisation

```js
driver.multiTouchPerform(actions)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Le type d'action à effectuer (par exemple moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Cette commande vous permet de spécifier un script WebdriverIO sous forme de chaîne et de le transmettre au serveur Appium pour une exécution locale sur le serveur lui-même. Cette approche aide à minimiser la latence potentielle associée à chaque commande. ***Pour utiliser cette commande avec Appium 2.0, vous devez avoir le plugin [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) installé.***<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Utilisation

```js
driver.executeDriverScript(script, type, timeout)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Le script à exécuter. Il a accès à un objet 'driver' qui représente une session WebdriverIO attachée au serveur actuel.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Le langage/framework utilisé dans le script. Actuellement, seul 'webdriverio' est pris en charge et est la valeur par défaut.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Le nombre de millisecondes pendant lesquelles le script devrait être autorisé à s'exécuter avant d'être tué par le serveur Appium. Par défaut, équivalent à 1 heure.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un objet contenant deux champs: 'result', qui est la valeur de retour du script lui-même, et 'logs', qui contient 3 champs internes, 'log', 'warn', et 'error', qui contiennent un tableau de chaînes enregistrées par console.log, console.warn, et console.error dans l'exécution du script.


---

## getEvents
Obtenir les événements stockés dans le serveur appium.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Utilisation

```js
driver.getEvents(type)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Obtenir les événements filtrés avec le type si le type est fourni.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Un hachage JSON d'événements comme `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Stocker un événement personnalisé.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Utilisation

```js
driver.logEvent(vendor, event)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Le nom du fournisseur. Ce sera `vendor` dans `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Le nom de l'événement. Ce sera `event` dans `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Cette fonctionnalité effectue des comparaisons d'images en utilisant les capacités du framework OpenCV. Veuillez noter que pour que cette fonctionnalité fonctionne, le framework OpenCV et le module opencv4nodejs doivent être installés sur la machine où le serveur Appium est opérationnel. ***De plus, vous devrez avoir le plugin [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) installé pour utiliser cette fonctionnalité avec Appium 2.0.***<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Utilisation

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Un des modes de comparaison possibles: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' est par défaut.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Données d'image. Tous les formats d'image que la bibliothèque OpenCV accepte elle-même sont pris en charge.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Données d'image. Tous les formats d'image que la bibliothèque OpenCV accepte elle-même sont pris en charge.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Le contenu de ce dictionnaire dépend de la valeur réelle de `mode`. Voir la documentation sur le module `appium-support` pour plus de détails. </td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Le contenu du dictionnaire résultant dépend des valeurs réelles de `mode` et `options`. Voir la documentation sur le module `appium-support` pour plus de détails.


---

## implicitWait
Définir le temps que le pilote doit attendre lors de la recherche d'éléments. Lors de la recherche d'un seul élément, le pilote doit interroger la page jusqu'à ce qu'un élément soit trouvé ou que le délai expire, selon la première éventualité. Lors de la recherche de plusieurs éléments, le pilote doit interroger la page jusqu'à ce qu'au moins un élément soit trouvé ou que le délai expire, auquel cas il doit renvoyer une liste vide. Si cette commande n'est jamais envoyée, le pilote doit par défaut avoir une attente implicite de 0ms.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.implicitWait(ms)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La quantité de temps, en millisecondes, à attendre sur un élément.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Déterminer l'emplacement d'un élément sur l'écran une fois qu'il a été défilé en vue.<br /><br />__Remarque:__ Ceci est considéré comme une commande interne et ne doit être utilisé que pour déterminer l'emplacement d'un élément pour générer correctement des événements natifs.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getLocationInView(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID de l'élément vers lequel router la commande</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Les coordonnées X et Y de l'élément sur la page.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Envoyer une séquence de frappes à l'élément actif<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.sendKeys(value)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>La séquence de touches à taper. Un tableau doit être fourni.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Lister tous les moteurs disponibles sur la machine. Pour utiliser un moteur, il doit être présent dans cette liste.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.availableIMEEngines()
```


##### Retourne

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Une liste des moteurs disponibles

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Obtenir le nom du moteur IME actif. La chaîne de nom est spécifique à la plateforme.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getActiveIMEEngine()
```


##### Retourne

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Le nom du moteur IME actif

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indique si l'entrée IME est active pour le moment<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.isIMEActivated()
```


##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true si l'entrée IME est disponible et actuellement active, false sinon

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Désactive le moteur IME actuellement actif.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.deactivateIMEEngine()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Rendre un moteur disponible<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.activateIMEEngine(engine)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>nom du moteur à activer</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Définir la quantité de temps, en millisecondes, pendant laquelle les scripts asynchrones exécutés par `/session/:sessionId/execute_async` sont autorisés à s'exécuter avant d'être abandonnés et qu'une erreur `Timeout` est renvoyée au client.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.asyncScriptTimeout(ms)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>La quantité de temps, en millisecondes, pendant laquelle les commandes limitées dans le temps sont autorisées à s'exécuter</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Soumettre un élément de formulaire.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.submit(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID de l'élément de formulaire à soumettre</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Déterminer la taille d'un élément en pixels. La taille sera retournée sous forme d'objet JSON avec les propriétés `width` et `height`.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getElementSize(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID de l'élément vers lequel router la commande</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** La largeur et la hauteur de l'élément, en pixels.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Déterminer l'emplacement d'un élément sur la page. Le point `(0, 0)` fait référence au coin supérieur gauche de la page. Les coordonnées de l'élément sont retournées sous forme d'objet JSON avec les propriétés `x` et `y`.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getElementLocation(elementId)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID de l'élément vers lequel router la commande</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Les coordonnées X et Y de l'élément sur la page.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Tapotement unique sur l'appareil tactile.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchClick(element)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID de l'élément sur lequel effectuer un tapotement simple.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Doigt posé sur l'écran.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchDown(x, y)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordonnée x sur l'écran</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordonnée y sur l'écran</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Doigt levé de l'écran.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchUp(x, y)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordonnée x sur l'écran</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordonnée y sur l'écran</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Mouvement du doigt sur l'écran.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchMove(x, y)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>coordonnée x sur l'écran</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>coordonnée y sur l'écran</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Appui long sur l'écran tactile en utilisant des événements de mouvement du doigt.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchLongClick(element)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID de l'élément sur lequel faire un appui long</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Effectuer un mouvement rapide sur l'écran tactile en utilisant des événements de mouvement du doigt. Cette commande de mouvement rapide commence à un emplacement particulier de l'écran.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>le décalage x en pixels pour le mouvement rapide</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>le décalage y en pixels pour le mouvement rapide</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>ID de l'élément où commence le mouvement rapide</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>la vitesse en pixels par seconde</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>la vitesse x en pixels par seconde</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>la vitesse y en pixels par seconde</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Obtenir l'orientation actuelle de l'appareil.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getOrientation()
```


##### Retourne

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** L'orientation actuelle correspondant à une valeur définie dans ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Définir l'orientation de l'appareil<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.setOrientation(orientation)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>la nouvelle orientation du navigateur telle que définie dans ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Obtenir le journal pour un type de journal donné. Le tampon de journalisation est réinitialisé après chaque demande.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getLogs(type)
```


##### Paramètres

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
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
            **<code><var>logs</var></code>:** La liste des entrées du journal.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Obtenir les types de journaux disponibles.<br /><br />Commande Appium. Plus de détails peuvent être trouvés dans la [documentation officielle du protocole](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Utilisation

```js
driver.getLogTypes()
```


##### Retourne

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** La liste des types de journaux disponibles.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
