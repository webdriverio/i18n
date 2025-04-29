---
id: wdio-eslinter-service
title: eslintサービスで未インポートを自動検出
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-eslinter-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)をご覧ください

e2eテストを実行したものの、10分、15分、あるいは30分後に、テスト実行の途中まで現れなかった不足/誤字のインポートがあることに気づいたことはありませんか？このような場合、テストランナーはこれらのテストを壊れていると報告します。

eslintは実行前にさまざまなエラーを検出するための優れたツールであり、このサービスはWebdriverIOテストを実行する前に、手動ではなく自動化されたステップとしてeslintツールを実行します。

より早く失敗することで、後ではなく早めに問題を修正できることが多いです。

推奨される設定は、unresolvedランナーを使用して不足しているインポートのみをチェックすることですが、必要に応じて、npmやyarnランナーを使用してプロジェクト内のeslinterを実行するようにサービスを設定したり、.eslintrc設定も使用するようにシステムに指示するフラグを渡したりすることもできます。

## インストール

wdio-eslinter-serviceをインストールします：

```
$ npm i wdio-eslinter-service --save-dev 
```


### クイックスタート - 不足または未解決のインポートのみをチェック

デフォルトでは、この最小限の設定である「unresolved」ランナーは、未解決のrequireインポートをチェックし、未解決のインポートが見つかった場合にエラーをスローします。そしてサービスは実行を停止します。必要に応じて、「npm」または「yarn」ランナーを使用してより多くのチェックを実行するために.eslintrc.jsをカスタマイズすることができます。詳細については[eslint](https://www.npmjs.com/package/eslint)を参照してください。

プロジェクトに`.eslintrc.js`設定がない場合、wdio-eslinter-serviceはテスト実行前に不足しているインポートのみをチェックするデフォルトの設定を使用するように構成できます。これにより、不正確なインポートについて後ではなく早めに発見できるため便利です。これを設定するには、サービス配列に次のeslinter設定を追加します（すでにchromedriverサービスを使用していると仮定しています。そうでない場合は、その部分を省略してください）：

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

この時点でテストを実行すると、不足または不正確なインポートがある場合、WebdriverIOはそれをログに記録し、テスト実行を即座に終了します：

```
$ npx wdio
```


#### オプション - module-aliasを使用している場合

相対パスを置き換えるエイリアスを設定できる[module-alias](https://www.npmjs.com/package/module-alias)モジュールを使用している場合は、eslint-import-resolver-custom-aliasプラグインを使用してeslinter設定にそれを渡す必要があります。以下は例です：

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

プラグインをプロジェクトにインストールします：

```
$ npm i eslint-import-resolver-custom-alias
```

テストを実行して、モジュールエイリアスを使用する不正確なインポートをシステムが検出することを確認します：

```
$ npx wdio
```

#### 実験的 - プロジェクト内の既存のeslintrc設定と一緒に使用する

eslinterサービスにプロジェクト内の既存のeslintrc設定も使用させるには、wdio.conf.jsの設定サービス配列で`includeProjectEslintrc`をtrueに設定します。

競合するプラグインに問題が発生する可能性があります。プロジェクトのeslint設定も未解決のインポートを探している場合、これは機能しない可能性があり、.eslintrc.jsの調整が必要になる場合があります。これは現時点では推奨されていません。


### 高度な代替手段 - npmおよびyarnランナーの使用

npmおよびyarnランナーは、プロジェクト内の既存のeslinter設定の実行に対する追加の制御を提供します。この設定では、package.jsonのrun-scriptsセクションで実行する追加のコマンドを定義できます：

`package.json`内で、run scriptsにこのエントリを追加します：

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**注意：npmまたはyarnランナーを使用する場合、サービスが機能するにはpackage.jsonにeslintを追加する必要があります。**

まだeslintをインストールして設定していない場合は、プロジェクトにインストールして設定する必要があります。また、eslint-plugin-importなどの使用しているプラグインもインストールしてください：

```
$ npm i eslint eslint-plugin-import
```

モジュールエイリアスを実際のパスにマッピングするためにeslint-import-resolver-custom-aliasプラグインを使用している場合は、これもインストールする必要があります：

```
$ npm i eslint-import-resolver-custom-alias
```

プロジェクトにeslintrc設定ファイルがまだない場合は、`.eslintrc.js`ファイルも作成する必要があります。以下は未解決のインポートのみを探す基本的な設定です。この設定を拡張して、テスト実行前に他のコード品質チェックを検証することもできます：

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

最後に、`wdio.conf.js`のservices配列に`eslinter`サービスを追加します：

```javascript
    services: ['eslinter']
```

`npm run eslint`を実行してエラーを確認します。

`yarn`を使用している場合は、`runnerType`サービスオプションを設定できます：

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

再利用したい既存のlinterスクリプト（`eslint`の代わりに）がある場合は、`scriptName`サービスオプションを設定できます：

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## WebdriverIOでの使用

通常通りWebdriverIOのテストランナーを起動します。eslintがコードをチェックします。エラーが見つかった場合、実行は即座に停止します。

```bash
$ npx wdio
```


**例：**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```