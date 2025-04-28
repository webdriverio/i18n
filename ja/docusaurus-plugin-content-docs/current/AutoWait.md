---
id: autowait
title: 自動待機
---

要素と直接相互作用するコマンドを使用する場合、WebdriverIOは自動的に要素が表示されて操作可能になるまで待機するため、コマンド（clickやsetValueなど）を使用する際に手動で待機する必要はありません。
要素は、[isClickable](https://webdriver.io/docs/api/element/isClickable)の条件が満たされると操作可能とみなされます。

WebdriverIOは要素が操作可能になるのを自動的に待機しますが、手動で待機が必要になる稀なケースがあります。このような稀なケースのために、[`waitForDisplayed`](/docs/api/element/waitForDisplayed)などのコマンドを提供しています。


## 暗黙的タイムアウト（推奨されません）

推奨はしませんが、WebDriverプロトコルでは[暗黙的タイムアウト](https://w3c.github.io/webdriver/#timeouts)を提供しており、ドライバーが要素が表示されるのをどれだけ待つかを指定できます。デフォルトではこのタイムアウトは`0`に設定されており、ページ上で要素が見つからない場合にドライバーは直ちに`no such element`エラーを返します。[`setTimeout`](/docs/api/browser/setTimeout)を使用してこのタイムアウトを増やすと、ドライバーは待機し、最終的に要素が表示される可能性が高まります。

:::note

WebDriverとフレームワーク関連のタイムアウトについての詳細は[タイムアウトガイド](/docs/timeouts)をご覧ください。

:::