---
id: record
title: Testes de Gravação
---

O Chrome DevTools possui um painel _Recorder_ que permite aos usuários gravar e reproduzir etapas automatizadas no Chrome. Essas etapas podem ser [exportadas para testes WebdriverIO com uma extensão](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn?hl=en) tornando a escrita de testes muito fácil.

## O que é o Chrome DevTools Recorder

O [Chrome DevTools Recorder](https://developer.chrome.com/docs/devtools/recorder/) é uma ferramenta que permite gravar e reproduzir ações de teste diretamente no navegador e também exportá-las como JSON (ou exportá-las em testes e2e), bem como medir o desempenho do teste.

A ferramenta é direta e, como está integrada ao navegador, temos a conveniência de não precisar mudar o contexto ou lidar com ferramentas de terceiros.

## Como Gravar um Teste com o Chrome DevTools Recorder

Se você tem a versão mais recente do Chrome, o Recorder já estará instalado e disponível para você. Basta abrir qualquer site, clicar com o botão direito e selecionar _"Inspecionar"_. Nas DevTools, você pode abrir o Recorder pressionando `CMD/Control` + `Shift` + `p` e digitando _"Show Recorder"_.

![Chrome DevTools Recorder](/img/recorder/recorder.png)

Para iniciar a gravação de uma jornada do usuário, clique em _"Start new recording"_, dê um nome ao seu teste e depois use o navegador para gravar seu teste:

![Chrome DevTools Recorder](/img/recorder/demo.gif)

No próximo passo, clique em _"Replay"_ para verificar se a gravação foi bem-sucedida e faz o que você queria fazer. Se tudo estiver ok, clique no ícone de [exportar](https://developer.chrome.com/docs/devtools/recorder/reference/#recorder-extension) e selecione _"Export as a WebdriverIO Test Script"_:

A opção _"Export as a WebdriverIO Test Script"_ só está disponível se você instalar a extensão [WebdriverIO Chrome Recorder](https://chrome.google.com/webstore/detail/webdriverio-chrome-record/pllimkccefnbmghgcikpjkmmcadeddfn).

![Chrome DevTools Recorder](/img/recorder/export.gif)

É isso!

## Exportar Gravação

Se você exportou o fluxo como um script de teste WebdriverIO, ele deve baixar um script que você pode copiar e colar em sua suíte de testes. Por exemplo, a gravação acima se parece com o seguinte:

```ts
describe("My WebdriverIO Test", function () {
  it("tests My WebdriverIO Test", function () {
    await browser.setWindowSize(1026, 688)
    await browser.url("https://webdriver.io/")
    await browser.$("#__docusaurus > div.main-wrapper > header > div").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div:nth-child(1) > a:nth-child(3)").click()rec
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > div > a").click()
    await browser.$("#__docusaurus > div.main-wrapper.docs-wrapper.docs-doc-page > div > aside > div > nav > ul > li:nth-child(4) > ul > li:nth-child(2) > a").click()
    await browser.$("#__docusaurus > nav > div.navbar__inner > div.navbar__items.navbar__items--right > div.searchBox_qEbK > button > span.DocSearch-Button-Container > span").click()
    await browser.$("#docsearch-input").setValue("click")
    await browser.$("#docsearch-item-0 > a > div > div.DocSearch-Hit-content-wrapper > span").click()
  });
});
```

Certifique-se de revisar alguns dos localizadores e substituí-los por [tipos de seletores](/docs/selectors) mais resilientes, se necessário. Você também pode exportar o fluxo como um arquivo JSON e usar o pacote [`@wdio/chrome-recorder`](https://github.com/webdriverio/chrome-recorder) para transformá-lo em um script de teste real.

## Próximos Passos

Você pode usar esse fluxo para criar facilmente testes para seus aplicativos. O Chrome DevTools Recorder possui vários recursos adicionais, por exemplo:

- [Simular rede lenta](https://developer.chrome.com/docs/devtools/recorder/#simulate-slow-network) ou
- [Medir o desempenho dos seus testes](https://developer.chrome.com/docs/devtools/recorder/#measure)

Não deixe de conferir a [documentação](https://developer.chrome.com/docs/devtools/recorder).