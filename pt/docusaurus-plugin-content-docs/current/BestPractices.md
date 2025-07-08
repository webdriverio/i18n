---
id: bestpractices
title: Melhores Práticas
---

# Melhores Práticas

Este guia tem como objetivo compartilhar nossas melhores práticas que ajudam você a escrever testes performáticos e resilientes.

## Use seletores resilientes

Usando seletores que são resilientes a mudanças no DOM, você terá menos ou até mesmo nenhum teste falhando quando, por exemplo, uma classe é removida de um elemento.

Classes podem ser aplicadas a vários elementos e devem ser evitadas, se possível, a menos que você deliberadamente queira buscar todos os elementos com essa classe.

```js
// 👎
await $('.button')
```

Todos esses seletores devem retornar um único elemento.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Nota:__ Para descobrir todos os seletores possíveis que o WebdriverIO suporta, confira nossa página de [Seletores](./Selectors.md).

## Limite a quantidade de consultas de elementos

Cada vez que você usa o comando [`$`](https://webdriver.io/docs/api/browser/$) ou [`$$`](https://webdriver.io/docs/api/browser/$$) (isso inclui encadeá-los), o WebdriverIO tenta localizar o elemento no DOM. Essas consultas são caras, então você deve tentar limitá-las o máximo possível.

Consulta três elementos.

```js
// 👎
await $('table').$('tr').$('td')
```

Consulta apenas um elemento.

``` js
// 👍
await $('table tr td')
```

A única vez que você deve usar encadeamento é quando quer combinar diferentes [estratégias de seletor](https://webdriver.io/docs/selectors/#custom-selector-strategies).
No exemplo, usamos os [Seletores Profundos](https://webdriver.io/docs/selectors#deep-selectors), que é uma estratégia para entrar no shadow DOM de um elemento.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Prefira localizar um único elemento em vez de pegar um de uma lista

Nem sempre é possível fazer isso, mas usando pseudo-classes CSS como [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child), você pode corresponder elementos com base nos índices dos elementos na lista de filhos de seus pais.

Consulta todas as linhas da tabela.

```js
// 👎
await $$('table tr')[15]
```

Consulta uma única linha da tabela.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Use as asserções integradas

Não use asserções manuais que não aguardam automaticamente que os resultados correspondam, pois isso causará testes instáveis.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Ao usar as asserções integradas, o WebdriverIO aguardará automaticamente que o resultado real corresponda ao resultado esperado, resultando em testes resilientes.
Ele consegue isso tentando novamente a asserção automaticamente até que ela passe ou atinja o tempo limite.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading e encadeamento de promessas

O WebdriverIO tem alguns truques quando se trata de escrever código limpo, pois pode carregar elementos de forma preguiçosa (lazy loading), o que permite encadear promessas e reduzir a quantidade de `await`. Isso também permite passar o elemento como um ChainablePromiseElement em vez de um Element, facilitando o uso com objetos de página.

Então, quando você deve usar `await`?
Você sempre deve usar `await`, com exceção dos comandos `$` e `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// ou
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// ou
await $('div').$('button').click()
```

## Não abuse de comandos e asserções

Ao usar expect.toBeDisplayed, você implicitamente também espera que o elemento exista. Não há necessidade de usar os comandos waitForXXX quando você já tem uma asserção fazendo a mesma coisa.

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

Não há necessidade de esperar que um elemento exista ou seja exibido ao interagir ou ao afirmar algo como seu texto, a menos que o elemento possa explicitamente ser invisível (opacity: 0, por exemplo) ou possa explicitamente ser desativado (atributo disabled, por exemplo), caso em que esperar que o elemento seja exibido faz sentido.

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

## Testes Dinâmicos

Use variáveis de ambiente para armazenar dados de teste dinâmicos, como credenciais secretas, em seu ambiente, em vez de codificá-los diretamente no teste. Vá para a página [Parameterize Tests](parameterize-tests) para mais informações sobre este tópico.

## Faça lint do seu código

Usando eslint para fazer lint do seu código, você pode potencialmente detectar erros antecipadamente. Use nossas [regras de linting](https://www.npmjs.com/package/eslint-plugin-wdio) para garantir que algumas das melhores práticas sejam sempre aplicadas.

## Não pause

Pode ser tentador usar o comando pause, mas usá-lo é uma má ideia, pois não é resiliente e só causará testes instáveis a longo prazo.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // esperar que o botão de envio seja ativado
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Loops assíncronos

Quando você tem algum código assíncrono que deseja repetir, é importante saber que nem todos os loops podem fazer isso.
Por exemplo, a função forEach do Array não permite callbacks assíncronos, como pode ser lido no [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Nota:__ Você ainda pode usá-los quando não precisar que a operação seja assíncrona, como mostrado neste exemplo `console.log(await $$('h1').map((h1) => h1.getText()))`.

Abaixo estão alguns exemplos do que isso significa.

O seguinte não funcionará, pois callbacks assíncronos não são suportados.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

O seguinte funcionará.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Mantenha simples

Às vezes, vemos nossos usuários mapeando dados como texto ou valores. Frequentemente, isso não é necessário e geralmente é um indício de código problemático. Veja os exemplos abaixo de por que este é o caso.

```js
// 👎 muito complexo, asserção síncrona, use as asserções integradas para evitar testes instáveis
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 muito complexo
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 encontra elementos pelo texto, mas não leva em conta a posição dos elementos
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 use identificadores únicos (frequentemente usados para elementos personalizados)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 nomes de acessibilidade (frequentemente usados para elementos HTML nativos)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Outra coisa que às vezes vemos é que coisas simples têm uma solução excessivamente complicada.

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

## Executando código em paralelo

Se você não se importa com a ordem em que algum código é executado, pode utilizar [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) para acelerar a execução.

__Nota:__ Como isso torna o código mais difícil de ler, você pode abstrair isso usando um objeto de página ou uma função, embora você também deva questionar se o benefício em desempenho vale o custo de legibilidade.

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

Se abstraído, poderia ser algo como abaixo, onde a lógica é colocada em um método chamado submitWithDataOf e os dados são recuperados pela classe Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```