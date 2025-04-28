---
id: timeouts
title: Tidsgränser
---

Each command in WebdriverIO is an asynchronous operation. A request is fired to the Selenium server (or a cloud service like [Sauce Labs](https://saucelabs.com)), and its response contains the result once the action has completed or failed.

Therefore, time is a crucial component in the whole testing process. When a certain action depends on the state of a different action, you need to make sure that they get executed in the right order. Timeouts play an important role when dealing with these issues.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver Tidsgränser

### Session Script Tidsgräns

En session har en tillhörande session script tidsgräns som anger en väntetid för asynkrona skript att köras. Om inget annat anges är den 30 sekunder. Du kan ställa in denna tidsgräns så här:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Session Page Load Tidsgräns

En session har en tillhörande session page load tidsgräns som anger en väntetid för att sidan ska laddas klart. Om inget annat anges är den 300 000 millisekunder.

Du kan ställa in denna tidsgräns så här:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Nyckelordet `pageLoad` är en del av den officiella WebDriver [specifikationen](https://www.w3.org/TR/webdriver/#set-timeouts), men kanske inte [stöds](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) för din webbläsare (det tidigare namnet är `page load`).

### Session Implicit Wait Tidsgräns

En session har en tillhörande session implicit wait tidsgräns. Detta anger tiden att vänta på den implicita elementlokaliseringsstrategin när element lokaliseras med hjälp av kommandona [`findElement`](/docs/api/webdriver#findelement) eller [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) eller [`$$`](/docs/api/browser/$$), respektive, när WebdriverIO körs med eller utan WDIO testrunner). Om inget annat anges är det 0 millisekunder.

Du kan ställa in denna tidsgräns via:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO-relaterade tidsgränser

### `WaitFor*` tidsgräns

WebdriverIO tillhandahåller flera kommandon för att vänta på att element ska nå ett visst tillstånd (t.ex. aktiverat, synligt, existerande). Dessa kommandon tar en väljare som argument och ett tidsgränsvärde, som bestämmer hur länge instansen ska vänta på att elementet ska nå det tillståndet. Alternativet `waitforTimeout` låter dig ställa in den globala tidsgränsen för alla `waitFor*`-kommandon, så du behöver inte ställa in samma tidsgräns om och om igen. _(Observera det gemena `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

I dina tester kan du nu göra detta:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Ramverksrelaterade tidsgränser

Testramverket du använder med WebdriverIO måste hantera tidsgränser, särskilt eftersom allt är asynkront. Det säkerställer att testprocessen inte fastnar om något går fel.

Som standard är tidsgränsen 10 sekunder, vilket innebär att ett enskilt test inte bör ta längre tid än så.

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

I Cucumber gäller tidsgränsen för en enda stegdefinition. Om du vill öka tidsgränsen eftersom ditt test tar längre tid än standardvärdet, måste du ställa in det i ramverksalternativen.

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