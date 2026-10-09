---
id: methods
title: Métodos
description: "Usa los métodos save y check del servicio visual para capturar pantallas y comparar pantallas, elementos y páginas completas con imágenes de referencia."
---

Los siguientes métodos se añaden al objeto global [`browser`](/docs/api/browser) de WebdriverIO.

## Métodos de guardado

:::info CONSEJO
Usa los métodos de guardado solo cuando **no** quieras comparar pantallas y únicamente quieras obtener una captura de un elemento o de la pantalla.
:::

### `saveElement`

Guarda una imagen de un elemento.

#### Uso

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles
- Aplicaciones móviles híbridas
- Aplicaciones móviles nativas

#### Parámetros

-   **`element`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveElementOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de guardado](./method-options#save-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Guarda una imagen del viewport.

#### Uso

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles
- Aplicaciones móviles híbridas
- Aplicaciones móviles nativas

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de guardado](./method-options#save-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Uso

Guarda una imagen de la pantalla completa.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de guardado](./method-options#save-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Guarda una imagen de la pantalla completa con las líneas y puntos de los elementos tabulables.

#### Uso

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveTabbableOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de guardado](./method-options#save-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#savescreenelementfullpagescreen).

## Métodos de comprobación

:::info CONSEJO
Cuando uses los métodos `check` por primera vez, verás la siguiente advertencia en los logs. Esto significa que no necesitas combinar los métodos `save` y `check` si quieres crear tu imagen de referencia (baseline).

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

Compara una imagen de un elemento con una imagen de referencia.

#### Uso

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles
- Aplicaciones móviles híbridas
- Aplicaciones móviles nativas

#### Parámetros
-   **`element`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkElementOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de comparación/comprobación](./method-options#compare-check-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Compara una imagen del viewport con una imagen de referencia.

#### Uso

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles
- Aplicaciones móviles híbridas
- Aplicaciones móviles nativas

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de comparación/comprobación](./method-options#compare-check-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Compara una imagen de la pantalla completa con una imagen de referencia.

#### Uso

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio
- Navegadores móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkFullPageOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de comparación/comprobación](./method-options#compare-check-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Compara una imagen de la pantalla completa con las líneas y puntos de los elementos tabulables con una imagen de referencia.

#### Uso

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### Compatibilidad

- Navegadores de escritorio

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkTabbableOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, consulta [Opciones de comparación/comprobación](./method-options#compare-check-options)

#### Salida:

Consulta la página [Salida de las pruebas](./test-output#checkscreenelementfullpagescreen).