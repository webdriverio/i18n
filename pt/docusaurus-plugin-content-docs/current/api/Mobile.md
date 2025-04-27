---
id: mobile
title: Comandos Mobile
---

# Introdução aos comandos Mobile personalizados e aprimorados no WebdriverIO

Testar aplicativos móveis e aplicações web móveis traz seus próprios desafios, especialmente quando lidamos com diferenças específicas de plataforma entre Android e iOS. Enquanto o Appium oferece a flexibilidade para lidar com essas diferenças, frequentemente exige que você mergulhe profundamente em documentações complexas e dependentes de plataforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) e comandos. Isso pode tornar a escrita de scripts de teste mais demorada, propensa a erros e difícil de manter.

Para simplificar o processo, o WebdriverIO introduz **comandos mobile personalizados e aprimorados** específicos para testes de web móvel e aplicativos nativos. Esses comandos abstraem as complexidades das APIs subjacentes do Appium, permitindo que você escreva scripts de teste concisos, intuitivos e agnósticos de plataforma. Ao focar na facilidade de uso, nosso objetivo é reduzir a carga extra durante o desenvolvimento de scripts Appium e capacitá-lo a automatizar aplicativos móveis sem esforço.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Por que Comandos Mobile Personalizados?

### 1. **Simplificando APIs Complexas**
Alguns comandos do Appium, como gestos ou interações com elementos, envolvem sintaxe verbosa e complexa. Por exemplo, executar uma ação de pressionar longamente com a API nativa do Appium requer construir manualmente uma cadeia de `action`:

```ts
const element = $('~Contacts')

await browser
    .action( 'pointer', { parameters: { pointerType: 'touch' } })
    .move({ origin: element })
    .down()
    .pause(1500)
    .up()
    .perform()
```

Com os comandos personalizados do WebdriverIO, a mesma ação pode ser realizada com uma única linha de código expressiva:

```ts
await $('~Contacts').longPress();
```

Isso reduz drasticamente o código boilerplate, tornando seus scripts mais limpos e fáceis de entender.

### 2. **Abstração Multiplataforma**
Aplicativos móveis frequentemente exigem tratamento específico por plataforma. Por exemplo, a rolagem em aplicativos nativos difere significativamente entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). O WebdriverIO preenche essa lacuna fornecendo comandos unificados como `scrollIntoView()` que funcionam perfeitamente em todas as plataformas, independentemente da implementação subjacente.

```ts
await $('~element').scrollIntoView();
```

Essa abstração garante que seus testes sejam portáteis e não exigem ramificação constante ou lógica condicional para lidar com diferenças entre sistemas operacionais.

### 3. **Aumento de Produtividade**
Ao reduzir a necessidade de entender e implementar comandos de baixo nível do Appium, os comandos mobile do WebdriverIO permitem que você se concentre em testar a funcionalidade do seu aplicativo em vez de lidar com nuances específicas da plataforma. Isso é especialmente benéfico para equipes com experiência limitada em automação mobile ou aquelas que buscam acelerar seu ciclo de desenvolvimento.

### 4. **Consistência e Manutenibilidade**
Comandos personalizados trazem uniformidade aos seus scripts de teste. Em vez de ter implementações variadas para ações similares, sua equipe pode contar com comandos padronizados e reutilizáveis. Isso não apenas torna o código-base mais manutenível, mas também reduz a barreira para integrar novos membros da equipe.

## Por que aprimorar certos comandos mobile?

### 1. Adicionando Flexibilidade
Certos comandos mobile são aprimorados para fornecer opções e parâmetros adicionais que não estão disponíveis nas APIs padrão do Appium. Por exemplo, o WebdriverIO adiciona lógica de repetição, timeouts e a capacidade de filtrar webviews por critérios específicos, permitindo mais controle sobre cenários complexos.

```ts
// Exemplo: Personalizando intervalos de repetição e timeouts para detecção de webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Tentar novamente a cada 1 segundo
  androidWebviewConnectTimeout: 10000,    // Timeout após 10 segundos
});
```

Essas opções ajudam a adaptar scripts de automação ao comportamento dinâmico do aplicativo sem código boilerplate adicional.

### 2. Melhorando a Usabilidade
Comandos aprimorados abstraem complexidades e padrões repetitivos encontrados nas APIs nativas. Eles permitem que você execute mais ações com menos linhas de código, reduzindo a curva de aprendizado para novos usuários e tornando os scripts mais fáceis de ler e manter.

```ts
// Exemplo: Comando aprimorado para alternar contexto por título
await driver.switchContext({
  title: 'Meu Título de Webview',
});
```

Comparados aos métodos padrão do Appium, os comandos aprimorados eliminam a necessidade de etapas adicionais, como recuperar manualmente os contextos disponíveis e filtrá-los.

### 3. Padronizando o Comportamento
O WebdriverIO garante que os comandos aprimorados se comportem de maneira consistente em plataformas como Android e iOS. Essa abstração multiplataforma minimiza a necessidade de lógica de ramificação condicional baseada no sistema operacional, levando a scripts de teste mais manuteníveis.

```ts
// Exemplo: Comando de rolagem unificado para ambas as plataformas
await $('~element').scrollIntoView();
```

Essa padronização simplifica bases de código, especialmente para equipes que automatizam testes em múltiplas plataformas.

### 4. Aumentando a Confiabilidade
Ao incorporar mecanismos de repetição, padrões inteligentes e mensagens de erro detalhadas, os comandos aprimorados reduzem a probabilidade de testes instáveis. Essas melhorias garantem que seus testes sejam resilientes a problemas como atrasos na inicialização do webview ou estados transitórios do aplicativo.

```ts
// Exemplo: Alternância de webview aprimorada com lógica de correspondência robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Isso torna a execução do teste mais previsível e menos propensa a falhas causadas por fatores ambientais.

### 5. Aprimorando Capacidades de Depuração
Comandos aprimorados frequentemente retornam metadados mais ricos, permitindo uma depuração mais fácil de cenários complexos, particularmente em aplicativos híbridos. Por exemplo, comandos como getContext e getContexts podem retornar informações detalhadas sobre webviews, incluindo título, URL e status de visibilidade.

```ts
// Exemplo: Recuperando metadados detalhados para depuração
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Esses metadados ajudam a identificar e resolver problemas mais rapidamente, melhorando a experiência geral de depuração.


Ao aprimorar comandos mobile, o WebdriverIO não apenas facilita a automação, mas também se alinha com sua missão de fornecer aos desenvolvedores ferramentas que são poderosas, confiáveis e intuitivas de usar.

---

## Aplicativos Híbridos

Aplicativos híbridos combinam conteúdo web com funcionalidade nativa e requerem tratamento especializado durante a automação. Esses aplicativos usam webviews para renderizar conteúdo web dentro de um aplicativo nativo. O WebdriverIO fornece métodos aprimorados para trabalhar efetivamente com aplicativos híbridos.

### Entendendo Webviews
Um webview é um componente semelhante a um navegador incorporado em um aplicativo nativo:

- **Android:** Webviews são baseados no Chrome/System Webview e podem conter múltiplas páginas (semelhante a abas do navegador). Esses webviews requerem ChromeDriver para automatizar interações. O Appium pode determinar automaticamente a versão necessária do ChromeDriver com base na versão do System WebView ou Chrome instalado no dispositivo e baixá-lo automaticamente se ainda não estiver disponível. Essa abordagem garante compatibilidade perfeita e minimiza a configuração manual. Consulte a [documentação do Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) para aprender como o Appium baixa automaticamente a versão correta do ChromeDriver.
- **iOS:** Webviews são alimentados pelo Safari (WebKit) e identificados por IDs genéricos como `WEBVIEW_{id}`.

### Desafios com Aplicativos Híbridos
1. Identificar o webview correto entre múltiplas opções.
2. Recuperar metadados adicionais como título, URL ou nome do pacote para melhor contexto.
3. Lidar com diferenças específicas de plataforma entre Android e iOS.
4. Alternar para o contexto correto em um aplicativo híbrido de forma confiável.

### Comandos-Chave para Aplicativos Híbridos

#### 1. `getContext`
Recupera o contexto atual da sessão. Por padrão, comporta-se como o método getContext do Appium, mas pode fornecer informações detalhadas de contexto quando `returnDetailedContext` está habilitado. Para mais informações, consulte [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Retorna uma lista detalhada de contextos disponíveis, melhorando o método contexts do Appium. Isso facilita a identificação do webview correto para interação sem precisar chamar comandos extras para determinar título, url ou `bundleId|packageName` ativo. Para mais informações, consulte [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Alterna para um webview específico com base no nome, título ou url. Fornece flexibilidade adicional, como usar expressões regulares para correspondência. Para mais informações, consulte [`switchContext`](/docs/api/mobile/switchContext)

### Características-Chave para Aplicativos Híbridos
1. Metadados Detalhados: Recupere detalhes abrangentes para depuração e alternância de contexto confiável.
2. Consistência Multiplataforma: Comportamento unificado para Android e iOS, lidando com peculiaridades específicas da plataforma de forma transparente.
3. Lógica de Repetição Personalizada (Android): Ajuste intervalos de repetição e timeouts para detecção de webview.


:::info Notas e Limitações
- O Android fornece metadados adicionais, como `packageName` e `webviewPageId`, enquanto o iOS se concentra em `bundleId`.
- A lógica de repetição é personalizável para Android, mas não aplicável ao iOS.
- Existem vários casos em que o iOS não consegue encontrar o Webview. O Appium fornece diferentes capacidades extras para o `appium-xcuitest-driver` para encontrar o Webview. Se você acredita que o Webview não está sendo encontrado, pode tentar definir uma das seguintes capacidades:
    - `appium:includeSafariInWebviews`: Adiciona contextos web do Safari à lista de contextos disponíveis durante um teste de aplicativo nativo/webview. Isso é útil se o teste abrir o Safari e precisar interagir com ele. O padrão é `false`.
    - `appium:webviewConnectRetries`: O número máximo de tentativas antes de desistir da detecção de páginas de webview. O atraso entre cada tentativa é de 500ms, o padrão é `10` tentativas.
    - `appium:webviewConnectTimeout`: O tempo máximo em milissegundos para aguardar a detecção de uma página de webview. O padrão é `5000` ms.

Para exemplos avançados e detalhes, consulte a documentação da API Mobile do WebdriverIO.
:::


---

Nosso conjunto crescente de comandos reflete nosso compromisso em tornar a automação mobile acessível e elegante. Seja realizando gestos complexos ou trabalhando com elementos de aplicativos nativos, esses comandos se alinham com a filosofia do WebdriverIO de criar uma experiência de automação perfeita. E não estamos parando por aqui—se houver um recurso que você gostaria de ver, recebemos seu feedback. Sinta-se à vontade para enviar suas solicitações através [deste link](https://github.com/webdriverio/webdriverio/issues/new/choose).