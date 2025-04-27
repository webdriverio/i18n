---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Устанавливает тайм-ауты, связанные с текущей сессией, продолжительность тайм-аутов контролирует такое
поведение, как тайм-ауты при внедрении скриптов, навигации по документам и извлечении элементов.
Для получения дополнительной информации и примеров, смотрите [руководство по тайм-аутам](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Не рекомендуется устанавливать `implicit` тайм-ауты, так как они влияют на поведение WebdriverIO
и могут вызывать ошибки в определенных командах, например, `waitForExist` с обратным флагом.

:::

##### Usage

```js
browser.setTimeout({ implicit, pageLoad, script })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Объект, содержащий значения тайм-аутов сессии</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Время в миллисекундах для повторения стратегии поиска элемента при поиске элемента.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Время в миллисекундах для ожидания завершения загрузки документа.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Скрипты, внедренные с помощью [`execute`](https://webdriver.io/docs/api/browser/execute) или [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync), будут выполняться до тех пор, пока они не достигнут продолжительности тайм-аута скрипта, которая также указывается в миллисекундах.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="setTimeout.js"
it('should change timeout duration for session with long code duration', async () => {
    await browser.setTimeout({
        'pageLoad': 10000,
        'script': 60000
    });
    // Execute code which takes a long time
    await browser.executeAsync((done) => {
        console.log('Wake me up before you go!');
        setTimeout(done, 59000);
    });
});
```