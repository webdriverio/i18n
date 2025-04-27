---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Ограничивает ЦП для эмуляции медленного процессора.

:::info

Обратите внимание, что использование команды `throttleCPU` требует поддержки протокола Chrome DevTools и, например,
не может использоваться при запуске автоматизированных тестов в облаке. Chrome DevTools протокол не устанавливается по умолчанию,
используйте `npm install puppeteer-core` для его установки.
Узнайте больше в разделе [Протоколы автоматизации](/docs/automationProtocols).

:::

##### Использование

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>коэффициент замедления (1 - без ограничений, 2 - замедление в 2 раза и т.д.)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```