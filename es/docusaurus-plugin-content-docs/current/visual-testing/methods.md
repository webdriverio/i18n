---
id: methods
title: Métodos
---

Los siguientes métodos se agregan al objeto global [`browser`](/docs/api/browser) de WebdriverIO.

## Métodos de Guardado

:::info CONSEJO
Solo use los Métodos de Guardado cuando **no** desee comparar pantallas, sino solo tener una captura de elemento/pantalla.
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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles
- Aplicaciones Híbridas Móviles
- Aplicaciones Nativas Móviles

#### Parámetros

-   **`element`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveElementOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Guardado](./method-options#save-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Guarda una imagen de una vista.

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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles
- Aplicaciones Híbridas Móviles
- Aplicaciones Nativas Móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Guardado](./method-options#save-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#savescreenelementfullpagescreen).

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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Guardado](./method-options#save-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Guarda una imagen de la pantalla completa con las líneas y puntos navegables por tabulación.

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

#### Soporte

- Navegadores de Escritorio

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`saveTabbableOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Guardado](./method-options#save-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#savescreenelementfullpagescreen).

## Métodos de Verificación

:::info CONSEJO
Cuando los métodos `check` se utilizan por primera vez, verá la siguiente advertencia en los registros. Esto significa que no necesita combinar los métodos `save` y `check` si desea crear su línea base.

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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles
- Aplicaciones Híbridas Móviles
- Aplicaciones Nativas Móviles

#### Parámetros
-   **`element`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkElementOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Comparación/Verificación](./method-options#compare-check-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Compara una imagen de una vista con una imagen de referencia.

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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles
- Aplicaciones Híbridas Móviles
- Aplicaciones Nativas Móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkScreenOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Comparación/Verificación](./method-options#compare-check-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#checkscreenelementfullpagescreen).

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

#### Soporte

- Navegadores de Escritorio
- Navegadores Móviles

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkFullPageOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Comparación/Verificación](./method-options#compare-check-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Compara una imagen de la pantalla completa con las líneas y puntos navegables por tabulación con una imagen de referencia.

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

#### Soporte

- Navegadores de Escritorio

#### Parámetros
-   **`tag`:**
    -   **Obligatorio:** Sí
    -   **Tipo:** string
-   **`checkTabbableOptions`:**
    -   **Obligatorio:** No
    -   **Tipo:** un objeto de opciones, ver [Opciones de Comparación/Verificación](./method-options#compare-check-options)

#### Salida:

Consulte la página [Salida de Prueba](./test-output#checkscreenelementfullpagescreen).