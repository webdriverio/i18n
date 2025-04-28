---
id: timeouts
title: Limity czasowe
---

Każde polecenie w WebdriverIO jest operacją asynchroniczną. Żądanie jest wysyłane do serwera Selenium (lub usługi chmurowej takiej jak [Sauce Labs](https://saucelabs.com)), a jego odpowiedź zawiera wynik po zakończeniu lub niepowodzeniu akcji.

Dlatego czas jest kluczowym elementem w całym procesie testowania. Gdy określona akcja zależy od stanu innej akcji, musisz upewnić się, że zostaną one wykonane we właściwej kolejności. Limity czasowe odgrywają ważną rolę w radzeniu sobie z tymi problemami.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Limity czasowe WebDrivera

### Limit czasowy skryptu sesji

Sesja ma powiązany limit czasowy skryptu sesji, który określa czas oczekiwania na wykonanie skryptów asynchronicznych. O ile nie określono inaczej, wynosi on 30 sekund. Możesz ustawić ten limit czasowy w następujący sposób:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Limit czasowy ładowania strony sesji

Sesja ma powiązany limit czasowy ładowania strony, który określa czas oczekiwania na zakończenie ładowania strony. O ile nie określono inaczej, wynosi on 300 000 milisekund.

Możesz ustawić ten limit czasowy w następujący sposób:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Słowo kluczowe `pageLoad` jest częścią oficjalnej [specyfikacji](https://www.w3.org/TR/webdriver/#set-timeouts) WebDrivera, ale może nie być [obsługiwane](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) dla Twojej przeglądarki (poprzednia nazwa to `page load`).

### Limit czasowy niejawnego oczekiwania sesji

Sesja ma powiązany limit czasowy niejawnego oczekiwania. Określa on czas oczekiwania na niejawną strategię lokalizacji elementów podczas lokalizowania elementów za pomocą poleceń [`findElement`](/docs/api/webdriver#findelement) lub [`findElements`](/docs/api/webdriver#findelements) (odpowiednio [`$`](/docs/api/browser/$) lub [`$$`](/docs/api/browser/$$), podczas uruchamiania WebdriverIO z lub bez testunnera WDIO). O ile nie określono inaczej, wynosi on 0 milisekund.

Możesz ustawić ten limit czasowy za pomocą:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Limity czasowe związane z WebdriverIO

### Limit czasowy `WaitFor*`

WebdriverIO zapewnia wiele poleceń do oczekiwania, aż element osiągnie określony stan (np. włączony, widoczny, istniejący). Te polecenia przyjmują argument selektora i numer limitu czasowego, który określa, jak długo instancja powinna czekać na osiągnięcie stanu przez ten element. Opcja `waitforTimeout` pozwala ustawić globalny limit czasowy dla wszystkich poleceń `waitFor*`, więc nie musisz ustawiać tego samego limitu czasowego wielokrotnie. _(Uwaga na małą literę `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

W testach możesz teraz zrobić to:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// możesz również nadpisać domyślny limit czasowy w razie potrzeby
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Limity czasowe związane z frameworkiem

Framework testowy, którego używasz z WebdriverIO, musi radzić sobie z limitami czasowymi, szczególnie ponieważ wszystko jest asynchroniczne. Zapewnia to, że proces testowy nie zostanie zablokowany, jeśli coś pójdzie nie tak.

Domyślnie limit czasowy wynosi 10 sekund, co oznacza, że pojedynczy test nie powinien trwać dłużej.

Pojedynczy test w Mocha wygląda tak:

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

W Cucumber limit czasowy ma zastosowanie do pojedynczej definicji kroku. Jeśli jednak chcesz zwiększyć limit czasowy, ponieważ twój test trwa dłużej niż wartość domyślna, musisz ustawić go w opcjach frameworka.

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