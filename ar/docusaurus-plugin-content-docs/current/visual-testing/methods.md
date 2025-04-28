---
id: methods
title: الأساليب
---

تمت إضافة الطرق التالية إلى كائن WebdriverIO العالمي [`browser`](/docs/api/browser).

## طرق الحفظ

:::info نصيحة
استخدم طرق الحفظ فقط عندما **لا** ترغب في مقارنة الشاشات، ولكن تريد فقط الحصول على لقطة عنصر/شاشة.
:::

### `saveElement`

يحفظ صورة لعنصر ما.

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
- متصفحات الموبايل
- تطبيقات الموبايل الهجينة
- تطبيقات الموبايل الأصلية

#### المعلمات

-   **`element`:**
    -   **إلزامي:** نعم
    -   **النوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`saveElementOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

يحفظ صورة لمنفذ العرض.

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
- متصفحات الموبايل
- تطبيقات الموبايل الهجينة
- تطبيقات الموبايل الأصلية

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`saveScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

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
- متصفحات الموبايل

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`saveFullPageScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

يحفظ صورة للشاشة الكاملة مع خطوط ونقاط قابلة للتنقل.

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
    -   **النوع:** سلسلة نصية
-   **`saveTabbableOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات الحفظ](./method-options#save-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#savescreenelementfullpagescreen).

## طرق الفحص

:::info نصيحة
عند استخدام طرق `check` للمرة الأولى، سترى التحذير أدناه في السجلات. هذا يعني أنك لا تحتاج إلى الجمع بين طرق `save` و `check` إذا كنت ترغب في إنشاء خط الأساس الخاص بك.

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

مقارنة صورة عنصر مقابل صورة أساسية.

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
- متصفحات الموبايل
- تطبيقات الموبايل الهجينة
- تطبيقات الموبايل الأصلية

#### المعلمات
-   **`element`:**
    -   **إلزامي:** نعم
    -   **النوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`checkElementOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات المقارنة/الفحص](./method-options#compare-check-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

يقارن صورة منفذ العرض مقابل صورة أساسية.

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
- متصفحات الموبايل
- تطبيقات الموبايل الهجينة
- تطبيقات الموبايل الأصلية

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`checkScreenOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات المقارنة/الفحص](./method-options#compare-check-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

يقارن صورة الشاشة الكاملة مقابل صورة أساسية.

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
- متصفحات الموبايل

#### المعلمات
-   **`tag`:**
    -   **إلزامي:** نعم
    -   **النوع:** سلسلة نصية
-   **`checkFullPageOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات المقارنة/الفحص](./method-options#compare-check-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

يقارن صورة الشاشة الكاملة مع خطوط ونقاط قابلة للتنقل مقابل صورة أساسية.

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
    -   **النوع:** سلسلة نصية
-   **`checkTabbableOptions`:**
    -   **إلزامي:** لا
    -   **النوع:** كائن من الخيارات، انظر [خيارات المقارنة/الفحص](./method-options#compare-check-options)

#### المخرجات:

انظر صفحة [مخرجات الاختبار](./test-output#checkscreenelementfullpagescreen).