---
id: base-appium-configuration
title: Configuração Base do Appium
description: "Instale o serviço do Appium e o pacote Flutter finder e configure a base do Appium para testar aplicativos Flutter com o WebdriverIO."
---

O WebdriverIO usa o Appium para executar testes em emuladores móveis, simuladores e dispositivos reais. O `@wdio/appium-service` gerencia automaticamente o ciclo de vida do servidor Appium durante a execução dos testes.

Para a configuração geral do Appium e as opções de capabilities, consulte a [Documentação do Appium Service](https://webdriver.io/docs/appium-service/).

## Instalando Dependências

Para testar aplicativos Flutter, instale o serviço do Appium e o pacote Flutter finder:

```bash
npm install --save-dev @wdio/appium-service appium appium-flutter-finder
```

### Instalando o Appium Flutter Driver

Você pode instalar o Appium Flutter Driver (`appium-flutter-driver`) de uma das duas formas:

#### Opção 1: Como Dependência de Desenvolvimento (Recomendado para CI/CD)

Adicionar o driver diretamente às suas `devDependencies` garante que todos os membros da equipe e pipelines de CI/CD tenham o driver instalado automaticamente, sem exigir etapas extras de configuração:

```bash
npm install --save-dev appium-flutter-driver
```

> Você também pode instalar todos os pacotes necessários de uma só vez com um único comando:
> ```bash
> npm install --save-dev @wdio/appium-service appium appium-flutter-finder appium-flutter-driver
> ```

#### Opção 2: Via Appium CLI (Configuração Local)

Alternativamente, você pode instalar o driver localmente no seu ambiente Appium usando o Appium CLI:

```bash
npx appium driver install flutter
```

### Visão Geral dos Pacotes

Estes pacotes fornecem:
- **`@wdio/appium-service` & `appium`**: Inicia e gerencia o servidor Appium durante as execuções de teste.
- **`appium-flutter-driver`**: O driver do Appium responsável pela comunicação com a extensão de testes do Flutter.
- **`appium-flutter-finder`**: Biblioteca auxiliar que fornece estratégias de localização específicas do Flutter (`byValueKey`, `byText`, `byTooltip`).