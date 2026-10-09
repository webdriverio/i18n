---
id: autowait
title: 自動待機
description: "WebdriverIOが要素の操作可能状態を自動的に待機する仕組み、手動で待機すべき場合、そして暗黙的タイムアウトが推奨されない理由について理解しましょう。"
---

要素を直接操作するコマンドを使用する場合、WebdriverIOは要素が表示され操作可能になるまで自動的に待機します。そのため、これらのコマンド（click、setValueなど）を使用する際に手動で待機する必要はありません。
要素は、[isClickable](https://webdriver.io/docs/api/element/isClickable)の条件を満たしたときに操作可能とみなされます。

WebdriverIOは要素が操作可能になるまで自動的に待機しますが、まれに手動で待機する必要がある場合もあります。そのようなまれなケースのために、[`waitForDisplayed`](/docs/api/element/waitForDisplayed)などのコマンドを提供しています。


## 暗黙的タイムアウト（非推奨）

使用は推奨しませんが、WebDriverプロトコルには[暗黙的タイムアウト](https://w3c.github.io/webdriver/#timeouts)があり、要素が表示されるまでドライバーが待機する時間を指定できます。デフォルトではこのタイムアウトは`0`に設定されているため、ページ上で要素が見つからない場合、ドライバーは即座に`no such element`エラーを返します。[`setTimeout`](/docs/api/browser/setTimeout)を使用してこのタイムアウトを増やすと、ドライバーが待機するようになり、最終的に要素が表示される可能性が高まります。

:::note

WebDriverおよびフレームワーク関連のタイムアウトについての詳細は、[タイムアウトガイド](/docs/timeouts)をご覧ください

:::