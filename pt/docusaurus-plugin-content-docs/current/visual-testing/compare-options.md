---
id: compare-options
title: Opções de Comparação
description: "Ajuste como as capturas de tela são comparadas com opções de sensibilidade visual, pixelmatch, bloqueio de áreas em dispositivos móveis e relatórios para o serviço visual."
---

As opções de comparação são opções que influenciam a forma como a comparação é executada.

:::info NOTA
Todas as opções de comparação podem ser usadas durante a instanciação do serviço ou para cada `checkElement`, `checkScreen` e `checkFullPageScreen` individualmente. Se uma opção de método tiver a mesma chave que uma opção definida durante a instanciação do serviço, a opção de comparação do método substituirá o valor da opção de comparação do serviço.
:::

## Sensibilidade visual

---

:::info Histórico de versões das opções `ignore*`
Os presets `ignore*` mudaram de comportamento uma vez, como uma breaking change, quando o mecanismo de comparação mudou de ResembleJS para Pixelmatch:

| Versão | Mecanismo | Notas |
| --- | --- | --- |
| v9 e anteriores | ResembleJS | Semântica original de `ignore*` (baseada em RGB/brilho, com a própria ordem de presets do resemble). |
| v10 e posteriores | Pixelmatch | Os presets `ignore*` são mapeados para configurações de threshold/AA do pixelmatch. Os padrões e o comportamento atuais estão documentados por opção abaixo; novos recursos/correções sobre isso são indicados com uma nota "Desde" na opção relevante. |

:::

**Ordem "o último vence":** quando mais de uma flag `ignore*` está ativada ao mesmo tempo, apenas um preset é realmente aplicado, seguindo esta ordem (o último vence): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Um aviso é registrado indicando qual preset venceu.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_
-   **Desde:** `v10.1.0`: comparação apenas de brilho usando os pesos de luma do resemble (`0.3/0.59/0.11`).

Compara apenas o brilho, ignorando diferenças de matiz/cor. Preset: threshold rigoroso (~16/255), anti-aliasing não é perdoado.

**Use quando** a própria cor deve variar (por exemplo, UI com temas, imagens que mudam de cor conforme o ambiente), mas você ainda quer detectar mudanças de layout ou de brilho.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_
-   **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente das outras flags `ignore*`.

Compara imagens e descarta diferenças no canal alfa. Preset: threshold rigoroso (~16/255), anti-aliasing não é perdoado.

**Use quando** a renderização de transparência/opacidade for instável (por exemplo, overlays, elementos semitransparentes), mas as cores reais dos pixels por baixo importam.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_
-   **Desde:** `v10`: o padrão mudou para `true` (era `false` na v9 e anteriores).

Perdoa pixels com anti-aliasing durante a comparação (threshold relaxado ~32/255). Este é o único preset que perdoa anti-aliasing e está ativado por padrão para que o ruído de renderização subpixel não faça as comparações falharem logo de início. Defina como `false` para uma comparação rigorosa em que pixels com anti-aliasing devem contar como diferenças.

**Use para** resolver a fonte mais comum de instabilidade em testes visuais: bordas de texto e formas que são renderizadas com anti-aliasing ligeiramente diferente entre máquinas/navegadores, mesmo que nada tenha realmente mudado.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_
-   **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente das outras flags `ignore*`.

Compara imagens usando uma tolerância RGB relaxada (~16/255 por canal no espaço YIQ). Preset: threshold rigoroso, anti-aliasing não é perdoado.

**Use quando** você quiser um pouco de margem para pequenos ruídos de renderização (artefatos de compressão estilo JPEG, leves arredondamentos de cor) sem perdoar o anti-aliasing.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_
-   **Desde:** `v10.1.0`: aplica sua própria regra de threshold/AA independentemente das outras flags `ignore*`.

Usa tolerância zero: qualquer diferença de pixel conta como divergência, incluindo anti-aliasing.

**Use quando** você precisar de uma prova pixel a pixel de que absolutamente nada mudou, por exemplo, para verificar que uma correção não introduziu nenhuma regressão, por menor que seja.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Redimensiona 2 imagens para o mesmo tamanho antes da execução da comparação. É altamente recomendado ativar `ignoreAntialiasing` e `ignoreAlpha`

</Option>
## Controle direto do pixelmatch

---

:::info Adicionado na v10.1.0
`compareOptions.pixelmatch` não tem equivalente na v9 (ResembleJS). É uma forma totalmente nova de controlar o mecanismo de comparação diretamente, em vez de usar um preset `ignore*`.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin para aquele método específico utilizado_
-   **Adicionado na:** `v10.1.0`

Passa configurações diretamente para o [pixelmatch](https://github.com/mapbox/pixelmatch) em vez de usar um preset `ignore*`. **Use quando os cinco presets `ignore*` forem muito genéricos:** você precisa de um valor de threshold específico que os presets não oferecem, ou de uma imagem de diferenças que seja realmente legível nos seus relatórios/saída de CI, em vez do destaque magenta padrão.

:::warning Mutuamente exclusivos dentro do mesmo objeto de opções
Colocar qualquer chave `ignore*` e `pixelmatch` no **mesmo** objeto de opções lança `CompareOptionsConflictError`, mesmo quando o valor de `ignore*` é `false` (veja o exemplo inválido abaixo). Escolha um modo por objeto: presets `ignore*` ou `pixelmatch`, nunca ambos.

Isso se aplica apenas dentro de um objeto. A configuração do serviço e as opções de uma chamada de método são objetos separados, então uma chamada `check*` **pode** usar um modo diferente do da configuração do serviço; por exemplo, o serviço usa presets `ignore*`, mas uma chamada passa `pixelmatch` (ou vice-versa). Nesse caso não há erro, apenas um aviso é registrado indicando a troca do modo de comparação.
:::

| Campo | Tipo | Padrão | Para que serve |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Sensibilidade de 0 (qualquer diferença de pixel falha) a 1 (quase nada falha). Use para definir um valor exato de sensibilidade em vez de escolher o preset `ignore*` mais próximo. |
| `includeAA` | `boolean` | `false` | `true` conta pixels de borda com anti-aliasing como divergências; `false` os perdoa. Desative se diferenças na renderização de bordas de fontes/formas estiverem causando falhas instáveis. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Cor RGB para pixels divergentes na imagem de diferenças. Altere se o magenta se misturar com sua UI (por exemplo, um tema rosa/roxo) e as divergências ficarem difíceis de identificar. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Cor RGB para pixels com anti-aliasing, mantida visualmente separada das divergências reais para que você possa distinguir "ruído de renderização" de "bug real" num relance. |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | Cor RGB para pixels que foram adicionados ou removidos (não apenas recoloridos), útil para identificar deslocamentos de layout vs. mudanças de cor. |
| `alpha` | `number` | `0.1` | Opacidade da sobreposição de diferenças sobre a captura de tela real. Aumente para destacar mais as diferenças nos relatórios; diminua para ainda ver claramente a UI subjacente. Não tem relação com o preset `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Defina como `true` para gerar apenas a diferença bruta (fundo transparente) em vez da diferença desenhada sobre sua captura de tela, útil para criar seu próprio visualizador/relatório de diferenças personalizado. |
| `checkerboard` | `boolean` | `true` | Controla como os pixels semitransparentes são renderizados na diferença. Desative se o padrão quadriculado for facilmente confundido com conteúdo real nas suas capturas de tela. |

**Configuração do serviço:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Substituição no método quando o serviço usa presets `ignore*`:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Substituição no método quando o serviço usa `pixelmatch`:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Inválido: lança `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Consulte a [documentação do pixelmatch](https://github.com/mapbox/pixelmatch) para a semântica completa das opções.

</Option>
## Bloqueios em dispositivos móveis

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin. Isto é **apenas para Mobile**_

Bloqueia automaticamente a barra de status e a barra de endereço durante as comparações. Isso evita falhas por causa do horário, wifi ou status da bateria.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin. Isto é **apenas para Mobile**_

Bloqueia automaticamente a barra de ferramentas.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Observação:** _Só pode ser usado para `checkScreen()`. Substituirá a configuração do plugin. Isto é **apenas para iPad**_

Bloqueia automaticamente a barra lateral em iPads no modo paisagem durante as comparações. Isso evita falhas no componente nativo de abas/privado/favoritos.

</Option>
## Resultados e relatórios

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Se for true, a porcentagem retornada será como `0.12345678`; o padrão é `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Isso retornará todos os dados da comparação, não apenas a porcentagem de divergência

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Substituirá a configuração do plugin_

Valor permitido de `misMatchPercentage` que impede o salvamento de imagens com diferenças

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Observação:** _Também pode ser usado para `checkElement`, `checkScreen()` e `checkFullPageScreen()`. Relevante apenas quando [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) está ativado._

A proximidade em pixels usada para agrupar pixels de diferença nos relatórios JSON. Valores mais altos agrupam mais pixels em menos caixas delimitadoras; valores mais baixos produzem caixas mais precisas, porém em maior número.

</Option>