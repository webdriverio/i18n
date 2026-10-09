---
id: snapshots
title: Snapshots y refs
description: Lee la página con wdio session snapshot y luego actúa sobre las refs que imprime.
---

Toma un snapshot antes de hacer clic. El snapshot es la lista de elementos sobre los que puedes actuar. Cada línea interactiva termina con una ref como `[ref=e3]`.

```sh
npx wdio session open chrome http://localhost:3000
npx wdio session snapshot --interactive
```

Una línea se ve así: `button "Add to cart" [ref=e3]`. El siguiente comando usa esa ref:

```sh
npx wdio session click e3
```

Las refs provienen del snapshot más reciente. Después de una navegación, vuelve a tomar un snapshot. Una ref antigua falla con `REF_STALE`. Una ref desconocida falla con `REF_NOT_FOUND`.

:::caution Experimental

El formato de texto de un snapshot, y la estructura que `--json` imprime para él, son experimentales: una versión menor puede cambiarlos, por ejemplo para compartir un mismo motor de snapshots con el [trace de DevTools](/docs/devtools/wdio/trace-mode). La sintaxis de las refs (`e3`, `@e3`), las acciones que aceptan una ref y el código que registran se mantienen estables. Toma las refs de un snapshot y no analices el resto de sus líneas.

:::

## Qué ejecutar

| Comando | Úsalo para |
| --- | --- |
| `snapshot --interactive` | Los elementos sobre los que puedes actuar, cada uno con una ref |
| `find "Add to cart"` | Cada coincidencia con el nodo que la rodea, p. ej. un elemento de lista completo, para que un valor junto a la coincidencia también aparezca. `-A`, `-B` y `-C` imprimen contexto de líneas simple como grep |
| `diff` | Lo que cambió desde el snapshot anterior |
| `screenshot` | El diseño visual. Omítelo cuando un snapshot responda la pregunta |
| `source` | El HTML de la página o el XML nativo |

`snapshot` sin `--interactive` incluye más partes del árbol. Prefiere `--interactive` cuando vayas a hacer clic o escribir.

## Qué cambió una acción

En una sesión web, `open` imprime el snapshot interactivo de la página que abrió, y cada acción que puede cambiar la página (`click`, `fill`, `type`, `press`, `select`, `check`, `navigate`, `frame`, …) informa de lo que cambió:

```text
Clicked e6 (button "Start subscription")
Changes:
+ - status "Subscription started. Confirmation code: 4F2A9C"
```

Cuando la acción abrió una pestaña, el informe lo indica (`Opened a new tab [1]: https://…`); la sesión permanece en la pestaña actual hasta que ejecutes `tabs switch`. Cuando la página es una verificación anti-bots (Cloudflare, DataDome, Akamai, …) en lugar del sitio, el informe también lo indica, una vez por página. La sesión no intenta sortearla; en un navegador headless sugiere volver a abrir con `--headed`.

En la misma página obtienes las líneas nuevas o modificadas con sus refs, incluido el texto que no es interactivo, como el status anterior. Después de una navegación obtienes los elementos interactivos de la nueva página o, en el caso de una página grande, un resumen de una línea que remite a `find`. Así que rara vez necesitas un `snapshot` aparte después de una acción. Establece `WDIO_SESSION_CHANGES=0` para desactivar el informe, y pasa `open --no-snapshot` para omitir el snapshot después de `open`.

## Frames

En una sesión WebDriver BiDi, el snapshot muestra el contenido de los iframes de la página, incluidos los de origen cruzado, bajo el iframe en el que se encuentran:

```text
- iframe "Payment" [ref=e4]
  - textbox "Card number" [ref=e5]
  - button "Pay" [ref=e6]
```

Las acciones sobre estas refs entran en el frame, actúan y vuelven a la página, y el código impreso hace lo mismo. Se muestran hasta cinco iframes, cada uno recortado a 300 elementos; `frame e4` y `snapshot` muestran todo el contenido de un frame que fue recortado. Los iframes de menos de 100 píxeles cuadrados, como los píxeles de seguimiento, se omiten.

## Shadow DOM y elementos clicables sin rol

Con WebDriver BiDi, el snapshot también abarca los shadow roots cerrados, y los elementos que solo tienen un listener de clic (un icono conectado con `addEventListener`) obtienen una ref. Un elemento así no tiene nombre accesible, por lo que el snapshot lo describe en su lugar:

```text
- generic [ref=e8] (icon 3 of 3 in "Invoice #1002 · Contoso Ltd · $860.00")
```

En Android, iOS, macOS y Windows, el snapshot proviene del page source de Appium. Dos controles que comparten un accessibility id se mantienen como refs separadas cuando el resto de sus selectores difiere. `snapshot --scope e3` limita el árbol a esa ref.

## Controles repetidos

Cuando varios controles comparten un rol y un nombre, como el botón "Add to cart" de cada fila de una tabla de productos, la línea de la ref termina con `∈ "<text>"`, el texto de la fila, tarjeta o elemento de lista que contiene ese control y ningún otro con el mismo nombre:

```text
- button "Add to cart" [ref=e9] ∈ "Desk lamp · Brass · In stock · $49.00"
```

El texto se recorta a 80 caracteres. Un control cuyo elemento contenedor es un landmark de la página (un enlace "Sign in" tanto en el encabezado como en el pie de página) no recibe ninguno. La etiqueta de un control de formulario visible no se lista: el control lleva el nombre.

## Toques nativos

Las sesiones web usan `click`. Las sesiones móviles y de escritorio nativas usan `tap` sobre la misma ref:

```sh
npx wdio session open android --app ./shop.apk
npx wdio session snapshot --interactive
npx wdio session tap e3
```

## Solución de problemas

| Mensaje | Qué hacer |
| --- | --- |
| `REF_STALE` | El elemento del último snapshot ya no existe. Ejecuta `snapshot` y usa una ref nueva. |
| `REF_NOT_FOUND` | Ese id nunca estuvo en esta sesión. La ref de tu comando no coincide con el snapshot más reciente. |
| `NO_MATCH` | `find` no encontró ese texto. Toma un snapshot y lee los nombres que realmente están ahí. |
| `NOT_EDITABLE` | El objetivo de `fill` no es un campo editable y no tiene un único campo editable dentro (ni detrás de `aria-controls`/`aria-owns`/label). Ejecuta `snapshot --scope <target>` y rellena la ref del campo. |

## Próximos pasos

- [Ejecutar código](/docs/session/exec) — aserciones y pasos que son más de un comando
- [Comandos](/docs/session-commands) — flags de `snapshot`, `find`, `diff`, `screenshot` y `source`