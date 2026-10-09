---
id: ai-steps
title: خطوات الذكاء الاصطناعي في الاختبارات
description: اكتب خطوات الاختبار على هيئة نوايا باستخدام browser.act() واقرأ بيانات ذات أنواع محددة باستخدام browser.extract() عبر @wdio/ai-service، ثم أعد تشغيلها من ذاكرة تخزين مؤقت مُضافة إلى المستودع دون نموذج، وراجع كل عملية إصلاح.
---

تتيح لك `@wdio/ai-service` أن يصف الاختبار الخطوة بدلاً من برمجتها: يطلب `browser.act('Add a blue shirt to the cart')` من نموذجك تنفيذها، ويسجّل أوامر WebdriverIO التي نفّذها، ثم يعيد تشغيلها من ملف ذاكرة التخزين المؤقت في كل تشغيل لاحق. لا يُستدعى النموذج مجدداً إلا عندما تتغير الصفحة ولا يعود بالإمكان إصلاح خطوة مسجّلة بدونه. استخدمها للتدفقات التي تتغير بنيتها كثيراً، أو لتشغيل اختبار قبل أن تعرف المحددات. واستخدم أوامر WebdriverIO العادية لكل ما تعرف بالفعل كيف تبرمجه.

## إعداد الخدمة

ثبّت الخدمة وحزمة LangChain الخاصة بمزوّد النموذج الذي تستخدمه:

```sh
npm install --save-dev @wdio/ai-service @langchain/anthropic zod
```

أضف الخدمة إلى ملف الإعدادات واضبط مفتاح API الخاص بالمزوّد (`ANTHROPIC_API_KEY` هنا) في متغيرات البيئة:

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        webSocketUrl: true
    }],
    framework: 'mocha',
    services: [['ai', {
        model: 'anthropic:claude-sonnet-5-5'
    }]]
}
```

يفتح `webSocketUrl: true` جلسة WebDriver BiDi. تعمل الخدمة عبر WebDriver Classic أيضاً، لكن BiDi يتيح لها التحقق مما فعلته كل خطوة وقراءة استجابات API الخاصة بالصفحة. راجع صفحة [AI Service](/docs/ai-service) للاطلاع على جميع الخيارات والمزوّدين، بما في ذلك النماذج المحلية عبر Ollama.

## كتابة اختبار

```ts title="test/specs/cart.e2e.ts"
import { browser, expect } from '@wdio/globals'
import { z } from 'zod'

describe('cart', () => {
    it('adds a shirt', async () => {
        await browser.url('https://shop.example/')
        await browser.act('Add a blue shirt in size M to the shopping cart')

        const cart = await browser.extract(
            'the line items in the cart',
            z.array(z.object({ name: z.string(), size: z.string(), qty: z.number() }))
        )
        expect(cart).toContainEqual({ name: 'Blue Shirt', size: 'M', qty: 1 })
    })
})
```

- ينفّذ `act` الخطوة ولا يقوم بأي تحقق أبداً. تحقق من النتيجة باستخدام `expect`.
- يقتصر `extract` على قراءة الصفحة والتحقق من صحة الإجابة وفق المخطط. ولا يُخزَّن مؤقتاً أبداً.
- توضع الأسرار في عناصر نائبة. يرى النموذج `{{password}}`، ولا يرى القيمة أبداً:

```ts
await browser.act('Log in as {{email}} with password {{password}}', {
    values: { email: process.env.SHOP_USER!, password: process.env.SHOP_PASS! }
})
```

- استدعِ `act` على عنصر لإبقاء النموذج داخله، أو على إطار أو تبويب محدد:

```ts
await $('form#billing').act('Fill in a valid German address')
```

## سجّل مرة واحدة، وأعد التشغيل دون نموذج

يسجّل التشغيل الأول خطوات كل استدعاء لـ `act` في `__act__/<spec file>.json` بجوار ملف المواصفات:

```sh
npx wdio run wdio.conf.ts --spec test/specs/cart.e2e.ts
```

أضف المجلد `__act__` إلى المستودع. تعيد عمليات التشغيل اللاحقة تنفيذ الأوامر المسجّلة، لذا فإن التشغيل الناجح لا يجري أي استدعاءات للنموذج ولا يستهلك أي رموز (tokens).

| `cache` | استخدمه من أجل |
| --- | --- |
| `auto` (افتراضي) | `write` محلياً، و`heal` عند ضبط `process.env.CI` |
| `write` | تسجيل ملفات ذاكرة التخزين المؤقت وتحديثها |
| `heal` | CI: إصلاح الخطوات الفاشلة، وكتابة الإدخالات المُصلَحة إلى `<outputDir>/act-cache/` وترك ملفات ذاكرة التخزين المؤقت دون تغيير |
| `locked` | عمليات تشغيل CI التي يجب ألا تستدعي نموذجاً: إعادة التشغيل فقط، والفشل عندما يتعذر إصلاح خطوة دون النموذج |
| `off` | سؤال النموذج دائماً |

شغّل `npx wdio run wdio.conf.ts -s` لإعادة تسجيل كل استدعاءات `act`.

## مراجعة عمليات الإصلاح

عندما تفشل خطوة مسجّلة، تحاول الخدمة أولاً المحددات الأخرى التي سجّلتها للعنصر، ثم دوره واسمه القابل للوصول. ولا يتابع النموذج من الخطوة الفاشلة إلا إذا فشل ذلك. يجب أن تفعل كل خطوة أُعيد تشغيلها أو أُصلحت ما فعلته عند تسجيلها: أن ترسل الطلبات نفسها، وتنتقل إلى الصفحة نفسها، وتغيّر الأجزاء نفسها من الصفحة. ويُرفض أي إصلاح يستهدف زراً مشابهاً لكنه خاطئ.

ينتهي التشغيل بملخص:

```
@wdio/ai-service: 42 act calls · 39 from cache · 2 healed without the model · 1 healed by the model · 0 recorded by the model · 3.1k tokens
Healed:
  cart.e2e.ts › cart adds a shirt "Add a blue shirt in size M to the shopping cart": step 2 [data-testid="add"] → role/button[name="Add to cart"] (without the model)
    evidence: ./logs/ai/heals/cart.e2e.ts-cart-adds-a-shirt-1c71c48d
```

يحتوي مجلد الأدلة على لقطة شاشة للصفحة عند فشل الخطوة، ولقطة بعد كل خطوة إصلاح، وفيديو لعملية الإصلاح في المتصفحات التي تسجّل screencast عبر WebDriver BiDi (Firefox حالياً). راجع عملية الإصلاح، ثم أضف ملف ذاكرة التخزين المؤقت المحدَّث إلى المستودع.

## تحويل الخطوات إلى كود عادي

بمجرد أن يستقر التدفق، استبدل استدعاءات `act` فيه بالأوامر المسجّلة:

```sh
npx wdio-ai eject test/specs/cart.e2e.ts
```

```ts
// act: أضف قميصاً أزرق بمقاس M إلى سلة التسوق
await $('role/link[name="Blue Shirt"]').click()
await $('role/combobox[name="Size"]').selectByVisibleText('M')
await $('role/button[name="Add to cart"]').click()
```

## استكشاف الأخطاء وإصلاحها

| الخطأ | الحل |
| --- | --- |
| `act("…") failed: no model is configured. Set the `model` option of the service or the WDIO_AI_MODEL environment variable.` | اضبط `model` في خيارات الخدمة أو صدّر `WDIO_AI_MODEL=anthropic:claude-sonnet-5-5`. |
| `[@wdio/ai-service] The "anthropic" provider needs "@langchain/anthropic". Install it with `npm install --save-dev @langchain/anthropic`.` | ثبّت حزمة المزوّد. |
| `[@wdio/ai-service] No API key for "anthropic". Set ANTHROPIC_API_KEY or pass `apiKey` in the model config.` | صدّر المفتاح في الصدفة (shell) أو في سر CI الذي يشغّل الاختبارات. |
| `act("…") failed: no cached steps for "…" and the cache is locked` | سجّل الاستدعاء محلياً باستخدام `cache: 'write'` وأضف ملف `__act__` إلى المستودع. |
| `act("…") failed: cached step 1 (…) ran, but the step no longer causes POST /api/cart → 2xx. The app may have changed behavior, not just markup.` | العنصر لا يزال موجوداً لكنه يفعل شيئاً آخر: هذا تراجع (regression)، وليس تغييراً في البنية. افحص التطبيق. |
| `act("…") failed: …` متبوعاً بـ `Evidence: <folder>` | لم يتمكن النموذج من إكمال التعليمات. يحتوي المجلد على كل لقطة التقطها، وأحداث وحدة التحكم والشبكة، والخطوات التي نُفّذت. |

## الخطوات التالية

- [AI Service](/docs/ai-service): جميع الخيارات، وتنسيق ذاكرة التخزين المؤقت، وتأثيرات الخطوات، ومساحة العمل
- [Selectors](/docs/selectors#role-selector): المحدد `role/` الذي تستخدمه الخطوات المسجّلة
- [WebdriverIO for Coding Agents](/docs/ai-agents): اكتب الاختبارات بالتعاون مع وكيل برمجة