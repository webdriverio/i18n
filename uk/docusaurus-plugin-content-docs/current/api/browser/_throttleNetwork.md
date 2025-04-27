---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Обмежує мережеві можливості браузера. Це може допомогти емулювати певні сценарії, коли користувач втрачає з'єднання з Інтернетом, і ваш додаток повинен вирішити цю проблему.

Існує багато попередньо встановлених конфігурацій для зручного використання.
Це `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Ви можете побачити значення для цих пресетів [у вихідному коді](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Зауважте, що використання команди `throttleNetwork` вимагає підтримки протоколу Chrome DevTools і, наприклад,
не може використовуватися при запуску автоматизованих тестів у хмарі. Chrome DevTools не встановлюється за замовчуванням,
використовуйте `npm install puppeteer-core` для його встановлення.
Дізнайтеся більше в розділі [Протоколи автоматизації](/docs/automationProtocols).

:::

##### Використання

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Ім'я</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>параметри для обмеження</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True для емуляції відключення від Інтернету.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Мінімальна затримка від надсилання запиту до отримання заголовків відповіді (мс).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Максимальна сукупна пропускна здатність завантаження (байт/сек). -1 вимикає обмеження завантаження.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Максимальна сукупна пропускна здатність вивантаження (байт/сек). -1 вимикає обмеження вивантаження.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```