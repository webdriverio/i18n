---
id: browsingContext
title: L'objet BrowsingContext
description: Manipulez un onglet, une fenêtre ou un frame comme un objet et exécutez-y des commandes directement, sans y basculer la session.
---

Un contexte de navigation (browsing context) est un onglet, une fenêtre ou un frame que vous manipulez comme un objet. Les commandes que vous appelez dessus s'exécutent dans cet onglet ou ce frame, tandis que la session et tous les autres contextes restent là où ils sont. Depuis la v10, c'est ainsi que WebdriverIO gère les onglets, les fenêtres et les frames dans une session WebDriver BiDi. Ce mécanisme y remplace `switchWindow()` et `switchFrame()`.

```ts title="test/specs/tabs.e2e.ts"
import { browser, expect } from '@wdio/globals'

describe('browsing contexts', () => {
    it('works with two tabs and a frame at the same time', async () => {
        const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
        const docs = await browser.newWindow('https://webdriver.io/docs/api', { type: 'tab' })

        const top = await page.frame({ selector: 'frame[name="frame-top"]' })
        const middle = await top.frame({ selector: 'frame[name="frame-middle"]' })

        await expect(middle.$('#content')).toHaveText('MIDDLE')
        await expect(docs.$('h1')).toBeDisplayed()
        console.log(await page.getTitle(), await docs.getTitle())
    })
})
```

## Obtenir un contexte de navigation

| Appel | Retourne |
| --- | --- |
| [`browser.url(url)`](/docs/api/browser/url) | Le premier contexte de niveau supérieur de la session, après y avoir navigué. `browser.url()` navigue toujours dans celui-ci. |
| [`browser.newWindow(url, { type })`](/docs/api/browser/newWindow) | Un nouvel onglet (`type: 'tab'`) ou une nouvelle fenêtre, une fois sa page chargée. La session n'y bascule pas. |
| [`browser.browsingContexts()`](/docs/api/browser/browsingContexts) | Tous les contextes de niveau supérieur ouverts (onglets et fenêtres, pas les frames), par exemple un onglet ouvert par la page elle-même. |
| [`context.frame(query)`](/docs/api/browsingContext/frame) | Un frame d'un contexte, y compris les frames cross-origin et imbriqués. |

Conservez l'objet et appelez des commandes dessus. Il n'y a pas d'onglet ou de frame « courant » entre lesquels basculer, les contextes peuvent donc aussi être utilisés en parallèle :

```ts
const [titleA, titleB] = await Promise.all([pageA.getTitle(), pageB.getTitle()])
```

## Sessions WebDriver BiDi et Classic

Les contextes de navigation nécessitent une session WebDriver BiDi, qui est le mode par défaut depuis la v10 pour Chrome, Edge et Firefox. Dans une session WebDriver Classic, par exemple avec Appium ou Safari, il n'existe que le contexte courant de la session. Dans ce cas :

- `browser.url()` retourne un substitut du navigateur. Les commandes comme `$`, `execute` ou `getTitle` s'exécutent sur le navigateur, `url`, `isFrame` et `parent` décrivent la page courante, et `contextId` vaut `undefined`.
- `frame()`, `navigate()` et `activate()` sont rejetées et indiquent la commande Classic à utiliser à la place : [`browser.switchFrame()`](/docs/api/browser/switchFrame), [`browser.url()`](/docs/api/browser/url) ou [`browser.switchWindow()`](/docs/api/browser/switchWindow).

Vérifiez `browser.isBidi` lorsque le même code s'exécute dans les deux types de session.

## Propriétés

| Nom | Type | Détails |
| ---- | ---- | ------- |
| `contextId` | `String` | L'identifiant du contexte de navigation WebDriver BiDi. `undefined` dans une session Classic. |
| `url` | `String` | L'URL vers laquelle le contexte a été navigué en dernier avec `browser.url()`, `navigate()` ou `newWindow()`. Les navigations effectuées par la page elle-même (liens, `location`, `history.pushState`) n'apparaissent qu'après [`getUrl()`](/docs/api/browsingContext/getUrl). |
| `isFrame` | `Boolean` | `true` pour un frame, `false` pour un onglet ou une fenêtre. |
| `parent` | `BrowsingContext \| undefined` | Pour un frame, le contexte sur lequel `frame()` a été appelé (ou le frame intermédiaire, pour un frame imbriqué plus profondément). `undefined` pour un onglet ou une fenêtre. |
| `browser` | `Browser` | L'[objet browser](/docs/api/browser) de la session. |
| `request` | `Request \| undefined` | Informations de chargement de la dernière navigation via `browser.url()` ou `navigate()` : URL, en-têtes, réponse, redirections et requêtes effectuées par la page. |
| `sessionId` | `String` | Identifiant de session, identique à `browser.sessionId`. |
| `capabilities` | `Object` | Capabilities de la session, identiques à `browser.capabilities`. |
| `options` | `Object` | Options WebdriverIO, identiques à `browser.options`. |
| `isBidi` | `Boolean` | Indique si la session utilise WebDriver BiDi. |
| `isMobile` | `Boolean` | Indique si la session automatise un appareil mobile. |

## Méthodes

### Commandes d'un contexte de navigation

Ces commandes agissent sur le contexte sur lequel elles sont appelées. Chacune a sa propre page de référence.

| Commande | Détails |
| --- | --- |
| [`frame`](/docs/api/browsingContext/frame) | Obtenir un frame de ce contexte en tant que contexte de navigation à part entière. |
| [`navigate`](/docs/api/browsingContext/navigate) | Naviguer dans ce contexte, avec les mêmes options que `browser.url()`. |
| [`refresh`](/docs/api/browsingContext/refresh) | Recharger ce contexte. Un frame ne recharge que son propre document. |
| [`back`](/docs/api/browsingContext/back) / [`forward`](/docs/api/browsingContext/forward) | Se déplacer dans l'historique de cet onglet ou de cette fenêtre. |
| [`activate`](/docs/api/browsingContext/activate) | Mettre cet onglet ou cette fenêtre au premier plan. |
| [`closeWindow`](/docs/api/browsingContext/closeWindow) | Fermer cet onglet ou cette fenêtre. |
| [`getTitle`](/docs/api/browsingContext/getTitle) / [`getUrl`](/docs/api/browsingContext/getUrl) | Lire le titre ou l'URL du document affiché dans ce contexte. |
| [`acceptAlert`](/docs/api/browsingContext/acceptAlert) / [`dismissAlert`](/docs/api/browsingContext/dismissAlert) / [`getAlertText`](/docs/api/browsingContext/getAlertText) | Répondre à la boîte de dialogue utilisateur ouverte dans ce contexte, ou en lire le texte. |

### Commandes du navigateur exécutées dans un contexte

Il s'agit des [commandes du navigateur](/docs/api/browser) du même nom, appliquées à ce contexte au lieu du premier contexte de la session. Elles prennent les mêmes arguments.

| Commande | Dans un contexte de navigation |
| --- | --- |
| [`$`](/docs/api/browser/$), [`$$`](/docs/api/browser/$$), [`custom$`](/docs/api/browser/custom$), [`custom$$`](/docs/api/browser/custom$$), [`react$`](/docs/api/browser/react$), [`react$$`](/docs/api/browser/react$$) | Trouver des éléments dans le document de ce contexte. |
| [`execute`](/docs/api/browser/execute) | Exécuter un script dans le document de ce contexte. |
| [`action`](/docs/api/browser/action), [`actions`](/docs/api/browser/actions), [`keys`](/docs/api/browser/keys), [`scroll`](/docs/api/browser/scroll) | Envoyer des entrées à ce contexte, même lorsqu'il s'agit d'un onglet en arrière-plan. |
| [`saveScreenshot`](/docs/api/browser/saveScreenshot), [`savePDF`](/docs/api/browser/savePDF) | Capturer ce contexte. |
| [`getCookies`](/docs/api/browser/getCookies), [`setCookies`](/docs/api/browser/setCookies), [`deleteCookies`](/docs/api/browser/deleteCookies) | Lire et modifier les cookies de la partition de stockage de ce contexte. |
| [`setViewport`](/docs/api/browser/setViewport) | Redimensionner le viewport de cet onglet ou de cette fenêtre. |
| [`addInitScript`](/docs/api/browser/addInitScript) | Exécuter un script avant les scripts de la page, uniquement dans cet onglet ou cette fenêtre. |
| [`mock`](/docs/api/browser/mock), [`mockClearAll`](/docs/api/browser/mockClearAll), [`mockRestoreAll`](/docs/api/browser/mockRestoreAll) | Simuler (mock) les requêtes de cet onglet ou de cette fenêtre uniquement. Un mock prend fin lorsque son onglet est fermé. |
| [`emulate`](/docs/api/browser/emulate) | Émuler une propriété de l'appareil, par exemple la géolocalisation ou l'horloge, uniquement dans cet onglet ou cette fenêtre. |
| [`restore`](/docs/api/browser/restore) | Restaurer les émulations, identique à `browser.restore()`. |
| [`waitUntil`](/docs/api/browser/waitUntil), [`pause`](/docs/api/browser/pause) | Identiques à celles du navigateur. |

```ts title="test/specs/mock.e2e.ts"
import { browser, expect } from '@wdio/globals'

it('mocks the requests of one tab only', async () => {
    const page = await browser.url('https://webdriver.io')
    const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })

    const mock = await tab.mock('**/api/users')
    mock.respond([{ name: 'Mocked user' }])

    // les requêtes de `tab` reçoivent la réponse simulée, les requêtes de `page` atteignent le serveur
})
```

### Uniquement au niveau supérieur {#top-level-only}

Un frame partage l'historique, le viewport, le réseau et l'émulation de son onglet, c'est pourquoi ces commandes sont rejetées sur un frame avec `` `<command>` is only available on a top-level browsing context ``. Appelez-les sur l'onglet : `frame.parent` jusqu'à ce que `parent` soit `undefined`, ou le contexte sur lequel vous avez appelé `frame()`.

`back`, `forward`, `activate`, `closeWindow`, `setViewport`, `addInitScript`, `mock`, `mockClearAll`, `mockRestoreAll`, `emulate`, `restore`

### Non disponibles sur un contexte de navigation

Les commandes de session, telles que `deleteSession`, `newWindow` ou `browsingContexts`, ne sont disponibles que sur l'[objet browser](/docs/api/browser). Il en va de même pour les commandes personnalisées : [`addCommand`](/docs/customcommands) et `overwriteCommand` sont rejetées sur un contexte, enregistrez-les sur `browser`.

### Événements

`on`, `once`, `off`, `emit`, `removeListener` et `removeAllListeners` enregistrent des écouteurs sur le navigateur, les événements sont donc ceux de toute la session. Par exemple, un événement [`dialog`](/docs/api/dialog) est déclenché pour une boîte de dialogue dans n'importe quel onglet ou frame.

## Éléments d'un contexte de navigation

Un élément obtenu via un contexte appartient à ce contexte. Les commandes d'élément telles que `click`, `setValue` ou `getText` s'exécutent dans le document de ce contexte, même lorsqu'il s'agit d'un onglet en arrière-plan ou d'un frame. Elles suivent la spécification WebDriver comme le font les drivers, et retournent donc les mêmes résultats et les mêmes erreurs (par exemple `element click intercepted`) que pour un élément de la page au premier plan. `getComputedRole` et `getComputedLabel` sont rejetées pour un élément d'un contexte autre que le premier contexte de la session.

```ts
const page = await browser.url('https://the-internet.herokuapp.com/nested_frames')
const bottom = await page.frame({ selector: 'frame[name="frame-bottom"]' })
const body = await bottom.$('body')
console.log(await body.getText()) // affiche : "BOTTOM"
```

## Dépannage

| Erreur | Cause et solution |
| --- | --- |
| `` `switchFrame` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Appelez [`frame()`](/docs/api/browsingContext/frame) sur le contexte retourné par `browser.url()` ou `browser.newWindow()`. |
| `` `switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. `` | Conservez le contexte retourné par `browser.url()` ou `browser.newWindow()`, ou trouvez-en un avec `browser.browsingContexts()`. |
| `` `frame()` needs a WebDriver BiDi session, but this session uses WebDriver Classic `` | La session est une session Classic (par exemple Appium ou Safari). Utilisez la commande Classic indiquée dans le message. |
| `` `<command>` is only available on a top-level browsing context `` | La commande a été appelée sur un frame. Appelez-la sur l'onglet du frame, voir [Uniquement au niveau supérieur](#top-level-only). |
| `` `addCommand` is only available on the browser, not on a browsing context `` | Enregistrez les commandes personnalisées sur `browser`. |
| `no such frame: the frame "…" was discarded because the page it belongs to navigated away` | La page qui contenait le frame a navigué. Obtenez à nouveau le frame avec `frame()` sur la nouvelle page. |

## Voir aussi

- [L'objet Browser](/docs/api/browser)
- [Migrer vers la v10 : `switchToFrame`](/docs/v10-migration#switchtoframe)
- [Boîtes de dialogue](/docs/api/dialog)