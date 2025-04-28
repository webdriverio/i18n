---
id: autowait
title: 自動待機
---

WebdriverIOでは、要素と直接やり取りするコマンドを使用する際、要素が表示され操作可能になるまで自動的に待機するため、コマンド（click、setValueなど）を使用する際に手動で待機する必要はありません。
要素は[isClickable](https://webdriver.io/docs/api/element/isClickable)の条件が満たされると操作可能と見なされます。

WebdriverIOは要素が操作可能になるまで自動的に待機しますが、手動で待機が必要になるまれなケースがあります。そのような稀なケースのために、[`waitForDisplayed`](/docs/api/element/waitForDisplayed)などのコマンドを提供しています。


## 暗黙的なタイムアウト（推奨されません）

これを使用することはお勧めしませんが、WebDriverプロトコルは[暗黙的なタイムアウト](https://w3c.github.io/webdriver/#timeouts)を提供しており、ドライバーが要素が表示されるのをどれくらい待つべきかを指定できます。デフォルトではこのタイムアウトは`0`に設定されており、要素がページ上で見つからない場合、ドライバーはすぐに`no such element`エラーを返します。[`setTimeout`](/docs/api/browser/setTimeout)を使用してこのタイムアウトを増やすと、ドライバーは待機し、最終的に要素が表示される可能性が高まります。

:::note

WebDriverとフレームワーク関連のタイムアウトについての詳細は[タイムアウトガイド](/docs/timeouts)をご覧ください

:::