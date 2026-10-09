---
id: faq
title: Perguntas Frequentes
description: "Encontre respostas para perguntas comuns sobre instalação, uso e solução de problemas do servidor WebdriverIO MCP para automação de navegadores e dispositivos móveis."
---

Perguntas frequentes sobre o WebdriverIO MCP.

## Geral

### O que é MCP?

MCP (Model Context Protocol) é um protocolo aberto que permite que assistentes de IA como o Claude interajam com ferramentas e serviços externos. O WebdriverIO MCP implementa esse protocolo para fornecer recursos de automação de navegadores e dispositivos móveis ao Claude Desktop e ao Claude Code.

### O que posso automatizar com o WebdriverIO MCP?

Você pode automatizar:
-   **Navegadores desktop** (Chrome, Firefox, Edge, Safari) - navegação, cliques, digitação, capturas de tela
-   **Aplicativos iOS** - em simuladores ou dispositivos reais
-   **Aplicativos Android** - em emuladores ou dispositivos reais
-   **Aplicativos híbridos** - alternando entre contextos nativos e web
-   **Dispositivos na nuvem** - via nuvens de dispositivos BrowserStack, Sauce Labs, TestMu e TestingBot

### Preciso escrever código?

Não! Esse é o principal benefício do MCP. Você pode descrever o que deseja fazer em linguagem natural, e o Claude usará as ferramentas apropriadas para realizar a tarefa.

**Exemplos de prompts:**
-   "Abra o Chrome e navegue até webdriver.io"
-   "Clique no botão Get Started"
-   "Tire uma captura de tela da página atual"
-   "Inicie meu aplicativo iOS e faça login como usuário de teste"

## Instalação e Configuração

### Como instalo o WebdriverIO MCP?

Você não precisa instalá-lo separadamente. O servidor MCP é executado automaticamente via npx quando você o configura no seu harness. Adicione isto à sua configuração:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

### Onde fica o arquivo de configuração do Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Preciso do Appium para automação de navegadores?

Não. A automação de navegadores requer apenas que o navegador de destino esteja instalado. O WebdriverIO gerencia os drivers automaticamente.

### Preciso do Appium para automação móvel?

Sim. A automação móvel requer:
1. Servidor Appium em execução (`npm install -g appium && appium`)
2. Drivers de plataforma instalados (`appium driver install xcuitest` para iOS, `appium driver install uiautomator2` para Android)
3. Ferramentas de desenvolvimento apropriadas (Xcode para iOS, Android SDK para Android)

## Automação de Navegadores

### Quais navegadores são suportados?

Chrome, Firefox, Edge e Safari são todos suportados. Use o parâmetro `browser` em `start_session`:

```text
"Start a Firefox session"
"Start Chrome in headless mode"
```

### Posso executar o navegador em modo headless?

Sim. Headless é o padrão (`headless: true`). Peça ao Claude para executar em modo headed se quiser ver o navegador:

"Inicie o Chrome em modo headed (não headless)"

### Posso definir o tamanho da janela do navegador?

Sim. Você pode especificar as dimensões ao iniciar o navegador:

"Inicie o Chrome com uma janela de tamanho 1920x1080"

Dimensões suportadas: 400–3840 pixels de largura, 400–2160 pixels de altura. O padrão é 1920×1080.

### Posso iniciar o navegador e navegar em uma única etapa?

Sim! Use o parâmetro `navigationUrl`:

"Inicie o Chrome e navegue até https://webdriver.io"

Isso é mais eficiente do que iniciar o navegador e depois navegar separadamente.

### Como tiro capturas de tela?

Basta pedir:

"Tire uma captura de tela da página atual"

As capturas de tela são otimizadas automaticamente:
- Redimensionadas para no máximo 2000px de dimensão
- Comprimidas para no máximo 1MB de tamanho de arquivo
- Formato: PNG ou JPEG (selecionado automaticamente para qualidade ideal)

### Posso interagir com iframes?

Sim. Use a ferramenta `switch_frame` para entrar em um iframe por meio de um seletor CSS ou XPath. Todas as chamadas subsequentes de `click_element`, `set_value` e `get_elements` operam dentro do frame selecionado. Omita o seletor para voltar ao frame de nível superior. Os iframes devem ser da mesma origem que a página principal.

### Posso executar JavaScript personalizado?

Sim! Use a ferramenta `execute_script`:

"Execute um script para obter o título da página"
"Execute o script: return document.querySelectorAll('button').length"

### Posso me conectar a uma sessão existente do Chrome?

Sim. Use `launch_chrome` primeiro (abre o Chrome com depuração remota) e depois `start_session` com `attach: true`.

"Inicie o Chrome com depuração remota e depois conecte-se a ele"

### Posso trabalhar com várias abas?

Sim. Use `get_tabs` para listar as abas abertas e `switch_tab` para focar em uma específica:

"Obtenha todas as abas abertas"
"Mude para a aba no índice 1"

## Automação Móvel

### Como inicio uma sessão iOS ou Android?

Use `start_session` com a plataforma apropriada:

"Inicie meu aplicativo iOS localizado em /path/to/MyApp.app no simulador do iPhone 15"

"Inicie meu aplicativo Android em /path/to/app.apk no emulador do Pixel 7"

Ou para um aplicativo já instalado:

"Inicie o aplicativo com noReset ativado no simulador do iPhone 15"

### Posso testar em dispositivos reais?

Sim! Para dispositivos reais, você precisará do UDID do dispositivo:

-   **iOS:** Conecte o dispositivo, abra o Finder, clique no dispositivo e clique no número de série para revelar o UDID
-   **Android:** Execute `adb devices` no terminal

Depois peça:

"Inicie meu aplicativo iOS no dispositivo real com UDID abc123..."

### Como lido com diálogos de permissão?

Por padrão, as permissões são concedidas automaticamente (`autoGrantPermissions: true`). Se você precisar testar fluxos de permissão, pode desativar isso:

"Inicie meu aplicativo sem conceder permissões automaticamente"

### Quais gestos são suportados?

-   **Toque:** Toque em elementos ou coordenadas (`tap_element`)
-   **Deslizar:** Deslize para cima, para baixo, para a esquerda ou para a direita (`swipe`)
-   **Arrastar e Soltar:** Arraste de um elemento para outro ou para coordenadas (`drag_and_drop`)

Observação: `long_press` está disponível por meio de `execute_script` com comandos mobile do Appium.

### Como faço rolagem em aplicativos móveis?

Use gestos de deslizar:

"Deslize para cima para rolar para baixo"
"Deslize para baixo para rolar para cima"

### Posso girar o dispositivo?

Sim:

"Gire o dispositivo para paisagem"
"Gire o dispositivo para retrato"

### Como lido com aplicativos híbridos?

Para aplicativos com webviews, você pode alternar contextos:

"Obtenha os contextos disponíveis"
"Mude para o contexto webview"
"Volte para o contexto nativo"

### Posso executar comandos mobile do Appium?

Sim! Use a ferramenta `execute_script`:

```text
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Pressiona VOLTAR no Android
Execute script "mobile: activateApp" with args [{ bundleId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

## Seleção de Elementos

### Como o assistente de IA sabe com qual elemento interagir?

Ele usa o recurso `wdio://session/current/elements` ou a ferramenta `get_elements` para identificar elementos interativos na página/tela. Cada elemento vem com seletores prontos para uso.

### E se houver muitos elementos na página?

Use paginação para gerenciar listas grandes de elementos:

"Obtenha os primeiros 20 elementos"
"Obtenha elementos com offset 20 e limit 20"

A resposta inclui `total`, `showing` e `hasMore` para ajudar a navegar pelos elementos.

### E se o Claude clicar no elemento errado?

Você pode ser mais específico:

-   Forneça o texto exato: "Clique no botão que diz 'Submit Order'"
-   Forneça o seletor: "Clique no elemento com o seletor #submit-btn"
-   Forneça o accessibility ID: "Clique no elemento com accessibility ID loginButton"

### Qual é a melhor estratégia de seletores para dispositivos móveis?

1. **Accessibility ID** (melhor) - `~loginButton`
2. **Resource ID** (Android) - `id=login_button`
3. **Predicate String** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (último recurso) - mais lento, mas funciona em qualquer lugar

### O que é a árvore de acessibilidade e quando devo usá-la?

A árvore de acessibilidade fornece informações semânticas sobre os elementos da página (papéis, nomes, estados). Use `get_accessibility_tree` quando:
- `get_elements` não retornar os elementos esperados
- Você precisar encontrar elementos por papel de acessibilidade (button, link, textbox etc.)
- Você precisar de informações semânticas detalhadas sobre os elementos

"Obtenha a árvore de acessibilidade filtrada pelos papéis button e link"

## Gerenciamento de Sessões

### Posso ter várias sessões ao mesmo tempo?

Não. O servidor MCP usa um modelo de sessão única. Apenas uma sessão de navegador ou aplicativo pode estar ativa por vez.

### O que acontece quando eu fecho uma sessão?

Depende do tipo de sessão e das configurações:

-   **Navegador:** O navegador é fechado completamente
-   **Móvel com `noReset: false`:** O aplicativo é encerrado
-   **Móvel com `noReset: true` ou sem `appPath`:** O aplicativo permanece aberto (a sessão é desconectada automaticamente)

### Posso preservar o estado do aplicativo entre sessões?

Sim! Use a opção `noReset`:

"Inicie meu aplicativo com noReset ativado"

Isso preserva o estado de login, as preferências e outros dados do aplicativo.

### Qual é a diferença entre fechar e desconectar?

-   **Fechar:** Encerra o navegador/aplicativo completamente
-   **Desconectar:** Interrompe a automação, mas mantém o navegador/aplicativo em execução

Desconectar é útil quando você deseja inspecionar manualmente o estado após a automação.

### Minha sessão continua expirando durante a depuração

Aumente o tempo limite de comando:

"Inicie meu aplicativo com newCommandTimeout de 300 segundos"

O padrão é 300 segundos. Para sessões de depuração muito longas, tente 600 segundos.

## Solução de Problemas

### Erro "Session not found"

Isso significa que não existe nenhuma sessão ativa. Inicie primeiro uma sessão de navegador ou aplicativo:

"Inicie o Chrome e navegue até google.com"

### Erro "Element not found"

O elemento pode não estar visível ou pode ter um seletor diferente. Tente:

1. Pedir ao Claude para obter primeiro todos os elementos visíveis
2. Fornecer um seletor mais específico
3. Aguardar o carregamento completo da página/aplicativo
4. Usar `inViewportOnly: false` para encontrar elementos fora da tela

### O navegador não inicia

1. Certifique-se de que o navegador de destino está instalado
2. Verifique se outro processo está usando a porta de depuração (9222)
3. Tente o modo headless

### Falha na conexão com o Appium

Este é o problema mais comum ao iniciar a automação móvel.

1. **Verifique se o Appium está em execução**: `curl http://localhost:4723/status`
2. Inicie o Appium, se necessário: `appium`
3. Verifique se a sua conexão com o Appium corresponde ao servidor (use `appiumConfig` em `start_session`)
4. Certifique-se de que os drivers estão instalados: `appium driver list --installed`

:::tip
O servidor MCP requer que o Appium esteja em execução antes de iniciar sessões móveis. Certifique-se de iniciar o Appium primeiro:
```sh
appium
```
Versões futuras podem incluir gerenciamento automático do serviço Appium.
:::

### O Simulador iOS não inicia

1. Certifique-se de que o Xcode está instalado: `xcode-select --install`
2. Liste os simuladores disponíveis: `xcrun simctl list devices`
3. Verifique erros específicos do simulador no Console.app

### O Emulador Android não inicia

1. Defina `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Verifique os emuladores: `emulator -list-avds`
3. Inicie o emulador manualmente: `emulator -avd <avd-name>`
4. Verifique se o dispositivo está conectado: `adb devices`

### As capturas de tela não estão funcionando

1. Para dispositivos móveis, certifique-se de que a sessão está ativa
2. Para navegadores, tente uma página diferente (algumas páginas bloqueiam capturas de tela)
3. Verifique os logs do Claude Desktop em busca de erros

As capturas de tela são comprimidas automaticamente para no máximo 1MB, então capturas grandes funcionarão, mas podem ter qualidade inferior.

## Desempenho

### Por que a automação móvel é lenta?

A automação móvel envolve:
1. Comunicação de rede com o servidor Appium
2. Comunicação do Appium com o dispositivo/simulador
3. Renderização e resposta do dispositivo

Dicas para uma automação mais rápida:
-   Use emuladores/simuladores em vez de dispositivos reais durante o desenvolvimento
-   Use accessibility IDs em vez de XPath
-   Ative `inViewportOnly: true` para a detecção de elementos
-   Use paginação (`limit`) para reduzir o uso de tokens

### Como posso acelerar a detecção de elementos?

O servidor MCP já otimiza a detecção de elementos usando a análise do código-fonte XML da página (2 chamadas HTTP vs. mais de 600 para consultas de elementos tradicionais). Dicas adicionais:

-   Defina `inViewportOnly: true` para filtrar elementos fora da tela
-   Defina `includeContainers: false` (padrão)
-   Use `limit` e `offset` para paginação em telas grandes
-   Use seletores específicos em vez de buscar todos os elementos

### As capturas de tela estão lentas ou falhando

As capturas de tela são otimizadas automaticamente:
- Redimensionadas se forem maiores que 2000px
- Comprimidas para ficarem abaixo de 1MB
- Convertidas para JPEG se o PNG for muito grande

Essa otimização reduz o tempo de processamento e garante que o Claude consiga lidar com a imagem.

## Limitações

### Quais são as limitações atuais?

-   **Sessão única:** Apenas um navegador/aplicativo por vez
-   **Suporte a iframes:** Iframes da mesma origem são suportados via `switch_frame`; iframes de origem cruzada não são acessíveis devido a restrições de segurança do navegador
-   **Upload de arquivos:** Não é suportado diretamente pelas ferramentas
-   **Áudio/Vídeo:** Não é possível interagir com a reprodução de mídia
-   **Extensões de navegador:** Não suportadas

### Posso usar isso para testes em produção?

O WebdriverIO MCP foi projetado para automação interativa assistida por IA. Para testes de CI/CD em produção, considere usar o test runner tradicional do WebdriverIO com controle programático completo.

## Segurança

### Meus dados estão seguros?

O servidor MCP é executado localmente na sua máquina. Toda a automação acontece por meio de conexões locais com o navegador/Appium. Nenhum dado é enviado para servidores externos além daqueles para os quais você navega explicitamente.

Ao usar o modo de transporte HTTP (`--http`), o servidor por padrão aceita apenas conexões de `localhost`; use `--allowedHosts` e `--allowedOrigins` para controlar o acesso. Consulte [Transport](./transport) para mais detalhes.

### O Claude pode acessar minhas senhas?

O Claude pode ver o conteúdo da página e interagir com os elementos, mas:
-   Senhas em campos `<input type="password">` são mascaradas
-   Você deve evitar automatizar credenciais sensíveis
-   Use contas de teste para automação

## Contribuindo

### Como posso contribuir?

Visite o [repositório no GitHub](https://github.com/webdriverio/mcp) para:
-   Relatar bugs
-   Solicitar funcionalidades
-   Enviar pull requests

### Onde posso obter ajuda?

-   [Discord do WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentação do WebdriverIO](https://webdriver.io/)