---
id: wdio-qunit-service
title: Serviço QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) serviço para executar testes baseados em navegador [QUnit](https://qunitjs.com/) e convertê-los dinamicamente em suítes de teste `wdio`.

## Substituindo o Karma

`QUnit Service` é um substituto direto para aqueles que utilizam [Karma JS](https://karma-runner.github.io/latest/index.html) para executar seus testes `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) ou qualquer outra combinação de Karma e QUnit). O Karma está [obsoleto](https://github.com/karma-runner/karma) e as pessoas devem migrar para alternativas modernas!

Se você deseja manter seus testes QUnit como estão, sem reescrever ou refatorar, o `QUnit Service` é tudo o que você precisa. Ele executa seus arquivos HTML QUnit em um navegador e captura todos os resultados no formato `wdio`.

Por causa disso, os desenvolvedores podem usar o `QUnit Service` em conjunto com tudo o mais disponível no ecossistema `wdio`.

Quer gravar a execução do teste em [vídeo](https://webdriver.io/docs/wdio-video-reporter/)? Talvez tirar uma [captura de tela](https://webdriver.io/docs/api/browser/saveScreenshot/) ou salvá-la em [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Verificar a [cobertura de código](https://www.npmjs.com/package/wdio-monocart-service)? Salvar os resultados dos testes no formato [JUnit](https://webdriver.io/docs/junit-reporter)? Vá em frente, o `QUnit Service` não atrapalha seu caminho.

## Instalação

Após configurar o `WebdriverIO`, instale o `wdio-qunit-service` como uma devDependency no seu arquivo `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Se você ainda não configurou o `WebdriverIO`, confira a [documentação](https://webdriver.io/docs/gettingstarted) oficial.

## Configuração

Para usar o `QUnit Service`, você só precisa adicioná-lo à lista de `services` no seu arquivo `wdio.conf.js`. A documentação do wdio tem todas as informações relacionadas ao [arquivo de configuração](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Uso

Certifique-se de que o servidor web esteja ativo e em execução antes de executar os testes. O `wdio` não iniciará o servidor web.

### Com arquivos .spec ou .test

No seu teste WebdriverIO, você precisa navegar até a página de teste HTML do QUnit e então chamar `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Recomenda-se ter um arquivo de teste WebdriverIO para cada página de teste HTML QUnit. Isso garante que os testes sejam executados em paralelo e totalmente isolados.

### Apenas configuração, sem arquivos .spec ou .test

Se você não quiser criar arquivos spec/test, você pode passar uma lista de arquivos HTML QUnit para a configuração e os testes serão gerados automaticamente.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### Resultados dos testes

Os resultados dos testes podem parecer com:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Exemplos

Confira a pasta [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) para amostras usando `javascript`, `typescript` e mais.

### Uso em aplicativos SAP Fiori / UI5

Exemplo direto [example](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) usando o conhecido [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Crie um arquivo de configuração: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Diga ao `wdio` onde encontrar os arquivos de teste QUnit:

- - Inclua os arquivos QUnit na [configuração do serviço](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - ou
- - Crie um arquivo de teste WebdriverIO para [testes unitários](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) e outro para [testes OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- O servidor web deve estar em execução antes de executar os testes

- Execute $ `wdio run webapp/test/wdio.conf.js`

## Autor

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) para obter detalhes.