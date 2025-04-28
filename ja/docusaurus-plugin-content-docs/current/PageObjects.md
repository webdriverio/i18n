---
id: pageobjects
title: ページオブジェクトパターン
---

WebdriverIOのバージョン5は、ページオブジェクトパターンのサポートを念頭に設計されました。「要素をファーストクラスのオブジェクトとして扱う」という原則を導入することで、このパターンを使用して大規模なテストスイートを構築することが可能になりました。

ページオブジェクトを作成するために追加のパッケージは必要ありません。クリーンでモダンなクラスが、必要な機能をすべて提供していることがわかります：

- ページオブジェクト間の継承
- 要素の遅延ロード
- メソッドとアクションのカプセル化

ページオブジェクトを使用する目的は、ページ情報を実際のテストから抽象化することです。理想的には、特定のページに固有のすべてのセレクタや特定の指示をページオブジェクトに格納することで、ページを完全に再設計した後でもテストを実行できるようになります。

## ページオブジェクトの作成

まず最初に、`Page.js`という名前のメインページオブジェクトが必要です。これには、すべてのページオブジェクトが継承する一般的なセレクタやメソッドが含まれます。

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

ページオブジェクトのインスタンスは常に`export`し、テスト内でそのインスタンスを作成することはありません。エンドツーエンドテストを書いているため、各HTTPリクエストがステートレスな構造であるのと同様に、ページは常にステートレスな構造として扱います。

確かに、ブラウザはセッション情報を保持することができ、異なるセッションに基づいて異なるページを表示することができますが、これはページオブジェクト内に反映されるべきではありません。このような状態の変化は、実際のテスト内に記述すべきです。

それでは、最初のページのテストを始めましょう。デモのために、[Elemental Selenium](http://elementalselenium.com)による[The Internet](http://the-internet.herokuapp.com)ウェブサイトをテスト対象として使用します。[ログインページ](http://the-internet.herokuapp.com/login)のページオブジェクト例を構築してみましょう。

## セレクタの`Get`取得

最初のステップは、`login.page`オブジェクトで必要な重要なセレクタをすべてゲッター関数として記述することです：

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

ゲッター関数内でセレクタを定義するのは少し奇妙に見えるかもしれませんが、非常に便利です。これらの関数は、オブジェクトを生成するときではなく、_プロパティにアクセスするとき_に評価されます。これにより、常に要素に対してアクションを実行する前に要素をリクエストすることになります。

## コマンドのチェーン化

WebdriverIOは内部的にコマンドの最後の結果を記憶しています。要素コマンドとアクションコマンドをチェーンすると、前のコマンドから要素を見つけ、その結果を使用してアクションを実行します。そのため、セレクタ（最初のパラメータ）を省略でき、コマンドは以下のようにシンプルになります：

```js
await LoginPage.username.setValue('Max Mustermann')
```

これは基本的に次のコードと同じです：

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

または

```js
await $('#username').setValue('Max Mustermann')
```

## テスト内でのページオブジェクトの使用

ページに必要な要素とメソッドを定義した後、そのテストを書き始めることができます。ページオブジェクトを使用するために必要なのは、それを`import`（または`require`）することだけです。それだけです！

既に作成されたページオブジェクトのインスタンスをエクスポートしているので、インポートするとすぐに使い始めることができます。

アサーションフレームワークを使用すると、テストはさらに表現力豊かになります：

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

構造的な観点から、specファイルとページオブジェクトを異なるディレクトリに分けることは理にかなっています。さらに、各ページオブジェクトに`.page.js`という接尾辞を付けることができます。これにより、ページオブジェクトをインポートしていることがより明確になります。

## さらに進める

これはWebdriverIOでページオブジェクトを記述する基本原則です。しかし、これよりもっと複雑なページオブジェクト構造を構築することもできます！例えば、モーダルのための特定のページオブジェクトを持つことや、大きなページオブジェクトを（ウェブページの異なる部分を表す）異なるクラスに分割し、それらがメインページオブジェクトから継承するようにすることもできます。このパターンは、プロジェクトとテスト数が増えるにつれて、テストスイートを構造化し明確に保つために重要なページ情報をテストから分離するための多くの機会を提供します。

この例（およびさらに多くのページオブジェクトの例）は、GitHubの[`example`フォルダ](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject)で見つけることができます。