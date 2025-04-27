---
id: methods
title: Métodos
---

Os seguintes métodos são adicionados ao objeto global [`browser`](/docs/api/browser) do WebdriverIO.

## Métodos de Salvamento

:::info DICA
Use os Métodos de Salvamento apenas quando você **não** quiser comparar telas, mas apenas deseja ter uma captura de elemento/tela.
:::

### `saveElement`

Salva uma imagem de um elemento.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile
- Aplicativos Híbridos Mobile
- Aplicativos Nativos Mobile

#### Parâmetros

-   **`element`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`saveElementOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Salvamento](./method-options#save-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Salva uma imagem da viewport.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile
- Aplicativos Híbridos Mobile
- Aplicativos Nativos Mobile

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`saveScreenOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Salvamento](./method-options#save-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Uso

Salva uma imagem da tela completa.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Salvamento](./method-options#save-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Salva uma imagem da tela completa com as linhas e pontos navegáveis por tab.

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

#### Suporte

- Navegadores Desktop

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`saveTabbableOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Salvamento](./method-options#save-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#savescreenelementfullpagescreen).

## Métodos de Verificação

:::info DICA
Quando os métodos `check` são usados pela primeira vez, você verá o aviso abaixo nos logs. Isso significa que você não precisa combinar os métodos `save` e `check` se quiser criar sua linha de base.

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

Compara uma imagem de um elemento com uma imagem de referência.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile
- Aplicativos Híbridos Mobile
- Aplicativos Nativos Mobile

#### Parâmetros
-   **`element`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`checkElementOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Comparação/Verificação](./method-options#compare-check-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Compara uma imagem da viewport com uma imagem de referência.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile
- Aplicativos Híbridos Mobile
- Aplicativos Nativos Mobile

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`checkScreenOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Comparação/Verificação](./method-options#compare-check-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Compara uma imagem da tela completa com uma imagem de referência.

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

#### Suporte

- Navegadores Desktop
- Navegadores Mobile

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`checkFullPageOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Comparação/Verificação](./method-options#compare-check-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Compara uma imagem da tela completa com as linhas e pontos navegáveis por tab com uma imagem de referência.

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

#### Suporte

- Navegadores Desktop

#### Parâmetros
-   **`tag`:**
    -   **Obrigatório:** Sim
    -   **Tipo:** string
-   **`checkTabbableOptions`:**
    -   **Obrigatório:** Não
    -   **Tipo:** um objeto de opções, veja [Opções de Comparação/Verificação](./method-options#compare-check-options)

#### Saída:

Veja a página [Saída de Teste](./test-output#checkscreenelementfullpagescreen).