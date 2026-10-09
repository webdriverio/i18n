---
id: mobile
title: Comandos Mobile
---

# Introdução aos Comandos Mobile personalizados e aprimorados no WebdriverIO

Testar aplicativos móveis e aplicações web móveis traz seus próprios desafios, especialmente ao lidar com diferenças específicas de plataforma entre Android e iOS. Embora o Appium ofereça a flexibilidade para lidar com essas diferenças, muitas vezes ele exige que você se aprofunde em documentações complexas e dependentes de plataforma ([Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md), [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/)) e em comandos. Isso pode tornar a escrita de scripts de teste mais demorada, propensa a erros e difícil de manter.

Para simplificar o processo, o WebdriverIO introduz **comandos mobile personalizados e aprimorados** feitos especificamente para testes de web móvel e de aplicativos nativos. Esses comandos abstraem as complexidades das APIs subjacentes do Appium, permitindo que você escreva scripts de teste concisos, intuitivos e independentes de plataforma. Com foco na facilidade de uso, buscamos reduzir a carga extra durante o desenvolvimento de scripts Appium e capacitar você a automatizar aplicativos móveis sem esforço.

<LiteYouTubeEmbed
    id="tN0LmKgWjPw"
    title="WebdriverIO Tutorials - Enhanced Mobile Commands"
/>

## Por que Comandos Mobile Personalizados?

### 1. **Simplificando APIs Complexas**
Alguns comandos do Appium, como gestos ou interações com elementos, envolvem uma sintaxe verbosa e complexa. Por exemplo, executar uma ação de pressionamento longo com a API nativa do Appium exige construir manualmente uma cadeia de `action`:

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

Isso reduz drasticamente o código repetitivo, tornando seus scripts mais limpos e fáceis de entender.

### 2. **Abstração Multiplataforma**
Aplicativos móveis frequentemente exigem tratamento específico para cada plataforma. Por exemplo, a rolagem em aplicativos nativos difere significativamente entre [Android](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) e [iOS](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll). O WebdriverIO preenche essa lacuna fornecendo comandos unificados como `scrollIntoView()`, que funcionam perfeitamente em todas as plataformas, independentemente da implementação subjacente.

```ts
await $('~element').scrollIntoView();
```

Essa abstração garante que seus testes sejam portáveis e não exijam ramificações constantes ou lógica condicional para lidar com as diferenças entre sistemas operacionais.

### 3. **Maior Produtividade**
Ao reduzir a necessidade de entender e implementar comandos de baixo nível do Appium, os comandos mobile do WebdriverIO permitem que você se concentre em testar a funcionalidade do seu aplicativo, em vez de lutar com nuances específicas de plataforma. Isso é especialmente benéfico para equipes com experiência limitada em automação mobile ou que buscam acelerar seu ciclo de desenvolvimento.

### 4. **Consistência e Manutenibilidade**
Os comandos personalizados trazem uniformidade aos seus scripts de teste. Em vez de ter implementações variadas para ações semelhantes, sua equipe pode contar com comandos padronizados e reutilizáveis. Isso não apenas torna a base de código mais fácil de manter, mas também reduz a barreira para a integração de novos membros da equipe.

## Por que aprimorar certos comandos mobile?

### 1. Adicionando Flexibilidade
Certos comandos mobile são aprimorados para oferecer opções e parâmetros adicionais que não estão disponíveis nas APIs padrão do Appium. Por exemplo, o WebdriverIO adiciona lógica de nova tentativa, timeouts e a capacidade de filtrar webviews por critérios específicos, permitindo maior controle sobre cenários complexos.

```ts
// Exemplo: Personalizando intervalos de nova tentativa e timeouts para detecção de webview
await driver.getContexts({
  returnDetailedContexts: true,
  androidWebviewConnectionRetryTime: 1000, // Tentar novamente a cada 1 segundo
  androidWebviewConnectTimeout: 10000,    // Timeout após 10 segundos
});
```

Essas opções ajudam a adaptar os scripts de automação ao comportamento dinâmico do aplicativo sem código repetitivo adicional.

### 2. Melhorando a Usabilidade
Os comandos aprimorados abstraem complexidades e padrões repetitivos encontrados nas APIs nativas. Eles permitem que você execute mais ações com menos linhas de código, reduzindo a curva de aprendizado para novos usuários e tornando os scripts mais fáceis de ler e manter.

```ts
// Exemplo: Comando aprimorado para trocar de contexto pelo título
await driver.switchContext({
  title: 'My Webview Title',
});
```

Em comparação com os métodos padrão do Appium, os comandos aprimorados eliminam a necessidade de etapas adicionais, como recuperar manualmente os contextos disponíveis e filtrá-los.

### 3. Padronizando o Comportamento
O WebdriverIO garante que os comandos aprimorados se comportem de forma consistente em plataformas como Android e iOS. Essa abstração multiplataforma minimiza a necessidade de lógica condicional baseada no sistema operacional, resultando em scripts de teste mais fáceis de manter.

```ts
// Exemplo: Comando de rolagem unificado para ambas as plataformas
await $('~element').scrollIntoView();
```

Essa padronização simplifica as bases de código, especialmente para equipes que automatizam testes em várias plataformas.

### 4. Aumentando a Confiabilidade
Ao incorporar mecanismos de nova tentativa, padrões inteligentes e mensagens de erro detalhadas, os comandos aprimorados reduzem a probabilidade de testes instáveis. Essas melhorias garantem que seus testes sejam resilientes a problemas como atrasos na inicialização de webviews ou estados transitórios do aplicativo.

```ts
// Exemplo: Troca de webview aprimorada com lógica de correspondência robusta
await driver.switchContext({
  url: /.*my-app\/dashboard/,
  androidWebviewConnectionRetryTime: 500,
  androidWebviewConnectTimeout: 7000,
});
```

Isso torna a execução dos testes mais previsível e menos propensa a falhas causadas por fatores ambientais.

### 5. Aprimorando as Capacidades de Depuração
Os comandos aprimorados frequentemente retornam metadados mais ricos, facilitando a depuração de cenários complexos, especialmente em aplicativos híbridos. Por exemplo, comandos como getContext e getContexts podem retornar informações detalhadas sobre webviews, incluindo título, url e status de visibilidade.

```ts
// Exemplo: Recuperando metadados detalhados para depuração
const contexts = await driver.getContexts({ returnDetailedContexts: true });
console.log(contexts);
```

Esses metadados ajudam a identificar e resolver problemas mais rapidamente, melhorando a experiência geral de depuração.


Ao aprimorar os comandos mobile, o WebdriverIO não apenas torna a automação mais fácil, mas também se alinha à sua missão de fornecer aos desenvolvedores ferramentas poderosas, confiáveis e intuitivas de usar.

## Aplicativos Híbridos

Aplicativos híbridos combinam conteúdo web com funcionalidades nativas e exigem tratamento especializado durante a automação. Esses aplicativos usam webviews para renderizar conteúdo web dentro de uma aplicação nativa. O WebdriverIO fornece métodos aprimorados para trabalhar com aplicativos híbridos de forma eficaz.

### Entendendo Webviews
Uma webview é um componente semelhante a um navegador incorporado em um aplicativo nativo:

- **Android:** As webviews são baseadas no Chrome/System Webview e podem conter várias páginas (semelhantes às abas de um navegador). Essas webviews exigem o ChromeDriver para automatizar interações. O Appium pode determinar automaticamente a versão necessária do ChromeDriver com base na versão do System WebView ou do Chrome instalado no dispositivo e baixá-la automaticamente se ainda não estiver disponível. Essa abordagem garante compatibilidade perfeita e minimiza a configuração manual. Consulte a [documentação do Appium UIAutomator2](https://github.com/appium/appium-uiautomator2-driver?tab=readme-ov-file#automatic-discovery-of-compatible-chromedriver) para saber como o Appium baixa automaticamente a versão correta do ChromeDriver.
- **iOS:** As webviews são alimentadas pelo Safari (WebKit) e identificadas por IDs genéricos como `WEBVIEW_{id}`.

### Desafios com Aplicativos Híbridos
1. Identificar a webview correta entre várias opções.
2. Recuperar metadados adicionais, como título, URL ou nome do pacote, para um melhor contexto.
3. Lidar com diferenças específicas de plataforma entre Android e iOS.
4. Trocar para o contexto correto em um aplicativo híbrido de forma confiável.

### Comandos Principais para Aplicativos Híbridos

#### 1. `getContext`
Recupera o contexto atual da sessão. Por padrão, comporta-se como o método getContext do Appium, mas pode fornecer informações detalhadas do contexto quando `returnDetailedContext` está habilitado. Para mais informações, consulte [`getContext`](/docs/api/mobile/getContext)

#### 2. `getContexts`
Retorna uma lista detalhada dos contextos disponíveis, aprimorando o método contexts do Appium. Isso facilita a identificação da webview correta para interação sem chamar comandos extras para determinar título, url ou o `bundleId|packageName` ativo. Para mais informações, consulte [`getContexts`](/docs/api/mobile/getContexts)

#### 3. `switchContext`
Troca para uma webview específica com base no nome, título ou url. Oferece flexibilidade adicional, como o uso de expressões regulares para correspondência. Para mais informações, consulte [`switchContext`](/docs/api/mobile/switchContext)

### Recursos Principais para Aplicativos Híbridos
1. Metadados Detalhados: Recupere detalhes abrangentes para depuração e troca de contexto confiável.
2. Consistência Multiplataforma: Comportamento unificado para Android e iOS, lidando perfeitamente com particularidades de cada plataforma.
3. Lógica de Nova Tentativa Personalizada (Android): Ajuste intervalos de nova tentativa e timeouts para detecção de webview.


:::info Notas e Limitações
- O Android fornece metadados adicionais, como `packageName` e `webviewPageId`, enquanto o iOS se concentra no `bundleId`.
- A lógica de nova tentativa é personalizável para Android, mas não se aplica ao iOS.
- Há vários casos em que o iOS não consegue encontrar a Webview. O Appium fornece diferentes capacidades extras para o `appium-xcuitest-driver` encontrar a Webview. Se você acredita que a Webview não está sendo encontrada, pode tentar definir uma das seguintes capacidades:
    - `appium:includeSafariInWebviews`: Adiciona contextos web do Safari à lista de contextos disponíveis durante um teste de aplicativo nativo/webview. Isso é útil se o teste abrir o Safari e precisar interagir com ele. O padrão é `false`.
    - `appium:webviewConnectRetries`: O número máximo de novas tentativas antes de desistir da detecção de páginas de webview. O intervalo entre cada tentativa é de 500ms; o padrão é `10` tentativas.
    - `appium:webviewConnectTimeout`: O tempo máximo, em milissegundos, para aguardar a detecção de uma página de webview. O padrão é `5000` ms.

Para exemplos avançados e detalhes, consulte a documentação da API Mobile do WebdriverIO.
:::


---

Nosso conjunto crescente de comandos reflete nosso compromisso em tornar a automação mobile acessível e elegante. Seja realizando gestos complexos ou trabalhando com elementos de aplicativos nativos, esses comandos estão alinhados com a filosofia do WebdriverIO de criar uma experiência de automação perfeita. E não vamos parar por aqui — se houver um recurso que você gostaria de ver, seu feedback é bem-vindo. Sinta-se à vontade para enviar suas solicitações por meio [deste link](https://github.com/webdriverio/webdriverio/issues/new/choose).