---
id: macos
title: MacOS
description: "Automatize aplicativos nativos do macOS com o WebdriverIO usando o Appium e o driver Mac2, começando pelo assistente de configuração do projeto."
---

O WebdriverIO pode automatizar qualquer aplicativo MacOS usando o [Appium](https://appium.io/). Tudo o que você precisa é ter o [XCode](https://developer.apple.com/xcode/) instalado em seu sistema, o Appium e o [Mac2 Driver](https://github.com/appium/appium-mac2-driver) instalados como dependências e as capabilities corretas definidas.

## Primeiros Passos

Para iniciar um novo projeto WebdriverIO, execute:

```sh
npm create wdio@latest ./
```

Um assistente de instalação guiará você pelo processo. Certifique-se de selecionar _"Desktop Testing - of MacOS Applications"_ quando ele perguntar que tipo de teste você gostaria de fazer. Depois, basta manter os padrões ou modificá-los de acordo com sua preferência.

O assistente de configuração instalará todos os pacotes necessários do Appium e criará um `wdio.conf.js` ou `wdio.conf.ts` com a configuração necessária para testar no MacOS. Se você concordou em gerar automaticamente alguns arquivos de teste, poderá executar seu primeiro teste via `npm run wdio`.

<CreateMacOSProjectAnimation />

É isso 🎉

## Exemplo

Veja como pode ser um teste simples que abre o aplicativo Calculadora, faz um cálculo e verifica seu resultado:

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

__Observação:__ o aplicativo Calculadora foi aberto automaticamente no início da sessão porque `'appium:bundleId': 'com.apple.calculator'` foi definido como opção de capability. Você pode trocar de aplicativo durante a sessão a qualquer momento.

## Mais Informações

Para informações sobre especificidades de testes no MacOS, recomendamos conferir o projeto [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).