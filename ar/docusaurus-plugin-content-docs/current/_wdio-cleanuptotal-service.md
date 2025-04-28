---
id: wdio-cleanuptotal-service
title: خدمة التنظيف الشامل
custom_edit_url: https://github.com/tzurp/cleanup-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cleanuptotal-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/tzurp/cleanup-total) | [npm](https://www.npmjs.com/package/wdio-cleanuptotal-service)

مع خدمة `cleanup-total` لـ [webdriver.io](https://webdriver.io/)، يمكنك بسهولة ضمان التنظيف المناسب بعد كل اختبار. توفر الخدمة طريقة منهجية لتحديد الكيانات للحذف مباشرة بعد إنشائها. هذا مفيد بشكل خاص عندما تتضمن الاختبارات إنشاء هياكل معقدة، مثل حساب مصرفي مع خطة استثمار وإيداع. بدون التنظيف المناسب، قد تؤدي محاولة حذف الحساب إلى أخطاء، مثل الرفض بسبب عدم فراغ الحساب. ومع ذلك، مع __cleanup-total__، يتم حذف الكيانات بالترتيب الصحيح، مما يضمن أن الاختبارات تنظف بعد نفسها ولا تتداخل مع بعضها البعض.

## التثبيت
أسهل طريقة لتثبيت هذه الوحدة كتبعية (للتطوير) هي استخدام الأمر التالي:

```
npm install wdio-cleanuptotal-service --save-dev
```

## الاستخدام

أضف wdio-cleanuptotal-service إلى ملف `wdio.conf.ts` الخاص بك:

```typescript
export const config: WebdriverIO.Config = {
  // ... خيارات أخرى

  services: ['cleanuptotal']

  // ... خيارات أخرى
};
```

أو مع خيارات الخدمة:

```typescript
export const config: WebdriverIO.Config = {
  // ... خيارات أخرى

  services: [
    [
      'cleanuptotal',
      {
        // استخدم دالة سجل مخصصة لكتابة الرسائل في تقرير الاختبار
        customLoggerMethod: console.log(), // TODO: استبدل بدالة السجل الخاصة بك إذا لزم الأمر

        // اكتب في السجل فقط عند حدوث خطأ لتقليل الفوضى
        logErrorsOnly: false, // TODO: فكر في التغيير إلى 'true' إذا كان لديك الكثير من الرسائل في التقرير
      }
    ]
  ]

  // ... خيارات أخرى
};
```

## الاستخدام في الاختبار

يمكنك استيراد خدمة __cleanuptotal__ أينما تحتاج إليها، سواء كان ذلك في ملف الاختبار الخاص بك أو أي فئة أخرى.

```typescript
import { cleanuptotal } from "wdio-cleanuptotal-service";

it("should keep things tidy", () => {
  // ...

  // إنشاء حساب وإضافته إلى قائمة التنظيف للحذف بعد الاختبار
  const accountId = createAccount("John Blow");
  cleanupTotal.addCleanup(async () => {
    await deleteAccount(accountId);
  });

  // إضافة خطة استثمار للحساب وإضافتها إلى قائمة التنظيف
  addInvestmentPlan(accountId, "ModRisk");
  cleanupTotal.addCleanup(async () => {
    await removeInvestmentPlan(accountId);
  });

  // إيداع أموال في الحساب وإضافتها إلى قائمة التنظيف
  deposit(accountId, 1000000);
  cleanupTotal.addCleanup(async () => {
    await undoDeposit(accountId);
  });

  // ...

});

// لاحظ أن كود التنظيف الفعلي سيتم تنفيذه بعد اكتمال الاختبار
```

## دعم TypeScript

يتم دعم TypeScript لهذا البرنامج المساعد.

## الدعم

للحصول على الدعم والاقتراحات، لا تتردد في الاتصال بي على [tzur.paldi@outlook.com](https://github.com/tzurp/cleanup-total/blob/master/mailto:tzur.paldi@outlook.com).