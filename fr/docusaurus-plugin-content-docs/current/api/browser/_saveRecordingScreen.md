---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Enregistrer une vidéo démarrée par la commande [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) dans un fichier.

:::info

Cette commande est uniquement prise en charge pour les sessions mobiles exécutées sur [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Usage

```js
browser.saveRecordingScreen(filepath)
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>chemin complet ou relatif au répertoire d'exécution vers la vidéo générée</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Returns

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer vidéo