---
id: compare-options
title: Opções de Comparação
---

As opções de comparação são configurações que influenciam a maneira como a comparação, realizada pelo [ResembleJS](https://github.com/Huddle/Resemble.js), é executada.

:::info NOTA
Todas as opções de comparação podem ser usadas durante a instanciação do serviço ou para cada `checkElement`, `checkScreen` e `checkFullPageScreen` individualmente. Se uma opção de método tiver a mesma chave que uma opção definida durante a instanciação do serviço, então a opção de comparação do método sobrescreverá o valor da opção de comparação do serviço.
:::

### `ignoreAlpha`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Compara imagens e descarta o alfa.

### `blockOutSideBar`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Só pode ser usado para `checkScreen()`. Substituirá a configuração do plugin. Isso é **apenas para iPad**_

Bloqueia automaticamente a barra lateral para iPads no modo paisagem durante as comparações. Isso evita falhas no componente nativo de abas/privado/favoritos.

### `blockOutStatusBar`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin. Isso é **apenas para Mobile**_

Bloqueia automaticamente a barra de status e a barra de endereço durante as comparações. Isso evita falhas em horário, status de WiFi ou bateria.

### `blockOutToolBar`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin. Isso é **apenas para Mobile**_

Bloqueia automaticamente a barra de ferramentas.

### `ignoreAntialiasing`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Compara imagens e descarta o anti-aliasing.

### `ignoreColors`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Mesmo que as imagens estejam em cores, a comparação irá comparar 2 imagens em preto/branco

### `ignoreLess`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Compara imagens e compara com `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Compara imagens e compara com `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Compara imagens e ignora todos os pixels que têm alguma transparência em uma das imagens

### `rawMisMatchPercentage`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Se verdadeiro, a porcentagem de retorno será como `0.12345678`, o padrão é `0.12`

### `returnAllCompareData`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Isso retornará todos os dados de comparação, não apenas a porcentagem de incompatibilidade

### `saveAboveTolerance`

-   **Tipo:** `number`
-   **Padrão:** `0`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Valor permitido de `misMatchPercentage` que evita salvar imagens com diferenças

### `largeImageThreshold`

-   **Tipo:** `number`
-   **Padrão:** `0`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Comparar imagens grandes pode levar a problemas de desempenho.
Ao fornecer um número para a quantidade de pixels aqui (maior que 0), o algoritmo de comparação pula pixels quando a largura ou altura da imagem é maior que `largeImageThreshold` pixels.

### `scaleImagesToSameSize`

-   **Tipo:** `boolean`
-   **Padrão:** `false`
-   **Obrigatório:** não
-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Dimensiona 2 imagens para o mesmo tamanho antes da execução da comparação. Altamente recomendado ativar `ignoreAntialiasing` e `ignoreAlpha`