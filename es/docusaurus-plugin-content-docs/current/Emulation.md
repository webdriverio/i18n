---
id: emulation
title: Emulación
description: "Emula la geolocalización, las características multimedia, el agente de usuario, la red, la configuración regional, la zona horaria, la pantalla y los dispositivos con el comando emulate."
---

Con WebdriverIO puedes emular el comportamiento del navegador usando el comando [`emulate`](/docs/api/browser/emulate). El comando controla el [módulo de emulación de WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) para el contexto de navegación de nivel superior actual. La sobrescritura se aplica de inmediato. No es necesario recargar la página. `clock` es la excepción: BiDi no tiene un comando de reloj, por lo que ese ámbito sigue instalando temporizadores falsos.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Esta función requiere que el navegador sea compatible con WebDriver Bidi. Aunque las versiones recientes de Chrome, Edge y Firefox tienen dicha compatibilidad, Safari __no la tiene__. Para obtener actualizaciones, consulta [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). Además, si utilizas un proveedor en la nube para iniciar navegadores, asegúrate de que tu proveedor también sea compatible con WebDriver Bidi.

Para habilitar WebDriver Bidi en tu prueba, asegúrate de tener `webSocketUrl: true` configurado en tus capacidades.

Un navegador que no implementa un comando rechaza la llamada con su propio error, `unknown command` o `unsupported operation`. WebdriverIO devuelve ese error. No recurre a un script de precarga ni a CDP como alternativa.

:::

`emulate` devuelve una función que limpia ese ámbito. [`browser.restore()`](/docs/api/browser/restore) limpia todos los ámbitos activos, o los ámbitos que indiques.

## Geolocalización

Cambia la geolocalización del navegador a un área específica, p. ej.:

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

Esto utiliza la pila de geolocalización del navegador, incluidos `getCurrentPosition` y `watchPosition`. Es posible que una página siga necesitando que se conceda el permiso de geolocalización, como en el ejemplo. Los campos opcionales son `accuracy`, `altitude`, `altitudeAccuracy`, `heading` y `speed`.

Para hacer que la página no pueda leer una posición:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Esquema de color y otras características multimedia

Cambia la característica multimedia `prefers-color-scheme`:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // outputs: "#000000"
```

Esto actualiza el CSS `@media (prefers-color-scheme)` así como [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). No es necesario recargar.

`media` establece el resto del mapa de características multimedia, por ejemplo, el movimiento reducido:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` y `media` comparten un mismo mapa. El comando BiDi reemplaza el mapa completo, por lo que prevalece la llamada posterior. Restaurar cualquiera de los dos ámbitos limpia el mapa.

`forcedColors` es un comando diferente. Establece el tema de colores forzados (`'light'` o `'dark'`), no la característica multimedia `forced-colors`. Esa característica multimedia permanece en `media` como `forcedColors: 'none' | 'active'`.

## Agente de usuario

Cambia el agente de usuario del navegador mediante:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Esta es la sobrescritura del agente de usuario del propio navegador. No es una propiedad `navigator.userAgent` modificada. Los fabricantes de navegadores están dejando obsoleto progresivamente el agente de usuario.

## Estado de conexión

Desconecta el contexto de navegación:

```ts
await browser.emulate('onLine', false)
```

`false` envía `emulation.setNetworkConditions` con `{ type: 'offline' }`. Fetch, WebSocket y WebTransport fallan, y [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) refleja el cambio. `true`, así como restaurar el ámbito, limpia la condición. El rendimiento y la latencia se mantienen en [`throttleNetwork`](/docs/api/browser/throttleNetwork). Las condiciones de red de BiDi solo admiten el modo sin conexión.

## Configuración regional, zona horaria y táctil

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` es una etiqueta BCP 47. `timezone` es un nombre IANA o un desfase como `+02:00`. `touch` es `maxTouchPoints` y debe ser un entero `>= 1`. Restaurar `touch` limpia la sobrescritura. No puede establecerse en `0`.

## Pantalla, orientación y diseño

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` es el área de pantalla expuesta a la web, no el viewport. `orientation.natural` es `'portrait'` o `'landscape'`. `orientation.type` es `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` o `'landscape-secondary'`.

`viewportMeta` solo acepta `true`. El valor de la especificación es `true | null`, por lo que no existe `false`. Restaurar lo limpia. `textLayout` solo acepta `'mobile'`. `scripting` solo puede desactivarse. La especificación no permite forzar la activación del scripting. `scrollbar` es `'classic'` o `'overlay'`.

## Reloj

Puedes modificar el reloj del sistema del navegador usando el comando [`emulate`](/docs/emulation). Sobrescribe las funciones globales nativas relacionadas con el tiempo, lo que permite controlarlas de forma síncrona mediante `clock.tick()` o el objeto de reloj devuelto. Esto incluye controlar:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

El reloj comienza en la época unix (marca de tiempo 0). Esto significa que cuando instancies un nuevo Date en tu aplicación, tendrá la fecha del 1 de enero de 1970 si no pasas ninguna otra opción al comando `emulate`.

##### Ejemplo

Al llamar a `browser.emulate('clock', { ... })` se sobrescribirán inmediatamente las funciones globales de la página actual, así como de todas las páginas siguientes, p. ej.:

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

Puedes modificar la hora del sistema llamando a [`setSystemTime`](/docs/api/clock/setSystemTime) o [`tick`](/docs/api/clock/tick).

El objeto `FakeTimerInstallOpts` puede tener las siguientes propiedades:

 ```ts
interface FakeTimerInstallOpts {
    // Instala temporizadores falsos con la época unix especificada
    // @default: 0
    now?: number | Date | undefined;

    // Un array con los nombres de los métodos y APIs globales a falsear. Por defecto, WebdriverIO
    // no reemplaza `nextTick()` ni `queueMicrotask()`. Por ejemplo,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` falseará solo
    // `setTimeout()` y `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // El número máximo de temporizadores que se ejecutarán al llamar a runAll() (por defecto: 1000)
    loopLimit?: number | undefined;

    // Indica a WebdriverIO que incremente el tiempo simulado automáticamente según el
    // desplazamiento del tiempo real del sistema (p. ej., el tiempo simulado se incrementará
    // en 20ms por cada cambio de 20ms en el tiempo real del sistema)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevante solo cuando se usa con shouldAdvanceTime: true. Incrementa el tiempo simulado
    // en advanceTimeDelta ms por cada cambio de advanceTimeDelta ms en el tiempo real del sistema
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indica a FakeTimers que limpie los temporizadores 'nativos' (es decir, no falsos)
    // delegando en sus respectivos manejadores. Estos no se limpian por defecto, lo que puede
    // provocar un comportamiento inesperado si existían temporizadores antes de instalar FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Dispositivo

El comando `emulate` también permite emular un determinado dispositivo móvil o de escritorio. Esto no debe usarse, en ningún caso, para pruebas móviles, ya que los motores de los navegadores de escritorio difieren de los móviles. Solo debe usarse si tu aplicación ofrece un comportamiento específico para tamaños de viewport más pequeños.

Para un dispositivo, WebdriverIO:

- establece el agente de usuario a partir del descriptor
- establece el viewport y el factor de escala del dispositivo
- establece `maxTouchPoints` en `1` cuando el descriptor tiene capacidad táctil y, en caso contrario, limpia la capacidad táctil
- establece el diseño de texto móvil y la etiqueta meta viewport cuando el descriptor es móvil y, en caso contrario, los limpia

No inventa un tamaño de pantalla ni una orientación a partir del nombre del dispositivo. El viewport no es `screen.width`. Usa los ámbitos `screen` y `orientation` para ello.

El cambio de viewport se envía al contexto de nivel superior que era el actual cuando se llamó a `emulate`. Restaurar el dispositivo redimensiona ese contexto, incluso después de cambiar a otra ventana.

Si el navegador rechaza alguno de esos comandos, se restablecen el agente de usuario, el viewport, la capacidad táctil, el diseño de texto y la etiqueta meta viewport anteriores, y se devuelve el error. Un agente de usuario personalizado o un tamaño establecido con `setViewport` no se reemplaza por un valor predeterminado.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// prueba tu aplicación ...

// restablece el agente de usuario, el viewport, la capacidad táctil, el diseño de texto y la etiqueta meta viewport
await restore()
```

WebdriverIO mantiene una lista fija de [todos los dispositivos definidos](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).