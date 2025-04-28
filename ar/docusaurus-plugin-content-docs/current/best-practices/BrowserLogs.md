---
id: browser-logs
title: سجلات المتصفح
---

عند تشغيل الاختبارات، قد يسجل المتصفح معلومات مهمة تهتم بها أو ترغب في التحقق منها.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

عند استخدام WebDriver Bidi، وهي الطريقة الافتراضية التي يستخدمها WebdriverIO لأتمتة المتصفح، يمكنك الاشتراك في الأحداث القادمة من المتصفح. بالنسبة لأحداث السجل، ستحتاج إلى الاستماع إلى `log.entryAdded`، على سبيل المثال:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

في الاختبار، يمكنك دفع أحداث السجل إلى مصفوفة والتحقق من هذه المصفوفة بعد اكتمال الإجراء، على سبيل المثال:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

إذا كنت لا تزال تستخدم WebDriver Classic أو قمت بتعطيل استخدام Bidi عبر خاصية `'wdio:enforceWebDriverClassic': true`، يمكنك استخدام أمر JSONWire `getLogs` لجلب أحدث السجلات. نظرًا لأن WebdriverIO قد أزال هذه الأوامر القديمة، ستحتاج إلى استخدام [خدمة JSONWP](https://github.com/webdriverio-community/wdio-jsonwp-service) لإضافة الأمر مرة أخرى إلى نسخة المتصفح الخاصة بك.

بعد إضافة أو تهيئة الخدمة، يمكنك جلب السجلات عبر:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

ملاحظة: يمكن لأمر `getLogs` فقط جلب أحدث السجلات من المتصفح. قد يقوم بتنظيف رسائل السجل في النهاية إذا أصبحت قديمة جدًا.
</TabItem>

</Tabs>

يرجى ملاحظة أنه يمكنك استخدام هذه الطريقة لاسترداد رسائل الخطأ والتحقق مما إذا كان تطبيقك قد واجه أي أخطاء.