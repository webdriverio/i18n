---
id: debug
title: Depurar una prueba con una sesión
description: Pausa una ejecución fallida de WebdriverIO e inspecciónala con wdio session, luego reanúdala o ciérrala.
---

`wdio run --debug=agent` pausa el worker en `await browser.debug()` y después de una prueba fallida, y eleva el tiempo de espera del framework a 24 horas. La pausa abarca tanto las pruebas de Mocha como los pasos de Cucumber. La ejecución imprime el nombre de la sesión (`debug-0-0` para el primer worker):

```sh
npx wdio run wdio.conf.ts --debug=agent
npx wdio session -s debug-0-0 snapshot
npx wdio session -s debug-0-0 exec -e "await browser.getTitle()"
npx wdio session -s debug-0-0 resume
```

`close` en esa sesión hace fallar la prueba pausada con `Session closed from wdio session`. Reanuda cuando la prueba deba continuar. Cierra cuando quieras que la ejecución falle en la pausa.

`browser.debug()` sin `--debug=agent` sigue abriendo el [REPL](/docs/repl) dentro de la prueba. `--debug=agent` es la vía que permite que otro proceso, incluido un agente de programación, controle el worker pausado con `wdio session`.

## Conectar un REPL

`wdio repl --session <name>` se conecta a una sesión que ya está abierta y la deja en ejecución cuando sales:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Cada línea del REPL se ejecuta como `wdio session exec`. `.exit` imprime `Detached from "default" (still running)`.

## Doctor

`npx wdio session doctor` comprueba Node.js, el navegador, Appium, los SDK y las credenciales de la nube antes de que abras una sesión. `doctor <target>` comprueba solo lo que ese destino necesita. El proceso termina con código 1 cuando una comprobación falla. Una sesión que todavía se está iniciando se deja como está. Una sesión cuyo proceso ya no existe se elimina.

## Solución de problemas

| Mensaje | Qué hacer |
| --- | --- |
| `Session closed from wdio session` | Cerraste la sesión de depuración. Usa `resume` cuando la prueba deba continuar. |
| No hay sesión `debug-0-0` | La ejecución aún no se ha pausado, o usó un id de worker diferente. `wdio session list` imprime los nombres. |
| La pausa nunca ocurre | El comando debe ser `wdio run --debug=agent`. Una prueba que pasa no se pausa a menos que llame a `browser.debug()`. |

## Próximos pasos

- [Depuración](/docs/debugging) — `browser.debug()`, puntos de interrupción y pruebas inestables
- [REPL](/docs/repl) — el shell interactivo
- [wdio session](/docs/session) — abre una sesión que no está vinculada a una ejecución de pruebas