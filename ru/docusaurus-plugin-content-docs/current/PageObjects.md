---
id: pageobjects
title: Паттерн Page Object
description: "Структурируйте свои тесты с помощью паттерна Page Object, вынося селекторы и специфичные для страницы действия в переиспользуемые классы страниц."
---

Версия 5 WebdriverIO была разработана с учётом поддержки паттерна Page Object. Благодаря принципу «элементы как объекты первого класса» теперь можно создавать большие наборы тестов с использованием этого паттерна.

Для создания page objects не требуются дополнительные пакеты. Оказывается, чистые современные классы предоставляют все необходимые нам возможности:

- наследование между page objects
- ленивую загрузку элементов
- инкапсуляцию методов и действий

Цель использования page objects — абстрагировать любую информацию о странице от самих тестов. В идеале все селекторы или специфичные инструкции, уникальные для определённой страницы, следует хранить в page object, чтобы вы могли запускать свои тесты даже после полного редизайна страницы.

## Создание Page Object

Прежде всего нам нужен основной page object, который мы назовём `Page.js`. Он будет содержать общие селекторы или методы, которые унаследуют все page objects.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Мы всегда будем экспортировать (`export`) экземпляр page object и никогда не будем создавать этот экземпляр в тесте. Поскольку мы пишем end-to-end тесты, мы всегда рассматриваем страницу как конструкцию без состояния&mdash;так же, как каждый HTTP-запрос является конструкцией без состояния.

Конечно, браузер может хранить информацию о сессии и, следовательно, отображать разные страницы в зависимости от разных сессий, но это не должно отражаться в page object. Подобные изменения состояния должны находиться в ваших тестах.

Давайте начнём тестировать первую страницу. Для демонстрации мы используем в качестве подопытного сайт [The Internet](http://the-internet.herokuapp.com) от [Elemental Selenium](http://elementalselenium.com). Попробуем построить пример page object для [страницы входа](http://the-internet.herokuapp.com/login).

## Получение селекторов через `Get`

Первый шаг — описать все важные селекторы, необходимые в нашем объекте `login.page`, в виде функций-геттеров:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Определение селекторов в функциях-геттерах может выглядеть немного странно, но это действительно полезно. Эти функции вычисляются _при обращении к свойству_, а не при создании объекта. Благодаря этому вы всегда запрашиваете элемент перед выполнением действия над ним.

## Цепочки команд

WebdriverIO внутренне запоминает последний результат команды. Если вы объединяете в цепочку команду элемента с командой действия, он находит элемент из предыдущей команды и использует результат для выполнения действия. Благодаря этому можно убрать селектор (первый параметр), и команда будет выглядеть так просто:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Что по сути то же самое, что и:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

или

```js
await $('#username').setValue('Max Mustermann')
```

## Использование Page Objects в тестах

После того как вы определили необходимые элементы и методы для страницы, можно приступать к написанию теста для неё. Всё, что нужно для использования page object, — это импортировать его с помощью `import` (или `require`). Вот и всё!

Поскольку вы экспортировали уже созданный экземпляр page object, после импорта его можно сразу начать использовать.

Если вы используете фреймворк утверждений, ваши тесты могут быть ещё более выразительными:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

С точки зрения структуры имеет смысл разделять spec-файлы и page objects по разным директориям. Кроме того, можно давать каждому page object окончание `.page.js`. Так становится понятнее, что вы импортируете page object.

## Что дальше

Это базовый принцип написания page objects с WebdriverIO. Но вы можете создавать гораздо более сложные структуры page objects! Например, у вас могут быть отдельные page objects для модальных окон, или вы можете разбить огромный page object на разные классы (каждый из которых представляет отдельную часть веб-страницы), наследующиеся от основного page object. Этот паттерн действительно предоставляет множество возможностей для отделения информации о странице от тестов, что важно для поддержания структурированности и понятности набора тестов по мере роста проекта и количества тестов.

Этот пример (и ещё больше примеров page objects) можно найти в [папке `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) на GitHub.