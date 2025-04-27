---
id: emulation
title: Emulação
---

Com o WebdriverIO você pode emular APIs Web usando o comando [`emulate`](/docs/api/browser/emulate) para retornar valores personalizados que ajudam você a emular certos comportamentos do navegador. Note que isso requer que sua aplicação utilize explicitamente essas APIs.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Esta funcionalidade requer suporte WebDriver Bidi para o navegador. Embora versões recentes de Chrome, Edge e Firefox tenham esse suporte, o Safari __não tem__. Para atualizações, acompanhe [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). Além disso, se você usa um fornecedor na nuvem para executar navegadores, certifique-se de que seu fornecedor também suporte WebDriver Bidi.

Para habilitar o WebDriver Bidi para seu teste, certifique-se de ter `webSocketUrl: true` definido em suas capacidades.

:::

## Geolocalização

Altere a geolocalização do navegador para uma área específica, por exemplo:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Isso alterará o comportamento de [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) e retornará a localização fornecida por você.

## Esquema de Cores

Altere a configuração padrão do esquema de cores do navegador via:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

Isso alterará o comportamento de [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) quando você consultar o esquema de cores via `(prefers-color-scheme: dark)`.

## User Agent

Altere o user agent do navegador para uma string diferente via:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Isso alterará o valor de [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Observe que os fornecedores de navegadores estão progressivamente descontinuando o User Agent.

## Propriedade onLine

Altere o status online do navegador via:

```ts
await browser.emulate('onLine', false)
```

Isso __não__ interromperá o tráfego de rede entre o navegador e a internet e apenas altera o valor de retorno de [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Se você estiver interessado em modificar as capacidades de rede do navegador, veja o comando [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Relógio

Você pode modificar o relógio do sistema do navegador usando o comando [`emulate`](/docs/emulation). Ele substitui funções globais nativas relacionadas ao tempo, permitindo que sejam controladas de forma síncrona via `clock.tick()` ou pelo objeto de relógio gerado. Isso inclui o controle de:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

O relógio começa na época unix (timestamp 0). Isso significa que quando você instancia um novo Date em sua aplicação, ele terá o horário de 1º de janeiro de 1970, se você não passar outras opções para o comando `emulate`.

##### Exemplo

Ao chamar `browser.emulate('clock', { ... })`, ele substituirá imediatamente as funções globais para a página atual, bem como para todas as páginas seguintes, por exemplo:

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

Você pode modificar a hora do sistema chamando [`setSystemTime`](/docs/api/clock/setSystemTime) ou [`tick`](/docs/api/clock/tick).

O objeto `FakeTimerInstallOpts` pode ter as seguintes propriedades:

```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Dispositivo

O comando `emulate` também suporta a emulação de um determinado dispositivo móvel ou desktop, alterando a viewport, o fator de escala do dispositivo e o user agent. Isso não deve, de forma alguma, ser usado para testes móveis, pois os motores de navegadores desktop diferem dos móveis. Isso deve ser usado apenas se sua aplicação oferece um comportamento específico para viewports menores.

Por exemplo, para alternar o user agent e a viewport para um iPhone 15, basta executar:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

O WebdriverIO mantém uma lista fixa de [todos os dispositivos definidos](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).