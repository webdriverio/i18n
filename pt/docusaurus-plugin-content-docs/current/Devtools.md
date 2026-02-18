---
id: devtools
title: DevTools
---

O serviço DevTools fornece uma poderosa interface de depuração baseada em navegador para execuções de testes WebdriverIO. Ele permite visualizar, depurar e controlar seus testes em tempo real por meio de uma aplicação web interativa.

## Visão Geral

Este serviço permite que você:

- **Execute testes seletivamente** - Clique em qualquer caso de teste ou suíte para reexecutá-lo instantaneamente
- **Depure visualmente** - Veja previsualizações ao vivo do navegador com capturas de tela automáticas
- **Acompanhe a execução** - Visualize registros detalhados de comandos com carimbos de data/hora e resultados
- **Monitore rede e console** - Inspecione chamadas de API e logs JavaScript
- **Navegue até o código** - Vá diretamente aos arquivos de origem do teste

## Instalação

Instale o serviço como uma dependência de desenvolvimento:

```sh
npm install --save-dev @wdio/devtools-service
```

## Configuração

Adicione o serviço à sua configuração WebDriverIO:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Opções do Serviço

Configure o serviço DevTools com estas opções:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Porta para a interface do devtools (padrão: 3000)
        }]
    ],
    // ...
};
```

#### Opções

- **port** (número, padrão: `3000`) - Número da porta para o servidor da interface DevTools

## Como Funciona

Quando você executa seus testes WebdriverIO com o serviço DevTools habilitado:

1. O serviço abre uma janela do navegador em `http://localhost:3000` (configurável)
2. Seus testes são executados normalmente enquanto a interface DevTools exibe atualizações em tempo real
3. A interface mostra a hierarquia de testes, visualização do navegador, linha do tempo de comandos e logs
4. Após a conclusão dos testes, você pode clicar em qualquer teste para executá-lo novamente individualmente
5. Os testes são reexecutados na mesma sessão do navegador para uma depuração mais rápida

## Recursos

Explore os recursos do DevTools em detalhes:

- **[Reexecução e Visualização Interativa de Testes](devtools/interactive-test-rerunning)** - Visualizações em tempo real do navegador com reexecução de testes
- **[Suporte a Múltiplos Frameworks](devtools/multi-framework-support)** - Funciona com Mocha, Jasmine e Cucumber
- **[Logs de Console](devtools/console-logs)** - Capture e inspecione a saída do console do navegador
- **[Logs de Rede](devtools/network-logs)** - Monitore chamadas de API e atividade de rede
- **[TestLens](devtools/testlens)** - Navegue até o código-fonte com navegação inteligente de código