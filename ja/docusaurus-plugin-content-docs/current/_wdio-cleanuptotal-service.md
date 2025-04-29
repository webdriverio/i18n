---
id: wdio-cleanuptotal-service
title: CleanupTotal サービス
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)をご覧ください。

[webdriver.io](https://webdriver.io/)向けの`cleanup-total`サービスを使用すると、各テスト後の適切なクリーンアップを簡単に確保できます。このサービスは、作成後すぐにエンティティを削除対象としてマークする体系的な方法を提供します。これは、投資プランと預金を持つ銀行口座など、複雑な構造を作成するテストで特に役立ちます。適切なクリーンアップがなければ、アカウントの削除を試みると、アカウントが空でないなどの理由で拒否されるなどのエラーが発生する可能性があります。しかし、__cleanup-total__を使用すると、エンティティは正しい順序で削除され、テストが自身のクリーンアップを行い、互いに干渉しないことを保証します。

## インストール
このモジュールを（開発）依存関係として最も簡単にインストールする方法は、次のコマンドを使用することです：

```
npm install wdio-cleanuptotal-service --save-dev
```

## 使用方法

`wdio.conf.ts`にwdio-cleanuptotal-serviceを追加します：

```typescript
export const config: WebdriverIO.Config = {
  // ... その他のオプション

  services: ['cleanuptotal']

  // ... その他のオプション
};
```

またはサービスオプションを含めて：

```typescript
export const config: WebdriverIO.Config = {
  // ... その他のオプション

  services: [
    [
      'cleanuptotal',
      {
        // テストレポートにメッセージを書き込むためのカスタムロガー関数を使用する
        customLoggerMethod: console.log(), // TODO: 必要に応じて独自のロガー関数に置き換えてください

        // レポートの混雑を減らすために、エラーが発生した場合のみログに記録する
        logErrorsOnly: false, // TODO: レポートにメッセージが多すぎる場合は'true'に変更することを検討してください
      }
    ]
  ]

  // ... その他のオプション
};
```

## テストでの使用方法

__cleanuptotal__サービスは、テストファイルや他のクラスなど、必要な場所でインポートできます。

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // アカウントを作成し、テスト後に削除するためにクリーンアップリストに追加
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // アカウントに投資プランを追加し、クリーンアップリストに追加
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // アカウントに資金を入金し、クリーンアップリストに追加
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// 実際のクリーンアップコードはテスト完了後に実行されることに注意してください
```

## Typescriptサポート

このプラグインはTypescriptをサポートしています。

## サポート

サポートや提案については、[tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com)までお気軽にご連絡ください。