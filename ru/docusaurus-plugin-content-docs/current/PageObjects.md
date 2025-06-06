---
id: pageobjects
title: Паттерн объектов страниц
---

Версия 5 WebdriverIO была разработана с учетом поддержки паттерна объектов страниц (Page Object Pattern). Благодаря введению принципа "элементы как первоклассные объекты", теперь возможно создавать крупные тестовые наборы, используя этот паттерн.

Для создания объектов страниц не требуются дополнительные пакеты. Оказывается, чистые современные классы предоставляют все необходимые функции:

- наследование между объектами страниц
- ленивая загрузка элементов
- инкапсуляция методов и действий

Цель использования объектов страниц — абстрагировать информацию о странице от самих тестов. В идеале, вы должны хранить все селекторы или специфические инструкции, уникальные для определенной страницы, в объекте страницы, чтобы вы могли запускать тесты даже после полного редизайна страницы.

## Создание объекта страницы

Сначала нам нужен основной объект страницы, который мы назовем `Page.js`. Он будет содержать общие селекторы или методы, которые будут наследовать все объекты страниц.

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

Мы всегда будем `export`-ировать экземпляр объекта страницы и никогда не создавать этот экземпляр в тесте. Поскольку мы пишем end-to-end тесты, мы всегда рассматриваем страницу как конструкцию без состояния — так же, как каждый HTTP-запрос является конструкцией без состояния.

Конечно, браузер может хранить информацию о сессии и, следовательно, отображать разные страницы на основе разных сессий, но это не должно отражаться в объекте страницы. Такие изменения состояния должны быть в ваших фактических тестах.

Давайте начнем тестировать первую страницу. Для демонстрационных целей мы используем сайт [The Internet](http://the-internet.herokuapp.com) от [Elemental Selenium](http://elementalselenium.com) в качестве подопытного. Попробуем создать пример объекта страницы для [страницы входа](http://the-internet.herokuapp.com/login).

## Получение селекторов с помощью `Get`

Первый шаг — написать все важные селекторы, которые нужны в нашем объекте `login.page`, в виде функций-геттеров:

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

Определение селекторов в функциях-геттерах может выглядеть немного странно, но это очень полезно. Эти функции вычисляются _когда вы обращаетесь к свойству_, а не когда вы создаете объект. Благодаря этому вы всегда запрашиваете элемент перед выполнением действия с ним.

## Цепочка команд

WebdriverIO внутренне запоминает последний результат команды. Если вы объединяете команду элемента с командой действия, он находит элемент из предыдущей команды и использует результат для выполнения действия. Таким образом, вы можете удалить селектор (первый параметр), и команда выглядит так просто:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Что в принципе то же самое, что и:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

или

```js
await $('#username').setValue('Max Mustermann')
```

## Использование объектов страниц в ваших тестах

После того, как вы определили необходимые элементы и методы для страницы, вы можете начать писать тесты для нее. Все, что вам нужно сделать для использования объекта страницы, это `import` (или `require`) его. Вот и все!

Поскольку вы экспортировали уже созданный экземпляр объекта страницы, импортирование позволяет сразу начать его использовать.

Если вы используете фреймворк для утверждений, ваши тесты могут быть еще более выразительными:

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

С точки зрения структуры, имеет смысл разделить файлы спецификаций и объекты страниц на разные каталоги. Кроме того, вы можете дать каждому объекту страницы окончание: `.page.js`. Это делает более понятным, что вы импортируете объект страницы.

## Дальнейшее развитие

Это основной принцип написания объектов страниц с WebdriverIO. Но вы можете создавать гораздо более сложные структуры объектов страниц, чем эта! Например, у вас могут быть специальные объекты страниц для модальных окон, или вы можете разделить огромный объект страницы на разные классы (каждый представляет разную часть общей веб-страницы), которые наследуются от главного объекта страницы. Этот паттерн действительно предоставляет много возможностей для отделения информации о странице от ваших тестов, что важно для поддержания структурированности и ясности вашего тестового набора в период роста проекта и увеличения количества тестов.

Вы можете найти этот пример (и еще больше примеров объектов страниц) в [`папке example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) на GitHub.