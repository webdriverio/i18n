---
id: setTimeout
title: setTimeout
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setTimeout.ts
---

Встановлює таймаути, пов'язані з поточною сесією. Тривалість таймаутів контролює таку
поведінку, як таймаути на впровадження скриптів, навігацію документів та отримання елементів.
Для отримання додаткової інформації та прикладів, див. [посібник з таймаутів](https://webdriver.io/docs/timeouts#selenium-timeouts).

:::info

Не рекомендується встановлювати `implicit` таймаути, оскільки вони впливають на поведінку WebdriverIO
і можуть викликати помилки в певних командах, наприклад, `waitForExist` з прапором reverse.

:::

##### Використання

```js
browser.setTimeout({ implicit, pageLoad, script })
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
      <td><code><var>timeouts</var></code></td>
      <td>`Timeouts`</td>
      <td>Об'єкт, що містить значення таймаутів сесії</td>
    </tr>
    <tr>
      <td><code><var>timeouts.implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Час у мілісекундах для повторної спроби стратегії пошуку елемента при пошуку елемента.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Час у мілісекундах для очікування завершення завантаження документа.</td>
    </tr>
    <tr>
      <td><code><var>timeouts.script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>Скрипти, введені за допомогою [`execute`](https://webdriver.io/docs/api/browser/execute) або [`executeAsync`](https://webdriver.io/docs/api/browser/executeAsync), будуть виконуватися, доки не досягнуть тривалості таймауту скрипта, яка також задається в мілісекундах.</td>
    </tr>
  </tbody>
</table>

##### Приклад

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