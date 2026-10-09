---
id: methods
title: メソッド
description: "ビジュアルサービスの save および check メソッドを使用して、スクリーンショットを取得し、画面、要素、フルページをベースラインと比較します。"
---

以下のメソッドは、グローバルな WebdriverIO の [`browser`](/docs/api/browser) オブジェクトに追加されます。

## Save メソッド

:::info TIP
Save メソッドは、画面を比較する必要が**なく**、要素のスクリーンショットやスクリーンショットだけが欲しい場合にのみ使用してください。
:::

### `saveElement`

要素の画像を保存します。

#### 使用方法

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ
- モバイルハイブリッドアプリ
- モバイルネイティブアプリ

#### パラメータ

-   **`element`:**
    -   **必須:** はい
    -   **型:** WebdriverIO Element
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`saveElementOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Save オプション](./method-options#save-options)を参照してください

#### 出力:

[テスト出力](./test-output#savescreenelementfullpagescreen)ページを参照してください。

### `saveScreen`

ビューポートの画像を保存します。

#### 使用方法

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ
- モバイルハイブリッドアプリ
- モバイルネイティブアプリ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`saveScreenOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Save オプション](./method-options#save-options)を参照してください

#### 出力:

[テスト出力](./test-output#savescreenelementfullpagescreen)ページを参照してください。

### `saveFullPageScreen`

#### 使用方法

画面全体の画像を保存します。

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`saveFullPageScreenOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Save オプション](./method-options#save-options)を参照してください

#### 出力:

[テスト出力](./test-output#savescreenelementfullpagescreen)ページを参照してください。

### `saveTabbablePage`

タブ移動可能な要素を示す線とドットを含む、画面全体の画像を保存します。

#### 使用方法

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`saveTabbableOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Save オプション](./method-options#save-options)を参照してください

#### 出力:

[テスト出力](./test-output#savescreenelementfullpagescreen)ページを参照してください。

## Check メソッド

:::info TIP
`check` メソッドを初めて使用すると、ログに以下の警告が表示されます。つまり、ベースラインを作成したい場合でも、`save` メソッドと `check` メソッドを組み合わせる必要はありません。

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

要素の画像をベースライン画像と比較します。

#### 使用方法

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ
- モバイルハイブリッドアプリ
- モバイルネイティブアプリ

#### パラメータ
-   **`element`:**
    -   **必須:** はい
    -   **型:** WebdriverIO Element
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`checkElementOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Compare/Check オプション](./method-options#compare-check-options)を参照してください

#### 出力:

[テスト出力](./test-output#checkscreenelementfullpagescreen)ページを参照してください。

### `checkScreen`

ビューポートの画像をベースライン画像と比較します。

#### 使用方法

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ
- モバイルハイブリッドアプリ
- モバイルネイティブアプリ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`checkScreenOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Compare/Check オプション](./method-options#compare-check-options)を参照してください

#### 出力:

[テスト出力](./test-output#checkscreenelementfullpagescreen)ページを参照してください。

### `checkFullPageScreen`

画面全体の画像をベースライン画像と比較します。

#### 使用方法

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ
- モバイルブラウザ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`checkFullPageOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Compare/Check オプション](./method-options#compare-check-options)を参照してください

#### 出力:

[テスト出力](./test-output#checkscreenelementfullpagescreen)ページを参照してください。

### `checkTabbablePage`

タブ移動可能な要素を示す線とドットを含む画面全体の画像を、ベースライン画像と比較します。

#### 使用方法

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### サポート

- デスクトップブラウザ

#### パラメータ
-   **`tag`:**
    -   **必須:** はい
    -   **型:** string
-   **`checkTabbableOptions`:**
    -   **必須:** いいえ
    -   **型:** オプションのオブジェクト。[Compare/Check オプション](./method-options#compare-check-options)を参照してください

#### 出力:

[テスト出力](./test-output#checkscreenelementfullpagescreen)ページを参照してください。