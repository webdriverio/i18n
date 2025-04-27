---
id: swipe
title: свайп
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/swipe.ts
---

Свайп в определенном направлении в пределах области просмотра или элемента для веб-приложений на компьютере/мобильных устройствах <strong>И</strong> нативных мобильных приложений.

:::info

Свайп для нативных мобильных приложений основан на протоколе W3C-actions, имитирующем нажатие и движение пальцем.
Это отличается от команды [`mobile: scrollGesture`](https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md#mobile-scrollgesture) для Android
или [`mobile: scroll`](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/#mobile-scroll) для iOS, которые основаны на протоколе Appium Driver и
доступны только для мобильных платформ в контексте NATIVE.

Эта команда работает только со следующими обновленными компонентами:
 - Appium сервер (версия 2.0.0 или выше)
 - `appium-uiautomator2-driver` (для Android)
 - `appium-xcuitest-driver` (для iOS)

Убедитесь, что ваша локальная среда Appium или среда Appium в облаке регулярно обновляется, чтобы избежать проблем совместимости.

:::

:::caution Свайп на основе координат

Избегайте использования опций `from` и `to`, если в этом нет абсолютной необходимости. Они зависят от устройства и могут работать неодинаково на разных устройствах.
Используйте опцию `scrollableElement` для надежных свайпов внутри элемента.

:::

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`object, boolean`</td>
      <td>опции для `browser.swipe()`. По умолчанию для компьютерного/мобильного веба: <br/> `{ direction: 'up', duration: 1500, percent: 0.95, scrollableElement: WebdriverIO.Element }`</td>
    </tr>
    <tr>
      <td><code><var>options.direction</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`string`</td>
      <td>Может быть одним из `down`, `up`, `left` или `right`, по умолчанию `up`. <br /><strong>ТОЛЬКО-ДЛЯ-НАТИВНЫХ-МОБИЛЬНЫХ-ПРИЛОЖЕНИЙ</strong></td>
    </tr>
    <tr>
                      <td colspan="3"><strong>Down (Вниз)</strong><br /><strong>Начальная точка:</strong><br/>Вы помещаете палец ближе к верхней части экрана.<br/><strong>Движение:</strong><br/>Вы проводите пальцем вниз к нижней части экрана.<br/><strong>Действие:</strong><br/>Это также зависит от контекста:<br />- На главном экране или в приложениях это обычно прокручивает содержимое вверх.<br />- От верхнего края часто открывает панель уведомлений или быстрые настройки.<br />- В браузерах или приложениях для чтения может использоваться для прокрутки контента.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Left (Влево)</strong><br /><strong>Начальная точка:</strong><br/>Вы помещаете палец на правую сторону экрана.<br/><strong>Движение:</strong><br/>Вы проводите пальцем горизонтально влево.><br/><strong>Действие:</strong><br/>Реакция на этот жест зависит от приложения:<br />- Может перейти к следующему элементу в карусели или набору изображений.<br />- В контексте навигации может вернуться на предыдущую страницу или закрыть текущий вид.<br />- На главном экране обычно переключается на следующий виртуальный рабочий стол или экран.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Right (Вправо)</strong><br /><strong>Начальная точка:</strong><br/>Вы помещаете палец на левую сторону экрана.<br/><strong>Движение:</strong><br/>Вы проводите пальцем горизонтально вправо.<br/><strong>Действие:</strong><br/>Аналогично свайпу влево, но в противоположном направлении:<br />-- Часто перемещается к предыдущему элементу в карусели или галерее.<br />- Может использоваться для открытия боковых меню или панелей навигации в приложениях.<br />- На главном экране обычно переключается на предыдущий виртуальный рабочий стол.</td>
            </tr>
    <tr>
                      <td colspan="3"><strong>Up (Вверх)</strong><br /><strong>Начальная точка:</strong><br/>Вы помещаете палец ближе к нижней части экрана.<br/><strong>Движение:</strong><br/>Вы проводите пальцем вверх к верхней части экрана.><br/><strong>Действие:</strong><br/>В зависимости от контекста могут произойти различные действия:<br />- На главном экране или в списке это обычно прокручивает содержимое вниз.<br />- В полноэкранном приложении может открыть дополнительные опции или меню приложений.<br />- В определенных интерфейсах может вызвать действие 'обновления' или открыть строку поиска.</td>
            </tr>
    <tr>
      <td><code><var>options.duration</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Продолжительность свайпа в миллисекундах. По умолчанию `1500` мс. Чем ниже значение, тем быстрее свайп.</td>
    </tr>
    <tr>
      <td><code><var>options.scrollableElement</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Element`</td>
      <td>Элемент, внутри которого выполняется свайп. Если элемент не указан, будет использоваться следующий селектор для iOS `-ios predicate string:type == "XCUIElementTypeApplication"` и следующий для Android `//android.widget.ScrollView'`. Если несколько элементов соответствуют селектору по умолчанию, то по умолчанию будет выбран первый подходящий элемент. <br /> <strong>ТОЛЬКО-ДЛЯ-НАТИВНЫХ-МОБИЛЬНЫХ-ПРИЛОЖЕНИЙ</strong></td>
    </tr>
    <tr>
      <td><code><var>options.percent</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Процент (стандартного) прокручиваемого элемента для свайпа. Это значение от 0 до 1. По умолчанию `0.95`.<br /><strong>НИКОГДА</strong> не делайте свайп с точного верха|низа|левой|правой части экрана, вы можете активировать, например, панель уведомлений или другие функции ОС/приложения, что может привести к неожиданным результатам.<br />Это не имеет эффекта, если указаны `from` и `to`.</td>
    </tr>
    <tr>
              <td colspan="3"><strong>Следующие значения <strong>ТОЛЬКО</strong> имеют эффект, если `scrollableElement` <strong>НЕ</strong> указан, иначе они игнорируются.</strong></td>
            </tr>
    <tr>
      <td><code><var>options.from</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`object`</td>
      <td>Координаты x и y начала свайпа. Если указан `scrollableElement`, то эти координаты не имеют эффекта.</td>
    </tr>
    <tr>
      <td><code><var>options.from.x</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Координата x начала свайпа.</td>
    </tr>
    <tr>
      <td><code><var>options.from.y</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Координата y начала свайпа.</td>
    </tr>
    <tr>
      <td><code><var>options.to</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`object`</td>
      <td>Координаты x и y конца свайпа. Если указан `scrollableElement`, то эти координаты не имеют эффекта.</td>
    </tr>
    <tr>
      <td><code><var>options.to.x</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Координата x конца свайпа.</td>
    </tr>
    <tr>
      <td><code><var>options.to.y</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Координата y конца свайпа.</td>
    </tr>
  </tbody>
</table>

##### Примеры

```js title="swipe.js"
it('should execute a default swipe', async () => {
    // Default will be a swipe from the bottom to the top, meaning it will swipe UP
    await browser.swipe();
});

```

```js title="swipe.with.options.js"
it('should execute a swipe with options', async () => {
    await browser.swipe({
        direction: 'left',                  // Swipe from right to left
        duration: 5000,                     // Last for 5 seconds
        percent: 0.5,                       // Swipe 50% of the scrollableElement
        scrollableElement: $('~carousel'),  // The element to swipe within
    })
});
```