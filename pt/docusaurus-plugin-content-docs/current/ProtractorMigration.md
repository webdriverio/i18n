---
id: protractor-migration
title: De Protractor
---

Este tutorial é para pessoas que estão usando o Protractor e desejam migrar seu framework para o WebdriverIO. Foi iniciado após o time do Angular [ter anunciado](https://github.com/angular/protractor/issues/5502) que o Protractor não será mais suportado. O WebdriverIO foi influenciado por muitas decisões de design do Protractor, o que provavelmente o torna o framework mais próximo para migrar. A equipe do WebdriverIO aprecia o trabalho de cada contribuidor do Protractor e espera que este tutorial torne a transição para o WebdriverIO fácil e direta.

Embora gostaríamos de ter um processo totalmente automatizado para isso, a realidade é diferente. Todos têm uma configuração diferente e usam o Protractor de maneiras diferentes. Cada passo deve ser visto como orientação e menos como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

A API do Protractor e WebdriverIO é na verdade muito similar, a ponto de que a maioria dos comandos pode ser reescrita de forma automatizada através de um [codemod](https://github.com/webdriverio/codemod).

Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

## Estratégia

Existem muitas estratégias de migração. Dependendo do tamanho da sua equipe, quantidade de arquivos de teste e da urgência para migrar, você pode tentar transformar todos os testes de uma vez ou arquivo por arquivo. Dado que o Protractor continuará a ser mantido até o Angular versão 15 (final de 2022), você ainda tem tempo suficiente. Você pode ter testes Protractor e WebdriverIO rodando ao mesmo tempo e começar a escrever novos testes em WebdriverIO. Dado seu orçamento de tempo, você pode começar migrando os casos de teste importantes primeiro e trabalhar seu caminho até testes que você pode até mesmo deletar.

## Primeiro o Arquivo de Configuração

Depois de instalarmos o codemod, podemos começar a transformar o primeiro arquivo. Dê uma olhada primeiro nas [opções de configuração do WebdriverIO](configuration). Arquivos de configuração podem se tornar muito complexos e pode fazer sentido portar apenas as partes essenciais e ver como o resto pode ser adicionado uma vez que os testes correspondentes que precisam de certas opções estejam sendo migrados.

Para a primeira migração, transformamos apenas o arquivo de configuração e executamos:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

Sua configuração pode ter um nome diferente, no entanto, o princípio deve ser o mesmo: comece a migração pela configuração primeiro.

:::

## Instale as Dependências do WebdriverIO

O próximo passo é configurar uma configuração mínima do WebdriverIO que começaremos a construir conforme migramos de um framework para outro. Primeiro, instalamos o CLI do WebdriverIO via:

```sh
npm install --save-dev @wdio/cli
```

Em seguida, executamos o assistente de configuração:

```sh
npx wdio config
```

Isso irá guiá-lo através de algumas perguntas. Para este cenário de migração, você deve:
- escolher as opções padrão
- recomendamos não gerar automaticamente arquivos de exemplo
- escolher uma pasta diferente para arquivos WebdriverIO
- e escolher Mocha em vez de Jasmine.

:::info Por que Mocha?
Mesmo que você tenha usado Protractor com Jasmine antes, o Mocha, no entanto, fornece melhores mecanismos de repetição. A escolha é sua!
:::

Após o pequeno questionário, o assistente instalará todos os pacotes necessários e os armazenará em seu `package.json`.

## Migrar Arquivo de Configuração

Depois de termos transformado o `conf.ts` e um novo `wdio.conf.ts`, é hora de migrar a configuração de um arquivo para outro. Certifique-se de portar apenas o código que é essencial para que todos os testes possam ser executados. No nosso caso, portamos a função de hook e o timeout do framework.

Continuaremos agora apenas com nosso arquivo `wdio.conf.ts` e, portanto, não precisaremos mais de alterações na configuração original do Protractor. Podemos reverter as alterações para que ambos os frameworks possam ser executados lado a lado e possamos portar um arquivo de cada vez.

## Migrar Arquivo de Teste

Agora estamos prontos para portar o primeiro arquivo de teste. Para começar de forma simples, vamos começar com um que não tenha muitas dependências de pacotes de terceiros ou outros arquivos como PageObjects. Em nosso exemplo, o primeiro arquivo a ser migrado é `first-test.spec.ts`. Primeiro, crie o diretório onde a nova configuração do WebdriverIO espera seus arquivos e depois mova-o:

```sh
mv mkdir -p ./test/specs/
mv test-suites/first-test.spec.ts ./test/specs
```

Agora vamos transformar este arquivo:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./test/specs/first-test.spec.ts
```

É isso! Este arquivo é tão simples que não precisamos de nenhuma alteração adicional e podemos tentar executar o WebdriverIO diretamente via:

```sh
npx wdio run wdio.conf.ts
```

Parabéns 🥳 você acabou de migrar o primeiro arquivo!

## Próximos Passos

A partir deste ponto, você continua transformando teste por teste e page object por page object. Há chances de que o codemod falhe para certos arquivos com um erro como:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Para alguns comandos do Protractor, simplesmente não há substituição no WebdriverIO. Neste caso, o codemod dará alguns conselhos sobre como refatorá-lo. Se você encontrar essas mensagens de erro com muita frequência, sinta-se à vontade para [criar uma issue](https://github.com/webdriverio/codemod/issues/new) e solicitar a adição de uma determinada transformação. Embora o codemod já transforme a maioria da API do Protractor, ainda há muito espaço para melhorias.

## Conclusão

Esperamos que este tutorial o guie um pouco pelo processo de migração para o WebdriverIO. A comunidade continua melhorando o codemod enquanto o testa com várias equipes em várias organizações. Não hesite em [criar uma issue](https://github.com/webdriverio/codemod/issues/new) se tiver feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se tiver dificuldades durante o processo de migração.