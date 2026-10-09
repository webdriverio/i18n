---
id: writing-tests
title: Escrevendo Testes
description: "Escreva testes WebdriverIO para aplicativos Flutter alternando para o contexto Flutter e interagindo com widgets através da extensão flutter_driver."
---

Esta seção aborda a estrutura prática para criar cenários de teste automatizados e como interagir diretamente com a árvore de componentes interna do Flutter usando o WebdriverIO.

### Por que a Troca de Contexto é Necessária?

Ao iniciar uma sessão de automação com o Appium, o driver começa a execução mapeando o contexto nativo do sistema operacional, conhecido como `NATIVE_APP`. Esse contexto só consegue ver o shell nativo que envolve o aplicativo (como a barra de status do sistema ou diálogos nativos do Android/iOS).

Como o Flutter renderiza sua interface de usuário dentro de um Canvas isolado, os elementos internos ficam invisíveis no contexto `NATIVE_APP`. Para enviar comandos diretamente à extensão de teste do Flutter (`flutter_driver`), devemos alternar explicitamente o foco da automação para o contexto `FLUTTER`. Sem essa troca, qualquer tentativa de localizar um Widget resultará em um erro de elemento não encontrado.

:::tip Boa Prática: Sempre Troque o Contexto no `beforeEach`
É uma boa prática recomendada incluir `await driver.switchContext('FLUTTER')` em um hook `beforeEach` em todos os arquivos de teste. Isso garante que cada teste comece a execução no contexto `FLUTTER`, evitando instabilidade ou vazamento de estado caso um teste anterior tenha alternado para `NATIVE_APP` (por exemplo, para lidar com diálogos de permissão do sistema operacional) ou caso uma sessão redefina o contexto ativo.
:::

### Por que o `appium-flutter-finder` é Necessário?

Os seletores tradicionais do WebdriverIO, como `$('~selector')` ou `$('#id')`, são projetados para localizar elementos usando estratégias destinadas a interfaces Web ou nativas de dispositivos móveis (como resource IDs ou XPath).

O Flutter gerencia seus próprios elementos internos e utiliza métodos de busca proprietários (como `byValueKey`, `byText`, `byType`). A biblioteca `appium-flutter-finder` é necessária porque atua como um tradutor: ela expõe essas estratégias de localização específicas do Flutter em um formato serializado (Base64/JSON) que o `appium-flutter-driver` consegue interpretar e executar dentro da Máquina Virtual (VM) do Dart.

### Exemplos Práticos de Teste

Documentamos cenários comuns usando o `appium-flutter-finder` para localizar widgets, combinado com comandos de extensão diretos executados através de `driver.execute('flutter:<command>')`.

:::info Comandos de Extensão e Finders do Flutter Driver
O `appium-flutter-driver` fornece comandos especializados para interagir com aplicativos Flutter, incluindo:
- `flutter:waitFor`: Aguarda até que um widget fique visível.
- `flutter:waitForAbsent`: Aguarda até que um widget desapareça.
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: Gerencia a rolagem dentro de visualizações roláveis.
- `flutter:setTextEntryEmulation`: Configura o comportamento da entrada de texto.

Para a lista completa de comandos disponíveis, parâmetros e tipos de retorno, consulte a [Documentação de Comandos do Appium Flutter Driver](https://github.com/appium/appium-flutter-driver#commands), o [código-fonte do Finder para Node.js](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs) e o [appium-flutter-finder no npm](https://www.npmjs.com/package/appium-flutter-finder).
:::

### Exemplo A — Interação simples (fluxo do Contador)

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### Exemplo B — Navegação Estável (Evitando Timeouts)

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### Exemplo C — Alternando Contextos (Diálogos Nativos do SO e Permissões)

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. No contexto FLUTTER: clique no widget que aciona um diálogo de permissão ou alerta do SO
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. Alterne para o contexto NATIVE_APP para interagir com o diálogo do SO
        await driver.switchContext('NATIVE_APP');

        // Localize e clique no botão nativo usando seletores padrão do WebdriverIO
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Volte para o contexto FLUTTER para continuar verificando os widgets do Flutter
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## Fluxo de Build e Execução

Para garantir que suas alterações recentes no código Dart e nas Keys estejam visíveis para os testes, siga sempre estes passos:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

Você pode ver os exemplos de código no repositório: https://github.com/webdriverio/appium-boilerplate