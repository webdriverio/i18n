---
id: session
title: wdio session
description: Controle um navegador, aplicativo móvel ou aplicativo desktop a partir do shell com comandos curtos do wdio session e, em seguida, exporte os passos como um teste.
---

`wdio session` mantém uma única sessão do WebdriverIO ativa ao longo de vários comandos curtos no shell. Use-o para explorar uma interface, verificar uma alteração e transformar os passos que funcionaram em um teste. Ele faz parte do `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

A sessão se chama `default`. Passe `-s <name>` apenas quando precisar de duas sessões ao mesmo tempo. A página de [targets](/docs/session/targets) controla um mesmo app Expo de teste (guinea pig) em uma janela do Chrome com interface visível e em uma janela do Electron, ambas em tamanho de desktop. Os comandos de Android e iOS para o mesmo app estão nessa página.

## Instalação

`wdio session` faz parte da CLI do WebdriverIO. `npx wdio` instala o pacote sem escopo [`wdio`](https://www.npmjs.com/package/wdio) e executa essa CLI. Você não precisa instalar o `@wdio/session` por conta própria.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` exibe o fluxo de trabalho, as ações agrupadas, as flags globais e os códigos de saída. `<action> --help` exibe os argumentos, flags, plataformas, exemplos e ações relacionadas daquela ação. O mesmo texto está na página de [commands](/docs/session-commands). A skill do agente mantém apenas o ciclo principal e direciona os agentes para o `--help` para o restante, de modo que ela não fica desatualizada quando a CLI muda.

Crie a estrutura de um projeto com:

```sh
npm init wdio@latest
```

Aceite "Set up coding agent support" para gerar `.agents/skills/wdio-session/SKILL.md`, uma seção no `AGENTS.md` e uma entrada `.wdio/session/` no gitignore. Instale a skill posteriormente com:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` verifica o Node.js, o navegador, o Appium, os SDKs e as credenciais de nuvem. `doctor <target>` verifica apenas o que aquele target precisa. O processo termina com código 1 quando uma verificação falha.

## Abrir uma página e interagir com ela

Abra o Chrome em modo headless (adicione `--headed` para exibir a janela). `open` exibe os elementos interativos da página:

```sh
npx wdio session open chrome http://localhost:3000
```

Um elemento tem a aparência `button "Add to cart" [ref=e3]`. Use essa ref. Cada ação informa o que ela alterou na página, com refs para os novos elementos, então raramente você precisará de um `snapshot` separado:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` e `open safari` aceitam a mesma URL. Chrome, Firefox e Edge são baixados no primeiro uso quando não estão instalados. O Safari requer macOS.

### Android

Android e iOS são executados por meio do Appium 3. `doctor android` informa a ausência de um servidor ou driver junto com o comando de instalação.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Desktop nativo: `open macos --bundle-id com.example.shop` e `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` e `open dioxus ./my-app` precisam que o respectivo driver esteja no `PATH`. No Linux sem `DISPLAY` ou `WAYLAND_DISPLAY`, instale o Xvfb ou o weston.

## Observação e refs

| Comando | Use para |
| --- | --- |
| `snapshot --interactive` | Os elementos com os quais você pode interagir, cada um com uma ref |
| `snapshot --compact` | A mesma árvore sem os wrappers vazios e sem nome |
| `snapshot --urls` | Os endereços de cada link |
| `find "Add to cart"` | Uma linha de um snapshot novo |
| `diff` | O que mudou desde o snapshot anterior |
| `screenshot` | Layout. Dispense-o quando um snapshot responder à pergunta |
| `pdf` | Um PDF da página atual (`pdf report.pdf`). Sessões BiDi imprimem nos modos headed e headless |
| `source` | O HTML da página ou o XML nativo |

As refs vêm do snapshot mais recente. Após uma navegação, tire um novo snapshot. Uma ref antiga falha com `REF_STALE`. Uma ref desconhecida falha com `REF_NOT_FOUND`.

## `exec`

`exec` executa código WebdriverIO. Sempre use `await` nos comandos. `$` retorna um elemento e lança um erro quando ele não existe. Não há modo síncrono nem `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Coloque as asserções no `exec` com `expect-webdriverio`. Use `visual check <tag>` (requer `@wdio/visual-service`) quando a questão for a aparência da tela.

## Exportar

`export` gera uma spec a partir dos passos gravados. As refs são substituídas por seletores estáveis.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` e `open safari` aceitam a mesma URL. Outros targets, snapshots, `exec`, exportação e uma execução de teste pausada são páginas separadas nesta seção.

## Esta seção

| Página | Use para |
| --- | --- |
| [Targets](/docs/session/targets) | Navegadores, Android, iOS, desktop, Electron, Tauri, Dioxus e dispositivos na nuvem, incluindo o app de demonstração no Chrome, Android e Electron |
| [Snapshots e refs](/docs/session/snapshots) | O que está na tela e as refs em que você clica |
| [Executar código](/docs/session/exec) | `exec`, asserções e verificações visuais |
| [Exportar um teste](/docs/session/export) | Specs, page objects e `.wdio/helpers` |
| [Depurar um teste](/docs/session/debug) | `wdio run --debug=agent` e `wdio repl --session` |
| [Comandos](/docs/session-commands) | Todas as ações e flags |

## Solução de problemas

| Mensagem | O que fazer |
| --- | --- |
| `SESSION_EXISTS` | O nome já está em execução. Use `-s` com outro nome ou `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Execute `snapshot` novamente e use uma ref dessa saída. |
| `NOT_EDITABLE` | O alvo do `fill` não é um campo editável e não contém um único campo editável dentro dele (nem por trás de `aria-controls`/`aria-owns`/label). Execute `snapshot --scope <target>` e preencha a ref do campo. |
| `MISSING_DEPENDENCY` | Instale o pacote indicado no erro ou execute `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Execute a linha `npx appium driver install …` presente no erro. |
| `MISSING_CREDENTIALS` | Exporte as variáveis indicadas. O doctor nunca exibe seus valores. |
| `Session closed from wdio session` | A sessão de depuração foi fechada. Retome em vez de fechar quando o teste precisar continuar. |

Códigos de saída: 0 sucesso, 1 a ação falhou, 2 uso incorreto, 3 dependência ou credenciais ausentes, 4 nenhuma sessão com esse nome.

## Próximos passos

- [Targets](/docs/session/targets) — abra um navegador, um app Android ou iOS, ou uma janela do Electron
- [WebdriverIO para Agentes de Programação](/docs/ai-agents) — skill, documentação e regras do projeto
- [Comandos do wdio session](/docs/session-commands) — todas as ações e flags