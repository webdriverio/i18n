---
id: emulation
title: Émulation
description: "Émulez la géolocalisation, les caractéristiques média, l'agent utilisateur, le réseau, la langue, le fuseau horaire, l'écran et les appareils avec la commande emulate."
---

Avec WebdriverIO, vous pouvez émuler le comportement du navigateur à l'aide de la commande [`emulate`](/docs/api/browser/emulate). La commande pilote le [module d'émulation WebDriver BiDi](https://w3c.github.io/webdriver-bidi/#module-emulation) pour le contexte de navigation de niveau supérieur actuel. La surcharge s'applique immédiatement. Vous n'avez pas besoin de recharger la page. `clock` est l'exception : BiDi n'a pas de commande d'horloge, donc cette portée installe toujours de faux minuteurs.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Cette fonctionnalité nécessite la prise en charge de WebDriver Bidi par le navigateur. Alors que les versions récentes de Chrome, Edge et Firefox offrent cette prise en charge, Safari __ne la propose pas__. Pour les mises à jour, suivez [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned). De plus, si vous utilisez un fournisseur cloud pour lancer des navigateurs, assurez-vous que votre fournisseur prend également en charge WebDriver Bidi.

Pour activer WebDriver Bidi pour votre test, assurez-vous d'avoir `webSocketUrl: true` défini dans vos capacités.

Un navigateur qui n'implémente pas une commande rejette l'appel avec sa propre erreur, `unknown command` ou `unsupported operation`. WebdriverIO renvoie cette erreur. Il ne se rabat pas sur un script de préchargement ou sur CDP.

:::

`emulate` renvoie une fonction qui réinitialise cette portée. [`browser.restore()`](/docs/api/browser/restore) réinitialise toutes les portées actives, ou les portées que vous indiquez.

## Géolocalisation

Modifiez la géolocalisation du navigateur pour une zone spécifique, par exemple :

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
console.log(await browser.getUrl()) // affiche : "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Cela utilise la pile de géolocalisation du navigateur, y compris `getCurrentPosition` et `watchPosition`. Une page peut tout de même nécessiter que l'autorisation de géolocalisation soit accordée, comme dans l'exemple. Les champs optionnels sont `accuracy`, `altitude`, `altitudeAccuracy`, `heading` et `speed`.

Pour que la page échoue à lire une position :

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## Schéma de couleurs et autres caractéristiques média

Modifiez la caractéristique média `prefers-color-scheme` :

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // affiche : "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // affiche : "#000000"
```

Cela met à jour le CSS `@media (prefers-color-scheme)` ainsi que [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia). Aucun rechargement n'est nécessaire.

`media` définit le reste de la table des caractéristiques média, par exemple la réduction des animations :

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` et `media` partagent une même table. La commande BiDi remplace la table entière, donc le dernier appel l'emporte. La restauration de l'une ou l'autre portée réinitialise la table.

`forcedColors` est une commande différente. Elle définit le thème des couleurs forcées (`'light'` ou `'dark'`), et non la caractéristique média `forced-colors`. Cette caractéristique média reste dans `media` sous la forme `forcedColors: 'none' | 'active'`.

## Agent utilisateur

Modifiez l'agent utilisateur du navigateur via :

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Il s'agit de la surcharge de l'agent utilisateur par le navigateur. Ce n'est pas une propriété `navigator.userAgent` modifiée. Les éditeurs de navigateurs déprécient progressivement l'agent utilisateur.

## État en ligne

Mettez le contexte de navigation hors ligne :

```ts
await browser.emulate('onLine', false)
```

`false` envoie `emulation.setNetworkConditions` avec `{ type: 'offline' }`. Fetch, WebSocket et WebTransport échouent, et [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) suit. `true`, ainsi que la restauration de la portée, réinitialise la condition. Le débit et la latence restent gérés par [`throttleNetwork`](/docs/api/browser/throttleNetwork). Les conditions réseau BiDi ne prennent en charge que le mode hors ligne.

## Langue, fuseau horaire et tactile

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` est une balise BCP 47. `timezone` est un nom IANA ou un décalage tel que `+02:00`. `touch` correspond à `maxTouchPoints` et doit être un entier `>= 1`. La restauration de `touch` réinitialise la surcharge. Il n'est pas possible de définir `0`.

## Écran, orientation et mise en page

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` est la zone d'écran exposée au web, et non la zone d'affichage (viewport). `orientation.natural` vaut `'portrait'` ou `'landscape'`. `orientation.type` vaut `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` ou `'landscape-secondary'`.

`viewportMeta` n'accepte que `true`. La valeur de la spécification est `true | null`, il n'y a donc pas de `false`. La restauration la réinitialise. `textLayout` n'accepte que `'mobile'`. `scripting` ne peut qu'être désactivé. La spécification ne permet pas de forcer l'activation des scripts. `scrollbar` vaut `'classic'` ou `'overlay'`.

## Horloge

Vous pouvez modifier l'horloge système du navigateur à l'aide de la commande [`emulate`](/docs/emulation). Elle remplace les fonctions globales natives liées au temps, ce qui permet de les contrôler de manière synchrone via `clock.tick()` ou l'objet horloge renvoyé. Cela inclut le contrôle de :

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'horloge démarre à l'époque Unix (horodatage 0). Cela signifie que lorsque vous instanciez un nouvel objet Date dans votre application, il aura pour date le 1er janvier 1970 si vous ne passez aucune autre option à la commande `emulate`.

##### Exemple

Lors de l'appel à `browser.emulate('clock', { ... })`, les fonctions globales sont immédiatement remplacées pour la page actuelle ainsi que pour toutes les pages suivantes, par exemple :

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// renvoie "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// renvoie "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// renvoie "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// renvoie "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

Vous pouvez modifier l'heure système en appelant [`setSystemTime`](/docs/api/clock/setSystemTime) ou [`tick`](/docs/api/clock/tick).

L'objet `FakeTimerInstallOpts` peut avoir les propriétés suivantes :

 ```ts
interface FakeTimerInstallOpts {
    // Installe de faux minuteurs avec l'époque Unix spécifiée
    // @default: 0
    now?: number | Date | undefined;

    // Un tableau contenant les noms des méthodes et API globales à simuler. Par défaut, WebdriverIO
    // ne remplace pas `nextTick()` et `queueMicrotask()`. Par exemple,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` simulera uniquement
    // `setTimeout()` et `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Le nombre maximal de minuteurs qui seront exécutés lors de l'appel à runAll() (par défaut : 1000)
    loopLimit?: number | undefined;

    // Indique à WebdriverIO d'incrémenter automatiquement le temps simulé en fonction du décalage
    // de l'heure système réelle (par ex. le temps simulé sera incrémenté de 20 ms pour chaque
    // variation de 20 ms de l'heure système réelle)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Pertinent uniquement avec shouldAdvanceTime: true. Incrémente le temps simulé de
    // advanceTimeDelta ms pour chaque variation de advanceTimeDelta ms de l'heure système réelle
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indique à FakeTimers d'effacer les minuteurs « natifs » (c.-à-d. non simulés) en déléguant
    // à leurs gestionnaires respectifs. Ceux-ci ne sont pas effacés par défaut, ce qui peut
    // entraîner un comportement inattendu si des minuteurs existaient avant l'installation de FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Appareil

La commande `emulate` prend également en charge l'émulation d'un appareil mobile ou de bureau spécifique. Elle ne doit en aucun cas être utilisée pour des tests mobiles, car les moteurs des navigateurs de bureau diffèrent de ceux des navigateurs mobiles. Elle ne doit être utilisée que si votre application présente un comportement spécifique pour les zones d'affichage de petite taille.

Pour un appareil, WebdriverIO :

- définit l'agent utilisateur à partir du descripteur
- définit la zone d'affichage et le facteur d'échelle de l'appareil
- définit `maxTouchPoints` à `1` lorsque le descripteur prend en charge le tactile, et réinitialise le tactile sinon
- définit la mise en page de texte mobile et la balise meta viewport lorsque le descripteur est mobile, et les réinitialise sinon

Il n'invente pas de taille d'écran ni d'orientation à partir du nom de l'appareil. La zone d'affichage n'est pas `screen.width`. Utilisez les portées `screen` et `orientation` pour cela.

La modification de la zone d'affichage est envoyée au contexte de niveau supérieur qui était actif lors de l'appel à `emulate`. La restauration de l'appareil redimensionne ce contexte, y compris après un passage à une autre fenêtre.

Si le navigateur rejette l'une de ces commandes, l'agent utilisateur, la zone d'affichage, le tactile, la mise en page de texte et la balise meta viewport précédents sont rétablis et l'erreur est renvoyée. Un agent utilisateur personnalisé ou une taille définie via `setViewport` n'est pas remplacé par une valeur par défaut.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testez votre application ...

// réinitialise l'agent utilisateur, la zone d'affichage, le tactile, la mise en page de texte et la balise meta viewport
await restore()
```

WebdriverIO maintient une liste fixe de [tous les appareils définis](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).