---
id: session
title: wdio session
description: Controla un navegador, una app móvil o una app de escritorio desde la terminal con comandos cortos de wdio session y luego exporta los pasos como un test.
---

`wdio session` mantiene viva una sesión de WebdriverIO a lo largo de muchos comandos cortos de terminal. Úsalo para explorar una interfaz, comprobar un cambio y convertir en un test los pasos que funcionaron. Forma parte de `@wdio/cli` (WebdriverIO v10).

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
npx wdio session click e3
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio session close
```

La sesión se llama `default`. Pasa `-s <name>` solo cuando necesites dos sesiones a la vez. La página de [targets](/docs/session/targets) controla una misma app de prueba de Expo en una ventana de Chrome visible y en una ventana de Electron, ambas con tamaño de escritorio. Los comandos de Android e iOS para la misma app están en esa página.

## Instalación

`wdio session` forma parte de la CLI de WebdriverIO. `npx wdio` instala el paquete sin scope [`wdio`](https://www.npmjs.com/package/wdio) y ejecuta esa CLI. No necesitas instalar `@wdio/session` por tu cuenta.

```sh
npx wdio session --help
npx wdio session click --help
```

`--help` muestra el flujo de trabajo, las acciones agrupadas, los flags globales y los códigos de salida. `<action> --help` muestra los argumentos, flags, plataformas, ejemplos y acciones relacionadas de esa acción. El mismo texto está en la página de [comandos](/docs/session-commands). La skill del agente conserva solo el ciclo principal y remite a los agentes a `--help` para el resto, de modo que no queda desactualizada cuando cambia la CLI.

Crea un proyecto con:

```sh
npm init wdio@latest
```

Acepta "Set up coding agent support" para generar `.agents/skills/wdio-session/SKILL.md`, una sección en `AGENTS.md` y una entrada `.wdio/session/` en el gitignore. Instala la skill más adelante con:

```sh
npx wdio session skill --install .
```

`npx wdio session doctor` comprueba Node.js, el navegador, Appium, los SDK y las credenciales de la nube. `doctor <target>` comprueba solo lo que necesita ese target. El proceso termina con código 1 cuando falla una comprobación.

## Abrir una página e interactuar con ella

Abre Chrome en modo headless (añade `--headed` para mostrar la ventana). `open` muestra los elementos interactivos de la página:

```sh
npx wdio session open chrome http://localhost:3000
```

Un elemento tiene este aspecto: `button "Add to cart" [ref=e3]`. Usa esa ref. Cada acción informa de lo que cambió en la página, con refs para los elementos nuevos, así que rara vez necesitas un `snapshot` aparte:

```sh
npx wdio session click e3
npx wdio session exec -e "await expect($('aria/Cart (1)')).toBeDisplayed()"
```

`open firefox`, `open edge` y `open safari` aceptan la misma URL. Chrome, Firefox y Edge se descargan en el primer uso si no están instalados. Safari requiere macOS.

### Android

Android e iOS se ejecutan a través de Appium 3. `doctor android` informa de un servidor o driver que falte junto con el comando de instalación.

```sh
npx wdio session doctor android
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

iOS: `open ios --bundle-id com.example.shop`. Escritorio nativo: `open macos --bundle-id com.example.shop` y `open windows --app Root`.

### Electron

```sh
npx wdio session open electron ./main.js
npx wdio session snapshot --interactive
npx wdio session click e2
```

`open tauri ./my-app` y `open dioxus ./my-app` necesitan su driver en el `PATH`. En Linux sin `DISPLAY` ni `WAYLAND_DISPLAY`, instala Xvfb o weston.

## Observación y refs

| Comando | Úsalo para |
| --- | --- |
| `snapshot --interactive` | Los elementos con los que puedes interactuar, cada uno con una ref |
| `snapshot --compact` | El mismo árbol sin los contenedores vacíos sin nombre |
| `snapshot --urls` | Las direcciones de cada enlace |
| `find "Add to cart"` | Una línea de un snapshot nuevo |
| `diff` | Lo que cambió desde el snapshot anterior |
| `screenshot` | El diseño. Omítelo cuando un snapshot responda a la pregunta |
| `pdf` | Un PDF de la página actual (`pdf report.pdf`). Las sesiones BiDi imprimen tanto en modo visible como headless |
| `source` | El HTML de la página o el XML nativo |

Las refs provienen del último snapshot. Después de navegar, vuelve a hacer un snapshot. Una ref antigua falla con `REF_STALE`. Una ref desconocida falla con `REF_NOT_FOUND`.

## `exec`

`exec` ejecuta código de WebdriverIO. Usa siempre `await` en los comandos. `$` devuelve un elemento y lanza un error cuando no existe. No hay modo síncrono ni `browser.element`.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Pon las aserciones en `exec` con `expect-webdriverio`. Usa `visual check <tag>` (requiere `@wdio/visual-service`) cuando la pregunta sea cómo se ve la pantalla.

## Exportar

`export` genera un spec a partir de los pasos grabados. Las refs se sustituyen por selectores estables.

```sh
npx wdio session export --out test/specs/cart.e2e.ts
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
npx wdio session close
```

`open firefox`, `open edge` y `open safari` aceptan la misma URL. Los demás targets, los snapshots, `exec`, la exportación y la ejecución de un test en pausa tienen páginas propias en esta sección.

## Esta sección

| Página | Úsala para |
| --- | --- |
| [Targets](/docs/session/targets) | Navegadores, Android, iOS, escritorio, Electron, Tauri, Dioxus y dispositivos en la nube, incluida la app de demostración en Chrome, Android y Electron |
| [Snapshots y refs](/docs/session/snapshots) | Lo que hay en pantalla y las refs en las que haces clic |
| [Ejecutar código](/docs/session/exec) | `exec`, aserciones y comprobaciones visuales |
| [Exportar un test](/docs/session/export) | Specs, page objects y `.wdio/helpers` |
| [Depurar un test](/docs/session/debug) | `wdio run --debug=agent` y `wdio repl --session` |
| [Comandos](/docs/session-commands) | Todas las acciones y flags |

## Solución de problemas

| Mensaje | Qué hacer |
| --- | --- |
| `SESSION_EXISTS` | Ese nombre ya está en ejecución. Usa `-s` con otro nombre, o `open --replace`. |
| `REF_STALE` / `REF_NOT_FOUND` | Vuelve a ejecutar `snapshot` y usa una ref de esa salida. |
| `NOT_EDITABLE` | El target de `fill` no es un campo editable y no contiene un único campo editable (ni detrás de `aria-controls`/`aria-owns`/label). Ejecuta `snapshot --scope <target>` y rellena la ref del campo. |
| `MISSING_DEPENDENCY` | Instala el paquete indicado en el error o ejecuta `wdio session doctor <target>`. |
| `MISSING_APPIUM_DRIVER` | Ejecuta la línea `npx appium driver install …` del error. |
| `MISSING_CREDENTIALS` | Exporta las variables indicadas. Doctor nunca muestra sus valores. |
| `Session closed from wdio session` | La sesión de depuración se cerró. Reanúdala en lugar de cerrarla cuando el test deba continuar. |

Códigos de salida: 0 éxito, 1 la acción falló, 2 uso incorrecto, 3 falta una dependencia o credenciales, 4 no hay ninguna sesión con ese nombre.

## Próximos pasos

- [Targets](/docs/session/targets) — abre un navegador, una app de Android o iOS, o una ventana de Electron
- [WebdriverIO para agentes de programación](/docs/ai-agents) — skill, documentación y reglas del proyecto
- [Comandos de wdio session](/docs/session-commands) — todas las acciones y flags