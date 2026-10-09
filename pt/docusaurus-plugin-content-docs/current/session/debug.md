---
id: debug
title: Depurar um teste com uma sessão
description: Pause uma execução do WebdriverIO com falha e inspecione-a com wdio session, depois retome-a ou feche-a.
---

`wdio run --debug=agent` pausa o worker em `await browser.debug()` e após um teste com falha, e aumenta o timeout do framework para 24 horas. A pausa abrange tanto testes Mocha quanto steps do Cucumber. A execução imprime o nome da sessão (`debug-0-0` para o primeiro worker):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` nessa sessão faz o teste pausado falhar com `Session closed from wdio session`. Use resume quando o teste deve continuar. Use close quando você quiser que a execução falhe na pausa.

`browser.debug()` sem `--debug=agent` ainda abre o [REPL](/docs/repl) dentro do teste. `--debug=agent` é o caminho que permite que outro processo, incluindo um agente de programação, controle o worker pausado com `wdio session`.

## Anexar um REPL

`wdio repl --session <name>` se conecta a uma sessão que já está aberta e a mantém em execução quando você sai:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Cada linha do REPL é executada como `wdio session exec`. `.exit` imprime `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` verifica o Node.js, o navegador, o Appium, os SDKs e as credenciais de nuvem antes de você abrir uma sessão. `doctor <target>` verifica apenas o que esse target precisa. O processo termina com código 1 quando uma verificação falha. Uma sessão que ainda está iniciando é mantida. Uma sessão cujo processo não existe mais é removida.

## Solução de problemas

| Mensagem | O que fazer |
| --- | --- |
| `Session closed from wdio session` | Você fechou a sessão de depuração. Use `resume` quando o teste deve continuar. |
| Nenhuma sessão `debug-0-0` | A execução ainda não pausou, ou usou um id de worker diferente. `wdio session list` imprime os nomes. |
| A pausa nunca acontece | O comando deve ser `wdio run --debug=agent`. Um teste que passa não pausa, a menos que chame `browser.debug()`. |

## Próximos passos

- [Depuração](/docs/debugging) — `browser.debug()`, breakpoints e testes instáveis
- [REPL](/docs/repl) — o shell interativo
- [wdio session](/docs/session) — abra uma sessão que não está vinculada a uma execução de testes