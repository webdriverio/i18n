---
id: selectors
title: セレクター
description: "WebdriverIO MCP サーバーで自動化する際に、Web ページやモバイルアプリ上の要素を特定するためのセレクターを選択します。"
---

WebdriverIO MCP サーバーは、Web ページやモバイルアプリ上の要素を特定するための複数のセレクター戦略をサポートしています。

:::info

WebdriverIO のすべてのセレクター戦略を含む包括的なセレクターのドキュメントについては、メインの [Selectors](/docs/selectors) ガイドを参照してください。このページでは、MCP サーバーでよく使用されるセレクターに焦点を当てています。

:::

## Web セレクター

ブラウザ自動化では、MCP サーバーは WebdriverIO の標準セレクターをすべてサポートしています。最もよく使用されるものは以下のとおりです。

| セレクター | 例                             | 説明                         |
| ---------- | ------------------------------ | ---------------------------- |
| CSS        | `#login-button`, `.submit-btn` | 標準の CSS セレクター        |
| XPath      | `//button[@id='submit']`       | XPath 式                     |
| Text       | `button=Submit`, `a*=Click`    | WebdriverIO のテキストセレクター |
| ARIA       | `aria/Submit Button`           | アクセシビリティ名セレクター |
| Test ID    | `[data-testid="submit"]`       | テスト用に推奨               |

詳細な例とベストプラクティスについては、[Selectors](/docs/selectors) のドキュメントを参照してください。

## モバイルセレクター

モバイルセレクターは、Appium を通じて iOS と Android の両方のプラットフォームで動作します。

### Accessibility ID（推奨）

Accessibility ID は**最も信頼性の高いクロスプラットフォームセレクター**です。iOS と Android の両方で動作し、アプリのアップデート後も安定しています。

```text
# 構文
~accessibilityId

# 例
~loginButton
~submitForm
~usernameField
```

:::tip ベストプラクティス
利用可能な場合は、常に Accessibility ID を優先してください。以下のメリットがあります。
- クロスプラットフォーム互換性（iOS + Android）
- UI の変更に対する安定性
- テストの保守性の向上
- アプリのアクセシビリティの向上
:::

### Android セレクター

#### UiAutomator

UiAutomator セレクターは、Android において強力かつ高速です。

```text
# テキストで指定
android=new UiSelector().text("Login")

# 部分テキストで指定
android=new UiSelector().textContains("Log")

# リソース ID で指定
android=new UiSelector().resourceId("com.example:id/login_button")

# クラス名で指定
android=new UiSelector().className("android.widget.Button")

# 説明（アクセシビリティ）で指定
android=new UiSelector().description("Login button")

# 条件の組み合わせ
android=new UiSelector().className("android.widget.Button").text("Login")

# スクロール可能なコンテナ
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### Resource ID

Resource ID は、Android で安定した要素の識別を提供します。

```text
# 完全なリソース ID
id=com.example.app:id/login_button

# 部分 ID（アプリパッケージは推測される）
id=login_button
```

#### XPath（Android）

XPath は Android でも動作しますが、UiAutomator よりも低速です。

```text
# クラスとテキストで指定
//android.widget.Button[@text='Login']

# リソース ID で指定
//android.widget.EditText[@resource-id='com.example:id/username']

# コンテンツの説明で指定
//android.widget.ImageButton[@content-desc='Menu']

# 階層指定
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS セレクター

#### Predicate String

iOS Predicate String は、iOS 自動化において高速かつ強力です。

```text
# ラベルで指定
-ios predicate string:label == "Login"

# 部分ラベルで指定
-ios predicate string:label CONTAINS "Log"

# 名前で指定
-ios predicate string:name == "loginButton"

# タイプで指定
-ios predicate string:type == "XCUIElementTypeButton"

# 値で指定
-ios predicate string:value == "ON"

# 条件の組み合わせ
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# 表示状態
-ios predicate string:label == "Login" AND visible == 1

# 大文字小文字を区別しない
-ios predicate string:label ==[c] "login"
```

**Predicate 演算子:**

| 演算子       | 説明                   |
| ------------ | ---------------------- |
| `==`         | 等しい                 |
| `!=`         | 等しくない             |
| `CONTAINS`   | 部分文字列を含む       |
| `BEGINSWITH` | 前方一致               |
| `ENDSWITH`   | 後方一致               |
| `LIKE`       | ワイルドカード一致     |
| `MATCHES`    | 正規表現一致           |
| `AND`        | 論理 AND               |
| `OR`         | 論理 OR                |

#### Class Chain

iOS Class Chain は、優れたパフォーマンスで階層的な要素の特定を提供します。

```text
# 直接の子
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# 任意の子孫
-ios class chain:**/XCUIElementTypeButton

# インデックスで指定
-ios class chain:**/XCUIElementTypeCell[3]

# Predicate との組み合わせ
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# 階層指定
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# 最後の要素
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath（iOS）

XPath は iOS でも動作しますが、Predicate String よりも低速です。

```text
# タイプとラベルで指定
//XCUIElementTypeButton[@label='Login']

# 名前で指定
//XCUIElementTypeTextField[@name='username']

# 値で指定
//XCUIElementTypeSwitch[@value='1']

# 階層指定
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

## クロスプラットフォームのセレクター戦略

iOS と Android の両方で動作する必要があるテストを書く場合は、以下の優先順位を使用してください。

### 1. Accessibility ID（最適）

```text
# 両方のプラットフォームで動作
~loginButton
```

### 2. 条件分岐を伴うプラットフォーム固有のセレクター

Accessibility ID が利用できない場合は、プラットフォーム固有のセレクターを使用します。

**Android:**
```text
android=new UiSelector().text("Login")
```

**iOS:**
```text
-ios predicate string:label == "Login"
```

### 3. XPath（最終手段）

XPath は両方のプラットフォームで動作しますが、要素タイプが異なります。

**Android:**
```text
//android.widget.Button[@text='Login']
```

**iOS:**
```text
//XCUIElementTypeButton[@label='Login']
```

## 要素タイプのリファレンス

### Android の要素タイプ

| タイプ                        | 説明                 |
| ----------------------------- | -------------------- |
| `android.widget.Button`       | ボタン               |
| `android.widget.EditText`     | テキスト入力         |
| `android.widget.TextView`     | テキストラベル       |
| `android.widget.ImageView`    | 画像                 |
| `android.widget.ImageButton`  | 画像ボタン           |
| `android.widget.CheckBox`     | チェックボックス     |
| `android.widget.RadioButton`  | ラジオボタン         |
| `android.widget.Switch`       | トグルスイッチ       |
| `android.widget.Spinner`      | ドロップダウン       |
| `android.widget.ListView`     | リストビュー         |
| `android.widget.RecyclerView` | リサイクラービュー   |
| `android.widget.ScrollView`   | スクロールコンテナ   |

### iOS の要素タイプ

| タイプ                           | 説明                 |
| -------------------------------- | -------------------- |
| `XCUIElementTypeButton`          | ボタン               |
| `XCUIElementTypeTextField`       | テキスト入力         |
| `XCUIElementTypeSecureTextField` | パスワード入力       |
| `XCUIElementTypeStaticText`      | テキストラベル       |
| `XCUIElementTypeImage`           | 画像                 |
| `XCUIElementTypeSwitch`          | トグルスイッチ       |
| `XCUIElementTypeSlider`          | スライダー           |
| `XCUIElementTypePicker`          | ピッカーホイール     |
| `XCUIElementTypeTable`           | テーブルビュー       |
| `XCUIElementTypeCell`            | テーブルセル         |
| `XCUIElementTypeCollectionView`  | コレクションビュー   |
| `XCUIElementTypeScrollView`      | スクロールビュー     |

## ベストプラクティス

### 推奨事項

- 安定したクロスプラットフォームのセレクターには **Accessibility ID を使用する**
- テストのために Web 要素に **data-testid 属性を追加する**
- Accessibility ID が利用できない場合、Android では **Resource ID を使用する**
- iOS では XPath より **Predicate String を優先する**
- **セレクターはシンプルかつ具体的に保つ**

### 避けるべきこと

- **長い XPath 式は避ける** - 低速で壊れやすい
- 動的なリストでは **インデックスに依存しない**
- ローカライズされたアプリでは **テキストベースのセレクターを避ける**
- **絶対 XPath（ルートから始まるもの）を使用しない**

### 良いセレクターと悪いセレクターの例

```text
# 良い - 安定した Accessibility ID
~loginButton

# 悪い - インデックスを使った壊れやすい XPath
//div[3]/form/button[2]

# 良い - テスト ID を使った具体的な CSS
[data-testid="submit-button"]

# 悪い - 変更される可能性のあるクラス
.btn-primary-lg-v2

# 良い - リソース ID を使った UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# 悪い - ローカライズされる可能性のあるテキスト
android=new UiSelector().text("Submit")
```

## セレクターのデバッグ

### Web（Chrome DevTools）

1. Chrome DevTools を開く（F12）
2. Elements パネルを使用して要素を検査する
3. 要素を右クリック → Copy → Copy selector
4. Console でセレクターをテストする: `document.querySelector('your-selector')`

### モバイル（Appium Inspector）

1. Appium Inspector を起動する
2. 実行中のセッションに接続する
3. 要素をクリックして、利用可能なすべての属性を確認する
4. 「Search for element」機能を使用してセレクターをテストする

### `get_elements` の使用

MCP サーバーの `get_elements` ツールは、各要素に対して複数のセレクター戦略を返します。

```text
Ask: "Get all visible elements on the screen"
```

これにより、そのまま使用できる事前生成されたセレクター付きの要素が返されます。

#### 高度なオプション

要素の検出をより細かく制御するには:

```text
# 画像とビジュアル要素のみを取得
Get visible elements with elementType "visual"

# レイアウトのデバッグ用に座標付きで要素を取得
Get visible elements with includeBounds enabled

# 次の 20 要素を取得（ページネーション）
Get visible elements with limit 20 and offset 20

# デバッグ用にレイアウトコンテナを含める
Get visible elements with includeContainers enabled
```

このツールはページネーションされたレスポンスを返します:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` の使用（ブラウザのみ）

ブラウザ自動化では、`get_accessibility` ツールがページ要素に関するセマンティックな情報を提供します。

```text
# 名前付きのアクセシビリティノードをすべて取得
Get accessibility tree

# ボタンとリンクのみにフィルタリング
Get accessibility tree filtered to button and link roles

# 結果の次のページを取得
Get accessibility tree with limit 50 and offset 50
```

これはブラウザのネイティブなアクセシビリティ API に問い合わせるため、`get_elements` が期待する要素を返さない場合に便利です。