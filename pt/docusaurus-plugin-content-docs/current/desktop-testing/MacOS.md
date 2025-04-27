---
id: macos
title: MacOS
---

O WebdriverIO pode automatizar aplicativos arbitrários do MacOS usando [Appium](https://appium.io/docs/en/2.0/). Tudo o que você precisa é ter o [XCode](https://developer.apple.com/xcode/) instalado em seu sistema, o Appium e o [Mac2 Driver](https://github.com/appium/appium-mac2-driver) instalados como dependências e as capabilities corretas configuradas.

## Começando

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Um assistente de instalação o guiará pelo processo. Certifique-se de selecionar _"Desktop Testing - of MacOS Applications"_ quando ele perguntar qual tipo de teste você gostaria de fazer. Depois, basta manter os padrões ou modificar de acordo com sua preferência.

O assistente de configuração instalará todos os pacotes Appium necessários e criará um `wdio.conf.js` ou `wdio.conf.ts` com a configuração necessária para testar no MacOS. Se você concordou em gerar automaticamente alguns arquivos de teste, você pode executar seu primeiro teste via `npm run wdio`.

<CreateMacOSProjectAnimation />

É isso 🎉

## Exemplo

Assim é como um teste simples pode parecer, que abre o aplicativo Calculadora, faz um cálculo e verifica seu resultado:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Nota:__ o aplicativo calculadora foi aberto automaticamente no início da sessão porque `'appium:bundleId': 'com.apple.calculator'` foi definido como opção de capability. Você pode alternar entre aplicativos durante a sessão a qualquer momento.

## Mais Informações

Para informações sobre especificidades dos testes no MacOS, recomendamos verificar o projeto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).