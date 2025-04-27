---
id: webdriver
title: Protocole WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---
## newSession
La commande New Session crée une nouvelle session WebDriver avec le nœud d'extrémité. Si la création échoue, une erreur de session non créée est renvoyée.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-new-sessions).



##### Utilisation

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>un objet JSON, l'ensemble des capacités qui a finalement été fusionné et correspondant dans l'algorithme de traitement des capacités</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Objet contenant sessionId et capabilities de la session WebDriver créée.    


---
## deleteSession
La commande Delete Session ferme tous les contextes de navigation de premier niveau associés à la session en cours, termine la connexion et ferme enfin la session en cours.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-delete-session).



##### Utilisation

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>object</td>
      <td>Objet contenant des options pour la commande deleteSession, ex. `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>





---
## status
La commande Status renvoie des informations indiquant si une extrémité distante est dans un état dans lequel elle peut créer de nouvelles sessions et peut également inclure des métadonnées arbitraires spécifiques à l'implémentation.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-status).



##### Utilisation

```js
browser.status()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Objet contenant le statut du driver.    


---
## getTimeouts
La commande Get Timeouts obtient les durées de timeout associées à la session en cours.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-timeouts).



##### Utilisation

```js
browser.getTimeouts()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Objet contenant les durées de timeout pour `script`, `pageLoad` et `implicit`.    


---
## setTimeouts
La commande Set Timeouts définit les durées de timeout associées à la session en cours. Les timeouts qui peuvent être contrôlés sont listés dans le tableau des timeouts de session ci-dessous.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-set-timeouts).



##### Utilisation

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>entier en ms pour le timeout d'attente implicite de la session</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>entier en ms pour le timeout de chargement de page de la session</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>entier en ms pour le timeout de script de la session</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```






---
## getUrl
La commande Get Current URL renvoie l'URL du contexte de navigation de premier niveau actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-current-url).



##### Utilisation

```js
browser.getUrl()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL du document actif du contexte de navigation de premier niveau actuel    


---
## navigateTo
La commande navigateTo (go) est utilisée pour faire naviguer l'agent utilisateur du contexte de navigation de premier niveau actuel vers un nouvel emplacement.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [url](/docs/api/browser/url). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>chaîne représentant une URL absolue (commençant par http(s)), pouvant inclure un fragment (#...), pourrait aussi être un schéma local (about: etc)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```






---
## back
La commande Back fait passer le navigateur une étape en arrière dans l'historique de session conjoint du contexte de navigation de premier niveau actuel. Cela équivaut à appuyer sur le bouton retour dans la barre de navigation du navigateur ou à appeler `window.history.back`.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-back).



##### Utilisation

```js
browser.back()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```






---
## forward
La commande Forward fait passer le navigateur une étape en avant dans l'historique de session conjoint du contexte de navigation de premier niveau actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-forward).



##### Utilisation

```js
browser.forward()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```






---
## refresh
La commande Refresh fait recharger la page dans le contexte de navigation de premier niveau actuel au navigateur.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-refresh).



##### Utilisation

```js
browser.refresh()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```






---
## getTitle
La commande Get Title renvoie le titre du document du contexte de navigation de premier niveau actuel, équivalent à appeler `document.title`.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-title).



##### Utilisation

```js
browser.getTitle()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Retourne une chaîne qui est identique à `document.title` du contexte de navigation de premier niveau actuel.    


---
## getWindowHandle
La commande Get Window Handle renvoie le handle de fenêtre pour le contexte de navigation de premier niveau actuel. Elle peut être utilisée comme argument pour Switch To Window.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-window-handle).



##### Utilisation

```js
browser.getWindowHandle()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Renvoie une chaîne qui est le handle de fenêtre pour le contexte de navigation de premier niveau actuel.    


---
## closeWindow
La commande Close Window ferme le contexte de navigation de premier niveau actuel. Une fois terminé, s'il n'y a plus de contextes de navigation de premier niveau ouverts, la session WebDriver elle-même est fermée.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-close-window).



##### Utilisation

```js
browser.closeWindow()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```






---
## switchToWindow
La commande Switch To Window est utilisée pour sélectionner le contexte de navigation de premier niveau actuel pour la session en cours, c'est-à-dire celui qui sera utilisé pour traiter les commandes.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [switchWindow](/docs/api/browser/switchWindow). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>une chaîne représentant un handle de fenêtre, doit être l'une des chaînes qui ont été renvoyées dans un appel à getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```






---
## createWindow
Crée un nouveau contexte de navigation de premier niveau.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#new-window).



##### Utilisation

```js
browser.createWindow(type)
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
      <td>Défini sur 'tab' si la fenêtre nouvellement créée partage une fenêtre au niveau du système d'exploitation avec le contexte de navigation actuel, ou 'window' dans le cas contraire.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Nouvel objet de fenêtre contenant 'handle' avec la valeur du handle et 'type' avec la valeur du type de fenêtre créé    


---
## getWindowHandles
La commande Get Window Handles renvoie une liste de handles de fenêtre pour chaque contexte de navigation de premier niveau ouvert. L'ordre dans lequel les handles de fenêtre sont renvoyés est arbitraire.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-window-handles).



##### Utilisation

```js
browser.getWindowHandles()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```



##### Retourne

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Un tableau qui est une liste de handles de fenêtre.    


---
## printPage
La commande Print Page rend le document en un document PDF paginé. __Remarque :__ Chrome ne prend actuellement en charge cela qu'en [mode headless](https://webdriver.io/docs/capabilities/#run-browser-headless), voir [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#print-page).



##### Utilisation

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string</td>
      <td>orientation de la page. Par défaut: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>échelle de la page. Par défaut: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>arrière-plan de la page. Par défaut: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>largeur de la page en cm. Par défaut: `21.59` de la page</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>hauteur de la page en cm. Par défaut: `27.94` de la page</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>marge de page en cm depuis la marge supérieure. Par défaut: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>marge de page en cm depuis la marge inférieure. Par défaut: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>marge de page en cm depuis la marge gauche. Par défaut: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>marge de page en cm depuis la marge droite. Par défaut: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>réduire le pdf pour l'adapter à la page. Par défaut: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>object[]</td>
      <td>plages de pages. Par défaut `[]`</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** La représentation PDF encodée en base64 du document paginé.    


---
## switchToFrame
La commande Switch To Frame est utilisée pour sélectionner le contexte de navigation de premier niveau actuel ou un contexte de navigation enfant du contexte de navigation actuel à utiliser comme contexte de navigation actuel pour les commandes suivantes.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Cette commande de protocole est dépréciée<br />Cette commande est dépréciée et nous encourageons tout le monde à utiliser `switchFrame` à la place pour passer dans les frames. En savoir plus sur cette commande sur https://webdriver.io/docs/api/browser/switchFrame.
:::



##### Utilisation

```js
browser.switchToFrame(id)
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
      <td>number, object, null</td>
      <td>l'un des trois types possibles : null : cela représente le contexte de navigation de premier niveau (c'est-à-dire, pas un iframe), un nombre, représentant l'index de l'objet fenêtre correspondant à une frame, un objet Element reçu en utilisant `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```






---
## switchToParentFrame
La commande Switch to Parent Frame définit le contexte de navigation actuel pour les futures commandes au parent du contexte de navigation actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).



##### Utilisation

```js
browser.switchToParentFrame()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```






---
## getWindowRect
La commande Get Window Rect renvoie la taille et la position sur l'écran de la fenêtre du système d'exploitation correspondant au contexte de navigation de premier niveau actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [getWindowSize](/docs/api/browser/getWindowSize). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getWindowRect()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Une représentation JSON d'un objet "window rect". Celui-ci possède 4 propriétés : `x`, `y`, `width` et `height`.    


---
## setWindowRect
La commande Set Window Rect modifie la taille et la position de la fenêtre du système d'exploitation correspondant au contexte de navigation de premier niveau actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [setWindowSize](/docs/api/browser/setWindowSize). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.setWindowRect(x, y, width, height)
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
      <td>number, null</td>
      <td>l'attribut screenX de l'objet window</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>l'attribut screenY de l'objet window</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>la largeur des dimensions externes du contexte de navigation de premier niveau, y compris l'interface du navigateur, etc...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>la hauteur des dimensions externes du contexte de navigation de premier niveau, y compris l'interface du navigateur, etc...</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Une représentation JSON d'un objet "window rect" basé sur le nouvel état de la fenêtre.    


---
## maximizeWindow
La commande Maximize Window invoque l'opération "maximize" spécifique au gestionnaire de fenêtres, si elle existe, sur la fenêtre contenant le contexte de navigation de premier niveau actuel. Cela augmente généralement la fenêtre à la taille maximale disponible sans passer en mode plein écran.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-maximize-window).



##### Utilisation

```js
browser.maximizeWindow()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Une représentation JSON d'un objet "window rect" basé sur le nouvel état de la fenêtre.    


---
## minimizeWindow
La commande Minimize Window invoque l'opération "minimize" spécifique au gestionnaire de fenêtres, si elle existe, sur la fenêtre contenant le contexte de navigation de premier niveau actuel. Cela cache généralement la fenêtre dans la barre des tâches du système.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-minimize-window).



##### Utilisation

```js
browser.minimizeWindow()
```




##### Retourne

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Une représentation JSON d'un objet "window rect" du contexte de navigation de premier niveau (nouveau) actuel.    


---
## fullscreenWindow
La commande Fullscreen Window invoque l'opération "full screen" spécifique au gestionnaire de fenêtres, si elle existe, sur la fenêtre contenant le contexte de navigation de premier niveau actuel. Cela augmente généralement la fenêtre à la taille de l'écran physique et peut masquer les éléments de l'interface du navigateur tels que les barres d'outils.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-fullscreen-window).



##### Utilisation

```js
browser.fullscreenWindow()
```




##### Retourne

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** Une représentation JSON d'un objet "window rect" du contexte de navigation de premier niveau (nouveau) actuel.    


---
## findElement
La commande Find Element est utilisée pour trouver un élément dans le contexte de navigation actuel qui peut être utilisé pour les commandes futures. Cette commande renvoie une représentation JSON de l'élément qui peut être transmise à la commande $ pour transformer la référence en un élément WebdriverIO étendu.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [$](/docs/api/browser/$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```



##### Retourne

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Une représentation JSON d'un objet élément, par exemple `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromShadowRoot
La commande Find Element From Shadow Root est utilisée pour trouver un élément dans le shadow root d'un élément qui peut être utilisé pour les commandes futures. Cette commande renvoie une représentation JSON de l'élément qui peut être transmise à la commande $ pour transformer la référence en un élément WebdriverIO étendu.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [shadow$](/docs/api/element/shadow$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>id d'élément d'un élément shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```



##### Retourne

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Une représentation JSON d'un objet élément shadow, par exemple `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElements
La commande Find Elements est utilisée pour trouver des éléments dans le contexte de navigation actuel qui peuvent être utilisés pour les commandes futures. Cette commande renvoie un tableau de représentation JSON des éléments qui peuvent être transmis à la commande $ pour transformer la référence en un élément WebdriverIO étendu (Voir findElement).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [$$](/docs/api/browser/$$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```



##### Retourne

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Une liste JSON (éventuellement vide) de représentations d'un objet élément, par exemple `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## findElementsFromShadowRoot
La commande Find Elements est utilisée pour trouver des éléments dans le shadow root d'un élément qui peuvent être utilisés pour les commandes futures. Cette commande renvoie un tableau de représentation JSON des éléments qui peuvent être transmis à la commande $ pour transformer la référence en un élément WebdriverIO étendu (Voir findElement).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [shadow$$](/docs/api/element/shadow$$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>id d'élément d'un élément shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```



##### Retourne

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Une liste JSON (éventuellement vide) de représentations d'un objet élément, par exemple `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementFromElement
La commande Find Element From Element est utilisée pour trouver un élément à partir d'un élément web dans le contexte de navigation actuel qui peut être utilisé pour les commandes futures. Cette commande renvoie une représentation JSON de l'élément qui peut être transmise à la commande $ pour transformer la référence en un élément WebdriverIO étendu (Voir findElement).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [$](/docs/api/element/$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElementFromElement(elementId, using, value)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```



##### Retourne

- **&lt;object&gt;**
            **<code><var>element</var></code>:** Une représentation JSON d'un objet élément, par exemple `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## findElementsFromElement
La commande Find Elements From Element est utilisée pour trouver des éléments à partir d'un élément web dans le contexte de navigation actuel qui peuvent être utilisés pour les commandes futures. Cette commande renvoie un tableau de représentation JSON des éléments qui peuvent être transmis à la commande $ pour transformer la référence en un élément WebdriverIO étendu (Voir findElement).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [$$](/docs/api/element/$$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>une stratégie de localisation d'élément valide</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>le sélecteur réel qui sera utilisé pour trouver un élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```



##### Retourne

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** Une liste JSON (éventuellement vide) de représentations d'un objet élément, par exemple `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.    


---
## getElementShadowRoot
Obtient l'objet shadow root d'un élément. L'objet résultant peut être utilisé pour récupérer des éléments dans ce shadow root en utilisant par exemple findElementFromShadowRoots ou findElementsFromShadowRoots.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [shadow$](/docs/api/element/shadow$). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getElementShadowRoot(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** Une représentation JSON d'un shadow root d'élément, par exemple `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## getActiveElement
Get Active Element renvoie l'élément actif du document de l'élément du contexte de navigation actuel. Cette commande renvoie une représentation JSON de l'élément qui peut être transmise à la commande $ pour transformer la référence en un élément WebdriverIO étendu (Voir findElement).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-active-element).



##### Utilisation

```js
browser.getActiveElement()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>element</var></code>:** Une représentation JSON d'un objet élément, par exemple `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.    


---
## isElementSelected
Is Element Selected détermine si l'élément référencé est sélectionné ou non. Cette opération n'a de sens que sur les éléments d'entrée des états Checkbox et Radio Button, ou les éléments d'option.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [isSelected](/docs/api/element/isSelected). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.isElementSelected(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```



##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` ou `false` selon l'état de sélection.    


---
## isElementDisplayed
Is Element Displayed détermine la visibilité d'un élément qui est guidé par ce qui est perceptuellement visible pour l'œil humain. Dans ce contexte, la visibilité d'un élément n'est pas liée aux propriétés de style `visibility` ou `display`.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [isDisplayed](/docs/api/element/isDisplayed). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.isElementDisplayed(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```



##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` ou `false` selon l'état de visibilité.    


---
## getElementAttribute
La commande Get Element Attribute renverra l'attribut d'un élément web.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [getAttribute](/docs/api/element/getAttribute). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getElementAttribute(elementId, name)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nom de la valeur d'attribut à récupérer</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** L'attribut nommé de l'élément.    


---
## getElementProperty
La commande Get Element Property renverra le résultat de l'obtention d'une propriété d'un élément.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [getProperty](/docs/api/element/getProperty). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getElementProperty(elementId, name)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nom de la propriété d'attribut à récupérer</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>property</var></code>:** La propriété nommée de l'élément, accessible en appelant GetOwnProperty sur l'objet élément.    


---
## getElementCSSValue
La commande Get Element CSS Value récupère la valeur calculée de la propriété CSS donnée de l'élément web donné.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [getCSSProperty](/docs/api/element/getCSSProperty). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>nom de la propriété CSS à récupérer</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** La valeur calculée du paramètre correspondant au nom de la propriété à partir des déclarations de style de l'élément (sauf si le type de document est xml, auquel cas la valeur de retour est simplement la chaîne vide).    


---
## getElementText
La commande Get Element Text vise à renvoyer le texte d'un élément "tel que rendu". Le texte rendu d'un élément est également utilisé pour localiser des éléments par leur texte de lien et leur texte de lien partiel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-text).



##### Utilisation

```js
browser.getElementText(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Le texte visible de l'élément (y compris les éléments enfants), suivant l'algorithme défini dans les Selenium Atoms pour [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).    


---
## getElementTagName
La commande Get Element Tag Name renvoie le nom d'élément qualifié de l'élément web donné.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [getTagName](/docs/api/element/getTagName). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.getElementTagName(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>text</var></code>:** L'attribut tagName de l'élément.    


---
## getElementRect
La commande Get Element Rect renvoie les dimensions et les coordonnées de l'élément web donné.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Cette commande de protocole est intégrée dans les méthodes pratiques suivantes: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Il est recommandé d'utiliser ces commandes à la place.

:::


##### Utilisation

```js
browser.getElementRect(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** Un objet JSON représentant la position et le rectangle englobant de l'élément.    


---
## isElementEnabled
Is Element Enabled détermine si l'élément référencé est activé ou non. Cette opération n'a de sens que sur les contrôles de formulaire.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [isEnabled](/docs/api/element/isEnabled). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.isElementEnabled(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```



##### Retourne

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Si l'élément est dans un document xml, ou est un contrôle de formulaire désactivé: `false`, sinon, `true`.    


---
## elementClick
La commande Element Click fait défiler l'élément en vue s'il n'est pas déjà interactif par pointeur, puis clique sur son point central en vue. Si le point central de l'élément est masqué par un autre élément, une erreur d'interception de clic d'élément est renvoyée. Si l'élément est en dehors de la fenêtre d'affichage, une erreur d'élément non interactif est renvoyée.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [click](/docs/api/element/click). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.elementClick(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```






---
## elementClear
La commande Element Clear fait défiler l'élément modifiable ou réinitialisable en vue et tente ensuite d'effacer ses fichiers sélectionnés ou son contenu textuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [clearValue](/docs/api/element/clearValue). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.elementClear(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```






---
## elementSendKeys
La commande Element Send Keys fait défiler l'élément de contrôle de formulaire en vue, puis envoie les touches fournies à l'élément. Dans le cas où l'élément n'est pas interactif par clavier, une erreur d'élément non interactif est renvoyée.<br /><br />L'état d'entrée des touches utilisé pour l'entrée peut être effacé au milieu de la "frappe" en envoyant la touche null, qui est U+E000 (NULL).<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Cette commande de protocole est intégrée dans les méthodes pratiques suivantes: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Il est recommandé d'utiliser ces commandes à la place.

:::


##### Utilisation

```js
browser.elementSendKeys(elementId, text)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>chaîne à envoyer sous forme de frappes de touches à l'élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```






---
## getPageSource
La commande Get Page Source renvoie une sérialisation de chaîne du DOM du document actif du contexte de navigation actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-page-source).



##### Utilisation

```js
browser.getPageSource()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** le DOM du document actif du contexte de navigation actuel    


---
## executeScript
La commande Execute Script exécute une fonction JavaScript dans le contexte du contexte de navigation actuel et renvoie la valeur de retour de la fonction.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [execute](/docs/api/browser/execute). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.executeScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>une chaîne, le corps de la fonction JavaScript que vous voulez exécuter</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>un tableau de valeurs JSON qui seront désérialisées et passées comme arguments à votre fonction</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```



##### Retourne

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Soit la valeur de retour de votre script, l'accomplissement de la Promise renvoyée par votre script, ou l'erreur qui était la raison du rejet de la Promise renvoyée par votre script.    


---
## executeAsyncScript
La commande Execute Async Script amène JavaScript à exécuter en tant que fonction anonyme. Contrairement à la commande Execute Script, le résultat de la fonction est ignoré. À la place, un argument supplémentaire est fourni comme argument final à la fonction. Il s'agit d'une fonction qui, lorsqu'elle est appelée, renvoie son premier argument comme réponse.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Cette commande de protocole est intégrée dans la méthode pratique suivante: [executeAsync](/docs/api/browser/executeAsync). Il est recommandé d'utiliser cette commande à la place.

:::


##### Utilisation

```js
browser.executeAsyncScript(script, args)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>une chaîne, le corps de la fonction JavaScript que vous voulez exécuter</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>un tableau de valeurs JSON qui seront désérialisées et passées comme arguments à votre fonction</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```



##### Retourne

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Soit la valeur de retour de votre script, l'accomplissement de la Promise renvoyée par votre script, ou l'erreur qui était la raison du rejet de la Promise renvoyée par votre script.    


---
## getAllCookies
La commande Get All Cookies renvoie tous les cookies associés à l'adresse du document actif du contexte de navigation actuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-all-cookies).



##### Utilisation

```js
browser.getAllCookies()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```



##### Retourne

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Une liste de cookies sérialisés. Chaque cookie sérialisé a un certain nombre de champs optionnels qui peuvent ou non être renvoyés en plus de `name` et `value`.    


---
## addCookie
La commande Add Cookie ajoute un seul cookie au magasin de cookies associé à l'adresse du document actif.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).



##### Utilisation

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>Un objet JSON représentant un cookie. Il doit avoir au moins les champs name et value et pourrait en avoir plus, y compris expiry-time, etc.</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```






---
## deleteAllCookies
La commande Delete All Cookies permet la suppression de tous les cookies associés à l'adresse du document actif.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).



##### Utilisation

```js
browser.deleteAllCookies()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```






---
## getNamedCookie
La commande Get Named Cookie renvoie le cookie avec le nom demandé parmi les cookies associés dans le magasin de cookies du document actif du contexte de navigation actuel. Si aucun cookie n'est trouvé, une erreur "pas de cookie" est renvoyée.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-named-cookie).



##### Utilisation

```js
browser.getNamedCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nom du cookie à récupérer</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```



##### Retourne

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Un cookie sérialisé, avec les champs name et value. Il y a un certain nombre de champs optionnels comme `path`, `domain` et `expiry-time` qui peuvent également être présents.    


---
## deleteCookie
La commande Delete Cookie vous permet de supprimer soit un seul cookie par nom de paramètre, soit tous les cookies associés à l'adresse du document actif si name est indéfini.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-delete-cookie).



##### Utilisation

```js
browser.deleteCookie(name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>nom du cookie à supprimer</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```






---
## performActions
La commande Perform Actions est utilisée pour exécuter des actions utilisateur complexes. Voir [spec](https://github.com/jlipps/simple-wd-spec#perform-actions) pour plus de détails.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-perform-actions).



##### Utilisation

```js
browser.performActions(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>une liste d'objets, chacun représentant une source d'entrée et ses actions associées</td>
    </tr>
  </tbody>
</table>





---
## releaseActions
La commande Release Actions est utilisée pour relâcher toutes les touches et boutons de pointeur qui sont actuellement enfoncés. Cela provoque le déclenchement d'événements comme si l'état était relâché par une série explicite d'actions. Cela efface également tout l'état interne des dispositifs virtuels.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-release-actions).



##### Utilisation

```js
browser.releaseActions()
```







---
## dismissAlert
La commande Dismiss Alert rejette une boîte de dialogue simple si elle est présente, sinon erreur. Une demande de rejet d'une invite utilisateur d'alerte, qui peut ne pas nécessairement avoir un bouton de rejet, a le même effet que de l'accepter.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-dismiss-alert).



##### Utilisation

```js
browser.dismissAlert()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```






---
## acceptAlert
La commande Accept Alert accepte une boîte de dialogue simple si elle est présente, sinon erreur.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-accept-alert).



##### Utilisation

```js
browser.acceptAlert()
```







---
## getAlertText
La commande Get Alert Text renvoie le message de l'invite utilisateur actuelle. S'il n'y a pas d'invite utilisateur actuelle, elle renvoie une erreur.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-get-alert-text).



##### Utilisation

```js
browser.getAlertText()
```



##### Exemple

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```



##### Retourne

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** Le message de l'invite utilisateur.    


---
## sendAlertText
La commande Send Alert Text définit le champ de texte d'une invite utilisateur window.prompt à la valeur donnée.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-send-alert-text).



##### Utilisation

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>chaîne à définir pour l'invite</td>
    </tr>
  </tbody>
</table>





---
## takeScreenshot
La commande Take Screenshot prend une capture d'écran de la fenêtre d'affichage du contexte de navigation de premier niveau.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-take-screenshot).



##### Utilisation

```js
browser.takeScreenshot()
```




##### Retourne

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Les données d'image PNG encodées en base64 comprenant la capture d'écran de la fenêtre d'affichage initiale.    


---
## takeElementScreenshot
La commande Take Element Screenshot prend une capture d'écran de la région visible englobée par le rectangle englobant d'un élément.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).



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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>faire défiler l'élément en vue. Par défaut: true</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Les données d'image PNG encodées en base64 comprenant la capture d'écran de la région visible du rectangle englobant d'un élément après qu'il ait été défilé en vue.    


---
## getElementComputedRole
Obtient le rôle WAI-ARIA calculé d'un élément.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#get-computed-role).



##### Utilisation

```js
browser.getElementComputedRole(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>role</var></code>:** Le résultat du calcul du rôle WAI-ARIA de l'élément.    


---
## getElementComputedLabel
Obtient le nom accessible de l'élément.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver/#get-computed-label).



##### Utilisation

```js
browser.getElementComputedLabel(elementId)
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
      <td>l'id d'un élément renvoyé dans un appel précédent à Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>label</var></code>:** Le résultat d'un calcul de nom et de description accessible pour le nom accessible de l'élément.    


---
## setPermissions
Simule la modification par l'utilisateur de l'état de permission d'un PermissionDescriptor. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/permissions/#set-permission-command).



##### Utilisation

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Chaque fonctionnalité puissante a un ou plusieurs aspects pour lesquels les sites Web peuvent demander l'autorisation d'accéder. Pour décrire ces aspects, chaque fonctionnalité définit un sous-type de PermissionDescriptor comme son type de descripteur de permission. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Détermine si la permission est accordée, refusée ou invitée.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>Indique s'il faut appliquer les permissions à tous les contextes d'exécution.</td>
    </tr>
  </tbody>
</table>

##### Exemples


```js
// définir les permissions midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // peut aussi être "denied" ou "prompt"
);
```


```js
// définir les permissions du presse-papiers
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// maintenant vous pouvez lire le presse-papiers via, par exemple
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```





---
## generateTestReport
Génère un rapport pour les tests. Extension pour [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/reporting/#automation).



##### Utilisation

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Message à afficher dans le rapport.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string</td>
      <td>Spécifie le groupe de point de terminaison auquel livrer le rapport.</td>
    </tr>
  </tbody>
</table>





---
## createMockSensor
Crée un capteur simulé pour émuler des capteurs comme le capteur de lumière ambiante. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### Utilisation

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Type d'API de capteur à simuler, par exemple 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>Un double représentant la fréquence en Hz qui est utilisé pour définir la fréquence d'échantillonnage maximale prise en charge pour le capteur simulé associé.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>Un double représentant la fréquence en Hz qui est utilisé pour définir la fréquence d'échantillonnage minimale prise en charge pour le capteur simulé associé.</td>
    </tr>
  </tbody>
</table>





---
## getMockSensor
Récupère des informations sur un type donné de capteur simulé. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/sensors/#get-mock-sensor-command).



##### Utilisation

```js
browser.getMockSensor(type)
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
      <td>String</td>
      <td>Type de capteur simulé pour récupérer des informations.</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Valeurs de la lecture du capteur simulé.    


---
## updateMockSensor
Met à jour le type de capteur simulé. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).



##### Utilisation

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td>String</td>
      <td>Type de capteur simulé pour mettre à jour les informations.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Type d'API de capteur à simuler, par exemple 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>Un double représentant la fréquence en Hz qui est utilisé pour définir la fréquence d'échantillonnage maximale prise en charge pour le capteur simulé associé.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>number</td>
      <td>Un double représentant la fréquence en Hz qui est utilisé pour définir la fréquence d'échantillonnage minimale prise en charge pour le capteur simulé associé.</td>
    </tr>
  </tbody>
</table>





---
## deleteMockSensor
La commande Delete Session ferme tous les contextes de navigation de premier niveau associés à la session en cours, termine la connexion et ferme enfin la session en cours. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/sensors/#delete-mock-sensor-command).



##### Utilisation

```js
browser.deleteMockSensor(type)
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
      <td>String</td>
      <td>Type de capteur simulé à supprimer.</td>
    </tr>
  </tbody>
</table>





---
## setTimeZone
Simule le changement d'un fuseau horaire aux fins de test. __Remarque :__ cette fonctionnalité n'a pas encore été implémentée dans tous les navigateurs.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/sensors/#create-mock-sensor-command).



##### Utilisation

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Nom du fuseau horaire, par exemple Asia/Tokyo</td>
    </tr>
  </tbody>
</table>





---
## addVirtualAuthenticator
Crée un [Authentificateur Virtuel](https://www.w3.org/TR/webauthn-2/#virtual-authenticators) logiciel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).



##### Utilisation

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string</td>
      <td>Valeurs valides: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string</td>
      <td>Valeurs valides: 'usb', 'nfc', 'ble' ou 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>Valeurs valides: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>Valeurs valides: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>Valeurs valides: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>boolean</td>
      <td>Valeurs valides: Un tableau contenant des identifiants d'extension.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string[]</td>
      <td>Valeurs valides: Jusqu'à 3 entrées de méthode de vérification utilisateur.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Renvoie l'ID de chaîne de l'authentificateur.    


---
## removeVirtualAuthenticator
Supprime un authentificateur virtuel précédemment créé.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).



##### Utilisation

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id de l'authentificateur</td>
    </tr>
  </tbody>
</table>





---
## addCredential
Injecte une source d'identification à clé publique dans un authentificateur virtuel existant.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).



##### Utilisation

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID de l'authentificateur</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>L'ID d'identification encodé en Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Si défini sur true, une identification découvrable côté client est créée. Si défini sur false, une identification côté serveur est créée à la place.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>L'ID de partie utilisatrice auquel l'identification est limitée.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Un paquet de clé asymétrique contenant une seule clé privée selon [RFC5958], encodé en Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>Le userHandle associé à l'identification encodé en Base64url. Cette propriété peut ne pas être définie.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>La valeur initiale d'un compteur de signature associé à la source d'identification à clé publique.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>string</td>
      <td>Le grand blob par identification associé à la source d'identification à clé publique, encodé en Base64url. Cette propriété peut ne pas être définie.</td>
    </tr>
  </tbody>
</table>





---
## getCredentials
Renvoie un objet Credential Parameters pour chaque source d'identification à clé publique stockée dans un authentificateur virtuel, qu'elles aient été stockées à l'aide de Add Credential ou de `navigator.credentials.create()`.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).



##### Utilisation

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id de l'authentificateur</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Renvoie un tableau d'identifiants.    


---
## removeAllCredentials
Supprime toutes les sources d'identification à clé publique stockées sur un authentificateur virtuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).



##### Utilisation

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id de l'authentificateur</td>
    </tr>
  </tbody>
</table>





---
## removeCredential
Supprime une source d'identification à clé publique stockée sur un authentificateur virtuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).



##### Utilisation

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id de l'authentificateur</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>id de l'identification</td>
    </tr>
  </tbody>
</table>





---
## setUserVerified
La commande d'extension Set User Verified définit la propriété isUserVerified sur l'authentificateur virtuel.<br /><br />Commande du protocole WebDriver. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).



##### Utilisation

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>id de l'authentificateur</td>
    </tr>
  </tbody>
</table>




