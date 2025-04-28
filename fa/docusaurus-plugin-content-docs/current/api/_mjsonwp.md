---
id: mjsonwp
title: پروتکل سیم مبتنی بر JSON موبایل
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints) پیدا کنید.
:::caution

این دستور پروتکل منسوخ شده است<br />در Appium 2.0، این متد به عنوان منسوخ شده علامت‌گذاری شده و در حال حاضر جایگزینی ندارد.
:::

##### استفاده

```js
driver.getPageIndex()
```


##### مقادیر بازگشتی

- **&lt;string&gt;**



---

## getNetworkConnection
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) پیدا کنید.

##### استفاده

```js
driver.getNetworkConnection()
```


##### مقادیر بازگشتی

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** به https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/ مراجعه کنید


---

## setNetworkConnection
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) پیدا کنید.

##### استفاده

```js
driver.setNetworkConnection(type)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>یک ماسک بیتی که باید هنگام سریالایز شدن به یک مقدار عددی تبدیل شود</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures) پیدا کنید.

##### استفاده

```js
driver.touchPerform(actions)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>لیستی از اشیاء که هر کدام نشان‌دهنده یک منبع ورودی و اقدامات مرتبط با آن است</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures) پیدا کنید.

##### استفاده

```js
driver.multiTouchPerform(actions, elementId)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>لیستی از اشیاء که هر کدام نشان‌دهنده یک منبع ورودی و اقدامات مرتبط با آن است</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>شناسه یک عنصر که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
دستور پروتکل سیم مبتنی بر JSON موبایل. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints) پیدا کنید.

##### استفاده

```js
driver.receiveAsyncResponse(status, value)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>وضعیت مورد انتظار پاسخ</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>مقدار مورد انتظار پاسخ</td>
    </tr>
  </tbody>
</table>