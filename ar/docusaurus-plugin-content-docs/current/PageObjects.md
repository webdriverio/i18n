---
id: pageobjects
title: نمط كائن الصفحة
---

تم تصميم الإصدار الخامس من WebdriverIO مع مراعاة دعم نمط كائن الصفحة. من خلال تقديم مبدأ "العناصر كمواطنين من الدرجة الأولى"، أصبح من الممكن الآن بناء مجموعات اختبار كبيرة باستخدام هذا النمط.

لا توجد حزم إضافية مطلوبة لإنشاء كائنات الصفحة. تبين أن الفئات النظيفة والحديثة توفر جميع الميزات الضرورية التي نحتاجها:

- الوراثة بين كائنات الصفحة
- التحميل الكسول للعناصر
- تغليف الطرق والإجراءات

الهدف من استخدام كائنات الصفحة هو فصل أي معلومات صفحة عن الاختبارات الفعلية. من الناحية المثالية، يجب عليك تخزين جميع المحددات أو التعليمات المحددة الفريدة لصفحة معينة في كائن صفحة، بحيث يمكنك الاستمرار في تشغيل اختبارك بعد إعادة تصميم صفحتك بالكامل.

## إنشاء كائن صفحة

أولاً، نحتاج إلى كائن صفحة رئيسي نسميه `Page.js`. سيحتوي على محددات أو طرق عامة سترثها جميع كائنات الصفحة.

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

سنقوم دائمًا بتصدير `export` نسخة من كائن الصفحة، ولن نقوم أبدًا بإنشاء تلك النسخة في الاختبار. نظرًا لأننا نكتب اختبارات من النهاية إلى النهاية، فإننا نعتبر دائمًا الصفحة كبناء بلا حالة&mdash;تمامًا كما أن كل طلب HTTP هو بناء بلا حالة.

بالتأكيد، يمكن للمتصفح حمل معلومات الجلسة وبالتالي يمكنه عرض صفحات مختلفة بناءً على جلسات مختلفة، ولكن لا ينبغي أن ينعكس ذلك داخل كائن الصفحة. يجب أن تكون أنواع تغييرات الحالة هذه موجودة في اختباراتك الفعلية.

لنبدأ باختبار الصفحة الأولى. لأغراض العرض التوضيحي، نستخدم موقع [The Internet](http://the-internet.herokuapp.com) بواسطة [Elemental Selenium](http://elementalselenium.com) كحقل تجارب. دعنا نحاول بناء مثال كائن صفحة لـ [صفحة تسجيل الدخول](http://the-internet.herokuapp.com/login).

## الحصول `Get` على المحددات الخاصة بك

الخطوة الأولى هي كتابة جميع المحددات المهمة المطلوبة في كائن `login.page` الخاص بنا كدوال getter:

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

قد يبدو تعريف المحددات في دوال getter غريبًا بعض الشيء، لكنه مفيد حقًا. يتم تقييم هذه الدوال _عند الوصول إلى الخاصية_، وليس عند إنشاء الكائن. بذلك، فإنك تطلب دائمًا العنصر قبل أن تقوم بإجراء عليه.

## تسلسل الأوامر

يتذكر WebdriverIO داخليًا النتيجة الأخيرة لأمر ما. إذا قمت بتسلسل أمر عنصر مع أمر إجراء، فإنه يجد العنصر من الأمر السابق ويستخدم النتيجة لتنفيذ الإجراء. بذلك يمكنك إزالة المحدد (المعامل الأول) ويبدو الأمر بسيطًا مثل:

```js
await LoginPage.username.setValue('Max Mustermann')
```

وهذا هو نفس الشيء مثل:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

أو

```js
await $('#username').setValue('Max Mustermann')
```

## استخدام كائنات الصفحة في اختباراتك

بعد تحديد العناصر والطرق الضرورية للصفحة، يمكنك البدء في كتابة الاختبار لها. كل ما تحتاج إلى القيام به لاستخدام كائن الصفحة هو `import` (أو `require`). هذا كل شيء!

نظرًا لأنك قمت بتصدير نسخة تم إنشاؤها بالفعل من كائن الصفحة، فإن استيرادها يتيح لك البدء في استخدامها على الفور.

إذا كنت تستخدم إطار عمل للتأكيدات، يمكن أن تكون اختباراتك أكثر تعبيرًا:

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

من الناحية الهيكلية، من المنطقي فصل ملفات المواصفات وكائنات الصفحة إلى دلائل مختلفة. بالإضافة إلى ذلك، يمكنك إعطاء كل كائن صفحة النهاية: `.page.js`. هذا يجعل من الواضح أكثر أنك تستورد كائن صفحة.

## المضي قدماً

هذا هو المبدأ الأساسي لكيفية كتابة كائنات الصفحة باستخدام WebdriverIO. لكن يمكنك بناء هياكل كائنات صفحة أكثر تعقيدًا من هذا! على سبيل المثال، قد يكون لديك كائنات صفحة محددة للنوافذ المنبثقة، أو تقسيم كائن صفحة ضخم إلى فئات مختلفة (كل منها يمثل جزءًا مختلفًا من صفحة الويب الشاملة) التي ترث من كائن الصفحة الرئيسي. يوفر النمط حقًا الكثير من الفرص لفصل معلومات الصفحة عن اختباراتك، وهو أمر مهم للحفاظ على مجموعة الاختبار الخاصة بك منظمة وواضحة في الأوقات التي ينمو فيها المشروع وعدد الاختبارات.

يمكنك العثور على هذا المثال (والمزيد من أمثلة كائن الصفحة) في [مجلد `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) على GitHub.