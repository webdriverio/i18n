---
id: emulation
title: Émulation
---

Avec WebdriverIO, vous pouvez émuler des API Web en utilisant la commande [`emulate`](/docs/api/browser/emulate) pour renvoyer des valeurs personnalisées qui vous aident à émuler certains comportements du navigateur. Notez que cela nécessite que votre application utilise explicitement ces API.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

Cette fonctionnalité nécessite la prise en charge de WebDriver Bidi pour le navigateur. Bien que les versions récentes de Chrome, Edge et Firefox disposent de cette prise en charge, Safari __ne la prend pas en charge__. Pour les mises à jour, suivez [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned). De plus, si vous utilisez un fournisseur cloud pour déployer des navigateurs, assurez-vous que votre fournisseur prend également en charge WebDriver Bidi.

Pour activer WebDriver Bidi pour votre test, assurez-vous d'avoir défini `webSocketUrl: true` dans vos capacités.

:::

## Géolocalisation

Changez la géolocalisation du navigateur pour une zone spécifique, par exemple :

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // affiche : "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

Cela va modifier le comportement de [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) et renvoyer l'emplacement que vous avez fourni.

## Schéma de couleurs

Changez la configuration du schéma de couleurs par défaut du navigateur via :

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // affiche : "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // affiche : "#000000"
```

Cela modifiera le comportement de [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) lorsque vous interrogez le schéma de couleurs via `(prefers-color-scheme: dark)`.

## Agent utilisateur

Changez l'agent utilisateur du navigateur pour une chaîne différente via :

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

Cela changera la valeur de [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent). Notez que les fournisseurs de navigateurs abandonnent progressivement l'Agent Utilisateur.

## Propriété onLine

Changez le statut en ligne du navigateur via :

```ts
await browser.emulate('onLine', false)
```

Cela __ne coupera pas__ le trafic réseau entre le navigateur et Internet et ne changera que la valeur de retour de [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine). Si vous souhaitez modifier les capacités réseau du navigateur, consultez la commande [`throttleNetwork`](/docs/api/browser/throttleNetwork).

## Horloge

Vous pouvez modifier l'horloge système du navigateur à l'aide de la commande [`emulate`](/docs/emulation). Elle remplace les fonctions globales natives liées au temps, permettant de les contrôler de manière synchrone via `clock.tick()` ou l'objet d'horloge généré. Cela inclut le contrôle de :

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

L'horloge démarre à l'époque unix (timestamp de 0). Cela signifie que lorsque vous instanciez un nouvel objet Date dans votre application, il aura une heure correspondant au 1er janvier 1970 si vous ne passez pas d'autres options à la commande `emulate`.

##### Exemple

Lorsque vous appelez `browser.emulate('clock', { ... })`, cela remplacera immédiatement les fonctions globales pour la page actuelle ainsi que toutes les pages suivantes, par exemple :

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
    // Installe des minuteries factices avec l'époque unix spécifiée
    // @default: 0
    now?: number | Date | undefined;

    // Un tableau avec les noms des méthodes globales et des API à simuler. Par défaut, WebdriverIO
    // ne remplace pas `nextTick()` et `queueMicrotask()`. Par exemple,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` ne simulera que
    // `setTimeout()` et `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // Le nombre maximum de minuteries qui seront exécutées lors de l'appel de runAll() (par défaut : 1000)
    loopLimit?: number | undefined;

    // Indique à WebdriverIO d'incrémenter automatiquement le temps simulé en fonction du changement
    // de temps système réel (par exemple, le temps simulé sera incrémenté de 20 ms pour chaque changement
    // de 20 ms dans le temps système réel)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Pertinent uniquement lors de l'utilisation avec shouldAdvanceTime: true. Incrémente le temps simulé de
    // advanceTimeDelta ms pour chaque changement de advanceTimeDelta ms dans le temps système réel
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Indique à FakeTimers d'effacer les minuteries 'natives' (c'est-à-dire non factices) en déléguant à leurs
    // gestionnaires respectifs. Celles-ci ne sont pas effacées par défaut, ce qui peut entraîner un comportement
    // inattendu si des minuteries existaient avant l'installation de FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## Appareil

La commande `emulate` prend également en charge l'émulation d'un certain appareil mobile ou de bureau en modifiant la fenêtre d'affichage, le facteur d'échelle de l'appareil et l'agent utilisateur. Cela ne devrait en aucun cas être utilisé pour les tests mobiles, car les moteurs de navigateur de bureau diffèrent de ceux des mobiles. Cela ne devrait être utilisé que si votre application offre un comportement spécifique pour les tailles de fenêtre d'affichage plus petites.

Par exemple, pour changer l'agent utilisateur et la fenêtre d'affichage pour un iPhone 15, exécutez simplement :

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// testez votre application ...

// réinitialiser la fenêtre d'affichage et l'agent utilisateur d'origine
await restore()
```

WebdriverIO maintient une liste fixe de [tous les appareils définis](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts).