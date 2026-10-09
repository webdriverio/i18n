---
id: methods
title: الطرق
description: "استخدم طرق الحفظ والتحقق في الخدمة المرئية لالتقاط لقطات الشاشة ومقارنة الشاشات والعناصر والصفحات الكاملة مع الصور المرجعية."
---

تتم إضافة الطرق التالية إلى كائن [`browser`](/docs/api/browser) العام في WebdriverIO.

## طرق الحفظ

:::info نصيحة
استخدم طرق الحفظ فقط عندما **لا** تريد مقارنة الشاشات، وإنما تريد فقط الحصول على صورة لعنصر أو لقطة شاشة.
:::

### `saveElement`

يحفظ صورة لعنصر.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول
- تطبيقات الهاتف المحمول الهجينة
- تطبيقات الهاتف المحمول الأصلية

#### المعلمات

-   **`element`:**
    -   **إلزامي:** نعم
    -   **النوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`saveElementOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

يحفظ صورة لإطار العرض.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول
- تطبيقات الهاتف المحمول الهجينة
- تطبيقات الهاتف المحمول الأصلية

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`saveScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### الاستخدام

يحفظ صورة للشاشة الكاملة.

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`saveFullPageScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

يحفظ صورة للشاشة الكاملة مع خطوط ونقاط التنقل بمفتاح Tab.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`saveTabbableOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

## طرق التحقق

:::info نصيحة
عند استخدام طرق `check` لأول مرة، سترى التحذير أدناه في السجلات. هذا يعني أنك لا تحتاج إلى الجمع بين طرق `save` و`check` إذا كنت تريد إنشاء الصورة المرجعية الخاصة بك.

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

يقارن صورة لعنصر مع صورة مرجعية.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول
- تطبيقات الهاتف المحمول الهجينة
- تطبيقات الهاتف المحمول الأصلية

#### المعلمات
-   **`element`:**
    -   **إلزامي:** نعم
    -   **النوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`checkElementOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات المقارنة/التحقق](./method-options#compare-check-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

يقارن صورة لإطار العرض مع صورة مرجعية.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول
- تطبيقات الهاتف المحمول الهجينة
- تطبيقات الهاتف المحمول الأصلية

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`checkScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات المقارنة/التحقق](./method-options#compare-check-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

يقارن صورة للشاشة الكاملة مع صورة مرجعية.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب
- متصفحات الهاتف المحمول

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`checkFullPageOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات المقارنة/التحقق](./method-options#compare-check-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

يقارن صورة للشاشة الكاملة مع خطوط ونقاط التنقل بمفتاح Tab مع صورة مرجعية.

#### الاستخدام

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

#### الدعم

- متصفحات سطح المكتب

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** string
-   **`checkTabbableOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، راجع [خيارات المقارنة/التحقق](./method-options#compare-check-options)

#### المخرجات:

راجع صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).