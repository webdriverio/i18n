---
id: pageobjects
title: Padrão de Objeto de Página
---

A versão 5 do WebdriverIO foi projetada com suporte ao Padrão de Objeto de Página em mente. Ao introduzir o princípio de "elementos como cidadãos de primeira classe", agora é possível construir grandes suítes de teste usando esse padrão.

Não são necessários pacotes adicionais para criar objetos de página. Verifica-se que classes modernas e limpas fornecem todos os recursos necessários:

- herança entre objetos de página
- carregamento preguiçoso de elementos
- encapsulamento de métodos e ações

O objetivo de usar objetos de página é abstrair qualquer informação da página dos testes reais. Idealmente, você deve armazenar todos os seletores ou instruções específicas que são exclusivas para uma determinada página em um objeto de página, para que você ainda possa executar seu teste após ter redesenhado completamente sua página.

## Criando Um Objeto de Página

Primeiro, precisamos de um objeto de página principal que chamamos de `Page.js`. Ele conterá seletores ou métodos gerais que todos os objetos de página herdarão.

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

Sempre `exportamos` uma instância de um objeto de página, e nunca criamos essa instância no teste. Como estamos escrevendo testes de ponta a ponta, sempre consideramos a página como uma construção sem estado&mdash;assim como cada requisição HTTP é uma construção sem estado.

Claro, o navegador pode carregar informações de sessão e, portanto, pode exibir páginas diferentes com base em diferentes sessões, mas isso não deve ser refletido em um objeto de página. Esse tipo de mudança de estado deve estar em seus testes reais.

Vamos começar a testar a primeira página. Para fins de demonstração, usamos o site [The Internet](http://the-internet.herokuapp.com) do [Elemental Selenium](http://elementalselenium.com) como cobaia. Vamos tentar construir um exemplo de objeto de página para a [página de login](http://the-internet.herokuapp.com/login).

## Obtendo Seus Seletores com `Get`

O primeiro passo é escrever todos os seletores importantes necessários em nosso objeto `login.page` como funções getter:

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

Definir seletores em funções getter pode parecer um pouco estranho, mas é muito útil. Essas funções são avaliadas _quando você acessa a propriedade_, não quando você gera o objeto. Com isso, você sempre solicita o elemento antes de executar uma ação nele.

## Encadeando Comandos

O WebdriverIO internamente lembra o último resultado de um comando. Se você encadear um comando de elemento com um comando de ação, ele encontra o elemento do comando anterior e usa o resultado para executar a ação. Com isso, você pode remover o seletor (primeiro parâmetro) e o comando fica tão simples quanto:

```js
await LoginPage.username.setValue('Max Mustermann')
```

O que é basicamente a mesma coisa que:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

ou

```js
await $('#username').setValue('Max Mustermann')
```

## Usando Objetos de Página em Seus Testes

Depois de definir os elementos e métodos necessários para a página, você pode começar a escrever o teste para ela. Tudo o que você precisa fazer para usar o objeto de página é `importá-lo` (ou `require`). É isso!

Como você exportou uma instância já criada do objeto de página, importá-la permite que você comece a usá-la imediatamente.

Se você usar um framework de asserção, seus testes podem ser ainda mais expressivos:

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

Do lado estrutural, faz sentido separar arquivos de especificação e objetos de página em diretórios diferentes. Além disso, você pode dar a cada objeto de página o sufixo: `.page.js`. Isso torna mais claro que você está importando um objeto de página.

## Indo Além

Este é o princípio básico de como escrever objetos de página com WebdriverIO. Mas você pode construir estruturas de objetos de página muito mais complexas do que esta! Por exemplo, você pode ter objetos de página específicos para modais, ou dividir um enorme objeto de página em classes diferentes (cada uma representando uma parte diferente da página web geral) que herdam do objeto de página principal. O padrão realmente oferece muitas oportunidades para separar informações da página de seus testes, o que é importante para manter sua suíte de testes estruturada e clara em momentos em que o projeto e o número de testes crescem.

Você pode encontrar este exemplo (e ainda mais exemplos de objetos de página) na [`pasta example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) no GitHub.