---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Zwraca true, jeśli wybrany element DOM jest wyświetlany (nawet jeśli element znajduje się poza widocznym obszarem). Wykorzystuje do tego metodę [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty) udostępnianą przez przeglądarkę, aby określić, czy element jest wyświetlany czy nie. Ponieważ WebdriverIO działa jak prawdziwy użytkownik, domyślne wartości flag `contentVisibilityAuto`, `opacityProperty` i `visibilityProperty` są ustawione na `true`, aby zachować bardziej rygorystyczne zachowanie. Oznacza to, że polecenie sprawdzi, czy element jest widoczny na podstawie wartości jego właściwości `content-visibility`, `opacity` i `visibility`.

Jeśli chcesz również sprawdzić, czy element znajduje się w widocznym obszarze, przekaż flagę `withinViewport` do polecenia.

:::info

W przeciwieństwie do innych poleceń elementu, WebdriverIO nie będzie czekać na istnienie elementu, aby wykonać to polecenie.

:::

WebdriverIO, prowadząc testy przeglądarki, wykorzystuje [niestandardowy skrypt](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts) specjalnie zaprojektowany do oceny widoczności elementów. Ten skrypt jest kluczowy w określaniu, czy element jest wyświetlany na stronie. Z kolei w przypadku natywnych testów mobilnych z Appium, WebdriverIO korzysta z polecenia [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed) dostarczanego przez Appium. To polecenie ocenia widoczność elementów przy użyciu kryteriów ustalonych przez bazowy sterownik Appium, zapewniając dokładną i specyficzną dla sterownika ocenę dla aplikacji mobilnych.

##### Użycie

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>`true` aby sprawdzić, czy element znajduje się w widocznym obszarze. Domyślnie `false`.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>`true` aby sprawdzić, czy właściwość content-visibility elementu ma (lub dziedziczy) wartość auto i obecnie pomija renderowanie. Domyślnie `true`.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>`true` aby sprawdzić, czy właściwość opacity elementu ma (lub dziedziczy) wartość 0. Domyślnie `true`.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`Boolean`</td>
      <td>`true` aby sprawdzić, czy element jest niewidoczny z powodu wartości jego właściwości visibility. Domyślnie `true`.</td>
    </tr>
  </tbody>
</table>

##### Przykłady

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true jeśli element jest wyświetlany