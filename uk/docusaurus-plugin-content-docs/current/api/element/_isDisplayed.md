---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Повертає true, якщо вибраний DOM-елемент відображається (навіть коли елемент знаходиться за межами області перегляду). Він використовує
метод [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty),
що надається браузером, для визначення, чи відображається елемент. Оскільки WebdriverIO діє як
реальний користувач, значення за замовчуванням для прапорців `contentVisibilityAuto`, `opacityProperty` та `visibilityProperty`
встановлено як `true` для забезпечення більш строгої поведінки. Це означає, що команда перевірятиме, чи елемент
видимий, враховуючи значення його властивостей `content-visibility`, `opacity` та `visibility`.

Якщо ви також хочете перевірити, чи елемент знаходиться в області перегляду, надайте команді прапорець `withinViewport`.

:::info

На відміну від інших команд елементів, WebdriverIO не чекатиме, доки елемент
існуватиме, щоб виконати цю команду.

:::

WebdriverIO при проведенні тестів браузера використовує [спеціальний скрипт](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts),
спеціально розроблений для оцінки видимості елементів. Цей скрипт є ключовим у визначенні, чи
елемент відображається на сторінці. З іншого боку, для сценаріїв нативного мобільного тестування з Appium, WebdriverIO
покладається на команду [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed),
що надається Appium. Ця команда оцінює видимість елементів за критеріями, встановленими
базовим драйвером Appium, забезпечуючи точну та специфічну для драйвера оцінку для мобільних додатків.

##### Використання

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Boolean`</td>
      <td>`true` для перевірки, чи елемент знаходиться в області перегляду. `false` за замовчуванням.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Boolean`</td>
      <td>`true` для перевірки, чи властивість content-visibility елемента має (або успадковує) значення auto, і наразі пропускає своє відображення. `true` за замовчуванням.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Boolean`</td>
      <td>`true` для перевірки, чи властивість opacity елемента має (або успадковує) значення 0. `true` за замовчуванням.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Boolean`</td>
      <td>`true` для перевірки, чи елемент невидимий через значення його властивості visibility. `true` за замовчуванням.</td>
    </tr>
  </tbody>
</table>

##### Приклади

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

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, якщо елемент відображається