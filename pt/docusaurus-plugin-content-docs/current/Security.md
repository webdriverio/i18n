---
id: security
title: Segurança
---

O WebdriverIO tem o aspecto de segurança em mente ao fornecer soluções. Abaixo estão algumas maneiras de melhorar a segurança de seus testes.

## Melhores Práticas

- Nunca codifique dados sensíveis que possam prejudicar sua organização se expostos em texto claro.
- Use um mecanismo (como um cofre) para armazenar chaves e senhas com segurança e recuperá-las ao iniciar seus testes de ponta a ponta.
- Verifique se não há dados sensíveis expostos nos Logs e pelo provedor de nuvem, como tokens de autenticação nos Logs de Rede.

:::info

Mesmo para dados de teste, é essencial perguntar se, nas mãos erradas, uma pessoa mal-intencionada poderia recuperar informações ou usar esses recursos com intenções maliciosas.

:::

## Mascarando Dados Sensíveis

Se você estiver usando dados sensíveis durante seu teste, é essencial garantir que eles não sejam visíveis para todos, como em logs. Além disso, ao usar um provedor de nuvem, chaves privadas geralmente estão envolvidas. Essas informações devem ser mascaradas de logs, relatórios e outros pontos de contato. A seguir, são apresentadas algumas soluções de mascaramento para executar testes sem expor esses valores.

### WebDriverIO

#### Mascarar Valor de Texto dos Comandos

Os comandos `addValue` e `setValue` suportam um valor booleano de máscara para mascarar em logs, bem como em relatórios. Além disso, outras ferramentas, como ferramentas de desempenho e ferramentas de terceiros, também receberão a versão mascarada, aprimorando a segurança.

Por exemplo, se você estiver usando um usuário real de produção e precisar inserir uma senha que deseja mascarar, agora é possível com o seguinte:

```ts
  async enterPassword(userPassword) {
    const passwordInputElement = $('Password');

    // Get focus
    await passwordInputElement.click();

    await passwordInputElement.setValue(userPassword, { mask: true });
  }
```

O exemplo acima ocultará o valor do texto dos logs do WDIO da seguinte forma:

Exemplo de logs:
```text
INFO webdriver: DATA { text: "**MASKED**" }
```

Relatores, como relatores Allure, e ferramentas de terceiros como Percy do BrowserStack também tratarão a versão mascarada.
Emparelhado com a versão adequada do Appium, os Logs do Appium também serão isentos de seus dados sensíveis.

:::info

Limitações:
  - No Appium, plugins adicionais podem vazar mesmo que peçamos para mascarar as informações.
  - Provedores de nuvem podem usar um proxy para registro HTTP, o que ignora o mecanismo de máscara implementado.
  - O comando `getValue` não é suportado. Além disso, se usado no mesmo elemento, pode expor o valor destinado a ser mascarado ao usar `addValue` ou `setValue`.

Versão mínima necessária:
 - WDIO v9.15.0
 - Appium v3.0.0

:::

#### Mascarar nos Logs do WDIO

Usando a configuração `maskingPatterns`, podemos mascarar informações sensíveis dos logs do WDIO. No entanto, os logs do Appium não são cobertos.

Por exemplo, se você estiver usando um provedor de nuvem e usar o nível de informação, então quase certamente você "vazará" a chave do usuário, como mostrado abaixo:

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=myCloudSecretExposedKey --spec myTest.test.ts
```

Para contornar isso, podemos passar a expressão regular `'--key=([^ ]*)'` e agora nos logs você verá 

```text
INFO @wdio/local-runner: Start worker 0-0 with arg: ./wdio.conf.ts --user=cloud_user --key=**MASKED** --spec myTest.test.ts
```

Você pode conseguir o acima fornecendo a expressão regular para o campo `maskingPatterns` da configuração.
  - Para múltiplas expressões regulares, use uma única string, mas com um valor separado por vírgula.
  - Para mais detalhes sobre padrões de mascaramento, consulte a [seção Padrões de Mascaramento no README do WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

:::

#### Desabilitar Loggers do WDIO

Outra forma de bloquear o registro de dados sensíveis é diminuir ou silenciar o nível de log ou desabilitar o logger.
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

### Soluções de Terceiros

#### Appium
O Appium oferece sua solução de mascaramento; veja [Log filter](https://appium.io/docs/en/latest/guides/log-filters/)
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

#### BrowserStack

O BrowserStack também oferece algum nível de mascaramento para ocultar alguns dados; veja [hide sensitive data](https://www.browserstack.com/docs/automate/selenium/hide-sensitive-data)
 - Infelizmente, a solução é tudo ou nada, então todos os valores de texto dos comandos fornecidos serão mascarados.