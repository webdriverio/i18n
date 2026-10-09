---
id: pageobjects
title: ページオブジェクトパターン
description: "セレクターやページ固有のアクションを再利用可能なページクラスに移動し、ページオブジェクトパターンでテストを構造化します。"
---

WebdriverIO のバージョン 5 は、ページオブジェクトパターンのサポートを念頭に置いて設計されました。「要素をファーストクラスシチズンとして扱う」という原則を導入したことで、このパターンを使って大規模なテストスイートを構築できるようになりました。

ページオブジェクトを作成するために追加のパッケージは必要ありません。クリーンでモダンなクラスが、必要な機能をすべて提供してくれるのです：

- ページオブジェクト間の継承
- 要素の遅延読み込み
- メソッドとアクションのカプセル化

ページオブジェクトを使用する目的は、ページに関するあらゆる情報を実際のテストから抽象化することです。理想的には、特定のページに固有のすべてのセレクターや具体的な指示をページオブジェクトに格納し、ページを完全に再設計した後でもテストを実行できるようにすべきです。

## ページオブジェクトの作成

まず最初に、`Page.js` と呼ぶメインのページオブジェクトが必要です。これには、すべてのページオブジェクトが継承する共通のセレクターやメソッドが含まれます。

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

常にページオブジェクトのインスタンスを `export` し、テスト内でそのインスタンスを作成することはありません。エンドツーエンドテストを書いているため、ページは常にステートレスな構造として扱います&mdash;各 HTTP リクエストがステートレスな構造であるのと同じように。

確かに、ブラウザはセッション情報を保持できるため、セッションごとに異なるページを表示することがありますが、これをページオブジェクト内に反映すべきではありません。この種の状態変化は、実際のテスト内に記述すべきです。

最初のページのテストを始めましょう。デモ目的として、[Elemental Selenium](http://elementalselenium.com) による [The Internet](http://the-internet.herokuapp.com) ウェブサイトを実験台として使用します。[ログインページ](http://the-internet.herokuapp.com/login)のページオブジェクトの例を作成してみましょう。

## セレクターの `Get`

最初のステップは、`login.page` オブジェクトで必要となる重要なセレクターをすべてゲッター関数として記述することです：

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

ゲッター関数でセレクターを定義するのは少し奇妙に見えるかもしれませんが、非常に便利です。これらの関数は、オブジェクトを生成したときではなく、_プロパティにアクセスしたときに_ 評価されます。これにより、要素に対してアクションを実行する前に、常にその要素を取得することになります。

## コマンドのチェーン

WebdriverIO は内部的にコマンドの最後の結果を記憶しています。要素コマンドとアクションコマンドをチェーンすると、前のコマンドから要素を見つけ、その結果を使用してアクションを実行します。これにより、セレクター（第一引数）を省略でき、コマンドは次のようにシンプルになります：

```js
await LoginPage.username.setValue('Max Mustermann')
```

これは基本的に次と同じです：

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

または

```js
await $('#username').setValue('Max Mustermann')
```

## テストでのページオブジェクトの使用

ページに必要な要素とメソッドを定義したら、そのテストを書き始めることができます。ページオブジェクトを使用するために必要なのは、それを `import`（または `require`）することだけです。それだけです！

作成済みのページオブジェクトのインスタンスをエクスポートしているため、インポートするだけですぐに使い始めることができます。

アサーションフレームワークを使用すると、テストをさらに表現豊かにすることができます：

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

構造的な観点から、スペックファイルとページオブジェクトを別々のディレクトリに分けることは理にかなっています。さらに、各ページオブジェクトに `.page.js` という末尾を付けることもできます。これにより、ページオブジェクトをインポートしていることがより明確になります。

## さらに進んで

これが WebdriverIO でページオブジェクトを書く基本的な原則です。しかし、これよりもはるかに複雑なページオブジェクト構造を構築することもできます！例えば、モーダル専用のページオブジェクトを用意したり、巨大なページオブジェクトを、メインのページオブジェクトを継承する異なるクラス（それぞれがウェブページ全体の異なる部分を表す）に分割したりすることができます。このパターンは、ページ情報をテストから分離するための多くの機会を提供します。これは、プロジェクトやテストの数が増えていく中で、テストスイートを構造化され明確な状態に保つために重要です。

この例（およびさらに多くのページオブジェクトの例）は、GitHub の [`example` フォルダ](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject)で見つけることができます。