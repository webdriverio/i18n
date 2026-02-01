---
id: selectors
title: セレクタ
---

WebdriverIO MCPサーバーは、ウェブページやモバイルアプリの要素を特定するための複数のセレクタ戦略をサポートしています。

:::info

すべてのWebdriverIOセレクタ戦略を含む包括的なセレクタのドキュメントについては、メインの[セレクタ](/docs/selectors)ガイドを参照してください。このページでは、MCPサーバーで一般的に使用されるセレクタに焦点を当てています。

:::

## ウェブセレクタ

ブラウザ自動化のために、MCPサーバーはすべての標準WebdriverIOセレクタをサポートしています。最もよく使用されるものには以下が含まれます：

| セレクタ | 例 | 説明 |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | 標準CSSセレクタ |
| XPath | `//button[@id='submit']` | XPath式 |
| Text | `button=Submit`, `a*=Click` | WebdriverIOテキストセレクタ |
| ARIA | `aria/Submit Button` | アクセシビリティ名セレクタ |
| Test ID | `[data-testid="submit"]` | テスト用に推奨 |

詳細な例とベストプラクティスについては、[セレクタ](/docs/selectors)ドキュメントを参照してください。

---

## モバイルセレクタ

モバイルセレクタはAppiumを通じてiOSとAndroidの両プラットフォームで機能します。

### アクセシビリティID（推奨）

アクセシビリティIDは**最も信頼性の高いクロスプラットフォームセレクタ**です。iOSとAndroidの両方で動作し、アプリの更新間でも安定しています。

```
# 構文
~accessibilityId

# 例
~loginButton
~submitForm
~usernameField
```

:::tip ベストプラクティス
可能な限りアクセシビリティIDを優先してください。以下の利点があります：
- クロスプラットフォーム互換性（iOS + Android）
- UI変更時の安定性
- テストの保守性向上
- アプリのアクセシビリティ改善
:::

### Androidセレクタ

#### UiAutomator

UiAutomatorセレクタはAndroidで強力かつ高速です。

```
# テキストで
android=new UiSelector().text("Login")

# 部分的なテキストで
android=new UiSelector().textContains("Log")

# リソースIDで
android=new UiSelector().resourceId("com.example:id/login_button")

# クラス名で
android=new UiSelector().className("android.widget.Button")

# 説明（アクセシビリティ）で
android=new UiSelector().description("Login button")

# 複合条件
android=new UiSelector().className("android.widget.Button").text("Login")

# スクロール可能なコンテナ
android=new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item")
```

#### リソースID

リソースIDはAndroidで安定した要素識別を提供します。

```
# 完全なリソースID
id=com.example.app:id/login_button

# 部分的なID（アプリパッケージ推測）
id=login_button
```

#### XPath（Android）

XPathはAndroidで動作しますが、UiAutomatorより遅いです。

```
# クラスとテキストで
//android.widget.Button[@text='Login']

# リソースIDで
//android.widget.EditText[@resource-id='com.example:id/username']

# コンテンツ説明で
//android.widget.ImageButton[@content-desc='Menu']

# 階層的
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOSセレクタ

#### 述語文字列

iOS述語文字列はiOS自動化に強力で高速です。

```
# ラベルで
-ios predicate string:label == "Login"

# 部分的なラベルで
-ios predicate string:label CONTAINS "Log"

# 名前で
-ios predicate string:name == "loginButton"

# タイプで
-ios predicate string:type == "XCUIElementTypeButton"

# 値で
-ios predicate string:value == "ON"

# 複合条件
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# 可視性
-ios predicate string:label == "Login" AND visible == 1

# 大文字小文字を区別しない
-ios predicate string:label ==[c] "login"
```

**述語演算子:**

| 演算子 | 説明 |
|----------|-------------|
| `==` | 等しい |
| `!=` | 等しくない |
| `CONTAINS` | 部分文字列を含む |
| `BEGINSWITH` | で始まる |
| `ENDSWITH` | で終わる |
| `LIKE` | ワイルドカード一致 |
| `MATCHES` | 正規表現一致 |
| `AND` | 論理AND |
| `OR` | 論理OR |

#### クラスチェーン

iOSクラスチェーンは、階層的な要素の特定と優れたパフォーマンスを提供します。

```
# 直接の子
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# 任意の子孫
-ios class chain:**/XCUIElementTypeButton

# インデックスで
-ios class chain:**/XCUIElementTypeCell[3]

# 述語と組み合わせ
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# 階層的
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# 最後の要素
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath（iOS）

XPathはiOSで動作しますが、述語文字列より遅いです。

```
# タイプとラベルで
//XCUIElementTypeButton[@label='Login']

# 名前で
//XCUIElementTypeTextField[@name='username']

# 値で
//XCUIElementTypeSwitch[@value='1']

# 階層的
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## クロスプラットフォームセレクタ戦略

iOSとAndroidの両方で動作する必要があるテストを作成する場合は、以下の優先順位を使用してください：

### 1. アクセシビリティID（最適）

```
# 両プラットフォームで動作
~loginButton
```

### 2. プラットフォーム固有の条件付きロジック

アクセシビリティIDが利用できない場合は、プラットフォーム固有のセレクタを使用します：

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath（最後の手段）

XPathは両プラットフォームで動作しますが、異なる要素タイプを使用します：

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## 要素タイプリファレンス

### Android要素タイプ

| タイプ | 説明 |
|------|-------------|
| `android.widget.Button` | ボタン |
| `android.widget.EditText` | テキスト入力 |
| `android.widget.TextView` | テキストラベル |
| `android.widget.ImageView` | 画像 |
| `android.widget.ImageButton` | 画像ボタン |
| `android.widget.CheckBox` | チェックボックス |
| `android.widget.RadioButton` | ラジオボタン |
| `android.widget.Switch` | トグルスイッチ |
| `android.widget.Spinner` | ドロップダウン |
| `android.widget.ListView` | リストビュー |
| `android.widget.RecyclerView` | リサイクラービュー |
| `android.widget.ScrollView` | スクロールコンテナ |

### iOS要素タイプ

| タイプ | 説明 |
|------|-------------|
| `XCUIElementTypeButton` | ボタン |
| `XCUIElementTypeTextField` | テキスト入力 |
| `XCUIElementTypeSecureTextField` | パスワード入力 |
| `XCUIElementTypeStaticText` | テキストラベル |
| `XCUIElementTypeImage` | 画像 |
| `XCUIElementTypeSwitch` | トグルスイッチ |
| `XCUIElementTypeSlider` | スライダー |
| `XCUIElementTypePicker` | ピッカーホイール |
| `XCUIElementTypeTable` | テーブルビュー |
| `XCUIElementTypeCell` | テーブルセル |
| `XCUIElementTypeCollectionView` | コレクションビュー |
| `XCUIElementTypeScrollView` | スクロールビュー |

---

## ベストプラクティス

### 推奨事項

- **アクセシビリティID** を使用して、安定したクロスプラットフォームセレクタを作成
- ウェブ要素にテスト用の **data-testid 属性** を追加
- アクセシビリティIDが利用できない場合は、Androidで **リソースID** を使用
- iOSでは、XPathよりも **述語文字列** を優先
- セレクタは **シンプルで具体的に** 保つ

### 非推奨事項

- **長いXPath式を避ける** - 遅くて脆弱
- 動的なリストでは **インデックスに依存しない**
- ローカライズされたアプリでは **テキストベースのセレクタを避ける**
- **絶対XPath**（ルートから始まる）を使用しない

### 良いvs悪いセレクタの例

```
# 良い - 安定したアクセシビリティID
~loginButton

# 悪い - 脆弱なインデックス付きXPath
//div[3]/form/button[2]

# 良い - テストID付きの具体的なCSS
[data-testid="submit-button"]

# 悪い - 変更される可能性のあるクラス
.btn-primary-lg-v2

# 良い - リソースID付きのUiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# 悪い - ローカライズされる可能性のあるテキスト
android=new UiSelector().text("Submit")
```

---

## セレクタのデバッグ

### ウェブ（Chrome DevTools）

1. Chrome DevTools（F12）を開く
2. Elements パネルで要素を検査
3. 要素を右クリック → コピー → セレクタをコピー
4. コンソールでセレクタをテスト：`document.querySelector('your-selector')`

### モバイル（Appium Inspector）

1. Appium Inspectorを起動
2. 実行中のセッションに接続
3. 要素をクリックして、利用可能なすべての属性を確認
4. 「Search for element」機能を使用してセレクタをテスト

### `get_visible_elements` の使用

MCPサーバーの `get_visible_elements` ツールは、各要素に対して複数のセレクタ戦略を返します：

```
Ask Claude: "Get all visible elements on the screen"
```

これにより、直接使用できる事前生成されたセレクタを持つ要素が返されます。

#### 高度なオプション

要素検出をより細かく制御するには：

```
# 画像や視覚要素のみを取得
Get visible elements with elementType "visual"

# レイアウトデバッグ用に座標付きの要素を取得
Get visible elements with includeBounds enabled

# 次の20要素を取得（ページネーション）
Get visible elements with limit 20 and offset 20

# デバッグ用にレイアウトコンテナを含める
Get visible elements with includeContainers enabled
```

このツールはページ分割されたレスポンスを返します：
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` の使用（ブラウザのみ）

ブラウザ自動化では、`get_accessibility` ツールがページ要素に関するセマンティック情報を提供します：

```
# すべての名前付きアクセシビリティノードを取得
Get accessibility tree

# ボタンとリンクのみにフィルタリング
Get accessibility tree filtered to button and link roles

# 結果の次のページを取得
Get accessibility tree with limit 50 and offset 50
```

これは `get_visible_elements` が期待通りの要素を返さない場合に便利で、ブラウザのネイティブアクセシビリティAPIを照会します。
```