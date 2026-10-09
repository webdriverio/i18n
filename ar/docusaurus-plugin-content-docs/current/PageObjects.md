---
id: pageobjects
title: نمط كائن الصفحة
description: "نظّم اختباراتك باستخدام نمط كائن الصفحة عن طريق نقل المحددات والإجراءات الخاصة بالصفحة إلى فئات صفحات قابلة لإعادة الاستخدام."
---

صُمم الإصدار 5 من WebdriverIO مع مراعاة دعم نمط كائن الصفحة (Page Object Pattern). ومن خلال تقديم مبدأ "العناصر كمواطنين من الدرجة الأولى"، أصبح من الممكن الآن بناء مجموعات اختبار كبيرة باستخدام هذا النمط.

لا توجد حزم إضافية مطلوبة لإنشاء كائنات الصفحات. فقد تبيّن أن الفئات (classes) الحديثة والنظيفة توفر جميع الميزات الضرورية التي نحتاجها:

- الوراثة بين كائنات الصفحات
- التحميل الكسول (lazy loading) للعناصر
- تغليف (encapsulation) الدوال والإجراءات

الهدف من استخدام كائنات الصفحات هو فصل أي معلومات خاصة بالصفحة عن الاختبارات الفعلية. من الناحية المثالية، يجب أن تخزن جميع المحددات أو التعليمات الخاصة الفريدة لصفحة معينة في كائن صفحة، بحيث يظل بإمكانك تشغيل اختبارك حتى بعد إعادة تصميم صفحتك بالكامل.

## إنشاء كائن صفحة

أولاً، نحتاج إلى كائن صفحة رئيسي نسميه `Page.js`. سيحتوي على المحددات أو الدوال العامة التي سترثها جميع كائنات الصفحات.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

سنقوم دائمًا بتصدير (`export`) نسخة (instance) من كائن الصفحة، ولن ننشئ تلك النسخة أبدًا داخل الاختبار. ولأننا نكتب اختبارات شاملة (end-to-end)، فإننا نعتبر الصفحة دائمًا بنية عديمة الحالة (stateless)&mdash;تمامًا كما أن كل طلب HTTP هو بنية عديمة الحالة.

بالتأكيد، يمكن للمتصفح أن يحمل معلومات الجلسة وبالتالي يمكنه عرض صفحات مختلفة بناءً على جلسات مختلفة، لكن لا ينبغي أن ينعكس ذلك داخل كائن الصفحة. يجب أن تكون هذه الأنواع من تغييرات الحالة موجودة في اختباراتك الفعلية.

لنبدأ باختبار الصفحة الأولى. لأغراض العرض التوضيحي، نستخدم موقع [The Internet](http://the-internet.herokuapp.com) من [Elemental Selenium](http://elementalselenium.com) كحقل تجارب. لنحاول بناء مثال لكائن صفحة خاص بـ[صفحة تسجيل الدخول](http://the-internet.herokuapp.com/login).

## الحصول على محدداتك باستخدام `Get`

الخطوة الأولى هي كتابة جميع المحددات المهمة المطلوبة في كائن `login.page` الخاص بنا كدوال جلب (getter functions):

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

قد يبدو تعريف المحددات في دوال الجلب غريبًا بعض الشيء، لكنه مفيد حقًا. يتم تقييم هذه الدوال _عند الوصول إلى الخاصية_، وليس عند إنشاء الكائن. وبذلك تطلب العنصر دائمًا قبل تنفيذ أي إجراء عليه.

## تسلسل الأوامر

يتذكر WebdriverIO داخليًا آخر نتيجة لأمر ما. إذا قمت بتسلسل أمر عنصر مع أمر إجراء، فإنه يجد العنصر من الأمر السابق ويستخدم النتيجة لتنفيذ الإجراء. وبذلك يمكنك إزالة المحدد (المعامل الأول) ويصبح الأمر بسيطًا كما يلي:

```js
await LoginPage.username.setValue('Max Mustermann')
```

وهو في الأساس نفس الشيء مثل:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

أو

```js
await $('#username').setValue('Max Mustermann')
```

## استخدام كائنات الصفحات في اختباراتك

بعد أن تحدد العناصر والدوال اللازمة للصفحة، يمكنك البدء في كتابة الاختبار الخاص بها. كل ما عليك فعله لاستخدام كائن الصفحة هو استيراده (`import`) (أو `require`). هذا كل شيء!

بما أنك صدّرت نسخة منشأة مسبقًا من كائن الصفحة، فإن استيرادها يتيح لك البدء في استخدامها على الفور.

إذا كنت تستخدم إطار عمل للتأكيدات (assertion framework)، فيمكن أن تكون اختباراتك أكثر تعبيرًا:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

من الناحية الهيكلية، من المنطقي فصل ملفات المواصفات (spec files) وكائنات الصفحات في مجلدات مختلفة. بالإضافة إلى ذلك، يمكنك إعطاء كل كائن صفحة اللاحقة: `.page.js`. هذا يجعل من الأوضح أنك تستورد كائن صفحة.

## التعمق أكثر

هذا هو المبدأ الأساسي لكيفية كتابة كائنات الصفحات باستخدام WebdriverIO. لكن يمكنك بناء هياكل كائنات صفحات أكثر تعقيدًا بكثير من هذا! على سبيل المثال، قد يكون لديك كائنات صفحات خاصة بالنوافذ المنبثقة (modals)، أو تقسيم كائن صفحة ضخم إلى فئات مختلفة (تمثل كل منها جزءًا مختلفًا من صفحة الويب الكاملة) ترث من كائن الصفحة الرئيسي. يوفر هذا النمط حقًا الكثير من الفرص لفصل معلومات الصفحة عن اختباراتك، وهو أمر مهم للحفاظ على مجموعة اختباراتك منظمة وواضحة في الأوقات التي ينمو فيها المشروع وعدد الاختبارات.

يمكنك العثور على هذا المثال (وأمثلة أخرى أكثر لكائنات الصفحات) في [مجلد `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) على GitHub.