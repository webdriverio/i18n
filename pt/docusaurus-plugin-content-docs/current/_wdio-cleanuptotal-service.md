---
id: wdio-cleanuptotal-service
title: Serviço CleanupTotal
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

Com o serviço `cleanup-total` para [webdriver.io](https://webdriver.io/), você pode facilmente garantir uma limpeza adequada após cada teste. O serviço fornece uma maneira sistemática de marcar entidades para exclusão imediatamente após a criação. Isso é particularmente útil quando os testes envolvem a criação de estruturas complexas, como uma conta bancária com um plano de investimento e um depósito. Sem a limpeza adequada, tentar excluir a conta pode resultar em erros, como uma recusa devido à conta não estar vazia. No entanto, com o __cleanup-total__, as entidades são excluídas na ordem correta, garantindo que os testes limpem após si mesmos e não interfiram uns com os outros.

## Instalação
A maneira mais fácil de instalar este módulo como uma (dev-)dependência é usando o seguinte comando:

```
npm install wdio-cleanuptotal-service --save-dev
```

## Uso

Adicione wdio-cleanuptotal-service ao seu `wdio.conf.ts`:

```typescript
export const config: WebdriverIO.Config = {
  // ... outras opções

  services: ['cleanuptotal']

  // ... outras opções
};
```

ou com as opções de serviço:

```typescript
export const config: WebdriverIO.Config = {
  // ... outras opções

  services: [
    [
      'cleanuptotal',
      {
        // Use uma função de logger personalizada para escrever mensagens no relatório de teste
        customLoggerMethod: console.log(), // TODO: substitua pela sua própria função de logger, se necessário

        // Escreva no log apenas quando ocorrer um erro para reduzir a desordem
        logErrorsOnly: false, // TODO: considere mudar para 'true' se você tiver muitas mensagens no relatório
      }
    ]
  ]

  // ... outras opções
};
```

## Uso em teste

Você pode importar o serviço __cleanuptotal__ onde for necessário, seja no seu arquivo de teste ou em qualquer outra classe.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // Cria uma conta e adiciona-a à lista de limpeza para exclusão após o teste
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // Adiciona um plano de investimento à conta e adiciona-o à lista de limpeza
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // Deposita fundos na conta e adiciona à lista de limpeza
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// Observe que o código de limpeza real será executado após a conclusão do teste
```

## Suporte a Typescript

Typescript é suportado para este plugin.

## Suporte

Para suporte e sugestões, sinta-se à vontade para entrar em contato comigo em [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).