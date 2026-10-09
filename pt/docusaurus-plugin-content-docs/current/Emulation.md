---
id: emulation
title: Emulação
description: "Emule geolocalização, recursos de mídia, user agent, rede, localidade, fuso horário, tela e dispositivos com o comando emulate."
---

Com o WebdriverIO você pode emular o comportamento do navegador usando o comando [`emulate`](/docs/api/browser/emulate). O comando aciona o [módulo de emulação do WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) para o contexto de navegação de nível superior atual. A substituição é aplicada imediatamente. Você não precisa recarregar a página. `clock` é a exceção: o BiDi não possui um comando de relógio, então esse escopo ainda instala temporizadores falsos.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Este recurso requer suporte ao WebDriver Bidi no navegador. Embora versões recentes do Chrome, Edge e Firefox tenham esse suporte, o Safari __não tem__. Para atualizações, acompanhe o [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Além disso, se você usa um provedor de nuvem para iniciar navegadores, certifique-se de que seu provedor também suporta WebDriver Bidi.

Para habilitar o WebDriver Bidi no seu teste, certifique-se de ter `webSocketUrl: true` definido nas suas capabilities.

Um navegador que não implementa um comando rejeita a chamada com seu próprio erro, `unknown command` ou `unsupported operation`. O WebdriverIO retorna esse erro. Ele não recorre a um script de pré-carregamento nem ao CDP.

:::

`emulate` retorna uma função que limpa aquele escopo. [`browser.restore()`](/docs/api/browser/restore) limpa todos os escopos ativos, ou os escopos que você listar.

## Geolocalização

Altere a geolocalização do navegador para uma área específica, por exemplo:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Isso usa a pilha de geolocalização do navegador, incluindo `getCurrentPosition` e `watchPosition`. Uma página ainda pode precisar que a permissão de geolocalização seja concedida, como no exemplo. Os campos opcionais são `accuracy`, `altitude`, `altitudeAccuracy`, `heading` e `speed`.

Para fazer a página falhar ao ler uma posição:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Esquema de cores e outros recursos de mídia

Altere o recurso de mídia `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

Isso atualiza o CSS `@media (prefers-color-scheme)` assim como o [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Nenhum recarregamento é necessário.

`media` define o restante do mapa de recursos de mídia, por exemplo, movimento reduzido:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` e `media` compartilham um único mapa. O comando BiDi substitui o mapa inteiro, então a chamada posterior prevalece. Restaurar qualquer um dos escopos limpa o mapa.

`forcedColors` é um comando diferente. Ele define o tema de cores forçadas (`'light'` ou `'dark'`), não o recurso de mídia `forced-colors`. Esse recurso de mídia permanece em `media` como `forcedColors: 'none' | 'active'`.

## User Agent

Altere o user agent do navegador via:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Esta é a substituição de user agent do próprio navegador. Não é uma propriedade `navigator.userAgent` modificada. Os fabricantes de navegadores estão descontinuando progressivamente o User Agent.

## Estado online

Coloque o contexto de navegação offline:

```ts
await browser.emulate('onLine', false)
```

`false` envia `emulation.setNetworkConditions` com `{ type: 'offline' }`. Fetch, WebSocket e WebTransport falham, e o [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) acompanha. `true`, assim como restaurar o escopo, limpa a condição. Vazão e latência continuam em [`throttleNetwork`](/docs/api/browser/throttleNetwork). As condições de rede do BiDi suportam apenas o modo offline.

## Localidade, fuso horário e toque

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` é uma tag BCP 47. `timezone` é um nome IANA ou um deslocamento como `+02:00`. `touch` é `maxTouchPoints` e deve ser um inteiro `>= 1`. Restaurar `touch` limpa a substituição. Não é possível definir `0`.

## Tela, orientação e layout

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` é a área de tela exposta à web, não o viewport. `orientation.natural` é `'portrait'` ou `'landscape'`. `orientation.type` é `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` ou `'landscape-secondary'`.

`viewportMeta` aceita apenas `true`. O valor da especificação é `true | null`, então não existe `false`. Restaurar o limpa. `textLayout` aceita apenas `'mobile'`. `scripting` só pode ser desativado. A especificação não permite forçar a ativação de scripts. `scrollbar` é `'classic'` ou `'overlay'`.

## Relógio

Você pode modificar o relógio do sistema do navegador usando o comando [`emulate`](/docs/emulation). Ele substitui funções globais nativas relacionadas ao tempo, permitindo que sejam controladas de forma síncrona via `clock.tick()` ou pelo objeto clock retornado. Isso inclui o controle de:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

O relógio começa na época unix (timestamp 0). Isso significa que, quando você instanciar um novo Date na sua aplicação, ele terá a data de 1º de janeiro de 1970 se você não passar nenhuma outra opção para o comando `emulate`.

##### Exemplo

Ao chamar `browser.emulate('clock', { ... })`, as funções globais serão sobrescritas imediatamente para a página atual, bem como para todas as páginas seguintes, por exemplo:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Você pode modificar o horário do sistema chamando [`setSystemTime`](/docs/api/clock/setSystemTime) ou [`tick`](/docs/api/clock/tick).

O objeto `FakeTimerInstallOpts` pode ter as seguintes propriedades:

 ```ts
interface FakeTimerInstallOpts {
    // Instala temporizadores falsos com a época unix especificada
    // @default: 0
    now?: number | Date | undefined;

    // Um array com nomes de métodos globais e APIs a serem falsificados. Por padrão, o WebdriverIO
    // não substitui `nextTick()` e `queueMicrotask()`. Por exemplo,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` falsificará apenas
    // `setTimeout()` e `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // O número máximo de temporizadores que serão executados ao chamar runAll() (padrão: 1000)
    loopLimit?: number | undefined;

    // Indica ao WebdriverIO para incrementar o tempo simulado automaticamente com base na
    // variação do tempo real do sistema (ex.: o tempo simulado será incrementado em 20ms para cada
    // 20ms de variação no tempo real do sistema)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevante apenas ao usar com shouldAdvanceTime: true. Incrementa o tempo simulado em
    // advanceTimeDelta ms a cada advanceTimeDelta ms de variação no tempo real do sistema
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indica ao FakeTimers para limpar temporizadores 'nativos' (ou seja, não falsos) delegando aos
    // seus respectivos handlers. Eles não são limpos por padrão, o que pode levar a
    // comportamentos inesperados se existirem temporizadores antes da instalação do FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Dispositivo

O comando `emulate` também suporta a emulação de um determinado dispositivo móvel ou desktop. Isso não deve, de forma alguma, ser usado para testes mobile, pois os motores de navegadores desktop diferem dos mobile. Isso só deve ser usado se a sua aplicação oferecer um comportamento específico para tamanhos de viewport menores.

Para um dispositivo, o WebdriverIO:

- define o user agent a partir do descritor
- define o viewport e o fator de escala do dispositivo
- define `maxTouchPoints` como `1` quando o descritor possui toque, e limpa o toque caso contrário
- define o layout de texto mobile e a meta tag de viewport quando o descritor é mobile, e os limpa caso contrário

Ele não inventa um tamanho de tela ou uma orientação a partir do nome do dispositivo. O viewport não é `screen.width`. Use os escopos `screen` e `orientation` para isso.

A alteração do viewport é enviada ao contexto de nível superior que estava ativo quando `emulate` foi chamado. Restaurar o dispositivo redimensiona esse contexto, inclusive após a troca para outra janela.

Se o navegador rejeitar um desses comandos, o user agent, viewport, toque, layout de texto e meta de viewport anteriores são restaurados e o erro é retornado. Um user agent personalizado ou um tamanho definido com `setViewport` não é substituído por um padrão.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// teste sua aplicação ...

// redefine user agent, viewport, toque, layout de texto e meta de viewport
await restore()
```

O WebdriverIO mantém uma lista fixa de [todos os dispositivos definidos](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).