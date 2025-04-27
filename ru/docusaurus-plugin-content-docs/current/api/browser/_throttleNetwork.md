---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Ограничение сетевых возможностей браузера. Это может помочь
эмулировать определенные сценарии, когда пользователь теряет интернет-соединение,
и ваше приложение должно это учитывать.

Доступно множество предустановок с конфигурациями по умолчанию для удобства использования.
Они включают `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Вы можете увидеть значения для этих предустановок [в исходном коде](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Обратите внимание, что использование команды `throttleNetwork` требует поддержки протокола Chrome DevTools и, например,
не может использоваться при запуске автоматизированных тестов в облаке. Chrome DevTools protocol не устанавливается по умолчанию,
используйте `npm install puppeteer-core` для его установки.
Узнайте больше в разделе [Протоколы автоматизации](/docs/automationProtocols).

:::

##### Использование

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>параметры для ограничения</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True для эмуляции отключения интернета.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Минимальная задержка от отправки запроса до получения заголовков ответа (мс).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Максимальная совокупная пропускная способность загрузки (байт/сек). -1 отключает ограничение загрузки.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Максимальная совокупная пропускная способность отправки (байт/сек). -1 отключает ограничение отправки.</td>
    </tr>
  </tbody>
</table>

##### Пример

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