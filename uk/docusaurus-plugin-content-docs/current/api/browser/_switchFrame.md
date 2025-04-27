---
id: switchFrame
title: switchFrame
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Перемикає активний контекст на фрейм, наприклад, iframe на сторінці. Існує кілька способів запиту фрейму
на сторінці:

  - Якщо надано рядок, він перемикається на фрейм з відповідним ідентифікатором контексту, URL-адресою або URL-адресою, що містить цей рядок
    ```ts
    // перемикання на фрейм, який має певну URL-адресу або містить рядок в URL-адресі
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Примітка: цей фрейм розташований у вкладеному iframe, однак вам потрібно лише вказати
    // URL-адресу фрейму вашого бажаного фрейму
    await browser.switchFrame('https://www.w3schools.com')
    // перевірити заголовок сторінки
    console.log(await browser.execute(() => [document.title, document.URL]))
    // виводить: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Якщо у вас є ідентифікатор контексту фрейму, ви можете використовувати його безпосередньо
    ```ts
    // перемикання на фрейм, який має певний ідентифікатор контексту
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Якщо надано елемент WebdriverIO, який посилається на елемент `iframe`, він перемкнеться на цей фрейм
    ```ts
    // перемикання на елемент фрейму, запитаний з поточного контексту
    await browser.switchFrame($('iframe'))
    ```

  - Якщо надано функцію, вона буде перебирати всі iframe на сторінці та викликати функцію в об'єкті контексту.
    Функція повинна повертати булеве значення, що вказує, чи слід вибрати фрейм. Функція
    буде виконана в браузері та дозволяє доступ до всіх веб-API, наприклад:
    ```ts
    // перемикання на перший фрейм, який містить елемент з id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // перемикання на перший фрейм, який містить "webdriver" в URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Якщо надано `null`, він перемкнеться на фрейм верхнього рівня
    ```ts
    // спочатку перемкнутися на фрейм
    await browser.switchFrame($('iframe'))
    // виконати більше автоматизації в цьому фреймі, потім...

    // перемкнутися на фрейм верхнього рівня
    await browser.switchFrame(null)
    ```

Після перемикання на фрейм усі подальші команди будуть виконуватися в контексті цього фрейму,
включаючи навігацію на різні сторінки.

##### Usage

```js
browser.switchFrame(context)
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
      <td><code><var>context</var></code></td>
      <td>`string, object, function`</td>
      <td></td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  ідентифікатор поточного активного контексту