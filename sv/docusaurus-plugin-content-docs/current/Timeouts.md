---
id: timeouts
title: Timeouts
description: "Konfigurera timeouts för WebDriver-sessioner, waitfor-timeouts i WebdriverIO och timeouts i testramverk för att hålla testerna tillförlitliga."
---

Varje kommando i WebdriverIO är en asynkron operation. En förfrågan skickas till Selenium-servern (eller en molntjänst som [Sauce Labs](https://saucelabs.com)), och dess svar innehåller resultatet när åtgärden har slutförts eller misslyckats.

Därför är tid en avgörande komponent i hela testprocessen. När en viss åtgärd beror på tillståndet hos en annan åtgärd måste du se till att de utförs i rätt ordning. Timeouts spelar en viktig roll när man hanterar dessa problem.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver-timeouts

### Sessionens script-timeout

En session har en tillhörande script-timeout som anger hur länge man ska vänta på att asynkrona skript körs. Om inget annat anges är den 30 sekunder. Du kan ställa in denna timeout så här:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Sessionens timeout för sidladdning

En session har en tillhörande timeout för sidladdning som anger hur länge man ska vänta på att sidan laddas klart. Om inget annat anges är den 300 000 millisekunder.

Du kan ställa in denna timeout så här:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` är namnet enligt WebDrivers [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts). WebdriverIO v10 accepterar endast den nyckeln.

### Sessionens timeout för implicit väntan

En session har en tillhörande timeout för implicit väntan. Denna anger hur länge man ska vänta för den implicita strategin för elementlokalisering när element lokaliseras med kommandona [`findElement`](/docs/api/webdriver#findelement) eller [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) respektive [`$$`](/docs/api/browser/$$) när WebdriverIO körs med eller utan WDIO-testrunnern). Om inget annat anges är den 0 millisekunder.

Du kan ställa in denna timeout via:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO-relaterade timeouts

### `WaitFor*`-timeout

WebdriverIO tillhandahåller flera kommandon för att vänta på att element ska nå ett visst tillstånd (t.ex. aktiverat, synligt, existerande). Dessa kommandon tar ett selektorargument och ett timeout-värde, som avgör hur länge instansen ska vänta på att elementet når tillståndet. Alternativet `waitforTimeout` låter dig ställa in den globala timeouten för alla `waitFor*`-kommandon, så att du inte behöver ange samma timeout om och om igen. _(Observera det gemena `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

I dina tester kan du nu göra så här:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Ramverksrelaterade timeouts

Testramverket du använder med WebdriverIO måste hantera timeouts, särskilt eftersom allt är asynkront. Det säkerställer att testprocessen inte fastnar om något går fel.

Som standard är timeouten 10 sekunder, vilket innebär att ett enskilt test inte bör ta längre tid än så.

Ett enskilt test i Mocha ser ut så här:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

I Cucumber gäller timeouten för en enskild stegdefinition. Om du däremot vill öka timeouten för att ditt test tar längre tid än standardvärdet måste du ställa in den i ramverkets alternativ.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>