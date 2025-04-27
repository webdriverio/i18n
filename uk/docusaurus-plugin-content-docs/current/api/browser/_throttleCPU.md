---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Обмежує потужність процесора для імітації повільнішого процесора.

:::info

Зауважте, що використання команди `throttleCPU` вимагає підтримки протоколу Chrome DevTools і, наприклад,
не може використовуватися при запуску автоматизованих тестів у хмарі. Протокол Chrome DevTools не встановлюється за замовчуванням,
використовуйте `npm install puppeteer-core` для його встановлення.
Дізнайтеся більше в розділі [Протоколи автоматизації](/docs/automationProtocols).

:::

##### Використання

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>коефіцієнт уповільнення (1 - без обмеження, 2 - уповільнення у 2 рази тощо)</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```