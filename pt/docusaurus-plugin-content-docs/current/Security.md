---
id: security
title: Segurança
---

O WebdriverIO tem o aspecto de segurança em mente ao fornecer soluções. Abaixo estão algumas maneiras de melhorar a segurança do seu teste.

# Mascarando Dados Sensíveis

Se você está usando dados sensíveis durante seu teste, é essencial garantir que eles não estejam visíveis para todos, como em logs. Além disso, ao usar um provedor de nuvem, chaves privadas são frequentemente envolvidas. Essas informações devem ser mascaradas de logs, relatórios e outros pontos de contato. A seguir, apresentamos algumas soluções de mascaramento para executar testes sem expor esses valores.

## WebDriverIO

### Mascarar Valor de Texto dos Comandos

Os comandos `addValue` e `setValue` suportam um valor booleano de máscara para mascarar nos logs do WDIO e Appium, bem como nos relatórios. Além disso, outras ferramentas, como ferramentas de desempenho e ferramentas de terceiros, também receberão a versão mascarada, aumentando a segurança.

Por exemplo, se você está usando um usuário real de produção e precisa inserir uma senha que deseja mascarar, agora é possível com o seguinte:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

O exemplo acima ocultará o valor do texto dos logs do WDIO e também dos logs do Appium.

Exemplo de logs:
```text
2025-05-25T23:02:42. 336Z INFO webdriver: DATA { text: "**MASKED**" }
```

Limitações:
  - No Appium, plugins adicionais podem vazar informações, mesmo que solicitemos o mascaramento.
  - Provedores de nuvem podem usar um proxy para registro HTTP, o que contorna o mecanismo de máscara implementado.

:::info

Versão mínima necessária:
 - WDIO v9.15.0
 - Appium v2.19.0

### Mascaramento nos Logs do WDIO

Usando a configuração `maskingPatterns`, podemos mascarar informações sensíveis dos logs do WDIO. No entanto, os logs do Appium não são cobertos.

Por exemplo, se você está usando um provedor de nuvem e usa o nível de informações, então certamente você "vazará" a chave do usuário, como mostrado abaixo:

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contornar isso, podemos passar a expressão regular `'--key=([^ ]*)'` e agora nos logs você verá

```text
2025-05-29T19:09:11.309Z INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Você pode conseguir o exemplo acima fornecendo a expressão regular ao campo `maskingPatterns` da configuração.
  - Para múltiplas expressões regulares, use uma única string, mas com valores separados por vírgula.
  - Para mais detalhes sobre padrões de mascaramento, veja a [seção de Padrões de Mascaramento no README do WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

```ts
export const config: WebdriverIO.Config = {
    specs: [...],
    capabilities: [{...}],
    services: ['lighthouse'],

    /**
     * test configurations
     */
    logLevel: 'info',
    maskingPatterns: '/--key=([^ ]*)/',
    framework: 'mocha',
    outputDir: __dirname,

    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
```

:::info

Versão mínima necessária:
 - WDIO v9.15.0

### Desativar Loggers do WDIO

Outra forma de bloquear o registro de dados sensíveis é diminuir ou silenciar o nível de log ou desativar o logger.
Isso pode ser alcançado da seguinte forma:

```ts
import logger from '@wdio/logger';

/**
  * Set the logger level of the WDIO logger to 'silent' before *running a promise, which helps hide sensitive information in the logs.
 */
export const withSilentLogger = async <T>(promise: () => Promise<T>): Promise<T> => {
  const webdriverLogLevel = driver.options.logLevel ?? 'error';

  try {
    logger.setLevel('webdriver', 'silent');
    return await promise();
  } finally {
    logger.setLevel('webdriver', webdriverLogLevel);
  }
};
```

## Soluções de Terceiros

### Appium
O Appium oferece sua própria solução de mascaramento; veja [Log filter](https://appium.io/docs/en/2.0/guides/log-filters/)
 - Pode ser complicado usar a solução deles. Uma forma, se possível, é passar um token em sua string como `@mask@` e usá-lo como uma expressão regular
 - Em algumas versões do Appium, os valores também são registrados com cada caractere separado por vírgula, então precisamos ter cuidado.
 - Infelizmente, o BrowserStack não suporta esta solução, mas ainda é útil localmente
 
Usando o exemplo `@mask@` mencionado anteriormente, podemos usar o seguinte arquivo JSON chamado `appiumMaskLogFilters.json`
```json
[
  {
    "pattern": "@mask@(.*)",
    "flags": "s",
    "replacer": "**MASKED**"
  },
  {
    "pattern": "\\[(\\\"@\\\",\\\"m\\\",\\\"a\\\",\\\"s\\\",\\\"k\\\",\\\"@\\\",\\S+)\\]",
    "flags": "s",
    "replacer": "[*,*,M,A,S,K,E,D,*,*]"
  }
]
```

Depois, passe o nome do arquivo JSON para o campo `logFilters` na configuração do serviço appium:
```ts
import { AppiumServerArguments, AppiumServiceConfig } from '@wdio/appium-service';
import { ServiceEntry } from '@wdio/types/build/Services';

const appium = [
  'appium',
  {
    args: {
      log: './logs/appium.log',
      logFilters: './appiumMaskLogFilters.json',
    } satisfies AppiumServerArguments,
  } satisfies AppiumServiceConfig,
] satisfies ServiceEntry;
```

### BrowserStack

O BrowserStack também oferece algum nível de mascaramento para ocultar alguns dados; veja [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Infelizmente, a solução é tudo ou nada, então todos os valores de texto dos comandos fornecidos serão mascarados.