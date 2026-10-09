---
id: timeouts
title: Limity czasu
description: "Skonfiguruj limity czasu sesji WebDriver, limity czasu waitfor w WebdriverIO oraz limity czasu frameworka testowego, aby zachować niezawodność testów."
---

Każde polecenie w WebdriverIO jest operacją asynchroniczną. Żądanie jest wysyłane do serwera Selenium (lub usługi chmurowej, takiej jak [Sauce Labs](https://saucelabs.com)), a jego odpowiedź zawiera wynik po zakończeniu lub niepowodzeniu akcji.

Dlatego czas jest kluczowym elementem całego procesu testowania. Gdy określona akcja zależy od stanu innej akcji, musisz upewnić się, że są one wykonywane we właściwej kolejności. Limity czasu odgrywają ważną rolę w rozwiązywaniu tych problemów.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Limity czasu WebDriver

### Limit czasu skryptu sesji

Sesja ma powiązany limit czasu skryptu sesji, który określa czas oczekiwania na wykonanie skryptów asynchronicznych. O ile nie określono inaczej, wynosi on 30 sekund. Możesz ustawić ten limit czasu w następujący sposób:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Limit czasu ładowania strony sesji

Sesja ma powiązany limit czasu ładowania strony, który określa czas oczekiwania na zakończenie ładowania strony. O ile nie określono inaczej, wynosi on 300 000 milisekund.

Możesz ustawić ten limit czasu w następujący sposób:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` to nazwa z [limitów czasu](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver. WebdriverIO v10 akceptuje wyłącznie ten klucz.

### Limit czasu niejawnego oczekiwania sesji

Sesja ma powiązany limit czasu niejawnego oczekiwania. Określa on czas oczekiwania dla niejawnej strategii lokalizowania elementów podczas wyszukiwania elementów za pomocą poleceń [`findElement`](/docs/api/webdriver#findelement) lub [`findElements`](/docs/api/webdriver#findelements) (odpowiednio [`$`](/docs/api/browser/$) lub [`$$`](/docs/api/browser/$$) podczas uruchamiania WebdriverIO z testrunnerem WDIO lub bez niego). O ile nie określono inaczej, wynosi on 0 milisekund.

Możesz ustawić ten limit czasu za pomocą:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Limity czasu związane z WebdriverIO

### Limit czasu `WaitFor*`

WebdriverIO udostępnia wiele poleceń do oczekiwania, aż elementy osiągną określony stan (np. włączony, widoczny, istniejący). Polecenia te przyjmują argument selektora oraz liczbę określającą limit czasu, która decyduje, jak długo instancja ma czekać, aż element osiągnie dany stan. Opcja `waitforTimeout` pozwala ustawić globalny limit czasu dla wszystkich poleceń `waitFor*`, dzięki czemu nie musisz wielokrotnie ustawiać tego samego limitu. _(Zwróć uwagę na małą literę `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

W swoich testach możesz teraz zrobić tak:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// możesz także nadpisać domyślny limit czasu, jeśli to konieczne
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Limity czasu związane z frameworkiem

Framework testowy, którego używasz z WebdriverIO, musi radzić sobie z limitami czasu, zwłaszcza że wszystko jest asynchroniczne. Zapewnia to, że proces testowy nie utknie, jeśli coś pójdzie nie tak.

Domyślnie limit czasu wynosi 10 sekund, co oznacza, że pojedynczy test nie powinien trwać dłużej.

Pojedynczy test w Mocha wygląda następująco:

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

W Cucumber limit czasu dotyczy pojedynczej definicji kroku. Jeśli jednak chcesz zwiększyć limit czasu, ponieważ Twój test trwa dłużej niż wartość domyślna, musisz ustawić go w opcjach frameworka.

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