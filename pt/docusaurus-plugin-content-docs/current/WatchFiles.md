---
id: watcher
title: Observar Arquivos de Teste
---

Com o testrunner WDIO você pode observar arquivos enquanto trabalha neles. Eles são executados novamente automaticamente se você alterar algo em seu aplicativo ou em seus arquivos de teste. Ao adicionar uma flag `--watch` ao chamar o comando `wdio`, o testrunner aguardará por alterações nos arquivos após executar todos os testes, por exemplo:

```sh
wdio wdio.conf.js --watch
```

Por padrão, ele observa apenas as alterações em seus arquivos `specs`. No entanto, ao definir uma propriedade `filesToWatch` no seu `wdio.conf.js` que contém uma lista de caminhos de arquivos (com suporte a glob), ele também observará quando esses arquivos forem alterados para executar novamente toda a suíte. Isso é útil se você quiser executar automaticamente todos os seus testes quando alterar o código do seu aplicativo, por exemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // watch for all JS files in my app
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Tente executar testes em paralelo sempre que possível. Testes E2E são, por natureza, lentos. Executar novamente os testes só é útil se você conseguir manter o tempo de execução do teste individual curto. Para economizar tempo, o testrunner mantém as sessões WebDriver ativas enquanto aguarda alterações nos arquivos. Certifique-se de que seu backend WebDriver possa ser modificado para que não feche automaticamente a sessão se nenhum comando for executado após algum período de tempo.
:::