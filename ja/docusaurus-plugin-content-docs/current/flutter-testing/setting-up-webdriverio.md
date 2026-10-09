---
id: setting-up-webdriverio
title: 環境での WebdriverIO のセットアップ
description: "wdio.conf.ts と Appium の capabilities を設定し、Android および iOS で Appium Flutter Driver を使用して Flutter アプリを起動します。"
---

`wdio.conf.ts` ファイルは、あらゆる WebdriverIO プロジェクトの中核となる設定ファイルです。ここでは、テストの実行場所、使用するテストフレームワーク、そして Appium が Flutter アプリケーションを正しく初期化するために必要な `capabilities` を定義します。

:::warning
`appium-flutter-driver` は、従来のネイティブドライバー（`UiAutomator2` や `XCUITest` など）とは異なる方法で動作します。カスタマイズされたプロトコルを通じて Flutter のテスト拡張機能（`flutter_driver`）と通信します。そのため、標準的なネイティブ自動化コマンドが同じように動作しない場合や、`appium-flutter-finder` の使用が必須となる場合があります。

制限事項、サポートされているコマンド、プロトコル拡張について十分に理解するには、ツールの公式リポジトリを参照してください：[Appium Flutter Driver on GitHub](https://github.com/appium/appium-flutter-driver)。
:::

### Capabilities の設定（Android & iOS）

```typescript
export const config: WebdriverIO.Config = {
    // ... wdio.conf.ts のその他の設定（runner、specs など）
    

    services: [
        ['appium', {
            // WebdriverIO が Appium サーバーのライフサイクルを管理します
            args: {},
            command: 'appium'
        }]
    ],

    capabilities: [
        // ==========================================
        // ANDROID の設定
        // ==========================================
        {
            'platformName': 'Android',
            'appium:automationName': 'Flutter', // Flutter ドライバーの使用を必須に設定します
            'appium:deviceName': 'Android_Emulator', // 設定済みのエミュレーターまたは実機の名前
            // パスに関する注意（以下のオペレーティングシステムに関する注記を参照）
            'appium:app': './build/app/outputs/flutter-apk/app-debug.apk', 
            'appium:autoGrantPermissions': true
        },
        
        // ==========================================
        // IOS の設定（macOS が必要）
        // ==========================================
        {
            'platformName': 'iOS',
            'appium:automationName': 'Flutter', // Flutter ドライバーの使用を必須に設定します
            'appium:deviceName': 'iPhone Simulator', // iOS シミュレーターまたは実機の名前
            'appium:platformVersion': '17.2', // 対象の OS バージョンに変更してください
            // パスに関する注意（以下のオペレーティングシステムに関する注記を参照）
            // iOS シミュレーターには .app を、iOS 実機には .ipa を使用します
            'appium:app': './ios/build/Build/Products/Debug-iphonesimulator/Runner.app',
            'appium:noReset': false
        }
    ],

    // ... 残りの設定
};
```

### ファイルパス（appium:app）に関する重要な注意事項

`appium:app` プロパティ内でバイナリアプリケーションのパス（Android の場合は `.apk`、iOS の場合は `.app` または `.ipa`）を定義する際は、オペレーティングシステムや対象環境に応じて注意が必要です：

- **Windows の場合**：オペレーティングシステムはディレクトリパスにバックスラッシュ（`\`）を使用します。Windows で `.apk` ファイルへのパスを指定する場合は、設定ファイル内でバックスラッシュをエスケープする（例：`.\\build\\app\\outputs\\flutter-apk\\app-debug.apk`）か、Node.js によって正しく解析される一貫したスラッシュ（`/`）を使用してください。
- **macOS / Linux の場合**：スラッシュ（`/`）を使用した標準的なパスが使われます。iOS ビルド（シミュレーター用の `.app` または実機用の `.ipa`）は macOS 環境でのみコンパイルできることに注意してください。
- **iOS シミュレーターと実機**：iOS シミュレーターで実行する場合は `.app` バンドルを、iOS 実機で実行する場合は署名済みの `.ipa` パッケージを使用してください。
- **絶対パスと相対パス**：異なる開発マシンや継続的インテグレーション（CI）環境間での移植性を確保するため、プロジェクトルートからの相対パス（`./` を使用）を使用することを強く推奨します。