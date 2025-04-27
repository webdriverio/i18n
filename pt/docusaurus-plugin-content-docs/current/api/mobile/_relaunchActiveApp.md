---
id: relaunchActiveApp
title: relaunchActiveApp
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

Realiza uma reinicialização do aplicativo nativo ativo através de:

- encerramento do aplicativo ativo
- lançamento do aplicativo anteriormente ativo

:::important
Este comando reiniciará (encerrará/fechará e lançará/iniciará) o aplicativo ativo atual e NÃO redefinirá o estado do aplicativo. O Appium não pode realizar uma redefinição completa do 
aplicativo a menos que:

- você inicie uma nova sessão e o gerenciador de sessão remova o estado do aplicativo/limpe o dispositivo
- você tenha uma porta dos fundos em seu aplicativo para redefinir o estado do aplicativo e o Appium possa chamar essa porta dos fundos

Se você quiser redefinir o estado do aplicativo para Android ou iOS, você precisa criar seu próprio mecanismo/comando de redefinição em seu script. As opções podem ser:

- Android: Use o comando `adb` para limpar os dados do aplicativo: `adb shell pm clear <appPackage>`
- iOS: reinstale o aplicativo usando o comando `mobile: installApp`
- ....
- não usar este comando

As opções que você tem dependem da plataforma, do aplicativo e da localização (local com, na maioria das vezes, acesso completo ao dispositivo, ou na nuvem com menos acesso) em que você está testando.

:::

##### Example

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```