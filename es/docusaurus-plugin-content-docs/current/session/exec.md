---
id: exec
title: Ejecutar código en una sesión
description: Ejecuta código y aserciones de WebdriverIO en una sesión de wdio activa con exec.
---

`exec` ejecuta código de WebdriverIO en la sesión abierta. Úsalo cuando un paso sea algo más que un simple `click` o `fill`, y para cada aserción.

```sh
npx wdio session exec -e "await browser.getTitle()"
npx wdio session <<'JS'
await $('aria/Cart (1)').waitForDisplayed()
JS
```

Usa siempre `await` con los comandos. `$` devuelve un elemento y lanza un error cuando no existe. `$$` devuelve una lista. No hay modo síncrono ni `browser.element`.

Los nombres que declares siguen disponibles en el siguiente `exec`. Un `import` de nivel superior se carga desde el directorio del proyecto.

## Aserciones

Coloca las aserciones en `exec` con `expect-webdriverio`. Instálalo en tu proyecto. Sin él, `expect(...)` falla con una sugerencia de instalación.

```sh
npx wdio session exec -e "await expect($('h1')).toHaveText('Cart')"
```

Usa `visual check <tag>` cuando la pregunta sea cómo se ve la pantalla. Ese comando necesita `@wdio/visual-service`:

```sh
npx wdio session visual check cart
```

`visual accept cart` copia la imagen real más reciente de esa etiqueta sobre la imagen de referencia. No copia imágenes anteriores que compartan el prefijo de la etiqueta.

## Cuándo usar un atajo en su lugar

`click`, `fill`, `type`, `press` y `tap` son más cortos que `exec` para una sola interacción, e imprimen la línea de WebdriverIO que ejecutaron. Prefiérelos con una referencia del [snapshot](/docs/session/snapshots) más reciente. Usa `exec` para esperas, aserciones y cualquier cosa que necesite más de un comando.

## Próximos pasos

- [Exportar una prueba](/docs/session/export): guarda los pasos, incluido `exec`
- [Comandos](/docs/session-commands): opciones de `exec` y `visual`