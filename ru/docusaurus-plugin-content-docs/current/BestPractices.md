---
id: bestpractices
title: Лучшие практики
---

# Лучшие практики

Это руководство поможет вам узнать наши лучшие практики, которые помогут писать производительные и надежные тесты.

## Используйте устойчивые селекторы

Используя селекторы, устойчивые к изменениям в DOM, у вас будет меньше или вообще не будет падающих тестов, когда, например, класс будет удален из элемента.

Классы могут применяться к нескольким элементам, и их следует избегать, если это возможно, если вы специально не хотите получить все элементы с этим классом.

```js
// 👎
await $('.button')
```

Все эти селекторы должны возвращать один элемент.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Примечание:__ Чтобы узнать о всех возможных селекторах, которые поддерживает WebdriverIO, посмотрите нашу страницу [Selectors](./Selectors.md).

## Ограничьте количество запросов элементов

Каждый раз, когда вы используете команду [`$`](https://webdriver.io/docs/api/browser/$) или [`$$`](https://webdriver.io/docs/api/browser/$$) (это включает их цепочки), WebdriverIO пытается найти элемент в DOM. Эти запросы дорогостоящие, поэтому вы должны стараться ограничивать их как можно больше.

Запрашивает три элемента.

```js
// 👎
await $('table').$('tr').$('td')
```

Запрашивает только один элемент.

``` js
// 👍
await $('table tr td')
```

Единственный случай, когда вы должны использовать цепочки - это когда вы хотите комбинировать различные [стратегии селекторов](https://webdriver.io/docs/selectors/#custom-selector-strategies).
В примере мы используем [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), что является стратегией проникновения в теневой DOM элемента.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Предпочитайте поиск одного элемента вместо выбора из списка

Это не всегда возможно, но используя CSS псевдоклассы, такие как [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), вы можете сопоставлять элементы на основе индексов элементов в дочернем списке их родителей.

Запрашивает все строки таблицы.

```js
// 👎
await $$('table tr')[15]
```

Запрашивает одну строку таблицы.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Используйте встроенные утверждения

Не используйте ручные утверждения, которые не ждут автоматически, пока результаты не совпадут, так как это приведет к нестабильным тестам.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Используя встроенные утверждения, WebdriverIO будет автоматически ждать, пока фактический результат не совпадет с ожидаемым результатом, что приведет к устойчивым тестам.
Это достигается за счет автоматического повторения утверждения, пока оно не пройдет или не истечет время ожидания.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Ленивая загрузка и цепочки обещаний

WebdriverIO имеет несколько хитростей в рукаве, когда дело доходит до написания чистого кода, так как он может лениво загружать элемент, что позволяет вам создавать цепочки обещаний и уменьшать количество `await`. Это также позволяет передавать элемент как ChainablePromiseElement вместо Element и для более удобного использования с объектами страниц.

Так когда же вам нужно использовать `await`?
Вы всегда должны использовать `await` за исключением команд `$` и `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// или
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// или
await $('div').$('button').click()
```

## Не злоупотребляйте командами и утверждениями

Когда вы используете expect.toBeDisplayed, вы неявно также ждете, пока элемент будет существовать. Нет необходимости использовать команды waitForXXX, когда у вас уже есть утверждение, выполняющее то же самое.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Нет необходимости ждать, пока элемент будет существовать или отображаться при взаимодействии или при утверждении чего-то вроде его текста, если элемент не может быть явно невидимым (например, opacity: 0) или явно отключенным (например, атрибут disabled), в этом случае ожидание отображения элемента имеет смысл.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Динамические тесты

Используйте переменные окружения для хранения динамических тестовых данных, например, секретных учетных данных, в вашей среде, а не жестко кодируйте их в тест. Перейдите на страницу [Parameterize Tests](parameterize-tests) для получения дополнительной информации по этой теме.

## Проверяйте свой код с помощью линтера

Используя eslint для проверки кода, вы можете потенциально обнаружить ошибки на ранней стадии, используйте наши [правила линтинга](https://www.npmjs.com/package/eslint-plugin-wdio), чтобы убедиться, что некоторые из лучших практик всегда применяются.

## Не используйте паузы

Может возникнуть соблазн использовать команду pause, но это плохая идея, так как она не является устойчивой и в долгосрочной перспективе приведет только к нестабильным тестам.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // ждем, пока кнопка отправки станет активной
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Асинхронные циклы

Когда у вас есть асинхронный код, который вы хотите повторить, важно знать, что не все циклы могут это делать.
Например, функция forEach массива не позволяет использовать асинхронные обратные вызовы, как можно прочитать на [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Примечание:__ Вы все еще можете использовать их, когда вам не нужно, чтобы операция была асинхронной, как показано в этом примере `console.log(await $$('h1').map((h1) => h1.getText()))`.

Ниже приведены примеры того, что это значит.

Следующий код не будет работать, так как асинхронные обратные вызовы не поддерживаются.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Следующий код будет работать.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Сохраняйте простоту

Иногда мы видим, как наши пользователи отображают данные, такие как текст или значения. Часто это не нужно и является признаком плохого кода, проверьте примеры ниже, почему это так.

```js
// 👎 слишком сложно, синхронное утверждение, используйте встроенные утверждения для предотвращения нестабильных тестов
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 слишком сложно
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 находит элементы по их тексту, но не учитывает положение элементов
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 используйте уникальные идентификаторы (часто используется для пользовательских элементов)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 имена доступности (часто используются для нативных html-элементов)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Еще одна вещь, которую мы иногда наблюдаем, - это то, что простые вещи имеют слишком сложное решение.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Выполнение кода параллельно

Если вам не важен порядок выполнения некоторого кода, вы можете использовать [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) для ускорения выполнения.

__Примечание:__ Поскольку это делает код менее читаемым, вы можете абстрагировать его, используя объект страницы или функцию, хотя вы также должны поставить под вопрос, стоит ли выигрыш в производительности ценой читаемости.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

После абстрагирования это может выглядеть примерно так, где логика помещена в метод, называемый submitWithDataOf, а данные получаются классом Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```