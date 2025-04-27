---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Ralentit le CPU pour simuler un processeur plus lent.

:::info

Notez que l'utilisation de la commande `throttleCPU` nécessite la prise en charge du protocole Chrome DevTools et par exemple,
ne peut pas être utilisée lors de l'exécution de tests automatisés dans le cloud. Le protocole Chrome DevTools n'est pas installé par défaut,
utilisez `npm install puppeteer-core` pour l'installer.
En savoir plus dans la section [Protocoles d'automatisation](/docs/automationProtocols).

:::

##### Utilisation

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>facteur de ralentissement (1 signifie aucun ralentissement, 2 est un ralentissement de 2x, etc.)</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```