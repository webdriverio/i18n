---
id: waitForStable
title: waitForStable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForStable.ts
---

Attendre qu'un élément soit stable (ne s'anime pas) pendant le nombre de
millisecondes fourni. Renvoie vrai si le sélecteur
correspond à au moins un élément stable dans le DOM, sinon lance une
erreur. Si le drapeau reverse est vrai, la commande renverra plutôt vrai
si le sélecteur ne correspond à aucun élément stable.

__Remarque :__ il est préférable de désactiver les animations plutôt que d'utiliser cette commande

##### Usage

```js
$(selector).waitForStable({ timeout, reverse, timeoutMsg, interval })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>options waitForStable (optionnel)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>temps en ms (par défaut basé sur la valeur de configuration [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>si vrai, il attend l'opposé (par défaut : false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>s'il existe, il remplace le message d'erreur par défaut</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>intervalle entre les vérifications (par défaut : `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Examples

```html title="index.html"
<head>
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: red;
        }
        #has-animation {
            animation: 3s 0s alternate slidein;
        }
        @keyframes slidein {
            from {
                margin-left: 100%;
                width: 300%;
            }

            to {
                margin-left: 0%;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div #has-animation></div>
    <div #has-no-animation></div>
</body>

```

```js title="waitForStable.js"
it('should detect that element is instable and will wait for the element to become stable', async () => {
    const elem = await $('#has-animation')
    await elem.waitForStable({ timeout: 3000 });
});
it('should detect that element is stable and will not wait', async () => {
    const elem = await $('#has-no-animation')
    await elem.waitForStable();
});
```

##### Returns

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  vrai si l'élément est stable