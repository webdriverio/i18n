---
id: webdriverBidi
title: Protocole WebDriver Bidi
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriverBidi.ts
---

Ces commandes de protocole sont générées sur la base de la spécification actuelle
[WebDriver Bidi](https://w3c.github.io/webdriver-bidi/). Pour activer le protocole
pour votre test, assurez-vous d'avoir défini `webSocketUrl: true` dans vos capacités.

:::caution Utilisez avec précaution !

La prise en charge par les navigateurs n'est pas garantie et les interfaces peuvent changer à l'avenir. La norme
est actuellement en cours de développement et les fournisseurs de navigateurs ajouteront ces fonctionnalités selon
leurs propres calendriers.

:::

Dernière mise à jour : Sat Apr 26 2025 17:10:07 GMT-0700 (Pacific Daylight Time)

---

## send
Envoyer des commandes socket via WebDriver Bidi<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/w3c/webdriver-bidi).

##### Utilisation

```js
browser.send(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>charge utile du socket</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>CommandResponse</var></code>:** Réponse WebDriver Bidi


---

## sendAsync
Envoyer des commandes socket asynchrones via WebDriver Bidi<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://github.com/w3c/webdriver-bidi).

##### Utilisation

```js
browser.sendAsync(params)
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
      <td><code><var>params</var></code></td>
      <td>CommandData</td>
      <td>charge utile du socket</td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Number&gt;**
            **<code><var>id</var></code>:** id de la requête WebDriver Bidi


---

## sessionStatus
Commande WebDriver Bidi pour envoyer la méthode de commande "session.status" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-session-status).

##### Utilisation

```js
browser.sessionStatus(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.SessionStatusResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     ready: boolean;
     message: string;
   }
   ```


---

## sessionNew
Commande WebDriver Bidi pour envoyer la méthode de commande "session.new" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-session-new).

##### Utilisation

```js
browser.sessionNew(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionNewParameters`</td>
      <td><pre>\{<br />  capabilities: SessionCapabilitiesRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.SessionNewResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     sessionId: string;
     capabilities: {
       acceptInsecureCerts: boolean;
       browserName: string;
       browserVersion: string;
       platformName: string;
       setWindowRect: boolean;
       userAgent: string;
       proxy?: SessionProxyConfiguration;
       webSocketUrl?: string;
     };
   }
   ```


---

## sessionEnd
Commande WebDriver Bidi pour envoyer la méthode de commande "session.end" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-session-end).

##### Utilisation

```js
browser.sessionEnd(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionSubscribe
Commande WebDriver Bidi pour envoyer la méthode de commande "session.subscribe" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-session-subscribe).

##### Utilisation

```js
browser.sessionSubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## sessionUnsubscribe
Commande WebDriver Bidi pour envoyer la méthode de commande "session.unsubscribe" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-session-unsubscribe).

##### Utilisation

```js
browser.sessionUnsubscribe(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.SessionSubscriptionRequest`</td>
      <td><pre>\{<br />  events: string[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserClose
Commande WebDriver Bidi pour envoyer la méthode de commande "browser.close" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browser-close).

##### Utilisation

```js
browser.browserClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browserCreateUserContext
Commande WebDriver Bidi pour envoyer la méthode de commande "browser.createUserContext" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browser-createUserContext).

##### Utilisation

```js
browser.browserCreateUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowserCreateUserContextResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   ;
   ```


---

## browserGetUserContexts
Commande WebDriver Bidi pour envoyer la méthode de commande "browser.getUserContexts" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browser-getUserContexts).

##### Utilisation

```js
browser.browserGetUserContexts(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.EmptyParams`</td>
      <td><pre>\{\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowserGetUserContextsResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     userContexts: BrowserUserContextInfo[];
   }
   ```


---

## browserRemoveUserContext
Commande WebDriver Bidi pour envoyer la méthode de commande "browser.removeUserContext" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browser-removeUserContext).

##### Utilisation

```js
browser.browserRemoveUserContext(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowserRemoveUserContextParameters`</td>
      <td><pre>\{<br />  userContext: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextActivate
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.activate" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-activate).

##### Utilisation

```js
browser.browsingContextActivate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextActivateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCaptureScreenshot
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.captureScreenshot" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-captureScreenshot).

##### Utilisation

```js
browser.browsingContextCaptureScreenshot(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCaptureScreenshotParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  /\*\*<br />   \* @default 'viewport'<br />   \*/<br />  origin?: "viewport" &#124; "document";<br />  format?: BrowsingContextImageFormat;<br />  clip?: BrowsingContextClipRectangle;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCaptureScreenshotResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextClose
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.close" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-close).

##### Utilisation

```js
browser.browsingContextClose(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCloseParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  promptUnload?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextCreate
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.create" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-create).

##### Utilisation

```js
browser.browsingContextCreate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextCreateParameters`</td>
      <td><pre>\{<br />  type: BrowsingContextCreateType;<br />  referenceContext?: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  userContext?: BrowserUserContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextCreateResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     context: BrowsingContextBrowsingContext;
   }
   ```


---

## browsingContextGetTree
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.getTree" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-getTree).

##### Utilisation

```js
browser.browsingContextGetTree(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextGetTreeParameters`</td>
      <td><pre>\{<br />  maxDepth?: JsUint;<br />  root?: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextGetTreeResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     contexts: BrowsingContextInfoList;
   }
   ```


---

## browsingContextHandleUserPrompt
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.handleUserPrompt" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-handleUserPrompt).

##### Utilisation

```js
browser.browsingContextHandleUserPrompt(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextHandleUserPromptParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  accept?: boolean;<br />  userText?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextLocateNodes
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.locateNodes" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes).

##### Utilisation

```js
browser.browsingContextLocateNodes(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextLocateNodesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  locator: BrowsingContextLocator;<br />  maxNodeCount?: JsUint;<br />  serializationOptions?: ScriptSerializationOptions;<br />  startNodes?: ScriptSharedReference[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextLocateNodesResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     nodes: ScriptNodeRemoteValue[];
   }
   ```


---

## browsingContextNavigate
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.navigate" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-navigate).

##### Utilisation

```js
browser.browsingContextNavigate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextNavigateParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  url: string;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextNavigateResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     navigation: BrowsingContextNavigation | null;
     url: string;
   }
   ```


---

## browsingContextPrint
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.print" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-print).

##### Utilisation

```js
browser.browsingContextPrint(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextPrintParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  background?: boolean;<br />  margin?: BrowsingContextPrintMarginParameters;<br />  /\*\*<br />   \* @default 'portrait'<br />   \*/<br />  orientation?: "portrait" &#124; "landscape";<br />  page?: BrowsingContextPrintPageParameters;<br />  pageRanges?: (JsUint &#124; string)[];<br />  /\*\*<br />   \* @default 1<br />   \*/<br />  scale?: number;<br />  /\*\*<br />   \* @default true<br />   \*/<br />  shrinkToFit?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.BrowsingContextPrintResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     data: string;
   }
   ```


---

## browsingContextReload
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.reload" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-reload).

##### Utilisation

```js
browser.browsingContextReload(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextReloadParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  ignoreCache?: boolean;<br />  wait?: BrowsingContextReadinessState;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextSetViewport
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.setViewport" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-setViewport).

##### Utilisation

```js
browser.browsingContextSetViewport(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextSetViewportParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  viewport?: BrowsingContextViewport &#124; null;<br />  devicePixelRatio?: number &#124; null;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## browsingContextTraverseHistory
Commande WebDriver Bidi pour envoyer la méthode de commande "browsingContext.traverseHistory" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-browsingContext-traverseHistory).

##### Utilisation

```js
browser.browsingContextTraverseHistory(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.BrowsingContextTraverseHistoryParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  delta: JsInt;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkAddIntercept
Commande WebDriver Bidi pour envoyer la méthode de commande "network.addIntercept" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-addIntercept).

##### Utilisation

```js
browser.networkAddIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkAddInterceptParameters`</td>
      <td><pre>\{<br />  phases: NetworkInterceptPhase[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  urlPatterns?: NetworkUrlPattern[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.NetworkAddInterceptResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     intercept: NetworkIntercept;
   }
   ```


---

## networkContinueRequest
Commande WebDriver Bidi pour envoyer la méthode de commande "network.continueRequest" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-continueRequest).

##### Utilisation

```js
browser.networkContinueRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkCookieHeader[];<br />  headers?: NetworkHeader[];<br />  method?: string;<br />  url?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueResponse
Commande WebDriver Bidi pour envoyer la méthode de commande "network.continueResponse" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-continueResponse).

##### Utilisation

```js
browser.networkContinueResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  cookies?: NetworkSetCookieHeader[];<br />  credentials?: NetworkAuthCredentials;<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkContinueWithAuth
Commande WebDriver Bidi pour envoyer la méthode de commande "network.continueWithAuth" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-continueWithAuth).

##### Utilisation

```js
browser.networkContinueWithAuth(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkContinueWithAuthParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkFailRequest
Commande WebDriver Bidi pour envoyer la méthode de commande "network.failRequest" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-failRequest).

##### Utilisation

```js
browser.networkFailRequest(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkFailRequestParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkProvideResponse
Commande WebDriver Bidi pour envoyer la méthode de commande "network.provideResponse" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-provideResponse).

##### Utilisation

```js
browser.networkProvideResponse(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkProvideResponseParameters`</td>
      <td><pre>\{<br />  request: NetworkRequest;<br />  body?: NetworkBytesValue;<br />  cookies?: NetworkSetCookieHeader[];<br />  headers?: NetworkHeader[];<br />  reasonPhrase?: string;<br />  statusCode?: JsUint;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## networkRemoveIntercept
Commande WebDriver Bidi pour envoyer la méthode de commande "network.removeIntercept" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-network-removeIntercept).

##### Utilisation

```js
browser.networkRemoveIntercept(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.NetworkRemoveInterceptParameters`</td>
      <td><pre>\{<br />  intercept: NetworkIntercept;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptAddPreloadScript
Commande WebDriver Bidi pour envoyer la méthode de commande "script.addPreloadScript" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-addPreloadScript).

##### Utilisation

```js
browser.scriptAddPreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptAddPreloadScriptParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  arguments?: ScriptChannelValue[];<br />  contexts?: BrowsingContextBrowsingContext[];<br />  sandbox?: string;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.ScriptAddPreloadScriptResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     script: ScriptPreloadScript;
   }
   ```


---

## scriptDisown
Commande WebDriver Bidi pour envoyer la méthode de commande "script.disown" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-disown).

##### Utilisation

```js
browser.scriptDisown(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptDisownParameters`</td>
      <td><pre>\{<br />  handles: ScriptHandle[];<br />  target: ScriptTarget;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptCallFunction
Commande WebDriver Bidi pour envoyer la méthode de commande "script.callFunction" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-callFunction).

##### Utilisation

```js
browser.scriptCallFunction(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptCallFunctionParameters`</td>
      <td><pre>\{<br />  functionDeclaration: string;<br />  awaitPromise: boolean;<br />  target: ScriptTarget;<br />  arguments?: ScriptLocalValue[];<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  this?: ScriptLocalValue;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## scriptEvaluate
Commande WebDriver Bidi pour envoyer la méthode de commande "script.evaluate" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-evaluate).

##### Utilisation

```js
browser.scriptEvaluate(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptEvaluateParameters`</td>
      <td><pre>\{<br />  expression: string;<br />  target: ScriptTarget;<br />  awaitPromise: boolean;<br />  resultOwnership?: ScriptResultOwnership;<br />  serializationOptions?: ScriptSerializationOptions;<br />  userActivation?: boolean;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.ScriptEvaluateResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   ;
   ```


---

## scriptGetRealms
Commande WebDriver Bidi pour envoyer la méthode de commande "script.getRealms" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-getRealms).

##### Utilisation

```js
browser.scriptGetRealms(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptGetRealmsParameters`</td>
      <td><pre>\{<br />  context?: BrowsingContextBrowsingContext;<br />  type?: ScriptRealmType;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.ScriptGetRealmsResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     realms: ScriptRealmInfo[];
   }
   ```


---

## scriptRemovePreloadScript
Commande WebDriver Bidi pour envoyer la méthode de commande "script.removePreloadScript" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-script-removePreloadScript).

##### Utilisation

```js
browser.scriptRemovePreloadScript(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.ScriptRemovePreloadScriptParameters`</td>
      <td><pre>\{<br />  script: ScriptPreloadScript;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## storageGetCookies
Commande WebDriver Bidi pour envoyer la méthode de commande "storage.getCookies" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-storage-getCookies).

##### Utilisation

```js
browser.storageGetCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageGetCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.StorageGetCookiesResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     cookies: NetworkCookie[];
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageSetCookie
Commande WebDriver Bidi pour envoyer la méthode de commande "storage.setCookie" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-storage-setCookie).

##### Utilisation

```js
browser.storageSetCookie(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageSetCookieParameters`</td>
      <td><pre>\{<br />  cookie: StoragePartialCookie;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.StorageSetCookieResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## storageDeleteCookies
Commande WebDriver Bidi pour envoyer la méthode de commande "storage.deleteCookies" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-storage-deleteCookies).

##### Utilisation

```js
browser.storageDeleteCookies(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.StorageDeleteCookiesParameters`</td>
      <td><pre>\{<br />  filter?: StorageCookieFilter;<br />  partition?: StoragePartitionDescriptor;<br />\}</pre></td>
    </tr>
  </tbody>
</table>


##### Retourne

- **&lt;Object&gt;**
            **<code><var>local.StorageDeleteCookiesResult</var></code>:** Valeur de retour de la commande avec l'interface suivante:
   ```ts
   {
     partitionKey: StoragePartitionKey;
   }
   ```


---

## inputPerformActions
Commande WebDriver Bidi pour envoyer la méthode de commande "input.performActions" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-input-performActions).

##### Utilisation

```js
browser.inputPerformActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputPerformActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  actions: InputSourceActions[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputReleaseActions
Commande WebDriver Bidi pour envoyer la méthode de commande "input.releaseActions" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-input-releaseActions).

##### Utilisation

```js
browser.inputReleaseActions(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputReleaseActionsParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />\}</pre></td>
    </tr>
  </tbody>
</table>



---

## inputSetFiles
Commande WebDriver Bidi pour envoyer la méthode de commande "input.setFiles" avec des paramètres.<br /><br />Commande de protocole WebDriver Bidi. Plus de détails peuvent être trouvés dans les [docs officiels du protocole](https://w3c.github.io/webdriver-bidi/#command-input-setFiles).

##### Utilisation

```js
browser.inputSetFiles(params)
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
      <td><code><var>params</var></code></td>
      <td>`remote.InputSetFilesParameters`</td>
      <td><pre>\{<br />  context: BrowsingContextBrowsingContext;<br />  element: ScriptSharedReference;<br />  files: string[];<br />\}</pre></td>
    </tr>
  </tbody>
</table>

