---
id: mjsonwp
title: بروتوكول Mobile JSON Wire
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/mjsonwp.ts
---

## getPageIndex
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).
:::caution

هذا الأمر البروتوكولي مهمل<br />في Appium 2.0، تم تحديد هذه الطريقة على أنها مهملة وليس لها بدائل متاحة حاليًا.
:::

##### الاستخدام

```js
driver.getPageIndex()
```


##### يُرجع

- **&lt;string&gt;**



---

## getNetworkConnection
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### الاستخدام

```js
driver.getNetworkConnection()
```


##### يُرجع

- **&lt;number&gt;**
            **<code><var>connectionType</var></code>:** انظر https://appium.github.io/appium.io/docs/en/writing-running-appium/other/network-connection/


---

## setNetworkConnection
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### الاستخدام

```js
driver.setNetworkConnection(type)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>number</td>
      <td>قناع بت يجب ترجمته إلى قيمة عددية صحيحة عند التسلسل</td>
    </tr>
  </tbody>
</table>



---

## touchPerform
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### الاستخدام

```js
driver.touchPerform(actions)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>قائمة من الكائنات، كل منها يمثل مصدر إدخال والإجراءات المرتبطة به</td>
    </tr>
  </tbody>
</table>



---

## multiTouchPerform
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#touch-gestures).

##### الاستخدام

```js
driver.multiTouchPerform(actions, elementId)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>قائمة من الكائنات، كل منها يمثل مصدر إدخال والإجراءات المرتبطة به</td>
    </tr>
    <tr>
      <td><code><var>elementId</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object[]</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
  </tbody>
</table>



---

## receiveAsyncResponse
أمر بروتوكول Mobile JSON Wire. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#mobile-json-wire-protocol-endpoints).

##### الاستخدام

```js
driver.receiveAsyncResponse(status, value)
```


##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>status</var></code></td>
      <td>string</td>
      <td>الحالة المتوقعة للاستجابة</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>القيمة المتوقعة للاستجابة</td>
    </tr>
  </tbody>
</table>