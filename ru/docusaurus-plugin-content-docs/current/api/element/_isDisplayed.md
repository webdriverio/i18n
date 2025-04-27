---
id: isDisplayed
title: isDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

Возвращает true, если выбранный DOM-элемент отображается (даже когда элемент находится за пределами области просмотра). Использует
метод [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty),
предоставляемый браузером, чтобы определить, отображается элемент или нет. Поскольку WebdriverIO действует как 
реальный пользователь, значения по умолчанию для флагов `contentVisibilityAuto`, `opacityProperty` и `visibilityProperty` 
установлены в `true` для более строгого поведения по умолчанию. Это означает, что команда будет проверять, виден ли элемент
с учетом значений его свойств `content-visibility`, `opacity` и `visibility`.

Если вы также хотите проверить, находится ли элемент в области просмотра, укажите флаг `withinViewport` в команде.

:::info

В отличие от других команд элементов, WebdriverIO не будет ждать существования 
элемента для выполнения этой команды.

:::

WebdriverIO при проведении тестов в браузере использует [пользовательский скрипт](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts),
специально разработанный для оценки видимости элементов. Этот скрипт является ключевым при определении того, 
отображается ли элемент на странице. Напротив, для нативных мобильных тестовых сценариев с Appium, WebdriverIO
использует команду [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed),
предоставляемую Appium. Эта команда оценивает видимость элементов, используя критерии, установленные
базовым драйвером Appium, обеспечивая точные и специфичные для драйвера оценки для мобильных приложений.

##### Использование

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` для проверки, находится ли элемент в области просмотра. По умолчанию `false`.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` для проверки, имеет ли (или наследует) свойство content-visibility элемента значение auto, и в настоящее время пропускается его рендеринг. По умолчанию `true`.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` для проверки, имеет ли (или наследует) свойство opacity элемента значение 0. По умолчанию `true`.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>`true` для проверки, невидим ли элемент из-за значения его свойства visibility. По умолчанию `true`.</td>
    </tr>
  </tbody>
</table>

##### Примеры

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

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, если элемент отображается