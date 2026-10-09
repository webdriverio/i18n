---
id: metadata
title: Metadados
description: "Inspecione as capabilities, o ambiente e o tempo de execução de cada sessão do navegador na aba Metadata do DevTools para diagnosticar falhas específicas de ambiente."
---

Inspecione o contexto completo de cada sessão do navegador que seu teste abre. A aba Metadata exibe as capabilities, o ambiente e o tempo de execução por trás de cada execução, para que você possa confirmar exatamente o que estava sendo testado sem precisar vasculhar logs.

**O Que É Capturado:**
- **Capabilities da sessão** - Nome e versão do navegador, plataforma e as capabilities do WebDriver negociadas
- **Detalhes da sessão** - ID da sessão, URL base e tamanho da viewport
- **Tempo de execução** - Duração do teste, status e timestamps de início/fim
- **Visualização por sessão** - Cada sessão do navegador (incluindo sessões criadas por `browser.reloadSession()`) é preservada de forma independente e pode ser selecionada a partir de um menu suspenso

Isso é inestimável para diagnosticar falhas específicas de ambiente, verificar se as capabilities corretas foram aplicadas e entender como os testes com múltiplas sessões se comportaram.

## Demonstração

### 📋 Metadados
![Metadata Demo](/img/devtools/metadata.gif)