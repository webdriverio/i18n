---
id: switchFrame
title: переключить фрейм
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/switchFrame.ts
---

Переключает активный контекст на фрейм, например, на iframe на странице. Существует несколько способов запроса фрейма 
на странице:

  - Если задана строка, он переключается на фрейм с соответствующим идентификатором контекста, URL или URL, содержащим эту строку
    ```ts
    // переключиться на фрейм, который имеет определенный URL или содержит строку в URL
    await browser.url('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
    // Примечание: этот фрейм находится во вложенном iframe, однако вам нужно только указать
    // URL фрейма вашего желаемого фрейма
    await browser.switchFrame('https://www.w3schools.com')
    // проверить заголовок страницы
    console.log(await browser.execute(() => [document.title, document.URL]))
    // выводит: [ 'W3Schools Online Web Tutorials', 'https://www.w3schools.com/' ]
    ```

  - Если у вас есть идентификатор контекста фрейма, вы можете использовать его напрямую
    ```ts
    // переключиться на фрейм, который имеет определенный идентификатор контекста
    await browser.switchFrame('A5734774C41F8C91D483BDD4022B2EF3')
    ```

  - Если задан элемент WebdriverIO, который ссылается на элемент `iframe`, он переключится на этот фрейм
    ```ts
    // переключиться на элемент фрейма, запрошенный из текущего контекста
    await browser.switchFrame($('iframe'))
    ```

  - Если задана функция, она будет перебирать все iframe на странице и вызывать функцию в рамках объекта
    контекста. Функция должна возвращать логическое значение, указывающее, должен ли быть выбран фрейм. Функция
    будет выполняться в браузере и позволяет получить доступ ко всем веб-API, например:
    ```ts
    // переключиться на первый фрейм, который содержит элемент с id "#frameContent"
    await browser.switchFrame(() => Boolean(document.querySelector('#frameContent')))
    // переключиться на первый фрейм, который содержит "webdriver" в URL
    await browser.switchFrame(() => document.URL.includes('webdriver'))
    ```

  - Если задано значение `null`, он переключится на фрейм верхнего уровня
    ```ts
    // сначала переключиться во фрейм
    await browser.switchFrame($('iframe'))
    // выполнить больше автоматизации в этом фрейме, затем...

    // переключиться на фрейм верхнего уровня
    await browser.switchFrame(null)
    ```

После переключения на фрейм все последующие команды будут выполняться в контексте этого фрейма,
включая переход на другие страницы.

##### Использование

```js
browser.switchFrame(context)
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
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

##### Возвращает

- **&lt;`Promise<string>`&gt;**
            **<code><var>returns</var></code>:**  текущий активный идентификатор контекста