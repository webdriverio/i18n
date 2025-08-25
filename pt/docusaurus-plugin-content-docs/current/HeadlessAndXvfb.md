---
id: headless-and-xvfb
title: Headless & Xvfb com o Testrunner
description: Como o WebdriverIO usa o Xvfb para testes headless no Linux, opções de configuração, receitas para CI e solução de problemas.
---

Esta página explica como o testrunner do WebdriverIO suporta execução headless no Linux usando Xvfb (X Virtual Framebuffer). Ela aborda quando o Xvfb é útil, como configurá-lo e como ele se comporta em CI e Docker.

## Quando usar Xvfb vs headless nativo

- Use headless nativo (por exemplo, Chrome `--headless=...`) quando possível para overhead mínimo.
- Use Xvfb quando:
  - Testar Electron ou aplicativos que necessitam de um gerenciador de janelas ou ambiente desktop
  - Você depende de comportamentos dependentes de GLX ou do gerenciador de janelas
  - Suas ferramentas esperam um servidor de exibição (`DISPLAY`)
  - Você encontra erros do Chromium como:
    - `session not created: probably user data directory is already in use ...`
    - `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`
    O erro de colisão do diretório de dados do usuário pode ser enganoso, pois geralmente é resultado de uma falha no navegador e reinicialização imediata que reutiliza o mesmo diretório de perfil da instância anterior. Garantir uma exibição estável (por exemplo, via Xvfb) frequentemente resolve isso - se não, você deve passar um `--user-data-dir` único por worker.

## Configuração

Quatro opções do runner controlam o comportamento do Xvfb:

- `autoXvfb` (booleano, padrão: true)
  - Alternância autoritativa para uso. Se `false`, o runner nunca usa Xvfb.
  - Se `true`, o runner pode usar Xvfb quando necessário.

- `xvfbAutoInstall` (booleano, padrão: false)
  - Habilita a instalação automática de `xvfb-run` se estiver faltando
  - Quando false, o runner irá avisar e continuar sem instalar

- `xvfbAutoInstallMode` ('root' | 'sudo', padrão: 'sudo')
  - 'root': instala apenas se estiver executando como root (sem sudo)
  - 'sudo': permite sudo não interativo (`sudo -n`) se não for root; pula se o sudo estiver faltando

- `xvfbAutoInstallCommand` (string | string[], opcional)
  - Comando personalizado a ser usado para instalação em vez da detecção do gerenciador de pacotes integrado
  - Quando fornecido, este comando é executado como está e substitui a lógica de instalação integrada

- `xvfbMaxRetries` (número, padrão: 3)
  - Número de tentativas de repetição para falhas do processo xvfb.
  - Útil para ambientes CI instáveis onde a inicialização do Xvfb pode ocasionalmente falhar.

- `xvfbRetryDelay` (número, padrão: 1000)
  - Atraso base entre tentativas em milissegundos para falhas do processo xvfb.
  - Usa atraso progressivo: atraso × número da tentativa (por exemplo, 1000ms, 2000ms, 3000ms, etc.).

Exemplos:

```ts
export const config: WebdriverIO.Config = {
  // Use Xvfb quando necessário
  autoXvfb: true,

  // Auto-instala pacotes Xvfb usando sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Use Xvfb quando necessário
  autoXvfb: true,

  // Auto-instala pacotes Xvfb usando um comando personalizado e sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',
  xvfbAutoInstallCommand: 'curl -L https://github.com/X11/xvfb/releases/download/v1.20.14/xvfb-linux-x64.tar.gz | tar -xz -C /usr/local/bin/',

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

```ts
export const config: WebdriverIO.Config = {
  // Use Xvfb quando necessário
  autoXvfb: true,

  // Auto-instala pacotes Xvfb usando sudo
  xvfbAutoInstall: true,
  xvfbAutoInstallMode: 'sudo',

  // Configura comportamento de repetição para ambientes CI instáveis
  xvfbMaxRetries: 5,
  xvfbRetryDelay: 1500,

  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': { args: ['--headless=new', '--no-sandbox'] }
  }]
}
```

## Lógica de detecção

- O runner considera o Xvfb quando:

  - Executando no Linux
  - Nenhum `DISPLAY` está definido (ambiente headless), ou flags de navegador headless são passadas

- Se `DISPLAY` estiver definido, o runner não forçará o Xvfb por padrão e respeitará seu servidor X/gerenciador de janelas existente.

Notas:
- `autoXvfb: false` desativa completamente o uso do Xvfb (sem envolvimento com `xvfb-run`).
- `xvfbAutoInstall` afeta apenas a instalação se `xvfb-run` estiver faltando; não ativa/desativa o uso.
- `xvfbAutoInstallMode` controla o método de instalação: 'root' para instalações apenas com root, 'sudo' para instalações baseadas em sudo (padrão: 'sudo').
- Instalações de pacotes integradas são sempre não interativas. Apenas root, a menos que você opte pelo modo 'sudo'.
- O mecanismo de repetição usa atrasos progressivos: `xvfbRetryDelay × número da tentativa` (por exemplo, 1000ms, 2000ms, 3000ms, etc.).

## Usando um DISPLAY existente em CI

Se seu CI configura seu próprio servidor X/gerenciador de janelas (por exemplo, com `Xvfb :99` e um WM), você pode:

- Manter `autoXvfb: true` e garantir que `DISPLAY` seja exportado; o runner irá respeitá-lo e evitar o envolvimento.
- Ou definir `autoXvfb: false` para desativar explicitamente qualquer comportamento Xvfb do runner.

## Receitas para CI e Docker

GitHub Actions (usando headless nativo):

```yaml
- name: Run tests
  run: npx wdio run ./wdio.conf.ts
```

GitHub Actions (display virtual via Xvfb se faltando e optado):

```ts
// wdio.conf.ts
export const config = {
  autoXvfb: true,
  xvfbAutoInstall: true
}
```

Docker (exemplo Ubuntu/Debian – pré-instalação do xvfb):

```Dockerfile
RUN apt-get update -qq && apt-get install -y xvfb
```

Para outras distribuições, ajuste o gerenciador de pacotes e o nome do pacote de acordo (por exemplo, `dnf install xorg-x11-server-Xvfb` no Fedora/baseado em RHEL, `zypper install xvfb-run` no openSUSE/SLE).

## Suporte à instalação automática (xvfbAutoInstall)

Quando `xvfbAutoInstall` está habilitado, o WebdriverIO tenta instalar o `xvfb` usando o gerenciador de pacotes do seu sistema. Os seguintes gerenciadores e pacotes são suportados:

| Gerenciador de Pacotes | Comando         | Distribuições (exemplos)                                    | Nome(s) do Pacote                |
|------------------------|-----------------|-------------------------------------------------------------|----------------------------------|
| apt                    | `apt-get`       | Ubuntu, Debian, Pop!_OS, Mint, Elementary, Zorin, etc.      | `xvfb`                           |
| dnf                    | `dnf`           | Fedora, Rocky Linux, AlmaLinux, Nobara, Bazzite, etc.       | `xorg-x11-server-Xvfb`           |
| yum                    | `yum`           | CentOS, RHEL (legacy)                                       | `xorg-x11-server-Xvfb`           |
| zypper                 | `zypper`        | openSUSE, SUSE Linux Enterprise                             | `xvfb-run`                       |
| pacman                 | `pacman`        | Arch Linux, Manjaro, EndeavourOS, CachyOS, etc.             | `xorg-server-xvfb`               |
| apk                    | `apk`           | Alpine Linux, PostmarketOS                                  | `xvfb-run`                       |
| xbps-install          | `xbps-install`  | Void Linux                                                  | `xvfb`                           |

Notas:
- Se seu ambiente usar um gerenciador de pacotes diferente, a instalação falhará com um erro; instale o `xvfb` manualmente.
- Os nomes dos pacotes são específicos da distribuição; a tabela reflete os nomes comuns por família.

## Solução de problemas

- "xvfb-run falhou ao iniciar"
  - O runner automaticamente repete falhas relacionadas ao Xvfb com recuo progressivo. Se as falhas persistirem, aumente `xvfbMaxRetries` e `xvfbRetryDelay` para ambientes instáveis.

- Xvfb envolvido inesperadamente em CI
  - Se você tem uma configuração personalizada de `DISPLAY` / WM, defina `autoXvfb: false` ou garanta que `DISPLAY` seja exportado antes do runner iniciar.

- Faltando `xvfb-run`
  - Mantenha `xvfbAutoInstall: false` para evitar modificar o ambiente; instale via sua imagem base ou defina `xvfbAutoInstall: true` para optar por isso.

- Falhas frequentes na inicialização do Xvfb em CI
  - Aumente `xvfbMaxRetries` (por exemplo, para 5-10) e `xvfbRetryDelay` (por exemplo, para 2000ms) para um comportamento mais resiliente em ambientes instáveis.

## Avançado

- O runner cria processos através de uma fábrica que envolve o worker do node com `xvfb-run` se o Xvfb for necessário e estiver disponível.
- Flags de navegador headless (Chrome/Edge/Firefox) sinalizam o uso headless e podem acionar o Xvfb em ambientes sem um `DISPLAY`.