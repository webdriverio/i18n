---
id: bestpractices
title: Лучшие практики
description: "Пишите быстрые и надёжные тесты с WebdriverIO, используя стабильные селекторы, меньшее количество запросов элементов, встроенные утверждения и отказ от ручных пауз."
---

# Лучшие практики

Это руководство призвано поделиться нашими лучшими практиками, которые помогут вам писать производительные и надёжные тесты.

## Используйте устойчивые селекторы

Используя селекторы, устойчивые к изменениям в DOM, вы столкнётесь с меньшим количеством упавших тестов или вообще избежите их, когда, например, у элемента удаляется класс.

Классы могут применяться к нескольким элементам, поэтому их следует избегать, если это возможно, за исключением случаев, когда вы намеренно хотите получить все элементы с этим классом.

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

__Примечание:__ Чтобы узнать обо всех возможных селекторах, которые поддерживает WebdriverIO, ознакомьтесь с нашей страницей [Селекторы](./Selectors.md).

## Ограничьте количество запросов элементов

Каждый раз, когда вы используете команду [`$`](https://webdriver.io/docs/api/browser/$) или [`$$`](https://webdriver.io/docs/api/browser/$$) (включая их цепочки), WebdriverIO пытается найти элемент в DOM. Эти запросы ресурсоёмки, поэтому старайтесь максимально ограничивать их количество.

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

Использовать цепочки следует только тогда, когда вы хотите комбинировать разные [стратегии селекторов](https://webdriver.io/docs/selectors/#custom-selector-strategies).
В примере мы используем [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors) — стратегию, позволяющую проникнуть внутрь shadow DOM элемента.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Предпочитайте поиск одного элемента вместо выбора его из списка

Это не всегда возможно, но с помощью CSS-псевдоклассов, таких как [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), можно находить элементы по их индексам в списке дочерних элементов родителя.

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

Не используйте ручные утверждения, которые не ожидают автоматически совпадения результатов, так как это приводит к нестабильным тестам.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

При использовании встроенных утверждений WebdriverIO автоматически ожидает, пока фактический результат совпадёт с ожидаемым, что делает тесты надёжными.
Это достигается за счёт автоматического повторения утверждения до тех пор, пока оно не пройдёт или не истечёт время ожидания.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Ленивая загрузка и цепочки промисов

У WebdriverIO есть несколько хитростей для написания чистого кода: он умеет лениво загружать элемент, что позволяет выстраивать цепочки промисов и уменьшает количество `await`. Это также позволяет передавать элемент как ChainablePromiseElement вместо Element и упрощает работу с page objects.

Так когда же нужно использовать `await`?
Всегда используйте `await`, за исключением команд `$` и `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## Не злоупотребляйте командами и утверждениями

При использовании expect.toBeDisplayed вы неявно также ожидаете существования элемента. Нет необходимости использовать команды waitForXXX, если у вас уже есть утверждение, делающее то же самое.

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

Нет необходимости ожидать, пока элемент появится или станет видимым, перед взаимодействием с ним или проверкой, например, его текста, если только элемент не может быть явно невидимым (например, opacity: 0) или явно отключённым (например, атрибут disabled) — в этом случае ожидание отображения элемента имеет смысл.

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

Используйте переменные окружения для хранения динамических тестовых данных, например секретных учётных данных, в вашем окружении, а не прописывайте их жёстко в тесте. Подробнее об этом читайте на странице [Параметризация тестов](parameterize-tests).

## Проверяйте код линтером

Используя eslint для проверки кода, вы можете выявлять ошибки на ранних этапах. Используйте наши [правила линтинга](https://www.npmjs.com/package/eslint-plugin-wdio), чтобы некоторые из лучших практик применялись всегда.

## Не используйте паузы

Может возникнуть соблазн использовать команду pause, но это плохая идея, так как она ненадёжна и в долгосрочной перспективе приведёт лишь к нестабильным тестам.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Асинхронные циклы

Если у вас есть асинхронный код, который нужно повторить, важно знать, что не все циклы это поддерживают.
Например, функция forEach у массивов не поддерживает асинхронные колбэки, о чём можно прочитать на [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Примечание:__ Вы всё равно можете использовать их, когда операция не обязана быть асинхронной, как показано в этом примере: `console.log(await $$('h1').map((h1) => h1.getText()))`.

Ниже приведены примеры того, что это означает.

Следующий код не будет работать, так как асинхронные колбэки не поддерживаются.

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

## Будьте проще

Иногда мы видим, как пользователи преобразуют (map) данные, такие как текст или значения. Часто в этом нет необходимости, и это нередко является признаком плохого кода (code smell). Посмотрите примеры ниже, чтобы понять почему.

```js
// 👎 слишком сложно, синхронное утверждение, используйте встроенные утверждения, чтобы избежать нестабильных тестов
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

// 👎 находит элементы по тексту, но не учитывает их позицию
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 используйте уникальные идентификаторы (часто применяются для пользовательских элементов)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 доступные имена (часто применяются для нативных html-элементов)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Ещё одна вещь, которую мы иногда видим, — это чрезмерно усложнённые решения простых задач.

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

## Параллельное выполнение кода

Если вам не важен порядок выполнения некоторого кода, вы можете использовать [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), чтобы ускорить выполнение.

__Примечание:__ Поскольку это усложняет чтение кода, вы можете вынести эту логику в page object или функцию, хотя стоит также задуматься, оправдывает ли выигрыш в производительности потерю читаемости.

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

В абстрагированном виде это может выглядеть примерно так, как показано ниже: логика помещена в метод submitWithDataOf, а данные получаются из класса Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```