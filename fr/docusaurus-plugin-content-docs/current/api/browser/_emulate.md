---
id: emulate
title: emuler
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/emulate.ts
---

WebdriverIO vous permet d'émuler les API Web en utilisant la commande `emulate`. Ces API Web peuvent alors
se comporter exactement comme vous le spécifiez. Les domaines suivants sont pris en charge :

- `geolocation`: Émuler l'API de géolocalisation
- `userAgent`: Émuler l'agent utilisateur
- `colorScheme`: Émuler le thème de couleur
- `onLine`: Émuler le statut de connexion
- `device`: Émuler un appareil mobile ou de bureau spécifique
- `clock`: Émuler l'horloge système

La commande `emulate` renvoie une fonction qui peut être appelée pour réinitialiser l'émulation. Ceci est utile
lorsque vous souhaitez réinitialiser l'émulation après un test ou une série de tests.

Pour en savoir plus, consultez les directives [Émulation](/docs/emulation).

:::info

À l'exception du domaine `clock`, il n'est pas possible de modifier la valeur émulée sans recharger la page.

:::

:::info

Cette fonctionnalité nécessite la prise en charge de WebDriver Bidi pour le navigateur. Bien que les versions récentes de Chrome, Edge
et Firefox disposent de cette prise en charge, Safari __ne l'a pas__. Pour les mises à jour, suivez [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned).
De plus, si vous utilisez un fournisseur cloud pour lancer des navigateurs, assurez-vous que votre fournisseur prend également en charge WebDriver Bidi.

:::

L'objet `EmulationOptions` peut avoir les propriétés suivantes en fonction du domaine :

| Domaine       | Options                                          |
|---------------|--------------------------------------------------|
| `geolocation` | `{ latitude: number, longitude: number }`        |
| `userAgent`   | `string`                                         |
| `colorScheme` | `'light' \| 'dark'`                              |
| `onLine`      | `boolean`                                        |
| `clock`       | `FakeTimerInstallOpts`                           |

##### Utilisation

```js
browser.emulate(scope, options)
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
      <td><code><var>scope</var></code></td>
      <td>`string`</td>
      <td>fonctionnalité du navigateur que vous souhaitez émuler, peut être soit `clock`, `geolocation`, `userAgent`, `colorScheme` ou `onLine`</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`EmulationOptions`</td>
      <td>option d'émulation pour un domaine spécifique</td>
    </tr>
  </tbody>
</table>

##### Exemples

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L4-L18
```

```js reference title="example.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9bff2baf8a0678c6886f8591d9fc8dea201895d3/emulate/example.js#L20-L36
```

##### Retourne

- **&lt;Function&gt;**
            **<code><var>returns</var></code>:**   une fonction pour réinitialiser l'émulation