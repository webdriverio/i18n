---
id: badisi-wdio-harness
title: Angularコンポーネントテストハーネスのサポートサービス
custom_edit_url: https://github.com/Badisi/wdio-harness/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @badisi/wdio-harnessは、サードパーティ製のパッケージです。詳細については[GitHub](https://github.com/Badisi/wdio-harness) | [npm](https://www.npmjs.com/package/@badisi/wdio-harness)をご覧ください。
<h1 align="center">
    @badisi/wdio-harness
</h1>

<p align="center">
    <i>🔬 <a href="https://webdriver.io" alt="wdio">WebdriverIO</a> support for Angular component test harnesses.</i><br/>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@badisi/wdio-harness">
        <img src="https://img.shields.io/npm/v/@badisi/wdio-harness.svg?color=blue&logo=npm" alt="npm version" /></a>
    <a href="https://npmcharts.com/compare/@badisi/wdio-harness?minimal=true">
        <img src="https://img.shields.io/npm/dw/@badisi/wdio-harness.svg?color=7986CB&logo=npm" alt="npm donwloads" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/@badisi/wdio-harness.svg?color=ff69b4" alt="license" /></a>
</p>

<p align="center">
    <a href="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml">
        <img src="https://github.com/Badisi/wdio-harness/actions/workflows/ci_tests.yml/badge.svg" alt="build status" /></a>
    <a href="https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md#-submitting-a-pull-request-pr">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome" /></a>
</p>

<hr/>

#### コンポーネントテストハーネス

> コンポーネントハーネスは、テストがサポートされたAPIを通じてコンポーネントと対話できるようにするクラスです。各ハーネスのAPIは、ユーザーが行うのと同じ方法でコンポーネントと対話します。ハーネスAPIを使用することで、テストはコンポーネントの内部構造（DOMの構造の変更など）に対する更新から自分自身を保護します。コンポーネントハーネスのアイデアは、統合テストで一般的に使用される[PageObject](https://martinfowler.com/bliki/PageObject.html)パターンから来ています。

[詳細情報](https://material.angular.io/cdk/test-harnesses/overview)

<hr/>

## インストール

```sh
npm install @badisi/wdio-harness --save-dev
```

```sh
yarn add @badisi/wdio-harness --dev
```


## 使用方法

__メソッド__

- `createHarnessEnvironment(rootElement)` - 指定された要素からHarnessLoaderインスタンスを取得します（デフォルトはbody）
- `getHarness(harnessType, element)` - 指定されたComponentHarnessクラスと要素からハーネスインスタンスを検索します
- `getHarness(harnessType)` - 指定されたComponentHarnessクラスからハーネスインスタンスを検索します
- `getHarness(query)` - 指定されたHarnessPredicateからハーネスインスタンスを検索します
- `getAllHarnesses(query)` - getHarnessのように機能しますが、ハーネスインスタンスの配列を返します
- `waitForAngular()` - Angularのブートストラップが完了するまで待機します

__例__

```ts
import { MatDatepickerInputHarness } from '@angular/material/datepicker/testing';
import { getHarness } from '@badisi/wdio-harness';

describe('Angular Material Harness', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:4200');
    });

    it('MatDatePicker', async () => {
        const datepicker = await getHarness(MatDatepickerInputHarness.with({ selector: '#demo-datepicker-input' }));

        await datepicker.setValue('9/27/1954');
        expect(await datepicker.getValue()).withContext('Date should be 9/27/1954').toBe('9/27/1954');

        await datepicker.openCalendar();
        const calendar = await datepicker.getCalendar();
        await calendar.next();
        await calendar.selectCell({ text: '20' });
        expect(await datepicker.getValue()).withContext('Date should be 10/20/1954').toBe('10/20/1954');
    });
});
```

より多くの例は[こちら][examples]をご覧ください。


## 開発

[開発者ドキュメント][developer]をご覧ください。


## 貢献

#### > 協力したい方へ

バグを報告したり、コードを貢献したり、ドキュメントを改善したりしたいですか？素晴らしいです！

ただし、まず[貢献ガイドライン][contributing]を読み、提出プロセス、コーディングルールなどについて学んでください。

#### > 行動規範

[行動規範][codeofconduct]を読んで従い、このプロジェクトをオープンで包括的に保つのを手伝ってください。




[developer]: https://github.com/badisi/wdio-harness/blob/main/DEVELOPER.md
[contributing]: https://github.com/badisi/wdio-harness/blob/main/CONTRIBUTING.md
[codeofconduct]: https://github.com/badisi/wdio-harness/blob/main/CODE_OF_CONDUCT.md
[examples]: https://github.com/badisi/wdio-harness/blob/main/projects/tests-e2e/harness.e2e.ts