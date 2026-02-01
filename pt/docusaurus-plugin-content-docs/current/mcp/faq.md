---
id: faq
title: Perguntas Frequentes
---

Perguntas frequentes sobre o WebdriverIO MCP.

## Geral

### O que é MCP?

MCP (Model Context Protocol) é um protocolo aberto que permite que assistentes de IA como o Claude interajam com ferramentas e serviços externos. O WebdriverIO MCP implementa este protocolo para fornecer capacidades de automação de navegadores e dispositivos móveis para o Claude Desktop e Claude Code.

### O que posso automatizar com o WebdriverIO MCP?

Você pode automatizar:
-   **Navegadores desktop** (Chrome) - navegação, cliques, digitação, capturas de tela
-   **Aplicativos iOS** - em simuladores ou dispositivos reais
-   **Aplicativos Android** - em emuladores ou dispositivos reais
-   **Aplicativos híbridos** - alternando entre contextos nativos e web

### Preciso escrever código?

Não! Esse é o principal benefício do MCP. Você pode descrever o que deseja fazer em linguagem natural, e o Claude usará as ferramentas apropriadas para realizar a tarefa.

**Exemplos de prompts:**
-   "Abra o Chrome e navegue até webdriver.io"
-   "Clique no botão Começar"
-   "Tire uma captura de tela da página atual"
-   "Inicie meu aplicativo iOS e faça login como usuário de teste"

---

## Instalação e Configuração

### Como instalo o WebdriverIO MCP?

Você não precisa instalá-lo separadamente. O servidor MCP é executado automaticamente via npx quando você o configura no Claude Desktop ou Claude Code.

Adicione isto ao seu config do Claude Desktop:

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

### Onde está o arquivo de configuração do Claude Desktop?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### Preciso do Appium para automação de navegador?

Não. A automação de navegador requer apenas que o Chrome esteja instalado. O WebdriverIO gerencia o ChromeDriver automaticamente.

### Preciso do Appium para automação móvel?

Sim. A automação móvel requer:
1. Servidor Appium em execução (`npm install -g appium && appium`)
2. Drivers de plataforma instalados (`appium driver install xcuitest` para iOS, `appium driver install uiautomator2` para Android)
3. Ferramentas de desenvolvimento apropriadas (Xcode para iOS, Android SDK para Android)

---

## Automação de Navegador

### Quais navegadores são suportados?

Atualmente, apenas o **Chrome** é suportado. O suporte para outros navegadores pode ser adicionado em versões futuras.

### Posso executar o Chrome em modo headless?

Sim! Peça ao Claude para iniciar o navegador em modo headless:

"Inicie o Chrome em modo headless"

Ou o Claude usará esta opção quando apropriado (por exemplo, em contextos de CI/CD).

### Posso definir o tamanho da janela do navegador?

Sim. Você pode especificar dimensões ao iniciar o navegador:

"Inicie o Chrome com tamanho de janela de 1920x1080"

Dimensões suportadas: 400-3840 pixels de largura, 400-2160 pixels de altura. O padrão é 1920x1080.

### Posso iniciar o navegador e navegar em uma única etapa?

Sim! Use o parâmetro `navigationUrl`:

"Inicie o Chrome e navegue até https://webdriver.io"

Isso é mais eficiente do que iniciar o navegador e depois navegar separadamente.

### Como faço para tirar capturas de tela?

Simplesmente peça ao Claude:

"Tire uma captura de tela da página atual"

As capturas de tela são automaticamente otimizadas:
- Redimensionadas para dimensão máxima de 2000px
- Comprimidas para tamanho máximo de arquivo de 1MB
- Formato: PNG ou JPEG (selecionado automaticamente para qualidade ideal)

### Posso interagir com iframes?

Atualmente, o servidor MCP opera no documento principal. A interação com iframes pode ser adicionada em versões futuras.

### Posso executar JavaScript personalizado?

Sim! Use a ferramenta `execute_script`:

"Execute script para obter o título da página"
"Execute script: return document.querySelectorAll('button').length"

---

## Automação Móvel

### Como inicio um aplicativo iOS?

Peça ao Claude com os detalhes necessários:

"Inicie meu aplicativo iOS localizado em /path/to/MyApp.app no simulador iPhone 15"

Ou para um aplicativo instalado:

"Inicie o aplicativo com noReset ativado no simulador iPhone 15"

### Como inicio um aplicativo Android?

"Inicie meu aplicativo Android em /path/to/app.apk no emulador Pixel 7"

Ou para um aplicativo instalado:

"Inicie o aplicativo com noReset ativado no emulador Pixel 7"

### Posso testar em dispositivos reais?

Sim! Para dispositivos reais, você precisará do UDID do dispositivo:

-   **iOS:** Conecte o dispositivo, abra o Finder, clique no dispositivo, clique no número de série para revelar o UDID
-   **Android:** Execute `adb devices` no terminal

Depois, peça ao Claude:

"Inicie meu aplicativo iOS no dispositivo real com UDID abc123..."

### Como lidar com diálogos de permissão?

Por padrão, as permissões são concedidas automaticamente (`autoGrantPermissions: true`). Se você precisar testar fluxos de permissão, pode desabilitar isso:

"Inicie meu aplicativo sem conceder permissões automaticamente"

### Quais gestos são suportados?

-   **Toque:** Tocar em elementos ou coordenadas
-   **Deslizar:** Deslizar para cima, baixo, esquerda ou direita
-   **Arrastar e Soltar:** Arrastar de um elemento para outro ou para coordenadas

Nota: `long_press` está disponível através de `execute_script` com comandos móveis do Appium.

### Como faço para rolar em aplicativos móveis?

Use gestos de deslize:

"Deslize para cima para rolar para baixo"
"Deslize para baixo para rolar para cima"

### Posso rotacionar o dispositivo?

Sim:

"Rotacione o dispositivo para paisagem"
"Rotacione o dispositivo para retrato"

### Como lidar com aplicativos híbridos?

Para aplicativos com webviews, você pode alternar contextos:

"Obtenha os contextos disponíveis"
"Mude para o contexto webview"
"Volte para o contexto nativo"

### Posso executar comandos móveis do Appium?

Sim! Use a ferramenta `execute_script`:

```
Execute script "mobile: pressKey" with args [{ keycode: 4 }]  // Pressione VOLTAR no Android
Execute script "mobile: activateApp" with args [{ appId: "com.example.app" }]
Execute script "mobile: terminateApp" with args [{ bundleId: "com.example.app" }]
```

---

## Seleção de Elementos

### Como o Claude sabe qual elemento interagir?

Claude usa a ferramenta `get_visible_elements` para identificar elementos interativos na página/tela. Cada elemento vem com múltiplas estratégias de seletor.

### E se houver muitos elementos na página?

Use paginação para gerenciar grandes listas de elementos:

"Obtenha os primeiros 20 elementos visíveis"
"Obtenha elementos visíveis com offset 20 e limite 20"

A resposta inclui `total`, `showing` e `hasMore` para ajudar a navegar pelos elementos.

### Posso obter apenas tipos específicos de elementos?

Sim! Use o parâmetro `elementType`:

-   `interactable` (padrão): Botões, links, inputs
-   `visual`: Imagens, SVGs
-   `all`: Ambos os tipos

"Obtenha elementos visuais visíveis na página"

### E se o Claude clicar no elemento errado?

Você pode ser mais específico:

-   Forneça texto exato: "Clique no botão que diz 'Confirmar Pedido'"
-   Forneça seletor: "Clique no elemento com seletor #submit-btn"
-   Forneça ID de acessibilidade: "Clique no elemento com ID de acessibilidade loginButton"

### Qual é a melhor estratégia de seletor para dispositivos móveis?

1. **ID de Acessibilidade** (melhor) - `~loginButton`
2. **ID de Recurso** (Android) - `id=login_button`
3. **String Predicada** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (último recurso) - mais lento, mas funciona em todos os lugares

### O que é a árvore de acessibilidade e quando devo usá-la?

A árvore de acessibilidade fornece informações semânticas sobre os elementos da página (funções, nomes, estados). Use `get_accessibility` quando:
- `get_visible_elements` não retornar os elementos esperados
- Você precisar encontrar elementos por função de acessibilidade (botão, link, caixa de texto, etc.)
- Você precisar de informações semânticas detalhadas sobre elementos

"Obtenha árvore de acessibilidade filtrada para funções de botão e link"

---

## Gerenciamento de Sessão

### Posso ter várias sessões ao mesmo tempo?

Não. O servidor MCP usa um modelo de sessão única. Apenas uma sessão de navegador ou aplicativo pode estar ativa por vez.

### O que acontece quando fecho uma sessão?

Depende do tipo de sessão e configurações:

-   **Navegador:** O Chrome fecha completamente
-   **Mobile com `noReset: false`:** O aplicativo é encerrado
-   **Mobile com `noReset: true` ou sem `appPath`:** O aplicativo permanece aberto (a sessão se desconecta automaticamente)

### Posso preservar o estado do aplicativo entre sessões?

Sim! Use a opção `noReset`:

"Inicie meu aplicativo com noReset ativado"

Isso preserva o estado de login, preferências e outros dados do aplicativo.

### Qual a diferença entre fechar e desconectar?

-   **Fechar:** Encerra o navegador/aplicativo completamente
-   **Desconectar:** Desconecta a automação mas mantém o navegador/aplicativo em execução

Desconectar é útil quando você quer inspecionar manualmente o estado após a automação.

### Minha sessão continua expirando durante a depuração

Aumente o tempo limite de comando:

"Inicie meu aplicativo com newCommandTimeout de 300 segundos"

O padrão é 60 segundos. Para sessões longas de depuração, tente 300-600 segundos.

---

## Solução de Problemas

### Erro "Session not found"

Isso significa que não existe sessão ativa. Inicie primeiro uma sessão de navegador ou aplicativo:

"Inicie o Chrome e navegue até google.com"

### Erro "Element not found"

O elemento pode não estar visível ou pode ter um seletor diferente. Tente:

1. Pedir ao Claude para obter primeiro todos os elementos visíveis
2. Fornecer um seletor mais específico
3. Aguardar o carregamento completo da página/aplicativo
4. Usar `inViewportOnly: false` para encontrar elementos fora da tela

### O navegador não inicia

1. Certifique-se de que o Chrome está instalado
2. Verifique se outro processo está usando a porta de depuração (9222)
3. Tente o modo headless

### Falha na conexão com Appium

Este é o problema mais comum ao iniciar a automação móvel.

1. **Verifique se o Appium está em execução**: `curl http://localhost:4723/status`
2. Inicie o Appium se necessário: `appium`
3. Verifique se a configuração da URL do Appium corresponde ao servidor
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

1. Configure `ANDROID_HOME`: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. Verifique os emuladores: `emulator -list-avds`
3. Inicie o emulador manualmente: `emulator -avd <avd-name>`
4. Verifique se o dispositivo está conectado: `adb devices`

### As capturas de tela não estão funcionando

1. Para dispositivos móveis, certifique-se de que a sessão está ativa
2. Para navegador, tente uma página diferente (algumas páginas bloqueiam capturas de tela)
3. Verifique os logs do Claude Desktop para erros

As capturas de tela são automaticamente comprimidas para no máximo 1MB, então capturas grandes funcionarão mas podem ter qualidade inferior.

---

## Desempenho

### Por que a automação móvel é lenta?

A automação móvel envolve:
1. Comunicação de rede com o servidor Appium
2. Appium se comunicando com o dispositivo/simulador
3. Renderização e resposta do dispositivo

Dicas para automação mais rápida:
-   Use emuladores/simuladores em vez de dispositivos reais para desenvolvimento
-   Use IDs de acessibilidade em vez de XPath
-   Ative `inViewportOnly: true` para detecção de elementos
-   Use paginação (`limit`) para reduzir o uso de tokens

### Como posso acelerar a detecção de elementos?

O servidor MCP já otimiza a detecção de elementos usando análise da fonte da página XML (2 chamadas HTTP vs 600+ para consultas de elementos tradicionais). Dicas adicionais:

-   Mantenha `inViewportOnly: true` (padrão)
-   Configure `includeContainers: false` (padrão)
-   Use `limit` e `offset` para paginação em telas grandes
-   Use seletores específicos em vez de encontrar todos os elementos

### Capturas de tela são lentas ou falham

As capturas de tela são automaticamente otimizadas:
- Redimensionadas se maiores que 2000px
- Comprimidas para ficar abaixo de 1MB
- Convertidas para JPEG se o PNG for muito grande

Esta otimização reduz o tempo de processamento e garante que o Claude possa lidar com a imagem.

---

## Limitações

### Quais são as limitações atuais?

-   **Sessão única:** Apenas um navegador/aplicativo por vez
-   **Suporte a navegador:** Apenas Chrome (por enquanto)
-   **Suporte a iframe:** Suporte limitado para iframes
-   **Uploads de arquivos:** Não suportados diretamente via ferramentas
-   **Áudio/Vídeo:** Não pode interagir com reprodução de mídia
-   **Extensões de navegador:** Não suportadas

### Posso usar isso para testes de produção?

O WebdriverIO MCP é projetado para automação interativa assistida por IA. Para testes de produção em CI/CD, considere usar o test runner tradicional do WebdriverIO com controle programático completo.

---

## Segurança

### Meus dados estão seguros?

O servidor MCP é executado localmente em sua máquina. Toda a automação acontece através de conexões locais com o navegador/Appium. Nenhum dado é enviado para servidores externos além do que você explicitamente navega.

### O Claude pode acessar minhas senhas?

O Claude pode ver o conteúdo da página e interagir com elementos, mas:
-   Senhas em campos `<input type="password">` são mascaradas
-   Você deve evitar automatizar credenciais sensíveis
-   Use contas de teste para automação

---

## Contribuindo

### Como posso contribuir?

Visite o [repositório GitHub](https://github.com/webdriverio/mcp) para:
-   Relatar bugs
-   Solicitar recursos
-   Enviar pull requests

### Onde posso obter ajuda?

-   [Discord do WebdriverIO](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [Documentação do WebdriverIO](https://webdriver.io/)