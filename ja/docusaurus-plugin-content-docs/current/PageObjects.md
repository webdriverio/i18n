---
id: pageobjects
title: ページオブジェクトパターン
---

WebdriverIOのバージョン5は、ページオブジェクトパターンのサポートを念頭に設計されました。「要素をファーストクラスの市民として扱う」原則を導入することで、このパターンを使用して大規模なテストスイートを構築することが可能になりました。

ページオブジェクトを作成するために追加のパッケージは必要ありません。クリーンでモダンなクラスが私たちに必要なすべての機能を提供しています：

- ページオブジェクト間の継承
- 要素の遅延ロード
- メソッドとアクションのカプセル化

ページオブジェクトを使用する目的は、実際のテストからページ情報を抽象化することです。理想的には、特定のページに固有のすべてのセレクタまたは特定の指示をページオブジェクトに格納しておくべきです。そうすれば、ページを完全に再設計した後でもテストを実行することができます。

## ページオブジェクトの作成

まず最初に、`Page.js`と呼ぶメインのページオブジェクトが必要です。これにはすべてのページオブジェクトが継承する一般的なセレクタやメソッドが含まれます。

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

私たちは常にページオブジェクトのインスタンスを`export`し、テスト内でそのインスタンスを作成することはありません。エンドツーエンドテストを書いているので、各HTTPリクエストがステートレスな構造であるのと同様に、ページは常にステートレスな構造と考えます。

確かに、ブラウザはセッション情報を保持できるため、異なるセッションに基づいて異なるページを表示できますが、これはページオブジェクト内に反映されるべきではありません。このような状態の変化は、実際のテスト内に存在すべきです。

最初のページのテストを始めましょう。デモの目的で、[Elemental Selenium](http://elementalselenium.com)による[The Internet](http://the-internet.herokuapp.com)ウェブサイトをモルモットとして使用します。[ログインページ](http://the-internet.herokuapp.com/login)のページオブジェクト例を構築してみましょう。

## セレクタの取得

最初のステップは、`login.page`オブジェクトで必要なすべての重要なセレクタをgetter関数として記述することです：

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

セレクタをgetter関数で定義するのは少し奇妙に見えるかもしれませんが、非常に便利です。これらの関数は、オブジェクトを生成したときではなく、プロパティにアクセスしたときに評価されます。これにより、アクションを実行する前に常に要素をリクエストします。

## コマンドのチェーン

WebdriverIOは内部的にコマンドの最後の結果を記憶します。要素コマンドにアクションコマンドをチェーンすると、前のコマンドから要素を検索し、その結果を使用してアクションを実行します。これにより、セレクタ（最初のパラメータ）を削除でき、コマンドはこのように簡単になります：

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

## テストでのページオブジェクトの使用

ページに必要な要素とメソッドを定義した後、そのテストを書き始めることができます。ページオブジェクトを使用するために必要なことは、それを`import`（または`require`）することだけです。それだけです！

すでに作成されたページオブジェクトのインスタンスをエクスポートしたので、インポートすればすぐに使い始めることができます。

アサーションフレームワークを使用すれば、テストはさらに表現力豊かになります：

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

構造的な観点から、スペックファイルとページオブジェクトを異なるディレクトリに分けるのは理にかなっています。さらに、各ページオブジェクトに`.page.js`という接尾辞を付けることができます。これにより、ページオブジェクトをインポートしていることがより明確になります。

## さらに進める

これがWebdriverIOでページオブジェクトを書くための基本原則です。しかし、これよりもはるかに複雑なページオブジェクト構造を構築することができます！例えば、モーダル用の特定のページオブジェクトを持つことや、巨大なページオブジェクトを異なるクラス（それぞれがウェブページの異なる部分を表す）に分割し、それらがメインのページオブジェクトから継承するようにすることもできます。このパターンは、プロジェクトとテスト数が増加する時代に、テストスイートを構造化し明確に保つために重要なページ情報をテストから分離するための多くの機会を提供します。

このサンプル（およびさらに多くのページオブジェクトの例）はGitHubの[`example`フォルダ](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject)で見つけることができます。