---
id: saveRecordingScreen
title: saveRecordingScreen
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveRecordingScreen.ts
---

Salvar um vídeo iniciado pelo comando [`startRecordingScreen`](/docs/api/appium#startrecordingscreen) em um arquivo.

:::info

Este comando é suportado apenas para sessões móveis executando no [Appium](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

:::

##### Uso

```js
browser.saveRecordingScreen(filepath)
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>caminho completo ou relativo ao diretório de execução para o vídeo gerado</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="saveRecordingScreen.js"
it('should save a video', async () => {
    await browser.startRecordingScreen();
    await $('~BUTTON').click();
    await browser.saveRecordingScreen('./some/path/video.mp4');
});
```

##### Retorna

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer de vídeo