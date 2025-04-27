---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Bascule le contexte actif vers un cadre, par exemple un iframe sur la page. Il existe plusieurs façons d'interroger un cadre
sur la page :

  - Si une chaîne est donnée, il bascule vers le cadre avec un identifiant de contexte correspondant, une URL ou une URL qui contient cette chaîne
    ```ts
    // basculer vers un cadre qui a une URL spécifique ou contient une chaîne dans l'URL
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Remarque : ce cadre se trouve dans un iframe imbriqué, mais vous n'avez besoin de fournir
    // que l'URL du cadre de votre choix
    await browser.switchFrame('https://www.w3schools.com')
    // vérifier le titre de la page
    console.log(await browser.execute(() => [document.title, document.URL]))
    // affiche : [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Si vous avez l'identifiant de contexte du cadre, vous pouvez l'utiliser directement
    ```ts
    // basculer vers un cadre qui a un certain identifiant de contexte
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Si un élément WebdriverIO référençant un élément `iframe` est fourni, il basculera vers ce cadre
    ```ts
    // basculer vers un élément de cadre interrogé depuis le contexte actuel
    await browser.switchFrame($('iframe'))
    ```

  - Si une fonction est donnée, elle parcourra tous les iframes de la page et appellera la fonction dans l'objet
    de contexte. La fonction doit renvoyer un booléen indiquant si le cadre doit être sélectionné. La fonction
    sera exécutée dans le navigateur et permet d'accéder à toutes les API Web, par exemple :
    ```ts
    // basculer vers le premier cadre qui contient un élément avec l'id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // basculer vers le premier cadre qui contient "webdriver" dans l'URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Si `null` est donné, il basculera vers le cadre de niveau supérieur
    ```ts
    // d'abord basculer dans un cadre
    await browser.switchFrame($('iframe'))
    // faire plus d'automatisation dans ce cadre, puis...

    // basculer vers le cadre de niveau supérieur
    await browser.switchFrame(null)
    ```

Une fois que vous avez basculé vers un cadre, toutes les commandes ultérieures seront exécutées dans le contexte de ce cadre,
y compris la navigation vers différentes pages.

##### Utilisation

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Retourne

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  l'identifiant du contexte actif actuel