---
id: watcher
title: Observar Arquivos de Teste
description: "Execute novamente os testes automaticamente quando arquivos de spec ou da aplicação forem alterados, executando o testrunner do WDIO com a flag --watch e filesToWatch."
---

Com o testrunner do WDIO, você pode observar arquivos enquanto trabalha neles. Os testes são executados novamente de forma automática se você alterar algo na sua aplicação ou nos seus arquivos de teste. Ao adicionar a flag `--watch` ao chamar o comando `wdio`, o testrunner aguardará alterações nos arquivos depois de executar todos os testes, por exemplo:

```sh
wdio wdio.conf.js --watch
```

Por padrão, ele observa apenas alterações nos seus arquivos de `specs`. No entanto, ao definir uma propriedade `filesToWatch` no seu `wdio.conf.js` contendo uma lista de caminhos de arquivos (com suporte a globbing), ele também observará alterações nesses arquivos para executar novamente toda a suíte. Isso é útil se você quiser executar novamente todos os seus testes automaticamente quando alterar o código da sua aplicação, por exemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    filesToWatch: [
        // observa todos os arquivos JS na minha aplicação
        './src/app/**/*.js'
    ],
    // ...
}
```

:::info
Tente executar os testes em paralelo o máximo possível. Testes E2E são, por natureza, lentos. Executar os testes novamente só é útil se você conseguir manter curto o tempo de execução de cada teste. Para economizar tempo, o testrunner mantém as sessões do WebDriver ativas enquanto aguarda alterações nos arquivos. Certifique-se de que seu backend do WebDriver possa ser configurado para não encerrar automaticamente a sessão caso nenhum comando seja executado após um determinado período de tempo.
:::