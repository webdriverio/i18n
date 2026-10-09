---
id: protractor-migration
title: A partir do Protractor
description: "Migre uma suíte de testes do Protractor para o WebdriverIO passo a passo, incluindo dependências, arquivo de configuração e arquivos de teste, com a ajuda de um codemod."
---

Este tutorial é para pessoas que estão usando o Protractor e desejam migrar seu framework para o WebdriverIO. Ele foi iniciado depois que a equipe do Angular [anunciou](https://github.com/angular/protractor/issues/5502) que o Protractor não terá mais suporte. O WebdriverIO foi influenciado por muitas das decisões de design do Protractor, e é por isso que ele provavelmente é o framework mais próximo para onde migrar. A equipe do WebdriverIO agradece o trabalho de cada contribuidor do Protractor e espera que este tutorial torne a transição para o WebdriverIO fácil e direta.

Embora adoraríamos ter um processo totalmente automatizado para isso, a realidade é diferente. Cada pessoa tem uma configuração diferente e usa o Protractor de maneiras diferentes. Cada etapa deve ser vista como uma orientação e menos como uma instrução passo a passo. Se você tiver problemas com a migração, não hesite em [entrar em contato conosco](https://github.com/webdriverio/codemod/discussions/new).

## Configuração

As APIs do Protractor e do WebdriverIO são, na verdade, muito semelhantes, a ponto de a maioria dos comandos poder ser reescrita de forma automatizada por meio de um [codemod](https://github.com/webdriverio/codemod).

Para instalar o codemod, execute:

```sh
npm install jscodeshift @wdio/codemod
```

## Estratégia

Existem muitas estratégias de migração. Dependendo do tamanho da sua equipe, da quantidade de arquivos de teste e da urgência da migração, você pode tentar transformar todos os testes de uma vez ou arquivo por arquivo. Considerando que o Protractor continuará sendo mantido até a versão 15 do Angular (final de 2022), você ainda tem tempo suficiente. Você pode ter testes do Protractor e do WebdriverIO rodando ao mesmo tempo e começar a escrever novos testes no WebdriverIO. Dependendo do seu orçamento de tempo, você pode então começar migrando primeiro os casos de teste importantes e seguir até os testes que talvez você possa até excluir.

## Primeiro o Arquivo de Configuração

Depois de instalar o codemod, podemos começar a transformar o primeiro arquivo. Primeiro, dê uma olhada nas [opções de configuração do WebdriverIO](configuration). Arquivos de configuração podem se tornar muito complexos e pode fazer sentido portar apenas as partes essenciais e ver como o restante pode ser adicionado à medida que os testes correspondentes que precisam de certas opções forem migrados.

Para a primeira migração, transformamos apenas o arquivo de configuração e executamos:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/protractor ./conf.ts
```

:::info

 Sua configuração pode ter um nome diferente, mas o princípio deve ser o mesmo: comece migrando a configuração primeiro.

:::

## Instalar as Dependências do WebdriverIO

O próximo passo é configurar uma instalação mínima do WebdriverIO que vamos expandindo à medida que migramos de um framework para outro. Primeiro, instalamos o WebdriverIO CLI via:

```sh
npm install --save-dev @wdio/cli
```

Em seguida, executamos o assistente de configuração:

```sh
npx wdio config
```

Isso vai guiá-lo por algumas perguntas. Para este cenário de migração, você:
- escolhe as opções padrão
- recomendamos não gerar arquivos de exemplo automaticamente
- escolhe uma pasta diferente para os arquivos do WebdriverIO
- e escolhe Mocha em vez de Jasmine.

:::info Por que Mocha?
Mesmo que você possa ter usado o Protractor com Jasmine antes, o Mocha oferece melhores mecanismos de nova tentativa (retry). A escolha é sua!
:::

Após o pequeno questionário, o assistente instalará todos os pacotes necessários e os registrará no seu `package.json`.

## Migrar o Arquivo de Configuração

Depois de termos um `conf.ts` transformado e um novo `wdio.conf.ts`, é hora de migrar a configuração de um arquivo para o outro. Certifique-se de portar apenas o código essencial para que todos os testes possam ser executados. No nosso caso, portamos a função de hook e o timeout do framework.

Agora continuaremos apenas com o nosso arquivo `wdio.conf.ts` e, portanto, não precisaremos mais de alterações na configuração original do Protractor. Podemos reverter essas alterações para que ambos os frameworks possam rodar lado a lado e possamos portar um arquivo de cada vez.

## Migrar o Arquivo de Teste

Agora estamos prontos para portar o primeiro arquivo de teste. Para começar de forma simples, vamos escolher um que não tenha muitas dependências de pacotes de terceiros ou de outros arquivos, como PageObjects. No nosso exemplo, o primeiro arquivo a ser migrado é `first-test.spec.ts`. Primeiro, crie o diretório onde a nova configuração do WebdriverIO espera seus arquivos e depois mova-o para lá:

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

A partir deste ponto, você continua transformando teste por teste e page object por page object. É possível que o codemod falhe em certos arquivos com um erro como:

```
ERR /path/to/project/test/testdata/failing_submit.js Transformation error (Error transforming /test/testdata/failing_submit.js:2)
Error transforming /test/testdata/failing_submit.js:2

> login_form.submit()
  ^

The command "submit" is not supported in WebdriverIO. We advise to use the click command to click on the submit button instead. For more information on this configuration, see https://webdriver.io/docs/api/element/click.
  at /path/to/project/test/testdata/failing_submit.js:132:0
```

Para alguns comandos do Protractor, simplesmente não há substituto no WebdriverIO. Nesse caso, o codemod lhe dará algumas orientações sobre como refatorá-lo. Se você se deparar com essas mensagens de erro com muita frequência, sinta-se à vontade para [abrir uma issue](https://github.com/webdriverio/codemod/issues/new) e solicitar a adição de uma determinada transformação. Embora o codemod já transforme a maior parte da API do Protractor, ainda há muito espaço para melhorias.

## Conclusão

Esperamos que este tutorial o oriente um pouco no processo de migração para o WebdriverIO. A comunidade continua aprimorando o codemod enquanto o testa com várias equipes em diversas organizações. Não hesite em [abrir uma issue](https://github.com/webdriverio/codemod/issues/new) se tiver feedback ou [iniciar uma discussão](https://github.com/webdriverio/codemod/discussions/new) se tiver dificuldades durante o processo de migração.