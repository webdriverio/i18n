---
id: headless-and-display-servers
title: Headless e Servidores de Display
description: Execute navegadores com interface e aplicativos desktop em CI Linux e em contêineres com o display virtual Weston ou Xvfb que o testrunner inicia, incluindo suas opções, receitas de CI e solução de problemas.
---

No Linux, quando nenhum display está disponível, o testrunner inicia um servidor de display virtual para a execução: [Weston](https://gitlab.freedesktop.org/wayland/weston) em modo headless ou, como alternativa, [Xvfb](https://xorg.freedesktop.org/archive/current/doc/man/man1/Xvfb.1.xhtml) (X Virtual Framebuffer). Esta página explica quando isso acontece, como configurá-lo e como ele se comporta em CI e no Docker. Na maioria das configurações, tudo o que você precisa é ter o Weston ou o Xvfb instalado na sua imagem, ou `displayServerAutoInstall: true` na sua configuração.

## Quando usar um display virtual vs headless nativo

O display virtual fornece uma tela a navegadores e aplicativos onde não existe nenhuma, como em runners de CI e em contêineres. Mantenha-o quando:

- Você testa aplicativos desktop, que precisam de uma janela real.
- Seus testes precisam de um navegador com interface, por exemplo, para corresponder a baselines de screenshots tirados com um navegador visível.
- O Chrome falha ao iniciar com `DevToolsActivePort file doesn't exist` ou `user data directory is already in use`, conforme descrito em [Solução de problemas](#troubleshooting).

Para testes de navegador que não precisam de uma janela visível, o modo headless nativo, como o `--headless=new` do Chrome, tem menos sobrecarga. Defina `displayServerEnabled: false` junto com ele, caso contrário o testrunner ainda inicia um servidor de display. Faça o mesmo quando todos os seus navegadores rodam em um serviço de nuvem ou em um grid remoto, já que nada local precisa de um display.

## Como funciona

O testrunner inicia um servidor de display antes do hook `onPrepare` de qualquer serviço e define seu ambiente em `process.env`:

| Variável | Weston | Xvfb |
|----------|--------|------|
| `WAYLAND_DISPLAY` | `wayland-0` | não definida |
| `DISPLAY` | não definida | o primeiro display livre, como `:0` |
| `XDG_RUNTIME_DIR` | um diretório privado em `/tmp` para a execução | inalterada |
| `XDG_SESSION_TYPE`, `GDK_BACKEND`, `ELECTRON_OZONE_PLATFORM_HINT` | `wayland` | `x11` |

Os workers herdam essas variáveis, assim como os drivers e aplicativos que os serviços iniciam em `onPrepare`. Navegadores e toolkits de GUI escolhem Wayland ou X11 a partir delas. No Weston, o `XDG_RUNTIME_DIR` privado substitui qualquer valor que você tivesse para a execução.

O servidor de display continua rodando até que os hooks `onComplete` terminem, para que os serviços ainda possam usá-lo durante o encerramento. Em seguida, o testrunner o interrompe e restaura os valores anteriores. Se o processo for encerrado antes, inclusive com Ctrl+C, o servidor de display é encerrado junto.

O testrunner só inicia um servidor de display quando todas estas condições são verdadeiras:

- Ele roda no Linux.
- Nem `DISPLAY` nem `WAYLAND_DISPLAY` estão definidas.
- `displayServerEnabled` não é `false`.

Se um display já existir, o testrunner o utiliza e não inicia nada. Com apenas `WAYLAND_DISPLAY` definida, por exemplo, por um Weston que seu CI inicia, o testrunner ainda define `XDG_SESSION_TYPE`, `GDK_BACKEND` e `ELECTRON_OZONE_PLATFORM_HINT` como `wayland` para a execução. Isso garante que os navegadores usem o display correto, sobrescrevendo valores herdados, como `XDG_SESSION_TYPE=tty` de um login SSH, que os enviariam para o X11, onde não há servidor. Ele faz isso mesmo com `displayServerEnabled: false`, que controla apenas se um servidor de display é iniciado.

### Qual servidor de display é usado

Com o padrão `displayServer: 'auto'`, o testrunner tenta primeiro o Weston e depois o Xvfb. Servidores já instalados são tentados antes de qualquer instalação, então um Xvfb existente é usado em vez de instalar o Weston. Se o Weston falhar ao iniciar, o testrunner recorre ao Xvfb. Se nenhum servidor de display iniciar, o testrunner registra um aviso e a execução continua sem ele. Com `displayServer: 'wayland'` ou `displayServer: 'xvfb'`, o testrunner tenta apenas esse servidor.

O Weston 10 e versões posteriores são suportados. O Ubuntu 22.04 e o Debian 11 vêm com o Weston 9, e o Enterprise Linux 9 com EPEL habilitado obtém o Weston 8, então defina `displayServer: 'xvfb'` nesses casos. O Weston inicia sem Xwayland, portanto não fornece `DISPLAY`. Se seus testes ou ferramentas precisam de X11, por exemplo `xdotool`, `xclip` ou um aplicativo Java, defina `displayServer: 'xvfb'`.

### Foco da janela

Todos os workers usam o mesmo display. No WebdriverIO v9, cada worker era envolvido em `xvfb-run` e recebia seu próprio display, de modo que seu navegador sempre tinha foco. Navegadores baseados em Chromium, como Chrome e Edge, agora podem ficar sem foco: no Weston nenhuma janela recebe foco e, no Xvfb, apenas a janela aberta mais recentemente o tem. A entrada do WebDriver ainda chega à página, mas `document.hasFocus()` retorna `false`, eventos `focus` não são disparados e estilos `:focus` não são aplicados. Se seus testes dependem de foco, ative a emulação de foco, um comando experimental do Chrome DevTools Protocol (CDP) que persiste entre carregamentos de página:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    before: async () => {
        if (browser.isChromium) {
            await browser.sendCommandAndGetResult('Emulation.setFocusEmulationEnabled', { enabled: true })
        }
    }
}
```

O Firefox não é afetado, já que, sob o WebDriver, ele trata suas páginas como focadas.

### Scripts standalone

O testrunner inicia o servidor de display por conta própria. Um script standalone que chama `remote()` pode iniciar um com `startDisplayDaemonFromConfig` de `@wdio/display-server`. Ele aceita as mesmas opções `displayServer*`, define as variáveis do display em `process.env` para que o navegador as herde e as restaura em `stop()`:

```ts title="standalone.ts"
import { remote } from 'webdriverio'
import { startDisplayDaemonFromConfig } from '@wdio/display-server'

// null fora do Linux, quando já existe um display X11, ou quando nenhum inicia. Com um display
// Wayland existente, retorna um handle cujo stop() restaura as variáveis de sessão que definiu.
const display = await startDisplayDaemonFromConfig({ displayServerAutoInstall: true })
try {
    const browser = await remote({ capabilities: { browserName: 'chrome' } })
    // ...
    await browser.deleteSession()
} finally {
    await display?.stop()
}
```

Você também pode executar o script com `xvfb-run`, como em [Usando um display existente](#using-an-existing-display).

## Configuração do navegador

### Navegadores que o WebdriverIO inicia

Estes navegadores não precisam de configuração:

- Chrome e Edge 140 e posteriores, e Chrome for Testing 135 e posteriores, seguem o `XDG_SESSION_TYPE=wayland` que o servidor de display define.
- Versões mais antigas do Chrome e do Edge ignoram `XDG_SESSION_TYPE`. Para elas, o WebdriverIO adiciona `--ozone-platform=wayland` aos args de todo Chrome e Edge que inicia enquanto o Wayland está ativo sem um servidor X, a menos que os args já definam `--ozone-platform` ou `--headless`.
- Aplicativos Electron: Electron 38 e posteriores seguem `XDG_SESSION_TYPE`, e Electron 28 a 37 seguem `ELECTRON_OZONE_PLATFORM_HINT`, que o servidor de display também define. Electron 27 e anteriores dependem da flag `--ozone-platform=wayland`, que o WebdriverIO adiciona quando inicia o aplicativo via Chromedriver.
- Firefox e aplicativos GTK, como aplicativos Tauri, escolhem Wayland a partir de `WAYLAND_DISPLAY` e `GDK_BACKEND`. Firefox anterior ao 120 não foi testado.

### Navegadores que o WebdriverIO não inicia

Navegadores em um grid ou serviço de nuvem não precisam de configuração, já que rodam no display do host remoto.

Navegadores locais iniciados por outra coisa, como um driver que você iniciou, um servidor Appium ou o launcher próprio de um serviço, não recebem a flag `--ozone-platform=wayland` do WebdriverIO. Chrome e Edge 140 e posteriores, e Electron 28 e posteriores, não precisam dela, já que seguem as variáveis de sessão, mas versões mais antigas do Chrome e do Edge precisam. O que fazer depende de quando o navegador inicia:

- **Durante a execução**, por exemplo, a partir do `onPrepare` de um serviço, navegadores mais novos não precisam de nada, já que herdam o display e as variáveis de sessão. Para versões mais antigas do Chrome e do Edge, faça uma das opções:
  - defina `displayServer: 'xvfb'` para usar o Xvfb, ou
  - defina `displayServer: 'wayland'` e adicione `--ozone-platform=wayland` aos args deles para usar o Weston.
- **Antes do WebdriverIO**, por exemplo, a partir de uma etapa anterior do CI ou de outro shell, eles não podem usar um servidor de display que o WebdriverIO inicia, já que não herdam suas variáveis. Inicie o display você mesmo, como em [Usando um display existente](#using-an-existing-display), e faça uma das opções:
  - use o Xvfb, que não precisa de mais nada, ou
  - use o Weston, então exporte `XDG_SESSION_TYPE=wayland` (Chrome e Edge 140 e posteriores, Electron 38 e posteriores) ou `ELECTRON_OZONE_PLATFORM_HINT=wayland` (Electron 28 a 37), e adicione `--ozone-platform=wayland` aos args de versões mais antigas do Chrome e do Edge.

## Configuração

Todas as opções estão listadas na [referência de configuração](/docs/configuration#displayserverenabled). Por exemplo:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Instala um servidor de display se nenhum estiver instalado
    displayServerAutoInstall: true
}
```

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    // Sempre usa o Xvfb em um tamanho menor, instalado por um comando personalizado que pressupõe um contêiner root
    displayServer: 'xvfb',
    displayServerAutoInstall: true,
    displayServerAutoInstallCommand: 'apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb',
    displayServerWidth: 1280,
    displayServerHeight: 720
}
```

O comando personalizado é compartilhado pelos dois servidores. Com `displayServer: 'auto'`, ele roda primeiro para o Weston e novamente para o Xvfb somente se o Weston ainda não estiver disponível ou falhar ao iniciar e o Xvfb ainda estiver ausente. Defina `displayServer` como o servidor que seu comando instala, como faz este exemplo.

As opções `autoXvfb` e `xvfb*` do v9 estão obsoletas e serão removidas no v11. Consulte o [guia de migração para o v10](/docs/v10-migration#virtual-displays-on-linux) para ver suas substituições.

## CI e Docker

Pré-instale um servidor de display na sua imagem ou defina `displayServerAutoInstall: true` para instalar um quando a execução começar.

### Pré-instalando um servidor de display

#### Weston

No Ubuntu 24.04 ou Debian 12 e posteriores:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y weston
```

No RHEL 10 e no Oracle Linux 10, habilite o EPEL e o CodeReady Builder você mesmo, seguindo a [documentação do EPEL](https://docs.fedoraproject.org/en-US/epel/getting-started/), e depois instale o `weston`.

Para envolver o testrunner em um Weston próprio, como em [Usando um display existente](#using-an-existing-display), instale também o `xwayland-run`. Ele está empacotado para Debian 13, Ubuntu 24.04, Fedora e openSUSE Tumbleweed. Sem ele, você precisa iniciar o Weston em segundo plano com seus próprios `XDG_RUNTIME_DIR` e `WAYLAND_DISPLAY`, e aguardar seu socket antes de iniciar o WebdriverIO. Como alternativa, use o Xvfb.

#### Xvfb

No Ubuntu ou Debian:

```Dockerfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y xvfb
```

O Ubuntu 22.04 e o Debian 11 vêm com um Weston antigo demais, então use o Xvfb nesses casos. Com apenas o Xvfb instalado, o testrunner o utiliza sem configuração adicional.

Para outras distribuições, use os nomes de pacotes em [Suporte à instalação automática](#automatic-installation-support).

### Usando um display existente

Se seu CI já fornece um display, o testrunner o utiliza e não inicia nada.

Para usar o Weston, envolva o testrunner com `wlheadless-run` do pacote `xwayland-run`. Ele fornece ao Weston um diretório de runtime privado e aguarda seu socket, e as flags correspondem ao Weston que o testrunner inicia:

```sh
wlheadless-run -c weston --renderer=pixman --idle-time=0 -- npx wdio run wdio.conf.ts
```

Para usar o Xvfb, envolva o testrunner com `xvfb-run`:

```sh
xvfb-run -a npx wdio run wdio.conf.ts
```

## Suporte à instalação automática

`displayServerAutoInstall` funciona com os gerenciadores de pacotes abaixo. As instalações são não interativas e expiram após 240 segundos. Com qualquer outro gerenciador de pacotes, instale o servidor de display você mesmo.

| Gerenciador de pacotes | Distribuições | Weston | Xvfb |
|-----------------|---------------|--------|------|
| `apt-get` | Ubuntu, Debian | `weston` | `xvfb` |
| `dnf` | Fedora, CentOS Stream, RHEL, Rocky Linux, AlmaLinux | `weston` | `xorg-x11-server-Xvfb` |
| `zypper` | openSUSE, SUSE Linux Enterprise | `weston` | `xvfb-run` |
| `pacman` | Arch Linux, Manjaro | `weston` | `xorg-server-xvfb` |
| `apk` | Alpine Linux | `weston` `weston-backend-headless` `weston-shell-desktop` | `xvfb-run` |
| `xbps-install` | Void Linux | `weston` | `xvfb-run` |

- No Arch Linux, a instalação executa `pacman -Syu`, uma atualização completa do sistema, já que o Arch não suporta atualizações parciais. Em uma imagem desatualizada, isso pode exceder o limite de 240 segundos, então pré-instale o servidor de display nesse caso.
- O Enterprise Linux 10 não tem Xvfb e disponibiliza o Weston apenas no EPEL, que precisa do CRB. No CentOS Stream, AlmaLinux e Rocky Linux, a instalação habilita ambos e os deixa habilitados. No RHEL e no Oracle Linux, configure-os você mesmo, como em [Pré-instalando um servidor de display](#preinstalling-a-display-server).

## Logs

O servidor de display roda no processo do launcher, então suas mensagens ficam no log do launcher: `wdio.log` no seu `outputDir`, ou o terminal se `outputDir` não estiver definido. O log mostra qual servidor de display foi iniciado e as variáveis que ele definiu. Para mais detalhes, aumente seu nível de log:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    // ...
    outputDir: './logs',
    logLevels: { '@wdio/display-server': 'debug' }
}
```

## Solução de problemas

### O Chrome falha com `DevToolsActivePort file doesn't exist`

A mensagem completa é `Chrome failed to start: exited abnormally. (DevToolsActivePort file doesn't exist)`. Uma causa comum é um Chrome com interface sem display para abrir sua janela. Verifique no [log do launcher](#logs) qual servidor de display foi iniciado. Se nenhum foi, consulte [O log do launcher mostra `No display server could be started`](#the-launcher-log-shows-no-display-server-could-be-started). Se seus testes não precisam de uma janela visível, use o modo headless nativo, como em [Quando usar um display virtual vs headless nativo](#when-to-use-a-virtual-display-vs-native-headless).

### O Chrome falha com `user data directory is already in use`

A mensagem completa começa com `session not created: probably user data directory is already in use`. Ela costuma ser enganosa: geralmente significa que o navegador travou e reiniciou com o diretório de perfil da instância anterior. Um display estável frequentemente resolve o problema. Caso contrário, passe um `--user-data-dir` exclusivo por worker.

### O log do launcher mostra `No display server could be started`

A mensagem completa é `No display server could be started; continuing without a virtual display`. Nenhum servidor de display está instalado, ou nenhum foi iniciado. As mensagens anteriores explicam o motivo:

- `wayland not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.` ou `xvfb not found. To enable auto-install, set 'displayServerAutoInstall: true' in your WDIO config.`: nada está instalado e a instalação automática está desativada.
- `wayland failed to start: ...` ou `xvfb failed to start: ...`: a saída de erro do servidor vem em seguida.
- `Failed to install Weston` ou `Failed to install Xvfb`: a instalação falhou.
- `wayland still not found after installing` ou `xvfb still not found after installing`: a instalação foi bem-sucedida, mas não forneceu esse servidor, por exemplo, porque um `displayServerAutoInstallCommand` personalizado instala apenas o outro. Defina `displayServer` como o servidor que seu comando instala.

Instale o Weston ou o Xvfb na sua imagem, ou defina `displayServerAutoInstall: true`.

### O Xvfb encerra com `Failed to find a socket to listen on`

O Xvfb cria seu socket em `/tmp/.X11-unix`. Se esse diretório existir, ele deve ter permissão de escrita para o usuário de teste, como acontece com o modo `1777`.

### Chrome ou Electron falha no Weston com `Missing X server or $DISPLAY`

O navegador tentou usar X11 em vez de Wayland. Se o WebdriverIO não o iniciou, consulte [Navegadores que o WebdriverIO não inicia](#browsers-webdriverio-doesnt-launch). Caso contrário, remova `--ozone-platform=x11` dos args dele.

### Testes dependentes de foco falham no Chrome ou Edge

`document.hasFocus()` retorna `false` porque as páginas no display compartilhado podem ficar sem foco. Ative a emulação de foco, como em [Foco da janela](#window-focus).

### Uma ferramenta ou aplicativo X11 falha no Weston com `cannot open display` ou `Can't open display`

O Weston não fornece `DISPLAY`. Defina `displayServer: 'xvfb'` para que o testrunner inicie o Xvfb em vez dele. Se você mesmo iniciou o Weston, envolva a execução com `xvfb-run`, já que o testrunner usa um display existente em vez de iniciar um.

## Próximos passos

- Referência de [Configuração](/docs/configuration#displayserverenabled) para todas as opções `displayServer*`.
- [Guia de migração para o v10](/docs/v10-migration#virtual-displays-on-linux) para as substituições das opções `autoXvfb` e `xvfb*` do v9.
- [Docker](/docs/docker) e [GitHub Actions](/docs/githubactions) para executar sua suíte em CI.
- [Aplicativos Desktop](/docs/platforms/desktop#linux) para Electron, Tauri e Dioxus no Linux.