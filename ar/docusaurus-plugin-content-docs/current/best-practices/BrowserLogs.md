---
id: browser-logs
title: سجلات المتصفح
description: "التقط سجلات وحدة تحكم المتصفح أثناء الاختبار باستخدام أحداث السجل في WebDriver Bidi وتحقق من الرسائل المجمّعة."
---

عند تشغيل الاختبارات، قد يسجّل المتصفح معلومات مهمة تهمك أو تريد التحقق منها.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

عند استخدام WebDriver Bidi، وهي الطريقة الافتراضية التي يستخدمها WebdriverIO لأتمتة المتصفح، يمكنك الاشتراك في الأحداث الصادرة من المتصفح. بالنسبة لأحداث السجل، يجب عليك الاستماع إلى `log.entryAdded'`، على سبيل المثال:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

في الاختبار، يمكنك ببساطة إضافة أحداث السجل إلى مصفوفة والتحقق من تلك المصفوفة بمجرد انتهاء الإجراء، على سبيل المثال:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // إضافة رسالة السجل إلى المصفوفة
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // جعل المتصفح يرسل رسالة إلى وحدة التحكم
        ...

        // التحقق مما إذا تم التقاط السجل
        expect(logs).toContain('Hello Bidi')
    })

    // تنظيف المستمع بعد ذلك
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

إذا تم تعطيل Bidi باستخدام الخاصية `'wdio:enforceWebDriverClassic': true`، فلا يزال بإمكان جلسات Chromium قراءة مخزن سجلات المتصفح باستخدام `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

ملاحظة: لا يمكن للأمر `getLogs` جلب سوى أحدث السجلات من المتصفح. وقد يحذف رسائل السجل في نهاية المطاف إذا أصبحت قديمة جدًا.
</TabItem>

</Tabs>

يرجى ملاحظة أنه يمكنك استخدام هذه الطريقة لاسترداد رسائل الخطأ والتحقق مما إذا كان تطبيقك قد واجه أي أخطاء.