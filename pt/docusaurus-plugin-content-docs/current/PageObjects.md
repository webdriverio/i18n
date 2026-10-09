---
id: pageobjects
title: Padrão Page Object
description: "Estruture seus testes com o padrão page object, movendo seletores e ações específicas de página para classes de página reutilizáveis."
---

A versão 5 do WebdriverIO foi projetada com o suporte ao Padrão Page Object em mente. Com a introdução do princípio de "elementos como cidadãos de primeira classe", agora é possível construir grandes suítes de testes usando esse padrão.

Não são necessários pacotes adicionais para criar page objects. Acontece que classes limpas e modernas fornecem todos os recursos necessários de que precisamos:

- herança entre page objects
- carregamento lazy de elementos
- encapsulamento de métodos e ações

O objetivo de usar page objects é abstrair qualquer informação da página dos testes propriamente ditos. Idealmente, você deve armazenar todos os seletores ou instruções específicas que são exclusivas de uma determinada página em um page object, para que você ainda possa executar seu teste depois de ter redesenhado completamente sua página.

## Criando Um Page Object

Primeiro, precisamos de um page object principal que chamamos de `Page.js`. Ele conterá seletores ou métodos gerais dos quais todos os page objects herdarão.

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

Sempre faremos `export` de uma instância de um page object, e nunca criaremos essa instância no teste. Como estamos escrevendo testes end-to-end, sempre consideramos a página como uma construção sem estado&mdash;assim como cada requisição HTTP é uma construção sem estado.

Claro, o navegador pode carregar informações de sessão e, portanto, pode exibir páginas diferentes com base em sessões diferentes, mas isso não deve ser refletido dentro de um page object. Esses tipos de mudanças de estado devem ficar nos seus testes propriamente ditos.

Vamos começar testando a primeira página. Para fins de demonstração, usamos o site [The Internet](http://the-internet.herokuapp.com) da [Elemental Selenium](http://elementalselenium.com) como cobaia. Vamos tentar construir um exemplo de page object para a [página de login](http://the-internet.herokuapp.com/login).

## Usando `Get` Para Seus Seletores

O primeiro passo é escrever todos os seletores importantes que são necessários em nosso objeto `login.page` como funções getter:

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

Definir seletores em funções getter pode parecer um pouco estranho, mas é realmente útil. Essas funções são avaliadas _quando você acessa a propriedade_, não quando você gera o objeto. Com isso, você sempre solicita o elemento antes de executar uma ação sobre ele.

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

## Usando Page Objects Em Seus Testes

Depois de definir os elementos e métodos necessários para a página, você pode começar a escrever o teste para ela. Tudo o que você precisa fazer para usar o page object é fazer `import` (ou `require`) dele. É só isso!

Como você exportou uma instância já criada do page object, importá-lo permite que você comece a usá-lo imediatamente.

Se você usar um framework de asserções, seus testes podem ser ainda mais expressivos:

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

Do ponto de vista estrutural, faz sentido separar arquivos de spec e page objects em diretórios diferentes. Além disso, você pode dar a cada page object a terminação: `.page.js`. Isso deixa mais claro que você está importando um page object.

## Indo Além

Este é o princípio básico de como escrever page objects com o WebdriverIO. Mas você pode construir estruturas de page objects muito mais complexas do que esta! Por exemplo, você pode ter page objects específicos para modais, ou dividir um page object enorme em diferentes classes (cada uma representando uma parte diferente da página web como um todo) que herdam do page object principal. O padrão realmente oferece muitas oportunidades para separar as informações da página dos seus testes, o que é importante para manter sua suíte de testes estruturada e clara em momentos em que o projeto e o número de testes crescem.

Você pode encontrar este exemplo (e ainda mais exemplos de page objects) na [pasta `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) no GitHub.